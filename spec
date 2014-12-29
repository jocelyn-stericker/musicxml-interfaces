{
  "file": "MusicXML",
  "copyright": "MusicXML™ Version 3.0\n\nCopyright © 2004-2011 MakeMusic, Inc.\nhttp://www.makemusic.com/\n\nThis MusicXML™ work is being provided by the copyright\nholder under the MusicXML Public License Version 3.0,\navailable from:\n\nhttp://www.musicxml.org/dtds/license.html",
  "about": "This file contains multiple DTDs.",
  "output": {
    "d": "./dlang/src/musicXML.d",
    "ts": "./typescript/src/musicXML.ts",
    "tsDOM": "./typescript/src/musicXML_DOM.ts"
  },
  "manual": {
    "d": "./manual/musicXML_manual.d",
    "ts": "./manual/musicXML_manual.ts",
    "tsDOM": "./manual/musicXML_manualDOM.ts"
  },
  "types": [
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "mode",
      "interface": "string"
    },
    {
      "//": "The appearance element controls general graphical\nsettings for the music's final form appearance on a\nprinted page of display. This includes support\nfor line widths, definitions for note sizes, and standard\ndistances between notation elements, plus an extension\nelement for other aspects of appearance.\n\nThe line-width element indicates the width of a line type\nin tenths. The type attribute defines what type of line is\nbeing defined. Values include beam, bracket, dashes,\nenclosure, ending, extend, heavy barline, leger,\nlight barline, octave shift, pedal, slur middle, slur tip,\nstaff, stem, tie middle, tie tip, tuplet bracket, and\nwedge. The text content is expressed in tenths.\n\nThe note-size element indicates the percentage of the\nregular note size to use for notes with a cue and large\nsize as defined in the type element. The grace type is\nused for notes of cue size that that include a grace\nelement. The cue type is used for all other notes with\ncue size, whether defined explicitly or implicitly via a\ncue element. The large type is used for notes of large\nsize. The text content represent the numeric percentage.\nA value of 100 would be identical to the size of a regular\nnote as defined by the music font.\n\nThe distance element represents standard distances between\nnotation elements in tenths. The type attribute defines what\ntype of distance is being defined. Values include hyphen\n(for hyphens in lyrics) and beam.\n\nThe other-appearance element is used to define any\ngraphical settings not yet in the current version of the\nMusicXML format. This allows extended representation,\nthough without application interoperability.",
      "element": "other-appearance",
      "interface": "string"
    },
    {
      "//": "The tuning-step, tuning-alter, and tuning-octave elements\nare represented like the step, alter, and octave elements,\nwith different names to reflect their different function.\nThey are used in the staff-tuning and accord elements.",
      "element": "tuning-step",
      "interface": "string"
    },
    {
      "element": "other-dynamics",
      "interface": "string"
    },
    {
      "element": "voice",
      "interface": "string"
    },
    {
      "//": "These elements are used both in the time-modification and\nmetronome-tuplet elements. The actual-notes element\ndescribes how many notes are played in the time usually\noccupied by the number of normal-notes. If the normal-notes\ntype is different than the current note type (e.g., a\nquarter note within an eighth note triplet), then the\nnormal-notes type (e.g. eighth) is specified in the\nnormal-type and normal-dot elements. The content of the\nactual-notes and normal-notes elements ia a non-negative\ninteger.",
      "element": "normal-type",
      "interface": "string"
    },
    {
      "//": "A string describing a software.",
      "element": "software",
      "interface": "string",
      "idx": 1
    },
    {
      "//": "\nEncoding contains information about who did the digital\nencoding, when, with what software, and in what aspects.\nStandard type values for the encoder element are music,\nwords, and arrangement, but other types may be used. The\ntype attribute is only needed when there are multiple\nencoder elements.\n\nThe supports element indicates if the encoding supports\na particular MusicXML element. This is recommended for\nelements like beam, stem, and accidental, where the\nabsence of an element is ambiguous if you do not know\nif the encoding supports that element. For Version 2.0,\nthe supports element is expanded to allow programs to\nindicate support for particular attributes or particular\nvalues. This lets applications communicate, for example,\nthat all system and/or page breaks are contained in the\nMusicXML file.",
      "element": "encoding-description",
      "interface": "string"
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "key-step",
      "interface": "string"
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "key-alter",
      "interface": "string"
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "key-accidental",
      "interface": "string"
    },
    {
      "//": "BUG: Is number but must support compound time. Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "beats",
      "interface": "number"
    },
    {
      "//": "Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "beat-type",
      "interface": "number"
    },
    {
      "//": "Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "time-relation",
      "interface": "string"
    },
    {
      "//": "Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "senza-misura",
      "interface": "string"
    },
    {
      "//": "Instruments are only used if more than one instrument is\nrepresented in the part (e.g., oboe I and II where they\nplay together most of the time). If absent, a value of 1\nis assumed.",
      "element": "instruments",
      "interface": "string"
    },
    {
      "//": "Clefs are represented by the sign, line, and\nclef-octave-change elements. Sign values include G, F, C,\npercussion, TAB, jianpu, and none. Line numbers are\ncounted from the bottom of the staff. Standard values are\n2 for the G sign (treble clef), 4 for the F sign (bass clef),\n3 for the C sign (alto clef) and 5 for TAB (on a 6-line\nstaff). The clef-octave-change element is used for\ntransposing clefs (e.g., a treble clef for tenors would\nhave a clef-octave-change value of -1). The optional\nnumber attribute refers to staff numbers within the part,\nfrom top to bottom on the system. A value of 1 is\nassumed if not present.\n\nThe jianpu sign indicates that the music that follows\nshould be in jianpu numbered notation, just as the TAB\nsign indicates that the music that follows should be in\ntablature notation. Unlike TAB, a jianpu sign does not\ncorrespond to a visual clef notation.\n\nSometimes clefs are added to the staff in non-standard\nline positions, either to indicate cue passages, or when\nthere are multiple clefs present simultaneously on one\nstaff. In this situation, the additional attribute is set to\n\"yes\" and the line value is ignored. The size attribute\nis used for clefs where the additional attribute is \"yes\".\nIt is typically used to indicate cue clefs.\n\nSometimes clefs at the start of a measure need to appear\nafter the barline rather than before, as for cues or for\nuse after a repeated section. The after-barline attribute\nis set to \"yes\" in this situation. The attribute is ignored\nfor mid-measure clefs.\n\nClefs appear at the start of each system unless the\nprint-object attribute has been set to \"no\" or the\nadditional attribute has been set to \"yes\".",
      "element": "sign",
      "interface": "string"
    },
    {
      "//": "Clefs are represented by the sign, line, and\nclef-octave-change elements. Sign values include G, F, C,\npercussion, TAB, jianpu, and none. Line numbers are\ncounted from the bottom of the staff. Standard values are\n2 for the G sign (treble clef), 4 for the F sign (bass clef),\n3 for the C sign (alto clef) and 5 for TAB (on a 6-line\nstaff). The clef-octave-change element is used for\ntransposing clefs (e.g., a treble clef for tenors would\nhave a clef-octave-change value of -1). The optional\nnumber attribute refers to staff numbers within the part,\nfrom top to bottom on the system. A value of 1 is\nassumed if not present.\n\nThe jianpu sign indicates that the music that follows\nshould be in jianpu numbered notation, just as the TAB\nsign indicates that the music that follows should be in\ntablature notation. Unlike TAB, a jianpu sign does not\ncorrespond to a visual clef notation.\n\nSometimes clefs are added to the staff in non-standard\nline positions, either to indicate cue passages, or when\nthere are multiple clefs present simultaneously on one\nstaff. In this situation, the additional attribute is set to\n\"yes\" and the line value is ignored. The size attribute\nis used for clefs where the additional attribute is \"yes\".\nIt is typically used to indicate cue clefs.\n\nSometimes clefs at the start of a measure need to appear\nafter the barline rather than before, as for cues or for\nuse after a repeated section. The after-barline attribute\nis set to \"yes\" in this situation. The attribute is ignored\nfor mid-measure clefs.\n\nClefs appear at the start of each system unless the\nprint-object attribute has been set to \"no\" or the\nadditional attribute has been set to \"yes\".",
      "element": "clef-octave-change",
      "interface": "string"
    },
    {
      "//": "The staff-details element is used to indicate different\ntypes of staves. The staff-type element can be ossia,\ncue, editorial, regular, or alternate. An alternate staff\nindicates one that shares the same musical data as the\nprior staff, but displayed differently (e.g., treble and\nbass clef, standard notation and tab). The staff-lines\nelement specifies the number of lines for a non 5-line\nstaff. The staff-tuning and capo elements are used to\nspecify tuning when using tablature notation. The optional\nnumber attribute specifies the staff number from top to\nbottom on the system, as with clef. The optional show-frets\nattribute indicates whether to show tablature frets as\nnumbers (0, 1, 2) or letters (a, b, c). The default choice\nis numbers. The print-object attribute is used to indicate\nwhen a staff is not printed in a part, usually in large\nscores where empty parts are omitted. It is yes by default.\nIf print-spacing is yes while print-object is no, the score\nis printed in cutaway format where vertical space is left\nfor the empty part.",
      "element": "staff-type",
      "interface": "string"
    },
    {
      "//": "The capo element indicates at which fret a capo should\nbe placed on a fretted instrument. This changes the\nopen tuning of the strings specified by staff-tuning\nby the specified number of half-steps.",
      "element": "capo",
      "interface": "string"
    },
    {
      "//": "If the part is being encoded for a transposing instrument\nin written vs. concert pitch, the transposition must be\nencoded in the transpose element. The transpose element\nrepresents what must be added to the written pitch to get\nthe correct sounding pitch.\n\nThe transposition is represented by chromatic steps\n(required) and three optional elements: diatonic pitch\nsteps, octave changes, and doubling an octave down. The\nchromatic and octave-change elements are numeric values\nadded to the encoded pitch data to create the sounding\npitch. The diatonic element is also numeric and allows\nfor correct spelling of enharmonic transpositions.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the\ntransposition applies to all staves in the part. Per-staff\ntransposition is most often used in parts that represent\nmultiple instruments.",
      "element": "diatonic",
      "interface": "string"
    },
    {
      "//": "If the part is being encoded for a transposing instrument\nin written vs. concert pitch, the transposition must be\nencoded in the transpose element. The transpose element\nrepresents what must be added to the written pitch to get\nthe correct sounding pitch.\n\nThe transposition is represented by chromatic steps\n(required) and three optional elements: diatonic pitch\nsteps, octave changes, and doubling an octave down. The\nchromatic and octave-change elements are numeric values\nadded to the encoded pitch data to create the sounding\npitch. The diatonic element is also numeric and allows\nfor correct spelling of enharmonic transpositions.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the\ntransposition applies to all staves in the part. Per-staff\ntransposition is most often used in parts that represent\nmultiple instruments.",
      "element": "chromatic",
      "interface": "string"
    },
    {
      "//": "If the part is being encoded for a transposing instrument\nin written vs. concert pitch, the transposition must be\nencoded in the transpose element. The transpose element\nrepresents what must be added to the written pitch to get\nthe correct sounding pitch.\n\nThe transposition is represented by chromatic steps\n(required) and three optional elements: diatonic pitch\nsteps, octave changes, and doubling an octave down. The\nchromatic and octave-change elements are numeric values\nadded to the encoded pitch data to create the sounding\npitch. The diatonic element is also numeric and allows\nfor correct spelling of enharmonic transpositions.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the\ntransposition applies to all staves in the part. Per-staff\ntransposition is most often used in parts that represent\nmultiple instruments.",
      "element": "octave-change",
      "interface": "string"
    },
    {
      "//": "The slash-type and slash-dot elements are optional children\nof the beat-repeat and slash elements. They have the same\nvalues as the type and dot elements, and define what the\nbeat is for the display of repetition marks. If not present,\nthe beat is based on the current time signature.",
      "element": "slash-type",
      "interface": "string"
    },
    {
      "//": "The unpitched element indicates musical elements that are\nnotated on the staff but lack definite pitch, such as\nunpitched percussion and speaking voice. Like notes, it\nuses step and octave elements to indicate placement on the\nstaff, following the current clef. If percussion clef is\nused, the display-step and display-octave elements are\ninterpreted as if in treble clef, with a G in octave 4 on\nline 2. If not present, the note is placed on the middle\nline of the staff, generally used for a one-line staff.",
      "element": "display-step",
      "interface": "string"
    },
    {
      "//": "The unpitched element indicates musical elements that are\nnotated on the staff but lack definite pitch, such as\nunpitched percussion and speaking voice. Like notes, it\nuses step and octave elements to indicate placement on the\nstaff, following the current clef. If percussion clef is\nused, the display-step and display-octave elements are\ninterpreted as if in treble clef, with a G in octave 4 on\nline 2. If not present, the note is placed on the middle\nline of the staff, generally used for a one-line staff.",
      "element": "display-octave",
      "interface": "string"
    },
    {
      "//": "The bend element is used in guitar and tablature. The\nbend-alter element indicates the number of steps in the\nbend, similar to the alter element. As with the alter\nelement, numbers like 0.5 can be used to indicate\nmicrotones. Negative numbers indicate pre-bends or\nreleases; the pre-bend and release elements are used\nto distinguish what is intended. A with-bar element\nindicates that the bend is to be done at the bridge\nwith a whammy or vibrato bar. The content of the\nelement indicates how this should be notated.",
      "element": "bend-alter",
      "interface": "string"
    },
    {
      "//": "The hole element represents the symbols used for woodwind\nand brass fingerings as well as other notations. The content\nof the optional hole-type element indicates what the hole\nsymbol represents in terms of instrument fingering or other\ntechniques. The hole-closed element represents whether the\nhole is closed, open, or half-open. Valid element values are\nyes, no, and half. The optional location attribute indicates\nwhich portion of the hole is filled in when the element value\nis half. The optional hole-shape element indicates the shape\nof the hole symbol; the default is a circle.",
      "element": "hole-type",
      "interface": "string"
    },
    {
      "//": "The hole element represents the symbols used for woodwind\nand brass fingerings as well as other notations. The content\nof the optional hole-type element indicates what the hole\nsymbol represents in terms of instrument fingering or other\ntechniques. The hole-closed element represents whether the\nhole is closed, open, or half-open. Valid element values are\nyes, no, and half. The optional location attribute indicates\nwhich portion of the hole is filled in when the element value\nis half. The optional hole-shape element indicates the shape\nof the hole symbol; the default is a circle.",
      "element": "hole-shape",
      "interface": "string"
    },
    {
      "//": "The arrow element represents an arrow used for a musical\ntechnical indication. Straight arrows are represented with\nan arrow-direction element and an optional arrow-style\nelement. Circular arrows are represented with a\ncircular-arrow element. Descriptive values use Unicode\narrow terminology.\n\nValues for the arrow-direction element are left, up, right,\ndown, northwest, northeast, southeast, southwest, left right,\nup down, northwest southeast, northeast southwest, and other.\n\nValues for the arrow-style element are single, double,\nfilled, hollow, paired, combined, and other. Filled and\nhollow arrows indicate polygonal single arrows. Paired\narrows are duplicate single arrows in the same direction.\nCombined arrows apply to double direction arrows like\nleft right, indicating that an arrow in one direction\nshould be combined with an arrow in the other direction.\n\nValues for the circular-arrow element are clockwise and\nanticlockwise.",
      "element": "arrow-direction",
      "interface": "string"
    },
    {
      "//": "The arrow element represents an arrow used for a musical\ntechnical indication. Straight arrows are represented with\nan arrow-direction element and an optional arrow-style\nelement. Circular arrows are represented with a\ncircular-arrow element. Descriptive values use Unicode\narrow terminology.\n\nValues for the arrow-direction element are left, up, right,\ndown, northwest, northeast, southeast, southwest, left right,\nup down, northwest southeast, northeast southwest, and other.\n\nValues for the arrow-style element are single, double,\nfilled, hollow, paired, combined, and other. Filled and\nhollow arrows indicate polygonal single arrows. Paired\narrows are duplicate single arrows in the same direction.\nCombined arrows apply to double direction arrows like\nleft right, indicating that an arrow in one direction\nshould be combined with an arrow in the other direction.\n\nValues for the circular-arrow element are clockwise and\nanticlockwise.",
      "element": "arrow-style",
      "interface": "string"
    },
    {
      "//": "The arrow element represents an arrow used for a musical\ntechnical indication. Straight arrows are represented with\nan arrow-direction element and an optional arrow-style\nelement. Circular arrows are represented with a\ncircular-arrow element. Descriptive values use Unicode\narrow terminology.\n\nValues for the arrow-direction element are left, up, right,\ndown, northwest, northeast, southeast, southwest, left right,\nup down, northwest southeast, northeast southwest, and other.\n\nValues for the arrow-style element are single, double,\nfilled, hollow, paired, combined, and other. Filled and\nhollow arrows indicate polygonal single arrows. Paired\narrows are duplicate single arrows in the same direction.\nCombined arrows apply to double direction arrows like\nleft right, indicating that an arrow in one direction\nshould be combined with an arrow in the other direction.\n\nValues for the circular-arrow element are clockwise and\nanticlockwise.",
      "element": "circular-arrow",
      "interface": "string"
    },
    {
      "element": "beat-unit",
      "interface": "string"
    },
    {
      "element": "metronome-relation",
      "interface": "string"
    },
    {
      "element": "metronome-type",
      "interface": "string"
    },
    {
      "element": "pedal-step",
      "interface": "string"
    },
    {
      "element": "pedal-alter",
      "interface": "string"
    },
    {
      "element": "accordion-middle",
      "interface": "string"
    },
    {
      "//": "The glass element represents pictograms for glass\npercussion instruments. The one valid value is\nwind chimes.",
      "element": "glass",
      "interface": "string"
    },
    {
      "//": "The metal element represents pictograms for metal\npercussion instruments. Valid values are almglocken, bell,\nbell plate, brake drum, Chinese cymbal, cowbell,\ncrash cymbals, crotale, cymbal tongs, domed gong,\nfinger cymbals, flexatone, gong, hi-hat, high-hat cymbals,\nhandbell, sistrum, sizzle cymbal, sleigh bells,\nsuspended cymbal, tam tam, triangle, and Vietnamese hat.\nThe hi-hat value refers to a pictogram like Stone's\nhigh-hat cymbals, but without the long vertical line\nat the bottom.",
      "element": "metal",
      "interface": "string"
    },
    {
      "//": "The wood element represents pictograms for wood\npercussion instruments. Valid values are board clapper,\ncabasa, castanets, claves, guiro, log drum, maraca,\nmaracas, ratchet, sandpaper blocks, slit drum,\ntemple block, vibraslap, and wood block. The maraca\nand maracas values distinguish the one- and two-maraca\nversions of the pictogram. The castanets and vibraslap\nvalues are in addition to Stone's list.",
      "element": "wood",
      "interface": "string"
    },
    {
      "//": "The pitched element represents pictograms for pitched\npercussion instruments. Valid values are chimes,\nglockenspiel, mallet, marimba, tubular chimes, vibraphone,\nand xylophone. The chimes and tubular chimes values\ndistinguish the single-line and double-line versions of the\npictogram. The mallet value is in addition to Stone's list.",
      "element": "pitched",
      "interface": "string"
    },
    {
      "//": "The membrane element represents pictograms for membrane\npercussion instruments. Valid values are bass drum,\nbass drum on side, bongos, conga drum, goblet drum,\nmilitary drum, snare drum, snare drum snares off,\ntambourine, tenor drum, timbales, and tomtom. The\ngoblet drum value is in addition to Stone's list.",
      "element": "membrane",
      "interface": "string"
    },
    {
      "//": "The effect element represents pictograms for sound effect\npercussion instruments. Valid values are anvil, auto horn,\nbird whistle, cannon, duck call, gun shot, klaxon horn,\nlions roar, police whistle, siren, slide whistle,\nthunder sheet, wind machine, and wind whistle. The cannon\nvalue is in addition to Stone's list.",
      "element": "effect",
      "interface": "string"
    },
    {
      "element": "stick-type",
      "interface": "string"
    },
    {
      "element": "stick-material",
      "interface": "string"
    },
    {
      "//": "The stick-location element represents pictograms for the\nlocation of sticks, beaters, or mallets on cymbals, gongs,\ndrums, and other instruments. Valid values are center,\nrim, cymbal bell, and cymbal edge.",
      "element": "stick-location",
      "interface": "string"
    },
    {
      "//": "The other-percussion element represents percussion\npictograms not defined elsewhere.",
      "element": "other-percussion",
      "interface": "string"
    },
    {
      "element": "frame-strings",
      "interface": "string"
    },
    {
      "element": "frame-frets",
      "interface": "string"
    },
    {
      "//": "Works and movements are optionally identified by number\nand title. The work element also may indicate a link\nto the opus document that composes multiple movements\ninto a collection.",
      "element": "work-number",
      "interface": "string"
    },
    {
      "//": "Works and movements are optionally identified by number\nand title. The work element also may indicate a link\nto the opus document that composes multiple movements\ninto a collection.",
      "element": "work-title",
      "interface": "string"
    },
    {
      "//": "    Works and movements are optionally identified by number\nand title. The work element also may indicate a link\nto the opus document that composes multiple movements\ninto a collection.",
      "element": "movement-number",
      "interface": "string"
    },
    {
      "//": "    Works and movements are optionally identified by number\nand title. The work element also may indicate a link\nto the opus document that composes multiple movements\ninto a collection.",
      "element": "movement-title",
      "interface": "string"
    },
    {
      "element": "credit-type",
      "interface": "string",
      "//": "The credit-type element, new in Version 3.0, indicates the\npurpose behind a credit. Multiple types of data may be\ncombined in a single credit, so multiple elements may be\nused. Standard values include page number, title, subtitle,\ncomposer, arranger, lyricist, and rights."
    },
    {
      "//": "    The group element allows the use of different versions of\nthe part for different purposes. Typical values include\nscore, parts, sound, and data. Ordering information that is\ndirectly encoded in MuseData can be derived from the\nordering within a MusicXML score or opus.",
      "element": "group",
      "interface": "string"
    },
    {
      "element": "instrument-name",
      "interface": "string"
    },
    {
      "element": "instrument-abbreviation",
      "interface": "string"
    },
    {
      "element": "instrument-sound",
      "interface": "string"
    },
    {
      "element": "ensemble",
      "interface": "string"
    },
    {
      "element": "virtual-library",
      "interface": "string"
    },
    {
      "element": "virtual-name",
      "interface": "string"
    },
    {
      "//": "Calendar dates are represented yyyy-mm-dd format, following\nISO 8601.",
      "entity": "yyyy-mm-dd",
      "interface": {
        "year": "number",
        "month": "number",
        "day": "number"
      },
      "name": "CalendarDate",
      "auto": false
    },
    {
      "//": "The tenths entity is a number representing tenths of\ninterline space (positive or negative) for use in\nattributes. The layout-tenths entity is the same for\nuse in elements. Both integer and decimal values are\nallowed, such as 5 for a half space and 2.5 for a\nquarter space. Interline space is measured from the\nmiddle of a staff line.",
      "entity": "tenths",
      "interface": "number"
    },
    {
      "//": "The tenths entity is a number representing tenths of\ninterline space (positive or negative) for use in\nattributes. The layout-tenths entity is the same for\nuse in elements. Both integer and decimal values are\nallowed, such as 5 for a half space and 2.5 for a\nquarter space. Interline space is measured from the\nmiddle of a staff line.",
      "entity": "layout-tenths",
      "interface": "number"
    },
    {
      "//": "The start-stop and start-stop-continue entities are used\nfor musical elements that can either start or stop, such\nas slurs, tuplets, and wedges. The start-stop-continue\nentity is used when there is a need to refer to an\nintermediate point in the symbol, as for complex slurs\nor for specifying formatting of symbols across system\nbreaks. The start-stop-single entity is used when the same\nelement is used for multi-note and single-note notations,\nas for tremolos.\nThe values of start, stop, and continue refer to how an\nelement appears in musical score order, not in MusicXML\ndocument order. An element with a stop attribute may\nprecede the corresponding element with a start attribute\nwithin a MusicXML document. This is particularly common\nin multi-staff music. For example, the stopping point for\na slur may appear in staff 1 before the starting point for\nthe slur appears in staff 2 later in the document.",
      "entity": "start-stop",
      "enum": {
        "start": 0,
        "stop": 1
      },
      "auto": true
    },
    {
      "//": "The start-stop and start-stop-continue entities are used\nfor musical elements that can either start or stop, such\nas slurs, tuplets, and wedges. The start-stop-continue\nentity is used when there is a need to refer to an\nintermediate point in the symbol, as for complex slurs\nor for specifying formatting of symbols across system\nbreaks. The start-stop-single entity is used when the same\nelement is used for multi-note and single-note notations,\nas for tremolos.\nThe values of start, stop, and continue refer to how an\nelement appears in musical score order, not in MusicXML\ndocument order. An element with a stop attribute may\nprecede the corresponding element with a start attribute\nwithin a MusicXML document. This is particularly common\nin multi-staff music. For example, the stopping point for\na slur may appear in staff 1 before the starting point for\nthe slur appears in staff 2 later in the document.",
      "entity": "start-stop-continue",
      "enum": {
        "start": 0,
        "stop": 1,
        "continue": 2
      },
      "auto": true
    },
    {
      "//": "The start-stop and start-stop-continue entities are used\nfor musical elements that can either start or stop, such\nas slurs, tuplets, and wedges. The start-stop-continue\nentity is used when there is a need to refer to an\nintermediate point in the symbol, as for complex slurs\nor for specifying formatting of symbols across system\nbreaks. The start-stop-single entity is used when the same\nelement is used for multi-note and single-note notations,\nas for tremolos.\nThe values of start, stop, and continue refer to how an\nelement appears in musical score order, not in MusicXML\ndocument order. An element with a stop attribute may\nprecede the corresponding element with a start attribute\nwithin a MusicXML document. This is particularly common\nin multi-staff music. For example, the stopping point for\na slur may appear in staff 1 before the starting point for\nthe slur appears in staff 2 later in the document.",
      "entity": "start-stop-single",
      "enum": {
        "start": 0,
        "stop": 1,
        "single": 3
      },
      "auto": true
    },
    {
      "//": "The yes-no entity is used for boolean-like attributes.",
      "entity": "yes-no",
      "manualType": "enum"
    },
    {
      "//": "The yes-no-number entity is used for attributes that can\nbe either boolean or numeric values. Values can be \"yes\",\n\"no\", or numbers.",
      "entity": "yes-no-number",
      "interface": {
        "isYesNo": "__flag__",
        "yesNo": "yes-no",
        "num": "number"
      },
      "auto": false
    },
    {
      "//": "The symbol-size entity is used to indicate full vs.\ncue-sized vs. oversized symbols. The large value\nfor oversized symbols was added in version 1.1.",
      "entity": "symbol-size",
      "enum": {
        "unspecified": 0,
        "full": 1,
        "cue": 2,
        "large": 3
      },
      "auto": true
    },
    {
      "//": "The above-below type is used to indicate whether one\nelement appears above or below another element.",
      "entity": "above-below",
      "enum": {
        "unspecified": 0,
        "above": 1,
        "below": 2
      },
      "auto": true
    },
    {
      "entity": "over-under",
      "enum": {
        "unspecified": 0,
        "over": 1,
        "under": 2
      },
      "auto": true
    },
    {
      "//": "The up-down entity is used for arrow direction,\nindicating which way the tip is pointing.",
      "entity": "up-down",
      "enum": {
        "up": 0,
        "down": 1
      },
      "auto": true
    },
    {
      "//": "The top-bottom entity is used to indicate the top or\nbottom part of a vertical shape like non-arpeggiate.",
      "entity": "top-bottom",
      "enum": {
        "top": 0,
        "bottom": 1
      },
      "auto": true
    },
    {
      "//": "The left-right entity is used to indicate whether one\nelement appears to the left or the right of another\nelement.",
      "entity": "left-right",
      "enum": {
        "left": 0,
        "right": 1
      },
      "auto": true
    },
    {
      "//": "The number-of-lines entity is used to specify the\nnumber of lines in text decoration attributes.",
      "entity": "number-of-lines",
      "range": {
        "fromIncl": 0,
        "toIncl": 3
      },
      "auto": true
    },
    {
      "entity": "rotation",
      "range": {
        "fromIncl": -180,
        "toIncl": 180
      },
      "auto": true
    },
    {
      "//": "The enclosure-shape entity describes the shape and\npresence / absence of an enclosure around text. A bracket\nenclosure is similar to a rectangle with the bottom line\nmissing, as is common in jazz notation.",
      "entity": "enclosure-shape",
      "enum": {
        "rectangle": 0,
        "square": 1,
        "oval": 2,
        "circle": 3,
        "bracket": 4,
        "triangle": 5,
        "diamond": 6,
        "none": 7
      },
      "auto": true
    },
    {
      "entity": "normal-italic",
      "enum": {
        "normal": 0,
        "italic": 1
      },
      "auto": true
    },
    {
      "entity": "normal-bold",
      "enum": {
        "normal": 0,
        "bold": 2
      },
      "auto": true
    },
    {
      "//": "Slurs, tuplets, and many other features can be\nconcurrent and overlapping within a single musical\npart. The number-level attribute distinguishes up to\nsix concurrent objects of the same type. A reading\nprogram should be prepared to handle cases where\nthe number-levels stop in an arbitrary order.\nDifferent numbers are needed when the features\noverlap in MusicXML document order. When a number-level\nvalue is implied, the value is 1 by default.",
      "entity": "number-level",
      "range": {
        "fromIncl": 1,
        "toIncl": 6
      },
      "auto": true
    },
    {
      "//": "The MusicXML format supports eight levels of beaming, up\nto 1024th notes. Unlike the number-level attribute, the\nbeam-level attribute identifies concurrent beams in a beam\ngroup. It does not distinguish overlapping beams such as\ngrace notes within regular notes, or beams used in different\nvoices.",
      "entity": "beam-level",
      "range": {
        "fromIncl": 1,
        "toIncl": 8
      },
      "auto": true
    },
    {
      "//": "The position attributes are based on MuseData print\nsuggestions. For most elements, any program will compute\na default x and y position. The position attributes let\nthis be changed two ways.\nThe default-x and default-y attributes change the\ncomputation of the default position. For most elements,\nthe origin is changed relative to the left-hand side of\nthe note or the musical position within the bar (x) and\nthe top line of the staff (y).\n\n \nFor the following elements, the default-x value changes\nthe origin relative to the start of the current measure:\n\n    - note\n    - figured-bass\n    - harmony\n    - link\n    - directive\n    - measure-numbering\n    - all descendants of the part-list element\n    - all children of the direction-type element\n\nThis origin is from the start of the entire measure,\nat either the left barline or the start of the system.\n\nWhen the default-x attribute is used within a child element\nof the part-name-display, part-abbreviation-display,\ngroup-name-display, or group-abbreviation-display elements,\nit changes the origin relative to the start of the first\nmeasure on the system. These values are used when the current\nmeasure or a succeeding measure starts a new system. The same\nchange of origin is used for the group-symbol element.\n\nFor the note, figured-bass, and harmony elements, the\ndefault-x value is considered to have adjusted the musical\nposition within the bar for its descendant elements.\n\nSince the credit-words and credit-image elements are not\nrelated to a measure, in these cases the default-x and\ndefault-y attributes adjust the origin relative to the\nbottom left-hand corner of the specified page.\n\nThe relative-x and relative-y attributes change the position\nrelative to the default position, either as computed by the\nindividual program, or as overridden by the default-x and\ndefault-y attributes.\n\nPositive x is right, negative x is left; positive y is up,\nnegative y is down. All units are in tenths of interline\nspace. For stems, positive relative-y lengthens a stem\nwhile negative relative-y shortens it.\n\nThe default-x and default-y position attributes provide\nhigher-resolution positioning data than related features\nsuch as the placement attribute and the offset element.\nApplications reading a MusicXML file that can understand\nboth features should generally rely on the default-x and\ndefault-y attributes for their greater accuracy. For the\nrelative-x and relative-y attributes, the offset element,\nplacement attribute, and directive attribute provide\ncontext for the relative position information, so the two\nfeatures should be interpreted together.\n\nAs elsewhere in the MusicXML format, tenths are the global\ntenths defined by the scaling element, not the local tenths\nof a staff resized by the staff-size element.",
      "entity": "position",
      "interface": {
        "default-x": {
          "type": "tenths",
          "required": false,
          "std": null
        },
        "default-y": {
          "type": "tenths",
          "required": false,
          "std": null
        },
        "relative-x": {
          "type": "tenths",
          "required": false,
          "std": 0
        },
        "relative-y": {
          "type": "tenths",
          "required": false,
          "std": 0
        }
      },
      "auto": true
    },
    {
      "//": "The placement attribute indicates whether something is\nabove or below another element, such as a note or a\nnotation.",
      "entity": "placement",
      "interface": {
        "placement": {
          "type": "above-below",
          "required": false,
          "std": "AboveBelow.Unspecified"
        }
      },
      "auto": true
    },
    {
      "//": "The orientation attribute indicates whether slurs and\nties are overhand (tips down) or underhand (tips up).\nThis is distinct from the placement entity used by any\nnotation type.",
      "entity": "orientation",
      "interface": {
        "orientation": {
          "type": "over-under",
          "required": false,
          "std": "OverUnder.Unspecified"
        }
      },
      "auto": true
    },
    {
      "//": "The directive entity changes the default-x position\nof a direction. It indicates that the left-hand side of the\ndirection is aligned with the left-hand side of the time\nsignature. If no time signature is present, it is aligned\nwith the left-hand side of the first music notational\nelement in the measure. If a default-x, justify, or halign\nattribute is present, it overrides the directive entity.",
      "entity": "directive-entity",
      "interface": {
        "directive-entity": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      },
      "auto": true
    },
    {
      "//": "The bezier entity is used to indicate the curvature of\nslurs and ties, representing the control points for a\ncubic bezier curve. For ties, the bezier entity is\nused with the tied element.\nNormal slurs, S-shaped slurs, and ties need only two\nbezier points: one associated with the start of the slur\nor tie, the other with the stop. Complex slurs and slurs\ndivided over system breaks can specify additional\nbezier data at slur elements with a continue type.\n\nThe bezier-offset, bezier-x, and bezier-y attributes\ndescribe the outgoing bezier point for slurs and ties\nwith a start type, and the incoming bezier point for\nslurs and ties with types of stop or continue. The\nattributes bezier-offset2, bezier-x2, and bezier-y2\nare only valid with slurs of type continue, and\ndescribe the outgoing bezier point.\n\nThe bezier-offset and bezier-offset2 attributes are\nmeasured in terms of musical divisions, like the offset\nelement. These are the recommended attributes for\nspecifying horizontal position. The other attributes\nare specified in tenths, relative to any position\nsettings associated with the slur or tied element.",
      "entity": "bezier",
      "interface": {
        "bezier-offset": {
          "type": "number",
          "required": false,
          "std": null
        },
        "bezier-offset2": {
          "type": "number",
          "required": false,
          "std": null
        },
        "bezier-x": {
          "type": "tenths",
          "required": false,
          "std": null
        },
        "bezier-y": {
          "type": "tenths",
          "required": false,
          "std": null
        },
        "bezier-x2": {
          "type": "tenths",
          "required": false,
          "std": null
        },
        "bezier-y2": {
          "type": "tenths",
          "required": false,
          "std": null
        }
      },
      "auto": true
    },
    {
      "//": "The font entity gathers together attributes for\ndetermining the font within a directive or direction.\nThey are based on the text styles for Cascading\nStyle Sheets. The font-family is a comma-separated list\nof font names. These can be specific font styles such\nas Maestro or Opus, or one of several generic font styles:\nmusic, engraved, handwritten, text, serif, sans-serif,\nhandwritten, cursive, fantasy, and monospace. The music,\nengraved, and handwritten values refer to music fonts;\nthe rest refer to text fonts. The fantasy style refers to\ndecorative text such as found in older German-style\nprinting. The font-style can be normal or italic. The\nfont-size can be one of the CSS sizes (xx-small, x-small,\nsmall, medium, large, x-large, xx-large) or a numeric\npoint size. The font-weight can be normal or bold. The\ndefault is application-dependent, but is a text font vs.\na music font.",
      "entity": "font",
      "interface": {
        "font-family": {
          "type": "string",
          "required": false,
          "std": "Alegreya, serif"
        },
        "font-style": {
          "type": "normal-italic",
          "required": false,
          "std": "NormalItalic.Normal"
        },
        "font-size": {
          "type": "string",
          "required": false,
          "std": "small"
        },
        "font-weight": {
          "type": "normal-bold",
          "required": false,
          "std": "NormalBold.Normal"
        }
      },
      "auto": true
    },
    {
      "entity": "left-center-right",
      "enum": {
        "left": 0,
        "right": 1,
        "center": 2
      },
      "auto": true
    },
    {
      "entity": "top-middle-bottom-baseline",
      "enum": {
        "top": 0,
        "middle": 1,
        "bottom": 2,
        "baseline": 3
      },
      "auto": true
    },
    {
      "entity": "direction-mode",
      "enum": {
        "ltr": 0,
        "rtl": 1,
        "lro": 2,
        "rlo": 3
      },
      "auto": true
    },
    {
      "entity": "straight-curved",
      "enum": {
        "straight": 0,
        "curved": 1
      },
      "auto": true
    },
    {
      "entity": "solid-dashed-dotted-wavy",
      "enum": {
        "solid": 0,
        "dashed": 1,
        "dotted": 2,
        "wavy": 3
      },
      "auto": true
    },
    {
      "entity": "normal-angled-square",
      "enum": {
        "normal": 0,
        "angled": 1,
        "square": 2
      },
      "auto": true
    },
    {
      "entity": "upright-inverted",
      "enum": {
        "upright": 0,
        "inverted": 1
      },
      "auto": true
    },
    {
      "entity": "upper-main-below",
      "enum": {
        "upper": 0,
        "main": 1,
        "below": 2
      },
      "auto": true
    },
    {
      "entity": "whole-half-unison",
      "enum": {
        "whole": 0,
        "half": 1,
        "unison": 2
      },
      "auto": true
    },
    {
      "entity": "whole-half-none",
      "enum": {
        "whole": 0,
        "half": 1,
        "none": 3
      },
      "auto": true
    },
    {
      "//": "The color entity indicates the color of an element.\nColor may be represented as hexadecimal RGB triples,\nas in HTML, or as hexadecimal ARGB tuples, with the\nA indicating alpha of transparency. An alpha value\nof 00 is totally transparent; FF is totally opaque.\nIf RGB is used, the A value is assumed to be FF.\nFor instance, the RGB value \"#800080\" represents\npurple. An ARGB value of \"#40800080\" would be a\ntransparent purple.\n \n \nAs in SVG 1.1, colors are defined in terms of the \nsRGB color space (IEC 61966).",
      "entity": "color",
      "interface": {
        "color": {
          "type": "string",
          "required": false,
          "std": "#000000"
        }
      },
      "auto": true
    },
    {
      "//": "The text-decoration entity is based on the similar\nfeature in XHTML and CSS. It allows for text to\nbe underlined, overlined, or struck-through. It\nextends the CSS version by allow double or\ntriple lines instead of just being on or off.",
      "entity": "text-decoration",
      "interface": {
        "underline": {
          "type": "number-of-lines",
          "required": false,
          "std": 0
        },
        "overline": {
          "type": "number-of-lines",
          "required": false,
          "std": 0
        },
        "line-through": {
          "type": "number-of-lines",
          "required": false,
          "std": 0
        }
      },
      "auto": true
    },
    {
      "//": "The justify entity is used to indicate left, center, or\nright justification. The default value varies for different\nelements. For elements where the justify attribute is present\nbut the halign attribute is not, the justify attribute\nindicates horizontal alignment as well as justification.",
      "entity": "justify",
      "interface": {
        "justify": {
          "type": "left-center-right",
          "required": false,
          "std": "LeftCenterRight.Left"
        }
      },
      "auto": true
    },
    {
      "//": "In cases where text extends over more than one line,\nhorizontal alignment and justify values can be different.\nThe most typical case is for credits, such as:\nWords and music by\n  Pat Songwriter\n \n \nTypically this type of credit is aligned to the right, \nso that the position information refers to the right- \nmost part of the text. But in this example, the text \nis center-justified, not right-justified.  \n \nThe halign attribute is used in these situations. If it \nis not present, its value is the same as for the justify \nattribute.",
      "entity": "halign",
      "interface": {
        "halign": {
          "type": "left-center-right",
          "required": false,
          "std": "delegate () { static if (__traits(compiles, justify)) return justify; else return LeftCenterRight.Left; }()",
          "std.ts": "((<any>ret).justify || LeftCenterRight.Left)"
        }
      },
      "virtual": true,
      "auto": true
    },
    {
      "//": "The valign entity is used to indicate vertical\nalignment to the top, middle, bottom, or baseline\nof the text. Defaults are implementation-dependent.",
      "entity": "valign",
      "interface": {
        "valign": {
          "type": "top-middle-bottom-baseline",
          "required": false,
          "std": "TopMiddleBottomBaseline.Bottom"
        }
      },
      "auto": true
    },
    {
      "//": "The valign-image entity is used to indicate vertical\nalignment for images and graphics, so it removes the\nbaseline value. Defaults are implementation-dependent.",
      "entity": "valign-image",
      "interface": {
        "valign-image": {
          "type": "top-middle-bottom-baseline",
          "required": false,
          "std": "TopMiddleBottomBaseline.Bottom"
        }
      },
      "auto": true
    },
    {
      "//": "The letter-spacing entity specifies text tracking.\nValues are either \"normal\" or a number representing\nthe number of ems to add between each letter. The\nnumber may be negative in order to subtract space.\nThe default is normal, which allows flexibility of\nletter-spacing for purposes of text justification.",
      "entity": "letter-spacing",
      "interface": {
        "letter-spacing": {
          "type": "string",
          "required": false,
          "std": "normal"
        }
      },
      "auto": true
    },
    {
      "//": "The line-height entity specified text leading. Values\nare either \"normal\" or a number representing the\npercentage of the current font height  to use for\nleading. The default is \"normal\". The exact normal\nvalue is implementation-dependent, but values\nbetween 100 and 120 are recommended.",
      "entity": "line-height",
      "interface": {
        "line-height": {
          "type": "string",
          "required": false,
          "std": "normal"
        }
      },
      "auto": true
    },
    {
      "//": "The text-direction entity is used to adjust and override\nthe Unicode bidirectional text algorithm, similar to the\nW3C Internationalization Tag Set recommendation. Values\nare ltr (left-to-right embed), rtl (right-to-left embed),\nlro (left-to-right bidi-override), and rlo (right-to-left\nbidi-override). The default value is ltr. This entity\nis typically used by applications that store text in\nleft-to-right visual order rather than logical order.\nSuch applications can use the lro value to better\ncommunicate with other applications that more fully\nsupport bidirectional text.",
      "entity": "text-direction",
      "interface": {
        "dir": {
          "type": "direction-mode",
          "required": false,
          "std": "DirectionMode.Ltr"
        }
      },
      "auto": true
    },
    {
      "//": "The text-rotation entity is used to rotate text\naround the alignment point specified by the\nhalign and valign entities. The value is a number\nranging from -180 to 180. Positive values are\nclockwise rotations, while negative values are\ncounter-clockwise rotations.",
      "entity": "text-rotation",
      "interface": {
        "rotation": {
          "type": "rotation",
          "required": false,
          "std": 0
        }
      },
      "auto": true
    },
    {
      "//": "The enclosure entity is used to specify the\nformatting of an enclosure around text or symbols.",
      "entity": "enclosure",
      "interface": {
        "enclosure": {
          "type": "enclosure-shape",
          "required": false,
          "std": "EnclosureShape.None"
        }
      },
      "auto": true
    },
    {
      "//": "The print-style entity groups together the most popular\ncombination of printing attributes: position, font, and\ncolor.",
      "entity": "print-style",
      "interface": {
        "_extends": [
          "position",
          "font",
          "color"
        ]
      },
      "auto": true
    },
    {
      "//": "The print-style-align entity adds the halign and valign\nattributes to the position, font, and color attributes.",
      "entity": "print-style-align",
      "interface": {
        "_extends": [
          "print-style",
          "halign",
          "valign"
        ]
      },
      "virtual": true,
      "auto": true
    },
    {
      "//": "The line-shape entity is used to distinguish between\nstraight and curved lines. The line-type entity\ndistinguishes between solid, dashed, dotted, and\nwavy lines.",
      "entity": "line-shape",
      "interface": {
        "line-shape": {
          "type": "straight-curved",
          "required": false,
          "std": "StraightCurved.Straight"
        }
      },
      "auto": true
    },
    {
      "//": "The line-shape entity is used to distinguish between\nstraight and curved lines. The line-type entity\ndistinguishes between solid, dashed, dotted, and\nwavy lines.",
      "entity": "line-type",
      "interface": {
        "line-type": {
          "type": "solid-dashed-dotted-wavy",
          "required": false,
          "std": "SolidDashedDottedWavy.Solid"
        }
      },
      "auto": false
    },
    {
      "//": "The dashed-formatting entity represents the length of\ndashes and spaces in a dashed line. Both the dash-length\nand space-length attributes are represented in tenths.\nThese attributes are ignored if the corresponding\nline-type attribute is not dashed.",
      "entity": "dashed-formatting",
      "interface": {
        "dash-length": {
          "type": "tenths",
          "required": false,
          "std": 1
        },
        "space-length": {
          "type": "tenths",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "The printout entity is based on MuseData print\nsuggestions. They allow a way to specify not to print\nprint an object (e.g. note or rest), its augmentation\ndots, or its lyrics. This is especially useful for notes\nthat overlap in different voices, or for chord sheets\nthat contain lyrics and chords but no melody. For wholly\ninvisible notes, such as those providing sound-only data,\nthe attribute for print-spacing may be set to no so that\nno space is left for this note. The print-spacing value\nis only used if no note, dot, or lyric is being printed.\nBy default, all these attributes are set to yes. If\nprint-object is set to no, print-dot and print-lyric are\ninterpreted to also be set to no if they are not present.",
      "entity": "print-object",
      "interface": {
        "print-object": {
          "type": "yes-no",
          "required": false,
          "std": true
        }
      },
      "auto": true
    },
    {
      "//": "The printout entity is based on MuseData print\nsuggestions. They allow a way to specify not to print\nprint an object (e.g. note or rest), its augmentation\ndots, or its lyrics. This is especially useful for notes\nthat overlap in different voices, or for chord sheets\nthat contain lyrics and chords but no melody. For wholly\ninvisible notes, such as those providing sound-only data,\nthe attribute for print-spacing may be set to no so that\nno space is left for this note. The print-spacing value\nis only used if no note, dot, or lyric is being printed.\nBy default, all these attributes are set to yes. If\nprint-object is set to no, print-dot and print-lyric are\ninterpreted to also be set to no if they are not present.",
      "entity": "print-spacing",
      "interface": {
        "print-spacing": {
          "type": "yes-no",
          "required": false,
          "std": true
        }
      },
      "auto": true
    },
    {
      "//": "The printout entity is based on MuseData print\nsuggestions. They allow a way to specify not to print\nprint an object (e.g. note or rest), its augmentation\ndots, or its lyrics. This is especially useful for notes\nthat overlap in different voices, or for chord sheets\nthat contain lyrics and chords but no melody. For wholly\ninvisible notes, such as those providing sound-only data,\nthe attribute for print-spacing may be set to no so that\nno space is left for this note. The print-spacing value\nis only used if no note, dot, or lyric is being printed.\nBy default, all these attributes are set to yes. If\nprint-object is set to no, print-dot and print-lyric are\ninterpreted to also be set to no if they are not present.",
      "entity": "printout",
      "interface": {
        "_extends": [
          "print-object",
          "print-spacing"
        ],
        "print-dot": {
          "type": "yes-no",
          "required": false
        },
        "print-lyric": {
          "type": "yes-no",
          "required": false
        }
      },
      "auto": false
    },
    {
      "//": "The text-formatting entity contains the common formatting\nattributes for text elements. Default values may differ\nacross the elements that use this entity.",
      "entity": "text-formatting",
      "interface": {
        "_extends": [
          "justify",
          "print-style-align",
          "text-decoration",
          "text-rotation",
          "letter-spacing",
          "line-height",
          "text-direction",
          "enclosure"
        ]
      },
      "auto": true
    },
    {
      "//": "The level-display entity allows specification of three\ncommon ways to indicate editorial indications: putting\nparentheses or square brackets around a symbol, or making\nthe symbol a different size. If not specified, they are\nleft to application defaults. It is used by the level and\naccidental elements.",
      "entity": "level-display",
      "interface": {
        "parentheses": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "bracket": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "size": {
          "type": "symbol-size",
          "required": false,
          "std": "SymbolSize.Unspecified"
        }
      },
      "auto": true
    },
    {
      "//": "The trill-sound entity includes attributes used to guide\nthe sound of trills, mordents, turns, shakes, and wavy\nlines, based on MuseData sound suggestions. The default\nchoices are:\n\nstart-note = \"upper\"\n\ntrill-step = \"whole\"        two-note-turn = \"none\"\n\naccelerate = \"no\"        beats = \"4\" (minimum of \"2\").\n\nSecond-beat and last-beat are percentages for landing on\nthe indicated beat, with defaults of 25 and 75 respectively.\n\nFor mordent and inverted-mordent elements, the defaults\nare different:\n\nThe default start-note is \"main\", not \"upper\".\nThe default for beats is \"3\", not \"4\".\nThe default for second-beat is \"12\", not \"25\".\nThe default for last-beat is \"24\", not \"75\".",
      "entity": "trill-sound",
      "interface": {
        "start-note": {
          "type": "upper-main-below",
          "required": false,
          "std": "UpperMainBelow.Upper"
        },
        "trill-step": {
          "type": "whole-half-unison",
          "required": false,
          "std": "WholeHalfUnison.Whole"
        },
        "two-note-turn": {
          "type": "whole-half-none",
          "required": false,
          "std": "WholeHalfNone.None"
        },
        "accelerate": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "beats": {
          "type": "number",
          "required": false,
          "std": 4
        },
        "second-beat": {
          "type": "number",
          "required": false,
          "std": 25
        },
        "last-beat": {
          "type": "number",
          "required": false,
          "std": 75
        }
      },
      "auto": true
    },
    {
      "//": "The bend-sound entity is used for bend and slide elements,\nand is similar to the trill-sound. Here the beats element\nrefers to the number of discrete elements (like MIDI pitch\nbends) used to represent a continuous bend or slide. The\nfirst-beat indicates the percentage of the direction for\nstarting a bend; the last-beat the percentage for ending it.\nThe default choices are:\n\naccelerate = \"no\"\n\nbeats = \"4\" (minimum of \"2\")\nfirst-beat = \"25\"\n\nlast-beat = \"75\"",
      "entity": "bend-sound",
      "interface": {
        "accelerate": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "beats": {
          "type": "number",
          "required": false,
          "std": 4
        },
        "second-beat": {
          "type": "number",
          "required": false,
          "std": 25
        },
        "last-beat": {
          "type": "number",
          "required": false,
          "std": 75
        }
      },
      "auto": true
    },
    {
      "//": "The time-only entity is used to indicate that a particular\nplayback-related element only applies particular times through\na repeated section.",
      "entity": "time-only",
      "interface": {
        "time-only": {
          "type": "string",
          "required": false,
          "//": "The value is a comma-separated list of\npositive integers arranged in ascending order, indicating which\ntimes through the repeated section that the element applies."
        }
      },
      "auto": true
    },
    {
      "//": "The document-attributes entity is used to specify the\nattributes for an entire MusicXML document. Currently\nthis is used for the version attribute.",
      "entity": "document-attributes",
      "interface": {
        "version": {
          "type": "string",
          "std": "1.0",
          "//": "The version attribute was added in Version 1.1 for the\nscore-partwise and score-timewise documents, and in\nVersion 2.0 for opus documents. It provides an easier\nway to get version information than through the MusicXML\npublic ID. The default value is 1.0 to make it possible\nfor programs that handle later versions to distinguish\nearlier version files reliably. Programs that write\nMusicXML 1.1 or 2.0 files should set this attribute."
        }
      },
      "auto": true
    },
    {
      "//": "Two entities for editorial information in notes. These\nentities, and their elements defined below, are used\nacross all the different component DTD modules.",
      "entity": "editorial",
      "interface": {
        "<footnote>": {
          "required": false,
          "idx": 0
        },
        "<level>": {
          "required": false,
          "idx": 1
        }
      },
      "auto": true
    },
    {
      "//": "Two entities for editorial information in notes. These\nentities, and their elements defined below, are used\nacross all the different component DTD modules.",
      "entity": "editorial-voice",
      "interface": {
        "<footnote>": {
          "required": false,
          "idx": 0
        },
        "<level>": {
          "required": false,
          "idx": 1
        },
        "<voice>": {
          "required": false,
          "idx": 2
        }
      },
      "auto": true
    },
    {
      "//": "Footnote and level are used to specify editorial\ninformation, while voice is used to distinguish between\nmultiple voices (what MuseData calls tracks) in individual\nparts. These elements are used throughout the different\nMusicXML DTD modules. If the reference attribute for the\nlevel element is yes, this indicates editorial information\nthat is for display only and should not affect playback.\nFor instance, a modern edition of older music may set\nreference=\"yes\" on the attributes containing the music's\noriginal clef, key, and time signature. It is no by default.",
      "element": "footnote",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "text": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "Footnote and level are used to specify editorial\ninformation, while voice is used to distinguish between\nmultiple voices (what MuseData calls tracks) in individual\nparts. These elements are used throughout the different\nMusicXML DTD modules. If the reference attribute for the\nlevel element is yes, this indicates editorial information\nthat is for display only and should not affect playback.\nFor instance, a modern edition of older music may set\nreference=\"yes\" on the attributes containing the music's\noriginal clef, key, and time signature. It is no by default.",
      "element": "level",
      "interface": {
        "_extends": [
          "level-display"
        ],
        "reference": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "text": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "Fermata and wavy-line elements can be applied both to\nnotes and to measures, so they are defined here. Wavy\nlines are one way to indicate trills; when used with a\nmeasure element, they should always have type=\"continue\"\n\nset. The fermata text content represents the shape of the\nfermata sign and may be normal, angled, or square.\nAn empty fermata element represents a normal fermata.\nThe fermata type is upright if not specified.",
      "element": "fermata",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "shape": {
          "child": true,
          "type": "normal-angled-square",
          "std": "NormalAngledSquare.Normal"
        },
        "type": {
          "type": "upright-inverted",
          "required": false,
          "std": "UprightInverted.Upright"
        }
      },
      "auto": true
    },
    {
      "//": "Fermata and wavy-line elements can be applied both to\nnotes and to measures, so they are defined here. Wavy\nlines are one way to indicate trills; when used with a\nmeasure element, they should always have type=\"continue\"\n\nset. The fermata text content represents the shape of the\nfermata sign and may be normal, angled, or square.\nAn empty fermata element represents a normal fermata.\nThe fermata type is upright if not specified.",
      "element": "wavy-line",
      "interface": {
        "_extends": [
          "position",
          "placement",
          "color",
          "trill-sound"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": true
        },
        "number": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      },
      "empty": true,
      "auto": true
    },
    {
      "//": "Staff assignment is only needed for music notated on\nmultiple staves. Used by both notes and directions.",
      "element": "staff",
      "interface": {
        "idx": {
          "child": true,
          "type": "number",
          "//": "Staff values are numbers, with 1 referring to the top-most staff\nin a part."
        }
      },
      "auto": true
    },
    {
      "//": "Segno and coda signs can be associated with a measure\nor a general musical direction. These are visual\nindicators only; a sound element is needed to guide\nplayback applications reliably.",
      "element": "segno",
      "interface": {
        "_extends": [
          "print-style-align"
        ]
      },
      "empty": true,
      "auto": true
    },
    {
      "//": "Segno and coda signs can be associated with a measure\nor a general musical direction. These are visual\nindicators only; a sound element is needed to guide\nplayback applications reliably.",
      "element": "coda",
      "interface": {
        "_extends": [
          "print-style-align"
        ]
      },
      "empty": true,
      "auto": true
    },
    {
      "//": "These elements are used both in the time-modification and\nmetronome-tuplet elements. The actual-notes element\ndescribes how many notes are played in the time usually\noccupied by the number of normal-notes. If the normal-notes\ntype is different than the current note type (e.g., a\nquarter note within an eighth note triplet), then the\nnormal-notes type (e.g. eighth) is specified in the\nnormal-type and normal-dot elements. The content of the\nactual-notes and normal-notes elements ia a non-negative\ninteger.",
      "element": "actual-notes",
      "interface": {
        "count": {
          "child": true,
          "type": "number"
        }
      },
      "auto": true
    },
    {
      "//": "These elements are used both in the time-modification and\nmetronome-tuplet elements. The actual-notes element\ndescribes how many notes are played in the time usually\noccupied by the number of normal-notes. If the normal-notes\ntype is different than the current note type (e.g., a\nquarter note within an eighth note triplet), then the\nnormal-notes type (e.g. eighth) is specified in the\nnormal-type and normal-dot elements. The content of the\nactual-notes and normal-notes elements ia a non-negative\ninteger.",
      "element": "normal-notes",
      "interface": {
        "count": {
          "child": true,
          "type": "number"
        }
      },
      "auto": true
    },
    {
      "//": "These elements are used both in the time-modification and\nmetronome-tuplet elements. The actual-notes element\ndescribes how many notes are played in the time usually\noccupied by the number of normal-notes. If the normal-notes\ntype is different than the current note type (e.g., a\nquarter note within an eighth note triplet), then the\nnormal-notes type (e.g. eighth) is specified in the\nnormal-type and normal-dot elements. The content of the\nactual-notes and normal-notes elements ia a non-negative\ninteger.",
      "element": "normal-dot",
      "interface": {},
      "empty": true,
      "auto": true
    },
    {
      "//": "Dynamics can be associated either with a note or a general\nmusical direction. To avoid inconsistencies between and\namongst the letter abbreviations for dynamics (what is sf\nvs. sfz, standing alone or with a trailing dynamic that is\nnot always piano), we use the actual letters as the names\nof these dynamic elements. The other-dynamics element\nallows other dynamic marks that are not covered here, but\nmany of those should perhaps be included in a more general\nmusical direction element. Dynamics may also be combined as\nin <sf/><mp/>.\n\nThese letter dynamic symbols are separated from crescendo,\ndecrescendo, and wedge indications. Dynamic representation\nis inconsistent in scores. Many things are assumed by the\ncomposer and left out, such as returns to original dynamics.\nSystematic representations are quite complex: for example,\nHumdrum has at least 3 representation formats related to\ndynamics. The MusicXML format captures what is in the score,\nbut does not try to be optimal for analysis or synthesis of\ndynamics.",
      "element": "dynamics",
      "interface": {
        "_extends": [
          "print-style-align",
          "placement",
          "text-decoration",
          "enclosure"
        ],
        "<p>": "__flag__",
        "<pp>": "__flag__",
        "<ppp>": "__flag__",
        "<pppp>": "__flag__",
        "<ppppp>": "__flag__",
        "<pppppp>": "__flag__",
        "<f>": "__flag__",
        "<ff>": "__flag__",
        "<fff>": "__flag__",
        "<ffff>": "__flag__",
        "<fffff>": "__flag__",
        "<ffffff>": "__flag__",
        "<mp>": "__flag__",
        "<mf>": "__flag__",
        "<sf>": "__flag__",
        "<sfp>": "__flag__",
        "<sfpp>": "__flag__",
        "<fp>": "__flag__",
        "<rf>": "__flag__",
        "<rfz>": "__flag__",
        "<sfz>": "__flag__",
        "<sffz>": "__flag__",
        "<fz>": "__flag__",
        "<other-dynamics>": {
          "required": false
        }
      },
      "auto": true
    },
    {
      "//": "Fingering is typically indicated 1,2,3,4,5. Multiple\nfingerings may be given, typically to substitute\nfingerings in the middle of a note. The substitution\nand alternate values are \"no\" if the attribute is\nnot present. For guitar and other fretted instruments,\nthe fingering element represents the fretting finger;\nthe pluck element represents the plucking finger.",
      "element": "fingering",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "substitution": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "alternate": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "finger": {
          "child": true,
          "type": "number"
        }
      },
      "auto": true
    },
    {
      "//": "Fret and string are used with tablature notation and chord\nsymbols. Fret numbers start with 0 for an open string and\n1 for the first fret. String numbers start with 1 for the\nhighest string. The string element can also be used in\nregular notation.",
      "element": "fret",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "fret": {
          "child": true,
          "type": "number"
        }
      },
      "auto": true
    },
    {
      "//": "Fret and string are used with tablature notation and chord\nsymbols. Fret numbers start with 0 for an open string and\n1 for the first fret. String numbers start with 1 for the\nhighest string. The string element can also be used in\nregular notation.",
      "element": "string",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "stringNum": {
          "child": true,
          "type": "number"
        }
      },
      "auto": true
    },
    {
      "//": "The tuning-step, tuning-alter, and tuning-octave elements\nare represented like the step, alter, and octave elements,\nwith different names to reflect their different function.\nThey are used in the staff-tuning and accord elements.",
      "element": "tuning-alter",
      "interface": {
        "step": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "The tuning-step, tuning-alter, and tuning-octave elements\nare represented like the step, alter, and octave elements,\nwith different names to reflect their different function.\nThey are used in the staff-tuning and accord elements.",
      "element": "tuning-octave",
      "interface": {
        "step": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "The display-text element is used for exact formatting of\nmulti-font text in element in display elements such as\npart-name-display. Language is Italian (\"it\") by default.\nEnclosure is none by default.",
      "element": "display-text",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "text": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "The accidental-text element is used for exact formatting of\naccidentals in display elements such as part-name-display.\nValues are the same as for the accidental element.\nEnclosure is none by default.",
      "element": "accidental-text",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "text": {
          "child": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "The part-name-display and part-abbreviation-display\nelements are used in both the score.mod and direction.mod\nfiles. They allow more precise control of how part names\nand abbreviations appear throughout a score. The\nprint-object attributes can be used to determine what,\nif anything, is printed at the start of each system.\nFormatting specified in the part-name-display and\npart-abbreviation-display elements override the formatting\nspecified in the part-name and part-abbreviation elements,\nrespectively.",
      "element": "part-name-display",
      "interface": {
        "_extends": [
          "print-object"
        ],
        "name": {
          "child": true,
          "type": "TextArray"
        }
      },
      "auto": false
    },
    {
      "//": "The part-name-display and part-abbreviation-display\nelements are used in both the score.mod and direction.mod\nfiles. They allow more precise control of how part names\nand abbreviations appear throughout a score. The\nprint-object attributes can be used to determine what,\nif anything, is printed at the start of each system.\nFormatting specified in the part-name-display and\npart-abbreviation-display elements override the formatting\nspecified in the part-name and part-abbreviation elements,\nrespectively.",
      "element": "part-abbreviation-display",
      "interface": {
        "_extends": [
          "print-object"
        ],
        "name": {
          "child": true,
          "type": "TextArray"
        }
      },
      "auto": false
    },
    {
      "//": "The midi-device content corresponds to the DeviceName\nmeta event in Standard MIDI Files. The optional port\nattribute is a number from 1 to 16 that can be used\nwith the unofficial MIDI port (or cable) meta event.\nUnlike the DeviceName meta event, there can be\nmultiple midi-device elements per MusicXML part\nstarting in MusicXML 3.0. The optional id attribute\nrefers to the score-instrument assigned to this\ndevice. If missing, the device assignment affects\nall score-instrument elements in the score-part.",
      "element": "midi-device",
      "interface": {
        "port": {
          "type": "number",
          "required": false,
          "std": null
        },
        "id": {
          "type": "number",
          "required": false,
          "std": null
        },
        "deviceName": {
          "child": true,
          "type": "string",
          "std": ""
        }
      },
      "auto": true
    },
    {
      "//": "MIDI 1.0 channel numbers range from 1 to 16.",
      "element": "midi-channel",
      "range": {
        "fromIncl": 1,
        "toIncl": 16
      },
      "auto": true
    },
    {
      "//": " midi 1.0 bank numbers range from 1 to 16,384. ",
      "element": "midi-bank",
      "range": {
        "fromIncl": 1,
        "toIncl": 16384
      },
      "auto": true
    },
    {
      "//": " MIDI 1.0 program numbers range from 1 to 128. ",
      "element": "midi-program",
      "range": {
        "fromIncl": 1,
        "toIncl": 128
      },
      "auto": true
    },
    {
      "//": "For unpitched instruments, specify a MIDI 1.0 note number\nranging from 1 to 128. It is usually used with MIDI banks for\npercussion. Note that MIDI 1.0 note numbers are generally\nspecified from 0 to 127 rather than the 1 to 128 numbering\nused in this element.",
      "element": "midi-unpitched",
      "range": {
        "fromIncl": 1,
        "toIncl": 128
      },
      "auto": true
    },
    {
      "//": "The volume value is a percentage of the maximum\nranging from 0 to 100, with decimal values allowed.\nThis corresponds to a scaling value for the MIDI 1.0\nchannel volume controller.",
      "element": "volume",
      "range": {
        "fromIncl": 1,
        "toIncl": 100
      },
      "auto": true
    },
    {
      "//": "Pan and elevation allow placing of sound in a 3-D space\nrelative to the listener. Both are expressed in degrees\nranging from -180 to 180. For pan, 0 is straight ahead,\n-90 is hard left, 90 is hard right, and -180 and 180\nare directly behind the listener. For elevation, 0 is\nlevel with the listener, 90 is directly above, and -90\nis directly below.",
      "element": "pan",
      "range": {
        "fromIncl": -180,
        "toIncl": 180
      },
      "auto": true
    },
    {
      "//": "Pan and elevation allow placing of sound in a 3-D space\nrelative to the listener. Both are expressed in degrees\nranging from -180 to 180. For pan, 0 is straight ahead,\n-90 is hard left, 90 is hard right, and -180 and 180\nare directly behind the listener. For elevation, 0 is\nlevel with the listener, 90 is directly above, and -90\nis directly below.",
      "element": "elevation",
      "range": {
        "fromIncl": -180,
        "toIncl": 180
      },
      "auto": true
    },
    {
      "//": "The midi-instrument element can be a part of either\nthe score-instrument element at the start of a part,\nor the sound element within a part. The id attribute\nrefers to the score-instrument affected by the change.",
      "element": "midi-instrument",
      "interface": {
        "id": {
          "type": "string",
          "required": true
        },
        "<midi-channel>": {
          "required": false,
          "idx": 0
        },
        "<midi-name>": {
          "type": "string",
          "required": false,
          "idx": 1
        },
        "<midi-bank>": {
          "required": false,
          "idx": 2
        },
        "<midi-program>": {
          "required": false,
          "idx": 3
        },
        "<midi-unpitched>": {
          "required": false,
          "idx": 4
        },
        "<volume>": {
          "required": false,
          "idx": 5
        },
        "<pan>": {
          "required": false,
          "idx": 6
        },
        "<elevation>": {
          "required": false,
          "idx": 7
        }
      },
      "auto": true
    },
    {
      "//": "The play element, new in Version 3.0, specifies playback\ntechniques to be used in conjunction with the instrument-sound\nelement. When used as part of a sound element, it applies to\nall notes going forward in score order. In multi-instrument\nparts, the affected instrument should be specified using the\nid attribute. When used as part of a note element, it applies\nto the current note only.",
      "element": "play",
      "ordered": false,
      "interface": {
        "<ipa>": {
          "type": "string",
          "required": false,
          "idx": 0
        },
        "<mute>": {
          "type": "string",
          "required": false,
          "idx": 1
        },
        "<semi-pitched>": {
          "type": "string",
          "required": false,
          "idx": 2
        },
        "<other-play>": {
          "type": "string",
          "required": false,
          "idx": 3
        }
      },
      "auto": true
    },
    {
      "element": "millimeters",
      "interface": "number",
      "auto": true,
      "//": "A width, in mm. Most widths are in terms of \"tenths\" rather than millimeters."
    },
    {
      "//": "Margins, page sizes, and distances are all measured in\ntenths to keep MusicXML data in a consistent coordinate\nsystem as much as possible. The translation to absolute\nunits is done in the scaling element, which specifies\nhow many millimeters are equal to how many tenths. For\na staff height of 7 mm, millimeters would be set to 7\nwhile tenths is set to 40. The ability to set a formula\nrather than a single scaling factor helps avoid roundoff\nerrors.",
      "element": "scaling",
      "interface": {
        "<millimeters>": {
          "required": false
        },
        "<tenths>": {
          "required": false
        }
      },
      "auto": true
    },
    {
      "//": "Margin elements are included within many of the larger\nlayout elements.",
      "element": "left-margin",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Margin elements are included within many of the larger\nlayout elements.",
      "element": "right-margin",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Margin elements are included within many of the larger\nlayout elements.",
      "element": "top-margin",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Margin elements are included within many of the larger\nlayout elements.",
      "element": "bottom-margin",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Page layout can be defined both in score-wide defaults\nand in the print element. Page margins are specified either\nfor both even and odd pages, or via separate odd and even\npage number values. The type is not needed when used as\npart of a print element. If omitted when used in the\ndefaults element, \"both\" is the default.",
      "element": "page-height",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Page layout can be defined both in score-wide defaults\nand in the print element. Page margins are specified either\nfor both even and odd pages, or via separate odd and even\npage number values. The type is not needed when used as\npart of a print element. If omitted when used in the\ndefaults element, \"both\" is the default.",
      "element": "page-width",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "entity": "odd-even-both",
      "enum": {
        "odd": 0,
        "even": 1,
        "both": 2
      },
      "auto": true
    },
    {
      "//": "Page layout can be defined both in score-wide defaults\nand in the print element. Page margins are specified either\nfor both even and odd pages, or via separate odd and even\npage number values.",
      "element": "page-margins",
      "interface": {
        "<left-margin>": {
          "required": true,
          "idx": 0
        },
        "<right-margin>": {
          "required": true,
          "idx": 1
        },
        "<top-margin>": {
          "required": true,
          "idx": 2
        },
        "<bottom-margin>": {
          "required": true,
          "idx": 3
        },
        "type": {
          "type": "odd-even-both",
          "required": false,
          "std": "OddEvenBoth.Both",
          "//": "The type is not needed when used as\npart of a print element. If omitted when used in the\ndefaults element, \"both\" is the default."
        }
      },
      "auto": true
    },
    {
      "//": "Page layout can be defined both in score-wide defaults\nand in the print element. Page margins are specified either\nfor both even and odd pages, or via separate odd and even\npage number values. The type is not needed when used as\npart of a print element. If omitted when used in the\ndefaults element, \"both\" is the default.",
      "element": "page-layout",
      "interface": {
        "<page-height>": {
          "required": false,
          "idx": 0
        },
        "<page-width>": {
          "required": false,
          "idx": 1
        },
        "<page-margins>": {
          "required": false,
          "array": true,
          "idx": 2
        }
      },
      "auto": true
    },
    {
      "//": "A system is a group of staves that are read and played\nsimultaneously. System layout includes left and right\nmargins, the vertical distance from the previous system,\nand the presence or absence of system dividers.\n\nMargins are relative to the page margins. Positive values\nindent and negative values reduce the margin size. The\nsystem distance is measured from the bottom line of the\nprevious system to the top line of the current system.\nIt is ignored for the first system on a page. The top\nsystem distance is measured from the page's top margin to\nthe top line of the first system. It is ignored for all\nbut the first system on a page.\n\nSometimes the sum of measure widths in a system may not\nequal the system width specified by the layout elements due\nto roundoff or other errors. The behavior when reading\nMusicXML files in these cases is application-dependent.\nFor instance, applications may find that the system layout\ndata is more reliable than the sum of the measure widths,\nand adjust the measure widths accordingly.\n\nWhen used in the layout element, the system-layout element\ndefines a default appearance for all systems in the score.\nWhen used in the print element, the system layout element\naffects the appearance of the current system only. All\nother systems use the default values provided in the\ndefaults element. If any child elements are missing from\nthe system-layout element in a print element, the values\nfrom the defaults element are used there as well.",
      "element": "system-distance",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "A system is a group of staves that are read and played\nsimultaneously. System layout includes left and right\nmargins, the vertical distance from the previous system,\nand the presence or absence of system dividers.\n\nMargins are relative to the page margins. Positive values\nindent and negative values reduce the margin size. The\nsystem distance is measured from the bottom line of the\nprevious system to the top line of the current system.\nIt is ignored for the first system on a page. The top\nsystem distance is measured from the page's top margin to\nthe top line of the first system. It is ignored for all\nbut the first system on a page.\n\nSometimes the sum of measure widths in a system may not\nequal the system width specified by the layout elements due\nto roundoff or other errors. The behavior when reading\nMusicXML files in these cases is application-dependent.\nFor instance, applications may find that the system layout\ndata is more reliable than the sum of the measure widths,\nand adjust the measure widths accordingly.\n\nWhen used in the layout element, the system-layout element\ndefines a default appearance for all systems in the score.\nWhen used in the print element, the system layout element\naffects the appearance of the current system only. All\nother systems use the default values provided in the\ndefaults element. If any child elements are missing from\nthe system-layout element in a print element, the values\nfrom the defaults element are used there as well.",
      "element": "top-system-distance",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "A system is a group of staves that are read and played\nsimultaneously. System layout includes left and right\nmargins, the vertical distance from the previous system,\nand the presence or absence of system dividers.\n\nMargins are relative to the page margins. Positive values\nindent and negative values reduce the margin size. The\nsystem distance is measured from the bottom line of the\nprevious system to the top line of the current system.\nIt is ignored for the first system on a page. The top\nsystem distance is measured from the page's top margin to\nthe top line of the first system. It is ignored for all\nbut the first system on a page.\n\nSometimes the sum of measure widths in a system may not\nequal the system width specified by the layout elements due\nto roundoff or other errors. The behavior when reading\nMusicXML files in these cases is application-dependent.\nFor instance, applications may find that the system layout\ndata is more reliable than the sum of the measure widths,\nand adjust the measure widths accordingly.\n\nWhen used in the layout element, the system-layout element\ndefines a default appearance for all systems in the score.\nWhen used in the print element, the system layout element\naffects the appearance of the current system only. All\nother systems use the default values provided in the\ndefaults element. If any child elements are missing from\nthe system-layout element in a print element, the values\nfrom the defaults element are used there as well.",
      "element": "system-layout",
      "interface": {
        "<system-margins>": {
          "required": false,
          "idx": 0
        },
        "<system-distance>": {
          "required": false,
          "idx": 1
        },
        "<top-system-distance>": {
          "required": false,
          "idx": 2
        },
        "<system-dividers>": {
          "required": false,
          "idx": 3
        }
      },
      "auto": true
    },
    {
      "//": "A system is a group of staves that are read and played\nsimultaneously. System layout includes left and right\nmargins, the vertical distance from the previous system,\nand the presence or absence of system dividers.\n\nMargins are relative to the page margins. Positive values\nindent and negative values reduce the margin size. The\nsystem distance is measured from the bottom line of the\nprevious system to the top line of the current system.\nIt is ignored for the first system on a page. The top\nsystem distance is measured from the page's top margin to\nthe top line of the first system. It is ignored for all\nbut the first system on a page.\n\nSometimes the sum of measure widths in a system may not\nequal the system width specified by the layout elements due\nto roundoff or other errors. The behavior when reading\nMusicXML files in these cases is application-dependent.\nFor instance, applications may find that the system layout\ndata is more reliable than the sum of the measure widths,\nand adjust the measure widths accordingly.\n\nWhen used in the layout element, the system-layout element\ndefines a default appearance for all systems in the score.\nWhen used in the print element, the system layout element\naffects the appearance of the current system only. All\nother systems use the default values provided in the\ndefaults element. If any child elements are missing from\nthe system-layout element in a print element, the values\nfrom the defaults element are used there as well.",
      "element": "system-margins",
      "interface": {
        "<left-margin>": {
          "required": true,
          "idx": 0
        },
        "<right-margin>": {
          "required": true,
          "idx": 1
        }
      },
      "auto": true
    },
    {
      "//": "The system-dividers element indicates the presence or\nabsence of system dividers (also known as system separation\nmarks) between systems displayed on the same page. Dividers\non the left and right side of the page are controlled by\nthe left-divider and right-divider elements respectively.\nThe default vertical position is half the system-distance\nvalue from the top of the system that is below the divider.\nThe default horizontal position is the left and right\nsystem margin, respectively.\n\nWhen used in the print element, the system-dividers element\naffects the dividers that would appear between the current\nsystem and the previous system.",
      "element": "system-dividers",
      "interface": {
        "<left-divider>": {
          "required": true,
          "idx": 0
        },
        "<right-divider>": {
          "required": true,
          "idx": 1
        }
      },
      "auto": true
    },
    {
      "//": "The system-dividers element indicates the presence or\nabsence of system dividers (also known as system separation\nmarks) between systems displayed on the same page. Dividers\non the left and right side of the page are controlled by\nthe left-divider and right-divider elements respectively.\nThe default vertical position is half the system-distance\nvalue from the top of the system that is below the divider.\nThe default horizontal position is the left and right\nsystem margin, respectively.\n\nWhen used in the print element, the system-dividers element\naffects the dividers that would appear between the current\nsystem and the previous system.",
      "element": "left-divider",
      "empty": true,
      "interface": {
        "_extends": [
          "print-object",
          "print-style-align"
        ]
      },
      "auto": true
    },
    {
      "//": "The system-dividers element indicates the presence or\nabsence of system dividers (also known as system separation\nmarks) between systems displayed on the same page. Dividers\non the left and right side of the page are controlled by\nthe left-divider and right-divider elements respectively.\nThe default vertical position is half the system-distance\nvalue from the top of the system that is below the divider.\nThe default horizontal position is the left and right\nsystem margin, respectively.\n\nWhen used in the print element, the system-dividers element\naffects the dividers that would appear between the current\nsystem and the previous system.",
      "element": "right-divider",
      "empty": true,
      "interface": {
        "_extends": [
          "print-object",
          "print-style-align"
        ]
      },
      "auto": true
    },
    {
      "//": "Staff layout includes the vertical distance from the bottom\nline of the previous staff in this system to the top line\nof the staff specified by the number attribute. The\noptional number attribute refers to staff numbers within\nthe part, from top to bottom on the system. A value of 1\nis assumed if not present. When used in the defaults\nelement, the values apply to all parts. This value is\nignored for the first staff in a system.",
      "element": "staff-distance",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Staff layout includes the vertical distance from the bottom\nline of the previous staff in this system to the top line\nof the staff specified by the number attribute. The\noptional number attribute refers to staff numbers within\nthe part, from top to bottom on the system. A value of 1\nis assumed if not present. When used in the defaults\nelement, the values apply to all parts. This value is\nignored for the first staff in a system.",
      "element": "staff-layout",
      "interface": {
        "num": {
          "type": "number",
          "std": 1,
          "isRequired": false
        },
        "<staff-distance>": {
          "required": false,
          "idx": 0
        }
      },
      "auto": true
    },
    {
      "//": "Measure layout includes the horizontal distance from the\nprevious measure. This value is only used for systems\nwhere there is horizontal whitespace in the middle of a\nsystem, as in systems with codas. To specify the measure\nwidth, use the width attribute of the measure element.",
      "element": "measure-distance",
      "interface": {
        "_extends": [
          "layout-tenths"
        ]
      },
      "auto": true
    },
    {
      "//": "Measure layout includes the horizontal distance from the\nprevious measure. This value is only used for systems\nwhere there is horizontal whitespace in the middle of a\nsystem, as in systems with codas. To specify the measure\nwidth, use the width attribute of the measure element.",
      "element": "measure-layout",
      "interface": {
        "<measure-distance>": {
          "required": false,
          "idx": 0
        }
      },
      "auto": true
    },
    {
      "//": "The appearance element controls general graphical\nsettings for the music's final form appearance on a\nprinted page of display. This includes support\nfor line widths, definitions for note sizes, and standard\ndistances between notation elements, plus an extension\nelement for other aspects of appearance.\n\nThe line-width element indicates the width of a line type\nin tenths. The type attribute defines what type of line is\nbeing defined. Values include beam, bracket, dashes,\nenclosure, ending, extend, heavy barline, leger,\nlight barline, octave shift, pedal, slur middle, slur tip,\nstaff, stem, tie middle, tie tip, tuplet bracket, and\nwedge. The text content is expressed in tenths.\n\nThe note-size element indicates the percentage of the\nregular note size to use for notes with a cue and large\nsize as defined in the type element. The grace type is\nused for notes of cue size that that include a grace\nelement. The cue type is used for all other notes with\ncue size, whether defined explicitly or implicitly via a\ncue element. The large type is used for notes of large\nsize. The text content represent the numeric percentage.\nA value of 100 would be identical to the size of a regular\nnote as defined by the music font.\n\nThe distance element represents standard distances between\nnotation elements in tenths. The type attribute defines what\ntype of distance is being defined. Values include hyphen\n(for hyphens in lyrics) and beam.\n\nThe other-appearance element is used to define any\ngraphical settings not yet in the current version of the\nMusicXML format. This allows extended representation,\nthough without application interoperability.",
      "element": "line-width",
      "interface": {
        "tenths": {
          "child": true,
          "required": true,
          "type": "number"
        },
        "type": {
          "required": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "entity": "cue-grace-large",
      "enum": {
        "cue": 0,
        "grace": 1,
        "large": 2
      },
      "auto": true
    },
    {
      "//": "The appearance element controls general graphical\nsettings for the music's final form appearance on a\nprinted page of display. This includes support\nfor line widths, definitions for note sizes, and standard\ndistances between notation elements, plus an extension\nelement for other aspects of appearance.\n\nThe line-width element indicates the width of a line type\nin tenths. The type attribute defines what type of line is\nbeing defined. Values include beam, bracket, dashes,\nenclosure, ending, extend, heavy barline, leger,\nlight barline, octave shift, pedal, slur middle, slur tip,\nstaff, stem, tie middle, tie tip, tuplet bracket, and\nwedge. The text content is expressed in tenths.\n\nThe note-size element indicates the percentage of the\nregular note size to use for notes with a cue and large\nsize as defined in the type element. The grace type is\nused for notes of cue size that that include a grace\nelement. The cue type is used for all other notes with\ncue size, whether defined explicitly or implicitly via a\ncue element. The large type is used for notes of large\nsize. The text content represent the numeric percentage.\nA value of 100 would be identical to the size of a regular\nnote as defined by the music font.\n\nThe distance element represents standard distances between\nnotation elements in tenths. The type attribute defines what\ntype of distance is being defined. Values include hyphen\n(for hyphens in lyrics) and beam.\n\nThe other-appearance element is used to define any\ngraphical settings not yet in the current version of the\nMusicXML format. This allows extended representation,\nthough without application interoperability.",
      "element": "note-size",
      "interface": {
        "size": {
          "child": true,
          "required": true,
          "type": "number"
        },
        "type": {
          "required": true,
          "type": "cue-grace-large"
        }
      },
      "auto": true
    },
    {
      "//": "The appearance element controls general graphical\nsettings for the music's final form appearance on a\nprinted page of display. This includes support\nfor line widths, definitions for note sizes, and standard\ndistances between notation elements, plus an extension\nelement for other aspects of appearance.\n\nThe line-width element indicates the width of a line type\nin tenths. The type attribute defines what type of line is\nbeing defined. Values include beam, bracket, dashes,\nenclosure, ending, extend, heavy barline, leger,\nlight barline, octave shift, pedal, slur middle, slur tip,\nstaff, stem, tie middle, tie tip, tuplet bracket, and\nwedge. The text content is expressed in tenths.\n\nThe note-size element indicates the percentage of the\nregular note size to use for notes with a cue and large\nsize as defined in the type element. The grace type is\nused for notes of cue size that that include a grace\nelement. The cue type is used for all other notes with\ncue size, whether defined explicitly or implicitly via a\ncue element. The large type is used for notes of large\nsize. The text content represent the numeric percentage.\nA value of 100 would be identical to the size of a regular\nnote as defined by the music font.\n\nThe distance element represents standard distances between\nnotation elements in tenths. The type attribute defines what\ntype of distance is being defined. Values include hyphen\n(for hyphens in lyrics) and beam.\n\nThe other-appearance element is used to define any\ngraphical settings not yet in the current version of the\nMusicXML format. This allows extended representation,\nthough without application interoperability.",
      "element": "distance",
      "interface": {
        "tenths": {
          "child": true,
          "required": true,
          "type": "number"
        },
        "type": {
          "required": true,
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "The appearance element controls general graphical\nsettings for the music's final form appearance on a\nprinted page of display. This includes support\nfor line widths, definitions for note sizes, and standard\ndistances between notation elements, plus an extension\nelement for other aspects of appearance.\n\nThe line-width element indicates the width of a line type\nin tenths. The type attribute defines what type of line is\nbeing defined. Values include beam, bracket, dashes,\nenclosure, ending, extend, heavy barline, leger,\nlight barline, octave shift, pedal, slur middle, slur tip,\nstaff, stem, tie middle, tie tip, tuplet bracket, and\nwedge. The text content is expressed in tenths.\n\nThe note-size element indicates the percentage of the\nregular note size to use for notes with a cue and large\nsize as defined in the type element. The grace type is\nused for notes of cue size that that include a grace\nelement. The cue type is used for all other notes with\ncue size, whether defined explicitly or implicitly via a\ncue element. The large type is used for notes of large\nsize. The text content represent the numeric percentage.\nA value of 100 would be identical to the size of a regular\nnote as defined by the music font.\n\nThe distance element represents standard distances between\nnotation elements in tenths. The type attribute defines what\ntype of distance is being defined. Values include hyphen\n(for hyphens in lyrics) and beam.\n\nThe other-appearance element is used to define any\ngraphical settings not yet in the current version of the\nMusicXML format. This allows extended representation,\nthough without application interoperability.",
      "element": "appearance",
      "interface": {
        "<line-width>": {
          "array": true,
          "required": false,
          "idx": 0,
          "indexBy": "type"
        },
        "<note-size>": {
          "array": true,
          "required": false,
          "idx": 1,
          "indexBy": "type"
        },
        "<distance>": {
          "array": true,
          "required": false,
          "idx": 2,
          "indexBy": "type"
        },
        "<other-appearance>": {
          "array": true,
          "required": false,
          "idx": 3
        }
      },
      "auto": true
    },
    {
      "//": "The creator element is borrowed from Dublin Core. It is\nused for the creators of the score. The type attribute is\nused to distinguish different creative contributions. Thus,\nthere can be multiple creators within an identification.",
      "element": "creator",
      "interface": {
        "type": {
          "type": "string",
          "//": "Standard type values are composer, lyricist, and arranger.\nOther type values may be used for different types of\ncreative roles. The type attribute should usually be used\neven if there is just a single creator element. The MusicXML\nformat does not use the creator / contributor distinction\nfrom Dublin Core."
        },
        "creator": {
          "child": true,
          "type": "string",
          "required": true,
          "//": "A name."
        }
      },
      "auto": true
    },
    {
      "//": "Rights is borrowed from Dublin Core. It contains\ncopyright and other intellectual property notices.\nWords, music, and derivatives can have different types,\nso multiple rights tags with different type attributes\nare supported.",
      "element": "rights",
      "interface": {
        "type": {
          "type": "string",
          "//": "Standard type values are music, words,\nand arrangement, but other types may be used. The\ntype attribute is only needed when there are multiple\nrights elements."
        },
        "rights": {
          "child": true,
          "type": "string",
          "required": true,
          "//": "A copyright statement."
        }
      },
      "auto": true
    },
    {
      "//": "The software used to encode the music.",
      "element": "encoder",
      "interface": {
        "type": {
          "type": "string",
          "//": "Standard type values for the encoder element are music,\nwords, and arrangement, but other types may be used. The\ntype attribute is only needed when there are multiple\nencoder elements."
        },
        "encoder": {
          "child": true,
          "type": "string",
          "required": true,
          "//": "A string describing the software used to encode the music."
        }
      },
      "auto": true
    },
    {
      "//": "\nThe source for the music that is encoded. This is similar\nto the Dublin Core source element.",
      "element": "source",
      "interface": {
        "source": {
          "child": true,
          "type": "string",
          "required": true
        }
      },
      "auto": true
    },
    {
      "//": "A related resource for the music that is encoded. This is\nsimilar to the Dublin Core relation element.",
      "element": "relation",
      "interface": {
        "type": {
          "type": "string",
          "//": "Standard type values are music, words, and arrangement, but other\ntypes may be used."
        },
        "data": {
          "type": "string",
          "child": true,
          "required": true,
          "//": "A relation."
        }
      },
      "auto": true
    },
    {
      "//": "If a program has other metadata not yet supported in the\nMusicXML format, it can go in the miscellaneous area.",
      "element": "miscellaneous-field",
      "interface": {
        "name": {
          "type": "string",
          "//": "Application-specific value."
        },
        "data": {
          "type": "string",
          "child": true,
          "required": true,
          "//": "Application-specific value."
        }
      },
      "auto": true
    },
    {
      "//": "\nIf a program has other metadata not yet supported in the\nMusicXML format, it can go in the miscellaneous area.",
      "element": "miscellaneous",
      "interface": {
        "<miscellaneous-field>": {
          "array": true,
          "required": false
        }
      },
      "auto": true
    },
    {
      "//": "\nIdentification contains basic metadata about the score.\nIt includes the information in MuseData headers that\nmay apply at a score-wide, movement-wide, or part-wide\nlevel. The creator, rights, source, and relation elements\nare based on Dublin Core.",
      "element": "identification",
      "interface": {
        "<creator>": {
          "array": true,
          "required": false,
          "idx": 0
        },
        "<rights>": {
          "array": true,
          "required": false,
          "idx": 1
        },
        "<encoding>": {
          "idx": 2
        },
        "<source>": {
          "idx": 3
        },
        "<relation>": {
          "array": true,
          "required": false,
          "idx": 4
        },
        "<miscellaneous>": {
          "idx": 5
        }
      },
      "auto": true
    },
    {
      "//": "The supports element indicates if the encoding supports\na particular MusicXML element. This is recommended for\nelements like beam, stem, and accidental, where the\nabsence of an element is ambiguous if you do not know\nif the encoding supports that element. For Version 2.0,\nthe supports element is expanded to allow programs to\nindicate support for particular attributes or particular\nvalues. This lets applications communicate, for example,\nthat all system and/or page breaks are contained in the\nMusicXML file.",
      "element": "supports",
      "interface": {
        "type": {
          "type": "string"
        },
        "element": {
          "type": "string",
          "required": true
        },
        "attribute": {
          "type": "string",
          "required": false
        },
        "value": {
          "type": "string"
        }
      },
      "auto": true
    },
    {
      "//": "Encoding contains information about who did the digital\nencoding, when, with what software, and in what aspects.",
      "element": "encoding",
      "interface": {
        "<software>": {
          "required": false,
          "array": true,
          "idx": 1
        },
        "<encoding-date>": {
          "required": false,
          "type": "CalendarDate",
          "idx": 2
        },
        "<supports>": {
          "required": false,
          "array": true,
          "indexBy": "element attribute",
          "idx": 3
        },
        "<encoder>": {
          "required": false,
          "array": true,
          "idx": 4
        },
        "<encoding-description>": {
          "required": false,
          "array": true,
          "idx": 5
        }
      },
      "auto": true
    },
    {
      "entity": "separator-type",
      "enum": {
        "none": 0,
        "horizontal": 1,
        "diagonal": 2,
        "vertical": 3,
        "adjacent": 4
      },
      "auto": true
    },
    {
      "//": "The time-separator entity indicates how to display the\narrangement between the beats and beat-type values in a\ntime signature. The default value is none. The horizontal,\ndiagonal, and vertical values represent horizontal, diagonal\nlower-left to upper-right, and vertical lines respectively.\nFor these values, the beats and beat-type values are arranged\non either side of the separator line. The none value represents\nno separator with the beats and beat-type arranged vertically.\nThe adjacent value represents no separator with the beats and\nbeat-type arranged horizontally.",
      "entity": "time-separator",
      "interface": {
        "separator": {
          "type": "separator-type",
          "required": false,
          "std": "SeparatorType.None"
        }
      },
      "auto": true
    },
    {
      "entity": "time-symbol-type",
      "enum": {
        "common": 0,
        "cut": 1,
        "single-number": 2,
        "note": 3,
        "dotted-note": 4,
        "normal": 5
      },
      "auto": true
    },
    {
      "//": "The time-symbol entity indicates how to display a time\nsignature. The normal value is the usual fractional display,\nand is the implied symbol type if none is specified. Other\noptions are the common and cut time symbols, as well as a\nsingle number with an implied denominator. The note symbol\nindicates that the beat-type should be represented with\nthe corresponding downstem note rather than a number. The\ndotted-note symbol indicates that the beat-type should be\nrepresented with a dotted downstem note that corresponds to\nthree times the beat-type value, and a numerator that is\none third the beats value.",
      "entity": "time-symbol",
      "interface": {
        "symbol": {
          "type": "time-symbol-type",
          "required": false,
          "std": "TimeSymbolType.Normal"
        }
      },
      "auto": true
    },
    {
      "entity": "cancel-location",
      "enum": {
        "left": 0,
        "right": 1,
        "before-barline": 2
      }
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "cancel",
      "interface": {
        "fifths": {
          "type": "number",
          "child": true
        },
        "location": {
          "type": "cancel-location",
          "required": false,
          "std": "CancelLocation.Left"
        }
      },
      "auto": true
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "fifths",
      "interface": "number"
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "key-octave",
      "interface": {
        "octave": {
          "type": "number",
          "child": true
        },
        "number": {
          "type": "number",
          "required": true
        },
        "cancel": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "Musical notation duration is commonly represented as\nfractions. The divisions element indicates how many\ndivisions per quarter note are used to indicate a note's\nduration. For example, if duration = 1 and divisions = 2,\nthis is an eighth note duration. Duration and divisions\nare used directly for generating sound output, so they\nmust be chosen to take tuplets into account. Using a\ndivisions element lets us use just one number to\nrepresent a duration for each note in the score, while\nretaining the full power of a fractional representation.\nFor maximum compatibility with Standard MIDI Files, the\ndivisions value should not exceed 16383.",
      "element": "divisions",
      "interface": "number"
    },
    {
      "//": "Traditional key signatures are represented by the number\nof flats and sharps, plus an optional mode for major/\nminor/mode distinctions. Negative numbers are used for\nflats and positive numbers for sharps, reflecting the\nkey's placement within the circle of fifths (hence the\nelement name). A cancel element indicates that the old\nkey signature should be cancelled before the new one\nappears. This will always happen when changing to C major\nor A minor and need not be specified then. The cancel\nvalue matches the fifths value of the cancelled key\nsignature (e.g., a cancel of -2 will provide an explicit\ncancellation for changing from B flat major to F major).\nThe optional location attribute indicates where a key\nsignature cancellation appears relative to a new key\nsignature: to the left, to the right, or before the barline\nand to the left. It is left by default. For mid-measure key\nelements, a cancel location of before-barline should be\ntreated like a cancel location of left.\n\nNon-traditional key signatures can be represented using\nthe Humdrum/Scot concept of a list of altered tones.\nThe key-step and key-alter elements are represented the\nsame way as the step and alter elements are in the pitch\nelement in the note.mod file. The optional key-accidental\nelement is represented the same way as the accidental\nelement in the note.mod file. It is used for disambiguating\nmicrotonal accidentals. The different element names\nindicate the different meaning of altering notes in a scale\nversus altering a sounding pitch.\n\nValid mode values include major, minor, dorian, phrygian,\nlydian, mixolydian, aeolian, ionian, locrian, and none.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the key\nsignature applies to all staves in the part.\nThe optional list of key-octave elements is used to specify\nin which octave each element of the key signature appears.\nThe content specifies the octave value using the same\nvalues as the display-octave element. The number attribute\nis a positive integer that refers to the key signature\nelement in left-to-right order. If the cancel attribute is\nset to yes, then this number refers to an element specified\nby the cancel element. It is no by default.\n\nKey signatures appear at the start of each system unless\nthe print-object attribute has been set to \"no\".",
      "element": "key",
      "interface": {
        "_extends": [
          "print-style",
          "print-object"
        ],
        "<cancel>": {
          "required": false,
          "idx": 0
        },
        "<fifths>": {
          "required": true,
          "idx": 1
        },
        "<mode>": {
          "required": false,
          "idx": 2
        },
        "<key-step>": {
          "required": true,
          "idx": 0,
          "array": true
        },
        "<key-alter>": {
          "required": true,
          "idx": 1,
          "array": true
        },
        "<key-accidental>": {
          "required": true,
          "idx": 2,
          "array": true
        },
        "<key-octave>": {
          "required": false,
          "idx": 3,
          "array": true
        },
        "number": {
          "type": "number",
          "required": false
        }
      }
    },
    {
      "//": "Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "time",
      "interface": {
        "_extends": [
          "time-symbol",
          "time-separator",
          "print-style-align",
          "print-object"
        ],
        "<beats>": {
          "required": true,
          "array": true,
          "idx": 0
        },
        "<beat-type>": {
          "required": true,
          "array": true,
          "idx": 1
        },
        "<interchangeable>": {
          "required": false,
          "array": true,
          "idx": 2
        },
        "<senza-misura>": "__flag__"
      }
    },
    {
      "//": "Time signatures are represented by two elements. The\nbeats element indicates the number of beats, as found in\nthe numerator of a time signature. The beat-type element\nindicates the beat unit, as found in the denominator of\na time signature.\n\nMultiple pairs of beats and beat-type elements are used for\ncomposite time signatures with multiple denominators, such\nas 2/4 + 3/8. A composite such as 3+2/8 requires only one\nbeats/beat-type pair.\n\nThe interchangeable element is used to represent the second\nin a pair of interchangeable dual time signatures, such as\nthe 6/8 in 3/4 (6/8). A separate symbol attribute value is\navailable compared to the time element's symbol attribute,\nwhich applies to the first of the dual time signatures.\nThe time-relation element indicates the symbol used to\nrepresent the interchangeable aspect of the time signature.\nValid values are parentheses, bracket, equals, slash, space,\nand hyphen.\n\nA senza-misura element explicitly indicates that no time\nsignature is present. The optional element content\nindicates the symbol to be used, if any, such as an X.\nThe time element's symbol attribute is not used when a\nsenza-misura element is present.\n\nThe print-object attribute allows a time signature to be\nspecified but not printed, as is the case for excerpts\nfrom the middle of a score. The value is \"yes\" if\nnot present. The optional number attribute refers to staff\nnumbers within the part, from top to bottom on the system.\nIf absent, the time signature applies to all staves in the\npart.",
      "element": "interchangeable",
      "interface": {
        "_extends": [
          "time-symbol",
          "time-separator"
        ],
        "<time-relation>": {
          "required": false,
          "idx": 0
        },
        "<beats>": {
          "required": true,
          "idx": 1,
          "array": true
        },
        "<beat-type>": {
          "required": true,
          "idx": 2,
          "array": true
        }
      },
      "auto": true
    },
    {
      "//": "Staves are used if there is more than one staff\nrepresented in the given part (e.g., 2 staves for\ntypical piano parts). If absent, a value of 1 is assumed.\nStaves are ordered from top to bottom in a part in\nnumerical order, with staff 1 above staff 2.",
      "element": "staves",
      "interface": "number"
    },
    {
      "entity": "part-symbol-type",
      "enum": {
        "none": 0,
        "brace": 1,
        "line": 2,
        "bracket": 3,
        "square": 4
      }
    },
    {
      "//": "The part-symbol element indicates how a symbol for a\nmulti-staff part is indicated in the score. Values include\nnone, brace, line, bracket, and square; brace is the default.\nThe top-staff and bottom-staff elements are used when the\nbrace does not extend across the entire part. For example, in\na 3-staff organ part, the top-staff will typically be 1 for\nthe right hand, while the bottom-staff will typically be 2\nfor the left hand. Staff 3 for the pedals is usually outside\nthe brace. By default, the presence of a part-symbol element\nthat does not extend across the entire part also indicates a\ncorresponding change in the common barlines within a part.",
      "element": "part-symbol",
      "interface": {
        "_extends": [
          "position",
          "color"
        ],
        "type": {
          "type": "part-symbol-type",
          "child": true
        },
        "top-staff": {
          "type": "number",
          "required": false,
          "std": -1
        },
        "bottom-staff": {
          "type": "number",
          "required": false,
          "std": -1
        }
      }
    },
    {
      "//": "Clefs are represented by the sign, line, and\nclef-octave-change elements. Sign values include G, F, C,\npercussion, TAB, jianpu, and none. Line numbers are\ncounted from the bottom of the staff. Standard values are\n2 for the G sign (treble clef), 4 for the F sign (bass clef),\n3 for the C sign (alto clef) and 5 for TAB (on a 6-line\nstaff). The clef-octave-change element is used for\ntransposing clefs (e.g., a treble clef for tenors would\nhave a clef-octave-change value of -1). The optional\nnumber attribute refers to staff numbers within the part,\nfrom top to bottom on the system. A value of 1 is\nassumed if not present.\n\nThe jianpu sign indicates that the music that follows\nshould be in jianpu numbered notation, just as the TAB\nsign indicates that the music that follows should be in\ntablature notation. Unlike TAB, a jianpu sign does not\ncorrespond to a visual clef notation.\n\nSometimes clefs are added to the staff in non-standard\nline positions, either to indicate cue passages, or when\nthere are multiple clefs present simultaneously on one\nstaff. In this situation, the additional attribute is set to\n\"yes\" and the line value is ignored. The size attribute\nis used for clefs where the additional attribute is \"yes\".\nIt is typically used to indicate cue clefs.\n\nSometimes clefs at the start of a measure need to appear\nafter the barline rather than before, as for cues or for\nuse after a repeated section. The after-barline attribute\nis set to \"yes\" in this situation. The attribute is ignored\nfor mid-measure clefs.\n\nClefs appear at the start of each system unless the\nprint-object attribute has been set to \"no\" or the\nadditional attribute has been set to \"yes\".",
      "element": "line",
      "interface": "number"
    },
    {
      "//": "Clefs are represented by the sign, line, and\nclef-octave-change elements. Sign values include G, F, C,\npercussion, TAB, jianpu, and none. Line numbers are\ncounted from the bottom of the staff. Standard values are\n2 for the G sign (treble clef), 4 for the F sign (bass clef),\n3 for the C sign (alto clef) and 5 for TAB (on a 6-line\nstaff). The clef-octave-change element is used for\ntransposing clefs (e.g., a treble clef for tenors would\nhave a clef-octave-change value of -1). The optional\nnumber attribute refers to staff numbers within the part,\nfrom top to bottom on the system. A value of 1 is\nassumed if not present.\n\nThe jianpu sign indicates that the music that follows\nshould be in jianpu numbered notation, just as the TAB\nsign indicates that the music that follows should be in\ntablature notation. Unlike TAB, a jianpu sign does not\ncorrespond to a visual clef notation.\n\nSometimes clefs are added to the staff in non-standard\nline positions, either to indicate cue passages, or when\nthere are multiple clefs present simultaneously on one\nstaff. In this situation, the additional attribute is set to\n\"yes\" and the line value is ignored. The size attribute\nis used for clefs where the additional attribute is \"yes\".\nIt is typically used to indicate cue clefs.\n\nSometimes clefs at the start of a measure need to appear\nafter the barline rather than before, as for cues or for\nuse after a repeated section. The after-barline attribute\nis set to \"yes\" in this situation. The attribute is ignored\nfor mid-measure clefs.\n\nClefs appear at the start of each system unless the\nprint-object attribute has been set to \"no\" or the\nadditional attribute has been set to \"yes\".",
      "element": "clef",
      "interface": {
        "_extends": [
          "print-style",
          "print-object"
        ],
        "<sign>": {
          "required": true
        },
        "<line>": {
          "required": true
        },
        "<clef-octave-change>": {
          "required": true
        },
        "number": {
          "type": "number",
          "required": false,
          "std": 1
        },
        "additional": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "size": {
          "type": "symbol-size",
          "required": false,
          "std": "SymbolSize.Full"
        },
        "after-barline": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The staff-details element is used to indicate different\ntypes of staves. The staff-type element can be ossia,\ncue, editorial, regular, or alternate. An alternate staff\nindicates one that shares the same musical data as the\nprior staff, but displayed differently (e.g., treble and\nbass clef, standard notation and tab). The staff-lines\nelement specifies the number of lines for a non 5-line\nstaff. The staff-tuning and capo elements are used to\nspecify tuning when using tablature notation. The optional\nnumber attribute specifies the staff number from top to\nbottom on the system, as with clef. The optional show-frets\nattribute indicates whether to show tablature frets as\nnumbers (0, 1, 2) or letters (a, b, c). The default choice\nis numbers. The print-object attribute is used to indicate\nwhen a staff is not printed in a part, usually in large\nscores where empty parts are omitted. It is yes by default.\nIf print-spacing is yes while print-object is no, the score\nis printed in cutaway format where vertical space is left\nfor the empty part.",
      "element": "staff-lines",
      "interface": "number"
    },
    {
      "//": "The tuning-step, tuning-alter, and tuning-octave\nelements are defined in the common.mod file. Staff\nlines are numbered from bottom to top.",
      "element": "staff-tuning",
      "interface": {
        "<tuning-step>": {
          "required": true
        },
        "<tuning-alter>": {
          "required": false
        },
        "<tuning-octave>": {
          "required": true
        },
        "line": {
          "type": "string",
          "required": true
        }
      }
    },
    {
      "//": "The staff-size element indicates how large a staff\nspace is on this staff, expressed as a percentage of\nthe work's default scaling. Values less than 100 make\nthe staff space smaller while values over 100 make the\nstaff space larger. A staff-type of cue, ossia, or\neditorial implies a staff-size of less than 100, but\nthe exact value is implementation-dependent unless\nspecified here. Staff size affects staff height only,\nnot the relationship of the staff to the left and\nright margins.",
      "element": "staff-size",
      "interface": "number"
    },
    {
      "entity": "show-frets-type",
      "enum": {
        "numbers": 0,
        "letters": 1
      }
    },
    {
      "//": "The staff-details element is used to indicate different\ntypes of staves. The staff-type element can be ossia,\ncue, editorial, regular, or alternate. An alternate staff\nindicates one that shares the same musical data as the\nprior staff, but displayed differently (e.g., treble and\nbass clef, standard notation and tab). The staff-lines\nelement specifies the number of lines for a non 5-line\nstaff. The staff-tuning and capo elements are used to\nspecify tuning when using tablature notation. The optional\nnumber attribute specifies the staff number from top to\nbottom on the system, as with clef. The optional show-frets\nattribute indicates whether to show tablature frets as\nnumbers (0, 1, 2) or letters (a, b, c). The default choice\nis numbers. The print-object attribute is used to indicate\nwhen a staff is not printed in a part, usually in large\nscores where empty parts are omitted. It is yes by default.\nIf print-spacing is yes while print-object is no, the score\nis printed in cutaway format where vertical space is left\nfor the empty part.",
      "element": "staff-details",
      "interface": {
        "_extends": [
          "print-object",
          "print-spacing"
        ],
        "<staff-type>": {
          "required": false
        },
        "<staff-lines>": {
          "required": false
        },
        "<staff-tuning>": {
          "required": false,
          "array": true
        },
        "<capo>": {
          "required": false
        },
        "<staff-size>": {
          "required": false
        },
        "number": {
          "type": "number",
          "required": false,
          "std": 1
        },
        "show-fets": {
          "type": "show-frets-type",
          "required": false,
          "std": "ShowFretsType.Numbers"
        }
      }
    },
    {
      "//": "If the part is being encoded for a transposing instrument\nin written vs. concert pitch, the transposition must be\nencoded in the transpose element. The transpose element\nrepresents what must be added to the written pitch to get\nthe correct sounding pitch.\n\nThe transposition is represented by chromatic steps\n(required) and three optional elements: diatonic pitch\nsteps, octave changes, and doubling an octave down. The\nchromatic and octave-change elements are numeric values\nadded to the encoded pitch data to create the sounding\npitch. The diatonic element is also numeric and allows\nfor correct spelling of enharmonic transpositions.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the\ntransposition applies to all staves in the part. Per-staff\ntransposition is most often used in parts that represent\nmultiple instruments.",
      "element": "double",
      "empty": true,
      "interface": {}
    },
    {
      "//": "If the part is being encoded for a transposing instrument\nin written vs. concert pitch, the transposition must be\nencoded in the transpose element. The transpose element\nrepresents what must be added to the written pitch to get\nthe correct sounding pitch.\n\nThe transposition is represented by chromatic steps\n(required) and three optional elements: diatonic pitch\nsteps, octave changes, and doubling an octave down. The\nchromatic and octave-change elements are numeric values\nadded to the encoded pitch data to create the sounding\npitch. The diatonic element is also numeric and allows\nfor correct spelling of enharmonic transpositions.\n\nThe optional number attribute refers to staff numbers,\nfrom top to bottom on the system. If absent, the\ntransposition applies to all staves in the part. Per-staff\ntransposition is most often used in parts that represent\nmultiple instruments.",
      "element": "transpose",
      "interface": {
        "number": {
          "type": "number",
          "required": false,
          "std": null
        },
        "<diatonic>": {
          "required": false,
          "idx": 0
        },
        "<chromatic>": {
          "required": true,
          "idx": 1
        },
        "<octave-change>": {
          "required": false,
          "idx": 2
        },
        "<double>": {
          "required": false,
          "idx": 3
        }
      }
    },
    {
      "//": "Directives are like directions, but can be grouped together\nwith attributes for convenience. This is typically used for\ntempo markings at the beginning of a piece of music. This\nelement has been deprecated in Version 2.0 in favor of\nthe directive attribute for direction elements. Language\nnames come from ISO 639, with optional country subcodes\nfrom ISO 3166.",
      "element": "directive",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "child": true,
          "type": "string",
          "required": true
        }
      }
    },
    {
      "//": "The slash-type and slash-dot elements are optional children\nof the beat-repeat and slash elements. They have the same\nvalues as the type and dot elements, and define what the\nbeat is for the display of repetition marks. If not present,\nthe beat is based on the current time signature.",
      "element": "slash-dot",
      "interface": {},
      "empty": true
    },
    {
      "//": "The text of the multiple-rest element indicates the number\nof measures in the multiple rest. Multiple rests may use\nthe 1-bar / 2-bar / 4-bar rest symbols, or a single shape.\nThe use-symbols attribute indicates which to use; it is no\nif not specified.",
      "element": "multiple-rest",
      "interface": {
        "data": {
          "child": true,
          "type": "string",
          "required": true
        },
        "multiple-rest": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The measure-repeat and beat-repeat element specify a\nnotation style for repetitions. The actual music being\nrepeated needs to be repeated within the MusicXML file.\nThese elements specify the notation that indicates the\nrepeat.\n\nThe measure-repeat element is used for both single and\nmultiple measure repeats. The text of the element indicates\nthe number of measures to be repeated in a single pattern.\nThe slashes attribute specifies the number of slashes to\nuse in the repeat sign. It is 1 if not specified. Both the\nstart and the stop of the measure-repeat must be specified.",
      "element": "measure-repeat",
      "interface": {
        "data": {
          "child": true,
          "type": "string",
          "required": false
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "slashed": {
          "type": "number",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "The measure-repeat and beat-repeat element specify a\nnotation style for repetitions. The actual music being\nrepeated needs to be repeated within the MusicXML file.\nThese elements specify the notation that indicates the\nrepeat.\n\nThe beat-repeat element is used to indicate that a single\nbeat (but possibly many notes) is repeated. Both the start\nand stop of the beat being repeated should be specified.\nThe slashes attribute specifies the number of slashes to\nuse in the symbol. The use-dots attribute indicates whether\nor not to use dots as well (for instance, with mixed rhythm\npatterns). By default, the value for slashes is 1 and the\nvalue for use-dots is no.",
      "element": "beat-repeat",
      "interface": {
        "<slash-type>": {
          "required": false
        },
        "<slash-dot>": {
          "required": false,
          "array": true
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "slases": {
          "type": "number",
          "required": false,
          "std": 1
        },
        "use-dots": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The slash element is used to indicate that slash notation\nis to be used. If the slash is on every beat, use-stems is\nno (the default). To indicate rhythms but not pitches,\nuse-stems is set to yes. The type attribute indicates\nwhether this is the start or stop of a slash notation\nstyle. The use-dots attribute works as for the beat-repeat\nelement, and only has effect if use-stems is no.",
      "element": "slash",
      "interface": {
        "<slash-type>": {
          "required": false
        },
        "<slash-dot>": {
          "required": false,
          "array": true
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "use-dots": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "use-stems": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "A measure-style indicates a special way to print partial\nto multiple measures within a part. This includes multiple\nrests over several measures, repeats of beats, single, or\nmultiple measures, and use of slash notation.\n\nThe multiple-rest and measure-repeat symbols indicate the\nnumber of measures covered in the element content. The\nbeat-repeat and slash elements can cover partial measures.\nAll but the multiple-rest element use a type attribute to\nindicate starting and stopping the use of the style. The\noptional number attribute specifies the staff number from\ntop to bottom on the system, as with clef.",
      "element": "measure-style",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "<multiple-rest>": {
          "required": false
        },
        "<measure-repeat>": {
          "required": false
        },
        "<beat-repeat>": {
          "required": false
        },
        "<slash>": {
          "required": false
        },
        "number": {
          "type": "number",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "The attributes element contains musical information that\ntypically changes on measure boundaries. This includes\nkey and time signatures, clefs, transpositions, and staving.\nWhen attributes are changed mid-measure, it affects the\nmusic in score order, not in MusicXML document order.",
      "element": "attributes",
      "interface": {
        "_extends": [
          "editorial"
        ],
        "<divisions>": {
          "required": false,
          "idx": 0
        },
        "<key>": {
          "required": false,
          "idx": 1
        },
        "<time>": {
          "required": false,
          "idx": 2
        },
        "<staves>": {
          "required": false,
          "idx": 3
        },
        "<part-symbol>": {
          "required": false,
          "idx": 4
        },
        "<instruments>": {
          "required": false,
          "idx": 5
        },
        "<clef>": {
          "required": false,
          "idx": 6
        },
        "<staff-details>": {
          "required": false,
          "idx": 7
        },
        "<transpose>": {
          "required": false,
          "idx": 8
        },
        "<directive>": {
          "required": false,
          "idx": 9
        },
        "<measure-style>": {
          "required": false,
          "idx": 10
        }
      }
    },
    {
      "//": "The cue and grace elements indicate the presence of cue and\ngrace notes. The slash attribute for a grace note is yes for\nslashed eighth notes. The other grace note attributes come\nfrom MuseData sound suggestions. The steal-time-previous\nattribute indicates the percentage of time to steal from the\nprevious note for the grace note. The steal-time-following\nattribute indicates the percentage of time to steal from the\nfollowing note for the grace note, as for appoggiaturas. The\nmake-time attribute indicates to make time, not steal time;\nthe units are in real-time divisions for the grace note.",
      "element": "cue",
      "empty": true,
      "interface": {}
    },
    {
      "//": "The cue and grace elements indicate the presence of cue and\ngrace notes. The slash attribute for a grace note is yes for\nslashed eighth notes. The other grace note attributes come\nfrom MuseData sound suggestions. The steal-time-previous\nattribute indicates the percentage of time to steal from the\nprevious note for the grace note. The steal-time-following\nattribute indicates the percentage of time to steal from the\nfollowing note for the grace note, as for appoggiaturas. The\nmake-time attribute indicates to make time, not steal time;\nthe units are in real-time divisions for the grace note.",
      "element": "grace",
      "empty": true,
      "interface": {
        "steal-time-previous": {
          "required": false,
          "type": "string"
        },
        "steal-time-following": {
          "required": false,
          "type": "string"
        },
        "make-time": {
          "required": false,
          "type": "string"
        },
        "slash": {
          "required": false,
          "type": "yes-no",
          "std": false
        }
      }
    },
    {
      "//": "The chord element indicates that this note is an additional\nchord tone with the preceding note. The duration of this\nnote can be no longer than the preceding note. In MuseData,\na missing duration indicates the same length as the previous\nnote, but the MusicXML format requires a duration for chord\nnotes too.",
      "element": "chord",
      "interface": {},
      "empty": true
    },
    {
      "//": "The unpitched element indicates musical elements that are\nnotated on the staff but lack definite pitch, such as\nunpitched percussion and speaking voice. Like notes, it\nuses step and octave elements to indicate placement on the\nstaff, following the current clef. If percussion clef is\nused, the display-step and display-octave elements are\ninterpreted as if in treble clef, with a G in octave 4 on\nline 2. If not present, the note is placed on the middle\nline of the staff, generally used for a one-line staff.",
      "element": "unpitched",
      "interface": {
        "<display-step>": {
          "required": false
        },
        "<display-octave>": {
          "required": false
        }
      }
    },
    {
      "element": "alter",
      "interface": "number"
    },
    {
      "element": "octave",
      "interface": "number"
    },
    {
      "//": "Pitch is represented as a combination of the step of the\ndiatonic scale, the chromatic alteration, and the octave.\nThe step element uses the English letters A through G.\nThe alter element represents chromatic alteration in\nnumber of semitones (e.g., -1 for flat, 1 for sharp).\nDecimal values like 0.5 (quarter tone sharp) are\nused for microtones. The octave element is represented\nby the numbers 0 to 9, where 4 indicates the octave\nstarted by middle C.",
      "element": "pitch",
      "interface": {
        "<step>": {
          "type": "string",
          "required": false,
          "idx": 0
        },
        "<alter>": {
          "required": false
        },
        "<octave>": {
          "required": true
        }
      }
    },
    {
      "//": "The common note elements between cue/grace notes and\nregular (full) notes: pitch, chord, and rest information,\nbut not duration (cue and grace notes do not have\nduration encoded here). Unpitched elements are used for\nunpitched percussion, speaking voice, and other musical\nelements lacking determinate pitch.",
      "entity": "full-note",
      "interface": {
        "<chord>": {
          "required": false
        },
        "<pitch>": {
          "required": false
        },
        "<unpitched>": {
          "required": false
        },
        "<rest>": {
          "required": false
        }
      }
    },
    {
      "//": "The rest element indicates notated rests or silences. Rest\nelements are usually empty, but placement on the staff can\nbe specified using display-step and display-octave\nelements. If the measure attribute is set to yes, it\nindicates this is a complete measure rest.",
      "element": "rest",
      "interface": {
        "<display-step>": {
          "required": false
        },
        "<display-octave>": {
          "required": false
        },
        "measure": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "Duration is a positive number specified in division units.\nThis is the intended duration vs. notated duration (for\ninstance, swing eighths vs. even eighths, or differences\nin dotted notes in Baroque-era music). Differences in\nduration specific to an interpretation or performance\nshould use the note element's attack and release\nattributes.\n\nThe tie element indicates that a tie begins or ends with\nthis note. If the tie element applies only particular times\nthrough a repeat, the time-only attribute indicates which\ntimes to apply it. The tie element indicates sound; the tied\nelement indicates notation.",
      "element": "duration",
      "interface": "number"
    },
    {
      "//": "Duration is a positive number specified in division units.\nThis is the intended duration vs. notated duration (for\ninstance, swing eighths vs. even eighths, or differences\nin dotted notes in Baroque-era music). Differences in\nduration specific to an interpretation or performance\nshould use the note element's attack and release\nattributes.\n\nThe tie element indicates that a tie begins or ends with\nthis note. If the tie element applies only particular times\nthrough a repeat, the time-only attribute indicates which\ntimes to apply it. The tie element indicates sound; the tied\nelement indicates notation.",
      "element": "tie",
      "interface": {
        "_extends": [
          "time-only"
        ],
        "type": {
          "type": "start-stop",
          "required": false
        }
      },
      "empty": true
    },
    {
      "//": "If multiple score-instruments are specified on a\nscore-part, there should be an instrument element for\neach note in the part. The id attribute is an IDREF back\nto the score-instrument ID.",
      "element": "instrument",
      "interface": {
        "id": {
          "type": "string",
          "required": true
        }
      },
      "empty": true
    },
    {
      "//": "Notes are the most common type of MusicXML data. The\nMusicXML format keeps the MuseData distinction between\nelements used for sound information and elements used for\nnotation information (e.g., tie is used for sound, tied for\nnotation). Thus grace notes do not have a duration element.\nCue notes have a duration element, as do forward elements,\nbut no tie elements. Having these two types of information\navailable can make interchange considerably easier, as\nsome programs handle one type of information much more\nreadily than the other.",
      "element": "note",
      "interface": {
        "_extends": [
          "editorial-voice",
          "print-style",
          "printout",
          "time-only",
          "full-note"
        ],
        "<grace>": {
          "required": false
        },
        "<tie>": {
          "required": false,
          "array": true
        },
        "<cue>": {
          "required": false
        },
        "<duration>": {
          "required": false
        },
        "<instrument>": {
          "required": false
        },
        "<type>": {
          "required": false,
          "name": "noteType"
        },
        "<dot>": {
          "required": false,
          "array": true
        },
        "<accidental>": {
          "required": false
        },
        "<time-modification>": {
          "required": false
        },
        "<stem>": {
          "required": false
        },
        "<notehead>": {
          "required": false
        },
        "<notehead-text>": {
          "required": false
        },
        "<staff>": {
          "required": false
        },
        "<beam>": {
          "required": false,
          "array": true
        },
        "<notations>": {
          "required": false,
          "array": true
        },
        "<lyric>": {
          "required": false,
          "array": true
        },
        "<play>": {
          "required": false
        },
        "dynamics": {
          "type": "number",
          "required": false,
          "std": 90,
          "//": "The dynamics attribute corresponds to MIDI 1.0's Note On velocity.\nIt is expressed in terms of percentages of the default\nforte value (90 for MIDI 1.0). "
        },
        "end-dynamics": {
          "type": "number",
          "required": false,
          "std": 90,
          "//": "The end-dynamics attribute corresponds to MIDI 1.0's\nNote Off velocity. It is expressed in terms of percentages of the default\nforte value (90 for MIDI 1.0). "
        },
        "attack": {
          "type": "number",
          "required": false,
          "std": null,
          "//": "The attack attribute is used to alter the starting time\nof the note from when it would otherwise occur based on\nthe flow of durations - information that is specific to a\nperformance. It is expressed in terms of divisions,\neither positive or negative. A note that stops a tie\nshould not have an attack attribute. "
        },
        "release": {
          "type": "number",
          "required": false,
          "std": null,
          "//": "The release attribute is used to alter the stopping time\nof the note from when it would otherwise occur based on\nthe flow of durations - information that is specific to a\nperformance. It is expressed in terms of divisions,\neither positive or negative. A note that starts a tie should\nnot have a release attribute."
        },
        "pizzicato": {
          "type": "yes-no",
          "required": false,
          "std": false,
          "//": "The pizzicato attribute is used when just this note is sounded\npizzicato, vs. the pizzicato element which changes overall\nplayback between pizzicato and arco."
        }
      }
    },
    {
      "entity": "count",
      "enum": {
        "1024th": 1024,
        "512th": 512,
        "256th": 256,
        "128th": 128,
        "64th": 64,
        "32nd": 32,
        "16th": 16,
        "eighth": 8,
        "quarter": 4,
        "half": 2,
        "whole": 1,
        "breve": 9990,
        "long": 9991,
        "maxima": 9992
      }
    },
    {
      "//": "Type indicates the graphic note type, Valid values (from\nshortest to longest) are 1024th, 512th, 256th, 128th,\n64th, 32nd, 16th, eighth, quarter, half, whole, breve,\nlong, and maxima. The size attribute indicates full, cue,\nor large size, with full the default for regular notes and\ncue the default for cue and grace notes.",
      "element": "type",
      "interface": {
        "duration": {
          "type": "count",
          "child": true
        },
        "size": {
          "type": "symbol-size",
          "required": false,
          "std": "SymbolSize.Unspecified"
        }
      }
    },
    {
      "//": "One dot element is used for each dot of prolongation.\nThe placement element is used to specify whether the\ndot should appear above or below the staff line. It is\nignored for notes that appear on a staff space.",
      "element": "dot",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "entity": "mxml-accidental",
      "enum": {
        "sharp": 0,
        "natural": 1,
        "flat": 2,
        "double-sharp": 3,
        "sharp-sharp": 4,
        "flat-flat": 5,
        "natural-sharp": 6,
        "natural-flat": 7,
        "quarter-flat": 8,
        "quarter-sharp": 9,
        "three-quarters-flat": 10,
        "three-quarters-sharp": 11,
        "sharp-down": 12,
        "sharp-up": 13,
        "natural-down": 14,
        "natural-up": 15,
        "flat-down": 16,
        "flat-up": 17,
        "triple-sharp": 18,
        "triple-flat": 19,
        "slash-quarter-sharp": 19,
        "slash-sharp": 20,
        "slash-flat": 21,
        "double-slash-flat": 22,
        "sharp-1": 23,
        "sharp-2": 24,
        "sharp-3": 25,
        "sharp-4": 251,
        "sharp-5": 26,
        "flat-1": 27,
        "flat-2": 28,
        "flat-3": 29,
        "flat-4": 291,
        "flat-5": 30,
        "sori": 31,
        "koron": 32,
        "double-flat": 33
      }
    },
    {
      "//": "Actual notated accidentals. Valid values include: sharp,\nnatural, flat, double-sharp, sharp-sharp, flat-flat,\nnatural-sharp, natural-flat, quarter-flat, quarter-sharp,\nthree-quarters-flat, three-quarters-sharp, sharp-down,\nsharp-up, natural-down, natural-up, flat-down, flat-up,\ntriple-sharp, triple-flat, slash-quarter-sharp,\nslash-sharp, slash-flat, double-slash-flat, sharp-1,\nsharp-2, sharp-3, sharp-5, flat-1, flat-2, flat-3,\nflat-4, sori, and koron.\n\nThe quarter- and three-quarters- accidentals are\nTartini-style quarter-tone accidentals. The -down and -up\naccidentals are quarter-tone accidentals that include\narrows pointing down or up. The slash- accidentals\nare used in Turkish classical music. The numbered\nsharp and flat accidentals are superscripted versions\nof the accidental signs, used in Turkish folk music.\nThe sori and koron accidentals are microtonal sharp and\nflat accidentals used in Iranian and Persian music.\n\nEditorial and cautionary indications are indicated\nby attributes. Values for these attributes are \"no\" if not\npresent. Specific graphic display such as parentheses,\nbrackets, and size are controlled by the level-display\nentity defined in the common.mod file.",
      "element": "accidental",
      "interface": {
        "_extends": [
          "level-display",
          "print-style"
        ],
        "accidental": {
          "child": true,
          "type": "mxml-accidental",
          "required": true
        },
        "cautionary": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "editorial": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "Time modification indicates tuplets, double-note tremolos,\nand other durational changes. A time-modification element\nshows how the cumulative, sounding effect of tuplets and\ndouble-note tremolos compare to the written note type\nrepresented by the type and dot elements. The child elements\nare defined in the common.mod file. Nested tuplets and other\nnotations that use more detailed information need both the\ntime-modification and tuplet elements to be represented\naccurately.",
      "element": "time-modification",
      "interface": {
        "<actual-notes>": {
          "required": true
        },
        "<normal-notes>": {
          "required": true
        },
        "<normal-type>": {
          "required": false
        },
        "<normal-dot>": {
          "array": true,
          "required": false
        }
      }
    },
    {
      "entity": "stem-type",
      "enum": {
        "down": 0,
        "up": 1,
        "none": 2,
        "double": 3
      }
    },
    {
      "//": "Stems can be down, up, none, or double. For down and up\nstems, the position attributes can be used to specify\nstem length. The relative values specify the end of the\nstem relative to the program default. Default values\nspecify an absolute end stem position. Negative values of\nrelative-y that would flip a stem instead of shortening\nit are ignored. A stem element associated with a rest\nrefers to a stemlet.",
      "element": "stem",
      "interface": {
        "_extends": [
          "position",
          "color"
        ],
        "type": {
          "child": true,
          "type": "stem-type"
        }
      }
    },
    {
      "element": "notehead-type",
      "enum": {
        "slash": 0,
        "triangle": 1,
        "diamond": 2,
        "square": 3,
        "cross": 4,
        "x": 5,
        "circle-x": 6,
        "inverted triangle": 7,
        "arrow down": 8,
        "arrow up": 9,
        "slashed": 10,
        "back slashed": 11,
        "normal": 12,
        "cluster": 13,
        "circle dot": 14,
        "left triangle": 15,
        "nrectangle": 16,
        "none": 17,
        "do": 18,
        "re": 19,
        "mi": 20,
        "fa": 21,
        "fa up": 22,
        "so": 23,
        "la": 24,
        "ti": 25
      }
    },
    {
      "//": "The notehead element indicates shapes other than the open\nand closed ovals associated with note durations. The element\nvalue can be slash, triangle, diamond, square, cross, x,\ncircle-x, inverted triangle, arrow down, arrow up, slashed,\nback slashed, normal, cluster, circle dot, left triangle,\nrectangle, or none. For shape note music, the element values\ndo, re, mi, fa, fa up, so, la, and ti are also used,\ncorresponding to Aikin's 7-shape system. The fa up shape is\ntypically used with upstems; the fa shape is typically used\nwith downstems or no stems.\n\nThe arrow shapes differ from triangle and inverted triangle\nby being centered on the stem. Slashed and back slashed\nnotes include both the normal notehead and a slash. The\ntriangle shape has the tip of the triangle pointing up;\nthe inverted triangle shape has the tip of the triangle\npointing down. The left triangle shape is a right triangle\nwith the hypotenuse facing up and to the left.\n\nFor the enclosed shapes, the default is to be hollow for\nhalf notes and longer, and filled otherwise. The filled\nattribute can be set to change this if needed.\n\nIf the parentheses attribute is set to yes, the notehead\nis parenthesized. It is no by default.\n\nThe notehead-text element indicates text that is displayed\ninside a notehead, as is done in some educational music.\nIt is not needed for the numbers used in tablature or jianpu\nnotation. The presence of a TAB or jianpu clefs is sufficient\nto indicate that numbers are used. The display-text and\naccidental-text elements allow display of fully formatted\ntext and accidentals.",
      "element": "notehead",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "type": {
          "child": true,
          "type": "notehead-type"
        },
        "filled": {
          "type": "yes-no",
          "required": false
        },
        "parentheses": {
          "type": "yes-no",
          "required": false
        }
      }
    },
    {
      "//": "The notehead element indicates shapes other than the open\nand closed ovals associated with note durations. The element\nvalue can be slash, triangle, diamond, square, cross, x,\ncircle-x, inverted triangle, arrow down, arrow up, slashed,\nback slashed, normal, cluster, circle dot, left triangle,\nrectangle, or none. For shape note music, the element values\ndo, re, mi, fa, fa up, so, la, and ti are also used,\ncorresponding to Aikin's 7-shape system. The fa up shape is\ntypically used with upstems; the fa shape is typically used\nwith downstems or no stems.\n\nThe arrow shapes differ from triangle and inverted triangle\nby being centered on the stem. Slashed and back slashed\nnotes include both the normal notehead and a slash. The\ntriangle shape has the tip of the triangle pointing up;\nthe inverted triangle shape has the tip of the triangle\npointing down. The left triangle shape is a right triangle\nwith the hypotenuse facing up and to the left.\n\nFor the enclosed shapes, the default is to be hollow for\nhalf notes and longer, and filled otherwise. The filled\nattribute can be set to change this if needed.\n\nIf the parentheses attribute is set to yes, the notehead\nis parenthesized. It is no by default.\n\nThe notehead-text element indicates text that is displayed\ninside a notehead, as is done in some educational music.\nIt is not needed for the numbers used in tablature or jianpu\nnotation. The presence of a TAB or jianpu clefs is sufficient\nto indicate that numbers are used. The display-text and\naccidental-text elements allow display of fully formatted\ntext and accidentals.",
      "element": "notehead-text",
      "interface": {
        "text": {
          "child": true,
          "type": "TextArray"
        }
      },
      "auto": false
    },
    {
      "entity": "beam-type",
      "enum": {
        "begin": 0,
        "continue": 1,
        "end": 2,
        "forward hook": 3,
        "backward hook": 4
      }
    },
    {
      "entity": "accel-rit-none",
      "enum": {
        "accel": 0,
        "rit": 1,
        "none": 2
      }
    },
    {
      "//": "Beam types include begin, continue, end, forward hook, and\nbackward hook. Up to eight concurrent beams are available to\ncover up to 1024th notes, using an enumerated type defined\nin the common.mod file. Each beam in a note is represented\nwith a separate beam element, starting with the eighth note\nbeam using a number attribute of 1.\n\nNote that the beam number does not distinguish sets of\nbeams that overlap, as it does for slur and other elements.\nBeaming groups are distinguished by being in different\nvoices and/or the presence or absence of grace and cue\nelements.\n\nBeams that have a begin value can also have a fan attribute to\nindicate accelerandos and ritardandos using fanned beams. The\nfan attribute may also be used with a continue value if the\nfanning direction changes on that note. The value is \"none\" if not specified.\n\nThe repeater attribute has been deprecated in MusicXML 3.0.\nFormerly used for tremolos, it needs to be specified with a\n\"yes\" value for each beam using it.",
      "element": "beam",
      "interface": {
        "type": {
          "child": true,
          "type": "beam-type"
        },
        "number": {
          "type": "beam-level",
          "std": 1
        },
        "repeater": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "fan": {
          "type": "accel-rit-none",
          "required": false,
          "std": "AccelRitNone.None"
        }
      }
    },
    {
      "//": "Notations are musical notations, not XML notations. Multiple\nnotations are allowed in order to represent multiple editorial\nlevels. The print-object attribute, added in Version 3.0,\nallows notations to represent details of performance technique,\nsuch as fingerings, without having them appear in the score.",
      "element": "notations",
      "interface": {
        "_extends": [
          "editorial",
          "print-object"
        ],
        "<tied>": {
          "array": true,
          "required": false
        },
        "<slur>": {
          "array": true,
          "required": false
        },
        "<tuplet>": {
          "array": true,
          "required": false
        },
        "<glissando>": {
          "array": true,
          "required": false
        },
        "<slide>": {
          "array": true,
          "required": false
        },
        "<ornaments>": {
          "array": true,
          "required": false
        },
        "<technical>": {
          "array": true,
          "required": false
        },
        "<articulations>": {
          "array": true,
          "required": false
        },
        "<dynamics>": {
          "array": true,
          "required": false
        },
        "<fermata>": {
          "array": true,
          "required": false
        },
        "<arpeggiate>": {
          "array": true,
          "required": false
        },
        "<non-arpeggiate>": {
          "array": true,
          "required": false
        },
        "<accidental-mark>": {
          "array": true,
          "required": false
        },
        "<other-notation>": {
          "array": true,
          "required": false
        }
      }
    },
    {
      "//": "The tied element represents the notated tie. The tie element\nrepresents the tie sound.\n\nThe number attribute is rarely needed to disambiguate ties,\nsince note pitches will usually suffice. The attribute is\nimplied rather than defaulting to 1 as with most elements.\nIt is available for use in more complex tied notation\nsituations.",
      "element": "tied",
      "empty": true,
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "position",
          "placement",
          "orientation",
          "bezier",
          "color"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": true
        },
        "number": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "Slur elements are empty. Most slurs are represented with\ntwo elements: one with a start type, and one with a stop\ntype. Slurs can add more elements using a continue type.\nThis is typically used to specify the formatting of cross-\nsystem slurs, or to specify the shape of very complex slurs.",
      "element": "slur",
      "empty": true,
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "position",
          "placement",
          "orientation",
          "bezier",
          "color"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": true
        },
        "number": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "entity": "actual-both-none",
      "enum": {
        "actual": 0,
        "both": 1,
        "none": 2
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet",
      "interface": {
        "_extends": [
          "line-shape",
          "position",
          "placement"
        ],
        "<tuplet-actual>": {
          "required": false
        },
        "<tuplet-normal>": {
          "required": false
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "number": {
          "type": "number-level",
          "required": true
        },
        "bracket": {
          "type": "yes-no",
          "required": false,
          "std": false
        },
        "show-number": {
          "type": "actual-both-none",
          "required": false,
          "std": "ActualBothNone.Actual"
        },
        "show-type": {
          "type": "actual-both-none",
          "required": false,
          "std": "ActualBothNone.None"
        }
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet-actual",
      "interface": {
        "<tuplet-number>": {
          "required": false
        },
        "<tuplet-type>": {
          "required": false
        },
        "<tuplet-dot>": {
          "required": false,
          "array": true
        }
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet-normal",
      "interface": {
        "<tuplet-number>": {
          "required": false
        },
        "<tuplet-type>": {
          "required": false
        },
        "<tuplet-dot>": {
          "required": false,
          "array": true
        }
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet-number",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "text": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet-type",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "text": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "A tuplet element is present when a tuplet is to be displayed\ngraphically, in addition to the sound data provided by the\ntime-modification elements. The number attribute is used to\ndistinguish nested tuplets. The bracket attribute is used\nto indicate the presence of a bracket. If unspecified, the\nresults are implementation-dependent. The line-shape\nattribute is used to specify whether the bracket is straight\nor in the older curved or slurred style. It is straight by\ndefault.\n\nWhereas a time-modification element shows how the cumulative,\nsounding effect of tuplets and double-note tremolos compare to\nthe written note type, the tuplet element describes how this\nis displayed. The tuplet element also provides more detailed\nrepresentation information than the time-modification element,\nand is needed to represent nested tuplets and other complex\ntuplets accurately. The tuplet-actual and tuplet-normal\nelements provide optional full control over tuplet\nspecifications. Each allows the number and note type\n(including dots) describing a single tuplet. If any of\nthese elements are absent, their values are based on the\ntime-modification element.\n\nThe show-number attribute is used to display either the\nnumber of actual notes, the number of both actual and\nnormal notes, or neither. It is actual by default. The\nshow-type attribute is used to display either the actual\ntype, both the actual and normal types, or neither. It is\nnone by default.",
      "element": "tuplet-dot",
      "empty": true,
      "interface": {
        "_extends": [
          "font",
          "color"
        ]
      }
    },
    {
      "//": "Glissando and slide elements both indicate rapidly moving\nfrom one pitch to the other so that individual notes are not\ndiscerned. The distinction is similar to that between NIFF's\nglissando and portamento elements. A glissando sounds the\nhalf notes in between the slide and defaults to a wavy line.\nA slide is continuous between two notes and defaults to a\nsolid line. The optional text for a glissando or slide is\nprinted alongside the line.",
      "element": "glissando",
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "print-style"
        ],
        "text": {
          "child": true,
          "type": "string",
          "required": false
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "normal": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "Glissando and slide elements both indicate rapidly moving\nfrom one pitch to the other so that individual notes are not\ndiscerned. The distinction is similar to that between NIFF's\nglissando and portamento elements. A glissando sounds the\nhalf notes in between the slide and defaults to a wavy line.\nA slide is continuous between two notes and defaults to a\nsolid line. The optional text for a glissando or slide is\nprinted alongside the line.",
      "element": "slide",
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "print-style",
          "bend-sound"
        ],
        "text": {
          "child": true,
          "type": "string",
          "required": false
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "normal": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "//": "The other-notation element is used to define any notations\nnot yet in the MusicXML format. This allows extended\nrepresentation, though without application interoperability.\nIt handles notations where more specific extension elements\nsuch as other-dynamics and other-technical are not\nappropriate.",
      "element": "other-notation",
      "interface": {
        "_extends": [
          "print-object",
          "print-style",
          "placement"
        ],
        "type": {
          "type": "start-stop-single",
          "required": true
        },
        "data": {
          "child": true,
          "type": "string",
          "required": false
        }
      }
    },
    {
      "//": "The other-direction element is used to define any direction\nsymbols not yet in the current version of the MusicXML\nformat. This allows extended representation, though without\napplication interoperability.",
      "element": "other-direction",
      "interface": {
        "_extends": [
          "print-object",
          "print-style-align"
        ],
        "data": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "Ornaments can be any of several types, followed optionally\nby accidentals. The accidental-mark element's content is\nrepresented the same as an accidental element, but with a\ndifferent name to reflect the different musical meaning.",
      "element": "ornaments",
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "<trill-mark>": {
          "required": false
        },
        "<turn>": {
          "required": false
        },
        "<delayed-turn>": {
          "required": false
        },
        "<inverted-turn>": {
          "required": false
        },
        "<delayed-inverted-turn>": {
          "required": false
        },
        "<vertical-turn>": {
          "required": false
        },
        "<shake>": {
          "required": false
        },
        "<wavy-line>": {
          "required": false
        },
        "<mordent>": {
          "required": false
        },
        "<inverted-mordent>": {
          "required": false
        },
        "<schleifer>": {
          "required": false
        },
        "<tremolo>": {
          "required": false
        },
        "<other-ornament>": {
          "required": false
        },
        "<accidental-mark>": {
          "array": true,
          "required": false
        }
      }
    },
    {
      "element": "trill-mark",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ]
      }
    },
    {
      "//": "the turn and delayed-turn elements are the normal turn\nshape which goes up then down. the inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. the delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. the vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nif the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "turn",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "slash": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The turn and delayed-turn elements are the normal turn\nshape which goes up then down. The inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. The delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. The vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nIf the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "delayed-turn",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "slash": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The turn and delayed-turn elements are the normal turn\nshape which goes up then down. The inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. The delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. The vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nIf the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "inverted-turn",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "slash": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The turn and delayed-turn elements are the normal turn\nshape which goes up then down. The inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. The delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. The vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nIf the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "delayed-inverted-turn",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "slash": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The turn and delayed-turn elements are the normal turn\nshape which goes up then down. The inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. The delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. The vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nIf the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "vertical-turn",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ]
      }
    },
    {
      "//": "The turn and delayed-turn elements are the normal turn\nshape which goes up then down. The inverted-turn and\ndelayed-inverted-turn elements have the shape which goes\ndown and then up. The delayed-turn and delayed-inverted-turn\nelements indicate turns that are delayed until the end of the\ncurrent note. The vertical-turn element has the shape\narranged vertically going from upper left to lower right.\nIf the slash attribute is yes, then a vertical line is used\nto slash the turn; it is no by default.",
      "element": "shake",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ]
      }
    },
    {
      "//": "The long attribute for the mordent and inverted-mordent\nelements is \"no\" by default. The mordent element represents\nthe sign with the vertical line; the inverted-mordent\nelement represents the sign without the vertical line.\nThe approach and departure attributes are used for compound\nornaments, indicating how the beginning and ending of the\nornament look relative to the main part of the mordent.",
      "element": "mordent",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "long": {
          "type": "yes-no",
          "required": false
        },
        "approach": {
          "type": "above-below",
          "required": false
        },
        "departure": {
          "type": "above-below",
          "required": false
        }
      }
    },
    {
      "//": "The long attribute for the mordent and inverted-mordent\nelements is \"no\" by default. The mordent element represents\nthe sign with the vertical line; the inverted-mordent\nelement represents the sign without the vertical line.\nThe approach and departure attributes are used for compound\nornaments, indicating how the beginning and ending of the\nornament look relative to the main part of the mordent.",
      "element": "inverted-mordent",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement",
          "trill-sound"
        ],
        "long": {
          "type": "yes-no",
          "required": false
        },
        "approach": {
          "type": "above-below",
          "required": false
        },
        "departure": {
          "type": "above-below",
          "required": false
        }
      }
    },
    {
      "//": "The name for this ornament is based on the German,\nto avoid confusion with the more common slide element\ndefined earlier.",
      "element": "schleifer",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The tremolo ornament can be used to indicate either\nsingle-note or double-note tremolos. Single-note tremolos\nuse the single type, while double-note tremolos use the\nstart and stop types. The default is \"single\" for\ncompatibility with Version 1.1. The text of the element\nindicates the number of tremolo marks and is an integer\nfrom 0 to 8. Note that the number of attached beams is\nnot included in this value, but is represented separately\nusing the beam element.\n\nWhen using double-note tremolos, the duration of each note\nin the tremolo should correspond to half of the notated type\nvalue. A time-modification element should also be added with\nan actual-notes value of 2 and a normal-notes value of 1. If\nused within a tuplet, this 2/1 ratio should be multiplied by\nthe existing tuplet ratio.\n\nUsing repeater beams for indicating tremolos is deprecated as\nof MusicXML 3.0.",
      "element": "tremolo",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "child": true,
          "type": "string",
          "required": false
        },
        "type": {
          "type": "start-stop-single",
          "std": "StartStopSingle.Single"
        }
      }
    },
    {
      "//": "The other-ornament element is used to define any ornaments\nnot yet in the MusicXML format. This allows extended\nrepresentation, though without application interoperability.",
      "element": "other-ornament",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "type": {
          "type": "start-stop-single",
          "required": true
        },
        "data": {
          "child": true,
          "type": "string",
          "required": false
        }
      }
    },
    {
      "//": "An accidental-mark can be used as a separate notation or\nas part of an ornament. When used in an ornament, position\nand placement are relative to the ornament, not relative to\nthe note.",
      "element": "accidental-mark",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "mark": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "Technical indications give performance information for\nindividual instruments.",
      "element": "technical",
      "interface": {
        "<up-bow>": {
          "required": false
        },
        "<down-bow>": {
          "required": false
        },
        "<harmonic>": {
          "required": false
        },
        "<open-string>": {
          "required": false
        },
        "<thumb-position>": {
          "required": false
        },
        "<fingering>": {
          "required": false
        },
        "<pluck>": {
          "required": false
        },
        "<double-tongue>": {
          "required": false
        },
        "<triple-tongue>": {
          "required": false
        },
        "<stopped>": {
          "required": false
        },
        "<snap-pizzicato>": {
          "required": false
        },
        "<fret>": {
          "required": false
        },
        "<string>": {
          "required": false
        },
        "<hammer-on>": {
          "required": false
        },
        "<pull-off>": {
          "required": false
        },
        "<bend>": {
          "required": false
        },
        "<tap>": {
          "required": false
        },
        "<heel>": {
          "required": false
        },
        "<toe>": {
          "required": false
        },
        "<fingernails>": {
          "required": false
        },
        "<hole>": {
          "required": false
        },
        "<arrow>": {
          "required": false
        },
        "<handbell>": {
          "required": false
        },
        "<other-technical>": {
          "required": false
        }
      }
    },
    {
      "//": "The up-bow element represents the symbol that is used both\nfor up-bowing on bowed instruments, and up-stroke on plucked\ninstruments.",
      "element": "up-bow",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The down-bow element represents the symbol that is used both\nfor down-bowing on bowed instruments, and down-stroke on\nplucked instruments.",
      "element": "down-bow",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The harmonic element indicates natural and artificial\nharmonics. Natural harmonics usually notate the base\npitch rather than the sounding pitch. Allowing the type\nof pitch to be specified, combined with controls for\nappearance/playback differences, allows both the notation\nand the sound to be represented. Artificial harmonics can\nadd a notated touching-pitch; the pitch or fret at which\nthe string is touched lightly to produce the harmonic.\nArtificial pinch harmonics will usually not notate a\ntouching pitch. The attributes for the harmonic element\nrefer to the use of the circular harmonic symbol, typically\nbut not always used with natural harmonics.",
      "element": "harmonic",
      "interface": {
        "_extends": [
          "print-object",
          "print-style",
          "placement"
        ],
        "<natural>": "__flag__",
        "<artificial>": "__flag__",
        "<base-pitch>": "__flag__",
        "<touching-pitch>": "__flag__",
        "<sounding-pitch>": "__flag__"
      }
    },
    {
      "//": "The open-string element represents the zero-shaped\nopen string symbol.",
      "element": "open-string",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The thumb-position element represents the thumb position\nsymbol. This is a circle with a line, where the line does\nnot come within the circle. It is distinct from the snap\npizzicato symbol, where the line comes inside the circle.",
      "element": "thumb-position",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The pluck element is used to specify the plucking fingering\non a fretted instrument, where the fingering element refers\nto the fretting fingering. Typical values are p, i, m, a for\npulgar/thumb, indicio/index, medio/middle, and anular/ring\nfingers.",
      "element": "pluck",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "The double-tongue element represents the double tongue symbol\n(two dots arranged horizontally).",
      "element": "double-tongue",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The triple-tongue element represents the triple tongue symbol\n(three dots arranged horizontally).",
      "element": "triple-tongue",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The stopped element represents the stopped symbol, which looks\nlike a plus sign.",
      "element": "stopped",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The snap-pizzicato element represents the snap pizzicato\nsymbol. This is a circle with a line, where the line comes\ninside the circle. It is distinct from the thumb-position\nsymbol, where the line does not come inside the circle.",
      "element": "snap-pizzicato",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The hammer-on and pull-off elements are used in guitar\nand fretted instrument notation. Since a single slur\ncan be marked over many notes, the hammer-on and pull-off\nelements are separate so the individual pair of notes can\nbe specified. The element content can be used to specify\nhow the hammer-on or pull-off should be notated. An empty\nelement leaves this choice up to the application.",
      "element": "hammer-on",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "type": {
          "type": "start-stop",
          "required": true
        },
        "number": {
          "type": "number",
          "required": false,
          "std": 1
        },
        "data": {
          "type": "string",
          "child": true,
          "required": false
        }
      }
    },
    {
      "//": "The hammer-on and pull-off elements are used in guitar\nand fretted instrument notation. Since a single slur\ncan be marked over many notes, the hammer-on and pull-off\nelements are separate so the individual pair of notes can\nbe specified. The element content can be used to specify\nhow the hammer-on or pull-off should be notated. An empty\nelement leaves this choice up to the application.",
      "element": "pull-off",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "type": {
          "type": "start-stop",
          "required": true
        },
        "number": {
          "type": "number",
          "required": false,
          "std": 1
        },
        "data": {
          "type": "string",
          "child": true,
          "required": false
        }
      }
    },
    {
      "//": "The bend element is used in guitar and tablature. The\nbend-alter element indicates the number of steps in the\nbend, similar to the alter element. As with the alter\nelement, numbers like 0.5 can be used to indicate\nmicrotones. Negative numbers indicate pre-bends or\nreleases; the pre-bend and release elements are used\nto distinguish what is intended. A with-bar element\nindicates that the bend is to be done at the bridge\nwith a whammy or vibrato bar. The content of the\nelement indicates how this should be notated.",
      "element": "bend",
      "interface": {
        "_extends": [
          "print-style",
          "bend-sound"
        ],
        "<bend-alter>": {
          "required": true
        },
        "<pre-bend>": "__flag__",
        "<release>": "__flag__",
        "<with-bar>": {
          "required": false
        }
      }
    },
    {
      "//": "The bend element is used in guitar and tablature. The\nbend-alter element indicates the number of steps in the\nbend, similar to the alter element. As with the alter\nelement, numbers like 0.5 can be used to indicate\nmicrotones. Negative numbers indicate pre-bends or\nreleases; the pre-bend and release elements are used\nto distinguish what is intended. A with-bar element\nindicates that the bend is to be done at the bridge\nwith a whammy or vibrato bar. The content of the\nelement indicates how this should be notated.",
      "element": "with-bar",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "The tap element indicates a tap on the fretboard. The\nelement content allows specification of the notation;\n+ and T are common choices. If empty, the display is\napplication-specific.",
      "element": "tap",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "//": "The heel and toe element are used with organ pedals. The\nsubstitution value is \"no\" if the attribute is not present.",
      "element": "heel",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "substitution": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The heel and toe element are used with organ pedals. The\nsubstitution value is \"no\" if the attribute is not present.",
      "element": "toe",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "substitution": {
          "type": "yes-no",
          "required": false,
          "std": false
        }
      }
    },
    {
      "//": "The fingernails element is used in notation for harp and\nother plucked string instruments.",
      "element": "fingernails",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The hole element represents the symbols used for woodwind\nand brass fingerings as well as other notations. The content\nof the optional hole-type element indicates what the hole\nsymbol represents in terms of instrument fingering or other\ntechniques. The hole-closed element represents whether the\nhole is closed, open, or half-open. Valid element values are\nyes, no, and half. The optional location attribute indicates\nwhich portion of the hole is filled in when the element value\nis half. The optional hole-shape element indicates the shape\nof the hole symbol; the default is a circle.",
      "element": "hole",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "<hole-type>": {
          "required": false
        },
        "<hole-closed>": {
          "required": true
        },
        "<hole-shape>": {
          "required": true
        }
      }
    },
    {
      "entity": "hole-location",
      "enum": {
        "right": 0,
        "bottom": 1,
        "left": 2,
        "top": 3
      }
    },
    {
      "entity": "hole-closed-type",
      "enum": {
        "yes": 0,
        "no": 1,
        "half": 2
      }
    },
    {
      "//": "The hole element represents the symbols used for woodwind\nand brass fingerings as well as other notations. The content\nof the optional hole-type element indicates what the hole\nsymbol represents in terms of instrument fingering or other\ntechniques. The hole-closed element represents whether the\nhole is closed, open, or half-open. Valid element values are\nyes, no, and half. The optional location attribute indicates\nwhich portion of the hole is filled in when the element value\nis half. The optional hole-shape element indicates the shape\nof the hole symbol; the default is a circle.",
      "element": "hole-closed",
      "interface": {
        "data": {
          "type": "hole-closed-type",
          "child": true
        },
        "location": {
          "type": "hole-location",
          "required": false
        }
      }
    },
    {
      "//": "The arrow element represents an arrow used for a musical\ntechnical indication. Straight arrows are represented with\nan arrow-direction element and an optional arrow-style\nelement. Circular arrows are represented with a\ncircular-arrow element. Descriptive values use Unicode\narrow terminology.\n\nValues for the arrow-direction element are left, up, right,\ndown, northwest, northeast, southeast, southwest, left right,\nup down, northwest southeast, northeast southwest, and other.\n\nValues for the arrow-style element are single, double,\nfilled, hollow, paired, combined, and other. Filled and\nhollow arrows indicate polygonal single arrows. Paired\narrows are duplicate single arrows in the same direction.\nCombined arrows apply to double direction arrows like\nleft right, indicating that an arrow in one direction\nshould be combined with an arrow in the other direction.\n\nValues for the circular-arrow element are clockwise and\nanticlockwise.",
      "element": "arrow",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "<arrow-direction>": {
          "required": false
        },
        "<arrow-style>": {
          "required": false
        },
        "<circular-arrow>": {
          "required": false
        }
      }
    },
    {
      "//": "The handbell element represents notation for various\ntechniques used in handbell and handchime music. Valid\nvalues are damp, echo, gyro, hand martellato, mallet lift,\nmallet table, martellato, martellato lift,\nmuted martellato, pluck lift, and swing.",
      "element": "handbell",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "The other-technical element is used to define any technical\nindications not yet in the MusicXML format. This allows\nextended representation, though without application\ninteroperability.",
      "element": "other-technical",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "Articulations and accents are grouped together here.",
      "element": "articulations",
      "interface": {
        "<accent>": {
          "required": false
        },
        "<strong-accent>": {
          "required": false
        },
        "<staccato>": {
          "required": false
        },
        "<tenuto>": {
          "required": false
        },
        "<detached-legato>": {
          "required": false
        },
        "<staccatissimo>": {
          "required": false
        },
        "<spiccato>": {
          "required": false
        },
        "<scoop>": {
          "required": false
        },
        "<plop>": {
          "required": false
        },
        "<doit>": {
          "required": false
        },
        "<falloff>": {
          "required": false
        },
        "<breath-mark>": {
          "required": false
        },
        "<caesura>": {
          "required": false
        },
        "<stress>": {
          "required": false
        },
        "<unstress>": {
          "required": false
        },
        "<other-articulation>": {
          "required": false,
          "array": true
        }
      }
    },
    {
      "element": "accent",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "element": "strong-accent",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "type": {
          "type": "up-down",
          "std": "UpDown.Up",
          "required": false
        }
      }
    },
    {
      "//": "The staccato element is used for a dot articulation, as\nopposed to a stroke or a wedge.",
      "element": "staccato",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "element": "tenuto",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "element": "detached-legato",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The staccatissimo element is used for a wedge articulation,\nas opposed to a dot or a stroke.",
      "element": "staccatissimo",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The spiccato element is used for a stroke articulation, as\nopposed to a dot or a wedge.",
      "element": "spiccato",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The scoop, plop, doit, and falloff elements are\nindeterminate slides attached to a single note.\nScoops and plops come before the main note, coming\nfrom below and above the pitch, respectively. Doits\nand falloffs come after the main note, going above\nand below the pitch, respectively.",
      "element": "scoop",
      "empty": true,
      "interface": {
        "_extends": [
          "line-shape",
          "line-type",
          "dashed-formatting",
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The scoop, plop, doit, and falloff elements are\nindeterminate slides attached to a single note.\nScoops and plops come before the main note, coming\nfrom below and above the pitch, respectively. Doits\nand falloffs come after the main note, going above\nand below the pitch, respectively.",
      "element": "plop",
      "empty": true,
      "interface": {
        "_extends": [
          "line-shape",
          "line-type",
          "dashed-formatting",
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The scoop, plop, doit, and falloff elements are\nindeterminate slides attached to a single note.\nScoops and plops come before the main note, coming\nfrom below and above the pitch, respectively. Doits\nand falloffs come after the main note, going above\nand below the pitch, respectively.",
      "element": "doit",
      "empty": true,
      "interface": {
        "_extends": [
          "line-shape",
          "line-type",
          "dashed-formatting",
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The scoop, plop, doit, and falloff elements are\nindeterminate slides attached to a single note.\nScoops and plops come before the main note, coming\nfrom below and above the pitch, respectively. Doits\nand falloffs come after the main note, going above\nand below the pitch, respectively.",
      "element": "falloff",
      "empty": true,
      "interface": {
        "_extends": [
          "line-shape",
          "line-type",
          "dashed-formatting",
          "print-style",
          "placement"
        ]
      }
    },
    {
      "entity": "breath-mark-type",
      "enum": {
        "comma": 0,
        "tick": 1,
        "": 2
      }
    },
    {
      "//": "The breath-mark element may have a text value to\nindicate the symbol used for the mark. Valid values are\ncomma, tick, and an empty string.",
      "element": "breath-mark",
      "interface": {
        "_extends": [
          "line-shape",
          "line-type",
          "dashed-formatting",
          "print-style",
          "placement"
        ],
        "type": {
          "type": "breath-mark-type",
          "child": true
        }
      }
    },
    {
      "element": "caesura",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "element": "stress",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "element": "unstress",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ]
      }
    },
    {
      "//": "The other-articulation element is used to define any\narticulations not yet in the MusicXML format. This allows\nextended representation, though without application\ninteroperability.",
      "element": "other-articulation",
      "interface": {
        "_extends": [
          "print-style",
          "placement"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "The arpeggiate element indicates that this note is part of\nan arpeggiated chord. The number attribute can be used to\ndistinguish between two simultaneous chords arpeggiated\nseparately (different numbers) or together (same number).\nThe up-down attribute is used if there is an arrow on the\narpeggio sign. By default, arpeggios go from the lowest to\nhighest note.",
      "element": "arpeggiate",
      "empty": true,
      "interface": {
        "_extends": [
          "position",
          "placement",
          "color"
        ],
        "number": {
          "type": "number-level",
          "std": 1,
          "required": false
        },
        "direction": {
          "type": "up-down",
          "required": false,
          "std": "UpDown.Up"
        }
      }
    },
    {
      "//": "The non-arpeggiate element indicates that this note is at\nthe top or bottom of a bracket indicating to not arpeggiate\nthese notes. Since this does not involve playback, it is\nonly used on the top or bottom notes, not on each note\nas for the arpeggiate element.",
      "element": "non-arpeggiate",
      "empty": true,
      "interface": {
        "_extends": [
          "position",
          "placement",
          "color"
        ],
        "type": {
          "type": "top-bottom",
          "required": true
        },
        "number": {
          "type": "number-level",
          "required": false,
          "std": 1
        }
      }
    },
    {
      "element": "laughing",
      "interface": {},
      "//": "Humming and laughing representations are taken from\nHumdrum."
    },
    {
      "element": "humming",
      "interface": {},
      "//": "Humming and laughing representations are taken from\nHumdrum."
    },
    {
      "element": "end-line",
      "interface": {},
      "//": "The end-line and end-paragraph elements come\nfrom RP-017 for Standard MIDI File Lyric meta-events;\nthey help facilitate lyric display for Karaoke and\nsimilar applications."
    },
    {
      "element": "end-paragraph",
      "interface": {},
      "//": "The end-line and end-paragraph elements come\nfrom RP-017 for Standard MIDI File Lyric meta-events;\nthey help facilitate lyric display for Karaoke and\nsimilar applications."
    },
    {
      "element": "lyric-parts",
      "ordered": true,
      "interface": {
        "<syllabic>": {},
        "<text>": {},
        "<elision>": {},
        "<extend>": {},
        "<laughing>": {},
        "<humming>": {},
        "<end-line>": {},
        "<end-paragraph>": {}
      },
      "//": "Fake element containing ordered content. Children of lyric-parts are actually children of lyric. See lyric.",
      "array": true
    },
    {
      "//": "Text underlays for lyrics, based on Humdrum with support\nfor other formats.\n\nIMPORTANT: <lyric-parts> is fake. All children of lyric-parts\nare actually children of lyric. This is a construct invented by\nmusicxml-interfaces for separating ordered and unordered\ncontent.\n\nLanguage names for text elements come from ISO 639,\nwith optional country subcodes from ISO 3166. muiscxml-interfaces\ncurrently ignores this field. \n\nJustification is center by default; placement is\nbelow by default. The print-object attribute can override\na note's print-lyric attribute in cases where only some\nlyrics on a note are printed, as when lyrics for later verses\nare printed in a block of text rather than with each note.\n",
      "element": "lyric",
      "auto": false,
      "interface": {
        "_extends": [
          "justify",
          "position",
          "placement",
          "color",
          "print-object",
          "editorial"
        ],
        "<lyric-parts>": {},
        "number": {
          "type": "number",
          "required": false,
          "std": 1,
          "//": "The lyric number indicates multiple lines, though a name\ncan be used as well (as in Finale's verse/chorus/section\nspecification). "
        },
        "name": {
          "type": "string",
          "required": false,
          "std": ""
        }
      }
    },
    {
      "element": "text",
      "interface": {
        "_extends": [
          "font",
          "color",
          "text-decoration",
          "text-rotation",
          "letter-spacing",
          "text-direction"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "entity": "syllabic-type",
      "enum": {
        "single": 0,
        "begin": 1,
        "end": 2,
        "middle": 3
      }
    },
    {
      "element": "syllabic",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "data": {
          "type": "syllabic-type",
          "child": true
        }
      },
      "//": "Hyphenation is indicated by the syllabic element, which can be single,\nbegin, end, or middle. These represent single-syllable\nwords, word-beginning syllables, word-ending syllables,\nand mid-word syllables."
    },
    {
      "//": "Multiple syllables on a single note are separated by elision\nelements. A hyphen in the text element should only be used\nfor an actual hyphenated word. Two text elements that are\nnot separated by an elision element are part of the same\nsyllable, but may have different text formatting.\n\nThe elision element text specifies the symbol used to\ndisplay the elision. Common values are a no-break space\n(Unicode 00A0), an underscore (Unicode 005F), or an undertie\n(Unicode 203F).",
      "element": "elision",
      "interface": {
        "_extends": [
          "font",
          "color"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "Word extensions are represented using the extend element. \n\nThe extend element represents lyric word extension /\nmelisma lines as well as figured bass extensions. The\noptional type and position attributes are added in\nVersion 3.0 to provide better formatting control.",
      "element": "extend",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": false,
          "std": "StartStopContinue.Start"
        }
      }
    },
    {
      "//": "Figured bass elements take their position from the first\nregular note (not a grace note or chord note) that follows\nin score order. The optional duration element is used to\nindicate changes of figures under a note.    \n\nFigures are ordered from top to bottom. A figure-number is a\nnumber. Values for prefix and suffix include the accidental\nvalues sharp, flat, natural, double-sharp, flat-flat, and\nsharp-sharp. Suffixes include both symbols that come after\nthe figure number and those that overstrike the figure number.\nThe suffix value slash is used for slashed numbers indicating\nchromatic alteration. The orientation and display of the slash\nusually depends on the figure number. The prefix and suffix\nelements may contain additional values for symbols specific\nto particular figured bass styles. The value of parentheses\nis \"no\" if not present.",
      "element": "figured-bass",
      "interface": {
        "_extends": [
          "editorial",
          "print-style",
          "printout"
        ],
        "<figure>": {
          "array": true,
          "required": true
        },
        "<duration>": {
          "required": false
        },
        "parentheses": {
          "type": "yes-no",
          "std": false,
          "required": false
        }
      }
    },
    {
      "element": "figure",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "<prefix>": {
          "required": false
        },
        "<figure-number>": {
          "required": false
        },
        "<suffix>": {
          "required": false
        },
        "<extend>": {
          "required": false
        }
      }
    },
    {
      "element": "prefix",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "element": "figure-number",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "element": "suffix",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "The backup and forward elements are required to coordinate\nmultiple voices in one part, including music on multiple\nstaves.\n\nThe backup element is generally used to\nmove between voices and staves. Thus the backup element\ndoes not include voice or staff elements. Duration values\nshould always be positive, and should not cross measure\nboundaries or mid-measure changes in the divisions value.",
      "element": "backup",
      "interface": {
        "_extends": [
          "editorial"
        ],
        "<duration>": {
          "required": true
        }
      }
    },
    {
      "//": "The backup and forward elements are required to coordinate\nmultiple voices in one part, including music on multiple\nstaves.\n\nThe forward element is generally used within voices\nand staves. Duration values should always be positive, and\nshould not cross measure boundaries or mid-measure changes\nin the divisions value.",
      "element": "forward",
      "interface": {
        "_extends": [
          "editorial-voice"
        ],
        "<duration>": {
          "required": true
        },
        "<staff>": {
          "required": false
        }
      }
    },
    {
      "element": "barline-location",
      "enum": {
        "left": 0,
        "right": 1,
        "middle": 2
      }
    },
    {
      "//": "If a barline is other than a normal single barline, it\nshould be represented by a barline element that describes\nit. This includes information about repeats and multiple\nendings, as well as line style. Barline data is on the same\nlevel as the other musical data in a score - a child of a\nmeasure in a partwise score, or a part in a timewise score.\nThis allows for barlines within measures, as in dotted\nbarlines that subdivide measures in complex meters. The two\nfermata elements allow for fermatas on both sides of the\nbarline (the lower one inverted).\n\nBarlines have a location attribute to make it easier to\nprocess barlines independently of the other musical data\nin a score. It is often easier to set up measures\nseparately from entering notes. The location attribute\nmust match where the barline element occurs within the\nrest of the musical data in the score. If location is left,\nit should be the first element in the measure, aside from\nthe print, bookmark, and link elements. If location is\nright, it should be the last element, again with the\npossible exception of the print, bookmark, and link\nelements. If no location is specified, the right barline\nis the default. The segno, coda, and divisions attributes\nwork the same way as in the sound element defined in the\ndirection.mod file. They are used for playback when barline\nelements contain segno or coda child elements.",
      "element": "barline",
      "interface": {
        "_extends": [
          "editorial"
        ],
        "<bar-style>": {
          "required": false
        },
        "<wavy-line>": {
          "required": false
        },
        "<segno>": {
          "required": false
        },
        "<coda>": {
          "required": false
        },
        "<fermata>": {
          "required": false,
          "array": true
        },
        "<ending>": {
          "required": false
        },
        "<repeat>": {
          "required": false
        },
        "location": {
          "type": "barline-location",
          "required": false
        },
        "segno": {
          "type": "string",
          "name": "segnoAttrib"
        },
        "coda": {
          "type": "string",
          "name": "codaAttrib"
        },
        "divisions": {
          "type": "string"
        }
      }
    },
    {
      "//": "Bar-style contains style information. Choices are\nregular, dotted, dashed, heavy, light-light,\nlight-heavy, heavy-light, heavy-heavy, tick (a\nshort stroke through the top line), short (a partial\nbarline between the 2nd and 4th lines), and none.",
      "entity": "bar-style-type",
      "enum": {
        "regular": 0,
        "dotted": 1,
        "dashed": 2,
        "heavy": 3,
        "light-light": 4,
        "light-heavy": 5,
        "heavy-light": 6,
        "heavy-heavy": 7,
        "tick": 8,
        "short": 9,
        "none": 10
      }
    },
    {
      "//": "Bar-style contains style information. Choices are\nregular, dotted, dashed, heavy, light-light,\nlight-heavy, heavy-light, heavy-heavy, tick (a\nshort stroke through the top line), short (a partial\nbarline between the 2nd and 4th lines), and none.",
      "element": "bar-style",
      "interface": {
        "_extends": [
          "color"
        ],
        "data": {
          "type": "bar-style-type",
          "child": true
        }
      }
    },
    {
      "entity": "start-stop-discontinue",
      "enum": {
        "start": 0,
        "stop": 1,
        "discontinue": 2
      }
    },
    {
      "//": "Endings refers to multiple (e.g. first and second) endings.\nTypically, the start type is associated with the left\nbarline of the first measure in an ending. The stop and\ndiscontinue types are associated with the right barline of\nthe last measure in an ending. Stop is used when the ending\nmark concludes with a downward jog, as is typical for first\nendings. Discontinue is used when there is no downward jog,\nas is typical for second endings that do not conclude a\npiece. The length of the jog can be specified using the\nend-length attribute. The text-x and text-y attributes\nare offsets that specify where the baseline of the start\nof the ending text appears, relative to the start of the\nending line.\n\nThe number attribute reflects the numeric values of what\nis under the ending line. Single endings such as \"1\" or\ncomma-separated multiple endings such as \"1, 2\" may be\nused. The ending element text is used when the text\ndisplayed in the ending is different than what appears in\nthe number attribute. The print-object element is used to\nindicate when an ending is present but not printed, as is\noften the case for many parts in a full score.",
      "element": "ending",
      "interface": {
        "_extends": [
          "print-object",
          "print-style"
        ],
        "ending": {
          "child": true,
          "type": "string",
          "required": false
        },
        "number": {
          "type": "number",
          "required": true
        },
        "type": {
          "type": "start-stop-discontinue"
        },
        "end-length": {
          "type": "tenths"
        },
        "text-x": {
          "type": "tenths"
        },
        "text-y": {
          "type": "tenths"
        }
      }
    },
    {
      "entity": "winged-type",
      "enum": {
        "none": 0,
        "straight": 1,
        "curved": 2,
        "double-straight": 3,
        "double-curved": 4
      }
    },
    {
      "entity": "direction-type-bg",
      "enum": {
        "backward": 0,
        "forward": 1
      }
    },
    {
      "//": "Repeat marks. The start of the repeat has a forward direction\nwhile the end of the repeat has a backward direction. Backward\nrepeats that are not part of an ending can use the times\nattribute to indicate the number of times the repeated section\nis played. The winged attribute indicates whether the repeat\nhas winged extensions that appear above and below the barline.\nThe straight and curved values represent single wings, while\nthe double-straight and double-curved values represent double\nwings. The none value indicates no wings and is the default.",
      "element": "repeat",
      "empty": true,
      "interface": {
        "direction": {
          "type": "direction-type-bg",
          "required": true
        },
        "times": {
          "type": "string"
        },
        "winged": {
          "type": "winged-type",
          "std": "WingedType.None"
        }
      }
    },
    {
      "//": "The tip-direction entity represents the direction in which\nthe tip of a stick or beater points, using Unicode arrow\nterminology.",
      "entity": "tip-direction",
      "enum": {
        "up": 0,
        "down": 1,
        "left": 2,
        "right": 3,
        "northwest": 4,
        "northeast": 5,
        "southeast": 6,
        "southwest": 7
      }
    },
    {
      "//": "A direction is a musical indication that is not attached\nto a specific note. Two or more may be combined to\nindicate starts and stops of wedges, dashes, etc.\n\nBy default, a series of direction-type elements and a\nseries of child elements of a direction-type within a\nsingle direction element follow one another in sequence\nvisually. For a series of direction-type children, non-\npositional formatting attributes are carried over from\nthe previous element by default.",
      "element": "direction",
      "interface": {
        "_extends": [
          "editorial-voice",
          "placement",
          "directive"
        ],
        "<direction-type>": {
          "array": true
        },
        "<offset>": {
          "required": false
        },
        "<staff>": {
          "required": false
        },
        "<sound>": {
          "required": false
        }
      }
    },
    {
      "//": "Textual direction types may have more than 1 component\ndue to multiple fonts. The dynamics element may also be\nused in the notations element, and is defined in the\ncommon.mod file.",
      "element": "direction-type",
      "interface": {
        "<rehearsal>": {
          "array": true
        },
        "<segno>": {
          "array": true
        },
        "<words>": {
          "array": true
        },
        "<coda>": {
          "array": true
        },
        "<wedge>": {
          "required": false
        },
        "<dynamics>": {
          "required": false
        },
        "<dashes>": {
          "required": false
        },
        "<bracket>": {},
        "<pedal>": {},
        "<metronome>": {},
        "<octave-shift>": {},
        "<harp-pedals>": {},
        "<damp>": {},
        "<damp-all>": {},
        "<eyeglasses>": {},
        "<string-mute>": {},
        "<scordatura>": {},
        "<image>": {},
        "<principal-voice>": {},
        "<accordion-registration>": {},
        "<percussion>": {
          "array": true
        },
        "<other-direction>": {}
      }
    },
    {
      "//": "Language is Italian (\"it\") by default. Enclosure is\nsquare by default. Left justification is assumed if\nnot specified.",
      "element": "rehearsal",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "Left justification is assumed if not specified.\nLanguage is Italian (\"it\") by default. Enclosure\nis none by default.",
      "element": "words",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "entity": "wedge-type",
      "enum": {
        "crescendo": 0,
        "diminuendo": 1,
        "stop": 2,
        "continue": 3
      }
    },
    {
      "//": "Wedge spread is measured in tenths of staff line space.\nThe type is crescendo for the start of a wedge that is\nclosed at the left side, and diminuendo for the start\nof a wedge that is closed on the right side. Spread\nvalues at the start of a crescendo wedge or end of a\ndiminuendo wedge are ignored. The niente attribute is yes\nif a circle appears at the point of the wedge, indicating\na crescendo from nothing or diminuendo to nothing. It is\nno by default, and used only when the type is crescendo,\nor the type is stop for a wedge that began with a diminuendo\ntype. The line-type is solid by default. The continue type\nis used for formatting wedges over a system break, or for\nother situations where a single wedge is divided into\nmultiple segments.",
      "element": "wedge",
      "empty": true,
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "position",
          "color"
        ],
        "type": {
          "type": "wedge-type",
          "required": true
        },
        "number": {
          "type": "number-level",
          "std": 1
        },
        "spread": {
          "type": "tenths"
        },
        "neinte": {
          "type": "yes-no",
          "std": false
        }
      }
    },
    {
      "//": "Dashes, used for instance with cresc. and dim. marks.\n",
      "element": "dashes",
      "empty": true,
      "interface": {
        "_extends": [
          "dashed-formatting",
          "position",
          "color"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": true
        },
        "number": {
          "type": "number-level",
          "std": 1
        }
      }
    },
    {
      "entity": "line-end-type",
      "enum": {
        "up": 0,
        "down": 1,
        "both": 2,
        "arrow": 3,
        "none": 4
      }
    },
    {
      "//": "Brackets are combined with words in a variety of\nmodern directions. The line-end attribute specifies\nif there is a jog up or down (or both), an arrow,\nor nothing at the start or end of the bracket. If\nthe line-end is up or down, the length of the jog\ncan be specified using the end-length attribute.\nThe line-type is solid by default.",
      "element": "bracket",
      "empty": true,
      "interface": {
        "_extends": [
          "line-type",
          "dashed-formatting",
          "position",
          "color"
        ],
        "type": {
          "type": "start-stop-continue",
          "required": true
        },
        "number": {
          "type": "number-level",
          "std": 1
        },
        "line-end": {
          "type": "line-end-type"
        },
        "end-length": {
          "type": "tenths"
        }
      }
    },
    {
      "entity": "pedal-type",
      "enum": {
        "start": 0,
        "stop": 1,
        "continue": 2,
        "change": 3
      }
    },
    {
      "//": "Piano pedal marks. The line attribute is yes if pedal\nlines are used. The sign attribute is yes if Ped and *\nsigns are used. For MusicXML 2.0 compatibility, the sign\nattribute is yes by default if the line attribute is no,\nand is no by default if the line attribute is yes. The\nchange and continue types are used when the line attribute\nis yes. The change type indicates a pedal lift and retake\nindicated with an inverted V marking. The continue type\nallows more precise formatting across system breaks and for\nmore complex pedaling lines. The alignment attributes are\nignored if the line attribute is yes.",
      "element": "pedal",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "type": {
          "type": "pedal-type"
        },
        "line": {
          "type": "yes-no"
        },
        "sign": {
          "type": "yes-no"
        }
      }
    },
    {
      "//": "Metronome marks and other metric relationships.\n\nThe beat-unit values are the same as for a type element,\nand the beat-unit-dot works like the dot element. The\nper-minute element can be a number, or a text description\nincluding numbers. The parentheses attribute indicates\nwhether or not to put the metronome mark in parentheses;\nits value is no if not specified. If a font is specified for\nthe per-minute element, it overrides the font specified for\nthe overall metronome element. This allows separate\nspecification of a music font for beat-unit and a text\nfont for the numeric value in cases where a single\nmetronome font is not used.\n\nThe metronome-note and metronome-relation elements\nallow for the specification of more complicated metric\nrelationships, such as swing tempo marks where\ntwo eighths are equated to a quarter note / eighth note\ntriplet. The metronome-type, metronome-beam, and\nmetronome-dot elements work like the type, beam, and\ndot elements. The metronome-tuplet element uses the\nsame element structure as the time-modification element\nalong with some attributes from the tuplet element. The\nmetronome-relation element describes the relationship\nsymbol that goes between the two sets of metronome-note\nelements. The currently allowed value is equals, but this\nmay expand in future versions. If the element is empty,\nthe equals value is used. The metronome-relation and\nthe following set of metronome-note elements are optional\nto allow display of an isolated Grundschlagnote.",
      "element": "metronome",
      "interface": {
        "_extends": [
          "print-style-align",
          "justify"
        ],
        "<beat-unit>": {},
        "<beat-unit-dot>": {
          "array": true
        },
        "<per-minute>": {},
        "<metronome-note>": {
          "array": true
        },
        "<metronome-relation>": {},
        "parentheses": {
          "type": "yes-no"
        }
      }
    },
    {
      "element": "beat-unit-dot",
      "empty": true,
      "interface": {}
    },
    {
      "element": "per-minute",
      "interface": {
        "_extends": [
          "font"
        ],
        "data": {
          "child": true,
          "type": "string"
        }
      }
    },
    {
      "element": "metronome-note",
      "interface": {
        "<metronome-type>": {},
        "<metronome-dot>": {
          "array": true
        },
        "<metronome-beam>": {
          "array": true
        },
        "<metronome-tuplet>": {}
      }
    },
    {
      "element": "metronome-dot",
      "interface": {}
    },
    {
      "element": "metronome-beam",
      "interface": {
        "data": {
          "child": true,
          "type": "string"
        },
        "number": {
          "type": "beam-level",
          "std": 1
        }
      }
    },
    {
      "element": "metronome-tuplet",
      "interface": {
        "<actual-notes>": {},
        "<normal-notes>": {},
        "<normal-type>": {},
        "<normal-dot>": {
          "array": true
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "bracket": {
          "type": "yes-no",
          "std": false
        },
        "show-number": {
          "type": "actual-both-none",
          "std": "ActualBothNone.Both"
        }
      }
    },
    {
      "entity": "octave-shift-type",
      "enum": {
        "up": 1,
        "down": 2,
        "stop": 3,
        "continue": 4
      }
    },
    {
      "//": "Octave shifts indicate where notes are shifted up or down\nfrom their true pitched values because of printing\ndifficulty. Thus a treble clef line noted with 8va will\nbe indicated with an octave-shift down from the pitch\ndata indicated in the notes. A size of 8 indicates one\noctave; a size of 15 indicates two octaves.",
      "element": "octave-shift",
      "empty": true,
      "interface": {
        "_extends": [
          "dashed-formatting",
          "print-style"
        ],
        "type": {
          "type": "octave-shift-type",
          "required": true
        },
        "number": {
          "type": "number-level"
        },
        "size": {
          "type": "number",
          "std": 8
        }
      }
    },
    {
      "//": "The harp-pedals element is used to create harp pedal\ndiagrams. The pedal-step and pedal-alter elements use\nthe same values as the step and alter elements. For\neasiest reading, the pedal-tuning elements should follow\nstandard harp pedal order, with pedal-step values of\nD, C, B, E, F, G, and A.",
      "element": "harp-pedals",
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "<pedal-tuning>": {
          "array": true
        }
      }
    },
    {
      "element": "pedal-tuning",
      "interface": {
        "<pedal-step>": {},
        "<pedal-alter>": {}
      }
    },
    {
      "//": "Harp damping marks",
      "element": "damp",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style-align"
        ]
      }
    },
    {
      "element": "damp-all",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style-align"
        ]
      }
    },
    {
      "element": "eyeglasses",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style-align"
        ]
      }
    },
    {
      "element": "string-mute",
      "empty": true,
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "type": {
          "type": "string"
        }
      }
    },
    {
      "//": "Scordatura string tunings are represented by a series\nof accord elements. The tuning-step, tuning-alter,\nand tuning-octave elements are also used with the\nstaff-tuning element, and are defined in the common.mod\nfile. Strings are numbered from high to low.",
      "element": "scordatura",
      "interface": {
        "<accord>": {
          "array": true
        }
      }
    },
    {
      "//": "Scordatura string tunings are represented by a series\nof accord elements. The tuning-step, tuning-alter,\nand tuning-octave elements are also used with the\nstaff-tuning element, and are defined in the common.mod\nfile. Strings are numbered from high to low.",
      "element": "accord",
      "interface": {
        "<tuning-step>": {},
        "<tuning-alter>": {},
        "<tuning-octave>": {},
        "string": {
          "type": "string",
          "required": true
        }
      }
    },
    {
      "//": "The image element is used to include graphical images\nin a score. The required source attribute is the URL\nfor the image file. The required type attribute is the\nMIME type for the image file format. Typical choices\ninclude application/postscript, image/gif, image/jpeg,\nimage/png, and image/tiff.",
      "element": "image",
      "empty": true,
      "interface": {
        "_extends": [
          "position",
          "halign",
          "valign-image"
        ],
        "source": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    {
      "entity": "voice-symbol",
      "enum": {
        "Hauptstimme": 1,
        "Nebenstimme": 2,
        "plain": 3,
        "none": 4
      }
    },
    {
      "//": "The principal-voice element represents principal and\nsecondary voices in a score, either for analysis or\nfor square bracket symbols that appear in a score.\nThe symbol attribute indicates the type of symbol used at\nthe start of the principal-voice. Valid values are\nHauptstimme, Nebenstimme, plain (for a plain square\nbracket), and none. The content of the principal-voice\nelement is used for analysis and may be any text value.\nWhen used for analysis separate from any printed score\nmarkings, the symbol attribute should be set to \"none\".",
      "element": "principal-voice",
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "data": {
          "child": true,
          "type": "string",
          "required": false
        },
        "type": {
          "type": "start-stop",
          "required": true
        },
        "symbol": {
          "type": "voice-symbol"
        }
      }
    },
    {
      "//": "The accordion-registration element is use for accordion\nregistration symbols. These are circular symbols divided\nhorizontally into high, middle, and low sections that\ncorrespond to 4', 8', and 16' pipes. Each accordion-high,\naccordion-middle, and accordion-low element represents\nthe presence of one or more dots in the registration\ndiagram. The accordion-middle element may have text\nvalues of 1, 2, or 3, corresponding to have 1 to 3 dots\nin the middle section. An accordion-registration element\nneeds to have at least one of the child elements present.",
      "element": "accordion-registration",
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "<accordion-high>": "__flag__",
        "<accordion-middle>": {},
        "<accordion-low>": "__flag__"
      }
    },
    {
      "//": "The percussion element is used to define percussion\npictogram symbols. Definitions for these symbols can be\nfound in Kurt Stone's \"Music Notation in the Twentieth\nCentury\" on pages 206-212 and 223. Some values are\nadded to these based on how usage has evolved in\nthe 30 years since Stone's book was published.",
      "element": "percussion",
      "interface": {
        "_extends": [
          "print-style-align",
          "enclosure"
        ],
        "<glass>": {},
        "<metal>": {},
        "<wood>": {},
        "<pitched>": {},
        "<membrane>": {},
        "<effect>": {},
        "<timpani>": {},
        "<beater>": {},
        "<stick>": {},
        "<stick-location>": {},
        "<other-percussion>": {}
      }
    },
    {
      "//": "The timpani element represents the timpani pictogram.\n",
      "element": "timpani",
      "interface": {}
    },
    {
      "//": "The beater element represents pictograms for beaters,\nmallets, and sticks that do not have different materials\nrepresented in the pictogram. Valid values are bow,\nchime hammer, coin, finger, fingernail, fist,\nguiro scraper, hammer, hand, jazz stick, knitting needle,\nmetal hammer, snare stick, spoon mallet, triangle beater,\ntriangle beater plain, and wire brush. The jazz stick value\nrefers to Stone's plastic tip snare stick. The triangle\nbeater plain value refers to the plain line version of the\npictogram. The finger and hammer values are in addition\nto Stone's list. The tip attribute represents the direction\nin which the tip of a beater points.",
      "element": "beater",
      "interface": {
        "data": {
          "type": "string",
          "child": true
        },
        "tip": {
          "type": "tip-direction"
        }
      }
    },
    {
      "//": "The stick element represents pictograms where the material\nin the stick, mallet, or beater is included. Valid values\nfor stick-type are bass drum, double bass drum, timpani,\nxylophone, and yarn. Valid values for stick-material are\nsoft, medium, hard, shaded, and x. The shaded and x values\nreflect different uses for brass, wood, and steel core\nbeaters of different types. The tip attribute represents\nthe direction in which the tip of a stick points.",
      "element": "stick",
      "interface": {
        "<stick-type>": {},
        "<stick-material>": {},
        "tip": {
          "type": "tip-direction"
        }
      }
    },
    {
      "//": "An offset is represented in terms of divisions, and\nindicates where the direction will appear relative to\nthe current musical location. This affects the visual\nappearance of the direction. If the sound attribute is\n\"yes\", then the offset affects playback too. If the sound\nattribute is \"no\", then any sound associated with the\ndirection takes effect at the current location. The sound\nattribute is \"no\" by default for compatibility with earlier\nversions of the MusicXML format. If an element within a\ndirection includes a default-x attribute, the offset value\nwill be ignored when determining the appearance of that\nelement.",
      "element": "offset",
      "interface": {
        "data": {
          "type": "string",
          "child": true
        },
        "sound": {
          "type": "yes-no",
          "std": false
        }
      }
    },
    {
      "//": "The harmony elements are based on Humdrum's **harm\nencoding, extended to support chord symbols in popular\nmusic as well as functional harmony analysis in classical\nmusic.\n\nIf there are alternate harmonies possible, this can be\nspecified using multiple harmony elements differentiated\nby type. Explicit harmonies have all note present in the\nmusic; implied have some notes missing but implied;\nalternate represents alternate analyses.\n\nThe harmony object may be used for analysis or for\nchord symbols. The print-object attribute controls\nwhether or not anything is printed due to the harmony\nelement. The print-frame attribute controls printing\nof a frame or fretboard diagram. The print-style entity\nsets the default for the harmony, but individual elements\ncan override this with their own print-style values.\n\nA harmony element can contain many stacked chords (e.g.\nV of II). A sequence of harmony-chord entities is used\nfor this type of secondary function, where V of II would\nbe represented by a harmony-chord with a V function\nfollowed by a harmony-chord with a II function.",
      "entity": "harmony-chord",
      "interface": {
        "<root>": {},
        "<function>": {},
        "<kind>": {},
        "<inversion>": {},
        "<bass>": {},
        "<degree>": {}
      }
    },
    {
      "entity": "explicit-implied-alternate",
      "enum": {
        "explicit": 1,
        "implied": 2,
        "alternate": 3
      }
    },
    {
      "element": "harmony",
      "interface": {
        "_extends": [
          "harmony-chord",
          "editorial",
          "print-object",
          "print-style",
          "placement"
        ],
        "<frame>": {},
        "<offset>": {},
        "<staff>": {},
        "type": {
          "type": "explicit-implied-alternate",
          "name": "harmonyType"
        },
        "print-frame": {
          "type": "yes-no"
        }
      }
    },
    {
      "//": "A root is a pitch name like C, D, E, where a function\nis an indication like I, II, III. Root is generally\nused with pop chord symbols, function with classical\nfunctional harmony. It is an either/or choice to avoid\ndata inconsistency. Function requires that the key be\nspecified in the encoding.\n\nThe root element has a root-step and optional root-alter\nsimilar to the step and alter elements in a pitch, but\nrenamed to distinguish the different musical meanings.\nThe root-step text element indicates how the root should\nappear in a score if not using the element contents.\nIn some chord styles, this will include the root-alter\ninformation as well. In that case, the print-object\nattribute of the root-alter element can be set to no.\nThe root-alter location attribute indicates whether\nthe alteration should appear to the left or the right\nof the root-step; it is right by default.",
      "element": "root",
      "interface": {
        "<root-step>": {},
        "<root-alter>": {}
      }
    },
    {
      "element": "root-step",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "text": {
          "type": "string"
        }
      }
    },
    {
      "element": "root-alter",
      "interface": {
        "_extends": [
          "print-object",
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "location": {
          "type": "left-right"
        }
      }
    },
    {
      "element": "function",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "Kind indicates the type of chord. Degree elements\ncan then add, subtract, or alter from these\nstarting points. Values include:\n\nTriads:\nmajor (major third, perfect fifth)\nminor (minor third, perfect fifth)\naugmented (major third, augmented fifth)\ndiminished (minor third, diminished fifth)\nSevenths:\ndominant (major triad, minor seventh)\nmajor-seventh (major triad, major seventh)\nminor-seventh (minor triad, minor seventh)\ndiminished-seventh\n    (diminished triad, diminished seventh)\naugmented-seventh\n    (augmented triad, minor seventh)\nhalf-diminished\n    (diminished triad, minor seventh)\nmajor-minor\n    (minor triad, major seventh)\nSixths:\nmajor-sixth (major triad, added sixth)\nminor-sixth (minor triad, added sixth)\nNinths:\ndominant-ninth (dominant-seventh, major ninth)\nmajor-ninth (major-seventh, major ninth)\nminor-ninth (minor-seventh, major ninth)\n11ths (usually as the basis for alteration):\ndominant-11th (dominant-ninth, perfect 11th)\nmajor-11th (major-ninth, perfect 11th)\nminor-11th (minor-ninth, perfect 11th)\n13ths (usually as the basis for alteration):\ndominant-13th (dominant-11th, major 13th)\nmajor-13th (major-11th, major 13th)\nminor-13th (minor-11th, major 13th)\nSuspended:\nsuspended-second (major second, perfect fifth)\nsuspended-fourth (perfect fourth, perfect fifth)\nFunctional sixths:\nNeapolitan\nItalian\nFrench\nGerman\nOther:\npedal (pedal-point bass)\npower (perfect fifth)\nTristan\n\nThe \"other\" kind is used when the harmony is entirely\ncomposed of add elements. The \"none\" kind is used to\nexplicitly encode absence of chords or functional\nharmony.\n\nThe attributes are used to indicate the formatting\nof the symbol. Since the kind element is the constant\nin all the harmony-chord entities that can make up\na polychord, many formatting attributes are here.\n\nThe use-symbols attribute is yes if the kind should be\nrepresented when possible with harmony symbols rather\nthan letters and numbers. These symbols include:\n\nmajor: a triangle, like Unicode 25B3\nminor: -, like Unicode 002D\naugmented: +, like Unicode 002B\ndiminished: °, like Unicode 00B0\nhalf-diminished: ø, like Unicode 00F8\n\nFor the major-minor kind, only the minor symbol is used when\nuse-symbols is yes. The major symbol is set using the symbol\nattribute in the degree-value element. The corresponding\ndegree-alter value will usually be 0 in this case.\n\nThe text attribute describes how the kind should be spelled\nin a score. If use-symbols is yes, the value of the text\nattribute follows the symbol. The stack-degrees attribute\nis yes if the degree elements should be stacked above each\nother. The parentheses-degrees attribute is yes if all the\ndegrees should be in parentheses. The bracket-degrees\nattribute is yes if all the degrees should be in a bracket.\nIf not specified, these values are implementation-specific.\nThe alignment attributes are for the entire harmony-chord\nentity of which this kind element is a part.",
      "element": "kind",
      "interface": {
        "_extends": [
          "print-style",
          "halign",
          "valign"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "use-symbols": {
          "type": "yes-no"
        },
        "text": {
          "type": "string"
        },
        "stack-degrees": {
          "type": "yes-no"
        },
        "parentheses-degrees": {
          "type": "yes-no"
        },
        "bracket-degrees": {
          "type": "yes-no"
        }
      }
    },
    {
      "//": "Inversion is a number indicating which inversion is used:\n0 for root position, 1 for first inversion, etc.",
      "element": "inversion",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "Bass is used to indicate a bass note in popular music\nchord symbols, e.g. G/C. It is generally not used in\nfunctional harmony, as inversion is generally not used\nin pop chord symbols. As with root, it is divided into\nstep and alter elements, similar to pitches. The attributes\nfor bass-step and bass-alter work the same way as\nthe corresponding attributes for root-step and root-alter.",
      "element": "bass",
      "interface": {
        "<bass-step>": {},
        "<bass-alter>": {}
      }
    },
    {
      "//": "Bass is used to indicate a bass note in popular music\nchord symbols, e.g. G/C. It is generally not used in\nfunctional harmony, as inversion is generally not used\nin pop chord symbols. As with root, it is divided into\nstep and alter elements, similar to pitches. The attributes\nfor bass-step and bass-alter work the same way as\nthe corresponding attributes for root-step and root-alter.",
      "element": "bass-step",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "text": {
          "type": "string"
        }
      }
    },
    {
      "element": "bass-alter",
      "interface": {
        "_extends": [
          "print-object",
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "location": {
          "type": "left-right"
        }
      }
    },
    {
      "//": "The degree element is used to add, alter, or subtract\nindividual notes in the chord. The degree-value element\nis a number indicating the degree of the chord (1 for\nthe root, 3 for third, etc). The degree-alter element\nis like the alter element in notes: 1 for sharp, -1 for\nflat, etc. The degree-type element can be add, alter, or\nsubtract. If the degree-type is alter or subtract, the\ndegree-alter is relative to the degree already in the\nchord based on its kind element. If the degree-type is\nadd, the degree-alter is relative to a dominant chord\n(major and perfect intervals except for a minor\nseventh). The print-object attribute can be used to\nkeep the degree from printing separately when it has\nalready taken into account in the text attribute of\nthe kind element. The plus-minus attribute is used to\nindicate if plus and minus symbols should be used\ninstead of sharp and flat symbols to display the degree\nalteration; it is no by default.\n\nThe degree-value and degree-type text attributes specify\nhow the value and type of the degree should be displayed\nin a score. The degree-value symbol attribute indicates\nthat a symbol should be used in specifying the degree.\nIf the symbol attribute is present, the value of the text\nattribute follows the symbol.\n\nA harmony of kind \"other\" can be spelled explicitly by\nusing a series of degree elements together with a root.",
      "element": "degree",
      "interface": {
        "_extends": [
          "print-object"
        ],
        "<degree-value>": {},
        "<degree-alter>": {},
        "<degree-type>": {}
      }
    },
    {
      "entity": "chord-type",
      "enum": {
        "major": 1,
        "minor": 2,
        "augmented": 3,
        "diminished": 4,
        "half-diminished": 5
      }
    },
    {
      "element": "degree-value",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "symbol": {
          "type": "chord-type"
        },
        "text": {
          "type": "string"
        }
      }
    },
    {
      "element": "degree-alter",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "plus-minus": {
          "type": "yes-no"
        }
      }
    },
    {
      "element": "degree-type",
      "interface": {
        "_extends": [
          "print-style"
        ],
        "data": {
          "type": "string",
          "child": true
        },
        "text": {
          "type": "string"
        }
      }
    },
    {
      "//": "The frame element represents a frame or fretboard diagram\nused together with a chord symbol. The representation is\nbased on the NIFF guitar grid with additional information.\nThe frame-strings and frame-frets elements give the\noverall size of the frame in vertical lines (strings) and\nhorizontal spaces (frets).\n\nThe frame element's unplayed attribute indicates what to\ndisplay above a string that has no associated frame-note\nelement. Typical values are x and the empty string. If the\nattribute is not present, the display of the unplayed\nstring is application-defined.",
      "element": "frame",
      "interface": {
        "_extends": [
          "position",
          "color",
          "halign",
          "valign-image"
        ],
        "<frame-strings>": {},
        "<frame-frets>": {},
        "<first-fret>": {},
        "<frame-note>": {
          "array": true
        },
        "height": {
          "type": "tenths"
        },
        "width": {
          "type": "tenths"
        },
        "unplayed": {
          "type": "string"
        }
      }
    },
    {
      "//": "The first-fret indicates which fret is shown in the top\nspace of the frame; it is fret 1 if the element is not\npresent. The optional text attribute indicates how this\nis represented in the fret diagram, while the location\nattribute indicates whether the text appears to the left\nor right of the frame.",
      "element": "first-fret",
      "interface": {
        "data": {
          "type": "string",
          "child": true
        },
        "text": {
          "type": "string"
        },
        "location": {
          "type": "left-right"
        }
      }
    },
    {
      "//": "The frame-note element represents each note included in\nthe frame. The definitions for string, fret, and fingering\nare found in the common.mod file. An open string will\nhave a fret value of 0, while a muted string will not be\nassociated with a frame-note element.",
      "element": "frame-note",
      "interface": {
        "<string>": {},
        "<fret>": {},
        "<fingering>": {},
        "<barre>": {}
      }
    },
    {
      "//": "The barre element indicates placing a finger over\nmultiple strings on a single fret. The type is \"start\"\nfor the lowest pitched string (e.g., the string with\nthe highest MusicXML number) and is \"stop\" for the\nhighest pitched string.",
      "element": "barre",
      "empty": true,
      "interface": {
        "_extends": [
          "color"
        ],
        "type": {
          "type": "start-stop",
          "required": true
        }
      }
    },
    {
      "//": "The grouping element is used for musical analysis. When\nthe element type is \"start\" or \"single\", it usually contains\none or more feature elements. The number attribute is used\nfor distinguishing between overlapping and hierarchical\ngroupings. The member-of attribute allows for easy\ndistinguishing of what grouping elements are in what\nhierarchy. Feature elements contained within a \"stoptype of grouping may be ignored.\n\nThis element is flexible to allow for non-standard analyses.\nFuture versions of the MusicXML format may add elements\nthat can represent more standardized categories of analysis\"\ndata, allowing for easier data sharing.",
      "element": "grouping",
      "interface": {
        "<feature>": {
          "array": true
        },
        "type": {
          "type": "start-stop-single",
          "required": true,
          "name": "groupingType"
        },
        "number": {
          "type": "number",
          "std": 1
        },
        "member-of": {
          "type": "string"
        }
      }
    },
    {
      "element": "feature",
      "interface": {
        "data": {
          "type": "string",
          "child": true
        },
        "type": {
          "type": "string"
        }
      }
    },
    {
      "//": "The print element contains general printing parameters,\nincluding the layout elements defined in the layout.mod\nfile. The part-name-display and part-abbreviation-display\nelements used in the score.mod file may also be used here\nto change how a part name or abbreviation is displayed over\nthe course of a piece. They take effect when the current\nmeasure or a succeeding measure starts a new system.\n\nThe new-system and new-page attributes indicate whether\nto force a system or page break, or to force the current\nmusic onto the same system or page as the preceding music.\nNormally this is the first music data within a measure.\nIf used in multi-part music, they should be placed in the\nsame positions within each part, or the results are\nundefined. The page-number attribute sets the number of a\nnew page; it is ignored if new-page is not \"yes\". Version\n2.0 adds a blank-page attribute. This is a positive integer\nvalue that specifies the number of blank pages to insert\nbefore the current measure. It is ignored if new-page is\nnot \"yes\". These blank pages have no music, but may have\ntext or images specified by the credit element. This is\nused to allow a combination of pages that are all text,\nor all text and images, together with pages of music.\n\nStaff spacing between multiple staves is measured in\ntenths of staff lines (e.g. 100 = 10 staff lines). This is\ndeprecated as of Version 1.1; the staff-layout element\nshould be used instead. If both are present, the\nstaff-layout values take priority.\n\nLayout elements in a print statement only apply to the\ncurrent page, system, staff, or measure. Music that\nfollows continues to take the default values from the\nlayout included in the defaults element.",
      "element": "print",
      "interface": {
        "<page-layout>": {},
        "<system-layout>": {},
        "<staff-layout>": {
          "array": true
        },
        "<measure-layout>": {},
        "<measure-numbering>": {},
        "<part-name-display>": {},
        "<part-abbreviation-display>": {},
        "staff-spacing": {
          "type": "tenths"
        },
        "new-system": {
          "type": "yes-no"
        },
        "new-page": {
          "type": "yes-no"
        },
        "blank-page": {
          "type": "string"
        },
        "page-number": {
          "type": "string"
        }
      }
    },
    {
      "//": "The measure-numbering element describes how measure\nnumbers are displayed on this part. Values may be none,\nmeasure, or system. The number attribute from the measure\nelement is used for printing. Measures with an implicit\nattribute set to \"yes\" never display a measure number,\nregardless of the measure-numbering setting.",
      "element": "measure-numbering",
      "interface": {
        "_extends": [
          "print-style-align"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "The sound element contains general playback parameters.\nThey can stand alone within a part/measure, or be a\ncomponent element within a direction.\n\nTempo is expressed in quarter notes per minute. If 0,\nthe sound-generating program should prompt the user at the\ntime of compiling a sound (MIDI) file.\n\nDynamics (or MIDI velocity) are expressed as a percentage\nof the default forte value (90 for MIDI 1.0).\n\nDacapo indicates to go back to the beginning of the\nmovement. When used it always has the value \"yes\".\n\nSegno and dalsegno are used for backwards jumps to a\nsegno sign; coda and tocoda are used for forward jumps\nto a coda sign. If there are multiple jumps, the value\nof these parameters can be used to name and distinguish\nthem. If segno or coda is used, the divisions attribute\ncan also be used to indicate the number of divisions\nper quarter note. Otherwise sound and MIDI generating\nprograms may have to recompute this.\n\nBy default, a dalsegno or dacapo attribute indicates that\nthe jump should occur the first time through, while a\ntocoda attribute indicates the jump should occur the second\ntime through. The time that jumps occur can be changed by\nusing the time-only attribute.\n\nForward-repeat is used when a forward repeat sign is\nimplied, and usually follows a bar line. When used it\nalways has the value of \"yes\".\n\nThe fine attribute follows the final note or rest in a\nmovement with a da capo or dal segno direction. If numeric,\nthe value represents the actual duration of the final note or\nrest, which can be ambiguous in written notation and\ndifferent among parts and voices. The value may also be\n\"yes\" to indicate no change to the final duration.\n\nIf the sound element applies only particular times through a\nrepeat, the time-only attribute indicates which times to apply\nthe sound element. The value is a comma-separated list of\npositive integers arranged in ascending order, indicating\nwhich times through the repeated section that the element\napplies.\n\nPizzicato in a sound element effects all following notes.\nYes indicates pizzicato, no indicates arco.\n\nThe pan and elevation attributes are deprecated in\nVersion 2.0. The pan and elevation elements in\nthe midi-instrument element should be used instead.\nThe meaning of the pan and elevation attributes is\nthe same as for the pan and elevation elements. If\nboth are present, the mid-instrument elements take\npriority.\n\nThe damper-pedal, soft-pedal, and sostenuto-pedal\nattributes effect playback of the three common piano\npedals and their MIDI controller equivalents. The yes\nvalue indicates the pedal is depressed; no indicates\nthe pedal is released. A numeric value from 0 to 100\nmay also be used for half pedaling. This value is the\npercentage that the pedal is depressed. A value of 0 is\nequivalent to no, and a value of 100 is equivalent to yes.\n\nMIDI devices, MIDI instruments, and playback techniques are\nchanged using the midi-device, midi-instrument, and play\nelements defined in the common.mod file. When there are\nmultiple instances of these elements, they should be grouped\ntogether by instrument using the id attribute values.\n\nThe offset element is used to indicate that the sound takes\nplace offset from the current score position. If the sound\nelement is a child of a direction element, the sound offset\nelement overrides the direction offset element if both\nelements are present. Note that the offset reflects the\nintended musical position for the change in sound. It\nshould not be used to compensate for latency issues in\nparticular hardware configurations.",
      "element": "sound",
      "interface": {
        "_extends": [
          "time-only"
        ],
        "<midi-device>": {},
        "<midi-instrument>": {},
        "<play>": {
          "array": true
        },
        "<offset>": {},
        "tempo": {
          "type": "string"
        },
        "dynamics": {
          "type": "string"
        },
        "decapo": {
          "type": "yes-no"
        },
        "segno": {
          "type": "string"
        },
        "dalsegno": {
          "type": "string"
        },
        "coda": {
          "type": "string"
        },
        "tocoda": {
          "type": "string"
        },
        "divisions": {
          "type": "string"
        },
        "forward-repeat": {
          "type": "yes-no"
        },
        "fine": {
          "type": "string"
        },
        "pizzicato": {
          "type": "yes-no"
        },
        "pan": {
          "type": "string"
        },
        "elevation": {
          "type": "string"
        },
        "damper-pedal": {
          "type": "yes-no"
        },
        "soft-pedal": {
          "type": "yes-no"
        },
        "sostenuto-pedal": {
          "type": "yes-no"
        }
      }
    },
    {
      "//": "Works and movements are optionally identified by number\nand title. The work element also may indicate a link\nto the opus document that composes multiple movements\ninto a collection.",
      "element": "work",
      "interface": {
        "<work-number>": {},
        "<work-title>": {},
        "<opus>": {}
      }
    },
    {
      "element": "opus",
      "empty": true,
      "interface": {},
      "//": "Ripieno MusicXML does not support this field."
    },
    {
      "//": "Collect score-wide defaults. This includes scaling\nand layout, defined in layout.mod, and default values\nfor the music font, word font, lyric font, and\nlyric language. The number and name attributes in\nlyric-font and lyric-language elements are typically\nused when lyrics are provided in multiple languages.\nIf the number and name attributes are omitted, the\nlyric-font and lyric-language values apply to all\nnumbers and names.",
      "element": "defaults",
      "interface": {
        "<scaling>": {},
        "<page-layout>": {},
        "<system-layout>": {},
        "<staff-layout>": {
          "array": true
        },
        "<appearance>": {},
        "<music-font>": {},
        "<word-font>": {},
        "<lyric-font>": {
          "array": true
        },
        "<lyric-language>": {
          "array": true
        }
      }
    },
    {
      "element": "music-font",
      "empty": "true",
      "interface": {
        "_extends": [
          "font"
        ]
      }
    },
    {
      "element": "word-font",
      "empty": "true",
      "interface": {
        "_extends": [
          "font"
        ]
      }
    },
    {
      "element": "lyric-font",
      "empty": "true",
      "interface": {
        "_extends": [
          "font"
        ],
        "number": {
          "type": "number"
        },
        "name": {
          "type": "string"
        }
      }
    },
    {
      "element": "lyric-language",
      "empty": "true",
      "interface": {
        "number": {
          "type": "number"
        },
        "name": {
          "type": "string"
        }
      }
    },
    {
      "//": "    Credit elements refer to the title, composer, arranger,\nlyricist, copyright, dedication, and other text that usually\nappears on the first page of a score. The credit-words\nand credit-image elements are similar to the words and\nimage elements for directions. However, since the\ncredit is not part of a measure, the default-x and\ndefault-y attributes adjust the origin relative to the\nbottom left-hand corner of the first page. The\nenclosure for credit-words is none by default.\n\nBy default, a series of credit-words elements within a\nsingle credit element follow one another in sequence\nvisually. Non-positional formatting attributes are carried\nover from the previous element by default.\n\nThe page attribute for the credit element, new in Version\n2.0, specifies the page number where the credit should\nappear. This is an integer value that starts with 1 for the\nfirst page. Its value is 1 by default. Since credits occur\nbefore the music, these page numbers do not refer to the\npage numbering specified by the print element's page-number\nattribute.",
      "element": "credit",
      "interface": {
        "<credit-type>": {
          "array": true
        },
        "<credit-image>": {},
        "<credit-words>": {
          "array": true
        },
        "page": {
          "type": "number"
        }
      }
    },
    {
      "element": "credit-words",
      "interface": {
        "_extends": [
          "text-formatting"
        ],
        "words": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "element": "credit-image",
      "empty": true,
      "interface": {
        "_extends": [
          "position",
          "halign",
          "valign-image"
        ],
        "source": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    {
      "//": "The part-list identifies the different musical parts in\nthis movement. Each part has an ID that is used later\nwithin the musical data. Since parts may be encoded\nseparately and combined later, identification elements\nare present at both the score and score-part levels.\nThere must be at least one score-part, combined as\ndesired with part-group elements that indicate braces\nand brackets. Parts are ordered from top to bottom in\na score based on the order in which they appear in the\npart-list.\n\nEach MusicXML part corresponds to a track in a Standard\nMIDI Format 1 file. The score-instrument elements are\nused when there are multiple instruments per track.\nThe midi-device element is used to make a MIDI device\nor port assignment for the given track or specific MIDI\ninstruments. Initial midi-instrument assignments may be\nmade here as well.",
      "element": "part-list",
      "interface": {
        "<part-group>": {
          "array": true
        },
        "<score-part>": {
          "array": true
        }
      }
    },
    {
      "element": "score-part",
      "interface": {
        "<identification>": {},
        "<part-name>": {},
        "<part-name-display>": {},
        "<part-abbreviation>": {},
        "<part-abbreviation-display>": {},
        "<group>": {
          "array": true
        },
        "<score-instrument>": {
          "array": true
        },
        "<midi-device>": {
          "array": true
        },
        "<midi-instrument>": {
          "array": true
        },
        "id": {
          "type": "string"
        }
      }
    },
    {
      "//": "    The part-name indicates the full name of the musical part.\nThe part-abbreviation indicates the abbreviated version of\nthe name of the musical part. The part-name will often\nprecede the first system, while the part-abbreviation will\nprecede the other systems. The formatting attributes for\nthese elements are deprecated in Version 2.0 in favor of\nthe new part-name-display and part-abbreviation-display\nelements. These are defined in the common.mod file as they\nare used in both the part-list and print elements. They\nprovide more complete formatting control for how part names\nand abbreviations appear in a score.",
      "element": "part-name",
      "interface": {
        "_extends": [
          "print-style",
          "print-object",
          "justify"
        ],
        "part-name": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "    The part-name indicates the full name of the musical part.\nThe part-abbreviation indicates the abbreviated version of\nthe name of the musical part. The part-name will often\nprecede the first system, while the part-abbreviation will\nprecede the other systems. The formatting attributes for\nthese elements are deprecated in Version 2.0 in favor of\nthe new part-name-display and part-abbreviation-display\nelements. These are defined in the common.mod file as they\nare used in both the part-list and print elements. They\nprovide more complete formatting control for how part names\nand abbreviations appear in a score.",
      "element": "part-abbreviation",
      "interface": {
        "_extends": [
          "print-style",
          "print-object",
          "justify"
        ],
        "abbreviation": {
          "type": "string",
          "child": true
        }
      }
    },
    {
      "//": "The part-group element indicates groupings of parts in the\nscore, usually indicated by braces and brackets. Braces\nthat are used for multi-staff parts should be defined in\nthe attributes element for that part.\n\nA part-group element is not needed for a single multi-staff\npart. By default, multi-staff parts include a brace symbol\nand (if appropriate given the bar-style) common barlines.\nThe symbol formatting for a multi-staff part can be more\nfully specified using the part-symbol element.",
      "element": "part-group",
      "interface": {
        "_extends": [
          "editorial"
        ],
        "<group-name>": {},
        "<group-name-display>": {},
        "<group-abbreviation>": {},
        "<group-abbreviation-display>": {},
        "<group-symbol>": {},
        "<group-barline>": {},
        "<group-time>": {},
        "type": {
          "type": "start-stop",
          "//": "The part-group start\nelement appears before the first score-part in the group.\nThe part-group stop element appears after the last\nscore-part in the group. Values for the child elements are\nignored at the stop of a group."
        },
        "number": {
          "type": "number",
          "std": 1,
          "//": "The number attribute is used to distinguish overlapping\nand nested part-groups, not the sequence of groups."
        }
      }
    },
    {
      "element": "group-name",
      "interface": {
        "_extends": [
          "print-style",
          "justify"
        ],
        "name": {
          "type": "string",
          "child": true
        }
      },
      "//": "As with parts, groups can have a name and abbreviation.\nFormatting attributes for group-name and group-abbreviation\nare deprecated in Version 2.0 in favor of the new\ngroup-name-display and group-abbreviation-display elements."
    },
    {
      "element": "group-name-display",
      "interface": {
        "_extends": [
          "print-object"
        ],
        "<display-text>": {
          "array": true
        },
        "<accidental-text>": {
          "array": true
        }
      },
      "//": "Formatting specified in the group-name-display and\ngroup-abbreviation-display elements overrides formatting\nspecified in the group-name and group-abbreviation\nelements, respectively."
    },
    {
      "element": "group-abbreviation",
      "interface": {
        "_extends": [
          "print-style",
          "justify"
        ],
        "text": {
          "type": "string",
          "child": true
        }
      },
      "//": "As with parts, groups can have a name and abbreviation.\nFormatting attributes for group-name and group-abbreviation\nare deprecated in Version 2.0 in favor of the new\ngroup-name-display and group-abbreviation-display elements."
    },
    {
      "element": "group-abbreviation-display",
      "interface": {
        "_extends": [
          "print-object"
        ],
        "<display-text>": {
          "array": true
        },
        "<accidental-text>": {
          "array": true
        }
      },
      "//": "Formatting specified in the group-name-display and\ngroup-abbreviation-display elements overrides formatting\nspecified in the group-name and group-abbreviation\nelements, respectively."
    },
    {
      "element": "group-symbol",
      "interface": {
        "_extends": [
          "position",
          "color"
        ],
        "data": {
          "type": "part-symbol-type",
          "child": true,
          "//": "Values include none, brace, line, bracket, and square; the default is none.",
          "std": "PartSymbolType.None"
        }
      },
      "//": "The group-symbol element indicates how the symbol for\na group is indicated in the score. Values include none,\nbrace, line, bracket, and square; the default is none."
    },
    {
      "element": "group-barline",
      "interface": {
        "_extends": [
          "color"
        ],
        "data": {
          "type": "string",
          "child": true
        }
      },
      "//": "The group-barline element indicates if the group should\nhave common barlines. Values can be yes, no, or\nMensurstrich. "
    },
    {
      "element": "group-time",
      "interface": {},
      "//": "The group-time element indicates that the\ndisplayed time signatures should stretch across all parts\nand staves in the group."
    },
    {
      "//": "    The score-instrument element allows for multiple\ninstruments per score-part. As with the score-part\nelement, each score-instrument has a required ID\nattribute, a name, and an optional abbreviation. The\ninstrument-name and instrument-abbreviation are\ntypically used within a software application, rather\nthan appearing on the printed page of a score.\n\nA score-instrument element is also required if the\nscore specifies MIDI 1.0 channels, banks, or programs.\nAn initial midi-instrument assignment can also\nbe made here.\n\nThe instrument-sound and virtual-instrument elements\nare new as of Version 3.0. The instrument-sound element\ndescribes the default timbre of the score-instrument. This\ndescription is independent of a particular virtual or\nMIDI instrument specification and allows playback to be\nshared more easily between applications and libraries.\nThe virtual-instrument element defines a specific virtual\ninstrument used for an instrument sound. The\nvirtual-library element indicates the virtual instrument\nlibrary name, and the virtual-name element indicates the\nlibrary-specific name for the virtual instrument.\n\nThe solo and ensemble elements are new as of Version\n2.0. The solo element is present if performance is\nintended by a solo instrument. The ensemble element\nis present if performance is intended by an ensemble\nsuch as an orchestral section. The text of the\nensemble element contains the size of the section,\nor is empty if the ensemble size is not specified.\n\nThe midi-instrument element is defined in the common.mod\nfile, as it can be used within both the score-part and\nsound elements.",
      "element": "score-instrument",
      "interface": {
        "<instrument-name>": {},
        "<instrument-abbreviation>": {},
        "<instrument-sound>": {},
        "<solo>": {},
        "<ensemble>": {},
        "<virtual-instrument>": {},
        "id": {
          "type": "string"
        }
      }
    },
    {
      "element": "solo",
      "interface": {}
    },
    {
      "element": "virtual-instrument",
      "interface": {
        "<virtual-library>": {},
        "<virtual-name>": {}
      }
    },
    {
      "//": "The score-header entity contains basic score metadata\nabout the work and movement, score-wide defaults for\nlayout and fonts, credits that appear on the first page,\nand the part list.",
      "entity": "score-header",
      "interface": {
        "<work>": {},
        "<movement-number>": {},
        "<movement-title>": {},
        "<identification>": {},
        "<defaults>": {},
        "<credit>": {
          "array": true
        },
        "<part-list>": {}
      }
    },
    {
      "//": "The score is the root element for the DTD. It includes\nthe score-header entity, followed by a series of\nmeasures with parts inside.\n\nSee also score-partwise.",
      "element": "score-timewise",
      "interface": {
        "_extends": [
          "document-attributes",
          "score-header"
        ],
        "<measure>": {
          "array": true
        }
      }
    },
    {
      "//": "The basic musical data that is associated with a measure.",
      "element": "part",
      "ordered": true,
      "interface": {
        "<note>": {},
        "<backup>": {},
        "<forward>": {},
        "<direction>": {},
        "<attributes>": {},
        "<harmony>": {},
        "<figured-bass>": {},
        "<print>": {},
        "<sound>": {},
        "<barline>": {},
        "<grouping>": {},
        "id": {
          "type": "string",
          "//": "ID of part in the header's part-list."
        }
      }
    },
    {
      "//": "Represents a measure.",
      "element": "measure",
      "interface": {
        "<part>": {
          "array": true,
          "indexBy": "id"
        },
        "number": {
          "type": "string",
          "//": "In partwise files, the number attribute should be the same\nfor measures in different parts that share the same left\nbarline. While the number attribute is often numeric, it\ndoes not have to be. Non-numeric values are typically used\ntogether with the implicit or non-controlling attributes\nbeing set to \"yes\". For a pickup measure, the number\nattribute is typically set to \"0\" and the implicit attribute\nis typically set to \"yes\". Further details about measure\nnumbering can be defined using the measure-numbering\nelement defined in the direction.mod file"
        },
        "implicit": {
          "type": "yes-no",
          "std": false,
          "//": "The implicit attribute is set to \"yes\" for measures where\nthe measure number should never appear, such as pickup\nmeasures and the last half of mid-measure repeats. The\nvalue is \"no\" if not specified."
        },
        "non-controlling": {
          "type": "yes-no",
          "std": false,
          "//": "The non-controlling attribute is intended for use in\nmultimetric music like the Don Giovanni minuet. If set\nto \"yes\", the left barline in this measure does not\ncoincide with the left barline of measures in other\nparts. The value is \"no\" if not specified."
        },
        "width": {
          "type": "tenths",
          "//": "Measure width is specified in tenths. These are the\nglobal tenths specified in the scaling element, not\nlocal tenths as modified by the staff-size element.\nThe width covers the entire measure from barline\nor system start to barline or system end."
        }
      },
      "auto": false
    }
  ]
}