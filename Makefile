##
# (C) Josh Netterfield 2015
# Part of the musicxml-interfaces <https://github.com/ripieno/musicxml-interfaces>.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
##

.PHONY: all watch main

all: ./node_modules/.bin/tsc main

main: ./node_modules/.bin/tsc
	@echo '' > ./builders.ts
	@./node_modules/.bin/tsc
	@./node_modules/.bin/dts-generator --name 'musicxml-interfaces' --main 'musicxml-interfaces/musicxml-interfaces' --out ./musicxml-interfaces.d.ts --baseDir . ./musicxml-interfaces.ts
	@node ./operationGenerator.js ./musicxml-interfaces.d.ts --out ./spec.tmp.json
	@node ./writeBuilders.js > builders.ts
	@rm ./spec.tmp.json
	@./node_modules/.bin/tsc
	@./node_modules/.bin/dts-generator --name 'musicxml-interfaces' --main 'musicxml-interfaces/musicxml-interfaces' --out ./musicxml-interfaces.d.ts --baseDir . ./musicxml-interfaces.ts ./builders.ts

watch: ./node_modules/.bin/tsc
	@./node_modules/.bin/tsc -w

./node_modules/.bin/tsc:
	@npm install
