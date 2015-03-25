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

.PHONY: all

all: ./node_modules/typescript/bin/tsc
	@./node_modules/typescript/bin/tsc ./musicxml-interfaces.ts  --module commonjs -t ES5

watch: ./node_modules/typescript/bin/tsc
	@./node_modules/typescript/bin/tsc ./musicxml-interfaces.ts  --module commonjs -t ES5 -w

typings: ./node_modules/typescript/bin/tsc
	@./node_modules/typescript/bin/tsc ./musicxml-interfaces.ts  --module commonjs -t ES5 -d
	@./fixTypings.bash

./node_modules/typescript/bin/tsc:
	@npm install
