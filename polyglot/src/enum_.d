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
import emittable : PEmittable, toPascalCase;
import named : PNamed;
import scope_ : PScope;

import std.algorithm : join, map;
import vibejson.json : Json;

/**
 * Enumeration. Limited to integer values for broad language support.
 */
class PEnum : PEmittable {
    mixin PNamed;
    mixin PDocstring;

    struct Entry {
        string key;
        string xname;
        string value;
    }

    Entry[] entries;

    this(Json type, PScope scope_) {
        this.initName(type);
        this.initDocstring(type);

        scope_.isEnum[this.name] = true;

        foreach(ref string key, ref Json value; type["enum"]) {
            entries ~= Entry(key.toPascalCase, key, value.to!string);
        }
    }

    string emitStandardEnum() {
        return
            "export enum " ~ this.name ~ " {\n" ~
                entries.map!(pair => "    " ~ pair.key ~ " = " ~ pair.value)
                    .join(",\n") ~
            "\n}\n";
    }
    
    string emitTypeScript() {
        return
            emitDocstring() ~
            emitStandardEnum();
    }

    string emitTypeScriptDOM() {
        return
            "export function get" ~ this.name ~ "(node: Node, fallbackVal?: " ~ this.name ~ ") {\n" ~
            "    \"use strict\"\n" ~
            "    var s = (node.nodeType === node.ATTRIBUTE_NODE ? (<Attr>node).value : node.textContent).trim();\n" ~
            "    if (s === \"\" && fallbackVal !== null && fallbackVal !== undefined) {\n" ~
            "        return fallbackVal;\n" ~
            "    }\n" ~
            entries.map!(
                pair => "    if (s == \"" ~ pair.xname ~ "\") {\n" ~
                        "        return " ~ this.name ~ "." ~ pair.key ~ ";\n" ~
                        "    }\n")
                    .join("") ~
            "    assert(false, \"Not reached\");\n" ~
            "\n}\n";
    }

    string emitD() {
        // It turns out D's syntax matches TypeScript's exactly!
        return
            emitDocstring() ~
            emitStandardEnum() ~ "\n" ~
            name ~ " get" ~ this.name ~ "(T)(T p) {\n" ~
                "    string s = getString(p, true);\n" ~
                entries.map!(
                    pair => "    if (s == \"" ~ pair.xname ~ "\") {\n" ~
                            "        return " ~ this.name ~ "." ~ pair.key ~ ";\n" ~
                            "    }\n")
                        .join("") ~
                "    assert(false, \"Not reached\");\n" ~
            "}";
    }
};

