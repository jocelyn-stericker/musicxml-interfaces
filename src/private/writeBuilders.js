"use strict";

const _ = require("lodash");
const impGen = require("./symbols.json");

const symbols = impGen.
    filter(
        n => n.kind === 'ModuleDeclaration' &&
            n.name === 'musicxml-interfaces/index')
    [0].
    symbols;

const decls = {
    interfaces: symbols.
        filter(n => n.kind === 'InterfaceDeclaration'),
    enums: symbols.
        filter(n => n.kind === 'EnumDeclaration')
};

const enums = decls.enums.reduce(
    (memo, spec) => {
        memo[spec.name] = spec.members.reduce(
            (memo2, spec2) => {
                memo2[spec2.name] = spec2.value;
                return memo2;
            }, {});
        return memo;
    }, {});

const exFrom = {};
const exTo = {};

const interfaces = decls.interfaces.reduce(
    (memo, spec) => {
        spec.extends.forEach(exName => {
            exFrom[exName] = exFrom[exName] || [];
            exTo[spec.name] = exTo[spec.name] || [];

            exFrom[exName].push(spec.name);
            exTo[spec.name].push(exName);
        });
        memo[spec.name] = spec.members.reduce(
            (memo2, spec2) => {
                if (typeof spec2.kind !== 'string' && spec2.kind.kind === 'typeLiteral') {
                    spec2.kind.members.forEach(member => {
                        member.in.forEach(inType => {
                            memo2[`<${inType}Literal>`] = member.out;
                        });
                    });
                } else {
                    memo2[spec2.name] = spec2.kind + (spec2.required ? '' : '?');
                }
                return memo2;
            }, {});
        return memo;
    }, {});

while (Object.keys(exFrom).length) {
    for (var zkey in exFrom) {
        if (exFrom.hasOwnProperty(zkey) && (!exTo[zkey] || !exTo[zkey].length)) {
            exFrom[zkey].forEach(tkey => {
                exTo[tkey] = exTo[tkey].filter(okey => okey !== zkey);
                if (!exTo[tkey].length) {
                    delete exTo[tkey];
                }
                _.extend(interfaces[tkey], interfaces[zkey]);
            });
            delete exFrom[zkey];
        }
    }
}

const imports = Object.keys(enums).concat(Object.keys(interfaces)).concat('PartList');

const emit = console.log.bind(console);

emit(`// Auto-generated by writeBuilders.js. Modification is unwise.`);
emit(``);
emit(`import {${imports.join(", ")}} from "./index";`);
emit(`import {IAny} from "./operations";`);
emit(``);

function emitIFields(spec, key) {
    _.forEach(spec, (fieldSpec, fieldName) => {
        if (fieldName.indexOf("_") === 0) {
            return;
        }
        if (fieldName === "<stringLiteral>") {
            emit(`  set: (key: string, val: ${fieldSpec.replace('?', '')}) => I${key}Builder;`);
            return;
        }
        
        const realFieldSpec = fieldSpec.replace('?', '');
        const containedFieldSpec = realFieldSpec.replace('[]', '');
        const isArray = containedFieldSpec != realFieldSpec;

        if (interfaces[realFieldSpec]) {
            emit(`  ${fieldName}: (build: ${realFieldSpec} | ((builder: I${realFieldSpec}Builder) => I${realFieldSpec}Builder)) => I${key}Builder;`);
            return;
        }
        if (isArray && interfaces[containedFieldSpec]) {
            emit(`  ${fieldName}At: (idx: number, build: ${containedFieldSpec} | ((builder: I${containedFieldSpec}Builder) => I${containedFieldSpec}Builder)) => I${key}Builder;`);
            emit(`  ${fieldName}Splice: (start: number, deleteCount: number, ...items: ${containedFieldSpec}[]) => I${key}Builder;`);
        }

        emit(`  ${fieldName}: (${fieldName}: ${realFieldSpec}) => I${key}Builder;`);
    });
}

