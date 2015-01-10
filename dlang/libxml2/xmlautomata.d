import libxml2.xmlregexp;
import core.stdc.string;

extern (C):

alias _xmlAutomata xmlAutomata;
alias _xmlAutomata* xmlAutomataPtr;
alias _xmlAutomataState xmlAutomataState;
alias _xmlAutomataState* xmlAutomataStatePtr;

struct _xmlAutomata;


struct _xmlAutomataState;


xmlAutomataPtr xmlNewAutomata ();
void xmlFreeAutomata (xmlAutomataPtr am);
xmlAutomataStatePtr xmlAutomataGetInitState (xmlAutomataPtr am);
int xmlAutomataSetFinalState (xmlAutomataPtr am, xmlAutomataStatePtr state);
xmlAutomataStatePtr xmlAutomataNewState (xmlAutomataPtr am);
xmlAutomataStatePtr xmlAutomataNewTransition (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, void* data);
xmlAutomataStatePtr xmlAutomataNewTransition2 (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, const(char)* token2, void* data);
xmlAutomataStatePtr xmlAutomataNewNegTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, const(char)* token2, void* data);
xmlAutomataStatePtr xmlAutomataNewCountTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, int min, int max, void* data);
xmlAutomataStatePtr xmlAutomataNewCountTrans2 (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, const(char)* token2, int min, int max, void* data);
xmlAutomataStatePtr xmlAutomataNewOnceTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, int min, int max, void* data);
xmlAutomataStatePtr xmlAutomataNewOnceTrans2 (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, const(char)* token, const(char)* token2, int min, int max, void* data);
xmlAutomataStatePtr xmlAutomataNewAllTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, int lax);
xmlAutomataStatePtr xmlAutomataNewEpsilon (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to);
xmlAutomataStatePtr xmlAutomataNewCountedTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, int counter);
xmlAutomataStatePtr xmlAutomataNewCounterTrans (xmlAutomataPtr am, xmlAutomataStatePtr from, xmlAutomataStatePtr to, int counter);
int xmlAutomataNewCounter (xmlAutomataPtr am, int min, int max);
xmlRegexpPtr xmlAutomataCompile (xmlAutomataPtr am);
int xmlAutomataIsDeterminist (xmlAutomataPtr am);