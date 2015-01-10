import libxml2.tree;
import libxml2.valid;
import libxml2.list;
import libxml2.dict;
import libxml2.hash;
import libxml2.encoding;
import libxml2.xmlerror;
import libxml2.xmlIO;
import core.stdc.string;
import core.stdc.config;

extern (C):

alias void function (ubyte*) xmlParserInputDeallocate;
alias _xmlParserNodeInfo xmlParserNodeInfo;
alias _xmlParserNodeInfo* xmlParserNodeInfoPtr;
alias _xmlParserNodeInfoSeq xmlParserNodeInfoSeq;
alias _xmlParserNodeInfoSeq* xmlParserNodeInfoSeqPtr;
alias _Anonymous_0 xmlParserInputState;
alias _Anonymous_1 xmlParserMode;
alias _xmlParserInput* function (void*, const(ubyte)*, const(ubyte)*) resolveEntitySAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*) internalSubsetSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*) externalSubsetSAXFunc;
alias _xmlEntity* function (void*, const(ubyte)*) getEntitySAXFunc;
alias _xmlEntity* function (void*, const(ubyte)*) getParameterEntitySAXFunc;
alias void function (void*, const(ubyte)*, int, const(ubyte)*, const(ubyte)*, ubyte*) entityDeclSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*) notationDeclSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, int, int, const(ubyte)*, _xmlEnumeration*) attributeDeclSAXFunc;
alias void function (void*, const(ubyte)*, int, _xmlElementContent*) elementDeclSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*, const(ubyte)*) unparsedEntityDeclSAXFunc;
alias void function (void*, _xmlSAXLocator*) setDocumentLocatorSAXFunc;
alias void function (void*) startDocumentSAXFunc;
alias void function (void*) endDocumentSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte*)*) startElementSAXFunc;
alias void function (void*, const(ubyte)*) endElementSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*) attributeSAXFunc;
alias void function (void*, const(ubyte)*) referenceSAXFunc;
alias void function (void*, const(ubyte)*, int) charactersSAXFunc;
alias void function (void*, const(ubyte)*, int) ignorableWhitespaceSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*) processingInstructionSAXFunc;
alias void function (void*, const(ubyte)*) commentSAXFunc;
alias void function (void*, const(ubyte)*, int) cdataBlockSAXFunc;
alias void function (void*, const(char)*, ...) warningSAXFunc;
alias void function (void*, const(char)*, ...) errorSAXFunc;
alias void function (void*, const(char)*, ...) fatalErrorSAXFunc;
alias int function (void*) isStandaloneSAXFunc;
alias int function (void*) hasInternalSubsetSAXFunc;
alias int function (void*) hasExternalSubsetSAXFunc;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*, int, const(ubyte*)*, int, int, const(ubyte*)*) startElementNsSAX2Func;
alias void function (void*, const(ubyte)*, const(ubyte)*, const(ubyte)*) endElementNsSAX2Func;
alias _xmlSAXHandlerV1 xmlSAXHandlerV1;
alias _xmlSAXHandlerV1* xmlSAXHandlerV1Ptr;
alias _xmlParserInput* function (const(char)*, const(char)*, _xmlParserCtxt*) xmlExternalEntityLoader;
alias _Anonymous_2 xmlParserOption;
alias _Anonymous_3 xmlFeature;

enum _Anonymous_0
{
	XML_PARSER_EOF = -1,
	XML_PARSER_START = 0,
	XML_PARSER_MISC = 1,
	XML_PARSER_PI = 2,
	XML_PARSER_DTD = 3,
	XML_PARSER_PROLOG = 4,
	XML_PARSER_COMMENT = 5,
	XML_PARSER_START_TAG = 6,
	XML_PARSER_CONTENT = 7,
	XML_PARSER_CDATA_SECTION = 8,
	XML_PARSER_END_TAG = 9,
	XML_PARSER_ENTITY_DECL = 10,
	XML_PARSER_ENTITY_VALUE = 11,
	XML_PARSER_ATTRIBUTE_VALUE = 12,
	XML_PARSER_SYSTEM_LITERAL = 13,
	XML_PARSER_EPILOG = 14,
	XML_PARSER_IGNORE = 15,
	XML_PARSER_PUBLIC_LITERAL = 16
}