emit(`
function makePatch<T, U>(original: T, updates: any, childBuilders: U, explicitPatches: any[], modifiedKeys: {[key: string]: boolean}) {
  if (!original) return [{p: [], oi: updates}].concat(explicitPatches);

  let patches: any = Object.keys(modifiedKeys).map(key => {
    if (childBuilders[key] !== undefined) return;
    if (updates[key] === original[key] || updates[key] !== updates[key] && original[key] !== original[key]) return;
    if (updates[key] === undefined) return {p: [key], od: original[key]};
    if (original[key] === undefined) return {p: [key], oi: updates[key]};
    return {p: [key], od: original[key], oi: updates[key]};
  }).filter(p => Boolean(p));

  Object.keys(childBuilders).map(key => {
    if (original[key] === undefined) {
      patches.push({p: [key], oi: childBuilders[key].build()});
    } else {
      let subpatches = childBuilders[key].patch().map(patch => {
        patch.p = [key].concat(patch.p);
        return patch;
      })
      patches = patches.concat(subpatches);
    }
  });
  return patches.concat(explicitPatches);
}`); // makePatch

_.forEach(interfaces, (spec, key) => {
    emit(`export interface I${key}Builder {`);
    emit(`  build?: () => ${key};`);
    emit(`  patch: () => IAny[];`);
    emitIFields(spec, key);
    emit(`}`); // export interface I${key}Builder
    emit(``);

    emit(`class ${key}Builder implements I${key}Builder {`);
    emit(`  build: () => ${key};`);
    emit(`  patch: () => IAny[];`);
    emitIFields(spec, key);
    emit(`  constructor(original?: ${key}) {`);
    emit(`    let updates: ${key} = {} as any;`);
    emit(`    let childBuilders: {[key: string]: any} = {};`);
    emit(`    let modifiedKeys: {[key: string]: boolean} = {};`);
    emit(`    let reference: {[key: string]: any[]} = {};`);
    emit(`    let frozen: {[key: string]: boolean[]} = {};`);
    emit(`    let patches: any[] = [];`);
    emit(`
        function makeReference(fieldName: string) {
                  if (!reference[fieldName]) {
                    if (original) {
                      reference[fieldName] = (original[fieldName] as any[] || [] as any[]).slice();
                    } else {
                      reference[fieldName] = [];
                    }
                    frozen[fieldName] = reference[fieldName].map(a => false);
                  }
        }
    `);
    emit(`    function checkInvariants() {`); // invariants
    _.forEach(spec, (fieldSpec, fieldName) => {
        if (fieldName === "<stringLiteral>") {
            return;
        } else if (fieldSpec.indexOf('?') === -1) {
            emit(`      console.assert(`);
            emit(`          (original && !modifiedKeys["${fieldName}"]) ||`);
            emit(`          childBuilders["${fieldName}"] !== undefined ||`);
            emit(`          updates.${fieldName} !== undefined,`);
            emit(`        "${fieldName} is a required field");`);
        }
    });
    emit(`    }`); // checkInvariants

    emit(`    if (!original) {`);
    emit(`      this.build = (): ${key} => {`);
    emit(`        checkInvariants();`);
    emit(`        (updates as any)._class = "${key}";`);
    emit(`        return updates;`);
    emit(`      }`); // checkInvariants
    emit(`    }`);

    emit(`    this.patch = (): any[] => {`);
    emit(`      checkInvariants();`);
    emit(`      return makePatch(original, updates, childBuilders, patches, modifiedKeys);`);
    emit(`    }`); // patch

    _.forEach(spec, (fieldSpec, fieldName) => {
        if (fieldName.indexOf("_") === 0) {
            return;
        }

        if (fieldName === "<stringLiteral>") {
            emit(`    this.set = (key: string, val: ${fieldSpec.replace('?', '')}): I${key}Builder => {`);
            emit(`      updates[key] = val;`);
            emit(`      modifiedKeys[key] = true;`);
            emit(`      return this;`);
            emit(`    }`); // this.set
            return;
        }
        
        const realFieldSpec = fieldSpec.replace('?', '');
        const containedFieldSpec = realFieldSpec.replace('[]', '');
        const isArray = containedFieldSpec != realFieldSpec;

        if (interfaces[realFieldSpec]) {
            emit(`
                this.${fieldName} = (build: ${realFieldSpec} | ((builder: I${realFieldSpec}Builder) => I${realFieldSpec}Builder)): I${key}Builder => {
                  if (typeof build === 'function') {
                    delete updates["${fieldName}"]
                    const builder = (build as any)(new ${realFieldSpec}Builder(original && original["${fieldName}"]));
                    if (!original) updates["${fieldName}"] = builder.build();
                    else childBuilders["${fieldName}"] = builder;
                  } else {
                    updates.${fieldName} = build as any;
                    delete childBuilders["${fieldName};"];
                  }
                  modifiedKeys["${fieldName}"] = true;
                  return this;
                }`) // ${fieldName}(...): ${key}Builder
            return;
        }
        emit(`
            this.${fieldName} = (spec: ${realFieldSpec}): I${key}Builder => {
                updates["${fieldName}"] = spec;
                delete childBuilders["${fieldName};"];
                modifiedKeys["${fieldName}"] = true;
                return this;
            }`) // ${fieldName}

        if (isArray && interfaces[containedFieldSpec]) {
            emit(`
                this.${fieldName}At = (idx: number, build: ${containedFieldSpec} | ((builder: I${containedFieldSpec}Builder) => I${containedFieldSpec}Builder)): I${key}Builder => {
                  makeReference("${fieldName}");
                  if (frozen["${fieldName}"][idx]) {
                      throw new Error("Patching ${fieldName}." + idx + " twice in a builder is unsupported.");
                  }
                  if (typeof build === 'function' && reference["${fieldName}"][idx]) {
                    let patch = (build as any)(new ${containedFieldSpec}Builder(reference["${fieldName}"][idx])).patch();
                    patches = patches.concat(patch.map(patch => {
                      // TODO: detach?
                      patch.p = ["${fieldName}", idx].concat(patch.p);
                      return patch;
                    }));
                    frozen["${fieldName}"][idx] = true;
                    return this;
                  }
                  let update = typeof build === 'function' ? (build as any)(new ${containedFieldSpec}Builder(reference["${fieldName}"][idx])).build() : build;
                  if (original) {
                    patches.push({p: ["${fieldName}", idx], li: update});
                  } else {
                    updates["${fieldName}"] = reference["${fieldName}"]; // TODO: Merge?
                  } 
                  reference["${fieldName}"][idx] = update;
                  frozen["${fieldName}"][idx] = true;
                  return this;
                }
            
                this.${fieldName}Splice = (start: number, deleteCount: number, ...items: ${containedFieldSpec}[]): I${key}Builder => {
                  makeReference("${fieldName}");
                  let idx = start;
                  if (original) {
                    for (; idx < start + deleteCount && idx < start + items.length; ++idx) {
                      if (frozen["${fieldName}"][idx]) {
                        throw new Error("Replacing ${fieldName}." + idx + " after patching in a builder is unsupported.");
                      }
                      let ld = reference["${fieldName}"][idx];
                      patches.push({p: ["${fieldName}", idx], ld, li: items[idx - start]});
                      frozen["${fieldName}"][idx] = true;
                    }
                    for (; idx < start + deleteCount; ++idx) {
                      if (frozen["${fieldName}"][idx]) {
                        throw new Error("Removing ${fieldName}." + idx + " after patching in a builder is unsupported.");
                      }
                      let ld = reference["${fieldName}"][idx];
                      patches.push({p: ["${fieldName}", idx], ld});
                    }
                    for (; idx < start + items.length; ++idx) {
                      patches.push({p: ["${fieldName}", idx], li: items[idx - start]});
                      frozen["${fieldName}"][idx] = true;
                    }
                  }
                  reference["${fieldName}"].splice(start, deleteCount, ...items);
                  updates["${fieldName}"] = reference["${fieldName}"];
                  frozen["${fieldName}"].splice(start, deleteCount, ...items.map(i => true));
                  return this;
                }`) // ${fieldName}(...): ${key}Builder
        }
    });

    emit(`  }`); // constructor

    emit(`}`); // class ${key}Builder (not exported)
    emit(`export function patch${key}(base: ${key}, builder: (build: I${key}Builder) => I${key}Builder): IAny[] { return builder(new ${key}Builder(base)).patch(); }`);
    emit(`export function build${key}(builder: (build: I${key}Builder) => I${key}Builder): ${key} { return builder(new ${key}Builder()).build(); }`);
    emit(``);
});

