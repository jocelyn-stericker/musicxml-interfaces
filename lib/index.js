/**
 * (C) Jocelyn Stericker <jocelyn@nettek.ca> 2015.
 * Part of the musicxml-interfaces <https://github.com/emilyskidsister/musicxml-interfaces>.
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
 *
 *****************************************************************
 *
 * MusicXML™ Version 3.0
 *
 * Copyright © 2004-2011 MakeMusic, Inc.
 * http://www.makemusic.com/
 *
 * This MusicXML™ work is being provided by the copyright
 * holder under the MusicXML Public License Version 3.0,
 * available from:
 *
 * http://www.musicxml.org/dtds/license.html
 * This file contains multiple DTDs.
 */
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopMiddleBottomBaseline = exports.LeftCenterRight = exports.NormalBold = exports.NormalItalic = exports.EnclosureShape = exports.LeftRight = exports.TopBottom = exports.UpDown = exports.OverUnder = exports.AboveBelow = exports.SymbolSize = exports.StartStopSingle = exports.StartStopContinue = exports.StartStop = exports.serializeGrouping = exports.serializeBarline = exports.serializeSound = exports.serializeAttributes = exports.serializeDirection = exports.serializeFiguredBass = exports.serializePrint = exports.serializeForward = exports.serializeHarmony = exports.serializeBackup = exports.serializePartSymbol = exports.serializeKey = exports.serializeTime = exports.serializeClef = exports.serializeNote = exports.serializeMeasure = exports.serializeScoreHeader = exports.serializeScore = exports.parseGrouping = exports.parseBarline = exports.parseSound = exports.parseAttributes = exports.parseDirection = exports.parseFiguredBass = exports.parsePrint = exports.parseForward = exports.parseHarmony = exports.parseBackup = exports.parsePartSymbol = exports.parseKey = exports.parseTime = exports.parseClef = exports.parseNote = exports.parseMeasure = exports.paseScoreHeader = exports.parseScore = void 0;
exports.ChordType = exports.ExplicitImpliedAlternate = exports.VoiceSymbol = exports.OctaveShiftType = exports.PedalType = exports.LineEndType = exports.WedgeType = exports.TipDirection = exports.DirectionTypeBg = exports.WingedType = exports.StartStopDiscontinue = exports.BarStyleType = exports.BarlineLocation = exports.SyllabicType = exports.BreathMarkType = exports.HoleClosedType = exports.HoleLocation = exports.ActualBothNone = exports.AccelRitNone = exports.BeamType = exports.NoteheadType = exports.StemType = exports.MxmlAccidental = exports.Count = exports.ShowFretsType = exports.PartSymbolType = exports.CancelLocation = exports.TimeSymbolType = exports.SeparatorType = exports.CueGraceLarge = exports.OddEvenBoth = exports.WholeHalfNone = exports.WholeHalfUnison = exports.UpperMainBelow = exports.UprightInverted = exports.NormalAngledSquare = exports.SolidDashedDottedWavy = exports.StraightCurved = exports.DirectionMode = void 0;
/*---- Parsing API ------------------------------------------------------------------------------*/
/**
 * Converts a MusicXML document into a MusicXML parttime-inspired JSON object.
 * See ScoreTimewise for full return type specification.
 *
 * This function will accept timepart MusicXML files, but will still return a
 * structure similar to parttime.
 */
function parseScore(score) {
    var dom = xmlToParttimeDoc(score);
    return xmlToScoreTimewise(dom.documentElement);
}
exports.parseScore = parseScore;
/**
 * Reads a document, and returns header information.
 *
 * ScoreHeader is a subset of ScoreTimewise, so you can always just call MusicXML.parse.score.
 * This function is a bit faster though, if you only care about metadata.
 */
function paseScoreHeader(score) {
    return xmlToScoreHeader(xmlToDoc(score).documentElement);
}
exports.paseScoreHeader = paseScoreHeader;
/**
 * Converts a MusicXML <measure /> from a **parttime** document into JSON.
 */
function parseMeasure(str) {
    return xmlToMeasure(xmlToDoc(str).documentElement);
}
exports.parseMeasure = parseMeasure;
/**
 * Converts a MusicXML <note /> into JSON.
 */
function parseNote(str) {
    return xmlToNote(xmlToDoc(str).documentElement);
}
exports.parseNote = parseNote;
/**
 * Converts a MusicXML <clef /> into JSON.
 */
function parseClef(str) {
    return xmlToClef(xmlToDoc(str).documentElement);
}
exports.parseClef = parseClef;
/**
 * Converts a MusicXML <time /> into JSON.
 */
function parseTime(str) {
    return xmlToTime(xmlToDoc(str).documentElement);
}
exports.parseTime = parseTime;
/**
 * Converts a MusicXML <key /> into JSON.
 */
function parseKey(str) {
    return xmlToKey(xmlToDoc(str).documentElement);
}
exports.parseKey = parseKey;
/**
 * Converts a MusicXML <part-symbol /> into JSON.
 */
function parsePartSymbol(str) {
    return xmlToPartSymbol(xmlToDoc(str).documentElement);
}
exports.parsePartSymbol = parsePartSymbol;
/**
 * Converts a MusicXML <backup /> into JSON.
 */
function parseBackup(str) {
    return xmlToBackup(xmlToDoc(str).documentElement);
}
exports.parseBackup = parseBackup;
/**
 * Converts a MusicXML <harmony /> into JSON.
 */
function parseHarmony(str) {
    return xmlToHarmony(xmlToDoc(str).documentElement);
}
exports.parseHarmony = parseHarmony;
/**
 * Converts a MusicXML <forward /> into JSON.
 */
function parseForward(str) {
    return xmlToForward(xmlToDoc(str).documentElement);
}
exports.parseForward = parseForward;
/**
 * Converts a MusicXML <print /> into JSON.
 */
function parsePrint(str) {
    return xmlToPrint(xmlToDoc(str).documentElement);
}
exports.parsePrint = parsePrint;
/**
 * Converts a MusicXML <figured-bass /> into JSON.
 */
function parseFiguredBass(str) {
    return xmlToFiguredBass(xmlToDoc(str).documentElement);
}
exports.parseFiguredBass = parseFiguredBass;
/**
 * Converts a MusicXML <direction /> into JSON.
 */
function parseDirection(str) {
    return xmlToDirection(xmlToDoc(str).documentElement);
}
exports.parseDirection = parseDirection;
/**
 * Converts a MusicXML <attributes /> object into JSON.
 */
function parseAttributes(str) {
    return xmlToAttributes(xmlToDoc(str).documentElement);
}
exports.parseAttributes = parseAttributes;
/**
 * Converts a MusicXML <sound /> into JSON.
 */
function parseSound(str) {
    return xmlToSound(xmlToDoc(str).documentElement);
}
exports.parseSound = parseSound;
/**
 * Converts a MusicXML <barline /> into JSON.
 */
function parseBarline(str) {
    return xmlToBarline(xmlToDoc(str).documentElement);
}
exports.parseBarline = parseBarline;
/**
 * Converts a MusicXML <grouping /> into JSON.
 */
function parseGrouping(str) {
    return xmlToGrouping(xmlToDoc(str).documentElement);
}
exports.parseGrouping = parseGrouping;
/*---- Serialization API ------------------------------------------------------------------------*/
function serializeScore(score, parttime) {
    if (parttime === void 0) { parttime = false; }
    var timewise = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE score-timewise\n  PUBLIC \"-//Recordare//DTD MusicXML 3.0 Timewise//EN\" \"http://www.musicxml.org/dtds/timewise.dtd\">\n<score-timewise version=\"3.0\">\n".concat(scoreHeaderToXML(score)
        .join("\n")
        .split("\n")
        .map(function (line) { return "  " + line; })
        .join("\n"), "\n").concat(score.measures
        .map(function (measure) { return measureToXML(measure); })
        .join("\n")
        .split("\n")
        .map(function (line) { return "  " + line; })
        .join("\n"), "\n</score-timewise>");
    if (!parttime) {
        return timewise;
    }
    return timewiseToPartwise(timewise);
}
exports.serializeScore = serializeScore;
function serializeScoreHeader(scoreHeader) {
    return scoreHeaderToXML(scoreHeader).join("\n");
}
exports.serializeScoreHeader = serializeScoreHeader;
exports.serializeMeasure = measureToXML;
exports.serializeNote = noteToXML;
exports.serializeClef = clefToXML;
exports.serializeTime = timeToXML;
exports.serializeKey = keyToXML;
exports.serializePartSymbol = (partSymbolToXML);
exports.serializeBackup = backupToXML;
exports.serializeHarmony = harmonyToXML;
exports.serializeForward = forwardToXML;
exports.serializePrint = printToXML;
exports.serializeFiguredBass = (figuredBassToXML);
exports.serializeDirection = (directionToXML);
exports.serializeAttributes = (attributesToXML);
exports.serializeSound = soundToXML;
exports.serializeBarline = barlineToXML;
exports.serializeGrouping = groupingToXML;
var process;
var isIE = typeof window !== "undefined" && "ActiveXObject" in window;
var isNode = typeof window === "undefined" ||
    (typeof process !== "undefined" && !process.browser);
var xmlToParttimeDoc;
var timewiseToPartwise;
var xmlToDoc;
(function init() {
    var parttimeXSLBuffer = '<?xml version="1.0" encoding="UTF-8"?> <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="no" standalone="no" doctype-system="http://www.musicxml.org/dtds/timewise.dtd" doctype-public="-//Recordare//DTD MusicXML 3.0 Timewise//EN" /> <xsl:template match="/"> <xsl:apply-templates select="./score-partwise"/> <xsl:apply-templates select="./score-timewise"/> </xsl:template> <xsl:template match="score-timewise"> <xsl:copy-of select="." /> </xsl:template> <xsl:template match="text()"> <xsl:value-of select="." /> </xsl:template> <xsl:template match="*|@*|comment()|processing-instruction()"> <xsl:copy><xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()" /></xsl:copy> </xsl:template> <xsl:template match="score-partwise"> <xsl:element name="score-timewise"> <xsl:apply-templates select="@version[.!=\'1.0\']"/> <xsl:apply-templates select="work"/> <xsl:apply-templates select="movement-number"/> <xsl:apply-templates select="movement-title"/> <xsl:apply-templates select="identification"/> <xsl:apply-templates select="defaults"/> <xsl:apply-templates select="credit"/> <xsl:apply-templates select="part-list"/> <xsl:for-each select="part[1]/measure"> <xsl:variable name="measure-number"> <xsl:value-of select="@number"/> </xsl:variable> <xsl:element name="measure"> <xsl:attribute name="number"> <xsl:value-of select="$measure-number"/> </xsl:attribute> <xsl:if test="@implicit[. = \'yes\']"> <xsl:attribute name="implicit"> <xsl:value-of select="@implicit"/> </xsl:attribute> </xsl:if> <xsl:if test="@non-controlling[. = \'yes\']"> <xsl:attribute name="non-controlling"> <xsl:value-of select="@non-controlling"/> </xsl:attribute> </xsl:if> <xsl:if test="@width"> <xsl:attribute name="width"> <xsl:value-of select="@width"/> </xsl:attribute> </xsl:if> <xsl:for-each select="../../part/measure"> <xsl:if test="@number=$measure-number"> <xsl:element name="part"> <xsl:attribute name="id"> <xsl:value-of select="parent::part/@id"/> </xsl:attribute> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>';
    var timepartXSLBuffer = '<?xml version="1.0" encoding="UTF-8"?> <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="no" standalone="no" doctype-system="http://www.musicxml.org/dtds/partwise.dtd" doctype-public="-//Recordare//DTD MusicXML 3.0 Partwise//EN" /> <xsl:template match="/"> <xsl:apply-templates select="./score-partwise"/> <xsl:apply-templates select="./score-timewise"/> </xsl:template> <xsl:template match="score-partwise"> <xsl:copy-of select="." /> </xsl:template> <xsl:template match="text()"> <xsl:value-of select="." /> </xsl:template> <xsl:template match="*|@*|comment()|processing-instruction()"> <xsl:copy><xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()" /></xsl:copy> </xsl:template> <xsl:template match="score-timewise"> <xsl:element name="score-partwise"> <xsl:apply-templates select="@version[.!=\'1.0\']"/> <xsl:apply-templates select="work"/> <xsl:apply-templates select="movement-number"/> <xsl:apply-templates select="movement-title"/> <xsl:apply-templates select="identification"/> <xsl:apply-templates select="defaults"/> <xsl:apply-templates select="credit"/> <xsl:apply-templates select="part-list"/> <xsl:for-each select="measure[1]/part"> <xsl:variable name="part-id"> <xsl:value-of select="@id"/> </xsl:variable> <xsl:element name="part"> <xsl:copy-of select="@id" /> <xsl:for-each select="../../measure/part"> <xsl:if test="@id=$part-id"> <xsl:element name="measure"> <xsl:attribute name="number"> <xsl:value-of select="parent::measure/@number"/> </xsl:attribute> <xsl:if test="parent::measure/@implicit[. = \'yes\']"> <xsl:attribute name="implicit"> <xsl:value-of select="parent::measure/@implicit"/> </xsl:attribute> </xsl:if> <xsl:if test="parent::measure/@non-controlling[. = \'yes\']"> <xsl:attribute name="non-controlling"> <xsl:value-of select="parent::measure/@non-controlling"/> </xsl:attribute> </xsl:if> <xsl:if test="parent::measure/@width"> <xsl:attribute name="width"> <xsl:value-of select="parent::measure/@width"/> </xsl:attribute> </xsl:if> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>';
    if (isIE) {
        var DOMParser = window.DOMParser;
        xmlToDoc = function (str) {
            return new DOMParser().parseFromString(str, "text/xml");
        };
        xmlToParttimeDoc = function (str) {
            var xslt = new ActiveXObject("Msxml2.XSLTemplate");
            var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
            var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
            // Why these aren't set by default completely flabbergasts me.
            xmlDoc.validateOnParse = false;
            xslDoc.validateOnParse = false;
            xmlDoc.resolveExternals = false;
            xslDoc.resolveExternals = false;
            xmlDoc.loadXML(str);
            xslDoc.loadXML(parttimeXSLBuffer);
            xslt.stylesheet = xslDoc;
            var xslProc = xslt.createProcessor();
            xslProc.input = xmlDoc;
            xslProc.transform();
            return xmlToDoc(xslProc.output);
        };
        timewiseToPartwise = function (str) {
            var xslt = new ActiveXObject("Msxml2.XSLTemplate");
            var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
            var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
            // Why these aren't set by default completely flabbergasts me.
            xmlDoc.validateOnParse = false;
            xslDoc.validateOnParse = false;
            xmlDoc.resolveExternals = false;
            xslDoc.resolveExternals = false;
            xmlDoc.loadXML(str);
            xslDoc.loadXML(timepartXSLBuffer);
            xslt.stylesheet = xslDoc;
            var xslProc = xslt.createProcessor();
            xslProc.input = xmlDoc;
            xslProc.transform();
            return xslProc.output;
        };
    }
    else if (isNode) {
        var DOMParser = require("@xmldom/xmldom").DOMParser;
        var spawnSync_1 = require("child_process").spawnSync;
        var path_1 = require("path");
        xmlToDoc = function (str) {
            return new DOMParser().parseFromString(str, "text/xml");
        };
        xmlToParttimeDoc = function (str) {
            var res = spawnSync_1("xsltproc", [
                "--nonet",
                path_1.join(__dirname, "..", "vendor", "musicxml-dtd", "parttime.xsl"),
                "-",
            ], {
                input: str,
                env: {
                    XML_CATALOG_FILES: path_1.join(__dirname, "..", "vendor", "musicxml-dtd", "catalog.xml"),
                },
            });
            if (res.error) {
                throw res.error;
            }
            return xmlToDoc(res.stdout.toString());
        };
        timewiseToPartwise = function (str) {
            var res = spawnSync_1("xsltproc", [
                "--nonet",
                path_1.join(__dirname, "..", "vendor", "musicxml-dtd", "parttime.xsl"),
                "-",
            ], {
                input: str,
                env: {
                    XML_CATALOG_FILES: path_1.join(__dirname, "..", "vendor", "musicxml-dtd", "catalog.xml"),
                },
            });
            if (res.error) {
                throw res.error;
            }
            return res.stdout.toString();
        };
    }
    else {
        var DOMParser = window.DOMParser;
        var parttimeXSLDoc = new DOMParser().parseFromString(parttimeXSLBuffer, "text/xml");
        var timepartXSLDoc = new DOMParser().parseFromString(timepartXSLBuffer, "text/xml");
        var parttimeXSLProcessor_1 = new XSLTProcessor();
        parttimeXSLProcessor_1.importStylesheet(parttimeXSLDoc);
        var timepartXSLProcessor_1 = new XSLTProcessor();
        timepartXSLProcessor_1.importStylesheet(timepartXSLDoc);
        xmlToDoc = function (str) {
            return new DOMParser().parseFromString(str, "text/xml");
        };
        xmlToParttimeDoc = function (str) {
            var dom = new DOMParser().parseFromString(str, "text/xml");
            return parttimeXSLProcessor_1.transformToDocument(dom);
        };
        timewiseToPartwise = function (str) {
            var dom = new DOMParser().parseFromString(str, "text/xml");
            return new XMLSerializer().serializeToString(timepartXSLProcessor_1.transformToDocument(dom).documentElement);
        };
    }
})();
function popFront(t) {
    return t.slice(1);
}
function getString(ch, required) {
    return (ch.nodeType === ch.ATTRIBUTE_NODE ? ch.value : ch.textContent).trim();
}
function getNumber(ch, required) {
    var s = getString(ch, required);
    if (s.toLowerCase().indexOf("0x") === 0) {
        return parseInt(s, 16);
    }
    else {
        return parseFloat(s);
    }
}
function toCamelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
/**
 * The start-stop entity is used for musical elements that
 * can either start or stop, such as slurs, tuplets, and
 * wedges.
 *
 * See also start-stop-continue and start-stop-single.
 *
 * The values of start and stop refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStop;
(function (StartStop) {
    StartStop[StartStop["Start"] = 0] = "Start";
    StartStop[StartStop["Stop"] = 1] = "Stop";
})(StartStop = exports.StartStop || (exports.StartStop = {}));
/**
 * The start-stop-continue (as opposed to the start-stop entity)
 * entity is used when there is a need to refer to an
 * intermediate point in the symbol, as for complex slurs
 * or for specifying formatting of symbols across system
 * breaks.
 *
 * The values of start, stop, and continue refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStopContinue;
(function (StartStopContinue) {
    StartStopContinue[StartStopContinue["Start"] = 0] = "Start";
    StartStopContinue[StartStopContinue["Stop"] = 1] = "Stop";
    StartStopContinue[StartStopContinue["Continue"] = 2] = "Continue";
})(StartStopContinue = exports.StartStopContinue || (exports.StartStopContinue = {}));
/**
 * The start-stop-single entity (as opposed to start-stop
 * and start-stop-continue) is used when the same
 * element is used for multi-note and single-note notations,
 * as for tremolos.
 *
 * The values of start and stop refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStopSingle;
(function (StartStopSingle) {
    StartStopSingle[StartStopSingle["Single"] = 3] = "Single";
    StartStopSingle[StartStopSingle["Start"] = 0] = "Start";
    StartStopSingle[StartStopSingle["Stop"] = 1] = "Stop";
})(StartStopSingle = exports.StartStopSingle || (exports.StartStopSingle = {}));
/**
 * The symbol-size entity is used to indicate full vs.
 * cue-sized vs. oversized symbols. The large value
 * for oversized symbols was added in version 1.1.
 */
var SymbolSize;
(function (SymbolSize) {
    /**
     * Context-dependant.
     */
    SymbolSize[SymbolSize["Unspecified"] = 0] = "Unspecified";
    SymbolSize[SymbolSize["Full"] = 1] = "Full";
    SymbolSize[SymbolSize["Cue"] = 2] = "Cue";
    /**
     * Oversized.
     */
    SymbolSize[SymbolSize["Large"] = 3] = "Large";
})(SymbolSize = exports.SymbolSize || (exports.SymbolSize = {}));
/**
 * The above-below type is used to indicate whether one
 * element appears above or below another element.
 */
var AboveBelow;
(function (AboveBelow) {
    AboveBelow[AboveBelow["Above"] = 1] = "Above";
    AboveBelow[AboveBelow["Below"] = 2] = "Below";
    AboveBelow[AboveBelow["Unspecified"] = 0] = "Unspecified";
})(AboveBelow = exports.AboveBelow || (exports.AboveBelow = {}));
/**
 * Specifies orientation.
 */
var OverUnder;
(function (OverUnder) {
    OverUnder[OverUnder["Over"] = 1] = "Over";
    OverUnder[OverUnder["Under"] = 2] = "Under";
    OverUnder[OverUnder["Unspecified"] = 0] = "Unspecified";
})(OverUnder = exports.OverUnder || (exports.OverUnder = {}));
/**
 * The up-down entity is used for arrow direction,
 * indicating which way the tip is pointing.
 */
var UpDown;
(function (UpDown) {
    UpDown[UpDown["Down"] = 1] = "Down";
    UpDown[UpDown["Up"] = 0] = "Up";
})(UpDown = exports.UpDown || (exports.UpDown = {}));
/**
 * The top-bottom entity is used to indicate the top or
 * bottom part of a vertical shape like non-arpeggiate.
 */
var TopBottom;
(function (TopBottom) {
    TopBottom[TopBottom["Top"] = 0] = "Top";
    TopBottom[TopBottom["Bottom"] = 1] = "Bottom";
})(TopBottom = exports.TopBottom || (exports.TopBottom = {}));
/**
 * The left-right entity is used to indicate whether one
 * element appears to the left or the right of another
 * element.
 */
var LeftRight;
(function (LeftRight) {
    LeftRight[LeftRight["Right"] = 1] = "Right";
    LeftRight[LeftRight["Left"] = 0] = "Left";
})(LeftRight = exports.LeftRight || (exports.LeftRight = {}));
/**
 * The enclosure-shape entity describes the shape and
 * presence / absence of an enclosure around text. A bracket
 * enclosure is similar to a rectangle with the bottom line
 * missing, as is common in jazz notation.
 */
var EnclosureShape;
(function (EnclosureShape) {
    EnclosureShape[EnclosureShape["Circle"] = 3] = "Circle";
    EnclosureShape[EnclosureShape["Bracket"] = 4] = "Bracket";
    EnclosureShape[EnclosureShape["Triangle"] = 5] = "Triangle";
    EnclosureShape[EnclosureShape["Diamond"] = 6] = "Diamond";
    EnclosureShape[EnclosureShape["None"] = 7] = "None";
    EnclosureShape[EnclosureShape["Square"] = 1] = "Square";
    EnclosureShape[EnclosureShape["Oval"] = 2] = "Oval";
    EnclosureShape[EnclosureShape["Rectangle"] = 0] = "Rectangle";
})(EnclosureShape = exports.EnclosureShape || (exports.EnclosureShape = {}));
var NormalItalic;
(function (NormalItalic) {
    NormalItalic[NormalItalic["Italic"] = 1] = "Italic";
    NormalItalic[NormalItalic["Normal"] = 0] = "Normal";
})(NormalItalic = exports.NormalItalic || (exports.NormalItalic = {}));
var NormalBold;
(function (NormalBold) {
    NormalBold[NormalBold["Bold"] = 2] = "Bold";
    NormalBold[NormalBold["Normal"] = 0] = "Normal";
})(NormalBold = exports.NormalBold || (exports.NormalBold = {}));
var LeftCenterRight;
(function (LeftCenterRight) {
    LeftCenterRight[LeftCenterRight["Right"] = 1] = "Right";
    LeftCenterRight[LeftCenterRight["Center"] = 2] = "Center";
    LeftCenterRight[LeftCenterRight["Left"] = 0] = "Left";
})(LeftCenterRight = exports.LeftCenterRight || (exports.LeftCenterRight = {}));
var TopMiddleBottomBaseline;
(function (TopMiddleBottomBaseline) {
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Top"] = 0] = "Top";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Middle"] = 1] = "Middle";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Baseline"] = 3] = "Baseline";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Bottom"] = 2] = "Bottom";
})(TopMiddleBottomBaseline = exports.TopMiddleBottomBaseline || (exports.TopMiddleBottomBaseline = {}));
var DirectionMode;
(function (DirectionMode) {
    DirectionMode[DirectionMode["Lro"] = 2] = "Lro";
    DirectionMode[DirectionMode["Rlo"] = 3] = "Rlo";
    DirectionMode[DirectionMode["Ltr"] = 0] = "Ltr";
    DirectionMode[DirectionMode["Rtl"] = 1] = "Rtl";
})(DirectionMode = exports.DirectionMode || (exports.DirectionMode = {}));
var StraightCurved;
(function (StraightCurved) {
    StraightCurved[StraightCurved["Curved"] = 1] = "Curved";
    StraightCurved[StraightCurved["Straight"] = 0] = "Straight";
})(StraightCurved = exports.StraightCurved || (exports.StraightCurved = {}));
var SolidDashedDottedWavy;
(function (SolidDashedDottedWavy) {
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dashed"] = 1] = "Dashed";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Wavy"] = 3] = "Wavy";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dotted"] = 2] = "Dotted";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Solid"] = 0] = "Solid";
})(SolidDashedDottedWavy = exports.SolidDashedDottedWavy || (exports.SolidDashedDottedWavy = {}));
var NormalAngledSquare;
(function (NormalAngledSquare) {
    NormalAngledSquare[NormalAngledSquare["Angled"] = 1] = "Angled";
    NormalAngledSquare[NormalAngledSquare["Square"] = 2] = "Square";
    NormalAngledSquare[NormalAngledSquare["Normal"] = 0] = "Normal";
})(NormalAngledSquare = exports.NormalAngledSquare || (exports.NormalAngledSquare = {}));
var UprightInverted;
(function (UprightInverted) {
    UprightInverted[UprightInverted["Upright"] = 0] = "Upright";
    UprightInverted[UprightInverted["Inverted"] = 1] = "Inverted";
})(UprightInverted = exports.UprightInverted || (exports.UprightInverted = {}));
var UpperMainBelow;
(function (UpperMainBelow) {
    UpperMainBelow[UpperMainBelow["Main"] = 1] = "Main";
    UpperMainBelow[UpperMainBelow["Below"] = 2] = "Below";
    UpperMainBelow[UpperMainBelow["Upper"] = 0] = "Upper";
})(UpperMainBelow = exports.UpperMainBelow || (exports.UpperMainBelow = {}));
var WholeHalfUnison;
(function (WholeHalfUnison) {
    WholeHalfUnison[WholeHalfUnison["Unison"] = 2] = "Unison";
    WholeHalfUnison[WholeHalfUnison["Whole"] = 0] = "Whole";
    WholeHalfUnison[WholeHalfUnison["Half"] = 1] = "Half";
})(WholeHalfUnison = exports.WholeHalfUnison || (exports.WholeHalfUnison = {}));
var WholeHalfNone;
(function (WholeHalfNone) {
    WholeHalfNone[WholeHalfNone["None"] = 3] = "None";
    WholeHalfNone[WholeHalfNone["Whole"] = 0] = "Whole";
    WholeHalfNone[WholeHalfNone["Half"] = 1] = "Half";
})(WholeHalfNone = exports.WholeHalfNone || (exports.WholeHalfNone = {}));
function xmlToEncodingDate(node) {
    var text = getString(node, true);
    if (text.length < 10) {
        return null;
    }
    return {
        year: parseFloat(text.slice(0, 4)),
        month: parseFloat(text.slice(5, 7)),
        day: parseFloat(text.slice(8, 10)),
    };
}
function xmlToMeasure(node) {
    var ret = {};
    var foundImplicit = false;
    var foundNonControlling = false;
    var foundNumber = false;
    var foundWidth = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "part") {
            var dataPart = xmlToPart(ch);
            ret.parts = ret.parts || {};
            ret.parts[ch.getAttribute("id")] = dataPart;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getString(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
        if (ch2.name === "implicit") {
            var dataImplicit = xmlToYesNo(ch2, true);
            ret.implicit = dataImplicit;
            foundImplicit = true;
        }
        if (ch2.name === "width") {
            var dataWidth = getNumber(ch2, true);
            ret.width = dataWidth;
            foundWidth = true;
        }
        if (ch2.name === "non-controlling") {
            var dataNonControlling = xmlToYesNo(ch2, true);
            ret.nonControlling = dataNonControlling;
            foundNonControlling = true;
        }
    }
    if (!foundNumber) {
        ret.number = "";
    }
    if (!foundImplicit) {
        ret.implicit = false;
    }
    if (!foundNonControlling) {
        ret.nonControlling = false;
    }
    if (!foundWidth) {
        ret.width = null;
    }
    return ret;
}
function xmlToYesNo(p, required) {
    var s = getString(p, true);
    if (s == "no") {
        return false;
    }
    if (s == "yes") {
        return true;
    }
    return false;
}
function xmlToNoteheadText(p) {
    // TODO
    return null;
}
function xmlToPartNameDisplay(p) {
    // TODO
    return null;
}
function xmlToPartAbbreviationDisplay(p) {
    // TODO
    return null;
}
function xmlToGroupNameDisplay(p) {
    // TODO
    return null;
}
function xmlToGroupAbbreviationDisplay(p) {
    // TODO
    return null;
}
function xmlToLyric(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundName = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
            foundDefaultX = true;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
            foundRelativeY = true;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
            foundDefaultY = true;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
            foundRelativeX = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
            foundName = true;
        }
    }
    ret.lyricParts = xmlToLyricParts(node);
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundDefaultX) {
        ret.defaultX = NaN;
    }
    if (!foundRelativeY) {
        ret.relativeY = 0;
    }
    if (!foundDefaultY) {
        ret.defaultY = NaN;
    }
    if (!foundRelativeX) {
        ret.relativeX = 0;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundName) {
        ret.name = "";
    }
    return ret;
}
function getStartStop(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return StartStop.Start;
    }
    if (s == "stop") {
        return StartStop.Stop;
    }
    return fallbackVal;
}
function getStartStopContinue(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return StartStopContinue.Start;
    }
    if (s == "stop") {
        return StartStopContinue.Stop;
    }
    if (s == "continue") {
        return StartStopContinue.Continue;
    }
    return fallbackVal;
}
function getStartStopSingle(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return StartStopSingle.Single;
    }
    if (s == "start") {
        return StartStopSingle.Start;
    }
    if (s == "stop") {
        return StartStopSingle.Stop;
    }
    return fallbackVal;
}
function getSymbolSize(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unspecified") {
        return SymbolSize.Unspecified;
    }
    if (s == "full") {
        return SymbolSize.Full;
    }
    if (s == "cue") {
        return SymbolSize.Cue;
    }
    if (s == "large") {
        return SymbolSize.Large;
    }
    return fallbackVal;
}
function getAboveBelow(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "above") {
        return AboveBelow.Above;
    }
    if (s == "below") {
        return AboveBelow.Below;
    }
    if (s == "unspecified") {
        return AboveBelow.Unspecified;
    }
    return fallbackVal;
}
function getUpDown(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return UpDown.Down;
    }
    if (s == "up") {
        return UpDown.Up;
    }
    return fallbackVal;
}
function getOverUnder(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "over") {
        return OverUnder.Over;
    }
    if (s == "under") {
        return OverUnder.Under;
    }
    if (s == "unspecified") {
        return OverUnder.Unspecified;
    }
    return fallbackVal;
}
function getTopBottom(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return TopBottom.Top;
    }
    if (s == "bottom") {
        return TopBottom.Bottom;
    }
    return fallbackVal;
}
function getLeftRight(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return LeftRight.Right;
    }
    if (s == "left") {
        return LeftRight.Left;
    }
    return fallbackVal;
}
/**
 * The number-of-lines entity is used to specify the
 * number of lines in text decoration attributes.
 */
function verifyNumberOfLines(m) {
    // assert(m >= 0 && m <= 3);
}
function xmlToNumberOfLines(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function verifyRotation(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToRotation(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function getEnclosureShape(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "circle") {
        return EnclosureShape.Circle;
    }
    if (s == "bracket") {
        return EnclosureShape.Bracket;
    }
    if (s == "triangle") {
        return EnclosureShape.Triangle;
    }
    if (s == "diamond") {
        return EnclosureShape.Diamond;
    }
    if (s == "none") {
        return EnclosureShape.None;
    }
    if (s == "square") {
        return EnclosureShape.Square;
    }
    if (s == "oval") {
        return EnclosureShape.Oval;
    }
    if (s == "rectangle") {
        return EnclosureShape.Rectangle;
    }
    return fallbackVal;
}
function getNormalItalic(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "italic") {
        return NormalItalic.Italic;
    }
    if (s == "normal") {
        return NormalItalic.Normal;
    }
    return fallbackVal;
}
function getNormalBold(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "bold") {
        return NormalBold.Bold;
    }
    if (s == "normal") {
        return NormalBold.Normal;
    }
    return fallbackVal;
}
/**
 * Slurs, tuplets, and many other features can be
 * concurrent and overlapping within a single musical
 * part. The number-level attribute distinguishes up to
 * six concurrent objects of the same type. A reading
 * program should be prepared to handle cases where
 * the number-levels stop in an arbitrary order.
 * Different numbers are needed when the features
 * overlap in MusicXML document order. When a number-level
 * value is implied, the value is 1 by default.
 */
function verifyNumberLevel(m) {
    // assert(m >= 1 && m <= 6);
}
function xmlToNumberLevel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * The MusicXML format supports eight levels of beaming, up
 * to 1024th notes. Unlike the number-level attribute, the
 * beam-level attribute identifies concurrent beams in a beam
 * group. It does not distinguish overlapping beams such as
 * grace notes within regular notes, or beams used in different
 * voices.
 */
function verifyBeamLevel(m) {
    // assert(m >= 1 && m <= 8);
}
function xmlToBeamLevel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function xmlToPosition(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
    }
    return ret;
}
function xmlToPlacement(node) {
    var ret = {};
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDirectiveEntity(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "directive") {
            var dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    return ret;
}
function xmlToBezier(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
    }
    return ret;
}
function xmlToOrientation(node) {
    var ret = {};
    var foundOrientation = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    return ret;
}
function xmlToFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function getLeftCenterRight(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return LeftCenterRight.Right;
    }
    if (s == "center") {
        return LeftCenterRight.Center;
    }
    if (s == "left") {
        return LeftCenterRight.Left;
    }
    return fallbackVal;
}
function getTopMiddleBottomBaseline(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return TopMiddleBottomBaseline.Top;
    }
    if (s == "middle") {
        return TopMiddleBottomBaseline.Middle;
    }
    if (s == "baseline") {
        return TopMiddleBottomBaseline.Baseline;
    }
    if (s == "bottom") {
        return TopMiddleBottomBaseline.Bottom;
    }
    return fallbackVal;
}
function getDirectionMode(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "lro") {
        return DirectionMode.Lro;
    }
    if (s == "rlo") {
        return DirectionMode.Rlo;
    }
    if (s == "ltr") {
        return DirectionMode.Ltr;
    }
    if (s == "rtl") {
        return DirectionMode.Rtl;
    }
    return fallbackVal;
}
function getStraightCurved(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "curved") {
        return StraightCurved.Curved;
    }
    if (s == "straight") {
        return StraightCurved.Straight;
    }
    return fallbackVal;
}
function getSolidDashedDottedWavy(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dashed") {
        return SolidDashedDottedWavy.Dashed;
    }
    if (s == "wavy") {
        return SolidDashedDottedWavy.Wavy;
    }
    if (s == "dotted") {
        return SolidDashedDottedWavy.Dotted;
    }
    if (s == "solid") {
        return SolidDashedDottedWavy.Solid;
    }
    return fallbackVal;
}
function getNormalAngledSquare(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "angled") {
        return NormalAngledSquare.Angled;
    }
    if (s == "square") {
        return NormalAngledSquare.Square;
    }
    if (s == "normal") {
        return NormalAngledSquare.Normal;
    }
    return fallbackVal;
}
function getUprightInverted(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "upright") {
        return UprightInverted.Upright;
    }
    if (s == "inverted") {
        return UprightInverted.Inverted;
    }
    return fallbackVal;
}
function getUpperMainBelow(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "main") {
        return UpperMainBelow.Main;
    }
    if (s == "below") {
        return UpperMainBelow.Below;
    }
    if (s == "upper") {
        return UpperMainBelow.Upper;
    }
    return fallbackVal;
}
function getWholeHalfUnison(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unison") {
        return WholeHalfUnison.Unison;
    }
    if (s == "whole") {
        return WholeHalfUnison.Whole;
    }
    if (s == "half") {
        return WholeHalfUnison.Half;
    }
    return fallbackVal;
}
function getWholeHalfNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return WholeHalfNone.None;
    }
    if (s == "whole") {
        return WholeHalfNone.Whole;
    }
    if (s == "half") {
        return WholeHalfNone.Half;
    }
    return fallbackVal;
}
function xmlToColor(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTextDecoration(node) {
    var ret = {};
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    return ret;
}
function xmlToJustify(node) {
    var ret = {};
    var foundJustify = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToHalign(node) {
    var ret = {};
    var foundHalign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    return ret;
}
function xmlToValign(node) {
    var ret = {};
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToValignImage(node) {
    var ret = {};
    var foundValignImage = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "valign") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToLetterSpacing(node) {
    var ret = {};
    var foundLetterSpacing = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    return ret;
}
function xmlToLineHeight(node) {
    var ret = {};
    var foundLineHeight = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    return ret;
}
function xmlToTextDirection(node) {
    var ret = {};
    var foundDir = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    return ret;
}
function xmlToTextRotation(node) {
    var ret = {};
    var foundRotation = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    return ret;
}
function xmlToEnclosure(node) {
    var ret = {};
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToPrintStyle(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToPrintStyleAlign(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToLineShape(node) {
    var ret = {};
    var foundLineShape = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    return ret;
}
function xmlToDashedFormatting(node) {
    var ret = {};
    var foundDashLength = false;
    var foundSpaceLength = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    return ret;
}
function xmlToPrintObject(node) {
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
function xmlToPrintSpacing(node) {
    var ret = {};
    var foundPrintSpacing = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-spacing") {
            var dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    return ret;
}
function xmlToTextFormatting(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToLevelDisplay(node) {
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    return ret;
}
function xmlToTrillSound(node) {
    var ret = {};
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 24;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 12;
    }
    return ret;
}
function xmlToBendSound(node) {
    var ret = {};
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.firstBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundSecondBeat) {
        ret.firstBeat = 25;
    }
    return ret;
}
function xmlToTimeOnly(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "time-only") {
            var dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
    }
    return ret;
}
function xmlToDocumentAttributes(node) {
    var ret = {};
    var foundVersion_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "version") {
            var dataVersion = getString(ch2, true);
            ret.version = dataVersion;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version = "1.0";
    }
    return ret;
}
function xmlToEditorial(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToEditorialVoice(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToFootnote(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToLevel(node) {
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    var foundReference = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
        if (ch2.name === "reference") {
            var dataReference = xmlToYesNo(ch2);
            ret.reference = dataReference;
            foundReference = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    if (!foundReference) {
        ret.reference = false;
    }
    return ret;
}
function xmlToFermata(node) {
    var ret = {};
    var foundShape = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getUprightInverted(ch2, UprightInverted.Upright);
            ret.type = dataType;
            foundType = true;
        }
    }
    var ch3 = node;
    var dataShape = getNormalAngledSquare(ch3, NormalAngledSquare.Normal);
    ret.shape = dataShape;
    if (!foundShape) {
        ret.shape = NormalAngledSquare.Normal;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = UprightInverted.Upright;
    }
    return ret;
}
function xmlToWavyLine(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToSegno(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToCoda(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToNormalDot(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDynamics(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundPlacement = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "fp") {
            var dataFp = true;
            ret.fp = dataFp;
        }
        if (ch.nodeName === "pp") {
            var dataPp = true;
            ret.pp = dataPp;
        }
        if (ch.nodeName === "ppp") {
            var dataPpp = true;
            ret.ppp = dataPpp;
        }
        if (ch.nodeName === "fff") {
            var dataFff = true;
            ret.fff = dataFff;
        }
        if (ch.nodeName === "sf") {
            var dataSf = true;
            ret.sf = dataSf;
        }
        if (ch.nodeName === "rf") {
            var dataRf = true;
            ret.rf = dataRf;
        }
        if (ch.nodeName === "mp") {
            var dataMp = true;
            ret.mp = dataMp;
        }
        if (ch.nodeName === "sfpp") {
            var dataSfpp = true;
            ret.sfpp = dataSfpp;
        }
        if (ch.nodeName === "f") {
            var dataF = true;
            ret.f = dataF;
        }
        if (ch.nodeName === "ffffff") {
            var dataFfffff = true;
            ret.ffffff = dataFfffff;
        }
        if (ch.nodeName === "sfz") {
            var dataSfz = true;
            ret.sfz = dataSfz;
        }
        if (ch.nodeName === "ff") {
            var dataFf = true;
            ret.ff = dataFf;
        }
        if (ch.nodeName === "pppppp") {
            var dataPppppp = true;
            ret.pppppp = dataPppppp;
        }
        if (ch.nodeName === "rfz") {
            var dataRfz = true;
            ret.rfz = dataRfz;
        }
        if (ch.nodeName === "other-dynamics") {
            var dataOtherDynamics = getString(ch, true);
            ret.otherDynamics = dataOtherDynamics;
        }
        if (ch.nodeName === "fz") {
            var dataFz = true;
            ret.fz = dataFz;
        }
        if (ch.nodeName === "ppppp") {
            var dataPpppp = true;
            ret.ppppp = dataPpppp;
        }
        if (ch.nodeName === "mf") {
            var dataMf = true;
            ret.mf = dataMf;
        }
        if (ch.nodeName === "pppp") {
            var dataPppp = true;
            ret.pppp = dataPppp;
        }
        if (ch.nodeName === "fffff") {
            var dataFffff = true;
            ret.fffff = dataFffff;
        }
        if (ch.nodeName === "sffz") {
            var dataSffz = true;
            ret.sffz = dataSffz;
        }
        if (ch.nodeName === "sfp") {
            var dataSfp = true;
            ret.sfp = dataSfp;
        }
        if (ch.nodeName === "p") {
            var dataP = true;
            ret.p = dataP;
        }
        if (ch.nodeName === "ffff") {
            var dataFfff = true;
            ret.ffff = dataFfff;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToFingering(node) {
    var ret = {};
    var foundSubstitution = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundAlternate = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            var dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "alternate") {
            var dataAlternate = xmlToYesNo(ch2);
            ret.alternate = dataAlternate;
            foundAlternate = true;
        }
    }
    var ch3 = node;
    var dataFinger = getNumber(ch3, false);
    ret.finger = dataFinger;
    if (isNaN(ret.finger)) {
        ret.finger = -1;
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundAlternate) {
        ret.alternate = false;
    }
    return ret;
}
function xmlToFret(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataFret = getNumber(ch3, true);
    ret.fret = dataFret;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToString(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataStringNum = getNumber(ch3, true);
    ret.stringNum = dataStringNum;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDisplayText(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToAccidentalText(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToMidiDevice(node) {
    var ret = {};
    var foundDeviceName = false;
    var foundPort = false;
    var foundId = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "port") {
            var dataPort = getNumber(ch2, true);
            ret.port = dataPort;
            foundPort = true;
        }
        if (ch2.name === "id") {
            var dataId = getNumber(ch2, true);
            ret.id = dataId;
            foundId = true;
        }
    }
    var ch3 = node;
    var dataDeviceName = getString(ch3, true);
    ret.deviceName = dataDeviceName;
    if (!foundDeviceName) {
        ret.deviceName = "";
    }
    if (!foundPort) {
        ret.port = NaN;
    }
    if (!foundId) {
        ret.id = NaN;
    }
    return ret;
}
/**
 * MIDI 1.0 channel numbers range from 1 to 16.
 */
function verifyMidiChannel(m) {
    // assert(m >= 1 && m <= 16);
}
function xmlToMidiChannel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 *  midi 1.0 bank numbers range from 1 to 16,384.
 */
function verifyMidiBank(m) {
    // assert(m >= 1 && m <= 16384);
}
function xmlToMidiBank(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 *  MIDI 1.0 program numbers range from 1 to 128.
 */
function verifyMidiProgram(m) {
    // assert(m >= 1 && m <= 128);
}
function xmlToMidiProgram(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * For unpitched instruments, specify a MIDI 1.0 note number
 * ranging from 1 to 128. It is usually used with MIDI banks for
 * percussion. Note that MIDI 1.0 note numbers are generally
 * specified from 0 to 127 rather than the 1 to 128 numbering
 * used in this element.
 */
function verifyMidiUnpitched(m) {
    // assert(m >= 1 && m <= 128);
}
function xmlToMidiUnpitched(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * The volume value is a percentage of the maximum
 * ranging from 0 to 100, with decimal values allowed.
 * This corresponds to a scaling value for the MIDI 1.0
 * channel volume controller.
 */
function verifyVolume(m) {
    // assert(m >= 1 && m <= 100);
}
function xmlToVolume(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * Pan and elevation allow placing of sound in a 3-D space
 * relative to the listener. Both are expressed in degrees
 * ranging from -180 to 180. For pan, 0 is straight ahead,
 * -90 is hard left, 90 is hard right, and -180 and 180
 * are directly behind the listener. For elevation, 0 is
 * level with the listener, 90 is directly above, and -90
 * is directly below.
 */
function verifyPan(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToPan(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * Pan and elevation allow placing of sound in a 3-D space
 * relative to the listener. Both are expressed in degrees
 * ranging from -180 to 180. For pan, 0 is straight ahead,
 * -90 is hard left, 90 is hard right, and -180 and 180
 * are directly behind the listener. For elevation, 0 is
 * level with the listener, 90 is directly above, and -90
 * is directly below.
 */
function verifyElevation(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToElevation(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function xmlToMidiInstrument(node) {
    var ret = {
        midiUnpitched: null,
        volume: null,
        pan: null,
        elevation: null,
        midiBank: null,
        midiProgram: null,
        id: "",
        midiChannel: null,
        midiName: "",
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "midi-unpitched") {
            var dataMidiUnpitched = getNumber(ch, true);
            ret.midiUnpitched = dataMidiUnpitched;
        }
        if (ch.nodeName === "volume") {
            var dataVolume = getNumber(ch, true);
            ret.volume = dataVolume;
        }
        if (ch.nodeName === "pan") {
            var dataPan = getNumber(ch, true);
            ret.pan = dataPan;
        }
        if (ch.nodeName === "elevation") {
            var dataElevation = getNumber(ch, true);
            ret.elevation = dataElevation;
        }
        if (ch.nodeName === "midi-bank") {
            var dataMidiBank = getNumber(ch, true);
            ret.midiBank = dataMidiBank;
        }
        if (ch.nodeName === "midi-program") {
            var dataMidiProgram = getNumber(ch, true);
            ret.midiProgram = dataMidiProgram;
        }
        if (ch.nodeName === "midi-channel") {
            var dataMidiChannel = getNumber(ch, true);
            ret.midiChannel = dataMidiChannel;
        }
        if (ch.nodeName === "midi-name") {
            var dataMidiName = getString(ch, true);
            ret.midiName = dataMidiName;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToPlay(node) {
    var ret = {
        ipa: "",
        mute: "",
        otherPlay: null,
        semiPitched: "",
        id: "",
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "ipa") {
            var dataIpa = getString(ch, true);
            ret.ipa = dataIpa;
        }
        if (ch.nodeName === "mute") {
            var dataMute = getString(ch, true);
            ret.mute = dataMute;
        }
        if (ch.nodeName === "other-play") {
            var dataOtherPlay = xmlToOtherPlay(ch);
            ret.otherPlay = dataOtherPlay;
        }
        if (ch.nodeName === "semi-pitched") {
            var dataSemiPitched = getString(ch, true);
            ret.semiPitched = dataSemiPitched;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToOtherPlay(node) {
    var ret = {
        data: "",
        type: "",
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToScaling(node) {
    var ret = {
        tenths: null,
        millimeters: null,
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tenths") {
            var dataTenths = getNumber(ch, true);
            ret.tenths = dataTenths;
        }
        if (ch.nodeName === "millimeters") {
            var dataMillimeters = getNumber(ch, true);
            ret.millimeters = dataMillimeters;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
var OddEvenBoth;
(function (OddEvenBoth) {
    OddEvenBoth[OddEvenBoth["Both"] = 2] = "Both";
    OddEvenBoth[OddEvenBoth["Even"] = 1] = "Even";
    OddEvenBoth[OddEvenBoth["Odd"] = 0] = "Odd";
})(OddEvenBoth = exports.OddEvenBoth || (exports.OddEvenBoth = {}));
function getOddEvenBoth(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "both") {
        return OddEvenBoth.Both;
    }
    if (s == "even") {
        return OddEvenBoth.Even;
    }
    if (s == "odd") {
        return OddEvenBoth.Odd;
    }
    return fallbackVal;
}
function xmlToPageMargins(node) {
    var ret = {};
    var foundType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "top-margin") {
            var dataTopMargin = getNumber(ch, true);
            ret.topMargin = dataTopMargin;
        }
        if (ch.nodeName === "left-margin") {
            var dataLeftMargin = getNumber(ch, true);
            ret.leftMargin = dataLeftMargin;
        }
        if (ch.nodeName === "bottom-margin") {
            var dataBottomMargin = getNumber(ch, true);
            ret.bottomMargin = dataBottomMargin;
        }
        if (ch.nodeName === "right-margin") {
            var dataRightMargin = getNumber(ch, true);
            ret.rightMargin = dataRightMargin;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getOddEvenBoth(ch2, OddEvenBoth.Both);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundType) {
        ret.type = OddEvenBoth.Both;
    }
    return ret;
}
function xmlToPageLayout(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "page-height") {
            var dataPageHeight = getNumber(ch, true);
            ret.pageHeight = dataPageHeight;
        }
        if (ch.nodeName === "page-width") {
            var dataPageWidth = getNumber(ch, true);
            ret.pageWidth = dataPageWidth;
        }
        if (ch.nodeName === "page-margins") {
            var dataPageMargins = xmlToPageMargins(ch);
            ret.pageMargins = (ret.pageMargins || []).concat(dataPageMargins);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemLayout(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "system-dividers") {
            var dataSystemDividers = xmlToSystemDividers(ch);
            ret.systemDividers = dataSystemDividers;
        }
        if (ch.nodeName === "system-margins") {
            var dataSystemMargins = xmlToSystemMargins(ch);
            ret.systemMargins = dataSystemMargins;
        }
        if (ch.nodeName === "system-distance") {
            var dataSystemDistance = getNumber(ch, true);
            ret.systemDistance = dataSystemDistance;
        }
        if (ch.nodeName === "top-system-distance") {
            var dataTopSystemDistance = getNumber(ch, true);
            ret.topSystemDistance = dataTopSystemDistance;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemMargins(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "left-margin") {
            var dataLeftMargin = getNumber(ch, true);
            ret.leftMargin = dataLeftMargin;
        }
        if (ch.nodeName === "right-margin") {
            var dataRightMargin = getNumber(ch, true);
            ret.rightMargin = dataRightMargin;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemDividers(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "right-divider") {
            var dataRightDivider = xmlToRightDivider(ch);
            ret.rightDivider = dataRightDivider;
        }
        if (ch.nodeName === "left-divider") {
            var dataLeftDivider = xmlToLeftDivider(ch);
            ret.leftDivider = dataLeftDivider;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToLeftDivider(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToRightDivider(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToStaffLayout(node) {
    var ret = {};
    var foundNum = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "staff-distance") {
            var dataStaffDistance = getNumber(ch, true);
            ret.staffDistance = dataStaffDistance;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNum = getNumber(ch2, true);
            ret.number = dataNum;
            foundNum = true;
        }
    }
    if (!foundNum) {
        ret.number = 1;
    }
    return ret;
}
function xmlToMeasureLayout(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "measure-distance") {
            var dataMeasureDistance = getNumber(ch, true);
            ret.measureDistance = dataMeasureDistance;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToLineWidth(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataTenths = getNumber(ch3, true);
    ret.tenths = dataTenths;
    return ret;
}
var CueGraceLarge;
(function (CueGraceLarge) {
    CueGraceLarge[CueGraceLarge["Grace"] = 1] = "Grace";
    CueGraceLarge[CueGraceLarge["Cue"] = 0] = "Cue";
    CueGraceLarge[CueGraceLarge["Large"] = 2] = "Large";
})(CueGraceLarge = exports.CueGraceLarge || (exports.CueGraceLarge = {}));
function getCueGraceLarge(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "grace") {
        return CueGraceLarge.Grace;
    }
    if (s == "cue") {
        return CueGraceLarge.Cue;
    }
    if (s == "large") {
        return CueGraceLarge.Large;
    }
    return fallbackVal;
}
function xmlToNoteSize(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getCueGraceLarge(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataSize = getNumber(ch3, true);
    ret.size = dataSize;
    return ret;
}
function xmlToDistance(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataTenths = getNumber(ch3, true);
    ret.tenths = dataTenths;
    return ret;
}
function xmlToAppearance(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "line-width") {
            var dataLineWidths = xmlToLineWidth(ch);
            ret.lineWidths = ret.lineWidths || {};
            ret.lineWidths[popFront(toCamelCase((dataLineWidths.type.length ? "_" : "") + dataLineWidths.type))] = dataLineWidths;
        }
        if (ch.nodeName === "distance") {
            var dataDistances = xmlToDistance(ch);
            ret.distances = ret.distances || {};
            ret.distances[popFront(toCamelCase((dataDistances.type.length ? "_" : "") + dataDistances.type))] = dataDistances;
        }
        if (ch.nodeName === "other-appearance") {
            var dataOtherAppearances = getString(ch, true);
            ret.otherAppearances = (ret.otherAppearances || []).concat(dataOtherAppearances);
        }
        if (ch.nodeName === "note-size") {
            var dataNoteSizes = xmlToNoteSize(ch);
            ret.noteSizes = ret.noteSizes || {};
            ret.noteSizes[dataNoteSizes.type] = dataNoteSizes;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToCreator(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataCreator = getString(ch3, true);
    ret.creator = dataCreator;
    return ret;
}
function xmlToRights(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataRights = getString(ch3, true);
    ret.rights = dataRights;
    return ret;
}
function xmlToEncoder(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataEncoder = getString(ch3, true);
    ret.encoder = dataEncoder;
    return ret;
}
function xmlToRelation(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToMiscellaneousField(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToMiscellaneous(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "miscellaneous-field") {
            var dataMiscellaneousFields = xmlToMiscellaneousField(ch);
            ret.miscellaneousFields = (ret.miscellaneousFields || []).concat(dataMiscellaneousFields);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToIdentification(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "miscellaneous") {
            var dataMiscellaneous = xmlToMiscellaneous(ch);
            ret.miscellaneous = dataMiscellaneous;
        }
        if (ch.nodeName === "creator") {
            var dataCreators = xmlToCreator(ch);
            ret.creators = (ret.creators || []).concat(dataCreators);
        }
        if (ch.nodeName === "relation") {
            var dataRelations = xmlToRelation(ch);
            ret.relations = (ret.relations || []).concat(dataRelations);
        }
        if (ch.nodeName === "rights") {
            var dataRights = xmlToRights(ch);
            ret.rights = (ret.rights || []).concat(dataRights);
        }
        if (ch.nodeName === "encoding") {
            var dataEncoding = xmlToEncoding(ch);
            ret.encoding = dataEncoding;
        }
        if (ch.nodeName === "source") {
            var dataSource = getString(ch, true);
            ret.source = dataSource;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSupports(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "element") {
            var dataElement = getString(ch2, true);
            ret.element = dataElement;
        }
        if (ch2.name === "attribute") {
            var dataAttribute = getString(ch2, true);
            ret.attribute = dataAttribute;
        }
        if (ch2.name === "value") {
            var dataValue = getString(ch2, true);
            ret.value = dataValue;
        }
        if (ch2.name === "type") {
            var dataType = xmlToYesNo(ch2);
            ret.type = dataType;
        }
    }
    ret.element = ret.element || "";
    ret.attribute = ret.attribute || "";
    ret.value = ret.value || "";
    ret.type = defined(ret.type) ? ret.type : true;
    return ret;
}
function xmlToEncoding(node) {
    var ret = {
        encodingDescriptions: [],
        encodingDate: null,
        supports: {},
        encoders: [],
        softwares: [],
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "encoding-description") {
            var dataEncodingDescriptions = getString(ch, true);
            ret.encodingDescriptions = (ret.encodingDescriptions || []).concat(dataEncodingDescriptions);
        }
        if (ch.nodeName === "encoding-date") {
            var dataEncodingDate = xmlToEncodingDate(ch);
            ret.encodingDate = dataEncodingDate;
        }
        if (ch.nodeName === "supports") {
            var dataSupports = xmlToSupports(ch);
            ret.supports = ret.supports || {};
            ret.supports[popFront(toCamelCase((dataSupports.element.length ? "_" : "") + dataSupports.element) +
                (dataSupports.attribute.length ? "_" : "") +
                toCamelCase(dataSupports.attribute))] = dataSupports;
        }
        if (ch.nodeName === "encoder") {
            var dataEncoders = xmlToEncoder(ch);
            ret.encoders = (ret.encoders || []).concat(dataEncoders);
        }
        if (ch.nodeName === "software") {
            var dataSoftwares = getString(ch, true);
            ret.softwares = (ret.softwares || []).concat(dataSoftwares);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
var SeparatorType;
(function (SeparatorType) {
    SeparatorType[SeparatorType["None"] = 0] = "None";
    SeparatorType[SeparatorType["Horizontal"] = 1] = "Horizontal";
    SeparatorType[SeparatorType["Diagonal"] = 2] = "Diagonal";
    SeparatorType[SeparatorType["Vertical"] = 3] = "Vertical";
    SeparatorType[SeparatorType["Adjacent"] = 4] = "Adjacent";
})(SeparatorType = exports.SeparatorType || (exports.SeparatorType = {}));
function getSeparatorType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return SeparatorType.None;
    }
    if (s == "horizontal") {
        return SeparatorType.Horizontal;
    }
    if (s == "diagonal") {
        return SeparatorType.Diagonal;
    }
    if (s == "vertical") {
        return SeparatorType.Vertical;
    }
    if (s == "adjacent") {
        return SeparatorType.Adjacent;
    }
    return fallbackVal;
}
function xmlToTimeSeparator(node) {
    var ret = {};
    var foundSeparator = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    return ret;
}
var TimeSymbolType;
(function (TimeSymbolType) {
    TimeSymbolType[TimeSymbolType["DottedNote"] = 4] = "DottedNote";
    TimeSymbolType[TimeSymbolType["Cut"] = 1] = "Cut";
    TimeSymbolType[TimeSymbolType["SingleNumber"] = 2] = "SingleNumber";
    TimeSymbolType[TimeSymbolType["Note"] = 3] = "Note";
    TimeSymbolType[TimeSymbolType["Common"] = 0] = "Common";
    TimeSymbolType[TimeSymbolType["Normal"] = 5] = "Normal";
})(TimeSymbolType = exports.TimeSymbolType || (exports.TimeSymbolType = {}));
function getTimeSymbolType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dotted-note") {
        return TimeSymbolType.DottedNote;
    }
    if (s == "cut") {
        return TimeSymbolType.Cut;
    }
    if (s == "single-number") {
        return TimeSymbolType.SingleNumber;
    }
    if (s == "note") {
        return TimeSymbolType.Note;
    }
    if (s == "common") {
        return TimeSymbolType.Common;
    }
    if (s == "normal") {
        return TimeSymbolType.Normal;
    }
    return fallbackVal;
}
function xmlToTimeSymbol(node) {
    var ret = {};
    var foundSymbol = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    return ret;
}
var CancelLocation;
(function (CancelLocation) {
    CancelLocation[CancelLocation["Right"] = 1] = "Right";
    CancelLocation[CancelLocation["BeforeBarline"] = 2] = "BeforeBarline";
    CancelLocation[CancelLocation["Left"] = 0] = "Left";
})(CancelLocation = exports.CancelLocation || (exports.CancelLocation = {}));
function getCancelLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return CancelLocation.Right;
    }
    if (s == "before-barline") {
        return CancelLocation.BeforeBarline;
    }
    if (s == "left") {
        return CancelLocation.Left;
    }
    return fallbackVal;
}
function xmlToCancel(node) {
    var ret = {};
    var foundLocation = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getCancelLocation(ch2, CancelLocation.Left);
            ret.location = dataLocation;
            foundLocation = true;
        }
    }
    var ch3 = node;
    var dataFifths = getNumber(ch3, true);
    ret.fifths = dataFifths;
    if (!foundLocation) {
        ret.location = CancelLocation.Left;
    }
    return ret;
}
function xmlToKeyOctave(node) {
    var ret = {};
    var foundCancel = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "cancel") {
            var dataCancel = xmlToYesNo(ch2);
            ret.cancel = dataCancel;
            foundCancel = true;
        }
    }
    var ch3 = node;
    var dataOctave = getNumber(ch3, true);
    ret.octave = dataOctave;
    if (!foundCancel) {
        ret.cancel = false;
    }
    return ret;
}
function xmlToKey(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "cancel") {
            var dataCancel = xmlToCancel(ch);
            ret.cancel = dataCancel;
        }
        if (ch.nodeName === "key-step") {
            var dataKeySteps = getString(ch, true);
            ret.keySteps = (ret.keySteps || []).concat(dataKeySteps);
        }
        if (ch.nodeName === "key-octave") {
            var dataKeyOctaves = xmlToKeyOctave(ch);
            ret.keyOctaves = (ret.keyOctaves || []).concat(dataKeyOctaves);
        }
        if (ch.nodeName === "fifths") {
            var dataFifths = getNumber(ch, true);
            ret.fifths = dataFifths;
        }
        if (ch.nodeName === "key-alter") {
            var dataKeyAlters = getString(ch, true);
            ret.keyAlters = (ret.keyAlters || []).concat(dataKeyAlters);
        }
        if (ch.nodeName === "key-accidental") {
            var dataKeyAccidentals = getString(ch, true);
            ret.keyAccidentals = ret.keyAccidentals || [];
            ret.keyAccidentals.length = Math.max(ret.keyAccidentals.length, ret.keySteps.length);
            ret.keyAccidentals[ret.keySteps.length - 1] = dataKeyAccidentals;
        }
        if (ch.nodeName === "mode") {
            var dataMode = getString(ch, true);
            ret.mode = dataMode;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!ret.keyAccidentals) {
        ret.keyAccidentals = [];
    }
    ret._class = "Key";
    return ret;
}
function xmlToTime(node) {
    var ret = {};
    var foundSymbol = false;
    var foundSeparator = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundPrintObject = false;
    var foundNumber = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "interchangeable") {
            var dataInterchangeable = xmlToInterchangeable(ch);
            ret.interchangeable = dataInterchangeable;
        }
        if (ch.nodeName === "beats") {
            var dataBeats = getString(ch, true);
            ret.beats = (ret.beats || []).concat(dataBeats);
        }
        if (ch.nodeName === "beat-type") {
            var dataBeatTypes = getNumber(ch, true);
            ret.beatTypes = (ret.beatTypes || []).concat(dataBeatTypes);
        }
        if (ch.nodeName === "senza-misura") {
            var dataSenzaMisura = getString(ch, true);
            ret.senzaMisura = dataSenzaMisura;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    ret._class = "Time";
    return ret;
}
function xmlToInterchangeable(node) {
    var ret = {};
    var foundSymbol = false;
    var foundSeparator = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "beats") {
            var dataBeats = getString(ch, true);
            ret.beats = (ret.beats || []).concat(dataBeats);
        }
        if (ch.nodeName === "beat-type") {
            var dataBeatTypes = getNumber(ch, true);
            ret.beatTypes = (ret.beatTypes || []).concat(dataBeatTypes);
        }
        if (ch.nodeName === "time-relation") {
            var dataTimeRelation = getString(ch, true);
            ret.timeRelation = dataTimeRelation;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    return ret;
}
var PartSymbolType;
(function (PartSymbolType) {
    PartSymbolType[PartSymbolType["None"] = 0] = "None";
    PartSymbolType[PartSymbolType["Line"] = 2] = "Line";
    PartSymbolType[PartSymbolType["Bracket"] = 3] = "Bracket";
    PartSymbolType[PartSymbolType["Square"] = 4] = "Square";
    PartSymbolType[PartSymbolType["Brace"] = 1] = "Brace";
})(PartSymbolType = exports.PartSymbolType || (exports.PartSymbolType = {}));
function getPartSymbolType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return PartSymbolType.None;
    }
    if (s == "line") {
        return PartSymbolType.Line;
    }
    if (s == "bracket") {
        return PartSymbolType.Bracket;
    }
    if (s == "square") {
        return PartSymbolType.Square;
    }
    if (s == "brace") {
        return PartSymbolType.Brace;
    }
    return fallbackVal;
}
function xmlToPartSymbol(node) {
    var ret = {};
    var foundTopStaff = false;
    var foundColor = false;
    var foundBottomStaff = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "top-staff") {
            var dataTopStaff = getNumber(ch2, true);
            ret.topStaff = dataTopStaff;
            foundTopStaff = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "bottom-staff") {
            var dataBottomStaff = getNumber(ch2, true);
            ret.bottomStaff = dataBottomStaff;
            foundBottomStaff = true;
        }
    }
    var ch3 = node;
    var dataType = getPartSymbolType(ch3, null);
    ret.type = dataType;
    if (!foundTopStaff) {
        ret.topStaff = -1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundBottomStaff) {
        ret.bottomStaff = -1;
    }
    ret._class = "PartSymbol";
    return ret;
}
function xmlToClef(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundSize = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundAfterBarline = false;
    var foundAdditional = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "clef-octave-change") {
            var dataClefOctaveChange = getString(ch, true);
            ret.clefOctaveChange = dataClefOctaveChange;
        }
        if (ch.nodeName === "sign") {
            var dataSign = getString(ch, true);
            ret.sign = dataSign;
        }
        if (ch.nodeName === "line") {
            var dataLine = getNumber(ch, true);
            ret.line = dataLine;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, SymbolSize.Full);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "after-barline") {
            var dataAfterBarline = xmlToYesNo(ch2);
            ret.afterBarline = dataAfterBarline;
            foundAfterBarline = true;
        }
        if (ch2.name === "additional") {
            var dataAdditional = xmlToYesNo(ch2);
            ret.additional = dataAdditional;
            foundAdditional = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Full;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundAfterBarline) {
        ret.afterBarline = false;
    }
    if (!foundAdditional) {
        ret.additional = false;
    }
    return ret;
}
function xmlToStaffTuning(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tuning-alter") {
            var dataTuningAlter = getString(ch, true);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            var dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            var dataTuningOctave = getString(ch, true);
            ret.tuningOctave = dataTuningOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line") {
            var dataLine = getString(ch2, true);
            ret.line = dataLine;
        }
    }
    return ret;
}
var ShowFretsType;
(function (ShowFretsType) {
    ShowFretsType[ShowFretsType["Letters"] = 1] = "Letters";
    ShowFretsType[ShowFretsType["Numbers"] = 0] = "Numbers";
})(ShowFretsType = exports.ShowFretsType || (exports.ShowFretsType = {}));
function getShowFretsType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "letters") {
        return ShowFretsType.Letters;
    }
    if (s == "numbers") {
        return ShowFretsType.Numbers;
    }
    return fallbackVal;
}
function xmlToStaffDetails(node) {
    var ret = {};
    var foundShowFrets = false;
    var foundNumber_ = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "staff-lines") {
            var dataStaffLines = getNumber(ch, true);
            ret.staffLines = dataStaffLines;
        }
        if (ch.nodeName === "staff-tuning") {
            var dataStaffTunings = xmlToStaffTuning(ch);
            ret.staffTunings = (ret.staffTunings || []).concat(dataStaffTunings);
        }
        if (ch.nodeName === "staff-size") {
            var dataStaffSize = getNumber(ch, true);
            ret.staffSize = dataStaffSize;
        }
        if (ch.nodeName === "capo") {
            var dataCapo = getString(ch, true);
            ret.capo = dataCapo;
        }
        if (ch.nodeName === "staff-type") {
            var dataStaffType = getString(ch, true);
            ret.staffType = dataStaffType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "show-frets") {
            var dataShowFrets = getShowFretsType(ch2, ShowFretsType.Numbers);
            ret.showFrets = dataShowFrets;
            foundShowFrets = true;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            var dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
    }
    if (!foundShowFrets) {
        ret.showFrets = ShowFretsType.Numbers;
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    return ret;
}
function xmlToDouble(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTranspose(node) {
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "diatonic") {
            var dataDiatonic = getString(ch, true);
            ret.diatonic = dataDiatonic;
        }
        if (ch.nodeName === "octave-change") {
            var dataOctaveChange = getString(ch, true);
            ret.octaveChange = dataOctaveChange;
        }
        if (ch.nodeName === "double") {
            var dataDouble = xmlToDouble(ch);
            ret.double = dataDouble;
        }
        if (ch.nodeName === "chromatic") {
            var dataChromatic = getString(ch, true);
            ret.chromatic = dataChromatic;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
    }
    if (!foundNumber_) {
        ret.number = NaN;
    }
    return ret;
}
function xmlToDirective(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSlashDot(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMultipleRest(node) {
    var ret = {};
    var foundUseSymbols = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "use-symbols") {
            var dataUseSymbols = xmlToYesNo(ch2);
            ret.useSymbols = dataUseSymbols;
            foundUseSymbols = true;
        }
    }
    var ch3 = node;
    var dataCount = getNumber(ch3, true);
    ret.count = dataCount;
    if (!foundUseSymbols) {
        ret.useSymbols = false;
    }
    return ret;
}
function xmlToMeasureRepeat(node) {
    var ret = {};
    var foundSlashes = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "slashes") {
            var dataSlashes = getNumber(ch2, true);
            ret.slashes = dataSlashes;
            foundSlashes = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundSlashes) {
        ret.slashes = 1;
    }
    return ret;
}
function xmlToBeatRepeat(node) {
    var ret = {};
    var foundUseDots = false;
    var foundSlases = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "slash-type") {
            var dataSlashType = getString(ch, true);
            ret.slashType = dataSlashType;
        }
        if (ch.nodeName === "slash-dot") {
            var dataSlashDots = xmlToSlashDot(ch);
            ret.slashDots = (ret.slashDots || []).concat(dataSlashDots);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "use-dots") {
            var dataUseDots = xmlToYesNo(ch2);
            ret.useDots = dataUseDots;
            foundUseDots = true;
        }
        if (ch2.name === "slases") {
            var dataSlases = getNumber(ch2, true);
            ret.slases = dataSlases;
            foundSlases = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundUseDots) {
        ret.useDots = false;
    }
    if (!foundSlases) {
        ret.slases = 1;
    }
    return ret;
}
function xmlToSlash(node) {
    var ret = {};
    var foundUseDots = false;
    var foundUseStems = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "slash-type") {
            var dataSlashType = getString(ch, true);
            ret.slashType = dataSlashType;
        }
        if (ch.nodeName === "slash-dot") {
            var dataSlashDots = xmlToSlashDot(ch);
            ret.slashDots = (ret.slashDots || []).concat(dataSlashDots);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "use-dots") {
            var dataUseDots = xmlToYesNo(ch2);
            ret.useDots = dataUseDots;
            foundUseDots = true;
        }
        if (ch2.name === "use-stems") {
            var dataUseStems = xmlToYesNo(ch2);
            ret.useStems = dataUseStems;
            foundUseStems = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundUseDots) {
        ret.useDots = false;
    }
    if (!foundUseStems) {
        ret.useStems = false;
    }
    return ret;
}
function xmlToMeasureStyle(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "measure-repeat") {
            var dataMeasureRepeat = xmlToMeasureRepeat(ch);
            ret.measureRepeat = dataMeasureRepeat;
        }
        if (ch.nodeName === "beat-repeat") {
            var dataBeatRepeat = xmlToBeatRepeat(ch);
            ret.beatRepeat = dataBeatRepeat;
        }
        if (ch.nodeName === "multiple-rest") {
            var dataMultipleRest = xmlToMultipleRest(ch);
            ret.multipleRest = dataMultipleRest;
        }
        if (ch.nodeName === "slash") {
            var dataSlash = xmlToSlash(ch);
            ret.slash = dataSlash;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToAttributes(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "divisions") {
            var dataDivisions = getNumber(ch, true);
            ret.divisions = dataDivisions;
        }
        if (ch.nodeName === "part-symbol") {
            var dataPartSymbol = xmlToPartSymbol(ch);
            ret.partSymbol = dataPartSymbol;
        }
        if (ch.nodeName === "clef") {
            var dataClefs = xmlToClef(ch);
            ret.clefs = (ret.clefs || []).concat(dataClefs);
        }
        if (ch.nodeName === "measure-style") {
            var dataMeasureStyle = xmlToMeasureStyle(ch);
            ret.measureStyles = (ret.measureStyles || []).concat(dataMeasureStyle);
        }
        if (ch.nodeName === "time") {
            var dataTimes = xmlToTime(ch);
            ret.times = (ret.times || []).concat(dataTimes);
        }
        if (ch.nodeName === "staff-details") {
            var dataStaffDetails = xmlToStaffDetails(ch);
            ret.staffDetails = (ret.staffDetails || []).concat(dataStaffDetails);
        }
        if (ch.nodeName === "transpose") {
            var dataTransposes = xmlToTranspose(ch);
            ret.transposes = (ret.transposes || []).concat(dataTransposes);
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "staves") {
            var dataStaves = getNumber(ch, true);
            ret.staves = dataStaves;
        }
        if (ch.nodeName === "instruments") {
            var dataInstruments = getString(ch, true);
            ret.instruments = dataInstruments;
        }
        if (ch.nodeName === "key") {
            var dataKeySignatures = xmlToKey(ch);
            ret.keySignatures = (ret.keySignatures || []).concat(dataKeySignatures);
        }
        if (ch.nodeName === "directive") {
            var dataDirectives = xmlToDirective(ch);
            ret.directives = (ret.directives || []).concat(dataDirectives);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "Attributes";
    return ret;
}
function xmlToCue(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToGrace(node) {
    var ret = {};
    var foundSlash = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "make-time") {
            var dataMakeTime = getString(ch2, true);
            ret.makeTime = dataMakeTime;
        }
        if (ch2.name === "steal-time-previous") {
            var dataStealTimePrevious = getString(ch2, true);
            ret.stealTimePrevious = dataStealTimePrevious;
        }
        if (ch2.name === "slash") {
            var dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "steal-time-following") {
            var dataStealTimeFollowing = getString(ch2, true);
            ret.stealTimeFollowing = dataStealTimeFollowing;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    return ret;
}
function xmlToChord(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToUnpitched(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "display-step") {
            var dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            var dataDisplayOctave = getNumber(ch, true);
            ret.displayOctave = dataDisplayOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToPitch(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "alter") {
            var dataAlter = getNumber(ch, true);
            ret.alter = dataAlter;
        }
        if (ch.nodeName === "step") {
            var dataStep = getString(ch, true);
            ret.step = dataStep.toLowerCase();
        }
        if (ch.nodeName === "octave") {
            var dataOctave = getNumber(ch, true);
            ret.octave = dataOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToFullNote(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "unpitched") {
            var dataUnpitched = xmlToUnpitched(ch);
            ret.unpitched = dataUnpitched;
        }
        if (ch.nodeName === "chord") {
            var dataChord = xmlToChord(ch);
            ret.chord = dataChord;
        }
        if (ch.nodeName === "pitch") {
            var dataPitch = xmlToPitch(ch);
            ret.pitch = dataPitch;
        }
        if (ch.nodeName === "rest") {
            var dataRest = xmlToRest(ch);
            ret.rest = dataRest;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRest(node) {
    var ret = {};
    var foundMeasure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "display-step") {
            var dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            var dataDisplayOctave = getNumber(ch, true);
            ret.displayOctave = dataDisplayOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "measure") {
            var dataMeasure = xmlToYesNo(ch2);
            ret.measure = dataMeasure;
            foundMeasure = true;
        }
    }
    if (!foundMeasure) {
        ret.measure = false;
    }
    return ret;
}
function xmlToTie(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "time-only") {
            var dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    return ret;
}
function xmlToInstrument(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToNote(node) {
    var ret = {};
    var foundAttack = false;
    var foundEndDynamics = false;
    var foundPizzicato = false;
    var foundDynamics = false;
    var foundRelease = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "notehead-text") {
            var dataNoteheadText = xmlToNoteheadText(ch);
            ret.noteheadText = dataNoteheadText;
        }
        if (ch.nodeName === "time-modification") {
            var dataTimeModification = xmlToTimeModification(ch);
            ret.timeModification = dataTimeModification;
        }
        if (ch.nodeName === "accidental") {
            var dataAccidental = xmlToAccidental(ch);
            ret.accidental = dataAccidental;
        }
        if (ch.nodeName === "instrument") {
            var dataInstrument = xmlToInstrument(ch);
            ret.instrument = dataInstrument;
        }
        if (ch.nodeName === "lyric") {
            var dataLyrics = xmlToLyric(ch);
            ret.lyrics = (ret.lyrics || []).concat(dataLyrics);
        }
        if (ch.nodeName === "dot") {
            var dataDots = xmlToDot(ch);
            ret.dots = (ret.dots || []).concat(dataDots);
        }
        if (ch.nodeName === "notations") {
            var dataNotations = xmlToNotations(ch);
            ret.notations = (ret.notations || []).concat(dataNotations);
        }
        if (ch.nodeName === "stem") {
            var dataStem = xmlToStem(ch);
            ret.stem = dataStem;
        }
        if (ch.nodeName === "type") {
            var dataNoteType = xmlToType(ch);
            ret.noteType = dataNoteType;
        }
        if (ch.nodeName === "cue") {
            var dataCue = xmlToCue(ch);
            ret.cue = dataCue;
        }
        if (ch.nodeName === "duration") {
            var dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
        if (ch.nodeName === "tie") {
            var dataTies = xmlToTie(ch);
            ret.ties = (ret.ties || []).concat(dataTies);
        }
        if (ch.nodeName === "play") {
            var dataPlay = xmlToPlay(ch);
            ret.play = dataPlay;
        }
        if (ch.nodeName === "staff") {
            var dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "grace") {
            var dataGrace = xmlToGrace(ch);
            ret.grace = dataGrace;
        }
        if (ch.nodeName === "notehead") {
            var dataNotehead = xmlToNotehead(ch);
            ret.notehead = dataNotehead;
        }
        if (ch.nodeName === "voice") {
            var dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "unpitched") {
            var dataUnpitched = xmlToUnpitched(ch);
            ret.unpitched = dataUnpitched;
        }
        if (ch.nodeName === "chord") {
            var dataChord = xmlToChord(ch);
            ret.chord = dataChord;
        }
        if (ch.nodeName === "pitch") {
            var dataPitch = xmlToPitch(ch);
            ret.pitch = dataPitch;
        }
        if (ch.nodeName === "rest") {
            var dataRest = xmlToRest(ch);
            ret.rest = dataRest;
        }
        if (ch.nodeName === "beam") {
            var dataBeams = xmlToBeam(ch);
            ret.beams = (ret.beams || []).concat(dataBeams);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "attack") {
            var dataAttack = getNumber(ch2, true);
            ret.attack = dataAttack;
            foundAttack = true;
        }
        if (ch2.name === "end-dynamics") {
            var dataEndDynamics = getNumber(ch2, true);
            ret.endDynamics = dataEndDynamics;
            foundEndDynamics = true;
        }
        if (ch2.name === "pizzicato") {
            var dataPizzicato = xmlToYesNo(ch2);
            ret.pizzicato = dataPizzicato;
            foundPizzicato = true;
        }
        if (ch2.name === "dynamics") {
            var dataDynamics = getNumber(ch2, true);
            ret.dynamics = dataDynamics;
            foundDynamics = true;
        }
        if (ch2.name === "release") {
            var dataRelease = getNumber(ch2, true);
            ret.release = dataRelease;
            foundRelease = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-dot") {
            var dataPrintDot = xmlToYesNo(ch2);
            ret.printDot = dataPrintDot;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            var dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
        if (ch2.name === "print-lyric") {
            var dataPrintLyric = xmlToYesNo(ch2);
            ret.printLyric = dataPrintLyric;
        }
        if (ch2.name === "time-only") {
            var dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
    }
    if (!foundAttack) {
        ret.attack = NaN;
    }
    if (!foundEndDynamics) {
        ret.endDynamics = 90;
    }
    if (!foundPizzicato) {
        ret.pizzicato = false;
    }
    if (!foundDynamics) {
        ret.dynamics = 90;
    }
    if (!foundRelease) {
        ret.release = NaN;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    ret._class = "Note";
    return ret;
}
var Count;
(function (Count) {
    Count[Count["Quarter"] = 4] = "Quarter";
    Count[Count["Breve"] = 9990] = "Breve";
    Count[Count["Long"] = 9991] = "Long";
    Count[Count["_1024th"] = 1024] = "_1024th";
    Count[Count["_32nd"] = 32] = "_32nd";
    Count[Count["_16th"] = 16] = "_16th";
    Count[Count["Eighth"] = 8] = "Eighth";
    Count[Count["Maxima"] = 9992] = "Maxima";
    Count[Count["_512th"] = 512] = "_512th";
    Count[Count["_64th"] = 64] = "_64th";
    Count[Count["_256th"] = 256] = "_256th";
    Count[Count["_128th"] = 128] = "_128th";
    Count[Count["Half"] = 2] = "Half";
    Count[Count["Whole"] = 1] = "Whole";
})(Count = exports.Count || (exports.Count = {}));
function getCount(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "quarter") {
        return Count.Quarter;
    }
    if (s == "breve") {
        return Count.Breve;
    }
    if (s == "long") {
        return Count.Long;
    }
    if (s == "1024th") {
        return Count._1024th;
    }
    if (s == "32nd") {
        return Count._32nd;
    }
    if (s == "16th") {
        return Count._16th;
    }
    if (s == "eighth") {
        return Count.Eighth;
    }
    if (s == "maxima") {
        return Count.Maxima;
    }
    if (s == "512th") {
        return Count._512th;
    }
    if (s == "64th") {
        return Count._64th;
    }
    if (s == "256th") {
        return Count._256th;
    }
    if (s == "128th") {
        return Count._128th;
    }
    if (s == "half") {
        return Count.Half;
    }
    if (s == "whole") {
        return Count.Whole;
    }
    return fallbackVal;
}
function xmlToType(node) {
    var ret = {};
    var foundSize = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
    }
    var ch3 = node;
    var dataDuration = getCount(ch3, null);
    ret.duration = dataDuration;
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    return ret;
}
function xmlToDot(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var MxmlAccidental;
(function (MxmlAccidental) {
    MxmlAccidental[MxmlAccidental["NaturalFlat"] = 7] = "NaturalFlat";
    MxmlAccidental[MxmlAccidental["SharpUp"] = 13] = "SharpUp";
    MxmlAccidental[MxmlAccidental["ThreeQuartersFlat"] = 10] = "ThreeQuartersFlat";
    MxmlAccidental[MxmlAccidental["ThreeQuartersSharp"] = 11] = "ThreeQuartersSharp";
    MxmlAccidental[MxmlAccidental["QuarterFlat"] = 8] = "QuarterFlat";
    MxmlAccidental[MxmlAccidental["Flat"] = 2] = "Flat";
    MxmlAccidental[MxmlAccidental["TripleSharp"] = 18] = "TripleSharp";
    MxmlAccidental[MxmlAccidental["Flat1"] = 27] = "Flat1";
    MxmlAccidental[MxmlAccidental["Flat2"] = 28] = "Flat2";
    MxmlAccidental[MxmlAccidental["Flat3"] = 29] = "Flat3";
    MxmlAccidental[MxmlAccidental["Flat4"] = 291] = "Flat4";
    MxmlAccidental[MxmlAccidental["TripleFlat"] = 191] = "TripleFlat";
    MxmlAccidental[MxmlAccidental["Flat5"] = 30] = "Flat5";
    MxmlAccidental[MxmlAccidental["Sharp"] = 0] = "Sharp";
    MxmlAccidental[MxmlAccidental["QuarterSharp"] = 9] = "QuarterSharp";
    MxmlAccidental[MxmlAccidental["SlashFlat"] = 21] = "SlashFlat";
    MxmlAccidental[MxmlAccidental["FlatDown"] = 16] = "FlatDown";
    MxmlAccidental[MxmlAccidental["NaturalDown"] = 14] = "NaturalDown";
    MxmlAccidental[MxmlAccidental["SlashQuarterSharp"] = 19] = "SlashQuarterSharp";
    MxmlAccidental[MxmlAccidental["SharpSharp"] = 4] = "SharpSharp";
    MxmlAccidental[MxmlAccidental["Sharp1"] = 23] = "Sharp1";
    MxmlAccidental[MxmlAccidental["FlatUp"] = 17] = "FlatUp";
    MxmlAccidental[MxmlAccidental["Sharp2"] = 24] = "Sharp2";
    MxmlAccidental[MxmlAccidental["Sharp3"] = 25] = "Sharp3";
    MxmlAccidental[MxmlAccidental["DoubleSharp"] = 3] = "DoubleSharp";
    MxmlAccidental[MxmlAccidental["Sharp4"] = 251] = "Sharp4";
    MxmlAccidental[MxmlAccidental["Sharp5"] = 26] = "Sharp5";
    MxmlAccidental[MxmlAccidental["Sori"] = 31] = "Sori";
    MxmlAccidental[MxmlAccidental["DoubleSlashFlat"] = 22] = "DoubleSlashFlat";
    MxmlAccidental[MxmlAccidental["SharpDown"] = 12] = "SharpDown";
    MxmlAccidental[MxmlAccidental["Koron"] = 32] = "Koron";
    MxmlAccidental[MxmlAccidental["NaturalUp"] = 15] = "NaturalUp";
    MxmlAccidental[MxmlAccidental["SlashSharp"] = 20] = "SlashSharp";
    MxmlAccidental[MxmlAccidental["NaturalSharp"] = 6] = "NaturalSharp";
    MxmlAccidental[MxmlAccidental["FlatFlat"] = 5] = "FlatFlat";
    MxmlAccidental[MxmlAccidental["Natural"] = 1] = "Natural";
    MxmlAccidental[MxmlAccidental["DoubleFlat"] = 33] = "DoubleFlat";
})(MxmlAccidental = exports.MxmlAccidental || (exports.MxmlAccidental = {}));
function getMxmlAccidental(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "natural-flat") {
        return MxmlAccidental.NaturalFlat;
    }
    if (s == "sharp-up") {
        return MxmlAccidental.SharpUp;
    }
    if (s == "three-quarters-flat") {
        return MxmlAccidental.ThreeQuartersFlat;
    }
    if (s == "three-quarters-sharp") {
        return MxmlAccidental.ThreeQuartersSharp;
    }
    if (s == "quarter-flat") {
        return MxmlAccidental.QuarterFlat;
    }
    if (s == "flat") {
        return MxmlAccidental.Flat;
    }
    if (s == "triple-sharp") {
        return MxmlAccidental.TripleSharp;
    }
    if (s == "flat-1") {
        return MxmlAccidental.Flat1;
    }
    if (s == "flat-2") {
        return MxmlAccidental.Flat2;
    }
    if (s == "flat-3") {
        return MxmlAccidental.Flat3;
    }
    if (s == "flat-4") {
        return MxmlAccidental.Flat4;
    }
    if (s == "triple-flat") {
        return MxmlAccidental.TripleFlat;
    }
    if (s == "flat-5") {
        return MxmlAccidental.Flat5;
    }
    if (s == "sharp") {
        return MxmlAccidental.Sharp;
    }
    if (s == "quarter-sharp") {
        return MxmlAccidental.QuarterSharp;
    }
    if (s == "slash-flat") {
        return MxmlAccidental.SlashFlat;
    }
    if (s == "flat-down") {
        return MxmlAccidental.FlatDown;
    }
    if (s == "natural-down") {
        return MxmlAccidental.NaturalDown;
    }
    if (s == "slash-quarter-sharp") {
        return MxmlAccidental.SlashQuarterSharp;
    }
    if (s == "sharp-sharp") {
        return MxmlAccidental.SharpSharp;
    }
    if (s == "sharp-1") {
        return MxmlAccidental.Sharp1;
    }
    if (s == "flat-up") {
        return MxmlAccidental.FlatUp;
    }
    if (s == "sharp-2") {
        return MxmlAccidental.Sharp2;
    }
    if (s == "sharp-3") {
        return MxmlAccidental.Sharp3;
    }
    if (s == "double-sharp") {
        return MxmlAccidental.DoubleSharp;
    }
    if (s == "sharp-4") {
        return MxmlAccidental.Sharp4;
    }
    if (s == "sharp-5") {
        return MxmlAccidental.Sharp5;
    }
    if (s == "sori") {
        return MxmlAccidental.Sori;
    }
    if (s == "double-slash-flat") {
        return MxmlAccidental.DoubleSlashFlat;
    }
    if (s == "sharp-down") {
        return MxmlAccidental.SharpDown;
    }
    if (s == "koron") {
        return MxmlAccidental.Koron;
    }
    if (s == "natural-up") {
        return MxmlAccidental.NaturalUp;
    }
    if (s == "slash-sharp") {
        return MxmlAccidental.SlashSharp;
    }
    if (s == "natural-sharp") {
        return MxmlAccidental.NaturalSharp;
    }
    if (s == "flat-flat") {
        return MxmlAccidental.FlatFlat;
    }
    if (s == "natural") {
        return MxmlAccidental.Natural;
    }
    if (s == "double-flat") {
        return MxmlAccidental.DoubleFlat;
    }
    return fallbackVal;
}
function xmlToAccidental(node) {
    var ret = {};
    var foundCautionary = false;
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundEditorial = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "cautionary") {
            var dataCautionary = xmlToYesNo(ch2);
            ret.cautionary = dataCautionary;
            foundCautionary = true;
        }
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "editorial") {
            var dataEditorial = xmlToYesNo(ch2);
            ret.editorial = dataEditorial;
            foundEditorial = true;
        }
    }
    var ch3 = node;
    var dataAccidental = getMxmlAccidental(ch3, null);
    ret.accidental = dataAccidental;
    if (!foundCautionary) {
        ret.cautionary = false;
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundEditorial) {
        ret.editorial = false;
    }
    return ret;
}
function xmlToTimeModification(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "actual-notes") {
            var dataActualNotes = getNumber(ch, true);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            var dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            var dataNormalNotes = getNumber(ch, true);
            ret.normalNotes = dataNormalNotes;
        }
        if (ch.nodeName === "normal-dot") {
            var dataNormalDots = xmlToNormalDot(ch);
            ret.normalDots = (ret.normalDots || []).concat(dataNormalDots);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
var StemType;
(function (StemType) {
    StemType[StemType["None"] = 2] = "None";
    StemType[StemType["Double"] = 3] = "Double";
    StemType[StemType["Down"] = 0] = "Down";
    StemType[StemType["Up"] = 1] = "Up";
})(StemType = exports.StemType || (exports.StemType = {}));
function getStemType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return StemType.None;
    }
    if (s == "double") {
        return StemType.Double;
    }
    if (s == "down") {
        return StemType.Down;
    }
    if (s == "up") {
        return StemType.Up;
    }
    return fallbackVal;
}
function xmlToStem(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataType = getStemType(ch3, null);
    ret.type = dataType;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var NoteheadType;
(function (NoteheadType) {
    NoteheadType[NoteheadType["InvertedTriangle"] = 7] = "InvertedTriangle";
    NoteheadType[NoteheadType["CircleDot"] = 14] = "CircleDot";
    NoteheadType[NoteheadType["ArrowUp"] = 9] = "ArrowUp";
    NoteheadType[NoteheadType["Do"] = 18] = "Do";
    NoteheadType[NoteheadType["Mi"] = 20] = "Mi";
    NoteheadType[NoteheadType["Cross"] = 4] = "Cross";
    NoteheadType[NoteheadType["Slash"] = 0] = "Slash";
    NoteheadType[NoteheadType["Fa"] = 21] = "Fa";
    NoteheadType[NoteheadType["Triangle"] = 1] = "Triangle";
    NoteheadType[NoteheadType["FaUp"] = 22] = "FaUp";
    NoteheadType[NoteheadType["So"] = 23] = "So";
    NoteheadType[NoteheadType["LeftTriangle"] = 15] = "LeftTriangle";
    NoteheadType[NoteheadType["BackSlashed"] = 11] = "BackSlashed";
    NoteheadType[NoteheadType["None"] = 17] = "None";
    NoteheadType[NoteheadType["La"] = 24] = "La";
    NoteheadType[NoteheadType["Slashed"] = 10] = "Slashed";
    NoteheadType[NoteheadType["Normal"] = 12] = "Normal";
    NoteheadType[NoteheadType["Cluster"] = 13] = "Cluster";
    NoteheadType[NoteheadType["Ti"] = 25] = "Ti";
    NoteheadType[NoteheadType["Re"] = 19] = "Re";
    NoteheadType[NoteheadType["Rectangle"] = 16] = "Rectangle";
    NoteheadType[NoteheadType["Square"] = 3] = "Square";
    NoteheadType[NoteheadType["ArrowDown"] = 8] = "ArrowDown";
    NoteheadType[NoteheadType["X"] = 5] = "X";
    NoteheadType[NoteheadType["Diamond"] = 2] = "Diamond";
    NoteheadType[NoteheadType["CircleX"] = 6] = "CircleX";
})(NoteheadType = exports.NoteheadType || (exports.NoteheadType = {}));
function getNoteheadType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "inverted triangle") {
        return NoteheadType.InvertedTriangle;
    }
    if (s == "circle dot") {
        return NoteheadType.CircleDot;
    }
    if (s == "arrow up") {
        return NoteheadType.ArrowUp;
    }
    if (s == "do") {
        return NoteheadType.Do;
    }
    if (s == "mi") {
        return NoteheadType.Mi;
    }
    if (s == "cross") {
        return NoteheadType.Cross;
    }
    if (s == "slash") {
        return NoteheadType.Slash;
    }
    if (s == "fa") {
        return NoteheadType.Fa;
    }
    if (s == "triangle") {
        return NoteheadType.Triangle;
    }
    if (s == "fa up") {
        return NoteheadType.FaUp;
    }
    if (s == "so") {
        return NoteheadType.So;
    }
    if (s == "left triangle") {
        return NoteheadType.LeftTriangle;
    }
    if (s == "back slashed") {
        return NoteheadType.BackSlashed;
    }
    if (s == "none") {
        return NoteheadType.None;
    }
    if (s == "la") {
        return NoteheadType.La;
    }
    if (s == "slashed") {
        return NoteheadType.Slashed;
    }
    if (s == "normal") {
        return NoteheadType.Normal;
    }
    if (s == "cluster") {
        return NoteheadType.Cluster;
    }
    if (s == "ti") {
        return NoteheadType.Ti;
    }
    if (s == "re") {
        return NoteheadType.Re;
    }
    if (s == "rectangle") {
        return NoteheadType.Rectangle;
    }
    if (s == "square") {
        return NoteheadType.Square;
    }
    if (s == "arrow down") {
        return NoteheadType.ArrowDown;
    }
    if (s == "x") {
        return NoteheadType.X;
    }
    if (s == "diamond") {
        return NoteheadType.Diamond;
    }
    if (s == "circle-x") {
        return NoteheadType.CircleX;
    }
    return fallbackVal;
}
function xmlToNotehead(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "filled") {
            var dataFilled = xmlToYesNo(ch2);
            ret.filled = dataFilled;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
        }
    }
    var ch3 = node;
    var dataType = getNoteheadType(ch3, null);
    ret.type = dataType;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var BeamType;
(function (BeamType) {
    BeamType[BeamType["BackwardHook"] = 4] = "BackwardHook";
    BeamType[BeamType["Begin"] = 0] = "Begin";
    BeamType[BeamType["ForwardHook"] = 3] = "ForwardHook";
    BeamType[BeamType["Continue"] = 1] = "Continue";
    BeamType[BeamType["End"] = 2] = "End";
})(BeamType = exports.BeamType || (exports.BeamType = {}));
function getBeamType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "backward hook") {
        return BeamType.BackwardHook;
    }
    if (s == "begin") {
        return BeamType.Begin;
    }
    if (s == "forward hook") {
        return BeamType.ForwardHook;
    }
    if (s == "continue") {
        return BeamType.Continue;
    }
    if (s == "end") {
        return BeamType.End;
    }
    return fallbackVal;
}
var AccelRitNone;
(function (AccelRitNone) {
    AccelRitNone[AccelRitNone["Accel"] = 0] = "Accel";
    AccelRitNone[AccelRitNone["None"] = 2] = "None";
    AccelRitNone[AccelRitNone["Rit"] = 1] = "Rit";
})(AccelRitNone = exports.AccelRitNone || (exports.AccelRitNone = {}));
function getAccelRitNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "accel") {
        return AccelRitNone.Accel;
    }
    if (s == "none") {
        return AccelRitNone.None;
    }
    if (s == "rit") {
        return AccelRitNone.Rit;
    }
    return fallbackVal;
}
function xmlToBeam(node) {
    var ret = {};
    var foundRepeater = false;
    var foundNumber_ = false;
    var foundFan = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "repeater") {
            var dataRepeater = xmlToYesNo(ch2);
            ret.repeater = dataRepeater;
            foundRepeater = true;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "fan") {
            var dataFan = getAccelRitNone(ch2, AccelRitNone.None);
            ret.fan = dataFan;
            foundFan = true;
        }
    }
    var ch3 = node;
    var dataType = getBeamType(ch3, null);
    ret.type = dataType;
    if (!foundRepeater) {
        ret.repeater = false;
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFan) {
        ret.fan = AccelRitNone.None;
    }
    return ret;
}
function xmlToNotations(node) {
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "slur") {
            var dataSlurs = xmlToSlur(ch);
            ret.slurs = (ret.slurs || []).concat(dataSlurs);
        }
        if (ch.nodeName === "articulations") {
            var dataArticulations = xmlToArticulations(ch);
            ret.articulations = (ret.articulations || []).concat(dataArticulations);
        }
        if (ch.nodeName === "slide") {
            var dataSlides = xmlToSlide(ch);
            ret.slides = (ret.slides || []).concat(dataSlides);
        }
        if (ch.nodeName === "technical") {
            var dataTechnicals = xmlToTechnical(ch);
            ret.technicals = (ret.technicals || []).concat(dataTechnicals);
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "tied") {
            var dataTieds = xmlToTied(ch);
            ret.tieds = (ret.tieds || []).concat(dataTieds);
        }
        if (ch.nodeName === "tuplet") {
            var dataTuplets = xmlToTuplet(ch);
            ret.tuplets = (ret.tuplets || []).concat(dataTuplets);
        }
        if (ch.nodeName === "glissando") {
            var dataGlissandos = xmlToGlissando(ch);
            ret.glissandos = (ret.glissandos || []).concat(dataGlissandos);
        }
        if (ch.nodeName === "dynamics") {
            var dataDynamics = xmlToDynamics(ch);
            ret.dynamics = (ret.dynamics || []).concat(dataDynamics);
        }
        if (ch.nodeName === "fermata") {
            var dataFermatas = xmlToFermata(ch);
            ret.fermatas = (ret.fermatas || []).concat(dataFermatas);
        }
        if (ch.nodeName === "accidental-mark") {
            var dataAccidentalMarks = xmlToAccidentalMark(ch);
            ret.accidentalMarks = (ret.accidentalMarks || []).concat(dataAccidentalMarks);
        }
        if (ch.nodeName === "ornaments") {
            var dataOrnaments = xmlToOrnaments(ch);
            ret.ornaments = (ret.ornaments || []).concat(dataOrnaments);
        }
        if (ch.nodeName === "arpeggiate") {
            var dataArpeggiates = xmlToArpeggiate(ch);
            ret.arpeggiates = (ret.arpeggiates || []).concat(dataArpeggiates);
        }
        if (ch.nodeName === "non-arpeggiate") {
            var dataNonArpeggiates = xmlToNonArpeggiate(ch);
            ret.nonArpeggiates = (ret.nonArpeggiates || []).concat(dataNonArpeggiates);
        }
        if (ch.nodeName === "other-notation") {
            var dataOtherNotations = xmlToOtherNotation(ch);
            ret.otherNotations = (ret.otherNotations || []).concat(dataOtherNotations);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
function xmlToTied(node) {
    var ret = {};
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundPlacement = false;
    var foundOrientation = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSlur(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundPlacement = false;
    var foundOrientation = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var ActualBothNone;
(function (ActualBothNone) {
    ActualBothNone[ActualBothNone["None"] = 2] = "None";
    ActualBothNone[ActualBothNone["Both"] = 1] = "Both";
    ActualBothNone[ActualBothNone["Actual"] = 0] = "Actual";
})(ActualBothNone = exports.ActualBothNone || (exports.ActualBothNone = {}));
function getActualBothNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return ActualBothNone.None;
    }
    if (s == "both") {
        return ActualBothNone.Both;
    }
    if (s == "actual") {
        return ActualBothNone.Actual;
    }
    return fallbackVal;
}
function xmlToTuplet(node) {
    var ret = {};
    var foundBracket = false;
    var foundShowNumber = false;
    var foundLineShape = false;
    var foundPlacement = false;
    var foundShowType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tuplet-normal") {
            var dataTupletNormal = xmlToTupletNormal(ch);
            ret.tupletNormal = dataTupletNormal;
        }
        if (ch.nodeName === "tuplet-actual") {
            var dataTupletActual = xmlToTupletActual(ch);
            ret.tupletActual = dataTupletActual;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "show-number") {
            var dataShowNumber = getActualBothNone(ch2, ActualBothNone.Actual);
            ret.showNumber = dataShowNumber;
            foundShowNumber = true;
        }
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "show-type") {
            var dataShowType = getActualBothNone(ch2, ActualBothNone.None);
            ret.showType = dataShowType;
            foundShowType = true;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundShowNumber) {
        ret.showNumber = ActualBothNone.Actual;
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundShowType) {
        ret.showType = ActualBothNone.None;
    }
    return ret;
}
function xmlToTupletActual(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tuplet-number") {
            var dataTupletNumber = xmlToTupletNumber(ch);
            ret.tupletNumber = dataTupletNumber;
        }
        if (ch.nodeName === "tuplet-dot") {
            var dataTupletDots = xmlToTupletDot(ch);
            ret.tupletDots = (ret.tupletDots || []).concat(dataTupletDots);
        }
        if (ch.nodeName === "tuplet-type") {
            var dataTupletType = xmlToTupletType(ch);
            ret.tupletType = dataTupletType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTupletNormal(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tuplet-number") {
            var dataTupletNumber = xmlToTupletNumber(ch);
            ret.tupletNumber = dataTupletNumber;
        }
        if (ch.nodeName === "tuplet-dot") {
            var dataTupletDots = xmlToTupletDot(ch);
            ret.tupletDots = (ret.tupletDots || []).concat(dataTupletDots);
        }
        if (ch.nodeName === "tuplet-type") {
            var dataTupletType = xmlToTupletType(ch);
            ret.tupletType = dataTupletType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTupletNumber(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTupletType(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTupletDot(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGlissando(node) {
    var ret = {};
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundNumber = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToSlide(node) {
    var ret = {};
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundFirstBeat = false;
    var foundNumber = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            var dataFirstBeat = getNumber(ch2, true);
            ret.firstBeat = dataFirstBeat;
            foundFirstBeat = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundFirstBeat) {
        ret.firstBeat = 25;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToOtherNotation(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundNumber = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopSingle(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, null);
            foundNumber = true;
            ret.type = dataNumber;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToOtherDirection(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToOrnaments(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "delayed-inverted-turn") {
            var dataDelayedInvertedTurn = xmlToDelayedInvertedTurn(ch);
            ret.delayedInvertedTurn = dataDelayedInvertedTurn;
        }
        if (ch.nodeName === "shake") {
            var dataShake = xmlToShake(ch);
            ret.shake = dataShake;
        }
        if (ch.nodeName === "turn") {
            var dataTurn = xmlToTurn(ch);
            ret.turn = dataTurn;
        }
        if (ch.nodeName === "inverted-turn") {
            var dataInvertedTurn = xmlToInvertedTurn(ch);
            ret.invertedTurn = dataInvertedTurn;
        }
        if (ch.nodeName === "other-ornament") {
            var dataOtherOrnament = xmlToOtherOrnament(ch);
            ret.otherOrnament = dataOtherOrnament;
        }
        if (ch.nodeName === "delayed-turn") {
            var dataDelayedTurn = xmlToDelayedTurn(ch);
            ret.delayedTurn = dataDelayedTurn;
        }
        if (ch.nodeName === "vertical-turn") {
            var dataVerticalTurn = xmlToVerticalTurn(ch);
            ret.verticalTurn = dataVerticalTurn;
        }
        if (ch.nodeName === "wavy-line") {
            var dataWavyLine = xmlToWavyLine(ch);
            ret.wavyLine = dataWavyLine;
        }
        if (ch.nodeName === "tremolo") {
            var dataTremolo = xmlToTremolo(ch);
            ret.tremolo = dataTremolo;
        }
        if (ch.nodeName === "accidental-mark") {
            var dataAccidentalMarks = xmlToAccidentalMark(ch);
            ret.accidentalMarks = (ret.accidentalMarks || []).concat(dataAccidentalMarks);
        }
        if (ch.nodeName === "trill-mark") {
            var dataTrillMark = xmlToTrillMark(ch);
            ret.trillMark = dataTrillMark;
        }
        if (ch.nodeName === "mordent") {
            var dataMordent = xmlToMordent(ch);
            ret.mordent = dataMordent;
        }
        if (ch.nodeName === "inverted-mordent") {
            var dataInvertedMordent = xmlToInvertedMordent(ch);
            ret.invertedMordent = dataInvertedMordent;
        }
        if (ch.nodeName === "schleifer") {
            var dataSchleifer = xmlToSchleifer(ch);
            ret.schleifer = dataSchleifer;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToTrillMark(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToTurn(node) {
    var ret = {};
    var foundSlash = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            var dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToDelayedTurn(node) {
    var ret = {};
    var foundSlash = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            var dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToInvertedTurn(node) {
    var ret = {};
    var foundSlash = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            var dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToDelayedInvertedTurn(node) {
    var ret = {};
    var foundSlash = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            var dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToVerticalTurn(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToShake(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToMordent(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "long") {
            var dataLong = xmlToYesNo(ch2);
            ret.long = dataLong;
        }
        if (ch2.name === "approach") {
            var dataApproach = getAboveBelow(ch2, null);
            ret.approach = dataApproach;
        }
        if (ch2.name === "departure") {
            var dataDeparture = getAboveBelow(ch2, null);
            ret.departure = dataDeparture;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToInvertedMordent(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "long") {
            var dataLong = xmlToYesNo(ch2);
            ret.long = dataLong;
        }
        if (ch2.name === "approach") {
            var dataApproach = getAboveBelow(ch2, null);
            ret.approach = dataApproach;
        }
        if (ch2.name === "departure") {
            var dataDeparture = getAboveBelow(ch2, null);
            ret.departure = dataDeparture;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            var dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToSchleifer(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTremolo(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopSingle(ch2, StartStopSingle.Single);
            ret.type = dataType;
            foundType = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundType) {
        ret.type = StartStopSingle.Single;
    }
    return ret;
}
function xmlToOtherOrnament(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopSingle(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToAccidentalMark(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataMark = getString(ch3, true);
    ret.mark = dataMark;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTechnical(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "triple-tongue") {
            var dataTripleTongue = xmlToTripleTongue(ch);
            ret.tripleTongue = dataTripleTongue;
        }
        if (ch.nodeName === "toe") {
            var dataToe = xmlToToe(ch);
            ret.toe = dataToe;
        }
        if (ch.nodeName === "hole") {
            var dataHole = xmlToHole(ch);
            ret.hole = dataHole;
        }
        if (ch.nodeName === "hammer-on") {
            var dataHammerOn = xmlToHammerOn(ch);
            ret.hammerOn = dataHammerOn;
        }
        if (ch.nodeName === "up-bow") {
            var dataUpBow = xmlToUpBow(ch);
            ret.upBow = dataUpBow;
        }
        if (ch.nodeName === "down-bow") {
            var dataDownBow = xmlToDownBow(ch);
            ret.downBow = dataDownBow;
        }
        if (ch.nodeName === "fret") {
            var dataFret = xmlToFret(ch);
            ret.fret = dataFret;
        }
        if (ch.nodeName === "tap") {
            var dataTap = xmlToTap(ch);
            ret.tap = dataTap;
        }
        if (ch.nodeName === "pull-off") {
            var dataPullOff = xmlToPullOff(ch);
            ret.pullOff = dataPullOff;
        }
        if (ch.nodeName === "handbell") {
            var dataHandbell = xmlToHandbell(ch);
            ret.handbell = dataHandbell;
        }
        if (ch.nodeName === "bend") {
            var dataBend = xmlToBend(ch);
            ret.bend = dataBend;
        }
        if (ch.nodeName === "thumb-position") {
            var dataThumbPosition = xmlToThumbPosition(ch);
            ret.thumbPosition = dataThumbPosition;
        }
        if (ch.nodeName === "stopped") {
            var dataStopped = xmlToStopped(ch);
            ret.stopped = dataStopped;
        }
        if (ch.nodeName === "pluck") {
            var dataPluck = xmlToPluck(ch);
            ret.pluck = dataPluck;
        }
        if (ch.nodeName === "double-tongue") {
            var dataDoubleTongue = xmlToDoubleTongue(ch);
            ret.doubleTongue = dataDoubleTongue;
        }
        if (ch.nodeName === "string") {
            var dataString = xmlToString(ch);
            ret.string = dataString;
        }
        if (ch.nodeName === "open-string") {
            var dataOpenString = xmlToOpenString(ch);
            ret.openString = dataOpenString;
        }
        if (ch.nodeName === "fingernails") {
            var dataFingernails = xmlToFingernails(ch);
            ret.fingernails = dataFingernails;
        }
        if (ch.nodeName === "arrow") {
            var dataArrow = xmlToArrow(ch);
            ret.arrow = dataArrow;
        }
        if (ch.nodeName === "harmonic") {
            var dataHarmonic = xmlToHarmonic(ch);
            ret.harmonic = dataHarmonic;
        }
        if (ch.nodeName === "heel") {
            var dataHeel = xmlToHeel(ch);
            ret.heel = dataHeel;
        }
        if (ch.nodeName === "other-technical") {
            var dataOtherTechnical = xmlToOtherTechnical(ch);
            ret.otherTechnical = dataOtherTechnical;
        }
        if (ch.nodeName === "snap-pizzicato") {
            var dataSnapPizzicato = xmlToSnapPizzicato(ch);
            ret.snapPizzicato = dataSnapPizzicato;
        }
        if (ch.nodeName === "fingering") {
            var dataFingering = xmlToFingering(ch);
            ret.fingering = dataFingering;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToUpBow(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDownBow(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHarmonic(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "artificial") {
            var dataArtificial = true;
            ret.artificial = dataArtificial;
        }
        if (ch.nodeName === "touching-pitch") {
            var dataTouchingPitch = true;
            ret.touchingPitch = dataTouchingPitch;
        }
        if (ch.nodeName === "sounding-pitch") {
            var dataSoundingPitch = true;
            ret.soundingPitch = dataSoundingPitch;
        }
        if (ch.nodeName === "natural") {
            var dataNatural = true;
            ret.natural = dataNatural;
        }
        if (ch.nodeName === "base-pitch") {
            var dataBasePitch = true;
            ret.basePitch = dataBasePitch;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOpenString(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToThumbPosition(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPluck(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDoubleTongue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTripleTongue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStopped(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToSnapPizzicato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHammerOn(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPullOff(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToBend(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundFirstBeat = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "bend-alter") {
            var dataBendAlter = getString(ch, true);
            ret.bendAlter = dataBendAlter;
        }
        if (ch.nodeName === "with-bar") {
            var dataWithBar = xmlToWithBar(ch);
            ret.withBar = dataWithBar;
        }
        if (ch.nodeName === "pre-bend") {
            var dataPreBend = true;
            ret.preBend = dataPreBend;
        }
        if (ch.nodeName === "release") {
            var dataRelease = true;
            ret.release = dataRelease;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "accelerate") {
            var dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            var dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            var dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            var dataFirstBeat = getNumber(ch2, true);
            ret.firstBeat = dataFirstBeat;
            foundFirstBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundFirstBeat) {
        ret.firstBeat = 25;
    }
    return ret;
}
function xmlToWithBar(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTap(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHeel(node) {
    var ret = {};
    var foundSubstitution = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            var dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToToe(node) {
    var ret = {};
    var foundSubstitution = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            var dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToFingernails(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHole(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "hole-closed") {
            var dataHoleClosed = xmlToHoleClosed(ch);
            ret.holeClosed = dataHoleClosed;
        }
        if (ch.nodeName === "hole-shape") {
            var dataHoleShape = getString(ch, true);
            ret.holeShape = dataHoleShape;
        }
        if (ch.nodeName === "hole-type") {
            var dataHoleType = getString(ch, true);
            ret.holeType = dataHoleType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var HoleLocation;
(function (HoleLocation) {
    HoleLocation[HoleLocation["Right"] = 0] = "Right";
    HoleLocation[HoleLocation["Top"] = 3] = "Top";
    HoleLocation[HoleLocation["Bottom"] = 1] = "Bottom";
    HoleLocation[HoleLocation["Left"] = 2] = "Left";
})(HoleLocation = exports.HoleLocation || (exports.HoleLocation = {}));
function getHoleLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return HoleLocation.Right;
    }
    if (s == "top") {
        return HoleLocation.Top;
    }
    if (s == "bottom") {
        return HoleLocation.Bottom;
    }
    if (s == "left") {
        return HoleLocation.Left;
    }
    return fallbackVal;
}
var HoleClosedType;
(function (HoleClosedType) {
    HoleClosedType[HoleClosedType["No"] = 1] = "No";
    HoleClosedType[HoleClosedType["Yes"] = 0] = "Yes";
    HoleClosedType[HoleClosedType["Half"] = 2] = "Half";
})(HoleClosedType = exports.HoleClosedType || (exports.HoleClosedType = {}));
function getHoleClosedType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "no") {
        return HoleClosedType.No;
    }
    if (s == "yes") {
        return HoleClosedType.Yes;
    }
    if (s == "half") {
        return HoleClosedType.Half;
    }
    return fallbackVal;
}
function xmlToHoleClosed(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getHoleLocation(ch2, null);
            ret.location = dataLocation;
        }
    }
    var ch3 = node;
    var dataData = getHoleClosedType(ch3, null);
    ret.data = dataData;
    return ret;
}
function xmlToArrow(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "arrow-style") {
            var dataArrowStyle = getString(ch, true);
            ret.arrowStyle = dataArrowStyle;
        }
        if (ch.nodeName === "arrow-direction") {
            var dataArrowDirection = getString(ch, true);
            ret.arrowDirection = dataArrowDirection;
        }
        if (ch.nodeName === "circular-arrow") {
            var dataCircularArrow = getString(ch, true);
            ret.circularArrow = dataCircularArrow;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHandbell(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOtherTechnical(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToArticulations(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "accent") {
            var dataAccent = xmlToAccent(ch);
            ret.accent = dataAccent;
        }
        if (ch.nodeName === "doit") {
            var dataDoit = xmlToDoit(ch);
            ret.doit = dataDoit;
        }
        if (ch.nodeName === "breath-mark") {
            var dataBreathMark = xmlToBreathMark(ch);
            ret.breathMark = dataBreathMark;
        }
        if (ch.nodeName === "other-articulation") {
            var dataOtherArticulations = xmlToOtherArticulation(ch);
            ret.otherArticulations = (ret.otherArticulations || []).concat(dataOtherArticulations);
        }
        if (ch.nodeName === "detached-legato") {
            var dataDetachedLegato = xmlToDetachedLegato(ch);
            ret.detachedLegato = dataDetachedLegato;
        }
        if (ch.nodeName === "staccatissimo") {
            var dataStaccatissimo = xmlToStaccatissimo(ch);
            ret.staccatissimo = dataStaccatissimo;
        }
        if (ch.nodeName === "plop") {
            var dataPlop = xmlToPlop(ch);
            ret.plop = dataPlop;
        }
        if (ch.nodeName === "unstress") {
            var dataUnstress = xmlToUnstress(ch);
            ret.unstress = dataUnstress;
        }
        if (ch.nodeName === "strong-accent") {
            var dataStrongAccent = xmlToStrongAccent(ch);
            ret.strongAccent = dataStrongAccent;
        }
        if (ch.nodeName === "staccato") {
            var dataStaccato = xmlToStaccato(ch);
            ret.staccato = dataStaccato;
        }
        if (ch.nodeName === "spiccato") {
            var dataSpiccato = xmlToSpiccato(ch);
            ret.spiccato = dataSpiccato;
        }
        if (ch.nodeName === "scoop") {
            var dataScoop = xmlToScoop(ch);
            ret.scoop = dataScoop;
        }
        if (ch.nodeName === "falloff") {
            var dataFalloff = xmlToFalloff(ch);
            ret.falloff = dataFalloff;
        }
        if (ch.nodeName === "caesura") {
            var dataCaesura = xmlToCaesura(ch);
            ret.caesura = dataCaesura;
        }
        if (ch.nodeName === "stress") {
            var dataStress = xmlToStress(ch);
            ret.stress = dataStress;
        }
        if (ch.nodeName === "tenuto") {
            var dataTenuto = xmlToTenuto(ch);
            ret.tenuto = dataTenuto;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToAccent(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStrongAccent(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getUpDown(ch2, UpDown.Up);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundType) {
        ret.type = UpDown.Up;
    }
    return ret;
}
function xmlToStaccato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTenuto(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDetachedLegato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStaccatissimo(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToSpiccato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToScoop(node) {
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPlop(node) {
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDoit(node) {
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToFalloff(node) {
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var BreathMarkType;
(function (BreathMarkType) {
    BreathMarkType[BreathMarkType["Empty"] = 2] = "Empty";
    BreathMarkType[BreathMarkType["Comma"] = 0] = "Comma";
    BreathMarkType[BreathMarkType["Tick"] = 1] = "Tick";
})(BreathMarkType = exports.BreathMarkType || (exports.BreathMarkType = {}));
function getBreathMarkType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "") {
        return BreathMarkType.Empty;
    }
    if (s == "comma") {
        return BreathMarkType.Comma;
    }
    if (s == "tick") {
        return BreathMarkType.Tick;
    }
    return fallbackVal;
}
function xmlToBreathMark(node) {
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataType = getBreathMarkType(ch3, null);
    ret.type = dataType;
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToCaesura(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStress(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToUnstress(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOtherArticulation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToArpeggiate(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundDirection = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "direction") {
            var dataDirection = getUpDown(ch2, UpDown.Up);
            ret.direction = dataDirection;
            foundDirection = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundDirection) {
        ret.direction = UpDown.Up;
    }
    return ret;
}
function xmlToNonArpeggiate(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundPlacement = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getTopBottom(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToLaughing(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "Laughing";
    return ret;
}
function xmlToHumming(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "Humming";
    return ret;
}
function xmlToEndLine(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "EndLine";
    return ret;
}
function xmlToEndParagraph(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "EndParagraph";
    return ret;
}
function xmlToLyricParts(node) {
    var rarr = [];
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "extend") {
            var data = xmlToExtend(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "end-line") {
            var data = xmlToEndLine(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "syllabic") {
            var data = xmlToSyllabic(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "text") {
            var data = xmlToText(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "laughing") {
            var data = xmlToLaughing(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "humming") {
            var data = xmlToHumming(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "end-paragraph") {
            var data = xmlToEndParagraph(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "elision") {
            var data = xmlToElision(ch);
            rarr = (rarr || []).concat(data);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return rarr;
}
function xmlToText(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundDir = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    ret._class = "Text";
    return ret;
}
var SyllabicType;
(function (SyllabicType) {
    SyllabicType[SyllabicType["Single"] = 0] = "Single";
    SyllabicType[SyllabicType["Begin"] = 1] = "Begin";
    SyllabicType[SyllabicType["Middle"] = 3] = "Middle";
    SyllabicType[SyllabicType["End"] = 2] = "End";
})(SyllabicType = exports.SyllabicType || (exports.SyllabicType = {}));
function getSyllabicType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return SyllabicType.Single;
    }
    if (s == "begin") {
        return SyllabicType.Begin;
    }
    if (s == "middle") {
        return SyllabicType.Middle;
    }
    if (s == "end") {
        return SyllabicType.End;
    }
    return fallbackVal;
}
function xmlToSyllabic(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getSyllabicType(ch3, null);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    ret._class = "Syllabic";
    return ret;
}
function xmlToElision(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    ret._class = "Elision";
    return ret;
}
function xmlToExtend(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, StartStopContinue.Start);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = StartStopContinue.Start;
    }
    ret._class = "Extend";
    return ret;
}
function xmlToFiguredBass(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    var foundParentheses = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "figure") {
            var dataFigures = xmlToFigure(ch);
            ret.figures = (ret.figures || []).concat(dataFigures);
        }
        if (ch.nodeName === "duration") {
            var dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-dot") {
            var dataPrintDot = xmlToYesNo(ch2);
            ret.printDot = dataPrintDot;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            var dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
        if (ch2.name === "print-lyric") {
            var dataPrintLyric = xmlToYesNo(ch2);
            ret.printLyric = dataPrintLyric;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    ret._class = "FiguredBass";
    return ret;
}
function xmlToFigure(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "prefix") {
            var dataPrefix = xmlToPrefix(ch);
            ret.prefix = dataPrefix;
        }
        if (ch.nodeName === "figure-number") {
            var dataFigureNumber = xmlToFigureNumber(ch);
            ret.figureNumber = dataFigureNumber;
        }
        if (ch.nodeName === "extend") {
            var dataExtend = xmlToExtend(ch);
            ret.extend = dataExtend;
        }
        if (ch.nodeName === "suffix") {
            var dataSuffix = xmlToSuffix(ch);
            ret.suffix = dataSuffix;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToPrefix(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFigureNumber(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSuffix(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBackup(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "duration") {
            var dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "Backup";
    return ret;
}
function xmlToForward(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "duration") {
            var dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
        if (ch.nodeName === "staff") {
            var dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    ret._class = "Forward";
    return ret;
}
var BarlineLocation;
(function (BarlineLocation) {
    BarlineLocation[BarlineLocation["Right"] = 1] = "Right";
    BarlineLocation[BarlineLocation["Middle"] = 2] = "Middle";
    BarlineLocation[BarlineLocation["Left"] = 0] = "Left";
})(BarlineLocation = exports.BarlineLocation || (exports.BarlineLocation = {}));
function getBarlineLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return BarlineLocation.Right;
    }
    if (s == "middle") {
        return BarlineLocation.Middle;
    }
    if (s == "left") {
        return BarlineLocation.Left;
    }
    return fallbackVal;
}
function xmlToBarline(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "segno") {
            var dataSegno = xmlToSegno(ch);
            ret.segno = dataSegno;
        }
        if (ch.nodeName === "coda") {
            var dataCoda = xmlToCoda(ch);
            ret.coda = dataCoda;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "wavy-line") {
            var dataWavyLine = xmlToWavyLine(ch);
            ret.wavyLine = dataWavyLine;
        }
        if (ch.nodeName === "fermata") {
            var dataFermatas = xmlToFermata(ch);
            ret.fermatas = (ret.fermatas || []).concat(dataFermatas);
        }
        if (ch.nodeName === "bar-style") {
            var dataBarStyle = xmlToBarStyle(ch);
            ret.barStyle = dataBarStyle;
        }
        if (ch.nodeName === "ending") {
            var dataEnding = xmlToEnding(ch);
            ret.ending = dataEnding;
        }
        if (ch.nodeName === "repeat") {
            var dataRepeat = xmlToRepeat(ch);
            ret.repeat = dataRepeat;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getBarlineLocation(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "coda") {
            var dataCodaAttrib = getString(ch2, true);
            ret.codaAttrib = dataCodaAttrib;
        }
        if (ch2.name === "segno") {
            var dataSegnoAttrib = getString(ch2, true);
            ret.segnoAttrib = dataSegnoAttrib;
        }
        if (ch2.name === "divisions") {
            var dataDivisions = getNumber(ch2, true);
            ret.divisions = dataDivisions;
        }
    }
    ret._class = "Barline";
    return ret;
}
/**
 * Bar-style contains style information. Choices are
 * regular, dotted, dashed, heavy, light-light,
 * light-heavy, heavy-light, heavy-heavy, tick (a
 * short stroke through the top line), short (a partial
 * barline between the 2nd and 4th lines), and none.
 */
var BarStyleType;
(function (BarStyleType) {
    BarStyleType[BarStyleType["Regular"] = 0] = "Regular";
    BarStyleType[BarStyleType["LightHeavy"] = 5] = "LightHeavy";
    BarStyleType[BarStyleType["HeavyLight"] = 6] = "HeavyLight";
    BarStyleType[BarStyleType["Short"] = 9] = "Short";
    BarStyleType[BarStyleType["None"] = 10] = "None";
    BarStyleType[BarStyleType["Dashed"] = 2] = "Dashed";
    BarStyleType[BarStyleType["HeavyHeavy"] = 7] = "HeavyHeavy";
    BarStyleType[BarStyleType["Tick"] = 8] = "Tick";
    BarStyleType[BarStyleType["Dotted"] = 1] = "Dotted";
    BarStyleType[BarStyleType["Heavy"] = 3] = "Heavy";
    BarStyleType[BarStyleType["LightLight"] = 4] = "LightLight";
})(BarStyleType = exports.BarStyleType || (exports.BarStyleType = {}));
function getBarStyleType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "regular") {
        return BarStyleType.Regular;
    }
    if (s == "light-heavy") {
        return BarStyleType.LightHeavy;
    }
    if (s == "heavy-light") {
        return BarStyleType.HeavyLight;
    }
    if (s == "short") {
        return BarStyleType.Short;
    }
    if (s == "none") {
        return BarStyleType.None;
    }
    if (s == "dashed") {
        return BarStyleType.Dashed;
    }
    if (s == "heavy-heavy") {
        return BarStyleType.HeavyHeavy;
    }
    if (s == "tick") {
        return BarStyleType.Tick;
    }
    if (s == "dotted") {
        return BarStyleType.Dotted;
    }
    if (s == "heavy") {
        return BarStyleType.Heavy;
    }
    if (s == "light-light") {
        return BarStyleType.LightLight;
    }
    return fallbackVal;
}
function xmlToBarStyle(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getBarStyleType(ch3, null);
    ret.data = dataData;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var StartStopDiscontinue;
(function (StartStopDiscontinue) {
    StartStopDiscontinue[StartStopDiscontinue["Discontinue"] = 2] = "Discontinue";
    StartStopDiscontinue[StartStopDiscontinue["Start"] = 0] = "Start";
    StartStopDiscontinue[StartStopDiscontinue["Stop"] = 1] = "Stop";
})(StartStopDiscontinue = exports.StartStopDiscontinue || (exports.StartStopDiscontinue = {}));
function getStartStopDiscontinue(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "discontinue") {
        return StartStopDiscontinue.Discontinue;
    }
    if (s == "start") {
        return StartStopDiscontinue.Start;
    }
    if (s == "stop") {
        return StartStopDiscontinue.Stop;
    }
    return fallbackVal;
}
function xmlToEnding(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "end-length") {
            var dataEndLength = getNumber(ch2, true);
            ret.endLength = dataEndLength;
        }
        if (ch2.name === "text-x") {
            var dataTextX = getNumber(ch2, true);
            ret.textX = dataTextX;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "text-y") {
            var dataTextY = getNumber(ch2, true);
            ret.textY = dataTextY;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopDiscontinue(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataEnding = getString(ch3, false);
    ret.ending = dataEnding;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var WingedType;
(function (WingedType) {
    WingedType[WingedType["None"] = 0] = "None";
    WingedType[WingedType["Curved"] = 2] = "Curved";
    WingedType[WingedType["DoubleCurved"] = 4] = "DoubleCurved";
    WingedType[WingedType["Straight"] = 1] = "Straight";
    WingedType[WingedType["DoubleStraight"] = 3] = "DoubleStraight";
})(WingedType = exports.WingedType || (exports.WingedType = {}));
function getWingedType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return WingedType.None;
    }
    if (s == "curved") {
        return WingedType.Curved;
    }
    if (s == "double-curved") {
        return WingedType.DoubleCurved;
    }
    if (s == "straight") {
        return WingedType.Straight;
    }
    if (s == "double-straight") {
        return WingedType.DoubleStraight;
    }
    return fallbackVal;
}
var DirectionTypeBg;
(function (DirectionTypeBg) {
    DirectionTypeBg[DirectionTypeBg["Forward"] = 1] = "Forward";
    DirectionTypeBg[DirectionTypeBg["Backward"] = 0] = "Backward";
})(DirectionTypeBg = exports.DirectionTypeBg || (exports.DirectionTypeBg = {}));
function getDirectionTypeBg(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "forward") {
        return DirectionTypeBg.Forward;
    }
    if (s == "backward") {
        return DirectionTypeBg.Backward;
    }
    return fallbackVal;
}
function xmlToRepeat(node) {
    var ret = {};
    var foundWinged = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "times") {
            var dataTimes = getString(ch2, true);
            ret.times = dataTimes;
        }
        if (ch2.name === "winged") {
            var dataWinged = getWingedType(ch2, WingedType.None);
            ret.winged = dataWinged;
            foundWinged = true;
        }
        if (ch2.name === "direction") {
            var dataDirection = getDirectionTypeBg(ch2, null);
            ret.direction = dataDirection;
        }
    }
    if (!foundWinged) {
        ret.winged = WingedType.None;
    }
    return ret;
}
/**
 * The tip-direction entity represents the direction in which
 * the tip of a stick or beater points, using Unicode arrow
 * terminology.
 */
var TipDirection;
(function (TipDirection) {
    TipDirection[TipDirection["Right"] = 3] = "Right";
    TipDirection[TipDirection["Northwest"] = 4] = "Northwest";
    TipDirection[TipDirection["Southwest"] = 7] = "Southwest";
    TipDirection[TipDirection["Down"] = 1] = "Down";
    TipDirection[TipDirection["Northeast"] = 5] = "Northeast";
    TipDirection[TipDirection["Southeast"] = 6] = "Southeast";
    TipDirection[TipDirection["Up"] = 0] = "Up";
    TipDirection[TipDirection["Left"] = 2] = "Left";
})(TipDirection = exports.TipDirection || (exports.TipDirection = {}));
function getTipDirection(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return TipDirection.Right;
    }
    if (s == "northwest") {
        return TipDirection.Northwest;
    }
    if (s == "southwest") {
        return TipDirection.Southwest;
    }
    if (s == "down") {
        return TipDirection.Down;
    }
    if (s == "northeast") {
        return TipDirection.Northeast;
    }
    if (s == "southeast") {
        return TipDirection.Southeast;
    }
    if (s == "up") {
        return TipDirection.Up;
    }
    if (s == "left") {
        return TipDirection.Left;
    }
    return fallbackVal;
}
function xmlToDirection(node) {
    var ret = {};
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "direction-type") {
            var dataDirectionTypes = xmlToDirectionType(ch);
            ret.directionTypes = (ret.directionTypes || []).concat(dataDirectionTypes);
        }
        if (ch.nodeName === "staff") {
            var dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "offset") {
            var dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
        if (ch.nodeName === "sound") {
            var dataSound = xmlToSound(ch);
            ret.sound = dataSound;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "directive") {
            var dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    ret._class = "Direction";
    return ret;
}
function xmlToDirectionType(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "percussion") {
            var dataPercussions = xmlToPercussion(ch);
            ret.percussions = (ret.percussions || []).concat(dataPercussions);
        }
        if (ch.nodeName === "rehearsal") {
            var dataRehearsals = xmlToRehearsal(ch);
            ret.rehearsals = (ret.rehearsals || []).concat(dataRehearsals);
        }
        if (ch.nodeName === "pedal") {
            var dataPedal = xmlToPedal(ch);
            ret.pedal = dataPedal;
        }
        if (ch.nodeName === "principal-voice") {
            var dataPrincipalVoice = xmlToPrincipalVoice(ch);
            ret.principalVoice = dataPrincipalVoice;
        }
        if (ch.nodeName === "accordion-registration") {
            var dataAccordionRegistration = xmlToAccordionRegistration(ch);
            ret.accordionRegistration = dataAccordionRegistration;
        }
        if (ch.nodeName === "eyeglasses") {
            var dataEyeglasses = xmlToEyeglasses(ch);
            ret.eyeglasses = dataEyeglasses;
        }
        if (ch.nodeName === "image") {
            var dataImage = xmlToImage(ch);
            ret.image = dataImage;
        }
        if (ch.nodeName === "harp-pedals") {
            var dataHarpPedals = xmlToHarpPedals(ch);
            ret.harpPedals = dataHarpPedals;
        }
        if (ch.nodeName === "metronome") {
            var dataMetronome = xmlToMetronome(ch);
            ret.metronome = dataMetronome;
        }
        if (ch.nodeName === "other-direction") {
            var dataOtherDirection = xmlToOtherDirection(ch);
            ret.otherDirection = dataOtherDirection;
        }
        if (ch.nodeName === "segno") {
            var dataSegnos = xmlToSegno(ch);
            ret.segnos = (ret.segnos || []).concat(dataSegnos);
        }
        if (ch.nodeName === "scordatura") {
            var dataScordatura = xmlToScordatura(ch);
            ret.scordatura = dataScordatura;
        }
        if (ch.nodeName === "string-mute") {
            var dataStringMute = xmlToStringMute(ch);
            ret.stringMute = dataStringMute;
        }
        if (ch.nodeName === "wedge") {
            var dataWedge = xmlToWedge(ch);
            ret.wedge = dataWedge;
        }
        if (ch.nodeName === "dashes") {
            var dataDashes = xmlToDashes(ch);
            ret.dashes = dataDashes;
        }
        if (ch.nodeName === "damp") {
            var dataDamp = xmlToDamp(ch);
            ret.damp = dataDamp;
        }
        if (ch.nodeName === "bracket") {
            var dataBracket = xmlToBracket(ch);
            ret.bracket = dataBracket;
        }
        if (ch.nodeName === "dynamics") {
            var dataDynamics = xmlToDynamics(ch);
            ret.dynamics = dataDynamics;
        }
        if (ch.nodeName === "octave-shift") {
            var dataOctaveShift = xmlToOctaveShift(ch);
            ret.octaveShift = dataOctaveShift;
        }
        if (ch.nodeName === "words") {
            var dataWords = xmlToWords(ch);
            ret.words = (ret.words || []).concat(dataWords);
        }
        if (ch.nodeName === "damp-all") {
            var dataDampAll = xmlToDampAll(ch);
            ret.dampAll = dataDampAll;
        }
        if (ch.nodeName === "coda") {
            var dataCodas = xmlToCoda(ch);
            ret.codas = (ret.codas || []).concat(dataCodas);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRehearsal(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToWords(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
var WedgeType;
(function (WedgeType) {
    WedgeType[WedgeType["Diminuendo"] = 1] = "Diminuendo";
    WedgeType[WedgeType["Crescendo"] = 0] = "Crescendo";
    WedgeType[WedgeType["Stop"] = 2] = "Stop";
    WedgeType[WedgeType["Continue"] = 3] = "Continue";
})(WedgeType = exports.WedgeType || (exports.WedgeType = {}));
function getWedgeType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "diminuendo") {
        return WedgeType.Diminuendo;
    }
    if (s == "crescendo") {
        return WedgeType.Crescendo;
    }
    if (s == "stop") {
        return WedgeType.Stop;
    }
    if (s == "continue") {
        return WedgeType.Continue;
    }
    return fallbackVal;
}
function xmlToWedge(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundNiente = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "niente") {
            var dataNiente = xmlToYesNo(ch2);
            ret.niente = dataNiente;
            foundNiente = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getWedgeType(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "spread") {
            var dataSpread = getNumber(ch2, true);
            ret.spread = dataSpread;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundNiente) {
        ret.niente = false;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDashes(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var LineEndType;
(function (LineEndType) {
    LineEndType[LineEndType["None"] = 4] = "None";
    LineEndType[LineEndType["Both"] = 2] = "Both";
    LineEndType[LineEndType["Arrow"] = 3] = "Arrow";
    LineEndType[LineEndType["Down"] = 1] = "Down";
    LineEndType[LineEndType["Up"] = 0] = "Up";
})(LineEndType = exports.LineEndType || (exports.LineEndType = {}));
function getLineEndType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return LineEndType.None;
    }
    if (s == "both") {
        return LineEndType.Both;
    }
    if (s == "arrow") {
        return LineEndType.Arrow;
    }
    if (s == "down") {
        return LineEndType.Down;
    }
    if (s == "up") {
        return LineEndType.Up;
    }
    return fallbackVal;
}
function xmlToBracket(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "end-length") {
            var dataEndLength = getNumber(ch2, true);
            ret.endLength = dataEndLength;
        }
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "line-end") {
            var dataLineEnd = getLineEndType(ch2, null);
            ret.lineEnd = dataLineEnd;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var PedalType;
(function (PedalType) {
    PedalType[PedalType["Change"] = 3] = "Change";
    PedalType[PedalType["Start"] = 0] = "Start";
    PedalType[PedalType["Stop"] = 1] = "Stop";
    PedalType[PedalType["Continue"] = 2] = "Continue";
})(PedalType = exports.PedalType || (exports.PedalType = {}));
function getPedalType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "change") {
        return PedalType.Change;
    }
    if (s == "start") {
        return PedalType.Start;
    }
    if (s == "stop") {
        return PedalType.Stop;
    }
    if (s == "continue") {
        return PedalType.Continue;
    }
    return fallbackVal;
}
function xmlToPedal(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line") {
            var dataLine = xmlToYesNo(ch2);
            ret.line = dataLine;
        }
        if (ch2.name === "sign") {
            var dataSign = xmlToYesNo(ch2);
            ret.sign = dataSign;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            var dataType = getPedalType(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToMetronome(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundJustify = false;
    var gotFirstPair = false;
    var gotSecondPair = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "metronome-note") {
            var dataMetronomeNotes = xmlToMetronomeNote(ch);
            ret.metronomeNotes = (ret.metronomeNotes || []).concat(dataMetronomeNotes);
        }
        if (ch.nodeName === "per-minute") {
            var dataPerMinute = xmlToPerMinute(ch);
            ret.perMinute = dataPerMinute;
        }
        if (ch.nodeName === "beat-unit") {
            var dataBeatUnit = getString(ch, true);
            if (!gotFirstPair) {
                ret.beatUnit = dataBeatUnit;
                gotFirstPair = true;
            }
            else if (!gotSecondPair) {
                ret.beatUnitChange = dataBeatUnit;
                gotSecondPair = true;
            }
            else {
                throw "Too many beat-units in metronome";
            }
        }
        if (ch.nodeName === "beat-unit-dot") {
            var dataBeatUnitDots = xmlToBeatUnitDot(ch);
            if (!gotSecondPair) {
                ret.beatUnitDots = (ret.beatUnitDots || []).concat(dataBeatUnitDots);
            }
            else {
                ret.beatUnitDotsChange = (ret.beatUnitDotsChange || []).concat(dataBeatUnitDots);
            }
        }
        if (ch.nodeName === "metronome-relation") {
            var dataMetronomeRelation = getString(ch, true);
            ret.metronomeRelation = dataMetronomeRelation;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToBeatUnitDot(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToPerMinute(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToMetronomeNote(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "metronome-dot") {
            var dataMetronomeDots = xmlToMetronomeDot(ch);
            ret.metronomeDots = (ret.metronomeDots || []).concat(dataMetronomeDots);
        }
        if (ch.nodeName === "metronome-beam") {
            var dataMetronomeBeams = xmlToMetronomeBeam(ch);
            ret.metronomeBeams = (ret.metronomeBeams || []).concat(dataMetronomeBeams);
        }
        if (ch.nodeName === "metronome-type") {
            var dataMetronomeType = getString(ch, true);
            ret.metronomeType = dataMetronomeType;
        }
        if (ch.nodeName === "metronome-tuplet") {
            var dataMetronomeTuplet = xmlToMetronomeTuplet(ch);
            ret.metronomeTuplet = dataMetronomeTuplet;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMetronomeDot(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMetronomeBeam(node) {
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    return ret;
}
function xmlToMetronomeTuplet(node) {
    var ret = {};
    var foundBracket = false;
    var foundShowNumber = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "actual-notes") {
            var dataActualNotes = getNumber(ch, true);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            var dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            var dataNormalNotes = getNumber(ch, true);
            ret.normalNotes = dataNormalNotes;
        }
        if (ch.nodeName === "normal-dot") {
            var dataNormalDots = xmlToNormalDot(ch);
            ret.normalDots = (ret.normalDots || []).concat(dataNormalDots);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "show-number") {
            var dataShowNumber = getActualBothNone(ch2, ActualBothNone.Both);
            ret.showNumber = dataShowNumber;
            foundShowNumber = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundShowNumber) {
        ret.showNumber = ActualBothNone.Both;
    }
    return ret;
}
var OctaveShiftType;
(function (OctaveShiftType) {
    OctaveShiftType[OctaveShiftType["Down"] = 2] = "Down";
    OctaveShiftType[OctaveShiftType["Stop"] = 3] = "Stop";
    OctaveShiftType[OctaveShiftType["Up"] = 1] = "Up";
    OctaveShiftType[OctaveShiftType["Continue"] = 4] = "Continue";
})(OctaveShiftType = exports.OctaveShiftType || (exports.OctaveShiftType = {}));
function getOctaveShiftType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return OctaveShiftType.Down;
    }
    if (s == "stop") {
        return OctaveShiftType.Stop;
    }
    if (s == "up") {
        return OctaveShiftType.Up;
    }
    if (s == "continue") {
        return OctaveShiftType.Continue;
    }
    return fallbackVal;
}
function xmlToOctaveShift(node) {
    var ret = {};
    var foundSize = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "size") {
            var dataSize = getNumber(ch2, true);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "dash-length") {
            var dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            var dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getOctaveShiftType(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundSize) {
        ret.size = 8;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToHarpPedals(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "pedal-tuning") {
            var dataPedalTunings = xmlToPedalTuning(ch);
            ret.pedalTunings = (ret.pedalTunings || []).concat(dataPedalTunings);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPedalTuning(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "pedal-step") {
            var dataPedalStep = getString(ch, true);
            ret.pedalStep = dataPedalStep;
        }
        if (ch.nodeName === "pedal-alter") {
            var dataPedalAlter = getString(ch, true);
            ret.pedalAlter = dataPedalAlter;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDamp(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToDampAll(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToEyeglasses(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToStringMute(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToScordatura(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "accord") {
            var dataAccords = xmlToAccord(ch);
            ret.accords = (ret.accords || []).concat(dataAccords);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToAccord(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "tuning-alter") {
            var dataTuningAlter = getString(ch, true);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            var dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            var dataTuningOctave = getString(ch, true);
            ret.tuningOctave = dataTuningOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "string") {
            var dataString = getString(ch2, true);
            ret.string = dataString;
        }
    }
    return ret;
}
function xmlToImage(node) {
    var ret = {};
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
        if (ch2.name === "source") {
            var dataSource = getString(ch2, true);
            ret.source = dataSource;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
var VoiceSymbol;
(function (VoiceSymbol) {
    VoiceSymbol[VoiceSymbol["None"] = 4] = "None";
    VoiceSymbol[VoiceSymbol["Hauptstimme"] = 1] = "Hauptstimme";
    VoiceSymbol[VoiceSymbol["Nebenstimme"] = 2] = "Nebenstimme";
    VoiceSymbol[VoiceSymbol["Plain"] = 3] = "Plain";
})(VoiceSymbol = exports.VoiceSymbol || (exports.VoiceSymbol = {}));
function getVoiceSymbol(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return VoiceSymbol.None;
    }
    if (s == "Hauptstimme") {
        return VoiceSymbol.Hauptstimme;
    }
    if (s == "Nebenstimme") {
        return VoiceSymbol.Nebenstimme;
    }
    if (s == "plain") {
        return VoiceSymbol.Plain;
    }
    return fallbackVal;
}
function xmlToPrincipalVoice(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getVoiceSymbol(ch2, null);
            ret.symbol = dataSymbol;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToAccordionRegistration(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "accordion-middle") {
            var dataAccordionMiddle = getString(ch, true);
            ret.accordionMiddle = dataAccordionMiddle;
        }
        if (ch.nodeName === "accordion-high") {
            var dataAccordionHigh = true;
            ret.accordionHigh = dataAccordionHigh;
        }
        if (ch.nodeName === "accordion-low") {
            var dataAccordionLow = true;
            ret.accordionLow = dataAccordionLow;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPercussion(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "stick-location") {
            var dataStickLocation = getString(ch, true);
            ret.stickLocation = dataStickLocation;
        }
        if (ch.nodeName === "other-percussion") {
            var dataOtherPercussion = getString(ch, true);
            ret.otherPercussion = dataOtherPercussion;
        }
        if (ch.nodeName === "wood") {
            var dataWood = getString(ch, true);
            ret.wood = dataWood;
        }
        if (ch.nodeName === "effect") {
            var dataEffect = getString(ch, true);
            ret.effect = dataEffect;
        }
        if (ch.nodeName === "glass") {
            var dataGlass = getString(ch, true);
            ret.glass = dataGlass;
        }
        if (ch.nodeName === "timpani") {
            var dataTimpani = xmlToTimpani(ch);
            ret.timpani = dataTimpani;
        }
        if (ch.nodeName === "stick") {
            var dataStick = xmlToStick(ch);
            ret.stick = dataStick;
        }
        if (ch.nodeName === "metal") {
            var dataMetal = getString(ch, true);
            ret.metal = dataMetal;
        }
        if (ch.nodeName === "pitched") {
            var dataPitched = getString(ch, true);
            ret.pitched = dataPitched;
        }
        if (ch.nodeName === "membrane") {
            var dataMembrane = getString(ch, true);
            ret.membrane = dataMembrane;
        }
        if (ch.nodeName === "beater") {
            var dataBeater = xmlToBeater(ch);
            ret.beater = dataBeater;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToTimpani(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBeater(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "tip") {
            var dataTip = getTipDirection(ch2, null);
            ret.tip = dataTip;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToStick(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "stick-material") {
            var dataStickMaterial = getString(ch, true);
            ret.stickMaterial = dataStickMaterial;
        }
        if (ch.nodeName === "stick-type") {
            var dataStickType = getString(ch, true);
            ret.stickType = dataStickType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "tip") {
            var dataTip = getTipDirection(ch2, null);
            ret.tip = dataTip;
        }
    }
    return ret;
}
function xmlToOffset(node) {
    var ret = {};
    var foundSound = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "sound") {
            var dataSound = xmlToYesNo(ch2);
            ret.sound = dataSound;
            foundSound = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundSound) {
        ret.sound = false;
    }
    return ret;
}
function xmlToHarmonyChord(node) {
    var ret = {
        root: null,
        function: null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null,
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "root") {
            var dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            var dataFunction = xmlToFunction(ch);
            ret.function = dataFunction;
        }
        if (ch.nodeName === "kind") {
            var dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            var dataDegree = xmlToDegree(ch);
            ret.degrees.push(dataDegree);
        }
        if (ch.nodeName === "inversion") {
            var dataInversion = xmlToInversion(ch);
            ret.inversion = dataInversion;
        }
        if (ch.nodeName === "bass") {
            var dataBass = xmlToBass(ch);
            ret.bass = dataBass;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
var ExplicitImpliedAlternate;
(function (ExplicitImpliedAlternate) {
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Explicit"] = 1] = "Explicit";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Implied"] = 2] = "Implied";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Alternate"] = 3] = "Alternate";
})(ExplicitImpliedAlternate = exports.ExplicitImpliedAlternate || (exports.ExplicitImpliedAlternate = {}));
function getExplicitImpliedAlternate(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "explicit") {
        return ExplicitImpliedAlternate.Explicit;
    }
    if (s == "implied") {
        return ExplicitImpliedAlternate.Implied;
    }
    if (s == "alternate") {
        return ExplicitImpliedAlternate.Alternate;
    }
    return fallbackVal;
}
function xmlToHarmony(node) {
    var ret = {
        frame: null,
        printFrame: null,
        staff: null,
        type: null,
        offset: null,
        root: null,
        function: null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null,
    };
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "frame") {
            var dataFrame = xmlToFrame(ch);
            ret.frame = dataFrame;
        }
        if (ch.nodeName === "root") {
            var dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            var dataFunction = xmlToFunction(ch);
            ret.function = dataFunction;
        }
        if (ch.nodeName === "kind") {
            var dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            var dataDegree = xmlToDegree(ch);
            ret.degrees.push(dataDegree);
        }
        if (ch.nodeName === "inversion") {
            var dataInversion = xmlToInversion(ch);
            ret.inversion = dataInversion;
        }
        if (ch.nodeName === "bass") {
            var dataBass = xmlToBass(ch);
            ret.bass = dataBass;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "staff") {
            var dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "offset") {
            var dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-frame") {
            var dataPrintFrame = xmlToYesNo(ch2);
            ret.printFrame = dataPrintFrame;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataHarmonyType = getExplicitImpliedAlternate(ch2, null);
            ret.type = dataHarmonyType;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    ret._class = "Harmony";
    return ret;
}
function xmlToRoot(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "root-step") {
            var dataRootStep = xmlToRootStep(ch);
            ret.rootStep = dataRootStep;
        }
        if (ch.nodeName === "root-alter") {
            var dataRootAlter = xmlToRootAlter(ch);
            ret.rootAlter = dataRootAlter;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRootStep(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToRootAlter(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFunction(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToKind(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "parentheses-degrees") {
            var dataParenthesesDegrees = xmlToYesNo(ch2);
            ret.parenthesesDegrees = dataParenthesesDegrees;
        }
        if (ch2.name === "use-symbols") {
            var dataUseSymbols = xmlToYesNo(ch2);
            ret.useSymbols = dataUseSymbols;
        }
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "stack-degrees") {
            var dataStackDegrees = xmlToYesNo(ch2);
            ret.stackDegrees = dataStackDegrees;
        }
        if (ch2.name === "bracket-degrees") {
            var dataBracketDegrees = xmlToYesNo(ch2);
            ret.bracketDegrees = dataBracketDegrees;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToInversion(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBass(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "bass-step") {
            var dataBassStep = xmlToBassStep(ch);
            ret.bassStep = dataBassStep;
        }
        if (ch.nodeName === "bass-alter") {
            var dataBassAlter = xmlToBassAlter(ch);
            ret.bassAlter = dataBassAlter;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBassStep(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBassAlter(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegree(node) {
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "degree-alter") {
            var dataDegreeAlter = xmlToDegreeAlter(ch);
            ret.degreeAlter = dataDegreeAlter;
        }
        if (ch.nodeName === "degree-value") {
            var dataDegreeValue = xmlToDegreeValue(ch);
            ret.degreeValue = dataDegreeValue;
        }
        if (ch.nodeName === "degree-type") {
            var dataDegreeType = xmlToDegreeType(ch);
            ret.degreeType = dataDegreeType;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
var ChordType;
(function (ChordType) {
    ChordType[ChordType["Augmented"] = 3] = "Augmented";
    ChordType[ChordType["Diminished"] = 4] = "Diminished";
    ChordType[ChordType["Major"] = 1] = "Major";
    ChordType[ChordType["Minor"] = 2] = "Minor";
    ChordType[ChordType["HalfDiminished"] = 5] = "HalfDiminished";
})(ChordType = exports.ChordType || (exports.ChordType = {}));
function getChordType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "augmented") {
        return ChordType.Augmented;
    }
    if (s == "diminished") {
        return ChordType.Diminished;
    }
    if (s == "major") {
        return ChordType.Major;
    }
    if (s == "minor") {
        return ChordType.Minor;
    }
    if (s == "half-diminished") {
        return ChordType.HalfDiminished;
    }
    return fallbackVal;
}
function xmlToDegreeValue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getChordType(ch2, null);
            ret.symbol = dataSymbol;
        }
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegreeAlter(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "plus-minus") {
            var dataPlusMinus = xmlToYesNo(ch2);
            ret.plusMinus = dataPlusMinus;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegreeType(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFrame(node) {
    var ret = {};
    var foundColor = false;
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "frame-strings") {
            var dataFrameStrings = getString(ch, true);
            ret.frameStrings = dataFrameStrings;
        }
        if (ch.nodeName === "frame-note") {
            var dataFrameNotes = xmlToFrameNote(ch);
            ret.frameNotes = (ret.frameNotes || []).concat(dataFrameNotes);
        }
        if (ch.nodeName === "frame-frets") {
            var dataFrameFrets = getString(ch, true);
            ret.frameFrets = dataFrameFrets;
        }
        if (ch.nodeName === "first-fret") {
            var dataFirstFret = xmlToFirstFret(ch);
            ret.firstFret = dataFirstFret;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "unplayed") {
            var dataUnplayed = getString(ch2, true);
            ret.unplayed = dataUnplayed;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "width") {
            var dataWidth = getNumber(ch2, true);
            ret.width = dataWidth;
        }
        if (ch2.name === "height") {
            var dataHeight = getNumber(ch2, true);
            ret.height = dataHeight;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToFirstFret(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "text") {
            var dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "location") {
            var dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToFrameNote(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "barre") {
            var dataBarre = xmlToBarre(ch);
            ret.barre = dataBarre;
        }
        if (ch.nodeName === "string") {
            var dataString = xmlToString(ch);
            ret.string = dataString;
        }
        if (ch.nodeName === "fingering") {
            var dataFingering = xmlToFingering(ch);
            ret.fingering = dataFingering;
        }
        if (ch.nodeName === "fret") {
            var dataFret = xmlToFret(ch);
            ret.fret = dataFret;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBarre(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGrouping(node) {
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "feature") {
            var dataFeatures = xmlToFeature(ch);
            ret.features = (ret.features || []).concat(dataFeatures);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            var dataGroupingType = getStartStopSingle(ch2, null);
            ret.type = dataGroupingType;
        }
        if (ch2.name === "member-of") {
            var dataMemberOf = getString(ch2, true);
            ret.memberOf = dataMemberOf;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    ret._class = "Grouping";
    return ret;
}
function xmlToFeature(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToPrint(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "measure-numbering") {
            var dataMeasureNumbering = xmlToMeasureNumbering(ch);
            ret.measureNumbering = dataMeasureNumbering;
        }
        if (ch.nodeName === "part-name-display") {
            var dataPartNameDisplay = xmlToPartNameDisplay(ch);
            ret.partNameDisplay = dataPartNameDisplay;
        }
        if (ch.nodeName === "measure-layout") {
            var dataMeasureLayout = xmlToMeasureLayout(ch);
            ret.measureLayout = dataMeasureLayout;
        }
        if (ch.nodeName === "part-abbreviation-display") {
            var dataPartAbbreviationDisplay = xmlToPartAbbreviationDisplay(ch);
            ret.partAbbreviationDisplay = dataPartAbbreviationDisplay;
        }
        if (ch.nodeName === "page-layout") {
            var dataPageLayout = xmlToPageLayout(ch);
            ret.pageLayout = dataPageLayout;
        }
        if (ch.nodeName === "system-layout") {
            var dataSystemLayout = xmlToSystemLayout(ch);
            ret.systemLayout = dataSystemLayout;
        }
        if (ch.nodeName === "staff-layout") {
            var dataStaffLayouts = xmlToStaffLayout(ch);
            ret.staffLayouts = (ret.staffLayouts || []).concat(dataStaffLayouts);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "new-system") {
            var dataNewSystem = xmlToYesNo(ch2);
            ret.newSystem = dataNewSystem;
        }
        if (ch2.name === "new-page") {
            var dataNewPage = xmlToYesNo(ch2);
            ret.newPage = dataNewPage;
        }
        if (ch2.name === "blank-page") {
            var dataBlankPage = getString(ch2, true);
            ret.blankPage = dataBlankPage;
        }
        if (ch2.name === "staff-spacing") {
            var dataStaffSpacing = getNumber(ch2, true);
            ret.staffSpacing = dataStaffSpacing;
        }
        if (ch2.name === "page-number") {
            var dataPageNumber = getString(ch2, true);
            ret.pageNumber = dataPageNumber;
        }
    }
    ret._class = "Print";
    return ret;
}
function xmlToMeasureNumbering(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToSound(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "midi-instrument") {
            var dataMidiInstruments = xmlToMidiInstrument(ch);
            ret.midiInstruments = (ret.midiInstruments || []).concat(dataMidiInstruments);
        }
        if (ch.nodeName === "play") {
            var dataPlays = xmlToPlay(ch);
            ret.plays = (ret.plays || []).concat(dataPlays);
        }
        if (ch.nodeName === "offset") {
            var dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
        if (ch.nodeName === "midi-device") {
            var dataMidiDevices = xmlToMidiDevice(ch);
            ret.midiDevices = (ret.midiDevices || []).concat(dataMidiDevices);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "soft-pedal") {
            var dataSoftPedal = getString(ch2, true);
            ret.softPedal = dataSoftPedal;
        }
        if (ch2.name === "pan") {
            var dataPan = getString(ch2, true);
            ret.pan = dataPan;
        }
        if (ch2.name === "tocoda") {
            var dataTocoda = getString(ch2, true);
            ret.tocoda = dataTocoda;
        }
        if (ch2.name === "decapo") {
            var dataDecapo = xmlToYesNo(ch2);
            ret.decapo = dataDecapo;
        }
        if (ch2.name === "divisions") {
            var dataDivisions = getNumber(ch2, true);
            ret.divisions = dataDivisions;
        }
        if (ch2.name === "pizzicato") {
            var dataPizzicato = xmlToYesNo(ch2);
            ret.pizzicato = dataPizzicato;
        }
        if (ch2.name === "coda") {
            var dataCoda = getString(ch2, true);
            ret.coda = dataCoda;
        }
        if (ch2.name === "segno") {
            var dataSegno = getString(ch2, true);
            ret.segno = dataSegno;
        }
        if (ch2.name === "elevation") {
            var dataElevation = getString(ch2, true);
            ret.elevation = dataElevation;
        }
        if (ch2.name === "fine") {
            var dataFine = getString(ch2, true);
            ret.fine = dataFine;
        }
        if (ch2.name === "damper-pedal") {
            var dataDamperPedal = getString(ch2, true);
            ret.damperPedal = dataDamperPedal;
        }
        if (ch2.name === "dynamics") {
            var dataDynamics = getString(ch2, true);
            ret.dynamics = dataDynamics;
        }
        if (ch2.name === "time-only") {
            var dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
        if (ch2.name === "sostenuto-pedal") {
            var dataSostenutoPedal = getString(ch2, true);
            ret.sostenutoPedal = dataSostenutoPedal;
        }
        if (ch2.name === "dalsegno") {
            var dataDalsegno = getString(ch2, true);
            ret.dalsegno = dataDalsegno;
        }
        if (ch2.name === "tempo") {
            var dataTempo = getString(ch2, true);
            ret.tempo = dataTempo;
        }
        if (ch2.name === "forward-repeat") {
            var dataForwardRepeat = xmlToYesNo(ch2);
            ret.forwardRepeat = dataForwardRepeat;
        }
    }
    ret._class = "Sound";
    return ret;
}
function xmlToWork(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "work-number") {
            var dataWorkNumber = getString(ch, true);
            ret.workNumber = dataWorkNumber;
        }
        if (ch.nodeName === "work-title") {
            var dataWorkTitle = getString(ch, true);
            ret.workTitle = dataWorkTitle;
        }
        if (ch.nodeName === "opus") {
            var dataOpus = xmlToOpus(ch);
            ret.opus = dataOpus;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToOpus(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDefaults(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "word-font") {
            var dataWordFont = xmlToWordFont(ch);
            ret.wordFont = dataWordFont;
        }
        if (ch.nodeName === "lyric-language") {
            var dataLyricLanguages = xmlToLyricLanguage(ch);
            ret.lyricLanguages = (ret.lyricLanguages || []).concat(dataLyricLanguages);
        }
        if (ch.nodeName === "lyric-font") {
            var dataLyricFonts = xmlToLyricFont(ch);
            ret.lyricFonts = (ret.lyricFonts || []).concat(dataLyricFonts);
        }
        if (ch.nodeName === "page-layout") {
            var dataPageLayout = xmlToPageLayout(ch);
            ret.pageLayout = dataPageLayout;
        }
        if (ch.nodeName === "system-layout") {
            var dataSystemLayout = xmlToSystemLayout(ch);
            ret.systemLayout = dataSystemLayout;
        }
        if (ch.nodeName === "appearance") {
            var dataAppearance = xmlToAppearance(ch);
            ret.appearance = dataAppearance;
        }
        if (ch.nodeName === "scaling") {
            var dataScaling = xmlToScaling(ch);
            ret.scaling = dataScaling;
        }
        if (ch.nodeName === "staff-layout") {
            var dataStaffLayouts = xmlToStaffLayout(ch);
            ret.staffLayouts = (ret.staffLayouts || []).concat(dataStaffLayouts);
        }
        if (ch.nodeName === "music-font") {
            var dataMusicFont = xmlToMusicFont(ch);
            ret.musicFont = dataMusicFont;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMusicFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToWordFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToLyricFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToLyricLanguage(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    return ret;
}
function xmlToCredit(node) {
    var ret = {};
    ret.creditWords = [];
    var foundCreditTypes = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "credit-type") {
            var dataCreditTypes = getString(ch, true);
            ret.creditTypes = (ret.creditTypes || []).concat(dataCreditTypes);
            foundCreditTypes = true;
        }
        if (ch.nodeName === "credit-words") {
            var dataCreditWords = xmlToCreditWords(ch);
            ret.creditWords.push(dataCreditWords);
        }
        if (ch.nodeName === "credit-image") {
            var dataCreditImage = xmlToCreditImage(ch);
            ret.creditImage = dataCreditImage;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "page") {
            var dataPage = getNumber(ch2, true);
            ret.page = dataPage;
        }
    }
    if (!foundCreditTypes) {
        ret.creditTypes = [];
    }
    return ret;
}
function xmlToCreditWords(node) {
    var ret = {};
    var foundJustify = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundLineHeight = false;
    var foundDir = false;
    var foundEnclosure = false;
    var foundFontFamily = false;
    var foundRelativeX = false;
    var foundRelativeY = false;
    var foundDefaultX = false;
    var foundDefaultY = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
            foundDefaultX = true;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
            foundRelativeY = true;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
            foundDefaultY = true;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
            foundRelativeX = true;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            var dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            var dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            var dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            var dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            var dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            var dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataWords = getString(ch3, true);
    ret.words = dataWords;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    if (!foundFontFamily) {
        ret.fontFamily = "";
    }
    if (!foundRelativeX) {
        ret.relativeX = null;
    }
    if (!foundRelativeY) {
        ret.relativeY = null;
    }
    if (!foundDefaultX) {
        ret.defaultX = null;
    }
    if (!foundDefaultY) {
        ret.defaultY = null;
    }
    return ret;
}
function xmlToCreditImage(node) {
    var ret = {};
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
        if (ch2.name === "source") {
            var dataSource = getString(ch2, true);
            ret.source = dataSource;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPartList(node) {
    var ret = [];
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "score-part") {
            var dataScoreParts = xmlToScorePart(ch);
            ret.push(dataScoreParts);
        }
        if (ch.nodeName === "part-group") {
            var dataPartGroups = xmlToPartGroup(ch);
            ret.push(dataPartGroups);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScorePart(node) {
    var ret = {
        _class: "ScorePart",
        identification: null,
        partNameDisplay: null,
        scoreInstruments: [],
        midiDevices: [],
        partName: null,
        partAbbreviationDisplay: null,
        partAbbreviation: null,
        groups: [],
        midiInstruments: [],
        id: "",
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "identification") {
            var dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "part-name-display") {
            var dataPartNameDisplay = xmlToPartNameDisplay(ch);
            ret.partNameDisplay = dataPartNameDisplay;
        }
        if (ch.nodeName === "score-instrument") {
            var dataScoreInstruments = xmlToScoreInstrument(ch);
            ret.scoreInstruments = (ret.scoreInstruments || []).concat(dataScoreInstruments);
        }
        if (ch.nodeName === "midi-device") {
            var dataMidiDevices = xmlToMidiDevice(ch);
            ret.midiDevices = (ret.midiDevices || []).concat(dataMidiDevices);
        }
        if (ch.nodeName === "part-name") {
            var dataPartName = xmlToPartName(ch);
            ret.partName = dataPartName;
        }
        if (ch.nodeName === "part-abbreviation-display") {
            var dataPartAbbreviationDisplay = xmlToPartAbbreviationDisplay(ch);
            ret.partAbbreviationDisplay = dataPartAbbreviationDisplay;
        }
        if (ch.nodeName === "part-abbreviation") {
            var dataPartAbbreviation = xmlToPartAbbreviation(ch);
            ret.partAbbreviation = dataPartAbbreviation;
        }
        if (ch.nodeName === "group") {
            var dataGroups = getString(ch, true);
            ret.groups = (ret.groups || []).concat(dataGroups);
        }
        if (ch.nodeName === "midi-instrument") {
            var dataMidiInstruments = xmlToMidiInstrument(ch);
            ret.midiInstruments = (ret.midiInstruments || []).concat(dataMidiInstruments);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToPartName(node) {
    var ret = {
        partName: "",
        defaultX: null,
        defaultY: null,
        relativeX: null,
        relativeY: null,
        fontFamily: "",
        fontSize: "",
    };
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataPartName = getString(ch3, true);
    ret.partName = dataPartName;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToPartAbbreviation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataAbbreviation = getString(ch3, true);
    ret.abbreviation = dataAbbreviation;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToPartGroup(node) {
    var ret = {
        _class: "PartGroup",
    };
    var foundNumber_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "group-name-display") {
            var dataGroupNameDisplay = xmlToGroupNameDisplay(ch);
            ret.groupNameDisplay = dataGroupNameDisplay;
        }
        if (ch.nodeName === "group-symbol") {
            var dataGroupSymbol = xmlToGroupSymbol(ch);
            ret.groupSymbol = dataGroupSymbol;
        }
        if (ch.nodeName === "group-name") {
            var dataGroupName = xmlToGroupName(ch);
            ret.groupName = dataGroupName;
        }
        if (ch.nodeName === "group-abbreviation-display") {
            var dataGroupAbbreviationDisplay = xmlToGroupAbbreviationDisplay(ch);
            ret.groupAbbreviationDisplay = dataGroupAbbreviationDisplay;
        }
        if (ch.nodeName === "group-barline") {
            var dataGroupBarline = xmlToGroupBarline(ch);
            ret.groupBarline = dataGroupBarline;
        }
        if (ch.nodeName === "footnote") {
            var dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            var dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "group-abbreviation") {
            var dataGroupAbbreviation = xmlToGroupAbbreviation(ch);
            ret.groupAbbreviation = dataGroupAbbreviation;
        }
        if (ch.nodeName === "group-time") {
            var dataGroupTime = xmlToGroupTime(ch);
            ret.groupTime = dataGroupTime;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    return ret;
}
function xmlToGroupName(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundJustify = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataName = getString(ch3, true);
    ret.name = dataName;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToGroupAbbreviation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundJustify = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToGroupSymbol(node) {
    var ret = {};
    var foundData = false;
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            var dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            var dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            var dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            var dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getPartSymbolType(ch3, PartSymbolType.None);
    ret.data = dataData;
    if (!foundData) {
        ret.data = PartSymbolType.None;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGroupBarline(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGroupTime(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreInstrument(node) {
    var ret = {
        instrumentName: "",
        instrumentSound: "",
        ensemble: "",
        virtualInstrument: null,
        instrumentAbbreviation: "",
        solo: null,
        id: "",
    };
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "instrument-name") {
            var dataInstrumentName = getString(ch, true);
            ret.instrumentName = dataInstrumentName;
        }
        if (ch.nodeName === "instrument-sound") {
            var dataInstrumentSound = getString(ch, true);
            ret.instrumentSound = dataInstrumentSound;
        }
        if (ch.nodeName === "ensemble") {
            var dataEnsemble = getString(ch, true);
            ret.ensemble = dataEnsemble;
        }
        if (ch.nodeName === "virtual-instrument") {
            var dataVirtualInstrument = xmlToVirtualInstrument(ch);
            ret.virtualInstrument = dataVirtualInstrument;
        }
        if (ch.nodeName === "instrument-abbreviation") {
            var dataInstrumentAbbreviation = getString(ch, true);
            ret.instrumentAbbreviation = dataInstrumentAbbreviation;
        }
        if (ch.nodeName === "solo") {
            var dataSolo = xmlToSolo(ch);
            ret.solo = dataSolo;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToSolo(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToVirtualInstrument(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "virtual-library") {
            var dataVirtualLibrary = getString(ch, true);
            ret.virtualLibrary = dataVirtualLibrary;
        }
        if (ch.nodeName === "virtual-name") {
            var dataVirtualName = getString(ch, true);
            ret.virtualName = dataVirtualName;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreHeader(node) {
    var ret = {};
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "movement-title") {
            var dataMovementTitle = getString(ch, true);
            ret.movementTitle = dataMovementTitle;
        }
        if (ch.nodeName === "identification") {
            var dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "defaults") {
            var dataDefaults = xmlToDefaults(ch);
            ret.defaults = dataDefaults;
        }
        if (ch.nodeName === "work") {
            var dataWork = xmlToWork(ch);
            ret.work = dataWork;
        }
        if (ch.nodeName === "credit") {
            var dataCredits = xmlToCredit(ch);
            ret.credits = (ret.credits || []).concat(dataCredits);
        }
        if (ch.nodeName === "part-list") {
            var dataPartList = xmlToPartList(ch);
            ret.partList = dataPartList;
        }
        if (ch.nodeName === "movement-number") {
            var dataMovementNumber = getString(ch, true);
            ret.movementNumber = dataMovementNumber;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreTimewise(node) {
    var ret = {};
    var foundVersion_ = false;
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "measure") {
            var dataMeasures = xmlToMeasure(ch);
            ret.measures = (ret.measures || []).concat(dataMeasures);
        }
        if (ch.nodeName === "movement-title") {
            var dataMovementTitle = getString(ch, true);
            ret.movementTitle = dataMovementTitle;
        }
        if (ch.nodeName === "identification") {
            var dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "defaults") {
            var dataDefaults = xmlToDefaults(ch);
            ret.defaults = dataDefaults;
        }
        if (ch.nodeName === "work") {
            var dataWork = xmlToWork(ch);
            ret.work = dataWork;
        }
        if (ch.nodeName === "credit") {
            var dataCredits = xmlToCredit(ch);
            ret.credits = (ret.credits || []).concat(dataCredits);
        }
        if (ch.nodeName === "part-list") {
            var dataPartList = xmlToPartList(ch);
            ret.partList = dataPartList;
        }
        if (ch.nodeName === "movement-number") {
            var dataMovementNumber = getString(ch, true);
            ret.movementNumber = dataMovementNumber;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "version") {
            var dataVersion = getString(ch2, true);
            ret.version = dataVersion;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version = "1.0";
    }
    return ret;
}
function xmlToPart(node) {
    var rarr = [];
    for (var i = 0; i < node.children.length; ++i) {
        var ch = node.children[i];
        if (ch.nodeName === "note") {
            var data = xmlToNote(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "backup") {
            var data = xmlToBackup(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "harmony") {
            var data = xmlToHarmony(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "forward") {
            var data = xmlToForward(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "print") {
            var data = xmlToPrint(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "figured-bass") {
            var data = xmlToFiguredBass(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "direction") {
            var data = xmlToDirection(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "attributes") {
            var data = xmlToAttributes(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "sound") {
            var data = xmlToSound(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "barline") {
            var data = xmlToBarline(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "grouping") {
            var data = xmlToGrouping(ch);
            rarr = (rarr || []).concat(data);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return rarr;
}
/*---- Serialization ----------------------------------------------------------------------------*/
/**
 * Safe, escaped tagged template handler.
 */
function xml(literals) {
    var vals = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        vals[_i - 1] = arguments[_i];
    }
    var escaped = "";
    for (var i = 0; i < literals.length; ++i) {
        escaped += literals[i];
        if (i < vals.length) {
            escaped += ("" + vals[i])
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/"/g, "&apos;");
        }
    }
    return escaped;
}
/**
 * Safe tagged template handler for YesNo.
 */
function yesNo(literals) {
    var booleans = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        booleans[_i - 1] = arguments[_i];
    }
    var escaped = "";
    for (var i = 0; i < literals.length; ++i) {
        escaped += literals[i];
        if (i < booleans.length) {
            escaped += booleans[i] ? "yes" : "no";
        }
    }
    return escaped;
}
/**
 * Unescaped tagged template literal
 */
function dangerous(literals) {
    var vals = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        vals[_i - 1] = arguments[_i];
    }
    var result = "";
    for (var i = 0; i < literals.length; ++i) {
        result += literals[i];
        if (i < vals.length) {
            result += vals[i];
        }
    }
    return result;
}
function defined(val) {
    return val !== undefined && val !== null && val !== "";
}
function scalingToXML(scaling) {
    // <!ELEMENT scaling (millimeters, tenths)>
    var children = [];
    if (defined(scaling.millimeters)) {
        children.push(millimetersToXML(scaling.millimeters));
    }
    if (defined(scaling.tenths)) {
        children.push(tenthsToXML(scaling.tenths));
    }
    return dangerous(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<scaling>\n", "\n</scaling>"], ["<scaling>\\n", "\\n</scaling>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function millimetersToXML(mm) {
    return xml(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<millimeters>", "</millimeters>"], ["<millimeters>", "</millimeters>"])), mm);
}
function tenthsToXML(tenths) {
    return xml(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<tenths>", "</tenths>"], ["<tenths>", "</tenths>"])), tenths);
}
function pageLayoutToXML(pageLayout) {
    // <!ELEMENT page-layout ((page-height, page-width)?,
    //     (page-margins, page-margins?)?)>
    // <!ELEMENT page-height %layout-tenths;>
    // <!ELEMENT page-width %layout-tenths;>
    var children = [];
    if (defined(pageLayout.pageHeight)) {
        children.push(xml(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<page-height>", "</page-height>"], ["<page-height>", "</page-height>"])), pageLayout.pageHeight));
    }
    if (defined(pageLayout.pageWidth)) {
        children.push(xml(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<page-width>", "</page-width>"], ["<page-width>", "</page-width>"])), pageLayout.pageWidth));
    }
    (pageLayout.pageMargins || []).forEach(function (pageMargins) {
        children.push(pageMarginsToXML(pageMargins));
    });
    return dangerous(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<page-layout>\n", "\n</page-layout>"], ["<page-layout>\\n", "\\n</page-layout>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var oddEvenBothToXML = {
    2: "both",
    1: "even",
    0: "odd",
};
function pageMarginsToXML(pageMargins) {
    // <!ELEMENT page-margins (left-margin, right-margin,
    //     top-margin, bottom-margin)>
    // <!ATTLIST page-margins
    //     type (odd | even | both) #IMPLIED
    // >
    var children = [];
    children = children.concat(hmarginsToXML(pageMargins));
    children = children.concat(vmarginsToXML(pageMargins));
    var attribs = "";
    if (defined(pageMargins.type)) {
        attribs += xml(templateObject_7 || (templateObject_7 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), oddEvenBothToXML[pageMargins.type]);
    }
    return dangerous(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<page-margins", ">\n", "\n</page-margins>"], ["<page-margins", ">\\n", "\\n</page-margins>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function hmarginsToXML(hmargins) {
    // <!ELEMENT left-margin %layout-tenths;>
    // <!ELEMENT right-margin %layout-tenths;>
    var children = [];
    if (defined(hmargins.leftMargin)) {
        children.push(xml(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<left-margin>", "</left-margin>"], ["<left-margin>", "</left-margin>"])), hmargins.leftMargin));
    }
    if (defined(hmargins.rightMargin)) {
        children.push(xml(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<right-margin>", "</right-margin>"], ["<right-margin>", "</right-margin>"])), hmargins.rightMargin));
    }
    return children;
}
function vmarginsToXML(hmargins) {
    // <!ELEMENT top-margin %layout-tenths;>
    // <!ELEMENT bottom-margin %layout-tenths;>
    var children = [];
    if (defined(hmargins.topMargin)) {
        children.push(xml(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<top-margin>", "</top-margin>"], ["<top-margin>", "</top-margin>"])), hmargins.topMargin));
    }
    if (defined(hmargins.bottomMargin)) {
        children.push(xml(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<bottom-margin>", "</bottom-margin>"], ["<bottom-margin>", "</bottom-margin>"])), hmargins.bottomMargin));
    }
    return children;
}
function systemLayoutToXML(systemLayout) {
    // <!ELEMENT system-layout
    //     (system-margins?, system-distance?,
    //      top-system-distance?, system-dividers?)>
    var children = [];
    if (defined(systemLayout.systemMargins)) {
        children.push(systemMarginsToXML(systemLayout.systemMargins));
    }
    if (defined(systemLayout.systemDistance)) {
        children.push(xml(templateObject_13 || (templateObject_13 = __makeTemplateObject(["<system-distance>", "</system-distance>"], ["<system-distance>", "</system-distance>"])), systemLayout.systemDistance));
    }
    if (defined(systemLayout.topSystemDistance)) {
        children.push(xml(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<top-system-distance>", "</top-system-distance>"], ["<top-system-distance>", "</top-system-distance>"])), systemLayout.topSystemDistance));
    }
    if (defined(systemLayout.systemDividers)) {
        children.push(systemDividersToXML(systemLayout.systemDividers));
    }
    return dangerous(templateObject_15 || (templateObject_15 = __makeTemplateObject(["<system-layout>\n", "\n</system-layout>"], ["<system-layout>\\n", "\\n</system-layout>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function systemMarginsToXML(systemMargins) {
    // <!ELEMENT system-margins (left-margin, right-margin)>
    var children = hmarginsToXML(systemMargins);
    return dangerous(templateObject_16 || (templateObject_16 = __makeTemplateObject(["<system-margins>\n", "\n</system-margins>"], ["<system-margins>\\n", "\\n</system-margins>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function systemDividersToXML(systemDividers) {
    // <!ELEMENT system-dividers (left-divider, right-divider)>
    // <!ELEMENT left-divider EMPTY>
    // <!ATTLIST left-divider
    //     %print-object;
    //     %print-style-align;
    // >
    // <!ELEMENT right-divider EMPTY>
    // <!ATTLIST right-divider
    //     %print-object;
    //     %print-style-align;
    // >
    var children = [];
    if (defined(systemDividers.leftDivider)) {
        children.push(xml(templateObject_17 || (templateObject_17 = __makeTemplateObject(["<left-divider", " />"], ["<left-divider", " />"])), printObjectToXML(systemDividers.leftDivider) +
            printStyleAlignToXML(systemDividers.leftDivider)));
    }
    if (defined(systemDividers.rightDivider)) {
        children.push(xml(templateObject_18 || (templateObject_18 = __makeTemplateObject(["<right-divider", " />"], ["<right-divider", " />"])), printObjectToXML(systemDividers.rightDivider) +
            printStyleAlignToXML(systemDividers.rightDivider)));
    }
    return dangerous(templateObject_19 || (templateObject_19 = __makeTemplateObject(["<system-dividers>\n", "\n</system-dividers>"], ["<system-dividers>\\n", "\\n</system-dividers>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function appearanceToXML(appearance) {
    // <!ELEMENT appearance
    //     (line-width*, note-size*, distance*,
    //      other-appearance*)>
    var children = [];
    Object.keys(appearance.lineWidths || {}).forEach(function (key) {
        children.push(lineWidthToXML(appearance.lineWidths[key]));
    });
    Object.keys(appearance.noteSizes || {}).forEach(function (key) {
        children.push(noteSizeToXML(appearance.noteSizes[key]));
    });
    Object.keys(appearance.distances || {}).forEach(function (key) {
        children.push(distanceToXML(appearance.distances[key]));
    });
    // TODO: fix musicxml-interfaces
    // appearance.otherAppearances.forEach(otherAppearance => {
    //     children.push(otherAppearanceToXML(otherAppearance));
    // });
    return dangerous(templateObject_20 || (templateObject_20 = __makeTemplateObject(["<appearance>\n", "\n</appearance>"], ["<appearance>\\n", "\\n</appearance>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function lineWidthToXML(lineWidth) {
    // <!ELEMENT line-width %layout-tenths;>
    // <!ATTLIST line-width
    //     type CDATA #REQUIRED
    // >
    return xml(templateObject_21 || (templateObject_21 = __makeTemplateObject(["<line-width type=\"", "\">", "</line-width>"], ["<line-width type=\"", "\">", "</line-width>"])), lineWidth.type, lineWidth.tenths);
}
var cueGraceLargeToXML = {
    1: "grace",
    0: "cue",
    2: "large",
};
function noteSizeToXML(noteSize) {
    // <!ELEMENT note-size (#PCDATA)>
    // <!ATTLIST note-size
    //     type (cue | grace | large) #REQUIRED
    // >
    return xml(templateObject_22 || (templateObject_22 = __makeTemplateObject(["<note-size type=\"", "\">", "</note-size>"], ["<note-size type=\"", "\">", "</note-size>"])), cueGraceLargeToXML[noteSize.type], noteSize.size);
}
function distanceToXML(distance) {
    // <!ELEMENT distance %layout-tenths;>
    // <!ATTLIST distance
    //     type CDATA #REQUIRED
    // >
    return xml(templateObject_23 || (templateObject_23 = __makeTemplateObject(["<distance type=\"", "\">", "</distance>"], ["<distance type=\"", "\">", "</distance>"])), distance.type, distance.tenths);
}
function workToXML(work) {
    // <!ELEMENT work (work-number?, work-title?, opus?)>
    if (!work || (!work.workNumber && !work.workTitle)) {
        return xml(templateObject_24 || (templateObject_24 = __makeTemplateObject(["<!-- no work metadata -->"], ["<!-- no work metadata -->"])));
    }
    var children = [];
    if (defined(work.workNumber)) {
        // <!ELEMENT work-number (#PCDATA)>
        children.push(xml(templateObject_25 || (templateObject_25 = __makeTemplateObject(["<work-number>", "</work-number>"], ["<work-number>", "</work-number>"])), work.workNumber));
    }
    if (defined(work.workTitle)) {
        // <!ELEMENT work-title (#PCDATA)>
        children.push(xml(templateObject_26 || (templateObject_26 = __makeTemplateObject(["<work-title>", "</work-title>"], ["<work-title>", "</work-title>"])), work.workTitle));
    }
    if (defined(work.opus) && !!work.opus) {
        // <!ELEMENT opus EMPTY>
        // <!ATTLIST opus
        //     %link-attributes;
        //     >
        console.warn("link-attributes in <opus /> aren't implemented."); // TODO: IMPLEMENT link-attributes
        children.push(dangerous(templateObject_27 || (templateObject_27 = __makeTemplateObject(["<opus />"], ["<opus />"]))));
    }
    return dangerous(templateObject_28 || (templateObject_28 = __makeTemplateObject(["<work>\n", "\n</work>"], ["<work>\\n", "\\n</work>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function movementNumberToXML(movementNumber) {
    // <!ELEMENT movement-number (#PCDATA)>
    if (!movementNumber) {
        return xml(templateObject_29 || (templateObject_29 = __makeTemplateObject(["<!-- no movement-number metadata -->"], ["<!-- no movement-number metadata -->"])));
    }
    return xml(templateObject_30 || (templateObject_30 = __makeTemplateObject(["<movement-number>", "</movement-number>"], ["<movement-number>", "</movement-number>"])), movementNumber);
}
function movementTitleToXML(movementTitle) {
    // <!ELEMENT movement-title (#PCDATA)>
    if (!movementTitle) {
        return xml(templateObject_31 || (templateObject_31 = __makeTemplateObject(["<!-- no movement-title metadata -->"], ["<!-- no movement-title metadata -->"])));
    }
    return xml(templateObject_32 || (templateObject_32 = __makeTemplateObject(["<movement-title>", "</movement-title>"], ["<movement-title>", "</movement-title>"])), movementTitle);
}
function identificationToXML(identification) {
    // <!ELEMENT identification (creator*, rights*, encoding?,
    //     source?, relation*, miscellaneous?)>
    var children = [];
    (identification.creators || []).forEach(function (creator) {
        children.push(creatorToXML(creator));
    });
    (identification.rights || []).forEach(function (rights) {
        children.push(rightsToXML(rights));
    });
    if (defined(identification.encoding)) {
        children.push(encodingToXML(identification.encoding));
    }
    if (defined(identification.source) && !!identification.source) {
        children.push(sourceToXML(identification.source));
    }
    (identification.relations || []).forEach(function (relation) {
        children.push(relationToXML(relation));
    });
    if (defined(identification.miscellaneous)) {
        children.push(miscellaneousToXML(identification.miscellaneous));
    }
    return dangerous(templateObject_33 || (templateObject_33 = __makeTemplateObject(["<identification>\n", "\n</identification>"], ["<identification>\\n", "\\n</identification>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function creatorToXML(creator) {
    // <!ELEMENT creator (#PCDATA)>
    // <!ATTLIST creator
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (creator.type) {
        attribs += xml(templateObject_34 || (templateObject_34 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), creator.type);
    }
    var pcdata = xml(templateObject_35 || (templateObject_35 = __makeTemplateObject(["", ""], ["", ""])), creator.creator);
    return dangerous(templateObject_36 || (templateObject_36 = __makeTemplateObject(["<creator", ">", "</creator>"], ["<creator", ">", "</creator>"])), attribs, pcdata);
}
function rightsToXML(rights) {
    // <!ELEMENT rights (#PCDATA)>
    // <!ATTLIST rights
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (rights.type) {
        attribs += xml(templateObject_37 || (templateObject_37 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), rights.type);
    }
    var pcdata = xml(templateObject_38 || (templateObject_38 = __makeTemplateObject(["", ""], ["", ""])), rights.rights);
    return dangerous(templateObject_39 || (templateObject_39 = __makeTemplateObject(["<rights", ">", "</rights>"], ["<rights", ">", "</rights>"])), attribs, pcdata);
}
function encodingToXML(encoding) {
    // <!ELEMENT encoding ((encoding-date | encoder | software |
    //     encoding-description | supports)*)>
    var children = [];
    if (defined(encoding.encodingDate)) {
        children.push(encodingDateToXML(encoding.encodingDate));
    }
    (encoding.encoders || []).forEach(function (encoder) {
        children.push(encoderToXML(encoder));
    });
    (encoding.softwares || []).forEach(function (software) {
        children.push(softwareToXML(software));
    });
    (encoding.encodingDescriptions || []).forEach(function (encodingDescription) {
        children.push(encodingDescriptionToXML(encodingDescription));
    });
    Object.keys(encoding.supports || {}).forEach(function (key) {
        children.push(supportsToXML(encoding.supports[key]));
    });
    return dangerous(templateObject_40 || (templateObject_40 = __makeTemplateObject(["<encoding>\n", "\n</encoding>"], ["<encoding>\\n", "\\n</encoding>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function encodingDateToXML(encodingDate) {
    // <!ELEMENT encoding-date %yyyy-mm-dd;>
    return xml(templateObject_41 || (templateObject_41 = __makeTemplateObject(["<encoding-date>", "-", "-", "</encoding-date>"], ["<encoding-date>", "-", "-", "</encoding-date>"])), ("0000" + encodingDate.year).slice(-4), ("00" + encodingDate.month).slice(-2), ("00" + encodingDate.day).slice(-2));
}
function encoderToXML(encoder) {
    // <!ELEMENT encoder (#PCDATA)>
    // <!ATTLIST encoder
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (defined(encoder.type)) {
        attribs = xml(templateObject_42 || (templateObject_42 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), encoder.type);
    }
    var pcdata = xml(templateObject_43 || (templateObject_43 = __makeTemplateObject(["", ""], ["", ""])), encoder.encoder);
    return dangerous(templateObject_44 || (templateObject_44 = __makeTemplateObject(["<encoder", ">", "</encoder>"], ["<encoder", ">", "</encoder>"])), attribs, pcdata);
}
function softwareToXML(software) {
    // <!ELEMENT software (#PCDATA)>
    return xml(templateObject_45 || (templateObject_45 = __makeTemplateObject(["<software>", "</software>"], ["<software>", "</software>"])), software);
}
function encodingDescriptionToXML(encodingDescription) {
    // <!ELEMENT encoding-description (#PCDATA)>
    return xml(templateObject_46 || (templateObject_46 = __makeTemplateObject(["<encoding-description>", "</encoding-description>"], ["<encoding-description>", "</encoding-description>"])), encodingDescription);
}
function supportsToXML(supports) {
    // <!ELEMENT supports EMPTY>
    // <!ATTLIST supports
    //     type %yes-no; #REQUIRED
    //     element CDATA #REQUIRED
    //     attribute CDATA #IMPLIED
    //     value CDATA #IMPLIED
    var attribs = "";
    if (defined(supports.type)) {
        attribs += yesNo(templateObject_47 || (templateObject_47 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), supports.type);
    }
    if (defined(supports.element)) {
        attribs += xml(templateObject_48 || (templateObject_48 = __makeTemplateObject([" element=\"", "\""], [" element=\"", "\""])), supports.element);
    }
    if (defined(supports.attribute)) {
        attribs += xml(templateObject_49 || (templateObject_49 = __makeTemplateObject([" attribute=\"", "\""], [" attribute=\"", "\""])), supports.attribute);
    }
    if (defined(supports.value)) {
        attribs += xml(templateObject_50 || (templateObject_50 = __makeTemplateObject([" value=\"", "\""], [" value=\"", "\""])), supports.value);
    }
    return dangerous(templateObject_51 || (templateObject_51 = __makeTemplateObject(["<supports", " />"], ["<supports", " />"])), attribs);
}
function sourceToXML(source) {
    // <!ELEMENT source (#PCDATA)>
    return xml(templateObject_52 || (templateObject_52 = __makeTemplateObject(["<source>", "</source>"], ["<source>", "</source>"])), source);
}
function relationToXML(relation) {
    // <!ELEMENT relation (#PCDATA)>
    // <!ATTLIST relation
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (relation.type) {
        attribs += xml(templateObject_53 || (templateObject_53 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), relation.type);
    }
    var pcdata = xml(templateObject_54 || (templateObject_54 = __makeTemplateObject(["", ""], ["", ""])), relation.data);
    return dangerous(templateObject_55 || (templateObject_55 = __makeTemplateObject(["<relation", ">", "</relation>"], ["<relation", ">", "</relation>"])), attribs, pcdata);
}
function miscellaneousToXML(miscellaneous) {
    // <!ELEMENT miscellaneous (miscellaneous-field*)>
    var children = miscellaneous.miscellaneousFields.map(function (field) {
        return miscellaneousFieldToXML(field);
    });
    return dangerous(templateObject_56 || (templateObject_56 = __makeTemplateObject(["<miscellaneous>\n", "\n</miscellaneous>"], ["<miscellaneous>\\n", "\\n</miscellaneous>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function miscellaneousFieldToXML(field) {
    // <!ELEMENT miscellaneous-field (#PCDATA)>
    // <!ATTLIST miscellaneous-field
    //     name CDATA #REQUIRED
    // >
    return xml(templateObject_57 || (templateObject_57 = __makeTemplateObject(["<miscellaneous-field name=\"", "\">", "</miscellaneous-field>"], ["<miscellaneous-field name=\"", "\">", "</miscellaneous-field>"])), field.name, field.data || "");
}
function defaultsToXML(defaults) {
    // <!ELEMENT defaults (scaling?, page-layout?,
    //     system-layout?, staff-layout*, appearance?,
    //     music-font?, word-font?, lyric-font*, lyric-language*)>
    var children = [];
    if (defined(defaults.scaling)) {
        children.push(scalingToXML(defaults.scaling));
    }
    if (defined(defaults.pageLayout)) {
        children.push(pageLayoutToXML(defaults.pageLayout));
    }
    if (defined(defaults.systemLayout)) {
        children.push(systemLayoutToXML(defaults.systemLayout));
    }
    if (defined(defaults.appearance)) {
        children.push(appearanceToXML(defaults.appearance));
    }
    if (defined(defaults.musicFont)) {
        children.push(musicFontToXML(defaults.musicFont));
    }
    if (defined(defaults.wordFont)) {
        children.push(wordFontToXML(defaults.wordFont));
    }
    (defaults.lyricFonts || []).forEach(function (lyricFont) {
        children.push(lyricFontToXML(lyricFont));
    });
    (defaults.lyricLanguages || []).forEach(function (lyricLanguage) {
        children.push(lyricLanguageToXML(lyricLanguage));
    });
    return dangerous(templateObject_58 || (templateObject_58 = __makeTemplateObject(["<defaults>\n", "\n</defaults>"], ["<defaults>\\n", "\\n</defaults>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function musicFontToXML(musicFont) {
    // <!ELEMENT music-font EMPTY>
    // <!ATTLIST music-font
    //     %font;
    // >
    return dangerous(templateObject_59 || (templateObject_59 = __makeTemplateObject(["<music-font", " />"], ["<music-font", " />"])), fontToXML(musicFont));
}
function wordFontToXML(wordFont) {
    // <!ELEMENT word-font EMPTY>
    // <!ATTLIST word-font
    //     %font;
    // >
    return dangerous(templateObject_60 || (templateObject_60 = __makeTemplateObject(["<word-font", " />"], ["<word-font", " />"])), fontToXML(wordFont));
}
function lyricFontToXML(lyricFont) {
    // <!ELEMENT lyric-font EMPTY>
    // <!ATTLIST lyric-font
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     %font;
    // >
    return dangerous(templateObject_61 || (templateObject_61 = __makeTemplateObject(["<lyric-font", " />"], ["<lyric-font", " />"])), numberLevelToXML(lyricFont) + nameToXML(lyricFont) + fontToXML(lyricFont));
}
function lyricLanguageToXML(lyricLanguage) {
    // <!ELEMENT lyric-language EMPTY>
    // <!ATTLIST lyric-language
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     xml:lang NMTOKEN #REQUIRED TODO musicxml-interfaces
    // >
    return dangerous(templateObject_62 || (templateObject_62 = __makeTemplateObject(["<lyric-language", " />"], ["<lyric-language", " />"])), numberLevelToXML(lyricLanguage) + nameToXML(lyricLanguage));
}
function creditToXML(credit) {
    // <!ELEMENT credit
    //     (credit-type*, link*, bookmark*,
    //     (credit-image |
    //      (credit-words, (link*, bookmark*, credit-words)*)))>
    // <!ATTLIST credit
    //     page NMTOKEN #IMPLIED
    // >
    var attributes = "";
    var children = [];
    (credit.creditTypes || []).forEach(function (creditType) {
        children.push(creditTypeToXML(creditType));
    });
    // credit.links.forEach(link => { // TODO: missing in musicxml-interfaces
    //     children.push(linkToXML(link));
    // });
    // credit.bookmarks.forEach(bookmark => { // TODO: missing in musicxml-interfaces
    //     children.push(bookmarkToXML(bookmark));
    // });
    if (defined(credit.creditImage)) {
        children.push(creditImageToXML(credit.creditImage));
    }
    (credit.creditWords || []).forEach(function (words) {
        children.push(creditWordsToXML(words));
    });
    if (defined(credit.page)) {
        attributes += xml(templateObject_63 || (templateObject_63 = __makeTemplateObject([" page=\"", "\""], [" page=\"", "\""])), credit.page);
    }
    return dangerous(templateObject_64 || (templateObject_64 = __makeTemplateObject(["<credit", ">\n", "\n</credit>"], ["<credit", ">\\n", "\\n</credit>"])), attributes, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function creditTypeToXML(creditType) {
    // <!ELEMENT credit-type (#PCDATA)>
    return xml(templateObject_65 || (templateObject_65 = __makeTemplateObject(["<credit-type>", "</credit-type>"], ["<credit-type>", "</credit-type>"])), creditType);
}
function creditWordsToXML(creditWords) {
    // <!ELEMENT credit-words (#PCDATA)>
    // <!ATTLIST credit-words
    //     %text-formatting;
    // >
    var pcdata = xml(templateObject_66 || (templateObject_66 = __makeTemplateObject(["", ""], ["", ""])), creditWords.words);
    return dangerous(templateObject_67 || (templateObject_67 = __makeTemplateObject(["<credit-words", ">", "</credit-words>"], ["<credit-words", ">", "</credit-words>"])), textFormattingToXML(creditWords), pcdata);
}
function creditImageToXML(creditImage) {
    // <!ELEMENT credit-image EMPTY>
    // <!ATTLIST credit-image
    //     source CDATA #REQUIRED
    //     type CDATA #REQUIRED
    //     %position;
    //     %halign;
    //     %valign-image;
    // >
    var attribs = "";
    if (defined(creditImage.source)) {
        attribs += xml(templateObject_68 || (templateObject_68 = __makeTemplateObject([" credit-image=\"", "\""], [" credit-image=\"", "\""])), creditImage.source);
    }
    if (defined(creditImage.type)) {
        attribs += xml(templateObject_69 || (templateObject_69 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), creditImage.type);
    }
    attribs +=
        positionToXML(creditImage) +
            halignToXML(creditImage) +
            valignImageToXML(creditImage);
    return dangerous(templateObject_70 || (templateObject_70 = __makeTemplateObject(["<credit-image", " />"], ["<credit-image", " />"])), attribs);
}
var topMiddleBottomBaselineToXML = {
    0: "top",
    1: "middle",
    3: "baseline",
    2: "bottom",
};
function valignImageToXML(valignImage) {
    // <!ENTITY % valign-image
    //     "valign (top | middle | bottom) #IMPLIED">
    if (defined(valignImage.valignImage)) {
        return xml(templateObject_71 || (templateObject_71 = __makeTemplateObject([" valign=\"", "\""], [" valign=\"", "\""])), topMiddleBottomBaselineToXML[valignImage.valignImage]);
    }
    return "";
}
function partListToXML(partList) {
    // <!ELEMENT part-list (part-group*, score-part,
    //     (part-group | score-part)*)>
    var children = [];
    partList.forEach(function (partGroupOrScorePart) {
        if (partGroupOrScorePart._class === "PartGroup") {
            children.push(partGroupToXML(partGroupOrScorePart));
        }
        else if (partGroupOrScorePart._class === "ScorePart") {
            children.push(scorePartToXML(partGroupOrScorePart));
        }
        else {
            console.warn("Unknwn type for", partGroupOrScorePart);
        }
    });
    return dangerous(templateObject_72 || (templateObject_72 = __makeTemplateObject(["<part-list>\n", "\n</part-list>"], ["<part-list>\\n", "\\n</part-list>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function scorePartToXML(scorePart) {
    // <!ELEMENT score-part (identification?,
    //     part-name, part-name-display?,
    //     part-abbreviation?, part-abbreviation-display?,
    //     group*, score-instrument*,
    //     (midi-device?, midi-instrument?)*)>
    // <!ATTLIST score-part
    //     id ID #REQUIRED
    // >
    var children = [];
    var attribs = "";
    if (defined(scorePart.identification)) {
        children.push(identificationToXML(scorePart.identification));
    }
    if (defined(scorePart.partName)) {
        children.push(partNameToXML(scorePart.partName));
    }
    if (defined(scorePart.partNameDisplay)) {
        children.push(partNameDisplayToXML(scorePart.partNameDisplay));
    }
    if (defined(scorePart.partAbbreviation)) {
        children.push(partAbbreviationToXML(scorePart.partAbbreviation));
    }
    if (defined(scorePart.partAbbreviationDisplay)) {
        children.push(partAbbreviationDisplayToXML(scorePart.partAbbreviationDisplay));
    }
    (scorePart.groups || []).forEach(function (group) {
        children.push(xml(templateObject_73 || (templateObject_73 = __makeTemplateObject(["<group>", "</group>"], ["<group>", "</group>"])), group));
    });
    (scorePart.scoreInstruments || []).forEach(function (scoreInstrument) {
        children.push(scoreInstrumentToXML(scoreInstrument));
    });
    // Is it okay if there are different numbers of devices and instruments?
    (scorePart.midiDevices || []).forEach(function (device, idx) {
        children.push(midiDeviceToXML(device));
        if (scorePart.midiInstruments[idx]) {
            children.push(midiInstrumentToXML(scorePart.midiInstruments[idx]));
        }
    });
    if (defined(scorePart.id)) {
        attribs += xml(templateObject_74 || (templateObject_74 = __makeTemplateObject([" id=\"", "\""], [" id=\"", "\""])), scorePart.id);
    }
    return dangerous(templateObject_75 || (templateObject_75 = __makeTemplateObject(["<score-part", ">\n", "\n</score-part>"], ["<score-part", ">\\n", "\\n</score-part>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function partNameToXML(partName) {
    // <!ELEMENT part-name (#PCDATA)>
    // <!ATTLIST part-name
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    var pcdata = xml(templateObject_76 || (templateObject_76 = __makeTemplateObject(["", ""], ["", ""])), partName.partName);
    return dangerous(templateObject_77 || (templateObject_77 = __makeTemplateObject(["<part-name", ">", "</part-name>"], ["<part-name", ">", "</part-name>"])), printStyleToXML(partName) +
        printObjectToXML(partName) +
        justifyToXML(partName), pcdata);
}
function partNameDisplayToXML(partNameDisplay) {
    // <!ELEMENT part-name-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-name-display
    //     %print-object;
    // >
    return dangerous(templateObject_78 || (templateObject_78 = __makeTemplateObject(["<part-name-display", ">\n", "</part-name-display>"], ["<part-name-display", ">\\n", "</part-name-display>"])), printObjectToXML(partNameDisplay), textArrayToXML(partNameDisplay.name)
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function partAbbreviationToXML(abbreviation) {
    // <!ELEMENT part-abbreviation (#PCDATA)>
    // <!ATTLIST part-abbreviation
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    var pcdata = xml(templateObject_79 || (templateObject_79 = __makeTemplateObject(["", ""], ["", ""])), abbreviation.abbreviation);
    return dangerous(templateObject_80 || (templateObject_80 = __makeTemplateObject(["<part-abbreviation", ">", "</part-abbreviation>"], ["<part-abbreviation", ">", "</part-abbreviation>"])), printStyleToXML(abbreviation) +
        printObjectToXML(abbreviation) +
        justifyToXML(abbreviation), pcdata);
}
function partAbbreviationDisplayToXML(partAbbreviationDisplay) {
    // <!ELEMENT part-abbreviation-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-abbreviation-display
    //     %print-object;
    // >
    return dangerous(templateObject_81 || (templateObject_81 = __makeTemplateObject(["<part-abbreviation-display", ">", "</part-abbreviation-display>"], ["<part-abbreviation-display", ">", "</part-abbreviation-display>"])), printObjectToXML(partAbbreviationDisplay), textArrayToXML(partAbbreviationDisplay.name)
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function textArrayToXML(texts) {
    return texts.map(function (text) {
        if (text.acc) {
            return (dangerous(templateObject_82 || (templateObject_82 = __makeTemplateObject(["<accidental-text", ""], ["<accidental-text", ""])), textFormattingToXML(text.acc)) + xml(templateObject_83 || (templateObject_83 = __makeTemplateObject([">", "</accidental-text>"], [">", "</accidental-text>"])), text.acc.text));
        }
        else if (text.text) {
            return (dangerous(templateObject_84 || (templateObject_84 = __makeTemplateObject(["<display-text", ""], ["<display-text", ""])), textFormattingToXML(text.text)) + xml(templateObject_85 || (templateObject_85 = __makeTemplateObject([">", "</display-text>"], [">", "</display-text>"])), text.text.text));
        }
        else {
            throw "Unknown type " + text;
        }
    });
}
function midiDeviceToXML(midiDevice) {
    // <!ELEMENT midi-device (#PCDATA)>
    // <!ATTLIST midi-device
    //     port CDATA #IMPLIED
    //     id IDREF #IMPLIED
    // >
    var attribs = "";
    if (defined(midiDevice.port)) {
        attribs += xml(templateObject_86 || (templateObject_86 = __makeTemplateObject([" port=\"", "\""], [" port=\"", "\""])), midiDevice.port);
    }
    if (defined(midiDevice.id)) {
        attribs += xml(templateObject_87 || (templateObject_87 = __makeTemplateObject([" id=\"", "\""], [" id=\"", "\""])), midiDevice.id);
    }
    var pcdata = xml(templateObject_88 || (templateObject_88 = __makeTemplateObject(["", ""], ["", ""])), midiDevice.deviceName || "");
    return dangerous(templateObject_89 || (templateObject_89 = __makeTemplateObject(["<midi-device", ">", "</midi-device>"], ["<midi-device", ">", "</midi-device>"])), attribs, pcdata);
}
function midiInstrumentToXML(midiInstrument) {
    // <!ELEMENT midi-instrument
    //     (midi-channel?, midi-name?, midi-bank?, midi-program?,
    //      midi-unpitched?, volume?, pan?, elevation?)>
    // <!ATTLIST midi-instrument
    //     id IDREF #REQUIRED
    // >
    var children = [];
    var attribs = "";
    if (defined(midiInstrument.midiChannel)) {
        // <!ELEMENT midi-channel (#PCDATA)>
        children.push(xml(templateObject_90 || (templateObject_90 = __makeTemplateObject(["<midi-channel>", "</midi-channel>"], ["<midi-channel>", "</midi-channel>"])), midiInstrument.midiChannel));
    }
    if (defined(midiInstrument.midiName)) {
        // <!ELEMENT midi-name (#PCDATA)>
        children.push(xml(templateObject_91 || (templateObject_91 = __makeTemplateObject(["<midi-name>", "</midi-name>"], ["<midi-name>", "</midi-name>"])), midiInstrument.midiName));
    }
    if (defined(midiInstrument.midiBank)) {
        // <!ELEMENT midi-bank (#PCDATA)>
        children.push(xml(templateObject_92 || (templateObject_92 = __makeTemplateObject(["<midi-bank>", "</midi-bank>"], ["<midi-bank>", "</midi-bank>"])), midiInstrument.midiBank));
    }
    if (defined(midiInstrument.midiProgram)) {
        // <!ELEMENT midi-program (#PCDATA)>
        children.push(xml(templateObject_93 || (templateObject_93 = __makeTemplateObject(["<midi-program>", "</midi-program>"], ["<midi-program>", "</midi-program>"])), midiInstrument.midiProgram));
    }
    if (defined(midiInstrument.midiUnpitched)) {
        // <!ELEMENT midi-unpitched (#PCDATA)>
        children.push(xml(templateObject_94 || (templateObject_94 = __makeTemplateObject(["<midi-unpitched>", "</midi-unpitche>"], ["<midi-unpitched>", "</midi-unpitche>"])), midiInstrument.midiUnpitched));
    }
    if (defined(midiInstrument.volume)) {
        // <!ELEMENT volume (#PCDATA)>
        children.push(xml(templateObject_95 || (templateObject_95 = __makeTemplateObject(["<volume>", "</volume>"], ["<volume>", "</volume>"])), midiInstrument.volume));
    }
    if (defined(midiInstrument.pan)) {
        // <!ELEMENT pan (#PCDATA)>
        children.push(xml(templateObject_96 || (templateObject_96 = __makeTemplateObject(["<pan>", "</pan>"], ["<pan>", "</pan>"])), midiInstrument.pan));
    }
    if (defined(midiInstrument.elevation)) {
        // <!ELEMENT elevation (#PCDATA)>
        children.push(xml(templateObject_97 || (templateObject_97 = __makeTemplateObject(["<elevation>", "</elevation>"], ["<elevation>", "</elevation>"])), midiInstrument.elevation));
    }
    if (defined(midiInstrument.id)) {
        attribs += xml(templateObject_98 || (templateObject_98 = __makeTemplateObject([" id=\"", "\""], [" id=\"", "\""])), midiInstrument.id);
    }
    return dangerous(templateObject_99 || (templateObject_99 = __makeTemplateObject(["<midi-instrument", ">\n", "\n</midi-instrument>"], ["<midi-instrument", ">\\n", "\\n</midi-instrument>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function scoreInstrumentToXML(scoreInstrument) {
    // <!ELEMENT score-instrument
    //     (instrument-name, instrument-abbreviation?,
    //      instrument-sound?, (solo | ensemble)?,
    //      virtual-instrument?)>
    // <!ATTLIST score-instrument
    //     id ID #REQUIRED
    // >
    var children = [];
    var attribs = xml(templateObject_100 || (templateObject_100 = __makeTemplateObject([" id=\"", "\""], [" id=\"", "\""])), scoreInstrument.id);
    if (defined(scoreInstrument.instrumentName)) {
        // <!ELEMENT instrument-name (#PCDATA)>
        children.push(xml(templateObject_101 || (templateObject_101 = __makeTemplateObject(["<instrument-name>", "</instrument-name>"], ["<instrument-name>", "</instrument-name>"])), scoreInstrument.instrumentName));
    }
    if (defined(scoreInstrument.instrumentAbbreviation)) {
        // <!ELEMENT instrument-abbreviation (#PCDATA)>
        children.push(xml(templateObject_102 || (templateObject_102 = __makeTemplateObject(["<instrument-abbreviation>", "</instrument-abbreviation>"], ["<instrument-abbreviation>", "</instrument-abbreviation>"])), scoreInstrument.instrumentAbbreviation));
    }
    if (defined(scoreInstrument.instrumentSound)) {
        // <!ELEMENT instrument-sound (#PCDATA)>
        children.push(xml(templateObject_103 || (templateObject_103 = __makeTemplateObject(["<instrument-sound>", "</instrument-sound>"], ["<instrument-sound>", "</instrument-sound>"])), scoreInstrument.instrumentSound));
    }
    if (scoreInstrument.solo) {
        // <!ELEMENT solo EMPTY>
        children.push(xml(templateObject_104 || (templateObject_104 = __makeTemplateObject(["<solo />"], ["<solo />"]))));
    }
    if (defined(scoreInstrument.ensemble)) {
        // <!ELEMENT ensemble (#PCDATA)>
        children.push(xml(templateObject_105 || (templateObject_105 = __makeTemplateObject(["<ensemble>", "</ensemble>"], ["<ensemble>", "</ensemble>"])), scoreInstrument.ensemble));
    }
    if (defined(scoreInstrument.virtualInstrument)) {
        // <!ELEMENT virtual-instrument
        //     (virtual-library?, virtual-name?)>
        var vChildren = [];
        var v = scoreInstrument.virtualInstrument;
        if (defined(v.virtualLibrary)) {
            // <!ELEMENT virtual-library (#PCDATA)>
            vChildren.push(xml(templateObject_106 || (templateObject_106 = __makeTemplateObject(["<virtual-library>", "</virtual-library>"], ["<virtual-library>", "</virtual-library>"])), v.virtualLibrary));
        }
        if (defined(v.virtualName)) {
            // <!ELEMENT virtual-name (#PCDATA)>
            vChildren.push(xml(templateObject_107 || (templateObject_107 = __makeTemplateObject(["<virtual-name>", "</virtual-name>"], ["<virtual-name>", "</virtual-name>"])), v.virtualName));
        }
        children.push(dangerous(templateObject_108 || (templateObject_108 = __makeTemplateObject(["<virtual-instrument>\n", "\n</virtual-instrument>"], ["<virtual-instrument>\\n", "\\n</virtual-instrument>"])), vChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    return dangerous(templateObject_109 || (templateObject_109 = __makeTemplateObject(["<score-instrument", ">\n", "\n</score-instrument>"], ["<score-instrument", ">\\n", "\\n</score-instrument>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function partGroupToXML(partGroup) {
    // <!ELEMENT part-group (group-name?, group-name-display?,
    //     group-abbreviation?, group-abbreviation-display?,
    //     group-symbol?, group-barline?, group-time?, %editorial;)>
    // <!ATTLIST part-group
    //     type %start-stop; #REQUIRED
    //     number CDATA "1"
    // >
    // <!ELEMENT group-time EMPTY>
    var children = [];
    var attribs = "" + startStopToXML(partGroup) + numberLevelToXML(partGroup);
    if (defined(partGroup.groupName)) {
        children.push(groupNameToXML(partGroup.groupName));
    }
    if (defined(partGroup.groupNameDisplay)) {
        children.push(groupNameDisplayToXML(partGroup.groupNameDisplay));
    }
    if (defined(partGroup.groupAbbreviation)) {
        children.push(groupAbbreviationToXML(partGroup.groupAbbreviation));
    }
    if (defined(partGroup.groupAbbreviationDisplay)) {
        children.push(groupAbbreviationDisplayToXML(partGroup.groupAbbreviationDisplay));
    }
    if (defined(partGroup.groupSymbol)) {
        children.push(groupSymbolToXML(partGroup.groupSymbol));
    }
    if (defined(partGroup.groupBarline)) {
        children.push(groupBarlineToXML(partGroup.groupBarline));
    }
    if (!!partGroup.groupTime) {
        children.push(xml(templateObject_110 || (templateObject_110 = __makeTemplateObject(["<group-time />"], ["<group-time />"]))));
    }
    children = children.concat(editorialToXML(partGroup));
    return dangerous(templateObject_111 || (templateObject_111 = __makeTemplateObject(["<part-group", ">\n", "\n</part-group>"], ["<part-group", ">\\n", "\\n</part-group>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function groupNameToXML(groupName) {
    // <!ELEMENT group-name (#PCDATA)>
    // <!ATTLIST group-name
    //     %print-style;
    //     %justify;
    // >
    var pcdata = xml(templateObject_112 || (templateObject_112 = __makeTemplateObject(["", ""], ["", ""])), groupName.name);
    return dangerous(templateObject_113 || (templateObject_113 = __makeTemplateObject(["<group-name", ">", "</group-name>"], ["<group-name", ">", "</group-name>"])), printStyleToXML(groupName) + justifyToXML(groupName), pcdata);
}
function groupNameDisplayToXML(groupNameDisplay) {
    // <!ELEMENT group-name-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST group-name-display
    //     %print-object;
    // >
    return ""; // TODO: bug in musicxml-interfaces
    // return dangerous `<group-name-display${
    //     printObjectToXML(groupNameDisplay)}>${
    //         textArrayToXML(groupNameDisplay.name).join("\n")
    //         .split("\n").map(n => "  " + n).join("\n")}</group-name-display>`;
}
function groupAbbreviationToXML(groupAbbreviation) {
    // <!ELEMENT group-abbreviation (#PCDATA)>
    // <!ATTLIST group-abbreviation
    //     %print-style;
    //     %justify;
    // >
    var pcdata = xml(templateObject_114 || (templateObject_114 = __makeTemplateObject(["", ""], ["", ""])), groupAbbreviation.text);
    return dangerous(templateObject_115 || (templateObject_115 = __makeTemplateObject(["<group-abbreviation", ">", "</group-abbreviation>"], ["<group-abbreviation", ">", "</group-abbreviation>"])), printStyleToXML(groupAbbreviation) + justifyToXML(groupAbbreviation), pcdata);
}
function groupAbbreviationDisplayToXML(groupAbbreviationDisplay) {
    // <!ELEMENT group-abbreviation-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST group-abbreviation-display
    //     %print-object;
    // >
    return ""; // TODO: bug in musicxml-interfaces
    // return dangerous `<group-name-display${
    //     printObjectToXML(groupNameDisplay)}>${
    //         textArrayToXML(groupNameDisplay.name).join("\n")
    //         .split("\n").map(n => "  " + n).join("\n")}</group-name-display>`;
}
function groupSymbolToXML(groupSymbol) {
    // <!ELEMENT group-symbol (#PCDATA)>
    // <!ATTLIST group-symbol
    //     %position;
    //     %color;
    // >
    var pcdata = xml(templateObject_116 || (templateObject_116 = __makeTemplateObject(["", ""], ["", ""])), groupSymbol.data);
    return dangerous(templateObject_117 || (templateObject_117 = __makeTemplateObject(["<group-symbol", ">", "</group-symbol>"], ["<group-symbol", ">", "</group-symbol>"])), positionToXML(groupSymbol) + colorToXML(groupSymbol), pcdata);
}
function groupBarlineToXML(groupBarline) {
    // <!ELEMENT group-barline (#PCDATA)>
    // <!ATTLIST group-barline
    //     %color;
    // >
    var pcdata = xml(templateObject_118 || (templateObject_118 = __makeTemplateObject(["", ""], ["", ""])), groupBarline.data);
    return dangerous(templateObject_119 || (templateObject_119 = __makeTemplateObject(["<group-barline", ">", "</group-barline>"], ["<group-barline", ">", "</group-barline>"])), colorToXML(groupBarline), pcdata);
}
function scoreHeaderToXML(header) {
    // <!ENTITY % score-header
    // "(work?, movement-number?, movement-title?,
    // identification?, defaults?, credit*, part-list)">
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(header));
    if (defined(header.work)) {
        children.push(workToXML(header.work));
    }
    if (defined(header.movementNumber)) {
        children.push(movementNumberToXML(header.movementNumber));
    }
    if (defined(header.movementTitle)) {
        children.push(movementTitleToXML(header.movementTitle));
    }
    if (defined(header.identification)) {
        children.push(identificationToXML(header.identification));
    }
    if (defined(header.defaults)) {
        children.push(defaultsToXML(header.defaults));
    }
    (header.credits || []).forEach(function (credit) {
        children.push(creditToXML(credit));
    });
    if (defined(header.partList)) {
        children.push(partListToXML(header.partList));
    }
    return children;
}
function backupToXML(backup) {
    // <!ELEMENT backup (duration, %editorial;)>
    var children = [];
    children.push(xml(templateObject_120 || (templateObject_120 = __makeTemplateObject(["<duration>", "</duration>"], ["<duration>", "</duration>"])), backup.duration));
    children = children.concat(editorialToXML(backup));
    return dangerous(templateObject_121 || (templateObject_121 = __makeTemplateObject(["<backup>\n", "\n</backup>"], ["<backup>\\n", "\\n</backup>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function forwardToXML(forward) {
    // <!ELEMENT forward
    //     (duration, %editorial-voice;, staff?)>
    var children = [];
    children.push(xml(templateObject_122 || (templateObject_122 = __makeTemplateObject(["<duration>", "</duration>"], ["<duration>", "</duration>"])), forward.duration));
    children = children.concat(editorialVoiceToXML(forward));
    if (forward.staff) {
        children.push(xml(templateObject_123 || (templateObject_123 = __makeTemplateObject(["<staff>", "</staff>"], ["<staff>", "</staff>"])), forward.staff));
    }
    return dangerous(templateObject_124 || (templateObject_124 = __makeTemplateObject(["<forward>\n", "\n</forward>"], ["<forward>\\n", "\\n</forward>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function groupingToXML(grouping) {
    // <!ELEMENT grouping ((feature)*)>
    // <!ATTLIST grouping
    //     type %start-stop-single; #REQUIRED
    //     number CDATA "1"
    //     member-of CDATA #IMPLIED
    // >
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(grouping));
    (grouping.features || []).forEach(function (feature) {
        // <!ELEMENT feature (#PCDATA)>
        // <!ATTLIST feature
        //     type CDATA #IMPLIED
        // >
        var pcdata = xml(templateObject_125 || (templateObject_125 = __makeTemplateObject(["", ""], ["", ""])), feature.data);
        var attribs = "";
        if (defined(feature.type)) {
            attribs += xml(templateObject_126 || (templateObject_126 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), feature.type);
        }
        children.push(dangerous(templateObject_127 || (templateObject_127 = __makeTemplateObject(["<grouping", ">", "</grouping>"], ["<grouping", ">", "</grouping>"])), attribs, pcdata));
    });
    var attribs = "" + startStopSingleToXML(grouping) + numberLevelToXML(grouping);
    if (defined(grouping.memberOf)) {
        attribs += xml(templateObject_128 || (templateObject_128 = __makeTemplateObject([" member-of=\"", "\""], [" member-of=\"", "\""])), grouping.memberOf);
    }
    return dangerous(templateObject_129 || (templateObject_129 = __makeTemplateObject(["<grouping", ">\n", "\n</grouping>"], ["<grouping", ">\\n", "\\n</grouping>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function harmonyToXML(harmony) {
    // <!ENTITY % harmony-chord "((root | function), kind,
    //     inversion?, bass?, degree*)">
    //
    // <!ELEMENT harmony ((%harmony-chord;)+, frame?,
    //     offset?, %editorial;, staff?)>
    // <!ATTLIST harmony
    //     type (explicit | implied | alternate) #IMPLIED
    //     %print-object;
    //     print-frame  %yes-no; #IMPLIED
    //     %print-style;
    //     %placement;
    // >
    var attribs = "" + explicitImpliedAlternateToXML(harmony) + printObjectToXML(harmony);
    if (defined(harmony.printFrame)) {
        attribs += yesNo(templateObject_130 || (templateObject_130 = __makeTemplateObject([" print-frame=\"", "\""], [" print-frame=\"", "\""])), harmony.printFrame);
    }
    attribs += printStyleToXML(harmony) + placementToXML(harmony);
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(harmony));
    // TODO: multiple of everything in harmony-chord!
    if (defined(harmony.root)) {
        children.push(rootToXML(harmony.root));
    }
    else if (defined(harmony.function)) {
        children.push(functionToXML(harmony.function));
    }
    children.push(kindToXML(harmony.kind));
    if (defined(harmony.inversion)) {
        children.push(inversionToXML(harmony.inversion));
    }
    if (defined(harmony.bass)) {
        children.push(bassToXML(harmony.bass));
    }
    (harmony.degrees || []).forEach(function (degree) {
        children.push(degreeToXML(degree));
    });
    if (defined(harmony.frame)) {
        children.push(frameToXML(harmony.frame));
    }
    if (defined(harmony.offset)) {
        children.push(offsetToXML(harmony.offset));
    }
    children = children.concat(editorialToXML(harmony));
    if (!isNaN(harmony.staff)) {
        children.push(xml(templateObject_131 || (templateObject_131 = __makeTemplateObject(["<staff>", "</staff>"], ["<staff>", "</staff>"])), harmony.staff));
    }
    return dangerous(templateObject_132 || (templateObject_132 = __makeTemplateObject(["<harmony", ">\n", "\n</harmony>"], ["<harmony", ">\\n", "\\n</harmony>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var eiaTypeToXML = (_a = {},
    _a[ExplicitImpliedAlternate.Explicit] = "explicit",
    _a[ExplicitImpliedAlternate.Implied] = "implied",
    _a[ExplicitImpliedAlternate.Alternate] = "alternate",
    _a);
function explicitImpliedAlternateToXML(eia) {
    if (defined(eia.type)) {
        return xml(templateObject_133 || (templateObject_133 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), eiaTypeToXML[eia.type]);
    }
    return "";
}
function rootToXML(root) {
    // <!ELEMENT root (root-step, root-alter?)>
    var children = [];
    if (defined(root.rootStep)) {
        // <!ELEMENT root-step (#PCDATA)>
        // <!ATTLIST root-step
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        var attribs = "";
        if (defined(root.rootStep.text)) {
            attribs += xml(templateObject_134 || (templateObject_134 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), root.rootStep.text);
        }
        attribs += printStyleToXML(root.rootStep);
        var pcdata = xml(templateObject_135 || (templateObject_135 = __makeTemplateObject(["", ""], ["", ""])), root.rootStep.data);
        children.push(dangerous(templateObject_136 || (templateObject_136 = __makeTemplateObject(["<root-step", ">", "</root-step>"], ["<root-step", ">", "</root-step>"])), attribs, pcdata));
    }
    if (defined(root.rootAlter)) {
        // <!ELEMENT root-alter (#PCDATA)>
        // <!ATTLIST root-alter
        //     %print-object;
        //     %print-style;
        //     location %left-right; #IMPLIED
        // >
        var attribs = printObjectToXML(root.rootAlter) + printStyleToXML(root.rootAlter);
        if (defined(root.rootAlter.location)) {
            attribs += xml(templateObject_137 || (templateObject_137 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), root.rootAlter.location === LeftRight.Left ? "left" : "right");
        }
        var pcdata = root.rootAlter.data;
        children.push(dangerous(templateObject_138 || (templateObject_138 = __makeTemplateObject(["<root-alter", ">", "</root-alter>"], ["<root-alter", ">", "</root-alter>"])), attribs, pcdata));
    }
    return dangerous(templateObject_139 || (templateObject_139 = __makeTemplateObject(["<root>\n", "\n</root>"], ["<root>\\n", "\\n</root>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function functionToXML(func) {
    // <!ELEMENT function (#PCDATA)>
    // <!ATTLIST function
    //     %print-style;
    // >
    var pcdata = xml(templateObject_140 || (templateObject_140 = __makeTemplateObject(["", ""], ["", ""])), func.data);
    var attribs = printStyleToXML(func);
    return "<function".concat(attribs, ">").concat(pcdata, "</function>");
}
function kindToXML(kind) {
    // <!ELEMENT kind (#PCDATA)>
    // <!ATTLIST kind
    //     use-symbols          %yes-no;   #IMPLIED
    //     text                 CDATA      #IMPLIED
    //     stack-degrees        %yes-no;   #IMPLIED
    //     parentheses-degrees  %yes-no;   #IMPLIED
    //     bracket-degrees      %yes-no;   #IMPLIED
    //     %print-style;
    //     %halign;
    //     %valign;
    // >
    var attribs = "";
    if (defined(kind.useSymbols)) {
        attribs += yesNo(templateObject_141 || (templateObject_141 = __makeTemplateObject([" kind=\"", "\""], [" kind=\"", "\""])), kind.useSymbols);
    }
    if (defined(kind.text)) {
        attribs += xml(templateObject_142 || (templateObject_142 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), kind.text);
    }
    if (defined(kind.stackDegrees)) {
        attribs += yesNo(templateObject_143 || (templateObject_143 = __makeTemplateObject([" stack-degrees=\"", "\""], [" stack-degrees=\"", "\""])), kind.stackDegrees);
    }
    if (defined(kind.parenthesesDegrees)) {
        attribs += yesNo(templateObject_144 || (templateObject_144 = __makeTemplateObject([" parentheses-degrees=\"", "\""], [" parentheses-degrees=\"", "\""])), kind.parenthesesDegrees);
    }
    attribs += printStyleToXML(kind) + halignToXML(kind) + valignToXML(kind);
    var pcdata = xml(templateObject_145 || (templateObject_145 = __makeTemplateObject(["", ""], ["", ""])), kind.data);
    return dangerous(templateObject_146 || (templateObject_146 = __makeTemplateObject(["<kind", ">\n", "</kind>"], ["<kind", ">\\n", "</kind>"])), attribs, pcdata);
}
function inversionToXML(inversion) {
    // <!ELEMENT inversion (#PCDATA)>
    // <!ATTLIST inversion
    //     %print-style;
    //     >
    var pcdata = xml(templateObject_147 || (templateObject_147 = __makeTemplateObject(["", ""], ["", ""])), inversion.data);
    var attribs = printStyleToXML(inversion);
    return "<inversion".concat(attribs, ">").concat(pcdata, "</inversion>");
}
function bassToXML(bass) {
    // <!ELEMENT bass (bass-step, bass-alter?)>
    var children = [];
    if (defined(bass.bassStep)) {
        // <!ELEMENT bass-step (#PCDATA)>
        // <!ATTLIST bass-step
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        var attribs = "";
        if (defined(bass.bassStep.text)) {
            attribs += xml(templateObject_148 || (templateObject_148 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), bass.bassStep.text);
        }
        attribs += printStyleToXML(bass.bassStep);
        var pcdata = xml(templateObject_149 || (templateObject_149 = __makeTemplateObject(["", ""], ["", ""])), bass.bassStep.data);
        children.push(dangerous(templateObject_150 || (templateObject_150 = __makeTemplateObject(["<bass-step", ">", "</bass-step>"], ["<bass-step", ">", "</bass-step>"])), attribs, pcdata));
    }
    if (defined(bass.bassAlter)) {
        // <!ELEMENT bass-alter (#PCDATA)>
        // <!ATTLIST bass-alter
        //     %print-object;
        //     %print-style;
        //     location (left | right) #IMPLIED
        // >
        var attribs = printObjectToXML(bass.bassAlter) + printStyleToXML(bass.bassAlter);
        if (defined(bass.bassAlter.location)) {
            attribs += xml(templateObject_151 || (templateObject_151 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), bass.bassAlter.location === LeftRight.Left ? "left" : "right");
        }
        var pcdata = bass.bassAlter.data;
        children.push(dangerous(templateObject_152 || (templateObject_152 = __makeTemplateObject(["<bass-alter", ">", "</bass-alter>"], ["<bass-alter", ">", "</bass-alter>"])), attribs, pcdata));
    }
    return dangerous(templateObject_153 || (templateObject_153 = __makeTemplateObject(["<bass>\n", "\n</bass>"], ["<bass>\\n", "\\n</bass>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var chordTypeToXML = (_b = {},
    _b[ChordType.Augmented] = "augmented",
    _b[ChordType.Diminished] = "diminished",
    _b[ChordType.Major] = "major",
    _b[ChordType.Minor] = "minor",
    _b[ChordType.HalfDiminished] = "half-diminished",
    _b);
function degreeToXML(degree) {
    // <!ELEMENT degree (degree-value, degree-alter, degree-type)>
    // <!ATTLIST degree
    //     %print-object;
    // >
    var children = [];
    if (defined(degree.degreeValue)) {
        // <!ELEMENT degree-value (#PCDATA)>
        // <!ATTLIST degree-value
        //     symbol (major | minor | augmented |
        //         diminished | half-diminished) #IMPLIED
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        var lattribs = "";
        if (defined(degree.degreeValue.symbol)) {
            lattribs += xml(templateObject_154 || (templateObject_154 = __makeTemplateObject([" symbol=\"", "\""], [" symbol=\"", "\""])), chordTypeToXML[degree.degreeValue.symbol]);
        }
        if (defined(degree.degreeValue.text)) {
            lattribs += xml(templateObject_155 || (templateObject_155 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), degree.degreeValue.text);
        }
        lattribs += printStyleToXML(degree.degreeValue);
        var pcdata = xml(templateObject_156 || (templateObject_156 = __makeTemplateObject(["", ""], ["", ""])), degree.degreeValue.data);
        children.push(dangerous(templateObject_157 || (templateObject_157 = __makeTemplateObject(["<degree-value", ">", "</degree-value>"], ["<degree-value", ">", "</degree-value>"])), lattribs, pcdata));
    }
    if (defined(degree.degreeAlter)) {
        // <!ELEMENT degree-alter (#PCDATA)>
        // <!ATTLIST degree-alter
        //     %print-style;
        //     plus-minus %yes-no; #IMPLIED
        // >
        var lattribs = printStyleToXML(degree.degreeAlter);
        if (defined(degree.degreeAlter.plusMinus)) {
            lattribs += yesNo(templateObject_158 || (templateObject_158 = __makeTemplateObject([" plus-minus=\"", "\""], [" plus-minus=\"", "\""])), degree.degreeAlter.plusMinus);
        }
        var pcdata = xml(templateObject_159 || (templateObject_159 = __makeTemplateObject(["", ""], ["", ""])), degree.degreeAlter.data);
        children.push(dangerous(templateObject_160 || (templateObject_160 = __makeTemplateObject(["<degree-alter", ">", "</degree-alter>"], ["<degree-alter", ">", "</degree-alter>"])), lattribs, pcdata));
    }
    if (defined(degree.degreeType)) {
        // <!ELEMENT degree-type (#PCDATA)>
        // <!ATTLIST degree-type
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        var lattribs = printStyleToXML(degree.degreeType);
        if (defined(degree.degreeType.text)) {
            lattribs += xml(templateObject_161 || (templateObject_161 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), degree.degreeType.text);
        }
        var pcdata = xml(templateObject_162 || (templateObject_162 = __makeTemplateObject(["", ""], ["", ""])), degree.degreeType.data);
        children.push(dangerous(templateObject_163 || (templateObject_163 = __makeTemplateObject(["<degree-type", ">", "</degree-type>"], ["<degree-type", ">", "</degree-type>"])), lattribs, pcdata));
    }
    var attribs = printObjectToXML(degree);
    return dangerous(templateObject_164 || (templateObject_164 = __makeTemplateObject(["<degree", ">\n", "\n</degree>"], ["<degree", ">\\n", "\\n</degree>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function frameToXML(frame) {
    // <!ELEMENT frame
    //     (frame-strings, frame-frets, first-fret?, frame-note+)>
    // <!ATTLIST frame
    //     %position;
    //     %color;
    //     %halign;
    //     %valign-image;
    //     height  %tenths;  #IMPLIED
    //     width   %tenths;  #IMPLIED
    //     unplayed CDATA    #IMPLIED
    // >
    var attribs = positionToXML(frame) +
        colorToXML(frame) +
        halignToXML(frame) +
        valignImageToXML(frame);
    if (defined(frame.height)) {
        attribs += xml(templateObject_165 || (templateObject_165 = __makeTemplateObject([" height=\"", "\""], [" height=\"", "\""])), frame.height);
    }
    if (defined(frame.width)) {
        attribs += xml(templateObject_166 || (templateObject_166 = __makeTemplateObject([" width=\"", "\""], [" width=\"", "\""])), frame.width);
    }
    if (defined(frame.unplayed)) {
        attribs += xml(templateObject_167 || (templateObject_167 = __makeTemplateObject([" unplayed=\"", "\""], [" unplayed=\"", "\""])), frame.unplayed);
    }
    var children = [];
    if (defined(frame.frameStrings)) {
        // <!ELEMENT frame-strings (#PCDATA)>
        children.push(xml(templateObject_168 || (templateObject_168 = __makeTemplateObject(["<frame-strings>", "</frame-strings>"], ["<frame-strings>", "</frame-strings>"])), frame.frameStrings));
    }
    if (defined(frame.frameFrets)) {
        // <!ELEMENT frame-frets (#PCDATA)>
        children.push(xml(templateObject_169 || (templateObject_169 = __makeTemplateObject(["<frame-frets>", "</frame-frets>"], ["<frame-frets>", "</frame-frets>"])), frame.frameFrets));
    }
    if (defined(frame.firstFret)) {
        // <!ELEMENT first-fret (#PCDATA)>
        // <!ATTLIST first-fret
        //     text CDATA #IMPLIED
        //     location %left-right; #IMPLIED
        // >
        var pcdata = xml(templateObject_170 || (templateObject_170 = __makeTemplateObject(["", ""], ["", ""])), frame.firstFret.data);
        var attribs_1 = "";
        if (defined(frame.firstFret.text)) {
            attribs_1 += xml(templateObject_171 || (templateObject_171 = __makeTemplateObject([" text=\"", "\""], [" text=\"", "\""])), frame.firstFret.text);
        }
        if (defined(frame.firstFret.location)) {
            attribs_1 += xml(templateObject_172 || (templateObject_172 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), frame.firstFret.location === LeftRight.Left ? "left" : "right");
        }
    }
    (frame.frameNotes || []).forEach(function (frameNote) {
        // <!ELEMENT frame-note (string, fret, fingering?, barre?)>
        var fChildren = [];
        // <!ELEMENT string (#PCDATA)>
        // <!ATTLIST string
        //     %print-style;
        //     %placement;
        // >
        if (defined(frameNote.string)) {
            var pcdata = xml(templateObject_173 || (templateObject_173 = __makeTemplateObject(["", ""], ["", ""])), frameNote.string.stringNum);
            fChildren.push(dangerous(templateObject_174 || (templateObject_174 = __makeTemplateObject(["<string", ">", "</string>"], ["<string", ">", "</string>"])), printStyleToXML(frameNote.string) + placementToXML(frameNote.string), pcdata));
        }
        // <!ELEMENT fret (#PCDATA)>
        // <!ATTLIST fret
        //     %font;
        //     %color;
        // >
        if (defined(frameNote.fret)) {
            var pcdata = xml(templateObject_175 || (templateObject_175 = __makeTemplateObject(["", ""], ["", ""])), frameNote.fret.fret);
            fChildren.push(dangerous(templateObject_176 || (templateObject_176 = __makeTemplateObject(["<fret", ">", "</fret>"], ["<fret", ">", "</fret>"])), fontToXML(frameNote.fret) + colorToXML(frameNote.fret), pcdata));
        }
        // <!ELEMENT fingering (#PCDATA)>
        // <!ATTLIST fingering
        //     substitution %yes-no; #IMPLIED
        //     alternate %yes-no; #IMPLIED
        //     %print-style;
        //     %placement;
        // >
        if (defined(frameNote.fingering)) {
            var pcdata = xml(templateObject_177 || (templateObject_177 = __makeTemplateObject(["", ""], ["", ""])), frameNote.fingering.finger);
            var coreAttribs = "";
            if (defined(frameNote.fingering.substitution)) {
                coreAttribs += yesNo(templateObject_178 || (templateObject_178 = __makeTemplateObject([" substitution=\"", "\""], [" substitution=\"", "\""])), frameNote.fingering.substitution);
            }
            if (defined(frameNote.fingering.alternate)) {
                coreAttribs += yesNo(templateObject_179 || (templateObject_179 = __makeTemplateObject([" alternate=\"", "\""], [" alternate=\"", "\""])), frameNote.fingering.alternate);
            }
            fChildren.push(dangerous(templateObject_180 || (templateObject_180 = __makeTemplateObject(["<fingering", ">", "</fingering>"], ["<fingering", ">", "</fingering>"])), coreAttribs +
                printStyleToXML(frameNote.fingering) +
                placementToXML(frameNote.fingering), pcdata));
        }
        // <!ELEMENT barre EMPTY>
        // <!ATTLIST barre
        //     type %start-stop; #REQUIRED
        //     %color;
        // >
        if (defined(frameNote.barre)) {
            fChildren.push(dangerous(templateObject_181 || (templateObject_181 = __makeTemplateObject(["<barre", " />"], ["<barre", " />"])), startStopToXML(frameNote.barre) + colorToXML(frameNote.barre)));
        }
        children.push(dangerous(templateObject_182 || (templateObject_182 = __makeTemplateObject(["<frame-note>\n", "\n</frame-note>"], ["<frame-note>\\n", "\\n</frame-note>"])), fChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    return dangerous(templateObject_183 || (templateObject_183 = __makeTemplateObject(["<frame", ">\n", "\n</frame>"], ["<frame", ">\\n", "\\n</frame>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function printToXML(print) {
    // <!ELEMENT print (page-layout?, system-layout?, staff-layout*,
    //     measure-layout?, measure-numbering?, part-name-display?,
    //     part-abbreviation-display?)>
    // <!ATTLIST print
    //     staff-spacing %tenths; #IMPLIED
    //     new-system %yes-no; #IMPLIED
    //     new-page %yes-no; #IMPLIED
    //     blank-page NMTOKEN #IMPLIED
    //     page-number CDATA #IMPLIED
    // >
    var attribs = "";
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(print));
    if (defined(print.staffSpacing)) {
        attribs += xml(templateObject_184 || (templateObject_184 = __makeTemplateObject([" staff-spacing=\"", "\""], [" staff-spacing=\"", "\""])), print.staffSpacing);
    }
    if (defined(print.newSystem)) {
        attribs += yesNo(templateObject_185 || (templateObject_185 = __makeTemplateObject([" new-system=\"", "\""], [" new-system=\"", "\""])), print.newSystem);
    }
    if (defined(print.newPage)) {
        attribs += yesNo(templateObject_186 || (templateObject_186 = __makeTemplateObject([" new-page=\"", "\""], [" new-page=\"", "\""])), print.newPage);
    }
    if (defined(print.blankPage)) {
        attribs += xml(templateObject_187 || (templateObject_187 = __makeTemplateObject([" blank-page=\"", "\""], [" blank-page=\"", "\""])), print.blankPage);
    }
    if (defined(print.pageNumber)) {
        attribs += xml(templateObject_188 || (templateObject_188 = __makeTemplateObject([" page-number=\"", "\""], [" page-number=\"", "\""])), print.pageNumber);
    }
    if (defined(print.pageLayout)) {
        children.push(pageLayoutToXML(print.pageLayout));
    }
    if (defined(print.systemLayout)) {
        children.push(systemLayoutToXML(print.systemLayout));
    }
    (print.staffLayouts || []).forEach(function (staffLayout) {
        children.push(staffLayoutToXML(staffLayout));
    });
    if (defined(print.measureLayout)) {
        children.push(measureLayoutToXML(print.measureLayout));
    }
    if (defined(print.measureNumbering)) {
        children.push(measureNumberingToXML(print.measureNumbering));
    }
    if (defined(print.partNameDisplay)) {
        children.push(partNameDisplayToXML(print.partNameDisplay));
    }
    if (defined(print.partAbbreviationDisplay)) {
        children.push(partAbbreviationDisplayToXML(print.partAbbreviationDisplay));
    }
    return dangerous(templateObject_189 || (templateObject_189 = __makeTemplateObject(["<print", ">\n", "\n</print>"], ["<print", ">\\n", "\\n</print>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function soundToXML(sound) {
    // <!ELEMENT sound ((midi-device?, midi-instrument?, play?)*,
    //     offset?)>
    // <!ATTLIST sound
    //     tempo CDATA #IMPLIED
    //     dynamics CDATA #IMPLIED
    //     dacapo %yes-no; #IMPLIED
    //     segno CDATA #IMPLIED
    //     dalsegno CDATA #IMPLIED
    //     coda CDATA #IMPLIED
    //     tocoda CDATA #IMPLIED
    //     divisions CDATA #IMPLIED
    //     forward-repeat %yes-no; #IMPLIED
    //     fine CDATA #IMPLIED
    //     %time-only;
    //     pizzicato %yes-no; #IMPLIED
    //     pan CDATA #IMPLIED
    //     elevation CDATA #IMPLIED
    //     damper-pedal %yes-no-number; #IMPLIED
    //     soft-pedal %yes-no-number; #IMPLIED
    //     sostenuto-pedal %yes-no-number; #IMPLIED
    // >
    var children = [];
    var attribs = "";
    children = children.concat(staffDebugInfoToXMLComment(sound));
    // TODO musicxml-interfaces: can have many midi-devices, instruments, etc.
    (sound.midiDevices || []).forEach(function (midiDevice) {
        children.push(midiDeviceToXML(midiDevice));
    });
    (sound.midiInstruments || []).forEach(function (midiInstrument) {
        children.push(midiInstrumentToXML(midiInstrument));
    });
    (sound.plays || []).forEach(function (play) {
        children.push(playToXML(play));
    });
    if (defined(sound.tempo)) {
        attribs += xml(templateObject_190 || (templateObject_190 = __makeTemplateObject([" tempo=\"", "\""], [" tempo=\"", "\""])), sound.tempo);
    }
    if (defined(sound.dynamics)) {
        attribs += xml(templateObject_191 || (templateObject_191 = __makeTemplateObject([" dynamics=\"", "\""], [" dynamics=\"", "\""])), sound.dynamics);
    }
    if (defined(sound.decapo)) {
        attribs += yesNo(templateObject_192 || (templateObject_192 = __makeTemplateObject([" decapo=\"", "\""], [" decapo=\"", "\""])), sound.decapo);
    }
    if (defined(sound.segno)) {
        attribs += xml(templateObject_193 || (templateObject_193 = __makeTemplateObject([" segno=\"", "\""], [" segno=\"", "\""])), sound.segno);
    }
    if (defined(sound.dalsegno)) {
        attribs += xml(templateObject_194 || (templateObject_194 = __makeTemplateObject([" dalsegno=\"", "\""], [" dalsegno=\"", "\""])), sound.dalsegno);
    }
    if (defined(sound.coda)) {
        attribs += xml(templateObject_195 || (templateObject_195 = __makeTemplateObject([" coda=\"", "\""], [" coda=\"", "\""])), sound.coda);
    }
    if (defined(sound.tocoda)) {
        attribs += xml(templateObject_196 || (templateObject_196 = __makeTemplateObject([" tocoda=\"", "\""], [" tocoda=\"", "\""])), sound.tocoda);
    }
    if (defined(sound.divisions)) {
        attribs += xml(templateObject_197 || (templateObject_197 = __makeTemplateObject([" divisions=\"", "\""], [" divisions=\"", "\""])), sound.divisions);
    }
    if (defined(sound.forwardRepeat)) {
        attribs += yesNo(templateObject_198 || (templateObject_198 = __makeTemplateObject([" forward-repeat=\"", "\""], [" forward-repeat=\"", "\""])), sound.forwardRepeat);
    }
    if (defined(sound.fine)) {
        attribs += xml(templateObject_199 || (templateObject_199 = __makeTemplateObject([" fine=\"", "\""], [" fine=\"", "\""])), sound.fine);
    }
    attribs += timeOnlyToXML(sound);
    if (defined(sound.pizzicato)) {
        attribs += yesNo(templateObject_200 || (templateObject_200 = __makeTemplateObject([" pizzicato=\"", "\""], [" pizzicato=\"", "\""])), sound.pizzicato);
    }
    if (defined(sound.pan)) {
        attribs += xml(templateObject_201 || (templateObject_201 = __makeTemplateObject([" pan=\"", "\""], [" pan=\"", "\""])), sound.pan);
    }
    if (defined(sound.elevation)) {
        attribs += xml(templateObject_202 || (templateObject_202 = __makeTemplateObject([" elevation=\"", "\""], [" elevation=\"", "\""])), sound.elevation);
    }
    if (defined(sound.damperPedal)) {
        attribs += xml(templateObject_203 || (templateObject_203 = __makeTemplateObject([" damper-pedal=\"", "\""], [" damper-pedal=\"", "\""])), sound.damperPedal);
    }
    if (defined(sound.softPedal)) {
        attribs += xml(templateObject_204 || (templateObject_204 = __makeTemplateObject([" soft-pedal=\"", "\""], [" soft-pedal=\"", "\""])), sound.softPedal);
    }
    if (defined(sound.sostenutoPedal)) {
        attribs += xml(templateObject_205 || (templateObject_205 = __makeTemplateObject([" sostenuto-pedal=\"", "\""], [" sostenuto-pedal=\"", "\""])), sound.sostenutoPedal);
    }
    return dangerous(templateObject_206 || (templateObject_206 = __makeTemplateObject(["<sound", ">\n", "\n</sound>"], ["<sound", ">\\n", "\\n</sound>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function staffDebugInfoToXMLComment(module) {
    var comments = [];
    if (defined(module.divCount)) {
        comments.push(xml(templateObject_207 || (templateObject_207 = __makeTemplateObject(["<!--musicxml-interfaces:debug>\n", "  <div-count>", "</div-count>\n", "</musicxml-interfaces:debug-->"], ["<!--musicxml-interfaces:debug>\\n", "  <div-count>", "</div-count>\\n", "</musicxml-interfaces:debug-->"])), "", module.divCount, ""));
    }
    return comments;
}
/*

      <direction placement="above">
        <direction-type>
          <words default-y="15" font-family="satie-meta" relative-x="-13653" xml:space="preserve">
                {
                    "uuid": "482912"
                }
            </words>
        </direction-type>
      </direction>
*/
function directionToXML(direction) {
    // <!ELEMENT direction (direction-type+, offset?,
    //     %editorial-voice;, staff?, sound?)>
    // <!ATTLIST direction
    //     %placement;
    //     %directive;
    // >
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(direction));
    (direction.directionTypes || []).forEach(function (directionType) {
        children.push(directionTypeToXML(directionType));
    });
    if (defined(direction.offset)) {
        children.push(offsetToXML(direction.offset));
    }
    children = children.concat(editorialVoiceToXML(direction));
    if (defined(direction.staff)) {
        children.push(xml(templateObject_208 || (templateObject_208 = __makeTemplateObject(["<staff>", "</staff>"], ["<staff>", "</staff>"])), direction.staff));
    }
    if (defined(direction.sound)) {
        children.push(soundToXML(direction.sound));
    }
    var attribs = "" + placementToXML(direction);
    if (defined(direction.directive)) {
        attribs += yesNo(templateObject_209 || (templateObject_209 = __makeTemplateObject([" directive=\"", "\""], [" directive=\"", "\""])), direction.directive);
    }
    return dangerous(templateObject_210 || (templateObject_210 = __makeTemplateObject(["<direction", ">\n", "\n</direction>"], ["<direction", ">\\n", "\\n</direction>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function attributesToXML(attributes) {
    // <!ELEMENT attributes (%editorial;, divisions?, key*, time*,
    //     staves?, part-symbol?, instruments?, clef*, staff-details*,
    //     transpose*, directive*, measure-style*)>
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(attributes));
    children = children.concat(editorialToXML(attributes));
    if (defined(attributes.divisions)) {
        // <!ELEMENT divisions (#PCDATA)>
        children.push(xml(templateObject_211 || (templateObject_211 = __makeTemplateObject(["<divisions>", "</divisions>"], ["<divisions>", "</divisions>"])), attributes.divisions));
    }
    (attributes.keySignatures || []).forEach(function (keySignature) {
        children.push(keyToXML(keySignature));
    });
    (attributes.times || []).forEach(function (time) {
        children.push(timeToXML(time));
    });
    if (defined(attributes.staves)) {
        // <!ELEMENT staves (#PCDATA)>
        children.push(xml(templateObject_212 || (templateObject_212 = __makeTemplateObject(["<staves>", "</staves>"], ["<staves>", "</staves>"])), attributes.staves));
    }
    if (defined(attributes.partSymbol)) {
        children.push(partSymbolToXML(attributes.partSymbol));
    }
    if (defined(attributes.instruments)) {
        // <!ELEMENT instruments (#PCDATA)>
        children.push(xml(templateObject_213 || (templateObject_213 = __makeTemplateObject(["<instruments>", "</instruments>"], ["<instruments>", "</instruments>"])), attributes.instruments));
    }
    (attributes.clefs || []).forEach(function (clef) {
        children.push(clefToXML(clef));
    });
    (attributes.staffDetails || []).forEach(function (staffDetails) {
        children.push(staffDetailsToXML(staffDetails));
    });
    (attributes.transposes || []).forEach(function (transpose) {
        children.push(transposeToXML(transpose));
    });
    (attributes.directives || []).forEach(function (directive) {
        children.push(directiveToXML(directive));
    });
    (attributes.measureStyles || []).forEach(function (measureStyle) {
        children.push(measureStyleToXML(measureStyle));
    });
    return dangerous(templateObject_214 || (templateObject_214 = __makeTemplateObject(["<attributes>\n", "\n</attributes>"], ["<attributes>\\n", "\\n</attributes>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var countToXML = {
    4: "quarter",
    9990: "breve",
    9991: "long",
    1024: "1024th",
    32: "32nd",
    16: "16th",
    8: "eighth",
    9992: "maxima",
    512: "512th",
    64: "64th",
    256: "256th",
    128: "128th",
    2: "half",
    1: "whole",
};
var accidentalToXML = {
    7: "natural-flat",
    13: "sharp-up",
    10: "three-quarters-flat",
    11: "three-quarters-sharp",
    8: "quarter-flat",
    2: "flat",
    18: "triple-sharp",
    27: "flat-1",
    28: "flat-2",
    29: "flat-3",
    291: "flat-4",
    191: "triple-flat",
    30: "flat-5",
    0: "sharp",
    9: "quarter-sharp",
    21: "slash-flat",
    16: "flat-down",
    14: "natural-down",
    19: "slash-quarter-sharp",
    4: "sharp-sharp",
    23: "sharp-1",
    17: "flat-up",
    24: "sharp-2",
    25: "sharp-3",
    3: "double-sharp",
    251: "sharp-4",
    26: "sharp-5",
    31: "sori",
    22: "double-slash-flat",
    12: "sharp-down",
    32: "koron",
    15: "natural-up",
    20: "slash-sharp",
    6: "natural-sharp",
    5: "flat-flat",
    1: "natural",
    33: "double-flat",
};
var syllabicTypeToXML = {
    0: "single",
    1: "begin",
    3: "middle",
    2: "end",
};
var breathMarkTypeToXML = {
    0: "comma",
    1: "tick",
    2: "empty",
};
var holeClosedTypeToXML = {
    1: "no",
    0: "yes",
    2: "half",
};
var holeLocationToXML = {
    0: "right",
    3: "top",
    1: "bottom",
    2: "left",
};
var actualBothNoneToXML = (_c = {},
    _c[ActualBothNone.None] = "none",
    _c[ActualBothNone.Both] = "both",
    _c[ActualBothNone.Actual] = "actual",
    _c);
var beamTypeToXML = {
    4: "backward hook",
    0: "begin",
    3: "forward hook",
    1: "continue",
    2: "end",
};
var accelRitNoneToXML = {
    0: "accel",
    2: "none",
    1: "rit",
};
var noteheadTypeToXML = {
    7: "inverted triangle",
    14: "circle dot",
    9: "arrow up",
    18: "do",
    20: "mi",
    4: "cross",
    0: "slash",
    21: "fa",
    1: "triangle",
    22: "fa up",
    23: "so",
    15: "left triangle",
    11: "back slashed",
    17: "none",
    24: "la",
    10: "slashed",
    12: "normal",
    13: "cluster",
    25: "ti",
    19: "re",
    16: "rectangle",
    3: "square",
    8: "arrow down",
    5: "x",
    2: "diamond",
    6: "circle x",
};
var stemToXML = {
    2: "none",
    3: "double",
    0: "down",
    1: "up",
};
function measureToXML(measure) {
    // <!ATTLIST measure
    //     number CDATA #REQUIRED
    //     implicit %yes-no; #IMPLIED
    //     non-controlling %yes-no; #IMPLIED
    //     width %tenths; #IMPLIED
    // >
    // <!ELEMENT measure (part+)>
    var attribs = "";
    if (defined(measure.number)) {
        attribs += xml(templateObject_215 || (templateObject_215 = __makeTemplateObject([" number=\"", "\""], [" number=\"", "\""])), measure.number);
    }
    if (defined(measure.implicit)) {
        attribs += yesNo(templateObject_216 || (templateObject_216 = __makeTemplateObject([" implicit=\"", "\""], [" implicit=\"", "\""])), measure.implicit);
    }
    if (defined(measure.nonControlling)) {
        attribs += yesNo(templateObject_217 || (templateObject_217 = __makeTemplateObject([" non-controlling=\"", "\""], [" non-controlling=\"", "\""])), measure.nonControlling);
    }
    if (defined(measure.width)) {
        attribs += xml(templateObject_218 || (templateObject_218 = __makeTemplateObject([" width=\"", "\""], [" width=\"", "\""])), measure.width);
    }
    var elements = [];
    for (var key in measure.parts) {
        elements.push(partToXML(measure.parts[key], key));
    }
    return dangerous(templateObject_219 || (templateObject_219 = __makeTemplateObject(["<measure", ">\n", "\n</measure>"], ["<measure", ">\\n", "\\n</measure>"])), attribs, elements
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function partToXML(part, id) {
    // <!ELEMENT part (%music-data;)>
    // <!ATTLIST part
    //     id IDREF #REQUIRED
    // >
    var attribs = xml(templateObject_220 || (templateObject_220 = __makeTemplateObject([" id=\"", "\""], [" id=\"", "\""])), id);
    // <!ENTITY % music-data
    //     "(note | backup | forward | direction | attributes |
    //       harmony | figured-bass | print | sound | barline |
    //       grouping | link | bookmark)*">
    var elements = part.map(function (element) {
        switch (element._class) {
            case "Note":
                return noteToXML(element);
            case "Backup":
                return backupToXML(element);
            case "Forward":
                return forwardToXML(element);
            case "Direction":
                return directionToXML(element);
            case "Attributes":
                return attributesToXML(element);
            case "Harmony":
                return harmonyToXML(element);
            case "FiguredBass":
                return figuredBassToXML(element);
            case "Print":
                return printToXML(element);
            case "Sound":
                return soundToXML(element);
            case "Barline":
                return barlineToXML(element);
            case "Grouping":
                return groupingToXML(element);
            case "Link":
                return "<!-- link not implemented -->";
            case "Bookmark":
                return "<!-- bookmark not implemented -->";
            default:
                return xml(templateObject_221 || (templateObject_221 = __makeTemplateObject(["<!-- unknown type (class ", ") -->"], ["<!-- unknown type (class ", ") -->"])), element._class);
        }
    });
    return dangerous(templateObject_222 || (templateObject_222 = __makeTemplateObject(["<part", ">\n", "\n</part>"], ["<part", ">\\n", "\\n</part>"])), attribs, elements
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function noteToXML(note) {
    // <!ATTLIST note
    //     %print-style;
    //     %printout;
    //     dynamics CDATA #IMPLIED
    //     end-dynamics CDATA #IMPLIED
    //     attack CDATA #IMPLIED
    //     release CDATA #IMPLIED
    //     %time-only;
    //     pizzicato %yes-no; #IMPLIED
    // >
    var attribs = "";
    attribs += printStyleToXML(note);
    attribs += printoutToXML(note);
    if (defined(note.dynamics)) {
        attribs += xml(templateObject_223 || (templateObject_223 = __makeTemplateObject([" dynamics=\"", "\""], [" dynamics=\"", "\""])), note.dynamics);
    }
    if (defined(note.endDynamics)) {
        attribs += xml(templateObject_224 || (templateObject_224 = __makeTemplateObject([" end-dynamics=\"", "\""], [" end-dynamics=\"", "\""])), note.endDynamics);
    }
    if (defined(note.attack)) {
        attribs += xml(templateObject_225 || (templateObject_225 = __makeTemplateObject([" attack=\"", "\""], [" attack=\"", "\""])), note.attack);
    }
    if (defined(note.release)) {
        attribs += xml(templateObject_226 || (templateObject_226 = __makeTemplateObject([" release=\"", "\""], [" release=\"", "\""])), note.release);
    }
    attribs += timeOnlyToXML(note);
    if (defined(note.pizzicato)) {
        attribs += yesNo(templateObject_227 || (templateObject_227 = __makeTemplateObject([" pizzicato=\"", "\""], [" pizzicato=\"", "\""])), note.pizzicato);
    }
    // <!ELEMENT note
    //     (((grace, %full-note;, (tie, tie?)?) |
    //     (cue, %full-note;, duration) |
    //     (%full-note;, duration, (tie, tie?)?)),
    //     ...
    var elements = [];
    if (note.grace) {
        var graceAttribs = "";
        /*
                <!ELEMENT grace EMPTY>
                <!ATTLIST grace
                    steal-time-previous CDATA #IMPLIED
                    steal-time-following CDATA #IMPLIED
                    make-time CDATA #IMPLIED
                    slash %yes-no; #IMPLIED
                >
            */
        if (note.grace.stealTimePrevious) {
            graceAttribs += xml(templateObject_228 || (templateObject_228 = __makeTemplateObject([" steal-time-previous=\"", "\""], [" steal-time-previous=\"", "\""])), note.grace.stealTimePrevious);
        }
        if (note.grace.stealTimeFollowing) {
            graceAttribs += xml(templateObject_229 || (templateObject_229 = __makeTemplateObject([" steal-time-following=\"", "\""], [" steal-time-following=\"", "\""])), note.grace.stealTimeFollowing);
        }
        if (note.grace.makeTime) {
            graceAttribs += xml(templateObject_230 || (templateObject_230 = __makeTemplateObject([" make-time=\"", "\""], [" make-time=\"", "\""])), note.grace.makeTime);
        }
        if (note.grace.slash !== undefined && note.grace.slash !== null) {
            graceAttribs += yesNo(templateObject_231 || (templateObject_231 = __makeTemplateObject([" slash=\"", "\""], [" slash=\"", "\""])), note.grace.slash);
        }
        elements.push(dangerous(templateObject_232 || (templateObject_232 = __makeTemplateObject(["<grace", " />"], ["<grace", " />"])), graceAttribs));
    }
    else if (note.cue) {
        elements.push(xml(templateObject_233 || (templateObject_233 = __makeTemplateObject(["<cue />"], ["<cue />"]))));
    }
    /*
          <!ENTITY % full-note "(chord?, (pitch | unpitched | rest))">
      */
    if (note.chord) {
        elements.push(xml(templateObject_234 || (templateObject_234 = __makeTemplateObject(["<chord />"], ["<chord />"]))));
    }
    if (note.pitch) {
        /*
                <!ELEMENT pitch (step, alter?, octave)>
                <!ELEMENT step (#PCDATA)>
                <!ELEMENT alter (#PCDATA)>
                <!ELEMENT octave (#PCDATA)>
            */
        var pitchElements = [];
        if (note.pitch.step) {
            pitchElements.push(xml(templateObject_235 || (templateObject_235 = __makeTemplateObject(["<step>", "</step>"], ["<step>", "</step>"])), note.pitch.step.toUpperCase()));
        }
        if (note.pitch.alter) {
            pitchElements.push(xml(templateObject_236 || (templateObject_236 = __makeTemplateObject(["<alter>", "</alter>"], ["<alter>", "</alter>"])), note.pitch.alter));
        }
        if (note.pitch.octave) {
            pitchElements.push(xml(templateObject_237 || (templateObject_237 = __makeTemplateObject(["<octave>", "</octave>"], ["<octave>", "</octave>"])), note.pitch.octave));
        }
        elements.push(dangerous(templateObject_238 || (templateObject_238 = __makeTemplateObject(["<pitch>\n", "\n</pitch>"], ["<pitch>\\n", "\\n</pitch>"])), pitchElements
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    else if (note.unpitched) {
        // <!ELEMENT unpitched ((display-step, display-octave)?)>
        var upChildren = [];
        if (note.unpitched.displayStep) {
            upChildren.push(xml(templateObject_239 || (templateObject_239 = __makeTemplateObject(["<display-step>", "</display-step>"], ["<display-step>", "</display-step>"])), note.unpitched.displayStep));
        }
        if (note.unpitched.displayOctave) {
            upChildren.push(xml(templateObject_240 || (templateObject_240 = __makeTemplateObject(["<display-octave>", "</display-octave>"], ["<display-octave>", "</display-octave>"])), note.unpitched.displayOctave));
        }
        elements.push(dangerous(templateObject_241 || (templateObject_241 = __makeTemplateObject(["<unpitched>\n", "\n</unpitched>"], ["<unpitched>\\n", "\\n</unpitched>"])), upChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    else if (note.rest) {
        var restAttribs = "";
        var restChildren = [];
        if (note.rest.displayStep) {
            restChildren.push("<display-step>".concat(note.rest.displayStep, "</display-step>"));
        }
        if (note.rest.displayOctave) {
            restChildren.push("<display-octave>".concat(note.rest.displayOctave, "</display-octave>"));
        }
        if (note.rest.measure !== undefined && note.rest.measure !== null) {
            restAttribs += yesNo(templateObject_242 || (templateObject_242 = __makeTemplateObject([" measure=\"", "\""], [" measure=\"", "\""])), note.rest.measure);
        }
        elements.push(dangerous(templateObject_243 || (templateObject_243 = __makeTemplateObject(["<rest", ">\n", "\n</rest>"], ["<rest", ">\\n", "\\n</rest>"])), restAttribs, restChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    if (!note.grace && note.duration) {
        elements.push(xml(templateObject_244 || (templateObject_244 = __makeTemplateObject(["<duration>", "</duration>"], ["<duration>", "</duration>"])), note.duration));
    }
    if (note.ties && note.ties.length) {
        var tieAttribs = xml(templateObject_245 || (templateObject_245 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), note.ties[0].type === StartStop.Stop ? "stop" : "start");
        elements.push(dangerous(templateObject_246 || (templateObject_246 = __makeTemplateObject(["<tie", " />"], ["<tie", " />"])), tieAttribs));
    }
    // ...
    // instrument?, %editorial-voice;, type?, dot*,
    // ...
    if (note.instrument) {
        elements.push(xml(templateObject_247 || (templateObject_247 = __makeTemplateObject(["<instrument id=\"", "\" />"], ["<instrument id=\"", "\" />"])), note.instrument.id));
    }
    elements = elements.concat(editorialVoiceToXML(note));
    if (note.noteType && defined(note.noteType.duration)) {
        elements.push(xml(templateObject_248 || (templateObject_248 = __makeTemplateObject(["<type>", "</type>"], ["<type>", "</type>"])), countToXML[note.noteType.duration]));
    }
    (note.dots || []).forEach(function () {
        elements.push(xml(templateObject_249 || (templateObject_249 = __makeTemplateObject(["<dot />"], ["<dot />"]))));
    });
    // ...
    // accidental?, time-modification?, stem?, notehead?,
    // ...
    if (note.accidental) {
        var accidentalAttribs = "";
        if (note.accidental.editorial !== undefined &&
            note.accidental.editorial !== null) {
            accidentalAttribs += yesNo(templateObject_250 || (templateObject_250 = __makeTemplateObject([" editorial=\"", "\""], [" editorial=\"", "\""])), note.accidental.editorial);
        }
        if (note.accidental.cautionary !== undefined &&
            note.accidental.cautionary !== null) {
            accidentalAttribs += yesNo(templateObject_251 || (templateObject_251 = __makeTemplateObject([" cautionary=\"", "\""], [" cautionary=\"", "\""])), note.accidental.cautionary);
        }
        elements.push(dangerous(templateObject_252 || (templateObject_252 = __makeTemplateObject(["<accidental", ">", "</accidental>"], ["<accidental", ">", "</accidental>"])), accidentalAttribs, accidentalToXML[note.accidental.accidental])); // (safe)
    }
    if (note.timeModification) {
        var timeModificationChildren_1 = [];
        // <!ELEMENT time-modification
        // 	(actual-notes, normal-notes,
        // 	(normal-type, normal-dot*)?)>
        // <!ELEMENT actual-notes (#PCDATA)>
        // <!ELEMENT normal-notes (#PCDATA)>
        // <!ELEMENT normal-type (#PCDATA)>
        // <!ELEMENT normal-dot EMPTY>
        if (note.timeModification.actualNotes) {
            timeModificationChildren_1.push(xml(templateObject_253 || (templateObject_253 = __makeTemplateObject(["<actual-notes>", "</actual-notes>"], ["<actual-notes>", "</actual-notes>"])), note.timeModification.actualNotes));
        }
        if (note.timeModification.normalNotes) {
            timeModificationChildren_1.push(xml(templateObject_254 || (templateObject_254 = __makeTemplateObject(["<normal-notes>", "</normal-notes>"], ["<normal-notes>", "</normal-notes>"])), note.timeModification.normalNotes));
        }
        if (note.timeModification.normalType) {
            timeModificationChildren_1.push(xml(templateObject_255 || (templateObject_255 = __makeTemplateObject(["<normal-type>", "</normal-type>"], ["<normal-type>", "</normal-type>"])), note.timeModification.normalType));
        }
        (note.timeModification.normalDots || []).forEach(function () {
            timeModificationChildren_1.push(xml(templateObject_256 || (templateObject_256 = __makeTemplateObject(["<normal-dot />"], ["<normal-dot />"]))));
        });
        elements.push(dangerous(templateObject_257 || (templateObject_257 = __makeTemplateObject(["<time-modification>\n", "\n</time-modification>"], ["<time-modification>\\n", "\\n</time-modification>"])), timeModificationChildren_1
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    if (note.stem) {
        var stemAttribs = "" + positionToXML(note.stem) + colorToXML(note.stem);
        elements.push(dangerous(templateObject_258 || (templateObject_258 = __makeTemplateObject(["<stem", ">", "</stem>"], ["<stem", ">", "</stem>"])), stemAttribs, stemToXML[note.stem.type])); // (safe)
    }
    if (note.notehead) {
        var hattribs = "" + fontToXML(note.notehead) + colorToXML(note.notehead);
        if (defined(note.notehead.filled)) {
            hattribs += yesNo(templateObject_259 || (templateObject_259 = __makeTemplateObject([" filled=\"", "\""], [" filled=\"", "\""])), note.notehead.filled);
        }
        if (defined(note.notehead.parentheses)) {
            hattribs += yesNo(templateObject_260 || (templateObject_260 = __makeTemplateObject([" parentheses=\"", "\""], [" parentheses=\"", "\""])), note.notehead.parentheses);
        }
        elements.push(dangerous(templateObject_261 || (templateObject_261 = __makeTemplateObject(["<notehead", ">", "</notehead>"], ["<notehead", ">", "</notehead>"])), hattribs, noteheadTypeToXML[note.notehead.type]));
    }
    // ...
    // notehead-text?, staff?, beam*, notations*, lyric*, play?)>
    // ...
    if (defined(note.noteheadText)) {
        // <!ELEMENT notehead-text
        //     ((display-text | accidental-text)+)>
        elements = elements.concat(textArrayToXML(note.noteheadText.text));
    }
    if (!isNaN(note.staff)) {
        elements.push(xml(templateObject_262 || (templateObject_262 = __makeTemplateObject(["<staff>", "</staff>"], ["<staff>", "</staff>"])), note.staff));
    }
    (note.beams || []).forEach(function (beam) {
        var beamAttribs = xml(templateObject_263 || (templateObject_263 = __makeTemplateObject([" number=\"", "\""], [" number=\"", "\""])), beam.number);
        if (defined(beam.repeater)) {
            beamAttribs += yesNo(templateObject_264 || (templateObject_264 = __makeTemplateObject([" repeater=\"", "\""], [" repeater=\"", "\""])), beam.repeater);
        }
        if (defined(beam.fan)) {
            beamAttribs += xml(templateObject_265 || (templateObject_265 = __makeTemplateObject([" fan=\"", "\""], [" fan=\"", "\""])), accelRitNoneToXML[beam.fan]);
        }
        elements.push(dangerous(templateObject_266 || (templateObject_266 = __makeTemplateObject(["<beam", ">", "</beam>"], ["<beam", ">", "</beam>"])), beamAttribs, beamTypeToXML[beam.type])); // safe
    });
    (note.notations || []).forEach(function (notation) {
        /**
         * <!ELEMENT notations
         *      (%editorial;,
         *       (tied | slur | tuplet | glissando | slide |
         *        ornaments | technical | articulations | dynamics |
         *        fermata | arpeggiate | non-arpeggiate |
         *        accidental-mark | other-notation)*)>
         *  <!ATTLIST notations
         *      %print-object;
         *  >
         *
         *  <!ENTITY % print-object
         *      "print-object  %yes-no;  #IMPLIED">
         *  <!ENTITY % editorial "(footnote?, level?)">
         */
        var notationsAttribs = "";
        var nChildren = [];
        if (defined(notation.printObject)) {
            notationsAttribs += yesNo(templateObject_267 || (templateObject_267 = __makeTemplateObject([" print-object=\"", "\""], [" print-object=\"", "\""])), notation.printObject);
        }
        nChildren = nChildren.concat(editorialToXML(notation));
        (notation.tieds || []).forEach(function (tied) {
            // <!ATTLIST tied
            //     type %start-stop-continue; #REQUIRED
            //     number %number-level; #IMPLIED
            //     %line-type;
            //     %dashed-formatting;
            //     %position;
            //     %placement;
            //     %orientation;
            //     %bezier;
            //     %color;
            // >
            nChildren.push(dangerous(templateObject_268 || (templateObject_268 = __makeTemplateObject(["<tied", " />"], ["<tied", " />"])), startStopContinueToXML(tied) +
                numberLevelToXML(tied) +
                lineTypeToXML(tied) +
                dashedFormattingToXML(tied) +
                positionToXML(tied) +
                placementToXML(tied) +
                orientationToXML(tied) +
                bezierToXML(tied) +
                colorToXML(tied)));
        });
        (notation.slurs || []).forEach(function (slur) {
            // <!ATTLIST slur
            //     type %start-stop-continue; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %position;
            //     %placement;
            //     %orientation;
            //     %bezier;
            //     %color;
            // >
            nChildren.push(dangerous(templateObject_269 || (templateObject_269 = __makeTemplateObject(["<slur", " />"], ["<slur", " />"])), startStopContinueToXML(slur) +
                numberLevelToXML(slur) +
                lineTypeToXML(slur) +
                dashedFormattingToXML(slur) +
                positionToXML(slur) +
                placementToXML(slur) +
                orientationToXML(slur) +
                bezierToXML(slur) +
                colorToXML(slur)));
        });
        (notation.tuplets || []).forEach(function (tuplet) {
            // <!ELEMENT tuplet (tuplet-actual?, tuplet-normal?)>
            // <!ATTLIST tuplet
            //     type %start-stop; #REQUIRED
            //     number %number-level; #IMPLIED
            //     bracket %yes-no; #IMPLIED
            //     show-number (actual | both | none) #IMPLIED
            //     show-type (actual | both | none) #IMPLIED
            //     %line-shape;
            //     %position;
            //     %placement;
            // >
            // <!ELEMENT tuplet-actual (tuplet-number?,
            //     tuplet-type?, tuplet-dot*)>
            // <!ELEMENT tuplet-normal (tuplet-number?,
            //     tuplet-type?, tuplet-dot*)>
            // <!ELEMENT tuplet-number (#PCDATA)>
            // <!ATTLIST tuplet-number
            //     %font;
            //     %color;
            // >
            // <!ELEMENT tuplet-type (#PCDATA)>
            // <!ATTLIST tuplet-type
            //     %font;
            //     %color;
            // >
            // <!ELEMENT tuplet-dot EMPTY>
            // <!ATTLIST tuplet-dot
            //     %font;
            //     %color;
            // >
            var tattribs = "" + startStopToXML(tuplet) + numberLevelToXML(tuplet);
            if (defined(tuplet.bracket)) {
                tattribs += yesNo(templateObject_270 || (templateObject_270 = __makeTemplateObject([" bracket=\"", "\""], [" bracket=\"", "\""])), tuplet.bracket);
            }
            if (defined(tuplet.showNumber)) {
                tattribs += xml(templateObject_271 || (templateObject_271 = __makeTemplateObject([" show-number=\"", "\""], [" show-number=\"", "\""])), actualBothNoneToXML[tuplet.showNumber]);
            }
            if (defined(tuplet.showType)) {
                tattribs += xml(templateObject_272 || (templateObject_272 = __makeTemplateObject([" show-type=\"", "\""], [" show-type=\"", "\""])), actualBothNoneToXML[tuplet.showType]);
            }
            tattribs += lineShapeToXML(tuplet);
            tattribs += positionToXML(tuplet);
            tattribs += placementToXML(tuplet);
            var tChildren = [];
            [
                ["tuplet-actual", "tupletActual"],
                ["tuplet-normal", "tupletNormal"],
            ].forEach(function (tup) {
                var data = tuplet[tup[1]];
                if (!data) {
                    return;
                }
                var dataChildren = [];
                if (data.tupletNumber) {
                    var num = data.tupletNumber;
                    var pcdata = xml(templateObject_273 || (templateObject_273 = __makeTemplateObject(["", ""], ["", ""])), num.text);
                    dataChildren.push(dangerous(templateObject_274 || (templateObject_274 = __makeTemplateObject(["<tuplet-number", ">", "</tuplet-number>"], ["<tuplet-number", ">", "</tuplet-number>"])), fontToXML(num) + colorToXML(num), pcdata));
                }
                if (data.tupletType) {
                    var type = data.tupletType;
                    var pcdata = xml(templateObject_275 || (templateObject_275 = __makeTemplateObject(["", ""], ["", ""])), type.text);
                    dataChildren.push(dangerous(templateObject_276 || (templateObject_276 = __makeTemplateObject(["<tuplet-type", ">", "</tuplet-type>"], ["<tuplet-type", ">", "</tuplet-type>"])), fontToXML(type) + colorToXML(type), pcdata));
                }
                (data.tupletDots || []).forEach(function (dot) {
                    dataChildren.push(dangerous(templateObject_277 || (templateObject_277 = __makeTemplateObject(["<tuplet-dot", " />"], ["<tuplet-dot", " />"])), fontToXML(dot) + colorToXML(dot)));
                });
                tChildren.push(dangerous(templateObject_278 || (templateObject_278 = __makeTemplateObject(["<", ">\n", "\n</", ">"], ["<", ">\\n", "\\n</", ">"])), tup[0], dataChildren
                    .join("\n")
                    .split("\n")
                    .map(function (n) { return "  " + n; })
                    .join("\n"), tup[0]));
            });
            nChildren.push(dangerous(templateObject_279 || (templateObject_279 = __makeTemplateObject(["<tuplet", ">\n", "\n</tuplet>"], ["<tuplet", ">\\n", "\\n</tuplet>"])), tattribs, tChildren
                .join("\n")
                .split("\n")
                .map(function (n) { return "  " + n; })
                .join("\n")));
        });
        (notation.glissandos || []).forEach(function (glissando) {
            // <!ELEMENT glissando (#PCDATA)>
            // <!ATTLIST glissando
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            // >
            var pcdata = xml(templateObject_280 || (templateObject_280 = __makeTemplateObject(["", ""], ["", ""])), glissando.text);
            nChildren.push(dangerous(templateObject_281 || (templateObject_281 = __makeTemplateObject(["<glissando", ">", "</glissando>"], ["<glissando", ">", "</glissando>"])), startStopToXML(glissando) +
                numberLevelToXML(glissando) +
                lineTypeToXML(glissando) +
                dashedFormattingToXML(glissando) +
                printStyleToXML(glissando), pcdata));
        });
        (notation.slides || []).forEach(function (slide) {
            // <!ELEMENT slide (#PCDATA)>
            // <!ATTLIST slide
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %bend-sound;
            // >
            var pcdata = xml(templateObject_282 || (templateObject_282 = __makeTemplateObject(["", ""], ["", ""])), slide.text);
            nChildren.push(dangerous(templateObject_283 || (templateObject_283 = __makeTemplateObject(["<slide", ">", "</slide>"], ["<slide", ">", "</slide>"])), startStopToXML(slide) +
                numberLevelToXML(slide) +
                lineTypeToXML(slide) +
                dashedFormattingToXML(slide) +
                printStyleToXML(slide) +
                bendSoundToXML(slide), pcdata));
        });
        (notation.ornaments || []).forEach(function (ornaments) {
            // <!ELEMENT ornaments
            //     (((trill-mark | turn | delayed-turn | inverted-turn |
            //        delayed-inverted-turn | vertical-turn | shake |
            //        wavy-line | mordent | inverted-mordent | schleifer |
            //        tremolo | other-ornament), accidental-mark*)*)>
            var oChildren = [];
            // <!ELEMENT trill-mark EMPTY>
            // <!ATTLIST trill-mark
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.trillMark) {
                oChildren.push(dangerous(templateObject_284 || (templateObject_284 = __makeTemplateObject(["<trill-mark", " />"], ["<trill-mark", " />"])), printStyleToXML(ornaments.trillMark) +
                    placementToXML(ornaments.trillMark) +
                    trillSoundToXML(ornaments.trillMark)));
            }
            // <!ATTLIST turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.turn) {
                oChildren.push(dangerous(templateObject_285 || (templateObject_285 = __makeTemplateObject(["<turn", " />"], ["<turn", " />"])), printStyleToXML(ornaments.turn) +
                    placementToXML(ornaments.turn) +
                    trillSoundToXML(ornaments.turn) +
                    slashToXML(ornaments.turn)));
            }
            // <!ATTLIST delayed-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedTurn) {
                oChildren.push(dangerous(templateObject_286 || (templateObject_286 = __makeTemplateObject(["<delayed-turn", " />"], ["<delayed-turn", " />"])), printStyleToXML(ornaments.delayedTurn) +
                    placementToXML(ornaments.delayedTurn) +
                    trillSoundToXML(ornaments.delayedTurn) +
                    slashToXML(ornaments.delayedTurn)));
            }
            // <!ATTLIST inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.invertedTurn) {
                oChildren.push(dangerous(templateObject_287 || (templateObject_287 = __makeTemplateObject(["<inverted-turn", " />"], ["<inverted-turn", " />"])), printStyleToXML(ornaments.invertedTurn) +
                    placementToXML(ornaments.invertedTurn) +
                    trillSoundToXML(ornaments.invertedTurn) +
                    slashToXML(ornaments.invertedTurn)));
            }
            // <!ATTLIST delayed-inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedInvertedTurn) {
                oChildren.push(dangerous(templateObject_288 || (templateObject_288 = __makeTemplateObject(["<delayed-inverted-turn", " />"], ["<delayed-inverted-turn", " />"])), printStyleToXML(ornaments.delayedInvertedTurn) +
                    placementToXML(ornaments.delayedInvertedTurn) +
                    trillSoundToXML(ornaments.delayedInvertedTurn) +
                    slashToXML(ornaments.delayedInvertedTurn)));
            }
            // <!ATTLIST vertical-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.verticalTurn) {
                oChildren.push(dangerous(templateObject_289 || (templateObject_289 = __makeTemplateObject(["<vertical-turn", " />"], ["<vertical-turn", " />"])), printStyleToXML(ornaments.verticalTurn) +
                    placementToXML(ornaments.verticalTurn) +
                    trillSoundToXML(ornaments.verticalTurn)));
            }
            //
            // <!ATTLIST shake
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.shake) {
                oChildren.push(dangerous(templateObject_290 || (templateObject_290 = __makeTemplateObject(["<shake", " />"], ["<shake", " />"])), printStyleToXML(ornaments.shake) +
                    placementToXML(ornaments.shake) +
                    trillSoundToXML(ornaments.shake)));
            }
            //
            // <!ATTLIST mordent
            //     long %yes-no; #IMPLIED
            //     approach %above-below; #IMPLIED
            //     departure %above-below; #IMPLIED
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.mordent) {
                oChildren.push(dangerous(templateObject_291 || (templateObject_291 = __makeTemplateObject(["<mordent", " />"], ["<mordent", " />"])), mordentSubsetToXML(ornaments.mordent) +
                    printStyleToXML(ornaments.mordent) +
                    placementToXML(ornaments.mordent) +
                    trillSoundToXML(ornaments.mordent)));
            }
            // <!ATTLIST inverted-mordent
            //     long %yes-no; #IMPLIED
            //     approach %above-below; #IMPLIED
            //     departure %above-below; #IMPLIED
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.invertedMordent) {
                oChildren.push(dangerous(templateObject_292 || (templateObject_292 = __makeTemplateObject(["<inverted-mordent", " />"], ["<inverted-mordent", " />"])), mordentSubsetToXML(ornaments.invertedMordent) +
                    printStyleToXML(ornaments.invertedMordent) +
                    placementToXML(ornaments.invertedMordent) +
                    trillSoundToXML(ornaments.invertedMordent)));
            }
            //
            // <!ATTLIST schleifer
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.schleifer) {
                oChildren.push(dangerous(templateObject_293 || (templateObject_293 = __makeTemplateObject(["<schleifer", " />"], ["<schleifer", " />"])), printStyleToXML(ornaments.schleifer) +
                    placementToXML(ornaments.schleifer)));
            }
            //
            // <!ELEMENT tremolo (#PCDATA)>
            // <!ATTLIST tremolo
            //     type %start-stop-single; "single"
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.tremolo) {
                var pcdata = xml(templateObject_294 || (templateObject_294 = __makeTemplateObject(["", ""], ["", ""])), ornaments.tremolo.data || "");
                oChildren.push(dangerous(templateObject_295 || (templateObject_295 = __makeTemplateObject(["<tremolo", ">", "</tremolo>"], ["<tremolo", ">", "</tremolo>"])), startStopSingleToXML(ornaments.tremolo) +
                    printStyleToXML(ornaments.tremolo) +
                    placementToXML(ornaments.tremolo), pcdata));
            }
            //
            // <!ELEMENT other-ornament (#PCDATA)>
            // <!ATTLIST other-ornament
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.otherOrnament) {
                var pcdata = xml(templateObject_296 || (templateObject_296 = __makeTemplateObject(["", ""], ["", ""])), ornaments.otherOrnament.data || "");
                oChildren.push(dangerous(templateObject_297 || (templateObject_297 = __makeTemplateObject(["<other-ornament", ">", "</other-ornament>"], ["<other-ornament", ">", "</other-ornament>"])), printStyleToXML(ornaments.otherOrnament) +
                    placementToXML(ornaments.otherOrnament), pcdata));
            }
            //
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            (ornaments.accidentalMarks || []).forEach(function (accidentalMark) {
                var pcdata = xml(templateObject_298 || (templateObject_298 = __makeTemplateObject(["", ""], ["", ""])), accidentalMark.mark || "");
                oChildren.push(dangerous(templateObject_299 || (templateObject_299 = __makeTemplateObject(["<accidental-mark", ">", "</accidental-mark>"], ["<accidental-mark", ">", "</accidental-mark>"])), printStyleToXML(accidentalMark) + placementToXML(accidentalMark), pcdata));
            });
            nChildren.push(dangerous(templateObject_300 || (templateObject_300 = __makeTemplateObject(["<ornaments>\n", "\n</ornaments>"], ["<ornaments>\\n", "\\n</ornaments>"])), oChildren
                .join("\n")
                .split("\n")
                .map(function (n) { return "  " + n; })
                .join("\n")));
        });
        (notation.technicals || []).forEach(function (technical) {
            var oChildren = [];
            // <!ELEMENT technical
            //     ((up-bow | down-bow | harmonic | open-string |
            //       thumb-position | fingering | pluck | double-tongue |
            //       triple-tongue | stopped | snap-pizzicato | fret |
            //       string | hammer-on | pull-off | bend | tap | heel |
            //       toe | fingernails | hole | arrow | handbell |
            //       other-technical)*)>
            //
            // <!ATTLIST up-bow
            //     %print-style;
            //     %placement;
            // >
            if (technical.upBow) {
                oChildren.push(dangerous(templateObject_301 || (templateObject_301 = __makeTemplateObject(["<up-bow", " />"], ["<up-bow", " />"])), printStyleToXML(technical.upBow) + placementToXML(technical.upBow)));
            }
            // <!ATTLIST down-bow
            //     %print-style;
            //     %placement;
            // >
            if (technical.downBow) {
                oChildren.push(dangerous(templateObject_302 || (templateObject_302 = __makeTemplateObject(["<down-bow", " />"], ["<down-bow", " />"])), printStyleToXML(technical.downBow) +
                    placementToXML(technical.downBow)));
            }
            // <!ELEMENT harmonic
            //     ((natural | artificial)?,
            //      (base-pitch | touching-pitch | sounding-pitch)?)>
            // <!ATTLIST harmonic
            //     %print-object;
            //     %print-style;
            //     %placement;
            // >
            if (technical.harmonic) {
                var hChildren = [];
                // <!ELEMENT natural EMPTY>
                // <!ELEMENT artificial EMPTY>
                // <!ELEMENT base-pitch EMPTY>
                // <!ELEMENT touching-pitch EMPTY>
                // <!ELEMENT sounding-pitch EMPTY>
                if (technical.harmonic.natural) {
                    hChildren.push(xml(templateObject_303 || (templateObject_303 = __makeTemplateObject(["<natural />"], ["<natural />"]))));
                }
                if (technical.harmonic.artificial) {
                    hChildren.push(xml(templateObject_304 || (templateObject_304 = __makeTemplateObject(["<artificial />"], ["<artificial />"]))));
                }
                if (technical.harmonic.basePitch) {
                    hChildren.push(xml(templateObject_305 || (templateObject_305 = __makeTemplateObject(["<base-pitch />"], ["<base-pitch />"]))));
                }
                if (technical.harmonic.touchingPitch) {
                    hChildren.push(xml(templateObject_306 || (templateObject_306 = __makeTemplateObject(["<touching-pitch />"], ["<touching-pitch />"]))));
                }
                if (technical.harmonic.soundingPitch) {
                    hChildren.push(xml(templateObject_307 || (templateObject_307 = __makeTemplateObject(["<sounding-pitch />"], ["<sounding-pitch />"]))));
                }
                oChildren.push(dangerous(templateObject_308 || (templateObject_308 = __makeTemplateObject(["<harmonic", ">", "\n</harmonic>"], ["<harmonic", ">", "\\n</harmonic>"])), printObjectToXML(technical.harmonic) +
                    printStyleToXML(technical.harmonic) +
                    placementToXML(technical.harmonic), hChildren
                    .join("\n")
                    .split("\n")
                    .map(function (n) { return "  " + n; })
                    .join("\n")));
            }
            // <!ATTLIST open-string
            //     %print-style;
            //     %placement;
            // >
            if (technical.openString) {
                oChildren.push(dangerous(templateObject_309 || (templateObject_309 = __makeTemplateObject(["<open-string", " />"], ["<open-string", " />"])), printStyleToXML(technical.openString) +
                    placementToXML(technical.openString)));
            }
            //
            // <!ATTLIST thumb-position
            //     %print-style;
            //     %placement;
            // >
            if (technical.thumbPosition) {
                oChildren.push(dangerous(templateObject_310 || (templateObject_310 = __makeTemplateObject(["<thumb-position", " />"], ["<thumb-position", " />"])), printStyleToXML(technical.thumbPosition) +
                    placementToXML(technical.thumbPosition)));
            }
            //
            // <!ELEMENT fingering (#PCDATA)>
            // <!ATTLIST fingering
            //     substitution %yes-no; #IMPLIED
            //     alternate %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            //
            if (technical.fingering) {
                var substitution = "";
                if (defined(technical.fingering.substitution)) {
                    substitution += yesNo(templateObject_311 || (templateObject_311 = __makeTemplateObject([" substitution=\"", "\""], [" substitution=\"", "\""])), technical.fingering.substitution);
                }
                var alternate = "";
                if (defined(technical.fingering.alternate)) {
                    alternate += yesNo(templateObject_312 || (templateObject_312 = __makeTemplateObject([" alternate=\"", "\""], [" alternate=\"", "\""])), technical.fingering.alternate);
                }
                oChildren.push(dangerous(templateObject_313 || (templateObject_313 = __makeTemplateObject(["<fingering", ">", "</fingering>"], ["<fingering", ">", "</fingering>"])), substitution +
                    alternate +
                    printStyleToXML(technical.fingering) +
                    placementToXML(technical.fingering), String(parseInt(String(technical.fingering.finger), 10))));
            }
            //
            // <!ELEMENT pluck (#PCDATA)>
            // <!ATTLIST pluck
            //     %print-style;
            //     %placement;
            // >
            if (technical.pluck) {
                oChildren.push(dangerous(templateObject_314 || (templateObject_314 = __makeTemplateObject(["<pluck", " />"], ["<pluck", " />"])), printStyleToXML(technical.pluck) + placementToXML(technical.pluck)));
            }
            //
            // <!ATTLIST double-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.doubleTongue) {
                oChildren.push(dangerous(templateObject_315 || (templateObject_315 = __makeTemplateObject(["<double-tongue", " />"], ["<double-tongue", " />"])), printStyleToXML(technical.doubleTongue) +
                    placementToXML(technical.doubleTongue)));
            }
            //
            // <!ATTLIST triple-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.tripleTongue) {
                oChildren.push(dangerous(templateObject_316 || (templateObject_316 = __makeTemplateObject(["<triple-tongue", " />"], ["<triple-tongue", " />"])), printStyleToXML(technical.tripleTongue) +
                    placementToXML(technical.tripleTongue)));
            }
            //
            // <!ATTLIST stopped
            //     %print-style;
            //     %placement;
            // >
            if (technical.stopped) {
                oChildren.push(dangerous(templateObject_317 || (templateObject_317 = __makeTemplateObject(["<stopped", " />"], ["<stopped", " />"])), printStyleToXML(technical.stopped) +
                    placementToXML(technical.stopped)));
            }
            //
            // <!ATTLIST snap-pizzicato
            //     %print-style;
            //     %placement;
            // >
            if (technical.snapPizzicato) {
                oChildren.push(dangerous(templateObject_318 || (templateObject_318 = __makeTemplateObject(["<snap-pizzicato", " />"], ["<snap-pizzicato", " />"])), printStyleToXML(technical.snapPizzicato) +
                    placementToXML(technical.snapPizzicato)));
            }
            //
            // <!ELEMENT hammer-on (#PCDATA)>
            // <!ATTLIST hammer-on
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %print-style;
            //     %placement;
            // >
            if (technical.hammerOn) {
                var pcdata = xml(templateObject_319 || (templateObject_319 = __makeTemplateObject(["", ""], ["", ""])), technical.hammerOn.data);
                oChildren.push(dangerous(templateObject_320 || (templateObject_320 = __makeTemplateObject(["<hammer-on", ">", "</hammer-on>"], ["<hammer-on", ">", "</hammer-on>"])), startStopToXML(technical.hammerOn) +
                    numberLevelToXML(technical.hammerOn) +
                    printStyleToXML(technical.hammerOn) +
                    placementToXML(technical.hammerOn), pcdata));
            }
            // <!ELEMENT pull-off (#PCDATA)>
            // <!ATTLIST pull-off
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %print-style;
            //     %placement;
            // >
            if (technical.pullOff) {
                var pcdata = xml(templateObject_321 || (templateObject_321 = __makeTemplateObject(["", ""], ["", ""])), technical.pullOff.data);
                oChildren.push(dangerous(templateObject_322 || (templateObject_322 = __makeTemplateObject(["<pull-off", ">", "</pull-off>"], ["<pull-off", ">", "</pull-off>"])), startStopToXML(technical.pullOff) +
                    numberLevelToXML(technical.pullOff) +
                    printStyleToXML(technical.pullOff) +
                    placementToXML(technical.pullOff), pcdata));
            }
            //
            // <!ELEMENT bend
            //     (bend-alter, (pre-bend | release)?, with-bar?)>
            // <!ATTLIST bend
            //     %print-style;
            //     %bend-sound;
            // >
            // <!ELEMENT bend-alter (#PCDATA)>
            // <!ELEMENT pre-bend EMPTY>
            // <!ELEMENT release EMPTY>
            // <!ELEMENT with-bar (#PCDATA)>
            // <!ATTLIST with-bar
            //     %print-style;
            //     %placement;
            // >
            if (technical.bend) {
                var bendChildren = [];
                if (defined(technical.bend.bendAlter)) {
                    bendChildren.push(xml(templateObject_323 || (templateObject_323 = __makeTemplateObject(["<bend-alter>", "</bend-alter>"], ["<bend-alter>", "</bend-alter>"])), technical.bend.bendAlter));
                }
                if (defined(technical.bend.preBend)) {
                    bendChildren.push(xml(templateObject_324 || (templateObject_324 = __makeTemplateObject(["<pre-bend />"], ["<pre-bend />"]))));
                }
                else if (defined(technical.bend.release)) {
                    bendChildren.push(xml(templateObject_325 || (templateObject_325 = __makeTemplateObject(["<release />"], ["<release />"]))));
                }
                if (defined(technical.bend.withBar)) {
                    var pcdata = xml(templateObject_326 || (templateObject_326 = __makeTemplateObject(["", ""], ["", ""])), technical.bend.withBar.data);
                    bendChildren.push(dangerous(templateObject_327 || (templateObject_327 = __makeTemplateObject(["<with-bar", ">", "</with-bar>"], ["<with-bar", ">", "</with-bar>"])), printStyleToXML(technical.bend.withBar) +
                        placementToXML(technical.bend.withBar), pcdata));
                }
                oChildren.push(dangerous(templateObject_328 || (templateObject_328 = __makeTemplateObject(["<bend", ">\n", "\n</bend>"], ["<bend", ">\\n", "\\n</bend>"])), printStyleToXML(technical.bend) + bendSoundToXML(technical.bend), bendChildren
                    .join("\n")
                    .split("\n")
                    .map(function (n) { return "  " + n; })
                    .join("\n")));
            }
            //
            // <!ELEMENT tap (#PCDATA)>
            // <!ATTLIST tap
            //     %print-style;
            //     %placement;
            // >
            if (technical.tap) {
                var pcdata = xml(templateObject_329 || (templateObject_329 = __makeTemplateObject(["", ""], ["", ""])), technical.tap.data);
                oChildren.push(dangerous(templateObject_330 || (templateObject_330 = __makeTemplateObject(["<tap", ">", "</tap>"], ["<tap", ">", "</tap>"])), printStyleToXML(technical.tap) + placementToXML(technical.tap), pcdata));
            }
            //
            // <!ATTLIST heel
            //     substitution %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            if (technical.heel) {
                var substitution = "";
                if (defined(technical.heel.substitution)) {
                    substitution += yesNo(templateObject_331 || (templateObject_331 = __makeTemplateObject([" substitution=\"", "\""], [" substitution=\"", "\""])), technical.heel.substitution);
                }
                oChildren.push(dangerous(templateObject_332 || (templateObject_332 = __makeTemplateObject(["<heel", " />"], ["<heel", " />"])), substitution +
                    printStyleToXML(technical.heel) +
                    placementToXML(technical.heel)));
            }
            // <!ATTLIST toe
            //     substitution %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            if (technical.toe) {
                var substitution = "";
                if (defined(technical.toe.substitution)) {
                    substitution += yesNo(templateObject_333 || (templateObject_333 = __makeTemplateObject([" substitution=\"", "\""], [" substitution=\"", "\""])), technical.toe.substitution);
                }
                oChildren.push(dangerous(templateObject_334 || (templateObject_334 = __makeTemplateObject(["<toe", " />"], ["<toe", " />"])), substitution +
                    printStyleToXML(technical.toe) +
                    placementToXML(technical.toe)));
            }
            //
            // <!ATTLIST fingernails
            //     %print-style;
            //     %placement;
            // >
            if (technical.fingernails) {
                oChildren.push(dangerous(templateObject_335 || (templateObject_335 = __makeTemplateObject(["<fingernails", " />"], ["<fingernails", " />"])), printStyleToXML(technical.fingernails) +
                    placementToXML(technical.fingernails)));
            }
            //
            // <!ELEMENT hole (hole-type?, hole-closed, hole-shape?)>
            // <!ATTLIST hole
            //     %print-style;
            //     %placement;
            // >
            // <!ELEMENT hole-type (#PCDATA)>
            // <!ELEMENT hole-closed (#PCDATA)>
            // <!ATTLIST hole-closed
            //     location (right | bottom | left | top) #IMPLIED
            // >
            // <!ELEMENT hole-shape (#PCDATA)>
            if (technical.hole) {
                var holeChildren = [];
                if (defined(technical.hole.holeType)) {
                    holeChildren.push(xml(templateObject_336 || (templateObject_336 = __makeTemplateObject(["<hole-type>", "</hole-type>"], ["<hole-type>", "</hole-type>"])), technical.hole.holeType));
                }
                if (defined(technical.hole.holeClosed)) {
                    var holeClosedAttribs = "";
                    if (defined(technical.hole.holeClosed.location)) {
                        holeClosedAttribs = xml(templateObject_337 || (templateObject_337 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), holeLocationToXML[technical.hole.holeClosed.location]);
                    }
                    holeChildren.push(dangerous(templateObject_338 || (templateObject_338 = __makeTemplateObject(["<hole-closed", ">", "</hole-closed>"], ["<hole-closed", ">", "</hole-closed>"])), holeClosedAttribs, holeClosedTypeToXML[technical.hole.holeClosed.data]));
                }
                if (defined(technical.hole.holeShape)) {
                    holeChildren.push(xml(templateObject_339 || (templateObject_339 = __makeTemplateObject(["<hole-shape>", "</hole-shape>"], ["<hole-shape>", "</hole-shape>"])), technical.hole.holeShape));
                }
                oChildren.push(dangerous(templateObject_340 || (templateObject_340 = __makeTemplateObject(["<hole", ">", "\n</hole>"], ["<hole", ">", "\\n</hole>"])), printStyleToXML(technical.hole) + placementToXML(technical.hole), holeChildren
                    .join("\n")
                    .split("\n")
                    .map(function (n) { return "  " + n; })
                    .join("\n")));
            }
            //
            // <!ELEMENT arrow
            //     ((arrow-direction, arrow-style?) | circular-arrow)>
            // <!ATTLIST arrow
            //     %print-style;
            //     %placement;
            // >
            // <!ELEMENT arrow-direction (#PCDATA)>
            // <!ELEMENT arrow-style (#PCDATA)>
            // <!ELEMENT circular-arrow (#PCDATA)>
            if (technical.arrow) {
                var arrowChildren = [];
                if (defined(technical.arrow.arrowDirection)) {
                    arrowChildren.push(xml(templateObject_341 || (templateObject_341 = __makeTemplateObject(["<arrow-direction>\n                        ", "</arrow-direction>"], ["<arrow-direction>\n                        ", "</arrow-direction>"])), technical.arrow.arrowDirection));
                }
                if (defined(technical.arrow.arrowStyle)) {
                    arrowChildren.push(xml(templateObject_342 || (templateObject_342 = __makeTemplateObject(["<arrow-style>\n                        ", "</arrow-style>"], ["<arrow-style>\n                        ", "</arrow-style>"])), technical.arrow.arrowStyle));
                }
                if (defined(technical.arrow.circularArrow)) {
                    arrowChildren.push(xml(templateObject_343 || (templateObject_343 = __makeTemplateObject(["<circular-arrow>\n                        ", "</circular-arrow>"], ["<circular-arrow>\n                        ", "</circular-arrow>"])), technical.arrow.circularArrow));
                }
                oChildren.push(dangerous(templateObject_344 || (templateObject_344 = __makeTemplateObject(["<arrow", ">", "\n</arrow>"], ["<arrow", ">", "\\n</arrow>"])), printStyleToXML(technical.arrow) + placementToXML(technical.arrow), arrowChildren
                    .join("\n")
                    .split("\n")
                    .map(function (n) { return "  " + n; })
                    .join("\n")));
            }
            //
            // <!ELEMENT handbell (#PCDATA)>
            // <!ATTLIST handbell
            //     %print-style;
            //     %placement;
            // >
            if (technical.handbell) {
                var pcdata = xml(templateObject_345 || (templateObject_345 = __makeTemplateObject(["", ""], ["", ""])), technical.handbell.data);
                oChildren.push(dangerous(templateObject_346 || (templateObject_346 = __makeTemplateObject(["<handbell", ">", "</handbell>"], ["<handbell", ">", "</handbell>"])), printStyleToXML(technical.handbell) +
                    placementToXML(technical.handbell), pcdata));
            }
            //
            // <!ELEMENT other-technical (#PCDATA)>
            // <!ATTLIST other-technical
            //     %print-style;
            //     %placement;
            // >
            if (technical.otherTechnical) {
                var pcdata = xml(templateObject_347 || (templateObject_347 = __makeTemplateObject(["", ""], ["", ""])), technical.otherTechnical.data);
                oChildren.push(dangerous(templateObject_348 || (templateObject_348 = __makeTemplateObject(["<other-technical", ">", "</other-technical>"], ["<other-technical", ">", "</other-technical>"])), printStyleToXML(technical.otherTechnical) +
                    placementToXML(technical.otherTechnical), pcdata));
            }
            nChildren.push(dangerous(templateObject_349 || (templateObject_349 = __makeTemplateObject(["<technical>\n", "\n</technical>"], ["<technical>\\n", "\\n</technical>"])), oChildren
                .join("\n")
                .split("\n")
                .map(function (n) { return "  " + n; })
                .join("\n")));
        });
        (notation.articulations || []).forEach(function (articulation) {
            var oChildren = [];
            // <!ELEMENT articulations
            //     ((accent | strong-accent | staccato | tenuto |
            //       detached-legato | staccatissimo | spiccato |
            //       scoop | plop | doit | falloff | breath-mark |
            //       caesura | stress | unstress | other-articulation)*)>
            //
            // <!ATTLIST accent
            //     %print-style;
            //     %placement;
            // >
            if (articulation.accent) {
                oChildren.push(dangerous(templateObject_350 || (templateObject_350 = __makeTemplateObject(["<accent", " />"], ["<accent", " />"])), printStyleToXML(articulation.accent) +
                    placementToXML(articulation.accent)));
            }
            // <!ATTLIST strong-accent
            //     %print-style;
            //     %placement;
            //     type %up-down; "up"
            // >
            if (articulation.strongAccent) {
                oChildren.push(dangerous(templateObject_351 || (templateObject_351 = __makeTemplateObject(["<strong-accent", " />"], ["<strong-accent", " />"])), printStyleToXML(articulation.strongAccent) +
                    placementToXML(articulation.strongAccent) +
                    upDownToXML(articulation.strongAccent)));
            }
            //
            // <!ATTLIST staccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccato) {
                oChildren.push(dangerous(templateObject_352 || (templateObject_352 = __makeTemplateObject(["<staccato", " />"], ["<staccato", " />"])), printStyleToXML(articulation.staccato) +
                    placementToXML(articulation.staccato)));
            }
            // <!ATTLIST tenuto
            //     %print-style;
            //     %placement;
            // >
            if (articulation.tenuto) {
                oChildren.push(dangerous(templateObject_353 || (templateObject_353 = __makeTemplateObject(["<tenuto", " />"], ["<tenuto", " />"])), printStyleToXML(articulation.tenuto) +
                    placementToXML(articulation.tenuto)));
            }
            // <!ATTLIST detached-legato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.detachedLegato) {
                oChildren.push(dangerous(templateObject_354 || (templateObject_354 = __makeTemplateObject(["<detached-legato", " />"], ["<detached-legato", " />"])), printStyleToXML(articulation.detachedLegato) +
                    placementToXML(articulation.detachedLegato)));
            }
            //
            // <!ATTLIST staccatissimo
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccatissimo) {
                oChildren.push(dangerous(templateObject_355 || (templateObject_355 = __makeTemplateObject(["<staccatissimo", " />"], ["<staccatissimo", " />"])), printStyleToXML(articulation.staccatissimo) +
                    placementToXML(articulation.staccatissimo)));
            }
            //
            // <!ATTLIST spiccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.spiccato) {
                oChildren.push(dangerous(templateObject_356 || (templateObject_356 = __makeTemplateObject(["<spiccato", " />"], ["<spiccato", " />"])), printStyleToXML(articulation.spiccato) +
                    placementToXML(articulation.spiccato)));
            }
            //
            // <!ATTLIST scoop
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.scoop) {
                oChildren.push(dangerous(templateObject_357 || (templateObject_357 = __makeTemplateObject(["<scoop", " />"], ["<scoop", " />"])), lineShapeToXML(articulation.scoop) +
                    lineTypeToXML(articulation.scoop) +
                    dashedFormattingToXML(articulation.scoop) +
                    printStyleToXML(articulation.scoop) +
                    placementToXML(articulation.scoop)));
            }
            // <!ATTLIST plop
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.plop) {
                oChildren.push(dangerous(templateObject_358 || (templateObject_358 = __makeTemplateObject(["<plop", " />"], ["<plop", " />"])), lineShapeToXML(articulation.plop) +
                    lineTypeToXML(articulation.plop) +
                    dashedFormattingToXML(articulation.plop) +
                    printStyleToXML(articulation.plop) +
                    placementToXML(articulation.plop)));
            }
            // <!ATTLIST doit
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.doit) {
                oChildren.push(dangerous(templateObject_359 || (templateObject_359 = __makeTemplateObject(["<doit", " />"], ["<doit", " />"])), lineShapeToXML(articulation.doit) +
                    lineTypeToXML(articulation.doit) +
                    dashedFormattingToXML(articulation.doit) +
                    printStyleToXML(articulation.doit) +
                    placementToXML(articulation.doit)));
            }
            // <!ATTLIST falloff
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.falloff) {
                oChildren.push(dangerous(templateObject_360 || (templateObject_360 = __makeTemplateObject(["<falloff", " />"], ["<falloff", " />"])), lineShapeToXML(articulation.falloff) +
                    lineTypeToXML(articulation.falloff) +
                    dashedFormattingToXML(articulation.falloff) +
                    printStyleToXML(articulation.falloff) +
                    placementToXML(articulation.falloff)));
            }
            //
            // <!ELEMENT breath-mark (#PCDATA)>
            // <!ATTLIST breath-mark
            //     %print-style;
            //     %placement;
            // >
            if (articulation.breathMark) {
                var pcdata = xml(templateObject_361 || (templateObject_361 = __makeTemplateObject(["", ""], ["", ""])), breathMarkTypeToXML[articulation.breathMark.type]);
                oChildren.push(dangerous(templateObject_362 || (templateObject_362 = __makeTemplateObject(["<breath-mark", ">", "</breath-mark>"], ["<breath-mark", ">", "</breath-mark>"])), printStyleToXML(articulation.breathMark) +
                    placementToXML(articulation.breathMark), pcdata));
            }
            //
            // <!ATTLIST caesura
            //     %print-style;
            //     %placement;
            // >
            if (articulation.caesura) {
                oChildren.push(dangerous(templateObject_363 || (templateObject_363 = __makeTemplateObject(["<caesura", " />"], ["<caesura", " />"])), printStyleToXML(articulation.caesura) +
                    placementToXML(articulation.caesura)));
            }
            // <!ATTLIST stress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.stress) {
                oChildren.push(dangerous(templateObject_364 || (templateObject_364 = __makeTemplateObject(["<stress", " />"], ["<stress", " />"])), printStyleToXML(articulation.stress) +
                    placementToXML(articulation.stress)));
            }
            // <!ATTLIST unstress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.unstress) {
                oChildren.push(dangerous(templateObject_365 || (templateObject_365 = __makeTemplateObject(["<unstress", " />"], ["<unstress", " />"])), printStyleToXML(articulation.unstress) +
                    placementToXML(articulation.unstress)));
            }
            // <!ELEMENT other-articulation (#PCDATA)>
            // <!ATTLIST other-articulation
            //     %print-style;
            //     %placement;
            // >
            (articulation.otherArticulations || []).forEach(function (articulation) {
                var pcdata = xml(templateObject_366 || (templateObject_366 = __makeTemplateObject(["", ""], ["", ""])), articulation.data);
                oChildren.push(dangerous(templateObject_367 || (templateObject_367 = __makeTemplateObject(["<other-articulation", ">", "</other-articulation>"], ["<other-articulation", ">", "</other-articulation>"])), printStyleToXML(articulation) + placementToXML(articulation), pcdata));
            });
            nChildren.push(dangerous(templateObject_368 || (templateObject_368 = __makeTemplateObject(["<articulations>\n", "\n</articulations>"], ["<articulations>\\n", "\\n</articulations>"])), oChildren
                .join("\n")
                .split("\n")
                .map(function (n) { return "  " + n; })
                .join("\n")));
        });
        (notation.dynamics || []).forEach(function (dynamics) {
            nChildren.push(dynamicsToXML(dynamics));
        });
        (notation.fermatas || []).forEach(function (fermata) {
            nChildren.push(fermataToXML(fermata));
        });
        (notation.arpeggiates || []).forEach(function (arpeggiate) {
            // <!ATTLIST arpeggiate
            //     number %number-level; #IMPLIED
            //     direction %up-down; #IMPLIED
            //     %position;
            //     %placement;
            //     %color;
            // >
            nChildren.push(dangerous(templateObject_369 || (templateObject_369 = __makeTemplateObject(["<arpeggiate", " />"], ["<arpeggiate", " />"])), numberLevelToXML(arpeggiate) +
                upDownDirectionToXML(arpeggiate) +
                positionToXML(arpeggiate) +
                placementToXML(arpeggiate) +
                colorToXML(arpeggiate)));
        });
        (notation.nonArpeggiates || []).forEach(function (nonArpeggiate) {
            // <!ATTLIST non-arpeggiate
            //     type %top-bottom; #REQUIRED
            //     number %number-level; #IMPLIED
            //     %position;
            //     %placement;
            //     %color;
            // >
            nChildren.push(dangerous(templateObject_370 || (templateObject_370 = __makeTemplateObject(["<non-arpeggiate", " />"], ["<non-arpeggiate", " />"])), topBottomToXML(nonArpeggiate) +
                numberLevelToXML(nonArpeggiate) +
                positionToXML(nonArpeggiate) +
                placementToXML(nonArpeggiate) +
                colorToXML(nonArpeggiate)));
        });
        (notation.accidentalMarks || []).forEach(function (accidentalMark) {
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            var pcdata = xml(templateObject_371 || (templateObject_371 = __makeTemplateObject(["", ""], ["", ""])), accidentalMark.mark);
            nChildren.push(dangerous(templateObject_372 || (templateObject_372 = __makeTemplateObject(["<accidental-mark", ">", "</accidental-mark>"], ["<accidental-mark", ">", "</accidental-mark>"])), printStyleToXML(accidentalMark) + placementToXML(accidentalMark), pcdata));
        });
        (notation.otherNotations || []).forEach(function (otherNotation) {
            // <!ELEMENT other-notation (#PCDATA)>
            // <!ATTLIST other-notation
            //     type %start-stop-single; #REQUIRED
            //     number %number-level; "1"
            //     %print-object;
            //     %print-style;
            //     %placement;
            // >
            var pcdata = xml(templateObject_373 || (templateObject_373 = __makeTemplateObject(["", ""], ["", ""])), otherNotation.data);
            nChildren.push(dangerous(templateObject_374 || (templateObject_374 = __makeTemplateObject(["<other-notation", ">", "</other-notation>"], ["<other-notation", ">", "</other-notation>"])), startStopSingleToXML(otherNotation) +
                numberLevelToXML(otherNotation) +
                printObjectToXML(otherNotation) +
                printStyleToXML(otherNotation) +
                placementToXML(otherNotation), pcdata));
        });
        elements.push(dangerous(templateObject_375 || (templateObject_375 = __makeTemplateObject(["<notations", ">\n", "\n</notations>"], ["<notations", ">\\n", "\\n</notations>"])), notationsAttribs, nChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    (note.lyrics || []).forEach(function (lyric) {
        // <!ELEMENT lyric
        //     ((((syllabic?, text),
        //        (elision?, syllabic?, text)*, extend?) |
        //        extend | laughing | humming),
        //       end-line?, end-paragraph?, %editorial;)>
        // <!ATTLIST lyric
        //     number NMTOKEN #IMPLIED
        //     name CDATA #IMPLIED
        //     %justify;
        //     %position;
        //     %placement;
        //     %color;
        //     %print-object;
        // >
        // TODO: should validate other (e.g., no end-paragraph after syllabic)
        var lyricAttribs = "" +
            numberLevelToXML(lyric) +
            nameToXML(lyric) +
            justifyToXML(lyric) +
            positionToXML(lyric) +
            placementToXML(lyric) +
            colorToXML(lyric) +
            printObjectToXML(lyric);
        var lyricChildren = [];
        (lyric.lyricParts || []).forEach(function (part) {
            // relies on part._class as set in musicxml-interfaces
            switch (part._class) {
                case "Syllabic":
                    // <!ELEMENT syllabic (#PCDATA)>
                    lyricChildren.push(dangerous(templateObject_376 || (templateObject_376 = __makeTemplateObject(["<syllabic>", "</syllabic>"], ["<syllabic>", "</syllabic>"])), syllabicTypeToXML[part.data]));
                    break;
                case "Text":
                    // <!ELEMENT text (#PCDATA)>
                    // <!ATTLIST text
                    //     %font;
                    //     %color;
                    //     %text-decoration;
                    //     %text-rotation;
                    //     %letter-spacing;
                    //     xml:lang NMTOKEN #IMPLIED TODO musicxml-interfaces
                    //     %text-direction;
                    var textpcdata = xml(templateObject_377 || (templateObject_377 = __makeTemplateObject(["", ""], ["", ""])), part.data);
                    lyricChildren.push(dangerous(templateObject_378 || (templateObject_378 = __makeTemplateObject(["<text", ">", "</text>"], ["<text", ">", "</text>"])), fontToXML(part) +
                        colorToXML(part) +
                        textDecorationToXML(part) +
                        textRotationToXML(part) +
                        letterSpacingToXML(part) +
                        textDirectionToXML(part), textpcdata));
                    break;
                case "Elision":
                    // <!ELEMENT elision (#PCDATA)>
                    // <!ATTLIST elision
                    //     %font;
                    //     %color;
                    // >
                    var pcdata = xml(templateObject_379 || (templateObject_379 = __makeTemplateObject(["", ""], ["", ""])), part.data);
                    lyricChildren.push(dangerous(templateObject_380 || (templateObject_380 = __makeTemplateObject(["<elision", ">", "</elision>"], ["<elision", ">", "</elision>"])), startStopContinueToXML(part) + printStyleToXML(part), pcdata));
                    break;
                case "Extend":
                    // <!ELEMENT extend EMPTY>
                    // <!ATTLIST extend
                    //     type %start-stop-continue; #IMPLIED
                    //     %print-style;
                    // >
                    lyricChildren.push(dangerous(templateObject_381 || (templateObject_381 = __makeTemplateObject(["<extend", " />"], ["<extend", " />"])), startStopContinueToXML(part) + printStyleToXML(part)));
                    break;
                case "Laughing":
                    // <!ELEMENT laughing EMPTY>
                    lyricChildren.push(xml(templateObject_382 || (templateObject_382 = __makeTemplateObject(["<laughing />"], ["<laughing />"]))));
                    break;
                case "Humming":
                    // <!ELEMENT humming EMPTY>
                    lyricChildren.push(xml(templateObject_383 || (templateObject_383 = __makeTemplateObject(["<humming />"], ["<humming />"]))));
                    break;
                case "EndLine":
                    // <!ELEMENT end-line EMPTY>
                    lyricChildren.push(xml(templateObject_384 || (templateObject_384 = __makeTemplateObject(["<end-line />"], ["<end-line />"]))));
                    break;
                case "EndParagraph":
                    // <!ELEMENT end-paragraph EMPTY>
                    lyricChildren.push(xml(templateObject_385 || (templateObject_385 = __makeTemplateObject(["<end-paragraph />"], ["<end-paragraph />"]))));
                    break;
                case "Footnote":
                case "Level":
                case "Editorial":
                    lyricChildren = lyricChildren.concat(editorialToXML(part));
                    break;
            }
        });
        elements.push(dangerous(templateObject_386 || (templateObject_386 = __makeTemplateObject(["<lyric", ">\n", "\n</lyric>"], ["<lyric", ">\\n", "\\n</lyric>"])), lyricAttribs, lyricChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    if (defined(note.play)) {
        // <!ELEMENT play ((ipa | mute | semi-pitched | other-play)*)>
        // <!ATTLIST play
        //     id IDREF #IMPLIED
        // >
        var playAttribs = "";
        var playChildren = [];
        // TODO: musicxml-interfaces is missing play.id!!
        // if (defined(note.play.id)) {
        //     playAttribs += xml ` id="${note.play.id}"`;
        // }
        // <!ELEMENT ipa (#PCDATA)>
        if (defined(note.play.ipa)) {
            playChildren.push(xml(templateObject_387 || (templateObject_387 = __makeTemplateObject(["<ipa>", "</ipa>"], ["<ipa>", "</ipa>"])), note.play.ipa));
        }
        // <!ELEMENT mute (#PCDATA)>
        if (defined(note.play.mute)) {
            playChildren.push(xml(templateObject_388 || (templateObject_388 = __makeTemplateObject(["<mute>", "</mute>"], ["<mute>", "</mute>"])), note.play.mute));
        }
        // <!ELEMENT semi-pitched (#PCDATA)>
        if (defined(note.play.semiPitched)) {
            playChildren.push(xml(templateObject_389 || (templateObject_389 = __makeTemplateObject(["<semi-pitched>", "</semi-pitched>"], ["<semi-pitched>", "</semi-pitched>"])), note.play.semiPitched));
        }
        // <!ELEMENT other-play (#PCDATA)>
        // <!ATTLIST other-play
        //     type CDATA #REQUIRED
        // >
        if (defined(note.play.otherPlay)) {
            var oPcdata = xml(templateObject_390 || (templateObject_390 = __makeTemplateObject(["", ""], ["", ""])), note.play.otherPlay.data);
            var oAttribs = "";
            if (defined(note.play.otherPlay.type)) {
                oAttribs += xml(templateObject_391 || (templateObject_391 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), note.play.otherPlay.type);
            }
            playChildren.push(dangerous(templateObject_392 || (templateObject_392 = __makeTemplateObject(["<other-play", ">", "</other-play>"], ["<other-play", ">", "</other-play>"])), oAttribs, oPcdata));
        }
        elements.push(dangerous(templateObject_393 || (templateObject_393 = __makeTemplateObject(["<play", ">\n", "\n</play>"], ["<play", ">\\n", "\\n</play>"])), playAttribs, playChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    }
    return dangerous(templateObject_394 || (templateObject_394 = __makeTemplateObject(["<note", ">\n", "\n</note>"], ["<note", ">\\n", "\\n</note>"])), attribs, elements
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function figuredBassToXML(figuredBass) {
    // <!ELEMENT figured-bass (figure+, duration?, %editorial;)>
    // <!ATTLIST figured-bass
    //     %print-style;
    //     %printout;
    //     parentheses %yes-no; #IMPLIED
    // >
    var attribs = "" + printStyleToXML(figuredBass) + printoutToXML(figuredBass);
    if (defined(figuredBass.parentheses)) {
        attribs += yesNo(templateObject_395 || (templateObject_395 = __makeTemplateObject([" parentheses=\"", "\""], [" parentheses=\"", "\""])), figuredBass.parentheses);
    }
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(figuredBass));
    (figuredBass.figures || []).forEach(function (figure) {
        // <!ELEMENT figure (prefix?, figure-number?, suffix?, extend?)>
        var fChildren = [];
        // <!ELEMENT prefix (#PCDATA)>
        // <!ATTLIST prefix
        //     %print-style;
        // >
        if (defined(figure.prefix)) {
            var pcdata = xml(templateObject_396 || (templateObject_396 = __makeTemplateObject(["", ""], ["", ""])), figure.prefix.data);
            fChildren.push(dangerous(templateObject_397 || (templateObject_397 = __makeTemplateObject(["<prefix", ">", "</prefix>"], ["<prefix", ">", "</prefix>"])), printStyleToXML(figure.prefix), pcdata));
        }
        // <!ELEMENT figure-number (#PCDATA)>
        // <!ATTLIST figure-number
        //     %print-style;
        // >
        if (defined(figure.figureNumber)) {
            var pcdata = xml(templateObject_398 || (templateObject_398 = __makeTemplateObject(["", ""], ["", ""])), figure.figureNumber.data);
            fChildren.push(dangerous(templateObject_399 || (templateObject_399 = __makeTemplateObject(["<figure-number", ">", "</figure-number>"], ["<figure-number", ">", "</figure-number>"])), printStyleToXML(figure.figureNumber), pcdata));
        }
        // <!ELEMENT suffix (#PCDATA)>
        // <!ATTLIST suffix
        //     %print-style;
        // >
        if (defined(figure.suffix)) {
            var pcdata = xml(templateObject_400 || (templateObject_400 = __makeTemplateObject(["", ""], ["", ""])), figure.suffix.data);
            fChildren.push(dangerous(templateObject_401 || (templateObject_401 = __makeTemplateObject(["<suffix", ">", "</suffix>"], ["<suffix", ">", "</suffix>"])), printStyleToXML(figure.suffix), pcdata));
        }
        children.push(dangerous(templateObject_402 || (templateObject_402 = __makeTemplateObject(["<figure>\n", "\n</figure>"], ["<figure>\\n", "\\n</figure>"])), fChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    if (defined(figuredBass.duration)) {
        children.push(xml(templateObject_403 || (templateObject_403 = __makeTemplateObject(["<duration>", "</duration>"], ["<duration>", "</duration>"])), figuredBass.duration));
    }
    children = children.concat(editorialToXML(figuredBass));
    return dangerous(templateObject_404 || (templateObject_404 = __makeTemplateObject(["<figured-bass", ">\n", "\n</figured-bass>"], ["<figured-bass", ">\\n", "\\n</figured-bass>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var barlineLocationToXML = {
    1: "right",
    2: "middle",
    0: "left",
};
function barlineToXML(barline) {
    // <!ELEMENT barline (bar-style?, %editorial;, wavy-line?,
    //     segno?, coda?, (fermata, fermata?)?, ending?, repeat?)>
    // <!ATTLIST barline
    //     location (right | left | middle) "right"
    //     segno CDATA #IMPLIED
    //     coda CDATA #IMPLIED
    //     divisions CDATA #IMPLIED
    // >
    var children = [];
    var attribs = "";
    children = children.concat(staffDebugInfoToXMLComment(barline));
    if (defined(barline.barStyle)) {
        children.push(barStyleToXML(barline.barStyle));
    }
    children = children.concat(editorialToXML(barline));
    if (defined(barline.wavyLine)) {
        children.push(wavyLineToXML(barline.wavyLine));
    }
    if (defined(barline.segno)) {
        children.push(segnoToXML(barline.segno));
    }
    if (defined(barline.coda)) {
        children.push(codaToXML(barline.coda));
    }
    (barline.fermatas || []).forEach(function (fermata) {
        children.push(fermataToXML(fermata));
    });
    if (defined(barline.ending)) {
        children.push(endingToXML(barline.ending));
    }
    if (defined(barline.repeat)) {
        children.push(repeatToXML(barline.repeat));
    }
    if (defined(barline.location)) {
        attribs += xml(templateObject_405 || (templateObject_405 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), barlineLocationToXML[barline.location]);
    }
    if (defined(barline.segnoAttrib)) {
        attribs += xml(templateObject_406 || (templateObject_406 = __makeTemplateObject([" segno=\"", "\""], [" segno=\"", "\""])), barline.segnoAttrib);
    }
    if (defined(barline.codaAttrib)) {
        attribs += xml(templateObject_407 || (templateObject_407 = __makeTemplateObject([" coda=\"", "\""], [" coda=\"", "\""])), barline.codaAttrib);
    }
    if (defined(barline.divisions)) {
        attribs += xml(templateObject_408 || (templateObject_408 = __makeTemplateObject([" divisions=\"", "\""], [" divisions=\"", "\""])), barline.divisions);
    }
    return dangerous(templateObject_409 || (templateObject_409 = __makeTemplateObject(["<barline", ">\n", "\n</barline>"], ["<barline", ">\\n", "\\n</barline>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function directionTypeToXML(d) {
    // <!ELEMENT direction-type (rehearsal+ | segno+ | words+ |
    var children = [];
    (d.rehearsals || []).forEach(function (rehearsal) {
        children.push(rehearsalToXML(rehearsal));
    });
    (d.segnos || []).forEach(function (segno) {
        children.push(segnoToXML(segno));
    });
    (d.words || []).forEach(function (words) {
        children.push(wordsToXML(words));
    });
    //     coda+ | wedge | dynamics+ | dashes | bracket | pedal |
    (d.codas || []).forEach(function (coda) {
        children.push(codaToXML(coda));
    });
    if (defined(d.wedge)) {
        children.push(wedgeToXML(d.wedge));
    }
    if (defined(d.dynamics)) {
        children.push(dynamicsToXML(d.dynamics));
    }
    if (defined(d.dashes)) {
        children.push(dashesToXML(d.dashes));
    }
    if (defined(d.bracket)) {
        children.push(bracketToXML(d.bracket));
    }
    if (defined(d.pedal)) {
        children.push(pedalToXML(d.pedal));
    }
    //     metronome | octave-shift | harp-pedals | damp | damp-all |
    if (defined(d.metronome)) {
        children.push(metronomeToXML(d.metronome));
    }
    if (defined(d.octaveShift)) {
        children.push(octaveShiftToXML(d.octaveShift));
    }
    if (defined(d.harpPedals)) {
        children.push(harpPedalsToXML(d.harpPedals));
    }
    if (defined(d.damp)) {
        children.push(dampToXML(d.damp));
    }
    if (defined(d.dampAll)) {
        children.push(dampAllToXML(d.dampAll));
    }
    //     eyeglasses | string-mute | scordatura | image |
    if (defined(d.eyeglasses)) {
        children.push(eyeglassesToXML(d.eyeglasses));
    }
    if (defined(d.stringMute)) {
        children.push(stringMuteToXML(d.stringMute));
    }
    if (defined(d.scordatura)) {
        children.push(scordaturaToXML(d.scordatura));
    }
    if (defined(d.image)) {
        children.push(imageToXML(d.image));
    }
    //     principal-voice | accordion-registration | percussion+ |
    if (defined(d.principalVoice)) {
        children.push(principalVoiceToXML(d.principalVoice));
    }
    if (defined(d.accordionRegistration)) {
        children.push(accordionRegistrationToXML(d.accordionRegistration));
    }
    (d.percussions || []).forEach(function (p) {
        children.push(percussionToXML(p));
    });
    //     other-direction)>
    if (defined(d.otherDirection)) {
        children.push(otherDirectionToXML(d.otherDirection));
    }
    return dangerous(templateObject_410 || (templateObject_410 = __makeTemplateObject(["<direction-type>\n", "\n</direction-type>"], ["<direction-type>\\n", "\\n</direction-type>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function offsetToXML(offset) {
    // <!ELEMENT offset (#PCDATA)>
    // <!ATTLIST offset
    //     sound %yes-no; #IMPLIED
    // >
    var pcdata = xml(templateObject_411 || (templateObject_411 = __makeTemplateObject(["", ""], ["", ""])), offset.data || "");
    var attribs = yesNo(templateObject_412 || (templateObject_412 = __makeTemplateObject([" sound=\"", "\""], [" sound=\"", "\""])), offset.sound);
    return dangerous(templateObject_413 || (templateObject_413 = __makeTemplateObject(["<offset", ">", "</offset>"], ["<offset", ">", "</offset>"])), attribs, pcdata);
}
function rehearsalToXML(rehearsal) {
    // <!ELEMENT rehearsal (#PCDATA)>
    // <!ATTLIST rehearsal
    //     %text-formatting;
    // >
    var pcdata = xml(templateObject_414 || (templateObject_414 = __makeTemplateObject(["", ""], ["", ""])), rehearsal.data);
    return dangerous(templateObject_415 || (templateObject_415 = __makeTemplateObject(["<rehearsal", ">", "</rehearsal>"], ["<rehearsal", ">", "</rehearsal>"])), textFormattingToXML(rehearsal), pcdata);
}
function wordsToXML(words) {
    // <!ELEMENT words (#PCDATA)>
    // <!ATTLIST words
    //     %text-formatting;
    // >
    var pcdata = xml(templateObject_416 || (templateObject_416 = __makeTemplateObject(["", ""], ["", ""])), words.data);
    return dangerous(templateObject_417 || (templateObject_417 = __makeTemplateObject(["<words", ">", "</words>"], ["<words", ">", "</words>"])), textFormattingToXML(words), pcdata);
}
var wedgeTypeToXML = (_d = {},
    _d[WedgeType.Diminuendo] = "diminuendo",
    _d[WedgeType.Crescendo] = "crescendo",
    _d[WedgeType.Stop] = "stop",
    _d[WedgeType.Continue] = "continue",
    _d);
function wedgeToXML(wedge) {
    // <!ELEMENT wedge EMPTY>
    // <!ATTLIST wedge
    //     type (crescendo | diminuendo | stop | continue) #REQUIRED
    //     number %number-level; #IMPLIED
    //     spread %tenths; #IMPLIED
    //     niente %yes-no; #IMPLIED
    //     %line-type;
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    var attribs = "" + xml(templateObject_418 || (templateObject_418 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), wedgeTypeToXML[wedge.type]) + numberLevelToXML(wedge);
    if (defined(wedge.spread)) {
        attribs += xml(templateObject_419 || (templateObject_419 = __makeTemplateObject([" spread=\"", "\""], [" spread=\"", "\""])), wedge.spread);
    }
    if (defined(wedge.niente)) {
        attribs += yesNo(templateObject_420 || (templateObject_420 = __makeTemplateObject([" niente=\"", "\""], [" niente=\"", "\""])), wedge.niente);
    }
    attribs +=
        lineTypeToXML(wedge) +
            dashedFormattingToXML(wedge) +
            positionToXML(wedge) +
            colorToXML(wedge);
    return dangerous(templateObject_421 || (templateObject_421 = __makeTemplateObject(["<wedge", " />"], ["<wedge", " />"])), attribs);
}
function dynamicsToXML(dynamics) {
    // <!ELEMENT dynamics ((p | pp | ppp | pppp | ppppp | pppppp |
    //     f | ff | fff | ffff | fffff | ffffff | mp | mf | sf |
    //     sfp | sfpp | fp | rf | rfz | sfz | sffz | fz |
    //     other-dynamics)*)>
    // <!ATTLIST dynamics
    //     %print-style-align;
    //     %placement;
    //     %text-decoration;
    //     %enclosure;
    // >
    // <!ELEMENT p EMPTY>
    // ...
    // <!ELEMENT other-dynamics (#PCDATA)>
    var oChildren = [];
    Object.keys(dynamics || {}).forEach(function (key) {
        var subDynamic = dynamics[key];
        if (!!subDynamic &&
            [
                "p",
                "pp",
                "ppp",
                "pppp",
                "ppppp",
                "pppppp",
                "f",
                "ff",
                "fff",
                "ffff",
                "fffff",
                "ffffff",
                "mp",
                "mf",
                "sf",
                "sfp",
                "sfpp",
                "fp",
                "rf",
                "rfz",
                "sfz",
                "sffz",
                "fz",
            ].indexOf(key) !== -1) {
            oChildren.push(dangerous(templateObject_422 || (templateObject_422 = __makeTemplateObject(["<", " />"], ["<", " />"])), key));
        }
    });
    if (dynamics.otherDynamics) {
        oChildren.push(xml(templateObject_423 || (templateObject_423 = __makeTemplateObject(["<other-dynamics>", "</other-dynamics>"], ["<other-dynamics>", "</other-dynamics>"])), dynamics.otherDynamics));
    }
    return dangerous(templateObject_424 || (templateObject_424 = __makeTemplateObject(["<dynamics", ">\n", "\n</dynamics>"], ["<dynamics", ">\\n", "\\n</dynamics>"])), printStyleAlignToXML(dynamics) +
        placementToXML(dynamics) +
        textDecorationToXML(dynamics) +
        enclosureToXML(dynamics), oChildren
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function dashesToXML(dashes) {
    // <!ELEMENT dashes EMPTY>
    // <!ATTLIST dashes
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    var attribs = "" +
        startStopContinueToXML(dashes) +
        numberLevelToXML(dashes) +
        dashedFormattingToXML(dashes) +
        positionToXML(dashes) +
        colorToXML(dashes);
    return dangerous(templateObject_425 || (templateObject_425 = __makeTemplateObject(["<dashes", " />"], ["<dashes", " />"])), attribs);
}
var lineEndTypeToXML = (_e = {},
    _e[LineEndType.None] = "none",
    _e[LineEndType.Both] = "both",
    _e[LineEndType.Arrow] = "arrow",
    _e[LineEndType.Down] = "down",
    _e[LineEndType.Up] = "up",
    _e);
function bracketToXML(bracket) {
    // <!ELEMENT bracket EMPTY>
    // <!ATTLIST bracket
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     line-end (up | down | both | arrow | none) #REQUIRED
    //     end-length %tenths; #IMPLIED
    //     %line-type;
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    var attribs = "" + startStopContinueToXML(bracket) + numberLevelToXML(bracket);
    attribs += xml(templateObject_426 || (templateObject_426 = __makeTemplateObject([" line-end=\"", "\""], [" line-end=\"", "\""])), lineEndTypeToXML[bracket.lineEnd]);
    if (defined(bracket.endLength)) {
        attribs += xml(templateObject_427 || (templateObject_427 = __makeTemplateObject([" end-length=\"", "\""], [" end-length=\"", "\""])), bracket.endLength);
    }
    attribs +=
        lineTypeToXML(bracket) +
            dashedFormattingToXML(bracket) +
            positionToXML(bracket) +
            colorToXML(bracket);
    return dangerous(templateObject_428 || (templateObject_428 = __makeTemplateObject(["<bracket", " />"], ["<bracket", " />"])), attribs);
}
var pedalTypeToXML = (_f = {},
    _f[PedalType.Change] = "change",
    _f[PedalType.Start] = "start",
    _f[PedalType.Stop] = "stop",
    _f[PedalType.Continue] = "continue",
    _f);
function pedalToXML(pedal) {
    // <!ELEMENT pedal EMPTY>
    // <!ATTLIST pedal
    //     type (start | stop | continue | change) #REQUIRED
    //     line %yes-no; #IMPLIED
    //     sign %yes-no; #IMPLIED
    //     %print-style-align;
    // >
    var attribs = "" + xml(templateObject_429 || (templateObject_429 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), pedalTypeToXML[pedal.type]);
    if (defined(pedal.line)) {
        attribs += yesNo(templateObject_430 || (templateObject_430 = __makeTemplateObject([" line=\"", "\""], [" line=\"", "\""])), pedal.line);
    }
    if (defined(pedal.sign)) {
        attribs += yesNo(templateObject_431 || (templateObject_431 = __makeTemplateObject([" sign=\"", "\""], [" sign=\"", "\""])), pedal.sign);
    }
    attribs += printStyleAlignToXML(pedal);
    return dangerous(templateObject_432 || (templateObject_432 = __makeTemplateObject(["<pedal", " />"], ["<pedal", " />"])), attribs);
}
function metronomeToXML(metronome) {
    // <!ELEMENT metronome
    //     ((beat-unit, beat-unit-dot*,
    //      (per-minute | (beat-unit, beat-unit-dot*))) |
    //     (metronome-note+, (metronome-relation, metronome-note+)?))>
    // <!ATTLIST metronome
    //     %print-style-align;
    //     %justify;
    //     parentheses %yes-no; #IMPLIED
    // >
    var children = [];
    var attribs = "" + printStyleAlignToXML(metronome) + justifyToXML(metronome);
    if (defined(metronome.parentheses)) {
        attribs += yesNo(templateObject_433 || (templateObject_433 = __makeTemplateObject([" parentheses=\"", "\""], [" parentheses=\"", "\""])), metronome.parentheses);
    }
    if (defined(metronome.beatUnit)) {
        // <!ELEMENT beat-unit (#PCDATA)>
        children.push(xml(templateObject_434 || (templateObject_434 = __makeTemplateObject(["<beat-unit>", "</beat-unit>"], ["<beat-unit>", "</beat-unit>"])), metronome.beatUnit));
    }
    (metronome.beatUnitDots || []).forEach(function () {
        // <!ELEMENT beat-unit-dot EMPTY>
        children.push(xml(templateObject_435 || (templateObject_435 = __makeTemplateObject(["<beat-unit-dot />"], ["<beat-unit-dot />"]))));
    });
    if (defined(metronome.perMinute)) {
        // <!ELEMENT per-minute (#PCDATA)>
        // <!ATTLIST per-minute
        //     %font;
        // >
        var pcdata = xml(templateObject_436 || (templateObject_436 = __makeTemplateObject(["", ""], ["", ""])), metronome.perMinute.data);
        children.push(dangerous(templateObject_437 || (templateObject_437 = __makeTemplateObject(["<per-minute", ">", "</per-minute>"], ["<per-minute", ">", "</per-minute>"])), fontToXML(metronome.perMinute), pcdata));
    }
    else {
        if (defined(metronome.beatUnitChange)) {
            // <!ELEMENT beat-unit (#PCDATA)>
            children.push(xml(templateObject_438 || (templateObject_438 = __makeTemplateObject(["<beat-unit>", "</beat-unit>"], ["<beat-unit>", "</beat-unit>"])), metronome.beatUnitChange));
        }
        (metronome.beatUnitDotsChange || []).forEach(function () {
            // <!ELEMENT beat-unit-dot EMPTY>
            children.push(xml(templateObject_439 || (templateObject_439 = __makeTemplateObject(["<beat-unit-dot />"], ["<beat-unit-dot />"]))));
        });
    }
    // TODO musicxml-interfaces second beat-unit!!
    (metronome.metronomeNotes || []).forEach(function (note) {
        // <!ELEMENT metronome-note
        //     (metronome-type, metronome-dot*,
        //      metronome-beam*, metronome-tuplet?)>
        var oChildren = [];
        if (defined(note.metronomeType)) {
            // <!ELEMENT metronome-type (#PCDATA)>
            oChildren.push(xml(templateObject_440 || (templateObject_440 = __makeTemplateObject(["<metronome-type>", "</metronome-type>"], ["<metronome-type>", "</metronome-type>"])), note.metronomeType));
        }
        (note.metronomeDots || []).forEach(function () {
            // <!ELEMENT metronome-dot EMPTY>
            oChildren.push(xml(templateObject_441 || (templateObject_441 = __makeTemplateObject(["<metronome-dot />"], ["<metronome-dot />"]))));
        });
        (note.metronomeBeams || []).forEach(function (beam) {
            // <!ELEMENT metronome-beam (#PCDATA)>
            // <!ATTLIST metronome-beam
            //     number %beam-level; "1"
            // >
            var pcdata = xml(templateObject_442 || (templateObject_442 = __makeTemplateObject(["", ""], ["", ""])), beam.data);
            oChildren.push(dangerous(templateObject_443 || (templateObject_443 = __makeTemplateObject(["<metronome-beam", ">", "</metronome-beam>"], ["<metronome-beam", ">", "</metronome-beam>"])), numberLevelToXML(beam), pcdata));
        });
        if (defined(note.metronomeTuplet)) {
            oChildren.push(metronomeTupletToXML(note.metronomeTuplet));
        }
        children.push(dangerous(templateObject_444 || (templateObject_444 = __makeTemplateObject(["<metronome-note>\n", "\n</metronome-note>"], ["<metronome-note>\\n", "\\n</metronome-note>"])), oChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    if (defined(metronome.metronomeRelation)) {
        // <!ELEMENT metronome-relation (#PCDATA)>
        children.push(xml(templateObject_445 || (templateObject_445 = __makeTemplateObject(["<metronome-relation>", "</metronome-relation>"], ["<metronome-relation>", "</metronome-relation>"])), metronome.metronomeRelation));
    }
    return dangerous(templateObject_446 || (templateObject_446 = __makeTemplateObject(["<metronome", ">\n", "\n</metronome>"], ["<metronome", ">\\n", "\\n</metronome>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function metronomeTupletToXML(metronomeTuplet) {
    // <!ELEMENT metronome-tuplet
    //     (actual-notes, normal-notes,
    //      (normal-type, normal-dot*)?)>
    // <!ATTLIST metronome-tuplet
    //     type %start-stop; #REQUIRED
    //     bracket %yes-no; #IMPLIED
    //     show-number (actual | both | none) #IMPLIED
    // >
    var children = [];
    var attribs = "" + startStopToXML(metronomeTuplet);
    if (defined(metronomeTuplet.bracket)) {
        attribs += yesNo(templateObject_447 || (templateObject_447 = __makeTemplateObject([" bracket=\"", "\""], [" bracket=\"", "\""])), metronomeTuplet.bracket);
    }
    if (defined(metronomeTuplet.showNumber)) {
        attribs += xml(templateObject_448 || (templateObject_448 = __makeTemplateObject([" show-number=\"", "\""], [" show-number=\"", "\""])), actualBothNoneToXML[metronomeTuplet.showNumber]);
    }
    if (metronomeTuplet.actualNotes) {
        children.push(xml(templateObject_449 || (templateObject_449 = __makeTemplateObject(["<actual-notes>", "</actual-notes>"], ["<actual-notes>", "</actual-notes>"])), metronomeTuplet.actualNotes));
    }
    if (metronomeTuplet.normalNotes) {
        children.push(xml(templateObject_450 || (templateObject_450 = __makeTemplateObject(["<normal-notes>", "</normal-notes>"], ["<normal-notes>", "</normal-notes>"])), metronomeTuplet.normalNotes));
    }
    if (metronomeTuplet.normalType) {
        children.push(xml(templateObject_451 || (templateObject_451 = __makeTemplateObject(["<normal-type>", "</normal-type>"], ["<normal-type>", "</normal-type>"])), metronomeTuplet.normalType));
    }
    (metronomeTuplet.normalDots || []).forEach(function () {
        children.push(xml(templateObject_452 || (templateObject_452 = __makeTemplateObject(["<normal-dot />"], ["<normal-dot />"]))));
    });
    return dangerous(templateObject_453 || (templateObject_453 = __makeTemplateObject(["<metronome-tuplet", ">\n", "\n</metronome-tuplet>"], ["<metronome-tuplet", ">\\n", "\\n</metronome-tuplet>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var octaveShiftTypeToXML = (_g = {},
    _g[OctaveShiftType.Down] = "down",
    _g[OctaveShiftType.Stop] = "stop",
    _g[OctaveShiftType.Up] = "up",
    _g[OctaveShiftType.Continue] = "continue",
    _g);
function octaveShiftToXML(octaveShift) {
    // <!ELEMENT octave-shift EMPTY>
    // <!ATTLIST octave-shift
    //     type (up | down | stop | continue) #REQUIRED
    //     number %number-level; #IMPLIED
    //     size CDATA "8"
    //     %dashed-formatting;
    //     %print-style;
    // >
    var attribs = "" + xml(templateObject_454 || (templateObject_454 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), octaveShiftTypeToXML[octaveShift.type]) +
        numberLevelToXML(octaveShift);
    if (defined(octaveShift.size)) {
        attribs += xml(templateObject_455 || (templateObject_455 = __makeTemplateObject([" size=\"", "\""], [" size=\"", "\""])), octaveShift.size);
    }
    attribs += dashedFormattingToXML(octaveShift) + printStyleToXML(octaveShift);
    return dangerous(templateObject_456 || (templateObject_456 = __makeTemplateObject(["<octave-shift", " />"], ["<octave-shift", " />"])), attribs);
}
function harpPedalsToXML(harpPedals) {
    // <!ELEMENT harp-pedals (pedal-tuning)+>
    // <!ATTLIST harp-pedals
    //     %print-style-align;
    // >
    // <!ELEMENT pedal-tuning (pedal-step, pedal-alter)>
    // <!ELEMENT pedal-step (#PCDATA)>
    // <!ELEMENT pedal-alter (#PCDATA)>
    var children = [];
    (harpPedals.pedalTunings || []).forEach(function (tuning) {
        var nChildren = [];
        if (tuning.pedalStep) {
            nChildren.push(xml(templateObject_457 || (templateObject_457 = __makeTemplateObject(["<pedal-step>", "</pedal-step>"], ["<pedal-step>", "</pedal-step>"])), tuning.pedalStep));
        }
        if (tuning.pedalAlter) {
            nChildren.push(xml(templateObject_458 || (templateObject_458 = __makeTemplateObject(["<pedal-alter>", "</pedal-alter>"], ["<pedal-alter>", "</pedal-alter>"])), tuning.pedalAlter));
        }
        children.push(dangerous(templateObject_459 || (templateObject_459 = __makeTemplateObject(["<pedal-tuning>\n", "\n</pedal-tuning>"], ["<pedal-tuning>\\n", "\\n</pedal-tuning>"])), nChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    var attribs = printStyleAlignToXML(harpPedals);
    return dangerous(templateObject_460 || (templateObject_460 = __makeTemplateObject(["<harp-pedals", ">\n", "\n</harp-pedals>"], ["<harp-pedals", ">\\n", "\\n</harp-pedals>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function dampToXML(damp) {
    // <!ELEMENT damp EMPTY>
    // <!ATTLIST damp
    //     %print-style-align;
    // >
    return dangerous(templateObject_461 || (templateObject_461 = __makeTemplateObject(["<damp", " />"], ["<damp", " />"])), printStyleAlignToXML(damp));
}
function dampAllToXML(dampAll) {
    // <!ELEMENT damp-all EMPTY>
    // <!ATTLIST damp-all
    //     %print-style-align;
    // >
    return dangerous(templateObject_462 || (templateObject_462 = __makeTemplateObject(["<damp-all", " />"], ["<damp-all", " />"])), printStyleAlignToXML(dampAll));
}
function eyeglassesToXML(eyeglasses) {
    // <!ELEMENT eyeglasses EMPTY>
    // <!ATTLIST eyeglasses
    //     %print-style-align;
    // >
    return dangerous(templateObject_463 || (templateObject_463 = __makeTemplateObject(["<eyeglasses", " />"], ["<eyeglasses", " />"])), printStyleAlignToXML(eyeglasses));
}
function stringMuteToXML(stringMute) {
    // <!ELEMENT string-mute EMPTY>
    // <!ATTLIST string-mute
    //     type (on | off) #REQUIRED
    //     %print-style-align;
    // >
    var attribs = xml(templateObject_464 || (templateObject_464 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), stringMute.type) + printStyleAlignToXML(stringMute);
    return dangerous(templateObject_465 || (templateObject_465 = __makeTemplateObject(["<string-mute", " />"], ["<string-mute", " />"])), attribs);
}
function scordaturaToXML(scordatura) {
    // <!ELEMENT scordatura (accord+)>
    // <!ELEMENT accord
    //     (tuning-step, tuning-alter?, tuning-octave)>
    // <!ATTLIST accord
    //     string CDATA #REQUIRED
    // >
    var children = [];
    (scordatura.accords || []).forEach(function (accord) {
        var oChildren = tuningStepAlterOctaveToXML(accord);
        var oAttribs = xml(templateObject_466 || (templateObject_466 = __makeTemplateObject([" string=\"", "\""], [" string=\"", "\""])), accord.string);
        children.push(dangerous(templateObject_467 || (templateObject_467 = __makeTemplateObject(["<accord", ">\n", "\n</accord>"], ["<accord", ">\\n", "\\n</accord>"])), oAttribs, oChildren
            .join("\n")
            .split("\n")
            .map(function (n) { return "  " + n; })
            .join("\n")));
    });
    return dangerous(templateObject_468 || (templateObject_468 = __makeTemplateObject(["<scordatura>\n", "\n</scordatura>"], ["<scordatura>\\n", "\\n</scordatura>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function imageToXML(image) {
    // <!ELEMENT image EMPTY>
    // <!ATTLIST image
    //     source CDATA #REQUIRED
    //     type CDATA #REQUIRED
    //     %position;
    //     %halign;
    //     %valign-image;
    // >
    var attribs = "" + xml(templateObject_469 || (templateObject_469 = __makeTemplateObject([" source=\"", "\""], [" source=\"", "\""])), image.source) + xml(templateObject_470 || (templateObject_470 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), image.type) +
        positionToXML(image) +
        halignToXML(image) +
        valignImageToXML(image);
    return dangerous(templateObject_471 || (templateObject_471 = __makeTemplateObject(["<image", " />"], ["<image", " />"])), attribs);
}
var voiceSymbolToXML = (_h = {},
    _h[VoiceSymbol.None] = "none",
    _h[VoiceSymbol.Hauptstimme] = "hauptstimme",
    _h[VoiceSymbol.Nebenstimme] = "nebenstimme",
    _h[VoiceSymbol.Plain] = "plain",
    _h);
function principalVoiceToXML(principalVoice) {
    // <!ELEMENT principal-voice (#PCDATA)>
    // <!ATTLIST principal-voice
    //     type %start-stop; #REQUIRED
    //     symbol (Hauptstimme | Nebenstimme | plain | none) #REQUIRED
    //     %print-style-align;
    // >
    var pcdata = xml(templateObject_472 || (templateObject_472 = __makeTemplateObject(["", ""], ["", ""])), principalVoice.data);
    var attribs = startStopToXML(principalVoice) + xml(templateObject_473 || (templateObject_473 = __makeTemplateObject([" symbol=\"", "\""], [" symbol=\"", "\""])), voiceSymbolToXML[principalVoice.symbol]) +
        printStyleAlignToXML(principalVoice);
    return dangerous(templateObject_474 || (templateObject_474 = __makeTemplateObject(["<principal-voice", "", "</principal-voice>"], ["<principal-voice", "", "</principal-voice>"])), attribs, pcdata);
}
function accordionRegistrationToXML(accordionRegistration) {
    // <!ELEMENT accordion-registration
    //     (accordion-high?, accordion-middle?, accordion-low?)>
    // <!ATTLIST accordion-registration
    //     %print-style-align;
    // >
    // <!ELEMENT accordion-high EMPTY>
    // <!ELEMENT accordion-middle (#PCDATA)>
    // <!ELEMENT accordion-low EMPTY>
    var children = [];
    var attribs = printStyleAlignToXML(accordionRegistration);
    if (defined(accordionRegistration.accordionHigh)) {
        children.push(xml(templateObject_475 || (templateObject_475 = __makeTemplateObject(["<accordion-high />"], ["<accordion-high />"]))));
    }
    if (defined(accordionRegistration.accordionMiddle)) {
        children.push(xml(templateObject_476 || (templateObject_476 = __makeTemplateObject(["<accordion-middle>", "</accordion-middle>"], ["<accordion-middle>", "</accordion-middle>"])), accordionRegistration.accordionMiddle || ""));
    }
    if (defined(accordionRegistration.accordionLow)) {
        children.push(xml(templateObject_477 || (templateObject_477 = __makeTemplateObject(["<accordion-low />"], ["<accordion-low />"]))));
    }
    return dangerous(templateObject_478 || (templateObject_478 = __makeTemplateObject(["<accordion-registration", ">\n", "\n</accordion-registration>"], ["<accordion-registration", ">\\n", "\\n</accordion-registration>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var tipDirectionToXML = (_j = {},
    _j[TipDirection.Right] = "right",
    _j[TipDirection.Northwest] = "northwest",
    _j[TipDirection.Southwest] = "southwest",
    _j[TipDirection.Down] = "down",
    _j[TipDirection.Northeast] = "northeast",
    _j[TipDirection.Southeast] = "southeast",
    _j[TipDirection.Up] = "up",
    _j[TipDirection.Left] = "left",
    _j);
function percussionToXML(percussion) {
    // <!ELEMENT percussion
    //     (glass | metal | wood | pitched | membrane | effect |
    //      timpani | beater | stick | stick-location |
    //      other-percussion)>
    // <!ATTLIST percussion
    //     %print-style-align;
    //     %enclosure;
    // >
    var children = [];
    if (defined(percussion.glass)) {
        // <!ELEMENT glass (#PCDATA)>
        children.push(xml(templateObject_479 || (templateObject_479 = __makeTemplateObject(["<glass>", "</glass>"], ["<glass>", "</glass>"])), percussion.glass));
    }
    if (defined(percussion.metal)) {
        // <!ELEMENT metal (#PCDATA)>
        children.push(xml(templateObject_480 || (templateObject_480 = __makeTemplateObject(["<metal>", "</metal>"], ["<metal>", "</metal>"])), percussion.metal));
    }
    if (defined(percussion.wood)) {
        // <!ELEMENT wood (#PCDATA)>
        children.push(xml(templateObject_481 || (templateObject_481 = __makeTemplateObject(["<wood>", "</wood>"], ["<wood>", "</wood>"])), percussion.wood));
    }
    if (defined(percussion.pitched)) {
        // <!ELEMENT pitched (#PCDATA)>
        children.push(xml(templateObject_482 || (templateObject_482 = __makeTemplateObject(["<pitched>", "</pitched>"], ["<pitched>", "</pitched>"])), percussion.pitched));
    }
    if (defined(percussion.membrane)) {
        // <!ELEMENT membrane (#PCDATA)>
        children.push(xml(templateObject_483 || (templateObject_483 = __makeTemplateObject(["<membrane>", "</membrane>"], ["<membrane>", "</membrane>"])), percussion.membrane));
    }
    if (defined(percussion.effect)) {
        // <!ELEMENT effect (#PCDATA)>
        children.push(xml(templateObject_484 || (templateObject_484 = __makeTemplateObject(["<effect>", "</effect>"], ["<effect>", "</effect>"])), percussion.effect));
    }
    if (defined(percussion.timpani)) {
        // <!ELEMENT timpani EMPTY>
        children.push(xml(templateObject_485 || (templateObject_485 = __makeTemplateObject(["<timpani />"], ["<timpani />"]))));
    }
    if (defined(percussion.beater)) {
        // <!ELEMENT beater (#PCDATA)>
        // <!ATTLIST beater
        //     tip %tip-direction; #IMPLIED
        // >
        var pcdata = xml(templateObject_486 || (templateObject_486 = __makeTemplateObject(["", ""], ["", ""])), percussion.beater.data || "");
        var oAttribs = "";
        if (defined(percussion.beater.tip)) {
            oAttribs += xml(templateObject_487 || (templateObject_487 = __makeTemplateObject([" tip=\"", "\""], [" tip=\"", "\""])), tipDirectionToXML[percussion.beater.tip]);
        }
        children.push(dangerous(templateObject_488 || (templateObject_488 = __makeTemplateObject(["<beater", ">", "</beater>"], ["<beater", ">", "</beater>"])), oAttribs, pcdata));
    }
    if (defined(percussion.stick)) {
        // <!ELEMENT stick (stick-type, stick-material)>
        // <!ATTLIST stick
        //     tip %tip-direction; #IMPLIED
        //     >
        // <!ELEMENT stick-type (#PCDATA)>
        // <!ELEMENT stick-material (#PCDATA)>
        var pcdata = "";
        var oAttribs = "";
        if (defined(percussion.stick.tip)) {
            oAttribs += xml(templateObject_489 || (templateObject_489 = __makeTemplateObject([" tip=\"", "\""], [" tip=\"", "\""])), tipDirectionToXML[percussion.stick.tip]);
        }
        if (defined(percussion.stick.stickType)) {
            pcdata += xml(templateObject_490 || (templateObject_490 = __makeTemplateObject(["  <stick-type>", "</stick-type>\n"], ["  <stick-type>", "</stick-type>\\n"])), percussion.stick.stickType);
        }
        if (defined(percussion.stick.stickMaterial)) {
            pcdata += xml(templateObject_491 || (templateObject_491 = __makeTemplateObject(["  <stick-material>", "</stick-material>\n"], ["  <stick-material>", "</stick-material>\\n"])), percussion.stick.stickMaterial);
        }
        children.push(dangerous(templateObject_492 || (templateObject_492 = __makeTemplateObject(["<stick", ">", "</stick>"], ["<stick", ">", "</stick>"])), oAttribs, pcdata));
    }
    if (defined(percussion.stickLocation)) {
        // <!ELEMENT stick-location (#PCDATA)>
        children.push(xml(templateObject_493 || (templateObject_493 = __makeTemplateObject(["<stick-location>", "</stick-location>"], ["<stick-location>", "</stick-location>"])), percussion.stickLocation));
    }
    if (defined(percussion.otherPercussion)) {
        // <!ELEMENT other-percussion (#PCDATA)>
        children.push(xml(templateObject_494 || (templateObject_494 = __makeTemplateObject(["<other-percussion>", "</other-percussion>"], ["<other-percussion>", "</other-percussion>"])), percussion.otherPercussion));
    }
    return dangerous(templateObject_495 || (templateObject_495 = __makeTemplateObject(["<percussion>\n", "\n</percussion>"], ["<percussion>\\n", "\\n</percussion>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function otherDirectionToXML(otherDirection) {
    // <!ELEMENT other-direction (#PCDATA)>
    // <!ATTLIST other-direction
    //     %print-object;
    //     %print-style-align;
    // >
    var pcdata = xml(templateObject_496 || (templateObject_496 = __makeTemplateObject(["", ""], ["", ""])), otherDirection.data);
    return dangerous(templateObject_497 || (templateObject_497 = __makeTemplateObject(["<other-direction", ">", "</other-direction>"], ["<other-direction", ">", "</other-direction>"])), printObjectToXML(otherDirection) + printStyleAlignToXML(otherDirection), pcdata);
}
function wavyLineToXML(wavyLine) {
    // <!ELEMENT wavy-line EMPTY>
    // <!ATTLIST wavy-line
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     %position;
    //     %placement;
    //     %color;
    //     %trill-sound;
    // >
    var attribs = "" +
        startStopContinueToXML(wavyLine) +
        numberLevelToXML(wavyLine) +
        positionToXML(wavyLine) +
        placementToXML(wavyLine) +
        colorToXML(wavyLine) +
        trillSoundToXML(wavyLine);
    return dangerous(templateObject_498 || (templateObject_498 = __makeTemplateObject(["<wavy-line", " />"], ["<wavy-line", " />"])), attribs);
}
var barStyleTypeToXML = {
    0: "regular",
    5: "light-heavy",
    6: "heavy-light",
    9: "short",
    10: "none",
    2: "dashed",
    7: "heavy-heavy",
    8: "tick",
    1: "dotted",
    3: "heavy",
    4: "light-light",
};
function barStyleToXML(barStyle) {
    // <!ELEMENT bar-style (#PCDATA)>
    // <!ATTLIST bar-style
    //     %color;
    // >
    var attribs = "" + colorToXML(barStyle);
    var pcdata = xml(templateObject_499 || (templateObject_499 = __makeTemplateObject(["", ""], ["", ""])), barStyleTypeToXML[barStyle.data] || "");
    return dangerous(templateObject_500 || (templateObject_500 = __makeTemplateObject(["<bar-style", ">", "</bar-style>"], ["<bar-style", ">", "</bar-style>"])), attribs, pcdata);
}
var startStopDiscontinueTypeToXML = (_k = {},
    _k[StartStopDiscontinue.Start] = "start",
    _k[StartStopDiscontinue.Stop] = "stop",
    _k[StartStopDiscontinue.Discontinue] = "discontinue",
    _k);
function endingToXML(ending) {
    // <!ELEMENT ending (#PCDATA)>
    // <!ATTLIST ending
    //     number CDATA #REQUIRED
    //     type (start | stop | discontinue) #REQUIRED
    //     %print-object;
    //     %print-style;
    //     end-length %tenths; #IMPLIED
    //     text-x %tenths; #IMPLIED
    //     text-y %tenths; #IMPLIED
    // >
    var attribs = "" +
        numberLevelToXML(ending) +
        startStopDiscontinueToXML(ending) +
        printObjectToXML(ending) +
        printStyleToXML(ending);
    if (defined(ending.endLength)) {
        attribs += xml(templateObject_501 || (templateObject_501 = __makeTemplateObject([" end-length=\"", "\""], [" end-length=\"", "\""])), ending.endLength);
    }
    if (defined(ending.textX)) {
        attribs += xml(templateObject_502 || (templateObject_502 = __makeTemplateObject([" text-x=\"", "\""], [" text-x=\"", "\""])), ending.textX);
    }
    if (defined(ending.textY)) {
        attribs += xml(templateObject_503 || (templateObject_503 = __makeTemplateObject([" text-y=\"", "\""], [" text-y=\"", "\""])), ending.textY);
    }
    var pcdata = xml(templateObject_504 || (templateObject_504 = __makeTemplateObject(["", ""], ["", ""])), ending.ending);
    return dangerous(templateObject_505 || (templateObject_505 = __makeTemplateObject(["<ending", ">", "</ending>"], ["<ending", ">", "</ending>"])), attribs, pcdata);
}
var directionTypeBgToXML = (_l = {},
    _l[DirectionTypeBg.Forward] = "forward",
    _l[DirectionTypeBg.Backward] = "backward",
    _l);
var wingedTypeToXML = (_m = {},
    _m[WingedType.None] = "none",
    _m[WingedType.Curved] = "curved",
    _m[WingedType.DoubleCurved] = "double-curved",
    _m[WingedType.Straight] = "straight",
    _m[WingedType.DoubleStraight] = "double-straight",
    _m);
function repeatToXML(repeat) {
    // <!ELEMENT repeat EMPTY>
    // <!ATTLIST repeat
    //     direction (backward | forward) #REQUIRED
    //     times CDATA #IMPLIED
    //     winged (none | straight | curved |
    //         double-straight | double-curved) #IMPLIED
    // >
    var attribs = "" + xml(templateObject_506 || (templateObject_506 = __makeTemplateObject([" direction=\"", "\""], [" direction=\"", "\""])), directionTypeBgToXML[repeat.direction]);
    if (defined(repeat.times)) {
        attribs += xml(templateObject_507 || (templateObject_507 = __makeTemplateObject([" times=\"", "\""], [" times=\"", "\""])), repeat.times);
    }
    if (defined(repeat.winged)) {
        attribs += xml(templateObject_508 || (templateObject_508 = __makeTemplateObject([" winged=\"", "\""], [" winged=\"", "\""])), wingedTypeToXML[repeat.winged]);
    }
    return dangerous(templateObject_509 || (templateObject_509 = __makeTemplateObject(["<repeat", " />"], ["<repeat", " />"])), attribs);
}
function segnoToXML(segno) {
    // <!ELEMENT segno EMPTY>
    // <!ATTLIST segno
    //     %print-style-align;
    // >
    var attribs = "" + printStyleAlignToXML(segno);
    return dangerous(templateObject_510 || (templateObject_510 = __makeTemplateObject(["<segno", " />"], ["<segno", " />"])), attribs);
}
function codaToXML(coda) {
    // <!ELEMENT coda EMPTY>
    // <!ATTLIST coda
    //     %print-style-align;
    // >
    var attribs = "" + printStyleAlignToXML(coda);
    return dangerous(templateObject_511 || (templateObject_511 = __makeTemplateObject(["<coda", " />"], ["<coda", " />"])), attribs);
}
var uprightInvertedToXML = {
    0: "upright",
    1: "inverted",
};
var normalAngledSquareToXML = {
    1: "angled",
    2: "square",
    0: "normal",
};
function fermataToXML(fermata) {
    // <!ELEMENT fermata  (#PCDATA)>
    // <!ATTLIST fermata
    //     type (upright | inverted) #IMPLIED
    //     %print-style;
    // >
    var pcdata = defined(fermata.shape)
        ? normalAngledSquareToXML[fermata.shape]
        : "";
    var attribs = defined(fermata.type)
        ? xml(templateObject_512 || (templateObject_512 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), uprightInvertedToXML[fermata.type]) : "";
    attribs += printStyleToXML(fermata);
    return dangerous(templateObject_513 || (templateObject_513 = __makeTemplateObject(["<fermata", ">", "</fermata>"], ["<fermata", ">", "</fermata>"])), attribs, pcdata);
}
function playToXML(play) {
    // <!ELEMENT play ((ipa | mute | semi-pitched | other-play)*)>
    // <!ATTLIST play
    //     id IDREF #IMPLIED
    // >
    // TODO musicxml-interfaces: missing id
    var children = [];
    if (defined(play.ipa)) {
        children.push(xml(templateObject_514 || (templateObject_514 = __makeTemplateObject(["<ipa>", "</ipa>"], ["<ipa>", "</ipa>"])), play.ipa));
    }
    if (defined(play.mute)) {
        children.push(xml(templateObject_515 || (templateObject_515 = __makeTemplateObject(["<mute>", "</mute>"], ["<mute>", "</mute>"])), play.mute));
    }
    if (defined(play.semiPitched)) {
        children.push(xml(templateObject_516 || (templateObject_516 = __makeTemplateObject(["<semi-pitched>", "</semi-pitched>"], ["<semi-pitched>", "</semi-pitched>"])), play.semiPitched));
    }
    if (defined(play.otherPlay)) {
        var pcdata = xml(templateObject_517 || (templateObject_517 = __makeTemplateObject(["", ""], ["", ""])), play.otherPlay.data);
        var oAttribs = "";
        if (defined(play.otherPlay.type)) {
            oAttribs += xml(templateObject_518 || (templateObject_518 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), play.otherPlay.type);
        }
        children.push(dangerous(templateObject_519 || (templateObject_519 = __makeTemplateObject(["<other-play", ">", "</other-play>"], ["<other-play", ">", "</other-play>"])), oAttribs, pcdata));
    }
    return dangerous(templateObject_520 || (templateObject_520 = __makeTemplateObject(["<play>\n", "\n</play>"], ["<play>\\n", "\\n</play>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function staffLayoutToXML(staffLayout) {
    // <!ELEMENT staff-layout (staff-distance?)>
    // <!ELEMENT staff-distance %layout-tenths;>
    // <!ATTLIST staff-layout
    //     number CDATA #IMPLIED
    // >
    var children = [];
    if (defined(staffLayout.staffDistance)) {
        children.push(xml(templateObject_521 || (templateObject_521 = __makeTemplateObject(["<staff-distance>", "</staff-distance>"], ["<staff-distance>", "</staff-distance>"])), staffLayout.staffDistance));
    }
    var attribs = numberLevelToXML(staffLayout);
    return dangerous(templateObject_522 || (templateObject_522 = __makeTemplateObject(["<staff-layout", ">\n", "\n</staff-layout>"], ["<staff-layout", ">\\n", "\\n</staff-layout>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function measureLayoutToXML(measureLayout) {
    // <!ELEMENT measure-layout (measure-distance?)>
    // <!ELEMENT measure-distance %layout-tenths;>
    var children = [];
    if (defined(measureLayout.measureDistance)) {
        children.push(xml(templateObject_523 || (templateObject_523 = __makeTemplateObject(["<measure-distance>", "</measure-distance>"], ["<measure-distance>", "</measure-distance>"])), measureLayout.measureDistance));
    }
    return dangerous(templateObject_524 || (templateObject_524 = __makeTemplateObject(["<measure-layout>\n", "\n</measure-layout>"], ["<measure-layout>\\n", "\\n</measure-layout>"])), children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function measureNumberingToXML(measureNumbering) {
    // <!ELEMENT measure-numbering (#PCDATA)>
    // <!ATTLIST measure-numbering
    //     %print-style-align;
    // >
    var attribs = printStyleAlignToXML(measureNumbering);
    var pcdata = xml(templateObject_525 || (templateObject_525 = __makeTemplateObject(["", ""], ["", ""])), measureNumbering.data);
    return dangerous(templateObject_526 || (templateObject_526 = __makeTemplateObject(["<measure-numbering", ">", "</measure-numbering>"], ["<measure-numbering", ">", "</measure-numbering>"])), attribs, pcdata);
}
function keyToXML(key) {
    // <!ELEMENT key (((cancel?, fifths, mode?) |
    //     ((key-step, key-alter, key-accidental?)*)), key-octave*)>
    // <!ATTLIST key
    //     number CDATA #IMPLIED
    //     %print-style;
    //     %print-object;
    // >
    var children = [];
    var attribs = "" + numberLevelToXML(key) + printStyleToXML(key) + printObjectToXML(key);
    if (defined(key.cancel)) {
        children.push(cancelToXML(key.cancel));
    }
    if (defined(key.fifths)) {
        // <!ELEMENT fifths (#PCDATA)>
        children.push(xml(templateObject_527 || (templateObject_527 = __makeTemplateObject(["<fifths>", "</fifths>"], ["<fifths>", "</fifths>"])), key.fifths));
    }
    if (defined(key.mode)) {
        // <!ELEMENT mode (#PCDATA)>
        children.push(xml(templateObject_528 || (templateObject_528 = __makeTemplateObject(["<mode>", "</mode>"], ["<mode>", "</mode>"])), key.mode));
    }
    (key.keySteps || []).forEach(function (keyStep, idx) {
        // <!ELEMENT key-step (#PCDATA)>
        // <!ELEMENT key-alter (#PCDATA)>
        // <!ELEMENT key-accidental (#PCDATA)>
        children.push(xml(templateObject_529 || (templateObject_529 = __makeTemplateObject(["<key-step>", "</key-step>"], ["<key-step>", "</key-step>"])), keyStep));
        children.push(xml(templateObject_530 || (templateObject_530 = __makeTemplateObject(["<key-alter>", "</key-alter>"], ["<key-alter>", "</key-alter>"])), key.keyAlters[idx]));
        if (key.keyAccidentals && key.keyAccidentals[idx]) {
            children.push(xml(templateObject_531 || (templateObject_531 = __makeTemplateObject(["<key-accidental>", "</key-accidental>"], ["<key-accidental>", "</key-accidental>"])), key.keyAccidentals[idx]));
        }
    });
    (key.keyOctaves || []).forEach(function (keyOctave) {
        children.push(keyOctaveToXML(keyOctave));
    });
    return dangerous(templateObject_532 || (templateObject_532 = __makeTemplateObject(["<key", ">\n", "\n</key>"], ["<key", ">\\n", "\\n</key>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var cancelLocationToXML = {
    1: "right",
    2: "before-barline",
    0: "left",
};
function cancelToXML(cancel) {
    // <!ELEMENT cancel (#PCDATA)>
    // <!ATTLIST cancel
    //     location (left | right | before-barline) #IMPLIED
    // >
    var attribs = "";
    var pcdata = xml(templateObject_533 || (templateObject_533 = __makeTemplateObject(["", ""], ["", ""])), cancel.fifths);
    if (defined(cancel.location)) {
        attribs += xml(templateObject_534 || (templateObject_534 = __makeTemplateObject([" location=\"", "\""], [" location=\"", "\""])), cancelLocationToXML[cancel.location]);
    }
    return dangerous(templateObject_535 || (templateObject_535 = __makeTemplateObject(["<cancel", ">", "</cancel>"], ["<cancel", ">", "</cancel>"])), attribs, pcdata);
}
function keyOctaveToXML(keyOctave) {
    // <!ELEMENT key-octave (#PCDATA)>
    // <!ATTLIST key-octave
    //     number NMTOKEN #REQUIRED
    //     cancel %yes-no; #IMPLIED
    // >
    var attribs = numberLevelToXML(keyOctave);
    var pcdata = xml(templateObject_536 || (templateObject_536 = __makeTemplateObject(["", ""], ["", ""])), keyOctave.octave);
    if (defined(keyOctave.cancel)) {
        attribs += yesNo(templateObject_537 || (templateObject_537 = __makeTemplateObject([" cancel=\"", "\""], [" cancel=\"", "\""])), keyOctave.cancel);
    }
    return dangerous(templateObject_538 || (templateObject_538 = __makeTemplateObject(["<key-octave", ">", "</key-octave>"], ["<key-octave", ">", "</key-octave>"])), attribs, pcdata);
}
function timeToXML(time) {
    // <!ELEMENT time
    //     (((beats, beat-type)+, interchangeable?) | senza-misura)>
    // <!ATTLIST time
    //     number CDATA #IMPLIED
    //     %time-symbol;
    //     %time-separator;
    //     %print-style-align;
    //     %print-object;
    // >
    var attribs = "" +
        numberLevelToXML(time) +
        timeSymbolToXML(time) +
        timeSeparatorToXML(time) +
        printStyleAlignToXML(time) +
        printObjectToXML(time);
    var children = [];
    if (time.senzaMisura != null) {
        // <!ELEMENT senza-misura (#PCDATA)>
        // TODO musicxml-interfaces: PCDATA?
        children.push(xml(templateObject_539 || (templateObject_539 = __makeTemplateObject(["<senza-misura />"], ["<senza-misura />"]))));
    }
    else {
        // TODO musicxml-interfaces: check this
        (time.beats || []).forEach(function (beats, idx) {
            // <!ELEMENT beats (#PCDATA)>
            // <!ELEMENT beat-type (#PCDATA)>
            children.push(xml(templateObject_540 || (templateObject_540 = __makeTemplateObject(["<beats>", "</beats>"], ["<beats>", "</beats>"])), beats));
            children.push(xml(templateObject_541 || (templateObject_541 = __makeTemplateObject(["<beat-type>", "</beat-type>"], ["<beat-type>", "</beat-type>"])), time.beatTypes[idx]));
        });
        if (defined(time.interchangeable)) {
            children.push(interchangeableToXML(time.interchangeable));
        }
    }
    return dangerous(templateObject_542 || (templateObject_542 = __makeTemplateObject(["<time", ">\n", "\n</time>"], ["<time", ">\\n", "\\n</time>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var timeSymbolTypeToXML = {
    4: "dotted-note",
    1: "cut",
    2: "single-number",
    3: "note",
    0: "common",
    5: "normal",
};
function timeSymbolToXML(timeSymbol) {
    // <!ENTITY % time-symbol
    //     "symbol (common | cut | single-number |
    //              note | dotted-note | normal) #IMPLIED">
    if (defined(timeSymbol.symbol)) {
        return xml(templateObject_543 || (templateObject_543 = __makeTemplateObject([" symbol=\"", "\""], [" symbol=\"", "\""])), timeSymbolTypeToXML[timeSymbol.symbol]);
    }
    return "";
}
var separatorTypeToXML = {
    0: "none",
    1: "horizontal",
    2: "diagonal",
    3: "vertical",
    4: "adjacent",
};
function timeSeparatorToXML(timeSeparator) {
    // <!ENTITY % time-separator
    //     "separator (none | horizontal | diagonal |
    //         vertical | adjacent) #IMPLIED">
    if (defined(timeSeparator.separator)) {
        return xml(templateObject_544 || (templateObject_544 = __makeTemplateObject([" separator=\"", "\""], [" separator=\"", "\""])), separatorTypeToXML[timeSeparator.separator]);
    }
    return "";
}
function interchangeableToXML(interchangeable) {
    // <!ELEMENT interchangeable (time-relation?, (beats, beat-type)+)>
    // <!ATTLIST interchangeable
    //     %time-symbol;
    //     %time-separator;
    // >
    var attribs = "" + timeSymbolToXML(interchangeable) + timeSeparatorToXML(interchangeable);
    var children = [];
    (interchangeable.beats || []).forEach(function (beats, idx) {
        // <!ELEMENT beats (#PCDATA)>
        // <!ELEMENT beat-type (#PCDATA)>
        children.push(xml(templateObject_545 || (templateObject_545 = __makeTemplateObject(["<beats>", "</beats>"], ["<beats>", "</beats>"])), beats));
        children.push(xml(templateObject_546 || (templateObject_546 = __makeTemplateObject(["<beat-type>", "</beat-type>"], ["<beat-type>", "</beat-type>"])), interchangeable.beatTypes[idx]));
    });
    if (defined(interchangeable.timeRelation)) {
        // <!ELEMENT time-relation (#PCDATA)>
        children.push(xml(templateObject_547 || (templateObject_547 = __makeTemplateObject(["<time-relation>", "</time-relation>"], ["<time-relation>", "</time-relation>"])), interchangeable.timeRelation));
    }
    return dangerous(templateObject_548 || (templateObject_548 = __makeTemplateObject(["<interchangeable", ">\n", "\n</interchangeable>"], ["<interchangeable", ">\\n", "\\n</interchangeable>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
var partSymbolTypeToXML = {
    0: "none",
    2: "line",
    3: "bracket",
    4: "square",
    1: "brace",
};
function partSymbolToXML(partSymbol) {
    // <!ELEMENT part-symbol (#PCDATA)>
    // <!ATTLIST part-symbol
    //     top-staff CDATA #IMPLIED
    //     bottom-staff CDATA #IMPLIED
    //     %position;
    //     %color;
    // >
    var pcdata = "";
    if (defined(partSymbol.type)) {
        pcdata = xml(templateObject_549 || (templateObject_549 = __makeTemplateObject(["", ""], ["", ""])), partSymbolTypeToXML[partSymbol.type]);
    }
    var attribs = "";
    if (defined(partSymbol.topStaff)) {
        attribs += xml(templateObject_550 || (templateObject_550 = __makeTemplateObject([" top-staff=\"", "\""], [" top-staff=\"", "\""])), partSymbol.topStaff);
    }
    if (defined(partSymbol.bottomStaff)) {
        attribs += xml(templateObject_551 || (templateObject_551 = __makeTemplateObject([" bottom-staff=\"", "\""], [" bottom-staff=\"", "\""])), partSymbol.bottomStaff);
    }
    attribs += positionToXML(partSymbol) + colorToXML(partSymbol);
    return dangerous(templateObject_552 || (templateObject_552 = __makeTemplateObject(["<part-symbol", ">", "</part-symbol>"], ["<part-symbol", ">", "</part-symbol>"])), attribs, pcdata);
}
var symbolSizeToXML = {
    1: "full",
    2: "cue",
    3: "large",
};
function clefToXML(clef) {
    // <!ELEMENT clef (sign, line?, clef-octave-change?)>
    // <!ATTLIST clef
    //     number CDATA #IMPLIED
    //     additional %yes-no; #IMPLIED
    //     size %symbol-size; #IMPLIED
    //     after-barline %yes-no; #IMPLIED
    //     %print-style;
    //     %print-object;
    // >
    var attribs = "" + numberLevelToXML(clef);
    var children = [];
    if (defined(clef.additional)) {
        attribs += yesNo(templateObject_553 || (templateObject_553 = __makeTemplateObject([" additional=\"", "\""], [" additional=\"", "\""])), clef.additional);
    }
    if (clef.size >= SymbolSize.Unspecified) {
        attribs += xml(templateObject_554 || (templateObject_554 = __makeTemplateObject([" size=\"", "\""], [" size=\"", "\""])), symbolSizeToXML[clef.size]);
    }
    if (defined(clef.afterBarline)) {
        attribs += yesNo(templateObject_555 || (templateObject_555 = __makeTemplateObject([" after-barline=\"", "\""], [" after-barline=\"", "\""])), clef.afterBarline);
    }
    attribs += printStyleToXML(clef) + printObjectToXML(clef);
    if (defined(clef.sign)) {
        // <!ELEMENT sign (#PCDATA)>
        children.push(xml(templateObject_556 || (templateObject_556 = __makeTemplateObject(["<sign>", "</sign>"], ["<sign>", "</sign>"])), clef.sign));
    }
    if (defined(clef.line)) {
        // <!ELEMENT line (#PCDATA)>
        children.push(xml(templateObject_557 || (templateObject_557 = __makeTemplateObject(["<line>", "</line>"], ["<line>", "</line>"])), clef.line));
    }
    if (defined(clef.clefOctaveChange)) {
        // <!ELEMENT clef-octave-change (#PCDATA)>
        children.push(xml(templateObject_558 || (templateObject_558 = __makeTemplateObject(["<clef-octave-change>", "</clef-octave-change>"], ["<clef-octave-change>", "</clef-octave-change>"])), clef.clefOctaveChange));
    }
    return dangerous(templateObject_559 || (templateObject_559 = __makeTemplateObject(["<clef", ">\n", "\n</clef>"], ["<clef", ">\\n", "\\n</clef>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function staffDetailsToXML(staffDetails) {
    // <!ELEMENT staff-details (staff-type?, staff-lines?,
    //     staff-tuning*, capo?, staff-size?)>
    // <!ATTLIST staff-details
    //     number         CDATA                #IMPLIED
    //     show-frets     (numbers | letters)  #IMPLIED
    //     %print-object;
    //     %print-spacing;
    // >
    var attribs = "";
    var children = [];
    attribs += numberLevelToXML(staffDetails);
    // TODO: musicxml-interfaces show__FRETS__
    attribs += printObjectToXML(staffDetails);
    attribs += printSpacingToXML(staffDetails);
    if (defined(staffDetails.staffType)) {
        // <!ELEMENT staff-type (#PCDATA)>
        children.push(xml(templateObject_560 || (templateObject_560 = __makeTemplateObject(["<staff-type>", "</staff-type>"], ["<staff-type>", "</staff-type>"])), staffDetails.staffType));
    }
    if (defined(staffDetails.staffLines)) {
        // <!ELEMENT staff-lines (#PCDATA)>
        children.push(xml(templateObject_561 || (templateObject_561 = __makeTemplateObject(["<staff-lines>", "</staff-lines>"], ["<staff-lines>", "</staff-lines>"])), staffDetails.staffLines));
    }
    (staffDetails.staffTunings || []).forEach(function (tuning) {
        children.push(staffTuningToXML(tuning));
    });
    if (defined(staffDetails.capo)) {
        // <!ELEMENT capo (#PCDATA)>
        children.push(xml(templateObject_562 || (templateObject_562 = __makeTemplateObject(["<capo>", "</capo>"], ["<capo>", "</capo>"])), staffDetails.capo));
    }
    if (defined(staffDetails.staffSize)) {
        // <!ELEMENT staff-size (#PCDATA)>
        children.push(xml(templateObject_563 || (templateObject_563 = __makeTemplateObject(["<staff-size>", "</staff-size>"], ["<staff-size>", "</staff-size>"])), staffDetails.staffSize));
    }
    return dangerous(templateObject_564 || (templateObject_564 = __makeTemplateObject(["<staff-details", ">\n", "\n</staff-details>"], ["<staff-details", ">\\n", "\\n</staff-details>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function staffTuningToXML(staffTuning) {
    // <!ELEMENT staff-tuning
    //     (tuning-step, tuning-alter?, tuning-octave)>
    // <!ATTLIST staff-tuning
    //     line CDATA #REQUIRED
    var children = [];
    var attribs = "";
    if (defined(staffTuning.line)) {
        attribs += xml(templateObject_565 || (templateObject_565 = __makeTemplateObject([" line=\"", "\""], [" line=\"", "\""])), staffTuning.line);
    }
    children = children.concat(tuningStepAlterOctaveToXML(staffTuning));
    return dangerous(templateObject_566 || (templateObject_566 = __makeTemplateObject(["<staff-tuning", ">\n", "\n</staff-tuning>"], ["<staff-tuning", ">\\n", "\\n</staff-tuning>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function tuningStepAlterOctaveToXML(tuning) {
    var children = [];
    if (defined(tuning.tuningStep)) {
        // <!ELEMENT tuning-step (#PCDATA)>
        children.push(xml(templateObject_567 || (templateObject_567 = __makeTemplateObject(["<tuning-step>", "</tuning-step>"], ["<tuning-step>", "</tuning-step>"])), tuning.tuningStep));
    }
    if (defined(tuning.tuningAlter)) {
        // <!ELEMENT tuning-alter (#PCDATA)>
        children.push(xml(templateObject_568 || (templateObject_568 = __makeTemplateObject(["<tuning-alter>", "</tuning-alter>"], ["<tuning-alter>", "</tuning-alter>"])), tuning.tuningAlter));
    }
    if (defined(tuning.tuningOctave)) {
        // <!ELEMENT tuning-octave (#PCDATA)>
        children.push(xml(templateObject_569 || (templateObject_569 = __makeTemplateObject(["<tuning-octave>", "</tuning-octave>"], ["<tuning-octave>", "</tuning-octave>"])), tuning.tuningOctave));
    }
    return children;
}
function transposeToXML(transpose) {
    // <!ELEMENT transpose
    //     (diatonic?, chromatic, octave-change?, double?)>
    // <!ATTLIST transpose
    //     number CDATA #IMPLIED
    // >
    var children = [];
    var attribs = numberLevelToXML(transpose);
    if (defined(transpose.diatonic)) {
        // <!ELEMENT diatonic (#PCDATA)>
        children.push(xml(templateObject_570 || (templateObject_570 = __makeTemplateObject(["<diatonic>", "</diatonic>"], ["<diatonic>", "</diatonic>"])), transpose.diatonic));
    }
    if (defined(transpose.chromatic)) {
        // <!ELEMENT chromatic (#PCDATA)>
        children.push(xml(templateObject_571 || (templateObject_571 = __makeTemplateObject(["<chromatic>", "</chromatic>"], ["<chromatic>", "</chromatic>"])), transpose.chromatic));
    }
    if (defined(transpose.octaveChange)) {
        // <!ELEMENT octave-change (#PCDATA)>
        children.push(xml(templateObject_572 || (templateObject_572 = __makeTemplateObject(["<octave-change>", "</octave-change>"], ["<octave-change>", "</octave-change>"])), transpose.octaveChange));
    }
    if (defined(transpose.double)) {
        // <!ELEMENT double EMPTY>
        children.push(xml(templateObject_573 || (templateObject_573 = __makeTemplateObject(["<double />"], ["<double />"]))));
    }
    return dangerous(templateObject_574 || (templateObject_574 = __makeTemplateObject(["<transpose", ">\n", "\n</transpose>"], ["<transpose", ">\\n", "\\n</transpose>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function directiveToXML(directive) {
    // <!ELEMENT directive (#PCDATA)>
    // <!ATTLIST directive
    //     %print-style;
    //     xml:lang NMTOKEN #IMPLIED
    // >
    var pcdata = xml(templateObject_575 || (templateObject_575 = __makeTemplateObject(["", ""], ["", ""])), directive.data);
    var attribs = printStyleToXML(directive); // TODO musicxml-interfaces xml:lang
    return dangerous(templateObject_576 || (templateObject_576 = __makeTemplateObject(["<directive", ">", "</directive>"], ["<directive", ">", "</directive>"])), attribs, pcdata);
}
function measureStyleToXML(measureStyle) {
    // <!ELEMENT measure-style (multiple-rest |
    //     measure-repeat | beat-repeat | slash)>
    // <!ATTLIST measure-style
    //     number CDATA #IMPLIED
    //     %font;
    //     %color;
    // >
    var children = [];
    var attribs = "" +
        numberLevelToXML(measureStyle) +
        fontToXML(measureStyle) +
        colorToXML(measureStyle);
    // TODO: Make one at a time!!
    if (defined(measureStyle.multipleRest)) {
        children.push(multipleRestToXML(measureStyle.multipleRest));
    }
    if (defined(measureStyle.measureRepeat)) {
        children.push(measureRepeatToXML(measureStyle.measureRepeat));
    }
    if (defined(measureStyle.beatRepeat)) {
        children.push(beatRepeatToXML(measureStyle.beatRepeat));
    }
    if (defined(measureStyle.slash)) {
        children.push(slashElToXML(measureStyle.slash));
    }
    return dangerous(templateObject_577 || (templateObject_577 = __makeTemplateObject(["<measure-style", ">\n", "\n</measure-style>"], ["<measure-style", ">\\n", "\\n</measure-style>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function multipleRestToXML(multipleRest) {
    // <!ELEMENT multiple-rest (#PCDATA)>
    // <!ATTLIST multiple-rest
    //     use-symbols %yes-no; #IMPLIED
    // >
    var attribs = "";
    var pcdata = xml(templateObject_578 || (templateObject_578 = __makeTemplateObject(["", ""], ["", ""])), multipleRest.count);
    if (defined(multipleRest.useSymbols)) {
        attribs += yesNo(templateObject_579 || (templateObject_579 = __makeTemplateObject([" use-symbols=\"", "\""], [" use-symbols=\"", "\""])), multipleRest.useSymbols);
    }
    return dangerous(templateObject_580 || (templateObject_580 = __makeTemplateObject(["<multiple-rest", ">", "</multiple-rest>"], ["<multiple-rest", ">", "</multiple-rest>"])), attribs, pcdata);
}
function measureRepeatToXML(measureRepeat) {
    // <!ELEMENT measure-repeat (#PCDATA)>
    // <!ATTLIST measure-repeat
    //     type %start-stop; #REQUIRED
    //     slashes NMTOKEN #IMPLIED
    // >
    var attribs = "";
    var pcdata = xml(templateObject_581 || (templateObject_581 = __makeTemplateObject(["", ""], ["", ""])), measureRepeat.data || "");
    attribs += startStopToXML(measureRepeat);
    // TODO: musicxml-interfaces: slashed -> slashes
    return dangerous(templateObject_582 || (templateObject_582 = __makeTemplateObject(["<measure-repeat", ">", "</measure-repeat>"], ["<measure-repeat", ">", "</measure-repeat>"])), attribs, pcdata);
}
function beatRepeatToXML(beatRepeat) {
    // <!ELEMENT beat-repeat ((slash-type, slash-dot*)?)>
    // <!ATTLIST beat-repeat
    //     type %start-stop; #REQUIRED
    //     slashes NMTOKEN #IMPLIED
    //     use-dots %yes-no; #IMPLIED
    // >
    // <!ELEMENT slash-type (#PCDATA)>
    var children = [];
    var attribs = "" + startStopToXML(beatRepeat);
    // TODO: musicxml-interfaces: slases -> slashes
    if (defined(beatRepeat.useDots)) {
        attribs += yesNo(templateObject_583 || (templateObject_583 = __makeTemplateObject([" use-dots=\"", "\""], [" use-dots=\"", "\""])), beatRepeat.useDots);
    }
    if (defined(beatRepeat.slashType)) {
        children.push(xml(templateObject_584 || (templateObject_584 = __makeTemplateObject(["<slash-type>", "</slash-type>"], ["<slash-type>", "</slash-type>"])), beatRepeat.slashType));
    }
    (beatRepeat.slashDots || []).forEach(function (dot) {
        // <!ELEMENT slash-dot EMPTY>
        children.push(xml(templateObject_585 || (templateObject_585 = __makeTemplateObject(["<slash-dot />"], ["<slash-dot />"]))));
    });
    return dangerous(templateObject_586 || (templateObject_586 = __makeTemplateObject(["<beat-repeat", ">\n", "\n</beat-repeat>"], ["<beat-repeat", ">\\n", "\\n</beat-repeat>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function slashElToXML(slash) {
    // <!ELEMENT slash ((slash-type, slash-dot*)?)>
    // <!ATTLIST slash
    //     type %start-stop; #REQUIRED
    //     use-dots %yes-no; #IMPLIED
    //     use-stems %yes-no; #IMPLIED
    // >
    var attribs = startStopToXML(slash);
    if (defined(slash.useDots)) {
        attribs += yesNo(templateObject_587 || (templateObject_587 = __makeTemplateObject([" use-dots=\"", "\""], [" use-dots=\"", "\""])), slash.useDots);
    }
    if (defined(slash.useStems)) {
        attribs += yesNo(templateObject_588 || (templateObject_588 = __makeTemplateObject([" use-stems=\"", "\""], [" use-stems=\"", "\""])), slash.useStems);
    }
    var children = [];
    if (defined(slash.slashType)) {
        children.push(xml(templateObject_589 || (templateObject_589 = __makeTemplateObject(["<slash-type>", "</slash-type>"], ["<slash-type>", "</slash-type>"])), slash.slashType));
    }
    (slash.slashDots || []).forEach(function (dot) {
        // <!ELEMENT slash-dot EMPTY>
        children.push(xml(templateObject_590 || (templateObject_590 = __makeTemplateObject(["<slash-dot />"], ["<slash-dot />"]))));
    });
    return dangerous(templateObject_591 || (templateObject_591 = __makeTemplateObject(["<slash", ">\n", "\n</slash>"], ["<slash", ">\\n", "\\n</slash>"])), attribs, children
        .join("\n")
        .split("\n")
        .map(function (n) { return "  " + n; })
        .join("\n"));
}
function printStyleToXML(printStyle) {
    // <!ENTITY % print-style
    //     "%position;
    //      %font;
    //      %color;">
    return (positionToXML(printStyle) + fontToXML(printStyle) + colorToXML(printStyle));
}
function printoutToXML(printout) {
    // <!ENTITY % printout
    //     "%print-object;
    //      print-dot     %yes-no;  #IMPLIED
    //      %print-spacing;
    //      print-lyric   %yes-no;  #IMPLIED">
    var attribs = printObjectToXML(printout);
    if (defined(printout.printDot)) {
        attribs += yesNo(templateObject_592 || (templateObject_592 = __makeTemplateObject([" print-dot=\"", "\""], [" print-dot=\"", "\""])), printout.printDot);
    }
    attribs += printSpacingToXML(printout);
    if (defined(printout.printLyric)) {
        attribs += yesNo(templateObject_593 || (templateObject_593 = __makeTemplateObject([" print-lyric=\"", "\""], [" print-lyric=\"", "\""])), printout.printLyric);
    }
    return attribs;
}
function timeOnlyToXML(timeOnly) {
    // <!ENTITY % time-only
    //     "time-only CDATA #IMPLIED">
    if (defined(timeOnly.timeOnly)) {
        return xml(templateObject_594 || (templateObject_594 = __makeTemplateObject([" time-only=\"", "\""], [" time-only=\"", "\""])), timeOnly.timeOnly);
    }
    return "";
}
function editorialToXML(editorial) {
    // <!ENTITY % editorial "(footnote?, level?)">
    // <!ELEMENT footnote (#PCDATA)>
    // <!ATTLIST footnote
    //     %text-formatting;
    // >
    // <!ELEMENT level (#PCDATA)>
    // <!ATTLIST level
    //    reference %yes-no; #IMPLIED
    //    %level-display;
    // >
    // <!ELEMENT voice (#PCDATA)>
    var elements = [];
    if (defined(editorial.footnote) && !!editorial.footnote.text) {
        var footnoteEscaped = xml(templateObject_595 || (templateObject_595 = __makeTemplateObject(["", ""], ["", ""])), editorial.footnote.text);
        elements.push(dangerous(templateObject_596 || (templateObject_596 = __makeTemplateObject(["<footnote", ">\n            ", "</footnote>"], ["<footnote", ">\n            ", "</footnote>"])), textFormattingToXML(editorial.footnote), footnoteEscaped));
    }
    if (defined(editorial.level) && !!editorial.level.text) {
        var levelEscaped = xml(templateObject_597 || (templateObject_597 = __makeTemplateObject(["", ""], ["", ""])), editorial.level.text);
        var attribs = "";
        if (defined(editorial.level.reference)) {
            attribs += yesNo(templateObject_598 || (templateObject_598 = __makeTemplateObject([" reference=\"", "\""], [" reference=\"", "\""])), editorial.level.reference);
        }
        attribs += levelDisplayToXML(editorial.level);
        elements.push(dangerous(templateObject_599 || (templateObject_599 = __makeTemplateObject(["<level", ">", "</level>"], ["<level", ">", "</level>"])), attribs, levelEscaped));
    }
    return elements;
}
function editorialVoiceToXML(editorial) {
    // <!ENTITY % editorial-voice "(footnote?, level?, voice?)">
    // <!ELEMENT footnote (#PCDATA)>
    // <!ATTLIST footnote
    //     %text-formatting;
    // >
    // <!ELEMENT level (#PCDATA)>
    // <!ATTLIST level
    //    reference %yes-no; #IMPLIED
    //    %level-display;
    // >
    var elements = editorialToXML(editorial);
    // <!ELEMENT voice (#PCDATA)>
    if (defined(editorial.voice)) {
        elements.push(xml(templateObject_600 || (templateObject_600 = __makeTemplateObject(["<voice>", "</voice>"], ["<voice>", "</voice>"])), editorial.voice));
    }
    return elements;
}
var solidDashedDottedWavyToXML = {
    1: "dashed",
    2: "dotted",
    3: "wavy",
    0: "solid",
};
function lineTypeToXML(lineType) {
    // <!ENTITY % line-type
    //     "line-type (solid | dashed | dotted | wavy) #IMPLIED">
    if (defined(lineType.lineType)) {
        return xml(templateObject_601 || (templateObject_601 = __makeTemplateObject([" line-type=\"", "\""], [" line-type=\"", "\""])), solidDashedDottedWavyToXML[lineType.lineType]);
    }
    return "";
}
function startStopToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return xml(templateObject_602 || (templateObject_602 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), startStop.type === StartStop.Start ? "start" : "stop");
    }
    return "";
}
function startStopDiscontinueToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return xml(templateObject_603 || (templateObject_603 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), startStopDiscontinueTypeToXML[startStop.type]);
    }
    return "";
}
function numberLevelToXML(numberLevel) {
    if (defined(numberLevel.number)) {
        return xml(templateObject_604 || (templateObject_604 = __makeTemplateObject([" number=\"", "\""], [" number=\"", "\""])), numberLevel.number);
    }
    return "";
}
var startStopContinueSingleToXML = {
    0: "start",
    1: "stop",
    2: "continue",
    3: "single",
};
function startStopContinueToXML(startStopContinue) {
    // <!ENTITY % start-stop-continue "(start | stop | continue)">
    if (defined(startStopContinue.type)) {
        return xml(templateObject_605 || (templateObject_605 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), startStopContinueSingleToXML[startStopContinue.type]);
    }
    return "";
}
function nameToXML(name) {
    if (defined(name.name)) {
        return xml(templateObject_606 || (templateObject_606 = __makeTemplateObject([" name=\"", "\""], [" name=\"", "\""])), name.name);
    }
    return "";
}
function startStopSingleToXML(startStopSingle) {
    // <!ENTITY % start-stop-single "(start | stop | single)">
    if (defined(startStopSingle.type)) {
        return xml(templateObject_607 || (templateObject_607 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), startStopContinueSingleToXML[startStopSingle.type]);
    }
    return "";
}
function dashedFormattingToXML(dashedFormatting) {
    // <!ENTITY % dashed-formatting
    //     "dash-length   %tenths;  #IMPLIED
    //      space-length  %tenths;  #IMPLIED">
    var attribs = "";
    if (defined(dashedFormatting.dashLength)) {
        attribs += xml(templateObject_608 || (templateObject_608 = __makeTemplateObject([" dash-length=\"", "\""], [" dash-length=\"", "\""])), dashedFormatting.dashLength);
    }
    if (defined(dashedFormatting.spaceLength)) {
        attribs += xml(templateObject_609 || (templateObject_609 = __makeTemplateObject([" space-length=\"", "\""], [" space-length=\"", "\""])), dashedFormatting.spaceLength);
    }
    return attribs;
}
var straightCurvedToXML = {
    1: "curved",
    0: "straight",
};
function lineShapeToXML(lineShape) {
    if (defined(lineShape.lineShape)) {
        return xml(templateObject_610 || (templateObject_610 = __makeTemplateObject([" line-shape=\"", "\""], [" line-shape=\"", "\""])), straightCurvedToXML[lineShape.lineShape]);
    }
    return "";
}
function positionToXML(pos) {
    // <!ENTITY % position
    //     "default-x     %tenths;    #IMPLIED
    //      default-y     %tenths;    #IMPLIED
    //      relative-x    %tenths;    #IMPLIED
    //      relative-y    %tenths;    #IMPLIED">
    var attribs = "";
    if (defined(pos.defaultX)) {
        attribs += xml(templateObject_611 || (templateObject_611 = __makeTemplateObject([" default-x=\"", "\""], [" default-x=\"", "\""])), pos.defaultX);
    }
    if (defined(pos.defaultY)) {
        attribs += xml(templateObject_612 || (templateObject_612 = __makeTemplateObject([" default-y=\"", "\""], [" default-y=\"", "\""])), pos.defaultY);
    }
    if (defined(pos.relativeX)) {
        attribs += xml(templateObject_613 || (templateObject_613 = __makeTemplateObject([" relative-x=\"", "\""], [" relative-x=\"", "\""])), pos.relativeX);
    }
    if (defined(pos.relativeY)) {
        attribs += xml(templateObject_614 || (templateObject_614 = __makeTemplateObject([" relative-y=\"", "\""], [" relative-y=\"", "\""])), pos.relativeY);
    }
    return attribs;
}
function placementToXML(placement) {
    // <!ENTITY % placement
    //     "placement %above-below; #IMPLIED">
    if (placement.placement > AboveBelow.Unspecified) {
        return xml(templateObject_615 || (templateObject_615 = __makeTemplateObject([" placement=\"", "\""], [" placement=\"", "\""])), placement.placement === AboveBelow.Above ? "above" : "below");
    }
    return "";
}
function orientationToXML(orientation) {
    // <!ENTITY % orientation
    //     "orientation (over | under) #IMPLIED">
    if (orientation.orientation > OverUnder.Unspecified) {
        return xml(templateObject_616 || (templateObject_616 = __makeTemplateObject([" orientation=\"", "\""], [" orientation=\"", "\""])), orientation.orientation === OverUnder.Over ? "over" : "under");
    }
    return "";
}
function bezierToXML(bezier) {
    // <!ENTITY % bezier
    //     "bezier-offset  CDATA     #IMPLIED
    //      bezier-offset2 CDATA     #IMPLIED
    //      bezier-x       %tenths;  #IMPLIED
    //      bezier-y       %tenths;  #IMPLIED
    //      bezier-x2      %tenths;  #IMPLIED
    //      bezier-y2      %tenths;  #IMPLIED">
    var attribs = "";
    if (defined(bezier.bezierOffset)) {
        attribs += xml(templateObject_617 || (templateObject_617 = __makeTemplateObject([" bezier-offset=\"", "\""], [" bezier-offset=\"", "\""])), bezier.bezierOffset);
    }
    if (defined(bezier.bezierOffset2)) {
        attribs += xml(templateObject_618 || (templateObject_618 = __makeTemplateObject([" bezier-offset2=\"", "\""], [" bezier-offset2=\"", "\""])), bezier.bezierOffset2);
    }
    if (defined(bezier.bezierX)) {
        attribs += xml(templateObject_619 || (templateObject_619 = __makeTemplateObject([" bezier-x=\"", "\""], [" bezier-x=\"", "\""])), bezier.bezierX);
    }
    if (defined(bezier.bezierY)) {
        attribs += xml(templateObject_620 || (templateObject_620 = __makeTemplateObject([" bezier-y=\"", "\""], [" bezier-y=\"", "\""])), bezier.bezierY);
    }
    if (defined(bezier.bezierX2)) {
        attribs += xml(templateObject_621 || (templateObject_621 = __makeTemplateObject([" bezier-x2=\"", "\""], [" bezier-x2=\"", "\""])), bezier.bezierX2);
    }
    if (defined(bezier.bezierY2)) {
        attribs += xml(templateObject_622 || (templateObject_622 = __makeTemplateObject([" bezier-y2=\"", "\""], [" bezier-y2=\"", "\""])), bezier.bezierY2);
    }
    return attribs;
}
function fontToXML(font) {
    // <!ENTITY % font
    //     "font-family  CDATA  #IMPLIED
    //      font-style   CDATA  #IMPLIED
    //      font-size    CDATA  #IMPLIED
    //      font-weight  CDATA  #IMPLIED">
    var attribs = "";
    if (defined(font.fontFamily)) {
        attribs += xml(templateObject_623 || (templateObject_623 = __makeTemplateObject([" font-family=\"", "\""], [" font-family=\"", "\""])), font.fontFamily);
    }
    if (defined(font.fontStyle)) {
        attribs += xml(templateObject_624 || (templateObject_624 = __makeTemplateObject([" font-style=\"", "\""], [" font-style=\"", "\""])), font.fontStyle === NormalItalic.Italic ? "italic" : "normal");
    }
    if (defined(font.fontSize)) {
        attribs += xml(templateObject_625 || (templateObject_625 = __makeTemplateObject([" font-size=\"", "\""], [" font-size=\"", "\""])), font.fontSize);
    }
    if (defined(font.fontWeight)) {
        attribs += xml(templateObject_626 || (templateObject_626 = __makeTemplateObject([" font-weight=\"", "\""], [" font-weight=\"", "\""])), font.fontWeight === NormalBold.Bold ? "bold" : "normal");
    }
    return attribs;
}
function printObjectToXML(printObject) {
    // <!ENTITY % print-object
    //     "print-object  %yes-no;  #IMPLIED">
    if (defined(printObject.printObject)) {
        return yesNo(templateObject_627 || (templateObject_627 = __makeTemplateObject([" print-object=\"", "\""], [" print-object=\"", "\""])), printObject.printObject);
    }
    return "";
}
function printSpacingToXML(printSpacing) {
    // <!ENTITY % print-spacing
    //     "print-spacing %yes-no;  #IMPLIED">
    if (defined(printSpacing.printSpacing)) {
        return yesNo(templateObject_628 || (templateObject_628 = __makeTemplateObject([" print-spacing=\"", "\""], [" print-spacing=\"", "\""])), printSpacing.printSpacing);
    }
    return "";
}
function textFormattingToXML(textFormatting) {
    // <!ENTITY % text-formatting
    //     "%justify;
    //      %print-style-align;
    //      %text-decoration;
    //      %text-rotation;
    //      %letter-spacing;
    //      %line-height;
    //      xml:lang NMTOKEN #IMPLIED TODO musicxml-interfaces
    //      xml:space (default | preserve) #IMPLIED TODO musicxml-interfaces
    //      %text-direction;
    //      %enclosure;">
    return ("" +
        justifyToXML(textFormatting) +
        printStyleAlignToXML(textFormatting) +
        textDecorationToXML(textFormatting) +
        textRotationToXML(textFormatting) +
        letterSpacingToXML(textFormatting) +
        lineHeightToXML(textFormatting) +
        textDirectionToXML(textFormatting) +
        enclosureToXML(textFormatting));
}
var leftCenterRightToXML = {
    1: "right",
    2: "center",
    0: "left",
};
function justifyToXML(justify) {
    if (defined(justify.justify)) {
        return xml(templateObject_629 || (templateObject_629 = __makeTemplateObject([" justify=\"", "\""], [" justify=\"", "\""])), leftCenterRightToXML[justify.justify]);
    }
    return "";
}
function halignToXML(halign) {
    if (defined(halign.halign)) {
        return xml(templateObject_630 || (templateObject_630 = __makeTemplateObject([" halign=\"", "\""], [" halign=\"", "\""])), leftCenterRightToXML[halign.halign]);
    }
    return "";
}
function valignToXML(valign) {
    if (defined(valign.valign)) {
        return xml(templateObject_631 || (templateObject_631 = __makeTemplateObject([" valign=\"", "\""], [" valign=\"", "\""])), topMiddleBottomBaselineToXML[valign.valign]);
    }
    return "";
}
function printStyleAlignToXML(printStyleAlign) {
    return ("" +
        printStyleToXML(printStyleAlign) +
        halignToXML(printStyleAlign) +
        valignToXML(printStyleAlign));
}
function textDecorationToXML(textDecoration) {
    // <!ENTITY % text-decoration
    //     "underline  %number-of-lines;  #IMPLIED
    //      overline  %number-of-lines;   #IMPLIED
    //      line-through  %number-of-lines;   #IMPLIED">
    var attribs = "";
    if (defined(textDecoration.underline)) {
        attribs += xml(templateObject_632 || (templateObject_632 = __makeTemplateObject([" underline=\"", "\""], [" underline=\"", "\""])), textDecoration.underline);
    }
    if (defined(textDecoration.overline)) {
        attribs += xml(templateObject_633 || (templateObject_633 = __makeTemplateObject([" overline=\"", "\""], [" overline=\"", "\""])), textDecoration.overline);
    }
    if (defined(textDecoration.lineThrough)) {
        attribs += xml(templateObject_634 || (templateObject_634 = __makeTemplateObject([" line-through=\"", "\""], [" line-through=\"", "\""])), textDecoration.lineThrough);
    }
    return attribs;
}
function textRotationToXML(textRotation) {
    var attribs = "";
    if (defined(textRotation.rotation)) {
        attribs += xml(templateObject_635 || (templateObject_635 = __makeTemplateObject([" rotation=\"", "\""], [" rotation=\"", "\""])), textRotation.rotation);
    }
    return attribs;
}
function letterSpacingToXML(letterSpacing) {
    var attribs = "";
    if (defined(letterSpacing.letterSpacing)) {
        attribs += xml(templateObject_636 || (templateObject_636 = __makeTemplateObject([" letter-spacing=\"", "\""], [" letter-spacing=\"", "\""])), letterSpacing.letterSpacing);
    }
    return attribs;
}
function lineHeightToXML(lineHeight) {
    var attribs = "";
    if (defined(lineHeight.lineHeight)) {
        attribs += xml(templateObject_637 || (templateObject_637 = __makeTemplateObject([" line-height=\"", "\""], [" line-height=\"", "\""])), lineHeight.lineHeight);
    }
    return attribs;
}
var directionModeToXML = {
    0: "ltr",
    1: "rtl",
    2: "lro",
    3: "rlo",
};
function textDirectionToXML(textDirection) {
    // <!ENTITY % text-direction
    //     "dir (ltr | rtl | lro | rlo) #IMPLIED">
    var attribs = "";
    if (defined(textDirection.dir)) {
        attribs += xml(templateObject_638 || (templateObject_638 = __makeTemplateObject([" dir=\"", "\""], [" dir=\"", "\""])), directionModeToXML[textDirection.dir]);
    }
    return attribs;
}
var enclosureShapeToXML = {
    3: "circle",
    4: "bracket",
    5: "triangle",
    6: "diamond",
    7: "none",
    1: "square",
    2: "oval",
    0: "rectangle",
};
function enclosureToXML(enclosure) {
    var attribs = "";
    if (defined(enclosure.enclosure)) {
        attribs += xml(templateObject_639 || (templateObject_639 = __makeTemplateObject([" enclosure=\"", "\""], [" enclosure=\"", "\""])), enclosureShapeToXML[enclosure.enclosure]);
    }
    return attribs;
}
function levelDisplayToXML(levelDisplay) {
    var attribs = "";
    if (defined(levelDisplay.bracket)) {
        attribs += yesNo(templateObject_640 || (templateObject_640 = __makeTemplateObject([" bracket=\"", "\""], [" bracket=\"", "\""])), levelDisplay.bracket);
    }
    if (levelDisplay.size >= SymbolSize.Unspecified) {
        attribs += xml(templateObject_641 || (templateObject_641 = __makeTemplateObject([" size=\"", "\""], [" size=\"", "\""])), symbolSizeToXML[levelDisplay.size]);
    }
    if (defined(levelDisplay.parentheses)) {
        attribs += yesNo(templateObject_642 || (templateObject_642 = __makeTemplateObject([" parentheses=\"", "\""], [" parentheses=\"", "\""])), levelDisplay.bracket);
    }
    return attribs;
}
function bendSoundToXML(bendSound) {
    var attribs = "";
    if (defined(bendSound.accelerate)) {
        attribs += yesNo(templateObject_643 || (templateObject_643 = __makeTemplateObject([" accelerate=\"", "\""], [" accelerate=\"", "\""])), bendSound.accelerate);
    }
    if (defined(bendSound.beats)) {
        attribs += xml(templateObject_644 || (templateObject_644 = __makeTemplateObject([" beats=\"", "\""], [" beats=\"", "\""])), bendSound.beats);
    }
    if (defined(bendSound.firstBeat)) {
        attribs += xml(templateObject_645 || (templateObject_645 = __makeTemplateObject([" first-beat=\"", "\""], [" first-beat=\"", "\""])), bendSound.firstBeat);
    }
    if (defined(bendSound.lastBeat)) {
        attribs += xml(templateObject_646 || (templateObject_646 = __makeTemplateObject([" last-beat=\"", "\""], [" last-beat=\"", "\""])), bendSound.lastBeat);
    }
    return attribs;
}
var upperMainBelowToXML = {
    1: "main",
    2: "below",
    0: "upper",
};
var wholeHalfUnisonToXML = {
    2: "unison",
    0: "whole",
    1: "half",
};
var wholeHalfNoneToXML = {
    3: "none",
    0: "whole",
    1: "half",
};
function trillSoundToXML(trillSound) {
    // <!ENTITY % trill-sound
    //     "start-note    (upper | main | below)  #IMPLIED
    //      trill-step    (whole | half | unison) #IMPLIED
    //      two-note-turn (whole | half | none)   #IMPLIED
    //      accelerate    %yes-no; #IMPLIED
    //      beats         CDATA    #IMPLIED
    //      second-beat   CDATA    #IMPLIED
    //      last-beat     CDATA    #IMPLIED">
    var attribs = "";
    if (defined(trillSound.startNote)) {
        attribs += xml(templateObject_647 || (templateObject_647 = __makeTemplateObject([" start-note=\"", "\""], [" start-note=\"", "\""])), upperMainBelowToXML[trillSound.startNote]);
    }
    if (defined(trillSound.trillStep)) {
        attribs += xml(templateObject_648 || (templateObject_648 = __makeTemplateObject([" trill-step=\"", "\""], [" trill-step=\"", "\""])), wholeHalfUnisonToXML[trillSound.trillStep]);
    }
    if (defined(trillSound.twoNoteTurn)) {
        attribs += xml(templateObject_649 || (templateObject_649 = __makeTemplateObject([" two-note-turn=\"", "\""], [" two-note-turn=\"", "\""])), wholeHalfNoneToXML[trillSound.twoNoteTurn]);
    }
    if (defined(trillSound.accelerate)) {
        attribs += yesNo(templateObject_650 || (templateObject_650 = __makeTemplateObject([" accelerate=\"", "\""], [" accelerate=\"", "\""])), trillSound.accelerate);
    }
    if (defined(trillSound.beats)) {
        attribs += xml(templateObject_651 || (templateObject_651 = __makeTemplateObject([" beats=\"", "\""], [" beats=\"", "\""])), trillSound.beats);
    }
    if (defined(trillSound.secondBeat)) {
        attribs += xml(templateObject_652 || (templateObject_652 = __makeTemplateObject([" second-beat=\"", "\""], [" second-beat=\"", "\""])), trillSound.secondBeat);
    }
    if (defined(trillSound.lastBeat)) {
        attribs += xml(templateObject_653 || (templateObject_653 = __makeTemplateObject([" last-beat=\"", "\""], [" last-beat=\"", "\""])), trillSound.lastBeat);
    }
    return attribs;
}
function slashToXML(slash) {
    if (defined(slash.slash)) {
        return yesNo(templateObject_654 || (templateObject_654 = __makeTemplateObject([" slash=\"", "\""], [" slash=\"", "\""])), slash.slash);
    }
    return "";
}
function mordentSubsetToXML(mordent) {
    //     long %yes-no; #IMPLIED
    //     approach %above-below; #IMPLIED
    //     departure %above-below; #IMPLIED
    var attribs = "";
    if (defined(mordent.long)) {
        attribs += yesNo(templateObject_655 || (templateObject_655 = __makeTemplateObject([" long=\"", "\""], [" long=\"", "\""])), mordent.long);
    }
    if (defined(mordent.approach)) {
        attribs += xml(templateObject_656 || (templateObject_656 = __makeTemplateObject([" approach=\"", "\""], [" approach=\"", "\""])), mordent.approach === AboveBelow.Above ? "above" : "below");
    }
    if (defined(mordent.departure)) {
        attribs += xml(templateObject_657 || (templateObject_657 = __makeTemplateObject([" departure=\"", "\""], [" departure=\"", "\""])), mordent.departure === AboveBelow.Above ? "above" : "below");
    }
    return attribs;
}
function upDownToXML(upDown) {
    if (defined(upDown.type)) {
        return xml(templateObject_658 || (templateObject_658 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), upDown.type ? "down" : "up");
    }
    return "";
}
function upDownDirectionToXML(direction) {
    if (defined(direction.direction)) {
        return xml(templateObject_659 || (templateObject_659 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), direction.direction ? "down" : "up");
    }
    return "";
}
function topBottomToXML(topBottom) {
    if (defined(topBottom.type)) {
        return xml(templateObject_660 || (templateObject_660 = __makeTemplateObject([" type=\"", "\""], [" type=\"", "\""])), topBottom.type ? "bottom" : "top");
    }
    return "";
}
function colorToXML(color) {
    // <!ENTITY % color
    //     "color CDATA #IMPLIED">
    if (defined(color.color)) {
        return xml(templateObject_661 || (templateObject_661 = __makeTemplateObject([" color=\"", "\""], [" color=\"", "\""])), color.color);
    }
    return "";
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67, templateObject_68, templateObject_69, templateObject_70, templateObject_71, templateObject_72, templateObject_73, templateObject_74, templateObject_75, templateObject_76, templateObject_77, templateObject_78, templateObject_79, templateObject_80, templateObject_81, templateObject_82, templateObject_83, templateObject_84, templateObject_85, templateObject_86, templateObject_87, templateObject_88, templateObject_89, templateObject_90, templateObject_91, templateObject_92, templateObject_93, templateObject_94, templateObject_95, templateObject_96, templateObject_97, templateObject_98, templateObject_99, templateObject_100, templateObject_101, templateObject_102, templateObject_103, templateObject_104, templateObject_105, templateObject_106, templateObject_107, templateObject_108, templateObject_109, templateObject_110, templateObject_111, templateObject_112, templateObject_113, templateObject_114, templateObject_115, templateObject_116, templateObject_117, templateObject_118, templateObject_119, templateObject_120, templateObject_121, templateObject_122, templateObject_123, templateObject_124, templateObject_125, templateObject_126, templateObject_127, templateObject_128, templateObject_129, templateObject_130, templateObject_131, templateObject_132, templateObject_133, templateObject_134, templateObject_135, templateObject_136, templateObject_137, templateObject_138, templateObject_139, templateObject_140, templateObject_141, templateObject_142, templateObject_143, templateObject_144, templateObject_145, templateObject_146, templateObject_147, templateObject_148, templateObject_149, templateObject_150, templateObject_151, templateObject_152, templateObject_153, templateObject_154, templateObject_155, templateObject_156, templateObject_157, templateObject_158, templateObject_159, templateObject_160, templateObject_161, templateObject_162, templateObject_163, templateObject_164, templateObject_165, templateObject_166, templateObject_167, templateObject_168, templateObject_169, templateObject_170, templateObject_171, templateObject_172, templateObject_173, templateObject_174, templateObject_175, templateObject_176, templateObject_177, templateObject_178, templateObject_179, templateObject_180, templateObject_181, templateObject_182, templateObject_183, templateObject_184, templateObject_185, templateObject_186, templateObject_187, templateObject_188, templateObject_189, templateObject_190, templateObject_191, templateObject_192, templateObject_193, templateObject_194, templateObject_195, templateObject_196, templateObject_197, templateObject_198, templateObject_199, templateObject_200, templateObject_201, templateObject_202, templateObject_203, templateObject_204, templateObject_205, templateObject_206, templateObject_207, templateObject_208, templateObject_209, templateObject_210, templateObject_211, templateObject_212, templateObject_213, templateObject_214, templateObject_215, templateObject_216, templateObject_217, templateObject_218, templateObject_219, templateObject_220, templateObject_221, templateObject_222, templateObject_223, templateObject_224, templateObject_225, templateObject_226, templateObject_227, templateObject_228, templateObject_229, templateObject_230, templateObject_231, templateObject_232, templateObject_233, templateObject_234, templateObject_235, templateObject_236, templateObject_237, templateObject_238, templateObject_239, templateObject_240, templateObject_241, templateObject_242, templateObject_243, templateObject_244, templateObject_245, templateObject_246, templateObject_247, templateObject_248, templateObject_249, templateObject_250, templateObject_251, templateObject_252, templateObject_253, templateObject_254, templateObject_255, templateObject_256, templateObject_257, templateObject_258, templateObject_259, templateObject_260, templateObject_261, templateObject_262, templateObject_263, templateObject_264, templateObject_265, templateObject_266, templateObject_267, templateObject_268, templateObject_269, templateObject_270, templateObject_271, templateObject_272, templateObject_273, templateObject_274, templateObject_275, templateObject_276, templateObject_277, templateObject_278, templateObject_279, templateObject_280, templateObject_281, templateObject_282, templateObject_283, templateObject_284, templateObject_285, templateObject_286, templateObject_287, templateObject_288, templateObject_289, templateObject_290, templateObject_291, templateObject_292, templateObject_293, templateObject_294, templateObject_295, templateObject_296, templateObject_297, templateObject_298, templateObject_299, templateObject_300, templateObject_301, templateObject_302, templateObject_303, templateObject_304, templateObject_305, templateObject_306, templateObject_307, templateObject_308, templateObject_309, templateObject_310, templateObject_311, templateObject_312, templateObject_313, templateObject_314, templateObject_315, templateObject_316, templateObject_317, templateObject_318, templateObject_319, templateObject_320, templateObject_321, templateObject_322, templateObject_323, templateObject_324, templateObject_325, templateObject_326, templateObject_327, templateObject_328, templateObject_329, templateObject_330, templateObject_331, templateObject_332, templateObject_333, templateObject_334, templateObject_335, templateObject_336, templateObject_337, templateObject_338, templateObject_339, templateObject_340, templateObject_341, templateObject_342, templateObject_343, templateObject_344, templateObject_345, templateObject_346, templateObject_347, templateObject_348, templateObject_349, templateObject_350, templateObject_351, templateObject_352, templateObject_353, templateObject_354, templateObject_355, templateObject_356, templateObject_357, templateObject_358, templateObject_359, templateObject_360, templateObject_361, templateObject_362, templateObject_363, templateObject_364, templateObject_365, templateObject_366, templateObject_367, templateObject_368, templateObject_369, templateObject_370, templateObject_371, templateObject_372, templateObject_373, templateObject_374, templateObject_375, templateObject_376, templateObject_377, templateObject_378, templateObject_379, templateObject_380, templateObject_381, templateObject_382, templateObject_383, templateObject_384, templateObject_385, templateObject_386, templateObject_387, templateObject_388, templateObject_389, templateObject_390, templateObject_391, templateObject_392, templateObject_393, templateObject_394, templateObject_395, templateObject_396, templateObject_397, templateObject_398, templateObject_399, templateObject_400, templateObject_401, templateObject_402, templateObject_403, templateObject_404, templateObject_405, templateObject_406, templateObject_407, templateObject_408, templateObject_409, templateObject_410, templateObject_411, templateObject_412, templateObject_413, templateObject_414, templateObject_415, templateObject_416, templateObject_417, templateObject_418, templateObject_419, templateObject_420, templateObject_421, templateObject_422, templateObject_423, templateObject_424, templateObject_425, templateObject_426, templateObject_427, templateObject_428, templateObject_429, templateObject_430, templateObject_431, templateObject_432, templateObject_433, templateObject_434, templateObject_435, templateObject_436, templateObject_437, templateObject_438, templateObject_439, templateObject_440, templateObject_441, templateObject_442, templateObject_443, templateObject_444, templateObject_445, templateObject_446, templateObject_447, templateObject_448, templateObject_449, templateObject_450, templateObject_451, templateObject_452, templateObject_453, templateObject_454, templateObject_455, templateObject_456, templateObject_457, templateObject_458, templateObject_459, templateObject_460, templateObject_461, templateObject_462, templateObject_463, templateObject_464, templateObject_465, templateObject_466, templateObject_467, templateObject_468, templateObject_469, templateObject_470, templateObject_471, templateObject_472, templateObject_473, templateObject_474, templateObject_475, templateObject_476, templateObject_477, templateObject_478, templateObject_479, templateObject_480, templateObject_481, templateObject_482, templateObject_483, templateObject_484, templateObject_485, templateObject_486, templateObject_487, templateObject_488, templateObject_489, templateObject_490, templateObject_491, templateObject_492, templateObject_493, templateObject_494, templateObject_495, templateObject_496, templateObject_497, templateObject_498, templateObject_499, templateObject_500, templateObject_501, templateObject_502, templateObject_503, templateObject_504, templateObject_505, templateObject_506, templateObject_507, templateObject_508, templateObject_509, templateObject_510, templateObject_511, templateObject_512, templateObject_513, templateObject_514, templateObject_515, templateObject_516, templateObject_517, templateObject_518, templateObject_519, templateObject_520, templateObject_521, templateObject_522, templateObject_523, templateObject_524, templateObject_525, templateObject_526, templateObject_527, templateObject_528, templateObject_529, templateObject_530, templateObject_531, templateObject_532, templateObject_533, templateObject_534, templateObject_535, templateObject_536, templateObject_537, templateObject_538, templateObject_539, templateObject_540, templateObject_541, templateObject_542, templateObject_543, templateObject_544, templateObject_545, templateObject_546, templateObject_547, templateObject_548, templateObject_549, templateObject_550, templateObject_551, templateObject_552, templateObject_553, templateObject_554, templateObject_555, templateObject_556, templateObject_557, templateObject_558, templateObject_559, templateObject_560, templateObject_561, templateObject_562, templateObject_563, templateObject_564, templateObject_565, templateObject_566, templateObject_567, templateObject_568, templateObject_569, templateObject_570, templateObject_571, templateObject_572, templateObject_573, templateObject_574, templateObject_575, templateObject_576, templateObject_577, templateObject_578, templateObject_579, templateObject_580, templateObject_581, templateObject_582, templateObject_583, templateObject_584, templateObject_585, templateObject_586, templateObject_587, templateObject_588, templateObject_589, templateObject_590, templateObject_591, templateObject_592, templateObject_593, templateObject_594, templateObject_595, templateObject_596, templateObject_597, templateObject_598, templateObject_599, templateObject_600, templateObject_601, templateObject_602, templateObject_603, templateObject_604, templateObject_605, templateObject_606, templateObject_607, templateObject_608, templateObject_609, templateObject_610, templateObject_611, templateObject_612, templateObject_613, templateObject_614, templateObject_615, templateObject_616, templateObject_617, templateObject_618, templateObject_619, templateObject_620, templateObject_621, templateObject_622, templateObject_623, templateObject_624, templateObject_625, templateObject_626, templateObject_627, templateObject_628, templateObject_629, templateObject_630, templateObject_631, templateObject_632, templateObject_633, templateObject_634, templateObject_635, templateObject_636, templateObject_637, templateObject_638, templateObject_639, templateObject_640, templateObject_641, templateObject_642, templateObject_643, templateObject_644, templateObject_645, templateObject_646, templateObject_647, templateObject_648, templateObject_649, templateObject_650, templateObject_651, templateObject_652, templateObject_653, templateObject_654, templateObject_655, templateObject_656, templateObject_657, templateObject_658, templateObject_659, templateObject_660, templateObject_661;
