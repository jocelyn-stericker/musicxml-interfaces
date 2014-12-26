/**
 * @file Handles the loading and representation of MusicXML scores
 * 
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
module score;

import xml;
import musicXML;

import libxml2.tree;
import std.conv;
import std.exception;
import std.stdio;
import vibejson.json;

export struct Score {
    @disable this();
    private musicXML.ScoreTimewise _score;

    this(string musicXml, string filename = "import.xml") {
        auto doc = musicXml.toDocument(filename).toTimewise();
        scope(exit) { doc.xmlFreeDoc(); }
        enforce(doc, new NotMusicXml("Failed DTD validation"));
        // Now that we've passed DTD validation, we should no longer throw exceptions.
        // Any errors we make now are our own.

        _score = new musicXML.ScoreTimewise(doc.xmlDocGetRootElement);
    }
    ScoreTimewise representation() {
        return _score;
    }
    // There's no toJson method because this isn't compatibile with external Json libraries. 
    string toJsonString() {
        return _score.serializeToJson.toPrettyString;
    }
}

unittest {
    string simplePartwise = import("helloWorldPartwise.xml");
    Score score = simplePartwise;
    score.toJsonString.writeln;
}

unittest {
    string simplePartwise = import("generic1.xml");
    Score score = simplePartwise;
    score.toJsonString.writeln;
}
