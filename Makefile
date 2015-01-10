.PHONY: polyglot typescript dlang node

all: dlang typescript node

polyglot:
	cd dlang; ./check_config.bash
	cd polyglot; PATH=$(shell pwd)/dlang/.env/bin:$(PATH) dub -- --input ../musicXML.json

typescript: polyglot
	npm install && npm start

dlang: polyglot
	cd dlang; ./build.bash

node: typescript dlang
	cd node; node-gyp rebuild && node ./smoketest.js
