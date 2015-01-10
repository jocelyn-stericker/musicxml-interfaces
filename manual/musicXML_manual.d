import vibejson.json;
import core.internal.hash;
import std.regex;
import std.string;

T popFront(T)(T t) {
    return t[1..$];
}

export string getString(T)(T p, bool required) {
    try {
        auto children = p.children;
        enforce(children, new NoElementFound);
        auto child = children.first!(xmlElementType.XML_TEXT_NODE);
        enforce(child && child.content, new NoElementFound);

        return child.content.toString.idup;
    } catch(NoElementFound nef) {
        enforce(!required, nef);
        return "";
    }
}

export float getNumber(T)(T p, bool required) {
    return getString(p, required).to!float;
}

auto ctr = ctRegex!(r"[- ](.)", "g");
R toCamelCase(R)(R s) {
    R camelHelper(Captures!(R) m) {
        return m.hit.length == 2 ? m.hit[1].toUpper.to!R : R.init;
    }
    R result = s.replaceAll!camelHelper(ctr).strip;
    return result.length ? result : "";
}

R ToPascalCase(R)(R s) {
    R camel = s.toCamelCase;
    if (camel.length) {
        return camel[0].toUpper.to!R ~ camel[1..$];
    }
    return R.init;
}


export class CalendarDate {
    mixin ICalendarDate;
    this(xmlNodePtr node) {
        string text = getString(node, true);
        if (text.length < 10) {
            return;
        }
        year = text[0..4].to!float;
        month = text[5..7].to!float;
        day = text[8..10].to!float;
    }
}

class AccOrText {
    AccidentalText acc;
    DisplayText text;
    bool isAcc;
}

alias TextArray = AccOrText[];
alias EncodingDate = CalendarDate;

export class NoteheadText {
    mixin INoteheadText;
    this(xmlNodePtr node) {
        auto ch = node;
        // TODO
        // text = TextArray(ch);   
    }
}

export class PartNameDisplay {
    mixin INoteheadText;
    this(xmlNodePtr node) {
        auto ch = node;
        // TODO
        // text = TextArray(ch);   
    }
}

export class PartAbbreviationDisplay {
    mixin INoteheadText;
    this(xmlNodePtr node) {
        auto ch = node;
        // TODO
        // text = TextArray(ch);   
    }
}

export class Measure {
    mixin IMeasure;
    this(xmlNodePtr node) {
        for (auto ch = node.children.firstElement; ch; ch = ch.nextElement) {
             if (ch.name.toString == "part") {
                 // Note: assumes valid document, and so first and only property is id.
                 parts[getString(ch.properties, true)] ~= Part(ch) ;
             }
        }
        bool foundImplicit = false;
        bool foundNonControlling = false;
        for (auto ch = node.properties; ch; ch = ch.next) {
             if (ch.name.toString == "number") {
                 number_ = getString(ch, true);
             }
             if (ch.name.toString == "implicit") {
                 implicit = getYesNo(ch, true);
                 foundImplicit = true;
             }
             if (ch.name.toString == "width") {
                 width = getNumber(ch, true);
             }
             if (ch.name.toString == "non-controlling") {
                 nonControlling = getYesNo(ch, true);
                 foundNonControlling = true;
             }
        }
        if (!foundImplicit) {
            implicit = false;
        }
        if (!foundNonControlling) {
            nonControlling = false;
        }
    }
    Json toJson() {
        import measureToJson : measureToJson;
        return measureToJson(this);
    }
    static Measure fromJson(Json t) {
        assert(false, "Not implemented");
    }
}

/**
 * The yes-no entity is used for boolean-like attributes.
 */
alias YesNo = bool;

bool getYesNo(T)(T p, bool required) {
    string s = getString(p, true);
    if (s == "no") {
        return false;
    }
    if (s == "yes") {
        return true;
    }
    assert(!required, "Not reached");
    return false;
}

export class Lyric {
    mixin ILyric;
    this(xmlNodePtr node) {
        for (auto ch = node.children.firstElement; ch; ch = ch.nextElement) {
            if (ch.name.toString == "footnote") {
                footnote = new Footnote(ch);
            }
            if (ch.name.toString == "level") {
                level = new Level(ch);
            }
        }
        lyricParts = LyricParts(node);
        bool foundNumber_ = false;
        bool foundJustify = false;
        bool foundDefaultX = false;
        bool foundRelativeY = false;
        bool foundDefaultY = false;
        bool foundRelativeX = false;
        bool foundPlacement = false;
        bool foundColor = false;
        bool foundPrintObject = false;
        bool foundName = false;
        for (auto ch = node.properties; ch; ch = ch.next) {
            if (ch.name.toString == "number") {
                number_ = getNumber(ch, true);
                foundNumber_ = true;
            }
            if (ch.name.toString == "justify") {
                justify = getLeftCenterRight(ch);
                foundJustify = true;
            }
            if (ch.name.toString == "default-x") {
                defaultX = getNumber(ch, true);
                foundDefaultX = true;
            }
            if (ch.name.toString == "relative-y") {
                relativeY = getNumber(ch, true);
                foundRelativeY = true;
            }
            if (ch.name.toString == "default-y") {
                defaultY = getNumber(ch, true);
                foundDefaultY = true;
            }
            if (ch.name.toString == "relative-x") {
                relativeX = getNumber(ch, true);
                foundRelativeX = true;
            }
            if (ch.name.toString == "placement") {
                placement = getAboveBelow(ch);
                foundPlacement = true;
            }
            if (ch.name.toString == "color") {
                color = getString(ch, true);
                foundColor = true;
            }
            if (ch.name.toString == "print-object") {
                printObject = getYesNo(ch, true) ;
                foundPrintObject = true;
            }
            if (ch.name.toString == "name") {
                name = getString(ch, true);
                foundName = true;
            }
        }
        if (!foundNumber_) {
            number_ = 1;
        }
        if (!foundJustify) {
            justify = LeftCenterRight.Left;
        }
        if (!foundDefaultX) {
            defaultX = real.nan;
        }
        if (!foundRelativeY) {
            relativeY = 0;
        }
        if (!foundDefaultY) {
            defaultY = real.nan;
        }
        if (!foundRelativeX) {
            relativeX = 0;
        }
        if (!foundPlacement) {
            placement = AboveBelow.Unspecified;
        }
        if (!foundColor) {
            color = "#000000";
        }
        if (!foundPrintObject) {
            printObject = true;
        }
        if (!foundName) {
            name = "";
        }
    }
    Json toJson() {
        import measureToJson : lyricToJson;
        return lyricToJson(this);
    }
    static Lyric fromJson(Json t) {
        assert(false, "Not implemented");
    }
}
