import libxml2.dict;
import libxml2.tree;
import libxml2.globals;
import libxml2.xmlmemory;
import libxml2.xpath;
import libxml2.hash;
import libxslt.xsltlocale;
import core.stdc.string;

extern (C):

alias _xsltNumberData xsltNumberData;
alias _xsltNumberData* xsltNumberDataPtr;
alias _xsltFormatNumberInfo xsltFormatNumberInfo;
alias _xsltFormatNumberInfo* xsltFormatNumberInfoPtr;

struct _xsltNumberData
{
	const(char)* level;
	const(char)* count;
	const(char)* from;
	const(char)* value;
	const(char)* format;
	int has_format;
	int digitsPerGroup;
	int groupingCharacter;
	int groupingCharacterLen;
	xmlDocPtr doc;
	xmlNodePtr node;
	_xsltCompMatch* countPat;
	_xsltCompMatch* fromPat;
}

struct _xsltFormatNumberInfo
{
	int integer_hash;
	int integer_digits;
	int frac_digits;
	int frac_hash;
	int group;
	int multiplier;
	char add_decimal;
	char is_multiplier_set;
	char is_negative_pattern;
}

struct _xsltCompMatch;