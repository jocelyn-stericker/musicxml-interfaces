#!/usr/bin/env bash
if [ -f ./libxml2/parser.d -a -f ./libxml2/tree.d ]
  then
    echo ./libxml2 exists and seems valid. Not updating bindings...
    exit 0
fi
echo Assuming libxml is somewhere in /usr. If not, adjust bind_libxml2.bash.
dub run dstep > /dev/null 2> /dev/null
set -e
pkg-config --exists libxml-2.0 || (echo "Could not find libxml-2.0"; exit 1)
pkg-config --exists libxslt || (echo "Could not find libxslt"; exit 1)

mkdir -p libxml2
mkdir -p libxslt

cp `find /usr/include | grep "libxml/dict.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/encoding.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/globals" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/hash.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/list.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/parser.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/tree.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/valid.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xmlautomata.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xmlerror.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xmlIO.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xmlregexp.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xmlmemory.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/xpath.h" | head -1` ./libxml2
cp `find /usr/include | grep "libxml/SAX2" | head -1` ./libxml2
cp -r `find /usr/include | grep "libxslt" | head -1` ./

echo Making sure dstep is installed...
~/.dub/packages/dstep*/bin/dstep 2>&1 > /dev/null || dub run dstep 2>&1 > /dev/null || (echo "Could not 'dub run dstep'"; exit 1)

echo Creating bindings...
RUN_DSTEP=`ls ~/.dub/packages/dstep*/bin/dstep`
$RUN_DSTEP -- ./libxml2/dict.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ -D__XML_REGEXP_H__ -D__XML_HASH_H__ -D__XML_PARSER_H__ -D__XML_TREE_H__ -Dsize_t="unsigned int" -DxmlChar="char" || exit 1
$RUN_DSTEP -- ./libxml2/encoding.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/globals.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/hash.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/list.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/parser.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/tree.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/valid.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ -D__XML_PARSER_H__ -D__XML_ERROR_H__ || exit 1
$RUN_DSTEP -- ./libxml2/xmlautomata.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ -D__XML_VALID_H__ -D__XML_PARSER_H__ || exit 1
$RUN_DSTEP -- ./libxml2/xmlerror.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ -D__XML_PARSER_H__ --include libxml/xmlversion.h -DxmlParserInputPtr="void*" || exit 1
$RUN_DSTEP -- ./libxml2/xmlIO.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ -D__XML_PARSER_H__  -D__XML_ERROR_H__ -D__XML_SAX_H__ -D__XML_GLOBALS_H || exit 1
$RUN_DSTEP -- ./libxml2/xmlregexp.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/xmlmemory.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/xpath.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxml2/SAX2.h `pkg-config libxml-2.0 --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1

$RUN_DSTEP -- ./libxslt/xslt.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxslt/xsltInternals.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxslt/numbersInternals.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxslt/xsltutils.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxslt/xsltlocale.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1
$RUN_DSTEP -- ./libxslt/transform.h `pkg-config libxml-2.0 libxslt --cflags-only-I` -D_GCC_LIMITS_H_ || exit 1

# Don't require global.d just for xmlChar
sed -i 's/xmlChar /char /g' ./libx*/*.d 
sed -i 's/xmlChar\*/char*/g' ./libx*/*.d 
sed -i 's/xmlChar)/char)/g' ./libx*/*.d 

# Unsupported features
sed -i 's/xmlSAXLocator/void*/g' ./libxml2/globals.d

# Conflicting forward structs
sed -i 's/struct _xmlParserCtxt;//g' ./libxml2/*.d
sed -i 's/struct _xmlParserInputBuffer;//g' ./libxml2/*.d
sed -i 's/struct _xmlOutputBuffer;//g' ./libxml2/*.d
sed -i 's/struct _xmlSAXLocator;//g' ./libxml2/*.d
sed -i 's/struct _xmlSAXHandler;//g' ./libxml2/*.d
sed -i 's/struct _xmlParserInput;//g' ./libxml2/*.d
# sed -i 's/struct _xmlEntity;//g' ./libxml2/*.d
# sed -i 's/struct _xmlBuf;//g' ./libxml2/*.d

# Imports
sed -i '1i import libxml2.dict;' ./libxml2/hash.d
sed -i '1i import libxml2.dict;\nimport libxml2.parser;\nimport libxml2.xmlregexp;\nimport libxml2.xmlIO;' ./libxml2/tree.d
sed -i '1i import libxml2.dict;\nimport libxml2.parser;\nimport libxml2.xmlregexp;\nimport libxml2.xmlIO;\nimport libxml2.tree;' ./libxml2/SAX2.d
sed -i '1i import libxml2.tree;\nalias iconv_t = void*;' ./libxml2/encoding.d
sed -i '1i import libxml2.tree;\nimport libxml2.valid;\nimport libxml2.list;\nimport libxml2.dict;\nimport libxml2.hash;\nimport libxml2.encoding;\nimport libxml2.xmlerror;\nimport libxml2.xmlIO;' ./libxml2/parser.d
sed -i '1i import libxml2.tree;\nimport libxml2.xmlautomata;\nimport libxml2.list;' ./libxml2/valid.d
sed -i '1i import libxml2.tree;\nimport libxml2.xmlautomata;\nimport libxml2.list;\nimport libxml2.hash;\nimport libxml2.dict;\nimport libxml2.xmlerror;' ./libxml2/xpath.d
sed -i '1i import libxml2.encoding;\nimport libxml2.tree;' ./libxml2/xmlIO.d
sed -i '1i import libxml2.xmlregexp;' ./libxml2/xmlautomata.d
sed -i '1i import libxml2.dict;\nimport libxml2.tree;\n' ./libxml2/xmlregexp.d
sed -i '1i import libxml2.tree;\nimport libxml2.valid;\nimport libxml2.list;\nimport libxml2.dict;\nimport libxml2.hash;\nimport libxml2.encoding;\nimport libxml2.xmlerror;\nimport libxml2.xmlIO;\nimport libxml2.parser;\nimport libxml2.xmlmemory;' ./libxml2/globals.d

sed -i '1i import libxml2.dict;\nimport libxml2.tree;\nimport libxml2.globals;\nimport libxml2.xmlmemory;\nimport libxml2.xpath;\nimport libxml2.hash;\nimport libxslt.xsltlocale;\nimport libxslt.numbersInternals;\nimport libxml2.xmlerror;' ./libxslt/xsltInternals.d
sed -i '1i import libxml2.dict;\nimport libxml2.tree;\nimport libxml2.globals;\nimport libxml2.xmlmemory;\nimport libxml2.xpath;\nimport libxml2.hash;\nimport libxslt.xsltlocale;' ./libxslt/numbersInternals.d
sed -i '1i import libxml2.dict;\nimport libxml2.tree;\nimport libxml2.globals;\nimport libxml2.xmlmemory;\nimport libxml2.xpath;\nimport libxml2.hash;\nimport libxslt.xsltlocale;\nimport libxslt.xsltInternals;' ./libxslt/transform.d
sed -i '1i import libxml2.dict;\nimport libxml2.tree;\nimport libxml2.globals;\nimport libxml2.xmlmemory;\nimport libxml2.xpath;\nimport libxml2.hash;\nimport libxslt.xsltlocale;\nimport libxslt.xsltInternals;\nimport libxml2.xmlerror;' ./libxslt/xsltUtils.d
