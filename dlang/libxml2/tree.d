import libxml2.dict;
import libxml2.parser;
import libxml2.xmlregexp;
import libxml2.xmlIO;
import core.stdc.string;
import core.stdc.stdio;
import core.stdc.string;
import core.stdc.stdio;
import core.stdc.string;
import core.stdc.config;

extern (C):

alias _xmlParserInputBuffer xmlParserInputBuffer;
alias _xmlParserInputBuffer* xmlParserInputBufferPtr;
alias _xmlOutputBuffer xmlOutputBuffer;
alias _xmlOutputBuffer* xmlOutputBufferPtr;
alias _xmlParserInput xmlParserInput;
alias _xmlParserInput* xmlParserInputPtr;
alias _xmlParserCtxt xmlParserCtxt;
alias _xmlParserCtxt* xmlParserCtxtPtr;
alias _xmlSAXLocator xmlSAXLocator;
alias _xmlSAXLocator* xmlSAXLocatorPtr;
alias _xmlSAXHandler xmlSAXHandler;
alias _xmlSAXHandler* xmlSAXHandlerPtr;
alias _xmlEntity xmlEntity;
alias _xmlEntity* xmlEntityPtr;
alias _Anonymous_0 xmlBufferAllocationScheme;
alias _xmlBuffer xmlBuffer;
alias _xmlBuffer* xmlBufferPtr;
alias _xmlBuf xmlBuf;
alias _xmlBuf* xmlBufPtr;
alias _Anonymous_1 xmlElementType;
alias _xmlNotation xmlNotation;
alias _xmlNotation* xmlNotationPtr;
alias _Anonymous_2 xmlAttributeType;
alias _Anonymous_3 xmlAttributeDefault;
alias _xmlEnumeration xmlEnumeration;
alias _xmlEnumeration* xmlEnumerationPtr;
alias _xmlAttribute xmlAttribute;
alias _xmlAttribute* xmlAttributePtr;
alias _Anonymous_4 xmlElementContentType;
alias _Anonymous_5 xmlElementContentOccur;
alias _xmlElementContent xmlElementContent;
alias _xmlElementContent* xmlElementContentPtr;
alias _Anonymous_6 xmlElementTypeVal;
alias _xmlElement xmlElement;
alias _xmlElement* xmlElementPtr;
alias _Anonymous_1 xmlNsType;
alias _xmlNs xmlNs;
alias _xmlNs* xmlNsPtr;
alias _xmlDtd xmlDtd;
alias _xmlDtd* xmlDtdPtr;
alias _xmlAttr xmlAttr;
alias _xmlAttr* xmlAttrPtr;
alias _xmlID xmlID;
alias _xmlID* xmlIDPtr;
alias _xmlRef xmlRef;
alias _xmlRef* xmlRefPtr;
alias _xmlNode xmlNode;
alias _xmlNode* xmlNodePtr;
alias _Anonymous_7 xmlDocProperties;
alias _xmlDoc xmlDoc;
alias _xmlDoc* xmlDocPtr;
alias _xmlDOMWrapCtxt xmlDOMWrapCtxt;
alias _xmlDOMWrapCtxt* xmlDOMWrapCtxtPtr;
alias _xmlNs* function (_xmlDOMWrapCtxt*, _xmlNode*, const(ubyte)*, const(ubyte)*) xmlDOMWrapAcquireNsFunction;

enum _Anonymous_0
{
	XML_BUFFER_ALLOC_DOUBLEIT = 0,
	XML_BUFFER_ALLOC_EXACT = 1,
	XML_BUFFER_ALLOC_IMMUTABLE = 2,
	XML_BUFFER_ALLOC_IO = 3,
	XML_BUFFER_ALLOC_HYBRID = 4
}

enum _Anonymous_1
{
	XML_ELEMENT_NODE = 1,
	XML_ATTRIBUTE_NODE = 2,
	XML_TEXT_NODE = 3,
	XML_CDATA_SECTION_NODE = 4,
	XML_ENTITY_REF_NODE = 5,
	XML_ENTITY_NODE = 6,
	XML_PI_NODE = 7,
	XML_COMMENT_NODE = 8,
	XML_DOCUMENT_NODE = 9,
	XML_DOCUMENT_TYPE_NODE = 10,
	XML_DOCUMENT_FRAG_NODE = 11,
	XML_NOTATION_NODE = 12,
	XML_HTML_DOCUMENT_NODE = 13,
	XML_DTD_NODE = 14,
	XML_ELEMENT_DECL = 15,
	XML_ATTRIBUTE_DECL = 16,
	XML_ENTITY_DECL = 17,
	XML_NAMESPACE_DECL = 18,
	XML_XINCLUDE_START = 19,
	XML_XINCLUDE_END = 20,
	XML_DOCB_DOCUMENT_NODE = 21
}

