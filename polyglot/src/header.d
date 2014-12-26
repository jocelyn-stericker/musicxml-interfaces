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
import std.string : replace;

class PHeader : PEmittable {
    string origFile;
    string copyright;
    string about;
    
    this(Json doc) {
        this.origFile = doc["file"].to!string;
        this.copyright = doc["copyright"].to!string;
        this.about = doc["about"].to!string;
    }

    string emitComment() {
        return "/**\n" ~
               " * Do not modify this automatically generated file!!!\n" ~
               " * \n" ~
               " * Generated from \"" ~ this.origFile ~ "\".\n" ~
               " * Portions copyright (C) 2015 Josh Netterfield.\n" ~ 
               " * Part of the ripieno-musicxml project to make MusicXML more accessible.\n" ~
               " * \n" ~
               " * " ~ this.copyright.replace("\n", "\n * ") ~ "\n" ~
               " * " ~ this.about.replace("\n", "\n * ") ~ "\n" ~
               " */\n";
    }

    string emitTypeScript() {
        return emitComment();
    }

    string emitTypeScriptDOM() {
        return "";
    }

    string emitD() {
        return emitComment() ~
            "import xml;\n" ~
            "import libxml2.tree;\n" ~
            "import std.exception;\n" ~
            "import std.stdio;\n" ~
            "import std.conv;\n" ~
            "import std.variant;\n";
    }
}
