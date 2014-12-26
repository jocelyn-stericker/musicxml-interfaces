/** 
 * Copyright (C) 2015 Josh Netterfield.
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

import code : PCode;
import emittable : PEmittable;
import enum_ : PEnum;
import header : PHeader;
import interface_ : PInterface;
import manualType : PManualType;
import range : PRange;
import scope_ : PScope;

import std.exception : enforce;
import std.file : File, readText;
import std.getopt : getopt;
import std.path : dirName, dirSeparator;
import std.stdio : writeln;
import vibejson.json : Json, parseJsonString;

void main(string[] args) {
    Arguments arguments = args;

    if (!arguments.isValid) {
        (args[0] ~ ": hacky tool for generating structures and XML parsing code in multiple languages.").writeln;
        ("Usage: " ~ args[0] ~ " --input <spec.json> [--help]").writeln;
        return;
    }

    auto spec   = arguments.input.readText.parseJsonString;
    auto scope_ = new PScope();

    auto output = new POutput(arguments.input.dirName, spec);

    output.writeSpec(new PHeader(spec));
    output.writeSpec(new PCode(arguments.input.dirName, spec));

    foreach(type; spec["types"]) {
        PEmittable emittable;
        if ("manualType" in type) {
            emittable = new PManualType(type, scope_);
        } else if ("enum" in type) {
            emittable = new PEnum(type, scope_);
        } else if ("range" in type) {
            emittable = new PRange(type, scope_);
        } else if ("interface" in type) {
            emittable = new PInterface(type, scope_);
        }

        enforce(emittable, new InvalidType(type));
        output.writeSpec(emittable);
    }

    "Boilerplate was successfully generated.".writeln;
}

class InvalidType : Throwable {
    this(Json type) {
        super(type.toString ~ "does not have a recognized type.");
    }
}

class MissingField : Throwable {
    this(string field, string parent) {
        super("Expected to find field " ~ field ~ " in parent object " ~ parent ~ ".");
    }
}

private struct Arguments {
    string input;
    bool help;

    this(string args[]) {
        args.getopt(
            "input", &input,
            "help", &help
        );
    }

    bool isValid() {
        return input && !help;
    }
}

private enum OutLanguage {
    D             = 0b001,
    TypeScript    = 0b010,
    TypeScriptDOM = 0b011
}

private class POutput {
    File[OutLanguage] files;

    this(string path, Json doc) {
        enforce("output" in doc, new MissingField("output", "root document"));
        enforce("ts" in doc["output"], new MissingField("ts", "output"));
        enforce("tsDOM" in doc["output"], new MissingField("tsDOM", "output"));
        enforce("d" in doc["output"], new MissingField("d", "output"));

        string pathPrefix = path ~ dirSeparator;
        this.files = [
            OutLanguage.TypeScript:     File(pathPrefix ~ doc["output"]["ts"].to!string, "w"),
            OutLanguage.TypeScriptDOM:  File(pathPrefix ~ doc["output"]["tsDOM"].to!string, "w"),
            OutLanguage.D:              File(pathPrefix ~ doc["output"]["d"].to!string, "w")
        ];
    }

    void writeSpec(PEmittable emittable) {
        foreach(language, ref file; files) {
            final switch(language) {
                case OutLanguage.D:
                    file.writeln(emittable.emitD());
                    break;
                case OutLanguage.TypeScript:
                    file.writeln(emittable.emitTypeScript());
                    break;
                case OutLanguage.TypeScriptDOM:
                    file.writeln(emittable.emitTypeScript());
                    file.writeln(emittable.emitTypeScriptDOM());
                    break;
            }
        }
    }
}
