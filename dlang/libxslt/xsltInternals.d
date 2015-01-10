import libxml2.dict;
import libxml2.tree;
import libxml2.globals;
import libxml2.xmlmemory;
import libxml2.xpath;
import libxml2.hash;
import libxslt.xsltlocale;
import libxslt.numbersInternals;
import libxml2.xmlerror;
import core.stdc.string;
import core.stdc.locale;
import core.stdc.string;
import core.stdc.config;

extern (C):

alias _xsltRuntimeExtra xsltRuntimeExtra;
alias _xsltRuntimeExtra* xsltRuntimeExtraPtr;
alias _xsltTemplate xsltTemplate;
alias _xsltTemplate* xsltTemplatePtr;
alias _xsltDecimalFormat xsltDecimalFormat;
alias _xsltDecimalFormat* xsltDecimalFormatPtr;
alias _xsltDocument xsltDocument;
alias _xsltDocument* xsltDocumentPtr;
alias _xsltKeyDef xsltKeyDef;
alias _xsltKeyDef* xsltKeyDefPtr;
alias _xsltKeyTable xsltKeyTable;
alias _xsltKeyTable* xsltKeyTablePtr;
alias _xsltStylesheet xsltStylesheet;
alias _xsltStylesheet* xsltStylesheetPtr;
alias _xsltTransformContext xsltTransformContext;
alias _xsltTransformContext* xsltTransformContextPtr;
alias _xsltElemPreComp xsltElemPreComp;
alias _xsltElemPreComp* xsltElemPreCompPtr;
alias void function (_xsltTransformContext*, _xmlNode*, _xmlNode*, _xsltElemPreComp*) xsltTransformFunction;
alias void function (_xsltTransformContext*, _xmlNode**, int) xsltSortFunc;
alias _Anonymous_0 xsltStyleType;
alias void function (_xsltElemPreComp*) xsltElemPreCompDeallocator;
alias _xsltStylePreComp xsltStylePreComp;
alias _xsltStylePreComp* xsltStylePreCompPtr;
alias _xsltStackElem xsltStackElem;
alias _xsltStackElem* xsltStackElemPtr;
alias _xsltTransformCache xsltTransformCache;
alias _xsltTransformCache* xsltTransformCachePtr;
alias _Anonymous_1 xsltOutputType;
alias _Anonymous_2 xsltTransformState;

enum _Anonymous_0
{
	XSLT_FUNC_COPY = 1,
	XSLT_FUNC_SORT = 2,
	XSLT_FUNC_TEXT = 3,
	XSLT_FUNC_ELEMENT = 4,
	XSLT_FUNC_ATTRIBUTE = 5,
	XSLT_FUNC_COMMENT = 6,
	XSLT_FUNC_PI = 7,
	XSLT_FUNC_COPYOF = 8,
	XSLT_FUNC_VALUEOF = 9,
	XSLT_FUNC_NUMBER = 10,
	XSLT_FUNC_APPLYIMPORTS = 11,
	XSLT_FUNC_CALLTEMPLATE = 12,
	XSLT_FUNC_APPLYTEMPLATES = 13,
	XSLT_FUNC_CHOOSE = 14,
	XSLT_FUNC_IF = 15,
	XSLT_FUNC_FOREACH = 16,
	XSLT_FUNC_DOCUMENT = 17,
	XSLT_FUNC_WITHPARAM = 18,
	XSLT_FUNC_PARAM = 19,
	XSLT_FUNC_VARIABLE = 20,
	XSLT_FUNC_WHEN = 21,
	XSLT_FUNC_EXTENSION = 22
}

enum _Anonymous_1
{
	XSLT_OUTPUT_XML = 0,
	XSLT_OUTPUT_HTML = 1,
	XSLT_OUTPUT_TEXT = 2
}

enum _Anonymous_2
{
	XSLT_STATE_OK = 0,
	XSLT_STATE_ERROR = 1,
	XSLT_STATE_STOPPED = 2
}

struct _xsltRuntimeExtra
{
	void* info;
	xmlFreeFunc deallocate;
	union
	{
		void* ptr;
		int ival;
	}
}

struct _xsltTemplate
{
	_xsltTemplate* next;
	_xsltStylesheet* style;
	char* match;
	float priority;
	const(char)* name;
	const(char)* nameURI;
	const(char)* mode;
	const(char)* modeURI;
	xmlNodePtr content;
	xmlNodePtr elem;
	int inheritedNsNr;
	xmlNsPtr* inheritedNs;
	int nbCalls;
	c_ulong time;
	void* params;
	int templNr;
	int templMax;
	xsltTemplatePtr* templCalledTab;
	int* templCountTab;
}

