import libxml2.tree;
alias iconv_t = void*;
extern (C):

alias _Anonymous_0 xmlCharEncoding;
alias int function (ubyte*, int*, const(ubyte)*, int*) xmlCharEncodingInputFunc;
alias int function (ubyte*, int*, const(ubyte)*, int*) xmlCharEncodingOutputFunc;
alias _xmlCharEncodingHandler xmlCharEncodingHandler;
alias _xmlCharEncodingHandler* xmlCharEncodingHandlerPtr;

enum _Anonymous_0
{
	XML_CHAR_ENCODING_ERROR = -1,
	XML_CHAR_ENCODING_NONE = 0,
	XML_CHAR_ENCODING_UTF8 = 1,
	XML_CHAR_ENCODING_UTF16LE = 2,
	XML_CHAR_ENCODING_UTF16BE = 3,
	XML_CHAR_ENCODING_UCS4LE = 4,
	XML_CHAR_ENCODING_UCS4BE = 5,
	XML_CHAR_ENCODING_EBCDIC = 6,
	XML_CHAR_ENCODING_UCS4_2143 = 7,
	XML_CHAR_ENCODING_UCS4_3412 = 8,
	XML_CHAR_ENCODING_UCS2 = 9,
	XML_CHAR_ENCODING_8859_1 = 10,
	XML_CHAR_ENCODING_8859_2 = 11,
	XML_CHAR_ENCODING_8859_3 = 12,
	XML_CHAR_ENCODING_8859_4 = 13,
	XML_CHAR_ENCODING_8859_5 = 14,
	XML_CHAR_ENCODING_8859_6 = 15,
	XML_CHAR_ENCODING_8859_7 = 16,
	XML_CHAR_ENCODING_8859_8 = 17,
	XML_CHAR_ENCODING_8859_9 = 18,
	XML_CHAR_ENCODING_2022_JP = 19,
	XML_CHAR_ENCODING_SHIFT_JIS = 20,
	XML_CHAR_ENCODING_EUC_JP = 21,
	XML_CHAR_ENCODING_ASCII = 22
}

struct _xmlCharEncodingHandler
{
	char* name;
	xmlCharEncodingInputFunc input;
	xmlCharEncodingOutputFunc output;
	iconv_t iconv_in;
	iconv_t iconv_out;
}

void xmlInitCharEncodingHandlers ();
void xmlCleanupCharEncodingHandlers ();
void xmlRegisterCharEncodingHandler (xmlCharEncodingHandlerPtr handler);
xmlCharEncodingHandlerPtr xmlGetCharEncodingHandler (xmlCharEncoding enc);
xmlCharEncodingHandlerPtr xmlFindCharEncodingHandler (const(char)* name);
xmlCharEncodingHandlerPtr xmlNewCharEncodingHandler (const(char)* name, xmlCharEncodingInputFunc input, xmlCharEncodingOutputFunc output);
int xmlAddEncodingAlias (const(char)* name, const(char)* alias_);
int xmlDelEncodingAlias (const(char)* alias_);
const(char)* xmlGetEncodingAlias (const(char)* alias_);
void xmlCleanupEncodingAliases ();
xmlCharEncoding xmlParseCharEncoding (const(char)* name);
const(char)* xmlGetCharEncodingName (xmlCharEncoding enc);
xmlCharEncoding xmlDetectCharEncoding (const(ubyte)* in_, int len);
int xmlCharEncOutFunc (xmlCharEncodingHandler* handler, xmlBufferPtr out_, xmlBufferPtr in_);
int xmlCharEncInFunc (xmlCharEncodingHandler* handler, xmlBufferPtr out_, xmlBufferPtr in_);
int xmlCharEncFirstLine (xmlCharEncodingHandler* handler, xmlBufferPtr out_, xmlBufferPtr in_);
int xmlCharEncCloseFunc (xmlCharEncodingHandler* handler);
int UTF8Toisolat1 (ubyte* out_, int* outlen, const(ubyte)* in_, int* inlen);
int isolat1ToUTF8 (ubyte* out_, int* outlen, const(ubyte)* in_, int* inlen);