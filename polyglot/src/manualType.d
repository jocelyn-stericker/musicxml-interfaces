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

/**
 * Type that is implemented manually for each language.
 *
 * Doesn't emit anything but a docstring. Instead, it should be added to the native "code" object.
 */
extern class PManualType : PEmittable {
    mixin PNamed;
    mixin PDocstring;

    this(Json type, PScope scope_) {
        this.initName(type);
        this.initDocstring(type);

        if (type["manualType"] == "enum") {
            scope_.isEnum[this.name] = true;
        }
    }
    
    string emitTypeScript() {
        return emitDocstring();
    }

    string emitTypeScriptDOM() {
        return emitDocstring();
    }

    string emitD() {
        return emitDocstring();
    }
}