struct _xsltDecimalFormat
{
	_xsltDecimalFormat* next;
	char* name;
	char* digit;
	char* patternSeparator;
	char* minusSign;
	char* infinity;
	char* noNumber;
	char* decimalPoint;
	char* grouping;
	char* percent;
	char* permille;
	char* zeroDigit;
}

struct _xsltDocument
{
	_xsltDocument* next;
	int main;
	xmlDocPtr doc;
	void* keys;
	_xsltDocument* includes;
	int preproc;
	int nbKeysComputed;
}

struct _xsltKeyDef
{
	_xsltKeyDef* next;
	xmlNodePtr inst;
	char* name;
	char* nameURI;
	char* match;
	char* use;
	xmlXPathCompExprPtr comp;
	xmlXPathCompExprPtr usecomp;
	xmlNsPtr* nsList;
	int nsNr;
}

struct _xsltKeyTable
{
	_xsltKeyTable* next;
	char* name;
	char* nameURI;
	xmlHashTablePtr keys;
}

struct _xsltElemPreComp
{
	xsltElemPreCompPtr next;
	xsltStyleType type;
	xsltTransformFunction func;
	xmlNodePtr inst;
	xsltElemPreCompDeallocator free;
}

struct _xsltStylePreComp
{
	xsltElemPreCompPtr next;
	xsltStyleType type;
	xsltTransformFunction func;
	xmlNodePtr inst;
	const(char)* stype;
	int has_stype;
	int number;
	const(char)* order;
	int has_order;
	int descending;
	const(char)* lang;
	int has_lang;
	xsltLocale locale;
	const(char)* case_order;
	int lower_first;
	const(char)* use;
	int has_use;
	int noescape;
	const(char)* name;
	int has_name;
	const(char)* ns;
	int has_ns;
	const(char)* mode;
	const(char)* modeURI;
	const(char)* test;
	xsltTemplatePtr templ;
	const(char)* select;
	int ver11;
	const(char)* filename;
	int has_filename;
	xsltNumberData numdata;
	xmlXPathCompExprPtr comp;
	xmlNsPtr* nsList;
	int nsNr;
}

struct _xsltStackElem
{
	_xsltStackElem* next;
	xsltStylePreCompPtr comp;
	int computed;
	const(char)* name;
	const(char)* nameURI;
	const(char)* select;
	xmlNodePtr tree;
	xmlXPathObjectPtr value;
	xmlDocPtr fragment;
	int level;
	xsltTransformContextPtr context;
	int flags;
}

struct _xsltStylesheet
{
	_xsltStylesheet* parent;
	_xsltStylesheet* next;
	_xsltStylesheet* imports;
	xsltDocumentPtr docList;
	xmlDocPtr doc;
	xmlHashTablePtr stripSpaces;
	int stripAll;
	xmlHashTablePtr cdataSection;
	xsltStackElemPtr variables;
	xsltTemplatePtr templates;
	void* templatesHash;
	void* rootMatch;
	void* keyMatch;
	void* elemMatch;
	void* attrMatch;
	void* parentMatch;
	void* textMatch;
	void* piMatch;
	void* commentMatch;
	xmlHashTablePtr nsAliases;
	xmlHashTablePtr attributeSets;
	xmlHashTablePtr nsHash;
	void* nsDefs;
	void* keys;
	char* method;
	char* methodURI;
	char* version_;
	char* encoding;
	int omitXmlDeclaration;
	xsltDecimalFormatPtr decimalFormat;
	int standalone;
	char* doctypePublic;
	char* doctypeSystem;
	int indent;
	char* mediaType;
	xsltElemPreCompPtr preComps;
	int warnings;
	int errors;
	char* exclPrefix;
	char** exclPrefixTab;
	int exclPrefixNr;
	int exclPrefixMax;
	void* _private;
	xmlHashTablePtr extInfos;
	int extrasNr;
	xsltDocumentPtr includes;
	xmlDictPtr dict;
	void* attVTs;
	const(char)* defaultAlias;
	int nopreproc;
	int internalized;
	int literal_result;
	xsltStylesheetPtr principal;
	int forwards_compatible;
}

struct _xsltTransformCache
{
	xmlDocPtr RVT;
	int nbRVT;
	xsltStackElemPtr stackItems;
	int nbStackItems;
}

