import libxml2.dict;
import libxml2.tree;

import core.stdc.string;
import core.stdc.stdio;
import core.stdc.string;

extern (C):

alias _xmlRegexp xmlRegexp;
alias _xmlRegexp* xmlRegexpPtr;
alias _xmlRegExecCtxt xmlRegExecCtxt;
alias _xmlRegExecCtxt* xmlRegExecCtxtPtr;
alias void function (_xmlRegExecCtxt*, const(ubyte)*, void*, void*) xmlRegExecCallbacks;
alias _xmlExpCtxt xmlExpCtxt;
alias _xmlExpCtxt* xmlExpCtxtPtr;
alias _xmlExpNode xmlExpNode;
alias _xmlExpNode* xmlExpNodePtr;
alias _Anonymous_0 xmlExpNodeType;

extern __gshared xmlExpNodePtr forbiddenExp;
extern __gshared xmlExpNodePtr emptyExp;

enum _Anonymous_0
{
	XML_EXP_EMPTY = 0,
	XML_EXP_FORBID = 1,
	XML_EXP_ATOM = 2,
	XML_EXP_SEQ = 3,
	XML_EXP_OR = 4,
	XML_EXP_COUNT = 5
}

struct _xmlRegexp;


struct _xmlRegExecCtxt;


struct _xmlExpCtxt;


struct _xmlExpNode;


xmlRegexpPtr xmlRegexpCompile (const(char)* regexp);
void xmlRegFreeRegexp (xmlRegexpPtr regexp);
int xmlRegexpExec (xmlRegexpPtr comp, const(char)* value);
void xmlRegexpPrint (FILE* output, xmlRegexpPtr regexp);
int xmlRegexpIsDeterminist (xmlRegexpPtr comp);
xmlRegExecCtxtPtr xmlRegNewExecCtxt (xmlRegexpPtr comp, xmlRegExecCallbacks callback, void* data);
void xmlRegFreeExecCtxt (xmlRegExecCtxtPtr exec);
int xmlRegExecPushString (xmlRegExecCtxtPtr exec, const(char)* value, void* data);
int xmlRegExecPushString2 (xmlRegExecCtxtPtr exec, const(char)* value, const(char)* value2, void* data);
int xmlRegExecNextValues (xmlRegExecCtxtPtr exec, int* nbval, int* nbneg, char** values, int* terminal);
int xmlRegExecErrInfo (xmlRegExecCtxtPtr exec, const(char*)* string, int* nbval, int* nbneg, char** values, int* terminal);
void xmlExpFreeCtxt (xmlExpCtxtPtr ctxt);
xmlExpCtxtPtr xmlExpNewCtxt (int maxNodes, xmlDictPtr dict);
int xmlExpCtxtNbNodes (xmlExpCtxtPtr ctxt);
int xmlExpCtxtNbCons (xmlExpCtxtPtr ctxt);
void xmlExpFree (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr);
void xmlExpRef (xmlExpNodePtr expr);
xmlExpNodePtr xmlExpParse (xmlExpCtxtPtr ctxt, const(char)* expr);
xmlExpNodePtr xmlExpNewAtom (xmlExpCtxtPtr ctxt, const(char)* name, int len);
xmlExpNodePtr xmlExpNewOr (xmlExpCtxtPtr ctxt, xmlExpNodePtr left, xmlExpNodePtr right);
xmlExpNodePtr xmlExpNewSeq (xmlExpCtxtPtr ctxt, xmlExpNodePtr left, xmlExpNodePtr right);
xmlExpNodePtr xmlExpNewRange (xmlExpCtxtPtr ctxt, xmlExpNodePtr subset, int min, int max);
int xmlExpIsNillable (xmlExpNodePtr expr);
int xmlExpMaxToken (xmlExpNodePtr expr);
int xmlExpGetLanguage (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr, const(char*)* langList, int len);
int xmlExpGetStart (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr, const(char*)* tokList, int len);
xmlExpNodePtr xmlExpStringDerive (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr, const(char)* str, int len);
xmlExpNodePtr xmlExpExpDerive (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr, xmlExpNodePtr sub);
int xmlExpSubsume (xmlExpCtxtPtr ctxt, xmlExpNodePtr expr, xmlExpNodePtr sub);
void xmlExpDump (xmlBufferPtr buf, xmlExpNodePtr expr);