enum _Anonymous_2
{
	XML_ATTRIBUTE_CDATA = 1,
	XML_ATTRIBUTE_ID = 2,
	XML_ATTRIBUTE_IDREF = 3,
	XML_ATTRIBUTE_IDREFS = 4,
	XML_ATTRIBUTE_ENTITY = 5,
	XML_ATTRIBUTE_ENTITIES = 6,
	XML_ATTRIBUTE_NMTOKEN = 7,
	XML_ATTRIBUTE_NMTOKENS = 8,
	XML_ATTRIBUTE_ENUMERATION = 9,
	XML_ATTRIBUTE_NOTATION = 10
}

enum _Anonymous_3
{
	XML_ATTRIBUTE_NONE = 1,
	XML_ATTRIBUTE_REQUIRED = 2,
	XML_ATTRIBUTE_IMPLIED = 3,
	XML_ATTRIBUTE_FIXED = 4
}

enum _Anonymous_4
{
	XML_ELEMENT_CONTENT_PCDATA = 1,
	XML_ELEMENT_CONTENT_ELEMENT = 2,
	XML_ELEMENT_CONTENT_SEQ = 3,
	XML_ELEMENT_CONTENT_OR = 4
}

enum _Anonymous_5
{
	XML_ELEMENT_CONTENT_ONCE = 1,
	XML_ELEMENT_CONTENT_OPT = 2,
	XML_ELEMENT_CONTENT_MULT = 3,
	XML_ELEMENT_CONTENT_PLUS = 4
}

enum _Anonymous_6
{
	XML_ELEMENT_TYPE_UNDEFINED = 0,
	XML_ELEMENT_TYPE_EMPTY = 1,
	XML_ELEMENT_TYPE_ANY = 2,
	XML_ELEMENT_TYPE_MIXED = 3,
	XML_ELEMENT_TYPE_ELEMENT = 4
}

enum _Anonymous_7
{
	XML_DOC_WELLFORMED = 1,
	XML_DOC_NSVALID = 2,
	XML_DOC_OLD10 = 4,
	XML_DOC_DTDVALID = 8,
	XML_DOC_XINCLUDE = 16,
	XML_DOC_USERBUILT = 32,
	XML_DOC_INTERNAL = 64,
	XML_DOC_HTML = 128
}

struct _xmlBuffer
{
	char* content;
	uint use;
	uint size;
	xmlBufferAllocationScheme alloc;
	char* contentIO;
}

struct _xmlNotation
{
	const(char)* name;
	const(char)* PublicID;
	const(char)* SystemID;
}

struct _xmlEnumeration
{
	_xmlEnumeration* next;
	const(char)* name;
}

struct _xmlAttribute
{
	void* _private;
	xmlElementType type;
	const(char)* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlDtd* parent;
	_xmlNode* next;
	_xmlNode* prev;
	_xmlDoc* doc;
	_xmlAttribute* nexth;
	xmlAttributeType atype;
	xmlAttributeDefault def;
	const(char)* defaultValue;
	xmlEnumerationPtr tree;
	const(char)* prefix;
	const(char)* elem;
}

struct _xmlElementContent
{
	xmlElementContentType type;
	xmlElementContentOccur ocur;
	const(char)* name;
	_xmlElementContent* c1;
	_xmlElementContent* c2;
	_xmlElementContent* parent;
	const(char)* prefix;
}

struct _xmlElement
{
	void* _private;
	xmlElementType type;
	const(char)* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlDtd* parent;
	_xmlNode* next;
	_xmlNode* prev;
	_xmlDoc* doc;
	xmlElementTypeVal etype;
	xmlElementContentPtr content;
	xmlAttributePtr attributes;
	const(char)* prefix;
	xmlRegexpPtr contModel;
}

struct _xmlNs
{
	_xmlNs* next;
	xmlNsType type;
	const(char)* href;
	const(char)* prefix;
	void* _private;
	_xmlDoc* context;
}

