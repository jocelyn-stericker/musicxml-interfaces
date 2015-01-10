import libxml2.encoding;
import libxml2.tree;
import core.stdc.stdio;
import core.stdc.string;
import core.stdc.config;

extern (C):

alias int function (const(char)*) xmlInputMatchCallback;
alias void* function (const(char)*) xmlInputOpenCallback;
alias int function (void*, char*, int) xmlInputReadCallback;
alias int function (void*) xmlInputCloseCallback;
alias int function (const(char)*) xmlOutputMatchCallback;
alias void* function (const(char)*) xmlOutputOpenCallback;
alias int function (void*, const(char)*, int) xmlOutputWriteCallback;
alias int function (void*) xmlOutputCloseCallback;

struct _xmlParserInputBuffer
{
	void* context;
	xmlInputReadCallback readcallback;
	xmlInputCloseCallback closecallback;
	xmlCharEncodingHandlerPtr encoder;
	xmlBufPtr buffer;
	xmlBufPtr raw;
	int compressed;
	int error;
	c_ulong rawconsumed;
}

struct _xmlOutputBuffer
{
	void* context;
	xmlOutputWriteCallback writecallback;
	xmlOutputCloseCallback closecallback;
	xmlCharEncodingHandlerPtr encoder;
	xmlBufPtr buffer;
	xmlBufPtr conv;
	int written;
	int error;
}

void xmlCleanupInputCallbacks ();
int xmlPopInputCallbacks ();
void xmlRegisterDefaultInputCallbacks ();
xmlParserInputBufferPtr xmlAllocParserInputBuffer (xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateFilename (const(char)* URI, xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateFile (FILE* file, xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateFd (int fd, xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateMem (const(char)* mem, int size, xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateStatic (const(char)* mem, int size, xmlCharEncoding enc);
xmlParserInputBufferPtr xmlParserInputBufferCreateIO (xmlInputReadCallback ioread, xmlInputCloseCallback ioclose, void* ioctx, xmlCharEncoding enc);
int xmlParserInputBufferRead (xmlParserInputBufferPtr in_, int len);
int xmlParserInputBufferGrow (xmlParserInputBufferPtr in_, int len);
int xmlParserInputBufferPush (xmlParserInputBufferPtr in_, int len, const(char)* buf);
void xmlFreeParserInputBuffer (xmlParserInputBufferPtr in_);
char* xmlParserGetDirectory (const(char)* filename);
int xmlRegisterInputCallbacks (xmlInputMatchCallback matchFunc, xmlInputOpenCallback openFunc, xmlInputReadCallback readFunc, xmlInputCloseCallback closeFunc);
xmlParserInputBufferPtr __xmlParserInputBufferCreateFilename (const(char)* URI, xmlCharEncoding enc);
void xmlCleanupOutputCallbacks ();
void xmlRegisterDefaultOutputCallbacks ();
xmlOutputBufferPtr xmlAllocOutputBuffer (xmlCharEncodingHandlerPtr encoder);
xmlOutputBufferPtr xmlOutputBufferCreateFilename (const(char)* URI, xmlCharEncodingHandlerPtr encoder, int compression);
xmlOutputBufferPtr xmlOutputBufferCreateFile (FILE* file, xmlCharEncodingHandlerPtr encoder);
xmlOutputBufferPtr xmlOutputBufferCreateBuffer (xmlBufferPtr buffer, xmlCharEncodingHandlerPtr encoder);
xmlOutputBufferPtr xmlOutputBufferCreateFd (int fd, xmlCharEncodingHandlerPtr encoder);
xmlOutputBufferPtr xmlOutputBufferCreateIO (xmlOutputWriteCallback iowrite, xmlOutputCloseCallback ioclose, void* ioctx, xmlCharEncodingHandlerPtr encoder);
const(char)* xmlOutputBufferGetContent (xmlOutputBufferPtr out_);
size_t xmlOutputBufferGetSize (xmlOutputBufferPtr out_);
int xmlOutputBufferWrite (xmlOutputBufferPtr out_, int len, const(char)* buf);
int xmlOutputBufferWriteString (xmlOutputBufferPtr out_, const(char)* str);
int xmlOutputBufferWriteEscape (xmlOutputBufferPtr out_, const(char)* str, xmlCharEncodingOutputFunc escaping);
int xmlOutputBufferFlush (xmlOutputBufferPtr out_);
int xmlOutputBufferClose (xmlOutputBufferPtr out_);
int xmlRegisterOutputCallbacks (xmlOutputMatchCallback matchFunc, xmlOutputOpenCallback openFunc, xmlOutputWriteCallback writeFunc, xmlOutputCloseCallback closeFunc);
xmlOutputBufferPtr __xmlOutputBufferCreateFilename (const(char)* URI, xmlCharEncodingHandlerPtr encoder, int compression);
void xmlRegisterHTTPPostCallbacks ();
xmlParserInputPtr xmlCheckHTTPInput (xmlParserCtxtPtr ctxt, xmlParserInputPtr ret);
xmlParserInputPtr xmlNoNetExternalEntityLoader (const(char)* URL, const(char)* ID, xmlParserCtxtPtr ctxt);
char* xmlNormalizeWindowsPath (const(char)* path);
int xmlCheckFilename (const(char)* path);
int xmlFileMatch (const(char)* filename);
void* xmlFileOpen (const(char)* filename);
int xmlFileRead (void* context, char* buffer, int len);
int xmlFileClose (void* context);
int xmlIOHTTPMatch (const(char)* filename);
void* xmlIOHTTPOpen (const(char)* filename);
void* xmlIOHTTPOpenW (const(char)* post_uri, int compression);
int xmlIOHTTPRead (void* context, char* buffer, int len);
int xmlIOHTTPClose (void* context);
int xmlIOFTPMatch (const(char)* filename);
void* xmlIOFTPOpen (const(char)* filename);
int xmlIOFTPRead (void* context, char* buffer, int len);
int xmlIOFTPClose (void* context);