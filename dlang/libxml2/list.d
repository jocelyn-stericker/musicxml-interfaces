extern (C):

alias _xmlLink xmlLink;
alias _xmlLink* xmlLinkPtr;
alias _xmlList xmlList;
alias _xmlList* xmlListPtr;
alias void function (_xmlLink*) xmlListDeallocator;
alias int function (const(void)*, const(void)*) xmlListDataCompare;
alias int function (const(void)*, const(void)*) xmlListWalker;

struct _xmlLink;


struct _xmlList;


xmlListPtr xmlListCreate (xmlListDeallocator deallocator, xmlListDataCompare compare);
void xmlListDelete (xmlListPtr l);
void* xmlListSearch (xmlListPtr l, void* data);
void* xmlListReverseSearch (xmlListPtr l, void* data);
int xmlListInsert (xmlListPtr l, void* data);
int xmlListAppend (xmlListPtr l, void* data);
int xmlListRemoveFirst (xmlListPtr l, void* data);
int xmlListRemoveLast (xmlListPtr l, void* data);
int xmlListRemoveAll (xmlListPtr l, void* data);
void xmlListClear (xmlListPtr l);
int xmlListEmpty (xmlListPtr l);
xmlLinkPtr xmlListFront (xmlListPtr l);
xmlLinkPtr xmlListEnd (xmlListPtr l);
int xmlListSize (xmlListPtr l);
void xmlListPopFront (xmlListPtr l);
void xmlListPopBack (xmlListPtr l);
int xmlListPushFront (xmlListPtr l, void* data);
int xmlListPushBack (xmlListPtr l, void* data);
void xmlListReverse (xmlListPtr l);
void xmlListSort (xmlListPtr l);
void xmlListWalk (xmlListPtr l, xmlListWalker walker, const(void)* user);
void xmlListReverseWalk (xmlListPtr l, xmlListWalker walker, const(void)* user);
void xmlListMerge (xmlListPtr l1, xmlListPtr l2);
xmlListPtr xmlListDup (const xmlListPtr old);
int xmlListCopy (xmlListPtr cur, const xmlListPtr old);
void* xmlLinkGetData (xmlLinkPtr lk);