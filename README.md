# MusicXML Interfaces

`musicxml-interfaces` is a low-level JavaScript utility library for parsing, serializing, building, and patching
[MusicXML songs](http://www.musicxml.com/).

`musicxml-interfaces` does not provide users with utilities for rendering or analysing MusicXML songs.
This project is used by [Satie](https://nettek.ca/satie), which provides higher-level functionality.

This project is not affiliated with MakeMusic, Inc. MusicXML™ is a registered trademark owned by MakeMusic, Inc.

## Getting musicxml-interfaces

Use `npm` to install this package for node or browsers.
For use with browsers, you'll also need to use a loader such as webpack.

```
npm install --save musicxml-interfaces@0.0.10
```

## Usage

### Example

Here is a simple example using ES6 or TypeScript:

```
import {parseScore, serializeScore} as MusicXML from 'musicxml-interfaces';
import 'whatwg-fetch';

fetch('/sonata.xml')
  .then(function(response) {
    return response.text()
  }).then(function(xml) {
    let document = parseScore(score);
    console.log('Converted XML to ', doc);

    let xml = serializeScore(doc);
    console.log('Converted JavaScript document to ', xml);
  });
```

Here is the same example, using ES5:

```
var MusicXML = require("musicxml-interfaces");
require("whatwg-fetch");

fetch('/sonata.xml')
  .then(function(response) {
    return response.text()
  }).then(function(xml) {
    let document = MusicXML.parseScore(score);
    console.log('Converted XML to ', doc);

    let xml = MusicXML.serializeScore(doc);
    console.log('Converted JavaScript document to ', xml);
  });
```

### Parsing
```
    /**
     * Converts a MusicXML document into a MusicXML parttime-inspired JSON object.
     * See ScoreTimewise for full return type specification.
     *
     * This function will accept timepart MusicXML files, but will still return a
     * structure similar to parttime.
     */
    MusicXML.parseScore(score: string): MusicXMLScoreTimewise;

    /**
     * Reads a document, and returns header information.
     *
     * ScoreHeader is a subset of ScoreTimewise, so you can always just call MusicXML.parse.score.
     * This function is a bit faster though, if you only care about metadata.
     */
    MusicXML.paseScoreHeader(score: string): MusicXML.ScoreHeader;

    /**
     * Converts a MusicXML <measure /> from a **parttime** document into JSON.
     */
    MusicXML.parseMeasure(str: string): MusicXML.Measure;
    
    /**
     * These functions convert an XML string into corresponding JSON.
     */
    MusicXML.parseNote(str: string): MusicXML.Note;
    MusicXML.parseClef(str: string): MusicXML.Clef;
    MusicXML.parseTime(str: string): MusicXML.Time;
    MusicXML.parseKey(str: string): MusicXML.Key;
    MusicXML.parsePartSymbol(str: string): MusicXML.PartSymbol;
    MusicXML.parseBackup(str: string): MusicXML.Backup;
    MusicXML.parseHarmony(str: string): MusicXML.Harmony;
    MusicXML.parseForward(str: string): MusicXML.Forward;
    MusicXML.parsePrint(str: string): MusicXML.Print;
    MusicXML.parseFiguredBass(str: string): MusicXML.FiguredBass;
    MusicXML.parseDirection(str: string): MusicXML.Direction;
    MusicXML.parseAttributes(str: string): MusicXML.Attributes;
    MusicXML.parseSound(str: string): MusicXML.Sound;
    MusicXML.parseBarline(str: string): MusicXML.Barline;
    MusicXML.parseGrouping(str: string): MusicXML.Grouping;
```

### Serializing
```
    /**
     * These functions convert a parsed JSON into corresponding MusicXML.
     */
    MusicXML.serializeScore(score: ScoreTimewise): string;
    MusicXML.serializeScoreHeader(scoreHeader: ScoreHeader): string;
    MusicXML.serializeMeasure(measure: Measure): string;
    MusicXML.serializeNote(note: Note): string;
    MusicXML.serializeClef(clef: Clef): string;
    MusicXML.serializeTime(time: Time): string;
    MusicXML.serializeKey(key: Key): string;
    MusicXML.serializePartSymbol(partSymbol: PartSymbol): string;
    MusicXML.serializeBackup(backup: Backup): string;
    MusicXML.serializeHarmony(harmony: Harmony): string;
    MusicXML.serializeForward(forward: Forward): string;
    MusicXML.serializePrint(print: Print): string;
    MusicXML.serializeFiguredBass(figuredBass: FiguredBass): string;
    MusicXML.serializeDirection(direction: Direction): string;
    MusicXML.serializeAttributes(attributes: Attributes): string;
    MusicXML.serializeSound(sound: Sound): string;
    MusicXML.serializeBarline(barline: Barline): string;
    MusicXML.serializeGrouping(grouping: Grouping): string;
```

### Builders

`musicxml-interfaces` provides tools for building structures and JSON0 patches in `musicxml-interfaces/builders`.
These should be considered expiremental.

## Types / usage with TypeScript
There is a one-to-one mapping of MusicXML and the JSON produced by MusicXML Interfaces.
The [TypeScript defintion file](index.d.ts) fully documents MusicXML Interfaces types.
If you use TypeScript and tsd, `tsd link` will load types into your project.

## Contributing
Please report issues! In particular,

 - If there is a discrepency between a DTD in `vendor/musicxml-dtd` and the TypeScript interfaces in `index.d.ts`, just state the discrepency.
 - If the TypeScript interface definitions are correct, but there is an error in importing a file, provide a minimal MusicXML file that illustrates the issue.
 - If there is an error in exporting MusicXML interfaces back to MusicXML, provide a minimal valid JSON structure that is not exported correctly.

To install:
```
git clone git@github.com:jnetterf/musicxml-interfaces.git
cd musicxml-interfaces
npm install
```

To build:
```
make
```

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
