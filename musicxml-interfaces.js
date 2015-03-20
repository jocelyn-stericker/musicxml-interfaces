/**
 * (C) Josh Netterfield <joshua@nettek.ca> 2015.
 * Part of the musicxml-interfaces <https://github.com/ripieno/musicxml-interfaces>.
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
/*---- Initialization and Utility ---------------------------------------------------------------*/
"use strict";
var process;
var isIE = typeof window !== "undefined" && "ActiveXObject" in window;
var isNode = typeof window === "undefined" || typeof process !== "undefined" && !process.browser;
var xmlToParttimeDoc;
(function init() {
    var parttimeXSLBuffer = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"> <xsl:output method=\"xml\" indent=\"yes\" encoding=\"UTF-8\" omit-xml-declaration=\"no\" standalone=\"no\" doctype-system=\"http://www.musicxml.org/dtds/timewise.dtd\" doctype-public=\"-//Recordare//DTD MusicXML 3.0 Timewise//EN\" /> <xsl:template match=\"/\"> <xsl:apply-templates select=\"./score-partwise\"/> <xsl:apply-templates select=\"./score-timewise\"/> </xsl:template> <xsl:template match=\"score-timewise\"> <xsl:copy-of select=\".\" /> </xsl:template> <xsl:template match=\"text()\"> <xsl:value-of select=\".\" /> </xsl:template> <xsl:template match=\"*|@*|comment()|processing-instruction()\"> <xsl:copy><xsl:apply-templates select=\"*|@*|comment()|processing-instruction()|text()\" /></xsl:copy> </xsl:template> <xsl:template match=\"score-partwise\"> <xsl:element name=\"score-timewise\"> <xsl:apply-templates select=\"@version[.!='1.0']\"/> <xsl:apply-templates select=\"work\"/> <xsl:apply-templates select=\"movement-number\"/> <xsl:apply-templates select=\"movement-title\"/> <xsl:apply-templates select=\"identification\"/> <xsl:apply-templates select=\"defaults\"/> <xsl:apply-templates select=\"credit\"/> <xsl:apply-templates select=\"part-list\"/> <xsl:for-each select=\"part[1]/measure\"> <xsl:letiable name=\"measure-number\"> <xsl:value-of select=\"@number\"/> </xsl:letiable> <xsl:element name=\"measure\"> <xsl:attribute name=\"number\"> <xsl:value-of select=\"$measure-number\"/> </xsl:attribute> <xsl:if test=\"@implicit[. = 'yes']\"> <xsl:attribute name=\"implicit\"> <xsl:value-of select=\"@implicit\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@non-controlling[. = 'yes']\"> <xsl:attribute name=\"non-controlling\"> <xsl:value-of select=\"@non-controlling\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@width\"> <xsl:attribute name=\"width\"> <xsl:value-of select=\"@width\"/> </xsl:attribute> </xsl:if> <xsl:for-each select=\"../../part/measure\"> <xsl:if test=\"@number=$measure-number\"> <xsl:element name=\"part\"> <xsl:attribute name=\"id\"> <xsl:value-of select=\"parent::part/@id\"/> </xsl:attribute> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>";
    if (isIE) {
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
            return (new DOMParser).parseFromString(xslProc.output, "text/xml");
        };
    }
    else if (isNode) {
        var DOMParser = require("xmldom").DOMParser;
        var spawnSync = require("child_process").spawnSync;
        xmlToParttimeDoc = function (str) {
            var res = spawnSync("xsltproc", [
                "--nonet",
                "./vendor/musicxml-dtd/parttime.xsl",
                "-"
            ], {
                input: str,
                env: {
                    "XML_CATALOG_FILES": "./vendor/musicxml-dtd/catalog.xml"
                }
            });
            if (res.error) {
                throw res.error;
            }
            return (new DOMParser).parseFromString(res.stdout.toString(), "text/xml");
        };
    }
    else {
        var parttimeXSLDoc = (new DOMParser).parseFromString(parttimeXSLBuffer, "text/xml");
        var parttimeXSLProcessor = new XSLTProcessor;
        parttimeXSLProcessor.importStylesheet(parttimeXSLDoc);
        xmlToParttimeDoc = function (str) {
            var dom = (new DOMParser).parseFromString(str, "text/xml");
            return parttimeXSLProcessor.transformToDocument(dom);
        };
    }
}());
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
function xmlToTextArray(node) {
    throw "xmlToTextArray not implemented";
    return null;
}
function toCamelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
/*---- Parsing ----------------------------------------------------------------------------------*/
function parse(documentString) {
    var dom = xmlToParttimeDoc(documentString);
    var json = xmlToScoreTimewise(dom.documentElement);
    return json;
}
exports.parse = parse;
function xmlToEncodingDate(node) {
    var text = getString(node, true);
    if (text.length < 10) {
        return null;
    }
    return {
        year: parseFloat(text.slice(0, 4)),
        month: parseFloat(text.slice(5, 7)),
        day: parseFloat(text.slice(8, 10))
    };
}
function xmlToMeasure(node) {
    var ret = {};
    var foundImplicit = false;
    var foundNonControlling = false;
    var foundNumber = false;
    var foundWidth = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "part") {
            var dataPart = xmlToPart(ch);
            ret.parts = ret.parts || {};
            ret.parts[ch.getAttribute("id")] = dataPart;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "number") {
            var dataNumber_ = getNumber(ch2, true);
            ret.number = dataNumber_;
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
        ret.number = 1;
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToDirectiveEntity(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "directive") {
            var dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    return ret;
}
function xmlToBezier(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    return ret;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
function xmlToColor(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToHalign(node) {
    var ret = {};
    var foundHalign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToValign(node) {
    var ret = {};
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToValignImage(node) {
    var ret = {};
    var foundValignImage = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToLetterSpacing(node) {
    var ret = {};
    var foundLetterSpacing = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToTextRotation(node) {
    var ret = {};
    var foundRotation = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToPrintStyle(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToLineShape(node) {
    var ret = {};
    var foundLineShape = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToDashedFormatting(node) {
    var ret = {};
    var foundDashLength = false;
    var foundSpaceLength = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToLevelDisplay(node) {
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToTrillSound(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.lastBeat = 24;
    }
    if (!foundTrillStep) {
        ret.trillStep = 0 /* Whole */;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = 3 /* None */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToEditorialVoice(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToLevel(node) {
    var ret = {};
    var foundBracket = false;
    var foundSize = false;
    var foundParentheses = false;
    var foundReference = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToFermata(node) {
    var ret = {};
    var foundShape = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = 0 /* Upright */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
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
function xmlToSegno(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToCoda(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToNormalDot(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToFingering(node) {
    var ret = {};
    var foundFinger = false;
    var foundSubstitution = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    var foundAlternate = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    var dataFinger = getNumber(ch3, false);
    ret.finger = dataFinger;
    if (!foundFinger) {
        ret.finger = -1;
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToFret(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToMidiDevice(node) {
    var ret = {};
    var foundDeviceName = false;
    var foundPort = false;
    var foundId = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        midiName: ""
    };
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        id: ""
    };
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
            var dataOtherPlay = xmlToOtherPlay(ch);
            ret.otherPlay = dataOtherPlay;
        }
        if (ch.nodeName === "semi-pitched") {
            var dataSemiPitched = getString(ch, true);
            ret.semiPitched = dataSemiPitched;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        type: ""
    };
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        millimeters: null
    };
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToPageMargins(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToPageLayout(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToSystemLayout(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToSystemMargins(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToSystemDividers(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToRightDivider(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToStaffLayout(node) {
    var ret = {};
    var foundNum = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "staff-distance") {
            var dataStaffDistance = getNumber(ch, true);
            ret.staffDistance = dataStaffDistance;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToMeasureLayout(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "measure-distance") {
            var dataMeasureDistance = getNumber(ch, true);
            ret.measureDistance = dataMeasureDistance;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToLineWidth(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToNoteSize(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
            ret.noteSizes[dataNoteSizes.type] = dataNoteSizes;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToCreator(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "miscellaneous-field") {
            var dataMiscellaneousFields = xmlToMiscellaneousField(ch);
            ret.miscellaneousFields = (ret.miscellaneousFields || []).concat(dataMiscellaneousFields);
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToIdentification(node) {
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
            var dataSource = getString(ch, true);
            ret.source = dataSource;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToSupports(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    ret.element = ret.element || "";
    ret.attribute = ret.attribute || "";
    ret.value = ret.value || "";
    ret.type = ret.type || "";
    return ret;
}
function xmlToEncoding(node) {
    var ret = {
        encodingDescriptions: [],
        encodingDate: null,
        supports: {},
        encoders: [],
        softwares: []
    };
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
            ret.supports = ret.supports || {};
            ret.supports[popFront(toCamelCase((dataSupports.element.length ? "_" : "") + dataSupports.element) + (dataSupports.attribute.length ? "_" : "") + toCamelCase(dataSupports.attribute))] = dataSupports;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToTimeSeparator(node) {
    var ret = {};
    var foundSeparator = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToTimeSymbol(node) {
    var ret = {};
    var foundSymbol = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToCancel(node) {
    var ret = {};
    var foundLocation = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToKeyOctave(node) {
    var ret = {};
    var foundCancel = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToInterchangeable(node) {
    var ret = {};
    var foundSymbol = false;
    var foundSeparator = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToPartSymbol(node) {
    var ret = {};
    var foundTopStaff = false;
    var foundColor = false;
    var foundBottomStaff = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
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
        ret.size = 1 /* Full */;
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "line") {
            var dataLine = getString(ch2, true);
            ret.line = dataLine;
        }
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToStaffDetails(node) {
    var ret = {};
    var foundShowFrets = false;
    var foundNumber_ = false;
    var foundPrintObject = false;
    var foundPrintSpacing = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "show-frets") {
            var dataShowFrets = getShowFretsType(ch2, 0 /* Numbers */);
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
        ret.showFrets = 0 /* Numbers */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToTranspose(node) {
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
            var dataDouble = xmlToDouble(ch);
            ret.double = dataDouble;
        }
        if (ch.nodeName === "chromatic") {
            var dataChromatic = getString(ch, true);
            ret.chromatic = dataChromatic;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSlashDot(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToMultipleRest(node) {
    var ret = {};
    var foundUseSymbols = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToAttributes(node) {
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
            var dataClefs = xmlToClef(ch);
            ret.clefs = (ret.clefs || []).concat(dataClefs);
        }
        if (ch.nodeName === "measure-style") {
            var dataMeasureStyle = xmlToMeasureStyle(ch);
            ret.measureStyle = dataMeasureStyle;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToCue(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToGrace(node) {
    var ret = {};
    var foundSlash = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToUnpitched(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToPitch(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToFullNote(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToRest(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    return fallbackVal;
}
function xmlToType(node) {
    var ret = {};
    var foundSize = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToDot(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
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
        return 191 /* TripleFlat */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToStem(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToNotehead(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
function xmlToBeam(node) {
    var ret = {};
    var foundRepeater = false;
    var foundNumber_ = false;
    var foundFan = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
    }
    if (!foundFan) {
        ret.fan = 2 /* None */;
    }
    return ret;
}
function xmlToNotations(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
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
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundOrientation) {
        ret.orientation = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
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
        ret.lineType = 0 /* Solid */;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundOrientation) {
        ret.orientation = 0 /* Unspecified */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToTuplet(node) {
    var ret = {};
    var foundBracket = false;
    var foundShowNumber = false;
    var foundLineShape = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundShowType) {
        ret.showType = 2 /* None */;
    }
    return ret;
}
function xmlToTupletActual(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToTupletNormal(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToTupletNumber(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    var foundNormal = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundNormal) {
        ret.normal = 1;
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
    var foundNormal = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    if (!foundNormal) {
        ret.normal = 1;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToSchleifer(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToOtherOrnament(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToAccidentalMark(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToTechnical(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToUpBow(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToDownBow(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToOpenString(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToThumbPosition(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToPluck(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToDoubleTongue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToTripleTongue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToStopped(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToSnapPizzicato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToTap(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToFingernails(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToHole(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
function xmlToHoleClosed(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToHandbell(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToOtherTechnical(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToArticulations(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToAccent(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToStaccato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToTenuto(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToDetachedLegato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToStaccatissimo(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToSpiccato(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToCaesura(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToStress(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToUnstress(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToOtherArticulation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToArpeggiate(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundPlacement = false;
    var foundColor = false;
    var foundDirection = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
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
function xmlToNonArpeggiate(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundPlacement = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToLaughing(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToHumming(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToEndLine(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToEndParagraph(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToLyricParts(node) {
    var rarr = [];
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "extend") {
            var data = xmlToExtend(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Extend";
        }
        if (ch.nodeName === "end-line") {
            var _data = xmlToEndLine(ch);
            rarr = (rarr || []).concat(_data);
            _data._class = "EndLine";
        }
        if (ch.nodeName === "syllabic") {
            var _data_1 = xmlToSyllabic(ch);
            rarr = (rarr || []).concat(_data_1);
            _data_1._class = "Syllabic";
        }
        if (ch.nodeName === "text") {
            var _data_2 = xmlToText(ch);
            rarr = (rarr || []).concat(_data_2);
            _data_2._class = "Text";
        }
        if (ch.nodeName === "laughing") {
            var _data_3 = xmlToLaughing(ch);
            rarr = (rarr || []).concat(_data_3);
            _data_3._class = "Laughing";
        }
        if (ch.nodeName === "humming") {
            var _data_4 = xmlToHumming(ch);
            rarr = (rarr || []).concat(_data_4);
            _data_4._class = "Humming";
        }
        if (ch.nodeName === "end-paragraph") {
            var _data_5 = xmlToEndParagraph(ch);
            rarr = (rarr || []).concat(_data_5);
            _data_5._class = "EndParagraph";
        }
        if (ch.nodeName === "elision") {
            var _data_6 = xmlToElision(ch);
            rarr = (rarr || []).concat(_data_6);
            _data_6._class = "Elision";
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    return fallbackVal;
}
function xmlToSyllabic(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToElision(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToExtend(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundType = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = 0 /* Start */;
    }
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToFigure(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        }
        if (ch2.name === "color") {
            var dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBackup(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToForward(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToBarline(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToBarStyle(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToEnding(node) {
    var ret = {};
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
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
    return fallbackVal;
}
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
    return fallbackVal;
}
function xmlToRepeat(node) {
    var ret = {};
    var foundWinged = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToDirection(node) {
    var ret = {};
    var foundPlacement = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "placement") {
            var dataPlacement = getAboveBelow(ch2, 0 /* Unspecified */);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "directive") {
            var dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToDirectionType(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "justify") {
            var dataJustify = getLeftCenterRight(ch2, 0 /* Left */);
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.lineType = 0 /* Solid */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToBracket(node) {
    var ret = {};
    var foundNumber_ = false;
    var foundLineType = false;
    var foundDashLength = false;
    var foundSpaceLength = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.lineType = 0 /* Solid */;
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
    return fallbackVal;
}
function xmlToPedal(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToBeatUnitDot(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToPerMinute(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
    }
    var ch3 = node;
    var dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    return ret;
}
function xmlToMetronomeNote(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToMetronomeDot(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToMetronomeBeam(node) {
    var ret = {};
    var foundNumber_ = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "pedal-tuning") {
            var dataPedalTunings = xmlToPedalTuning(ch);
            ret.pedalTunings = (ret.pedalTunings || []).concat(dataPedalTunings);
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToPedalTuning(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToDampAll(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToEyeglasses(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToStringMute(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToScordatura(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "accord") {
            var dataAccords = xmlToAccord(ch);
            ret.accords = (ret.accords || []).concat(dataAccords);
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToAccord(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
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
    return fallbackVal;
}
function xmlToPrincipalVoice(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToAccordionRegistration(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToPercussion(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToTimpani(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToBeater(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        "function": null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null
    };
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
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
        "function": null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null
    };
    var foundPrintObject = false;
    var foundFontWeight = false;
    var foundFontStyle = false;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
            ret.type = dataHarmonyType;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = 0 /* Unspecified */;
    }
    return ret;
}
function xmlToRoot(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToRootStep(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToInversion(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBass(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToBassStep(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegree(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return fallbackVal;
}
function xmlToDegreeValue(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToFirstFret(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToBarre(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "feature") {
            var dataFeatures = xmlToFeature(ch);
            ret.features = (ret.features || []).concat(dataFeatures);
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return ret;
}
function xmlToFeature(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
function xmlToMeasureNumbering(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundHalign = false;
    var foundValign = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToSound(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    return ret;
}
function xmlToWork(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToOpus(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToDefaults(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToMusicFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    return ret;
}
function xmlToWordFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    return ret;
}
function xmlToLyricFont(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "number") {
            var dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "font-family") {
            var dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
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
        }
        if (ch2.name === "name") {
            var dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    return ret;
}
function xmlToLyricLanguage(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    var foundCreditTypes = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "credit-type") {
            var dataCreditTypes = getString(ch, true);
            ret.creditTypes = (ret.creditTypes || []).concat(dataCreditTypes);
            foundCreditTypes = true;
        }
        if (ch.nodeName === "credit-words") {
            var dataCreditWords = xmlToCreditWords(ch);
            ret.creditWords = dataCreditWords;
        }
        if (ch.nodeName === "credit-image") {
            var dataCreditImage = xmlToCreditImage(ch);
            ret.creditImage = dataCreditImage;
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundHalign) {
        ret.halign = (ret.justify || 0 /* Left */);
    }
    if (!foundValignImage) {
        ret.valignImage = 2 /* Bottom */;
    }
    return ret;
}
function xmlToPartList(node) {
    var ret = {
        scoreParts: [],
        partGroups: []
    };
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToScorePart(node) {
    var ret = {
        identification: null,
        partNameDisplay: null,
        scoreInstruments: [],
        midiDevices: [],
        partName: null,
        partAbbreviationDisplay: null,
        partAbbreviation: null,
        groups: [],
        midiInstruments: [],
        id: ""
    };
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        fontSize: ""
    };
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToPartAbbreviation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundPrintObject = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
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
function xmlToPartGroup(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
function xmlToGroupAbbreviation(node) {
    var ret = {};
    var foundFontWeight = false;
    var foundFontStyle = false;
    var foundColor = false;
    var foundJustify = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    if (!foundFontWeight) {
        ret.fontWeight = 0 /* Normal */;
    }
    if (!foundFontStyle) {
        ret.fontStyle = 0 /* Normal */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = 0 /* Left */;
    }
    return ret;
}
function xmlToGroupSymbol(node) {
    var ret = {};
    var foundData = false;
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    var dataData = getPartSymbolType(ch3, 0 /* None */);
    ret.data = dataData;
    if (!foundData) {
        ret.data = 0 /* None */;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGroupBarline(node) {
    var ret = {};
    var foundColor = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
        id: ""
    };
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
        if (ch2.name === "id") {
            var dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToSolo(node) {
    var ret = {};
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToVirtualInstrument(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToScoreHeader(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return ret;
}
function xmlToScoreTimewise(node) {
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
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
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
exports.xmlToScoreTimewise = xmlToScoreTimewise;
function xmlToPart(node) {
    var rarr = [];
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "note") {
            var data = xmlToNote(ch);
            rarr = (rarr || []).concat(data);
            data._class = "Note";
        }
        if (ch.nodeName === "backup") {
            var _data = xmlToBackup(ch);
            rarr = (rarr || []).concat(_data);
            _data._class = "Backup";
        }
        if (ch.nodeName === "harmony") {
            var _data_1 = xmlToHarmony(ch);
            rarr = (rarr || []).concat(_data_1);
            _data_1._class = "Harmony";
        }
        if (ch.nodeName === "forward") {
            var _data_2 = xmlToForward(ch);
            rarr = (rarr || []).concat(_data_2);
            _data_2._class = "Forward";
        }
        if (ch.nodeName === "print") {
            var _data_3 = xmlToPrint(ch);
            rarr = (rarr || []).concat(_data_3);
            _data_3._class = "Print";
        }
        if (ch.nodeName === "figured-bass") {
            var _data_4 = xmlToFiguredBass(ch);
            rarr = (rarr || []).concat(_data_4);
            _data_4._class = "FiguredBass";
        }
        if (ch.nodeName === "direction") {
            var _data_5 = xmlToDirection(ch);
            rarr = (rarr || []).concat(_data_5);
            _data_5._class = "Direction";
        }
        if (ch.nodeName === "attributes") {
            var _data_6 = xmlToAttributes(ch);
            rarr = (rarr || []).concat(_data_6);
            _data_6._class = "Attributes";
        }
        if (ch.nodeName === "sound") {
            var _data_7 = xmlToSound(ch);
            rarr = (rarr || []).concat(_data_7);
            _data_7._class = "Sound";
        }
        if (ch.nodeName === "barline") {
            var _data_8 = xmlToBarline(ch);
            rarr = (rarr || []).concat(_data_8);
            _data_8._class = "Barline";
        }
        if (ch.nodeName === "grouping") {
            var _data_9 = xmlToGrouping(ch);
            rarr = (rarr || []).concat(_data_9);
            _data_9._class = "Grouping";
        }
    }
    for (var _i = 0; _i < node.attributes.length; ++_i) {
        var ch2 = node.attributes[_i];
    }
    return rarr;
}
exports.xmlToPart = xmlToPart;
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
            escaped += ("" + vals[i]).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/"/g, "&apos;");
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
    return (val !== undefined) && (val !== null) && (val !== "");
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
    return (_a = ["<scaling>\n", "\n</scaling>"], _a.raw = ["<scaling>\\n", "\\n</scaling>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function millimetersToXML(mm) {
    return (_a = ["<millimeters>", "</millimeters>"], _a.raw = ["<millimeters>", "</millimeters>"], xml(_a, mm));
    var _a;
}
function tenthsToXML(tenths) {
    return (_a = ["<tenths>", "</tenths>"], _a.raw = ["<tenths>", "</tenths>"], xml(_a, tenths));
    var _a;
}
function pageLayoutToXML(pageLayout) {
    // <!ELEMENT page-layout ((page-height, page-width)?,
    //     (page-margins, page-margins?)?)>
    // <!ELEMENT page-height %layout-tenths;>
    // <!ELEMENT page-width %layout-tenths;>
    var children = [];
    if (defined(pageLayout.pageHeight)) {
        children.push((_a = ["<page-height>", "</page-height>"], _a.raw = ["<page-height>", "</page-height>"], xml(_a, pageLayout.pageHeight)));
    }
    if (defined(pageLayout.pageWidth)) {
        children.push((_b = ["<page-width>", "</page-width>"], _b.raw = ["<page-width>", "</page-width>"], xml(_b, pageLayout.pageWidth)));
    }
    (pageLayout.pageMargins || []).forEach(function (pageMargins) {
        children.push(pageMarginsToXML(pageMargins));
    });
    return (_c = ["<page-layout>\n", "\n</page-layout>"], _c.raw = ["<page-layout>\\n", "\\n</page-layout>"], dangerous(_c, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c;
}
var oddEvenBothToXML = {
    2: "both",
    1: "even",
    0: "odd"
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
        attribs += (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], xml(_a, oddEvenBothToXML[pageMargins.type]));
    }
    return (_b = ["<page-margins", ">\n", "\n</page-margins>"], _b.raw = ["<page-margins", ">\\n", "\\n</page-margins>"], dangerous(_b, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
function hmarginsToXML(hmargins) {
    // <!ELEMENT left-margin %layout-tenths;>
    // <!ELEMENT right-margin %layout-tenths;>
    var children = [];
    if (defined(hmargins.leftMargin)) {
        children.push((_a = ["<left-margin>", "</left-margin>"], _a.raw = ["<left-margin>", "</left-margin>"], xml(_a, hmargins.leftMargin)));
    }
    if (defined(hmargins.rightMargin)) {
        children.push((_b = ["<right-margin>", "</right-margin>"], _b.raw = ["<right-margin>", "</right-margin>"], xml(_b, hmargins.rightMargin)));
    }
    return children;
    var _a, _b;
}
function vmarginsToXML(hmargins) {
    // <!ELEMENT top-margin %layout-tenths;>
    // <!ELEMENT bottom-margin %layout-tenths;>
    var children = [];
    if (defined(hmargins.topMargin)) {
        children.push((_a = ["<top-margin>", "</top-margin>"], _a.raw = ["<top-margin>", "</top-margin>"], xml(_a, hmargins.topMargin)));
    }
    if (defined(hmargins.bottomMargin)) {
        children.push((_b = ["<bottom-margin>", "</bottom-margin>"], _b.raw = ["<bottom-margin>", "</bottom-margin>"], xml(_b, hmargins.bottomMargin)));
    }
    return children;
    var _a, _b;
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
        children.push((_a = ["<system-distance>", "</system-distance>"], _a.raw = ["<system-distance>", "</system-distance>"], xml(_a, systemLayout.systemDistance)));
    }
    if (defined(systemLayout.topSystemDistance)) {
        children.push((_b = ["<top-system-distance>", "</top-system-distance>"], _b.raw = ["<top-system-distance>", "</top-system-distance>"], xml(_b, systemLayout.topSystemDistance)));
    }
    if (defined(systemLayout.systemDividers)) {
        children.push(systemDividersToXML(systemLayout.systemDividers));
    }
    return (_c = ["<system-layout>\n", "\n</system-layout>"], _c.raw = ["<system-layout>\\n", "\\n</system-layout>"], dangerous(_c, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c;
}
function systemMarginsToXML(systemMargins) {
    // <!ELEMENT system-margins (left-margin, right-margin)>
    var children = hmarginsToXML(systemMargins);
    return (_a = ["<system-margins>\n", "\n</system-margins>"], _a.raw = ["<system-margins>\\n", "\\n</system-margins>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
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
        children.push((_a = ["<left-divider", " />"], _a.raw = ["<left-divider", " />"], xml(_a, printObjectToXML(systemDividers.leftDivider) + printStyleAlignToXML(systemDividers.leftDivider))));
    }
    if (defined(systemDividers.rightDivider)) {
        children.push((_b = ["<right-divider", " />"], _b.raw = ["<right-divider", " />"], xml(_b, printObjectToXML(systemDividers.rightDivider) + printStyleAlignToXML(systemDividers.rightDivider))));
    }
    return (_c = ["<system-dividers>\n", "\n</system-dividers>"], _c.raw = ["<system-dividers>\\n", "\\n</system-dividers>"], dangerous(_c, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c;
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
    return (_a = ["<appearance>\n", "\n</appearance>"], _a.raw = ["<appearance>\\n", "\\n</appearance>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function lineWidthToXML(lineWidth) {
    // <!ELEMENT line-width %layout-tenths;>
    // <!ATTLIST line-width
    //     type CDATA #REQUIRED
    // >
    return (_a = ["<line-width type=\"", "\">", "</line-width>"], _a.raw = ["<line-width type=\"", "\">", "</line-width>"], xml(_a, lineWidth.type, lineWidth.tenths));
    var _a;
}
var cueGraceLargeToXML = {
    1: "grace",
    0: "cue",
    2: "large"
};
function noteSizeToXML(noteSize) {
    // <!ELEMENT note-size (#PCDATA)>
    // <!ATTLIST note-size
    //     type (cue | grace | large) #REQUIRED
    // >
    return (_a = ["<note-size type=\"", "\">", "</note-size>"], _a.raw = ["<note-size type=\"", "\">", "</note-size>"], xml(_a, cueGraceLargeToXML[noteSize.type], noteSize.size));
    var _a;
}
function distanceToXML(distance) {
    // <!ELEMENT distance %layout-tenths;>
    // <!ATTLIST distance
    //     type CDATA #REQUIRED
    // >
    return (_a = ["<distance type=\"", "\">", "</distance>"], _a.raw = ["<distance type=\"", "\">", "</distance>"], xml(_a, distance.type, distance.tenths));
    var _a;
}
function workToXML(work) {
    // <!ELEMENT work (work-number?, work-title?, opus?)>
    if (!work || (!work.workNumber && !work.workTitle)) {
        return (_a = ["<!-- no work metadata -->"], _a.raw = ["<!-- no work metadata -->"], xml(_a));
    }
    var children = [];
    if (defined(work.workNumber)) {
        // <!ELEMENT work-number (#PCDATA)>
        children.push((_b = ["<work-number>", "</work-number>"], _b.raw = ["<work-number>", "</work-number>"], xml(_b, work.workNumber)));
    }
    if (defined(work.workTitle)) {
        // <!ELEMENT work-title (#PCDATA)>
        children.push((_c = ["<work-title>", "</work-title>"], _c.raw = ["<work-title>", "</work-title>"], xml(_c, work.workTitle)));
    }
    if (defined(work.opus) && !!work.opus) {
        // <!ELEMENT opus EMPTY>
        // <!ATTLIST opus
        //     %link-attributes;
        //     >
        console.warn("link-attributes in <opus /> aren't implemented."); // TODO: IMPLEMENT link-attributes
        children.push((_d = ["<opus />"], _d.raw = ["<opus />"], dangerous(_d)));
    }
    return (_e = ["<work>\n", "\n</work>"], _e.raw = ["<work>\\n", "\\n</work>"], dangerous(_e, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c, _d, _e;
}
function movementNumberToXML(movementNumber) {
    // <!ELEMENT movement-number (#PCDATA)>
    if (!movementNumber) {
        return (_a = ["<!-- no movement-number metadata -->"], _a.raw = ["<!-- no movement-number metadata -->"], xml(_a));
    }
    return (_b = ["<movement-number>", "</movement-number>"], _b.raw = ["<movement-number>", "</movement-number>"], xml(_b, movementNumber));
    var _a, _b;
}
function movementTitleToXML(movementTitle) {
    // <!ELEMENT movement-title (#PCDATA)>
    if (!movementTitle) {
        return (_a = ["<!-- no movement-title metadata -->"], _a.raw = ["<!-- no movement-title metadata -->"], xml(_a));
    }
    return (_b = ["<movement-title>", "</movement-title>"], _b.raw = ["<movement-title>", "</movement-title>"], xml(_b, movementTitle));
    var _a, _b;
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
    return (_a = ["<identification>\n", "\n</identification>"], _a.raw = ["<identification>\\n", "\\n</identification>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function creatorToXML(creator) {
    // <!ELEMENT creator (#PCDATA)>
    // <!ATTLIST creator
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (creator.type) {
        attribs += (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], xml(_a, creator.type));
    }
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, creator.creator));
    return (_c = ["<creator", ">", "</creator>"], _c.raw = ["<creator", ">", "</creator>"], dangerous(_c, attribs, pcdata));
    var _a, _b, _c;
}
function rightsToXML(rights) {
    // <!ELEMENT rights (#PCDATA)>
    // <!ATTLIST rights
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (rights.type) {
        attribs += (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], xml(_a, rights.type));
    }
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, rights.rights));
    return (_c = ["<rights", ">", "</rights>"], _c.raw = ["<rights", ">", "</rights>"], dangerous(_c, attribs, pcdata));
    var _a, _b, _c;
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
    return (_a = ["<encoding>\n", "\n</encoding>"], _a.raw = ["<encoding>\\n", "\\n</encoding>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function encodingDateToXML(encodingDate) {
    // <!ELEMENT encoding-date %yyyy-mm-dd;>
    return (_a = ["<encoding-date>", "-", "-", "</encoding-date>"], _a.raw = ["<encoding-date>", "-", "-", "</encoding-date>"], xml(_a, ("0000" + encodingDate.year).slice(-4), ("00" + encodingDate.month).slice(-2), ("00" + encodingDate.day).slice(-2)));
    var _a;
}
function encoderToXML(encoder) {
    // <!ELEMENT encoder (#PCDATA)>
    // <!ATTLIST encoder
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (defined(encoder.type)) {
        attribs = (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], xml(_a, encoder.type));
    }
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, encoder.encoder));
    return (_c = ["<encoder", ">", "</encoder>"], _c.raw = ["<encoder", ">", "</encoder>"], dangerous(_c, attribs, pcdata));
    var _a, _b, _c;
}
function softwareToXML(software) {
    // <!ELEMENT software (#PCDATA)>
    return (_a = ["<software>", "</software>"], _a.raw = ["<software>", "</software>"], xml(_a, software));
    var _a;
}
function encodingDescriptionToXML(encodingDescription) {
    // <!ELEMENT encoding-description (#PCDATA)>
    return (_a = ["<encoding-description>", "</encoding-description>"], _a.raw = ["<encoding-description>", "</encoding-description>"], xml(_a, encodingDescription));
    var _a;
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
        attribs += (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], yesNo(_a, supports.type));
    }
    if (defined(supports.element)) {
        attribs += (_b = [" element=\"", "\""], _b.raw = [" element=\"", "\""], xml(_b, supports.element));
    }
    if (defined(supports.attribute)) {
        attribs += (_c = [" attribute=\"", "\""], _c.raw = [" attribute=\"", "\""], xml(_c, supports.attribute));
    }
    if (defined(supports.value)) {
        attribs += (_d = [" value=\"", "\""], _d.raw = [" value=\"", "\""], xml(_d, supports.value));
    }
    return (_e = ["<supports", " />"], _e.raw = ["<supports", " />"], dangerous(_e, attribs));
    var _a, _b, _c, _d, _e;
}
function sourceToXML(source) {
    // <!ELEMENT source (#PCDATA)>
    return (_a = ["<source>", "</source>"], _a.raw = ["<source>", "</source>"], xml(_a, source));
    var _a;
}
function relationToXML(relation) {
    // <!ELEMENT relation (#PCDATA)>
    // <!ATTLIST relation
    //     type CDATA #IMPLIED
    // >
    var attribs = "";
    if (relation.type) {
        attribs += (_a = [" type=\"", "\""], _a.raw = [" type=\"", "\""], xml(_a, relation.type));
    }
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, relation.data));
    return (_c = ["<relation", ">", "</relation>"], _c.raw = ["<relation", ">", "</relation>"], dangerous(_c, attribs, pcdata));
    var _a, _b, _c;
}
function miscellaneousToXML(miscellaneous) {
    // <!ELEMENT miscellaneous (miscellaneous-field*)>
    var children = miscellaneous.miscellaneousFields.map(function (field) {
        return miscellaneousFieldToXML(field);
    });
    return (_a = ["<miscellaneous>\n", "\n</miscellaneous>"], _a.raw = ["<miscellaneous>\\n", "\\n</miscellaneous>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function miscellaneousFieldToXML(field) {
    // <!ELEMENT miscellaneous-field (#PCDATA)>
    // <!ATTLIST miscellaneous-field
    //     name CDATA #REQUIRED
    // >
    return (_a = ["<miscellaneous-field name=\"", "\">", "</miscellaneous-field>"], _a.raw = ["<miscellaneous-field name=\"", "\">", "</miscellaneous-field>"], xml(_a, field.name, field.data || ""));
    var _a;
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
    return (_a = ["<defaults>\n", "\n</defaults>"], _a.raw = ["<defaults>\\n", "\\n</defaults>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function musicFontToXML(musicFont) {
    // <!ELEMENT music-font EMPTY>
    // <!ATTLIST music-font
    //     %font;
    // >
    return (_a = ["<music-font", " />"], _a.raw = ["<music-font", " />"], dangerous(_a, fontToXML(musicFont)));
    var _a;
}
function wordFontToXML(wordFont) {
    // <!ELEMENT word-font EMPTY>
    // <!ATTLIST word-font
    //     %font;
    // >
    return (_a = ["<word-font", " />"], _a.raw = ["<word-font", " />"], dangerous(_a, fontToXML(wordFont)));
    var _a;
}
function lyricFontToXML(lyricFont) {
    // <!ELEMENT lyric-font EMPTY>
    // <!ATTLIST lyric-font
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     %font;
    // >
    return (_a = ["<lyric-font", " />"], _a.raw = ["<lyric-font", " />"], dangerous(_a, numberLevelToXML(lyricFont) + nameToXML(lyricFont) + fontToXML(lyricFont)));
    var _a;
}
function lyricLanguageToXML(lyricLanguage) {
    // <!ELEMENT lyric-language EMPTY>
    // <!ATTLIST lyric-language
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     xml:lang NMTOKEN #REQUIRED TODO musicxml-interfaces
    // >
    return (_a = ["<lyric-language", " />"], _a.raw = ["<lyric-language", " />"], dangerous(_a, numberLevelToXML(lyricLanguage) + nameToXML(lyricLanguage)));
    var _a;
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
    if (defined(credit.creditWords)) {
        children.push(creditWordsToXML(credit.creditWords));
    }
    if (defined(credit.page)) {
        attributes += (_a = [" page=\"", "\""], _a.raw = [" page=\"", "\""], xml(_a, credit.page));
    }
    return (_b = ["<credit", ">\n", "\n</credit>"], _b.raw = ["<credit", ">\\n", "\\n</credit>"], dangerous(_b, attributes, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
function creditTypeToXML(creditType) {
    // <!ELEMENT credit-type (#PCDATA)>
    return (_a = ["<credit-type>", "</credit-type>"], _a.raw = ["<credit-type>", "</credit-type>"], xml(_a, creditType));
    var _a;
}
function creditWordsToXML(creditWords) {
    // <!ELEMENT credit-words (#PCDATA)>
    // <!ATTLIST credit-words
    //     %text-formatting;
    // >
    return (_a = ["<credit-words", ">", "</credit-words>"], _a.raw = ["<credit-words", ">", "</credit-words>"], dangerous(_a, textFormattingToXML(creditWords), creditWords.words));
    var _a;
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
        attribs += (_a = [" credit-image=\"", "\""], _a.raw = [" credit-image=\"", "\""], xml(_a, creditImage.source));
    }
    if (defined(creditImage.type)) {
        attribs += (_b = [" type=\"", "\""], _b.raw = [" type=\"", "\""], xml(_b, creditImage.type));
    }
    attribs += positionToXML(creditImage) + halignToXML(creditImage) + valignImageToXML(creditImage);
    return (_c = ["<credit-image", " />"], _c.raw = ["<credit-image", " />"], dangerous(_c, attribs));
    var _a, _b, _c;
}
var topMiddleBottomBaselineToXML = {
    0: "top",
    1: "middle",
    3: "baseline",
    2: "bottom"
};
function valignImageToXML(valignImage) {
    // <!ENTITY % valign-image
    //     "valign (top | middle | bottom) #IMPLIED">
    if (defined(valignImage.valignImage)) {
        return (_a = [" valign-image=\"", "\""], _a.raw = [" valign-image=\"", "\""], xml(_a, topMiddleBottomBaselineToXML[valignImage.valignImage]));
    }
    return "";
    var _a;
}
function partListToXML(partList) {
    // <!ELEMENT part-list (part-group*, score-part,
    //     (part-group | score-part)*)>
    // TODO musicxml-interfaces might have a broken PartList!
    var children = [];
    (partList.partGroups || []).forEach(function (partGroup) {
        children.push(partGroupToXML(partGroup));
    });
    (partList.scoreParts || []).forEach(function (scorePart) {
        children.push(scorePartToXML(scorePart));
    });
    return (_a = ["<part-list>\n", "\n</part-list>"], _a.raw = ["<part-list>\\n", "\\n</part-list>"], dangerous(_a, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
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
        children.push((_a = ["<group>", "</group>"], _a.raw = ["<group>", "</group>"], xml(_a, group)));
        var _a;
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
    (scorePart.midiInstruments || []).forEach(function (midiInstrument) {
        children.push(midiInstrumentToXML(midiInstrument));
    });
    if (defined(scorePart.id)) {
        attribs += (_a = [" id=\"", "\""], _a.raw = [" id=\"", "\""], xml(_a, scorePart.id));
    }
    return (_b = ["<score-part", ">\n", "\n</score-part>"], _b.raw = ["<score-part", ">\\n", "\\n</score-part>"], dangerous(_b, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
function partNameToXML(partName) {
    // <!ELEMENT part-name (#PCDATA)>
    // <!ATTLIST part-name
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, partName.partName));
    return (_b = ["<part-name", ">", "</part-name>"], _b.raw = ["<part-name", ">", "</part-name>"], dangerous(_b, printStyleToXML(partName) + printObjectToXML(partName) + justifyToXML(partName), pcdata));
    var _a, _b;
}
function partNameDisplayToXML(partNameDisplay) {
    // <!ELEMENT part-name-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-name-display
    //     %print-object;
    // >
    return (_a = ["<part-name-display", ">\n", "</part-name-display>"], _a.raw = ["<part-name-display", ">\\n", "</part-name-display>"], dangerous(_a, printObjectToXML(partNameDisplay), textArrayToXML(partNameDisplay.name).join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function partAbbreviationToXML(abbreviation) {
    // <!ELEMENT part-abbreviation (#PCDATA)>
    // <!ATTLIST part-abbreviation
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, abbreviation.abbreviation));
    return (_b = ["<part-abbreviation", ">", "</part-abbreviation>"], _b.raw = ["<part-abbreviation", ">", "</part-abbreviation>"], dangerous(_b, printStyleToXML(abbreviation) + printObjectToXML(abbreviation) + justifyToXML(abbreviation), pcdata));
    var _a, _b;
}
function partAbbreviationDisplayToXML(partAbbreviationDisplay) {
    // <!ELEMENT part-abbreviation-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-abbreviation-display
    //     %print-object;
    // >
    return (_a = ["<part-abbreviation-display", ">", "</part-abbreviation-display>"], _a.raw = ["<part-abbreviation-display", ">", "</part-abbreviation-display>"], dangerous(_a, printObjectToXML(partAbbreviationDisplay), textArrayToXML(partAbbreviationDisplay.name).join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a;
}
function textArrayToXML(texts) {
    return texts.map(function (text) {
        if (text.acc) {
            return (_a = ["<accidental-text", ""], _a.raw = ["<accidental-text", ""], dangerous(_a, textFormattingToXML(text.acc))) + (_b = [">", "</accidental-text>"], _b.raw = [">", "</accidental-text>"], xml(_b, text.acc.text));
        }
        else if (text.text) {
            return (_c = ["<display-text", ""], _c.raw = ["<display-text", ""], dangerous(_c, textFormattingToXML(text.text))) + (_d = [">", "</display-text>"], _d.raw = [">", "</display-text>"], xml(_d, text.text.text));
        }
        else {
            throw "Unknown type " + text;
        }
        var _a, _b, _c, _d;
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
        attribs += (_a = [" port=\"", "\""], _a.raw = [" port=\"", "\""], xml(_a, midiDevice.port));
    }
    if (defined(midiDevice.id)) {
        attribs += (_b = [" id=\"", "\""], _b.raw = [" id=\"", "\""], xml(_b, midiDevice.id));
    }
    var pcdata = (_c = ["", ""], _c.raw = ["", ""], xml(_c, midiDevice.deviceName || ""));
    return (_d = ["<midi-device", ">", "</midi-device>"], _d.raw = ["<midi-device", ">", "</midi-device>"], dangerous(_d, attribs, pcdata));
    var _a, _b, _c, _d;
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
        children.push((_a = ["midi-channel=\"", "\""], _a.raw = ["midi-channel=\"", "\""], xml(_a, midiInstrument.midiChannel)));
    }
    if (defined(midiInstrument.midiName)) {
        // <!ELEMENT midi-name (#PCDATA)>
        children.push((_b = ["midi-name=\"", "\""], _b.raw = ["midi-name=\"", "\""], xml(_b, midiInstrument.midiName)));
    }
    if (defined(midiInstrument.midiBank)) {
        // <!ELEMENT midi-bank (#PCDATA)>
        children.push((_c = ["midi-bank=\"", "\""], _c.raw = ["midi-bank=\"", "\""], xml(_c, midiInstrument.midiBank)));
    }
    if (defined(midiInstrument.midiProgram)) {
        // <!ELEMENT midi-program (#PCDATA)>
        children.push((_d = ["midi-program=\"", "\""], _d.raw = ["midi-program=\"", "\""], xml(_d, midiInstrument.midiProgram)));
    }
    if (defined(midiInstrument.midiUnpitched)) {
        // <!ELEMENT midi-unpitched (#PCDATA)>
        children.push((_e = ["midi-unpitched=\"", "\""], _e.raw = ["midi-unpitched=\"", "\""], xml(_e, midiInstrument.midiUnpitched)));
    }
    if (defined(midiInstrument.volume)) {
        // <!ELEMENT volume (#PCDATA)>
        children.push((_f = ["volume=\"", "\""], _f.raw = ["volume=\"", "\""], xml(_f, midiInstrument.volume)));
    }
    if (defined(midiInstrument.pan)) {
        // <!ELEMENT pan (#PCDATA)>
        children.push((_g = ["pan=\"", "\""], _g.raw = ["pan=\"", "\""], xml(_g, midiInstrument.pan)));
    }
    if (defined(midiInstrument.elevation)) {
        // <!ELEMENT elevation (#PCDATA)>
        children.push((_h = ["elevation=\"", "\""], _h.raw = ["elevation=\"", "\""], xml(_h, midiInstrument.elevation)));
    }
    if (defined(midiInstrument.id)) {
        attribs += (_j = [" id=\"", "\""], _j.raw = [" id=\"", "\""], xml(_j, midiInstrument.id));
    }
    return (_k = ["<midi-instrument", ">\n", "\n</midi-instrument>"], _k.raw = ["<midi-instrument", ">\\n", "\\n</midi-instrument>"], dangerous(_k, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
    var attribs = (_a = [" id=\"", "\""], _a.raw = [" id=\"", "\""], xml(_a, scoreInstrument.id));
    if (defined(scoreInstrument.instrumentName)) {
        // <!ELEMENT instrument-name (#PCDATA)>
        children.push((_b = ["<instrument-name>", "</instrument-name>"], _b.raw = ["<instrument-name>", "</instrument-name>"], xml(_b, scoreInstrument.instrumentName)));
    }
    if (defined(scoreInstrument.instrumentAbbreviation)) {
        // <!ELEMENT instrument-abbreviation (#PCDATA)>
        children.push((_c = ["<instrument-abbreviation>", "</instrument-abbreviation>"], _c.raw = ["<instrument-abbreviation>", "</instrument-abbreviation>"], xml(_c, scoreInstrument.instrumentAbbreviation)));
    }
    if (defined(scoreInstrument.instrumentSound)) {
        // <!ELEMENT instrument-sound (#PCDATA)>
        children.push((_d = ["<instrument-sound>", "</instrument-sound>"], _d.raw = ["<instrument-sound>", "</instrument-sound>"], xml(_d, scoreInstrument.instrumentSound)));
    }
    if (scoreInstrument.solo) {
        // <!ELEMENT solo EMPTY>
        children.push((_e = ["<solo />"], _e.raw = ["<solo />"], xml(_e)));
    }
    if (defined(scoreInstrument.ensemble)) {
        // <!ELEMENT ensemble (#PCDATA)>
        children.push((_f = ["<ensemble>", "</ensemble>"], _f.raw = ["<ensemble>", "</ensemble>"], xml(_f, scoreInstrument.ensemble)));
    }
    if (defined(scoreInstrument.virtualInstrument)) {
        // <!ELEMENT virtual-instrument
        //     (virtual-library?, virtual-name?)>
        var vChildren = [];
        var v = scoreInstrument.virtualInstrument;
        if (defined(v.virtualLibrary)) {
            // <!ELEMENT virtual-library (#PCDATA)>
            vChildren.push((_g = ["<virtual-library>", "</virtual-library>"], _g.raw = ["<virtual-library>", "</virtual-library>"], xml(_g, v.virtualLibrary)));
        }
        if (defined(v.virtualName)) {
            // <!ELEMENT virtual-name (#PCDATA)>
            vChildren.push((_h = ["<virtual-name>", "</virtual-name>"], _h.raw = ["<virtual-name>", "</virtual-name>"], xml(_h, v.virtualName)));
        }
        children.push((_j = ["<virtual-instrument>\n", "\n</virtual-instrument>"], _j.raw = ["<virtual-instrument>\\n", "\\n</virtual-instrument>"], dangerous(_j, vChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    return (_k = ["<score-instrument", ">\n", "\n</score-instrument>"], _k.raw = ["<score-instrument", ">\\n", "\\n</score-instrument>"], dangerous(_k, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
        children.push((_a = ["<group-time />"], _a.raw = ["<group-time />"], xml(_a)));
    }
    children = children.concat(editorialToXML(partGroup));
    return (_b = ["<part-group", ">\n", "\n</part-group>"], _b.raw = ["<part-group", ">\\n", "\\n</part-group>"], dangerous(_b, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
function groupNameToXML(groupName) {
    // <!ELEMENT group-name (#PCDATA)>
    // <!ATTLIST group-name
    //     %print-style;
    //     %justify;
    // >
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, groupName.name));
    return (_b = ["<group-name", ">", "</group-name>"], _b.raw = ["<group-name", ">", "</group-name>"], dangerous(_b, printStyleToXML(groupName) + justifyToXML(groupName), pcdata));
    var _a, _b;
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
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, groupAbbreviation.text));
    return (_b = ["<group-abbreviation", ">", "</group-abbreviation>"], _b.raw = ["<group-abbreviation", ">", "</group-abbreviation>"], dangerous(_b, printStyleToXML(groupAbbreviation) + justifyToXML(groupAbbreviation), pcdata));
    var _a, _b;
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
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, groupSymbol.data));
    return (_b = ["<group-symbol", ">", "</group-symbol>"], _b.raw = ["<group-symbol", ">", "</group-symbol>"], dangerous(_b, positionToXML(groupSymbol) + colorToXML(groupSymbol), pcdata));
    var _a, _b;
}
function groupBarlineToXML(groupBarline) {
    // <!ELEMENT group-barline (#PCDATA)>
    // <!ATTLIST group-barline
    //     %color;
    // >
    var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, groupBarline.data));
    return (_b = ["<group-barline", ">", "</group-barline>"], _b.raw = ["<group-barline", ">", "</group-barline>"], dangerous(_b, colorToXML(groupBarline), pcdata));
    var _a, _b;
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
exports.scoreHeaderToXML = scoreHeaderToXML;
function backupToXML(backup) {
    // <!ELEMENT backup (duration, %editorial;)>
    var children = [];
    children.push((_a = ["<duration>", "</duration>"], _a.raw = ["<duration>", "</duration>"], xml(_a, backup.duration)));
    children = children.concat(editorialToXML(backup));
    return (_b = ["<backup>\n", "\n</backup>"], _b.raw = ["<backup>\\n", "\\n</backup>"], dangerous(_b, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
exports.backupToXML = backupToXML;
function forwardToXML(forward) {
    // <!ELEMENT forward
    //     (duration, %editorial-voice;, staff?)>
    var children = [];
    children.push((_a = ["<duration>", "</duration>"], _a.raw = ["<duration>", "</duration>"], xml(_a, forward.duration)));
    children = children.concat(editorialVoiceToXML(forward));
    children.push((_b = ["<staff>", "</staff>"], _b.raw = ["<staff>", "</staff>"], xml(_b, forward.staff)));
    return (_c = ["<forward>\n", "\n</forward>"], _c.raw = ["<forward>\\n", "\\n</forward>"], dangerous(_c, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c;
}
exports.forwardToXML = forwardToXML;
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
        var pcdata = (_a = ["", ""], _a.raw = ["", ""], xml(_a, feature.data));
        var _attribs = "";
        if (defined(feature.type)) {
            _attribs += (_b = [" type=\"", "\""], _b.raw = [" type=\"", "\""], xml(_b, feature.type));
        }
        children.push((_c = ["<grouping", ">", "</grouping>"], _c.raw = ["<grouping", ">", "</grouping>"], dangerous(_c, _attribs, pcdata)));
        var _a, _b, _c;
    });
    var attribs = "" + startStopSingleToXML(grouping) + numberLevelToXML(grouping);
    if (defined(grouping.memberOf)) {
        attribs += (_a = [" member-of=\"", "\""], _a.raw = [" member-of=\"", "\""], xml(_a, grouping.memberOf));
    }
    return (_b = ["<grouping", ">\n", "\n</grouping>"], _b.raw = ["<grouping", ">\\n", "\\n</grouping>"], dangerous(_b, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b;
}
exports.groupingToXML = groupingToXML;
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
        attribs += (_a = [" print-frame=\"", "\""], _a.raw = [" print-frame=\"", "\""], yesNo(_a, harmony.printFrame));
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
        children.push((_b = ["<staff>", "</staff>"], _b.raw = ["<staff>", "</staff>"], xml(_b, harmony.staff)));
    }
    return (_c = ["<harmony", ">\n", "\n</harmony>"], _c.raw = ["<harmony", ">\\n", "\\n</harmony>"], dangerous(_c, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _a, _b, _c;
}
exports.harmonyToXML = harmonyToXML;
var eiaTypeToXML = (_a = {},
    _a[1 /* Explicit */] = "explicit",
    _a[2 /* Implied */] = "implied",
    _a[3 /* Alternate */] = "alternate",
    _a);
function explicitImpliedAlternateToXML(eia) {
    if (defined(eia.type)) {
        return (_b = [" type=\"", "\""], _b.raw = [" type=\"", "\""], xml(_b, eiaTypeToXML[eia.type]));
    }
    return "";
    var _b;
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
            attribs += (_b = [" text=\"", "\""], _b.raw = [" text=\"", "\""], xml(_b, root.rootStep.text));
        }
        attribs += printStyleToXML(root.rootStep);
        var pcdata = (_c = ["", ""], _c.raw = ["", ""], xml(_c, root.rootStep.data));
        children.push((_d = ["<root-step", ">", "</root-step>"], _d.raw = ["<root-step", ">", "</root-step>"], dangerous(_d, attribs, pcdata)));
    }
    if (defined(root.rootAlter)) {
        // <!ELEMENT root-alter (#PCDATA)>
        // <!ATTLIST root-alter
        //     %print-object;
        //     %print-style;
        //     location %left-right; #IMPLIED
        // >
        var _attribs = printObjectToXML(root.rootAlter) + printStyleToXML(root.rootAlter);
        if (defined(root.rootAlter.location)) {
            _attribs += (_e = [" location=\"", "\""], _e.raw = [" location=\"", "\""], xml(_e, root.rootAlter.location === 0 /* Left */ ? "left" : "right"));
        }
        var _pcdata = root.rootAlter.data;
        children.push((_f = ["<root-alter", ">", "</root-alter>"], _f.raw = ["<root-alter", ">", "</root-alter>"], dangerous(_f, _attribs, _pcdata)));
    }
    return (_g = ["<root>\n", "\n</root>"], _g.raw = ["<root>\\n", "\\n</root>"], dangerous(_g, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _b, _c, _d, _e, _f, _g;
}
function functionToXML(func) {
    // <!ELEMENT function (#PCDATA)>
    // <!ATTLIST function
    //     %print-style;
    // >
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, func.data));
    var attribs = printStyleToXML(func);
    return "<function" + attribs + ">" + pcdata + "</function>";
    var _b;
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
        attribs += (_b = [" kind=\"", "\""], _b.raw = [" kind=\"", "\""], yesNo(_b, kind.useSymbols));
    }
    if (defined(kind.text)) {
        attribs += (_c = [" text=\"", "\""], _c.raw = [" text=\"", "\""], xml(_c, kind.text));
    }
    if (defined(kind.stackDegrees)) {
        attribs += (_d = [" stack-degrees=\"", "\""], _d.raw = [" stack-degrees=\"", "\""], yesNo(_d, kind.stackDegrees));
    }
    if (defined(kind.parenthesesDegrees)) {
        attribs += (_e = [" parentheses-degrees=\"", "\""], _e.raw = [" parentheses-degrees=\"", "\""], yesNo(_e, kind.parenthesesDegrees));
    }
    attribs += printStyleToXML(kind) + halignToXML(kind) + valignToXML(kind);
    var pcdata = (_f = ["", ""], _f.raw = ["", ""], xml(_f, kind.data));
    return (_g = ["<kind", ">\n", "</kind>"], _g.raw = ["<kind", ">\\n", "</kind>"], dangerous(_g, attribs, pcdata));
    var _b, _c, _d, _e, _f, _g;
}
function inversionToXML(inversion) {
    // <!ELEMENT inversion (#PCDATA)>
    // <!ATTLIST inversion
    //     %print-style;
    //     >
    var pcdata = (_b = ["", ""], _b.raw = ["", ""], xml(_b, inversion.data));
    var attribs = printStyleToXML(inversion);
    return "<inversion" + attribs + ">" + pcdata + "</inversion>";
    var _b;
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
            attribs += (_b = [" text=\"", "\""], _b.raw = [" text=\"", "\""], xml(_b, bass.bassStep.text));
        }
        attribs += printStyleToXML(bass.bassStep);
        var pcdata = (_c = ["", ""], _c.raw = ["", ""], xml(_c, bass.bassStep.data));
        children.push((_d = ["<bass-step", ">", "</bass-step>"], _d.raw = ["<bass-step", ">", "</bass-step>"], dangerous(_d, attribs, pcdata)));
    }
    if (defined(bass.bassAlter)) {
        // <!ELEMENT bass-alter (#PCDATA)>
        // <!ATTLIST bass-alter
        //     %print-object;
        //     %print-style;
        //     location (left | right) #IMPLIED
        // >
        var _attribs = printObjectToXML(bass.bassAlter) + printStyleToXML(bass.bassAlter);
        if (defined(bass.bassAlter.location)) {
            _attribs += (_e = [" location=\"", "\""], _e.raw = [" location=\"", "\""], xml(_e, bass.bassAlter.location === 0 /* Left */ ? "left" : "right"));
        }
        var _pcdata = bass.bassAlter.data;
        children.push((_f = ["<bass-alter", ">", "</bass-alter>"], _f.raw = ["<bass-alter", ">", "</bass-alter>"], dangerous(_f, _attribs, _pcdata)));
    }
    return (_g = ["<bass>\n", "\n</bass>"], _g.raw = ["<bass>\\n", "\\n</bass>"], dangerous(_g, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _b, _c, _d, _e, _f, _g;
}
var chordTypeToXML = (_b = {},
    _b[3 /* Augmented */] = "augmented",
    _b[4 /* Diminished */] = "diminished",
    _b[1 /* Major */] = "major",
    _b[2 /* Minor */] = "minor",
    _b[5 /* HalfDiminished */] = "half-diminished",
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
            lattribs += (_c = [" symbol=\"", "\""], _c.raw = [" symbol=\"", "\""], xml(_c, chordTypeToXML[degree.degreeValue.symbol]));
        }
        if (defined(degree.degreeValue.text)) {
            lattribs += (_d = [" text=\"", "\""], _d.raw = [" text=\"", "\""], xml(_d, degree.degreeValue.text));
        }
        lattribs += printStyleToXML(degree.degreeValue);
        var pcdata = (_e = ["", ""], _e.raw = ["", ""], xml(_e, degree.degreeValue.data));
        children.push((_f = ["<degree-value", ">", "</degree-value>"], _f.raw = ["<degree-value", ">", "</degree-value>"], xml(_f, lattribs, pcdata)));
    }
    if (defined(degree.degreeAlter)) {
        // <!ELEMENT degree-alter (#PCDATA)>
        // <!ATTLIST degree-alter
        //     %print-style;
        //     plus-minus %yes-no; #IMPLIED
        // >
        var _lattribs = printStyleToXML(degree.degreeAlter);
        if (defined(degree.degreeAlter.plusMinus)) {
            _lattribs += (_g = [" plus-minus=\"", "\""], _g.raw = [" plus-minus=\"", "\""], yesNo(_g, degree.degreeAlter.plusMinus));
        }
        var _pcdata = (_h = ["", ""], _h.raw = ["", ""], xml(_h, degree.degreeAlter.data));
        children.push((_j = ["<degree-alter", ">", "</degree-alter>"], _j.raw = ["<degree-alter", ">", "</degree-alter>"], xml(_j, _lattribs, _pcdata)));
    }
    if (defined(degree.degreeType)) {
        // <!ELEMENT degree-type (#PCDATA)>
        // <!ATTLIST degree-type
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        var _lattribs_1 = printStyleToXML(degree.degreeType);
        if (defined(degree.degreeType.text)) {
            _lattribs_1 += (_k = [" text=\"", "\""], _k.raw = [" text=\"", "\""], xml(_k, degree.degreeType.text));
        }
        var _pcdata_1 = (_l = ["", ""], _l.raw = ["", ""], xml(_l, degree.degreeType.data));
        children.push((_m = ["<degree-type", ">", "</degree-type>"], _m.raw = ["<degree-type", ">", "</degree-type>"], xml(_m, _lattribs_1, _pcdata_1)));
    }
    var attribs = printObjectToXML(degree);
    return (_o = ["<degree", ">\n", "\n</degree>"], _o.raw = ["<degree", ">\\n", "\\n</degree>"], dangerous(_o, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
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
    var attribs = positionToXML(frame) + colorToXML(frame) + halignToXML(frame) + valignImageToXML(frame);
    if (defined(frame.height)) {
        attribs += (_c = [" height=\"", "\""], _c.raw = [" height=\"", "\""], xml(_c, frame.height));
    }
    if (defined(frame.width)) {
        attribs += (_d = [" width=\"", "\""], _d.raw = [" width=\"", "\""], xml(_d, frame.width));
    }
    if (defined(frame.unplayed)) {
        attribs += (_e = [" unplayed=\"", "\""], _e.raw = [" unplayed=\"", "\""], xml(_e, frame.unplayed));
    }
    var children = [];
    if (defined(frame.frameStrings)) {
        // <!ELEMENT frame-strings (#PCDATA)>
        children.push((_f = ["<frame-strings>", "</frame-strings>"], _f.raw = ["<frame-strings>", "</frame-strings>"], xml(_f, frame.frameStrings)));
    }
    if (defined(frame.frameFrets)) {
        // <!ELEMENT frame-frets (#PCDATA)>
        children.push((_g = ["<frame-frets>", "</frame-frets>"], _g.raw = ["<frame-frets>", "</frame-frets>"], xml(_g, frame.frameFrets)));
    }
    if (defined(frame.firstFret)) {
        // <!ELEMENT first-fret (#PCDATA)>
        // <!ATTLIST first-fret
        //     text CDATA #IMPLIED
        //     location %left-right; #IMPLIED
        // >
        var pcdata = (_h = ["", ""], _h.raw = ["", ""], xml(_h, frame.firstFret.data));
        var _attribs = "";
        if (defined(frame.firstFret.text)) {
            _attribs += (_j = [" text=\"", "\""], _j.raw = [" text=\"", "\""], xml(_j, frame.firstFret.text));
        }
        if (defined(frame.firstFret.location)) {
            _attribs += (_k = [" location=\"", "\""], _k.raw = [" location=\"", "\""], xml(_k, frame.firstFret.location === 0 /* Left */ ? "left" : "right"));
        }
    }
    (frame.frameNotes || []).forEach(function (frameNote) {
        // <!ELEMENT frame-note (string, fret, fingering?, barre?)>
        // TODO: not implemented
    });
    return (_l = ["<frame", ">\n", "\n</frame>"], _l.raw = ["<frame", ">\\n", "\\n</frame>"], dangerous(_l, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
        attribs += (_c = [" staff-spacing=\"", "\""], _c.raw = [" staff-spacing=\"", "\""], xml(_c, print.staffSpacing));
    }
    if (defined(print.newSystem)) {
        attribs += (_d = [" new-system=\"", "\""], _d.raw = [" new-system=\"", "\""], yesNo(_d, print.newSystem));
    }
    if (defined(print.newPage)) {
        attribs += (_e = [" new-page=\"", "\""], _e.raw = [" new-page=\"", "\""], yesNo(_e, print.newPage));
    }
    if (defined(print.blankPage)) {
        attribs += (_f = [" blank-page=\"", "\""], _f.raw = [" blank-page=\"", "\""], xml(_f, print.blankPage));
    }
    if (defined(print.pageNumber)) {
        attribs += (_g = [" page-number=\"", "\""], _g.raw = [" page-number=\"", "\""], xml(_g, print.pageNumber));
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
    return (_h = ["<print", ">\n", "\n</print>"], _h.raw = ["<print", ">\\n", "\\n</print>"], dangerous(_h, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e, _f, _g, _h;
}
exports.printToXML = printToXML;
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
        attribs += (_c = [" tempo=\"", "\""], _c.raw = [" tempo=\"", "\""], xml(_c, sound.tempo));
    }
    if (defined(sound.dynamics)) {
        attribs += (_d = [" dynamics=\"", "\""], _d.raw = [" dynamics=\"", "\""], xml(_d, sound.dynamics));
    }
    if (defined(sound.decapo)) {
        attribs += (_e = [" decapo=\"", "\""], _e.raw = [" decapo=\"", "\""], yesNo(_e, sound.decapo));
    }
    if (defined(sound.segno)) {
        attribs += (_f = [" segno=\"", "\""], _f.raw = [" segno=\"", "\""], xml(_f, sound.segno));
    }
    if (defined(sound.dalsegno)) {
        attribs += (_g = [" dalsegno=\"", "\""], _g.raw = [" dalsegno=\"", "\""], xml(_g, sound.dalsegno));
    }
    if (defined(sound.coda)) {
        attribs += (_h = [" coda=\"", "\""], _h.raw = [" coda=\"", "\""], xml(_h, sound.coda));
    }
    if (defined(sound.tocoda)) {
        attribs += (_j = [" tocoda=\"", "\""], _j.raw = [" tocoda=\"", "\""], xml(_j, sound.tocoda));
    }
    if (defined(sound.divisions)) {
        attribs += (_k = [" divisions=\"", "\""], _k.raw = [" divisions=\"", "\""], xml(_k, sound.divisions));
    }
    if (defined(sound.forwardRepeat)) {
        attribs += (_l = [" forward-repeat=\"", "\""], _l.raw = [" forward-repeat=\"", "\""], yesNo(_l, sound.forwardRepeat));
    }
    if (defined(sound.fine)) {
        attribs += (_m = [" fine=\"", "\""], _m.raw = [" fine=\"", "\""], xml(_m, sound.fine));
    }
    attribs += timeOnlyToXML(sound);
    if (defined(sound.pizzicato)) {
        attribs += (_o = [" pizzicato=\"", "\""], _o.raw = [" pizzicato=\"", "\""], yesNo(_o, sound.pizzicato));
    }
    if (defined(sound.pan)) {
        attribs += (_p = [" pan=\"", "\""], _p.raw = [" pan=\"", "\""], xml(_p, sound.pan));
    }
    if (defined(sound.elevation)) {
        attribs += (_q = [" elevation=\"", "\""], _q.raw = [" elevation=\"", "\""], xml(_q, sound.elevation));
    }
    if (defined(sound.damperPedal)) {
        attribs += (_r = [" damper-pedal=\"", "\""], _r.raw = [" damper-pedal=\"", "\""], xml(_r, sound.damperPedal));
    }
    if (defined(sound.softPedal)) {
        attribs += (_s = [" soft-pedal=\"", "\""], _s.raw = [" soft-pedal=\"", "\""], xml(_s, sound.softPedal));
    }
    if (defined(sound.sostenutoPedal)) {
        attribs += (_t = [" sostenuto-pedal=\"", "\""], _t.raw = [" sostenuto-pedal=\"", "\""], xml(_t, sound.sostenutoPedal));
    }
    return (_u = ["<sound", ">\n", "\n</sound>"], _u.raw = ["<sound", ">\\n", "\\n</sound>"], dangerous(_u, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
}
exports.soundToXML = soundToXML;
function staffDebugInfoToXMLComment(module) {
    var comments = [];
    if (defined(module.divCount)) {
        comments.push((_c = ["<!--musicxml-interfaces:debug>\n", "  <div-count>", "</div-count>\n", "</musicxml-interfaces:debug-->"], _c.raw = ["<!--musicxml-interfaces:debug>\\n", "  <div-count>", "</div-count>\\n", "</musicxml-interfaces:debug-->"], xml(_c, "", module.divCount, "")));
    }
    return comments;
    var _c;
}
exports.staffDebugInfoToXMLComment = staffDebugInfoToXMLComment;
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
        children.push((_c = ["<staff>", "</staff>"], _c.raw = ["<staff>", "</staff>"], xml(_c, direction.staff)));
    }
    if (defined(direction.sound)) {
        children.push(soundToXML(direction.sound));
    }
    var attribs = "" + placementToXML(direction);
    if (defined(direction.directive)) {
        attribs += (_d = [" directive=\"", "\""], _d.raw = [" directive=\"", "\""], yesNo(_d, direction.directive));
    }
    return (_e = ["<direction", ">\n", "\n</direction>"], _e.raw = ["<direction", ">\\n", "\\n</direction>"], dangerous(_e, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e;
}
exports.directionToXML = directionToXML;
function attributesToXML(attributes) {
    // <!ELEMENT attributes (%editorial;, divisions?, key*, time*,
    //     staves?, part-symbol?, instruments?, clef*, staff-details*,
    //     transpose*, directive*, measure-style*)>
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(attributes));
    children = children.concat(editorialToXML(attributes));
    if (defined(attributes.divisions)) {
        // <!ELEMENT divisions (#PCDATA)>
        children.push((_c = ["<divisions>", "</divisions>"], _c.raw = ["<divisions>", "</divisions>"], xml(_c, attributes.divisions)));
    }
    (attributes.keySignatures || []).forEach(function (keySignature) {
        children.push(keyToXML(keySignature));
    });
    (attributes.times || []).forEach(function (time) {
        children.push(timeToXML(time));
    });
    if (defined(attributes.staves)) {
        // <!ELEMENT staves (#PCDATA)>
        children.push((_d = ["<staves>", "</staves>"], _d.raw = ["<staves>", "</staves>"], xml(_d, attributes.staves)));
    }
    if (defined(attributes.partSymbol)) {
        children.push(partSymbolToXML(attributes.partSymbol));
    }
    if (defined(attributes.instruments)) {
        // <!ELEMENT instruments (#PCDATA)>
        children.push((_e = ["<instruments>", "</instruments>"], _e.raw = ["<instruments>", "</instruments>"], xml(_e, attributes.instruments)));
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
    if (defined(attributes.measureStyle)) {
        children.push(measureStyleToXML(attributes.measureStyle));
    }
    return (_f = ["<attributes>\n", "\n</attributes>"], _f.raw = ["<attributes>\\n", "\\n</attributes>"], dangerous(_f, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _c, _d, _e, _f;
}
exports.attributesToXML = attributesToXML;
function chordToXML(chord) {
    var _xml = "";
    for (var i = 0; i < chord.length; ++i) {
        _xml += noteToXML(chord[i]) + "\n";
    }
    return _xml;
}
exports.chordToXML = chordToXML;
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
    1: "whole"
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
    33: "double-flat"
};
var syllabicTypeToXML = {
    0: "single",
    1: "begin",
    3: "middle",
    2: "end"
};
var breathMarkTypeToXML = {
    0: "comma",
    1: "tick",
    2: "empty"
};
var holeClosedTypeToXML = {
    1: "no",
    0: "yes",
    2: "half"
};
var holeLocationToXML = {
    0: "right",
    3: "top",
    1: "bottom",
    2: "left"
};
var actualBothNoneToXML = (_c = {},
    _c[2 /* None */] = "none",
    _c[1 /* Both */] = "both",
    _c[0 /* Actual */] = "actual",
    _c);
var beamTypeToXML = {
    4: "backward hook",
    0: "begin",
    3: "forward hook",
    1: "continue",
    2: "end"
};
var accelRitNoneToXML = {
    0: "accel",
    2: "none",
    1: "rit"
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
    6: "circle x"
};
var stemToXML = {
    2: "none",
    3: "double",
    0: "down",
    1: "up"
};
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
        attribs += (_d = [" dynamics=\"", "\""], _d.raw = [" dynamics=\"", "\""], xml(_d, note.dynamics));
    }
    if (defined(note.endDynamics)) {
        attribs += (_e = [" end-dynamics=\"", "\""], _e.raw = [" end-dynamics=\"", "\""], xml(_e, note.endDynamics));
    }
    if (defined(note.attack)) {
        attribs += (_f = [" attack=\"", "\""], _f.raw = [" attack=\"", "\""], xml(_f, note.attack));
    }
    if (defined(note.release)) {
        attribs += (_g = [" release=\"", "\""], _g.raw = [" release=\"", "\""], xml(_g, note.release));
    }
    attribs += timeOnlyToXML(note);
    if (defined(note.pizzicato)) {
        attribs += (_h = [" pizzicato=\"", "\""], _h.raw = [" pizzicato=\"", "\""], yesNo(_h, note.pizzicato));
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
            graceAttribs += (_j = [" steal-time-previous=\"", "\""], _j.raw = [" steal-time-previous=\"", "\""], xml(_j, note.grace.stealTimePrevious));
        }
        if (note.grace.stealTimeFollowing) {
            graceAttribs += (_k = [" steal-time-following=\"", "\""], _k.raw = [" steal-time-following=\"", "\""], xml(_k, note.grace.stealTimeFollowing));
        }
        if (note.grace.makeTime) {
            graceAttribs += (_l = [" make-time=\"", "\""], _l.raw = [" make-time=\"", "\""], xml(_l, note.grace.makeTime));
        }
        if (note.grace.slash !== undefined && note.grace.slash !== null) {
            graceAttribs += (_m = [" slash=\"", "\""], _m.raw = [" slash=\"", "\""], yesNo(_m, note.grace.slash));
        }
        elements.push((_o = ["<grace", " />"], _o.raw = ["<grace", " />"], dangerous(_o, graceAttribs)));
    }
    else if (note.cue) {
        elements.push((_p = ["<cue />"], _p.raw = ["<cue />"], xml(_p)));
    }
    /*
        <!ENTITY % full-note "(chord?, (pitch | unpitched | rest))">
    */
    if (note.chord) {
        elements.push((_q = ["<chord />"], _q.raw = ["<chord />"], xml(_q)));
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
            pitchElements.push((_r = ["<step>", "</step>"], _r.raw = ["<step>", "</step>"], xml(_r, note.pitch.step)));
        }
        if (note.pitch.alter) {
            pitchElements.push((_s = ["<alter>", "</alter>"], _s.raw = ["<alter>", "</alter>"], xml(_s, note.pitch.alter)));
        }
        if (note.pitch.octave) {
            pitchElements.push((_t = ["<octave>", "</octave>"], _t.raw = ["<octave>", "</octave>"], xml(_t, note.pitch.octave)));
        }
        elements.push((_u = ["<pitch>\n", "\n</pitch>"], _u.raw = ["<pitch>\\n", "\\n</pitch>"], dangerous(_u, pitchElements.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    else if (note.unpitched) {
        // <!ELEMENT unpitched ((display-step, display-octave)?)>
        var upChildren = [];
        if (note.unpitched.displayStep) {
            upChildren.push((_v = ["<display-step>", "</display-step>"], _v.raw = ["<display-step>", "</display-step>"], xml(_v, note.unpitched.displayStep)));
        }
        if (note.unpitched.displayOctave) {
            upChildren.push((_w = ["<display-octave>", "</display-octave>"], _w.raw = ["<display-octave>", "</display-octave>"], xml(_w, note.unpitched.displayOctave)));
        }
        elements.push((_x = ["<unpitched>\n", "\n</unpitched>"], _x.raw = ["<unpitched>\\n", "\\n</unpitched>"], dangerous(_x, upChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    else if (note.rest) {
        var restAttribs = "";
        var restChildren = [];
        if (note.rest.displayStep) {
            restChildren.push("<display-step>" + note.rest.displayStep + "</display-step>");
        }
        if (note.rest.displayOctave) {
            restChildren.push("<display-octave>" + note.rest.displayOctave + "</display-octave>");
        }
        if (note.rest.measure !== undefined && note.rest.measure !== null) {
            restAttribs += (_y = [" measure=\"", "\""], _y.raw = [" measure=\"", "\""], yesNo(_y, note.rest.measure));
        }
        elements.push((_z = ["<rest", ">\n", "\n</rest>"], _z.raw = ["<rest", ">\\n", "\\n</rest>"], dangerous(_z, restAttribs, restChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    if (!note.grace && note.duration) {
        elements.push((_0 = ["<duration>", "</duration>"], _0.raw = ["<duration>", "</duration>"], xml(_0, note.duration)));
    }
    if (note.ties && note.ties.length) {
        var tieAttribs = (_1 = [" type=\"", "\""], _1.raw = [" type=\"", "\""], xml(_1, note.ties[0].type === 1 /* Stop */ ? "stop" : "start"));
        elements.push((_2 = ["<tie", " />"], _2.raw = ["<tie", " />"], dangerous(_2, tieAttribs)));
    }
    // ...
    // instrument?, %editorial-voice;, type?, dot*,
    // ...
    if (note.instrument) {
        elements.push((_3 = ["<instrument id=\"", "\" />"], _3.raw = ["<instrument id=\"", "\" />"], xml(_3, note.instrument.id)));
    }
    elements = elements.concat(editorialVoiceToXML(note));
    if (note.noteType && defined(note.noteType.duration)) {
        elements.push((_4 = ["<type>", "</type>"], _4.raw = ["<type>", "</type>"], xml(_4, countToXML[note.noteType.duration])));
    }
    (note.dots || []).forEach(function () {
        elements.push((_5 = ["<dot />"], _5.raw = ["<dot />"], xml(_5)));
        var _5;
    });
    // ...
    // accidental?, time-modification?, stem?, notehead?,
    // ...
    if (note.accidental) {
        var accidentalAttribs = "";
        if (note.accidental.editorial !== undefined && note.accidental.editorial !== null) {
            accidentalAttribs += (_5 = [" editorial=\"", "\""], _5.raw = [" editorial=\"", "\""], yesNo(_5, note.accidental.editorial));
        }
        if (note.accidental.cautionary !== undefined && note.accidental.cautionary !== null) {
            accidentalAttribs += (_6 = [" cautionary=\"", "\""], _6.raw = [" cautionary=\"", "\""], yesNo(_6, note.accidental.cautionary));
        }
        elements.push((_7 = ["<accidental", ">", "</accidental>"], _7.raw = ["<accidental", ">", "</accidental>"], dangerous(_7, accidentalAttribs, accidentalToXML[note.accidental.accidental]))); // (safe)
    }
    if (note.timeModification) {
        var timeModificationChildren = [];
        // <!ELEMENT time-modification
        // 	(actual-notes, normal-notes,
        // 	(normal-type, normal-dot*)?)>
        // <!ELEMENT actual-notes (#PCDATA)>
        // <!ELEMENT normal-notes (#PCDATA)>
        // <!ELEMENT normal-type (#PCDATA)>
        // <!ELEMENT normal-dot EMPTY>
        if (note.timeModification.actualNotes) {
            timeModificationChildren.push((_8 = ["<actual-notes>", "</actual-notes>"], _8.raw = ["<actual-notes>", "</actual-notes>"], xml(_8, note.timeModification.actualNotes)));
        }
        if (note.timeModification.normalNotes) {
            timeModificationChildren.push((_9 = ["<normal-notes>", "</normal-notes>"], _9.raw = ["<normal-notes>", "</normal-notes>"], xml(_9, note.timeModification.normalNotes)));
        }
        if (note.timeModification.normalType) {
            timeModificationChildren.push((_10 = ["<normal-type>", "</normal-type>"], _10.raw = ["<normal-type>", "</normal-type>"], xml(_10, note.timeModification.normalType)));
        }
        (note.timeModification.normalDots || []).forEach(function () {
            timeModificationChildren.push((_11 = ["<normal-dot />"], _11.raw = ["<normal-dot />"], xml(_11)));
            var _11;
        });
        elements.push((_11 = ["<time-modification>\n", "\n</time-modification>"], _11.raw = ["<time-modification>\\n", "\\n</time-modification>"], dangerous(_11, timeModificationChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    if (note.stem) {
        var stemAttribs = "" + positionToXML(note.stem) + colorToXML(note.color);
        elements.push((_12 = ["<stem", ">", "</stem>"], _12.raw = ["<stem", ">", "</stem>"], dangerous(_12, stemAttribs, stemToXML[note.stem.type]))); // (safe)
    }
    if (note.notehead) {
        var hattribs = "" + fontToXML(note.notehead) + colorToXML(note.color);
        if (defined(note.notehead.filled)) {
            hattribs += (_13 = [" filled=\"", "\""], _13.raw = [" filled=\"", "\""], yesNo(_13, note.notehead.filled));
        }
        if (defined(note.notehead.parentheses)) {
            hattribs += (_14 = [" parentheses=\"", "\""], _14.raw = [" parentheses=\"", "\""], yesNo(_14, note.notehead.parentheses));
        }
        elements.push((_15 = ["<notehead", ">", "</notehead>"], _15.raw = ["<notehead", ">", "</notehead>"], dangerous(_15, hattribs, noteheadTypeToXML[note.notehead.type])));
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
        elements.push((_16 = ["<staff>", "</staff>"], _16.raw = ["<staff>", "</staff>"], xml(_16, note.staff)));
    }
    (note.beams || []).forEach(function (beam) {
        var beamAttribs = (_17 = [" number=\"", "\""], _17.raw = [" number=\"", "\""], xml(_17, beam.number));
        if (defined(beam.repeater)) {
            beamAttribs += (_18 = [" repeater=\"", "\""], _18.raw = [" repeater=\"", "\""], yesNo(_18, beam.repeater));
        }
        if (defined(beam.fan)) {
            beamAttribs += (_19 = [" fan=\"", "\""], _19.raw = [" fan=\"", "\""], xml(_19, accelRitNoneToXML[beam.fan]));
        }
        elements.push((_20 = ["<beam", ">", "</beam>"], _20.raw = ["<beam", ">", "</beam>"], dangerous(_20, beamAttribs, beamTypeToXML[beam.type]))); // safe
        var _17, _18, _19, _20;
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
            notationsAttribs += (_17 = [" print-object=\"", "\""], _17.raw = [" print-object=\"", "\""], yesNo(_17, notation.printObject));
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
            nChildren.push((_18 = ["<tied", " />"], _18.raw = ["<tied", " />"], dangerous(_18, startStopContinueToXML(tied) + numberLevelToXML(tied) + lineTypeToXML(tied) + dashedFormattingToXML(tied) + positionToXML(tied) + placementToXML(tied) + orientationToXML(tied) + bezierToXML(tied) + colorToXML(tied))));
            var _18;
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
            nChildren.push((_18 = ["<slur", " />"], _18.raw = ["<slur", " />"], dangerous(_18, startStopContinueToXML(slur) + numberLevelToXML(slur) + lineTypeToXML(slur) + dashedFormattingToXML(slur) + positionToXML(slur) + placementToXML(slur) + orientationToXML(slur) + bezierToXML(slur) + colorToXML(slur))));
            var _18;
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
                tattribs += (_18 = [" bracket=\"", "\""], _18.raw = [" bracket=\"", "\""], yesNo(_18, tuplet.bracket));
            }
            if (defined(tuplet.showNumber)) {
                tattribs += (_19 = [" show-number=\"", "\""], _19.raw = [" show-number=\"", "\""], xml(_19, actualBothNoneToXML[tuplet.showNumber]));
            }
            if (defined(tuplet.showType)) {
                tattribs += (_20 = [" show-type=\"", "\""], _20.raw = [" show-type=\"", "\""], xml(_20, actualBothNoneToXML[tuplet.showType]));
            }
            tattribs += lineShapeToXML(tuplet);
            tattribs += positionToXML(tuplet);
            tattribs += placementToXML(tuplet);
            var tChildren = [];
            [
                [
                    "tuplet-actual",
                    "tupletActual"
                ],
                [
                    "tuplet-normal",
                    "tupletNormal"
                ]
            ].forEach(function (tup) {
                var data = tuplet[tup[1]];
                if (!data) {
                    return;
                }
                var dataChildren = [];
                if (data.tupletNumber) {
                    var num = data.tupletNumber;
                    var pcdata = (_21 = ["", ""], _21.raw = ["", ""], xml(_21, num.text));
                    dataChildren.push((_22 = ["<tuplet-number", ">", "</tuplet-number>"], _22.raw = ["<tuplet-number", ">", "</tuplet-number>"], dangerous(_22, fontToXML(num) + colorToXML(num), pcdata)));
                }
                if (data.tupletType) {
                    var type = data.tupletType;
                    var _pcdata = (_23 = ["", ""], _23.raw = ["", ""], xml(_23, type.text));
                    dataChildren.push((_24 = ["<tuplet-type", ">", "</tuplet-type>"], _24.raw = ["<tuplet-type", ">", "</tuplet-type>"], dangerous(_24, fontToXML(type) + colorToXML(type), _pcdata)));
                }
                (data.tupletDots || []).forEach(function (dot) {
                    dataChildren.push((_25 = ["<tuplet-dot", " />"], _25.raw = ["<tuplet-dot", " />"], dangerous(_25, fontToXML(dot) + colorToXML(dot))));
                    var _25;
                });
                tChildren.push((_25 = ["<", ">\n", "\n</", ">"], _25.raw = ["<", ">\\n", "\\n</", ">"], dangerous(_25, tup[0], dataChildren.join("\n").split("\n").map(function (n) {
                    return "  " + n;
                }).join("\n"), tup[0])));
                var _21, _22, _23, _24, _25;
            });
            nChildren.push((_21 = ["<tuplet", ">\n", "\n</tuplet>"], _21.raw = ["<tuplet", ">\\n", "\\n</tuplet>"], dangerous(_21, tattribs, tChildren.join("\n").split("\n").map(function (n) {
                return "  " + n;
            }).join("\n"))));
            var _18, _19, _20, _21;
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
            var pcdata = (_18 = ["", ""], _18.raw = ["", ""], xml(_18, glissando.text));
            nChildren.push((_19 = ["<glissando", ">", "</glissando>"], _19.raw = ["<glissando", ">", "</glissando>"], dangerous(_19, startStopToXML(glissando) + numberLevelToXML(glissando) + lineTypeToXML(glissando) + dashedFormattingToXML(glissando) + printStyleToXML(glissando), pcdata)));
            var _18, _19;
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
            var pcdata = (_18 = ["", ""], _18.raw = ["", ""], xml(_18, slide.text));
            nChildren.push((_19 = ["<slide", ">", "</slide>"], _19.raw = ["<slide", ">", "</slide>"], dangerous(_19, startStopToXML(slide) + numberLevelToXML(slide) + lineTypeToXML(slide) + dashedFormattingToXML(slide) + printStyleToXML(slide) + bendSoundToXML(slide), pcdata)));
            var _18, _19;
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
                oChildren.push((_18 = ["<trill-mark", " />"], _18.raw = ["<trill-mark", " />"], dangerous(_18, printStyleToXML(ornaments.trillMark) + placementToXML(ornaments.trillMark) + trillSoundToXML(ornaments.trillMark))));
            }
            // <!ATTLIST turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.turn) {
                oChildren.push((_19 = ["<turn", " />"], _19.raw = ["<turn", " />"], dangerous(_19, printStyleToXML(ornaments.turn) + placementToXML(ornaments.turn) + trillSoundToXML(ornaments.turn) + slashToXML(ornaments.turn))));
            }
            // <!ATTLIST delayed-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedTurn) {
                oChildren.push((_20 = ["<delayed-turn", " />"], _20.raw = ["<delayed-turn", " />"], dangerous(_20, printStyleToXML(ornaments.delayedTurn) + placementToXML(ornaments.delayedTurn) + trillSoundToXML(ornaments.delayedTurn) + slashToXML(ornaments.delayedTurn))));
            }
            // <!ATTLIST inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.invertedTurn) {
                oChildren.push((_21 = ["<inverted-turn", " />"], _21.raw = ["<inverted-turn", " />"], dangerous(_21, printStyleToXML(ornaments.invertedTurn) + placementToXML(ornaments.invertedTurn) + trillSoundToXML(ornaments.invertedTurn) + slashToXML(ornaments.invertedTurn))));
            }
            // <!ATTLIST delayed-inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedInvertedTurn) {
                oChildren.push((_22 = ["<delayed-inverted-turn", " />"], _22.raw = ["<delayed-inverted-turn", " />"], dangerous(_22, printStyleToXML(ornaments.delayedInvertedTurn) + placementToXML(ornaments.delayedInvertedTurn) + trillSoundToXML(ornaments.delayedInvertedTurn) + slashToXML(ornaments.delayedInvertedTurn))));
            }
            // <!ATTLIST vertical-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.verticalTurn) {
                oChildren.push((_23 = ["<vertical-turn", " />"], _23.raw = ["<vertical-turn", " />"], dangerous(_23, printStyleToXML(ornaments.verticalTurn) + placementToXML(ornaments.verticalTurn) + trillSoundToXML(ornaments.verticalTurn))));
            }
            // 
            // <!ATTLIST shake
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.shake) {
                oChildren.push((_24 = ["<shake", " />"], _24.raw = ["<shake", " />"], dangerous(_24, printStyleToXML(ornaments.shake) + placementToXML(ornaments.shake) + trillSoundToXML(ornaments.shake))));
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
                oChildren.push((_25 = ["<mordent", " />"], _25.raw = ["<mordent", " />"], dangerous(_25, mordentSubsetToXML(ornaments.mordent) + printStyleToXML(ornaments.mordent) + placementToXML(ornaments.mordent) + trillSoundToXML(ornaments.mordent))));
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
                oChildren.push((_26 = ["<inverted-mordent", " />"], _26.raw = ["<inverted-mordent", " />"], dangerous(_26, mordentSubsetToXML(ornaments.invertedMordent) + printStyleToXML(ornaments.invertedMordent) + placementToXML(ornaments.invertedMordent) + trillSoundToXML(ornaments.invertedMordent))));
            }
            // 
            // <!ATTLIST schleifer
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.schleifer) {
                oChildren.push((_27 = ["<schleifer", " />"], _27.raw = ["<schleifer", " />"], dangerous(_27, printStyleToXML(ornaments.schleifer) + placementToXML(ornaments.schleifer))));
            }
            // 
            // <!ELEMENT tremolo (#PCDATA)>
            // <!ATTLIST tremolo
            //     type %start-stop-single; "single"
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.tremolo) {
                var pcdata = (_28 = ["", ""], _28.raw = ["", ""], xml(_28, ornaments.tremolo.data || ""));
                oChildren.push((_29 = ["<tremolo", ">", "</tremolo>"], _29.raw = ["<tremolo", ">", "</tremolo>"], dangerous(_29, startStopSingleToXML(ornaments.tremolo) + printStyleToXML(ornaments.tremolo) + placementToXML(ornaments.tremolo), pcdata)));
            }
            // 
            // <!ELEMENT other-ornament (#PCDATA)>
            // <!ATTLIST other-ornament
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.otherOrnament) {
                var _pcdata = (_30 = ["", ""], _30.raw = ["", ""], xml(_30, ornaments.otherOrnament.data || ""));
                oChildren.push((_31 = ["<other-ornament", ">", "</other-ornament>"], _31.raw = ["<other-ornament", ">", "</other-ornament>"], dangerous(_31, printStyleToXML(ornaments.otherOrnament) + placementToXML(ornaments.otherOrnament), _pcdata)));
            }
            // 
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            (ornaments.accidentalMarks || []).forEach(function (accidentalMark) {
                var _pcdata_1 = (_32 = ["", ""], _32.raw = ["", ""], xml(_32, accidentalMark.mark || ""));
                oChildren.push((_33 = ["<accidental-mark", ">", "</accidental-mark>"], _33.raw = ["<accidental-mark", ">", "</accidental-mark>"], dangerous(_33, printStyleToXML(accidentalMark) + placementToXML(accidentalMark), _pcdata_1)));
                var _32, _33;
            });
            nChildren.push((_32 = ["<ornaments>\n", "\n</ornaments>"], _32.raw = ["<ornaments>\\n", "\\n</ornaments>"], dangerous(_32, oChildren.join("\n").split("\n").map(function (n) {
                return "  " + n;
            }).join("\n"))));
            var _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32;
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
                oChildren.push((_18 = ["<up-bow", " />"], _18.raw = ["<up-bow", " />"], dangerous(_18, printStyleToXML(technical.upBow) + placementToXML(technical.upBow))));
            }
            // <!ATTLIST down-bow
            //     %print-style;
            //     %placement;
            // >
            if (technical.downBow) {
                oChildren.push((_19 = ["<down-bow", " />"], _19.raw = ["<down-bow", " />"], dangerous(_19, printStyleToXML(technical.downBow) + placementToXML(technical.downBow))));
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
                    hChildren.push((_20 = ["<natural />"], _20.raw = ["<natural />"], xml(_20)));
                }
                if (technical.harmonic.artificial) {
                    hChildren.push((_21 = ["<artificial />"], _21.raw = ["<artificial />"], xml(_21)));
                }
                if (technical.harmonic.basePitch) {
                    hChildren.push((_22 = ["<base-pitch />"], _22.raw = ["<base-pitch />"], xml(_22)));
                }
                if (technical.harmonic.touchingPitch) {
                    hChildren.push((_23 = ["<touching-pitch />"], _23.raw = ["<touching-pitch />"], xml(_23)));
                }
                if (technical.harmonic.soundingPitch) {
                    hChildren.push((_24 = ["<sounding-pitch />"], _24.raw = ["<sounding-pitch />"], xml(_24)));
                }
                oChildren.push((_25 = ["<harmonic", ">", "\n</harmonic>"], _25.raw = ["<harmonic", ">", "\\n</harmonic>"], dangerous(_25, printObjectToXML(technical.harmonic) + printStyleToXML(technical.harmonic) + placementToXML(technical.harmonic), hChildren.join("\n").split("\n").map(function (n) {
                    return "  " + n;
                }).join("\n"))));
            }
            // <!ATTLIST open-string
            //     %print-style;
            //     %placement;
            // >
            if (technical.openString) {
                oChildren.push((_26 = ["<open-string", " />"], _26.raw = ["<open-string", " />"], dangerous(_26, printStyleToXML(technical.openString) + placementToXML(technical.openString))));
            }
            // 
            // <!ATTLIST thumb-position
            //     %print-style;
            //     %placement;
            // >
            if (technical.thumbPosition) {
                oChildren.push((_27 = ["<thumb-position", " />"], _27.raw = ["<thumb-position", " />"], dangerous(_27, printStyleToXML(technical.thumbPosition) + placementToXML(technical.thumbPosition))));
            }
            // 
            // <!ELEMENT pluck (#PCDATA)>
            // <!ATTLIST pluck
            //     %print-style;
            //     %placement;
            // >
            if (technical.pluck) {
                oChildren.push((_28 = ["<pluck", " />"], _28.raw = ["<pluck", " />"], dangerous(_28, printStyleToXML(technical.pluck) + placementToXML(technical.pluck))));
            }
            // 
            // <!ATTLIST double-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.doubleTongue) {
                oChildren.push((_29 = ["<double-tongue", " />"], _29.raw = ["<double-tongue", " />"], dangerous(_29, printStyleToXML(technical.doubleTongue) + placementToXML(technical.doubleTongue))));
            }
            // 
            // <!ATTLIST triple-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.tripleTongue) {
                oChildren.push((_30 = ["<triple-tongue", " />"], _30.raw = ["<triple-tongue", " />"], dangerous(_30, printStyleToXML(technical.tripleTongue) + placementToXML(technical.tripleTongue))));
            }
            // 
            // <!ATTLIST stopped
            //     %print-style;
            //     %placement;
            // >
            if (technical.stopped) {
                oChildren.push((_31 = ["<stopped", " />"], _31.raw = ["<stopped", " />"], dangerous(_31, printStyleToXML(technical.stopped) + placementToXML(technical.stopped))));
            }
            // 
            // <!ATTLIST snap-pizzicato
            //     %print-style;
            //     %placement;
            // >
            if (technical.snapPizzicato) {
                oChildren.push((_32 = ["<snap-pizzicato", " />"], _32.raw = ["<snap-pizzicato", " />"], dangerous(_32, printStyleToXML(technical.snapPizzicato) + placementToXML(technical.snapPizzicato))));
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
                var pcdata = (_33 = ["", ""], _33.raw = ["", ""], xml(_33, technical.hammerOn.data));
                oChildren.push((_34 = ["<hammer-on", ">", "</hammer-on>"], _34.raw = ["<hammer-on", ">", "</hammer-on>"], dangerous(_34, startStopToXML(technical.hammerOn) + numberLevelToXML(technical.hammerOn) + printStyleToXML(technical.hammerOn) + placementToXML(technical.hammerOn), pcdata)));
            }
            // <!ELEMENT pull-off (#PCDATA)>
            // <!ATTLIST pull-off
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %print-style;
            //     %placement;
            // >
            if (technical.pullOff) {
                var _pcdata = (_35 = ["", ""], _35.raw = ["", ""], xml(_35, technical.pullOff.data));
                oChildren.push((_36 = ["<pull-off", ">", "</pull-off>"], _36.raw = ["<pull-off", ">", "</pull-off>"], dangerous(_36, startStopToXML(technical.pullOff) + numberLevelToXML(technical.pullOff) + printStyleToXML(technical.pullOff) + placementToXML(technical.pullOff), _pcdata)));
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
                    bendChildren.push((_37 = ["<bend-alter>", "</bend-alter>"], _37.raw = ["<bend-alter>", "</bend-alter>"], xml(_37, technical.bend.bendAlter)));
                }
                if (defined(technical.bend.preBend)) {
                    bendChildren.push((_38 = ["<pre-bend />"], _38.raw = ["<pre-bend />"], xml(_38)));
                }
                else if (defined(technical.bend.release)) {
                    bendChildren.push((_39 = ["<release />"], _39.raw = ["<release />"], xml(_39)));
                }
                if (defined(technical.bend.withBar)) {
                    var _pcdata_1 = (_40 = ["", ""], _40.raw = ["", ""], xml(_40, technical.bend.withBar.data));
                    bendChildren.push((_41 = ["<with-bar", ">", "</with-bar>"], _41.raw = ["<with-bar", ">", "</with-bar>"], dangerous(_41, printStyleToXML(technical.bend.withBar) + placementToXML(technical.bend.withBar), _pcdata_1)));
                }
                oChildren.push((_42 = ["<bend", ">\n", "\n</bend>"], _42.raw = ["<bend", ">\\n", "\\n</bend>"], dangerous(_42, printStyleToXML(technical.bend) + bendSoundToXML(technical.bend), bendChildren.join("\n").split("\n").map(function (n) {
                    return "  " + n;
                }).join("\n"))));
            }
            // 
            // <!ELEMENT tap (#PCDATA)>
            // <!ATTLIST tap
            //     %print-style;
            //     %placement;
            // >
            if (technical.tap) {
                var _pcdata_2 = (_43 = ["", ""], _43.raw = ["", ""], xml(_43, technical.tap.data));
                oChildren.push((_44 = ["<tap", ">", "</tap>"], _44.raw = ["<tap", ">", "</tap>"], dangerous(_44, printStyleToXML(technical.tap) + placementToXML(technical.tap), _pcdata_2)));
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
                    substitution += (_45 = [" substitution=\"", "\""], _45.raw = [" substitution=\"", "\""], yesNo(_45, technical.heel.substitution));
                }
                oChildren.push((_46 = ["<heel", " />"], _46.raw = ["<heel", " />"], dangerous(_46, substitution + printStyleToXML(technical.heel) + placementToXML(technical.heel))));
            }
            // <!ATTLIST toe
            //     substitution %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            if (technical.toe) {
                var _substitution = "";
                if (defined(technical.toe.substitution)) {
                    _substitution += (_47 = [" substitution=\"", "\""], _47.raw = [" substitution=\"", "\""], yesNo(_47, technical.toe.substitution));
                }
                oChildren.push((_48 = ["<toe", " />"], _48.raw = ["<toe", " />"], dangerous(_48, _substitution + printStyleToXML(technical.toe) + placementToXML(technical.toe))));
            }
            // 
            // <!ATTLIST fingernails
            //     %print-style;
            //     %placement;
            // >
            if (technical.fingernails) {
                oChildren.push((_49 = ["<fingernails", " />"], _49.raw = ["<fingernails", " />"], dangerous(_49, printStyleToXML(technical.fingernails) + placementToXML(technical.fingernails))));
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
                    holeChildren.push((_50 = ["<hole-type>", "</hole-type>"], _50.raw = ["<hole-type>", "</hole-type>"], xml(_50, technical.hole.holeType)));
                }
                if (defined(technical.hole.holeClosed)) {
                    var holeClosedAttribs = "";
                    if (defined(technical.hole.holeClosed.location)) {
                        holeClosedAttribs = (_51 = [" location=\"", "\""], _51.raw = [" location=\"", "\""], xml(_51, holeLocationToXML[technical.hole.holeClosed.location]));
                    }
                    holeChildren.push((_52 = ["<hole-closed", ">", "</hole-closed>"], _52.raw = ["<hole-closed", ">", "</hole-closed>"], dangerous(_52, holeClosedAttribs, holeClosedTypeToXML[technical.hole.holeClosed.data])));
                }
                if (defined(technical.hole.holeShape)) {
                    holeChildren.push((_53 = ["<hole-shape>", "</hole-shape>"], _53.raw = ["<hole-shape>", "</hole-shape>"], xml(_53, technical.hole.holeShape)));
                }
                oChildren.push((_54 = ["<hole", ">", "\n</hole>"], _54.raw = ["<hole", ">", "\\n</hole>"], dangerous(_54, printStyleToXML(technical.hole) + placementToXML(technical.hole), holeChildren.join("\n").split("\n").map(function (n) {
                    return "  " + n;
                }).join("\n"))));
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
                    arrowChildren.push((_55 = ["<arrow-direction>\n                        ", "</arrow-direction>"], _55.raw = ["<arrow-direction>\n                        ", "</arrow-direction>"], xml(_55, technical.arrow.arrowDirection)));
                }
                if (defined(technical.arrow.arrowStyle)) {
                    arrowChildren.push((_56 = ["<arrow-style>\n                        ", "</arrow-style>"], _56.raw = ["<arrow-style>\n                        ", "</arrow-style>"], xml(_56, technical.arrow.arrowStyle)));
                }
                if (defined(technical.arrow.circularArrow)) {
                    arrowChildren.push((_57 = ["<circular-arrow>>\n                        ", "</circular-arrow>"], _57.raw = ["<circular-arrow>>\n                        ", "</circular-arrow>"], xml(_57, technical.arrow.circularArrow)));
                }
                oChildren.push((_58 = ["<arrow", ">", "\n</arrow>"], _58.raw = ["<arrow", ">", "\\n</arrow>"], dangerous(_58, printStyleToXML(technical.arrow) + placementToXML(technical.arrow), arrowChildren.join("\n").split("\n").map(function (n) {
                    return "  " + n;
                }).join("\n"))));
            }
            // 
            // <!ELEMENT handbell (#PCDATA)>
            // <!ATTLIST handbell
            //     %print-style;
            //     %placement;
            // >
            if (technical.handbell) {
                var _pcdata_3 = (_59 = ["", ""], _59.raw = ["", ""], xml(_59, technical.handbell.data));
                oChildren.push((_60 = ["<handbell", ">", "</handbell>"], _60.raw = ["<handbell", ">", "</handbell>"], dangerous(_60, printStyleToXML(technical.handbell) + placementToXML(technical.handbell), _pcdata_3)));
            }
            // 
            // <!ELEMENT other-technical (#PCDATA)>
            // <!ATTLIST other-technical
            //     %print-style;
            //     %placement;
            // >
            if (technical.otherTechnical) {
                var _pcdata_4 = (_61 = ["", ""], _61.raw = ["", ""], xml(_61, technical.otherTechnical.data));
                oChildren.push((_62 = ["<other-technical", ">", "</other-technical>"], _62.raw = ["<other-technical", ">", "</other-technical>"], dangerous(_62, printStyleToXML(technical.otherTechnical) + placementToXML(technical.otherTechnical), _pcdata_4)));
            }
            nChildren.push((_63 = ["<technical>\n", "\n</technical>"], _63.raw = ["<technical>\\n", "\\n</technical>"], dangerous(_63, oChildren.join("\n").split("\n").map(function (n) {
                return "  " + n;
            }).join("\n"))));
            var _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63;
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
                oChildren.push((_18 = ["<accent", " />"], _18.raw = ["<accent", " />"], dangerous(_18, printStyleToXML(articulation.accent) + placementToXML(articulation.accent))));
            }
            // <!ATTLIST strong-accent
            //     %print-style;
            //     %placement;
            //     type %up-down; "up"
            // >
            if (articulation.strongAccent) {
                oChildren.push((_19 = ["<strong-accent", " />"], _19.raw = ["<strong-accent", " />"], dangerous(_19, printStyleToXML(articulation.strongAccent) + placementToXML(articulation.strongAccent) + upDownToXML(articulation.strongAccent))));
            }
            // 
            // <!ATTLIST staccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccato) {
                oChildren.push((_20 = ["<staccato", " />"], _20.raw = ["<staccato", " />"], dangerous(_20, printStyleToXML(articulation.staccato) + placementToXML(articulation.staccato))));
            }
            // <!ATTLIST tenuto
            //     %print-style;
            //     %placement;
            // >
            if (articulation.tenuto) {
                oChildren.push((_21 = ["<tenuto", " />"], _21.raw = ["<tenuto", " />"], dangerous(_21, printStyleToXML(articulation.tenuto) + placementToXML(articulation.tenuto))));
            }
            // <!ATTLIST detached-legato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.detachedLegato) {
                oChildren.push((_22 = ["<detached-legato", " />"], _22.raw = ["<detached-legato", " />"], dangerous(_22, printStyleToXML(articulation.detachedLegato) + placementToXML(articulation.detachedLegato))));
            }
            // 
            // <!ATTLIST staccatissimo
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccatissimo) {
                oChildren.push((_23 = ["<staccatissimo", " />"], _23.raw = ["<staccatissimo", " />"], dangerous(_23, printStyleToXML(articulation.staccatissimo) + placementToXML(articulation.staccatissimo))));
            }
            // 
            // <!ATTLIST spiccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.spiccato) {
                oChildren.push((_24 = ["<spiccato", " />"], _24.raw = ["<spiccato", " />"], dangerous(_24, printStyleToXML(articulation.spiccato) + placementToXML(articulation.spiccato))));
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
                oChildren.push((_25 = ["<scoop", " />"], _25.raw = ["<scoop", " />"], dangerous(_25, lineShapeToXML(articulation.scoop) + lineTypeToXML(articulation.scoop) + dashedFormattingToXML(articulation.scoop) + printStyleToXML(articulation.scoop) + placementToXML(articulation.scoop))));
            }
            // <!ATTLIST plop
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.plop) {
                oChildren.push((_26 = ["<plop", " />"], _26.raw = ["<plop", " />"], dangerous(_26, lineShapeToXML(articulation.plop) + lineTypeToXML(articulation.plop) + dashedFormattingToXML(articulation.plop) + printStyleToXML(articulation.plop) + placementToXML(articulation.plop))));
            }
            // <!ATTLIST doit
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.doit) {
                oChildren.push((_27 = ["<doit", " />"], _27.raw = ["<doit", " />"], dangerous(_27, lineShapeToXML(articulation.doit) + lineTypeToXML(articulation.doit) + dashedFormattingToXML(articulation.doit) + printStyleToXML(articulation.doit) + placementToXML(articulation.doit))));
            }
            // <!ATTLIST falloff
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.falloff) {
                oChildren.push((_28 = ["<falloff", " />"], _28.raw = ["<falloff", " />"], dangerous(_28, lineShapeToXML(articulation.falloff) + lineTypeToXML(articulation.falloff) + dashedFormattingToXML(articulation.falloff) + printStyleToXML(articulation.falloff) + placementToXML(articulation.falloff))));
            }
            // 
            // <!ELEMENT breath-mark (#PCDATA)>
            // <!ATTLIST breath-mark
            //     %print-style;
            //     %placement;
            // >
            if (articulation.breathMark) {
                var pcdata = (_29 = ["", ""], _29.raw = ["", ""], xml(_29, breathMarkTypeToXML[articulation.breathMark.type]));
                oChildren.push((_30 = ["<breath-mark", ">", "</breath-mark>"], _30.raw = ["<breath-mark", ">", "</breath-mark>"], dangerous(_30, printStyleToXML(articulation.breathMark) + placementToXML(articulation.breathMark), pcdata)));
            }
            // 
            // <!ATTLIST caesura
            //     %print-style;
            //     %placement;
            // >
            if (articulation.caesura) {
                oChildren.push((_31 = ["<caesura", " />"], _31.raw = ["<caesura", " />"], dangerous(_31, printStyleToXML(articulation.caesura) + placementToXML(articulation.caesura))));
            }
            // <!ATTLIST stress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.stress) {
                oChildren.push((_32 = ["<stress", " />"], _32.raw = ["<stress", " />"], dangerous(_32, printStyleToXML(articulation.stress) + placementToXML(articulation.stress))));
            }
            // <!ATTLIST unstress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.unstress) {
                oChildren.push((_33 = ["<unstress", " />"], _33.raw = ["<unstress", " />"], dangerous(_33, printStyleToXML(articulation.unstress) + placementToXML(articulation.unstress))));
            }
            // <!ELEMENT other-articulation (#PCDATA)>
            // <!ATTLIST other-articulation
            //     %print-style;
            //     %placement;
            // >
            (articulation.otherArticulations || []).forEach(function (articulation) {
                var _pcdata = (_34 = ["", ""], _34.raw = ["", ""], xml(_34, articulation.data));
                oChildren.push((_35 = ["<other-articulation", ">", "</other-articulation>"], _35.raw = ["<other-articulation", ">", "</other-articulation>"], dangerous(_35, printStyleToXML(articulation) + placementToXML(articulation), _pcdata)));
                var _34, _35;
            });
            nChildren.push((_34 = ["<articulations>\n", "\n</articulations>"], _34.raw = ["<articulations>\\n", "\\n</articulations>"], dangerous(_34, oChildren.join("\n").split("\n").map(function (n) {
                return "  " + n;
            }).join("\n"))));
            var _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34;
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
            nChildren.push((_18 = ["<arpeggiate", " />"], _18.raw = ["<arpeggiate", " />"], dangerous(_18, numberLevelToXML(arpeggiate) + upDownToXML(arpeggiate) + positionToXML(arpeggiate) + placementToXML(arpeggiate) + colorToXML(arpeggiate))));
            var _18;
        });
        (notation.nonArpeggiates || []).forEach(function (nonArpeggiate) {
            // <!ATTLIST non-arpeggiate
            //     type %top-bottom; #REQUIRED
            //     number %number-level; #IMPLIED
            //     %position;
            //     %placement;
            //     %color;
            // >
            nChildren.push((_18 = ["<non-arpeggiate", " />"], _18.raw = ["<non-arpeggiate", " />"], dangerous(_18, topBottomToXML(nonArpeggiate) + numberLevelToXML(nonArpeggiate) + positionToXML(nonArpeggiate) + placementToXML(nonArpeggiate) + colorToXML(nonArpeggiate))));
            var _18;
        });
        (notation.accidentalMarks || []).forEach(function (accidentalMark) {
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            var pcdata = (_18 = ["", ""], _18.raw = ["", ""], xml(_18, accidentalMark.mark));
            nChildren.push((_19 = ["<accidental-mark", ">", "</accidental-mark>"], _19.raw = ["<accidental-mark", ">", "</accidental-mark>"], dangerous(_19, printStyleToXML(accidentalMark) + placementToXML(accidentalMark), pcdata)));
            var _18, _19;
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
            var pcdata = (_18 = ["", ""], _18.raw = ["", ""], xml(_18, otherNotation.data));
            nChildren.push((_19 = ["<other-notation", ">", "</other-notation>"], _19.raw = ["<other-notation", ">", "</other-notation>"], dangerous(_19, startStopSingleToXML(otherNotation) + numberLevelToXML(otherNotation) + printObjectToXML(otherNotation) + printStyleToXML(otherNotation) + placementToXML(otherNotation), pcdata)));
            var _18, _19;
        });
        elements.push((_18 = ["<notations", ">\n", "\n</notations>"], _18.raw = ["<notations", ">\\n", "\\n</notations>"], dangerous(_18, notationsAttribs, nChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
        var _17, _18;
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
        var lyricAttribs = "" + numberLevelToXML(lyric) + nameToXML(lyric) + justifyToXML(lyric) + positionToXML(lyric) + placementToXML(lyric) + colorToXML(lyric) + printObjectToXML(lyric);
        var lyricChildren = [];
        (lyric.lyricParts || []).forEach(function (part) {
            // relies on part._class as set in musicxml-interfaces
            switch (part._class) {
                case "Syllabic":
                    // <!ELEMENT syllabic (#PCDATA)>
                    lyricChildren.push((_17 = ["<syllabic>", "</syllabic>"], _17.raw = ["<syllabic>", "</syllabic>"], dangerous(_17, syllabicTypeToXML[part.data])));
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
                    var textpcdata = (_18 = ["", ""], _18.raw = ["", ""], xml(_18, part.data));
                    lyricChildren.push((_19 = ["<text", ">", "</text>"], _19.raw = ["<text", ">", "</text>"], dangerous(_19, fontToXML(part) + colorToXML(part) + textDecorationToXML(part) + textRotationToXML(part) + letterSpacingToXML(part) + textDirectionToXML(part), textpcdata)));
                    break;
                case "Elision":
                    // <!ELEMENT elision (#PCDATA)>
                    // <!ATTLIST elision
                    //     %font;
                    //     %color;
                    // >
                    var pcdata = (_20 = ["", ""], _20.raw = ["", ""], xml(_20, part.data));
                    lyricChildren.push((_21 = ["<elision", ">", "</elision>"], _21.raw = ["<elision", ">", "</elision>"], dangerous(_21, startStopContinueToXML(part) + printStyleToXML(part), pcdata)));
                    break;
                case "Extend":
                    // <!ELEMENT extend EMPTY>
                    // <!ATTLIST extend
                    //     type %start-stop-continue; #IMPLIED
                    //     %print-style;
                    // >
                    lyricChildren.push((_22 = ["<extend", " />"], _22.raw = ["<extend", " />"], dangerous(_22, startStopContinueToXML(part) + printStyleToXML(part))));
                    break;
                case "Laughing":
                    // <!ELEMENT laughing EMPTY>
                    lyricChildren.push((_23 = ["<laughing />"], _23.raw = ["<laughing />"], xml(_23)));
                    break;
                case "Humming":
                    // <!ELEMENT humming EMPTY>
                    lyricChildren.push((_24 = ["<humming />"], _24.raw = ["<humming />"], xml(_24)));
                    break;
                case "EndLine":
                    // <!ELEMENT end-line EMPTY>
                    lyricChildren.push((_25 = ["<end-line />"], _25.raw = ["<end-line />"], xml(_25)));
                    break;
                case "EndParagraph":
                    // <!ELEMENT end-paragraph EMPTY>
                    lyricChildren.push((_26 = ["<end-paragraph />"], _26.raw = ["<end-paragraph />"], xml(_26)));
                    break;
                case "Footnote":
                case "Level":
                case "Editorial":
                    lyricChildren = lyricChildren.concat(editorialToXML(part));
                    break;
            }
            var _17, _18, _19, _20, _21, _22, _23, _24, _25, _26;
        });
        elements.push((_17 = ["<lyric", ">\n", "\n</lyric>"], _17.raw = ["<lyric", ">\\n", "\\n</lyric>"], dangerous(_17, lyricAttribs, lyricChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
        var _17;
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
            playChildren.push((_17 = ["<ipa>", "</ipa>"], _17.raw = ["<ipa>", "</ipa>"], xml(_17, note.play.ipa)));
        }
        // <!ELEMENT mute (#PCDATA)>
        if (defined(note.play.mute)) {
            playChildren.push((_18 = ["<mute>", "</mute>"], _18.raw = ["<mute>", "</mute>"], xml(_18, note.play.mute)));
        }
        // <!ELEMENT semi-pitched (#PCDATA)>
        if (defined(note.play.semiPitched)) {
            playChildren.push((_19 = ["<semi-pitched>", "</semi-pitched>"], _19.raw = ["<semi-pitched>", "</semi-pitched>"], xml(_19, note.play.semiPitched)));
        }
        // <!ELEMENT other-play (#PCDATA)>
        // <!ATTLIST other-play
        //     type CDATA #REQUIRED
        // >
        if (defined(note.play.otherPlay)) {
            var oPcdata = (_20 = ["", ""], _20.raw = ["", ""], xml(_20, note.play.otherPlay.data));
            var oAttribs = "";
            if (defined(note.play.otherPlay.type)) {
                oAttribs += (_21 = [" type=\"", "\""], _21.raw = [" type=\"", "\""], xml(_21, note.play.otherPlay.type));
            }
            playChildren.push((_22 = ["<other-play", ">", "</other-play>"], _22.raw = ["<other-play", ">", "</other-play>"], dangerous(_22, oAttribs, oPcdata)));
        }
        elements.push((_23 = ["<play", ">\n", "\n</play>"], _23.raw = ["<play", ">\\n", "\\n</play>"], dangerous(_23, playAttribs, playChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
    }
    return (_24 = ["<note", ">\n", "\n</note>"], _24.raw = ["<note", ">\\n", "\\n</note>"], dangerous(_24, attribs, elements.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
}
exports.noteToXML = noteToXML;
function figuredBassToXML(figuredBass) {
    // <!ELEMENT figured-bass (figure+, duration?, %editorial;)>
    // <!ATTLIST figured-bass
    //     %print-style;
    //     %printout;
    //     parentheses %yes-no; #IMPLIED
    // >
    var attribs = "" + printStyleToXML(figuredBass) + printoutToXML(figuredBass);
    if (defined(figuredBass.parentheses)) {
        attribs += (_d = [" parentheses=\"", "\""], _d.raw = [" parentheses=\"", "\""], yesNo(_d, figuredBass.parentheses));
    }
    var children = [];
    children = children.concat(staffDebugInfoToXMLComment(figuredBass));
    (figuredBass.figures || []).forEach(function (figuredBass) {
        // <!ELEMENT figure (prefix?, figure-number?, suffix?, extend?)>
        // <!ELEMENT prefix (#PCDATA)>
        // <!ATTLIST prefix
        //     %print-style;
        // >
        // <!ELEMENT figure-number (#PCDATA)>
        // <!ATTLIST figure-number
        //     %print-style;
        // >
        // <!ELEMENT suffix (#PCDATA)>
        // <!ATTLIST suffix
        //     %print-style;
        // >
        // TODO: not implemented
    });
    if (defined(figuredBass.duration)) {
        children.push((_e = ["<duration>", "</duration>"], _e.raw = ["<duration>", "</duration>"], xml(_e, figuredBass.duration)));
    }
    children = children.concat(editorialToXML(figuredBass));
    return (_f = ["<figured-bass", ">\n", "\n</figured-bass>"], _f.raw = ["<figured-bass", ">\\n", "\\n</figured-bass>"], dangerous(_f, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _d, _e, _f;
}
exports.figuredBassToXML = figuredBassToXML;
var barlineLocationToXML = {
    1: "right",
    2: "middle",
    0: "left"
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
        attribs += (_d = [" location=\"", "\""], _d.raw = [" location=\"", "\""], xml(_d, barlineLocationToXML[barline.location]));
    }
    if (defined(barline.segnoAttrib)) {
        attribs += (_e = [" segno=\"", "\""], _e.raw = [" segno=\"", "\""], xml(_e, barline.segnoAttrib));
    }
    if (defined(barline.codaAttrib)) {
        attribs += (_f = [" coda=\"", "\""], _f.raw = [" coda=\"", "\""], xml(_f, barline.codaAttrib));
    }
    if (defined(barline.divisions)) {
        attribs += (_g = [" divisions=\"", "\""], _g.raw = [" divisions=\"", "\""], xml(_g, barline.divisions));
    }
    return (_h = ["<barline", ">\n", "\n</barline>"], _h.raw = ["<barline", ">\\n", "\\n</barline>"], dangerous(_h, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _d, _e, _f, _g, _h;
}
exports.barlineToXML = barlineToXML;
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
    return (_d = ["<direction-type>\n", "\n</direction-type>"], _d.raw = ["<direction-type>\\n", "\\n</direction-type>"], dangerous(_d, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _d;
}
function offsetToXML(offset) {
    // <!ELEMENT offset (#PCDATA)>
    // <!ATTLIST offset
    //     sound %yes-no; #IMPLIED
    // >
    var pcdata = (_d = ["", ""], _d.raw = ["", ""], xml(_d, offset.data || ""));
    var attribs = (_e = [" sound=\"", "\""], _e.raw = [" sound=\"", "\""], yesNo(_e, offset.sound));
    return (_f = ["<offset", ">", "</offset>"], _f.raw = ["<offset", ">", "</offset>"], dangerous(_f, attribs, pcdata));
    var _d, _e, _f;
}
function rehearsalToXML(rehearsal) {
    // <!ELEMENT rehearsal (#PCDATA)>
    // <!ATTLIST rehearsal
    //     %text-formatting;
    // >
    var pcdata = (_d = ["", ""], _d.raw = ["", ""], xml(_d, rehearsal.data));
    return (_e = ["<rehearsal", ">", "</rehearsal>"], _e.raw = ["<rehearsal", ">", "</rehearsal>"], dangerous(_e, textFormattingToXML(rehearsal), pcdata));
    var _d, _e;
}
function wordsToXML(words) {
    // <!ELEMENT words (#PCDATA)>
    // <!ATTLIST words
    //     %text-formatting;
    // >
    var pcdata = (_d = ["", ""], _d.raw = ["", ""], xml(_d, words.data));
    return (_e = ["<words", ">", "</words>"], _e.raw = ["<words", ">", "</words>"], dangerous(_e, textFormattingToXML(words), pcdata));
    var _d, _e;
}
var wedgeTypeToXML = (_d = {},
    _d[1 /* Diminuendo */] = "diminuendo",
    _d[0 /* Crescendo */] = "crescendo",
    _d[2 /* Stop */] = "stop",
    _d[3 /* Continue */] = "continue",
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
    var attribs = "" + (_e = [" type=\"", "\""], _e.raw = [" type=\"", "\""], xml(_e, wedgeTypeToXML[wedge.type])) + numberLevelToXML(wedge);
    if (defined(wedge.spread)) {
        attribs += (_f = [" spread=\"", "\""], _f.raw = [" spread=\"", "\""], xml(_f, wedge.spread));
    }
    // TODO musicxml-interfaces: **niente not neinte
    // if (defined(wedge.niente)) {
    //     attribs += yesNo ` niente="${wedge.niente}"`;
    // }
    attribs += lineTypeToXML(wedge) + dashedFormattingToXML(wedge) + positionToXML(wedge) + colorToXML(wedge);
    return (_g = ["<wedge", " />"], _g.raw = ["<wedge", " />"], dangerous(_g, attribs));
    var _e, _f, _g;
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
        if (!!subDynamic && [
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
            "fz"
        ].indexOf(key) !== -1) {
            oChildren.push((_e = ["<", " />"], _e.raw = ["<", " />"], dangerous(_e, key)));
        }
        var _e;
    });
    if (dynamics.otherDynamics) {
        oChildren.push((_e = ["<other-dynamics>", "</other-dynamics>"], _e.raw = ["<other-dynamics>", "</other-dynamics>"], xml(_e, dynamics.otherDynamics)));
    }
    return (_f = ["<dynamics", ">\n", "\n</dynamics>"], _f.raw = ["<dynamics", ">\\n", "\\n</dynamics>"], dangerous(_f, printStyleAlignToXML(dynamics) + placementToXML(dynamics) + textDecorationToXML(dynamics) + enclosureToXML(dynamics), oChildren.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _e, _f;
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
    var attribs = "" + startStopContinueToXML(dashes) + numberLevelToXML(dashes) + dashedFormattingToXML(dashes) + positionToXML(dashes) + colorToXML(dashes);
    return (_e = ["<dashes", " />"], _e.raw = ["<dashes", " />"], dangerous(_e, attribs));
    var _e;
}
var lineEndTypeToXML = (_e = {},
    _e[4 /* None */] = "none",
    _e[2 /* Both */] = "both",
    _e[3 /* Arrow */] = "arrow",
    _e[1 /* Down */] = "down",
    _e[0 /* Up */] = "up",
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
    attribs += (_f = [" line-end=\"", "\""], _f.raw = [" line-end=\"", "\""], xml(_f, lineEndTypeToXML[bracket.lineEnd]));
    if (defined(bracket.endLength)) {
        attribs += (_g = [" end-length=\"", "\""], _g.raw = [" end-length=\"", "\""], xml(_g, bracket.endLength));
    }
    attribs += lineTypeToXML(bracket) + dashedFormattingToXML(bracket) + positionToXML(bracket) + colorToXML(bracket);
    return (_h = ["<bracket", " />"], _h.raw = ["<bracket", " />"], dangerous(_h, attribs));
    var _f, _g, _h;
}
var pedalTypeToXML = (_f = {},
    _f[3 /* Change */] = "change",
    _f[0 /* Start */] = "start",
    _f[1 /* Stop */] = "stop",
    _f[2 /* Continue */] = "continue",
    _f);
function pedalToXML(pedal) {
    // <!ELEMENT pedal EMPTY>
    // <!ATTLIST pedal
    //     type (start | stop | continue | change) #REQUIRED
    //     line %yes-no; #IMPLIED
    //     sign %yes-no; #IMPLIED
    //     %print-style-align;
    // >
    var attribs = "" + (_g = [" type=\"", "\""], _g.raw = [" type=\"", "\""], xml(_g, pedalTypeToXML[pedal.type]));
    if (defined(pedal.line)) {
        attribs += (_h = [" line=\"", "\""], _h.raw = [" line=\"", "\""], yesNo(_h, pedal.line));
    }
    if (defined(pedal.sign)) {
        attribs += (_j = [" sign=\"", "\""], _j.raw = [" sign=\"", "\""], yesNo(_j, pedal.sign));
    }
    attribs += printStyleAlignToXML(pedal);
    return (_k = ["<pedal", " />"], _k.raw = ["<pedal", " />"], dangerous(_k, attribs));
    var _g, _h, _j, _k;
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
        attribs += (_g = [" parentheses=\"", "\""], _g.raw = [" parentheses=\"", "\""], yesNo(_g, metronome.parentheses));
    }
    if (defined(metronome.beatUnit)) {
        // <!ELEMENT beat-unit (#PCDATA)>
        children.push((_h = ["<beat-unit>", "</beat-unit>"], _h.raw = ["<beat-unit>", "</beat-unit>"], xml(_h, metronome.beatUnit)));
    }
    (metronome.beatUnitDots || []).forEach(function () {
        // <!ELEMENT beat-unit-dot EMPTY>
        children.push((_j = ["<beat-unit-dot />"], _j.raw = ["<beat-unit-dot />"], xml(_j)));
        var _j;
    });
    if (defined(metronome.perMinute)) {
        // <!ELEMENT per-minute (#PCDATA)>
        // <!ATTLIST per-minute
        //     %font;
        // >
        var pcdata = (_j = ["", ""], _j.raw = ["", ""], xml(_j, metronome.perMinute.data));
        children.push((_k = ["<per-minute", ">", "</per-minute>"], _k.raw = ["<per-minute", ">", "</per-minute>"], dangerous(_k, fontToXML(metronome.perMinute), pcdata)));
    }
    else {
        if (defined(metronome.beatUnitChange)) {
            // <!ELEMENT beat-unit (#PCDATA)>
            children.push((_l = ["<beat-unit>", "</beat-unit>"], _l.raw = ["<beat-unit>", "</beat-unit>"], xml(_l, metronome.beatUnitChange)));
        }
        (metronome.beatUnitDotsChange || []).forEach(function () {
            // <!ELEMENT beat-unit-dot EMPTY>
            children.push((_m = ["<beat-unit-dot />"], _m.raw = ["<beat-unit-dot />"], xml(_m)));
            var _m;
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
            oChildren.push((_m = ["<metronome-type>", "</metronome-type>"], _m.raw = ["<metronome-type>", "</metronome-type>"], xml(_m, note.metronomeType)));
        }
        (note.metronomeDots || []).forEach(function () {
            // <!ELEMENT metronome-dot EMPTY>
            oChildren.push((_o = ["<metronome-dot />"], _o.raw = ["<metronome-dot />"], xml(_o)));
            var _o;
        });
        (note.metronomeBeams || []).forEach(function (beam) {
            // <!ELEMENT metronome-beam (#PCDATA)>
            // <!ATTLIST metronome-beam
            //     number %beam-level; "1"
            // >
            var _pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, beam.data));
            oChildren.push((_p = ["<metronome-beam", ">", "</metronome-beam>"], _p.raw = ["<metronome-beam", ">", "</metronome-beam>"], dangerous(_p, numberLevelToXML(beam), _pcdata)));
            var _o, _p;
        });
        if (defined(note.metronomeTuplet)) {
            oChildren.push(metronomeTupletToXML(note.metronomeTuplet));
        }
        children.push((_o = ["<metronome-note>\n", "\n</metronome-note>"], _o.raw = ["<metronome-note>\\n", "\\n</metronome-note>"], dangerous(_o, oChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
        var _m, _o;
    });
    if (defined(metronome.metronomeRelation)) {
        // <!ELEMENT metronome-relation (#PCDATA)>
        children.push((_m = ["<metronome-relation>", "</metronome-relation>"], _m.raw = ["<metronome-relation>", "</metronome-relation>"], xml(_m, metronome.metronomeRelation)));
    }
    return (_o = ["<metronome", ">\n", "\n</metronome>"], _o.raw = ["<metronome", ">\\n", "\\n</metronome>"], dangerous(_o, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _g, _h, _j, _k, _l, _m, _o;
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
        attribs += (_g = [" bracket=\"", "\""], _g.raw = [" bracket=\"", "\""], yesNo(_g, metronomeTuplet.bracket));
    }
    if (defined(metronomeTuplet.showNumber)) {
        attribs += (_h = [" show-number=\"", "\""], _h.raw = [" show-number=\"", "\""], xml(_h, actualBothNoneToXML[metronomeTuplet.showNumber]));
    }
    if (metronomeTuplet.actualNotes) {
        children.push((_j = ["<actual-notes>", "</actual-notes>"], _j.raw = ["<actual-notes>", "</actual-notes>"], xml(_j, metronomeTuplet.actualNotes)));
    }
    if (metronomeTuplet.normalNotes) {
        children.push((_k = ["<normal-notes>", "</normal-notes>"], _k.raw = ["<normal-notes>", "</normal-notes>"], xml(_k, metronomeTuplet.normalNotes)));
    }
    if (metronomeTuplet.normalType) {
        children.push((_l = ["<normal-type>", "</normal-type>"], _l.raw = ["<normal-type>", "</normal-type>"], xml(_l, metronomeTuplet.normalType)));
    }
    (metronomeTuplet.normalDots || []).forEach(function () {
        children.push((_m = ["<normal-dot />"], _m.raw = ["<normal-dot />"], xml(_m)));
        var _m;
    });
    return (_m = ["<metronome-tuplet", ">\n", "\n</metronome-tuplet>"], _m.raw = ["<metronome-tuplet", ">\\n", "\\n</metronome-tuplet>"], dangerous(_m, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _g, _h, _j, _k, _l, _m;
}
var octaveShiftTypeToXML = (_g = {},
    _g[2 /* Down */] = "down",
    _g[3 /* Stop */] = "stop",
    _g[1 /* Up */] = "up",
    _g[4 /* Continue */] = "continue",
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
    var attribs = "" + (_h = [" type=\"", "\""], _h.raw = [" type=\"", "\""], xml(_h, octaveShiftTypeToXML[octaveShift.type])) + numberLevelToXML(octaveShift);
    if (defined(octaveShift.size)) {
        attribs += (_j = [" size=\"", "\""], _j.raw = [" size=\"", "\""], xml(_j, octaveShift.size));
    }
    attribs += dashedFormattingToXML(octaveShift) + printStyleToXML(octaveShift);
    return (_k = ["<octave-shift", " />"], _k.raw = ["<octave-shift", " />"], dangerous(_k, attribs));
    var _h, _j, _k;
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
            nChildren.push((_h = ["<pedal-step>", "</pedal-step>"], _h.raw = ["<pedal-step>", "</pedal-step>"], xml(_h, tuning.pedalStep)));
        }
        if (tuning.pedalAlter) {
            nChildren.push((_j = ["<pedal-alter>", "</pedal-alter>"], _j.raw = ["<pedal-alter>", "</pedal-alter>"], xml(_j, tuning.pedalAlter)));
        }
        children.push((_k = ["<pedal-tuning>\n", "\n</pedal-tuning>"], _k.raw = ["<pedal-tuning>\\n", "\\n</pedal-tuning>"], dangerous(_k, nChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
        var _h, _j, _k;
    });
    var attribs = printStyleAlignToXML(harpPedals);
    return (_h = ["<harp-pedals", ">\n", "\n</harp-pedals>"], _h.raw = ["<harp-pedals", ">\\n", "\\n</harp-pedals>"], dangerous(_h, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _h;
}
function dampToXML(damp) {
    // <!ELEMENT damp EMPTY>
    // <!ATTLIST damp
    //     %print-style-align;
    // >
    return (_h = ["<damp", " />"], _h.raw = ["<damp", " />"], dangerous(_h, printStyleAlignToXML(damp)));
    var _h;
}
function dampAllToXML(dampAll) {
    // <!ELEMENT damp-all EMPTY>
    // <!ATTLIST damp-all
    //     %print-style-align;
    // >
    return (_h = ["<damp-all", " />"], _h.raw = ["<damp-all", " />"], dangerous(_h, printStyleAlignToXML(dampAll)));
    var _h;
}
function eyeglassesToXML(eyeglasses) {
    // <!ELEMENT eyeglasses EMPTY>
    // <!ATTLIST eyeglasses
    //     %print-style-align;
    // >
    return (_h = ["<eyeglasses", " />"], _h.raw = ["<eyeglasses", " />"], dangerous(_h, printStyleAlignToXML(eyeglasses)));
    var _h;
}
function stringMuteToXML(stringMute) {
    // <!ELEMENT string-mute EMPTY>
    // <!ATTLIST string-mute
    //     type (on | off) #REQUIRED
    //     %print-style-align;
    // >
    var attribs = (_h = [" type=\"", "\""], _h.raw = [" type=\"", "\""], xml(_h, stringMute.type)) + printStyleAlignToXML(stringMute);
    return (_j = ["<string-mute", " />"], _j.raw = ["<string-mute", " />"], dangerous(_j, attribs));
    var _h, _j;
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
        var oAttribs = (_h = [" string=\"", "\""], _h.raw = [" string=\"", "\""], xml(_h, accord.string));
        children.push((_j = ["<accord", ">\n", "\n</accord>"], _j.raw = ["<accord", ">\\n", "\\n</accord>"], dangerous(_j, oAttribs, oChildren.join("\n").split("\n").map(function (n) {
            return "  " + n;
        }).join("\n"))));
        var _h, _j;
    });
    return (_h = ["<scordatura>\n", "\n</scordatura>"], _h.raw = ["<scordatura>\\n", "\\n</scordatura>"], dangerous(_h, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _h;
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
    var attribs = "" + (_h = [" source=\"", "\""], _h.raw = [" source=\"", "\""], xml(_h, image.source)) + (_j = [" type=\"", "\""], _j.raw = [" type=\"", "\""], xml(_j, image.type)) + positionToXML(image) + halignToXML(image) + valignImageToXML(image);
    return (_k = ["<image", " />"], _k.raw = ["<image", " />"], dangerous(_k, attribs));
    var _h, _j, _k;
}
var voiceSymbolToXML = (_h = {},
    _h[4 /* None */] = "none",
    _h[1 /* Hauptstimme */] = "hauptstimme",
    _h[2 /* Nebenstimme */] = "nebenstimme",
    _h[3 /* Plain */] = "plain",
    _h);
function principalVoiceToXML(principalVoice) {
    // <!ELEMENT principal-voice (#PCDATA)>
    // <!ATTLIST principal-voice
    //     type %start-stop; #REQUIRED
    //     symbol (Hauptstimme | Nebenstimme | plain | none) #REQUIRED
    //     %print-style-align;
    // >
    var pcdata = (_j = ["", ""], _j.raw = ["", ""], xml(_j, principalVoice.data));
    var attribs = startStopToXML(principalVoice) + (_k = [" symbol=\"", "\""], _k.raw = [" symbol=\"", "\""], xml(_k, voiceSymbolToXML[principalVoice.symbol])) + printStyleAlignToXML(principalVoice);
    return (_l = ["<principal-voice", "", "</principal-voice>"], _l.raw = ["<principal-voice", "", "</principal-voice>"], dangerous(_l, attribs, pcdata));
    var _j, _k, _l;
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
        children.push((_j = ["<accordion-high />"], _j.raw = ["<accordion-high />"], xml(_j)));
    }
    if (defined(accordionRegistration.accordionMiddle)) {
        children.push((_k = ["<accordion-middle>", "</accordion-middle>"], _k.raw = ["<accordion-middle>", "</accordion-middle>"], xml(_k, accordionRegistration.accordionMiddle || "")));
    }
    if (defined(accordionRegistration.accordionLow)) {
        children.push((_l = ["<accordion-low />"], _l.raw = ["<accordion-low />"], xml(_l)));
    }
    return (_m = ["<accordion-registration", ">\n", "\n</accordion-registration>"], _m.raw = ["<accordion-registration", ">\\n", "\\n</accordion-registration>"], dangerous(_m, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _j, _k, _l, _m;
}
var tipDirectionToXML = (_j = {},
    _j[3 /* Right */] = "right",
    _j[4 /* Northwest */] = "northwest",
    _j[7 /* Southwest */] = "southwest",
    _j[1 /* Down */] = "down",
    _j[5 /* Northeast */] = "northeast",
    _j[6 /* Southeast */] = "southeast",
    _j[0 /* Up */] = "up",
    _j[2 /* Left */] = "left",
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
        children.push((_k = ["<glass>", "</glass>"], _k.raw = ["<glass>", "</glass>"], xml(_k, percussion.glass)));
    }
    if (defined(percussion.metal)) {
        // <!ELEMENT metal (#PCDATA)>
        children.push((_l = ["<metal>", "</metal>"], _l.raw = ["<metal>", "</metal>"], xml(_l, percussion.metal)));
    }
    if (defined(percussion.wood)) {
        // <!ELEMENT wood (#PCDATA)>
        children.push((_m = ["<wood>", "</wood>"], _m.raw = ["<wood>", "</wood>"], xml(_m, percussion.wood)));
    }
    if (defined(percussion.pitched)) {
        // <!ELEMENT pitched (#PCDATA)>
        children.push((_o = ["<pitched>", "</pitched>"], _o.raw = ["<pitched>", "</pitched>"], xml(_o, percussion.pitched)));
    }
    if (defined(percussion.membrane)) {
        // <!ELEMENT membrane (#PCDATA)>
        children.push((_p = ["<membrane>", "</membrane>"], _p.raw = ["<membrane>", "</membrane>"], xml(_p, percussion.membrane)));
    }
    if (defined(percussion.effect)) {
        // <!ELEMENT effect (#PCDATA)>
        children.push((_q = ["<effect>", "</effect>"], _q.raw = ["<effect>", "</effect>"], xml(_q, percussion.effect)));
    }
    if (defined(percussion.timpani)) {
        // <!ELEMENT timpani EMPTY>
        children.push((_r = ["<timpani />"], _r.raw = ["<timpani />"], xml(_r)));
    }
    if (defined(percussion.beater)) {
        // <!ELEMENT beater (#PCDATA)>
        // <!ATTLIST beater
        //     tip %tip-direction; #IMPLIED
        // >
        var pcdata = (_s = ["", ""], _s.raw = ["", ""], xml(_s, percussion.beater.data || ""));
        var oAttribs = "";
        if (defined(percussion.beater.tip)) {
            oAttribs += (_t = [" tip=\"", "\""], _t.raw = [" tip=\"", "\""], xml(_t, tipDirectionToXML[percussion.beater.tip]));
        }
        children.push((_u = ["<beater", ">", "</beater>"], _u.raw = ["<beater", ">", "</beater>"], dangerous(_u, oAttribs, pcdata)));
    }
    if (defined(percussion.stick)) {
        // <!ELEMENT stick (stick-type, stick-material)>
        // <!ATTLIST stick
        //     tip %tip-direction; #IMPLIED
        //     >
        // <!ELEMENT stick-type (#PCDATA)>
        // <!ELEMENT stick-material (#PCDATA)>
        var _pcdata = "";
        var _oAttribs = "";
        if (defined(percussion.stick.tip)) {
            _oAttribs += (_v = [" tip=\"", "\""], _v.raw = [" tip=\"", "\""], xml(_v, tipDirectionToXML[percussion.stick.tip]));
        }
        if (defined(percussion.stick.stickType)) {
            _pcdata += (_w = ["  <stick-type>", "</stick-type>\n"], _w.raw = ["  <stick-type>", "</stick-type>\\n"], xml(_w, percussion.stick.stickType));
        }
        if (defined(percussion.stick.stickMaterial)) {
            _pcdata += (_x = ["  <stick-material>", "</stick-material>\n"], _x.raw = ["  <stick-material>", "</stick-material>\\n"], xml(_x, percussion.stick.stickMaterial));
        }
        children.push((_y = ["<stick", ">", "</stick>"], _y.raw = ["<stick", ">", "</stick>"], dangerous(_y, _oAttribs, _pcdata)));
    }
    if (defined(percussion.stickLocation)) {
        // <!ELEMENT stick-location (#PCDATA)>
        children.push((_z = ["<stick-location>", "</stick-location>"], _z.raw = ["<stick-location>", "</stick-location>"], xml(_z, percussion.stickLocation)));
    }
    if (defined(percussion.otherPercussion)) {
        // <!ELEMENT other-percussion (#PCDATA)>
        children.push((_0 = ["<other-percussion>", "</other-percussion>"], _0.raw = ["<other-percussion>", "</other-percussion>"], xml(_0, percussion.otherPercussion)));
    }
    return (_1 = ["<percussion>\n", "\n</percussion>"], _1.raw = ["<percussion>\\n", "\\n</percussion>"], dangerous(_1, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
}
function otherDirectionToXML(otherDirection) {
    // <!ELEMENT other-direction (#PCDATA)>
    // <!ATTLIST other-direction
    //     %print-object;
    //     %print-style-align;
    // >
    var pcdata = (_k = ["", ""], _k.raw = ["", ""], xml(_k, otherDirection.data));
    return (_l = ["<other-direction", ">", "</other-direction>"], _l.raw = ["<other-direction", ">", "</other-direction>"], dangerous(_l, printObjectToXML(otherDirection) + printStyleAlignToXML(otherDirection), pcdata));
    var _k, _l;
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
    var attribs = "" + startStopContinueToXML(wavyLine) + numberLevelToXML(wavyLine) + positionToXML(wavyLine) + placementToXML(wavyLine) + colorToXML(wavyLine) + trillSoundToXML(wavyLine);
    return (_k = ["<wavy-line", " />"], _k.raw = ["<wavy-line", " />"], dangerous(_k, attribs));
    var _k;
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
    4: "light-light"
};
function barStyleToXML(barStyle) {
    // <!ELEMENT bar-style (#PCDATA)>
    // <!ATTLIST bar-style
    //     %color;
    // >
    var attribs = "" + colorToXML(barStyle);
    var pcdata = (_k = ["", ""], _k.raw = ["", ""], xml(_k, barStyleTypeToXML[barStyle.data] || ""));
    return (_l = ["<bar-style", ">", "</bar-style>"], _l.raw = ["<bar-style", ">", "</bar-style>"], dangerous(_l, attribs, pcdata));
    var _k, _l;
}
var startStopDiscontinueTypeToXML = (_k = {},
    _k[0 /* Start */] = "start",
    _k[1 /* Stop */] = "stop",
    _k[2 /* Discontinue */] = "discontinue",
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
    var attribs = "" + numberLevelToXML(ending) + startStopDiscontinueToXML(ending) + printObjectToXML(ending) + printStyleToXML(ending);
    if (defined(ending.endLength)) {
        attribs += (_l = [" end-length=\"", "\""], _l.raw = [" end-length=\"", "\""], xml(_l, ending.endLength));
    }
    if (defined(ending.textX)) {
        attribs += (_m = [" text-x=\"", "\""], _m.raw = [" text-x=\"", "\""], xml(_m, ending.textX));
    }
    if (defined(ending.textY)) {
        attribs += (_o = [" text-y=\"", "\""], _o.raw = [" text-y=\"", "\""], xml(_o, ending.textY));
    }
    var pcdata = (_p = ["", ""], _p.raw = ["", ""], xml(_p, ending.ending));
    return (_q = ["<ending", ">", "</ending>"], _q.raw = ["<ending", ">", "</ending>"], dangerous(_q, attribs, pcdata));
    var _l, _m, _o, _p, _q;
}
var directionTypeBgToXML = (_l = {},
    _l[1 /* Forward */] = "forward",
    _l[0 /* Backward */] = "backward",
    _l);
var wingedTypeToXML = (_m = {},
    _m[0 /* None */] = "none",
    _m[2 /* Curved */] = "curved",
    _m[4 /* DoubleCurved */] = "double-curved",
    _m[1 /* Straight */] = "straight",
    _m[3 /* DoubleStraight */] = "double-straight",
    _m);
function repeatToXML(repeat) {
    // <!ELEMENT repeat EMPTY>
    // <!ATTLIST repeat
    //     direction (backward | forward) #REQUIRED
    //     times CDATA #IMPLIED
    //     winged (none | straight | curved |
    //         double-straight | double-curved) #IMPLIED
    // >
    var attribs = "" + (_o = [" direction=\"", "\""], _o.raw = [" direction=\"", "\""], xml(_o, directionTypeBgToXML[repeat.direction]));
    if (defined(repeat.times)) {
        attribs += (_p = [" times=\"", "\""], _p.raw = [" times=\"", "\""], xml(_p, repeat.times));
    }
    if (defined(repeat.winged)) {
        attribs += (_q = [" winged=\"", "\""], _q.raw = [" winged=\"", "\""], xml(_q, wingedTypeToXML[repeat.winged]));
    }
    return (_r = ["<repeat", " />"], _r.raw = ["<repeat", " />"], dangerous(_r, attribs));
    var _o, _p, _q, _r;
}
function segnoToXML(segno) {
    // <!ELEMENT segno EMPTY>
    // <!ATTLIST segno
    //     %print-style-align;
    // >
    var attribs = "" + printStyleAlignToXML(segno);
    return (_o = ["<segno", " />"], _o.raw = ["<segno", " />"], dangerous(_o, attribs));
    var _o;
}
function codaToXML(coda) {
    // <!ELEMENT coda EMPTY>
    // <!ATTLIST coda
    //     %print-style-align;
    // >
    var attribs = "" + printStyleAlignToXML(coda);
    return (_o = ["<coda", " />"], _o.raw = ["<coda", " />"], dangerous(_o, attribs));
    var _o;
}
var uprightInvertedToXML = {
    0: "upright",
    1: "inverted"
};
var normalAngledSquareToXML = {
    1: "angled",
    2: "square",
    0: "normal"
};
function fermataToXML(fermata) {
    // <!ELEMENT fermata  (#PCDATA)>
    // <!ATTLIST fermata
    //     type (upright | inverted) #IMPLIED
    //     %print-style;
    // >
    var pcdata = defined(fermata.shape) ? normalAngledSquareToXML[fermata.shape] : "";
    var attribs = defined(fermata.type) ? (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, uprightInvertedToXML[fermata.type])) : "";
    attribs += printStyleToXML(fermata);
    return (_p = ["<fermata", ">", "</fermata>"], _p.raw = ["<fermata", ">", "</fermata>"], dangerous(_p, attribs, pcdata));
    var _o, _p;
}
function playToXML(play) {
    // <!ELEMENT play ((ipa | mute | semi-pitched | other-play)*)>
    // <!ATTLIST play
    //     id IDREF #IMPLIED
    // >
    // TODO musicxml-interfaces: missing id
    var children = [];
    if (defined(play.ipa)) {
        children.push((_o = ["<ipa>", "</ipa>"], _o.raw = ["<ipa>", "</ipa>"], xml(_o, play.ipa)));
    }
    if (defined(play.mute)) {
        children.push((_p = ["<mute>", "</mute>"], _p.raw = ["<mute>", "</mute>"], xml(_p, play.mute)));
    }
    if (defined(play.semiPitched)) {
        children.push((_q = ["<semi-pitched>", "</semi-pitched>"], _q.raw = ["<semi-pitched>", "</semi-pitched>"], xml(_q, play.semiPitched)));
    }
    if (defined(play.otherPlay)) {
        var pcdata = (_r = ["", ""], _r.raw = ["", ""], xml(_r, play.otherPlay.data));
        var oAttribs = "";
        if (defined(play.otherPlay.type)) {
            oAttribs += (_s = [" type=\"", "\""], _s.raw = [" type=\"", "\""], xml(_s, play.otherPlay.type));
        }
        children.push((_t = ["<other-play", ">", "</other-play>"], _t.raw = ["<other-play", ">", "</other-play>"], dangerous(_t, oAttribs, pcdata)));
    }
    return (_u = ["<play>\n", "\n</play>"], _u.raw = ["<play>\\n", "\\n</play>"], dangerous(_u, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q, _r, _s, _t, _u;
}
function staffLayoutToXML(staffLayout) {
    // <!ELEMENT staff-layout (staff-distance?)>
    // <!ELEMENT staff-distance %layout-tenths;>
    // <!ATTLIST staff-layout
    //     number CDATA #IMPLIED
    // >
    var children = [];
    if (defined(staffLayout.staffDistance)) {
        children.push((_o = ["<staff-distance>", "</staff-distance>"], _o.raw = ["<staff-distance>", "</staff-distance>"], xml(_o, staffLayout.staffDistance)));
    }
    var attribs = numberLevelToXML(staffLayout);
    return (_p = ["<staff-layout", ">\n", "\n</staff-layout>"], _p.raw = ["<staff-layout", ">\\n", "\\n</staff-layout>"], dangerous(_p, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p;
}
function measureLayoutToXML(measureLayout) {
    // <!ELEMENT measure-layout (measure-distance?)>
    // <!ELEMENT measure-distance %layout-tenths;>
    var children = [];
    if (defined(measureLayout.measureDistance)) {
        children.push((_o = ["<measure-distance>", "</measure-distance>"], _o.raw = ["<measure-distance>", "</measure-distance>"], xml(_o, measureLayout.measureDistance)));
    }
    return (_p = ["<measure-layout>\n", "\n</measure-layout>"], _p.raw = ["<measure-layout>\\n", "\\n</measure-layout>"], dangerous(_p, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p;
}
function measureNumberingToXML(measureNumbering) {
    // <!ELEMENT measure-numbering (#PCDATA)>
    // <!ATTLIST measure-numbering
    //     %print-style-align;
    // >
    var attribs = printStyleAlignToXML(measureNumbering);
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, measureNumbering.data));
    return (_p = ["<measure-numbering", ">", "</measure-numbering>"], _p.raw = ["<measure-numbering", ">", "</measure-numbering>"], dangerous(_p, attribs, pcdata));
    var _o, _p;
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
        children.push((_o = ["<fifths>", "</fifths>"], _o.raw = ["<fifths>", "</fifths>"], xml(_o, key.fifths)));
    }
    if (defined(key.mode)) {
        // <!ELEMENT mode (#PCDATA)>
        children.push((_p = ["<mode>", "</mode>"], _p.raw = ["<mode>", "</mode>"], xml(_p, key.mode)));
    }
    (key.keySteps || []).forEach(function (keyStep, idx) {
        // <!ELEMENT key-step (#PCDATA)>
        // <!ELEMENT key-alter (#PCDATA)>
        // <!ELEMENT key-accidental (#PCDATA)>
        children.push((_q = ["<key-step>", "</key-step>"], _q.raw = ["<key-step>", "</key-step>"], xml(_q, keyStep)));
        children.push((_r = ["<key-alter>", "</key-alter>"], _r.raw = ["<key-alter>", "</key-alter>"], xml(_r, key.keyAlters[idx])));
        if (!!key.keyAccidentals[idx]) {
            children.push((_s = ["<key-accidental>", "</key-accidental>"], _s.raw = ["<key-accidental>", "</key-accidental>"], xml(_s, key.keyAccidentals[idx])));
        }
        var _q, _r, _s;
    });
    (key.keyOctaves || []).forEach(function (keyOctave) {
        children.push(keyOctaveToXML(keyOctave));
    });
    return (_q = ["<key", ">\n", "\n</key>"], _q.raw = ["<key", ">\\n", "\\n</key>"], dangerous(_q, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q;
}
var cancelLocationToXML = {
    1: "right",
    2: "before-barline",
    0: "left"
};
function cancelToXML(cancel) {
    // <!ELEMENT cancel (#PCDATA)>
    // <!ATTLIST cancel
    //     location (left | right | before-barline) #IMPLIED
    // >
    var attribs = "";
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, cancel.fifths));
    if (defined(cancel.location)) {
        attribs += (_p = [" location=\"", "\""], _p.raw = [" location=\"", "\""], xml(_p, cancelLocationToXML[cancel.location]));
    }
    return (_q = ["<cancel", ">", "</cancel>"], _q.raw = ["<cancel", ">", "</cancel>"], dangerous(_q, attribs, pcdata));
    var _o, _p, _q;
}
function keyOctaveToXML(keyOctave) {
    // <!ELEMENT key-octave (#PCDATA)>
    // <!ATTLIST key-octave
    //     number NMTOKEN #REQUIRED
    //     cancel %yes-no; #IMPLIED
    // >
    var attribs = numberLevelToXML(keyOctave);
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, keyOctave.octave));
    if (defined(keyOctave.cancel)) {
        attribs += (_p = [" cancel=\"", "\""], _p.raw = [" cancel=\"", "\""], yesNo(_p, keyOctave.cancel));
    }
    return (_q = ["<key-octave", ">", "</key-octave>"], _q.raw = ["<key-octave", ">", "</key-octave>"], dangerous(_q, attribs, pcdata));
    var _o, _p, _q;
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
    var attribs = "" + numberLevelToXML(time) + timeSymbolToXML(time) + timeSeparatorToXML(time) + printStyleAlignToXML(time) + printObjectToXML(time);
    var children = [];
    if (time.senzaMisura !== undefined) {
        // <!ELEMENT senza-misura (#PCDATA)>
        // TODO musicxml-interfaces: PCDATA?
        children.push((_o = ["<senza-misura />"], _o.raw = ["<senza-misura />"], xml(_o)));
    }
    else {
        // TODO musicxml-interfaces: check this
        (time.beats || []).forEach(function (beats, idx) {
            // <!ELEMENT beats (#PCDATA)>
            // <!ELEMENT beat-type (#PCDATA)>
            children.push((_p = ["<beats>", "</beats>"], _p.raw = ["<beats>", "</beats>"], xml(_p, beats)));
            children.push((_q = ["<beat-type>", "</beat-type>"], _q.raw = ["<beat-type>", "</beat-type>"], xml(_q, time.beatTypes[idx])));
            var _p, _q;
        });
        if (defined(time.interchangeable)) {
            children.push(interchangeableToXML(time.interchangeable));
        }
    }
    return (_p = ["<time", ">\n", "\n</time>"], _p.raw = ["<time", ">\\n", "\\n</time>"], dangerous(_p, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p;
}
var timeSymbolTypeToXML = {
    4: "dotted-note",
    1: "cut",
    2: "single-number",
    3: "note",
    0: "common",
    5: "normal"
};
function timeSymbolToXML(timeSymbol) {
    // <!ENTITY % time-symbol
    //     "symbol (common | cut | single-number |
    //              note | dotted-note | normal) #IMPLIED">
    if (defined(timeSymbol.symbol)) {
        return (_o = [" symbol=\"", "\""], _o.raw = [" symbol=\"", "\""], xml(_o, timeSymbolTypeToXML[timeSymbol.symbol]));
    }
    return "";
    var _o;
}
var separatorTypeToXML = {
    0: "none",
    1: "horizontal",
    2: "diagonal",
    3: "vertical",
    4: "adjacent"
};
function timeSeparatorToXML(timeSeparator) {
    // <!ENTITY % time-separator
    //     "separator (none | horizontal | diagonal |
    //         vertical | adjacent) #IMPLIED">
    if (defined(timeSeparator.separator)) {
        return (_o = [" separator=\"", "\""], _o.raw = [" separator=\"", "\""], xml(_o, separatorTypeToXML[timeSeparator.separator]));
    }
    return "";
    var _o;
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
        children.push((_o = ["<beats>", "</beats>"], _o.raw = ["<beats>", "</beats>"], xml(_o, beats)));
        children.push((_p = ["<beat-type>", "</beat-type>"], _p.raw = ["<beat-type>", "</beat-type>"], xml(_p, interchangeable.beatTypes[idx])));
        var _o, _p;
    });
    if (defined(interchangeable.timeRelation)) {
        // <!ELEMENT time-relation (#PCDATA)>
        children.push((_o = ["<time-relation>", "</time-relation>"], _o.raw = ["<time-relation>", "</time-relation>"], xml(_o, interchangeable.timeRelation)));
    }
    return (_p = ["<interchangeable", ">\n", "\n</interchangeable>"], _p.raw = ["<interchangeable", ">\\n", "\\n</interchangeable>"], dangerous(_p, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p;
}
var partSymbolTypeToXML = {
    0: "none",
    2: "line",
    3: "bracket",
    4: "square",
    1: "brace"
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
        pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, partSymbolTypeToXML[partSymbol.type]));
    }
    var attribs = "";
    if (defined(partSymbol.topStaff)) {
        attribs += (_p = [" top-staff=\"", "\""], _p.raw = [" top-staff=\"", "\""], xml(_p, partSymbol.topStaff));
    }
    if (defined(partSymbol.bottomStaff)) {
        attribs += (_q = [" bottom-staff=\"", "\""], _q.raw = [" bottom-staff=\"", "\""], xml(_q, partSymbol.bottomStaff));
    }
    attribs += positionToXML(partSymbol) + colorToXML(partSymbol);
    return (_r = ["<part-symbol", ">", "</part-symbol>"], _r.raw = ["<part-symbol", ">", "</part-symbol>"], dangerous(_r, attribs, pcdata));
    var _o, _p, _q, _r;
}
var symbolSizeToXML = {
    1: "full",
    2: "cue",
    3: "large"
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
        attribs += (_o = [" additional=\"", "\""], _o.raw = [" additional=\"", "\""], yesNo(_o, clef.additional));
    }
    if (clef.size >= 0 /* Unspecified */) {
        attribs += (_p = [" size=\"", "\""], _p.raw = [" size=\"", "\""], xml(_p, symbolSizeToXML[clef.size]));
    }
    if (defined(clef.afterBarline)) {
        attribs += (_q = [" after-barline=\"", "\""], _q.raw = [" after-barline=\"", "\""], yesNo(_q, clef.afterBarline));
    }
    attribs += printStyleToXML(clef) + printObjectToXML(clef);
    if (defined(clef.sign)) {
        // <!ELEMENT sign (#PCDATA)>
        children.push((_r = ["<sign>", "</sign>"], _r.raw = ["<sign>", "</sign>"], xml(_r, clef.sign)));
    }
    if (defined(clef.line)) {
        // <!ELEMENT line (#PCDATA)>
        children.push((_s = ["<line>", "</line>"], _s.raw = ["<line>", "</line>"], xml(_s, clef.line)));
    }
    if (defined(clef.clefOctaveChange)) {
        // <!ELEMENT clef-octave-change (#PCDATA)>
        children.push((_t = ["<clef-octave-change>", "</clef-octave-change>"], _t.raw = ["<clef-octave-change>", "</clef-octave-change>"], xml(_t, clef.clefOctaveChange)));
    }
    return (_u = ["<clef", ">\n", "\n</clef>"], _u.raw = ["<clef", ">\\n", "\\n</clef>"], dangerous(_u, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q, _r, _s, _t, _u;
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
        children.push((_o = ["<staff-type>", "</staff-type>"], _o.raw = ["<staff-type>", "</staff-type>"], xml(_o, staffDetails.staffType)));
    }
    if (defined(staffDetails.staffLines)) {
        // <!ELEMENT staff-lines (#PCDATA)>
        children.push((_p = ["<staff-lines>", "</staff-lines>"], _p.raw = ["<staff-lines>", "</staff-lines>"], xml(_p, staffDetails.staffLines)));
    }
    (staffDetails.staffTunings || []).forEach(function (tuning) {
        children.push(staffTuningToXML(tuning));
    });
    if (defined(staffDetails.capo)) {
        // <!ELEMENT capo (#PCDATA)>
        children.push((_q = ["<capo>", "</capo>"], _q.raw = ["<capo>", "</capo>"], xml(_q, staffDetails.capo)));
    }
    if (defined(staffDetails.staffSize)) {
        // <!ELEMENT staff-size (#PCDATA)>
        children.push((_r = ["<staff-size>", "</staff-size>"], _r.raw = ["<staff-size>", "</staff-size>"], xml(_r, staffDetails.staffSize)));
    }
    return (_s = ["<staff-details", ">\n", "\n</staff-details>"], _s.raw = ["<staff-details", ">\\n", "\\n</staff-details>"], dangerous(_s, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q, _r, _s;
}
function staffTuningToXML(staffTuning) {
    // <!ELEMENT staff-tuning
    //     (tuning-step, tuning-alter?, tuning-octave)>
    // <!ATTLIST staff-tuning
    //     line CDATA #REQUIRED
    var children = [];
    var attribs = "";
    if (defined(staffTuning.line)) {
        attribs += (_o = [" line=\"", "\""], _o.raw = [" line=\"", "\""], xml(_o, staffTuning.line));
    }
    children = children.concat(tuningStepAlterOctaveToXML(staffTuning));
    return (_p = ["<staff-tuning", ">\n", "\n</staff-tuning>"], _p.raw = ["<staff-tuning", ">\\n", "\\n</staff-tuning>"], dangerous(_p, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p;
}
function tuningStepAlterOctaveToXML(tuning) {
    var children = [];
    if (defined(tuning.tuningStep)) {
        // <!ELEMENT tuning-step (#PCDATA)>
        children.push((_o = ["<tuning-step>", "</tuning-step>"], _o.raw = ["<tuning-step>", "</tuning-step>"], xml(_o, tuning.tuningStep)));
    }
    if (defined(tuning.tuningAlter)) {
        // <!ELEMENT tuning-alter (#PCDATA)>
        children.push((_p = ["<tuning-alter>", "</tuning-alter>"], _p.raw = ["<tuning-alter>", "</tuning-alter>"], xml(_p, tuning.tuningAlter)));
    }
    if (defined(tuning.tuningOctave)) {
        // <!ELEMENT tuning-octave (#PCDATA)>
        children.push((_q = ["<tuning-octave>", "</tuning-octave>"], _q.raw = ["<tuning-octave>", "</tuning-octave>"], xml(_q, tuning.tuningOctave)));
    }
    return children;
    var _o, _p, _q;
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
        children.push((_o = ["<diatonic>", "</diatonic>"], _o.raw = ["<diatonic>", "</diatonic>"], xml(_o, transpose.diatonic)));
    }
    if (defined(transpose.chromatic)) {
        // <!ELEMENT chromatic (#PCDATA)>
        children.push((_p = ["<chromatic>", "</chromatic>"], _p.raw = ["<chromatic>", "</chromatic>"], xml(_p, transpose.chromatic)));
    }
    if (defined(transpose.octaveChange)) {
        // <!ELEMENT octave-change (#PCDATA)>
        children.push((_q = ["<octave-change>", "</octave-change>"], _q.raw = ["<octave-change>", "</octave-change>"], xml(_q, transpose.octaveChange)));
    }
    if (defined(transpose.double)) {
        // <!ELEMENT double EMPTY>
        children.push((_r = ["<double />"], _r.raw = ["<double />"], xml(_r)));
    }
    return (_s = ["<transpose", ">\n", "\n</transpose>"], _s.raw = ["<transpose", ">\\n", "\\n</transpose>"], dangerous(_s, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q, _r, _s;
}
function directiveToXML(directive) {
    // <!ELEMENT directive (#PCDATA)>
    // <!ATTLIST directive
    //     %print-style;
    //     xml:lang NMTOKEN #IMPLIED
    // >
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, directive.data));
    var attribs = printStyleToXML(directive); // TODO musicxml-interfaces xml:lang
    return (_p = ["<directive", ">", "</directive>"], _p.raw = ["<directive", ">", "</directive>"], dangerous(_p, attribs, pcdata));
    var _o, _p;
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
    var attribs = "" + numberLevelToXML(measureStyle) + fontToXML(measureStyle) + colorToXML(measureStyle);
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
    return (_o = ["<measure-style", ">\n", "\n</measure-style>"], _o.raw = ["<measure-style", ">\\n", "\\n</measure-style>"], dangerous(_o, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o;
}
function multipleRestToXML(multipleRest) {
    // <!ELEMENT multiple-rest (#PCDATA)>
    // <!ATTLIST multiple-rest
    //     use-symbols %yes-no; #IMPLIED
    // >
    var attribs = "";
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, multipleRest.count));
    if (defined(multipleRest.useSymbols)) {
        attribs += (_p = [" use-symbols=\"", "\""], _p.raw = [" use-symbols=\"", "\""], yesNo(_p, multipleRest.useSymbols));
    }
    return (_q = ["<multiple-rest", ">", "</multiple-rest>"], _q.raw = ["<multiple-rest", ">", "</multiple-rest>"], dangerous(_q, attribs, pcdata));
    var _o, _p, _q;
}
function measureRepeatToXML(measureRepeat) {
    // <!ELEMENT measure-repeat (#PCDATA)>
    // <!ATTLIST measure-repeat
    //     type %start-stop; #REQUIRED
    //     slashes NMTOKEN #IMPLIED
    // >
    var attribs = "";
    var pcdata = (_o = ["", ""], _o.raw = ["", ""], xml(_o, measureRepeat.data || ""));
    attribs += startStopToXML(measureRepeat);
    // TODO: musicxml-interfaces: slashed -> slashes
    return (_p = ["<measure-repeat", ">", "</measure-repeat>"], _p.raw = ["<measure-repeat", ">", "</measure-repeat>"], dangerous(_p, attribs, pcdata));
    var _o, _p;
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
        attribs += (_o = [" use-dots=\"", "\""], _o.raw = [" use-dots=\"", "\""], yesNo(_o, beatRepeat.useDots));
    }
    if (defined(beatRepeat.slashType)) {
        children.push((_p = ["<slash-type>", "</slash-type>"], _p.raw = ["<slash-type>", "</slash-type>"], xml(_p, beatRepeat.slashType)));
    }
    (beatRepeat.slashDots || []).forEach(function (dot) {
        // <!ELEMENT slash-dot EMPTY>
        children.push((_q = ["<slash-dot />"], _q.raw = ["<slash-dot />"], xml(_q)));
        var _q;
    });
    return (_q = ["<beat-repeat", ">\n", "\n</beat-repeat>"], _q.raw = ["<beat-repeat", ">\\n", "\\n</beat-repeat>"], dangerous(_q, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q;
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
        attribs += (_o = [" use-dots=\"", "\""], _o.raw = [" use-dots=\"", "\""], yesNo(_o, slash.useDots));
    }
    if (defined(slash.useStems)) {
        attribs += (_p = [" use-stems=\"", "\""], _p.raw = [" use-stems=\"", "\""], yesNo(_p, slash.useStems));
    }
    var children = [];
    if (defined(slash.slashType)) {
        children.push((_q = ["<slash-type>", "</slash-type>"], _q.raw = ["<slash-type>", "</slash-type>"], xml(_q, slash.slashType)));
    }
    (slash.slashDots || []).forEach(function (dot) {
        // <!ELEMENT slash-dot EMPTY>
        children.push((_r = ["<slash-dot />"], _r.raw = ["<slash-dot />"], xml(_r)));
        var _r;
    });
    return (_r = ["<slash", ">\n", "\n</slash>"], _r.raw = ["<slash", ">\\n", "\\n</slash>"], dangerous(_r, attribs, children.join("\n").split("\n").map(function (n) {
        return "  " + n;
    }).join("\n")));
    var _o, _p, _q, _r;
}
function printStyleToXML(printStyle) {
    // <!ENTITY % print-style
    //     "%position;
    //      %font;
    //      %color;">
    return positionToXML(printStyle) + fontToXML(printStyle) + colorToXML(printStyle);
}
function printoutToXML(printout) {
    // <!ENTITY % printout
    //     "%print-object;
    //      print-dot     %yes-no;  #IMPLIED
    //      %print-spacing;
    //      print-lyric   %yes-no;  #IMPLIED">
    var attribs = printObjectToXML(printout);
    if (defined(printout.printDot)) {
        attribs += (_o = [" print-dot=\"", "\""], _o.raw = [" print-dot=\"", "\""], yesNo(_o, printout.printDot));
    }
    attribs += printSpacingToXML(printout);
    if (defined(printout.printLyric)) {
        attribs += (_p = [" print-lyric=\"", "\""], _p.raw = [" print-lyric=\"", "\""], yesNo(_p, printout.printLyric));
    }
    return attribs;
    var _o, _p;
}
function timeOnlyToXML(timeOnly) {
    // <!ENTITY % time-only
    //     "time-only CDATA #IMPLIED">
    if (defined(timeOnly.timeOnly)) {
        return (_o = [" time-only=\"", "\""], _o.raw = [" time-only=\"", "\""], xml(_o, timeOnly.timeOnly));
    }
    return "";
    var _o;
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
        var footnoteEscaped = (_o = ["", ""], _o.raw = ["", ""], xml(_o, editorial.footnote.text));
        elements.push((_p = ["<footnote", ">\n            ", "</footnote>"], _p.raw = ["<footnote", ">\n            ", "</footnote>"], dangerous(_p, textFormattingToXML(editorial.footnote), footnoteEscaped)));
    }
    if (defined(editorial.level) && !!editorial.level.text) {
        var levelEscaped = (_q = ["", ""], _q.raw = ["", ""], xml(_q, editorial.level.text));
        var attribs = "";
        if (defined(editorial.level.reference)) {
            attribs += (_r = [" reference=\"", "\""], _r.raw = [" reference=\"", "\""], yesNo(_r, editorial.level.reference));
        }
        attribs += levelDisplayToXML(editorial.level);
        elements.push((_s = ["<level", ">", "</level>"], _s.raw = ["<level", ">", "</level>"], dangerous(_s, attribs, levelEscaped)));
    }
    return elements;
    var _o, _p, _q, _r, _s;
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
        elements.push((_o = ["<voice>", "</voice>"], _o.raw = ["<voice>", "</voice>"], xml(_o, editorial.voice)));
    }
    return elements;
    var _o;
}
var solidDashedDottedWavyToXML = {
    1: "dashed",
    2: "dotted",
    3: "wavy",
    0: "solid"
};
function lineTypeToXML(lineType) {
    // <!ENTITY % line-type
    //     "line-type (solid | dashed | dotted | wavy) #IMPLIED">
    if (defined(lineType.lineType)) {
        return (_o = [" line-type=\"", "\""], _o.raw = [" line-type=\"", "\""], xml(_o, solidDashedDottedWavyToXML[lineType.lineType]));
    }
    return "";
    var _o;
}
function startStopToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, startStop.type === 0 /* Start */ ? "start" : "stop"));
    }
    return "";
    var _o;
}
function startStopDiscontinueToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, startStopDiscontinueTypeToXML[startStop.type]));
    }
    return "";
    var _o;
}
function numberLevelToXML(numberLevel) {
    if (defined(numberLevel.number)) {
        return (_o = [" number=\"", "\""], _o.raw = [" number=\"", "\""], xml(_o, numberLevel.number));
    }
    return "";
    var _o;
}
var startStopContinueSingleToXML = {
    0: "start",
    1: "stop",
    2: "continue",
    3: "single"
};
function startStopContinueToXML(startStopContinue) {
    // <!ENTITY % start-stop-continue "(start | stop | continue)">
    if (defined(startStopContinue.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, startStopContinueSingleToXML[startStopContinue.type]));
    }
    return "";
    var _o;
}
function nameToXML(name) {
    if (defined(name.name)) {
        return (_o = [" name=\"", "\""], _o.raw = [" name=\"", "\""], xml(_o, name.name));
    }
    return "";
    var _o;
}
function startStopSingleToXML(startStopSingle) {
    // <!ENTITY % start-stop-single "(start | stop | single)">
    if (defined(startStopSingle.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, startStopContinueSingleToXML[startStopSingle.type]));
    }
    return "";
    var _o;
}
function dashedFormattingToXML(dashedFormatting) {
    // <!ENTITY % dashed-formatting
    //     "dash-length   %tenths;  #IMPLIED
    //      space-length  %tenths;  #IMPLIED">
    var attribs = "";
    if (defined(dashedFormatting.dashLength)) {
        attribs += (_o = [" dash-length=\"", "\""], _o.raw = [" dash-length=\"", "\""], xml(_o, dashedFormatting.dashLength));
    }
    if (defined(dashedFormatting.spaceLength)) {
        attribs += (_p = [" space-length=\"", "\""], _p.raw = [" space-length=\"", "\""], xml(_p, dashedFormatting.spaceLength));
    }
    return attribs;
    var _o, _p;
}
var straightCurvedToXML = {
    1: "curved",
    0: "straight"
};
function lineShapeToXML(lineShape) {
    if (defined(lineShape.lineShape)) {
        return (_o = [" line-shape=\"", "\""], _o.raw = [" line-shape=\"", "\""], xml(_o, straightCurvedToXML[lineShape.lineShape]));
    }
    return "";
    var _o;
}
function positionToXML(pos) {
    // <!ENTITY % position
    //     "default-x     %tenths;    #IMPLIED
    //      default-y     %tenths;    #IMPLIED
    //      relative-x    %tenths;    #IMPLIED
    //      relative-y    %tenths;    #IMPLIED">
    var attribs = "";
    if (defined(pos.defaultX)) {
        attribs += (_o = [" default-x=\"", "\""], _o.raw = [" default-x=\"", "\""], xml(_o, pos.defaultX));
    }
    if (defined(pos.defaultY)) {
        attribs += (_p = [" default-y=\"", "\""], _p.raw = [" default-y=\"", "\""], xml(_p, pos.defaultY));
    }
    if (defined(pos.relativeX)) {
        attribs += (_q = [" relative-x=\"", "\""], _q.raw = [" relative-x=\"", "\""], xml(_q, pos.relativeX));
    }
    if (defined(pos.relativeY)) {
        attribs += (_r = [" relative-y=\"", "\""], _r.raw = [" relative-y=\"", "\""], xml(_r, pos.relativeY));
    }
    return attribs;
    var _o, _p, _q, _r;
}
function placementToXML(placement) {
    // <!ENTITY % placement
    //     "placement %above-below; #IMPLIED">
    if (placement.placement > 0 /* Unspecified */) {
        return (_o = [" placement=\"", "\""], _o.raw = [" placement=\"", "\""], xml(_o, placement.placement === 1 /* Above */ ? "above" : "below"));
    }
    return "";
    var _o;
}
function orientationToXML(orientation) {
    // <!ENTITY % orientation
    //     "orientation (over | under) #IMPLIED">
    if (orientation.orientation > 0 /* Unspecified */) {
        return (_o = [" orientation=\"", "\""], _o.raw = [" orientation=\"", "\""], xml(_o, orientation.orientation === 1 /* Over */ ? "over" : "under"));
    }
    return "";
    var _o;
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
        attribs += (_o = [" bezier-offset=\"", "\""], _o.raw = [" bezier-offset=\"", "\""], xml(_o, bezier.bezierOffset));
    }
    if (defined(bezier.bezierOffset2)) {
        attribs += (_p = [" bezier-offset2=\"", "\""], _p.raw = [" bezier-offset2=\"", "\""], xml(_p, bezier.bezierOffset2));
    }
    if (defined(bezier.bezierX)) {
        attribs += (_q = [" bezier-x=\"", "\""], _q.raw = [" bezier-x=\"", "\""], xml(_q, bezier.bezierX));
    }
    if (defined(bezier.bezierY)) {
        attribs += (_r = [" bezier-y=\"", "\""], _r.raw = [" bezier-y=\"", "\""], xml(_r, bezier.bezierY));
    }
    if (defined(bezier.bezierX2)) {
        attribs += (_s = [" bezier-x2=\"", "\""], _s.raw = [" bezier-x2=\"", "\""], xml(_s, bezier.bezierX2));
    }
    if (defined(bezier.bezierY2)) {
        attribs += (_t = [" bezier-y2=\"", "\""], _t.raw = [" bezier-y2=\"", "\""], xml(_t, bezier.bezierY2));
    }
    return attribs;
    var _o, _p, _q, _r, _s, _t;
}
function fontToXML(font) {
    // <!ENTITY % font
    //     "font-family  CDATA  #IMPLIED
    //      font-style   CDATA  #IMPLIED
    //      font-size    CDATA  #IMPLIED
    //      font-weight  CDATA  #IMPLIED">
    var attribs = "";
    if (defined(font.fontFamily)) {
        attribs += (_o = [" font-family=\"", "\""], _o.raw = [" font-family=\"", "\""], xml(_o, font.fontFamily));
    }
    if (defined(font.fontStyle)) {
        attribs += (_p = [" font-style=\"", "\""], _p.raw = [" font-style=\"", "\""], xml(_p, font.fontStyle === 1 /* Italic */ ? "italic" : "normal"));
    }
    if (defined(font.fontSize)) {
        attribs += (_q = [" font-size=\"", "\""], _q.raw = [" font-size=\"", "\""], xml(_q, font.fontSize));
    }
    if (defined(font.fontWeight)) {
        attribs += (_r = [" font-weight=\"", "\""], _r.raw = [" font-weight=\"", "\""], xml(_r, font.fontWeight === 2 /* Bold */ ? "bold" : "normal"));
    }
    return attribs;
    var _o, _p, _q, _r;
}
function printObjectToXML(printObject) {
    // <!ENTITY % print-object
    //     "print-object  %yes-no;  #IMPLIED">
    if (defined(printObject.printObject)) {
        return (_o = [" print-object=\"", "\""], _o.raw = [" print-object=\"", "\""], yesNo(_o, printObject.printObject));
    }
    return "";
    var _o;
}
function printSpacingToXML(printSpacing) {
    // <!ENTITY % print-spacing
    //     "print-spacing %yes-no;  #IMPLIED">
    if (defined(printSpacing.printSpacing)) {
        return (_o = [" print-spacing=\"", "\""], _o.raw = [" print-spacing=\"", "\""], yesNo(_o, printSpacing.printSpacing));
    }
    return "";
    var _o;
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
    return "" + justifyToXML(textFormatting) + printStyleAlignToXML(textFormatting) + textDecorationToXML(textFormatting) + textRotationToXML(textFormatting) + letterSpacingToXML(textFormatting) + lineHeightToXML(textFormatting) + textDirectionToXML(textFormatting) + enclosureToXML(textFormatting);
}
var leftCenterRightToXML = {
    1: "right",
    2: "center",
    0: "left"
};
function justifyToXML(justify) {
    if (defined(justify.justify)) {
        return (_o = [" justify=\"", "\""], _o.raw = [" justify=\"", "\""], xml(_o, leftCenterRightToXML[justify.justify]));
    }
    return "";
    var _o;
}
function halignToXML(halign) {
    if (defined(halign.halign)) {
        return (_o = [" halign=\"", "\""], _o.raw = [" halign=\"", "\""], xml(_o, leftCenterRightToXML[halign.halign]));
    }
    return "";
    var _o;
}
function valignToXML(valign) {
    if (defined(valign.valign)) {
        return (_o = [" valign=\"", "\""], _o.raw = [" valign=\"", "\""], xml(_o, topMiddleBottomBaselineToXML[valign.valign]));
    }
    return "";
    var _o;
}
function printStyleAlignToXML(printStyleAlign) {
    return "" + printStyleToXML(printStyleAlign) + halignToXML(printStyleAlign) + valignToXML(printStyleAlign);
}
function textDecorationToXML(textDecoration) {
    // <!ENTITY % text-decoration
    //     "underline  %number-of-lines;  #IMPLIED
    //      overline  %number-of-lines;   #IMPLIED
    //      line-through  %number-of-lines;   #IMPLIED">
    var attribs = "";
    if (defined(textDecoration.underline)) {
        attribs += (_o = [" underline=\"", "\""], _o.raw = [" underline=\"", "\""], xml(_o, textDecoration.underline));
    }
    if (defined(textDecoration.overline)) {
        attribs += (_p = [" overline=\"", "\""], _p.raw = [" overline=\"", "\""], xml(_p, textDecoration.overline));
    }
    if (defined(textDecoration.lineThrough)) {
        attribs += (_q = [" line-through=\"", "\""], _q.raw = [" line-through=\"", "\""], xml(_q, textDecoration.lineThrough));
    }
    return attribs;
    var _o, _p, _q;
}
function textRotationToXML(textRotation) {
    var attribs = "";
    if (defined(textRotation.rotation)) {
        attribs += (_o = [" rotation=\"", "\""], _o.raw = [" rotation=\"", "\""], xml(_o, textRotation.rotation));
    }
    return attribs;
    var _o;
}
function letterSpacingToXML(letterSpacing) {
    var attribs = "";
    if (defined(letterSpacing.letterSpacing)) {
        attribs += (_o = [" letter-spacing=\"", "\""], _o.raw = [" letter-spacing=\"", "\""], xml(_o, letterSpacing.letterSpacing));
    }
    return attribs;
    var _o;
}
function lineHeightToXML(lineHeight) {
    var attribs = "";
    if (defined(lineHeight.lineHeight)) {
        attribs += (_o = [" line-height=\"", "\""], _o.raw = [" line-height=\"", "\""], xml(_o, lineHeight.lineHeight));
    }
    return attribs;
    var _o;
}
var directionModeToXML = {
    0: "ltr",
    1: "rtl",
    2: "lro",
    3: "rlo"
};
function textDirectionToXML(textDirection) {
    // <!ENTITY % text-direction
    //     "dir (ltr | rtl | lro | rlo) #IMPLIED">
    var attribs = "";
    if (defined(textDirection.dir)) {
        attribs += (_o = [" dir=\"", "\""], _o.raw = [" dir=\"", "\""], xml(_o, directionModeToXML[textDirection.dir]));
    }
    return attribs;
    var _o;
}
var enclosureShapeToXML = {
    3: "circle",
    4: "bracket",
    5: "triangle",
    6: "diamond",
    7: "none",
    1: "square",
    2: "oval",
    0: "rectangle"
};
function enclosureToXML(enclosure) {
    var attribs = "";
    if (defined(enclosure.enclosure)) {
        attribs += (_o = [" enclosure=\"", "\""], _o.raw = [" enclosure=\"", "\""], xml(_o, enclosureShapeToXML[enclosure.enclosure]));
    }
    return attribs;
    var _o;
}
function levelDisplayToXML(levelDisplay) {
    var attribs = "";
    if (defined(levelDisplay.bracket)) {
        attribs += (_o = [" bracket=\"", "\""], _o.raw = [" bracket=\"", "\""], yesNo(_o, levelDisplay.bracket));
    }
    if (levelDisplay.size >= 0 /* Unspecified */) {
        attribs += (_p = [" size=\"", "\""], _p.raw = [" size=\"", "\""], xml(_p, symbolSizeToXML[levelDisplay.size]));
    }
    if (defined(levelDisplay.parentheses)) {
        attribs += (_q = [" parentheses=\"", "\""], _q.raw = [" parentheses=\"", "\""], yesNo(_q, levelDisplay.bracket));
    }
    return attribs;
    var _o, _p, _q;
}
function bendSoundToXML(bendSound) {
    var attribs = "";
    if (defined(bendSound.accelerate)) {
        attribs += (_o = [" accelerate=\"", "\""], _o.raw = [" accelerate=\"", "\""], yesNo(_o, bendSound.accelerate));
    }
    if (defined(bendSound.beats)) {
        attribs += (_p = [" beats=\"", "\""], _p.raw = [" beats=\"", "\""], xml(_p, bendSound.beats));
    }
    if (defined(bendSound.firstBeat)) {
        attribs += (_q = [" first-beat=\"", "\""], _q.raw = [" first-beat=\"", "\""], xml(_q, bendSound.firstBeat));
    }
    if (defined(bendSound.lastBeat)) {
        attribs += (_r = [" last-beat=\"", "\""], _r.raw = [" last-beat=\"", "\""], xml(_r, bendSound.lastBeat));
    }
    return attribs;
    var _o, _p, _q, _r;
}
var upperMainBelowToXML = {
    1: "main",
    2: "below",
    0: "upper"
};
var wholeHalfUnisonToXML = {
    2: "unison",
    0: "whole",
    1: "half"
};
var wholeHalfNoneToXML = {
    3: "none",
    0: "whole",
    1: "half"
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
        attribs += (_o = [" start-note=\"", "\""], _o.raw = [" start-note=\"", "\""], xml(_o, upperMainBelowToXML[trillSound.startNote]));
    }
    if (defined(trillSound.trillStep)) {
        attribs += (_p = [" trill-step=\"", "\""], _p.raw = [" trill-step=\"", "\""], xml(_p, wholeHalfUnisonToXML[trillSound.trillStep]));
    }
    if (defined(trillSound.twoNoteTurn)) {
        attribs += (_q = [" two-note-turn=\"", "\""], _q.raw = [" two-note-turn=\"", "\""], xml(_q, wholeHalfNoneToXML[trillSound.twoNoteTurn]));
    }
    if (defined(trillSound.accelerate)) {
        attribs += (_r = [" accelerate=\"", "\""], _r.raw = [" accelerate=\"", "\""], yesNo(_r, trillSound.accelerate));
    }
    if (defined(trillSound.beats)) {
        attribs += (_s = [" beats=\"", "\""], _s.raw = [" beats=\"", "\""], xml(_s, trillSound.beats));
    }
    if (defined(trillSound.secondBeat)) {
        attribs += (_t = [" second-beat=\"", "\""], _t.raw = [" second-beat=\"", "\""], xml(_t, trillSound.secondBeat));
    }
    if (defined(trillSound.lastBeat)) {
        attribs += (_u = [" last-beat=\"", "\""], _u.raw = [" last-beat=\"", "\""], xml(_u, trillSound.lastBeat));
    }
    return attribs;
    var _o, _p, _q, _r, _s, _t, _u;
}
function slashToXML(slash) {
    if (defined(slash.slash)) {
        return (_o = [" slash=\"", "\""], _o.raw = [" slash=\"", "\""], yesNo(_o, slash.slash));
    }
    return "";
    var _o;
}
function mordentSubsetToXML(mordent) {
    //     long %yes-no; #IMPLIED
    //     approach %above-below; #IMPLIED
    //     departure %above-below; #IMPLIED
    var attribs = "";
    if (defined(mordent.long)) {
        attribs += (_o = [" long=\"", "\""], _o.raw = [" long=\"", "\""], yesNo(_o, mordent.long));
    }
    if (defined(mordent.approach)) {
        attribs += (_p = [" approach=\"", "\""], _p.raw = [" approach=\"", "\""], xml(_p, mordent.approach === 1 /* Above */ ? "above" : "below"));
    }
    if (defined(mordent.departure)) {
        attribs += (_q = [" departure=\"", "\""], _q.raw = [" departure=\"", "\""], xml(_q, mordent.departure === 1 /* Above */ ? "above" : "below"));
    }
    return attribs;
    var _o, _p, _q;
}
function upDownToXML(upDown) {
    if (defined(upDown.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, upDown.type ? "down" : "up"));
    }
    return "";
    var _o;
}
function topBottomToXML(topBottom) {
    if (defined(topBottom.type)) {
        return (_o = [" type=\"", "\""], _o.raw = [" type=\"", "\""], xml(_o, topBottom.type ? "bottom" : "top"));
    }
    return "";
    var _o;
}
function colorToXML(color) {
    // <!ENTITY % color
    //     "color CDATA #IMPLIED">
    if (defined(color.color)) {
        return (_o = [" color=\"", "\""], _o.raw = [" color=\"", "\""], xml(_o, color.color));
    }
    return "";
    var _o;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
