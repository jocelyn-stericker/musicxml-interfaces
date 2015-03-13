import musicXML;
import vibejson.json;
import core.internal.hash;
import std.regex;
import std.string;

export Json measureToJson(Measure measure) {
    auto ret = Json.emptyObject;
    ret["number_"] = measure.number_;
    ret["implicit"] = measure.implicit;
    ret["width"] = measure.width;
    ret["nonControlling"] = measure.nonControlling;
    Json jParts = Json.emptyObject;
    foreach (partId, part; measure.parts) {
        Json jPart = Json.emptyArray;
        foreach(el; part) {
            auto type = el.type;
            if (type == typeid(Note)) {
                import note : serializeNoteToJson;
                jPart ~= el.get!Note.serializeNoteToJson;
                jPart[$-1]["_class"] = "Note";
            }
            if (type == typeid(Backup)) {
                jPart ~= el.get!Backup.serializeToJson;
                jPart[$-1]["_class"] = "Backup";
            }
            if (type == typeid(Forward)) {
                jPart ~= el.get!Forward.serializeToJson;
                jPart[$-1]["_class"] = "Forward";
            }
            if (type == typeid(Direction)) {
                jPart ~= el.get!Direction.serializeToJson;
                jPart[$-1]["_class"] = "Direction";
            }
            if (type == typeid(Attributes)) {
                jPart ~= el.get!Attributes.serializeToJson;
                jPart[$-1]["_class"] = "Attributes";
            }
            if (type == typeid(Harmony)) {
                jPart ~= el.get!Harmony.serializeToJson;
                jPart[$-1]["_class"] = "Harmony";
            }
            if (type == typeid(FiguredBass)) {
                jPart ~= el.get!FiguredBass.serializeToJson;
                jPart[$-1]["_class"] = "FiguredBass";
            }
            if (type == typeid(Print)) {
                jPart ~= el.get!Print.serializeToJson;
                jPart[$-1]["_class"] = "Print";
            }
            if (type == typeid(Sound)) {
                jPart ~= el.get!Sound.serializeToJson;
                jPart[$-1]["_class"] = "Sound";
            }
            if (type == typeid(Barline)) {
                jPart ~= el.get!Barline.serializeToJson;
                jPart[$-1]["_class"] = "Barline";
            }
            if (type == typeid(Grouping)) {
                jPart ~= el.get!Grouping.serializeToJson;
                jPart[$-1]["_class"] = "Grouping";
            }
            if (type == typeid(string)) {
                jPart ~= Json.emptyObject;
                jPart[$-1]["id"] = el.get!string.serializeToJson;
                jPart[$-1]["_class"] = "id";
            }
        }
        jParts[partId] = jPart;
    }
    ret["parts"] = jParts;
    return ret;
}

export Json lyricToJson(Lyric lyric) {
    auto ret = Json.emptyObject;

    ret["footnote"] = lyric.footnote.serializeToJson;
    ret["level"] = lyric.level.serializeToJson;
    ret["number_"] = lyric.number_;
    ret["justify"] = lyric.justify;
    ret["defaultX"] = lyric.defaultX;
    ret["relativeY"] = lyric.relativeY;
    ret["defaultY"] = lyric.defaultY;
    ret["relativeX"] = lyric.relativeX;
    ret["placement"] = lyric.placement;
    ret["color"] = lyric.color;
    ret["printObject"] = lyric.printObject;
    ret["name"] = lyric.name;

    Json jParts = Json.emptyArray;
    foreach (el; lyric.lyricParts) {
        auto type = el.type;
        if (type == typeid(Extend)) {
            jParts ~= el.get!Extend.serializeToJson;
            jParts[$-1]["_class"] = "Extend";
        }
        if (type == typeid(EndLine)) {
            jParts ~= el.get!EndLine.serializeToJson;
            jParts[$-1]["_class"] = "EndLine";
        }
        if (type == typeid(Syllabic)) {
            jParts ~= el.get!Syllabic.serializeToJson;
            jParts[$-1]["_class"] = "Syllabic";
        }
        if (type == typeid(Text)) {
            jParts ~= el.get!Text.serializeToJson;
            jParts[$-1]["_class"] = "Text";
        }
        if (type == typeid(Laughing)) {
            jParts ~= el.get!Laughing.serializeToJson;
            jParts[$-1]["_class"] = "Laughing";
        }
        if (type == typeid(Humming)) {
            jParts ~= el.get!Humming.serializeToJson;
            jParts[$-1]["_class"] = "Humming";
        }
        if (type == typeid(EndParagraph)) {
            jParts ~= el.get!EndParagraph.serializeToJson;
            jParts[$-1]["_class"] = "EndParagraph";
        }
        if (type == typeid(Elision)) {
            jParts ~= el.get!Elision.serializeToJson;
            jParts[$-1]["_class"] = "Elision";
        }
    }
    ret["lyricParts"] = jParts;
    return ret;
}
