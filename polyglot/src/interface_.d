/** 
 * Copyright (C) 2015 Josh Netterfield
 * Part of the musicxml-interfaces project.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import docstring : PDocstring;
import emittable : PEmittable, toCamelCase, toPascalCase;
import named : PNamed;
import scope_ : PField, PScope;

import std.algorithm : map;
import std.string : endsWith, join, split;
import vibejson.json : Json;

class PInterface : PEmittable {
    mixin PNamed;
    mixin PDocstring;

    bool isShallow;
    string shallowType;

    bool isAuto;
    bool isVirtual;

    bool isOrdered;
    
    string[] inherits;

    PField[] ownFields;
    PField[] attributes;
    PField[] children;
    PField[] childTags;

    this(Json type, PScope scope_) {
        this.initName(type);
        this.initDocstring(type);

        this.isAuto = !("auto" in type) || !!type["auto"];
        this.isVirtual = ("virtual" in type) && !!type["virtual"];
        this.isOrdered = ("ordered" in type) && !!type["ordered"];

        scope_.subtypes[this.name] = string[string].init;
        if (this.isOrdered) {
            scope_.isVA[this.name] = true;
        }

        auto interface_ = type["interface"];
        if (interface_.type == Json.Type.string) {
            this.isShallow = true;
            if (interface_ == "number") {
                this.shallowType = "float";
                scope_.isRange[this.name] = true;
                scope_.isShallow[this.name] = true;

                scope_.attributes[this.name] = [];
                scope_.children[this.name] = [];
            } else if (interface_ == "string") {
                scope_.isString[this.name] = true;
            } else {
                this.shallowType = "string";
            }
        } else {
            string extStringComplete;
            string constructorType;
            bool valid = true;

            foreach(ref string key, const(Json) value; interface_) {
                if (key == "_extends") {
                    int i = 0;
                    foreach(val; value) {
                        constructorType = val.to!string.toPascalCase;
                        this.inherits ~= constructorType;
                        assert((constructorType in scope_.attributes), constructorType ~ " should be defined, and be defined before " ~ this.name ~ ".");
                        if (constructorType in scope_.isShallow) {
                            scope_.isRange[this.name] = true;
                            this.isShallow = true;
                            this.shallowType = "float";
                            valid = false;
                            break;
                        }
                        this.attributes ~= scope_.attributes[constructorType];
                        this.children ~= scope_.children[constructorType];
                        this.childTags ~= scope_.childTags[constructorType];
                        ++i;
                    }
                } else {
                    bool isChildData = value.type == Json.Type.object && "child" in value && value["child"];
                    bool isChildTag = false;
                    bool isFlag = false;
                    string tsType;
                    string xname;
                    string sname;
                    if (value == "__flag__") {
                        isFlag = true;
                    }
                    if (isFlag || value == "yes-no" || value.type == Json.Type.object && value["type"] == "yes-no") {
                        tsType = "boolean";
                    }
                    if (key.length && key[0] == '<') {
                        isChildTag = true;
                        xname = key[1..$-1];
                        sname = xname.toCamelCase;
                        if (!tsType.length) {
                            tsType = sname.toPascalCase;
                        }
                        if (value.type == Json.Type.object && value["type"] == "string") {
                            tsType = "string";
                        }
                    } else {
                        xname = key;
                        sname = key.toCamelCase;

                        if (tsType != "boolean") {
                            if (value.type == Json.Type.string) {
                                tsType = value.to!string.toPascalCase;
                            } else {
                                if (value["type"] == "string") {
                                    tsType = "string";
                                } else {
                                    tsType = value["type"].to!string.toPascalCase;
                                }
                            }
                        }
                    }

                    if (value.type == Json.Type.object && "name" in value) {
                        sname = value["name"].to!string;
                    }
                    bool isArray = value.type == Json.Type.object && "array" in value && !!value["array"];
                    string indexBy = value.type == Json.Type.object && "indexBy" in value ? value["indexBy"].to!string : null;
                    if (tsType in scope_.isRange) {
                        tsType = "number";
                    }
                    if (tsType in scope_.isString) {
                        tsType = "string";
                    }
                    if (sname == "double" || sname == "number" || sname == "float" || sname == "long" || sname == "function" || sname == "string" || sname == "version") {
                        sname ~= "_";
                    } else if (sname == "key") {
                        sname ~= "Signature";
                    }
                    if (isArray && !sname.endsWith("s")) {
                        sname ~= "s";
                    }

                    bool emitTypeScript = true;
                    string op = isArray
                        ? (indexBy
                            ? (indexBy in scope_.subtypes[tsType] && scope_.subtypes[tsType][indexBy] != "string"
                                ? "[data." ~ indexBy ~ "] = "
                                : "[popFront(" ~ indexBy.split(" ").map!(s => "(data." ~ s ~ ".length ? \"_\" : \"\") ~ toCamelCase(data." ~ s ~ ")").join(" ~ ") ~ ")] = "
                                )
                            : " ~= "
                            )
                        : " = ";
                    string brD = isArray
                        ? (indexBy
                            ? "[" ~ (indexBy in scope_.subtypes[tsType] ? scope_.subtypes[tsType][indexBy] : "string") ~ "]"
                            : "[]")
                        : "";
                    if (this.isOrdered) {
                        emitTypeScript = false;
                        sname = "rarr";
                        op = " ~= ";
                    }
                    // If it's not a child data, but there's a tag, we expect the tag to have data.
                    string dSubtype = tsType;

                    if (tsType in scope_.isVA) {
                        tsType = "any[]";
                        dSubtype = "Variant[]";
                    }

                    tsType = isArray
                        ? (indexBy
                            ? "{[key: " ~ (tsType in scope_.subtypes && indexBy in scope_.subtypes[tsType] && scope_.subtypes[tsType][indexBy] == "Range" ? "number" : "string") ~ "]: " ~ tsType ~ "}"
                            : tsType ~ "[]")
                        : tsType;

                    string defaultVal;
                    string defaultValTS;
                    if (!this.isOrdered) {
                        if (value.type == Json.Type.object) {
                            if ("std" in value) {
                                if (!!(tsType in scope_.isEnum) && value["std"].type == Json.Type.string) {
                                    defaultValTS = defaultVal = value["std"].to!string;
                                } else if (value["std"].type == Json.Type.string) {
                                    defaultValTS = defaultVal = "\"" ~ value["std"].to!string ~ "\"";
                                } else if (value["std"].type == Json.Type.null_ && tsType == "number") {
                                    defaultVal = "float.nan";
                                    defaultValTS = "NaN";
                                } else {
                                    defaultValTS = defaultVal = value["std"].to!string;
                                }
                                defaultValTS = "std.ts" in value ? value["std.ts"].to!string : defaultValTS;
                            }
                        }
                    }

                    bool required = value.type != Json.Type.object || !("required" in value) || value["required"];

                    string dType = (dSubtype ~ brD).replace("number", "float").replace("boolean", "bool");
                    PField field = {
                        name: sname,
                        xmlName: xname,
                        isFlag: isFlag,
                        isEnum: !!(tsType in scope_.isEnum),
                        isVA: !!(tsType in scope_.isVA),
                        operation: op,
                        required: required,
                        tsType: emitTypeScript ? tsType : null,
                        dType: dType,
                        dTypeSingular: dSubtype.replace("boolean", "YesNo"),
                        defaultVal: defaultVal,
                        defaultValTS: defaultValTS
                    };

                    scope_.subtypes[this.name][sname] = dSubtype;

                    if (isChildTag) {
                        this.childTags ~= field;
                    } else if (isChildData) {
                        this.children ~= field;
                    } else {
                        this.attributes ~= field;
                    }

                    this.ownFields ~= field;
                }
            }
            if (!valid) {
                return;
            }

            scope_.children[this.name] = this.children;
            scope_.childTags[this.name] = this.childTags;
            scope_.attributes[this.name] = this.attributes;
        }
    }

    string emitTSExtendsList(bool complete = false) {
        string toEmit;
        foreach(idx, val; this.inherits) {
            if (!idx) {
                toEmit ~= " extends ";
            } else {
                toEmit ~= ", ";
            }
            toEmit ~= val;
            if (complete) {
                toEmit ~= "Complete";
            }
        }
        return toEmit;
    }

    string emitDMixinTemplate() {
        if (this.isOrdered) {
            return "";
        }

        string toEmit;
        toEmit ~= emitDocstring();
        toEmit ~= "mixin template I" ~ this.name ~ "() {\n";
        foreach(val; this.inherits) {
            toEmit ~= "    mixin I" ~ val ~ ";\n";
        }
        toEmit ~= emitDFields();
        toEmit ~= "}\n";
        return toEmit;
    }

    string emitTSFields(bool complete = false) {
        string toEmit;
        foreach(val; this.ownFields) {
            if (val.tsType) {
                toEmit ~= "    " ~ val.name;

                if (!val.required && !complete) {
                    toEmit ~= "?";
                }
                toEmit ~= ": " ~ val.tsType ~ ";\n";
            }
        }
        return toEmit;
    }

    string emitDFields(bool complete = false) {
        string toEmit;
        foreach(val; this.ownFields) {
            toEmit ~= "    " ~ val.dType ~ " " ~ val.name ~ ";\n";
        }
        return toEmit;
    }

    string emitFoundDefs(string type, string indent)() {
        string toEmit;
        foreach(val; this.children ~ this.attributes) {
            if (val.defaultVal) {
                toEmit ~= indent ~ type ~ " found" ~ val.name.toPascalCase ~ " = false;\n";
            }
        }
        return toEmit;
    }

    string emitDefaults(string indent, bool ts) {
        string toEmit;
        foreach(val; this.children ~ this.attributes) {
            if (val.defaultVal) {
                toEmit ~= indent ~ "if (!found" ~ val.name.toPascalCase ~ ") {\n";
                toEmit ~= indent ~ "    " ~ (ts ? "ret." : "") ~ val.name ~ " = " ~ (ts ? val.defaultValTS : val.defaultVal) ~ ";\n";
                toEmit ~= indent ~ "}\n";
            }
        }
        return toEmit;
    }

    string emitFieldAssignmentFor(PField val, bool isChild) {
        string toEmit;

        string va1 = this.isOrdered ? "Variant(" : "";
        string va2 = this.isOrdered ? ")" : "";
        string indent = isChild ? "        " : "                ";
        string required = val.required || !isChild ? "true" : "false";

        if (!isChild) {
            toEmit ~= "            if (ch.name.toString == \"" ~ val.xmlName ~ "\") {\n";
        }

        toEmit ~= indent ~ "auto data = ";
        auto target = "this." ~ val.name;
        if (val.operation == " ~= " && this.isOrdered) {
            target = "rarr";
        }

        if (val.isFlag) {
            toEmit ~= va1 ~ "true" ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else if (val.dTypeSingular == "YesNo") {
            toEmit ~= va1 ~"getYesNo(ch, " ~ required ~ ")" ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else if (val.dTypeSingular == "string") {
            toEmit ~= va1 ~"getString(ch, " ~ required ~ ")" ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else if (val.dTypeSingular == "Number" || val.dTypeSingular == "number") {
            toEmit ~= va1 ~ "getNumber(ch, " ~ required ~ ")" ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else if (val.isEnum) {
            toEmit ~= va1 ~ "get" ~ val.dTypeSingular ~ "(ch)" ~  va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else if (val.isVA) {
            toEmit ~= va1 ~ val.tsType ~ "(ch) " ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        } else {
            toEmit ~= va1 ~ "new " ~ val.dTypeSingular ~ "(ch) " ~ va2 ~ ";\n";
            toEmit ~= indent ~ target ~ val.operation ~ "data;\n";
        }

        if (!isChild && !this.isOrdered && val.defaultVal) {
            toEmit ~= indent ~ "found" ~ val.name.toPascalCase ~ " = true;\n";
        }
        if (!isChild) {
            toEmit ~= "            }\n";
        }
        
        return toEmit;
    }

    string emitTSFieldAssignmentFor(PField val, bool isChild, string ch, string name) {
        string toEmit;

        string indent = isChild ? "    " : "            ";
        string required = val.required || !isChild ? "true" : "false";

        if (!isChild) {
            toEmit ~= "        if (" ~ ch ~ "." ~ name ~ " === \"" ~ val.xmlName ~ "\") {\n";
        }

        string dataName;
        if (val.name == "rarr") {
            dataName = "data";
            toEmit ~= indent ~ "var " ~ dataName ~ ": any = ";
        } else {
            dataName = "data" ~ val.name.toPascalCase;
            toEmit ~= indent ~ "var " ~ dataName ~ " = ";
        }

        auto operation = val.operation;
        auto target = "ret." ~ val.name;
        auto close = ";\n";
        if (operation == " ~= ") {
            if (this.isOrdered) {
                target = "rarr";
            }

            operation = " = (" ~ target ~ "|| []).concat(";
            close = ")" ~ close;
        } else {
            operation = operation.replace("~", "+");
        }
        operation = operation.replace("data", dataName);

        if (val.isFlag) {
            toEmit ~= "true" ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        } else if (val.dTypeSingular == "string") {
            toEmit ~= "getString(" ~ ch ~ ", " ~ required ~ ")" ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        } else if (val.dTypeSingular == "Number" || val.dTypeSingular == "number") {
            toEmit ~= "getNumber(" ~ ch ~ ", " ~ required ~ ")" ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        } else if (val.isEnum) {
            toEmit ~= "get" ~ val.dTypeSingular ~ "(" ~ ch ~ ", " ~
                (val.defaultValTS ? val.defaultValTS : "null") ~ ")" ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        } else if (val.isVA) {
            toEmit ~= val.tsType ~ "(" ~ ch ~ ") " ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        } else {
            toEmit ~= "xmlTo" ~ val.dTypeSingular ~ "(" ~ ch ~ ") " ~ ";\n";
            toEmit ~= indent ~ target ~ operation ~ dataName ~ close;
        }

        if (!isChild && !this.isOrdered && val.defaultValTS) {
            toEmit ~= indent ~ "found" ~ val.name.toPascalCase ~ " = true;\n";
        }
        if (!isChild) {
            toEmit ~= "        }\n";
        }
        
        return toEmit;
    }

    string emitDFields(string search, string it)(PField[] fields) {
        string toEmit;
        if (this.isAuto && !this.isVirtual) {
            toEmit ~= "        for (auto ch = " ~ search ~ "; ch; ch = " ~ it ~ ") {\n";
            foreach(val; fields) {
                toEmit ~= this.emitFieldAssignmentFor(val, false);
            }
            toEmit ~= "        }\n";
        }
        return toEmit;
    }

    string emitTSFieldGen(string search, string ch, string name)(PField[] fields) {
        string toEmit;
        if (true) {
            toEmit ~= "    for (var i = 0; i < " ~ search ~ ".length; ++i) {\n";
            toEmit ~= "        var " ~ ch ~ " = " ~ search ~ "[i];\n";
            foreach(val; fields) {
                toEmit ~= this.emitTSFieldAssignmentFor(val, false, ch, name);
            }
            toEmit ~= "    }\n";
        }
        return toEmit;
    }

    string emitDChildren() {
        string toEmit;

        foreach(val; this.children) {
            toEmit ~= "        auto ch = node;\n";
            toEmit ~= this.emitFieldAssignmentFor(val, true);
        }
        return toEmit;
    }

    string emitTSChildren() {
        string toEmit;

        foreach(val; this.children) {
            toEmit ~= "    var ch3 = node;\n";
            toEmit ~= this.emitTSFieldAssignmentFor(val, true, "ch3", "name");
        }
        return toEmit;
    }

    string emitTypeScript() {
        if (this.isShallow) {
            return this.emitDocstring() ~
                "export interface " ~ this.name ~ " extends String {}\n";
        }

        return
            this.emitDocstring() ~
            "export interface " ~ this.name ~ emitTSExtendsList() ~ " {\n" ~
            emitTSFields() ~
            "}\n\n" ~

            this.emitDocstring() ~
            "export interface " ~ this.name ~ "Complete" ~ emitTSExtendsList(true) ~ " {\n" ~
            emitTSFields(true) ~
            "}\n\n";
    }

    string emitTypeScriptDOM() {
        if (!this.isAuto) {
            return "";
        }
        return
            "export function xmlTo" ~ this.name ~ "(node: Node) {\n" ~
            "    \"use strict\";\n" ~
            (this.isOrdered ? "    var rarr: any[] = [];\n" : "    var ret: " ~ this.name ~ " = <any> {};\n") ~
            this.emitFoundDefs!("var", "    ")() ~
            this.emitTSFieldGen!("node.childNodes", "ch", "nodeName")(this.childTags) ~
            this.emitTSFieldGen!("node.attributes", "ch2", "name")(this.attributes) ~
            this.emitTSChildren() ~
            this.emitDefaults("    ", true) ~
            (this.isOrdered ? "    return rarr;\n" : "    return ret;\n") ~
            "}\n";
    }

    string emitD() {
        if (this.isShallow) {
            string aliasStr;
            if (this.shallowType && this.shallowType.length) {
                aliasStr = "alias " ~ this.name ~ " = " ~ shallowType ~ ";\n";
            }
            return this.emitDocstring() ~ aliasStr;
        }

        return 
            (this.isAuto && !this.isVirtual
              ? (this.emitDocstring() ~ (this.isOrdered
                  ? "Variant[] " ~ this.name ~ "(xmlNodePtr node) {\n" ~
                    "    Variant[] rarr = [];\n"
                  : "export class " ~ this.name ~ " {\n" ~
                    "    mixin I" ~ this.name ~ ";\n" ~
                    "    this(xmlNodePtr node) {\n") ~

                this.emitFoundDefs!("bool", "        ")() ~
                this.emitDFields!("node.children.firstElement", "ch.nextElement")(this.childTags) ~
                this.emitDFields!("node.properties", "ch.next")(this.attributes) ~
                this.emitDChildren() ~
                this.emitDefaults("        ", false) ~
                (this.isOrdered ? "    return rarr;\n" : "    }\n") ~
                "}\n\n")
              : "") ~
            this.emitDMixinTemplate();
    }
}

