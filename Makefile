.PHONY: polyglot typescript dlang node

all:
	@echo
	@echo make generate:	Regenerate TypeScript and D code.
	@echo make dlang: 	Build D project, installing D and dub if needed.
	@echo make typescript: 	Recompile TypeScript code.
	@echo make node: 	Recompile Node addon \(uses D library, does not compile TS\)
	@echo
	@echo Note
	@echo ==================================================================
	@echo From the version off of npm, only 'make node' will work. 
	@echo For full source, 'git clone git@github.com:ripieno/musicxml-interfaces.git'

generate:
	cd dlang; ./check_config.bash
	cd polyglot; PATH=$(shell pwd)/dlang/.env/bin:$(PATH) dub -- --input ../musicXML.json

typescript:
	npm install && npm start

dlang:
	cd dlang; ./build.bash

node: dlang
	npm install
	cd node; ../node_modules/.bin/node-gyp rebuild && node ./smoketest.js