enum _Anonymous_1
{
	XML_PARSE_UNKNOWN = 0,
	XML_PARSE_DOM = 1,
	XML_PARSE_SAX = 2,
	XML_PARSE_PUSH_DOM = 3,
	XML_PARSE_PUSH_SAX = 4,
	XML_PARSE_READER = 5
}

enum _Anonymous_2
{
	XML_PARSE_RECOVER = 1,
	XML_PARSE_NOENT = 2,
	XML_PARSE_DTDLOAD = 4,
	XML_PARSE_DTDATTR = 8,
	XML_PARSE_DTDVALID = 16,
	XML_PARSE_NOERROR = 32,
	XML_PARSE_NOWARNING = 64,
	XML_PARSE_PEDANTIC = 128,
	XML_PARSE_NOBLANKS = 256,
	XML_PARSE_SAX1 = 512,
	XML_PARSE_XINCLUDE = 1024,
	XML_PARSE_NONET = 2048,
	XML_PARSE_NODICT = 4096,
	XML_PARSE_NSCLEAN = 8192,
	XML_PARSE_NOCDATA = 16384,
	XML_PARSE_NOXINCNODE = 32768,
	XML_PARSE_COMPACT = 65536,
	XML_PARSE_OLD10 = 131072,
	XML_PARSE_NOBASEFIX = 262144,
	XML_PARSE_HUGE = 524288,
	XML_PARSE_OLDSAX = 1048576,
	XML_PARSE_IGNORE_ENC = 2097152,
	XML_PARSE_BIG_LINES = 4194304
}

enum _Anonymous_3
{
	XML_WITH_THREAD = 1,
	XML_WITH_TREE = 2,
	XML_WITH_OUTPUT = 3,
	XML_WITH_PUSH = 4,
	XML_WITH_READER = 5,
	XML_WITH_PATTERN = 6,
	XML_WITH_WRITER = 7,
	XML_WITH_SAX1 = 8,
	XML_WITH_FTP = 9,
	XML_WITH_HTTP = 10,
	XML_WITH_VALID = 11,
	XML_WITH_HTML = 12,
	XML_WITH_LEGACY = 13,
	XML_WITH_C14N = 14,
	XML_WITH_CATALOG = 15,
	XML_WITH_XPATH = 16,
	XML_WITH_XPTR = 17,
	XML_WITH_XINCLUDE = 18,
	XML_WITH_ICONV = 19,
	XML_WITH_ISO8859X = 20,
	XML_WITH_UNICODE = 21,
	XML_WITH_REGEXP = 22,
	XML_WITH_AUTOMATA = 23,
	XML_WITH_EXPR = 24,
	XML_WITH_SCHEMAS = 25,
	XML_WITH_SCHEMATRON = 26,
	XML_WITH_MODULES = 27,
	XML_WITH_DEBUG = 28,
	XML_WITH_DEBUG_MEM = 29,
	XML_WITH_DEBUG_RUN = 30,
	XML_WITH_ZLIB = 31,
	XML_WITH_ICU = 32,
	XML_WITH_LZMA = 33,
	XML_WITH_NONE = 99999
}

struct _xmlParserInput
{
	xmlParserInputBufferPtr buf;
	const(char)* filename;
	const(char)* directory;
	const(char)* base;
	const(char)* cur;
	const(char)* end;
	int length;
	int line;
	int col;
	c_ulong consumed;
	xmlParserInputDeallocate free;
	const(char)* encoding;
	const(char)* version_;
	int standalone;
	int id;
}

struct _xmlParserNodeInfo
{
	const(_xmlNode)* node;
	c_ulong begin_pos;
	c_ulong begin_line;
	c_ulong end_pos;
	c_ulong end_line;
}

struct _xmlParserNodeInfoSeq
{
	c_ulong maximum;
	c_ulong length;
	xmlParserNodeInfo* buffer;
}

