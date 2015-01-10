import libxml2.tree;
import libxml2.xmlautomata;
import libxml2.list;
import libxml2.hash;
import libxml2.dict;
import libxml2.xmlerror;
import core.stdc.string;
import core.stdc.config;

extern (C):

alias _xmlXPathContext xmlXPathContext;
alias _xmlXPathContext* xmlXPathContextPtr;
alias _xmlXPathParserContext xmlXPathParserContext;
alias _xmlXPathParserContext* xmlXPathParserContextPtr;
alias _Anonymous_0 xmlXPathError;
alias _xmlNodeSet xmlNodeSet;
alias _xmlNodeSet* xmlNodeSetPtr;
alias _Anonymous_1 xmlXPathObjectType;
alias _xmlXPathObject xmlXPathObject;
alias _xmlXPathObject* xmlXPathObjectPtr;
alias int function (_xmlXPathObject*, int) xmlXPathConvertFunc;
alias _xmlXPathType xmlXPathType;
alias _xmlXPathType* xmlXPathTypePtr;
alias _xmlXPathVariable xmlXPathVariable;
alias _xmlXPathVariable* xmlXPathVariablePtr;
alias void function (_xmlXPathParserContext*, int) xmlXPathEvalFunc;
alias _xmlXPathFunct xmlXPathFunct;
alias _xmlXPathFunct* xmlXPathFuncPtr;
alias _xmlXPathObject* function (_xmlXPathParserContext*, _xmlXPathObject*) xmlXPathAxisFunc;
alias _xmlXPathAxis xmlXPathAxis;
alias _xmlXPathAxis* xmlXPathAxisPtr;
alias void function (_xmlXPathParserContext*, int) xmlXPathFunction;
alias _xmlXPathObject* function (void*, const(ubyte)*, const(ubyte)*) xmlXPathVariableLookupFunc;
alias void function (_xmlXPathParserContext*, int) function (void*, const(ubyte)*, const(ubyte)*) xmlXPathFuncLookupFunc;
alias _xmlXPathCompExpr xmlXPathCompExpr;
alias _xmlXPathCompExpr* xmlXPathCompExprPtr;

extern __gshared double xmlXPathNAN;
extern __gshared double xmlXPathPINF;
extern __gshared double xmlXPathNINF;

enum _Anonymous_0
{
	XPATH_EXPRESSION_OK = 0,
	XPATH_NUMBER_ERROR = 1,
	XPATH_UNFINISHED_LITERAL_ERROR = 2,
	XPATH_START_LITERAL_ERROR = 3,
	XPATH_VARIABLE_REF_ERROR = 4,
	XPATH_UNDEF_VARIABLE_ERROR = 5,
	XPATH_INVALID_PREDICATE_ERROR = 6,
	XPATH_EXPR_ERROR = 7,
	XPATH_UNCLOSED_ERROR = 8,
	XPATH_UNKNOWN_FUNC_ERROR = 9,
	XPATH_INVALID_OPERAND = 10,
	XPATH_INVALID_TYPE = 11,
	XPATH_INVALID_ARITY = 12,
	XPATH_INVALID_CTXT_SIZE = 13,
	XPATH_INVALID_CTXT_POSITION = 14,
	XPATH_MEMORY_ERROR = 15,
	XPTR_SYNTAX_ERROR = 16,
	XPTR_RESOURCE_ERROR = 17,
	XPTR_SUB_RESOURCE_ERROR = 18,
	XPATH_UNDEF_PREFIX_ERROR = 19,
	XPATH_ENCODING_ERROR = 20,
	XPATH_INVALID_CHAR_ERROR = 21,
	XPATH_INVALID_CTXT = 22,
	XPATH_STACK_ERROR = 23,
	XPATH_FORBID_VARIABLE_ERROR = 24
}

enum _Anonymous_1
{
	XPATH_UNDEFINED = 0,
	XPATH_NODESET = 1,
	XPATH_BOOLEAN = 2,
	XPATH_NUMBER = 3,
	XPATH_STRING = 4,
	XPATH_POINT = 5,
	XPATH_RANGE = 6,
	XPATH_LOCATIONSET = 7,
	XPATH_USERS = 8,
	XPATH_XSLT_TREE = 9
}

struct _xmlNodeSet
{
	int nodeNr;
	int nodeMax;
	xmlNodePtr* nodeTab;
}

struct _xmlXPathObject
{
	xmlXPathObjectType type;
	xmlNodeSetPtr nodesetval;
	int boolval;
	double floatval;
	char* stringval;
	void* user;
	int index;
	void* user2;
	int index2;
}

struct _xmlXPathType
{
	const(char)* name;
	xmlXPathConvertFunc func;
}

struct _xmlXPathVariable
{
	const(char)* name;
	xmlXPathObjectPtr value;
}

struct _xmlXPathFunct
{
	const(char)* name;
	xmlXPathEvalFunc func;
}

struct _xmlXPathAxis
{
	const(char)* name;
	xmlXPathAxisFunc func;
}

