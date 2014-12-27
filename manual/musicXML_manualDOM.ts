declare class XSLTProcessor {

    constructor();

    importStylesheet(xsl: Node): void;

    setParameter(param: string, name: string, value: string): void;
    setParameter(param: string, name: string, value: number): void;

    reset(): void;

    transformToFragment(xml: Node, document: Document): Node;

    transformToDocument(xml: Node): Document;

}

var parttimeXSLBuffer = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"> <xsl:output method=\"xml\" indent=\"yes\" encoding=\"UTF-8\" omit-xml-declaration=\"no\" standalone=\"no\" doctype-system=\"http://www.musicxml.org/dtds/timewise.dtd\" doctype-public=\"-//Recordare//DTD MusicXML 3.0 Timewise//EN\" /> <xsl:template match=\"/\"> <xsl:apply-templates select=\"./score-partwise\"/> <xsl:apply-templates select=\"./score-timewise\"/> </xsl:template> <xsl:template match=\"score-timewise\"> <xsl:copy-of select=\".\" /> </xsl:template> <xsl:template match=\"text()\"> <xsl:value-of select=\".\" /> </xsl:template> <xsl:template match=\"*|@*|comment()|processing-instruction()\"> <xsl:copy><xsl:apply-templates select=\"*|@*|comment()|processing-instruction()|text()\" /></xsl:copy> </xsl:template> <xsl:template match=\"score-partwise\"> <xsl:element name=\"score-timewise\"> <xsl:apply-templates select=\"@version[.!='1.0']\"/> <xsl:apply-templates select=\"work\"/> <xsl:apply-templates select=\"movement-number\"/> <xsl:apply-templates select=\"movement-title\"/> <xsl:apply-templates select=\"identification\"/> <xsl:apply-templates select=\"defaults\"/> <xsl:apply-templates select=\"credit\"/> <xsl:apply-templates select=\"part-list\"/> <xsl:for-each select=\"part[1]/measure\"> <xsl:variable name=\"measure-number\"> <xsl:value-of select=\"@number\"/> </xsl:variable> <xsl:element name=\"measure\"> <xsl:attribute name=\"number\"> <xsl:value-of select=\"$measure-number\"/> </xsl:attribute> <xsl:if test=\"@implicit[. = 'yes']\"> <xsl:attribute name=\"implicit\"> <xsl:value-of select=\"@implicit\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@non-controlling[. = 'yes']\"> <xsl:attribute name=\"non-controlling\"> <xsl:value-of select=\"@non-controlling\"/> </xsl:attribute> </xsl:if> <xsl:if test=\"@width\"> <xsl:attribute name=\"width\"> <xsl:value-of select=\"@width\"/> </xsl:attribute> </xsl:if> <xsl:for-each select=\"../../part/measure\"> <xsl:if test=\"@number=$measure-number\"> <xsl:element name=\"part\"> <xsl:attribute name=\"id\"> <xsl:value-of select=\"parent::part/@id\"/> </xsl:attribute> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>";

var isIE = typeof window !== "undefined" && "ActiveXObject" in window;

if (!isIE) {
    var parttimeXSLDoc = (new DOMParser).parseFromString(parttimeXSLBuffer, "text/xml");

    var parttimeXSLProcessor: XSLTProcessor = new XSLTProcessor;
    parttimeXSLProcessor.importStylesheet(parttimeXSLDoc);
}

export function parseXML(musicxmlBuffer: string) {
    if (isIE) {
        var xslt = new ActiveXObject("Msxml2.XSLTemplate");
        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");

        // Why these aren't set by default completely flabbergasts me.
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
        var dom: Document = (new DOMParser).parseFromString(xslProc.output, "text/xml");
    } else {
        var dom = (new DOMParser).parseFromString(musicxmlBuffer, "text/xml");
        dom = parttimeXSLProcessor.transformToDocument(dom);
    }
    var json = xmlToScoreTimewise(dom.documentElement);
    return json;
}

export function getString(ch: Node, required: boolean) {
    return (ch.nodeType === ch.ATTRIBUTE_NODE ? (<Attr>ch).value : ch.textContent).trim();
}

export function getNumber(ch: Node, required: boolean) {
    var s = getString(ch, required);
    if (s.toLowerCase().indexOf("0x") === 0) {
        return parseInt(s, 16);
    } else {
        return parseFloat(s);
    }
}

export function xmlToTextArray(node: Node) {
    assert(false, "xmlToTextArray not implemented");
    return <TextArray> null;
}

export function toCamelCase(input: string) { 
    "use strict";
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

export function xmlToEncodingDate(node: Node): CalendarDate {
    var text: string = getString(node, true);
    if (text.length < 10) {
        return null;
    }
    return {
        year: parseFloat(text.slice(0,4)),
        month: parseFloat(text.slice(5,7)),
        day: parseFloat(text.slice(8, 1))
    };
}

export function xmlToMeasure(node: Node) {
    "use strict";
    var ret: Measure = <any> {};
    var foundImplicit = false;
    var foundNonControlling = false;
    for (var i = 0; i < node.childNodes.length; ++i) {
        var ch = node.childNodes[i];
        if (ch.nodeName === "part") {
            var dataPart = xmlToPart(ch) ;
            ret.parts = ret.parts || {};
            ret.parts[(<any>ch.attributes)["id"].value] = dataPart;
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

export function xmlToYesNo(p: Node, required?: boolean): boolean {
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

export function xmlToNoteheadText(p: Node): NoteheadText {
    // TODO
    return null;
}

export function xmlToPartNameDisplay(p: Node): PartNameDisplay {
    // TODO
    return null;
}

export function xmlToPartAbbreviationDisplay(p: Node): PartAbbreviationDisplay {
    // TODO
    return null;
}