struct _xmlParserCtxt
{
	_xmlSAXHandler* sax;
	void* userData;
	xmlDocPtr myDoc;
	int wellFormed;
	int replaceEntities;
	const(char)* version_;
	const(char)* encoding;
	int standalone;
	int html;
	xmlParserInputPtr input;
	int inputNr;
	int inputMax;
	xmlParserInputPtr* inputTab;
	xmlNodePtr node;
	int nodeNr;
	int nodeMax;
	xmlNodePtr* nodeTab;
	int record_info;
	xmlParserNodeInfoSeq node_seq;
	int errNo;
	int hasExternalSubset;
	int hasPErefs;
	int external;
	int valid;
	int validate;
	xmlValidCtxt vctxt;
	xmlParserInputState instate;
	int token;
	char* directory;
	const(char)* name;
	int nameNr;
	int nameMax;
	const(char*)* nameTab;
	c_long nbChars;
	c_long checkIndex;
	int keepBlanks;
	int disableSAX;
	int inSubset;
	const(char)* intSubName;
	char* extSubURI;
	char* extSubSystem;
	int* space;
	int spaceNr;
	int spaceMax;
	int* spaceTab;
	int depth;
	xmlParserInputPtr entity;
	int charset;
	int nodelen;
	int nodemem;
	int pedantic;
	void* _private;
	int loadsubset;
	int linenumbers;
	void* catalogs;
	int recovery;
	int progressive;
	xmlDictPtr dict;
	const(char*)* atts;
	int maxatts;
	int docdict;
	const(char)* str_xml;
	const(char)* str_xmlns;
	const(char)* str_xml_ns;
	int sax2;
	int nsNr;
	int nsMax;
	const(char*)* nsTab;
	int* attallocs;
	void** pushTab;
	xmlHashTablePtr attsDefault;
	xmlHashTablePtr attsSpecial;
	int nsWellFormed;
	int options;
	int dictNames;
	int freeElemsNr;
	xmlNodePtr freeElems;
	int freeAttrsNr;
	xmlAttrPtr freeAttrs;
	xmlError lastError;
	xmlParserMode parseMode;
	c_ulong nbentities;
	c_ulong sizeentities;
	xmlParserNodeInfo* nodeInfo;
	int nodeInfoNr;
	int nodeInfoMax;
	xmlParserNodeInfo* nodeInfoTab;
	int input_id;
	c_ulong sizeentcopy;
}

struct _xmlSAXLocator
{
	const(char)* function (void*) getPublicId;
	const(char)* function (void*) getSystemId;
	int function (void*) getLineNumber;
	int function (void*) getColumnNumber;
}

struct _xmlSAXHandler
{
	internalSubsetSAXFunc internalSubset;
	isStandaloneSAXFunc isStandalone;
	hasInternalSubsetSAXFunc hasInternalSubset;
	hasExternalSubsetSAXFunc hasExternalSubset;
	resolveEntitySAXFunc resolveEntity;
	getEntitySAXFunc getEntity;
	entityDeclSAXFunc entityDecl;
	notationDeclSAXFunc notationDecl;
	attributeDeclSAXFunc attributeDecl;
	elementDeclSAXFunc elementDecl;
	unparsedEntityDeclSAXFunc unparsedEntityDecl;
	setDocumentLocatorSAXFunc setDocumentLocator;
	startDocumentSAXFunc startDocument;
	endDocumentSAXFunc endDocument;
	startElementSAXFunc startElement;
	endElementSAXFunc endElement;
	referenceSAXFunc reference;
	charactersSAXFunc characters;
	ignorableWhitespaceSAXFunc ignorableWhitespace;
	processingInstructionSAXFunc processingInstruction;
	commentSAXFunc comment;
	warningSAXFunc warning;
	errorSAXFunc error;
	fatalErrorSAXFunc fatalError;
	getParameterEntitySAXFunc getParameterEntity;
	cdataBlockSAXFunc cdataBlock;
	externalSubsetSAXFunc externalSubset;
	uint initialized;
	void* _private;
	startElementNsSAX2Func startElementNs;
	endElementNsSAX2Func endElementNs;
	xmlStructuredErrorFunc serror;
}