struct _xmlXPathContext
{
	xmlDocPtr doc;
	xmlNodePtr node;
	int nb_variables_unused;
	int max_variables_unused;
	xmlHashTablePtr varHash;
	int nb_types;
	int max_types;
	xmlXPathTypePtr types;
	int nb_funcs_unused;
	int max_funcs_unused;
	xmlHashTablePtr funcHash;
	int nb_axis;
	int max_axis;
	xmlXPathAxisPtr axis;
	xmlNsPtr* namespaces;
	int nsNr;
	void* user;
	int contextSize;
	int proximityPosition;
	int xptr;
	xmlNodePtr here;
	xmlNodePtr origin;
	xmlHashTablePtr nsHash;
	xmlXPathVariableLookupFunc varLookupFunc;
	void* varLookupData;
	void* extra;
	const(char)* function_;
	const(char)* functionURI;
	xmlXPathFuncLookupFunc funcLookupFunc;
	void* funcLookupData;
	xmlNsPtr* tmpNsList;
	int tmpNsNr;
	void* userData;
	xmlStructuredErrorFunc error;
	xmlError lastError;
	xmlNodePtr debugNode;
	xmlDictPtr dict;
	int flags;
	void* cache;
}

struct _xmlXPathParserContext
{
	const(char)* cur;
	const(char)* base;
	int error;
	xmlXPathContextPtr context;
	xmlXPathObjectPtr value;
	int valueNr;
	int valueMax;
	xmlXPathObjectPtr* valueTab;
	xmlXPathCompExprPtr comp;
	int xptr;
	xmlNodePtr ancestor;
	int valueFrame;
}

struct _xmlXPathCompExpr;


void xmlXPathFreeObject (xmlXPathObjectPtr obj);
xmlNodeSetPtr xmlXPathNodeSetCreate (xmlNodePtr val);
void xmlXPathFreeNodeSetList (xmlXPathObjectPtr obj);
void xmlXPathFreeNodeSet (xmlNodeSetPtr obj);
xmlXPathObjectPtr xmlXPathObjectCopy (xmlXPathObjectPtr val);
int xmlXPathCmpNodes (xmlNodePtr node1, xmlNodePtr node2);
int xmlXPathCastNumberToBoolean (double val);
int xmlXPathCastStringToBoolean (const(char)* val);
int xmlXPathCastNodeSetToBoolean (xmlNodeSetPtr ns);
int xmlXPathCastToBoolean (xmlXPathObjectPtr val);
double xmlXPathCastBooleanToNumber (int val);
double xmlXPathCastStringToNumber (const(char)* val);
double xmlXPathCastNodeToNumber (xmlNodePtr node);
double xmlXPathCastNodeSetToNumber (xmlNodeSetPtr ns);
double xmlXPathCastToNumber (xmlXPathObjectPtr val);
char* xmlXPathCastBooleanToString (int val);
char* xmlXPathCastNumberToString (double val);
char* xmlXPathCastNodeToString (xmlNodePtr node);
char* xmlXPathCastNodeSetToString (xmlNodeSetPtr ns);
char* xmlXPathCastToString (xmlXPathObjectPtr val);
xmlXPathObjectPtr xmlXPathConvertBoolean (xmlXPathObjectPtr val);
xmlXPathObjectPtr xmlXPathConvertNumber (xmlXPathObjectPtr val);
xmlXPathObjectPtr xmlXPathConvertString (xmlXPathObjectPtr val);
xmlXPathContextPtr xmlXPathNewContext (xmlDocPtr doc);
void xmlXPathFreeContext (xmlXPathContextPtr ctxt);
int xmlXPathContextSetCache (xmlXPathContextPtr ctxt, int active, int value, int options);
c_long xmlXPathOrderDocElems (xmlDocPtr doc);
int xmlXPathSetContextNode (xmlNodePtr node, xmlXPathContextPtr ctx);
xmlXPathObjectPtr xmlXPathNodeEval (xmlNodePtr node, const(char)* str, xmlXPathContextPtr ctx);
xmlXPathObjectPtr xmlXPathEval (const(char)* str, xmlXPathContextPtr ctx);
xmlXPathObjectPtr xmlXPathEvalExpression (const(char)* str, xmlXPathContextPtr ctxt);
int xmlXPathEvalPredicate (xmlXPathContextPtr ctxt, xmlXPathObjectPtr res);
xmlXPathCompExprPtr xmlXPathCompile (const(char)* str);
xmlXPathCompExprPtr xmlXPathCtxtCompile (xmlXPathContextPtr ctxt, const(char)* str);
xmlXPathObjectPtr xmlXPathCompiledEval (xmlXPathCompExprPtr comp, xmlXPathContextPtr ctx);
int xmlXPathCompiledEvalToBoolean (xmlXPathCompExprPtr comp, xmlXPathContextPtr ctxt);
void xmlXPathFreeCompExpr (xmlXPathCompExprPtr comp);
void xmlXPathInit ();
int xmlXPathIsNaN (double val);
int xmlXPathIsInf (double val);