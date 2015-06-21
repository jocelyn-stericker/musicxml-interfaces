# MusicXML Interfaces

MusicXML Interfaces converts MusicXML -- an open format for exchanging digital sheet music -- to and from JavaScript objects.

This project is not affiliated with MakeMusic, Inc. MusicXML™ is a registered trademark owned by MakeMusic, Inc.

## Getting musicxml-interfaces

Use `npm` to install this package for node, io.js, or browsers. For use with browsers, you'll also need to use a loader such as webpack.

```
npm install --save musicxml-interfaces
```

## Basic Usage
`MusicXML.parse` converts MusicXML strings into JavaScript objects.

`MusicXML.serialize` converts JavaScript object into MusicXML strings.
 
```
import * as MusicXML from 'musicxml-interfaces';
import fetch from 'whatwg-fetch';

fetch('/sonata.xml')
  .then(function(response) {
    return response.text()
  }).then(function(xml) {
    let document = MusicXML.parse(score);
    console.log('Converted XML to ', document);

    let xml = MusicXML.serialize(document);
    console.log('Converted JavaScript document to ', xml);
  });
```

## Other Endpoints
The `MusicXML.parse.*` endpoints convert MusicXML fragments to parts of JSON documents.

The `MusicXML.serialize.*` endpoints convert parts of JSON documents to MusicXML fragments.

```
MusicXML.parse = {
    scoreHeader(scoreHeader: string) => ScoreHeader;
    measure(measure: string) => Measure;
    note(note: string) => Note;
    clef(clef: string) => Clef;
    backup(backup: string) => Backup;
    harmony(harmony: string) => Harmony;
    forward(forward: string) => Forward;
    print(print: string) => Print;
    figuredBass(figuredBass: string) => FiguredBass;
    direction(direction: string) => Direction;
    attributes(attributes: string) => Attributes;
    sound(sound: string) => Sound;
    barline(barline: string) => Barline;
    grouping(grouping: string) => Grouping;
}

MusicXML.serialize = {
    scoreHeader(scoreHeader: ScoreHeader) => string;
    measure(measure: Measure) => string;
    note(note: Note) => string;
    clef(clef: Clef) => string;
    backup(backup: Backup) => string;
    harmony(harmony: Harmony) => string;
    forward(forward: Forward) => string;
    print(print: Print) => string;
    figuredBass(figuredBass: FiguredBass) => string;
    direction(direction: Direction) => string;
    attributes(attributes: Attributes) => string;
    sound(sound: Sound) => string;
    barline(barline: Barline) => string;
    grouping(grouping: Grouping) => string;
}
```

## Types
There is a one-to-one mapping of MusicXML and the JSON produced by MusicXML Interfaces. The [TypeScript defintion file](musicxml-interfaces.d.ts) fully documents MusicXML Interfaces types. If you use TypeScript and tsd, `tsd link` will load types into your project.

## Contributing
Please report issues! In particular,

 - If there is a discrepency between a DTD in `vendor/musicxml-dtd` and the TypeScript interfaces in `musicxml-interfaces.d.ts`, just state the discrepency.
 - If the TypeScript interface definitions are correct, but there is an error in importing a file, provide a minimal MusicXML file that illustrates the issue.
 - If there is an error in exporting MusicXML interfaces back to MusicXML, provide a minimal valid JSON structure that is not exported correctly.

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
