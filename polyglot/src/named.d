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

/**
 * An emittable object that has a Pascal name.
 */
mixin template PNamed() {
    import emittable : toPascalCase;

    import std.conv : to;
    import vibejson.json : Json;

    string name;
    void initName(Json type) {
        bool isEntity = !!("entity" in type);
        string name = (isEntity ? type["entity"] : type["element"]).to!string;

        if ("name" in type) {
            this.name = type["name"].to!string;
        } else {
            this.name = name.toPascalCase;
        }
    }
}

