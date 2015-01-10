import libxml2.tree;
import libxml2.xmlautomata;
import libxml2.list;
import core.stdc.string;

extern (C):

alias _xmlValidState xmlValidState;
alias _xmlValidState* xmlValidStatePtr;
alias void function (void*, const(char)*, ...) xmlValidityErrorFunc;
alias void function (void*, const(char)*, ...) xmlValidityWarningFunc;
alias _xmlValidCtxt xmlValidCtxt;
alias _xmlValidCtxt* xmlValidCtxtPtr;
alias _xmlHashTable xmlNotationTable;
alias _xmlHashTable* xmlNotationTablePtr;
alias _xmlHashTable xmlElementTable;
alias _xmlHashTable* xmlElementTablePtr;
alias _xmlHashTable xmlAttributeTable;
alias _xmlHashTable* xmlAttributeTablePtr;
alias _xmlHashTable xmlIDTable;
alias _xmlHashTable* xmlIDTablePtr;
alias _xmlHashTable xmlRefTable;
alias _xmlHashTable* xmlRefTablePtr;

struct _xmlValidCtxt
{
	void* userData;
	xmlValidityErrorFunc error;
	xmlValidityWarningFunc warning;
	xmlNodePtr node;
	int nodeNr;
	int nodeMax;
	xmlNodePtr* nodeTab;
	uint finishDtd;
	xmlDocPtr doc;
	int valid;
	xmlValidState* vstate;
	int vstateNr;
	int vstateMax;
	xmlValidState* vstateTab;
	xmlAutomataPtr am;
	xmlAutomataStatePtr state;
}

struct _xmlHashTable;


struct _xmlValidState;


