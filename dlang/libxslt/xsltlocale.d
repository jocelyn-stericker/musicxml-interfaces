import core.stdc.string;
import core.stdc.locale;
import core.stdc.string;
import core.stdc.locale;

extern (C):

alias void* xsltLocale;
alias ubyte xsltLocaleChar;

xsltLocale xsltNewLocale (const(char)* langName);
void xsltFreeLocale (xsltLocale locale);
xsltLocaleChar* xsltStrxfrm (xsltLocale locale, const(char)* string);
int xsltLocaleStrcmp (xsltLocale locale, const(xsltLocaleChar)* str1, const(xsltLocaleChar)* str2);
void xsltFreeLocales ();