##
# (C) Joshua Netterfield 2015 - present
# Part of the musicxml-interfaces <https://github.com/jnetterf/musicxml-interfaces>.
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

NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m
INFO_COLOR=\033[36;01m

OK_STRING=$(OK_COLOR)  ...ok!$(NO_COLOR)
BOOTSTRAP_STRING=$(INFO_COLOR)musicxml-interfaces» Bootstraping index.d.ts...$(NO_COLOR)
BUILDER_STRING=$(INFO_COLOR)musicxml-interfaces» Generating builders.ts...$(NO_COLOR)
LIB_STRING=$(INFO_COLOR)musicxml-interfaces» Building lib...$(NO_COLOR)


main: ./node_modules/.bin/tsc
	@printf "$(BOOTSTRAP_STRING)\n"
	@echo '' > ./src/builders.ts
	@./node_modules/.bin/tsc ./src/index.ts ./src/private/operationGenerator.ts --outDir lib --module commonjs
	@./node_modules/.bin/dts-generator --name 'musicxml-interfaces' --main 'musicxml-interfaces/index' --out ./index.d.ts --baseDir ./src ./src/index.ts
	@printf "$(BUILDER_STRING)\n"
	@node ./lib/private/operationGenerator.js ./index.d.ts --out ./src/private/symbols.json
	@node ./src/private/writeBuilders.js > ./src/builders.ts
	@rm ./src/private/symbols.json
	@printf "$(LIB_STRING)\n"
	@./node_modules/.bin/tsc -d
	@node ./lib/private/sanityTest.js
	@rm -rf ./lib/private ./index.d.ts

watch: ./node_modules/.bin/tsc
	@./node_modules/.bin/tsc -w

./node_modules/.bin/tsc:
	@yarn
