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

import emittable : PEmittable;

import vibejson.json : Json;
import std.file : readText;
import std.path : dirSeparator;

class PCode : PEmittable {
    string ts;
    string tsDOM;
    string d;
    this(string path, Json doc) {
        if ("manual" in doc) {
            string pathPrefix = path ~ dirSeparator;
            this.ts = (pathPrefix ~ doc["manual"]["ts"].to!string).readText;
            this.tsDOM = (pathPrefix ~ doc["manual"]["tsDOM"].to!string).readText;
            this.d = (pathPrefix ~ doc["manual"]["d"].to!string).readText;
        }
    }

    string emitTypeScript() {
        return ts;
    }

    string emitTypeScriptDOM() {
        return tsDOM;
    }

    string emitD() {
        return d;
    }
}

