import core.stdc.stdio;
import core.stdc.config;

extern (C):

alias void function (void*) xmlFreeFunc;
alias void* function (c_ulong) xmlMallocFunc;
alias void* function (void*, c_ulong) xmlReallocFunc;
alias char* function (const(char)*) xmlStrdupFunc;

int xmlMemSetup (xmlFreeFunc freeFunc, xmlMallocFunc mallocFunc, xmlReallocFunc reallocFunc, xmlStrdupFunc strdupFunc);
int xmlMemGet (xmlFreeFunc* freeFunc, xmlMallocFunc* mallocFunc, xmlReallocFunc* reallocFunc, xmlStrdupFunc* strdupFunc);
int xmlGcMemSetup (xmlFreeFunc freeFunc, xmlMallocFunc mallocFunc, xmlMallocFunc mallocAtomicFunc, xmlReallocFunc reallocFunc, xmlStrdupFunc strdupFunc);
int xmlGcMemGet (xmlFreeFunc* freeFunc, xmlMallocFunc* mallocFunc, xmlMallocFunc* mallocAtomicFunc, xmlReallocFunc* reallocFunc, xmlStrdupFunc* strdupFunc);
int xmlInitMemory ();
void xmlCleanupMemory ();
int xmlMemUsed ();
int xmlMemBlocks ();
void xmlMemDisplay (FILE* fp);
void xmlMemDisplayLast (FILE* fp, c_long nbBytes);
void xmlMemShow (FILE* fp, int nr);
void xmlMemoryDump ();
void* xmlMemMalloc (size_t size);
void* xmlMemRealloc (void* ptr, size_t size);
void xmlMemFree (void* ptr);
char* xmlMemoryStrdup (const(char)* str);
void* xmlMallocLoc (size_t size, const(char)* file, int line);
void* xmlReallocLoc (void* ptr, size_t size, const(char)* file, int line);
void* xmlMallocAtomicLoc (size_t size, const(char)* file, int line);
char* xmlMemStrdupLoc (const(char)* str, const(char)* file, int line);