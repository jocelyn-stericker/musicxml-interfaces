extern (C):

extern __gshared int xsltMaxDepth;
extern __gshared int xsltMaxVars;
extern __gshared const(char)* xsltEngineVersion;
extern __gshared const int xsltLibxsltVersion;
extern __gshared const int xsltLibxmlVersion;

void xsltInit ();
void xsltCleanupGlobals ();