struct _xmlDtd
{
	void* _private;
	xmlElementType type;
	const(char)* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlDoc* parent;
	_xmlNode* next;
	_xmlNode* prev;
	_xmlDoc* doc;
	void* notations;
	void* elements;
	void* attributes;
	void* entities;
	const(char)* ExternalID;
	const(char)* SystemID;
	void* pentities;
}

struct _xmlAttr
{
	void* _private;
	xmlElementType type;
	const(char)* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlNode* parent;
	_xmlAttr* next;
	_xmlAttr* prev;
	_xmlDoc* doc;
	xmlNs* ns;
	xmlAttributeType atype;
	void* psvi;
}

struct _xmlID
{
	_xmlID* next;
	const(char)* value;
	xmlAttrPtr attr;
	const(char)* name;
	int lineno;
	_xmlDoc* doc;
}

struct _xmlRef
{
	_xmlRef* next;
	const(char)* value;
	xmlAttrPtr attr;
	const(char)* name;
	int lineno;
}

struct _xmlNode
{
	void* _private;
	xmlElementType type;
	const(char)* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlNode* parent;
	_xmlNode* next;
	_xmlNode* prev;
	_xmlDoc* doc;
	xmlNs* ns;
	char* content;
	_xmlAttr* properties;
	xmlNs* nsDef;
	void* psvi;
	ushort line;
	ushort extra;
}

struct _xmlDoc
{
	void* _private;
	xmlElementType type;
	char* name;
	_xmlNode* children;
	_xmlNode* last;
	_xmlNode* parent;
	_xmlNode* next;
	_xmlNode* prev;
	_xmlDoc* doc;
	int compression;
	int standalone;
	_xmlDtd* intSubset;
	_xmlDtd* extSubset;
	_xmlNs* oldNs;
	const(char)* version_;
	const(char)* encoding;
	void* ids;
	void* refs;
	const(char)* URL;
	int charset;
	_xmlDict* dict;
	void* psvi;
	int parseFlags;
	int properties;
}

struct _xmlDOMWrapCtxt
{
	void* _private;
	int type;
	void* namespaceMap;
	xmlDOMWrapAcquireNsFunction getNsForNodeFunc;
}



















struct _xmlEntity;


struct _xmlBuf;


