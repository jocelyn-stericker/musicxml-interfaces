.PHONY: polyglot typescript dlang

all: dlang typescript

polyglot:
	cd polyglot; dub -- --input ../musicXML.json

typescript: polyglot
	npm install && npm start

dlang: polyglot
	cd dlang; ./bind_libxml2.bash && dub test

