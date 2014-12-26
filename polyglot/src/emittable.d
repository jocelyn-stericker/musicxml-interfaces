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

import std.regex : Captures, ctRegex, replaceAll;

import std.conv : to;
import std.string : isNumeric, replace, strip, toUpper;

/**
 * A structure that can be emitted in different languages.
 */
interface PEmittable {
    string emitTypeScriptDOM();
    string emitTypeScript();
    string emitD();
}


private auto _camelRegex = ctRegex!(r"[- ](.)", "g");
export R toCamelCase(R)(R s) {
    R camelHelper(Captures!(R) m) {
        return m.hit.length == 2 ? m.hit[1].toUpper.to!R : R.init;
    }
    R result = s.replaceAll!camelHelper(_camelRegex).strip;
    return result.length ? result : "empty";
}

export R toPascalCase(R)(R s) {
    R camel = s.toCamelCase;
    if (camel[0..1].isNumeric) {
        camel = "_" ~ camel;
    }

    if (camel.length) {
        return camel[0].toUpper.to!R ~ camel[1..$];
    }
    return R.init;
}