char* xmlBufContent (const xmlBufPtr buf);
char* xmlBufEnd (const xmlBufPtr buf);
size_t xmlBufUse (const xmlBufPtr buf);
size_t xmlBufShrink (xmlBufPtr buf, size_t len);
int xmlValidateNCName (const(char)* value, int space);
int xmlValidateQName (const(char)* value, int space);
int xmlValidateName (const(char)* value, int space);
int xmlValidateNMToken (const(char)* value, int space);
char* xmlBuildQName (const(char)* ncname, const(char)* prefix, char* memory, int len);
char* xmlSplitQName2 (const(char)* name, char** prefix);
const(char)* xmlSplitQName3 (const(char)* name, int* len);
void xmlSetBufferAllocationScheme (xmlBufferAllocationScheme scheme);
xmlBufferAllocationScheme xmlGetBufferAllocationScheme ();
xmlBufferPtr xmlBufferCreate ();
xmlBufferPtr xmlBufferCreateSize (size_t size);
xmlBufferPtr xmlBufferCreateStatic (void* mem, size_t size);
int xmlBufferResize (xmlBufferPtr buf, uint size);
void xmlBufferFree (xmlBufferPtr buf);
int xmlBufferDump (FILE* file, xmlBufferPtr buf);
int xmlBufferAdd (xmlBufferPtr buf, const(char)* str, int len);
int xmlBufferAddHead (xmlBufferPtr buf, const(char)* str, int len);
int xmlBufferCat (xmlBufferPtr buf, const(char)* str);
int xmlBufferCCat (xmlBufferPtr buf, const(char)* str);
int xmlBufferShrink (xmlBufferPtr buf, uint len);
int xmlBufferGrow (xmlBufferPtr buf, uint len);
void xmlBufferEmpty (xmlBufferPtr buf);
const(char)* xmlBufferContent (const xmlBufferPtr buf);
char* xmlBufferDetach (xmlBufferPtr buf);
void xmlBufferSetAllocationScheme (xmlBufferPtr buf, xmlBufferAllocationScheme scheme);
int xmlBufferLength (const xmlBufferPtr buf);
xmlDtdPtr xmlCreateIntSubset (xmlDocPtr doc, const(char)* name, const(char)* ExternalID, const(char)* SystemID);
xmlDtdPtr xmlNewDtd (xmlDocPtr doc, const(char)* name, const(char)* ExternalID, const(char)* SystemID);
xmlDtdPtr xmlGetIntSubset (xmlDocPtr doc);
void xmlFreeDtd (xmlDtdPtr cur);
xmlNsPtr xmlNewGlobalNs (xmlDocPtr doc, const(char)* href, const(char)* prefix);
xmlNsPtr xmlNewNs (xmlNodePtr node, const(char)* href, const(char)* prefix);
void xmlFreeNs (xmlNsPtr cur);
void xmlFreeNsList (xmlNsPtr cur);
xmlDocPtr xmlNewDoc (const(char)* version_);
void xmlFreeDoc (xmlDocPtr cur);
xmlAttrPtr xmlNewDocProp (xmlDocPtr doc, const(char)* name, const(char)* value);
xmlAttrPtr xmlNewProp (xmlNodePtr node, const(char)* name, const(char)* value);
xmlAttrPtr xmlNewNsProp (xmlNodePtr node, xmlNsPtr ns, const(char)* name, const(char)* value);
xmlAttrPtr xmlNewNsPropEatName (xmlNodePtr node, xmlNsPtr ns, char* name, const(char)* value);
void xmlFreePropList (xmlAttrPtr cur);
void xmlFreeProp (xmlAttrPtr cur);
xmlAttrPtr xmlCopyProp (xmlNodePtr target, xmlAttrPtr cur);
xmlAttrPtr xmlCopyPropList (xmlNodePtr target, xmlAttrPtr cur);
xmlDtdPtr xmlCopyDtd (xmlDtdPtr dtd);
xmlDocPtr xmlCopyDoc (xmlDocPtr doc, int recursive);
xmlNodePtr xmlNewDocNode (xmlDocPtr doc, xmlNsPtr ns, const(char)* name, const(char)* content);
xmlNodePtr xmlNewDocNodeEatName (xmlDocPtr doc, xmlNsPtr ns, char* name, const(char)* content);
xmlNodePtr xmlNewNode (xmlNsPtr ns, const(char)* name);
xmlNodePtr xmlNewNodeEatName (xmlNsPtr ns, char* name);
xmlNodePtr xmlNewChild (xmlNodePtr parent, xmlNsPtr ns, const(char)* name, const(char)* content);
xmlNodePtr xmlNewDocText (xmlDocPtr doc, const(char)* content);
xmlNodePtr xmlNewText (const(char)* content);
xmlNodePtr xmlNewDocPI (xmlDocPtr doc, const(char)* name, const(char)* content);
xmlNodePtr xmlNewPI (const(char)* name, const(char)* content);
xmlNodePtr xmlNewDocTextLen (xmlDocPtr doc, const(char)* content, int len);
xmlNodePtr xmlNewTextLen (const(char)* content, int len);
xmlNodePtr xmlNewDocComment (xmlDocPtr doc, const(char)* content);
xmlNodePtr xmlNewComment (const(char)* content);
xmlNodePtr xmlNewCDataBlock (xmlDocPtr doc, const(char)* content, int len);
xmlNodePtr xmlNewCharRef (xmlDocPtr doc, const(char)* name);
xmlNodePtr xmlNewReference (xmlDocPtr doc, const(char)* name);
xmlNodePtr xmlCopyNode (const xmlNodePtr node, int recursive);
xmlNodePtr xmlDocCopyNode (const xmlNodePtr node, xmlDocPtr doc, int recursive);
xmlNodePtr xmlDocCopyNodeList (xmlDocPtr doc, const xmlNodePtr node);
xmlNodePtr xmlCopyNodeList (const xmlNodePtr node);
xmlNodePtr xmlNewTextChild (xmlNodePtr parent, xmlNsPtr ns, const(char)* name, const(char)* content);
xmlNodePtr xmlNewDocRawNode (xmlDocPtr doc, xmlNsPtr ns, const(char)* name, const(char)* content);
xmlNodePtr xmlNewDocFragment (xmlDocPtr doc);
c_long xmlGetLineNo (xmlNodePtr node);
char* xmlGetNodePath (xmlNodePtr node);
xmlNodePtr xmlDocGetRootElement (xmlDocPtr doc);
xmlNodePtr xmlGetLastChild (xmlNodePtr parent);
int xmlNodeIsText (xmlNodePtr node);
int xmlIsBlankNode (xmlNodePtr node);
xmlNodePtr xmlDocSetRootElement (xmlDocPtr doc, xmlNodePtr root);
void xmlNodeSetName (xmlNodePtr cur, const(char)* name);
xmlNodePtr xmlAddChild (xmlNodePtr parent, xmlNodePtr cur);
xmlNodePtr xmlAddChildList (xmlNodePtr parent, xmlNodePtr cur);
xmlNodePtr xmlReplaceNode (xmlNodePtr old, xmlNodePtr cur);
xmlNodePtr xmlAddPrevSibling (xmlNodePtr cur, xmlNodePtr elem);
xmlNodePtr xmlAddSibling (xmlNodePtr cur, xmlNodePtr elem);
xmlNodePtr xmlAddNextSibling (xmlNodePtr cur, xmlNodePtr elem);
void xmlUnlinkNode (xmlNodePtr cur);
xmlNodePtr xmlTextMerge (xmlNodePtr first, xmlNodePtr second);
int xmlTextConcat (xmlNodePtr node, const(char)* content, int len);
void xmlFreeNodeList (xmlNodePtr cur);
void xmlFreeNode (xmlNodePtr cur);
void xmlSetTreeDoc (xmlNodePtr tree, xmlDocPtr doc);
void xmlSetListDoc (xmlNodePtr list, xmlDocPtr doc);
xmlNsPtr xmlSearchNs (xmlDocPtr doc, xmlNodePtr node, const(char)* nameSpace);
xmlNsPtr xmlSearchNsByHref (xmlDocPtr doc, xmlNodePtr node, const(char)* href);
xmlNsPtr* xmlGetNsList (xmlDocPtr doc, xmlNodePtr node);
void xmlSetNs (xmlNodePtr node, xmlNsPtr ns);
xmlNsPtr xmlCopyNamespace (xmlNsPtr cur);
xmlNsPtr xmlCopyNamespaceList (xmlNsPtr cur);
xmlAttrPtr xmlSetProp (xmlNodePtr node, const(char)* name, const(char)* value);
xmlAttrPtr xmlSetNsProp (xmlNodePtr node, xmlNsPtr ns, const(char)* name, const(char)* value);
char* xmlGetNoNsProp (xmlNodePtr node, const(char)* name);
char* xmlGetProp (xmlNodePtr node, const(char)* name);
xmlAttrPtr xmlHasProp (xmlNodePtr node, const(char)* name);
xmlAttrPtr xmlHasNsProp (xmlNodePtr node, const(char)* name, const(char)* nameSpace);
char* xmlGetNsProp (xmlNodePtr node, const(char)* name, const(char)* nameSpace);
xmlNodePtr xmlStringGetNodeList (xmlDocPtr doc, const(char)* value);
xmlNodePtr xmlStringLenGetNodeList (xmlDocPtr doc, const(char)* value, int len);
char* xmlNodeListGetString (xmlDocPtr doc, xmlNodePtr list, int inLine);
char* xmlNodeListGetRawString (xmlDocPtr doc, xmlNodePtr list, int inLine);
void xmlNodeSetContent (xmlNodePtr cur, const(char)* content);
void xmlNodeSetContentLen (xmlNodePtr cur, const(char)* content, int len);
void xmlNodeAddContent (xmlNodePtr cur, const(char)* content);
void xmlNodeAddContentLen (xmlNodePtr cur, const(char)* content, int len);
char* xmlNodeGetContent (xmlNodePtr cur);
int xmlNodeBufGetContent (xmlBufferPtr buffer, xmlNodePtr cur);
int xmlBufGetNodeContent (xmlBufPtr buf, xmlNodePtr cur);
char* xmlNodeGetLang (xmlNodePtr cur);
int xmlNodeGetSpacePreserve (xmlNodePtr cur);
void xmlNodeSetLang (xmlNodePtr cur, const(char)* lang);
void xmlNodeSetSpacePreserve (xmlNodePtr cur, int val);
char* xmlNodeGetBase (xmlDocPtr doc, xmlNodePtr cur);
void xmlNodeSetBase (xmlNodePtr cur, const(char)* uri);
int xmlRemoveProp (xmlAttrPtr cur);
int xmlUnsetNsProp (xmlNodePtr node, xmlNsPtr ns, const(char)* name);
int xmlUnsetProp (xmlNodePtr node, const(char)* name);
void xmlBufferWriteCHAR (xmlBufferPtr buf, const(char)* string);
void xmlBufferWriteChar (xmlBufferPtr buf, const(char)* string);
void xmlBufferWriteQuotedString (xmlBufferPtr buf, const(char)* string);
void xmlAttrSerializeTxtContent (xmlBufferPtr buf, xmlDocPtr doc, xmlAttrPtr attr, const(char)* string);
int xmlReconciliateNs (xmlDocPtr doc, xmlNodePtr tree);
void xmlDocDumpFormatMemory (xmlDocPtr cur, char** mem, int* size, int format);
void xmlDocDumpMemory (xmlDocPtr cur, char** mem, int* size);
void xmlDocDumpMemoryEnc (xmlDocPtr out_doc, char** doc_txt_ptr, int* doc_txt_len, const(char)* txt_encoding);
void xmlDocDumpFormatMemoryEnc (xmlDocPtr out_doc, char** doc_txt_ptr, int* doc_txt_len, const(char)* txt_encoding, int format);
int xmlDocFormatDump (FILE* f, xmlDocPtr cur, int format);
int xmlDocDump (FILE* f, xmlDocPtr cur);
void xmlElemDump (FILE* f, xmlDocPtr doc, xmlNodePtr cur);
int xmlSaveFile (const(char)* filename, xmlDocPtr cur);
int xmlSaveFormatFile (const(char)* filename, xmlDocPtr cur, int format);
size_t xmlBufNodeDump (xmlBufPtr buf, xmlDocPtr doc, xmlNodePtr cur, int level, int format);
int xmlNodeDump (xmlBufferPtr buf, xmlDocPtr doc, xmlNodePtr cur, int level, int format);
int xmlSaveFileTo (xmlOutputBufferPtr buf, xmlDocPtr cur, const(char)* encoding);
int xmlSaveFormatFileTo (xmlOutputBufferPtr buf, xmlDocPtr cur, const(char)* encoding, int format);
void xmlNodeDumpOutput (xmlOutputBufferPtr buf, xmlDocPtr doc, xmlNodePtr cur, int level, int format, const(char)* encoding);
int xmlSaveFormatFileEnc (const(char)* filename, xmlDocPtr cur, const(char)* encoding, int format);
int xmlSaveFileEnc (const(char)* filename, xmlDocPtr cur, const(char)* encoding);
int xmlIsXHTML (const(char)* systemID, const(char)* publicID);
int xmlGetDocCompressMode (xmlDocPtr doc);
void xmlSetDocCompressMode (xmlDocPtr doc, int mode);
int xmlGetCompressMode ();
void xmlSetCompressMode (int mode);
xmlDOMWrapCtxtPtr xmlDOMWrapNewCtxt ();
void xmlDOMWrapFreeCtxt (xmlDOMWrapCtxtPtr ctxt);
int xmlDOMWrapReconcileNamespaces (xmlDOMWrapCtxtPtr ctxt, xmlNodePtr elem, int options);
int xmlDOMWrapAdoptNode (xmlDOMWrapCtxtPtr ctxt, xmlDocPtr sourceDoc, xmlNodePtr node, xmlDocPtr destDoc, xmlNodePtr destParent, int options);
int xmlDOMWrapRemoveNode (xmlDOMWrapCtxtPtr ctxt, xmlDocPtr doc, xmlNodePtr node, int options);
int xmlDOMWrapCloneNode (xmlDOMWrapCtxtPtr ctxt, xmlDocPtr sourceDoc, xmlNodePtr node, xmlNodePtr* clonedNode, xmlDocPtr destDoc, xmlNodePtr destParent, int deep, int options);
c_ulong xmlChildElementCount (xmlNodePtr parent);
xmlNodePtr xmlNextElementSibling (xmlNodePtr node);
xmlNodePtr xmlFirstElementChild (xmlNodePtr parent);
xmlNodePtr xmlLastElementChild (xmlNodePtr parent);
xmlNodePtr xmlPreviousElementSibling (xmlNodePtr node);