import libxml2.dict;
import core.stdc.string;

extern (C):

alias _xmlHashTable xmlHashTable;
alias _xmlHashTable* xmlHashTablePtr;
alias void function (void*, ubyte*) xmlHashDeallocator;
alias void* function (void*, ubyte*) xmlHashCopier;
alias void function (void*, void*, ubyte*) xmlHashScanner;
alias void function (void*, void*, const(ubyte)*, const(ubyte)*, const(ubyte)*) xmlHashScannerFull;

struct _xmlHashTable;


xmlHashTablePtr xmlHashCreate (int size);
xmlHashTablePtr xmlHashCreateDict (int size, xmlDictPtr dict);
void xmlHashFree (xmlHashTablePtr table, xmlHashDeallocator f);
int xmlHashAddEntry (xmlHashTablePtr table, const(char)* name, void* userdata);
int xmlHashUpdateEntry (xmlHashTablePtr table, const(char)* name, void* userdata, xmlHashDeallocator f);
int xmlHashAddEntry2 (xmlHashTablePtr table, const(char)* name, const(char)* name2, void* userdata);
int xmlHashUpdateEntry2 (xmlHashTablePtr table, const(char)* name, const(char)* name2, void* userdata, xmlHashDeallocator f);
int xmlHashAddEntry3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3, void* userdata);
int xmlHashUpdateEntry3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3, void* userdata, xmlHashDeallocator f);
int xmlHashRemoveEntry (xmlHashTablePtr table, const(char)* name, xmlHashDeallocator f);
int xmlHashRemoveEntry2 (xmlHashTablePtr table, const(char)* name, const(char)* name2, xmlHashDeallocator f);
int xmlHashRemoveEntry3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3, xmlHashDeallocator f);
void* xmlHashLookup (xmlHashTablePtr table, const(char)* name);
void* xmlHashLookup2 (xmlHashTablePtr table, const(char)* name, const(char)* name2);
void* xmlHashLookup3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3);
void* xmlHashQLookup (xmlHashTablePtr table, const(char)* name, const(char)* prefix);
void* xmlHashQLookup2 (xmlHashTablePtr table, const(char)* name, const(char)* prefix, const(char)* name2, const(char)* prefix2);
void* xmlHashQLookup3 (xmlHashTablePtr table, const(char)* name, const(char)* prefix, const(char)* name2, const(char)* prefix2, const(char)* name3, const(char)* prefix3);
xmlHashTablePtr xmlHashCopy (xmlHashTablePtr table, xmlHashCopier f);
int xmlHashSize (xmlHashTablePtr table);
void xmlHashScan (xmlHashTablePtr table, xmlHashScanner f, void* data);
void xmlHashScan3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3, xmlHashScanner f, void* data);
void xmlHashScanFull (xmlHashTablePtr table, xmlHashScannerFull f, void* data);
void xmlHashScanFull3 (xmlHashTablePtr table, const(char)* name, const(char)* name2, const(char)* name3, xmlHashScannerFull f, void* data);