xmlNotationPtr xmlAddNotationDecl (xmlValidCtxtPtr ctxt, xmlDtdPtr dtd, const(char)* name, const(char)* PublicID, const(char)* SystemID);
xmlNotationTablePtr xmlCopyNotationTable (xmlNotationTablePtr table);
void xmlFreeNotationTable (xmlNotationTablePtr table);
void xmlDumpNotationDecl (xmlBufferPtr buf, xmlNotationPtr nota);
void xmlDumpNotationTable (xmlBufferPtr buf, xmlNotationTablePtr table);
xmlElementContentPtr xmlNewElementContent (const(char)* name, xmlElementContentType type);
xmlElementContentPtr xmlCopyElementContent (xmlElementContentPtr content);
void xmlFreeElementContent (xmlElementContentPtr cur);
xmlElementContentPtr xmlNewDocElementContent (xmlDocPtr doc, const(char)* name, xmlElementContentType type);
xmlElementContentPtr xmlCopyDocElementContent (xmlDocPtr doc, xmlElementContentPtr content);
void xmlFreeDocElementContent (xmlDocPtr doc, xmlElementContentPtr cur);
void xmlSnprintfElementContent (char* buf, int size, xmlElementContentPtr content, int englob);
void xmlSprintfElementContent (char* buf, xmlElementContentPtr content, int englob);
xmlElementPtr xmlAddElementDecl (xmlValidCtxtPtr ctxt, xmlDtdPtr dtd, const(char)* name, xmlElementTypeVal type, xmlElementContentPtr content);
xmlElementTablePtr xmlCopyElementTable (xmlElementTablePtr table);
void xmlFreeElementTable (xmlElementTablePtr table);
void xmlDumpElementTable (xmlBufferPtr buf, xmlElementTablePtr table);
void xmlDumpElementDecl (xmlBufferPtr buf, xmlElementPtr elem);
xmlEnumerationPtr xmlCreateEnumeration (const(char)* name);
void xmlFreeEnumeration (xmlEnumerationPtr cur);
xmlEnumerationPtr xmlCopyEnumeration (xmlEnumerationPtr cur);
xmlAttributePtr xmlAddAttributeDecl (xmlValidCtxtPtr ctxt, xmlDtdPtr dtd, const(char)* elem, const(char)* name, const(char)* ns, xmlAttributeType type, xmlAttributeDefault def, const(char)* defaultValue, xmlEnumerationPtr tree);
xmlAttributeTablePtr xmlCopyAttributeTable (xmlAttributeTablePtr table);
void xmlFreeAttributeTable (xmlAttributeTablePtr table);
void xmlDumpAttributeTable (xmlBufferPtr buf, xmlAttributeTablePtr table);
void xmlDumpAttributeDecl (xmlBufferPtr buf, xmlAttributePtr attr);
xmlIDPtr xmlAddID (xmlValidCtxtPtr ctxt, xmlDocPtr doc, const(char)* value, xmlAttrPtr attr);
void xmlFreeIDTable (xmlIDTablePtr table);
xmlAttrPtr xmlGetID (xmlDocPtr doc, const(char)* ID);
int xmlIsID (xmlDocPtr doc, xmlNodePtr elem, xmlAttrPtr attr);
int xmlRemoveID (xmlDocPtr doc, xmlAttrPtr attr);
xmlRefPtr xmlAddRef (xmlValidCtxtPtr ctxt, xmlDocPtr doc, const(char)* value, xmlAttrPtr attr);
void xmlFreeRefTable (xmlRefTablePtr table);
int xmlIsRef (xmlDocPtr doc, xmlNodePtr elem, xmlAttrPtr attr);
int xmlRemoveRef (xmlDocPtr doc, xmlAttrPtr attr);
xmlListPtr xmlGetRefs (xmlDocPtr doc, const(char)* ID);
xmlValidCtxtPtr xmlNewValidCtxt ();
void xmlFreeValidCtxt (xmlValidCtxtPtr);
int xmlValidateRoot (xmlValidCtxtPtr ctxt, xmlDocPtr doc);
int xmlValidateElementDecl (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlElementPtr elem);
char* xmlValidNormalizeAttributeValue (xmlDocPtr doc, xmlNodePtr elem, const(char)* name, const(char)* value);
char* xmlValidCtxtNormalizeAttributeValue (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem, const(char)* name, const(char)* value);
int xmlValidateAttributeDecl (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlAttributePtr attr);
int xmlValidateAttributeValue (xmlAttributeType type, const(char)* value);
int xmlValidateNotationDecl (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNotationPtr nota);
int xmlValidateDtd (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlDtdPtr dtd);
int xmlValidateDtdFinal (xmlValidCtxtPtr ctxt, xmlDocPtr doc);
int xmlValidateDocument (xmlValidCtxtPtr ctxt, xmlDocPtr doc);
int xmlValidateElement (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem);
int xmlValidateOneElement (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem);
int xmlValidateOneAttribute (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem, xmlAttrPtr attr, const(char)* value);
int xmlValidateOneNamespace (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem, const(char)* prefix, xmlNsPtr ns, const(char)* value);
int xmlValidateDocumentFinal (xmlValidCtxtPtr ctxt, xmlDocPtr doc);
int xmlValidateNotationUse (xmlValidCtxtPtr ctxt, xmlDocPtr doc, const(char)* notationName);
int xmlIsMixedElement (xmlDocPtr doc, const(char)* name);
xmlAttributePtr xmlGetDtdAttrDesc (xmlDtdPtr dtd, const(char)* elem, const(char)* name);
xmlAttributePtr xmlGetDtdQAttrDesc (xmlDtdPtr dtd, const(char)* elem, const(char)* name, const(char)* prefix);
xmlNotationPtr xmlGetDtdNotationDesc (xmlDtdPtr dtd, const(char)* name);
xmlElementPtr xmlGetDtdQElementDesc (xmlDtdPtr dtd, const(char)* name, const(char)* prefix);
xmlElementPtr xmlGetDtdElementDesc (xmlDtdPtr dtd, const(char)* name);
int xmlValidGetPotentialChildren (xmlElementContent* ctree, const(char*)* names, int* len, int max);
int xmlValidGetValidElements (xmlNode* prev, xmlNode* next, const(char*)* names, int max);
int xmlValidateNameValue (const(char)* value);
int xmlValidateNamesValue (const(char)* value);
int xmlValidateNmtokenValue (const(char)* value);
int xmlValidateNmtokensValue (const(char)* value);
int xmlValidBuildContentModel (xmlValidCtxtPtr ctxt, xmlElementPtr elem);
int xmlValidatePushElement (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem, const(char)* qname);
int xmlValidatePushCData (xmlValidCtxtPtr ctxt, const(char)* data, int len);
int xmlValidatePopElement (xmlValidCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr elem, const(char)* qname);