#!/bin/bash
sed -i.bk -e 's/export declare/export/g' -e 's/^/    /g' -e '1i\
declare module "musicxml-interfaces" {' -e'$a\
}' ./musicxml-interfaces.d.ts
rm ./musicxml-interfaces.d.ts.bk