struct _xsltTransformContext
{
	xsltStylesheetPtr style;
	xsltOutputType type;
	xsltTemplatePtr templ;
	int templNr;
	int templMax;
	xsltTemplatePtr* templTab;
	xsltStackElemPtr vars;
	int varsNr;
	int varsMax;
	xsltStackElemPtr* varsTab;
	int varsBase;
	xmlHashTablePtr extFunctions;
	xmlHashTablePtr extElements;
	xmlHashTablePtr extInfos;
	const(char)* mode;
	const(char)* modeURI;
	xsltDocumentPtr docList;
	xsltDocumentPtr document;
	xmlNodePtr node;
	xmlNodeSetPtr nodeList;
	xmlDocPtr output;
	xmlNodePtr insert;
	xmlXPathContextPtr xpathCtxt;
	xsltTransformState state;
	xmlHashTablePtr globalVars;
	xmlNodePtr inst;
	int xinclude;
	const(char)* outputFile;
	int profile;
	c_long prof;
	int profNr;
	int profMax;
	c_long* profTab;
	void* _private;
	int extrasNr;
	int extrasMax;
	xsltRuntimeExtraPtr extras;
	xsltDocumentPtr styleList;
	void* sec;
	xmlGenericErrorFunc error;
	void* errctx;
	xsltSortFunc sortfunc;
	xmlDocPtr tmpRVT;
	xmlDocPtr persistRVT;
	int ctxtflags;
	const(char)* lasttext;
	uint lasttsize;
	uint lasttuse;
	int debugStatus;
	c_ulong* traceCode;
	int parserOptions;
	xmlDictPtr dict;
	xmlDocPtr tmpDoc;
	int internalized;
	int nbKeys;
	int hasTemplKeyPatterns;
	xsltTemplatePtr currentTemplateRule;
	xmlNodePtr initialContextNode;
	xmlDocPtr initialContextDoc;
	xsltTransformCachePtr cache;
	void* contextVariable;
	xmlDocPtr localRVT;
	xmlDocPtr localRVTBase;
	int keyInitLevel;
	int funcLevel;
	int maxTemplateDepth;
	int maxTemplateVars;
}

xsltStylesheetPtr xsltNewStylesheet ();
xsltStylesheetPtr xsltParseStylesheetFile (const(char)* filename);
void xsltFreeStylesheet (xsltStylesheetPtr style);
int xsltIsBlank (char* str);
void xsltFreeStackElemList (xsltStackElemPtr elem);
xsltDecimalFormatPtr xsltDecimalFormatGetByName (xsltStylesheetPtr style, char* name);
xsltStylesheetPtr xsltParseStylesheetProcess (xsltStylesheetPtr ret, xmlDocPtr doc);
void xsltParseStylesheetOutput (xsltStylesheetPtr style, xmlNodePtr cur);
xsltStylesheetPtr xsltParseStylesheetDoc (xmlDocPtr doc);
xsltStylesheetPtr xsltParseStylesheetImportedDoc (xmlDocPtr doc, xsltStylesheetPtr style);
xsltStylesheetPtr xsltLoadStylesheetPI (xmlDocPtr doc);
void xsltNumberFormat (xsltTransformContextPtr ctxt, xsltNumberDataPtr data, xmlNodePtr node);
xmlXPathError xsltFormatNumberConversion (xsltDecimalFormatPtr self, char* format, double number, char** result);
void xsltParseTemplateContent (xsltStylesheetPtr style, xmlNodePtr templ);
int xsltAllocateExtra (xsltStylesheetPtr style);
int xsltAllocateExtraCtxt (xsltTransformContextPtr ctxt);
xmlDocPtr xsltCreateRVT (xsltTransformContextPtr ctxt);
int xsltRegisterTmpRVT (xsltTransformContextPtr ctxt, xmlDocPtr RVT);
int xsltRegisterLocalRVT (xsltTransformContextPtr ctxt, xmlDocPtr RVT);
int xsltRegisterPersistRVT (xsltTransformContextPtr ctxt, xmlDocPtr RVT);
int xsltExtensionInstructionResultRegister (xsltTransformContextPtr ctxt, xmlXPathObjectPtr obj);
int xsltExtensionInstructionResultFinalize (xsltTransformContextPtr ctxt);
void xsltFreeRVTs (xsltTransformContextPtr ctxt);
void xsltReleaseRVT (xsltTransformContextPtr ctxt, xmlDocPtr RVT);
void xsltCompileAttr (xsltStylesheetPtr style, xmlAttrPtr attr);
char* xsltEvalAVT (xsltTransformContextPtr ctxt, void* avt, xmlNodePtr node);
void xsltFreeAVTList (void* avt);
void xsltUninit ();
int xsltInitCtxtKey (xsltTransformContextPtr ctxt, xsltDocumentPtr doc, xsltKeyDefPtr keyd);
int xsltInitAllDocKeys (xsltTransformContextPtr ctxt);