var assert = require("assert");
function popFront(t) {
    t.slice(1);
    return t;
}
var parttimeXSLBuffer = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"> <xsl:output method=\"xml\" indent=\"yes\" encoding=\"UTF-8\" omit-xml-declaration=\"no\" standalone=\"no\" doctype-system=\"http://www.musicxml.org/dtds/timewise.dtd\" doctype-public=\"-//Recordare//DTD MusicXML 3.0 Timewise//EN\" /> <xsl:template match=\"/\"> <xsl:apply-templates select=\"./score-partwise\"/> <xsl:apply-templates select=\"./score-timewise\"/> </xsl:template> <xsl:template match=\"score-timewise\"> <xsl:copy-of select=\".\" /> </xsl:template> <xsl:template match=\"text()\"> <xsl:value-of select=\".\" /> </xsl:template> <xsl:template match=\"*|@*|comment()|processing-instruction()\"> <xsl:copy><xsl:apply-templates select=\"*|@*|comment()|processing-instruction()|text()\" /></xsl:copy> </xsl:template> <xsl:template match=\"score-partwise\"> <xsl:element name=\"score-timewise\"> <xsl:apply-templates select=\"@version[.!='1.0']\"/> <xsl:apply-templates select=\"work\"/> <xsl:apply-templates select=\"movement-number\"/> <xsl:apply-templates select=\"movement-title\"/> <xsl:apply-templates select=\"identification\"/> <xsl:apply-templates select=\"defaults\"/> <xsl:apply-templates select=\"credit\"/> <xsl:apply-templates select=\"part-list\"/> <xsl:for-each select=\"part[1]/measure\"> <xsl:variable name=\"measure-number\"> <xsl:value-of select=\"@number\"/> </xsl:variable> <xsl:element name=\"measure\"> <xsl:attribute name=\"number\"> <xsl:value-of select=\"$measure-number\"/> </xsl:attribute> <xsl:if test=\"@implicit[. = 'yes']\"> <xsl:attribute name=\"implicit\"> <xsl:value-of select=\"@implicit\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@non-controlling[. = 'yes']\"> <xsl:attribute name=\"non-controlling\"> <xsl:value-of select=\"@non-controlling\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@width\"> <xsl:attribute name=\"width\"> <xsl:value-of select=\"@width\"/> </xsl:attribute> </xsl:if> <xsl:for-each select=\"../../part/measure\"> <xsl:if test=\"@number=$measure-number\"> <xsl:element name=\"part\"> <xsl:attribute name=\"id\"> <xsl:value-of select=\"parent::part/@id\"/> </xsl:attribute> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>";
var isIE = typeof window !== "undefined" && "ActiveXObject" in window;
if (!isIE) {
    var parttimeXSLDoc = (new DOMParser).parseFromString(parttimeXSLBuffer, "text/xml");
    var parttimeXSLProcessor = new XSLTProcessor;
    parttimeXSLProcessor.importStylesheet(parttimeXSLDoc);
}
function parseXML(musicxmlBuffer) {
    if (isIE) {
        var xslt = new ActiveXObject("Msxml2.XSLTemplate");
        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
        xmlDoc.validateOnParse = false;
        xslDoc.validateOnParse = false;
        xmlDoc.resolveExternals = false;
        xslDoc.resolveExternals = false;
        xmlDoc.loadXML(musicxmlBuffer);
        xslDoc.loadXML(parttimeXSLBuffer);
        xslt.stylesheet = xslDoc;
        var xslProc = xslt.createProcessor();
        xslProc.input = xmlDoc;
        xslProc.transform();
        var dom = (new DOMParser).parseFromString(xslProc.output, "text/xml");
    }
    else {
        var dom = (new DOMParser).parseFromString(musicxmlBuffer, "text/xml");
        dom = parttimeXSLProcessor.transformToDocument(dom);
    }
    var json = xmlToScoreTimewise(dom.documentElement);
    return json;
}
exports.parseXML = parseXML;
function getString(ch, required) {
    return (ch.nodeType === ch.ATTRIBUTE_NODE ? ch.value : ch.textContent).trim();
}
exports.getString = getString;
function getNumber(ch, required) {
    var s = getString(ch, required);
    if (s.toLowerCase().indexOf("0x") === 0) {
        return parseInt(s, 16);
    }
    else {
        return parseFloat(s);
    }
}
exports.getNumber = getNumber;
function xmlToTextArray(node) {
    assert(false, "xmlToTextArray not implemented");
    return null;
}
exports.xmlToTextArray = xmlToTextArray;
function toCamelCase(input) {
    "use strict";
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
exports.toCamelCase = toCamelCase;
function xmlToEncodingDate(node) {
    var text = getString(node, true);
    if (text.length < 10) {
        return null;
    }
    return {
        year: parseFloat(text.slice(0, 4)),
        month: parseFloat(text.slice(5, 7)),
        day: parseFloat(text.slice(8, 1))
    };
}
exports.xmlToEncodingDate = xmlToEncodingDate;
function xmlToMeasure(node) {
    "use strict";
    var ret = {};
    var foundImplicit = false;
    var foundNonControlling = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "part") {
            var dataPart = xmlToPart(ch);
            ret.parts = ret.parts || {};
            ret.parts[ch.attributes["id"].value] = dataPart;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber = getString(ch2, true);
            ret.number_ = dataNumber;
        }
        if (ch2.name === "implicit") {
            var dataImplicit = xmlToYesNo(ch2, true);
            ret.implicit = dataImplicit;
            foundImplicit = true;
        }
        if (ch2.name === "width") {
            var dataWidth = getNumber(ch2, true);
            ret.width = dataWidth;
        }
        if (ch2.name === "non-controlling") {
            var dataNonControlling = xmlToYesNo(ch2, true);
            ret.nonControlling = dataNonControlling;
            foundNonControlling = true;
        }
    }
    if (!foundImplicit) {
        ret.implicit = false;
    }
    if (!foundNonControlling) {
        ret.nonControlling = false;
    }
    return ret;
}
exports.xmlToMeasure = xmlToMeasure;
function xmlToYesNo(p, required) {
    var s = getString(p, true);
    if (s == "no") {
        return false;
    }
    if (s == "yes") {
        return true;
    }
    assert(!required, "Not reached");
    return false;
}
exports.xmlToYesNo = xmlToYesNo;
function xmlToNoteheadText(p) {
    return null;
}
exports.xmlToNoteheadText = xmlToNoteheadText;
function xmlToPartNameDisplay(p) {
    return null;
}
exports.xmlToPartNameDisplay = xmlToPartNameDisplay;
function xmlToPartAbbreviationDisplay(p) {
    return null;
}
exports.xmlToPartAbbreviationDisplay = xmlToPartAbbreviationDisplay;
function xmlToLyric(node) {
    "use strict";
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
        ret.number_ = 1;
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
        ret.placement = 0 /* Unspecified */;
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
exports.xmlToLyric = xmlToLyric;
function xmlToMode(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMode = xmlToMode;
function xmlToOtherAppearance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOtherAppearance = xmlToOtherAppearance;
function xmlToTuningStep(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTuningStep = xmlToTuningStep;
function xmlToOtherDynamics(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOtherDynamics = xmlToOtherDynamics;
function xmlToVoice(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToVoice = xmlToVoice;
function xmlToNormalType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToNormalType = xmlToNormalType;
function xmlToSoftware(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSoftware = xmlToSoftware;
function xmlToEncodingDescription(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToEncodingDescription = xmlToEncodingDescription;
function xmlToKeyStep(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToKeyStep = xmlToKeyStep;
function xmlToKeyAlter(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToKeyAlter = xmlToKeyAlter;
function xmlToKeyAccidental(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToKeyAccidental = xmlToKeyAccidental;
function xmlToBeats(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBeats = xmlToBeats;
function xmlToBeatType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBeatType = xmlToBeatType;
function xmlToTimeRelation(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTimeRelation = xmlToTimeRelation;
function xmlToSenzaMisura(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSenzaMisura = xmlToSenzaMisura;
function xmlToInstruments(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToInstruments = xmlToInstruments;
function xmlToSign(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSign = xmlToSign;
function xmlToClefOctaveChange(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToClefOctaveChange = xmlToClefOctaveChange;
function xmlToStaffType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStaffType = xmlToStaffType;
function xmlToCapo(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToCapo = xmlToCapo;
function xmlToDiatonic(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDiatonic = xmlToDiatonic;
function xmlToChromatic(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToChromatic = xmlToChromatic;
function xmlToOctaveChange(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOctaveChange = xmlToOctaveChange;
function xmlToSlashType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSlashType = xmlToSlashType;
function xmlToDisplayStep(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDisplayStep = xmlToDisplayStep;
function xmlToDisplayOctave(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDisplayOctave = xmlToDisplayOctave;
function xmlToBendAlter(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBendAlter = xmlToBendAlter;
function xmlToHoleType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToHoleType = xmlToHoleType;
function xmlToHoleShape(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToHoleShape = xmlToHoleShape;
function xmlToArrowDirection(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToArrowDirection = xmlToArrowDirection;
function xmlToArrowStyle(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToArrowStyle = xmlToArrowStyle;
function xmlToCircularArrow(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToCircularArrow = xmlToCircularArrow;
function xmlToBeatUnit(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBeatUnit = xmlToBeatUnit;
function xmlToMetronomeRelation(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMetronomeRelation = xmlToMetronomeRelation;
function xmlToMetronomeType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMetronomeType = xmlToMetronomeType;
function xmlToPedalStep(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPedalStep = xmlToPedalStep;
function xmlToPedalAlter(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPedalAlter = xmlToPedalAlter;
function xmlToAccordionMiddle(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToAccordionMiddle = xmlToAccordionMiddle;
function xmlToGlass(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToGlass = xmlToGlass;
function xmlToMetal(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMetal = xmlToMetal;
function xmlToWood(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToWood = xmlToWood;
function xmlToPitched(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPitched = xmlToPitched;
function xmlToMembrane(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMembrane = xmlToMembrane;
function xmlToEffect(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToEffect = xmlToEffect;
function xmlToStickType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStickType = xmlToStickType;
function xmlToStickMaterial(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStickMaterial = xmlToStickMaterial;
function xmlToStickLocation(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStickLocation = xmlToStickLocation;
function xmlToOtherPercussion(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOtherPercussion = xmlToOtherPercussion;
function xmlToFrameStrings(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToFrameStrings = xmlToFrameStrings;
function xmlToFrameFrets(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToFrameFrets = xmlToFrameFrets;
function xmlToWorkNumber(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToWorkNumber = xmlToWorkNumber;
function xmlToWorkTitle(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToWorkTitle = xmlToWorkTitle;
function xmlToMovementNumber(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMovementNumber = xmlToMovementNumber;
function xmlToMovementTitle(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMovementTitle = xmlToMovementTitle;
function xmlToCreditType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToCreditType = xmlToCreditType;
function xmlToGroup(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToGroup = xmlToGroup;
function xmlToInstrumentName(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToInstrumentName = xmlToInstrumentName;
function xmlToInstrumentAbbreviation(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToInstrumentAbbreviation = xmlToInstrumentAbbreviation;
function xmlToInstrumentSound(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToInstrumentSound = xmlToInstrumentSound;
function xmlToEnsemble(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToEnsemble = xmlToEnsemble;
function xmlToVirtualLibrary(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToVirtualLibrary = xmlToVirtualLibrary;
function xmlToVirtualName(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToVirtualName = xmlToVirtualName;
function xmlToTenths(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTenths = xmlToTenths;
function xmlToLayoutTenths(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToLayoutTenths = xmlToLayoutTenths;
(function (StartStop) {
    StartStop[StartStop["Start"] = 0] = "Start";
    StartStop[StartStop["Stop"] = 1] = "Stop";
})(exports.StartStop || (exports.StartStop = {}));
var StartStop = exports.StartStop;
function getStartStop(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return 0 /* Start */;
    }
    if (s == "stop") {
        return 1 /* Stop */;
    }
    assert(false, "Not reached");
}
exports.getStartStop = getStartStop;
(function (StartStopContinue) {
    StartStopContinue[StartStopContinue["Start"] = 0] = "Start";
    StartStopContinue[StartStopContinue["Stop"] = 1] = "Stop";
    StartStopContinue[StartStopContinue["Continue"] = 2] = "Continue";
})(exports.StartStopContinue || (exports.StartStopContinue = {}));
var StartStopContinue = exports.StartStopContinue;
function getStartStopContinue(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return 0 /* Start */;
    }
    if (s == "stop") {
        return 1 /* Stop */;
    }
    if (s == "continue") {
        return 2 /* Continue */;
    }
    assert(false, "Not reached");
}
exports.getStartStopContinue = getStartStopContinue;
(function (StartStopSingle) {
    StartStopSingle[StartStopSingle["Single"] = 3] = "Single";
    StartStopSingle[StartStopSingle["Start"] = 0] = "Start";
    StartStopSingle[StartStopSingle["Stop"] = 1] = "Stop";
})(exports.StartStopSingle || (exports.StartStopSingle = {}));
var StartStopSingle = exports.StartStopSingle;
function getStartStopSingle(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return 3 /* Single */;
    }
    if (s == "start") {
        return 0 /* Start */;
    }
    if (s == "stop") {
        return 1 /* Stop */;
    }
    assert(false, "Not reached");
}
exports.getStartStopSingle = getStartStopSingle;
(function (SymbolSize) {
    SymbolSize[SymbolSize["Unspecified"] = 0] = "Unspecified";
    SymbolSize[SymbolSize["Full"] = 1] = "Full";
    SymbolSize[SymbolSize["Cue"] = 2] = "Cue";
    SymbolSize[SymbolSize["Large"] = 3] = "Large";
})(exports.SymbolSize || (exports.SymbolSize = {}));
var SymbolSize = exports.SymbolSize;
function getSymbolSize(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unspecified") {
        return 0 /* Unspecified */;
    }
    if (s == "full") {
        return 1 /* Full */;
    }
    if (s == "cue") {
        return 2 /* Cue */;
    }
    if (s == "large") {
        return 3 /* Large */;
    }
    assert(false, "Not reached");
}
exports.getSymbolSize = getSymbolSize;
(function (AboveBelow) {
    AboveBelow[AboveBelow["Above"] = 1] = "Above";
    AboveBelow[AboveBelow["Below"] = 2] = "Below";
    AboveBelow[AboveBelow["Unspecified"] = 0] = "Unspecified";
})(exports.AboveBelow || (exports.AboveBelow = {}));
var AboveBelow = exports.AboveBelow;
function getAboveBelow(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "above") {
        return 1 /* Above */;
    }
    if (s == "below") {
        return 2 /* Below */;
    }
    if (s == "unspecified") {
        return 0 /* Unspecified */;
    }
    assert(false, "Not reached");
}
exports.getAboveBelow = getAboveBelow;
(function (OverUnder) {
    OverUnder[OverUnder["Over"] = 1] = "Over";
    OverUnder[OverUnder["Under"] = 2] = "Under";
    OverUnder[OverUnder["Unspecified"] = 0] = "Unspecified";
})(exports.OverUnder || (exports.OverUnder = {}));
var OverUnder = exports.OverUnder;
function getOverUnder(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "over") {
        return 1 /* Over */;
    }
    if (s == "under") {
        return 2 /* Under */;
    }
    if (s == "unspecified") {
        return 0 /* Unspecified */;
    }
    assert(false, "Not reached");
}
exports.getOverUnder = getOverUnder;
(function (UpDown) {
    UpDown[UpDown["Down"] = 1] = "Down";
    UpDown[UpDown["Up"] = 0] = "Up";
})(exports.UpDown || (exports.UpDown = {}));
var UpDown = exports.UpDown;
function getUpDown(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return 1 /* Down */;
    }
    if (s == "up") {
        return 0 /* Up */;
    }
    assert(false, "Not reached");
}
exports.getUpDown = getUpDown;
(function (TopBottom) {
    TopBottom[TopBottom["Top"] = 0] = "Top";
    TopBottom[TopBottom["Bottom"] = 1] = "Bottom";
})(exports.TopBottom || (exports.TopBottom = {}));
var TopBottom = exports.TopBottom;
function getTopBottom(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return 0 /* Top */;
    }
    if (s == "bottom") {
        return 1 /* Bottom */;
    }
    assert(false, "Not reached");
}
exports.getTopBottom = getTopBottom;
(function (LeftRight) {
    LeftRight[LeftRight["Right"] = 1] = "Right";
    LeftRight[LeftRight["Left"] = 0] = "Left";
})(exports.LeftRight || (exports.LeftRight = {}));
var LeftRight = exports.LeftRight;
function getLeftRight(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 1 /* Right */;
    }
    if (s == "left") {
        return 0 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getLeftRight = getLeftRight;
function verifyNumberOfLines(m) {
    assert(m >= 0 && m <= 3);
}
exports.verifyNumberOfLines = verifyNumberOfLines;
function xmlToNumberOfLines(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToNumberOfLines = xmlToNumberOfLines;
function verifyRotation(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyRotation = verifyRotation;
function xmlToRotation(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToRotation = xmlToRotation;
(function (EnclosureShape) {
    EnclosureShape[EnclosureShape["Circle"] = 3] = "Circle";
    EnclosureShape[EnclosureShape["Bracket"] = 4] = "Bracket";
    EnclosureShape[EnclosureShape["Triangle"] = 5] = "Triangle";
    EnclosureShape[EnclosureShape["Diamond"] = 6] = "Diamond";
    EnclosureShape[EnclosureShape["None"] = 7] = "None";
    EnclosureShape[EnclosureShape["Square"] = 1] = "Square";
    EnclosureShape[EnclosureShape["Oval"] = 2] = "Oval";
    EnclosureShape[EnclosureShape["Rectangle"] = 0] = "Rectangle";
})(exports.EnclosureShape || (exports.EnclosureShape = {}));
var EnclosureShape = exports.EnclosureShape;
function getEnclosureShape(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "circle") {
        return 3 /* Circle */;
    }
    if (s == "bracket") {
        return 4 /* Bracket */;
    }
    if (s == "triangle") {
        return 5 /* Triangle */;
    }
    if (s == "diamond") {
        return 6 /* Diamond */;
    }
    if (s == "none") {
        return 7 /* None */;
    }
    if (s == "square") {
        return 1 /* Square */;
    }
    if (s == "oval") {
        return 2 /* Oval */;
    }
    if (s == "rectangle") {
        return 0 /* Rectangle */;
    }
    assert(false, "Not reached");
}
exports.getEnclosureShape = getEnclosureShape;
(function (NormalItalic) {
    NormalItalic[NormalItalic["Italic"] = 1] = "Italic";
    NormalItalic[NormalItalic["Normal"] = 0] = "Normal";
})(exports.NormalItalic || (exports.NormalItalic = {}));
var NormalItalic = exports.NormalItalic;
function getNormalItalic(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "italic") {
        return 1 /* Italic */;
    }
    if (s == "normal") {
        return 0 /* Normal */;
    }
    assert(false, "Not reached");
}
exports.getNormalItalic = getNormalItalic;
(function (NormalBold) {
    NormalBold[NormalBold["Bold"] = 2] = "Bold";
    NormalBold[NormalBold["Normal"] = 0] = "Normal";
})(exports.NormalBold || (exports.NormalBold = {}));
var NormalBold = exports.NormalBold;
function getNormalBold(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "bold") {
        return 2 /* Bold */;
    }
    if (s == "normal") {
        return 0 /* Normal */;
    }
    assert(false, "Not reached");
}
exports.getNormalBold = getNormalBold;
function verifyNumberLevel(m) {
    assert(m >= 1 && m <= 6);
}
exports.verifyNumberLevel = verifyNumberLevel;
function xmlToNumberLevel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToNumberLevel = xmlToNumberLevel;
function verifyBeamLevel(m) {
    assert(m >= 1 && m <= 8);
}
exports.verifyBeamLevel = verifyBeamLevel;
function xmlToBeamLevel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToBeamLevel = xmlToBeamLevel;
function xmlToPosition(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
    return ret;
}
exports.xmlToPosition = xmlToPosition;
function xmlToPlacement(node) {
    "use strict";
    var ret = {};
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToPlacement = xmlToPlacement;
function xmlToOrientation(node) {
    "use strict";
    var ret = {};
    var foundOrientation = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, 0 /* Unspecified */);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
    }
    if (!foundOrientation) {
        ret.orientation = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOrientation = xmlToOrientation;
function xmlToDirectiveEntity(node) {
    "use strict";
    var ret = {};
    var foundDirectiveEntity = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "directive-entity") {
            var dataDirectiveEntity = xmlToYesNo(ch2);
            ret.directiveEntity = dataDirectiveEntity;
            foundDirectiveEntity = true;
        }
    }
    if (!foundDirectiveEntity) {
        ret.directiveEntity = false;
    }
    return ret;
}
exports.xmlToDirectiveEntity = xmlToDirectiveEntity;
function xmlToBezier(node) {
    "use strict";
    var ret = {};
    var foundBezierX2 = false;
    var foundBezierOffset = false;
    var foundBezierOffset2 = false;
    var foundBezierX = false;
    var foundBezierY = false;
    var foundBezierY2 = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
            foundBezierX2 = true;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
            foundBezierOffset = true;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
            foundBezierOffset2 = true;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
            foundBezierX = true;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
            foundBezierY = true;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
            foundBezierY2 = true;
        }
    }
    if (!foundBezierX2) {
        ret.bezierX2 = NaN;
    }
    if (!foundBezierOffset) {
        ret.bezierOffset = NaN;
    }
    if (!foundBezierOffset2) {
        ret.bezierOffset2 = NaN;
    }
    if (!foundBezierX) {
        ret.bezierX = NaN;
    }
    if (!foundBezierY) {
        ret.bezierY = NaN;
    }
    if (!foundBezierY2) {
        ret.bezierY2 = NaN;
    }
    return ret;
}
exports.xmlToBezier = xmlToBezier;
function xmlToFont(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    return ret;
}
exports.xmlToFont = xmlToFont;
(function (LeftCenterRight) {
    LeftCenterRight[LeftCenterRight["Right"] = 1] = "Right";
    LeftCenterRight[LeftCenterRight["Center"] = 2] = "Center";
    LeftCenterRight[LeftCenterRight["Left"] = 0] = "Left";
})(exports.LeftCenterRight || (exports.LeftCenterRight = {}));
var LeftCenterRight = exports.LeftCenterRight;
function getLeftCenterRight(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 1 /* Right */;
    }
    if (s == "center") {
        return 2 /* Center */;
    }
    if (s == "left") {
        return 0 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getLeftCenterRight = getLeftCenterRight;
(function (TopMiddleBottomBaseline) {
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Top"] = 0] = "Top";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Middle"] = 1] = "Middle";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Baseline"] = 3] = "Baseline";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Bottom"] = 2] = "Bottom";
})(exports.TopMiddleBottomBaseline || (exports.TopMiddleBottomBaseline = {}));
var TopMiddleBottomBaseline = exports.TopMiddleBottomBaseline;
function getTopMiddleBottomBaseline(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return 0 /* Top */;
    }
    if (s == "middle") {
        return 1 /* Middle */;
    }
    if (s == "baseline") {
        return 3 /* Baseline */;
    }
    if (s == "bottom") {
        return 2 /* Bottom */;
    }
    assert(false, "Not reached");
}
exports.getTopMiddleBottomBaseline = getTopMiddleBottomBaseline;
(function (DirectionMode) {
    DirectionMode[DirectionMode["Lro"] = 2] = "Lro";
    DirectionMode[DirectionMode["Rlo"] = 3] = "Rlo";
    DirectionMode[DirectionMode["Ltr"] = 0] = "Ltr";
    DirectionMode[DirectionMode["Rtl"] = 1] = "Rtl";
})(exports.DirectionMode || (exports.DirectionMode = {}));
var DirectionMode = exports.DirectionMode;
function getDirectionMode(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "lro") {
        return 2 /* Lro */;
    }
    if (s == "rlo") {
        return 3 /* Rlo */;
    }
    if (s == "ltr") {
        return 0 /* Ltr */;
    }
    if (s == "rtl") {
        return 1 /* Rtl */;
    }
    assert(false, "Not reached");
}
exports.getDirectionMode = getDirectionMode;
(function (StraightCurved) {
    StraightCurved[StraightCurved["Curved"] = 1] = "Curved";
    StraightCurved[StraightCurved["Straight"] = 0] = "Straight";
})(exports.StraightCurved || (exports.StraightCurved = {}));
var StraightCurved = exports.StraightCurved;
function getStraightCurved(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "curved") {
        return 1 /* Curved */;
    }
    if (s == "straight") {
        return 0 /* Straight */;
    }
    assert(false, "Not reached");
}
exports.getStraightCurved = getStraightCurved;
(function (SolidDashedDottedWavy) {
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dashed"] = 1] = "Dashed";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Wavy"] = 3] = "Wavy";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dotted"] = 2] = "Dotted";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Solid"] = 0] = "Solid";
})(exports.SolidDashedDottedWavy || (exports.SolidDashedDottedWavy = {}));
var SolidDashedDottedWavy = exports.SolidDashedDottedWavy;
function getSolidDashedDottedWavy(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dashed") {
        return 1 /* Dashed */;
    }
    if (s == "wavy") {
        return 3 /* Wavy */;
    }
    if (s == "dotted") {
        return 2 /* Dotted */;
    }
    if (s == "solid") {
        return 0 /* Solid */;
    }
    assert(false, "Not reached");
}
exports.getSolidDashedDottedWavy = getSolidDashedDottedWavy;
(function (NormalAngledSquare) {
    NormalAngledSquare[NormalAngledSquare["Angled"] = 1] = "Angled";
    NormalAngledSquare[NormalAngledSquare["Square"] = 2] = "Square";
    NormalAngledSquare[NormalAngledSquare["Normal"] = 0] = "Normal";
})(exports.NormalAngledSquare || (exports.NormalAngledSquare = {}));
var NormalAngledSquare = exports.NormalAngledSquare;
function getNormalAngledSquare(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "angled") {
        return 1 /* Angled */;
    }
    if (s == "square") {
        return 2 /* Square */;
    }
    if (s == "normal") {
        return 0 /* Normal */;
    }
    assert(false, "Not reached");
}
exports.getNormalAngledSquare = getNormalAngledSquare;
(function (UprightInverted) {
    UprightInverted[UprightInverted["Upright"] = 0] = "Upright";
    UprightInverted[UprightInverted["Inverted"] = 1] = "Inverted";
})(exports.UprightInverted || (exports.UprightInverted = {}));
var UprightInverted = exports.UprightInverted;
function getUprightInverted(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "upright") {
        return 0 /* Upright */;
    }
    if (s == "inverted") {
        return 1 /* Inverted */;
    }
    assert(false, "Not reached");
}
exports.getUprightInverted = getUprightInverted;
(function (UpperMainBelow) {
    UpperMainBelow[UpperMainBelow["Main"] = 1] = "Main";
    UpperMainBelow[UpperMainBelow["Below"] = 2] = "Below";
    UpperMainBelow[UpperMainBelow["Upper"] = 0] = "Upper";
})(exports.UpperMainBelow || (exports.UpperMainBelow = {}));
var UpperMainBelow = exports.UpperMainBelow;
function getUpperMainBelow(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "main") {
        return 1 /* Main */;
    }
    if (s == "below") {
        return 2 /* Below */;
    }
    if (s == "upper") {
        return 0 /* Upper */;
    }
    assert(false, "Not reached");
}
exports.getUpperMainBelow = getUpperMainBelow;
(function (WholeHalfUnison) {
    WholeHalfUnison[WholeHalfUnison["Unison"] = 2] = "Unison";
    WholeHalfUnison[WholeHalfUnison["Whole"] = 0] = "Whole";
    WholeHalfUnison[WholeHalfUnison["Half"] = 1] = "Half";
})(exports.WholeHalfUnison || (exports.WholeHalfUnison = {}));
var WholeHalfUnison = exports.WholeHalfUnison;
function getWholeHalfUnison(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unison") {
        return 2 /* Unison */;
    }
    if (s == "whole") {
        return 0 /* Whole */;
    }
    if (s == "half") {
        return 1 /* Half */;
    }
    assert(false, "Not reached");
}
exports.getWholeHalfUnison = getWholeHalfUnison;
(function (WholeHalfNone) {
    WholeHalfNone[WholeHalfNone["None"] = 3] = "None";
    WholeHalfNone[WholeHalfNone["Whole"] = 0] = "Whole";
    WholeHalfNone[WholeHalfNone["Half"] = 1] = "Half";
})(exports.WholeHalfNone || (exports.WholeHalfNone = {}));
var WholeHalfNone = exports.WholeHalfNone;
function getWholeHalfNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 3 /* None */;
    }
    if (s == "whole") {
        return 0 /* Whole */;
    }
    if (s == "half") {
        return 1 /* Half */;
    }
    assert(false, "Not reached");
}
exports.getWholeHalfNone = getWholeHalfNone;
function xmlToColor(node) {
    "use strict";
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToColor = xmlToColor;
function xmlToTextDecoration(node) {
    "use strict";
    var ret = {};
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTextDecoration = xmlToTextDecoration;
function xmlToJustify(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToJustify = xmlToJustify;
function xmlToHalign(node) {
    "use strict";
    var ret = {};
    var foundHalign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    return ret;
}
exports.xmlToHalign = xmlToHalign;
function xmlToValign(node) {
    "use strict";
    var ret = {};
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToValign = xmlToValign;
function xmlToValignImage(node) {
    "use strict";
    var ret = {};
    var foundValignImage = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "valign-image") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToValignImage = xmlToValignImage;
function xmlToLetterSpacing(node) {
    "use strict";
    var ret = {};
    var foundLetterSpacing = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToLetterSpacing = xmlToLetterSpacing;
function xmlToLineHeight(node) {
    "use strict";
    var ret = {};
    var foundLineHeight = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToLineHeight = xmlToLineHeight;
function xmlToTextDirection(node) {
    "use strict";
    var ret = {};
    var foundDir = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "dir") {
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    if (!foundDir) {
        ret.dir = 0 /* Ltr */;
    }
    return ret;
}
exports.xmlToTextDirection = xmlToTextDirection;
function xmlToTextRotation(node) {
    "use strict";
    var ret = {};
    var foundRotation = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTextRotation = xmlToTextRotation;
function xmlToEnclosure(node) {
    "use strict";
    var ret = {};
    var foundEnclosure = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToEnclosure = xmlToEnclosure;
function xmlToPrintStyle(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToPrintStyle = xmlToPrintStyle;
function xmlToPrintStyleAlign(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToPrintStyleAlign = xmlToPrintStyleAlign;
function xmlToLineShape(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    return ret;
}
exports.xmlToLineShape = xmlToLineShape;
function xmlToDashedFormatting(node) {
    "use strict";
    var ret = {};
    var foundDashLength = false;
    var foundSpaceLength = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToDashedFormatting = xmlToDashedFormatting;
function xmlToPrintObject(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToPrintObject = xmlToPrintObject;
function xmlToPrintSpacing(node) {
    "use strict";
    var ret = {};
    var foundPrintSpacing = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToPrintSpacing = xmlToPrintSpacing;
function xmlToTextFormatting(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToTextFormatting = xmlToTextFormatting;
function xmlToLevelDisplay(node) {
    "use strict";
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, 0 /* Unspecified */);
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
        ret.size = 0 /* Unspecified */;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    return ret;
}
exports.xmlToLevelDisplay = xmlToLevelDisplay;
function xmlToTrillSound(node) {
    "use strict";
    var ret = {};
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToTrillSound = xmlToTrillSound;
function xmlToBendSound(node) {
    "use strict";
    var ret = {};
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
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
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToBendSound = xmlToBendSound;
function xmlToTimeOnly(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTimeOnly = xmlToTimeOnly;
function xmlToDocumentAttributes(node) {
    "use strict";
    var ret = {};
    var foundVersion_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "version") {
            var dataVersion_ = getString(ch2, true);
            ret.version_ = dataVersion_;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version_ = "1.0";
    }
    return ret;
}
exports.xmlToDocumentAttributes = xmlToDocumentAttributes;
function xmlToEditorial(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToEditorial = xmlToEditorial;
function xmlToEditorialVoice(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getString(ch, true);
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
exports.xmlToEditorialVoice = xmlToEditorialVoice;
function xmlToFootnote(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToFootnote = xmlToFootnote;
function xmlToLevel(node) {
    "use strict";
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    var foundReference = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            var dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, 0 /* Unspecified */);
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
        ret.size = 0 /* Unspecified */;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    if (!foundReference) {
        ret.reference = false;
    }
    return ret;
}
exports.xmlToLevel = xmlToLevel;
function xmlToFermata(node) {
    "use strict";
    var ret = {};
    var foundShape = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getUprightInverted(ch2, 0 /* Upright */);
            ret.type = dataType;
            foundType = true;
        }
    }
    var ch3 = node;
    var dataShape = getNormalAngledSquare(ch3, 0 /* Normal */);
    ret.shape = dataShape;
    if (!foundShape) {
        ret.shape = 0 /* Normal */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = 0 /* Upright */;
    }
    return ret;
}
exports.xmlToFermata = xmlToFermata;
function xmlToWavyLine(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
        ret.number_ = 1;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToWavyLine = xmlToWavyLine;
function xmlToStaff(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataIdx = getNumber(ch3, true);
    ret.idx = dataIdx;
    return ret;
}
exports.xmlToStaff = xmlToStaff;
function xmlToSegno(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToSegno = xmlToSegno;
function xmlToCoda(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToCoda = xmlToCoda;
function xmlToActualNotes(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataCount = getNumber(ch3, true);
    ret.count = dataCount;
    return ret;
}
exports.xmlToActualNotes = xmlToActualNotes;
function xmlToNormalNotes(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataCount = getNumber(ch3, true);
    ret.count = dataCount;
    return ret;
}
exports.xmlToNormalNotes = xmlToNormalNotes;
function xmlToNormalDot(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToNormalDot = xmlToNormalDot;
function xmlToDynamics(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundPlacement = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToDynamics = xmlToDynamics;
function xmlToFingering(node) {
    "use strict";
    var ret = {};
    var foundSubstitution = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundAlternate = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
    var dataFinger = getNumber(ch3, true);
    ret.finger = dataFinger;
    if (!foundSubstitution) {
        ret.substitution = false;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundAlternate) {
        ret.alternate = false;
    }
    return ret;
}
exports.xmlToFingering = xmlToFingering;
function xmlToFret(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToFret = xmlToFret;
function xmlToString(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataStringNum = getNumber(ch3, true);
    ret.stringNum = dataStringNum;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToString = xmlToString;
function xmlToTuningAlter(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataStep = getString(ch3, true);
    ret.step = dataStep;
    return ret;
}
exports.xmlToTuningAlter = xmlToTuningAlter;
function xmlToTuningOctave(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataStep = getString(ch3, true);
    ret.step = dataStep;
    return ret;
}
exports.xmlToTuningOctave = xmlToTuningOctave;
function xmlToDisplayText(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToDisplayText = xmlToDisplayText;
function xmlToAccidentalText(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToAccidentalText = xmlToAccidentalText;
function xmlToMidiDevice(node) {
    "use strict";
    var ret = {};
    var foundDeviceName = false;
    var foundPort = false;
    var foundId = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMidiDevice = xmlToMidiDevice;
function verifyMidiChannel(m) {
    assert(m >= 1 && m <= 16);
}
exports.verifyMidiChannel = verifyMidiChannel;
function xmlToMidiChannel(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToMidiChannel = xmlToMidiChannel;
function verifyMidiBank(m) {
    assert(m >= 1 && m <= 16384);
}
exports.verifyMidiBank = verifyMidiBank;
function xmlToMidiBank(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToMidiBank = xmlToMidiBank;
function verifyMidiProgram(m) {
    assert(m >= 1 && m <= 128);
}
exports.verifyMidiProgram = verifyMidiProgram;
function xmlToMidiProgram(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToMidiProgram = xmlToMidiProgram;
function verifyMidiUnpitched(m) {
    assert(m >= 1 && m <= 128);
}
exports.verifyMidiUnpitched = verifyMidiUnpitched;
function xmlToMidiUnpitched(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToMidiUnpitched = xmlToMidiUnpitched;
function verifyVolume(m) {
    assert(m >= 1 && m <= 100);
}
exports.verifyVolume = verifyVolume;
function xmlToVolume(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToVolume = xmlToVolume;
function verifyPan(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyPan = verifyPan;
function xmlToPan(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToPan = xmlToPan;
function verifyElevation(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyElevation = verifyElevation;
function xmlToElevation(node) {
    var str = node.textContent;
    var num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
exports.xmlToElevation = xmlToElevation;
function xmlToMidiInstrument(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMidiInstrument = xmlToMidiInstrument;
function xmlToPlay(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "ipa") {
            var dataIpa = getString(ch, true);
            ret.ipa = dataIpa;
        }
        if (ch.nodeName === "mute") {
            var dataMute = getString(ch, true);
            ret.mute = dataMute;
        }
        if (ch.nodeName === "other-play") {
            var dataOtherPlay = getString(ch, true);
            ret.otherPlay = dataOtherPlay;
        }
        if (ch.nodeName === "semi-pitched") {
            var dataSemiPitched = getString(ch, true);
            ret.semiPitched = dataSemiPitched;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPlay = xmlToPlay;
function xmlToMillimeters(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMillimeters = xmlToMillimeters;
function xmlToScaling(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToScaling = xmlToScaling;
function xmlToLeftMargin(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToLeftMargin = xmlToLeftMargin;
function xmlToRightMargin(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToRightMargin = xmlToRightMargin;
function xmlToTopMargin(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTopMargin = xmlToTopMargin;
function xmlToBottomMargin(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBottomMargin = xmlToBottomMargin;
function xmlToPageHeight(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPageHeight = xmlToPageHeight;
function xmlToPageWidth(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPageWidth = xmlToPageWidth;
(function (OddEvenBoth) {
    OddEvenBoth[OddEvenBoth["Both"] = 2] = "Both";
    OddEvenBoth[OddEvenBoth["Even"] = 1] = "Even";
    OddEvenBoth[OddEvenBoth["Odd"] = 0] = "Odd";
})(exports.OddEvenBoth || (exports.OddEvenBoth = {}));
var OddEvenBoth = exports.OddEvenBoth;
function getOddEvenBoth(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "both") {
        return 2 /* Both */;
    }
    if (s == "even") {
        return 1 /* Even */;
    }
    if (s == "odd") {
        return 0 /* Odd */;
    }
    assert(false, "Not reached");
}
exports.getOddEvenBoth = getOddEvenBoth;
function xmlToPageMargins(node) {
    "use strict";
    var ret = {};
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataType = getOddEvenBoth(ch2, 2 /* Both */);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundType) {
        ret.type = 2 /* Both */;
    }
    return ret;
}
exports.xmlToPageMargins = xmlToPageMargins;
function xmlToPageLayout(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToPageLayout = xmlToPageLayout;
function xmlToSystemDistance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSystemDistance = xmlToSystemDistance;
function xmlToTopSystemDistance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTopSystemDistance = xmlToTopSystemDistance;
function xmlToSystemLayout(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToSystemLayout = xmlToSystemLayout;
function xmlToSystemMargins(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToSystemMargins = xmlToSystemMargins;
function xmlToSystemDividers(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToSystemDividers = xmlToSystemDividers;
function xmlToLeftDivider(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToLeftDivider = xmlToLeftDivider;
function xmlToRightDivider(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToRightDivider = xmlToRightDivider;
function xmlToStaffDistance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStaffDistance = xmlToStaffDistance;
function xmlToStaffLayout(node) {
    "use strict";
    var ret = {};
    var foundNum = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "staff-distance") {
            var dataStaffDistance = getNumber(ch, true);
            ret.staffDistance = dataStaffDistance;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "num") {
            var dataNum = getNumber(ch2, true);
            ret.num = dataNum;
            foundNum = true;
        }
    }
    if (!foundNum) {
        ret.num = 1;
    }
    return ret;
}
exports.xmlToStaffLayout = xmlToStaffLayout;
function xmlToMeasureDistance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMeasureDistance = xmlToMeasureDistance;
function xmlToMeasureLayout(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMeasureLayout = xmlToMeasureLayout;
function xmlToLineWidth(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToLineWidth = xmlToLineWidth;
(function (CueGraceLarge) {
    CueGraceLarge[CueGraceLarge["Grace"] = 1] = "Grace";
    CueGraceLarge[CueGraceLarge["Cue"] = 0] = "Cue";
    CueGraceLarge[CueGraceLarge["Large"] = 2] = "Large";
})(exports.CueGraceLarge || (exports.CueGraceLarge = {}));
var CueGraceLarge = exports.CueGraceLarge;
function getCueGraceLarge(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "grace") {
        return 1 /* Grace */;
    }
    if (s == "cue") {
        return 0 /* Cue */;
    }
    if (s == "large") {
        return 2 /* Large */;
    }
    assert(false, "Not reached");
}
exports.getCueGraceLarge = getCueGraceLarge;
function xmlToNoteSize(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToNoteSize = xmlToNoteSize;
function xmlToDistance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToDistance = xmlToDistance;
function xmlToAppearance(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "line-width") {
            var dataLineWidths = xmlToLineWidth(ch);
            ret.lineWidths[popFront((dataLineWidths.type.length ? "_" : "") + toCamelCase(dataLineWidths.type))] = dataLineWidths;
        }
        if (ch.nodeName === "distance") {
            var dataDistances = xmlToDistance(ch);
            ret.distances[popFront((dataDistances.type.length ? "_" : "") + toCamelCase(dataDistances.type))] = dataDistances;
        }
        if (ch.nodeName === "other-appearance") {
            var dataOtherAppearances = getString(ch, true);
            ret.otherAppearances = (ret.otherAppearances || []).concat(dataOtherAppearances);
        }
        if (ch.nodeName === "note-size") {
            var dataNoteSizes = xmlToNoteSize(ch);
            ret.noteSizes[dataNoteSizes.type] = dataNoteSizes;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToAppearance = xmlToAppearance;
function xmlToCreator(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToCreator = xmlToCreator;
function xmlToRights(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToRights = xmlToRights;
function xmlToEncoder(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToEncoder = xmlToEncoder;
function xmlToSource(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    var ch3 = node;
    var dataSource = getString(ch3, true);
    ret.source = dataSource;
    return ret;
}
exports.xmlToSource = xmlToSource;
function xmlToRelation(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToRelation = xmlToRelation;
function xmlToMiscellaneousField(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMiscellaneousField = xmlToMiscellaneousField;
function xmlToMiscellaneous(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMiscellaneous = xmlToMiscellaneous;
function xmlToIdentification(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataSource = xmlToSource(ch);
            ret.source = dataSource;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToIdentification = xmlToIdentification;
function xmlToSupports(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    return ret;
}
exports.xmlToSupports = xmlToSupports;
function xmlToEncoding(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            ret.supports[popFront((dataSupports.element.length ? "_" : "") + toCamelCase(dataSupports.element) + (dataSupports.attribute.length ? "_" : "") + toCamelCase(dataSupports.attribute))] = dataSupports;
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
exports.xmlToEncoding = xmlToEncoding;
(function (SeparatorType) {
    SeparatorType[SeparatorType["None"] = 0] = "None";
    SeparatorType[SeparatorType["Horizontal"] = 1] = "Horizontal";
    SeparatorType[SeparatorType["Diagonal"] = 2] = "Diagonal";
    SeparatorType[SeparatorType["Vertical"] = 3] = "Vertical";
    SeparatorType[SeparatorType["Adjacent"] = 4] = "Adjacent";
})(exports.SeparatorType || (exports.SeparatorType = {}));
var SeparatorType = exports.SeparatorType;
function getSeparatorType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 0 /* None */;
    }
    if (s == "horizontal") {
        return 1 /* Horizontal */;
    }
    if (s == "diagonal") {
        return 2 /* Diagonal */;
    }
    if (s == "vertical") {
        return 3 /* Vertical */;
    }
    if (s == "adjacent") {
        return 4 /* Adjacent */;
    }
    assert(false, "Not reached");
}
exports.getSeparatorType = getSeparatorType;
function xmlToTimeSeparator(node) {
    "use strict";
    var ret = {};
    var foundSeparator = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, 0 /* None */);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSeparator) {
        ret.separator = 0 /* None */;
    }
    return ret;
}
exports.xmlToTimeSeparator = xmlToTimeSeparator;
(function (TimeSymbolType) {
    TimeSymbolType[TimeSymbolType["DottedNote"] = 4] = "DottedNote";
    TimeSymbolType[TimeSymbolType["Cut"] = 1] = "Cut";
    TimeSymbolType[TimeSymbolType["SingleNumber"] = 2] = "SingleNumber";
    TimeSymbolType[TimeSymbolType["Note"] = 3] = "Note";
    TimeSymbolType[TimeSymbolType["Common"] = 0] = "Common";
    TimeSymbolType[TimeSymbolType["Normal"] = 5] = "Normal";
})(exports.TimeSymbolType || (exports.TimeSymbolType = {}));
var TimeSymbolType = exports.TimeSymbolType;
function getTimeSymbolType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dotted-note") {
        return 4 /* DottedNote */;
    }
    if (s == "cut") {
        return 1 /* Cut */;
    }
    if (s == "single-number") {
        return 2 /* SingleNumber */;
    }
    if (s == "note") {
        return 3 /* Note */;
    }
    if (s == "common") {
        return 0 /* Common */;
    }
    if (s == "normal") {
        return 5 /* Normal */;
    }
    assert(false, "Not reached");
}
exports.getTimeSymbolType = getTimeSymbolType;
function xmlToTimeSymbol(node) {
    "use strict";
    var ret = {};
    var foundSymbol = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getTimeSymbolType(ch2, 5 /* Normal */);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = 5 /* Normal */;
    }
    return ret;
}
exports.xmlToTimeSymbol = xmlToTimeSymbol;
(function (CancelLocation) {
    CancelLocation[CancelLocation["Right"] = 1] = "Right";
    CancelLocation[CancelLocation["BeforeBarline"] = 2] = "BeforeBarline";
    CancelLocation[CancelLocation["Left"] = 0] = "Left";
})(exports.CancelLocation || (exports.CancelLocation = {}));
var CancelLocation = exports.CancelLocation;
function getCancelLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 1 /* Right */;
    }
    if (s == "before-barline") {
        return 2 /* BeforeBarline */;
    }
    if (s == "left") {
        return 0 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getCancelLocation = getCancelLocation;
function xmlToCancel(node) {
    "use strict";
    var ret = {};
    var foundLocation = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "location") {
            var dataLocation = getCancelLocation(ch2, 0 /* Left */);
            ret.location = dataLocation;
            foundLocation = true;
        }
    }
    var ch3 = node;
    var dataFifths = getNumber(ch3, true);
    ret.fifths = dataFifths;
    if (!foundLocation) {
        ret.location = 0 /* Left */;
    }
    return ret;
}
exports.xmlToCancel = xmlToCancel;
function xmlToFifths(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToFifths = xmlToFifths;
function xmlToKeyOctave(node) {
    "use strict";
    var ret = {};
    var foundCancel = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
exports.xmlToKeyOctave = xmlToKeyOctave;
function xmlToDivisions(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDivisions = xmlToDivisions;
function xmlToKey(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            ret.keyAccidentals = (ret.keyAccidentals || []).concat(dataKeyAccidentals);
        }
        if (ch.nodeName === "mode") {
            var dataMode = getString(ch, true);
            ret.mode = dataMode;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
exports.xmlToKey = xmlToKey;
function xmlToTime(node) {
    "use strict";
    var ret = {};
    var foundSymbol = false;
    var foundSeparator = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "interchangeable") {
            var dataInterchangeables = xmlToInterchangeable(ch);
            ret.interchangeables = (ret.interchangeables || []).concat(dataInterchangeables);
        }
        if (ch.nodeName === "beats") {
            var dataBeats = getNumber(ch, true);
            ret.beats = (ret.beats || []).concat(dataBeats);
        }
        if (ch.nodeName === "beat-type") {
            var dataBeatTypes = getNumber(ch, true);
            ret.beatTypes = (ret.beatTypes || []).concat(dataBeatTypes);
        }
        if (ch.nodeName === "senza-misura") {
            var dataSenzaMisura = true;
            ret.senzaMisura = dataSenzaMisura;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            var dataSymbol = getTimeSymbolType(ch2, 5 /* Normal */);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, 0 /* None */);
            ret.separator = dataSeparator;
            foundSeparator = true;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "print-object") {
            var dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = 5 /* Normal */;
    }
    if (!foundSeparator) {
        ret.separator = 0 /* None */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
exports.xmlToTime = xmlToTime;
function xmlToInterchangeable(node) {
    "use strict";
    var ret = {};
    var foundSymbol = false;
    var foundSeparator = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "beats") {
            var dataBeats = getNumber(ch, true);
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
            var dataSymbol = getTimeSymbolType(ch2, 5 /* Normal */);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            var dataSeparator = getSeparatorType(ch2, 0 /* None */);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = 5 /* Normal */;
    }
    if (!foundSeparator) {
        ret.separator = 0 /* None */;
    }
    return ret;
}
exports.xmlToInterchangeable = xmlToInterchangeable;
function xmlToStaves(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStaves = xmlToStaves;
(function (PartSymbolType) {
    PartSymbolType[PartSymbolType["None"] = 0] = "None";
    PartSymbolType[PartSymbolType["Line"] = 2] = "Line";
    PartSymbolType[PartSymbolType["Bracket"] = 3] = "Bracket";
    PartSymbolType[PartSymbolType["Square"] = 4] = "Square";
    PartSymbolType[PartSymbolType["Brace"] = 1] = "Brace";
})(exports.PartSymbolType || (exports.PartSymbolType = {}));
var PartSymbolType = exports.PartSymbolType;
function getPartSymbolType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 0 /* None */;
    }
    if (s == "line") {
        return 2 /* Line */;
    }
    if (s == "bracket") {
        return 3 /* Bracket */;
    }
    if (s == "square") {
        return 4 /* Square */;
    }
    if (s == "brace") {
        return 1 /* Brace */;
    }
    assert(false, "Not reached");
}
exports.getPartSymbolType = getPartSymbolType;
function xmlToPartSymbol(node) {
    "use strict";
    var ret = {};
    var foundTopStaff = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    var foundBottomStaff = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundBottomStaff) {
        ret.bottomStaff = -1;
    }
    return ret;
}
exports.xmlToPartSymbol = xmlToPartSymbol;
function xmlToLine(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToLine = xmlToLine;
function xmlToClef(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundSize = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundAfterBarline = false;
    var foundAdditional = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, 1 /* Full */);
            ret.size = dataSize;
            foundSize = true;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
        ret.number_ = 1;
    }
    if (!foundSize) {
        ret.size = 1 /* Full */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
exports.xmlToClef = xmlToClef;
function xmlToStaffLines(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStaffLines = xmlToStaffLines;
function xmlToStaffTuning(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "tuning-alter") {
            var dataTuningAlter = xmlToTuningAlter(ch);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            var dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            var dataTuningOctave = xmlToTuningOctave(ch);
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
exports.xmlToStaffTuning = xmlToStaffTuning;
function xmlToStaffSize(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToStaffSize = xmlToStaffSize;
(function (ShowFretsType) {
    ShowFretsType[ShowFretsType["Letters"] = 1] = "Letters";
    ShowFretsType[ShowFretsType["Numbers"] = 0] = "Numbers";
})(exports.ShowFretsType || (exports.ShowFretsType = {}));
var ShowFretsType = exports.ShowFretsType;
function getShowFretsType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "letters") {
        return 1 /* Letters */;
    }
    if (s == "numbers") {
        return 0 /* Numbers */;
    }
    assert(false, "Not reached");
}
exports.getShowFretsType = getShowFretsType;
function xmlToStaffDetails(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    var foundShowFets = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
        if (ch2.name === "show-fets") {
            var dataShowFets = getShowFretsType(ch2, 0 /* Numbers */);
            ret.showFets = dataShowFets;
            foundShowFets = true;
        }
    }
    if (!foundNumber_) {
        ret.number_ = 1;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    if (!foundShowFets) {
        ret.showFets = 0 /* Numbers */;
    }
    return ret;
}
exports.xmlToStaffDetails = xmlToStaffDetails;
function xmlToDouble(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDouble = xmlToDouble;
function xmlToTranspose(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "diatonic") {
            var dataDiatonic = getString(ch, true);
            ret.diatonic = dataDiatonic;
        }
        if (ch.nodeName === "octave-change") {
            var dataOctaveChange = getString(ch, true);
            ret.octaveChange = dataOctaveChange;
        }
        if (ch.nodeName === "double") {
            var dataDouble_ = xmlToDouble(ch);
            ret.double_ = dataDouble_;
        }
        if (ch.nodeName === "chromatic") {
            var dataChromatic = getString(ch, true);
            ret.chromatic = dataChromatic;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
    }
    if (!foundNumber_) {
        ret.number_ = NaN;
    }
    return ret;
}
exports.xmlToTranspose = xmlToTranspose;
function xmlToDirective(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDirective = xmlToDirective;
function xmlToSlashDot(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSlashDot = xmlToSlashDot;
function xmlToMultipleRest(node) {
    "use strict";
    var ret = {};
    var foundMultipleRest = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "multiple-rest") {
            var dataMultipleRest = xmlToYesNo(ch2);
            ret.multipleRest = dataMultipleRest;
            foundMultipleRest = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundMultipleRest) {
        ret.multipleRest = false;
    }
    return ret;
}
exports.xmlToMultipleRest = xmlToMultipleRest;
function xmlToMeasureRepeat(node) {
    "use strict";
    var ret = {};
    var foundSlashed = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "slashed") {
            var dataSlashed = getNumber(ch2, true);
            ret.slashed = dataSlashed;
            foundSlashed = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundSlashed) {
        ret.slashed = 1;
    }
    return ret;
}
exports.xmlToMeasureRepeat = xmlToMeasureRepeat;
function xmlToBeatRepeat(node) {
    "use strict";
    var ret = {};
    var foundUseDots = false;
    var foundSlases = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToBeatRepeat = xmlToBeatRepeat;
function xmlToSlash(node) {
    "use strict";
    var ret = {};
    var foundUseDots = false;
    var foundUseStems = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToSlash = xmlToSlash;
function xmlToMeasureStyle(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundNumber_) {
        ret.number_ = 1;
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToMeasureStyle = xmlToMeasureStyle;
function xmlToAttributes(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "divisions") {
            var dataDivisions = getNumber(ch, true);
            ret.divisions = dataDivisions;
        }
        if (ch.nodeName === "part-symbol") {
            var dataPartSymbol = xmlToPartSymbol(ch);
            ret.partSymbol = dataPartSymbol;
        }
        if (ch.nodeName === "clef") {
            var dataClef = xmlToClef(ch);
            ret.clef = dataClef;
        }
        if (ch.nodeName === "measure-style") {
            var dataMeasureStyle = xmlToMeasureStyle(ch);
            ret.measureStyle = dataMeasureStyle;
        }
        if (ch.nodeName === "time") {
            var dataTime = xmlToTime(ch);
            ret.time = dataTime;
        }
        if (ch.nodeName === "staff-details") {
            var dataStaffDetails = xmlToStaffDetails(ch);
            ret.staffDetails = dataStaffDetails;
        }
        if (ch.nodeName === "transpose") {
            var dataTranspose = xmlToTranspose(ch);
            ret.transpose = dataTranspose;
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
            var dataKeySignature = xmlToKey(ch);
            ret.keySignature = dataKeySignature;
        }
        if (ch.nodeName === "directive") {
            var dataDirective = xmlToDirective(ch);
            ret.directive = dataDirective;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToAttributes = xmlToAttributes;
function xmlToCue(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToCue = xmlToCue;
function xmlToGrace(node) {
    "use strict";
    var ret = {};
    var foundSlash = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToGrace = xmlToGrace;
function xmlToChord(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToChord = xmlToChord;
function xmlToUnpitched(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "display-step") {
            var dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            var dataDisplayOctave = getString(ch, true);
            ret.displayOctave = dataDisplayOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToUnpitched = xmlToUnpitched;
function xmlToAlter(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToAlter = xmlToAlter;
function xmlToOctave(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOctave = xmlToOctave;
function xmlToPitch(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "alter") {
            var dataAlter = getNumber(ch, true);
            ret.alter = dataAlter;
        }
        if (ch.nodeName === "step") {
            var dataStep = getString(ch, true);
            ret.step = dataStep;
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
exports.xmlToPitch = xmlToPitch;
function xmlToFullNote(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToFullNote = xmlToFullNote;
function xmlToRest(node) {
    "use strict";
    var ret = {};
    var foundMeasure = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "display-step") {
            var dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            var dataDisplayOctave = getString(ch, true);
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
exports.xmlToRest = xmlToRest;
function xmlToDuration(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToDuration = xmlToDuration;
function xmlToTie(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTie = xmlToTie;
function xmlToInstrument(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToInstrument = xmlToInstrument;
function xmlToNote(node) {
    "use strict";
    var ret = {};
    var foundAttack = false;
    var foundEndDynamics = false;
    var foundPizzicato = false;
    var foundDynamics = false;
    var foundRelease = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataStaff = xmlToStaff(ch);
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
            var dataVoice = getString(ch, true);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
    return ret;
}
exports.xmlToNote = xmlToNote;
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
})(exports.Count || (exports.Count = {}));
var Count = exports.Count;
function getCount(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "quarter") {
        return 4 /* Quarter */;
    }
    if (s == "breve") {
        return 9990 /* Breve */;
    }
    if (s == "long") {
        return 9991 /* Long */;
    }
    if (s == "1024th") {
        return 1024 /* _1024th */;
    }
    if (s == "32nd") {
        return 32 /* _32nd */;
    }
    if (s == "16th") {
        return 16 /* _16th */;
    }
    if (s == "eighth") {
        return 8 /* Eighth */;
    }
    if (s == "maxima") {
        return 9992 /* Maxima */;
    }
    if (s == "512th") {
        return 512 /* _512th */;
    }
    if (s == "64th") {
        return 64 /* _64th */;
    }
    if (s == "256th") {
        return 256 /* _256th */;
    }
    if (s == "128th") {
        return 128 /* _128th */;
    }
    if (s == "half") {
        return 2 /* Half */;
    }
    if (s == "whole") {
        return 1 /* Whole */;
    }
    assert(false, "Not reached");
}
exports.getCount = getCount;
function xmlToType(node) {
    "use strict";
    var ret = {};
    var foundSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "size") {
            var dataSize = getSymbolSize(ch2, 0 /* Unspecified */);
            ret.size = dataSize;
            foundSize = true;
        }
    }
    var ch3 = node;
    var dataDuration = getCount(ch3, null);
    ret.duration = dataDuration;
    if (!foundSize) {
        ret.size = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToType = xmlToType;
function xmlToDot(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToDot = xmlToDot;
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
    MxmlAccidental[MxmlAccidental["TripleFlat"] = 19] = "TripleFlat";
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
})(exports.MxmlAccidental || (exports.MxmlAccidental = {}));
var MxmlAccidental = exports.MxmlAccidental;
function getMxmlAccidental(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "natural-flat") {
        return 7 /* NaturalFlat */;
    }
    if (s == "sharp-up") {
        return 13 /* SharpUp */;
    }
    if (s == "three-quarters-flat") {
        return 10 /* ThreeQuartersFlat */;
    }
    if (s == "three-quarters-sharp") {
        return 11 /* ThreeQuartersSharp */;
    }
    if (s == "quarter-flat") {
        return 8 /* QuarterFlat */;
    }
    if (s == "flat") {
        return 2 /* Flat */;
    }
    if (s == "triple-sharp") {
        return 18 /* TripleSharp */;
    }
    if (s == "flat-1") {
        return 27 /* Flat1 */;
    }
    if (s == "flat-2") {
        return 28 /* Flat2 */;
    }
    if (s == "flat-3") {
        return 29 /* Flat3 */;
    }
    if (s == "flat-4") {
        return 291 /* Flat4 */;
    }
    if (s == "triple-flat") {
        return 19 /* TripleFlat */;
    }
    if (s == "flat-5") {
        return 30 /* Flat5 */;
    }
    if (s == "sharp") {
        return 0 /* Sharp */;
    }
    if (s == "quarter-sharp") {
        return 9 /* QuarterSharp */;
    }
    if (s == "slash-flat") {
        return 21 /* SlashFlat */;
    }
    if (s == "flat-down") {
        return 16 /* FlatDown */;
    }
    if (s == "natural-down") {
        return 14 /* NaturalDown */;
    }
    if (s == "slash-quarter-sharp") {
        return 19 /* SlashQuarterSharp */;
    }
    if (s == "sharp-sharp") {
        return 4 /* SharpSharp */;
    }
    if (s == "sharp-1") {
        return 23 /* Sharp1 */;
    }
    if (s == "flat-up") {
        return 17 /* FlatUp */;
    }
    if (s == "sharp-2") {
        return 24 /* Sharp2 */;
    }
    if (s == "sharp-3") {
        return 25 /* Sharp3 */;
    }
    if (s == "double-sharp") {
        return 3 /* DoubleSharp */;
    }
    if (s == "sharp-4") {
        return 251 /* Sharp4 */;
    }
    if (s == "sharp-5") {
        return 26 /* Sharp5 */;
    }
    if (s == "sori") {
        return 31 /* Sori */;
    }
    if (s == "double-slash-flat") {
        return 22 /* DoubleSlashFlat */;
    }
    if (s == "sharp-down") {
        return 12 /* SharpDown */;
    }
    if (s == "koron") {
        return 32 /* Koron */;
    }
    if (s == "natural-up") {
        return 15 /* NaturalUp */;
    }
    if (s == "slash-sharp") {
        return 20 /* SlashSharp */;
    }
    if (s == "natural-sharp") {
        return 6 /* NaturalSharp */;
    }
    if (s == "flat-flat") {
        return 5 /* FlatFlat */;
    }
    if (s == "natural") {
        return 1 /* Natural */;
    }
    if (s == "double-flat") {
        return 33 /* DoubleFlat */;
    }
    assert(false, "Not reached");
}
exports.getMxmlAccidental = getMxmlAccidental;
function xmlToAccidental(node) {
    "use strict";
    var ret = {};
    var foundCautionary = false;
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundEditorial = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataSize = getSymbolSize(ch2, 0 /* Unspecified */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
        ret.size = 0 /* Unspecified */;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundEditorial) {
        ret.editorial = false;
    }
    return ret;
}
exports.xmlToAccidental = xmlToAccidental;
function xmlToTimeModification(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "actual-notes") {
            var dataActualNotes = xmlToActualNotes(ch);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            var dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            var dataNormalNotes = xmlToNormalNotes(ch);
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
exports.xmlToTimeModification = xmlToTimeModification;
(function (StemType) {
    StemType[StemType["None"] = 2] = "None";
    StemType[StemType["Double"] = 3] = "Double";
    StemType[StemType["Down"] = 0] = "Down";
    StemType[StemType["Up"] = 1] = "Up";
})(exports.StemType || (exports.StemType = {}));
var StemType = exports.StemType;
function getStemType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 2 /* None */;
    }
    if (s == "double") {
        return 3 /* Double */;
    }
    if (s == "down") {
        return 0 /* Down */;
    }
    if (s == "up") {
        return 1 /* Up */;
    }
    assert(false, "Not reached");
}
exports.getStemType = getStemType;
function xmlToStem(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataType = getStemType(ch3, null);
    ret.type = dataType;
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToStem = xmlToStem;
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
    NoteheadType[NoteheadType["Nrectangle"] = 16] = "Nrectangle";
    NoteheadType[NoteheadType["Square"] = 3] = "Square";
    NoteheadType[NoteheadType["ArrowDown"] = 8] = "ArrowDown";
    NoteheadType[NoteheadType["X"] = 5] = "X";
    NoteheadType[NoteheadType["Diamond"] = 2] = "Diamond";
    NoteheadType[NoteheadType["CircleX"] = 6] = "CircleX";
})(exports.NoteheadType || (exports.NoteheadType = {}));
var NoteheadType = exports.NoteheadType;
function getNoteheadType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "inverted triangle") {
        return 7 /* InvertedTriangle */;
    }
    if (s == "circle dot") {
        return 14 /* CircleDot */;
    }
    if (s == "arrow up") {
        return 9 /* ArrowUp */;
    }
    if (s == "do") {
        return 18 /* Do */;
    }
    if (s == "mi") {
        return 20 /* Mi */;
    }
    if (s == "cross") {
        return 4 /* Cross */;
    }
    if (s == "slash") {
        return 0 /* Slash */;
    }
    if (s == "fa") {
        return 21 /* Fa */;
    }
    if (s == "triangle") {
        return 1 /* Triangle */;
    }
    if (s == "fa up") {
        return 22 /* FaUp */;
    }
    if (s == "so") {
        return 23 /* So */;
    }
    if (s == "left triangle") {
        return 15 /* LeftTriangle */;
    }
    if (s == "back slashed") {
        return 11 /* BackSlashed */;
    }
    if (s == "none") {
        return 17 /* None */;
    }
    if (s == "la") {
        return 24 /* La */;
    }
    if (s == "slashed") {
        return 10 /* Slashed */;
    }
    if (s == "normal") {
        return 12 /* Normal */;
    }
    if (s == "cluster") {
        return 13 /* Cluster */;
    }
    if (s == "ti") {
        return 25 /* Ti */;
    }
    if (s == "re") {
        return 19 /* Re */;
    }
    if (s == "nrectangle") {
        return 16 /* Nrectangle */;
    }
    if (s == "square") {
        return 3 /* Square */;
    }
    if (s == "arrow down") {
        return 8 /* ArrowDown */;
    }
    if (s == "x") {
        return 5 /* X */;
    }
    if (s == "diamond") {
        return 2 /* Diamond */;
    }
    if (s == "circle-x") {
        return 6 /* CircleX */;
    }
    assert(false, "Not reached");
}
exports.getNoteheadType = getNoteheadType;
function xmlToNotehead(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToNotehead = xmlToNotehead;
(function (BeamType) {
    BeamType[BeamType["BackwardHook"] = 4] = "BackwardHook";
    BeamType[BeamType["Begin"] = 0] = "Begin";
    BeamType[BeamType["ForwardHook"] = 3] = "ForwardHook";
    BeamType[BeamType["Continue"] = 1] = "Continue";
    BeamType[BeamType["End"] = 2] = "End";
})(exports.BeamType || (exports.BeamType = {}));
var BeamType = exports.BeamType;
function getBeamType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "backward hook") {
        return 4 /* BackwardHook */;
    }
    if (s == "begin") {
        return 0 /* Begin */;
    }
    if (s == "forward hook") {
        return 3 /* ForwardHook */;
    }
    if (s == "continue") {
        return 1 /* Continue */;
    }
    if (s == "end") {
        return 2 /* End */;
    }
    assert(false, "Not reached");
}
exports.getBeamType = getBeamType;
(function (AccelRitNone) {
    AccelRitNone[AccelRitNone["Accel"] = 0] = "Accel";
    AccelRitNone[AccelRitNone["None"] = 2] = "None";
    AccelRitNone[AccelRitNone["Rit"] = 1] = "Rit";
})(exports.AccelRitNone || (exports.AccelRitNone = {}));
var AccelRitNone = exports.AccelRitNone;
function getAccelRitNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "accel") {
        return 0 /* Accel */;
    }
    if (s == "none") {
        return 2 /* None */;
    }
    if (s == "rit") {
        return 1 /* Rit */;
    }
    assert(false, "Not reached");
}
exports.getAccelRitNone = getAccelRitNone;
function xmlToBeam(node) {
    "use strict";
    var ret = {};
    var foundRepeater = false;
    var foundNumber_ = false;
    var foundFan = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "repeater") {
            var dataRepeater = xmlToYesNo(ch2);
            ret.repeater = dataRepeater;
            foundRepeater = true;
        }
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "fan") {
            var dataFan = getAccelRitNone(ch2, 2 /* None */);
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
        ret.number_ = 1;
    }
    if (!foundFan) {
        ret.fan = 2 /* None */;
    }
    return ret;
}
exports.xmlToBeam = xmlToBeam;
function xmlToNotations(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToNotations = xmlToNotations;
function xmlToTied(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundOrientation = false;
    var foundBezierX2 = false;
    var foundBezierOffset = false;
    var foundBezierOffset2 = false;
    var foundBezierX = false;
    var foundBezierY = false;
    var foundBezierY2 = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, 0 /* Unspecified */);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
            foundBezierX2 = true;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
            foundBezierOffset = true;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
            foundBezierOffset2 = true;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
            foundBezierX = true;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
            foundBezierY = true;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
            foundBezierY2 = true;
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
        ret.number_ = 1;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundOrientation) {
        ret.orientation = 0 /* Unspecified */;
    }
    if (!foundBezierX2) {
        ret.bezierX2 = NaN;
    }
    if (!foundBezierOffset) {
        ret.bezierOffset = NaN;
    }
    if (!foundBezierOffset2) {
        ret.bezierOffset2 = NaN;
    }
    if (!foundBezierX) {
        ret.bezierX = NaN;
    }
    if (!foundBezierY) {
        ret.bezierY = NaN;
    }
    if (!foundBezierY2) {
        ret.bezierY2 = NaN;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToTied = xmlToTied;
function xmlToSlur(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundOrientation = false;
    var foundBezierX2 = false;
    var foundBezierOffset = false;
    var foundBezierOffset2 = false;
    var foundBezierX = false;
    var foundBezierY = false;
    var foundBezierY2 = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            var dataOrientation = getOverUnder(ch2, 0 /* Unspecified */);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            var dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
            foundBezierX2 = true;
        }
        if (ch2.name === "bezier-offset") {
            var dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
            foundBezierOffset = true;
        }
        if (ch2.name === "bezier-offset2") {
            var dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
            foundBezierOffset2 = true;
        }
        if (ch2.name === "bezier-x") {
            var dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
            foundBezierX = true;
        }
        if (ch2.name === "bezier-y") {
            var dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
            foundBezierY = true;
        }
        if (ch2.name === "bezier-y2") {
            var dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
            foundBezierY2 = true;
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
        ret.number_ = 1;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundOrientation) {
        ret.orientation = 0 /* Unspecified */;
    }
    if (!foundBezierX2) {
        ret.bezierX2 = NaN;
    }
    if (!foundBezierOffset) {
        ret.bezierOffset = NaN;
    }
    if (!foundBezierOffset2) {
        ret.bezierOffset2 = NaN;
    }
    if (!foundBezierX) {
        ret.bezierX = NaN;
    }
    if (!foundBezierY) {
        ret.bezierY = NaN;
    }
    if (!foundBezierY2) {
        ret.bezierY2 = NaN;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToSlur = xmlToSlur;
(function (ActualBothNone) {
    ActualBothNone[ActualBothNone["None"] = 2] = "None";
    ActualBothNone[ActualBothNone["Both"] = 1] = "Both";
    ActualBothNone[ActualBothNone["Actual"] = 0] = "Actual";
})(exports.ActualBothNone || (exports.ActualBothNone = {}));
var ActualBothNone = exports.ActualBothNone;
function getActualBothNone(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 2 /* None */;
    }
    if (s == "both") {
        return 1 /* Both */;
    }
    if (s == "actual") {
        return 0 /* Actual */;
    }
    assert(false, "Not reached");
}
exports.getActualBothNone = getActualBothNone;
function xmlToTuplet(node) {
    "use strict";
    var ret = {};
    var foundBracket = false;
    var foundShowNumber = false;
    var foundLineShape = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundShowType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
        }
        if (ch2.name === "show-number") {
            var dataShowNumber = getActualBothNone(ch2, 0 /* Actual */);
            ret.showNumber = dataShowNumber;
            foundShowNumber = true;
        }
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "show-type") {
            var dataShowType = getActualBothNone(ch2, 2 /* None */);
            ret.showType = dataShowType;
            foundShowType = true;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundShowNumber) {
        ret.showNumber = 0 /* Actual */;
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundShowType) {
        ret.showType = 2 /* None */;
    }
    return ret;
}
exports.xmlToTuplet = xmlToTuplet;
function xmlToTupletActual(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTupletActual = xmlToTupletActual;
function xmlToTupletNormal(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToTupletNormal = xmlToTupletNormal;
function xmlToTupletNumber(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToTupletNumber = xmlToTupletNumber;
function xmlToTupletType(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToTupletType = xmlToTupletType;
function xmlToTupletDot(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToTupletDot = xmlToTupletDot;
function xmlToGlissando(node) {
    "use strict";
    var ret = {};
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundNormal = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
        if (ch2.name === "normal") {
            var dataNormal = getNumber(ch2, true);
            ret.normal = dataNormal;
            foundNormal = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundNormal) {
        ret.normal = 1;
    }
    return ret;
}
exports.xmlToGlissando = xmlToGlissando;
function xmlToSlide(node) {
    "use strict";
    var ret = {};
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundSecondBeat = false;
    var foundNormal = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "normal") {
            var dataNormal = getNumber(ch2, true);
            ret.normal = dataNormal;
            foundNormal = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    if (!foundNormal) {
        ret.normal = 1;
    }
    return ret;
}
exports.xmlToSlide = xmlToSlide;
function xmlToOtherNotation(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
    if (!foundPrintObject) {
        ret.printObject = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOtherNotation = xmlToOtherNotation;
function xmlToOtherDirection(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToOtherDirection = xmlToOtherDirection;
function xmlToOrnaments(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToOrnaments = xmlToOrnaments;
function xmlToTrillMark(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToTrillMark = xmlToTrillMark;
function xmlToTurn(node) {
    "use strict";
    var ret = {};
    var foundSlash = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToTurn = xmlToTurn;
function xmlToDelayedTurn(node) {
    "use strict";
    var ret = {};
    var foundSlash = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToDelayedTurn = xmlToDelayedTurn;
function xmlToInvertedTurn(node) {
    "use strict";
    var ret = {};
    var foundSlash = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToInvertedTurn = xmlToInvertedTurn;
function xmlToDelayedInvertedTurn(node) {
    "use strict";
    var ret = {};
    var foundSlash = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToDelayedInvertedTurn = xmlToDelayedInvertedTurn;
function xmlToVerticalTurn(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToVerticalTurn = xmlToVerticalTurn;
function xmlToShake(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToShake = xmlToShake;
function xmlToMordent(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "long") {
            var dataLong_ = xmlToYesNo(ch2);
            ret.long_ = dataLong_;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToMordent = xmlToMordent;
function xmlToInvertedMordent(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundStartNote = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundTrillStep = false;
    var foundTwoNoteTurn = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "long") {
            var dataLong_ = xmlToYesNo(ch2);
            ret.long_ = dataLong_;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            var dataStartNote = getUpperMainBelow(ch2, 0 /* Upper */);
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
            var dataTrillStep = getWholeHalfUnison(ch2, 0 /* Whole */);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            var dataTwoNoteTurn = getWholeHalfNone(ch2, 3 /* None */);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundStartNote) {
        ret.startNote = 0 /* Upper */;
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
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToInvertedMordent = xmlToInvertedMordent;
function xmlToSchleifer(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToSchleifer = xmlToSchleifer;
function xmlToTremolo(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopSingle(ch2, 3 /* Single */);
            ret.type = dataType;
            foundType = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, false);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundType) {
        ret.type = 3 /* Single */;
    }
    return ret;
}
exports.xmlToTremolo = xmlToTremolo;
function xmlToOtherOrnament(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOtherOrnament = xmlToOtherOrnament;
function xmlToAccidentalMark(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataMark = getString(ch3, true);
    ret.mark = dataMark;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToAccidentalMark = xmlToAccidentalMark;
function xmlToTechnical(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataString_ = xmlToString(ch);
            ret.string_ = dataString_;
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
exports.xmlToTechnical = xmlToTechnical;
function xmlToUpBow(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToUpBow = xmlToUpBow;
function xmlToDownBow(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToDownBow = xmlToDownBow;
function xmlToHarmonic(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHarmonic = xmlToHarmonic;
function xmlToOpenString(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOpenString = xmlToOpenString;
function xmlToThumbPosition(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToThumbPosition = xmlToThumbPosition;
function xmlToPluck(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToPluck = xmlToPluck;
function xmlToDoubleTongue(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToDoubleTongue = xmlToDoubleTongue;
function xmlToTripleTongue(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToTripleTongue = xmlToTripleTongue;
function xmlToStopped(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToStopped = xmlToStopped;
function xmlToSnapPizzicato(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToSnapPizzicato = xmlToSnapPizzicato;
function xmlToHammerOn(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
        ret.number_ = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHammerOn = xmlToHammerOn;
function xmlToPullOff(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
        ret.number_ = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToPullOff = xmlToPullOff;
function xmlToBend(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundAccelerate = false;
    var foundBeats = false;
    var foundLastBeat = false;
    var foundSecondBeat = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
        if (ch2.name === "second-beat") {
            var dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
exports.xmlToBend = xmlToBend;
function xmlToWithBar(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToWithBar = xmlToWithBar;
function xmlToTap(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToTap = xmlToTap;
function xmlToHeel(node) {
    "use strict";
    var ret = {};
    var foundSubstitution = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHeel = xmlToHeel;
function xmlToToe(node) {
    "use strict";
    var ret = {};
    var foundSubstitution = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToToe = xmlToToe;
function xmlToFingernails(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToFingernails = xmlToFingernails;
function xmlToHole(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHole = xmlToHole;
(function (HoleLocation) {
    HoleLocation[HoleLocation["Right"] = 0] = "Right";
    HoleLocation[HoleLocation["Top"] = 3] = "Top";
    HoleLocation[HoleLocation["Bottom"] = 1] = "Bottom";
    HoleLocation[HoleLocation["Left"] = 2] = "Left";
})(exports.HoleLocation || (exports.HoleLocation = {}));
var HoleLocation = exports.HoleLocation;
function getHoleLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 0 /* Right */;
    }
    if (s == "top") {
        return 3 /* Top */;
    }
    if (s == "bottom") {
        return 1 /* Bottom */;
    }
    if (s == "left") {
        return 2 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getHoleLocation = getHoleLocation;
(function (HoleClosedType) {
    HoleClosedType[HoleClosedType["No"] = 1] = "No";
    HoleClosedType[HoleClosedType["Yes"] = 0] = "Yes";
    HoleClosedType[HoleClosedType["Half"] = 2] = "Half";
})(exports.HoleClosedType || (exports.HoleClosedType = {}));
var HoleClosedType = exports.HoleClosedType;
function getHoleClosedType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "no") {
        return 1 /* No */;
    }
    if (s == "yes") {
        return 0 /* Yes */;
    }
    if (s == "half") {
        return 2 /* Half */;
    }
    assert(false, "Not reached");
}
exports.getHoleClosedType = getHoleClosedType;
function xmlToHoleClosed(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToHoleClosed = xmlToHoleClosed;
function xmlToArrow(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToArrow = xmlToArrow;
function xmlToHandbell(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHandbell = xmlToHandbell;
function xmlToOtherTechnical(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOtherTechnical = xmlToOtherTechnical;
function xmlToArticulations(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToArticulations = xmlToArticulations;
function xmlToAccent(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToAccent = xmlToAccent;
function xmlToStrongAccent(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataType = getUpDown(ch2, 0 /* Up */);
            ret.type = dataType;
            foundType = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundType) {
        ret.type = 0 /* Up */;
    }
    return ret;
}
exports.xmlToStrongAccent = xmlToStrongAccent;
function xmlToStaccato(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToStaccato = xmlToStaccato;
function xmlToTenuto(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToTenuto = xmlToTenuto;
function xmlToDetachedLegato(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToDetachedLegato = xmlToDetachedLegato;
function xmlToStaccatissimo(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToStaccatissimo = xmlToStaccatissimo;
function xmlToSpiccato(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToSpiccato = xmlToSpiccato;
function xmlToScoop(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToScoop = xmlToScoop;
function xmlToPlop(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToPlop = xmlToPlop;
function xmlToDoit(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToDoit = xmlToDoit;
function xmlToFalloff(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToFalloff = xmlToFalloff;
(function (BreathMarkType) {
    BreathMarkType[BreathMarkType["Empty"] = 2] = "Empty";
    BreathMarkType[BreathMarkType["Comma"] = 0] = "Comma";
    BreathMarkType[BreathMarkType["Tick"] = 1] = "Tick";
})(exports.BreathMarkType || (exports.BreathMarkType = {}));
var BreathMarkType = exports.BreathMarkType;
function getBreathMarkType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "") {
        return 2 /* Empty */;
    }
    if (s == "comma") {
        return 0 /* Comma */;
    }
    if (s == "tick") {
        return 1 /* Tick */;
    }
    assert(false, "Not reached");
}
exports.getBreathMarkType = getBreathMarkType;
function xmlToBreathMark(node) {
    "use strict";
    var ret = {};
    var foundLineShape = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            var dataLineShape = getStraightCurved(ch2, 0 /* Straight */);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataType = getBreathMarkType(ch3, null);
    ret.type = dataType;
    if (!foundLineShape) {
        ret.lineShape = 0 /* Straight */;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToBreathMark = xmlToBreathMark;
function xmlToCaesura(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToCaesura = xmlToCaesura;
function xmlToStress(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToStress = xmlToStress;
function xmlToUnstress(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToUnstress = xmlToUnstress;
function xmlToOtherArticulation(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToOtherArticulation = xmlToOtherArticulation;
function xmlToArpeggiate(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundDirection = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "direction") {
            var dataDirection = getUpDown(ch2, 0 /* Up */);
            ret.direction = dataDirection;
            foundDirection = true;
        }
    }
    if (!foundNumber_) {
        ret.number_ = 1;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundDirection) {
        ret.direction = 0 /* Up */;
    }
    return ret;
}
exports.xmlToArpeggiate = xmlToArpeggiate;
function xmlToNonArpeggiate(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundPlacement = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
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
        ret.number_ = 1;
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
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToNonArpeggiate = xmlToNonArpeggiate;
function xmlToLaughing(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToLaughing = xmlToLaughing;
function xmlToHumming(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToHumming = xmlToHumming;
function xmlToEndLine(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToEndLine = xmlToEndLine;
function xmlToEndParagraph(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToEndParagraph = xmlToEndParagraph;
function xmlToLyricParts(node) {
    "use strict";
    var rarr = [];
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "extend") {
            var data = xmlToExtend(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Extend";
        }
        if (ch.nodeName === "end-line") {
            var data = xmlToEndLine(ch);
            rarr = (rarr || []).concat(data);
            data._class = "EndLine";
        }
        if (ch.nodeName === "syllabic") {
            var data = xmlToSyllabic(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Syllabic";
        }
        if (ch.nodeName === "text") {
            var data = xmlToText(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Text";
        }
        if (ch.nodeName === "laughing") {
            var data = xmlToLaughing(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Laughing";
        }
        if (ch.nodeName === "humming") {
            var data = xmlToHumming(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Humming";
        }
        if (ch.nodeName === "end-paragraph") {
            var data = xmlToEndParagraph(ch);
            rarr = (rarr || []).concat(data);
            data._class = "EndParagraph";
        }
        if (ch.nodeName === "elision") {
            var data = xmlToElision(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Elision";
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return rarr;
}
exports.xmlToLyricParts = xmlToLyricParts;
function xmlToText(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundUnderline = false;
    var foundOverline = false;
    var foundLineThrough = false;
    var foundRotation = false;
    var foundLetterSpacing = false;
    var foundDir = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
        ret.dir = 0 /* Ltr */;
    }
    return ret;
}
exports.xmlToText = xmlToText;
(function (SyllabicType) {
    SyllabicType[SyllabicType["Single"] = 0] = "Single";
    SyllabicType[SyllabicType["Begin"] = 1] = "Begin";
    SyllabicType[SyllabicType["Middle"] = 3] = "Middle";
    SyllabicType[SyllabicType["End"] = 2] = "End";
})(exports.SyllabicType || (exports.SyllabicType = {}));
var SyllabicType = exports.SyllabicType;
function getSyllabicType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return 0 /* Single */;
    }
    if (s == "begin") {
        return 1 /* Begin */;
    }
    if (s == "middle") {
        return 3 /* Middle */;
    }
    if (s == "end") {
        return 2 /* End */;
    }
    assert(false, "Not reached");
}
exports.getSyllabicType = getSyllabicType;
function xmlToSyllabic(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToSyllabic = xmlToSyllabic;
function xmlToElision(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToElision = xmlToElision;
function xmlToExtend(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStopContinue(ch2, 0 /* Start */);
            ret.type = dataType;
            foundType = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = 0 /* Start */;
    }
    return ret;
}
exports.xmlToExtend = xmlToExtend;
function xmlToFiguredBass(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
    var foundParentheses = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
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
    return ret;
}
exports.xmlToFiguredBass = xmlToFiguredBass;
function xmlToFigure(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToFigure = xmlToFigure;
function xmlToPrefix(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToPrefix = xmlToPrefix;
function xmlToFigureNumber(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToFigureNumber = xmlToFigureNumber;
function xmlToSuffix(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToSuffix = xmlToSuffix;
function xmlToBackup(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    return ret;
}
exports.xmlToBackup = xmlToBackup;
function xmlToForward(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getString(ch, true);
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
            var dataStaff = xmlToStaff(ch);
            ret.staff = dataStaff;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToForward = xmlToForward;
(function (BarlineLocation) {
    BarlineLocation[BarlineLocation["Right"] = 1] = "Right";
    BarlineLocation[BarlineLocation["Middle"] = 2] = "Middle";
    BarlineLocation[BarlineLocation["Left"] = 0] = "Left";
})(exports.BarlineLocation || (exports.BarlineLocation = {}));
var BarlineLocation = exports.BarlineLocation;
function getBarlineLocation(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 1 /* Right */;
    }
    if (s == "middle") {
        return 2 /* Middle */;
    }
    if (s == "left") {
        return 0 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getBarlineLocation = getBarlineLocation;
function xmlToBarline(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataDivisions = getString(ch2, true);
            ret.divisions = dataDivisions;
        }
    }
    return ret;
}
exports.xmlToBarline = xmlToBarline;
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
})(exports.BarStyleType || (exports.BarStyleType = {}));
var BarStyleType = exports.BarStyleType;
function getBarStyleType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "regular") {
        return 0 /* Regular */;
    }
    if (s == "light-heavy") {
        return 5 /* LightHeavy */;
    }
    if (s == "heavy-light") {
        return 6 /* HeavyLight */;
    }
    if (s == "short") {
        return 9 /* Short */;
    }
    if (s == "none") {
        return 10 /* None */;
    }
    if (s == "dashed") {
        return 2 /* Dashed */;
    }
    if (s == "heavy-heavy") {
        return 7 /* HeavyHeavy */;
    }
    if (s == "tick") {
        return 8 /* Tick */;
    }
    if (s == "dotted") {
        return 1 /* Dotted */;
    }
    if (s == "heavy") {
        return 3 /* Heavy */;
    }
    if (s == "light-light") {
        return 4 /* LightLight */;
    }
    assert(false, "Not reached");
}
exports.getBarStyleType = getBarStyleType;
function xmlToBarStyle(node) {
    "use strict";
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToBarStyle = xmlToBarStyle;
(function (StartStopDiscontinue) {
    StartStopDiscontinue[StartStopDiscontinue["Discontinue"] = 2] = "Discontinue";
    StartStopDiscontinue[StartStopDiscontinue["Start"] = 0] = "Start";
    StartStopDiscontinue[StartStopDiscontinue["Stop"] = 1] = "Stop";
})(exports.StartStopDiscontinue || (exports.StartStopDiscontinue = {}));
var StartStopDiscontinue = exports.StartStopDiscontinue;
function getStartStopDiscontinue(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "discontinue") {
        return 2 /* Discontinue */;
    }
    if (s == "start") {
        return 0 /* Start */;
    }
    if (s == "stop") {
        return 1 /* Stop */;
    }
    assert(false, "Not reached");
}
exports.getStartStopDiscontinue = getStartStopDiscontinue;
function xmlToEnding(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToEnding = xmlToEnding;
(function (WingedType) {
    WingedType[WingedType["None"] = 0] = "None";
    WingedType[WingedType["Curved"] = 2] = "Curved";
    WingedType[WingedType["DoubleCurved"] = 4] = "DoubleCurved";
    WingedType[WingedType["Straight"] = 1] = "Straight";
    WingedType[WingedType["DoubleStraight"] = 3] = "DoubleStraight";
})(exports.WingedType || (exports.WingedType = {}));
var WingedType = exports.WingedType;
function getWingedType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 0 /* None */;
    }
    if (s == "curved") {
        return 2 /* Curved */;
    }
    if (s == "double-curved") {
        return 4 /* DoubleCurved */;
    }
    if (s == "straight") {
        return 1 /* Straight */;
    }
    if (s == "double-straight") {
        return 3 /* DoubleStraight */;
    }
    assert(false, "Not reached");
}
exports.getWingedType = getWingedType;
(function (DirectionTypeBg) {
    DirectionTypeBg[DirectionTypeBg["Forward"] = 1] = "Forward";
    DirectionTypeBg[DirectionTypeBg["Backward"] = 0] = "Backward";
})(exports.DirectionTypeBg || (exports.DirectionTypeBg = {}));
var DirectionTypeBg = exports.DirectionTypeBg;
function getDirectionTypeBg(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "forward") {
        return 1 /* Forward */;
    }
    if (s == "backward") {
        return 0 /* Backward */;
    }
    assert(false, "Not reached");
}
exports.getDirectionTypeBg = getDirectionTypeBg;
function xmlToRepeat(node) {
    "use strict";
    var ret = {};
    var foundWinged = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "times") {
            var dataTimes = getString(ch2, true);
            ret.times = dataTimes;
        }
        if (ch2.name === "winged") {
            var dataWinged = getWingedType(ch2, 0 /* None */);
            ret.winged = dataWinged;
            foundWinged = true;
        }
        if (ch2.name === "direction") {
            var dataDirection = getDirectionTypeBg(ch2, null);
            ret.direction = dataDirection;
        }
    }
    if (!foundWinged) {
        ret.winged = 0 /* None */;
    }
    return ret;
}
exports.xmlToRepeat = xmlToRepeat;
(function (TipDirection) {
    TipDirection[TipDirection["Right"] = 3] = "Right";
    TipDirection[TipDirection["Northwest"] = 4] = "Northwest";
    TipDirection[TipDirection["Southwest"] = 7] = "Southwest";
    TipDirection[TipDirection["Down"] = 1] = "Down";
    TipDirection[TipDirection["Northeast"] = 5] = "Northeast";
    TipDirection[TipDirection["Southeast"] = 6] = "Southeast";
    TipDirection[TipDirection["Up"] = 0] = "Up";
    TipDirection[TipDirection["Left"] = 2] = "Left";
})(exports.TipDirection || (exports.TipDirection = {}));
var TipDirection = exports.TipDirection;
function getTipDirection(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return 3 /* Right */;
    }
    if (s == "northwest") {
        return 4 /* Northwest */;
    }
    if (s == "southwest") {
        return 7 /* Southwest */;
    }
    if (s == "down") {
        return 1 /* Down */;
    }
    if (s == "northeast") {
        return 5 /* Northeast */;
    }
    if (s == "southeast") {
        return 6 /* Southeast */;
    }
    if (s == "up") {
        return 0 /* Up */;
    }
    if (s == "left") {
        return 2 /* Left */;
    }
    assert(false, "Not reached");
}
exports.getTipDirection = getTipDirection;
function xmlToDirection(node) {
    "use strict";
    var ret = {};
    var foundPlacement = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "voice") {
            var dataVoice = getString(ch, true);
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
            var dataStaff = xmlToStaff(ch);
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
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDirection = xmlToDirection;
function xmlToDirectionType(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToDirectionType = xmlToDirectionType;
function xmlToRehearsal(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToRehearsal = xmlToRehearsal;
function xmlToWords(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToWords = xmlToWords;
(function (WedgeType) {
    WedgeType[WedgeType["Diminuendo"] = 1] = "Diminuendo";
    WedgeType[WedgeType["Crescendo"] = 0] = "Crescendo";
    WedgeType[WedgeType["Stop"] = 2] = "Stop";
    WedgeType[WedgeType["Continue"] = 3] = "Continue";
})(exports.WedgeType || (exports.WedgeType = {}));
var WedgeType = exports.WedgeType;
function getWedgeType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "diminuendo") {
        return 1 /* Diminuendo */;
    }
    if (s == "crescendo") {
        return 0 /* Crescendo */;
    }
    if (s == "stop") {
        return 2 /* Stop */;
    }
    if (s == "continue") {
        return 3 /* Continue */;
    }
    assert(false, "Not reached");
}
exports.getWedgeType = getWedgeType;
function xmlToWedge(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundNeinte = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "neinte") {
            var dataNeinte = xmlToYesNo(ch2);
            ret.neinte = dataNeinte;
            foundNeinte = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
        ret.number_ = 1;
    }
    if (!foundNeinte) {
        ret.neinte = false;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToWedge = xmlToWedge;
function xmlToDashes(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
        ret.number_ = 1;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDashes = xmlToDashes;
(function (LineEndType) {
    LineEndType[LineEndType["None"] = 4] = "None";
    LineEndType[LineEndType["Both"] = 2] = "Both";
    LineEndType[LineEndType["Arrow"] = 3] = "Arrow";
    LineEndType[LineEndType["Down"] = 1] = "Down";
    LineEndType[LineEndType["Up"] = 0] = "Up";
})(exports.LineEndType || (exports.LineEndType = {}));
var LineEndType = exports.LineEndType;
function getLineEndType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 4 /* None */;
    }
    if (s == "both") {
        return 2 /* Both */;
    }
    if (s == "arrow") {
        return 3 /* Arrow */;
    }
    if (s == "down") {
        return 1 /* Down */;
    }
    if (s == "up") {
        return 0 /* Up */;
    }
    assert(false, "Not reached");
}
exports.getLineEndType = getLineEndType;
function xmlToBracket(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "end-length") {
            var dataEndLength = getNumber(ch2, true);
            ret.endLength = dataEndLength;
        }
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            var dataLineType = getSolidDashedDottedWavy(ch2, 0 /* Solid */);
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
        ret.number_ = 1;
    }
    if (!foundLineType) {
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToBracket = xmlToBracket;
(function (PedalType) {
    PedalType[PedalType["Change"] = 3] = "Change";
    PedalType[PedalType["Start"] = 0] = "Start";
    PedalType[PedalType["Stop"] = 1] = "Stop";
    PedalType[PedalType["Continue"] = 2] = "Continue";
})(exports.PedalType || (exports.PedalType = {}));
var PedalType = exports.PedalType;
function getPedalType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "change") {
        return 3 /* Change */;
    }
    if (s == "start") {
        return 0 /* Start */;
    }
    if (s == "stop") {
        return 1 /* Stop */;
    }
    if (s == "continue") {
        return 2 /* Continue */;
    }
    assert(false, "Not reached");
}
exports.getPedalType = getPedalType;
function xmlToPedal(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            var dataType = getPedalType(ch2, null);
            ret.type = dataType;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToPedal = xmlToPedal;
function xmlToMetronome(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            ret.beatUnit = dataBeatUnit;
        }
        if (ch.nodeName === "beat-unit-dot") {
            var dataBeatUnitDots = xmlToBeatUnitDot(ch);
            ret.beatUnitDots = (ret.beatUnitDots || []).concat(dataBeatUnitDots);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "parentheses") {
            var dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToMetronome = xmlToMetronome;
function xmlToBeatUnitDot(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToBeatUnitDot = xmlToBeatUnitDot;
function xmlToPerMinute(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    return ret;
}
exports.xmlToPerMinute = xmlToPerMinute;
function xmlToMetronomeNote(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToMetronomeNote = xmlToMetronomeNote;
function xmlToMetronomeDot(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToMetronomeDot = xmlToMetronomeDot;
function xmlToMetronomeBeam(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number_ = 1;
    }
    return ret;
}
exports.xmlToMetronomeBeam = xmlToMetronomeBeam;
function xmlToMetronomeTuplet(node) {
    "use strict";
    var ret = {};
    var foundBracket = false;
    var foundShowNumber = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "actual-notes") {
            var dataActualNotes = xmlToActualNotes(ch);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            var dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            var dataNormalNotes = xmlToNormalNotes(ch);
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
            var dataShowNumber = getActualBothNone(ch2, 1 /* Both */);
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
        ret.showNumber = 1 /* Both */;
    }
    return ret;
}
exports.xmlToMetronomeTuplet = xmlToMetronomeTuplet;
(function (OctaveShiftType) {
    OctaveShiftType[OctaveShiftType["Down"] = 2] = "Down";
    OctaveShiftType[OctaveShiftType["Stop"] = 3] = "Stop";
    OctaveShiftType[OctaveShiftType["Up"] = 1] = "Up";
    OctaveShiftType[OctaveShiftType["Continue"] = 4] = "Continue";
})(exports.OctaveShiftType || (exports.OctaveShiftType = {}));
var OctaveShiftType = exports.OctaveShiftType;
function getOctaveShiftType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return 2 /* Down */;
    }
    if (s == "stop") {
        return 3 /* Stop */;
    }
    if (s == "up") {
        return 1 /* Up */;
    }
    if (s == "continue") {
        return 4 /* Continue */;
    }
    assert(false, "Not reached");
}
exports.getOctaveShiftType = getOctaveShiftType;
function xmlToOctaveShift(node) {
    "use strict";
    var ret = {};
    var foundSize = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToOctaveShift = xmlToOctaveShift;
function xmlToHarpPedals(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToHarpPedals = xmlToHarpPedals;
function xmlToPedalTuning(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToPedalTuning = xmlToPedalTuning;
function xmlToDamp(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToDamp = xmlToDamp;
function xmlToDampAll(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToDampAll = xmlToDampAll;
function xmlToEyeglasses(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToEyeglasses = xmlToEyeglasses;
function xmlToStringMute(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            var dataType = getString(ch2, true);
            ret.type = dataType;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToStringMute = xmlToStringMute;
function xmlToScordatura(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToScordatura = xmlToScordatura;
function xmlToAccord(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "tuning-alter") {
            var dataTuningAlter = xmlToTuningAlter(ch);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            var dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            var dataTuningOctave = xmlToTuningOctave(ch);
            ret.tuningOctave = dataTuningOctave;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "string") {
            var dataString_ = getString(ch2, true);
            ret.string_ = dataString_;
        }
    }
    return ret;
}
exports.xmlToAccord = xmlToAccord;
function xmlToImage(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign-image") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToImage = xmlToImage;
(function (VoiceSymbol) {
    VoiceSymbol[VoiceSymbol["None"] = 4] = "None";
    VoiceSymbol[VoiceSymbol["Hauptstimme"] = 1] = "Hauptstimme";
    VoiceSymbol[VoiceSymbol["Nebenstimme"] = 2] = "Nebenstimme";
    VoiceSymbol[VoiceSymbol["Plain"] = 3] = "Plain";
})(exports.VoiceSymbol || (exports.VoiceSymbol = {}));
var VoiceSymbol = exports.VoiceSymbol;
function getVoiceSymbol(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return 4 /* None */;
    }
    if (s == "Hauptstimme") {
        return 1 /* Hauptstimme */;
    }
    if (s == "Nebenstimme") {
        return 2 /* Nebenstimme */;
    }
    if (s == "plain") {
        return 3 /* Plain */;
    }
    assert(false, "Not reached");
}
exports.getVoiceSymbol = getVoiceSymbol;
function xmlToPrincipalVoice(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToPrincipalVoice = xmlToPrincipalVoice;
function xmlToAccordionRegistration(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToAccordionRegistration = xmlToAccordionRegistration;
function xmlToPercussion(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    var foundEnclosure = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToPercussion = xmlToPercussion;
function xmlToTimpani(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToTimpani = xmlToTimpani;
function xmlToBeater(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToBeater = xmlToBeater;
function xmlToStick(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToStick = xmlToStick;
function xmlToOffset(node) {
    "use strict";
    var ret = {};
    var foundSound = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToOffset = xmlToOffset;
function xmlToHarmonyChord(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "root") {
            var dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            var dataFunction_ = xmlToFunction(ch);
            ret.function_ = dataFunction_;
        }
        if (ch.nodeName === "kind") {
            var dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            var dataDegree = xmlToDegree(ch);
            ret.degree = dataDegree;
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
exports.xmlToHarmonyChord = xmlToHarmonyChord;
(function (ExplicitImpliedAlternate) {
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Explicit"] = 1] = "Explicit";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Implied"] = 2] = "Implied";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Alternate"] = 3] = "Alternate";
})(exports.ExplicitImpliedAlternate || (exports.ExplicitImpliedAlternate = {}));
var ExplicitImpliedAlternate = exports.ExplicitImpliedAlternate;
function getExplicitImpliedAlternate(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "explicit") {
        return 1 /* Explicit */;
    }
    if (s == "implied") {
        return 2 /* Implied */;
    }
    if (s == "alternate") {
        return 3 /* Alternate */;
    }
    assert(false, "Not reached");
}
exports.getExplicitImpliedAlternate = getExplicitImpliedAlternate;
function xmlToHarmony(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "frame") {
            var dataFrame = xmlToFrame(ch);
            ret.frame = dataFrame;
        }
        if (ch.nodeName === "root") {
            var dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            var dataFunction_ = xmlToFunction(ch);
            ret.function_ = dataFunction_;
        }
        if (ch.nodeName === "kind") {
            var dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            var dataDegree = xmlToDegree(ch);
            ret.degree = dataDegree;
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
            var dataStaff = xmlToStaff(ch);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            var dataHarmonyType = getExplicitImpliedAlternate(ch2, null);
            ret.harmonyType = dataHarmonyType;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
exports.xmlToHarmony = xmlToHarmony;
function xmlToRoot(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToRoot = xmlToRoot;
function xmlToRootStep(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToRootStep = xmlToRootStep;
function xmlToRootAlter(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToRootAlter = xmlToRootAlter;
function xmlToFunction(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToFunction = xmlToFunction;
function xmlToKind(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToKind = xmlToKind;
function xmlToInversion(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToInversion = xmlToInversion;
function xmlToBass(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToBass = xmlToBass;
function xmlToBassStep(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToBassStep = xmlToBassStep;
function xmlToBassAlter(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToBassAlter = xmlToBassAlter;
function xmlToDegree(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToDegree = xmlToDegree;
(function (ChordType) {
    ChordType[ChordType["Augmented"] = 3] = "Augmented";
    ChordType[ChordType["Diminished"] = 4] = "Diminished";
    ChordType[ChordType["Major"] = 1] = "Major";
    ChordType[ChordType["Minor"] = 2] = "Minor";
    ChordType[ChordType["HalfDiminished"] = 5] = "HalfDiminished";
})(exports.ChordType || (exports.ChordType = {}));
var ChordType = exports.ChordType;
function getChordType(node, fallbackVal) {
    "use strict";
    var s = (node.nodeType === node.ATTRIBUTE_NODE ? node.value : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "augmented") {
        return 3 /* Augmented */;
    }
    if (s == "diminished") {
        return 4 /* Diminished */;
    }
    if (s == "major") {
        return 1 /* Major */;
    }
    if (s == "minor") {
        return 2 /* Minor */;
    }
    if (s == "half-diminished") {
        return 5 /* HalfDiminished */;
    }
    assert(false, "Not reached");
}
exports.getChordType = getChordType;
function xmlToDegreeValue(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDegreeValue = xmlToDegreeValue;
function xmlToDegreeAlter(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDegreeAlter = xmlToDegreeAlter;
function xmlToDegreeType(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToDegreeType = xmlToDegreeType;
function xmlToFrame(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign-image") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToFrame = xmlToFrame;
function xmlToFirstFret(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToFirstFret = xmlToFirstFret;
function xmlToFrameNote(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "barre") {
            var dataBarre = xmlToBarre(ch);
            ret.barre = dataBarre;
        }
        if (ch.nodeName === "string") {
            var dataString_ = xmlToString(ch);
            ret.string_ = dataString_;
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
exports.xmlToFrameNote = xmlToFrameNote;
function xmlToBarre(node) {
    "use strict";
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToBarre = xmlToBarre;
function xmlToGrouping(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "feature") {
            var dataFeatures = xmlToFeature(ch);
            ret.features = (ret.features || []).concat(dataFeatures);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            var dataGroupingType = getStartStopSingle(ch2, null);
            ret.groupingType = dataGroupingType;
        }
        if (ch2.name === "member-of") {
            var dataMemberOf = getString(ch2, true);
            ret.memberOf = dataMemberOf;
        }
    }
    if (!foundNumber_) {
        ret.number_ = 1;
    }
    return ret;
}
exports.xmlToGrouping = xmlToGrouping;
function xmlToFeature(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToFeature = xmlToFeature;
function xmlToPrint(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    return ret;
}
exports.xmlToPrint = xmlToPrint;
function xmlToMeasureNumbering(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToMeasureNumbering = xmlToMeasureNumbering;
function xmlToSound(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "midi-instrument") {
            var dataMidiInstrument = xmlToMidiInstrument(ch);
            ret.midiInstrument = dataMidiInstrument;
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
            var dataMidiDevice = xmlToMidiDevice(ch);
            ret.midiDevice = dataMidiDevice;
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "soft-pedal") {
            var dataSoftPedal = xmlToYesNo(ch2);
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
            var dataDivisions = getString(ch2, true);
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
            var dataDamperPedal = xmlToYesNo(ch2);
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
            var dataSostenutoPedal = xmlToYesNo(ch2);
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
    return ret;
}
exports.xmlToSound = xmlToSound;
function xmlToWork(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToWork = xmlToWork;
function xmlToOpus(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToOpus = xmlToOpus;
function xmlToDefaults(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToDefaults = xmlToDefaults;
function xmlToMusicFont(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    return ret;
}
exports.xmlToMusicFont = xmlToMusicFont;
function xmlToWordFont(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    return ret;
}
exports.xmlToWordFont = xmlToWordFont;
function xmlToLyricFont(node) {
    "use strict";
    var ret = {};
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    return ret;
}
exports.xmlToLyricFont = xmlToLyricFont;
function xmlToLyricLanguage(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    return ret;
}
exports.xmlToLyricLanguage = xmlToLyricLanguage;
function xmlToCredit(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "credit-type") {
            var dataCreditTypes = getString(ch, true);
            ret.creditTypes = (ret.creditTypes || []).concat(dataCreditTypes);
        }
        if (ch.nodeName === "credit-words") {
            var dataCreditWords = xmlToCreditWords(ch);
            ret.creditWords = (ret.creditWords || []).concat(dataCreditWords);
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
    return ret;
}
exports.xmlToCredit = xmlToCredit;
function xmlToCreditWords(node) {
    "use strict";
    var ret = {};
    var foundJustify = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            var dataValign = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
            var dataDir = getDirectionMode(ch2, 0 /* Ltr */);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            var dataEnclosure = getEnclosureShape(ch2, 7 /* None */);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    var ch3 = node;
    var dataWords = getString(ch3, true);
    ret.words = dataWords;
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValign) {
        ret.valign = 2 /* Bottom */;
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
        ret.dir = 0 /* Ltr */;
    }
    if (!foundEnclosure) {
        ret.enclosure = 7 /* None */;
    }
    return ret;
}
exports.xmlToCreditWords = xmlToCreditWords;
function xmlToCreditImage(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundHalign = false;
    var foundValignImage = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
        if (ch2.name === "halign") {
            var dataHalign = getLeftCenterRight(ch2, (ret.justify || 0 /* Left */));
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign-image") {
            var dataValignImage = getTopMiddleBottomBaseline(ch2, 2 /* Bottom */);
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
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
exports.xmlToCreditImage = xmlToCreditImage;
function xmlToPartList(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "score-part") {
            var dataScoreParts = xmlToScorePart(ch);
            ret.scoreParts = (ret.scoreParts || []).concat(dataScoreParts);
        }
        if (ch.nodeName === "part-group") {
            var dataPartGroups = xmlToPartGroup(ch);
            ret.partGroups = (ret.partGroups || []).concat(dataPartGroups);
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToPartList = xmlToPartList;
function xmlToScorePart(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToScorePart = xmlToScorePart;
function xmlToPartName(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataPartName = getString(ch3, true);
    ret.partName = dataPartName;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToPartName = xmlToPartName;
function xmlToPartAbbreviation(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
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
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataAbbreviation = getString(ch3, true);
    ret.abbreviation = dataAbbreviation;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToPartAbbreviation = xmlToPartAbbreviation;
function xmlToPartGroup(node) {
    "use strict";
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataNumber_ = getNumber(ch2, true);
            ret.number_ = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            var dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number_ = 1;
    }
    return ret;
}
exports.xmlToPartGroup = xmlToPartGroup;
function xmlToGroupName(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataName = getString(ch3, true);
    ret.name = dataName;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToGroupName = xmlToGroupName;
function xmlToGroupNameDisplay(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "display-text") {
            var dataDisplayTexts = xmlToDisplayText(ch);
            ret.displayTexts = (ret.displayTexts || []).concat(dataDisplayTexts);
        }
        if (ch.nodeName === "accidental-text") {
            var dataAccidentalTexts = xmlToAccidentalText(ch);
            ret.accidentalTexts = (ret.accidentalTexts || []).concat(dataAccidentalTexts);
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
exports.xmlToGroupNameDisplay = xmlToGroupNameDisplay;
function xmlToGroupAbbreviation(node) {
    "use strict";
    var ret = {};
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundFontFamily = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundFontSize = false;
    var foundColor = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
            var dataFontWeight = getNormalBold(ch2, 0 /* Normal */);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            var dataFontStyle = getNormalItalic(ch2, 0 /* Normal */);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            var dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
            foundFontSize = true;
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    var ch3 = node;
    var dataText = getString(ch3, true);
    ret.text = dataText;
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
    if (!foundFontFamily) {
        ret.fontFamily = "Alegreya, serif";
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundFontSize) {
        ret.fontSize = "small";
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
exports.xmlToGroupAbbreviation = xmlToGroupAbbreviation;
function xmlToGroupAbbreviationDisplay(node) {
    "use strict";
    var ret = {};
    var foundPrintObject = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "display-text") {
            var dataDisplayTexts = xmlToDisplayText(ch);
            ret.displayTexts = (ret.displayTexts || []).concat(dataDisplayTexts);
        }
        if (ch.nodeName === "accidental-text") {
            var dataAccidentalTexts = xmlToAccidentalText(ch);
            ret.accidentalTexts = (ret.accidentalTexts || []).concat(dataAccidentalTexts);
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
exports.xmlToGroupAbbreviationDisplay = xmlToGroupAbbreviationDisplay;
function xmlToGroupSymbol(node) {
    "use strict";
    var ret = {};
    var foundData = false;
    var foundDefaultX = false;
    var foundRelativeY = false;
    var foundDefaultY = false;
    var foundRelativeX = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
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
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    var ch3 = node;
    var dataData = getPartSymbolType(ch3, 0 /* None */);
    ret.data = dataData;
    if (!foundData) {
        ret.data = 0 /* None */;
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
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
exports.xmlToGroupSymbol = xmlToGroupSymbol;
function xmlToGroupBarline(node) {
    "use strict";
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToGroupBarline = xmlToGroupBarline;
function xmlToGroupTime(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToGroupTime = xmlToGroupTime;
function xmlToScoreInstrument(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToScoreInstrument = xmlToScoreInstrument;
function xmlToSolo(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
    }
    return ret;
}
exports.xmlToSolo = xmlToSolo;
function xmlToVirtualInstrument(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToVirtualInstrument = xmlToVirtualInstrument;
function xmlToScoreHeader(node) {
    "use strict";
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
exports.xmlToScoreHeader = xmlToScoreHeader;
function xmlToScoreTimewise(node) {
    "use strict";
    var ret = {};
    var foundVersion_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            var dataVersion_ = getString(ch2, true);
            ret.version_ = dataVersion_;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version_ = "1.0";
    }
    return ret;
}
exports.xmlToScoreTimewise = xmlToScoreTimewise;
function xmlToPart(node) {
    "use strict";
    var rarr = [];
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "note") {
            var data = xmlToNote(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Note";
        }
        if (ch.nodeName === "backup") {
            var data = xmlToBackup(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Backup";
        }
        if (ch.nodeName === "harmony") {
            var data = xmlToHarmony(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Harmony";
        }
        if (ch.nodeName === "forward") {
            var data = xmlToForward(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Forward";
        }
        if (ch.nodeName === "print") {
            var data = xmlToPrint(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Print";
        }
        if (ch.nodeName === "figured-bass") {
            var data = xmlToFiguredBass(ch);
            rarr = (rarr || []).concat(data);
            data._class = "FiguredBass";
        }
        if (ch.nodeName === "direction") {
            var data = xmlToDirection(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Direction";
        }
        if (ch.nodeName === "attributes") {
            var data = xmlToAttributes(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Attributes";
        }
        if (ch.nodeName === "sound") {
            var data = xmlToSound(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Sound";
        }
        if (ch.nodeName === "barline") {
            var data = xmlToBarline(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Barline";
        }
        if (ch.nodeName === "grouping") {
            var data = xmlToGrouping(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Grouping";
        }
    }
    for (var i = 0; i < node.attributes.length; ++i) {
        var ch2 = node.attributes[i];
        if (ch2.name === "id") {
            var data = getString(ch2, true);
            rarr = (rarr || []).concat(data);
        }
    }
    return rarr;
}
exports.xmlToPart = xmlToPart;
