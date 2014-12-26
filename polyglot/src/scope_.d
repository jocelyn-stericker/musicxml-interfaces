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

export struct PField {
    string name;
    string xmlName;
    bool isFlag;
    bool isEnum;
    bool isVA;
    string operation;
    bool required;
    string tsType;
    string dType;
    string dTypeSingular;
    string defaultVal;
    string defaultValTS;
}

export class PScope {
    PField[][string] attributes;
    PField[][string] children;
    PField[][string] childTags;

    bool isRange[string];
    bool isString[string];
    bool isEnum[string];
    bool isVA[string];

    bool isShallow[string];
    string subtypes[string][string];

    this() {
        this.isRange["Number"] = true;
    }
}
