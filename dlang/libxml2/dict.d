extern (C):

alias _xmlDict xmlDict;
alias _xmlDict* xmlDictPtr;

struct _xmlDict;


int xmlInitializeDict ();
xmlDictPtr xmlDictCreate ();
uint xmlDictSetLimit (xmlDictPtr dict, uint limit);
uint xmlDictGetUsage (xmlDictPtr dict);
xmlDictPtr xmlDictCreateSub (xmlDictPtr sub);
int xmlDictReference (xmlDictPtr dict);
void xmlDictFree (xmlDictPtr dict);
const(char)* xmlDictLookup (xmlDictPtr dict, const(char)* name, int len);
const(char)* xmlDictExists (xmlDictPtr dict, const(char)* name, int len);
const(char)* xmlDictQLookup (xmlDictPtr dict, const(char)* prefix, const(char)* name);
int xmlDictOwns (xmlDictPtr dict, const(char)* str);
int xmlDictSize (xmlDictPtr dict);
void xmlDictCleanup ();