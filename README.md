# MusicXML Interfaces for JavaScript

MusicXML is the standard open format for exchanging digital sheet music. This library provides:

 - methods for parsing and serializing MusicXML scores
 - full **TypeScript** type definitions
 - support for IE 9+ and other browsers, Node.js, and io.js

This project is not affiliated with MakeMusic, Inc. MusicXML™ is a registered trademark owned by MakeMusic, Inc.

## Getting MusicXML Interfaces

 - To install, use npm: `npm install --save ripieno/musicxml-interfaces`
 - You need `xsltproc`. If you're on OS X or Linux, you probably already have it installed.
 - If you want to take advantage of TypeScript definitions, either
   - Install tsd 0.6 (that's a prerelease as of March 2015) and run `npm install` and`tsd link`,
   - Or download `musicxml-interfaces.d.ts` and add a reference to it.

## Parsing ([MusicXML.parse](https://ripieno.github.io/musicxml-interfaces/))

### Obtaining a [ScoreTimewise](https://ripieno.github.io/musicxml-interfaces/interfaces/scoretimewise.html) from XML

The easiest way to use MusicXML Interfaces for JavaScript is to call `MusicXML.parse`:

``` javascript
var MusicXML = require("musicxml-interfaces");
var score = MusicXML.parse("...");
```

This will return a plain JSON object with the **[MusicXML.ScoreTimewise](https://ripieno.github.io/musicxml-interfaces/interfaces/scoretimewise.html)** interface.

### Advanced parsing

You can also parse certain subsets of a document. For full type specifications, see [the documentation](http://ripieno.github.io/musicxml-interfaces/).

``` javascript
MusicXML.parse.scoreHeader("..."); // => MusicXML.ScoreHeader
MusicXML.parse.measure("..."); // => MusicXML.Measure
MusicXML.parse.note("..."); // => MusicXML.Note
MusicXML.parse.backup("..."); // => MusicXML.Backup
MusicXML.parse.harmony("..."); // => MusicXML.Harmony
MusicXML.parse.forward("..."); // => MusicXML.Forward
MusicXML.parse.print("..."); // => MusicXML.Print
MusicXML.parse.figuredBass("..."); // => MusicXML.FiguredBass
MusicXML.parse.direction("..."); // => MusicXML.Direction
MusicXML.parse.attributes("..."); // => MusicXML.Attributes
MusicXML.parse.sound("..."); // => MusicXML.Sound
MusicXML.parse.barline("..."); // => MusicXML.Barline
MusicXML.parse.grouping("..."); // => MusicXML.Grouping
```

## Manipulating
The objects returned from MusicXML.parse are all plain objects (i.e., they do not have any additional prototypes). You can manipulate them any you manipulate other plain JavaScript objects.

## Serializing [MusicXML.serialize](https://ripieno.github.io/musicxml-interfaces/)
The serialization API looks a lot like the parsing API.

```
MusicXML.serialize(...);
MusicXML.serialize.scoreHeader(...); // => string
MusicXML.serialize.measure(...); // => string
MusicXML.serialize.note(...); // => string
MusicXML.serialize.backup(...); // => string
MusicXML.serialize.harmony(...); // => string
MusicXML.serialize.forward(...); // => string
MusicXML.serialize.print(...); // => string
MusicXML.serialize.figuredBass(...); // => string
MusicXML.serialize.direction(...); // => string
MusicXML.serialize.attributes(...); // => string
MusicXML.serialize.sound(...); // => string
MusicXML.serialize.barline(...); // => string
MusicXML.serialize.grouping(...); // => string
```

## Contributing
Please report issues! In particular,

 - If there is a discrepency between a DTD in `vendor/musicxml-dtd` and the TypeScript interfaces in `musicxml-interfaces.d.ts`, just state the discrepency.
 - If the TypeScript interface definitions are correct, but there is an error in importing a file, provide a minimal MusicXML file that illustrates the issue.
 - If there is an error in exporting MusicXML interfaces back to MusicXML, provide a minimal valid JSON structure that is not exported correctly.

Pull requests are currently not accepted.

## Copyright
```
(C) Josh Netterfield <joshua@nettek.ca> 2015.
Part of the musicxml-interfaces <https://github.com/ripieno/musicxml-interfaces>.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

## MusicXML License
```
MusicXML Version 3.0

Copyright (C) 2004-2011 MakeMusic, Inc.

http://www.makemusic.com/

This MusicXML work is being provided by the copyright
holder under the MusicXML Public License Version 3.0,
available from:

http://www.musicxml.org/dtds/license.html
```