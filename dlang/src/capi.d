/**
 * @copyright (c) Josh Netterfield <joshua@nettek.ca> October 2014
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
module capi;

import std.conv;
import std.string;
import core.runtime;
import vibejson.json;

import score;

export extern(C) void musicxml_init() {
    Runtime.initialize();
}

/**
 * Part of C API used for the Node plugin (../../node/main.cpp)
 *
 * Converts an uncompressed MusicXML file (timewise or partwise) to a MXMLJSON string.
 * The returned string must be freed by calling musicxml_freeString.
 */
export extern(C) immutable(char)* musicxml_xmlToJson(immutable(char)* buffer, int bufferLen) {
    immutable(char)* c_str;
    try {
        c_str = Score(buffer[0..bufferLen].to!string).toJsonString.toStringz;
    } catch(Throwable e) {
        c_str = ("{\"error\": " ~ e.to!string.serializeToJson.toPrettyString ~ "}").toStringz;
    }
    garbage[c_str] = true;
    return c_str;
}

/**
 * Part of C API used for the Node plugin (../../node/main.cpp)
 * 
 * Frees a string that has been created by a musicxml_* function.
 * Must be called in same thread as the string was created.
 */
export extern(C) void musicxml_freeString(immutable(char)* buffer) {
    garbage.remove(buffer);
}

// Holds pointers to pointers passed to C.
private bool garbage[immutable(char)*];
