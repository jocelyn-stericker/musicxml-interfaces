import libxml2.dict;
import libxml2.tree;
import libxml2.globals;
import libxml2.xmlmemory;
import libxml2.xpath;
import libxml2.hash;
import libxslt.xsltlocale;
import libxslt.xsltInternals;
import libxml2.xmlerror;
import core.stdc.string;
import core.stdc.stdio;
import core.stdc.string;
import core.stdc.stdio;
import core.stdc.config;

extern (C):

alias _Anonymous_0 xsltDebugTraceCodes;
alias _Anonymous_1 xsltDebugStatusCodes;
alias void function (_xmlNode*, _xmlNode*, _xsltTemplate*, _xsltTransformContext*) xsltHandleDebuggerCallback;
alias int function (_xsltTemplate*, _xmlNode*) xsltAddCallCallback;
alias void function () xsltDropCallCallback;

extern __gshared xmlGenericErrorFunc xsltGenericError;
extern __gshared void* xsltGenericErrorContext;
extern __gshared xmlGenericErrorFunc xsltGenericDebug;
extern __gshared void* xsltGenericDebugContext;
extern __gshared int xslDebugStatus;

enum _Anonymous_0
{
	XSLT_TRACE_ALL = -1,
	XSLT_TRACE_NONE = 0,
	XSLT_TRACE_COPY_TEXT = 1,
	XSLT_TRACE_PROCESS_NODE = 2,
	XSLT_TRACE_APPLY_TEMPLATE = 4,
	XSLT_TRACE_COPY = 8,
	XSLT_TRACE_COMMENT = 16,
	XSLT_TRACE_PI = 32,
	XSLT_TRACE_COPY_OF = 64,
	XSLT_TRACE_VALUE_OF = 128,
	XSLT_TRACE_CALL_TEMPLATE = 256,
	XSLT_TRACE_APPLY_TEMPLATES = 512,
	XSLT_TRACE_CHOOSE = 1024,
	XSLT_TRACE_IF = 2048,
	XSLT_TRACE_FOR_EACH = 4096,
	XSLT_TRACE_STRIP_SPACES = 8192,
	XSLT_TRACE_TEMPLATES = 16384,
	XSLT_TRACE_KEYS = 32768,
	XSLT_TRACE_VARIABLES = 65536
}

enum _Anonymous_1
{
	XSLT_DEBUG_NONE = 0,
	XSLT_DEBUG_INIT = 1,
	XSLT_DEBUG_STEP = 2,
	XSLT_DEBUG_STEPOUT = 3,
	XSLT_DEBUG_NEXT = 4,
	XSLT_DEBUG_STOP = 5,
	XSLT_DEBUG_CONT = 6,
	XSLT_DEBUG_RUN = 7,
	XSLT_DEBUG_RUN_RESTART = 8,
	XSLT_DEBUG_QUIT = 9
}

char* xsltGetNsProp (xmlNodePtr node, const(char)* name, const(char)* nameSpace);
const(char)* xsltGetCNsProp (xsltStylesheetPtr style, xmlNodePtr node, const(char)* name, const(char)* nameSpace);
int xsltGetUTF8Char (const(ubyte)* utf, int* len);
void xsltDebugSetDefaultTrace (xsltDebugTraceCodes val);
xsltDebugTraceCodes xsltDebugGetDefaultTrace ();
void xsltPrintErrorContext (xsltTransformContextPtr ctxt, xsltStylesheetPtr style, xmlNodePtr node);
void xsltMessage (xsltTransformContextPtr ctxt, xmlNodePtr node, xmlNodePtr inst);
void xsltSetGenericErrorFunc (void* ctx, xmlGenericErrorFunc handler);
void xsltSetGenericDebugFunc (void* ctx, xmlGenericErrorFunc handler);
void xsltSetTransformErrorFunc (xsltTransformContextPtr ctxt, void* ctx, xmlGenericErrorFunc handler);
void xsltTransformError (xsltTransformContextPtr ctxt, xsltStylesheetPtr style, xmlNodePtr node, const(char)* msg, ...);
int xsltSetCtxtParseOptions (xsltTransformContextPtr ctxt, int options);
void xsltDocumentSortFunction (xmlNodeSetPtr list);
void xsltSetSortFunc (xsltSortFunc handler);
void xsltSetCtxtSortFunc (xsltTransformContextPtr ctxt, xsltSortFunc handler);
void xsltDefaultSortFunction (xsltTransformContextPtr ctxt, xmlNodePtr* sorts, int nbsorts);
void xsltDoSortFunction (xsltTransformContextPtr ctxt, xmlNodePtr* sorts, int nbsorts);
xmlXPathObjectPtr* xsltComputeSortResult (xsltTransformContextPtr ctxt, xmlNodePtr sort);
const(char)* xsltSplitQName (xmlDictPtr dict, const(char)* name, const(char*)* prefix);
const(char)* xsltGetQNameURI (xmlNodePtr node, char** name);
const(char)* xsltGetQNameURI2 (xsltStylesheetPtr style, xmlNodePtr node, const(char*)* name);
int xsltSaveResultTo (xmlOutputBufferPtr buf, xmlDocPtr result, xsltStylesheetPtr style);
int xsltSaveResultToFilename (const(char)* URI, xmlDocPtr result, xsltStylesheetPtr style, int compression);
int xsltSaveResultToFile (FILE* file, xmlDocPtr result, xsltStylesheetPtr style);
int xsltSaveResultToFd (int fd, xmlDocPtr result, xsltStylesheetPtr style);
int xsltSaveResultToString (char** doc_txt_ptr, int* doc_txt_len, xmlDocPtr result, xsltStylesheetPtr style);
xmlXPathCompExprPtr xsltXPathCompile (xsltStylesheetPtr style, const(char)* str);
xmlXPathCompExprPtr xsltXPathCompileFlags (xsltStylesheetPtr style, const(char)* str, int flags);
void xsltSaveProfiling (xsltTransformContextPtr ctxt, FILE* output);
xmlDocPtr xsltGetProfileInformation (xsltTransformContextPtr ctxt);
c_long xsltTimestamp ();
void xsltCalibrateAdjust (c_long delta);
void xsltSetDebuggerStatus (int value);
int xsltGetDebuggerStatus ();
int xsltSetDebuggerCallbacks (int no, void* block);
int xslAddCall (xsltTemplatePtr templ, xmlNodePtr source);
void xslDropCall ();