struct _xmlSAXHandlerV1
{
	internalSubsetSAXFunc internalSubset;
	isStandaloneSAXFunc isStandalone;
	hasInternalSubsetSAXFunc hasInternalSubset;
	hasExternalSubsetSAXFunc hasExternalSubset;
	resolveEntitySAXFunc resolveEntity;
	getEntitySAXFunc getEntity;
	entityDeclSAXFunc entityDecl;
	notationDeclSAXFunc notationDecl;
	attributeDeclSAXFunc attributeDecl;
	elementDeclSAXFunc elementDecl;
	unparsedEntityDeclSAXFunc unparsedEntityDecl;
	setDocumentLocatorSAXFunc setDocumentLocator;
	startDocumentSAXFunc startDocument;
	endDocumentSAXFunc endDocument;
	startElementSAXFunc startElement;
	endElementSAXFunc endElement;
	referenceSAXFunc reference;
	charactersSAXFunc characters;
	ignorableWhitespaceSAXFunc ignorableWhitespace;
	processingInstructionSAXFunc processingInstruction;
	commentSAXFunc comment;
	warningSAXFunc warning;
	errorSAXFunc error;
	fatalErrorSAXFunc fatalError;
	getParameterEntitySAXFunc getParameterEntity;
	cdataBlockSAXFunc cdataBlock;
	externalSubsetSAXFunc externalSubset;
	uint initialized;
}

