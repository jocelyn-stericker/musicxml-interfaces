import types;
import vibejson.json;
import core.internal.hash;
import std.regex;
import std.string;

public Json measureToJson(Measure measure) {
    auto ret = Json.emptyObject;
    ret["number"] = measure.number_;
    ret["implicit"] = measure.implicit;
    ret["width"] = measure.width;
    ret["nonControlling"] = measure.nonControlling;
    Json jParts = Json.emptyArray;
    foreach (part; measure.parts) {
        Json jPart = Json.emptyArray;
        foreach(el; part) {
            auto type = el.type;
            if (type == typeid(Note)) {
                import note : serializeNoteToJson;
                jPart ~= el.get!Note.serializeNoteToJson;
                jPart[$-1]["type"] = "Note";
            }
            if (type == typeid(Backup)) {
                jPart ~= el.get!Backup.serializeToJson;
                jPart[$-1]["type"] = "Backup";
            }
            if (type == typeid(Forward)) {
                jPart ~= el.get!Forward.serializeToJson;
                jPart[$-1]["type"] = "Forward";
            }
            if (type == typeid(Direction)) {
                jPart ~= el.get!Direction.serializeToJson;
                jPart[$-1]["type"] = "Direction";
            }
            if (type == typeid(Attributes)) {
                jPart ~= el.get!Attributes.serializeToJson;
                jPart[$-1]["type"] = "Attributes";
            }
            if (type == typeid(Harmony)) {
                jPart ~= el.get!Harmony.serializeToJson;
                jPart[$-1]["type"] = "Harmony";
            }
            if (type == typeid(FiguredBass)) {
                jPart ~= el.get!FiguredBass.serializeToJson;
                jPart[$-1]["type"] = "FiguredBass";
            }
            if (type == typeid(Print)) {
                jPart ~= el.get!Print.serializeToJson;
                jPart[$-1]["type"] = "Print";
            }
            if (type == typeid(Sound)) {
                jPart ~= el.get!Sound.serializeToJson;
                jPart[$-1]["type"] = "Sound";
            }
            if (type == typeid(Barline)) {
                jPart ~= el.get!Barline.serializeToJson;
                jPart[$-1]["type"] = "Barline";
            }
            if (type == typeid(Grouping)) {
                jPart ~= el.get!Grouping.serializeToJson;
                jPart[$-1]["type"] = "Grouping";
            }
            if (type == typeid(string)) {
                jPart ~= Json.emptyObject;
                jPart[$-1]["id"] = el.get!string.serializeToJson;
                jPart[$-1]["type"] = "id";
            }
        }
        jParts ~= jPart;
    }
    ret["parts"] = jParts;
    return ret;
}
