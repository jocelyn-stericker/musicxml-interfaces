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
import emittable : PEmittable;
import named : PNamed;
import scope_ : PScope;

import vibejson.json : Json;

class PRange : PEmittable {
    mixin PNamed;
    mixin PDocstring;

    float minInclusive;
    float maxInclusive;

    this(Json type, PScope scope_) {
        this.initName(type);
        this.initDocstring(type);

        scope_.isRange[this.name] = true;

        this.minInclusive = type["range"]["fromIncl"].to!float;
        this.maxInclusive = type["range"]["toIncl"].to!float;
    }

    private string assertion() {
        return "    assert(m >= " ~ this.minInclusive.to!string ~
                   " && m <= " ~ this.maxInclusive.to!string ~ ");\n";
    }

    string emitTypeScript() {
        return
            emitDocstring() ~
            "export function verify" ~ this.name ~ "(m: number) {\n" ~
            this.assertion() ~
            "}\n";
    }

    string emitTypeScriptDOM() {
        return 
            "export function xmlTo" ~ this.name ~ "(node: Node) {\n" ~
            "    var str = node.textContent;\n" ~
            "    var num = str.toLowerCase().indexOf(\"0x\") === 0 ? parseInt(str, 16) : parseFloat(str);\n" ~
            "    return num;\n" ~
            "\n}\n";
    }

    string emitD() {
        return
            emitDocstring() ~
            "export float " ~ this.name ~ "(xmlNodePtr p) {\n" ~
            "    float m = getNumber(p, true);\n" ~
            this.assertion() ~
            "    return m;\n" ~
            "}\n";
    }
}

