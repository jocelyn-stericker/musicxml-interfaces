import types;
import vibejson.json;
import core.internal.hash;
import std.regex;
import std.string;

public Json serializeNoteToJson(Note n) {
    return n.serializeToJson;
}