void xmlInitParser ();
void xmlCleanupParser ();
int xmlParserInputRead (xmlParserInputPtr in_, int len);
int xmlParserInputGrow (xmlParserInputPtr in_, int len);
xmlDocPtr xmlParseDoc (const(char)* cur);
xmlDocPtr xmlParseFile (const(char)* filename);
xmlDocPtr xmlParseMemory (const(char)* buffer, int size);
int xmlSubstituteEntitiesDefault (int val);
int xmlKeepBlanksDefault (int val);
void xmlStopParser (xmlParserCtxtPtr ctxt);
int xmlPedanticParserDefault (int val);
int xmlLineNumbersDefault (int val);
xmlDocPtr xmlRecoverDoc (const(char)* cur);
xmlDocPtr xmlRecoverMemory (const(char)* buffer, int size);
xmlDocPtr xmlRecoverFile (const(char)* filename);
int xmlParseDocument (xmlParserCtxtPtr ctxt);
int xmlParseExtParsedEnt (xmlParserCtxtPtr ctxt);
int xmlSAXUserParseFile (xmlSAXHandlerPtr sax, void* user_data, const(char)* filename);
int xmlSAXUserParseMemory (xmlSAXHandlerPtr sax, void* user_data, const(char)* buffer, int size);
xmlDocPtr xmlSAXParseDoc (xmlSAXHandlerPtr sax, const(char)* cur, int recovery);
xmlDocPtr xmlSAXParseMemory (xmlSAXHandlerPtr sax, const(char)* buffer, int size, int recovery);
xmlDocPtr xmlSAXParseMemoryWithData (xmlSAXHandlerPtr sax, const(char)* buffer, int size, int recovery, void* data);
xmlDocPtr xmlSAXParseFile (xmlSAXHandlerPtr sax, const(char)* filename, int recovery);
xmlDocPtr xmlSAXParseFileWithData (xmlSAXHandlerPtr sax, const(char)* filename, int recovery, void* data);
xmlDocPtr xmlSAXParseEntity (xmlSAXHandlerPtr sax, const(char)* filename);
xmlDocPtr xmlParseEntity (const(char)* filename);
xmlDtdPtr xmlSAXParseDTD (xmlSAXHandlerPtr sax, const(char)* ExternalID, const(char)* SystemID);
xmlDtdPtr xmlParseDTD (const(char)* ExternalID, const(char)* SystemID);
xmlDtdPtr xmlIOParseDTD (xmlSAXHandlerPtr sax, xmlParserInputBufferPtr input, xmlCharEncoding enc);
int xmlParseBalancedChunkMemory (xmlDocPtr doc, xmlSAXHandlerPtr sax, void* user_data, int depth, const(char)* string, xmlNodePtr* lst);
xmlParserErrors xmlParseInNodeContext (xmlNodePtr node, const(char)* data, int datalen, int options, xmlNodePtr* lst);
int xmlParseBalancedChunkMemoryRecover (xmlDocPtr doc, xmlSAXHandlerPtr sax, void* user_data, int depth, const(char)* string, xmlNodePtr* lst, int recover);
int xmlParseExternalEntity (xmlDocPtr doc, xmlSAXHandlerPtr sax, void* user_data, int depth, const(char)* URL, const(char)* ID, xmlNodePtr* lst);
int xmlParseCtxtExternalEntity (xmlParserCtxtPtr ctx, const(char)* URL, const(char)* ID, xmlNodePtr* lst);
xmlParserCtxtPtr xmlNewParserCtxt ();
int xmlInitParserCtxt (xmlParserCtxtPtr ctxt);
void xmlClearParserCtxt (xmlParserCtxtPtr ctxt);
void xmlFreeParserCtxt (xmlParserCtxtPtr ctxt);
void xmlSetupParserForBuffer (xmlParserCtxtPtr ctxt, const(char)* buffer, const(char)* filename);
xmlParserCtxtPtr xmlCreateDocParserCtxt (const(char)* cur);
int xmlGetFeaturesList (int* len, const(char*)* result);
int xmlGetFeature (xmlParserCtxtPtr ctxt, const(char)* name, void* result);
int xmlSetFeature (xmlParserCtxtPtr ctxt, const(char)* name, void* value);
xmlParserCtxtPtr xmlCreatePushParserCtxt (xmlSAXHandlerPtr sax, void* user_data, const(char)* chunk, int size, const(char)* filename);
int xmlParseChunk (xmlParserCtxtPtr ctxt, const(char)* chunk, int size, int terminate);
xmlParserCtxtPtr xmlCreateIOParserCtxt (xmlSAXHandlerPtr sax, void* user_data, xmlInputReadCallback ioread, xmlInputCloseCallback ioclose, void* ioctx, xmlCharEncoding enc);
xmlParserInputPtr xmlNewIOInputStream (xmlParserCtxtPtr ctxt, xmlParserInputBufferPtr input, xmlCharEncoding enc);
const(xmlParserNodeInfo)* xmlParserFindNodeInfo (const xmlParserCtxtPtr ctxt, const xmlNodePtr node);
void xmlInitNodeInfoSeq (xmlParserNodeInfoSeqPtr seq);
void xmlClearNodeInfoSeq (xmlParserNodeInfoSeqPtr seq);
c_ulong xmlParserFindNodeInfoIndex (const xmlParserNodeInfoSeqPtr seq, const xmlNodePtr node);
void xmlParserAddNodeInfo (xmlParserCtxtPtr ctxt, const xmlParserNodeInfoPtr info);
void xmlSetExternalEntityLoader (xmlExternalEntityLoader f);
xmlExternalEntityLoader xmlGetExternalEntityLoader ();
xmlParserInputPtr xmlLoadExternalEntity (const(char)* URL, const(char)* ID, xmlParserCtxtPtr ctxt);
c_long xmlByteConsumed (xmlParserCtxtPtr ctxt);
void xmlCtxtReset (xmlParserCtxtPtr ctxt);
int xmlCtxtResetPush (xmlParserCtxtPtr ctxt, const(char)* chunk, int size, const(char)* filename, const(char)* encoding);
int xmlCtxtUseOptions (xmlParserCtxtPtr ctxt, int options);
xmlDocPtr xmlReadDoc (const(char)* cur, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlReadFile (const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlReadMemory (const(char)* buffer, int size, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlReadFd (int fd, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlReadIO (xmlInputReadCallback ioread, xmlInputCloseCallback ioclose, void* ioctx, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlCtxtReadDoc (xmlParserCtxtPtr ctxt, const(char)* cur, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlCtxtReadFile (xmlParserCtxtPtr ctxt, const(char)* filename, const(char)* encoding, int options);
xmlDocPtr xmlCtxtReadMemory (xmlParserCtxtPtr ctxt, const(char)* buffer, int size, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlCtxtReadFd (xmlParserCtxtPtr ctxt, int fd, const(char)* URL, const(char)* encoding, int options);
xmlDocPtr xmlCtxtReadIO (xmlParserCtxtPtr ctxt, xmlInputReadCallback ioread, xmlInputCloseCallback ioclose, void* ioctx, const(char)* URL, const(char)* encoding, int options);
int xmlHasFeature (xmlFeature feature);