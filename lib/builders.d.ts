import { StartStop, StartStopContinue, StartStopSingle, SymbolSize, AboveBelow, OverUnder, UpDown, TopBottom, LeftRight, EnclosureShape, NormalItalic, NormalBold, LeftCenterRight, TopMiddleBottomBaseline, DirectionMode, StraightCurved, SolidDashedDottedWavy, NormalAngledSquare, UprightInverted, UpperMainBelow, WholeHalfUnison, WholeHalfNone, OddEvenBoth, CueGraceLarge, SeparatorType, TimeSymbolType, CancelLocation, PartSymbolType, ShowFretsType, Count, MxmlAccidental, StemType, NoteheadType, BeamType, AccelRitNone, ActualBothNone, HoleLocation, HoleClosedType, BreathMarkType, SyllabicType, BarlineLocation, BarStyleType, StartStopDiscontinue, WingedType, DirectionTypeBg, TipDirection, WedgeType, LineEndType, PedalType, OctaveShiftType, VoiceSymbol, ExplicitImpliedAlternate, ChordType, TextSegment, EncodingDate, CalendarDate, Position, Placement, Orientation, DirectiveEntity, Bezier, Font, Color, TextDecoration, Justify, Halign, Valign, ValignImage, LetterSpacing, LineHeight, TextDirection, TextRotation, Enclosure, PrintStyle, PrintStyleAlign, LineShape, LineType, DashedFormatting, PrintObject, PrintSpacing, Printout, TextFormatting, LevelDisplay, TrillSound, BendSound, TimeOnly, DocumentAttributes, Editorial, EditorialVoice, Footnote, Level, Fermata, WavyLine, Segno, Coda, NormalDot, Dynamics, Fingering, Fret, String, DisplayText, AccidentalText, PartNameDisplay, PartAbbreviationDisplay, MidiDevice, MidiInstrument, Play, OtherPlay, Scaling, PageMargins, PageLayout, SystemLayout, SystemMargins, SystemDividers, LeftDivider, RightDivider, StaffLayout, MeasureLayout, LineWidth, NoteSize, Distance, Appearance, Creator, Rights, Encoder, Relation, MiscellaneousField, Miscellaneous, Identification, Supports, Encoding, TimeSeparator, TimeSymbol, Cancel, KeyOctave, Key, Time, Interchangeable, PartSymbol, Clef, StaffTuning, StaffDetails, Double, Transpose, Directive, SlashDot, MultipleRest, MeasureRepeat, BeatRepeat, Slash, MeasureStyle, Attributes, Cue, Grace, Chord, Unpitched, Pitch, FullNote, Rest, Tie, Instrument, Note, Type, Dot, Accidental, TimeModification, Stem, Notehead, NoteheadText, Beam, Notations, Tied, Slur, Tuplet, TupletActual, TupletNormal, TupletNumber, TupletType, TupletDot, Glissando, Slide, OtherNotation, OtherDirection, Ornaments, TrillMark, Turn, DelayedTurn, InvertedTurn, DelayedInvertedTurn, VerticalTurn, Shake, Mordent, InvertedMordent, Schleifer, Tremolo, OtherOrnament, AccidentalMark, Technical, UpBow, DownBow, Harmonic, OpenString, ThumbPosition, Pluck, DoubleTongue, TripleTongue, Stopped, SnapPizzicato, HammerOn, PullOff, Bend, WithBar, Tap, Heel, Toe, Fingernails, Hole, HoleClosed, Arrow, Handbell, OtherTechnical, Articulations, Accent, StrongAccent, Staccato, Tenuto, DetachedLegato, Staccatissimo, Spiccato, Scoop, Plop, Doit, Falloff, BreathMark, Caesura, Stress, Unstress, OtherArticulation, Arpeggiate, NonArpeggiate, Laughing, Humming, EndLine, EndParagraph, LyricParts, Lyric, Text, Syllabic, Elision, Extend, FiguredBass, Figure, Prefix, FigureNumber, Suffix, Backup, Forward, Barline, BarStyle, Ending, Repeat, Direction, DirectionType, Rehearsal, Words, Wedge, Dashes, Bracket, Pedal, Metronome, BeatUnitDot, PerMinute, MetronomeNote, MetronomeDot, MetronomeBeam, MetronomeTuplet, OctaveShift, HarpPedals, PedalTuning, Damp, DampAll, Eyeglasses, StringMute, Scordatura, Accord, Image, PrincipalVoice, AccordionRegistration, Percussion, Timpani, Beater, Stick, Offset, HarmonyChord, Harmony, Root, RootStep, RootAlter, Function, Kind, Inversion, Bass, BassStep, BassAlter, Degree, DegreeValue, DegreeAlter, DegreeType, Frame, FirstFret, FrameNote, Barre, Grouping, Feature, Print, MeasureNumbering, Sound, Work, Opus, Defaults, MusicFont, WordFont, LyricFont, LyricLanguage, Credit, CreditWords, CreditImage, ScorePart, PartName, PartAbbreviation, PartGroup, GroupName, GroupNameDisplay, GroupAbbreviation, GroupAbbreviationDisplay, GroupSymbol, GroupBarline, GroupTime, ScoreInstrument, Solo, VirtualInstrument, ScoreHeader, ScoreTimewise, Measure, PartList } from "./index";
import { IAny } from "./operations";
export interface ITextSegmentBuilder {
    build?: () => TextSegment;
    patch: () => IAny[];
    acc: (build: AccidentalText | ((builder: IAccidentalTextBuilder) => IAccidentalTextBuilder)) => ITextSegmentBuilder;
    text: (build: DisplayText | ((builder: IDisplayTextBuilder) => IDisplayTextBuilder)) => ITextSegmentBuilder;
}
export declare function patchTextSegment(base: TextSegment, builder: (build: ITextSegmentBuilder) => ITextSegmentBuilder): IAny[];
export declare function buildTextSegment(builder: (build: ITextSegmentBuilder) => ITextSegmentBuilder): TextSegment;
export interface IEncodingDateBuilder {
    build?: () => EncodingDate;
    patch: () => IAny[];
    month: (month: number) => IEncodingDateBuilder;
    day: (day: number) => IEncodingDateBuilder;
    year: (year: number) => IEncodingDateBuilder;
}
export declare function patchEncodingDate(base: EncodingDate, builder: (build: IEncodingDateBuilder) => IEncodingDateBuilder): IAny[];
export declare function buildEncodingDate(builder: (build: IEncodingDateBuilder) => IEncodingDateBuilder): EncodingDate;
export interface ICalendarDateBuilder {
    build?: () => CalendarDate;
    patch: () => IAny[];
    month: (month: number) => ICalendarDateBuilder;
    day: (day: number) => ICalendarDateBuilder;
    year: (year: number) => ICalendarDateBuilder;
}
export declare function patchCalendarDate(base: CalendarDate, builder: (build: ICalendarDateBuilder) => ICalendarDateBuilder): IAny[];
export declare function buildCalendarDate(builder: (build: ICalendarDateBuilder) => ICalendarDateBuilder): CalendarDate;
export interface IPositionBuilder {
    build?: () => Position;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IPositionBuilder;
    relativeY: (relativeY: number) => IPositionBuilder;
    defaultY: (defaultY: number) => IPositionBuilder;
    relativeX: (relativeX: number) => IPositionBuilder;
}
export declare function patchPosition(base: Position, builder: (build: IPositionBuilder) => IPositionBuilder): IAny[];
export declare function buildPosition(builder: (build: IPositionBuilder) => IPositionBuilder): Position;
export interface IPlacementBuilder {
    build?: () => Placement;
    patch: () => IAny[];
    placement: (placement: AboveBelow) => IPlacementBuilder;
}
export declare function patchPlacement(base: Placement, builder: (build: IPlacementBuilder) => IPlacementBuilder): IAny[];
export declare function buildPlacement(builder: (build: IPlacementBuilder) => IPlacementBuilder): Placement;
export interface IOrientationBuilder {
    build?: () => Orientation;
    patch: () => IAny[];
    orientation: (orientation: OverUnder) => IOrientationBuilder;
}
export declare function patchOrientation(base: Orientation, builder: (build: IOrientationBuilder) => IOrientationBuilder): IAny[];
export declare function buildOrientation(builder: (build: IOrientationBuilder) => IOrientationBuilder): Orientation;
export interface IDirectiveEntityBuilder {
    build?: () => DirectiveEntity;
    patch: () => IAny[];
    directive: (directive: boolean) => IDirectiveEntityBuilder;
}
export declare function patchDirectiveEntity(base: DirectiveEntity, builder: (build: IDirectiveEntityBuilder) => IDirectiveEntityBuilder): IAny[];
export declare function buildDirectiveEntity(builder: (build: IDirectiveEntityBuilder) => IDirectiveEntityBuilder): DirectiveEntity;
export interface IBezierBuilder {
    build?: () => Bezier;
    patch: () => IAny[];
    bezierX2: (bezierX2: number) => IBezierBuilder;
    bezierOffset: (bezierOffset: number) => IBezierBuilder;
    bezierOffset2: (bezierOffset2: number) => IBezierBuilder;
    bezierX: (bezierX: number) => IBezierBuilder;
    bezierY: (bezierY: number) => IBezierBuilder;
    bezierY2: (bezierY2: number) => IBezierBuilder;
}
export declare function patchBezier(base: Bezier, builder: (build: IBezierBuilder) => IBezierBuilder): IAny[];
export declare function buildBezier(builder: (build: IBezierBuilder) => IBezierBuilder): Bezier;
export interface IFontBuilder {
    build?: () => Font;
    patch: () => IAny[];
    fontFamily: (fontFamily: string) => IFontBuilder;
    fontWeight: (fontWeight: NormalBold) => IFontBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFontBuilder;
    fontSize: (fontSize: string) => IFontBuilder;
}
export declare function patchFont(base: Font, builder: (build: IFontBuilder) => IFontBuilder): IAny[];
export declare function buildFont(builder: (build: IFontBuilder) => IFontBuilder): Font;
export interface IColorBuilder {
    build?: () => Color;
    patch: () => IAny[];
    color: (color: string) => IColorBuilder;
}
export declare function patchColor(base: Color, builder: (build: IColorBuilder) => IColorBuilder): IAny[];
export declare function buildColor(builder: (build: IColorBuilder) => IColorBuilder): Color;
export interface ITextDecorationBuilder {
    build?: () => TextDecoration;
    patch: () => IAny[];
    underline: (underline: number) => ITextDecorationBuilder;
    overline: (overline: number) => ITextDecorationBuilder;
    lineThrough: (lineThrough: number) => ITextDecorationBuilder;
}
export declare function patchTextDecoration(base: TextDecoration, builder: (build: ITextDecorationBuilder) => ITextDecorationBuilder): IAny[];
export declare function buildTextDecoration(builder: (build: ITextDecorationBuilder) => ITextDecorationBuilder): TextDecoration;
export interface IJustifyBuilder {
    build?: () => Justify;
    patch: () => IAny[];
    justify: (justify: LeftCenterRight) => IJustifyBuilder;
}
export declare function patchJustify(base: Justify, builder: (build: IJustifyBuilder) => IJustifyBuilder): IAny[];
export declare function buildJustify(builder: (build: IJustifyBuilder) => IJustifyBuilder): Justify;
export interface IHalignBuilder {
    build?: () => Halign;
    patch: () => IAny[];
    halign: (halign: LeftCenterRight) => IHalignBuilder;
}
export declare function patchHalign(base: Halign, builder: (build: IHalignBuilder) => IHalignBuilder): IAny[];
export declare function buildHalign(builder: (build: IHalignBuilder) => IHalignBuilder): Halign;
export interface IValignBuilder {
    build?: () => Valign;
    patch: () => IAny[];
    valign: (valign: TopMiddleBottomBaseline) => IValignBuilder;
}
export declare function patchValign(base: Valign, builder: (build: IValignBuilder) => IValignBuilder): IAny[];
export declare function buildValign(builder: (build: IValignBuilder) => IValignBuilder): Valign;
export interface IValignImageBuilder {
    build?: () => ValignImage;
    patch: () => IAny[];
    valignImage: (valignImage: TopMiddleBottomBaseline) => IValignImageBuilder;
}
export declare function patchValignImage(base: ValignImage, builder: (build: IValignImageBuilder) => IValignImageBuilder): IAny[];
export declare function buildValignImage(builder: (build: IValignImageBuilder) => IValignImageBuilder): ValignImage;
export interface ILetterSpacingBuilder {
    build?: () => LetterSpacing;
    patch: () => IAny[];
    letterSpacing: (letterSpacing: string) => ILetterSpacingBuilder;
}
export declare function patchLetterSpacing(base: LetterSpacing, builder: (build: ILetterSpacingBuilder) => ILetterSpacingBuilder): IAny[];
export declare function buildLetterSpacing(builder: (build: ILetterSpacingBuilder) => ILetterSpacingBuilder): LetterSpacing;
export interface ILineHeightBuilder {
    build?: () => LineHeight;
    patch: () => IAny[];
    lineHeight: (lineHeight: string) => ILineHeightBuilder;
}
export declare function patchLineHeight(base: LineHeight, builder: (build: ILineHeightBuilder) => ILineHeightBuilder): IAny[];
export declare function buildLineHeight(builder: (build: ILineHeightBuilder) => ILineHeightBuilder): LineHeight;
export interface ITextDirectionBuilder {
    build?: () => TextDirection;
    patch: () => IAny[];
    dir: (dir: DirectionMode) => ITextDirectionBuilder;
}
export declare function patchTextDirection(base: TextDirection, builder: (build: ITextDirectionBuilder) => ITextDirectionBuilder): IAny[];
export declare function buildTextDirection(builder: (build: ITextDirectionBuilder) => ITextDirectionBuilder): TextDirection;
export interface ITextRotationBuilder {
    build?: () => TextRotation;
    patch: () => IAny[];
    rotation: (rotation: number) => ITextRotationBuilder;
}
export declare function patchTextRotation(base: TextRotation, builder: (build: ITextRotationBuilder) => ITextRotationBuilder): IAny[];
export declare function buildTextRotation(builder: (build: ITextRotationBuilder) => ITextRotationBuilder): TextRotation;
export interface IEnclosureBuilder {
    build?: () => Enclosure;
    patch: () => IAny[];
    enclosure: (enclosure: EnclosureShape) => IEnclosureBuilder;
}
export declare function patchEnclosure(base: Enclosure, builder: (build: IEnclosureBuilder) => IEnclosureBuilder): IAny[];
export declare function buildEnclosure(builder: (build: IEnclosureBuilder) => IEnclosureBuilder): Enclosure;
export interface IPrintStyleBuilder {
    build?: () => PrintStyle;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IPrintStyleBuilder;
    relativeY: (relativeY: number) => IPrintStyleBuilder;
    defaultY: (defaultY: number) => IPrintStyleBuilder;
    relativeX: (relativeX: number) => IPrintStyleBuilder;
    fontFamily: (fontFamily: string) => IPrintStyleBuilder;
    fontWeight: (fontWeight: NormalBold) => IPrintStyleBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPrintStyleBuilder;
    fontSize: (fontSize: string) => IPrintStyleBuilder;
    color: (color: string) => IPrintStyleBuilder;
}
export declare function patchPrintStyle(base: PrintStyle, builder: (build: IPrintStyleBuilder) => IPrintStyleBuilder): IAny[];
export declare function buildPrintStyle(builder: (build: IPrintStyleBuilder) => IPrintStyleBuilder): PrintStyle;
export interface IPrintStyleAlignBuilder {
    build?: () => PrintStyleAlign;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IPrintStyleAlignBuilder;
    relativeY: (relativeY: number) => IPrintStyleAlignBuilder;
    defaultY: (defaultY: number) => IPrintStyleAlignBuilder;
    relativeX: (relativeX: number) => IPrintStyleAlignBuilder;
    fontFamily: (fontFamily: string) => IPrintStyleAlignBuilder;
    fontWeight: (fontWeight: NormalBold) => IPrintStyleAlignBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPrintStyleAlignBuilder;
    fontSize: (fontSize: string) => IPrintStyleAlignBuilder;
    color: (color: string) => IPrintStyleAlignBuilder;
    halign: (halign: LeftCenterRight) => IPrintStyleAlignBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IPrintStyleAlignBuilder;
}
export declare function patchPrintStyleAlign(base: PrintStyleAlign, builder: (build: IPrintStyleAlignBuilder) => IPrintStyleAlignBuilder): IAny[];
export declare function buildPrintStyleAlign(builder: (build: IPrintStyleAlignBuilder) => IPrintStyleAlignBuilder): PrintStyleAlign;
export interface ILineShapeBuilder {
    build?: () => LineShape;
    patch: () => IAny[];
    lineShape: (lineShape: StraightCurved) => ILineShapeBuilder;
}
export declare function patchLineShape(base: LineShape, builder: (build: ILineShapeBuilder) => ILineShapeBuilder): IAny[];
export declare function buildLineShape(builder: (build: ILineShapeBuilder) => ILineShapeBuilder): LineShape;
export interface ILineTypeBuilder {
    build?: () => LineType;
    patch: () => IAny[];
    lineType: (lineType: SolidDashedDottedWavy) => ILineTypeBuilder;
}
export declare function patchLineType(base: LineType, builder: (build: ILineTypeBuilder) => ILineTypeBuilder): IAny[];
export declare function buildLineType(builder: (build: ILineTypeBuilder) => ILineTypeBuilder): LineType;
export interface IDashedFormattingBuilder {
    build?: () => DashedFormatting;
    patch: () => IAny[];
    dashLength: (dashLength: number) => IDashedFormattingBuilder;
    spaceLength: (spaceLength: number) => IDashedFormattingBuilder;
}
export declare function patchDashedFormatting(base: DashedFormatting, builder: (build: IDashedFormattingBuilder) => IDashedFormattingBuilder): IAny[];
export declare function buildDashedFormatting(builder: (build: IDashedFormattingBuilder) => IDashedFormattingBuilder): DashedFormatting;
export interface IPrintObjectBuilder {
    build?: () => PrintObject;
    patch: () => IAny[];
    printObject: (printObject: boolean) => IPrintObjectBuilder;
}
export declare function patchPrintObject(base: PrintObject, builder: (build: IPrintObjectBuilder) => IPrintObjectBuilder): IAny[];
export declare function buildPrintObject(builder: (build: IPrintObjectBuilder) => IPrintObjectBuilder): PrintObject;
export interface IPrintSpacingBuilder {
    build?: () => PrintSpacing;
    patch: () => IAny[];
    printSpacing: (printSpacing: boolean) => IPrintSpacingBuilder;
}
export declare function patchPrintSpacing(base: PrintSpacing, builder: (build: IPrintSpacingBuilder) => IPrintSpacingBuilder): IAny[];
export declare function buildPrintSpacing(builder: (build: IPrintSpacingBuilder) => IPrintSpacingBuilder): PrintSpacing;
export interface IPrintoutBuilder {
    build?: () => Printout;
    patch: () => IAny[];
    printDot: (printDot: boolean) => IPrintoutBuilder;
    printLyric: (printLyric: boolean) => IPrintoutBuilder;
    printObject: (printObject: boolean) => IPrintoutBuilder;
    printSpacing: (printSpacing: boolean) => IPrintoutBuilder;
}
export declare function patchPrintout(base: Printout, builder: (build: IPrintoutBuilder) => IPrintoutBuilder): IAny[];
export declare function buildPrintout(builder: (build: IPrintoutBuilder) => IPrintoutBuilder): Printout;
export interface ITextFormattingBuilder {
    build?: () => TextFormatting;
    patch: () => IAny[];
    justify: (justify: LeftCenterRight) => ITextFormattingBuilder;
    defaultX: (defaultX: number) => ITextFormattingBuilder;
    relativeY: (relativeY: number) => ITextFormattingBuilder;
    defaultY: (defaultY: number) => ITextFormattingBuilder;
    relativeX: (relativeX: number) => ITextFormattingBuilder;
    fontFamily: (fontFamily: string) => ITextFormattingBuilder;
    fontWeight: (fontWeight: NormalBold) => ITextFormattingBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITextFormattingBuilder;
    fontSize: (fontSize: string) => ITextFormattingBuilder;
    color: (color: string) => ITextFormattingBuilder;
    halign: (halign: LeftCenterRight) => ITextFormattingBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ITextFormattingBuilder;
    underline: (underline: number) => ITextFormattingBuilder;
    overline: (overline: number) => ITextFormattingBuilder;
    lineThrough: (lineThrough: number) => ITextFormattingBuilder;
    rotation: (rotation: number) => ITextFormattingBuilder;
    letterSpacing: (letterSpacing: string) => ITextFormattingBuilder;
    lineHeight: (lineHeight: string) => ITextFormattingBuilder;
    dir: (dir: DirectionMode) => ITextFormattingBuilder;
    enclosure: (enclosure: EnclosureShape) => ITextFormattingBuilder;
}
export declare function patchTextFormatting(base: TextFormatting, builder: (build: ITextFormattingBuilder) => ITextFormattingBuilder): IAny[];
export declare function buildTextFormatting(builder: (build: ITextFormattingBuilder) => ITextFormattingBuilder): TextFormatting;
export interface ILevelDisplayBuilder {
    build?: () => LevelDisplay;
    patch: () => IAny[];
    bracket: (bracket: boolean) => ILevelDisplayBuilder;
    size: (size: SymbolSize) => ILevelDisplayBuilder;
    parentheses: (parentheses: boolean) => ILevelDisplayBuilder;
}
export declare function patchLevelDisplay(base: LevelDisplay, builder: (build: ILevelDisplayBuilder) => ILevelDisplayBuilder): IAny[];
export declare function buildLevelDisplay(builder: (build: ILevelDisplayBuilder) => ILevelDisplayBuilder): LevelDisplay;
export interface ITrillSoundBuilder {
    build?: () => TrillSound;
    patch: () => IAny[];
    startNote: (startNote: UpperMainBelow) => ITrillSoundBuilder;
    accelerate: (accelerate: boolean) => ITrillSoundBuilder;
    beats: (beats: number) => ITrillSoundBuilder;
    lastBeat: (lastBeat: number) => ITrillSoundBuilder;
    trillStep: (trillStep: WholeHalfUnison) => ITrillSoundBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => ITrillSoundBuilder;
    secondBeat: (secondBeat: number) => ITrillSoundBuilder;
}
export declare function patchTrillSound(base: TrillSound, builder: (build: ITrillSoundBuilder) => ITrillSoundBuilder): IAny[];
export declare function buildTrillSound(builder: (build: ITrillSoundBuilder) => ITrillSoundBuilder): TrillSound;
export interface IBendSoundBuilder {
    build?: () => BendSound;
    patch: () => IAny[];
    accelerate: (accelerate: boolean) => IBendSoundBuilder;
    beats: (beats: number) => IBendSoundBuilder;
    firstBeat: (firstBeat: number) => IBendSoundBuilder;
    lastBeat: (lastBeat: number) => IBendSoundBuilder;
}
export declare function patchBendSound(base: BendSound, builder: (build: IBendSoundBuilder) => IBendSoundBuilder): IAny[];
export declare function buildBendSound(builder: (build: IBendSoundBuilder) => IBendSoundBuilder): BendSound;
export interface ITimeOnlyBuilder {
    build?: () => TimeOnly;
    patch: () => IAny[];
    timeOnly: (timeOnly: string) => ITimeOnlyBuilder;
}
export declare function patchTimeOnly(base: TimeOnly, builder: (build: ITimeOnlyBuilder) => ITimeOnlyBuilder): IAny[];
export declare function buildTimeOnly(builder: (build: ITimeOnlyBuilder) => ITimeOnlyBuilder): TimeOnly;
export interface IDocumentAttributesBuilder {
    build?: () => DocumentAttributes;
    patch: () => IAny[];
    version: (version: string) => IDocumentAttributesBuilder;
}
export declare function patchDocumentAttributes(base: DocumentAttributes, builder: (build: IDocumentAttributesBuilder) => IDocumentAttributesBuilder): IAny[];
export declare function buildDocumentAttributes(builder: (build: IDocumentAttributesBuilder) => IDocumentAttributesBuilder): DocumentAttributes;
export interface IEditorialBuilder {
    build?: () => Editorial;
    patch: () => IAny[];
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IEditorialBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IEditorialBuilder;
}
export declare function patchEditorial(base: Editorial, builder: (build: IEditorialBuilder) => IEditorialBuilder): IAny[];
export declare function buildEditorial(builder: (build: IEditorialBuilder) => IEditorialBuilder): Editorial;
export interface IEditorialVoiceBuilder {
    build?: () => EditorialVoice;
    patch: () => IAny[];
    voice: (voice: number) => IEditorialVoiceBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IEditorialVoiceBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IEditorialVoiceBuilder;
}
export declare function patchEditorialVoice(base: EditorialVoice, builder: (build: IEditorialVoiceBuilder) => IEditorialVoiceBuilder): IAny[];
export declare function buildEditorialVoice(builder: (build: IEditorialVoiceBuilder) => IEditorialVoiceBuilder): EditorialVoice;
export interface IFootnoteBuilder {
    build?: () => Footnote;
    patch: () => IAny[];
    text: (text: string) => IFootnoteBuilder;
    justify: (justify: LeftCenterRight) => IFootnoteBuilder;
    defaultX: (defaultX: number) => IFootnoteBuilder;
    relativeY: (relativeY: number) => IFootnoteBuilder;
    defaultY: (defaultY: number) => IFootnoteBuilder;
    relativeX: (relativeX: number) => IFootnoteBuilder;
    fontFamily: (fontFamily: string) => IFootnoteBuilder;
    fontWeight: (fontWeight: NormalBold) => IFootnoteBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFootnoteBuilder;
    fontSize: (fontSize: string) => IFootnoteBuilder;
    color: (color: string) => IFootnoteBuilder;
    halign: (halign: LeftCenterRight) => IFootnoteBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IFootnoteBuilder;
    underline: (underline: number) => IFootnoteBuilder;
    overline: (overline: number) => IFootnoteBuilder;
    lineThrough: (lineThrough: number) => IFootnoteBuilder;
    rotation: (rotation: number) => IFootnoteBuilder;
    letterSpacing: (letterSpacing: string) => IFootnoteBuilder;
    lineHeight: (lineHeight: string) => IFootnoteBuilder;
    dir: (dir: DirectionMode) => IFootnoteBuilder;
    enclosure: (enclosure: EnclosureShape) => IFootnoteBuilder;
}
export declare function patchFootnote(base: Footnote, builder: (build: IFootnoteBuilder) => IFootnoteBuilder): IAny[];
export declare function buildFootnote(builder: (build: IFootnoteBuilder) => IFootnoteBuilder): Footnote;
export interface ILevelBuilder {
    build?: () => Level;
    patch: () => IAny[];
    text: (text: string) => ILevelBuilder;
    reference: (reference: boolean) => ILevelBuilder;
    bracket: (bracket: boolean) => ILevelBuilder;
    size: (size: SymbolSize) => ILevelBuilder;
    parentheses: (parentheses: boolean) => ILevelBuilder;
}
export declare function patchLevel(base: Level, builder: (build: ILevelBuilder) => ILevelBuilder): IAny[];
export declare function buildLevel(builder: (build: ILevelBuilder) => ILevelBuilder): Level;
export interface IFermataBuilder {
    build?: () => Fermata;
    patch: () => IAny[];
    shape: (shape: NormalAngledSquare) => IFermataBuilder;
    type: (type: UprightInverted) => IFermataBuilder;
    defaultX: (defaultX: number) => IFermataBuilder;
    relativeY: (relativeY: number) => IFermataBuilder;
    defaultY: (defaultY: number) => IFermataBuilder;
    relativeX: (relativeX: number) => IFermataBuilder;
    fontFamily: (fontFamily: string) => IFermataBuilder;
    fontWeight: (fontWeight: NormalBold) => IFermataBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFermataBuilder;
    fontSize: (fontSize: string) => IFermataBuilder;
    color: (color: string) => IFermataBuilder;
}
export declare function patchFermata(base: Fermata, builder: (build: IFermataBuilder) => IFermataBuilder): IAny[];
export declare function buildFermata(builder: (build: IFermataBuilder) => IFermataBuilder): Fermata;
export interface IWavyLineBuilder {
    build?: () => WavyLine;
    patch: () => IAny[];
    number: (number: number) => IWavyLineBuilder;
    type: (type: StartStopContinue) => IWavyLineBuilder;
    defaultX: (defaultX: number) => IWavyLineBuilder;
    relativeY: (relativeY: number) => IWavyLineBuilder;
    defaultY: (defaultY: number) => IWavyLineBuilder;
    relativeX: (relativeX: number) => IWavyLineBuilder;
    color: (color: string) => IWavyLineBuilder;
    placement: (placement: AboveBelow) => IWavyLineBuilder;
    startNote: (startNote: UpperMainBelow) => IWavyLineBuilder;
    accelerate: (accelerate: boolean) => IWavyLineBuilder;
    beats: (beats: number) => IWavyLineBuilder;
    lastBeat: (lastBeat: number) => IWavyLineBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IWavyLineBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IWavyLineBuilder;
    secondBeat: (secondBeat: number) => IWavyLineBuilder;
}
export declare function patchWavyLine(base: WavyLine, builder: (build: IWavyLineBuilder) => IWavyLineBuilder): IAny[];
export declare function buildWavyLine(builder: (build: IWavyLineBuilder) => IWavyLineBuilder): WavyLine;
export interface ISegnoBuilder {
    build?: () => Segno;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ISegnoBuilder;
    relativeY: (relativeY: number) => ISegnoBuilder;
    defaultY: (defaultY: number) => ISegnoBuilder;
    relativeX: (relativeX: number) => ISegnoBuilder;
    fontFamily: (fontFamily: string) => ISegnoBuilder;
    fontWeight: (fontWeight: NormalBold) => ISegnoBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISegnoBuilder;
    fontSize: (fontSize: string) => ISegnoBuilder;
    color: (color: string) => ISegnoBuilder;
    halign: (halign: LeftCenterRight) => ISegnoBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ISegnoBuilder;
}
export declare function patchSegno(base: Segno, builder: (build: ISegnoBuilder) => ISegnoBuilder): IAny[];
export declare function buildSegno(builder: (build: ISegnoBuilder) => ISegnoBuilder): Segno;
export interface ICodaBuilder {
    build?: () => Coda;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ICodaBuilder;
    relativeY: (relativeY: number) => ICodaBuilder;
    defaultY: (defaultY: number) => ICodaBuilder;
    relativeX: (relativeX: number) => ICodaBuilder;
    fontFamily: (fontFamily: string) => ICodaBuilder;
    fontWeight: (fontWeight: NormalBold) => ICodaBuilder;
    fontStyle: (fontStyle: NormalItalic) => ICodaBuilder;
    fontSize: (fontSize: string) => ICodaBuilder;
    color: (color: string) => ICodaBuilder;
    halign: (halign: LeftCenterRight) => ICodaBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ICodaBuilder;
}
export declare function patchCoda(base: Coda, builder: (build: ICodaBuilder) => ICodaBuilder): IAny[];
export declare function buildCoda(builder: (build: ICodaBuilder) => ICodaBuilder): Coda;
export interface INormalDotBuilder {
    build?: () => NormalDot;
    patch: () => IAny[];
}
export declare function patchNormalDot(base: NormalDot, builder: (build: INormalDotBuilder) => INormalDotBuilder): IAny[];
export declare function buildNormalDot(builder: (build: INormalDotBuilder) => INormalDotBuilder): NormalDot;
export interface IDynamicsBuilder {
    build?: () => Dynamics;
    patch: () => IAny[];
    f: (f: boolean) => IDynamicsBuilder;
    ff: (ff: boolean) => IDynamicsBuilder;
    fff: (fff: boolean) => IDynamicsBuilder;
    ffff: (ffff: boolean) => IDynamicsBuilder;
    fffff: (fffff: boolean) => IDynamicsBuilder;
    ffffff: (ffffff: boolean) => IDynamicsBuilder;
    fp: (fp: boolean) => IDynamicsBuilder;
    fz: (fz: boolean) => IDynamicsBuilder;
    mf: (mf: boolean) => IDynamicsBuilder;
    mp: (mp: boolean) => IDynamicsBuilder;
    otherDynamics: (otherDynamics: string) => IDynamicsBuilder;
    p: (p: boolean) => IDynamicsBuilder;
    pp: (pp: boolean) => IDynamicsBuilder;
    ppp: (ppp: boolean) => IDynamicsBuilder;
    pppp: (pppp: boolean) => IDynamicsBuilder;
    ppppp: (ppppp: boolean) => IDynamicsBuilder;
    pppppp: (pppppp: boolean) => IDynamicsBuilder;
    rf: (rf: boolean) => IDynamicsBuilder;
    rfz: (rfz: boolean) => IDynamicsBuilder;
    sf: (sf: boolean) => IDynamicsBuilder;
    sffz: (sffz: boolean) => IDynamicsBuilder;
    sfp: (sfp: boolean) => IDynamicsBuilder;
    sfpp: (sfpp: boolean) => IDynamicsBuilder;
    sfz: (sfz: boolean) => IDynamicsBuilder;
    defaultX: (defaultX: number) => IDynamicsBuilder;
    relativeY: (relativeY: number) => IDynamicsBuilder;
    defaultY: (defaultY: number) => IDynamicsBuilder;
    relativeX: (relativeX: number) => IDynamicsBuilder;
    fontFamily: (fontFamily: string) => IDynamicsBuilder;
    fontWeight: (fontWeight: NormalBold) => IDynamicsBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDynamicsBuilder;
    fontSize: (fontSize: string) => IDynamicsBuilder;
    color: (color: string) => IDynamicsBuilder;
    halign: (halign: LeftCenterRight) => IDynamicsBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IDynamicsBuilder;
    underline: (underline: number) => IDynamicsBuilder;
    overline: (overline: number) => IDynamicsBuilder;
    lineThrough: (lineThrough: number) => IDynamicsBuilder;
    enclosure: (enclosure: EnclosureShape) => IDynamicsBuilder;
    placement: (placement: AboveBelow) => IDynamicsBuilder;
}
export declare function patchDynamics(base: Dynamics, builder: (build: IDynamicsBuilder) => IDynamicsBuilder): IAny[];
export declare function buildDynamics(builder: (build: IDynamicsBuilder) => IDynamicsBuilder): Dynamics;
export interface IFingeringBuilder {
    build?: () => Fingering;
    patch: () => IAny[];
    substitution: (substitution: boolean) => IFingeringBuilder;
    finger: (finger: number) => IFingeringBuilder;
    alternate: (alternate: boolean) => IFingeringBuilder;
    defaultX: (defaultX: number) => IFingeringBuilder;
    relativeY: (relativeY: number) => IFingeringBuilder;
    defaultY: (defaultY: number) => IFingeringBuilder;
    relativeX: (relativeX: number) => IFingeringBuilder;
    fontFamily: (fontFamily: string) => IFingeringBuilder;
    fontWeight: (fontWeight: NormalBold) => IFingeringBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFingeringBuilder;
    fontSize: (fontSize: string) => IFingeringBuilder;
    color: (color: string) => IFingeringBuilder;
    placement: (placement: AboveBelow) => IFingeringBuilder;
}
export declare function patchFingering(base: Fingering, builder: (build: IFingeringBuilder) => IFingeringBuilder): IAny[];
export declare function buildFingering(builder: (build: IFingeringBuilder) => IFingeringBuilder): Fingering;
export interface IFretBuilder {
    build?: () => Fret;
    patch: () => IAny[];
    fret: (fret: number) => IFretBuilder;
    fontFamily: (fontFamily: string) => IFretBuilder;
    fontWeight: (fontWeight: NormalBold) => IFretBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFretBuilder;
    fontSize: (fontSize: string) => IFretBuilder;
    color: (color: string) => IFretBuilder;
}
export declare function patchFret(base: Fret, builder: (build: IFretBuilder) => IFretBuilder): IAny[];
export declare function buildFret(builder: (build: IFretBuilder) => IFretBuilder): Fret;
export interface IStringBuilder {
    build?: () => String;
    patch: () => IAny[];
    stringNum: (stringNum: number) => IStringBuilder;
    defaultX: (defaultX: number) => IStringBuilder;
    relativeY: (relativeY: number) => IStringBuilder;
    defaultY: (defaultY: number) => IStringBuilder;
    relativeX: (relativeX: number) => IStringBuilder;
    fontFamily: (fontFamily: string) => IStringBuilder;
    fontWeight: (fontWeight: NormalBold) => IStringBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStringBuilder;
    fontSize: (fontSize: string) => IStringBuilder;
    color: (color: string) => IStringBuilder;
    placement: (placement: AboveBelow) => IStringBuilder;
}
export declare function patchString(base: String, builder: (build: IStringBuilder) => IStringBuilder): IAny[];
export declare function buildString(builder: (build: IStringBuilder) => IStringBuilder): String;
export interface IDisplayTextBuilder {
    build?: () => DisplayText;
    patch: () => IAny[];
    text: (text: string) => IDisplayTextBuilder;
    justify: (justify: LeftCenterRight) => IDisplayTextBuilder;
    defaultX: (defaultX: number) => IDisplayTextBuilder;
    relativeY: (relativeY: number) => IDisplayTextBuilder;
    defaultY: (defaultY: number) => IDisplayTextBuilder;
    relativeX: (relativeX: number) => IDisplayTextBuilder;
    fontFamily: (fontFamily: string) => IDisplayTextBuilder;
    fontWeight: (fontWeight: NormalBold) => IDisplayTextBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDisplayTextBuilder;
    fontSize: (fontSize: string) => IDisplayTextBuilder;
    color: (color: string) => IDisplayTextBuilder;
    halign: (halign: LeftCenterRight) => IDisplayTextBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IDisplayTextBuilder;
    underline: (underline: number) => IDisplayTextBuilder;
    overline: (overline: number) => IDisplayTextBuilder;
    lineThrough: (lineThrough: number) => IDisplayTextBuilder;
    rotation: (rotation: number) => IDisplayTextBuilder;
    letterSpacing: (letterSpacing: string) => IDisplayTextBuilder;
    lineHeight: (lineHeight: string) => IDisplayTextBuilder;
    dir: (dir: DirectionMode) => IDisplayTextBuilder;
    enclosure: (enclosure: EnclosureShape) => IDisplayTextBuilder;
}
export declare function patchDisplayText(base: DisplayText, builder: (build: IDisplayTextBuilder) => IDisplayTextBuilder): IAny[];
export declare function buildDisplayText(builder: (build: IDisplayTextBuilder) => IDisplayTextBuilder): DisplayText;
export interface IAccidentalTextBuilder {
    build?: () => AccidentalText;
    patch: () => IAny[];
    text: (text: string) => IAccidentalTextBuilder;
    justify: (justify: LeftCenterRight) => IAccidentalTextBuilder;
    defaultX: (defaultX: number) => IAccidentalTextBuilder;
    relativeY: (relativeY: number) => IAccidentalTextBuilder;
    defaultY: (defaultY: number) => IAccidentalTextBuilder;
    relativeX: (relativeX: number) => IAccidentalTextBuilder;
    fontFamily: (fontFamily: string) => IAccidentalTextBuilder;
    fontWeight: (fontWeight: NormalBold) => IAccidentalTextBuilder;
    fontStyle: (fontStyle: NormalItalic) => IAccidentalTextBuilder;
    fontSize: (fontSize: string) => IAccidentalTextBuilder;
    color: (color: string) => IAccidentalTextBuilder;
    halign: (halign: LeftCenterRight) => IAccidentalTextBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IAccidentalTextBuilder;
    underline: (underline: number) => IAccidentalTextBuilder;
    overline: (overline: number) => IAccidentalTextBuilder;
    lineThrough: (lineThrough: number) => IAccidentalTextBuilder;
    rotation: (rotation: number) => IAccidentalTextBuilder;
    letterSpacing: (letterSpacing: string) => IAccidentalTextBuilder;
    lineHeight: (lineHeight: string) => IAccidentalTextBuilder;
    dir: (dir: DirectionMode) => IAccidentalTextBuilder;
    enclosure: (enclosure: EnclosureShape) => IAccidentalTextBuilder;
}
export declare function patchAccidentalText(base: AccidentalText, builder: (build: IAccidentalTextBuilder) => IAccidentalTextBuilder): IAny[];
export declare function buildAccidentalText(builder: (build: IAccidentalTextBuilder) => IAccidentalTextBuilder): AccidentalText;
export interface IPartNameDisplayBuilder {
    build?: () => PartNameDisplay;
    patch: () => IAny[];
    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IPartNameDisplayBuilder;
    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IPartNameDisplayBuilder;
    name: (name: TextSegment[]) => IPartNameDisplayBuilder;
    printObject: (printObject: boolean) => IPartNameDisplayBuilder;
}
export declare function patchPartNameDisplay(base: PartNameDisplay, builder: (build: IPartNameDisplayBuilder) => IPartNameDisplayBuilder): IAny[];
export declare function buildPartNameDisplay(builder: (build: IPartNameDisplayBuilder) => IPartNameDisplayBuilder): PartNameDisplay;
export interface IPartAbbreviationDisplayBuilder {
    build?: () => PartAbbreviationDisplay;
    patch: () => IAny[];
    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IPartAbbreviationDisplayBuilder;
    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IPartAbbreviationDisplayBuilder;
    name: (name: TextSegment[]) => IPartAbbreviationDisplayBuilder;
    printObject: (printObject: boolean) => IPartAbbreviationDisplayBuilder;
}
export declare function patchPartAbbreviationDisplay(base: PartAbbreviationDisplay, builder: (build: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder): IAny[];
export declare function buildPartAbbreviationDisplay(builder: (build: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder): PartAbbreviationDisplay;
export interface IMidiDeviceBuilder {
    build?: () => MidiDevice;
    patch: () => IAny[];
    port: (port: number) => IMidiDeviceBuilder;
    deviceName: (deviceName: string) => IMidiDeviceBuilder;
    id: (id: number) => IMidiDeviceBuilder;
}
export declare function patchMidiDevice(base: MidiDevice, builder: (build: IMidiDeviceBuilder) => IMidiDeviceBuilder): IAny[];
export declare function buildMidiDevice(builder: (build: IMidiDeviceBuilder) => IMidiDeviceBuilder): MidiDevice;
export interface IMidiInstrumentBuilder {
    build?: () => MidiInstrument;
    patch: () => IAny[];
    midiUnpitched: (midiUnpitched: number) => IMidiInstrumentBuilder;
    volume: (volume: number) => IMidiInstrumentBuilder;
    pan: (pan: number) => IMidiInstrumentBuilder;
    elevation: (elevation: number) => IMidiInstrumentBuilder;
    midiBank: (midiBank: number) => IMidiInstrumentBuilder;
    midiProgram: (midiProgram: number) => IMidiInstrumentBuilder;
    id: (id: string) => IMidiInstrumentBuilder;
    midiChannel: (midiChannel: number) => IMidiInstrumentBuilder;
    midiName: (midiName: string) => IMidiInstrumentBuilder;
}
export declare function patchMidiInstrument(base: MidiInstrument, builder: (build: IMidiInstrumentBuilder) => IMidiInstrumentBuilder): IAny[];
export declare function buildMidiInstrument(builder: (build: IMidiInstrumentBuilder) => IMidiInstrumentBuilder): MidiInstrument;
export interface IPlayBuilder {
    build?: () => Play;
    patch: () => IAny[];
    ipa: (ipa: string) => IPlayBuilder;
    mute: (mute: string) => IPlayBuilder;
    otherPlay: (build: OtherPlay | ((builder: IOtherPlayBuilder) => IOtherPlayBuilder)) => IPlayBuilder;
    semiPitched: (semiPitched: string) => IPlayBuilder;
    id: (id: string) => IPlayBuilder;
}
export declare function patchPlay(base: Play, builder: (build: IPlayBuilder) => IPlayBuilder): IAny[];
export declare function buildPlay(builder: (build: IPlayBuilder) => IPlayBuilder): Play;
export interface IOtherPlayBuilder {
    build?: () => OtherPlay;
    patch: () => IAny[];
    data: (data: string) => IOtherPlayBuilder;
    type: (type: string) => IOtherPlayBuilder;
}
export declare function patchOtherPlay(base: OtherPlay, builder: (build: IOtherPlayBuilder) => IOtherPlayBuilder): IAny[];
export declare function buildOtherPlay(builder: (build: IOtherPlayBuilder) => IOtherPlayBuilder): OtherPlay;
export interface IScalingBuilder {
    build?: () => Scaling;
    patch: () => IAny[];
    tenths: (tenths: number) => IScalingBuilder;
    millimeters: (millimeters: number) => IScalingBuilder;
}
export declare function patchScaling(base: Scaling, builder: (build: IScalingBuilder) => IScalingBuilder): IAny[];
export declare function buildScaling(builder: (build: IScalingBuilder) => IScalingBuilder): Scaling;
export interface IPageMarginsBuilder {
    build?: () => PageMargins;
    patch: () => IAny[];
    topMargin: (topMargin: number) => IPageMarginsBuilder;
    leftMargin: (leftMargin: number) => IPageMarginsBuilder;
    bottomMargin: (bottomMargin: number) => IPageMarginsBuilder;
    type: (type: OddEvenBoth) => IPageMarginsBuilder;
    rightMargin: (rightMargin: number) => IPageMarginsBuilder;
}
export declare function patchPageMargins(base: PageMargins, builder: (build: IPageMarginsBuilder) => IPageMarginsBuilder): IAny[];
export declare function buildPageMargins(builder: (build: IPageMarginsBuilder) => IPageMarginsBuilder): PageMargins;
export interface IPageLayoutBuilder {
    build?: () => PageLayout;
    patch: () => IAny[];
    pageHeight: (pageHeight: number) => IPageLayoutBuilder;
    pageWidth: (pageWidth: number) => IPageLayoutBuilder;
    pageMarginsAt: (idx: number, build: PageMargins | ((builder: IPageMarginsBuilder) => IPageMarginsBuilder)) => IPageLayoutBuilder;
    pageMarginsSplice: (start: number, deleteCount: number, ...items: PageMargins[]) => IPageLayoutBuilder;
    pageMargins: (pageMargins: PageMargins[]) => IPageLayoutBuilder;
}
export declare function patchPageLayout(base: PageLayout, builder: (build: IPageLayoutBuilder) => IPageLayoutBuilder): IAny[];
export declare function buildPageLayout(builder: (build: IPageLayoutBuilder) => IPageLayoutBuilder): PageLayout;
export interface ISystemLayoutBuilder {
    build?: () => SystemLayout;
    patch: () => IAny[];
    systemDividers: (build: SystemDividers | ((builder: ISystemDividersBuilder) => ISystemDividersBuilder)) => ISystemLayoutBuilder;
    systemMargins: (build: SystemMargins | ((builder: ISystemMarginsBuilder) => ISystemMarginsBuilder)) => ISystemLayoutBuilder;
    systemDistance: (systemDistance: number) => ISystemLayoutBuilder;
    topSystemDistance: (topSystemDistance: number) => ISystemLayoutBuilder;
}
export declare function patchSystemLayout(base: SystemLayout, builder: (build: ISystemLayoutBuilder) => ISystemLayoutBuilder): IAny[];
export declare function buildSystemLayout(builder: (build: ISystemLayoutBuilder) => ISystemLayoutBuilder): SystemLayout;
export interface ISystemMarginsBuilder {
    build?: () => SystemMargins;
    patch: () => IAny[];
    leftMargin: (leftMargin: number) => ISystemMarginsBuilder;
    rightMargin: (rightMargin: number) => ISystemMarginsBuilder;
}
export declare function patchSystemMargins(base: SystemMargins, builder: (build: ISystemMarginsBuilder) => ISystemMarginsBuilder): IAny[];
export declare function buildSystemMargins(builder: (build: ISystemMarginsBuilder) => ISystemMarginsBuilder): SystemMargins;
export interface ISystemDividersBuilder {
    build?: () => SystemDividers;
    patch: () => IAny[];
    rightDivider: (build: RightDivider | ((builder: IRightDividerBuilder) => IRightDividerBuilder)) => ISystemDividersBuilder;
    leftDivider: (build: LeftDivider | ((builder: ILeftDividerBuilder) => ILeftDividerBuilder)) => ISystemDividersBuilder;
}
export declare function patchSystemDividers(base: SystemDividers, builder: (build: ISystemDividersBuilder) => ISystemDividersBuilder): IAny[];
export declare function buildSystemDividers(builder: (build: ISystemDividersBuilder) => ISystemDividersBuilder): SystemDividers;
export interface ILeftDividerBuilder {
    build?: () => LeftDivider;
    patch: () => IAny[];
    printObject: (printObject: boolean) => ILeftDividerBuilder;
    defaultX: (defaultX: number) => ILeftDividerBuilder;
    relativeY: (relativeY: number) => ILeftDividerBuilder;
    defaultY: (defaultY: number) => ILeftDividerBuilder;
    relativeX: (relativeX: number) => ILeftDividerBuilder;
    fontFamily: (fontFamily: string) => ILeftDividerBuilder;
    fontWeight: (fontWeight: NormalBold) => ILeftDividerBuilder;
    fontStyle: (fontStyle: NormalItalic) => ILeftDividerBuilder;
    fontSize: (fontSize: string) => ILeftDividerBuilder;
    color: (color: string) => ILeftDividerBuilder;
    halign: (halign: LeftCenterRight) => ILeftDividerBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ILeftDividerBuilder;
}
export declare function patchLeftDivider(base: LeftDivider, builder: (build: ILeftDividerBuilder) => ILeftDividerBuilder): IAny[];
export declare function buildLeftDivider(builder: (build: ILeftDividerBuilder) => ILeftDividerBuilder): LeftDivider;
export interface IRightDividerBuilder {
    build?: () => RightDivider;
    patch: () => IAny[];
    printObject: (printObject: boolean) => IRightDividerBuilder;
    defaultX: (defaultX: number) => IRightDividerBuilder;
    relativeY: (relativeY: number) => IRightDividerBuilder;
    defaultY: (defaultY: number) => IRightDividerBuilder;
    relativeX: (relativeX: number) => IRightDividerBuilder;
    fontFamily: (fontFamily: string) => IRightDividerBuilder;
    fontWeight: (fontWeight: NormalBold) => IRightDividerBuilder;
    fontStyle: (fontStyle: NormalItalic) => IRightDividerBuilder;
    fontSize: (fontSize: string) => IRightDividerBuilder;
    color: (color: string) => IRightDividerBuilder;
    halign: (halign: LeftCenterRight) => IRightDividerBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IRightDividerBuilder;
}
export declare function patchRightDivider(base: RightDivider, builder: (build: IRightDividerBuilder) => IRightDividerBuilder): IAny[];
export declare function buildRightDivider(builder: (build: IRightDividerBuilder) => IRightDividerBuilder): RightDivider;
export interface IStaffLayoutBuilder {
    build?: () => StaffLayout;
    patch: () => IAny[];
    staffDistance: (staffDistance: number) => IStaffLayoutBuilder;
    num: (num: number) => IStaffLayoutBuilder;
}
export declare function patchStaffLayout(base: StaffLayout, builder: (build: IStaffLayoutBuilder) => IStaffLayoutBuilder): IAny[];
export declare function buildStaffLayout(builder: (build: IStaffLayoutBuilder) => IStaffLayoutBuilder): StaffLayout;
export interface IMeasureLayoutBuilder {
    build?: () => MeasureLayout;
    patch: () => IAny[];
    measureDistance: (measureDistance: number) => IMeasureLayoutBuilder;
}
export declare function patchMeasureLayout(base: MeasureLayout, builder: (build: IMeasureLayoutBuilder) => IMeasureLayoutBuilder): IAny[];
export declare function buildMeasureLayout(builder: (build: IMeasureLayoutBuilder) => IMeasureLayoutBuilder): MeasureLayout;
export interface ILineWidthBuilder {
    build?: () => LineWidth;
    patch: () => IAny[];
    tenths: (tenths: number) => ILineWidthBuilder;
    type: (type: string) => ILineWidthBuilder;
}
export declare function patchLineWidth(base: LineWidth, builder: (build: ILineWidthBuilder) => ILineWidthBuilder): IAny[];
export declare function buildLineWidth(builder: (build: ILineWidthBuilder) => ILineWidthBuilder): LineWidth;
export interface INoteSizeBuilder {
    build?: () => NoteSize;
    patch: () => IAny[];
    size: (size: number) => INoteSizeBuilder;
    type: (type: CueGraceLarge) => INoteSizeBuilder;
}
export declare function patchNoteSize(base: NoteSize, builder: (build: INoteSizeBuilder) => INoteSizeBuilder): IAny[];
export declare function buildNoteSize(builder: (build: INoteSizeBuilder) => INoteSizeBuilder): NoteSize;
export interface IDistanceBuilder {
    build?: () => Distance;
    patch: () => IAny[];
    tenths: (tenths: number) => IDistanceBuilder;
    type: (type: string) => IDistanceBuilder;
}
export declare function patchDistance(base: Distance, builder: (build: IDistanceBuilder) => IDistanceBuilder): IAny[];
export declare function buildDistance(builder: (build: IDistanceBuilder) => IDistanceBuilder): Distance;
export interface IAppearanceBuilder {
    build?: () => Appearance;
    patch: () => IAny[];
    set: (key: string, val: NoteSize) => IAppearanceBuilder;
    otherAppearances: (otherAppearances: string[]) => IAppearanceBuilder;
}
export declare function patchAppearance(base: Appearance, builder: (build: IAppearanceBuilder) => IAppearanceBuilder): IAny[];
export declare function buildAppearance(builder: (build: IAppearanceBuilder) => IAppearanceBuilder): Appearance;
export interface ICreatorBuilder {
    build?: () => Creator;
    patch: () => IAny[];
    creator: (creator: string) => ICreatorBuilder;
    type: (type: string) => ICreatorBuilder;
}
export declare function patchCreator(base: Creator, builder: (build: ICreatorBuilder) => ICreatorBuilder): IAny[];
export declare function buildCreator(builder: (build: ICreatorBuilder) => ICreatorBuilder): Creator;
export interface IRightsBuilder {
    build?: () => Rights;
    patch: () => IAny[];
    type: (type: string) => IRightsBuilder;
    rights: (rights: string) => IRightsBuilder;
}
export declare function patchRights(base: Rights, builder: (build: IRightsBuilder) => IRightsBuilder): IAny[];
export declare function buildRights(builder: (build: IRightsBuilder) => IRightsBuilder): Rights;
export interface IEncoderBuilder {
    build?: () => Encoder;
    patch: () => IAny[];
    encoder: (encoder: string) => IEncoderBuilder;
    type: (type: string) => IEncoderBuilder;
}
export declare function patchEncoder(base: Encoder, builder: (build: IEncoderBuilder) => IEncoderBuilder): IAny[];
export declare function buildEncoder(builder: (build: IEncoderBuilder) => IEncoderBuilder): Encoder;
export interface IRelationBuilder {
    build?: () => Relation;
    patch: () => IAny[];
    type: (type: string) => IRelationBuilder;
    data: (data: string) => IRelationBuilder;
}
export declare function patchRelation(base: Relation, builder: (build: IRelationBuilder) => IRelationBuilder): IAny[];
export declare function buildRelation(builder: (build: IRelationBuilder) => IRelationBuilder): Relation;
export interface IMiscellaneousFieldBuilder {
    build?: () => MiscellaneousField;
    patch: () => IAny[];
    data: (data: string) => IMiscellaneousFieldBuilder;
    name: (name: string) => IMiscellaneousFieldBuilder;
}
export declare function patchMiscellaneousField(base: MiscellaneousField, builder: (build: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder): IAny[];
export declare function buildMiscellaneousField(builder: (build: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder): MiscellaneousField;
export interface IMiscellaneousBuilder {
    build?: () => Miscellaneous;
    patch: () => IAny[];
    miscellaneousFieldsAt: (idx: number, build: MiscellaneousField | ((builder: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder)) => IMiscellaneousBuilder;
    miscellaneousFieldsSplice: (start: number, deleteCount: number, ...items: MiscellaneousField[]) => IMiscellaneousBuilder;
    miscellaneousFields: (miscellaneousFields: MiscellaneousField[]) => IMiscellaneousBuilder;
}
export declare function patchMiscellaneous(base: Miscellaneous, builder: (build: IMiscellaneousBuilder) => IMiscellaneousBuilder): IAny[];
export declare function buildMiscellaneous(builder: (build: IMiscellaneousBuilder) => IMiscellaneousBuilder): Miscellaneous;
export interface IIdentificationBuilder {
    build?: () => Identification;
    patch: () => IAny[];
    miscellaneous: (build: Miscellaneous | ((builder: IMiscellaneousBuilder) => IMiscellaneousBuilder)) => IIdentificationBuilder;
    creatorsAt: (idx: number, build: Creator | ((builder: ICreatorBuilder) => ICreatorBuilder)) => IIdentificationBuilder;
    creatorsSplice: (start: number, deleteCount: number, ...items: Creator[]) => IIdentificationBuilder;
    creators: (creators: Creator[]) => IIdentificationBuilder;
    relationsAt: (idx: number, build: Relation | ((builder: IRelationBuilder) => IRelationBuilder)) => IIdentificationBuilder;
    relationsSplice: (start: number, deleteCount: number, ...items: Relation[]) => IIdentificationBuilder;
    relations: (relations: Relation[]) => IIdentificationBuilder;
    rightsAt: (idx: number, build: Rights | ((builder: IRightsBuilder) => IRightsBuilder)) => IIdentificationBuilder;
    rightsSplice: (start: number, deleteCount: number, ...items: Rights[]) => IIdentificationBuilder;
    rights: (rights: Rights[]) => IIdentificationBuilder;
    encoding: (build: Encoding | ((builder: IEncodingBuilder) => IEncodingBuilder)) => IIdentificationBuilder;
    source: (source: string) => IIdentificationBuilder;
}
export declare function patchIdentification(base: Identification, builder: (build: IIdentificationBuilder) => IIdentificationBuilder): IAny[];
export declare function buildIdentification(builder: (build: IIdentificationBuilder) => IIdentificationBuilder): Identification;
export interface ISupportsBuilder {
    build?: () => Supports;
    patch: () => IAny[];
    element: (element: string) => ISupportsBuilder;
    attribute: (attribute: string) => ISupportsBuilder;
    value: (value: string) => ISupportsBuilder;
    type: (type: boolean) => ISupportsBuilder;
}
export declare function patchSupports(base: Supports, builder: (build: ISupportsBuilder) => ISupportsBuilder): IAny[];
export declare function buildSupports(builder: (build: ISupportsBuilder) => ISupportsBuilder): Supports;
export interface IEncodingBuilder {
    build?: () => Encoding;
    patch: () => IAny[];
    encodingDescriptions: (encodingDescriptions: string[]) => IEncodingBuilder;
    encodingDate: (build: EncodingDate | ((builder: IEncodingDateBuilder) => IEncodingDateBuilder)) => IEncodingBuilder;
    set: (key: string, val: Supports) => IEncodingBuilder;
    encodersAt: (idx: number, build: Encoder | ((builder: IEncoderBuilder) => IEncoderBuilder)) => IEncodingBuilder;
    encodersSplice: (start: number, deleteCount: number, ...items: Encoder[]) => IEncodingBuilder;
    encoders: (encoders: Encoder[]) => IEncodingBuilder;
    softwares: (softwares: string[]) => IEncodingBuilder;
}
export declare function patchEncoding(base: Encoding, builder: (build: IEncodingBuilder) => IEncodingBuilder): IAny[];
export declare function buildEncoding(builder: (build: IEncodingBuilder) => IEncodingBuilder): Encoding;
export interface ITimeSeparatorBuilder {
    build?: () => TimeSeparator;
    patch: () => IAny[];
    separator: (separator: SeparatorType) => ITimeSeparatorBuilder;
}
export declare function patchTimeSeparator(base: TimeSeparator, builder: (build: ITimeSeparatorBuilder) => ITimeSeparatorBuilder): IAny[];
export declare function buildTimeSeparator(builder: (build: ITimeSeparatorBuilder) => ITimeSeparatorBuilder): TimeSeparator;
export interface ITimeSymbolBuilder {
    build?: () => TimeSymbol;
    patch: () => IAny[];
    symbol: (symbol: TimeSymbolType) => ITimeSymbolBuilder;
}
export declare function patchTimeSymbol(base: TimeSymbol, builder: (build: ITimeSymbolBuilder) => ITimeSymbolBuilder): IAny[];
export declare function buildTimeSymbol(builder: (build: ITimeSymbolBuilder) => ITimeSymbolBuilder): TimeSymbol;
export interface ICancelBuilder {
    build?: () => Cancel;
    patch: () => IAny[];
    fifths: (fifths: number) => ICancelBuilder;
    location: (location: CancelLocation) => ICancelBuilder;
}
export declare function patchCancel(base: Cancel, builder: (build: ICancelBuilder) => ICancelBuilder): IAny[];
export declare function buildCancel(builder: (build: ICancelBuilder) => ICancelBuilder): Cancel;
export interface IKeyOctaveBuilder {
    build?: () => KeyOctave;
    patch: () => IAny[];
    octave: (octave: number) => IKeyOctaveBuilder;
    number: (number: number) => IKeyOctaveBuilder;
    cancel: (cancel: boolean) => IKeyOctaveBuilder;
}
export declare function patchKeyOctave(base: KeyOctave, builder: (build: IKeyOctaveBuilder) => IKeyOctaveBuilder): IAny[];
export declare function buildKeyOctave(builder: (build: IKeyOctaveBuilder) => IKeyOctaveBuilder): KeyOctave;
export interface IKeyBuilder {
    build?: () => Key;
    patch: () => IAny[];
    cancel: (build: Cancel | ((builder: ICancelBuilder) => ICancelBuilder)) => IKeyBuilder;
    keySteps: (keySteps: string[]) => IKeyBuilder;
    keyOctavesAt: (idx: number, build: KeyOctave | ((builder: IKeyOctaveBuilder) => IKeyOctaveBuilder)) => IKeyBuilder;
    keyOctavesSplice: (start: number, deleteCount: number, ...items: KeyOctave[]) => IKeyBuilder;
    keyOctaves: (keyOctaves: KeyOctave[]) => IKeyBuilder;
    number: (number: number) => IKeyBuilder;
    fifths: (fifths: number) => IKeyBuilder;
    keyAlters: (keyAlters: string[]) => IKeyBuilder;
    keyAccidentals: (keyAccidentals: string[]) => IKeyBuilder;
    mode: (mode: string) => IKeyBuilder;
    defaultX: (defaultX: number) => IKeyBuilder;
    relativeY: (relativeY: number) => IKeyBuilder;
    defaultY: (defaultY: number) => IKeyBuilder;
    relativeX: (relativeX: number) => IKeyBuilder;
    fontFamily: (fontFamily: string) => IKeyBuilder;
    fontWeight: (fontWeight: NormalBold) => IKeyBuilder;
    fontStyle: (fontStyle: NormalItalic) => IKeyBuilder;
    fontSize: (fontSize: string) => IKeyBuilder;
    color: (color: string) => IKeyBuilder;
    printObject: (printObject: boolean) => IKeyBuilder;
}
export declare function patchKey(base: Key, builder: (build: IKeyBuilder) => IKeyBuilder): IAny[];
export declare function buildKey(builder: (build: IKeyBuilder) => IKeyBuilder): Key;
export interface ITimeBuilder {
    build?: () => Time;
    patch: () => IAny[];
    interchangeable: (build: Interchangeable | ((builder: IInterchangeableBuilder) => IInterchangeableBuilder)) => ITimeBuilder;
    beats: (beats: string[]) => ITimeBuilder;
    beatTypes: (beatTypes: number[]) => ITimeBuilder;
    senzaMisura: (senzaMisura: string) => ITimeBuilder;
    printObject: (printObject: boolean) => ITimeBuilder;
    defaultX: (defaultX: number) => ITimeBuilder;
    relativeY: (relativeY: number) => ITimeBuilder;
    defaultY: (defaultY: number) => ITimeBuilder;
    relativeX: (relativeX: number) => ITimeBuilder;
    fontFamily: (fontFamily: string) => ITimeBuilder;
    fontWeight: (fontWeight: NormalBold) => ITimeBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITimeBuilder;
    fontSize: (fontSize: string) => ITimeBuilder;
    color: (color: string) => ITimeBuilder;
    halign: (halign: LeftCenterRight) => ITimeBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ITimeBuilder;
    symbol: (symbol: TimeSymbolType) => ITimeBuilder;
    separator: (separator: SeparatorType) => ITimeBuilder;
}
export declare function patchTime(base: Time, builder: (build: ITimeBuilder) => ITimeBuilder): IAny[];
export declare function buildTime(builder: (build: ITimeBuilder) => ITimeBuilder): Time;
export interface IInterchangeableBuilder {
    build?: () => Interchangeable;
    patch: () => IAny[];
    beats: (beats: string[]) => IInterchangeableBuilder;
    beatTypes: (beatTypes: number[]) => IInterchangeableBuilder;
    timeRelation: (timeRelation: string) => IInterchangeableBuilder;
    symbol: (symbol: TimeSymbolType) => IInterchangeableBuilder;
    separator: (separator: SeparatorType) => IInterchangeableBuilder;
}
export declare function patchInterchangeable(base: Interchangeable, builder: (build: IInterchangeableBuilder) => IInterchangeableBuilder): IAny[];
export declare function buildInterchangeable(builder: (build: IInterchangeableBuilder) => IInterchangeableBuilder): Interchangeable;
export interface IPartSymbolBuilder {
    build?: () => PartSymbol;
    patch: () => IAny[];
    topStaff: (topStaff: number) => IPartSymbolBuilder;
    type: (type: PartSymbolType) => IPartSymbolBuilder;
    bottomStaff: (bottomStaff: number) => IPartSymbolBuilder;
    defaultX: (defaultX: number) => IPartSymbolBuilder;
    relativeY: (relativeY: number) => IPartSymbolBuilder;
    defaultY: (defaultY: number) => IPartSymbolBuilder;
    relativeX: (relativeX: number) => IPartSymbolBuilder;
    color: (color: string) => IPartSymbolBuilder;
}
export declare function patchPartSymbol(base: PartSymbol, builder: (build: IPartSymbolBuilder) => IPartSymbolBuilder): IAny[];
export declare function buildPartSymbol(builder: (build: IPartSymbolBuilder) => IPartSymbolBuilder): PartSymbol;
export interface IClefBuilder {
    build?: () => Clef;
    patch: () => IAny[];
    clefOctaveChange: (clefOctaveChange: string) => IClefBuilder;
    sign: (sign: string) => IClefBuilder;
    number: (number: number) => IClefBuilder;
    size: (size: SymbolSize) => IClefBuilder;
    line: (line: number) => IClefBuilder;
    afterBarline: (afterBarline: boolean) => IClefBuilder;
    additional: (additional: boolean) => IClefBuilder;
    defaultX: (defaultX: number) => IClefBuilder;
    relativeY: (relativeY: number) => IClefBuilder;
    defaultY: (defaultY: number) => IClefBuilder;
    relativeX: (relativeX: number) => IClefBuilder;
    fontFamily: (fontFamily: string) => IClefBuilder;
    fontWeight: (fontWeight: NormalBold) => IClefBuilder;
    fontStyle: (fontStyle: NormalItalic) => IClefBuilder;
    fontSize: (fontSize: string) => IClefBuilder;
    color: (color: string) => IClefBuilder;
    printObject: (printObject: boolean) => IClefBuilder;
}
export declare function patchClef(base: Clef, builder: (build: IClefBuilder) => IClefBuilder): IAny[];
export declare function buildClef(builder: (build: IClefBuilder) => IClefBuilder): Clef;
export interface IStaffTuningBuilder {
    build?: () => StaffTuning;
    patch: () => IAny[];
    tuningAlter: (tuningAlter: string) => IStaffTuningBuilder;
    line: (line: string) => IStaffTuningBuilder;
    tuningStep: (tuningStep: string) => IStaffTuningBuilder;
    tuningOctave: (tuningOctave: string) => IStaffTuningBuilder;
}
export declare function patchStaffTuning(base: StaffTuning, builder: (build: IStaffTuningBuilder) => IStaffTuningBuilder): IAny[];
export declare function buildStaffTuning(builder: (build: IStaffTuningBuilder) => IStaffTuningBuilder): StaffTuning;
export interface IStaffDetailsBuilder {
    build?: () => StaffDetails;
    patch: () => IAny[];
    staffLines: (staffLines: number) => IStaffDetailsBuilder;
    staffTuningsAt: (idx: number, build: StaffTuning | ((builder: IStaffTuningBuilder) => IStaffTuningBuilder)) => IStaffDetailsBuilder;
    staffTuningsSplice: (start: number, deleteCount: number, ...items: StaffTuning[]) => IStaffDetailsBuilder;
    staffTunings: (staffTunings: StaffTuning[]) => IStaffDetailsBuilder;
    staffSize: (staffSize: number) => IStaffDetailsBuilder;
    showFrets: (showFrets: ShowFretsType) => IStaffDetailsBuilder;
    capo: (capo: string) => IStaffDetailsBuilder;
    number: (number: number) => IStaffDetailsBuilder;
    staffType: (staffType: string) => IStaffDetailsBuilder;
    printObject: (printObject: boolean) => IStaffDetailsBuilder;
    printSpacing: (printSpacing: boolean) => IStaffDetailsBuilder;
}
export declare function patchStaffDetails(base: StaffDetails, builder: (build: IStaffDetailsBuilder) => IStaffDetailsBuilder): IAny[];
export declare function buildStaffDetails(builder: (build: IStaffDetailsBuilder) => IStaffDetailsBuilder): StaffDetails;
export interface IDoubleBuilder {
    build?: () => Double;
    patch: () => IAny[];
}
export declare function patchDouble(base: Double, builder: (build: IDoubleBuilder) => IDoubleBuilder): IAny[];
export declare function buildDouble(builder: (build: IDoubleBuilder) => IDoubleBuilder): Double;
export interface ITransposeBuilder {
    build?: () => Transpose;
    patch: () => IAny[];
    number: (number: number) => ITransposeBuilder;
    diatonic: (diatonic: string) => ITransposeBuilder;
    octaveChange: (octaveChange: string) => ITransposeBuilder;
    double: (build: Double | ((builder: IDoubleBuilder) => IDoubleBuilder)) => ITransposeBuilder;
    chromatic: (chromatic: string) => ITransposeBuilder;
}
export declare function patchTranspose(base: Transpose, builder: (build: ITransposeBuilder) => ITransposeBuilder): IAny[];
export declare function buildTranspose(builder: (build: ITransposeBuilder) => ITransposeBuilder): Transpose;
export interface IDirectiveBuilder {
    build?: () => Directive;
    patch: () => IAny[];
    data: (data: string) => IDirectiveBuilder;
    defaultX: (defaultX: number) => IDirectiveBuilder;
    relativeY: (relativeY: number) => IDirectiveBuilder;
    defaultY: (defaultY: number) => IDirectiveBuilder;
    relativeX: (relativeX: number) => IDirectiveBuilder;
    fontFamily: (fontFamily: string) => IDirectiveBuilder;
    fontWeight: (fontWeight: NormalBold) => IDirectiveBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDirectiveBuilder;
    fontSize: (fontSize: string) => IDirectiveBuilder;
    color: (color: string) => IDirectiveBuilder;
}
export declare function patchDirective(base: Directive, builder: (build: IDirectiveBuilder) => IDirectiveBuilder): IAny[];
export declare function buildDirective(builder: (build: IDirectiveBuilder) => IDirectiveBuilder): Directive;
export interface ISlashDotBuilder {
    build?: () => SlashDot;
    patch: () => IAny[];
}
export declare function patchSlashDot(base: SlashDot, builder: (build: ISlashDotBuilder) => ISlashDotBuilder): IAny[];
export declare function buildSlashDot(builder: (build: ISlashDotBuilder) => ISlashDotBuilder): SlashDot;
export interface IMultipleRestBuilder {
    build?: () => MultipleRest;
    patch: () => IAny[];
    useSymbols: (useSymbols: boolean) => IMultipleRestBuilder;
    count: (count: number) => IMultipleRestBuilder;
}
export declare function patchMultipleRest(base: MultipleRest, builder: (build: IMultipleRestBuilder) => IMultipleRestBuilder): IAny[];
export declare function buildMultipleRest(builder: (build: IMultipleRestBuilder) => IMultipleRestBuilder): MultipleRest;
export interface IMeasureRepeatBuilder {
    build?: () => MeasureRepeat;
    patch: () => IAny[];
    data: (data: string) => IMeasureRepeatBuilder;
    type: (type: StartStop) => IMeasureRepeatBuilder;
    slashes: (slashes: number) => IMeasureRepeatBuilder;
}
export declare function patchMeasureRepeat(base: MeasureRepeat, builder: (build: IMeasureRepeatBuilder) => IMeasureRepeatBuilder): IAny[];
export declare function buildMeasureRepeat(builder: (build: IMeasureRepeatBuilder) => IMeasureRepeatBuilder): MeasureRepeat;
export interface IBeatRepeatBuilder {
    build?: () => BeatRepeat;
    patch: () => IAny[];
    slashType: (slashType: string) => IBeatRepeatBuilder;
    useDots: (useDots: boolean) => IBeatRepeatBuilder;
    slashDotsAt: (idx: number, build: SlashDot | ((builder: ISlashDotBuilder) => ISlashDotBuilder)) => IBeatRepeatBuilder;
    slashDotsSplice: (start: number, deleteCount: number, ...items: SlashDot[]) => IBeatRepeatBuilder;
    slashDots: (slashDots: SlashDot[]) => IBeatRepeatBuilder;
    slases: (slases: number) => IBeatRepeatBuilder;
    type: (type: StartStop) => IBeatRepeatBuilder;
}
export declare function patchBeatRepeat(base: BeatRepeat, builder: (build: IBeatRepeatBuilder) => IBeatRepeatBuilder): IAny[];
export declare function buildBeatRepeat(builder: (build: IBeatRepeatBuilder) => IBeatRepeatBuilder): BeatRepeat;
export interface ISlashBuilder {
    build?: () => Slash;
    patch: () => IAny[];
    slashType: (slashType: string) => ISlashBuilder;
    useDots: (useDots: boolean) => ISlashBuilder;
    useStems: (useStems: boolean) => ISlashBuilder;
    slashDotsAt: (idx: number, build: SlashDot | ((builder: ISlashDotBuilder) => ISlashDotBuilder)) => ISlashBuilder;
    slashDotsSplice: (start: number, deleteCount: number, ...items: SlashDot[]) => ISlashBuilder;
    slashDots: (slashDots: SlashDot[]) => ISlashBuilder;
    type: (type: StartStop) => ISlashBuilder;
}
export declare function patchSlash(base: Slash, builder: (build: ISlashBuilder) => ISlashBuilder): IAny[];
export declare function buildSlash(builder: (build: ISlashBuilder) => ISlashBuilder): Slash;
export interface IMeasureStyleBuilder {
    build?: () => MeasureStyle;
    patch: () => IAny[];
    measureRepeat: (build: MeasureRepeat | ((builder: IMeasureRepeatBuilder) => IMeasureRepeatBuilder)) => IMeasureStyleBuilder;
    beatRepeat: (build: BeatRepeat | ((builder: IBeatRepeatBuilder) => IBeatRepeatBuilder)) => IMeasureStyleBuilder;
    multipleRest: (build: MultipleRest | ((builder: IMultipleRestBuilder) => IMultipleRestBuilder)) => IMeasureStyleBuilder;
    slash: (build: Slash | ((builder: ISlashBuilder) => ISlashBuilder)) => IMeasureStyleBuilder;
    number: (number: number) => IMeasureStyleBuilder;
    fontFamily: (fontFamily: string) => IMeasureStyleBuilder;
    fontWeight: (fontWeight: NormalBold) => IMeasureStyleBuilder;
    fontStyle: (fontStyle: NormalItalic) => IMeasureStyleBuilder;
    fontSize: (fontSize: string) => IMeasureStyleBuilder;
    color: (color: string) => IMeasureStyleBuilder;
}
export declare function patchMeasureStyle(base: MeasureStyle, builder: (build: IMeasureStyleBuilder) => IMeasureStyleBuilder): IAny[];
export declare function buildMeasureStyle(builder: (build: IMeasureStyleBuilder) => IMeasureStyleBuilder): MeasureStyle;
export interface IAttributesBuilder {
    build?: () => Attributes;
    patch: () => IAny[];
    divisions: (divisions: number) => IAttributesBuilder;
    partSymbol: (build: PartSymbol | ((builder: IPartSymbolBuilder) => IPartSymbolBuilder)) => IAttributesBuilder;
    clefsAt: (idx: number, build: Clef | ((builder: IClefBuilder) => IClefBuilder)) => IAttributesBuilder;
    clefsSplice: (start: number, deleteCount: number, ...items: Clef[]) => IAttributesBuilder;
    clefs: (clefs: Clef[]) => IAttributesBuilder;
    measureStylesAt: (idx: number, build: MeasureStyle | ((builder: IMeasureStyleBuilder) => IMeasureStyleBuilder)) => IAttributesBuilder;
    measureStylesSplice: (start: number, deleteCount: number, ...items: MeasureStyle[]) => IAttributesBuilder;
    measureStyles: (measureStyles: MeasureStyle[]) => IAttributesBuilder;
    timesAt: (idx: number, build: Time | ((builder: ITimeBuilder) => ITimeBuilder)) => IAttributesBuilder;
    timesSplice: (start: number, deleteCount: number, ...items: Time[]) => IAttributesBuilder;
    times: (times: Time[]) => IAttributesBuilder;
    staffDetailsAt: (idx: number, build: StaffDetails | ((builder: IStaffDetailsBuilder) => IStaffDetailsBuilder)) => IAttributesBuilder;
    staffDetailsSplice: (start: number, deleteCount: number, ...items: StaffDetails[]) => IAttributesBuilder;
    staffDetails: (staffDetails: StaffDetails[]) => IAttributesBuilder;
    transposesAt: (idx: number, build: Transpose | ((builder: ITransposeBuilder) => ITransposeBuilder)) => IAttributesBuilder;
    transposesSplice: (start: number, deleteCount: number, ...items: Transpose[]) => IAttributesBuilder;
    transposes: (transposes: Transpose[]) => IAttributesBuilder;
    staves: (staves: number) => IAttributesBuilder;
    instruments: (instruments: string) => IAttributesBuilder;
    keySignaturesAt: (idx: number, build: Key | ((builder: IKeyBuilder) => IKeyBuilder)) => IAttributesBuilder;
    keySignaturesSplice: (start: number, deleteCount: number, ...items: Key[]) => IAttributesBuilder;
    keySignatures: (keySignatures: Key[]) => IAttributesBuilder;
    directivesAt: (idx: number, build: Directive | ((builder: IDirectiveBuilder) => IDirectiveBuilder)) => IAttributesBuilder;
    directivesSplice: (start: number, deleteCount: number, ...items: Directive[]) => IAttributesBuilder;
    directives: (directives: Directive[]) => IAttributesBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IAttributesBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IAttributesBuilder;
}
export declare function patchAttributes(base: Attributes, builder: (build: IAttributesBuilder) => IAttributesBuilder): IAny[];
export declare function buildAttributes(builder: (build: IAttributesBuilder) => IAttributesBuilder): Attributes;
export interface ICueBuilder {
    build?: () => Cue;
    patch: () => IAny[];
}
export declare function patchCue(base: Cue, builder: (build: ICueBuilder) => ICueBuilder): IAny[];
export declare function buildCue(builder: (build: ICueBuilder) => ICueBuilder): Cue;
export interface IGraceBuilder {
    build?: () => Grace;
    patch: () => IAny[];
    makeTime: (makeTime: string) => IGraceBuilder;
    stealTimePrevious: (stealTimePrevious: string) => IGraceBuilder;
    slash: (slash: boolean) => IGraceBuilder;
    stealTimeFollowing: (stealTimeFollowing: string) => IGraceBuilder;
}
export declare function patchGrace(base: Grace, builder: (build: IGraceBuilder) => IGraceBuilder): IAny[];
export declare function buildGrace(builder: (build: IGraceBuilder) => IGraceBuilder): Grace;
export interface IChordBuilder {
    build?: () => Chord;
    patch: () => IAny[];
}
export declare function patchChord(base: Chord, builder: (build: IChordBuilder) => IChordBuilder): IAny[];
export declare function buildChord(builder: (build: IChordBuilder) => IChordBuilder): Chord;
export interface IUnpitchedBuilder {
    build?: () => Unpitched;
    patch: () => IAny[];
    displayStep: (displayStep: string) => IUnpitchedBuilder;
    displayOctave: (displayOctave: number) => IUnpitchedBuilder;
}
export declare function patchUnpitched(base: Unpitched, builder: (build: IUnpitchedBuilder) => IUnpitchedBuilder): IAny[];
export declare function buildUnpitched(builder: (build: IUnpitchedBuilder) => IUnpitchedBuilder): Unpitched;
export interface IPitchBuilder {
    build?: () => Pitch;
    patch: () => IAny[];
    alter: (alter: number) => IPitchBuilder;
    step: (step: string) => IPitchBuilder;
    octave: (octave: number) => IPitchBuilder;
}
export declare function patchPitch(base: Pitch, builder: (build: IPitchBuilder) => IPitchBuilder): IAny[];
export declare function buildPitch(builder: (build: IPitchBuilder) => IPitchBuilder): Pitch;
export interface IFullNoteBuilder {
    build?: () => FullNote;
    patch: () => IAny[];
    unpitched: (build: Unpitched | ((builder: IUnpitchedBuilder) => IUnpitchedBuilder)) => IFullNoteBuilder;
    chord: (build: Chord | ((builder: IChordBuilder) => IChordBuilder)) => IFullNoteBuilder;
    pitch: (build: Pitch | ((builder: IPitchBuilder) => IPitchBuilder)) => IFullNoteBuilder;
    rest: (build: Rest | ((builder: IRestBuilder) => IRestBuilder)) => IFullNoteBuilder;
}
export declare function patchFullNote(base: FullNote, builder: (build: IFullNoteBuilder) => IFullNoteBuilder): IAny[];
export declare function buildFullNote(builder: (build: IFullNoteBuilder) => IFullNoteBuilder): FullNote;
export interface IRestBuilder {
    build?: () => Rest;
    patch: () => IAny[];
    measure: (measure: boolean) => IRestBuilder;
    displayStep: (displayStep: string) => IRestBuilder;
    displayOctave: (displayOctave: number) => IRestBuilder;
}
export declare function patchRest(base: Rest, builder: (build: IRestBuilder) => IRestBuilder): IAny[];
export declare function buildRest(builder: (build: IRestBuilder) => IRestBuilder): Rest;
export interface ITieBuilder {
    build?: () => Tie;
    patch: () => IAny[];
    type: (type: StartStop) => ITieBuilder;
    timeOnly: (timeOnly: string) => ITieBuilder;
}
export declare function patchTie(base: Tie, builder: (build: ITieBuilder) => ITieBuilder): IAny[];
export declare function buildTie(builder: (build: ITieBuilder) => ITieBuilder): Tie;
export interface IInstrumentBuilder {
    build?: () => Instrument;
    patch: () => IAny[];
    id: (id: string) => IInstrumentBuilder;
}
export declare function patchInstrument(base: Instrument, builder: (build: IInstrumentBuilder) => IInstrumentBuilder): IAny[];
export declare function buildInstrument(builder: (build: IInstrumentBuilder) => IInstrumentBuilder): Instrument;
export interface INoteBuilder {
    build?: () => Note;
    patch: () => IAny[];
    noteheadText: (build: NoteheadText | ((builder: INoteheadTextBuilder) => INoteheadTextBuilder)) => INoteBuilder;
    timeModification: (build: TimeModification | ((builder: ITimeModificationBuilder) => ITimeModificationBuilder)) => INoteBuilder;
    accidental: (build: Accidental | ((builder: IAccidentalBuilder) => IAccidentalBuilder)) => INoteBuilder;
    instrument: (build: Instrument | ((builder: IInstrumentBuilder) => IInstrumentBuilder)) => INoteBuilder;
    attack: (attack: number) => INoteBuilder;
    endDynamics: (endDynamics: number) => INoteBuilder;
    lyricsAt: (idx: number, build: Lyric | ((builder: ILyricBuilder) => ILyricBuilder)) => INoteBuilder;
    lyricsSplice: (start: number, deleteCount: number, ...items: Lyric[]) => INoteBuilder;
    lyrics: (lyrics: Lyric[]) => INoteBuilder;
    dotsAt: (idx: number, build: Dot | ((builder: IDotBuilder) => IDotBuilder)) => INoteBuilder;
    dotsSplice: (start: number, deleteCount: number, ...items: Dot[]) => INoteBuilder;
    dots: (dots: Dot[]) => INoteBuilder;
    notationsAt: (idx: number, build: Notations | ((builder: INotationsBuilder) => INotationsBuilder)) => INoteBuilder;
    notationsSplice: (start: number, deleteCount: number, ...items: Notations[]) => INoteBuilder;
    notations: (notations: Notations[]) => INoteBuilder;
    stem: (build: Stem | ((builder: IStemBuilder) => IStemBuilder)) => INoteBuilder;
    noteType: (build: Type | ((builder: ITypeBuilder) => ITypeBuilder)) => INoteBuilder;
    pizzicato: (pizzicato: boolean) => INoteBuilder;
    cue: (build: Cue | ((builder: ICueBuilder) => ICueBuilder)) => INoteBuilder;
    duration: (duration: number) => INoteBuilder;
    tiesAt: (idx: number, build: Tie | ((builder: ITieBuilder) => ITieBuilder)) => INoteBuilder;
    tiesSplice: (start: number, deleteCount: number, ...items: Tie[]) => INoteBuilder;
    ties: (ties: Tie[]) => INoteBuilder;
    dynamics: (dynamics: number) => INoteBuilder;
    play: (build: Play | ((builder: IPlayBuilder) => IPlayBuilder)) => INoteBuilder;
    staff: (staff: number) => INoteBuilder;
    grace: (build: Grace | ((builder: IGraceBuilder) => IGraceBuilder)) => INoteBuilder;
    notehead: (build: Notehead | ((builder: INoteheadBuilder) => INoteheadBuilder)) => INoteBuilder;
    release: (release: number) => INoteBuilder;
    beamsAt: (idx: number, build: Beam | ((builder: IBeamBuilder) => IBeamBuilder)) => INoteBuilder;
    beamsSplice: (start: number, deleteCount: number, ...items: Beam[]) => INoteBuilder;
    beams: (beams: Beam[]) => INoteBuilder;
    defaultX: (defaultX: number) => INoteBuilder;
    relativeY: (relativeY: number) => INoteBuilder;
    defaultY: (defaultY: number) => INoteBuilder;
    relativeX: (relativeX: number) => INoteBuilder;
    fontFamily: (fontFamily: string) => INoteBuilder;
    fontWeight: (fontWeight: NormalBold) => INoteBuilder;
    fontStyle: (fontStyle: NormalItalic) => INoteBuilder;
    fontSize: (fontSize: string) => INoteBuilder;
    color: (color: string) => INoteBuilder;
    timeOnly: (timeOnly: string) => INoteBuilder;
    voice: (voice: number) => INoteBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => INoteBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => INoteBuilder;
    printDot: (printDot: boolean) => INoteBuilder;
    printLyric: (printLyric: boolean) => INoteBuilder;
    printObject: (printObject: boolean) => INoteBuilder;
    printSpacing: (printSpacing: boolean) => INoteBuilder;
    unpitched: (build: Unpitched | ((builder: IUnpitchedBuilder) => IUnpitchedBuilder)) => INoteBuilder;
    chord: (build: Chord | ((builder: IChordBuilder) => IChordBuilder)) => INoteBuilder;
    pitch: (build: Pitch | ((builder: IPitchBuilder) => IPitchBuilder)) => INoteBuilder;
    rest: (build: Rest | ((builder: IRestBuilder) => IRestBuilder)) => INoteBuilder;
}
export declare function patchNote(base: Note, builder: (build: INoteBuilder) => INoteBuilder): IAny[];
export declare function buildNote(builder: (build: INoteBuilder) => INoteBuilder): Note;
export interface ITypeBuilder {
    build?: () => Type;
    patch: () => IAny[];
    duration: (duration: Count) => ITypeBuilder;
    size: (size: SymbolSize) => ITypeBuilder;
}
export declare function patchType(base: Type, builder: (build: ITypeBuilder) => ITypeBuilder): IAny[];
export declare function buildType(builder: (build: ITypeBuilder) => ITypeBuilder): Type;
export interface IDotBuilder {
    build?: () => Dot;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDotBuilder;
    relativeY: (relativeY: number) => IDotBuilder;
    defaultY: (defaultY: number) => IDotBuilder;
    relativeX: (relativeX: number) => IDotBuilder;
    fontFamily: (fontFamily: string) => IDotBuilder;
    fontWeight: (fontWeight: NormalBold) => IDotBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDotBuilder;
    fontSize: (fontSize: string) => IDotBuilder;
    color: (color: string) => IDotBuilder;
    placement: (placement: AboveBelow) => IDotBuilder;
}
export declare function patchDot(base: Dot, builder: (build: IDotBuilder) => IDotBuilder): IAny[];
export declare function buildDot(builder: (build: IDotBuilder) => IDotBuilder): Dot;
export interface IAccidentalBuilder {
    build?: () => Accidental;
    patch: () => IAny[];
    cautionary: (cautionary: boolean) => IAccidentalBuilder;
    accidental: (accidental: MxmlAccidental) => IAccidentalBuilder;
    editorial: (editorial: boolean) => IAccidentalBuilder;
    defaultX: (defaultX: number) => IAccidentalBuilder;
    relativeY: (relativeY: number) => IAccidentalBuilder;
    defaultY: (defaultY: number) => IAccidentalBuilder;
    relativeX: (relativeX: number) => IAccidentalBuilder;
    fontFamily: (fontFamily: string) => IAccidentalBuilder;
    fontWeight: (fontWeight: NormalBold) => IAccidentalBuilder;
    fontStyle: (fontStyle: NormalItalic) => IAccidentalBuilder;
    fontSize: (fontSize: string) => IAccidentalBuilder;
    color: (color: string) => IAccidentalBuilder;
    bracket: (bracket: boolean) => IAccidentalBuilder;
    size: (size: SymbolSize) => IAccidentalBuilder;
    parentheses: (parentheses: boolean) => IAccidentalBuilder;
}
export declare function patchAccidental(base: Accidental, builder: (build: IAccidentalBuilder) => IAccidentalBuilder): IAny[];
export declare function buildAccidental(builder: (build: IAccidentalBuilder) => IAccidentalBuilder): Accidental;
export interface ITimeModificationBuilder {
    build?: () => TimeModification;
    patch: () => IAny[];
    actualNotes: (actualNotes: number) => ITimeModificationBuilder;
    normalType: (normalType: string) => ITimeModificationBuilder;
    normalNotes: (normalNotes: number) => ITimeModificationBuilder;
    normalDotsAt: (idx: number, build: NormalDot | ((builder: INormalDotBuilder) => INormalDotBuilder)) => ITimeModificationBuilder;
    normalDotsSplice: (start: number, deleteCount: number, ...items: NormalDot[]) => ITimeModificationBuilder;
    normalDots: (normalDots: NormalDot[]) => ITimeModificationBuilder;
}
export declare function patchTimeModification(base: TimeModification, builder: (build: ITimeModificationBuilder) => ITimeModificationBuilder): IAny[];
export declare function buildTimeModification(builder: (build: ITimeModificationBuilder) => ITimeModificationBuilder): TimeModification;
export interface IStemBuilder {
    build?: () => Stem;
    patch: () => IAny[];
    type: (type: StemType) => IStemBuilder;
    defaultX: (defaultX: number) => IStemBuilder;
    relativeY: (relativeY: number) => IStemBuilder;
    defaultY: (defaultY: number) => IStemBuilder;
    relativeX: (relativeX: number) => IStemBuilder;
    color: (color: string) => IStemBuilder;
}
export declare function patchStem(base: Stem, builder: (build: IStemBuilder) => IStemBuilder): IAny[];
export declare function buildStem(builder: (build: IStemBuilder) => IStemBuilder): Stem;
export interface INoteheadBuilder {
    build?: () => Notehead;
    patch: () => IAny[];
    type: (type: NoteheadType) => INoteheadBuilder;
    filled: (filled: boolean) => INoteheadBuilder;
    parentheses: (parentheses: boolean) => INoteheadBuilder;
    fontFamily: (fontFamily: string) => INoteheadBuilder;
    fontWeight: (fontWeight: NormalBold) => INoteheadBuilder;
    fontStyle: (fontStyle: NormalItalic) => INoteheadBuilder;
    fontSize: (fontSize: string) => INoteheadBuilder;
    color: (color: string) => INoteheadBuilder;
}
export declare function patchNotehead(base: Notehead, builder: (build: INoteheadBuilder) => INoteheadBuilder): IAny[];
export declare function buildNotehead(builder: (build: INoteheadBuilder) => INoteheadBuilder): Notehead;
export interface INoteheadTextBuilder {
    build?: () => NoteheadText;
    patch: () => IAny[];
    textAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => INoteheadTextBuilder;
    textSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => INoteheadTextBuilder;
    text: (text: TextSegment[]) => INoteheadTextBuilder;
}
export declare function patchNoteheadText(base: NoteheadText, builder: (build: INoteheadTextBuilder) => INoteheadTextBuilder): IAny[];
export declare function buildNoteheadText(builder: (build: INoteheadTextBuilder) => INoteheadTextBuilder): NoteheadText;
export interface IBeamBuilder {
    build?: () => Beam;
    patch: () => IAny[];
    repeater: (repeater: boolean) => IBeamBuilder;
    number: (number: number) => IBeamBuilder;
    type: (type: BeamType) => IBeamBuilder;
    fan: (fan: AccelRitNone) => IBeamBuilder;
}
export declare function patchBeam(base: Beam, builder: (build: IBeamBuilder) => IBeamBuilder): IAny[];
export declare function buildBeam(builder: (build: IBeamBuilder) => IBeamBuilder): Beam;
export interface INotationsBuilder {
    build?: () => Notations;
    patch: () => IAny[];
    slursAt: (idx: number, build: Slur | ((builder: ISlurBuilder) => ISlurBuilder)) => INotationsBuilder;
    slursSplice: (start: number, deleteCount: number, ...items: Slur[]) => INotationsBuilder;
    slurs: (slurs: Slur[]) => INotationsBuilder;
    articulationsAt: (idx: number, build: Articulations | ((builder: IArticulationsBuilder) => IArticulationsBuilder)) => INotationsBuilder;
    articulationsSplice: (start: number, deleteCount: number, ...items: Articulations[]) => INotationsBuilder;
    articulations: (articulations: Articulations[]) => INotationsBuilder;
    slidesAt: (idx: number, build: Slide | ((builder: ISlideBuilder) => ISlideBuilder)) => INotationsBuilder;
    slidesSplice: (start: number, deleteCount: number, ...items: Slide[]) => INotationsBuilder;
    slides: (slides: Slide[]) => INotationsBuilder;
    technicalsAt: (idx: number, build: Technical | ((builder: ITechnicalBuilder) => ITechnicalBuilder)) => INotationsBuilder;
    technicalsSplice: (start: number, deleteCount: number, ...items: Technical[]) => INotationsBuilder;
    technicals: (technicals: Technical[]) => INotationsBuilder;
    tiedsAt: (idx: number, build: Tied | ((builder: ITiedBuilder) => ITiedBuilder)) => INotationsBuilder;
    tiedsSplice: (start: number, deleteCount: number, ...items: Tied[]) => INotationsBuilder;
    tieds: (tieds: Tied[]) => INotationsBuilder;
    tupletsAt: (idx: number, build: Tuplet | ((builder: ITupletBuilder) => ITupletBuilder)) => INotationsBuilder;
    tupletsSplice: (start: number, deleteCount: number, ...items: Tuplet[]) => INotationsBuilder;
    tuplets: (tuplets: Tuplet[]) => INotationsBuilder;
    glissandosAt: (idx: number, build: Glissando | ((builder: IGlissandoBuilder) => IGlissandoBuilder)) => INotationsBuilder;
    glissandosSplice: (start: number, deleteCount: number, ...items: Glissando[]) => INotationsBuilder;
    glissandos: (glissandos: Glissando[]) => INotationsBuilder;
    dynamicsAt: (idx: number, build: Dynamics | ((builder: IDynamicsBuilder) => IDynamicsBuilder)) => INotationsBuilder;
    dynamicsSplice: (start: number, deleteCount: number, ...items: Dynamics[]) => INotationsBuilder;
    dynamics: (dynamics: Dynamics[]) => INotationsBuilder;
    fermatasAt: (idx: number, build: Fermata | ((builder: IFermataBuilder) => IFermataBuilder)) => INotationsBuilder;
    fermatasSplice: (start: number, deleteCount: number, ...items: Fermata[]) => INotationsBuilder;
    fermatas: (fermatas: Fermata[]) => INotationsBuilder;
    accidentalMarksAt: (idx: number, build: AccidentalMark | ((builder: IAccidentalMarkBuilder) => IAccidentalMarkBuilder)) => INotationsBuilder;
    accidentalMarksSplice: (start: number, deleteCount: number, ...items: AccidentalMark[]) => INotationsBuilder;
    accidentalMarks: (accidentalMarks: AccidentalMark[]) => INotationsBuilder;
    ornamentsAt: (idx: number, build: Ornaments | ((builder: IOrnamentsBuilder) => IOrnamentsBuilder)) => INotationsBuilder;
    ornamentsSplice: (start: number, deleteCount: number, ...items: Ornaments[]) => INotationsBuilder;
    ornaments: (ornaments: Ornaments[]) => INotationsBuilder;
    arpeggiatesAt: (idx: number, build: Arpeggiate | ((builder: IArpeggiateBuilder) => IArpeggiateBuilder)) => INotationsBuilder;
    arpeggiatesSplice: (start: number, deleteCount: number, ...items: Arpeggiate[]) => INotationsBuilder;
    arpeggiates: (arpeggiates: Arpeggiate[]) => INotationsBuilder;
    nonArpeggiatesAt: (idx: number, build: NonArpeggiate | ((builder: INonArpeggiateBuilder) => INonArpeggiateBuilder)) => INotationsBuilder;
    nonArpeggiatesSplice: (start: number, deleteCount: number, ...items: NonArpeggiate[]) => INotationsBuilder;
    nonArpeggiates: (nonArpeggiates: NonArpeggiate[]) => INotationsBuilder;
    otherNotationsAt: (idx: number, build: OtherNotation | ((builder: IOtherNotationBuilder) => IOtherNotationBuilder)) => INotationsBuilder;
    otherNotationsSplice: (start: number, deleteCount: number, ...items: OtherNotation[]) => INotationsBuilder;
    otherNotations: (otherNotations: OtherNotation[]) => INotationsBuilder;
    printObject: (printObject: boolean) => INotationsBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => INotationsBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => INotationsBuilder;
}
export declare function patchNotations(base: Notations, builder: (build: INotationsBuilder) => INotationsBuilder): IAny[];
export declare function buildNotations(builder: (build: INotationsBuilder) => INotationsBuilder): Notations;
export interface ITiedBuilder {
    build?: () => Tied;
    patch: () => IAny[];
    number: (number: number) => ITiedBuilder;
    type: (type: StartStopContinue) => ITiedBuilder;
    defaultX: (defaultX: number) => ITiedBuilder;
    relativeY: (relativeY: number) => ITiedBuilder;
    defaultY: (defaultY: number) => ITiedBuilder;
    relativeX: (relativeX: number) => ITiedBuilder;
    color: (color: string) => ITiedBuilder;
    placement: (placement: AboveBelow) => ITiedBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => ITiedBuilder;
    dashLength: (dashLength: number) => ITiedBuilder;
    spaceLength: (spaceLength: number) => ITiedBuilder;
    orientation: (orientation: OverUnder) => ITiedBuilder;
    bezierX2: (bezierX2: number) => ITiedBuilder;
    bezierOffset: (bezierOffset: number) => ITiedBuilder;
    bezierOffset2: (bezierOffset2: number) => ITiedBuilder;
    bezierX: (bezierX: number) => ITiedBuilder;
    bezierY: (bezierY: number) => ITiedBuilder;
    bezierY2: (bezierY2: number) => ITiedBuilder;
}
export declare function patchTied(base: Tied, builder: (build: ITiedBuilder) => ITiedBuilder): IAny[];
export declare function buildTied(builder: (build: ITiedBuilder) => ITiedBuilder): Tied;
export interface ISlurBuilder {
    build?: () => Slur;
    patch: () => IAny[];
    number: (number: number) => ISlurBuilder;
    type: (type: StartStopContinue) => ISlurBuilder;
    defaultX: (defaultX: number) => ISlurBuilder;
    relativeY: (relativeY: number) => ISlurBuilder;
    defaultY: (defaultY: number) => ISlurBuilder;
    relativeX: (relativeX: number) => ISlurBuilder;
    color: (color: string) => ISlurBuilder;
    placement: (placement: AboveBelow) => ISlurBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => ISlurBuilder;
    dashLength: (dashLength: number) => ISlurBuilder;
    spaceLength: (spaceLength: number) => ISlurBuilder;
    orientation: (orientation: OverUnder) => ISlurBuilder;
    bezierX2: (bezierX2: number) => ISlurBuilder;
    bezierOffset: (bezierOffset: number) => ISlurBuilder;
    bezierOffset2: (bezierOffset2: number) => ISlurBuilder;
    bezierX: (bezierX: number) => ISlurBuilder;
    bezierY: (bezierY: number) => ISlurBuilder;
    bezierY2: (bezierY2: number) => ISlurBuilder;
}
export declare function patchSlur(base: Slur, builder: (build: ISlurBuilder) => ISlurBuilder): IAny[];
export declare function buildSlur(builder: (build: ISlurBuilder) => ISlurBuilder): Slur;
export interface ITupletBuilder {
    build?: () => Tuplet;
    patch: () => IAny[];
    bracket: (bracket: boolean) => ITupletBuilder;
    number: (number: number) => ITupletBuilder;
    showNumber: (showNumber: ActualBothNone) => ITupletBuilder;
    tupletNormal: (build: TupletNormal | ((builder: ITupletNormalBuilder) => ITupletNormalBuilder)) => ITupletBuilder;
    type: (type: StartStop) => ITupletBuilder;
    showType: (showType: ActualBothNone) => ITupletBuilder;
    tupletActual: (build: TupletActual | ((builder: ITupletActualBuilder) => ITupletActualBuilder)) => ITupletBuilder;
    defaultX: (defaultX: number) => ITupletBuilder;
    relativeY: (relativeY: number) => ITupletBuilder;
    defaultY: (defaultY: number) => ITupletBuilder;
    relativeX: (relativeX: number) => ITupletBuilder;
    placement: (placement: AboveBelow) => ITupletBuilder;
    lineShape: (lineShape: StraightCurved) => ITupletBuilder;
}
export declare function patchTuplet(base: Tuplet, builder: (build: ITupletBuilder) => ITupletBuilder): IAny[];
export declare function buildTuplet(builder: (build: ITupletBuilder) => ITupletBuilder): Tuplet;
export interface ITupletActualBuilder {
    build?: () => TupletActual;
    patch: () => IAny[];
    tupletNumber: (build: TupletNumber | ((builder: ITupletNumberBuilder) => ITupletNumberBuilder)) => ITupletActualBuilder;
    tupletDotsAt: (idx: number, build: TupletDot | ((builder: ITupletDotBuilder) => ITupletDotBuilder)) => ITupletActualBuilder;
    tupletDotsSplice: (start: number, deleteCount: number, ...items: TupletDot[]) => ITupletActualBuilder;
    tupletDots: (tupletDots: TupletDot[]) => ITupletActualBuilder;
    tupletType: (build: TupletType | ((builder: ITupletTypeBuilder) => ITupletTypeBuilder)) => ITupletActualBuilder;
}
export declare function patchTupletActual(base: TupletActual, builder: (build: ITupletActualBuilder) => ITupletActualBuilder): IAny[];
export declare function buildTupletActual(builder: (build: ITupletActualBuilder) => ITupletActualBuilder): TupletActual;
export interface ITupletNormalBuilder {
    build?: () => TupletNormal;
    patch: () => IAny[];
    tupletNumber: (build: TupletNumber | ((builder: ITupletNumberBuilder) => ITupletNumberBuilder)) => ITupletNormalBuilder;
    tupletDotsAt: (idx: number, build: TupletDot | ((builder: ITupletDotBuilder) => ITupletDotBuilder)) => ITupletNormalBuilder;
    tupletDotsSplice: (start: number, deleteCount: number, ...items: TupletDot[]) => ITupletNormalBuilder;
    tupletDots: (tupletDots: TupletDot[]) => ITupletNormalBuilder;
    tupletType: (build: TupletType | ((builder: ITupletTypeBuilder) => ITupletTypeBuilder)) => ITupletNormalBuilder;
}
export declare function patchTupletNormal(base: TupletNormal, builder: (build: ITupletNormalBuilder) => ITupletNormalBuilder): IAny[];
export declare function buildTupletNormal(builder: (build: ITupletNormalBuilder) => ITupletNormalBuilder): TupletNormal;
export interface ITupletNumberBuilder {
    build?: () => TupletNumber;
    patch: () => IAny[];
    text: (text: string) => ITupletNumberBuilder;
    fontFamily: (fontFamily: string) => ITupletNumberBuilder;
    fontWeight: (fontWeight: NormalBold) => ITupletNumberBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITupletNumberBuilder;
    fontSize: (fontSize: string) => ITupletNumberBuilder;
    color: (color: string) => ITupletNumberBuilder;
}
export declare function patchTupletNumber(base: TupletNumber, builder: (build: ITupletNumberBuilder) => ITupletNumberBuilder): IAny[];
export declare function buildTupletNumber(builder: (build: ITupletNumberBuilder) => ITupletNumberBuilder): TupletNumber;
export interface ITupletTypeBuilder {
    build?: () => TupletType;
    patch: () => IAny[];
    text: (text: string) => ITupletTypeBuilder;
    fontFamily: (fontFamily: string) => ITupletTypeBuilder;
    fontWeight: (fontWeight: NormalBold) => ITupletTypeBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITupletTypeBuilder;
    fontSize: (fontSize: string) => ITupletTypeBuilder;
    color: (color: string) => ITupletTypeBuilder;
}
export declare function patchTupletType(base: TupletType, builder: (build: ITupletTypeBuilder) => ITupletTypeBuilder): IAny[];
export declare function buildTupletType(builder: (build: ITupletTypeBuilder) => ITupletTypeBuilder): TupletType;
export interface ITupletDotBuilder {
    build?: () => TupletDot;
    patch: () => IAny[];
    fontFamily: (fontFamily: string) => ITupletDotBuilder;
    fontWeight: (fontWeight: NormalBold) => ITupletDotBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITupletDotBuilder;
    fontSize: (fontSize: string) => ITupletDotBuilder;
    color: (color: string) => ITupletDotBuilder;
}
export declare function patchTupletDot(base: TupletDot, builder: (build: ITupletDotBuilder) => ITupletDotBuilder): IAny[];
export declare function buildTupletDot(builder: (build: ITupletDotBuilder) => ITupletDotBuilder): TupletDot;
export interface IGlissandoBuilder {
    build?: () => Glissando;
    patch: () => IAny[];
    text: (text: string) => IGlissandoBuilder;
    type: (type: StartStop) => IGlissandoBuilder;
    normal: (normal: number) => IGlissandoBuilder;
    defaultX: (defaultX: number) => IGlissandoBuilder;
    relativeY: (relativeY: number) => IGlissandoBuilder;
    defaultY: (defaultY: number) => IGlissandoBuilder;
    relativeX: (relativeX: number) => IGlissandoBuilder;
    fontFamily: (fontFamily: string) => IGlissandoBuilder;
    fontWeight: (fontWeight: NormalBold) => IGlissandoBuilder;
    fontStyle: (fontStyle: NormalItalic) => IGlissandoBuilder;
    fontSize: (fontSize: string) => IGlissandoBuilder;
    color: (color: string) => IGlissandoBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IGlissandoBuilder;
    dashLength: (dashLength: number) => IGlissandoBuilder;
    spaceLength: (spaceLength: number) => IGlissandoBuilder;
}
export declare function patchGlissando(base: Glissando, builder: (build: IGlissandoBuilder) => IGlissandoBuilder): IAny[];
export declare function buildGlissando(builder: (build: IGlissandoBuilder) => IGlissandoBuilder): Glissando;
export interface ISlideBuilder {
    build?: () => Slide;
    patch: () => IAny[];
    text: (text: string) => ISlideBuilder;
    type: (type: StartStop) => ISlideBuilder;
    normal: (normal: number) => ISlideBuilder;
    defaultX: (defaultX: number) => ISlideBuilder;
    relativeY: (relativeY: number) => ISlideBuilder;
    defaultY: (defaultY: number) => ISlideBuilder;
    relativeX: (relativeX: number) => ISlideBuilder;
    fontFamily: (fontFamily: string) => ISlideBuilder;
    fontWeight: (fontWeight: NormalBold) => ISlideBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISlideBuilder;
    fontSize: (fontSize: string) => ISlideBuilder;
    color: (color: string) => ISlideBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => ISlideBuilder;
    dashLength: (dashLength: number) => ISlideBuilder;
    spaceLength: (spaceLength: number) => ISlideBuilder;
    accelerate: (accelerate: boolean) => ISlideBuilder;
    beats: (beats: number) => ISlideBuilder;
    firstBeat: (firstBeat: number) => ISlideBuilder;
    lastBeat: (lastBeat: number) => ISlideBuilder;
}
export declare function patchSlide(base: Slide, builder: (build: ISlideBuilder) => ISlideBuilder): IAny[];
export declare function buildSlide(builder: (build: ISlideBuilder) => ISlideBuilder): Slide;
export interface IOtherNotationBuilder {
    build?: () => OtherNotation;
    patch: () => IAny[];
    type: (type: StartStopSingle) => IOtherNotationBuilder;
    data: (data: string) => IOtherNotationBuilder;
    defaultX: (defaultX: number) => IOtherNotationBuilder;
    relativeY: (relativeY: number) => IOtherNotationBuilder;
    defaultY: (defaultY: number) => IOtherNotationBuilder;
    relativeX: (relativeX: number) => IOtherNotationBuilder;
    fontFamily: (fontFamily: string) => IOtherNotationBuilder;
    fontWeight: (fontWeight: NormalBold) => IOtherNotationBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOtherNotationBuilder;
    fontSize: (fontSize: string) => IOtherNotationBuilder;
    color: (color: string) => IOtherNotationBuilder;
    printObject: (printObject: boolean) => IOtherNotationBuilder;
    placement: (placement: AboveBelow) => IOtherNotationBuilder;
}
export declare function patchOtherNotation(base: OtherNotation, builder: (build: IOtherNotationBuilder) => IOtherNotationBuilder): IAny[];
export declare function buildOtherNotation(builder: (build: IOtherNotationBuilder) => IOtherNotationBuilder): OtherNotation;
export interface IOtherDirectionBuilder {
    build?: () => OtherDirection;
    patch: () => IAny[];
    data: (data: string) => IOtherDirectionBuilder;
    printObject: (printObject: boolean) => IOtherDirectionBuilder;
    defaultX: (defaultX: number) => IOtherDirectionBuilder;
    relativeY: (relativeY: number) => IOtherDirectionBuilder;
    defaultY: (defaultY: number) => IOtherDirectionBuilder;
    relativeX: (relativeX: number) => IOtherDirectionBuilder;
    fontFamily: (fontFamily: string) => IOtherDirectionBuilder;
    fontWeight: (fontWeight: NormalBold) => IOtherDirectionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOtherDirectionBuilder;
    fontSize: (fontSize: string) => IOtherDirectionBuilder;
    color: (color: string) => IOtherDirectionBuilder;
    halign: (halign: LeftCenterRight) => IOtherDirectionBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IOtherDirectionBuilder;
}
export declare function patchOtherDirection(base: OtherDirection, builder: (build: IOtherDirectionBuilder) => IOtherDirectionBuilder): IAny[];
export declare function buildOtherDirection(builder: (build: IOtherDirectionBuilder) => IOtherDirectionBuilder): OtherDirection;
export interface IOrnamentsBuilder {
    build?: () => Ornaments;
    patch: () => IAny[];
    delayedInvertedTurn: (build: DelayedInvertedTurn | ((builder: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder)) => IOrnamentsBuilder;
    shake: (build: Shake | ((builder: IShakeBuilder) => IShakeBuilder)) => IOrnamentsBuilder;
    turn: (build: Turn | ((builder: ITurnBuilder) => ITurnBuilder)) => IOrnamentsBuilder;
    invertedTurn: (build: InvertedTurn | ((builder: IInvertedTurnBuilder) => IInvertedTurnBuilder)) => IOrnamentsBuilder;
    otherOrnament: (build: OtherOrnament | ((builder: IOtherOrnamentBuilder) => IOtherOrnamentBuilder)) => IOrnamentsBuilder;
    delayedTurn: (build: DelayedTurn | ((builder: IDelayedTurnBuilder) => IDelayedTurnBuilder)) => IOrnamentsBuilder;
    verticalTurn: (build: VerticalTurn | ((builder: IVerticalTurnBuilder) => IVerticalTurnBuilder)) => IOrnamentsBuilder;
    wavyLine: (build: WavyLine | ((builder: IWavyLineBuilder) => IWavyLineBuilder)) => IOrnamentsBuilder;
    tremolo: (build: Tremolo | ((builder: ITremoloBuilder) => ITremoloBuilder)) => IOrnamentsBuilder;
    accidentalMarksAt: (idx: number, build: AccidentalMark | ((builder: IAccidentalMarkBuilder) => IAccidentalMarkBuilder)) => IOrnamentsBuilder;
    accidentalMarksSplice: (start: number, deleteCount: number, ...items: AccidentalMark[]) => IOrnamentsBuilder;
    accidentalMarks: (accidentalMarks: AccidentalMark[]) => IOrnamentsBuilder;
    trillMark: (build: TrillMark | ((builder: ITrillMarkBuilder) => ITrillMarkBuilder)) => IOrnamentsBuilder;
    mordent: (build: Mordent | ((builder: IMordentBuilder) => IMordentBuilder)) => IOrnamentsBuilder;
    invertedMordent: (build: InvertedMordent | ((builder: IInvertedMordentBuilder) => IInvertedMordentBuilder)) => IOrnamentsBuilder;
    schleifer: (build: Schleifer | ((builder: ISchleiferBuilder) => ISchleiferBuilder)) => IOrnamentsBuilder;
    defaultX: (defaultX: number) => IOrnamentsBuilder;
    relativeY: (relativeY: number) => IOrnamentsBuilder;
    defaultY: (defaultY: number) => IOrnamentsBuilder;
    relativeX: (relativeX: number) => IOrnamentsBuilder;
    fontFamily: (fontFamily: string) => IOrnamentsBuilder;
    fontWeight: (fontWeight: NormalBold) => IOrnamentsBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOrnamentsBuilder;
    fontSize: (fontSize: string) => IOrnamentsBuilder;
    color: (color: string) => IOrnamentsBuilder;
    placement: (placement: AboveBelow) => IOrnamentsBuilder;
    startNote: (startNote: UpperMainBelow) => IOrnamentsBuilder;
    accelerate: (accelerate: boolean) => IOrnamentsBuilder;
    beats: (beats: number) => IOrnamentsBuilder;
    lastBeat: (lastBeat: number) => IOrnamentsBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IOrnamentsBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IOrnamentsBuilder;
    secondBeat: (secondBeat: number) => IOrnamentsBuilder;
}
export declare function patchOrnaments(base: Ornaments, builder: (build: IOrnamentsBuilder) => IOrnamentsBuilder): IAny[];
export declare function buildOrnaments(builder: (build: IOrnamentsBuilder) => IOrnamentsBuilder): Ornaments;
export interface ITrillMarkBuilder {
    build?: () => TrillMark;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ITrillMarkBuilder;
    relativeY: (relativeY: number) => ITrillMarkBuilder;
    defaultY: (defaultY: number) => ITrillMarkBuilder;
    relativeX: (relativeX: number) => ITrillMarkBuilder;
    fontFamily: (fontFamily: string) => ITrillMarkBuilder;
    fontWeight: (fontWeight: NormalBold) => ITrillMarkBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITrillMarkBuilder;
    fontSize: (fontSize: string) => ITrillMarkBuilder;
    color: (color: string) => ITrillMarkBuilder;
    placement: (placement: AboveBelow) => ITrillMarkBuilder;
    startNote: (startNote: UpperMainBelow) => ITrillMarkBuilder;
    accelerate: (accelerate: boolean) => ITrillMarkBuilder;
    beats: (beats: number) => ITrillMarkBuilder;
    lastBeat: (lastBeat: number) => ITrillMarkBuilder;
    trillStep: (trillStep: WholeHalfUnison) => ITrillMarkBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => ITrillMarkBuilder;
    secondBeat: (secondBeat: number) => ITrillMarkBuilder;
}
export declare function patchTrillMark(base: TrillMark, builder: (build: ITrillMarkBuilder) => ITrillMarkBuilder): IAny[];
export declare function buildTrillMark(builder: (build: ITrillMarkBuilder) => ITrillMarkBuilder): TrillMark;
export interface ITurnBuilder {
    build?: () => Turn;
    patch: () => IAny[];
    slash: (slash: boolean) => ITurnBuilder;
    defaultX: (defaultX: number) => ITurnBuilder;
    relativeY: (relativeY: number) => ITurnBuilder;
    defaultY: (defaultY: number) => ITurnBuilder;
    relativeX: (relativeX: number) => ITurnBuilder;
    fontFamily: (fontFamily: string) => ITurnBuilder;
    fontWeight: (fontWeight: NormalBold) => ITurnBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITurnBuilder;
    fontSize: (fontSize: string) => ITurnBuilder;
    color: (color: string) => ITurnBuilder;
    placement: (placement: AboveBelow) => ITurnBuilder;
    startNote: (startNote: UpperMainBelow) => ITurnBuilder;
    accelerate: (accelerate: boolean) => ITurnBuilder;
    beats: (beats: number) => ITurnBuilder;
    lastBeat: (lastBeat: number) => ITurnBuilder;
    trillStep: (trillStep: WholeHalfUnison) => ITurnBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => ITurnBuilder;
    secondBeat: (secondBeat: number) => ITurnBuilder;
}
export declare function patchTurn(base: Turn, builder: (build: ITurnBuilder) => ITurnBuilder): IAny[];
export declare function buildTurn(builder: (build: ITurnBuilder) => ITurnBuilder): Turn;
export interface IDelayedTurnBuilder {
    build?: () => DelayedTurn;
    patch: () => IAny[];
    slash: (slash: boolean) => IDelayedTurnBuilder;
    defaultX: (defaultX: number) => IDelayedTurnBuilder;
    relativeY: (relativeY: number) => IDelayedTurnBuilder;
    defaultY: (defaultY: number) => IDelayedTurnBuilder;
    relativeX: (relativeX: number) => IDelayedTurnBuilder;
    fontFamily: (fontFamily: string) => IDelayedTurnBuilder;
    fontWeight: (fontWeight: NormalBold) => IDelayedTurnBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDelayedTurnBuilder;
    fontSize: (fontSize: string) => IDelayedTurnBuilder;
    color: (color: string) => IDelayedTurnBuilder;
    placement: (placement: AboveBelow) => IDelayedTurnBuilder;
    startNote: (startNote: UpperMainBelow) => IDelayedTurnBuilder;
    accelerate: (accelerate: boolean) => IDelayedTurnBuilder;
    beats: (beats: number) => IDelayedTurnBuilder;
    lastBeat: (lastBeat: number) => IDelayedTurnBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IDelayedTurnBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IDelayedTurnBuilder;
    secondBeat: (secondBeat: number) => IDelayedTurnBuilder;
}
export declare function patchDelayedTurn(base: DelayedTurn, builder: (build: IDelayedTurnBuilder) => IDelayedTurnBuilder): IAny[];
export declare function buildDelayedTurn(builder: (build: IDelayedTurnBuilder) => IDelayedTurnBuilder): DelayedTurn;
export interface IInvertedTurnBuilder {
    build?: () => InvertedTurn;
    patch: () => IAny[];
    slash: (slash: boolean) => IInvertedTurnBuilder;
    defaultX: (defaultX: number) => IInvertedTurnBuilder;
    relativeY: (relativeY: number) => IInvertedTurnBuilder;
    defaultY: (defaultY: number) => IInvertedTurnBuilder;
    relativeX: (relativeX: number) => IInvertedTurnBuilder;
    fontFamily: (fontFamily: string) => IInvertedTurnBuilder;
    fontWeight: (fontWeight: NormalBold) => IInvertedTurnBuilder;
    fontStyle: (fontStyle: NormalItalic) => IInvertedTurnBuilder;
    fontSize: (fontSize: string) => IInvertedTurnBuilder;
    color: (color: string) => IInvertedTurnBuilder;
    placement: (placement: AboveBelow) => IInvertedTurnBuilder;
    startNote: (startNote: UpperMainBelow) => IInvertedTurnBuilder;
    accelerate: (accelerate: boolean) => IInvertedTurnBuilder;
    beats: (beats: number) => IInvertedTurnBuilder;
    lastBeat: (lastBeat: number) => IInvertedTurnBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IInvertedTurnBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IInvertedTurnBuilder;
    secondBeat: (secondBeat: number) => IInvertedTurnBuilder;
}
export declare function patchInvertedTurn(base: InvertedTurn, builder: (build: IInvertedTurnBuilder) => IInvertedTurnBuilder): IAny[];
export declare function buildInvertedTurn(builder: (build: IInvertedTurnBuilder) => IInvertedTurnBuilder): InvertedTurn;
export interface IDelayedInvertedTurnBuilder {
    build?: () => DelayedInvertedTurn;
    patch: () => IAny[];
    slash: (slash: boolean) => IDelayedInvertedTurnBuilder;
    defaultX: (defaultX: number) => IDelayedInvertedTurnBuilder;
    relativeY: (relativeY: number) => IDelayedInvertedTurnBuilder;
    defaultY: (defaultY: number) => IDelayedInvertedTurnBuilder;
    relativeX: (relativeX: number) => IDelayedInvertedTurnBuilder;
    fontFamily: (fontFamily: string) => IDelayedInvertedTurnBuilder;
    fontWeight: (fontWeight: NormalBold) => IDelayedInvertedTurnBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDelayedInvertedTurnBuilder;
    fontSize: (fontSize: string) => IDelayedInvertedTurnBuilder;
    color: (color: string) => IDelayedInvertedTurnBuilder;
    placement: (placement: AboveBelow) => IDelayedInvertedTurnBuilder;
    startNote: (startNote: UpperMainBelow) => IDelayedInvertedTurnBuilder;
    accelerate: (accelerate: boolean) => IDelayedInvertedTurnBuilder;
    beats: (beats: number) => IDelayedInvertedTurnBuilder;
    lastBeat: (lastBeat: number) => IDelayedInvertedTurnBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IDelayedInvertedTurnBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IDelayedInvertedTurnBuilder;
    secondBeat: (secondBeat: number) => IDelayedInvertedTurnBuilder;
}
export declare function patchDelayedInvertedTurn(base: DelayedInvertedTurn, builder: (build: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder): IAny[];
export declare function buildDelayedInvertedTurn(builder: (build: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder): DelayedInvertedTurn;
export interface IVerticalTurnBuilder {
    build?: () => VerticalTurn;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IVerticalTurnBuilder;
    relativeY: (relativeY: number) => IVerticalTurnBuilder;
    defaultY: (defaultY: number) => IVerticalTurnBuilder;
    relativeX: (relativeX: number) => IVerticalTurnBuilder;
    fontFamily: (fontFamily: string) => IVerticalTurnBuilder;
    fontWeight: (fontWeight: NormalBold) => IVerticalTurnBuilder;
    fontStyle: (fontStyle: NormalItalic) => IVerticalTurnBuilder;
    fontSize: (fontSize: string) => IVerticalTurnBuilder;
    color: (color: string) => IVerticalTurnBuilder;
    placement: (placement: AboveBelow) => IVerticalTurnBuilder;
    startNote: (startNote: UpperMainBelow) => IVerticalTurnBuilder;
    accelerate: (accelerate: boolean) => IVerticalTurnBuilder;
    beats: (beats: number) => IVerticalTurnBuilder;
    lastBeat: (lastBeat: number) => IVerticalTurnBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IVerticalTurnBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IVerticalTurnBuilder;
    secondBeat: (secondBeat: number) => IVerticalTurnBuilder;
}
export declare function patchVerticalTurn(base: VerticalTurn, builder: (build: IVerticalTurnBuilder) => IVerticalTurnBuilder): IAny[];
export declare function buildVerticalTurn(builder: (build: IVerticalTurnBuilder) => IVerticalTurnBuilder): VerticalTurn;
export interface IShakeBuilder {
    build?: () => Shake;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IShakeBuilder;
    relativeY: (relativeY: number) => IShakeBuilder;
    defaultY: (defaultY: number) => IShakeBuilder;
    relativeX: (relativeX: number) => IShakeBuilder;
    fontFamily: (fontFamily: string) => IShakeBuilder;
    fontWeight: (fontWeight: NormalBold) => IShakeBuilder;
    fontStyle: (fontStyle: NormalItalic) => IShakeBuilder;
    fontSize: (fontSize: string) => IShakeBuilder;
    color: (color: string) => IShakeBuilder;
    placement: (placement: AboveBelow) => IShakeBuilder;
    startNote: (startNote: UpperMainBelow) => IShakeBuilder;
    accelerate: (accelerate: boolean) => IShakeBuilder;
    beats: (beats: number) => IShakeBuilder;
    lastBeat: (lastBeat: number) => IShakeBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IShakeBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IShakeBuilder;
    secondBeat: (secondBeat: number) => IShakeBuilder;
}
export declare function patchShake(base: Shake, builder: (build: IShakeBuilder) => IShakeBuilder): IAny[];
export declare function buildShake(builder: (build: IShakeBuilder) => IShakeBuilder): Shake;
export interface IMordentBuilder {
    build?: () => Mordent;
    patch: () => IAny[];
    long: (long: boolean) => IMordentBuilder;
    approach: (approach: AboveBelow) => IMordentBuilder;
    departure: (departure: AboveBelow) => IMordentBuilder;
    defaultX: (defaultX: number) => IMordentBuilder;
    relativeY: (relativeY: number) => IMordentBuilder;
    defaultY: (defaultY: number) => IMordentBuilder;
    relativeX: (relativeX: number) => IMordentBuilder;
    fontFamily: (fontFamily: string) => IMordentBuilder;
    fontWeight: (fontWeight: NormalBold) => IMordentBuilder;
    fontStyle: (fontStyle: NormalItalic) => IMordentBuilder;
    fontSize: (fontSize: string) => IMordentBuilder;
    color: (color: string) => IMordentBuilder;
    placement: (placement: AboveBelow) => IMordentBuilder;
    startNote: (startNote: UpperMainBelow) => IMordentBuilder;
    accelerate: (accelerate: boolean) => IMordentBuilder;
    beats: (beats: number) => IMordentBuilder;
    lastBeat: (lastBeat: number) => IMordentBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IMordentBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IMordentBuilder;
    secondBeat: (secondBeat: number) => IMordentBuilder;
}
export declare function patchMordent(base: Mordent, builder: (build: IMordentBuilder) => IMordentBuilder): IAny[];
export declare function buildMordent(builder: (build: IMordentBuilder) => IMordentBuilder): Mordent;
export interface IInvertedMordentBuilder {
    build?: () => InvertedMordent;
    patch: () => IAny[];
    long: (long: boolean) => IInvertedMordentBuilder;
    approach: (approach: AboveBelow) => IInvertedMordentBuilder;
    departure: (departure: AboveBelow) => IInvertedMordentBuilder;
    defaultX: (defaultX: number) => IInvertedMordentBuilder;
    relativeY: (relativeY: number) => IInvertedMordentBuilder;
    defaultY: (defaultY: number) => IInvertedMordentBuilder;
    relativeX: (relativeX: number) => IInvertedMordentBuilder;
    fontFamily: (fontFamily: string) => IInvertedMordentBuilder;
    fontWeight: (fontWeight: NormalBold) => IInvertedMordentBuilder;
    fontStyle: (fontStyle: NormalItalic) => IInvertedMordentBuilder;
    fontSize: (fontSize: string) => IInvertedMordentBuilder;
    color: (color: string) => IInvertedMordentBuilder;
    placement: (placement: AboveBelow) => IInvertedMordentBuilder;
    startNote: (startNote: UpperMainBelow) => IInvertedMordentBuilder;
    accelerate: (accelerate: boolean) => IInvertedMordentBuilder;
    beats: (beats: number) => IInvertedMordentBuilder;
    lastBeat: (lastBeat: number) => IInvertedMordentBuilder;
    trillStep: (trillStep: WholeHalfUnison) => IInvertedMordentBuilder;
    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => IInvertedMordentBuilder;
    secondBeat: (secondBeat: number) => IInvertedMordentBuilder;
}
export declare function patchInvertedMordent(base: InvertedMordent, builder: (build: IInvertedMordentBuilder) => IInvertedMordentBuilder): IAny[];
export declare function buildInvertedMordent(builder: (build: IInvertedMordentBuilder) => IInvertedMordentBuilder): InvertedMordent;
export interface ISchleiferBuilder {
    build?: () => Schleifer;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ISchleiferBuilder;
    relativeY: (relativeY: number) => ISchleiferBuilder;
    defaultY: (defaultY: number) => ISchleiferBuilder;
    relativeX: (relativeX: number) => ISchleiferBuilder;
    fontFamily: (fontFamily: string) => ISchleiferBuilder;
    fontWeight: (fontWeight: NormalBold) => ISchleiferBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISchleiferBuilder;
    fontSize: (fontSize: string) => ISchleiferBuilder;
    color: (color: string) => ISchleiferBuilder;
    placement: (placement: AboveBelow) => ISchleiferBuilder;
}
export declare function patchSchleifer(base: Schleifer, builder: (build: ISchleiferBuilder) => ISchleiferBuilder): IAny[];
export declare function buildSchleifer(builder: (build: ISchleiferBuilder) => ISchleiferBuilder): Schleifer;
export interface ITremoloBuilder {
    build?: () => Tremolo;
    patch: () => IAny[];
    data: (data: string) => ITremoloBuilder;
    type: (type: StartStopSingle) => ITremoloBuilder;
    defaultX: (defaultX: number) => ITremoloBuilder;
    relativeY: (relativeY: number) => ITremoloBuilder;
    defaultY: (defaultY: number) => ITremoloBuilder;
    relativeX: (relativeX: number) => ITremoloBuilder;
    fontFamily: (fontFamily: string) => ITremoloBuilder;
    fontWeight: (fontWeight: NormalBold) => ITremoloBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITremoloBuilder;
    fontSize: (fontSize: string) => ITremoloBuilder;
    color: (color: string) => ITremoloBuilder;
    placement: (placement: AboveBelow) => ITremoloBuilder;
}
export declare function patchTremolo(base: Tremolo, builder: (build: ITremoloBuilder) => ITremoloBuilder): IAny[];
export declare function buildTremolo(builder: (build: ITremoloBuilder) => ITremoloBuilder): Tremolo;
export interface IOtherOrnamentBuilder {
    build?: () => OtherOrnament;
    patch: () => IAny[];
    type: (type: StartStopSingle) => IOtherOrnamentBuilder;
    data: (data: string) => IOtherOrnamentBuilder;
    defaultX: (defaultX: number) => IOtherOrnamentBuilder;
    relativeY: (relativeY: number) => IOtherOrnamentBuilder;
    defaultY: (defaultY: number) => IOtherOrnamentBuilder;
    relativeX: (relativeX: number) => IOtherOrnamentBuilder;
    fontFamily: (fontFamily: string) => IOtherOrnamentBuilder;
    fontWeight: (fontWeight: NormalBold) => IOtherOrnamentBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOtherOrnamentBuilder;
    fontSize: (fontSize: string) => IOtherOrnamentBuilder;
    color: (color: string) => IOtherOrnamentBuilder;
    placement: (placement: AboveBelow) => IOtherOrnamentBuilder;
}
export declare function patchOtherOrnament(base: OtherOrnament, builder: (build: IOtherOrnamentBuilder) => IOtherOrnamentBuilder): IAny[];
export declare function buildOtherOrnament(builder: (build: IOtherOrnamentBuilder) => IOtherOrnamentBuilder): OtherOrnament;
export interface IAccidentalMarkBuilder {
    build?: () => AccidentalMark;
    patch: () => IAny[];
    mark: (mark: string) => IAccidentalMarkBuilder;
    defaultX: (defaultX: number) => IAccidentalMarkBuilder;
    relativeY: (relativeY: number) => IAccidentalMarkBuilder;
    defaultY: (defaultY: number) => IAccidentalMarkBuilder;
    relativeX: (relativeX: number) => IAccidentalMarkBuilder;
    fontFamily: (fontFamily: string) => IAccidentalMarkBuilder;
    fontWeight: (fontWeight: NormalBold) => IAccidentalMarkBuilder;
    fontStyle: (fontStyle: NormalItalic) => IAccidentalMarkBuilder;
    fontSize: (fontSize: string) => IAccidentalMarkBuilder;
    color: (color: string) => IAccidentalMarkBuilder;
    placement: (placement: AboveBelow) => IAccidentalMarkBuilder;
}
export declare function patchAccidentalMark(base: AccidentalMark, builder: (build: IAccidentalMarkBuilder) => IAccidentalMarkBuilder): IAny[];
export declare function buildAccidentalMark(builder: (build: IAccidentalMarkBuilder) => IAccidentalMarkBuilder): AccidentalMark;
export interface ITechnicalBuilder {
    build?: () => Technical;
    patch: () => IAny[];
    tripleTongue: (build: TripleTongue | ((builder: ITripleTongueBuilder) => ITripleTongueBuilder)) => ITechnicalBuilder;
    toe: (build: Toe | ((builder: IToeBuilder) => IToeBuilder)) => ITechnicalBuilder;
    hole: (build: Hole | ((builder: IHoleBuilder) => IHoleBuilder)) => ITechnicalBuilder;
    hammerOn: (build: HammerOn | ((builder: IHammerOnBuilder) => IHammerOnBuilder)) => ITechnicalBuilder;
    upBow: (build: UpBow | ((builder: IUpBowBuilder) => IUpBowBuilder)) => ITechnicalBuilder;
    downBow: (build: DownBow | ((builder: IDownBowBuilder) => IDownBowBuilder)) => ITechnicalBuilder;
    fret: (build: Fret | ((builder: IFretBuilder) => IFretBuilder)) => ITechnicalBuilder;
    tap: (build: Tap | ((builder: ITapBuilder) => ITapBuilder)) => ITechnicalBuilder;
    pullOff: (build: PullOff | ((builder: IPullOffBuilder) => IPullOffBuilder)) => ITechnicalBuilder;
    handbell: (build: Handbell | ((builder: IHandbellBuilder) => IHandbellBuilder)) => ITechnicalBuilder;
    bend: (build: Bend | ((builder: IBendBuilder) => IBendBuilder)) => ITechnicalBuilder;
    thumbPosition: (build: ThumbPosition | ((builder: IThumbPositionBuilder) => IThumbPositionBuilder)) => ITechnicalBuilder;
    stopped: (build: Stopped | ((builder: IStoppedBuilder) => IStoppedBuilder)) => ITechnicalBuilder;
    pluck: (build: Pluck | ((builder: IPluckBuilder) => IPluckBuilder)) => ITechnicalBuilder;
    doubleTongue: (build: DoubleTongue | ((builder: IDoubleTongueBuilder) => IDoubleTongueBuilder)) => ITechnicalBuilder;
    string: (build: String | ((builder: IStringBuilder) => IStringBuilder)) => ITechnicalBuilder;
    openString: (build: OpenString | ((builder: IOpenStringBuilder) => IOpenStringBuilder)) => ITechnicalBuilder;
    fingernails: (build: Fingernails | ((builder: IFingernailsBuilder) => IFingernailsBuilder)) => ITechnicalBuilder;
    arrow: (build: Arrow | ((builder: IArrowBuilder) => IArrowBuilder)) => ITechnicalBuilder;
    harmonic: (build: Harmonic | ((builder: IHarmonicBuilder) => IHarmonicBuilder)) => ITechnicalBuilder;
    heel: (build: Heel | ((builder: IHeelBuilder) => IHeelBuilder)) => ITechnicalBuilder;
    otherTechnical: (build: OtherTechnical | ((builder: IOtherTechnicalBuilder) => IOtherTechnicalBuilder)) => ITechnicalBuilder;
    snapPizzicato: (build: SnapPizzicato | ((builder: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder)) => ITechnicalBuilder;
    fingering: (build: Fingering | ((builder: IFingeringBuilder) => IFingeringBuilder)) => ITechnicalBuilder;
}
export declare function patchTechnical(base: Technical, builder: (build: ITechnicalBuilder) => ITechnicalBuilder): IAny[];
export declare function buildTechnical(builder: (build: ITechnicalBuilder) => ITechnicalBuilder): Technical;
export interface IUpBowBuilder {
    build?: () => UpBow;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IUpBowBuilder;
    relativeY: (relativeY: number) => IUpBowBuilder;
    defaultY: (defaultY: number) => IUpBowBuilder;
    relativeX: (relativeX: number) => IUpBowBuilder;
    fontFamily: (fontFamily: string) => IUpBowBuilder;
    fontWeight: (fontWeight: NormalBold) => IUpBowBuilder;
    fontStyle: (fontStyle: NormalItalic) => IUpBowBuilder;
    fontSize: (fontSize: string) => IUpBowBuilder;
    color: (color: string) => IUpBowBuilder;
    placement: (placement: AboveBelow) => IUpBowBuilder;
}
export declare function patchUpBow(base: UpBow, builder: (build: IUpBowBuilder) => IUpBowBuilder): IAny[];
export declare function buildUpBow(builder: (build: IUpBowBuilder) => IUpBowBuilder): UpBow;
export interface IDownBowBuilder {
    build?: () => DownBow;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDownBowBuilder;
    relativeY: (relativeY: number) => IDownBowBuilder;
    defaultY: (defaultY: number) => IDownBowBuilder;
    relativeX: (relativeX: number) => IDownBowBuilder;
    fontFamily: (fontFamily: string) => IDownBowBuilder;
    fontWeight: (fontWeight: NormalBold) => IDownBowBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDownBowBuilder;
    fontSize: (fontSize: string) => IDownBowBuilder;
    color: (color: string) => IDownBowBuilder;
    placement: (placement: AboveBelow) => IDownBowBuilder;
}
export declare function patchDownBow(base: DownBow, builder: (build: IDownBowBuilder) => IDownBowBuilder): IAny[];
export declare function buildDownBow(builder: (build: IDownBowBuilder) => IDownBowBuilder): DownBow;
export interface IHarmonicBuilder {
    build?: () => Harmonic;
    patch: () => IAny[];
    artificial: (artificial: boolean) => IHarmonicBuilder;
    touchingPitch: (touchingPitch: boolean) => IHarmonicBuilder;
    soundingPitch: (soundingPitch: boolean) => IHarmonicBuilder;
    natural: (natural: boolean) => IHarmonicBuilder;
    basePitch: (basePitch: boolean) => IHarmonicBuilder;
    defaultX: (defaultX: number) => IHarmonicBuilder;
    relativeY: (relativeY: number) => IHarmonicBuilder;
    defaultY: (defaultY: number) => IHarmonicBuilder;
    relativeX: (relativeX: number) => IHarmonicBuilder;
    fontFamily: (fontFamily: string) => IHarmonicBuilder;
    fontWeight: (fontWeight: NormalBold) => IHarmonicBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHarmonicBuilder;
    fontSize: (fontSize: string) => IHarmonicBuilder;
    color: (color: string) => IHarmonicBuilder;
    printObject: (printObject: boolean) => IHarmonicBuilder;
    placement: (placement: AboveBelow) => IHarmonicBuilder;
}
export declare function patchHarmonic(base: Harmonic, builder: (build: IHarmonicBuilder) => IHarmonicBuilder): IAny[];
export declare function buildHarmonic(builder: (build: IHarmonicBuilder) => IHarmonicBuilder): Harmonic;
export interface IOpenStringBuilder {
    build?: () => OpenString;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IOpenStringBuilder;
    relativeY: (relativeY: number) => IOpenStringBuilder;
    defaultY: (defaultY: number) => IOpenStringBuilder;
    relativeX: (relativeX: number) => IOpenStringBuilder;
    fontFamily: (fontFamily: string) => IOpenStringBuilder;
    fontWeight: (fontWeight: NormalBold) => IOpenStringBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOpenStringBuilder;
    fontSize: (fontSize: string) => IOpenStringBuilder;
    color: (color: string) => IOpenStringBuilder;
    placement: (placement: AboveBelow) => IOpenStringBuilder;
}
export declare function patchOpenString(base: OpenString, builder: (build: IOpenStringBuilder) => IOpenStringBuilder): IAny[];
export declare function buildOpenString(builder: (build: IOpenStringBuilder) => IOpenStringBuilder): OpenString;
export interface IThumbPositionBuilder {
    build?: () => ThumbPosition;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IThumbPositionBuilder;
    relativeY: (relativeY: number) => IThumbPositionBuilder;
    defaultY: (defaultY: number) => IThumbPositionBuilder;
    relativeX: (relativeX: number) => IThumbPositionBuilder;
    fontFamily: (fontFamily: string) => IThumbPositionBuilder;
    fontWeight: (fontWeight: NormalBold) => IThumbPositionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IThumbPositionBuilder;
    fontSize: (fontSize: string) => IThumbPositionBuilder;
    color: (color: string) => IThumbPositionBuilder;
    placement: (placement: AboveBelow) => IThumbPositionBuilder;
}
export declare function patchThumbPosition(base: ThumbPosition, builder: (build: IThumbPositionBuilder) => IThumbPositionBuilder): IAny[];
export declare function buildThumbPosition(builder: (build: IThumbPositionBuilder) => IThumbPositionBuilder): ThumbPosition;
export interface IPluckBuilder {
    build?: () => Pluck;
    patch: () => IAny[];
    data: (data: string) => IPluckBuilder;
    defaultX: (defaultX: number) => IPluckBuilder;
    relativeY: (relativeY: number) => IPluckBuilder;
    defaultY: (defaultY: number) => IPluckBuilder;
    relativeX: (relativeX: number) => IPluckBuilder;
    fontFamily: (fontFamily: string) => IPluckBuilder;
    fontWeight: (fontWeight: NormalBold) => IPluckBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPluckBuilder;
    fontSize: (fontSize: string) => IPluckBuilder;
    color: (color: string) => IPluckBuilder;
    placement: (placement: AboveBelow) => IPluckBuilder;
}
export declare function patchPluck(base: Pluck, builder: (build: IPluckBuilder) => IPluckBuilder): IAny[];
export declare function buildPluck(builder: (build: IPluckBuilder) => IPluckBuilder): Pluck;
export interface IDoubleTongueBuilder {
    build?: () => DoubleTongue;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDoubleTongueBuilder;
    relativeY: (relativeY: number) => IDoubleTongueBuilder;
    defaultY: (defaultY: number) => IDoubleTongueBuilder;
    relativeX: (relativeX: number) => IDoubleTongueBuilder;
    fontFamily: (fontFamily: string) => IDoubleTongueBuilder;
    fontWeight: (fontWeight: NormalBold) => IDoubleTongueBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDoubleTongueBuilder;
    fontSize: (fontSize: string) => IDoubleTongueBuilder;
    color: (color: string) => IDoubleTongueBuilder;
    placement: (placement: AboveBelow) => IDoubleTongueBuilder;
}
export declare function patchDoubleTongue(base: DoubleTongue, builder: (build: IDoubleTongueBuilder) => IDoubleTongueBuilder): IAny[];
export declare function buildDoubleTongue(builder: (build: IDoubleTongueBuilder) => IDoubleTongueBuilder): DoubleTongue;
export interface ITripleTongueBuilder {
    build?: () => TripleTongue;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ITripleTongueBuilder;
    relativeY: (relativeY: number) => ITripleTongueBuilder;
    defaultY: (defaultY: number) => ITripleTongueBuilder;
    relativeX: (relativeX: number) => ITripleTongueBuilder;
    fontFamily: (fontFamily: string) => ITripleTongueBuilder;
    fontWeight: (fontWeight: NormalBold) => ITripleTongueBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITripleTongueBuilder;
    fontSize: (fontSize: string) => ITripleTongueBuilder;
    color: (color: string) => ITripleTongueBuilder;
    placement: (placement: AboveBelow) => ITripleTongueBuilder;
}
export declare function patchTripleTongue(base: TripleTongue, builder: (build: ITripleTongueBuilder) => ITripleTongueBuilder): IAny[];
export declare function buildTripleTongue(builder: (build: ITripleTongueBuilder) => ITripleTongueBuilder): TripleTongue;
export interface IStoppedBuilder {
    build?: () => Stopped;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IStoppedBuilder;
    relativeY: (relativeY: number) => IStoppedBuilder;
    defaultY: (defaultY: number) => IStoppedBuilder;
    relativeX: (relativeX: number) => IStoppedBuilder;
    fontFamily: (fontFamily: string) => IStoppedBuilder;
    fontWeight: (fontWeight: NormalBold) => IStoppedBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStoppedBuilder;
    fontSize: (fontSize: string) => IStoppedBuilder;
    color: (color: string) => IStoppedBuilder;
    placement: (placement: AboveBelow) => IStoppedBuilder;
}
export declare function patchStopped(base: Stopped, builder: (build: IStoppedBuilder) => IStoppedBuilder): IAny[];
export declare function buildStopped(builder: (build: IStoppedBuilder) => IStoppedBuilder): Stopped;
export interface ISnapPizzicatoBuilder {
    build?: () => SnapPizzicato;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ISnapPizzicatoBuilder;
    relativeY: (relativeY: number) => ISnapPizzicatoBuilder;
    defaultY: (defaultY: number) => ISnapPizzicatoBuilder;
    relativeX: (relativeX: number) => ISnapPizzicatoBuilder;
    fontFamily: (fontFamily: string) => ISnapPizzicatoBuilder;
    fontWeight: (fontWeight: NormalBold) => ISnapPizzicatoBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISnapPizzicatoBuilder;
    fontSize: (fontSize: string) => ISnapPizzicatoBuilder;
    color: (color: string) => ISnapPizzicatoBuilder;
    placement: (placement: AboveBelow) => ISnapPizzicatoBuilder;
}
export declare function patchSnapPizzicato(base: SnapPizzicato, builder: (build: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder): IAny[];
export declare function buildSnapPizzicato(builder: (build: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder): SnapPizzicato;
export interface IHammerOnBuilder {
    build?: () => HammerOn;
    patch: () => IAny[];
    number: (number: number) => IHammerOnBuilder;
    type: (type: StartStop) => IHammerOnBuilder;
    data: (data: string) => IHammerOnBuilder;
    defaultX: (defaultX: number) => IHammerOnBuilder;
    relativeY: (relativeY: number) => IHammerOnBuilder;
    defaultY: (defaultY: number) => IHammerOnBuilder;
    relativeX: (relativeX: number) => IHammerOnBuilder;
    fontFamily: (fontFamily: string) => IHammerOnBuilder;
    fontWeight: (fontWeight: NormalBold) => IHammerOnBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHammerOnBuilder;
    fontSize: (fontSize: string) => IHammerOnBuilder;
    color: (color: string) => IHammerOnBuilder;
    placement: (placement: AboveBelow) => IHammerOnBuilder;
}
export declare function patchHammerOn(base: HammerOn, builder: (build: IHammerOnBuilder) => IHammerOnBuilder): IAny[];
export declare function buildHammerOn(builder: (build: IHammerOnBuilder) => IHammerOnBuilder): HammerOn;
export interface IPullOffBuilder {
    build?: () => PullOff;
    patch: () => IAny[];
    number: (number: number) => IPullOffBuilder;
    type: (type: StartStop) => IPullOffBuilder;
    data: (data: string) => IPullOffBuilder;
    defaultX: (defaultX: number) => IPullOffBuilder;
    relativeY: (relativeY: number) => IPullOffBuilder;
    defaultY: (defaultY: number) => IPullOffBuilder;
    relativeX: (relativeX: number) => IPullOffBuilder;
    fontFamily: (fontFamily: string) => IPullOffBuilder;
    fontWeight: (fontWeight: NormalBold) => IPullOffBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPullOffBuilder;
    fontSize: (fontSize: string) => IPullOffBuilder;
    color: (color: string) => IPullOffBuilder;
    placement: (placement: AboveBelow) => IPullOffBuilder;
}
export declare function patchPullOff(base: PullOff, builder: (build: IPullOffBuilder) => IPullOffBuilder): IAny[];
export declare function buildPullOff(builder: (build: IPullOffBuilder) => IPullOffBuilder): PullOff;
export interface IBendBuilder {
    build?: () => Bend;
    patch: () => IAny[];
    bendAlter: (bendAlter: string) => IBendBuilder;
    withBar: (build: WithBar | ((builder: IWithBarBuilder) => IWithBarBuilder)) => IBendBuilder;
    preBend: (preBend: boolean) => IBendBuilder;
    release: (release: boolean) => IBendBuilder;
    defaultX: (defaultX: number) => IBendBuilder;
    relativeY: (relativeY: number) => IBendBuilder;
    defaultY: (defaultY: number) => IBendBuilder;
    relativeX: (relativeX: number) => IBendBuilder;
    fontFamily: (fontFamily: string) => IBendBuilder;
    fontWeight: (fontWeight: NormalBold) => IBendBuilder;
    fontStyle: (fontStyle: NormalItalic) => IBendBuilder;
    fontSize: (fontSize: string) => IBendBuilder;
    color: (color: string) => IBendBuilder;
    accelerate: (accelerate: boolean) => IBendBuilder;
    beats: (beats: number) => IBendBuilder;
    firstBeat: (firstBeat: number) => IBendBuilder;
    lastBeat: (lastBeat: number) => IBendBuilder;
}
export declare function patchBend(base: Bend, builder: (build: IBendBuilder) => IBendBuilder): IAny[];
export declare function buildBend(builder: (build: IBendBuilder) => IBendBuilder): Bend;
export interface IWithBarBuilder {
    build?: () => WithBar;
    patch: () => IAny[];
    data: (data: string) => IWithBarBuilder;
    defaultX: (defaultX: number) => IWithBarBuilder;
    relativeY: (relativeY: number) => IWithBarBuilder;
    defaultY: (defaultY: number) => IWithBarBuilder;
    relativeX: (relativeX: number) => IWithBarBuilder;
    fontFamily: (fontFamily: string) => IWithBarBuilder;
    fontWeight: (fontWeight: NormalBold) => IWithBarBuilder;
    fontStyle: (fontStyle: NormalItalic) => IWithBarBuilder;
    fontSize: (fontSize: string) => IWithBarBuilder;
    color: (color: string) => IWithBarBuilder;
    placement: (placement: AboveBelow) => IWithBarBuilder;
}
export declare function patchWithBar(base: WithBar, builder: (build: IWithBarBuilder) => IWithBarBuilder): IAny[];
export declare function buildWithBar(builder: (build: IWithBarBuilder) => IWithBarBuilder): WithBar;
export interface ITapBuilder {
    build?: () => Tap;
    patch: () => IAny[];
    data: (data: string) => ITapBuilder;
    defaultX: (defaultX: number) => ITapBuilder;
    relativeY: (relativeY: number) => ITapBuilder;
    defaultY: (defaultY: number) => ITapBuilder;
    relativeX: (relativeX: number) => ITapBuilder;
    fontFamily: (fontFamily: string) => ITapBuilder;
    fontWeight: (fontWeight: NormalBold) => ITapBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITapBuilder;
    fontSize: (fontSize: string) => ITapBuilder;
    color: (color: string) => ITapBuilder;
    placement: (placement: AboveBelow) => ITapBuilder;
}
export declare function patchTap(base: Tap, builder: (build: ITapBuilder) => ITapBuilder): IAny[];
export declare function buildTap(builder: (build: ITapBuilder) => ITapBuilder): Tap;
export interface IHeelBuilder {
    build?: () => Heel;
    patch: () => IAny[];
    substitution: (substitution: boolean) => IHeelBuilder;
    defaultX: (defaultX: number) => IHeelBuilder;
    relativeY: (relativeY: number) => IHeelBuilder;
    defaultY: (defaultY: number) => IHeelBuilder;
    relativeX: (relativeX: number) => IHeelBuilder;
    fontFamily: (fontFamily: string) => IHeelBuilder;
    fontWeight: (fontWeight: NormalBold) => IHeelBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHeelBuilder;
    fontSize: (fontSize: string) => IHeelBuilder;
    color: (color: string) => IHeelBuilder;
    placement: (placement: AboveBelow) => IHeelBuilder;
}
export declare function patchHeel(base: Heel, builder: (build: IHeelBuilder) => IHeelBuilder): IAny[];
export declare function buildHeel(builder: (build: IHeelBuilder) => IHeelBuilder): Heel;
export interface IToeBuilder {
    build?: () => Toe;
    patch: () => IAny[];
    substitution: (substitution: boolean) => IToeBuilder;
    defaultX: (defaultX: number) => IToeBuilder;
    relativeY: (relativeY: number) => IToeBuilder;
    defaultY: (defaultY: number) => IToeBuilder;
    relativeX: (relativeX: number) => IToeBuilder;
    fontFamily: (fontFamily: string) => IToeBuilder;
    fontWeight: (fontWeight: NormalBold) => IToeBuilder;
    fontStyle: (fontStyle: NormalItalic) => IToeBuilder;
    fontSize: (fontSize: string) => IToeBuilder;
    color: (color: string) => IToeBuilder;
    placement: (placement: AboveBelow) => IToeBuilder;
}
export declare function patchToe(base: Toe, builder: (build: IToeBuilder) => IToeBuilder): IAny[];
export declare function buildToe(builder: (build: IToeBuilder) => IToeBuilder): Toe;
export interface IFingernailsBuilder {
    build?: () => Fingernails;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IFingernailsBuilder;
    relativeY: (relativeY: number) => IFingernailsBuilder;
    defaultY: (defaultY: number) => IFingernailsBuilder;
    relativeX: (relativeX: number) => IFingernailsBuilder;
    fontFamily: (fontFamily: string) => IFingernailsBuilder;
    fontWeight: (fontWeight: NormalBold) => IFingernailsBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFingernailsBuilder;
    fontSize: (fontSize: string) => IFingernailsBuilder;
    color: (color: string) => IFingernailsBuilder;
    placement: (placement: AboveBelow) => IFingernailsBuilder;
}
export declare function patchFingernails(base: Fingernails, builder: (build: IFingernailsBuilder) => IFingernailsBuilder): IAny[];
export declare function buildFingernails(builder: (build: IFingernailsBuilder) => IFingernailsBuilder): Fingernails;
export interface IHoleBuilder {
    build?: () => Hole;
    patch: () => IAny[];
    holeClosed: (build: HoleClosed | ((builder: IHoleClosedBuilder) => IHoleClosedBuilder)) => IHoleBuilder;
    holeShape: (holeShape: string) => IHoleBuilder;
    holeType: (holeType: string) => IHoleBuilder;
    defaultX: (defaultX: number) => IHoleBuilder;
    relativeY: (relativeY: number) => IHoleBuilder;
    defaultY: (defaultY: number) => IHoleBuilder;
    relativeX: (relativeX: number) => IHoleBuilder;
    fontFamily: (fontFamily: string) => IHoleBuilder;
    fontWeight: (fontWeight: NormalBold) => IHoleBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHoleBuilder;
    fontSize: (fontSize: string) => IHoleBuilder;
    color: (color: string) => IHoleBuilder;
    placement: (placement: AboveBelow) => IHoleBuilder;
}
export declare function patchHole(base: Hole, builder: (build: IHoleBuilder) => IHoleBuilder): IAny[];
export declare function buildHole(builder: (build: IHoleBuilder) => IHoleBuilder): Hole;
export interface IHoleClosedBuilder {
    build?: () => HoleClosed;
    patch: () => IAny[];
    location: (location: HoleLocation) => IHoleClosedBuilder;
    data: (data: HoleClosedType) => IHoleClosedBuilder;
}
export declare function patchHoleClosed(base: HoleClosed, builder: (build: IHoleClosedBuilder) => IHoleClosedBuilder): IAny[];
export declare function buildHoleClosed(builder: (build: IHoleClosedBuilder) => IHoleClosedBuilder): HoleClosed;
export interface IArrowBuilder {
    build?: () => Arrow;
    patch: () => IAny[];
    arrowStyle: (arrowStyle: string) => IArrowBuilder;
    arrowDirection: (arrowDirection: string) => IArrowBuilder;
    circularArrow: (circularArrow: string) => IArrowBuilder;
    defaultX: (defaultX: number) => IArrowBuilder;
    relativeY: (relativeY: number) => IArrowBuilder;
    defaultY: (defaultY: number) => IArrowBuilder;
    relativeX: (relativeX: number) => IArrowBuilder;
    fontFamily: (fontFamily: string) => IArrowBuilder;
    fontWeight: (fontWeight: NormalBold) => IArrowBuilder;
    fontStyle: (fontStyle: NormalItalic) => IArrowBuilder;
    fontSize: (fontSize: string) => IArrowBuilder;
    color: (color: string) => IArrowBuilder;
    placement: (placement: AboveBelow) => IArrowBuilder;
}
export declare function patchArrow(base: Arrow, builder: (build: IArrowBuilder) => IArrowBuilder): IAny[];
export declare function buildArrow(builder: (build: IArrowBuilder) => IArrowBuilder): Arrow;
export interface IHandbellBuilder {
    build?: () => Handbell;
    patch: () => IAny[];
    data: (data: string) => IHandbellBuilder;
    defaultX: (defaultX: number) => IHandbellBuilder;
    relativeY: (relativeY: number) => IHandbellBuilder;
    defaultY: (defaultY: number) => IHandbellBuilder;
    relativeX: (relativeX: number) => IHandbellBuilder;
    fontFamily: (fontFamily: string) => IHandbellBuilder;
    fontWeight: (fontWeight: NormalBold) => IHandbellBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHandbellBuilder;
    fontSize: (fontSize: string) => IHandbellBuilder;
    color: (color: string) => IHandbellBuilder;
    placement: (placement: AboveBelow) => IHandbellBuilder;
}
export declare function patchHandbell(base: Handbell, builder: (build: IHandbellBuilder) => IHandbellBuilder): IAny[];
export declare function buildHandbell(builder: (build: IHandbellBuilder) => IHandbellBuilder): Handbell;
export interface IOtherTechnicalBuilder {
    build?: () => OtherTechnical;
    patch: () => IAny[];
    data: (data: string) => IOtherTechnicalBuilder;
    defaultX: (defaultX: number) => IOtherTechnicalBuilder;
    relativeY: (relativeY: number) => IOtherTechnicalBuilder;
    defaultY: (defaultY: number) => IOtherTechnicalBuilder;
    relativeX: (relativeX: number) => IOtherTechnicalBuilder;
    fontFamily: (fontFamily: string) => IOtherTechnicalBuilder;
    fontWeight: (fontWeight: NormalBold) => IOtherTechnicalBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOtherTechnicalBuilder;
    fontSize: (fontSize: string) => IOtherTechnicalBuilder;
    color: (color: string) => IOtherTechnicalBuilder;
    placement: (placement: AboveBelow) => IOtherTechnicalBuilder;
}
export declare function patchOtherTechnical(base: OtherTechnical, builder: (build: IOtherTechnicalBuilder) => IOtherTechnicalBuilder): IAny[];
export declare function buildOtherTechnical(builder: (build: IOtherTechnicalBuilder) => IOtherTechnicalBuilder): OtherTechnical;
export interface IArticulationsBuilder {
    build?: () => Articulations;
    patch: () => IAny[];
    accent: (build: Accent | ((builder: IAccentBuilder) => IAccentBuilder)) => IArticulationsBuilder;
    doit: (build: Doit | ((builder: IDoitBuilder) => IDoitBuilder)) => IArticulationsBuilder;
    breathMark: (build: BreathMark | ((builder: IBreathMarkBuilder) => IBreathMarkBuilder)) => IArticulationsBuilder;
    otherArticulationsAt: (idx: number, build: OtherArticulation | ((builder: IOtherArticulationBuilder) => IOtherArticulationBuilder)) => IArticulationsBuilder;
    otherArticulationsSplice: (start: number, deleteCount: number, ...items: OtherArticulation[]) => IArticulationsBuilder;
    otherArticulations: (otherArticulations: OtherArticulation[]) => IArticulationsBuilder;
    detachedLegato: (build: DetachedLegato | ((builder: IDetachedLegatoBuilder) => IDetachedLegatoBuilder)) => IArticulationsBuilder;
    staccatissimo: (build: Staccatissimo | ((builder: IStaccatissimoBuilder) => IStaccatissimoBuilder)) => IArticulationsBuilder;
    plop: (build: Plop | ((builder: IPlopBuilder) => IPlopBuilder)) => IArticulationsBuilder;
    unstress: (build: Unstress | ((builder: IUnstressBuilder) => IUnstressBuilder)) => IArticulationsBuilder;
    strongAccent: (build: StrongAccent | ((builder: IStrongAccentBuilder) => IStrongAccentBuilder)) => IArticulationsBuilder;
    staccato: (build: Staccato | ((builder: IStaccatoBuilder) => IStaccatoBuilder)) => IArticulationsBuilder;
    spiccato: (build: Spiccato | ((builder: ISpiccatoBuilder) => ISpiccatoBuilder)) => IArticulationsBuilder;
    scoop: (build: Scoop | ((builder: IScoopBuilder) => IScoopBuilder)) => IArticulationsBuilder;
    falloff: (build: Falloff | ((builder: IFalloffBuilder) => IFalloffBuilder)) => IArticulationsBuilder;
    caesura: (build: Caesura | ((builder: ICaesuraBuilder) => ICaesuraBuilder)) => IArticulationsBuilder;
    stress: (build: Stress | ((builder: IStressBuilder) => IStressBuilder)) => IArticulationsBuilder;
    tenuto: (build: Tenuto | ((builder: ITenutoBuilder) => ITenutoBuilder)) => IArticulationsBuilder;
}
export declare function patchArticulations(base: Articulations, builder: (build: IArticulationsBuilder) => IArticulationsBuilder): IAny[];
export declare function buildArticulations(builder: (build: IArticulationsBuilder) => IArticulationsBuilder): Articulations;
export interface IAccentBuilder {
    build?: () => Accent;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IAccentBuilder;
    relativeY: (relativeY: number) => IAccentBuilder;
    defaultY: (defaultY: number) => IAccentBuilder;
    relativeX: (relativeX: number) => IAccentBuilder;
    fontFamily: (fontFamily: string) => IAccentBuilder;
    fontWeight: (fontWeight: NormalBold) => IAccentBuilder;
    fontStyle: (fontStyle: NormalItalic) => IAccentBuilder;
    fontSize: (fontSize: string) => IAccentBuilder;
    color: (color: string) => IAccentBuilder;
    placement: (placement: AboveBelow) => IAccentBuilder;
}
export declare function patchAccent(base: Accent, builder: (build: IAccentBuilder) => IAccentBuilder): IAny[];
export declare function buildAccent(builder: (build: IAccentBuilder) => IAccentBuilder): Accent;
export interface IStrongAccentBuilder {
    build?: () => StrongAccent;
    patch: () => IAny[];
    type: (type: UpDown) => IStrongAccentBuilder;
    defaultX: (defaultX: number) => IStrongAccentBuilder;
    relativeY: (relativeY: number) => IStrongAccentBuilder;
    defaultY: (defaultY: number) => IStrongAccentBuilder;
    relativeX: (relativeX: number) => IStrongAccentBuilder;
    fontFamily: (fontFamily: string) => IStrongAccentBuilder;
    fontWeight: (fontWeight: NormalBold) => IStrongAccentBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStrongAccentBuilder;
    fontSize: (fontSize: string) => IStrongAccentBuilder;
    color: (color: string) => IStrongAccentBuilder;
    placement: (placement: AboveBelow) => IStrongAccentBuilder;
}
export declare function patchStrongAccent(base: StrongAccent, builder: (build: IStrongAccentBuilder) => IStrongAccentBuilder): IAny[];
export declare function buildStrongAccent(builder: (build: IStrongAccentBuilder) => IStrongAccentBuilder): StrongAccent;
export interface IStaccatoBuilder {
    build?: () => Staccato;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IStaccatoBuilder;
    relativeY: (relativeY: number) => IStaccatoBuilder;
    defaultY: (defaultY: number) => IStaccatoBuilder;
    relativeX: (relativeX: number) => IStaccatoBuilder;
    fontFamily: (fontFamily: string) => IStaccatoBuilder;
    fontWeight: (fontWeight: NormalBold) => IStaccatoBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStaccatoBuilder;
    fontSize: (fontSize: string) => IStaccatoBuilder;
    color: (color: string) => IStaccatoBuilder;
    placement: (placement: AboveBelow) => IStaccatoBuilder;
}
export declare function patchStaccato(base: Staccato, builder: (build: IStaccatoBuilder) => IStaccatoBuilder): IAny[];
export declare function buildStaccato(builder: (build: IStaccatoBuilder) => IStaccatoBuilder): Staccato;
export interface ITenutoBuilder {
    build?: () => Tenuto;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ITenutoBuilder;
    relativeY: (relativeY: number) => ITenutoBuilder;
    defaultY: (defaultY: number) => ITenutoBuilder;
    relativeX: (relativeX: number) => ITenutoBuilder;
    fontFamily: (fontFamily: string) => ITenutoBuilder;
    fontWeight: (fontWeight: NormalBold) => ITenutoBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITenutoBuilder;
    fontSize: (fontSize: string) => ITenutoBuilder;
    color: (color: string) => ITenutoBuilder;
    placement: (placement: AboveBelow) => ITenutoBuilder;
}
export declare function patchTenuto(base: Tenuto, builder: (build: ITenutoBuilder) => ITenutoBuilder): IAny[];
export declare function buildTenuto(builder: (build: ITenutoBuilder) => ITenutoBuilder): Tenuto;
export interface IDetachedLegatoBuilder {
    build?: () => DetachedLegato;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDetachedLegatoBuilder;
    relativeY: (relativeY: number) => IDetachedLegatoBuilder;
    defaultY: (defaultY: number) => IDetachedLegatoBuilder;
    relativeX: (relativeX: number) => IDetachedLegatoBuilder;
    fontFamily: (fontFamily: string) => IDetachedLegatoBuilder;
    fontWeight: (fontWeight: NormalBold) => IDetachedLegatoBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDetachedLegatoBuilder;
    fontSize: (fontSize: string) => IDetachedLegatoBuilder;
    color: (color: string) => IDetachedLegatoBuilder;
    placement: (placement: AboveBelow) => IDetachedLegatoBuilder;
}
export declare function patchDetachedLegato(base: DetachedLegato, builder: (build: IDetachedLegatoBuilder) => IDetachedLegatoBuilder): IAny[];
export declare function buildDetachedLegato(builder: (build: IDetachedLegatoBuilder) => IDetachedLegatoBuilder): DetachedLegato;
export interface IStaccatissimoBuilder {
    build?: () => Staccatissimo;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IStaccatissimoBuilder;
    relativeY: (relativeY: number) => IStaccatissimoBuilder;
    defaultY: (defaultY: number) => IStaccatissimoBuilder;
    relativeX: (relativeX: number) => IStaccatissimoBuilder;
    fontFamily: (fontFamily: string) => IStaccatissimoBuilder;
    fontWeight: (fontWeight: NormalBold) => IStaccatissimoBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStaccatissimoBuilder;
    fontSize: (fontSize: string) => IStaccatissimoBuilder;
    color: (color: string) => IStaccatissimoBuilder;
    placement: (placement: AboveBelow) => IStaccatissimoBuilder;
}
export declare function patchStaccatissimo(base: Staccatissimo, builder: (build: IStaccatissimoBuilder) => IStaccatissimoBuilder): IAny[];
export declare function buildStaccatissimo(builder: (build: IStaccatissimoBuilder) => IStaccatissimoBuilder): Staccatissimo;
export interface ISpiccatoBuilder {
    build?: () => Spiccato;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ISpiccatoBuilder;
    relativeY: (relativeY: number) => ISpiccatoBuilder;
    defaultY: (defaultY: number) => ISpiccatoBuilder;
    relativeX: (relativeX: number) => ISpiccatoBuilder;
    fontFamily: (fontFamily: string) => ISpiccatoBuilder;
    fontWeight: (fontWeight: NormalBold) => ISpiccatoBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISpiccatoBuilder;
    fontSize: (fontSize: string) => ISpiccatoBuilder;
    color: (color: string) => ISpiccatoBuilder;
    placement: (placement: AboveBelow) => ISpiccatoBuilder;
}
export declare function patchSpiccato(base: Spiccato, builder: (build: ISpiccatoBuilder) => ISpiccatoBuilder): IAny[];
export declare function buildSpiccato(builder: (build: ISpiccatoBuilder) => ISpiccatoBuilder): Spiccato;
export interface IScoopBuilder {
    build?: () => Scoop;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IScoopBuilder;
    relativeY: (relativeY: number) => IScoopBuilder;
    defaultY: (defaultY: number) => IScoopBuilder;
    relativeX: (relativeX: number) => IScoopBuilder;
    fontFamily: (fontFamily: string) => IScoopBuilder;
    fontWeight: (fontWeight: NormalBold) => IScoopBuilder;
    fontStyle: (fontStyle: NormalItalic) => IScoopBuilder;
    fontSize: (fontSize: string) => IScoopBuilder;
    color: (color: string) => IScoopBuilder;
    placement: (placement: AboveBelow) => IScoopBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IScoopBuilder;
    dashLength: (dashLength: number) => IScoopBuilder;
    spaceLength: (spaceLength: number) => IScoopBuilder;
    lineShape: (lineShape: StraightCurved) => IScoopBuilder;
}
export declare function patchScoop(base: Scoop, builder: (build: IScoopBuilder) => IScoopBuilder): IAny[];
export declare function buildScoop(builder: (build: IScoopBuilder) => IScoopBuilder): Scoop;
export interface IPlopBuilder {
    build?: () => Plop;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IPlopBuilder;
    relativeY: (relativeY: number) => IPlopBuilder;
    defaultY: (defaultY: number) => IPlopBuilder;
    relativeX: (relativeX: number) => IPlopBuilder;
    fontFamily: (fontFamily: string) => IPlopBuilder;
    fontWeight: (fontWeight: NormalBold) => IPlopBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPlopBuilder;
    fontSize: (fontSize: string) => IPlopBuilder;
    color: (color: string) => IPlopBuilder;
    placement: (placement: AboveBelow) => IPlopBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IPlopBuilder;
    dashLength: (dashLength: number) => IPlopBuilder;
    spaceLength: (spaceLength: number) => IPlopBuilder;
    lineShape: (lineShape: StraightCurved) => IPlopBuilder;
}
export declare function patchPlop(base: Plop, builder: (build: IPlopBuilder) => IPlopBuilder): IAny[];
export declare function buildPlop(builder: (build: IPlopBuilder) => IPlopBuilder): Plop;
export interface IDoitBuilder {
    build?: () => Doit;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDoitBuilder;
    relativeY: (relativeY: number) => IDoitBuilder;
    defaultY: (defaultY: number) => IDoitBuilder;
    relativeX: (relativeX: number) => IDoitBuilder;
    fontFamily: (fontFamily: string) => IDoitBuilder;
    fontWeight: (fontWeight: NormalBold) => IDoitBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDoitBuilder;
    fontSize: (fontSize: string) => IDoitBuilder;
    color: (color: string) => IDoitBuilder;
    placement: (placement: AboveBelow) => IDoitBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IDoitBuilder;
    dashLength: (dashLength: number) => IDoitBuilder;
    spaceLength: (spaceLength: number) => IDoitBuilder;
    lineShape: (lineShape: StraightCurved) => IDoitBuilder;
}
export declare function patchDoit(base: Doit, builder: (build: IDoitBuilder) => IDoitBuilder): IAny[];
export declare function buildDoit(builder: (build: IDoitBuilder) => IDoitBuilder): Doit;
export interface IFalloffBuilder {
    build?: () => Falloff;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IFalloffBuilder;
    relativeY: (relativeY: number) => IFalloffBuilder;
    defaultY: (defaultY: number) => IFalloffBuilder;
    relativeX: (relativeX: number) => IFalloffBuilder;
    fontFamily: (fontFamily: string) => IFalloffBuilder;
    fontWeight: (fontWeight: NormalBold) => IFalloffBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFalloffBuilder;
    fontSize: (fontSize: string) => IFalloffBuilder;
    color: (color: string) => IFalloffBuilder;
    placement: (placement: AboveBelow) => IFalloffBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IFalloffBuilder;
    dashLength: (dashLength: number) => IFalloffBuilder;
    spaceLength: (spaceLength: number) => IFalloffBuilder;
    lineShape: (lineShape: StraightCurved) => IFalloffBuilder;
}
export declare function patchFalloff(base: Falloff, builder: (build: IFalloffBuilder) => IFalloffBuilder): IAny[];
export declare function buildFalloff(builder: (build: IFalloffBuilder) => IFalloffBuilder): Falloff;
export interface IBreathMarkBuilder {
    build?: () => BreathMark;
    patch: () => IAny[];
    type: (type: BreathMarkType) => IBreathMarkBuilder;
    defaultX: (defaultX: number) => IBreathMarkBuilder;
    relativeY: (relativeY: number) => IBreathMarkBuilder;
    defaultY: (defaultY: number) => IBreathMarkBuilder;
    relativeX: (relativeX: number) => IBreathMarkBuilder;
    fontFamily: (fontFamily: string) => IBreathMarkBuilder;
    fontWeight: (fontWeight: NormalBold) => IBreathMarkBuilder;
    fontStyle: (fontStyle: NormalItalic) => IBreathMarkBuilder;
    fontSize: (fontSize: string) => IBreathMarkBuilder;
    color: (color: string) => IBreathMarkBuilder;
    placement: (placement: AboveBelow) => IBreathMarkBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IBreathMarkBuilder;
    dashLength: (dashLength: number) => IBreathMarkBuilder;
    spaceLength: (spaceLength: number) => IBreathMarkBuilder;
    lineShape: (lineShape: StraightCurved) => IBreathMarkBuilder;
}
export declare function patchBreathMark(base: BreathMark, builder: (build: IBreathMarkBuilder) => IBreathMarkBuilder): IAny[];
export declare function buildBreathMark(builder: (build: IBreathMarkBuilder) => IBreathMarkBuilder): BreathMark;
export interface ICaesuraBuilder {
    build?: () => Caesura;
    patch: () => IAny[];
    defaultX: (defaultX: number) => ICaesuraBuilder;
    relativeY: (relativeY: number) => ICaesuraBuilder;
    defaultY: (defaultY: number) => ICaesuraBuilder;
    relativeX: (relativeX: number) => ICaesuraBuilder;
    fontFamily: (fontFamily: string) => ICaesuraBuilder;
    fontWeight: (fontWeight: NormalBold) => ICaesuraBuilder;
    fontStyle: (fontStyle: NormalItalic) => ICaesuraBuilder;
    fontSize: (fontSize: string) => ICaesuraBuilder;
    color: (color: string) => ICaesuraBuilder;
    placement: (placement: AboveBelow) => ICaesuraBuilder;
}
export declare function patchCaesura(base: Caesura, builder: (build: ICaesuraBuilder) => ICaesuraBuilder): IAny[];
export declare function buildCaesura(builder: (build: ICaesuraBuilder) => ICaesuraBuilder): Caesura;
export interface IStressBuilder {
    build?: () => Stress;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IStressBuilder;
    relativeY: (relativeY: number) => IStressBuilder;
    defaultY: (defaultY: number) => IStressBuilder;
    relativeX: (relativeX: number) => IStressBuilder;
    fontFamily: (fontFamily: string) => IStressBuilder;
    fontWeight: (fontWeight: NormalBold) => IStressBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStressBuilder;
    fontSize: (fontSize: string) => IStressBuilder;
    color: (color: string) => IStressBuilder;
    placement: (placement: AboveBelow) => IStressBuilder;
}
export declare function patchStress(base: Stress, builder: (build: IStressBuilder) => IStressBuilder): IAny[];
export declare function buildStress(builder: (build: IStressBuilder) => IStressBuilder): Stress;
export interface IUnstressBuilder {
    build?: () => Unstress;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IUnstressBuilder;
    relativeY: (relativeY: number) => IUnstressBuilder;
    defaultY: (defaultY: number) => IUnstressBuilder;
    relativeX: (relativeX: number) => IUnstressBuilder;
    fontFamily: (fontFamily: string) => IUnstressBuilder;
    fontWeight: (fontWeight: NormalBold) => IUnstressBuilder;
    fontStyle: (fontStyle: NormalItalic) => IUnstressBuilder;
    fontSize: (fontSize: string) => IUnstressBuilder;
    color: (color: string) => IUnstressBuilder;
    placement: (placement: AboveBelow) => IUnstressBuilder;
}
export declare function patchUnstress(base: Unstress, builder: (build: IUnstressBuilder) => IUnstressBuilder): IAny[];
export declare function buildUnstress(builder: (build: IUnstressBuilder) => IUnstressBuilder): Unstress;
export interface IOtherArticulationBuilder {
    build?: () => OtherArticulation;
    patch: () => IAny[];
    data: (data: string) => IOtherArticulationBuilder;
    defaultX: (defaultX: number) => IOtherArticulationBuilder;
    relativeY: (relativeY: number) => IOtherArticulationBuilder;
    defaultY: (defaultY: number) => IOtherArticulationBuilder;
    relativeX: (relativeX: number) => IOtherArticulationBuilder;
    fontFamily: (fontFamily: string) => IOtherArticulationBuilder;
    fontWeight: (fontWeight: NormalBold) => IOtherArticulationBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOtherArticulationBuilder;
    fontSize: (fontSize: string) => IOtherArticulationBuilder;
    color: (color: string) => IOtherArticulationBuilder;
    placement: (placement: AboveBelow) => IOtherArticulationBuilder;
}
export declare function patchOtherArticulation(base: OtherArticulation, builder: (build: IOtherArticulationBuilder) => IOtherArticulationBuilder): IAny[];
export declare function buildOtherArticulation(builder: (build: IOtherArticulationBuilder) => IOtherArticulationBuilder): OtherArticulation;
export interface IArpeggiateBuilder {
    build?: () => Arpeggiate;
    patch: () => IAny[];
    number: (number: number) => IArpeggiateBuilder;
    direction: (direction: UpDown) => IArpeggiateBuilder;
    defaultX: (defaultX: number) => IArpeggiateBuilder;
    relativeY: (relativeY: number) => IArpeggiateBuilder;
    defaultY: (defaultY: number) => IArpeggiateBuilder;
    relativeX: (relativeX: number) => IArpeggiateBuilder;
    color: (color: string) => IArpeggiateBuilder;
    placement: (placement: AboveBelow) => IArpeggiateBuilder;
}
export declare function patchArpeggiate(base: Arpeggiate, builder: (build: IArpeggiateBuilder) => IArpeggiateBuilder): IAny[];
export declare function buildArpeggiate(builder: (build: IArpeggiateBuilder) => IArpeggiateBuilder): Arpeggiate;
export interface INonArpeggiateBuilder {
    build?: () => NonArpeggiate;
    patch: () => IAny[];
    number: (number: number) => INonArpeggiateBuilder;
    type: (type: TopBottom) => INonArpeggiateBuilder;
    defaultX: (defaultX: number) => INonArpeggiateBuilder;
    relativeY: (relativeY: number) => INonArpeggiateBuilder;
    defaultY: (defaultY: number) => INonArpeggiateBuilder;
    relativeX: (relativeX: number) => INonArpeggiateBuilder;
    color: (color: string) => INonArpeggiateBuilder;
    placement: (placement: AboveBelow) => INonArpeggiateBuilder;
}
export declare function patchNonArpeggiate(base: NonArpeggiate, builder: (build: INonArpeggiateBuilder) => INonArpeggiateBuilder): IAny[];
export declare function buildNonArpeggiate(builder: (build: INonArpeggiateBuilder) => INonArpeggiateBuilder): NonArpeggiate;
export interface ILaughingBuilder {
    build?: () => Laughing;
    patch: () => IAny[];
}
export declare function patchLaughing(base: Laughing, builder: (build: ILaughingBuilder) => ILaughingBuilder): IAny[];
export declare function buildLaughing(builder: (build: ILaughingBuilder) => ILaughingBuilder): Laughing;
export interface IHummingBuilder {
    build?: () => Humming;
    patch: () => IAny[];
}
export declare function patchHumming(base: Humming, builder: (build: IHummingBuilder) => IHummingBuilder): IAny[];
export declare function buildHumming(builder: (build: IHummingBuilder) => IHummingBuilder): Humming;
export interface IEndLineBuilder {
    build?: () => EndLine;
    patch: () => IAny[];
}
export declare function patchEndLine(base: EndLine, builder: (build: IEndLineBuilder) => IEndLineBuilder): IAny[];
export declare function buildEndLine(builder: (build: IEndLineBuilder) => IEndLineBuilder): EndLine;
export interface IEndParagraphBuilder {
    build?: () => EndParagraph;
    patch: () => IAny[];
}
export declare function patchEndParagraph(base: EndParagraph, builder: (build: IEndParagraphBuilder) => IEndParagraphBuilder): IAny[];
export declare function buildEndParagraph(builder: (build: IEndParagraphBuilder) => IEndParagraphBuilder): EndParagraph;
export interface ILyricPartsBuilder {
    build?: () => LyricParts;
    patch: () => IAny[];
}
export declare function patchLyricParts(base: LyricParts, builder: (build: ILyricPartsBuilder) => ILyricPartsBuilder): IAny[];
export declare function buildLyricParts(builder: (build: ILyricPartsBuilder) => ILyricPartsBuilder): LyricParts;
export interface ILyricBuilder {
    build?: () => Lyric;
    patch: () => IAny[];
    lyricParts: (lyricParts: boolean[]) => ILyricBuilder;
    number: (number: number) => ILyricBuilder;
    name: (name: string) => ILyricBuilder;
    defaultX: (defaultX: number) => ILyricBuilder;
    relativeY: (relativeY: number) => ILyricBuilder;
    defaultY: (defaultY: number) => ILyricBuilder;
    relativeX: (relativeX: number) => ILyricBuilder;
    color: (color: string) => ILyricBuilder;
    printObject: (printObject: boolean) => ILyricBuilder;
    justify: (justify: LeftCenterRight) => ILyricBuilder;
    placement: (placement: AboveBelow) => ILyricBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => ILyricBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => ILyricBuilder;
}
export declare function patchLyric(base: Lyric, builder: (build: ILyricBuilder) => ILyricBuilder): IAny[];
export declare function buildLyric(builder: (build: ILyricBuilder) => ILyricBuilder): Lyric;
export interface ITextBuilder {
    build?: () => Text;
    patch: () => IAny[];
    data: (data: string) => ITextBuilder;
    fontFamily: (fontFamily: string) => ITextBuilder;
    fontWeight: (fontWeight: NormalBold) => ITextBuilder;
    fontStyle: (fontStyle: NormalItalic) => ITextBuilder;
    fontSize: (fontSize: string) => ITextBuilder;
    color: (color: string) => ITextBuilder;
    underline: (underline: number) => ITextBuilder;
    overline: (overline: number) => ITextBuilder;
    lineThrough: (lineThrough: number) => ITextBuilder;
    rotation: (rotation: number) => ITextBuilder;
    letterSpacing: (letterSpacing: string) => ITextBuilder;
    dir: (dir: DirectionMode) => ITextBuilder;
}
export declare function patchText(base: Text, builder: (build: ITextBuilder) => ITextBuilder): IAny[];
export declare function buildText(builder: (build: ITextBuilder) => ITextBuilder): Text;
export interface ISyllabicBuilder {
    build?: () => Syllabic;
    patch: () => IAny[];
    data: (data: SyllabicType) => ISyllabicBuilder;
    fontFamily: (fontFamily: string) => ISyllabicBuilder;
    fontWeight: (fontWeight: NormalBold) => ISyllabicBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISyllabicBuilder;
    fontSize: (fontSize: string) => ISyllabicBuilder;
    color: (color: string) => ISyllabicBuilder;
}
export declare function patchSyllabic(base: Syllabic, builder: (build: ISyllabicBuilder) => ISyllabicBuilder): IAny[];
export declare function buildSyllabic(builder: (build: ISyllabicBuilder) => ISyllabicBuilder): Syllabic;
export interface IElisionBuilder {
    build?: () => Elision;
    patch: () => IAny[];
    data: (data: string) => IElisionBuilder;
    fontFamily: (fontFamily: string) => IElisionBuilder;
    fontWeight: (fontWeight: NormalBold) => IElisionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IElisionBuilder;
    fontSize: (fontSize: string) => IElisionBuilder;
    color: (color: string) => IElisionBuilder;
}
export declare function patchElision(base: Elision, builder: (build: IElisionBuilder) => IElisionBuilder): IAny[];
export declare function buildElision(builder: (build: IElisionBuilder) => IElisionBuilder): Elision;
export interface IExtendBuilder {
    build?: () => Extend;
    patch: () => IAny[];
    type: (type: StartStopContinue) => IExtendBuilder;
    defaultX: (defaultX: number) => IExtendBuilder;
    relativeY: (relativeY: number) => IExtendBuilder;
    defaultY: (defaultY: number) => IExtendBuilder;
    relativeX: (relativeX: number) => IExtendBuilder;
    fontFamily: (fontFamily: string) => IExtendBuilder;
    fontWeight: (fontWeight: NormalBold) => IExtendBuilder;
    fontStyle: (fontStyle: NormalItalic) => IExtendBuilder;
    fontSize: (fontSize: string) => IExtendBuilder;
    color: (color: string) => IExtendBuilder;
}
export declare function patchExtend(base: Extend, builder: (build: IExtendBuilder) => IExtendBuilder): IAny[];
export declare function buildExtend(builder: (build: IExtendBuilder) => IExtendBuilder): Extend;
export interface IFiguredBassBuilder {
    build?: () => FiguredBass;
    patch: () => IAny[];
    figuresAt: (idx: number, build: Figure | ((builder: IFigureBuilder) => IFigureBuilder)) => IFiguredBassBuilder;
    figuresSplice: (start: number, deleteCount: number, ...items: Figure[]) => IFiguredBassBuilder;
    figures: (figures: Figure[]) => IFiguredBassBuilder;
    duration: (duration: number) => IFiguredBassBuilder;
    parentheses: (parentheses: boolean) => IFiguredBassBuilder;
    defaultX: (defaultX: number) => IFiguredBassBuilder;
    relativeY: (relativeY: number) => IFiguredBassBuilder;
    defaultY: (defaultY: number) => IFiguredBassBuilder;
    relativeX: (relativeX: number) => IFiguredBassBuilder;
    fontFamily: (fontFamily: string) => IFiguredBassBuilder;
    fontWeight: (fontWeight: NormalBold) => IFiguredBassBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFiguredBassBuilder;
    fontSize: (fontSize: string) => IFiguredBassBuilder;
    color: (color: string) => IFiguredBassBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IFiguredBassBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IFiguredBassBuilder;
    printDot: (printDot: boolean) => IFiguredBassBuilder;
    printLyric: (printLyric: boolean) => IFiguredBassBuilder;
    printObject: (printObject: boolean) => IFiguredBassBuilder;
    printSpacing: (printSpacing: boolean) => IFiguredBassBuilder;
}
export declare function patchFiguredBass(base: FiguredBass, builder: (build: IFiguredBassBuilder) => IFiguredBassBuilder): IAny[];
export declare function buildFiguredBass(builder: (build: IFiguredBassBuilder) => IFiguredBassBuilder): FiguredBass;
export interface IFigureBuilder {
    build?: () => Figure;
    patch: () => IAny[];
    prefix: (build: Prefix | ((builder: IPrefixBuilder) => IPrefixBuilder)) => IFigureBuilder;
    figureNumber: (build: FigureNumber | ((builder: IFigureNumberBuilder) => IFigureNumberBuilder)) => IFigureBuilder;
    extend: (build: Extend | ((builder: IExtendBuilder) => IExtendBuilder)) => IFigureBuilder;
    suffix: (build: Suffix | ((builder: ISuffixBuilder) => ISuffixBuilder)) => IFigureBuilder;
    defaultX: (defaultX: number) => IFigureBuilder;
    relativeY: (relativeY: number) => IFigureBuilder;
    defaultY: (defaultY: number) => IFigureBuilder;
    relativeX: (relativeX: number) => IFigureBuilder;
    fontFamily: (fontFamily: string) => IFigureBuilder;
    fontWeight: (fontWeight: NormalBold) => IFigureBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFigureBuilder;
    fontSize: (fontSize: string) => IFigureBuilder;
    color: (color: string) => IFigureBuilder;
}
export declare function patchFigure(base: Figure, builder: (build: IFigureBuilder) => IFigureBuilder): IAny[];
export declare function buildFigure(builder: (build: IFigureBuilder) => IFigureBuilder): Figure;
export interface IPrefixBuilder {
    build?: () => Prefix;
    patch: () => IAny[];
    data: (data: string) => IPrefixBuilder;
    defaultX: (defaultX: number) => IPrefixBuilder;
    relativeY: (relativeY: number) => IPrefixBuilder;
    defaultY: (defaultY: number) => IPrefixBuilder;
    relativeX: (relativeX: number) => IPrefixBuilder;
    fontFamily: (fontFamily: string) => IPrefixBuilder;
    fontWeight: (fontWeight: NormalBold) => IPrefixBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPrefixBuilder;
    fontSize: (fontSize: string) => IPrefixBuilder;
    color: (color: string) => IPrefixBuilder;
}
export declare function patchPrefix(base: Prefix, builder: (build: IPrefixBuilder) => IPrefixBuilder): IAny[];
export declare function buildPrefix(builder: (build: IPrefixBuilder) => IPrefixBuilder): Prefix;
export interface IFigureNumberBuilder {
    build?: () => FigureNumber;
    patch: () => IAny[];
    data: (data: string) => IFigureNumberBuilder;
    defaultX: (defaultX: number) => IFigureNumberBuilder;
    relativeY: (relativeY: number) => IFigureNumberBuilder;
    defaultY: (defaultY: number) => IFigureNumberBuilder;
    relativeX: (relativeX: number) => IFigureNumberBuilder;
    fontFamily: (fontFamily: string) => IFigureNumberBuilder;
    fontWeight: (fontWeight: NormalBold) => IFigureNumberBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFigureNumberBuilder;
    fontSize: (fontSize: string) => IFigureNumberBuilder;
    color: (color: string) => IFigureNumberBuilder;
}
export declare function patchFigureNumber(base: FigureNumber, builder: (build: IFigureNumberBuilder) => IFigureNumberBuilder): IAny[];
export declare function buildFigureNumber(builder: (build: IFigureNumberBuilder) => IFigureNumberBuilder): FigureNumber;
export interface ISuffixBuilder {
    build?: () => Suffix;
    patch: () => IAny[];
    data: (data: string) => ISuffixBuilder;
    defaultX: (defaultX: number) => ISuffixBuilder;
    relativeY: (relativeY: number) => ISuffixBuilder;
    defaultY: (defaultY: number) => ISuffixBuilder;
    relativeX: (relativeX: number) => ISuffixBuilder;
    fontFamily: (fontFamily: string) => ISuffixBuilder;
    fontWeight: (fontWeight: NormalBold) => ISuffixBuilder;
    fontStyle: (fontStyle: NormalItalic) => ISuffixBuilder;
    fontSize: (fontSize: string) => ISuffixBuilder;
    color: (color: string) => ISuffixBuilder;
}
export declare function patchSuffix(base: Suffix, builder: (build: ISuffixBuilder) => ISuffixBuilder): IAny[];
export declare function buildSuffix(builder: (build: ISuffixBuilder) => ISuffixBuilder): Suffix;
export interface IBackupBuilder {
    build?: () => Backup;
    patch: () => IAny[];
    duration: (duration: number) => IBackupBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IBackupBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IBackupBuilder;
}
export declare function patchBackup(base: Backup, builder: (build: IBackupBuilder) => IBackupBuilder): IAny[];
export declare function buildBackup(builder: (build: IBackupBuilder) => IBackupBuilder): Backup;
export interface IForwardBuilder {
    build?: () => Forward;
    patch: () => IAny[];
    duration: (duration: number) => IForwardBuilder;
    staff: (staff: number) => IForwardBuilder;
    voice: (voice: number) => IForwardBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IForwardBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IForwardBuilder;
}
export declare function patchForward(base: Forward, builder: (build: IForwardBuilder) => IForwardBuilder): IAny[];
export declare function buildForward(builder: (build: IForwardBuilder) => IForwardBuilder): Forward;
export interface IBarlineBuilder {
    build?: () => Barline;
    patch: () => IAny[];
    segno: (build: Segno | ((builder: ISegnoBuilder) => ISegnoBuilder)) => IBarlineBuilder;
    coda: (build: Coda | ((builder: ICodaBuilder) => ICodaBuilder)) => IBarlineBuilder;
    location: (location: BarlineLocation) => IBarlineBuilder;
    codaAttrib: (codaAttrib: string) => IBarlineBuilder;
    wavyLine: (build: WavyLine | ((builder: IWavyLineBuilder) => IWavyLineBuilder)) => IBarlineBuilder;
    fermatasAt: (idx: number, build: Fermata | ((builder: IFermataBuilder) => IFermataBuilder)) => IBarlineBuilder;
    fermatasSplice: (start: number, deleteCount: number, ...items: Fermata[]) => IBarlineBuilder;
    fermatas: (fermatas: Fermata[]) => IBarlineBuilder;
    segnoAttrib: (segnoAttrib: string) => IBarlineBuilder;
    divisions: (divisions: number) => IBarlineBuilder;
    barStyle: (build: BarStyle | ((builder: IBarStyleBuilder) => IBarStyleBuilder)) => IBarlineBuilder;
    ending: (build: Ending | ((builder: IEndingBuilder) => IEndingBuilder)) => IBarlineBuilder;
    repeat: (build: Repeat | ((builder: IRepeatBuilder) => IRepeatBuilder)) => IBarlineBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IBarlineBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IBarlineBuilder;
}
export declare function patchBarline(base: Barline, builder: (build: IBarlineBuilder) => IBarlineBuilder): IAny[];
export declare function buildBarline(builder: (build: IBarlineBuilder) => IBarlineBuilder): Barline;
export interface IBarStyleBuilder {
    build?: () => BarStyle;
    patch: () => IAny[];
    data: (data: BarStyleType) => IBarStyleBuilder;
    color: (color: string) => IBarStyleBuilder;
}
export declare function patchBarStyle(base: BarStyle, builder: (build: IBarStyleBuilder) => IBarStyleBuilder): IAny[];
export declare function buildBarStyle(builder: (build: IBarStyleBuilder) => IBarStyleBuilder): BarStyle;
export interface IEndingBuilder {
    build?: () => Ending;
    patch: () => IAny[];
    endLength: (endLength: number) => IEndingBuilder;
    textX: (textX: number) => IEndingBuilder;
    number: (number: number) => IEndingBuilder;
    textY: (textY: number) => IEndingBuilder;
    type: (type: StartStopDiscontinue) => IEndingBuilder;
    ending: (ending: string) => IEndingBuilder;
    defaultX: (defaultX: number) => IEndingBuilder;
    relativeY: (relativeY: number) => IEndingBuilder;
    defaultY: (defaultY: number) => IEndingBuilder;
    relativeX: (relativeX: number) => IEndingBuilder;
    fontFamily: (fontFamily: string) => IEndingBuilder;
    fontWeight: (fontWeight: NormalBold) => IEndingBuilder;
    fontStyle: (fontStyle: NormalItalic) => IEndingBuilder;
    fontSize: (fontSize: string) => IEndingBuilder;
    color: (color: string) => IEndingBuilder;
    printObject: (printObject: boolean) => IEndingBuilder;
}
export declare function patchEnding(base: Ending, builder: (build: IEndingBuilder) => IEndingBuilder): IAny[];
export declare function buildEnding(builder: (build: IEndingBuilder) => IEndingBuilder): Ending;
export interface IRepeatBuilder {
    build?: () => Repeat;
    patch: () => IAny[];
    times: (times: string) => IRepeatBuilder;
    winged: (winged: WingedType) => IRepeatBuilder;
    direction: (direction: DirectionTypeBg) => IRepeatBuilder;
}
export declare function patchRepeat(base: Repeat, builder: (build: IRepeatBuilder) => IRepeatBuilder): IAny[];
export declare function buildRepeat(builder: (build: IRepeatBuilder) => IRepeatBuilder): Repeat;
export interface IDirectionBuilder {
    build?: () => Direction;
    patch: () => IAny[];
    directionTypesAt: (idx: number, build: DirectionType | ((builder: IDirectionTypeBuilder) => IDirectionTypeBuilder)) => IDirectionBuilder;
    directionTypesSplice: (start: number, deleteCount: number, ...items: DirectionType[]) => IDirectionBuilder;
    directionTypes: (directionTypes: DirectionType[]) => IDirectionBuilder;
    staff: (staff: number) => IDirectionBuilder;
    offset: (build: Offset | ((builder: IOffsetBuilder) => IOffsetBuilder)) => IDirectionBuilder;
    sound: (build: Sound | ((builder: ISoundBuilder) => ISoundBuilder)) => IDirectionBuilder;
    placement: (placement: AboveBelow) => IDirectionBuilder;
    voice: (voice: number) => IDirectionBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IDirectionBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IDirectionBuilder;
    directive: (directive: boolean) => IDirectionBuilder;
}
export declare function patchDirection(base: Direction, builder: (build: IDirectionBuilder) => IDirectionBuilder): IAny[];
export declare function buildDirection(builder: (build: IDirectionBuilder) => IDirectionBuilder): Direction;
export interface IDirectionTypeBuilder {
    build?: () => DirectionType;
    patch: () => IAny[];
    percussionsAt: (idx: number, build: Percussion | ((builder: IPercussionBuilder) => IPercussionBuilder)) => IDirectionTypeBuilder;
    percussionsSplice: (start: number, deleteCount: number, ...items: Percussion[]) => IDirectionTypeBuilder;
    percussions: (percussions: Percussion[]) => IDirectionTypeBuilder;
    rehearsalsAt: (idx: number, build: Rehearsal | ((builder: IRehearsalBuilder) => IRehearsalBuilder)) => IDirectionTypeBuilder;
    rehearsalsSplice: (start: number, deleteCount: number, ...items: Rehearsal[]) => IDirectionTypeBuilder;
    rehearsals: (rehearsals: Rehearsal[]) => IDirectionTypeBuilder;
    pedal: (build: Pedal | ((builder: IPedalBuilder) => IPedalBuilder)) => IDirectionTypeBuilder;
    principalVoice: (build: PrincipalVoice | ((builder: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder)) => IDirectionTypeBuilder;
    accordionRegistration: (build: AccordionRegistration | ((builder: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder)) => IDirectionTypeBuilder;
    eyeglasses: (build: Eyeglasses | ((builder: IEyeglassesBuilder) => IEyeglassesBuilder)) => IDirectionTypeBuilder;
    image: (build: Image | ((builder: IImageBuilder) => IImageBuilder)) => IDirectionTypeBuilder;
    harpPedals: (build: HarpPedals | ((builder: IHarpPedalsBuilder) => IHarpPedalsBuilder)) => IDirectionTypeBuilder;
    metronome: (build: Metronome | ((builder: IMetronomeBuilder) => IMetronomeBuilder)) => IDirectionTypeBuilder;
    otherDirection: (build: OtherDirection | ((builder: IOtherDirectionBuilder) => IOtherDirectionBuilder)) => IDirectionTypeBuilder;
    segnosAt: (idx: number, build: Segno | ((builder: ISegnoBuilder) => ISegnoBuilder)) => IDirectionTypeBuilder;
    segnosSplice: (start: number, deleteCount: number, ...items: Segno[]) => IDirectionTypeBuilder;
    segnos: (segnos: Segno[]) => IDirectionTypeBuilder;
    scordatura: (build: Scordatura | ((builder: IScordaturaBuilder) => IScordaturaBuilder)) => IDirectionTypeBuilder;
    stringMute: (build: StringMute | ((builder: IStringMuteBuilder) => IStringMuteBuilder)) => IDirectionTypeBuilder;
    wedge: (build: Wedge | ((builder: IWedgeBuilder) => IWedgeBuilder)) => IDirectionTypeBuilder;
    dashes: (build: Dashes | ((builder: IDashesBuilder) => IDashesBuilder)) => IDirectionTypeBuilder;
    damp: (build: Damp | ((builder: IDampBuilder) => IDampBuilder)) => IDirectionTypeBuilder;
    bracket: (build: Bracket | ((builder: IBracketBuilder) => IBracketBuilder)) => IDirectionTypeBuilder;
    dynamics: (build: Dynamics | ((builder: IDynamicsBuilder) => IDynamicsBuilder)) => IDirectionTypeBuilder;
    octaveShift: (build: OctaveShift | ((builder: IOctaveShiftBuilder) => IOctaveShiftBuilder)) => IDirectionTypeBuilder;
    wordsAt: (idx: number, build: Words | ((builder: IWordsBuilder) => IWordsBuilder)) => IDirectionTypeBuilder;
    wordsSplice: (start: number, deleteCount: number, ...items: Words[]) => IDirectionTypeBuilder;
    words: (words: Words[]) => IDirectionTypeBuilder;
    dampAll: (build: DampAll | ((builder: IDampAllBuilder) => IDampAllBuilder)) => IDirectionTypeBuilder;
    codasAt: (idx: number, build: Coda | ((builder: ICodaBuilder) => ICodaBuilder)) => IDirectionTypeBuilder;
    codasSplice: (start: number, deleteCount: number, ...items: Coda[]) => IDirectionTypeBuilder;
    codas: (codas: Coda[]) => IDirectionTypeBuilder;
}
export declare function patchDirectionType(base: DirectionType, builder: (build: IDirectionTypeBuilder) => IDirectionTypeBuilder): IAny[];
export declare function buildDirectionType(builder: (build: IDirectionTypeBuilder) => IDirectionTypeBuilder): DirectionType;
export interface IRehearsalBuilder {
    build?: () => Rehearsal;
    patch: () => IAny[];
    data: (data: string) => IRehearsalBuilder;
    justify: (justify: LeftCenterRight) => IRehearsalBuilder;
    defaultX: (defaultX: number) => IRehearsalBuilder;
    relativeY: (relativeY: number) => IRehearsalBuilder;
    defaultY: (defaultY: number) => IRehearsalBuilder;
    relativeX: (relativeX: number) => IRehearsalBuilder;
    fontFamily: (fontFamily: string) => IRehearsalBuilder;
    fontWeight: (fontWeight: NormalBold) => IRehearsalBuilder;
    fontStyle: (fontStyle: NormalItalic) => IRehearsalBuilder;
    fontSize: (fontSize: string) => IRehearsalBuilder;
    color: (color: string) => IRehearsalBuilder;
    halign: (halign: LeftCenterRight) => IRehearsalBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IRehearsalBuilder;
    underline: (underline: number) => IRehearsalBuilder;
    overline: (overline: number) => IRehearsalBuilder;
    lineThrough: (lineThrough: number) => IRehearsalBuilder;
    rotation: (rotation: number) => IRehearsalBuilder;
    letterSpacing: (letterSpacing: string) => IRehearsalBuilder;
    lineHeight: (lineHeight: string) => IRehearsalBuilder;
    dir: (dir: DirectionMode) => IRehearsalBuilder;
    enclosure: (enclosure: EnclosureShape) => IRehearsalBuilder;
}
export declare function patchRehearsal(base: Rehearsal, builder: (build: IRehearsalBuilder) => IRehearsalBuilder): IAny[];
export declare function buildRehearsal(builder: (build: IRehearsalBuilder) => IRehearsalBuilder): Rehearsal;
export interface IWordsBuilder {
    build?: () => Words;
    patch: () => IAny[];
    data: (data: string) => IWordsBuilder;
    justify: (justify: LeftCenterRight) => IWordsBuilder;
    defaultX: (defaultX: number) => IWordsBuilder;
    relativeY: (relativeY: number) => IWordsBuilder;
    defaultY: (defaultY: number) => IWordsBuilder;
    relativeX: (relativeX: number) => IWordsBuilder;
    fontFamily: (fontFamily: string) => IWordsBuilder;
    fontWeight: (fontWeight: NormalBold) => IWordsBuilder;
    fontStyle: (fontStyle: NormalItalic) => IWordsBuilder;
    fontSize: (fontSize: string) => IWordsBuilder;
    color: (color: string) => IWordsBuilder;
    halign: (halign: LeftCenterRight) => IWordsBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IWordsBuilder;
    underline: (underline: number) => IWordsBuilder;
    overline: (overline: number) => IWordsBuilder;
    lineThrough: (lineThrough: number) => IWordsBuilder;
    rotation: (rotation: number) => IWordsBuilder;
    letterSpacing: (letterSpacing: string) => IWordsBuilder;
    lineHeight: (lineHeight: string) => IWordsBuilder;
    dir: (dir: DirectionMode) => IWordsBuilder;
    enclosure: (enclosure: EnclosureShape) => IWordsBuilder;
}
export declare function patchWords(base: Words, builder: (build: IWordsBuilder) => IWordsBuilder): IAny[];
export declare function buildWords(builder: (build: IWordsBuilder) => IWordsBuilder): Words;
export interface IWedgeBuilder {
    build?: () => Wedge;
    patch: () => IAny[];
    number: (number: number) => IWedgeBuilder;
    niente: (niente: boolean) => IWedgeBuilder;
    type: (type: WedgeType) => IWedgeBuilder;
    spread: (spread: number) => IWedgeBuilder;
    defaultX: (defaultX: number) => IWedgeBuilder;
    relativeY: (relativeY: number) => IWedgeBuilder;
    defaultY: (defaultY: number) => IWedgeBuilder;
    relativeX: (relativeX: number) => IWedgeBuilder;
    color: (color: string) => IWedgeBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IWedgeBuilder;
    dashLength: (dashLength: number) => IWedgeBuilder;
    spaceLength: (spaceLength: number) => IWedgeBuilder;
}
export declare function patchWedge(base: Wedge, builder: (build: IWedgeBuilder) => IWedgeBuilder): IAny[];
export declare function buildWedge(builder: (build: IWedgeBuilder) => IWedgeBuilder): Wedge;
export interface IDashesBuilder {
    build?: () => Dashes;
    patch: () => IAny[];
    number: (number: number) => IDashesBuilder;
    type: (type: StartStopContinue) => IDashesBuilder;
    defaultX: (defaultX: number) => IDashesBuilder;
    relativeY: (relativeY: number) => IDashesBuilder;
    defaultY: (defaultY: number) => IDashesBuilder;
    relativeX: (relativeX: number) => IDashesBuilder;
    color: (color: string) => IDashesBuilder;
    dashLength: (dashLength: number) => IDashesBuilder;
    spaceLength: (spaceLength: number) => IDashesBuilder;
}
export declare function patchDashes(base: Dashes, builder: (build: IDashesBuilder) => IDashesBuilder): IAny[];
export declare function buildDashes(builder: (build: IDashesBuilder) => IDashesBuilder): Dashes;
export interface IBracketBuilder {
    build?: () => Bracket;
    patch: () => IAny[];
    endLength: (endLength: number) => IBracketBuilder;
    number: (number: number) => IBracketBuilder;
    type: (type: StartStopContinue) => IBracketBuilder;
    lineEnd: (lineEnd: LineEndType) => IBracketBuilder;
    defaultX: (defaultX: number) => IBracketBuilder;
    relativeY: (relativeY: number) => IBracketBuilder;
    defaultY: (defaultY: number) => IBracketBuilder;
    relativeX: (relativeX: number) => IBracketBuilder;
    color: (color: string) => IBracketBuilder;
    lineType: (lineType: SolidDashedDottedWavy) => IBracketBuilder;
    dashLength: (dashLength: number) => IBracketBuilder;
    spaceLength: (spaceLength: number) => IBracketBuilder;
}
export declare function patchBracket(base: Bracket, builder: (build: IBracketBuilder) => IBracketBuilder): IAny[];
export declare function buildBracket(builder: (build: IBracketBuilder) => IBracketBuilder): Bracket;
export interface IPedalBuilder {
    build?: () => Pedal;
    patch: () => IAny[];
    line: (line: boolean) => IPedalBuilder;
    sign: (sign: boolean) => IPedalBuilder;
    type: (type: PedalType) => IPedalBuilder;
    defaultX: (defaultX: number) => IPedalBuilder;
    relativeY: (relativeY: number) => IPedalBuilder;
    defaultY: (defaultY: number) => IPedalBuilder;
    relativeX: (relativeX: number) => IPedalBuilder;
    fontFamily: (fontFamily: string) => IPedalBuilder;
    fontWeight: (fontWeight: NormalBold) => IPedalBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPedalBuilder;
    fontSize: (fontSize: string) => IPedalBuilder;
    color: (color: string) => IPedalBuilder;
    halign: (halign: LeftCenterRight) => IPedalBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IPedalBuilder;
}
export declare function patchPedal(base: Pedal, builder: (build: IPedalBuilder) => IPedalBuilder): IAny[];
export declare function buildPedal(builder: (build: IPedalBuilder) => IPedalBuilder): Pedal;
export interface IMetronomeBuilder {
    build?: () => Metronome;
    patch: () => IAny[];
    metronomeNotesAt: (idx: number, build: MetronomeNote | ((builder: IMetronomeNoteBuilder) => IMetronomeNoteBuilder)) => IMetronomeBuilder;
    metronomeNotesSplice: (start: number, deleteCount: number, ...items: MetronomeNote[]) => IMetronomeBuilder;
    metronomeNotes: (metronomeNotes: MetronomeNote[]) => IMetronomeBuilder;
    perMinute: (build: PerMinute | ((builder: IPerMinuteBuilder) => IPerMinuteBuilder)) => IMetronomeBuilder;
    parentheses: (parentheses: boolean) => IMetronomeBuilder;
    beatUnit: (beatUnit: string) => IMetronomeBuilder;
    beatUnitDotsAt: (idx: number, build: BeatUnitDot | ((builder: IBeatUnitDotBuilder) => IBeatUnitDotBuilder)) => IMetronomeBuilder;
    beatUnitDotsSplice: (start: number, deleteCount: number, ...items: BeatUnitDot[]) => IMetronomeBuilder;
    beatUnitDots: (beatUnitDots: BeatUnitDot[]) => IMetronomeBuilder;
    beatUnitChange: (beatUnitChange: string) => IMetronomeBuilder;
    beatUnitDotsChangeAt: (idx: number, build: BeatUnitDot | ((builder: IBeatUnitDotBuilder) => IBeatUnitDotBuilder)) => IMetronomeBuilder;
    beatUnitDotsChangeSplice: (start: number, deleteCount: number, ...items: BeatUnitDot[]) => IMetronomeBuilder;
    beatUnitDotsChange: (beatUnitDotsChange: BeatUnitDot[]) => IMetronomeBuilder;
    metronomeRelation: (metronomeRelation: string) => IMetronomeBuilder;
    justify: (justify: LeftCenterRight) => IMetronomeBuilder;
    defaultX: (defaultX: number) => IMetronomeBuilder;
    relativeY: (relativeY: number) => IMetronomeBuilder;
    defaultY: (defaultY: number) => IMetronomeBuilder;
    relativeX: (relativeX: number) => IMetronomeBuilder;
    fontFamily: (fontFamily: string) => IMetronomeBuilder;
    fontWeight: (fontWeight: NormalBold) => IMetronomeBuilder;
    fontStyle: (fontStyle: NormalItalic) => IMetronomeBuilder;
    fontSize: (fontSize: string) => IMetronomeBuilder;
    color: (color: string) => IMetronomeBuilder;
    halign: (halign: LeftCenterRight) => IMetronomeBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IMetronomeBuilder;
}
export declare function patchMetronome(base: Metronome, builder: (build: IMetronomeBuilder) => IMetronomeBuilder): IAny[];
export declare function buildMetronome(builder: (build: IMetronomeBuilder) => IMetronomeBuilder): Metronome;
export interface IBeatUnitDotBuilder {
    build?: () => BeatUnitDot;
    patch: () => IAny[];
}
export declare function patchBeatUnitDot(base: BeatUnitDot, builder: (build: IBeatUnitDotBuilder) => IBeatUnitDotBuilder): IAny[];
export declare function buildBeatUnitDot(builder: (build: IBeatUnitDotBuilder) => IBeatUnitDotBuilder): BeatUnitDot;
export interface IPerMinuteBuilder {
    build?: () => PerMinute;
    patch: () => IAny[];
    data: (data: string) => IPerMinuteBuilder;
    fontFamily: (fontFamily: string) => IPerMinuteBuilder;
    fontWeight: (fontWeight: NormalBold) => IPerMinuteBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPerMinuteBuilder;
    fontSize: (fontSize: string) => IPerMinuteBuilder;
}
export declare function patchPerMinute(base: PerMinute, builder: (build: IPerMinuteBuilder) => IPerMinuteBuilder): IAny[];
export declare function buildPerMinute(builder: (build: IPerMinuteBuilder) => IPerMinuteBuilder): PerMinute;
export interface IMetronomeNoteBuilder {
    build?: () => MetronomeNote;
    patch: () => IAny[];
    metronomeDotsAt: (idx: number, build: MetronomeDot | ((builder: IMetronomeDotBuilder) => IMetronomeDotBuilder)) => IMetronomeNoteBuilder;
    metronomeDotsSplice: (start: number, deleteCount: number, ...items: MetronomeDot[]) => IMetronomeNoteBuilder;
    metronomeDots: (metronomeDots: MetronomeDot[]) => IMetronomeNoteBuilder;
    metronomeBeamsAt: (idx: number, build: MetronomeBeam | ((builder: IMetronomeBeamBuilder) => IMetronomeBeamBuilder)) => IMetronomeNoteBuilder;
    metronomeBeamsSplice: (start: number, deleteCount: number, ...items: MetronomeBeam[]) => IMetronomeNoteBuilder;
    metronomeBeams: (metronomeBeams: MetronomeBeam[]) => IMetronomeNoteBuilder;
    metronomeType: (metronomeType: string) => IMetronomeNoteBuilder;
    metronomeTuplet: (build: MetronomeTuplet | ((builder: IMetronomeTupletBuilder) => IMetronomeTupletBuilder)) => IMetronomeNoteBuilder;
}
export declare function patchMetronomeNote(base: MetronomeNote, builder: (build: IMetronomeNoteBuilder) => IMetronomeNoteBuilder): IAny[];
export declare function buildMetronomeNote(builder: (build: IMetronomeNoteBuilder) => IMetronomeNoteBuilder): MetronomeNote;
export interface IMetronomeDotBuilder {
    build?: () => MetronomeDot;
    patch: () => IAny[];
}
export declare function patchMetronomeDot(base: MetronomeDot, builder: (build: IMetronomeDotBuilder) => IMetronomeDotBuilder): IAny[];
export declare function buildMetronomeDot(builder: (build: IMetronomeDotBuilder) => IMetronomeDotBuilder): MetronomeDot;
export interface IMetronomeBeamBuilder {
    build?: () => MetronomeBeam;
    patch: () => IAny[];
    number: (number: number) => IMetronomeBeamBuilder;
    data: (data: string) => IMetronomeBeamBuilder;
}
export declare function patchMetronomeBeam(base: MetronomeBeam, builder: (build: IMetronomeBeamBuilder) => IMetronomeBeamBuilder): IAny[];
export declare function buildMetronomeBeam(builder: (build: IMetronomeBeamBuilder) => IMetronomeBeamBuilder): MetronomeBeam;
export interface IMetronomeTupletBuilder {
    build?: () => MetronomeTuplet;
    patch: () => IAny[];
    actualNotes: (actualNotes: number) => IMetronomeTupletBuilder;
    bracket: (bracket: boolean) => IMetronomeTupletBuilder;
    showNumber: (showNumber: ActualBothNone) => IMetronomeTupletBuilder;
    normalType: (normalType: string) => IMetronomeTupletBuilder;
    type: (type: StartStop) => IMetronomeTupletBuilder;
    normalNotes: (normalNotes: number) => IMetronomeTupletBuilder;
    normalDotsAt: (idx: number, build: NormalDot | ((builder: INormalDotBuilder) => INormalDotBuilder)) => IMetronomeTupletBuilder;
    normalDotsSplice: (start: number, deleteCount: number, ...items: NormalDot[]) => IMetronomeTupletBuilder;
    normalDots: (normalDots: NormalDot[]) => IMetronomeTupletBuilder;
}
export declare function patchMetronomeTuplet(base: MetronomeTuplet, builder: (build: IMetronomeTupletBuilder) => IMetronomeTupletBuilder): IAny[];
export declare function buildMetronomeTuplet(builder: (build: IMetronomeTupletBuilder) => IMetronomeTupletBuilder): MetronomeTuplet;
export interface IOctaveShiftBuilder {
    build?: () => OctaveShift;
    patch: () => IAny[];
    number: (number: number) => IOctaveShiftBuilder;
    size: (size: number) => IOctaveShiftBuilder;
    type: (type: OctaveShiftType) => IOctaveShiftBuilder;
    defaultX: (defaultX: number) => IOctaveShiftBuilder;
    relativeY: (relativeY: number) => IOctaveShiftBuilder;
    defaultY: (defaultY: number) => IOctaveShiftBuilder;
    relativeX: (relativeX: number) => IOctaveShiftBuilder;
    fontFamily: (fontFamily: string) => IOctaveShiftBuilder;
    fontWeight: (fontWeight: NormalBold) => IOctaveShiftBuilder;
    fontStyle: (fontStyle: NormalItalic) => IOctaveShiftBuilder;
    fontSize: (fontSize: string) => IOctaveShiftBuilder;
    color: (color: string) => IOctaveShiftBuilder;
    dashLength: (dashLength: number) => IOctaveShiftBuilder;
    spaceLength: (spaceLength: number) => IOctaveShiftBuilder;
}
export declare function patchOctaveShift(base: OctaveShift, builder: (build: IOctaveShiftBuilder) => IOctaveShiftBuilder): IAny[];
export declare function buildOctaveShift(builder: (build: IOctaveShiftBuilder) => IOctaveShiftBuilder): OctaveShift;
export interface IHarpPedalsBuilder {
    build?: () => HarpPedals;
    patch: () => IAny[];
    pedalTuningsAt: (idx: number, build: PedalTuning | ((builder: IPedalTuningBuilder) => IPedalTuningBuilder)) => IHarpPedalsBuilder;
    pedalTuningsSplice: (start: number, deleteCount: number, ...items: PedalTuning[]) => IHarpPedalsBuilder;
    pedalTunings: (pedalTunings: PedalTuning[]) => IHarpPedalsBuilder;
    defaultX: (defaultX: number) => IHarpPedalsBuilder;
    relativeY: (relativeY: number) => IHarpPedalsBuilder;
    defaultY: (defaultY: number) => IHarpPedalsBuilder;
    relativeX: (relativeX: number) => IHarpPedalsBuilder;
    fontFamily: (fontFamily: string) => IHarpPedalsBuilder;
    fontWeight: (fontWeight: NormalBold) => IHarpPedalsBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHarpPedalsBuilder;
    fontSize: (fontSize: string) => IHarpPedalsBuilder;
    color: (color: string) => IHarpPedalsBuilder;
    halign: (halign: LeftCenterRight) => IHarpPedalsBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IHarpPedalsBuilder;
}
export declare function patchHarpPedals(base: HarpPedals, builder: (build: IHarpPedalsBuilder) => IHarpPedalsBuilder): IAny[];
export declare function buildHarpPedals(builder: (build: IHarpPedalsBuilder) => IHarpPedalsBuilder): HarpPedals;
export interface IPedalTuningBuilder {
    build?: () => PedalTuning;
    patch: () => IAny[];
    pedalStep: (pedalStep: string) => IPedalTuningBuilder;
    pedalAlter: (pedalAlter: string) => IPedalTuningBuilder;
}
export declare function patchPedalTuning(base: PedalTuning, builder: (build: IPedalTuningBuilder) => IPedalTuningBuilder): IAny[];
export declare function buildPedalTuning(builder: (build: IPedalTuningBuilder) => IPedalTuningBuilder): PedalTuning;
export interface IDampBuilder {
    build?: () => Damp;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDampBuilder;
    relativeY: (relativeY: number) => IDampBuilder;
    defaultY: (defaultY: number) => IDampBuilder;
    relativeX: (relativeX: number) => IDampBuilder;
    fontFamily: (fontFamily: string) => IDampBuilder;
    fontWeight: (fontWeight: NormalBold) => IDampBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDampBuilder;
    fontSize: (fontSize: string) => IDampBuilder;
    color: (color: string) => IDampBuilder;
    halign: (halign: LeftCenterRight) => IDampBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IDampBuilder;
}
export declare function patchDamp(base: Damp, builder: (build: IDampBuilder) => IDampBuilder): IAny[];
export declare function buildDamp(builder: (build: IDampBuilder) => IDampBuilder): Damp;
export interface IDampAllBuilder {
    build?: () => DampAll;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IDampAllBuilder;
    relativeY: (relativeY: number) => IDampAllBuilder;
    defaultY: (defaultY: number) => IDampAllBuilder;
    relativeX: (relativeX: number) => IDampAllBuilder;
    fontFamily: (fontFamily: string) => IDampAllBuilder;
    fontWeight: (fontWeight: NormalBold) => IDampAllBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDampAllBuilder;
    fontSize: (fontSize: string) => IDampAllBuilder;
    color: (color: string) => IDampAllBuilder;
    halign: (halign: LeftCenterRight) => IDampAllBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IDampAllBuilder;
}
export declare function patchDampAll(base: DampAll, builder: (build: IDampAllBuilder) => IDampAllBuilder): IAny[];
export declare function buildDampAll(builder: (build: IDampAllBuilder) => IDampAllBuilder): DampAll;
export interface IEyeglassesBuilder {
    build?: () => Eyeglasses;
    patch: () => IAny[];
    defaultX: (defaultX: number) => IEyeglassesBuilder;
    relativeY: (relativeY: number) => IEyeglassesBuilder;
    defaultY: (defaultY: number) => IEyeglassesBuilder;
    relativeX: (relativeX: number) => IEyeglassesBuilder;
    fontFamily: (fontFamily: string) => IEyeglassesBuilder;
    fontWeight: (fontWeight: NormalBold) => IEyeglassesBuilder;
    fontStyle: (fontStyle: NormalItalic) => IEyeglassesBuilder;
    fontSize: (fontSize: string) => IEyeglassesBuilder;
    color: (color: string) => IEyeglassesBuilder;
    halign: (halign: LeftCenterRight) => IEyeglassesBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IEyeglassesBuilder;
}
export declare function patchEyeglasses(base: Eyeglasses, builder: (build: IEyeglassesBuilder) => IEyeglassesBuilder): IAny[];
export declare function buildEyeglasses(builder: (build: IEyeglassesBuilder) => IEyeglassesBuilder): Eyeglasses;
export interface IStringMuteBuilder {
    build?: () => StringMute;
    patch: () => IAny[];
    type: (type: string) => IStringMuteBuilder;
    defaultX: (defaultX: number) => IStringMuteBuilder;
    relativeY: (relativeY: number) => IStringMuteBuilder;
    defaultY: (defaultY: number) => IStringMuteBuilder;
    relativeX: (relativeX: number) => IStringMuteBuilder;
    fontFamily: (fontFamily: string) => IStringMuteBuilder;
    fontWeight: (fontWeight: NormalBold) => IStringMuteBuilder;
    fontStyle: (fontStyle: NormalItalic) => IStringMuteBuilder;
    fontSize: (fontSize: string) => IStringMuteBuilder;
    color: (color: string) => IStringMuteBuilder;
    halign: (halign: LeftCenterRight) => IStringMuteBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IStringMuteBuilder;
}
export declare function patchStringMute(base: StringMute, builder: (build: IStringMuteBuilder) => IStringMuteBuilder): IAny[];
export declare function buildStringMute(builder: (build: IStringMuteBuilder) => IStringMuteBuilder): StringMute;
export interface IScordaturaBuilder {
    build?: () => Scordatura;
    patch: () => IAny[];
    accordsAt: (idx: number, build: Accord | ((builder: IAccordBuilder) => IAccordBuilder)) => IScordaturaBuilder;
    accordsSplice: (start: number, deleteCount: number, ...items: Accord[]) => IScordaturaBuilder;
    accords: (accords: Accord[]) => IScordaturaBuilder;
}
export declare function patchScordatura(base: Scordatura, builder: (build: IScordaturaBuilder) => IScordaturaBuilder): IAny[];
export declare function buildScordatura(builder: (build: IScordaturaBuilder) => IScordaturaBuilder): Scordatura;
export interface IAccordBuilder {
    build?: () => Accord;
    patch: () => IAny[];
    tuningAlter: (tuningAlter: string) => IAccordBuilder;
    string: (string: string) => IAccordBuilder;
    tuningStep: (tuningStep: string) => IAccordBuilder;
    tuningOctave: (tuningOctave: string) => IAccordBuilder;
}
export declare function patchAccord(base: Accord, builder: (build: IAccordBuilder) => IAccordBuilder): IAny[];
export declare function buildAccord(builder: (build: IAccordBuilder) => IAccordBuilder): Accord;
export interface IImageBuilder {
    build?: () => Image;
    patch: () => IAny[];
    type: (type: string) => IImageBuilder;
    source: (source: string) => IImageBuilder;
    defaultX: (defaultX: number) => IImageBuilder;
    relativeY: (relativeY: number) => IImageBuilder;
    defaultY: (defaultY: number) => IImageBuilder;
    relativeX: (relativeX: number) => IImageBuilder;
    halign: (halign: LeftCenterRight) => IImageBuilder;
    valignImage: (valignImage: TopMiddleBottomBaseline) => IImageBuilder;
}
export declare function patchImage(base: Image, builder: (build: IImageBuilder) => IImageBuilder): IAny[];
export declare function buildImage(builder: (build: IImageBuilder) => IImageBuilder): Image;
export interface IPrincipalVoiceBuilder {
    build?: () => PrincipalVoice;
    patch: () => IAny[];
    symbol: (symbol: VoiceSymbol) => IPrincipalVoiceBuilder;
    data: (data: string) => IPrincipalVoiceBuilder;
    type: (type: StartStop) => IPrincipalVoiceBuilder;
    defaultX: (defaultX: number) => IPrincipalVoiceBuilder;
    relativeY: (relativeY: number) => IPrincipalVoiceBuilder;
    defaultY: (defaultY: number) => IPrincipalVoiceBuilder;
    relativeX: (relativeX: number) => IPrincipalVoiceBuilder;
    fontFamily: (fontFamily: string) => IPrincipalVoiceBuilder;
    fontWeight: (fontWeight: NormalBold) => IPrincipalVoiceBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPrincipalVoiceBuilder;
    fontSize: (fontSize: string) => IPrincipalVoiceBuilder;
    color: (color: string) => IPrincipalVoiceBuilder;
    halign: (halign: LeftCenterRight) => IPrincipalVoiceBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IPrincipalVoiceBuilder;
}
export declare function patchPrincipalVoice(base: PrincipalVoice, builder: (build: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder): IAny[];
export declare function buildPrincipalVoice(builder: (build: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder): PrincipalVoice;
export interface IAccordionRegistrationBuilder {
    build?: () => AccordionRegistration;
    patch: () => IAny[];
    accordionMiddle: (accordionMiddle: string) => IAccordionRegistrationBuilder;
    accordionHigh: (accordionHigh: boolean) => IAccordionRegistrationBuilder;
    accordionLow: (accordionLow: boolean) => IAccordionRegistrationBuilder;
    defaultX: (defaultX: number) => IAccordionRegistrationBuilder;
    relativeY: (relativeY: number) => IAccordionRegistrationBuilder;
    defaultY: (defaultY: number) => IAccordionRegistrationBuilder;
    relativeX: (relativeX: number) => IAccordionRegistrationBuilder;
    fontFamily: (fontFamily: string) => IAccordionRegistrationBuilder;
    fontWeight: (fontWeight: NormalBold) => IAccordionRegistrationBuilder;
    fontStyle: (fontStyle: NormalItalic) => IAccordionRegistrationBuilder;
    fontSize: (fontSize: string) => IAccordionRegistrationBuilder;
    color: (color: string) => IAccordionRegistrationBuilder;
    halign: (halign: LeftCenterRight) => IAccordionRegistrationBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IAccordionRegistrationBuilder;
}
export declare function patchAccordionRegistration(base: AccordionRegistration, builder: (build: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder): IAny[];
export declare function buildAccordionRegistration(builder: (build: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder): AccordionRegistration;
export interface IPercussionBuilder {
    build?: () => Percussion;
    patch: () => IAny[];
    stickLocation: (stickLocation: string) => IPercussionBuilder;
    otherPercussion: (otherPercussion: string) => IPercussionBuilder;
    wood: (wood: string) => IPercussionBuilder;
    effect: (effect: string) => IPercussionBuilder;
    glass: (glass: string) => IPercussionBuilder;
    timpani: (build: Timpani | ((builder: ITimpaniBuilder) => ITimpaniBuilder)) => IPercussionBuilder;
    stick: (build: Stick | ((builder: IStickBuilder) => IStickBuilder)) => IPercussionBuilder;
    metal: (metal: string) => IPercussionBuilder;
    pitched: (pitched: string) => IPercussionBuilder;
    membrane: (membrane: string) => IPercussionBuilder;
    beater: (build: Beater | ((builder: IBeaterBuilder) => IBeaterBuilder)) => IPercussionBuilder;
    defaultX: (defaultX: number) => IPercussionBuilder;
    relativeY: (relativeY: number) => IPercussionBuilder;
    defaultY: (defaultY: number) => IPercussionBuilder;
    relativeX: (relativeX: number) => IPercussionBuilder;
    fontFamily: (fontFamily: string) => IPercussionBuilder;
    fontWeight: (fontWeight: NormalBold) => IPercussionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPercussionBuilder;
    fontSize: (fontSize: string) => IPercussionBuilder;
    color: (color: string) => IPercussionBuilder;
    halign: (halign: LeftCenterRight) => IPercussionBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IPercussionBuilder;
    enclosure: (enclosure: EnclosureShape) => IPercussionBuilder;
}
export declare function patchPercussion(base: Percussion, builder: (build: IPercussionBuilder) => IPercussionBuilder): IAny[];
export declare function buildPercussion(builder: (build: IPercussionBuilder) => IPercussionBuilder): Percussion;
export interface ITimpaniBuilder {
    build?: () => Timpani;
    patch: () => IAny[];
}
export declare function patchTimpani(base: Timpani, builder: (build: ITimpaniBuilder) => ITimpaniBuilder): IAny[];
export declare function buildTimpani(builder: (build: ITimpaniBuilder) => ITimpaniBuilder): Timpani;
export interface IBeaterBuilder {
    build?: () => Beater;
    patch: () => IAny[];
    data: (data: string) => IBeaterBuilder;
    tip: (tip: TipDirection) => IBeaterBuilder;
}
export declare function patchBeater(base: Beater, builder: (build: IBeaterBuilder) => IBeaterBuilder): IAny[];
export declare function buildBeater(builder: (build: IBeaterBuilder) => IBeaterBuilder): Beater;
export interface IStickBuilder {
    build?: () => Stick;
    patch: () => IAny[];
    stickMaterial: (stickMaterial: string) => IStickBuilder;
    stickType: (stickType: string) => IStickBuilder;
    tip: (tip: TipDirection) => IStickBuilder;
}
export declare function patchStick(base: Stick, builder: (build: IStickBuilder) => IStickBuilder): IAny[];
export declare function buildStick(builder: (build: IStickBuilder) => IStickBuilder): Stick;
export interface IOffsetBuilder {
    build?: () => Offset;
    patch: () => IAny[];
    data: (data: string) => IOffsetBuilder;
    sound: (sound: boolean) => IOffsetBuilder;
}
export declare function patchOffset(base: Offset, builder: (build: IOffsetBuilder) => IOffsetBuilder): IAny[];
export declare function buildOffset(builder: (build: IOffsetBuilder) => IOffsetBuilder): Offset;
export interface IHarmonyChordBuilder {
    build?: () => HarmonyChord;
    patch: () => IAny[];
    root: (build: Root | ((builder: IRootBuilder) => IRootBuilder)) => IHarmonyChordBuilder;
    function: (build: Function | ((builder: IFunctionBuilder) => IFunctionBuilder)) => IHarmonyChordBuilder;
    kind: (build: Kind | ((builder: IKindBuilder) => IKindBuilder)) => IHarmonyChordBuilder;
    degreesAt: (idx: number, build: Degree | ((builder: IDegreeBuilder) => IDegreeBuilder)) => IHarmonyChordBuilder;
    degreesSplice: (start: number, deleteCount: number, ...items: Degree[]) => IHarmonyChordBuilder;
    degrees: (degrees: Degree[]) => IHarmonyChordBuilder;
    inversion: (build: Inversion | ((builder: IInversionBuilder) => IInversionBuilder)) => IHarmonyChordBuilder;
    bass: (build: Bass | ((builder: IBassBuilder) => IBassBuilder)) => IHarmonyChordBuilder;
}
export declare function patchHarmonyChord(base: HarmonyChord, builder: (build: IHarmonyChordBuilder) => IHarmonyChordBuilder): IAny[];
export declare function buildHarmonyChord(builder: (build: IHarmonyChordBuilder) => IHarmonyChordBuilder): HarmonyChord;
export interface IHarmonyBuilder {
    build?: () => Harmony;
    patch: () => IAny[];
    frame: (build: Frame | ((builder: IFrameBuilder) => IFrameBuilder)) => IHarmonyBuilder;
    printFrame: (printFrame: boolean) => IHarmonyBuilder;
    staff: (staff: number) => IHarmonyBuilder;
    type: (type: ExplicitImpliedAlternate) => IHarmonyBuilder;
    offset: (build: Offset | ((builder: IOffsetBuilder) => IOffsetBuilder)) => IHarmonyBuilder;
    defaultX: (defaultX: number) => IHarmonyBuilder;
    relativeY: (relativeY: number) => IHarmonyBuilder;
    defaultY: (defaultY: number) => IHarmonyBuilder;
    relativeX: (relativeX: number) => IHarmonyBuilder;
    fontFamily: (fontFamily: string) => IHarmonyBuilder;
    fontWeight: (fontWeight: NormalBold) => IHarmonyBuilder;
    fontStyle: (fontStyle: NormalItalic) => IHarmonyBuilder;
    fontSize: (fontSize: string) => IHarmonyBuilder;
    color: (color: string) => IHarmonyBuilder;
    printObject: (printObject: boolean) => IHarmonyBuilder;
    placement: (placement: AboveBelow) => IHarmonyBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IHarmonyBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IHarmonyBuilder;
    root: (build: Root | ((builder: IRootBuilder) => IRootBuilder)) => IHarmonyBuilder;
    function: (build: Function | ((builder: IFunctionBuilder) => IFunctionBuilder)) => IHarmonyBuilder;
    kind: (build: Kind | ((builder: IKindBuilder) => IKindBuilder)) => IHarmonyBuilder;
    degreesAt: (idx: number, build: Degree | ((builder: IDegreeBuilder) => IDegreeBuilder)) => IHarmonyBuilder;
    degreesSplice: (start: number, deleteCount: number, ...items: Degree[]) => IHarmonyBuilder;
    degrees: (degrees: Degree[]) => IHarmonyBuilder;
    inversion: (build: Inversion | ((builder: IInversionBuilder) => IInversionBuilder)) => IHarmonyBuilder;
    bass: (build: Bass | ((builder: IBassBuilder) => IBassBuilder)) => IHarmonyBuilder;
}
export declare function patchHarmony(base: Harmony, builder: (build: IHarmonyBuilder) => IHarmonyBuilder): IAny[];
export declare function buildHarmony(builder: (build: IHarmonyBuilder) => IHarmonyBuilder): Harmony;
export interface IRootBuilder {
    build?: () => Root;
    patch: () => IAny[];
    rootStep: (build: RootStep | ((builder: IRootStepBuilder) => IRootStepBuilder)) => IRootBuilder;
    rootAlter: (build: RootAlter | ((builder: IRootAlterBuilder) => IRootAlterBuilder)) => IRootBuilder;
}
export declare function patchRoot(base: Root, builder: (build: IRootBuilder) => IRootBuilder): IAny[];
export declare function buildRoot(builder: (build: IRootBuilder) => IRootBuilder): Root;
export interface IRootStepBuilder {
    build?: () => RootStep;
    patch: () => IAny[];
    text: (text: string) => IRootStepBuilder;
    data: (data: string) => IRootStepBuilder;
    defaultX: (defaultX: number) => IRootStepBuilder;
    relativeY: (relativeY: number) => IRootStepBuilder;
    defaultY: (defaultY: number) => IRootStepBuilder;
    relativeX: (relativeX: number) => IRootStepBuilder;
    fontFamily: (fontFamily: string) => IRootStepBuilder;
    fontWeight: (fontWeight: NormalBold) => IRootStepBuilder;
    fontStyle: (fontStyle: NormalItalic) => IRootStepBuilder;
    fontSize: (fontSize: string) => IRootStepBuilder;
    color: (color: string) => IRootStepBuilder;
}
export declare function patchRootStep(base: RootStep, builder: (build: IRootStepBuilder) => IRootStepBuilder): IAny[];
export declare function buildRootStep(builder: (build: IRootStepBuilder) => IRootStepBuilder): RootStep;
export interface IRootAlterBuilder {
    build?: () => RootAlter;
    patch: () => IAny[];
    location: (location: LeftRight) => IRootAlterBuilder;
    data: (data: string) => IRootAlterBuilder;
    defaultX: (defaultX: number) => IRootAlterBuilder;
    relativeY: (relativeY: number) => IRootAlterBuilder;
    defaultY: (defaultY: number) => IRootAlterBuilder;
    relativeX: (relativeX: number) => IRootAlterBuilder;
    fontFamily: (fontFamily: string) => IRootAlterBuilder;
    fontWeight: (fontWeight: NormalBold) => IRootAlterBuilder;
    fontStyle: (fontStyle: NormalItalic) => IRootAlterBuilder;
    fontSize: (fontSize: string) => IRootAlterBuilder;
    color: (color: string) => IRootAlterBuilder;
    printObject: (printObject: boolean) => IRootAlterBuilder;
}
export declare function patchRootAlter(base: RootAlter, builder: (build: IRootAlterBuilder) => IRootAlterBuilder): IAny[];
export declare function buildRootAlter(builder: (build: IRootAlterBuilder) => IRootAlterBuilder): RootAlter;
export interface IFunctionBuilder {
    build?: () => Function;
    patch: () => IAny[];
    data: (data: string) => IFunctionBuilder;
    defaultX: (defaultX: number) => IFunctionBuilder;
    relativeY: (relativeY: number) => IFunctionBuilder;
    defaultY: (defaultY: number) => IFunctionBuilder;
    relativeX: (relativeX: number) => IFunctionBuilder;
    fontFamily: (fontFamily: string) => IFunctionBuilder;
    fontWeight: (fontWeight: NormalBold) => IFunctionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IFunctionBuilder;
    fontSize: (fontSize: string) => IFunctionBuilder;
    color: (color: string) => IFunctionBuilder;
}
export declare function patchFunction(base: Function, builder: (build: IFunctionBuilder) => IFunctionBuilder): IAny[];
export declare function buildFunction(builder: (build: IFunctionBuilder) => IFunctionBuilder): Function;
export interface IKindBuilder {
    build?: () => Kind;
    patch: () => IAny[];
    parenthesesDegrees: (parenthesesDegrees: boolean) => IKindBuilder;
    useSymbols: (useSymbols: boolean) => IKindBuilder;
    text: (text: string) => IKindBuilder;
    data: (data: string) => IKindBuilder;
    stackDegrees: (stackDegrees: boolean) => IKindBuilder;
    bracketDegrees: (bracketDegrees: boolean) => IKindBuilder;
    defaultX: (defaultX: number) => IKindBuilder;
    relativeY: (relativeY: number) => IKindBuilder;
    defaultY: (defaultY: number) => IKindBuilder;
    relativeX: (relativeX: number) => IKindBuilder;
    fontFamily: (fontFamily: string) => IKindBuilder;
    fontWeight: (fontWeight: NormalBold) => IKindBuilder;
    fontStyle: (fontStyle: NormalItalic) => IKindBuilder;
    fontSize: (fontSize: string) => IKindBuilder;
    color: (color: string) => IKindBuilder;
    halign: (halign: LeftCenterRight) => IKindBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IKindBuilder;
}
export declare function patchKind(base: Kind, builder: (build: IKindBuilder) => IKindBuilder): IAny[];
export declare function buildKind(builder: (build: IKindBuilder) => IKindBuilder): Kind;
export interface IInversionBuilder {
    build?: () => Inversion;
    patch: () => IAny[];
    data: (data: string) => IInversionBuilder;
    defaultX: (defaultX: number) => IInversionBuilder;
    relativeY: (relativeY: number) => IInversionBuilder;
    defaultY: (defaultY: number) => IInversionBuilder;
    relativeX: (relativeX: number) => IInversionBuilder;
    fontFamily: (fontFamily: string) => IInversionBuilder;
    fontWeight: (fontWeight: NormalBold) => IInversionBuilder;
    fontStyle: (fontStyle: NormalItalic) => IInversionBuilder;
    fontSize: (fontSize: string) => IInversionBuilder;
    color: (color: string) => IInversionBuilder;
}
export declare function patchInversion(base: Inversion, builder: (build: IInversionBuilder) => IInversionBuilder): IAny[];
export declare function buildInversion(builder: (build: IInversionBuilder) => IInversionBuilder): Inversion;
export interface IBassBuilder {
    build?: () => Bass;
    patch: () => IAny[];
    bassStep: (build: BassStep | ((builder: IBassStepBuilder) => IBassStepBuilder)) => IBassBuilder;
    bassAlter: (build: BassAlter | ((builder: IBassAlterBuilder) => IBassAlterBuilder)) => IBassBuilder;
}
export declare function patchBass(base: Bass, builder: (build: IBassBuilder) => IBassBuilder): IAny[];
export declare function buildBass(builder: (build: IBassBuilder) => IBassBuilder): Bass;
export interface IBassStepBuilder {
    build?: () => BassStep;
    patch: () => IAny[];
    text: (text: string) => IBassStepBuilder;
    data: (data: string) => IBassStepBuilder;
    defaultX: (defaultX: number) => IBassStepBuilder;
    relativeY: (relativeY: number) => IBassStepBuilder;
    defaultY: (defaultY: number) => IBassStepBuilder;
    relativeX: (relativeX: number) => IBassStepBuilder;
    fontFamily: (fontFamily: string) => IBassStepBuilder;
    fontWeight: (fontWeight: NormalBold) => IBassStepBuilder;
    fontStyle: (fontStyle: NormalItalic) => IBassStepBuilder;
    fontSize: (fontSize: string) => IBassStepBuilder;
    color: (color: string) => IBassStepBuilder;
}
export declare function patchBassStep(base: BassStep, builder: (build: IBassStepBuilder) => IBassStepBuilder): IAny[];
export declare function buildBassStep(builder: (build: IBassStepBuilder) => IBassStepBuilder): BassStep;
export interface IBassAlterBuilder {
    build?: () => BassAlter;
    patch: () => IAny[];
    location: (location: LeftRight) => IBassAlterBuilder;
    data: (data: string) => IBassAlterBuilder;
    defaultX: (defaultX: number) => IBassAlterBuilder;
    relativeY: (relativeY: number) => IBassAlterBuilder;
    defaultY: (defaultY: number) => IBassAlterBuilder;
    relativeX: (relativeX: number) => IBassAlterBuilder;
    fontFamily: (fontFamily: string) => IBassAlterBuilder;
    fontWeight: (fontWeight: NormalBold) => IBassAlterBuilder;
    fontStyle: (fontStyle: NormalItalic) => IBassAlterBuilder;
    fontSize: (fontSize: string) => IBassAlterBuilder;
    color: (color: string) => IBassAlterBuilder;
    printObject: (printObject: boolean) => IBassAlterBuilder;
}
export declare function patchBassAlter(base: BassAlter, builder: (build: IBassAlterBuilder) => IBassAlterBuilder): IAny[];
export declare function buildBassAlter(builder: (build: IBassAlterBuilder) => IBassAlterBuilder): BassAlter;
export interface IDegreeBuilder {
    build?: () => Degree;
    patch: () => IAny[];
    degreeAlter: (build: DegreeAlter | ((builder: IDegreeAlterBuilder) => IDegreeAlterBuilder)) => IDegreeBuilder;
    degreeValue: (build: DegreeValue | ((builder: IDegreeValueBuilder) => IDegreeValueBuilder)) => IDegreeBuilder;
    degreeType: (build: DegreeType | ((builder: IDegreeTypeBuilder) => IDegreeTypeBuilder)) => IDegreeBuilder;
    printObject: (printObject: boolean) => IDegreeBuilder;
}
export declare function patchDegree(base: Degree, builder: (build: IDegreeBuilder) => IDegreeBuilder): IAny[];
export declare function buildDegree(builder: (build: IDegreeBuilder) => IDegreeBuilder): Degree;
export interface IDegreeValueBuilder {
    build?: () => DegreeValue;
    patch: () => IAny[];
    symbol: (symbol: ChordType) => IDegreeValueBuilder;
    text: (text: string) => IDegreeValueBuilder;
    data: (data: string) => IDegreeValueBuilder;
    defaultX: (defaultX: number) => IDegreeValueBuilder;
    relativeY: (relativeY: number) => IDegreeValueBuilder;
    defaultY: (defaultY: number) => IDegreeValueBuilder;
    relativeX: (relativeX: number) => IDegreeValueBuilder;
    fontFamily: (fontFamily: string) => IDegreeValueBuilder;
    fontWeight: (fontWeight: NormalBold) => IDegreeValueBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDegreeValueBuilder;
    fontSize: (fontSize: string) => IDegreeValueBuilder;
    color: (color: string) => IDegreeValueBuilder;
}
export declare function patchDegreeValue(base: DegreeValue, builder: (build: IDegreeValueBuilder) => IDegreeValueBuilder): IAny[];
export declare function buildDegreeValue(builder: (build: IDegreeValueBuilder) => IDegreeValueBuilder): DegreeValue;
export interface IDegreeAlterBuilder {
    build?: () => DegreeAlter;
    patch: () => IAny[];
    plusMinus: (plusMinus: boolean) => IDegreeAlterBuilder;
    data: (data: string) => IDegreeAlterBuilder;
    defaultX: (defaultX: number) => IDegreeAlterBuilder;
    relativeY: (relativeY: number) => IDegreeAlterBuilder;
    defaultY: (defaultY: number) => IDegreeAlterBuilder;
    relativeX: (relativeX: number) => IDegreeAlterBuilder;
    fontFamily: (fontFamily: string) => IDegreeAlterBuilder;
    fontWeight: (fontWeight: NormalBold) => IDegreeAlterBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDegreeAlterBuilder;
    fontSize: (fontSize: string) => IDegreeAlterBuilder;
    color: (color: string) => IDegreeAlterBuilder;
}
export declare function patchDegreeAlter(base: DegreeAlter, builder: (build: IDegreeAlterBuilder) => IDegreeAlterBuilder): IAny[];
export declare function buildDegreeAlter(builder: (build: IDegreeAlterBuilder) => IDegreeAlterBuilder): DegreeAlter;
export interface IDegreeTypeBuilder {
    build?: () => DegreeType;
    patch: () => IAny[];
    text: (text: string) => IDegreeTypeBuilder;
    data: (data: string) => IDegreeTypeBuilder;
    defaultX: (defaultX: number) => IDegreeTypeBuilder;
    relativeY: (relativeY: number) => IDegreeTypeBuilder;
    defaultY: (defaultY: number) => IDegreeTypeBuilder;
    relativeX: (relativeX: number) => IDegreeTypeBuilder;
    fontFamily: (fontFamily: string) => IDegreeTypeBuilder;
    fontWeight: (fontWeight: NormalBold) => IDegreeTypeBuilder;
    fontStyle: (fontStyle: NormalItalic) => IDegreeTypeBuilder;
    fontSize: (fontSize: string) => IDegreeTypeBuilder;
    color: (color: string) => IDegreeTypeBuilder;
}
export declare function patchDegreeType(base: DegreeType, builder: (build: IDegreeTypeBuilder) => IDegreeTypeBuilder): IAny[];
export declare function buildDegreeType(builder: (build: IDegreeTypeBuilder) => IDegreeTypeBuilder): DegreeType;
export interface IFrameBuilder {
    build?: () => Frame;
    patch: () => IAny[];
    frameStrings: (frameStrings: string) => IFrameBuilder;
    frameNotesAt: (idx: number, build: FrameNote | ((builder: IFrameNoteBuilder) => IFrameNoteBuilder)) => IFrameBuilder;
    frameNotesSplice: (start: number, deleteCount: number, ...items: FrameNote[]) => IFrameBuilder;
    frameNotes: (frameNotes: FrameNote[]) => IFrameBuilder;
    unplayed: (unplayed: string) => IFrameBuilder;
    frameFrets: (frameFrets: string) => IFrameBuilder;
    firstFret: (build: FirstFret | ((builder: IFirstFretBuilder) => IFirstFretBuilder)) => IFrameBuilder;
    width: (width: number) => IFrameBuilder;
    height: (height: number) => IFrameBuilder;
    defaultX: (defaultX: number) => IFrameBuilder;
    relativeY: (relativeY: number) => IFrameBuilder;
    defaultY: (defaultY: number) => IFrameBuilder;
    relativeX: (relativeX: number) => IFrameBuilder;
    color: (color: string) => IFrameBuilder;
    halign: (halign: LeftCenterRight) => IFrameBuilder;
    valignImage: (valignImage: TopMiddleBottomBaseline) => IFrameBuilder;
}
export declare function patchFrame(base: Frame, builder: (build: IFrameBuilder) => IFrameBuilder): IAny[];
export declare function buildFrame(builder: (build: IFrameBuilder) => IFrameBuilder): Frame;
export interface IFirstFretBuilder {
    build?: () => FirstFret;
    patch: () => IAny[];
    text: (text: string) => IFirstFretBuilder;
    location: (location: LeftRight) => IFirstFretBuilder;
    data: (data: string) => IFirstFretBuilder;
}
export declare function patchFirstFret(base: FirstFret, builder: (build: IFirstFretBuilder) => IFirstFretBuilder): IAny[];
export declare function buildFirstFret(builder: (build: IFirstFretBuilder) => IFirstFretBuilder): FirstFret;
export interface IFrameNoteBuilder {
    build?: () => FrameNote;
    patch: () => IAny[];
    barre: (build: Barre | ((builder: IBarreBuilder) => IBarreBuilder)) => IFrameNoteBuilder;
    string: (build: String | ((builder: IStringBuilder) => IStringBuilder)) => IFrameNoteBuilder;
    fingering: (build: Fingering | ((builder: IFingeringBuilder) => IFingeringBuilder)) => IFrameNoteBuilder;
    fret: (build: Fret | ((builder: IFretBuilder) => IFretBuilder)) => IFrameNoteBuilder;
}
export declare function patchFrameNote(base: FrameNote, builder: (build: IFrameNoteBuilder) => IFrameNoteBuilder): IAny[];
export declare function buildFrameNote(builder: (build: IFrameNoteBuilder) => IFrameNoteBuilder): FrameNote;
export interface IBarreBuilder {
    build?: () => Barre;
    patch: () => IAny[];
    type: (type: StartStop) => IBarreBuilder;
    color: (color: string) => IBarreBuilder;
}
export declare function patchBarre(base: Barre, builder: (build: IBarreBuilder) => IBarreBuilder): IAny[];
export declare function buildBarre(builder: (build: IBarreBuilder) => IBarreBuilder): Barre;
export interface IGroupingBuilder {
    build?: () => Grouping;
    patch: () => IAny[];
    featuresAt: (idx: number, build: Feature | ((builder: IFeatureBuilder) => IFeatureBuilder)) => IGroupingBuilder;
    featuresSplice: (start: number, deleteCount: number, ...items: Feature[]) => IGroupingBuilder;
    features: (features: Feature[]) => IGroupingBuilder;
    number: (number: number) => IGroupingBuilder;
    type: (type: StartStopSingle) => IGroupingBuilder;
    memberOf: (memberOf: string) => IGroupingBuilder;
}
export declare function patchGrouping(base: Grouping, builder: (build: IGroupingBuilder) => IGroupingBuilder): IAny[];
export declare function buildGrouping(builder: (build: IGroupingBuilder) => IGroupingBuilder): Grouping;
export interface IFeatureBuilder {
    build?: () => Feature;
    patch: () => IAny[];
    data: (data: string) => IFeatureBuilder;
    type: (type: string) => IFeatureBuilder;
}
export declare function patchFeature(base: Feature, builder: (build: IFeatureBuilder) => IFeatureBuilder): IAny[];
export declare function buildFeature(builder: (build: IFeatureBuilder) => IFeatureBuilder): Feature;
export interface IPrintBuilder {
    build?: () => Print;
    patch: () => IAny[];
    measureNumbering: (build: MeasureNumbering | ((builder: IMeasureNumberingBuilder) => IMeasureNumberingBuilder)) => IPrintBuilder;
    partNameDisplay: (build: PartNameDisplay | ((builder: IPartNameDisplayBuilder) => IPartNameDisplayBuilder)) => IPrintBuilder;
    newSystem: (newSystem: boolean) => IPrintBuilder;
    newPage: (newPage: boolean) => IPrintBuilder;
    blankPage: (blankPage: string) => IPrintBuilder;
    measureLayout: (build: MeasureLayout | ((builder: IMeasureLayoutBuilder) => IMeasureLayoutBuilder)) => IPrintBuilder;
    partAbbreviationDisplay: (build: PartAbbreviationDisplay | ((builder: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder)) => IPrintBuilder;
    pageLayout: (build: PageLayout | ((builder: IPageLayoutBuilder) => IPageLayoutBuilder)) => IPrintBuilder;
    systemLayout: (build: SystemLayout | ((builder: ISystemLayoutBuilder) => ISystemLayoutBuilder)) => IPrintBuilder;
    staffSpacing: (staffSpacing: number) => IPrintBuilder;
    staffLayoutsAt: (idx: number, build: StaffLayout | ((builder: IStaffLayoutBuilder) => IStaffLayoutBuilder)) => IPrintBuilder;
    staffLayoutsSplice: (start: number, deleteCount: number, ...items: StaffLayout[]) => IPrintBuilder;
    staffLayouts: (staffLayouts: StaffLayout[]) => IPrintBuilder;
    pageNumber: (pageNumber: string) => IPrintBuilder;
}
export declare function patchPrint(base: Print, builder: (build: IPrintBuilder) => IPrintBuilder): IAny[];
export declare function buildPrint(builder: (build: IPrintBuilder) => IPrintBuilder): Print;
export interface IMeasureNumberingBuilder {
    build?: () => MeasureNumbering;
    patch: () => IAny[];
    data: (data: string) => IMeasureNumberingBuilder;
    defaultX: (defaultX: number) => IMeasureNumberingBuilder;
    relativeY: (relativeY: number) => IMeasureNumberingBuilder;
    defaultY: (defaultY: number) => IMeasureNumberingBuilder;
    relativeX: (relativeX: number) => IMeasureNumberingBuilder;
    fontFamily: (fontFamily: string) => IMeasureNumberingBuilder;
    fontWeight: (fontWeight: NormalBold) => IMeasureNumberingBuilder;
    fontStyle: (fontStyle: NormalItalic) => IMeasureNumberingBuilder;
    fontSize: (fontSize: string) => IMeasureNumberingBuilder;
    color: (color: string) => IMeasureNumberingBuilder;
    halign: (halign: LeftCenterRight) => IMeasureNumberingBuilder;
    valign: (valign: TopMiddleBottomBaseline) => IMeasureNumberingBuilder;
}
export declare function patchMeasureNumbering(base: MeasureNumbering, builder: (build: IMeasureNumberingBuilder) => IMeasureNumberingBuilder): IAny[];
export declare function buildMeasureNumbering(builder: (build: IMeasureNumberingBuilder) => IMeasureNumberingBuilder): MeasureNumbering;
export interface ISoundBuilder {
    build?: () => Sound;
    patch: () => IAny[];
    softPedal: (softPedal: string) => ISoundBuilder;
    midiInstrumentsAt: (idx: number, build: MidiInstrument | ((builder: IMidiInstrumentBuilder) => IMidiInstrumentBuilder)) => ISoundBuilder;
    midiInstrumentsSplice: (start: number, deleteCount: number, ...items: MidiInstrument[]) => ISoundBuilder;
    midiInstruments: (midiInstruments: MidiInstrument[]) => ISoundBuilder;
    pan: (pan: string) => ISoundBuilder;
    tocoda: (tocoda: string) => ISoundBuilder;
    decapo: (decapo: boolean) => ISoundBuilder;
    divisions: (divisions: number) => ISoundBuilder;
    pizzicato: (pizzicato: boolean) => ISoundBuilder;
    coda: (coda: string) => ISoundBuilder;
    segno: (segno: string) => ISoundBuilder;
    elevation: (elevation: string) => ISoundBuilder;
    fine: (fine: string) => ISoundBuilder;
    damperPedal: (damperPedal: string) => ISoundBuilder;
    dynamics: (dynamics: string) => ISoundBuilder;
    playsAt: (idx: number, build: Play | ((builder: IPlayBuilder) => IPlayBuilder)) => ISoundBuilder;
    playsSplice: (start: number, deleteCount: number, ...items: Play[]) => ISoundBuilder;
    plays: (plays: Play[]) => ISoundBuilder;
    offset: (build: Offset | ((builder: IOffsetBuilder) => IOffsetBuilder)) => ISoundBuilder;
    sostenutoPedal: (sostenutoPedal: string) => ISoundBuilder;
    dalsegno: (dalsegno: string) => ISoundBuilder;
    midiDevicesAt: (idx: number, build: MidiDevice | ((builder: IMidiDeviceBuilder) => IMidiDeviceBuilder)) => ISoundBuilder;
    midiDevicesSplice: (start: number, deleteCount: number, ...items: MidiDevice[]) => ISoundBuilder;
    midiDevices: (midiDevices: MidiDevice[]) => ISoundBuilder;
    tempo: (tempo: string) => ISoundBuilder;
    forwardRepeat: (forwardRepeat: boolean) => ISoundBuilder;
    timeOnly: (timeOnly: string) => ISoundBuilder;
}
export declare function patchSound(base: Sound, builder: (build: ISoundBuilder) => ISoundBuilder): IAny[];
export declare function buildSound(builder: (build: ISoundBuilder) => ISoundBuilder): Sound;
export interface IWorkBuilder {
    build?: () => Work;
    patch: () => IAny[];
    workNumber: (workNumber: string) => IWorkBuilder;
    workTitle: (workTitle: string) => IWorkBuilder;
    opus: (build: Opus | ((builder: IOpusBuilder) => IOpusBuilder)) => IWorkBuilder;
}
export declare function patchWork(base: Work, builder: (build: IWorkBuilder) => IWorkBuilder): IAny[];
export declare function buildWork(builder: (build: IWorkBuilder) => IWorkBuilder): Work;
export interface IOpusBuilder {
    build?: () => Opus;
    patch: () => IAny[];
}
export declare function patchOpus(base: Opus, builder: (build: IOpusBuilder) => IOpusBuilder): IAny[];
export declare function buildOpus(builder: (build: IOpusBuilder) => IOpusBuilder): Opus;
export interface IDefaultsBuilder {
    build?: () => Defaults;
    patch: () => IAny[];
    wordFont: (build: WordFont | ((builder: IWordFontBuilder) => IWordFontBuilder)) => IDefaultsBuilder;
    lyricLanguagesAt: (idx: number, build: LyricLanguage | ((builder: ILyricLanguageBuilder) => ILyricLanguageBuilder)) => IDefaultsBuilder;
    lyricLanguagesSplice: (start: number, deleteCount: number, ...items: LyricLanguage[]) => IDefaultsBuilder;
    lyricLanguages: (lyricLanguages: LyricLanguage[]) => IDefaultsBuilder;
    lyricFontsAt: (idx: number, build: LyricFont | ((builder: ILyricFontBuilder) => ILyricFontBuilder)) => IDefaultsBuilder;
    lyricFontsSplice: (start: number, deleteCount: number, ...items: LyricFont[]) => IDefaultsBuilder;
    lyricFonts: (lyricFonts: LyricFont[]) => IDefaultsBuilder;
    pageLayout: (build: PageLayout | ((builder: IPageLayoutBuilder) => IPageLayoutBuilder)) => IDefaultsBuilder;
    systemLayout: (build: SystemLayout | ((builder: ISystemLayoutBuilder) => ISystemLayoutBuilder)) => IDefaultsBuilder;
    appearance: (build: Appearance | ((builder: IAppearanceBuilder) => IAppearanceBuilder)) => IDefaultsBuilder;
    scaling: (build: Scaling | ((builder: IScalingBuilder) => IScalingBuilder)) => IDefaultsBuilder;
    staffLayoutsAt: (idx: number, build: StaffLayout | ((builder: IStaffLayoutBuilder) => IStaffLayoutBuilder)) => IDefaultsBuilder;
    staffLayoutsSplice: (start: number, deleteCount: number, ...items: StaffLayout[]) => IDefaultsBuilder;
    staffLayouts: (staffLayouts: StaffLayout[]) => IDefaultsBuilder;
    musicFont: (build: MusicFont | ((builder: IMusicFontBuilder) => IMusicFontBuilder)) => IDefaultsBuilder;
}
export declare function patchDefaults(base: Defaults, builder: (build: IDefaultsBuilder) => IDefaultsBuilder): IAny[];
export declare function buildDefaults(builder: (build: IDefaultsBuilder) => IDefaultsBuilder): Defaults;
export interface IMusicFontBuilder {
    build?: () => MusicFont;
    patch: () => IAny[];
    fontFamily: (fontFamily: string) => IMusicFontBuilder;
    fontWeight: (fontWeight: NormalBold) => IMusicFontBuilder;
    fontStyle: (fontStyle: NormalItalic) => IMusicFontBuilder;
    fontSize: (fontSize: string) => IMusicFontBuilder;
}
export declare function patchMusicFont(base: MusicFont, builder: (build: IMusicFontBuilder) => IMusicFontBuilder): IAny[];
export declare function buildMusicFont(builder: (build: IMusicFontBuilder) => IMusicFontBuilder): MusicFont;
export interface IWordFontBuilder {
    build?: () => WordFont;
    patch: () => IAny[];
    fontFamily: (fontFamily: string) => IWordFontBuilder;
    fontWeight: (fontWeight: NormalBold) => IWordFontBuilder;
    fontStyle: (fontStyle: NormalItalic) => IWordFontBuilder;
    fontSize: (fontSize: string) => IWordFontBuilder;
}
export declare function patchWordFont(base: WordFont, builder: (build: IWordFontBuilder) => IWordFontBuilder): IAny[];
export declare function buildWordFont(builder: (build: IWordFontBuilder) => IWordFontBuilder): WordFont;
export interface ILyricFontBuilder {
    build?: () => LyricFont;
    patch: () => IAny[];
    number: (number: number) => ILyricFontBuilder;
    name: (name: string) => ILyricFontBuilder;
    fontFamily: (fontFamily: string) => ILyricFontBuilder;
    fontWeight: (fontWeight: NormalBold) => ILyricFontBuilder;
    fontStyle: (fontStyle: NormalItalic) => ILyricFontBuilder;
    fontSize: (fontSize: string) => ILyricFontBuilder;
}
export declare function patchLyricFont(base: LyricFont, builder: (build: ILyricFontBuilder) => ILyricFontBuilder): IAny[];
export declare function buildLyricFont(builder: (build: ILyricFontBuilder) => ILyricFontBuilder): LyricFont;
export interface ILyricLanguageBuilder {
    build?: () => LyricLanguage;
    patch: () => IAny[];
    number: (number: number) => ILyricLanguageBuilder;
    name: (name: string) => ILyricLanguageBuilder;
}
export declare function patchLyricLanguage(base: LyricLanguage, builder: (build: ILyricLanguageBuilder) => ILyricLanguageBuilder): IAny[];
export declare function buildLyricLanguage(builder: (build: ILyricLanguageBuilder) => ILyricLanguageBuilder): LyricLanguage;
export interface ICreditBuilder {
    build?: () => Credit;
    patch: () => IAny[];
    creditTypes: (creditTypes: string[]) => ICreditBuilder;
    creditWordsAt: (idx: number, build: CreditWords | ((builder: ICreditWordsBuilder) => ICreditWordsBuilder)) => ICreditBuilder;
    creditWordsSplice: (start: number, deleteCount: number, ...items: CreditWords[]) => ICreditBuilder;
    creditWords: (creditWords: CreditWords[]) => ICreditBuilder;
    creditImage: (build: CreditImage | ((builder: ICreditImageBuilder) => ICreditImageBuilder)) => ICreditBuilder;
    page: (page: number) => ICreditBuilder;
}
export declare function patchCredit(base: Credit, builder: (build: ICreditBuilder) => ICreditBuilder): IAny[];
export declare function buildCredit(builder: (build: ICreditBuilder) => ICreditBuilder): Credit;
export interface ICreditWordsBuilder {
    build?: () => CreditWords;
    patch: () => IAny[];
    words: (words: string) => ICreditWordsBuilder;
    justify: (justify: LeftCenterRight) => ICreditWordsBuilder;
    defaultX: (defaultX: number) => ICreditWordsBuilder;
    relativeY: (relativeY: number) => ICreditWordsBuilder;
    defaultY: (defaultY: number) => ICreditWordsBuilder;
    relativeX: (relativeX: number) => ICreditWordsBuilder;
    fontFamily: (fontFamily: string) => ICreditWordsBuilder;
    fontWeight: (fontWeight: NormalBold) => ICreditWordsBuilder;
    fontStyle: (fontStyle: NormalItalic) => ICreditWordsBuilder;
    fontSize: (fontSize: string) => ICreditWordsBuilder;
    color: (color: string) => ICreditWordsBuilder;
    halign: (halign: LeftCenterRight) => ICreditWordsBuilder;
    valign: (valign: TopMiddleBottomBaseline) => ICreditWordsBuilder;
    underline: (underline: number) => ICreditWordsBuilder;
    overline: (overline: number) => ICreditWordsBuilder;
    lineThrough: (lineThrough: number) => ICreditWordsBuilder;
    rotation: (rotation: number) => ICreditWordsBuilder;
    letterSpacing: (letterSpacing: string) => ICreditWordsBuilder;
    lineHeight: (lineHeight: string) => ICreditWordsBuilder;
    dir: (dir: DirectionMode) => ICreditWordsBuilder;
    enclosure: (enclosure: EnclosureShape) => ICreditWordsBuilder;
}
export declare function patchCreditWords(base: CreditWords, builder: (build: ICreditWordsBuilder) => ICreditWordsBuilder): IAny[];
export declare function buildCreditWords(builder: (build: ICreditWordsBuilder) => ICreditWordsBuilder): CreditWords;
export interface ICreditImageBuilder {
    build?: () => CreditImage;
    patch: () => IAny[];
    type: (type: string) => ICreditImageBuilder;
    source: (source: string) => ICreditImageBuilder;
    defaultX: (defaultX: number) => ICreditImageBuilder;
    relativeY: (relativeY: number) => ICreditImageBuilder;
    defaultY: (defaultY: number) => ICreditImageBuilder;
    relativeX: (relativeX: number) => ICreditImageBuilder;
    halign: (halign: LeftCenterRight) => ICreditImageBuilder;
    valignImage: (valignImage: TopMiddleBottomBaseline) => ICreditImageBuilder;
}
export declare function patchCreditImage(base: CreditImage, builder: (build: ICreditImageBuilder) => ICreditImageBuilder): IAny[];
export declare function buildCreditImage(builder: (build: ICreditImageBuilder) => ICreditImageBuilder): CreditImage;
export interface IScorePartBuilder {
    build?: () => ScorePart;
    patch: () => IAny[];
    identification: (build: Identification | ((builder: IIdentificationBuilder) => IIdentificationBuilder)) => IScorePartBuilder;
    partNameDisplay: (build: PartNameDisplay | ((builder: IPartNameDisplayBuilder) => IPartNameDisplayBuilder)) => IScorePartBuilder;
    scoreInstrumentsAt: (idx: number, build: ScoreInstrument | ((builder: IScoreInstrumentBuilder) => IScoreInstrumentBuilder)) => IScorePartBuilder;
    scoreInstrumentsSplice: (start: number, deleteCount: number, ...items: ScoreInstrument[]) => IScorePartBuilder;
    scoreInstruments: (scoreInstruments: ScoreInstrument[]) => IScorePartBuilder;
    midiDevicesAt: (idx: number, build: MidiDevice | ((builder: IMidiDeviceBuilder) => IMidiDeviceBuilder)) => IScorePartBuilder;
    midiDevicesSplice: (start: number, deleteCount: number, ...items: MidiDevice[]) => IScorePartBuilder;
    midiDevices: (midiDevices: MidiDevice[]) => IScorePartBuilder;
    partName: (build: PartName | ((builder: IPartNameBuilder) => IPartNameBuilder)) => IScorePartBuilder;
    partAbbreviationDisplay: (build: PartAbbreviationDisplay | ((builder: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder)) => IScorePartBuilder;
    partAbbreviation: (build: PartAbbreviation | ((builder: IPartAbbreviationBuilder) => IPartAbbreviationBuilder)) => IScorePartBuilder;
    groups: (groups: string[]) => IScorePartBuilder;
    midiInstrumentsAt: (idx: number, build: MidiInstrument | ((builder: IMidiInstrumentBuilder) => IMidiInstrumentBuilder)) => IScorePartBuilder;
    midiInstrumentsSplice: (start: number, deleteCount: number, ...items: MidiInstrument[]) => IScorePartBuilder;
    midiInstruments: (midiInstruments: MidiInstrument[]) => IScorePartBuilder;
    id: (id: string) => IScorePartBuilder;
}
export declare function patchScorePart(base: ScorePart, builder: (build: IScorePartBuilder) => IScorePartBuilder): IAny[];
export declare function buildScorePart(builder: (build: IScorePartBuilder) => IScorePartBuilder): ScorePart;
export interface IPartNameBuilder {
    build?: () => PartName;
    patch: () => IAny[];
    partName: (partName: string) => IPartNameBuilder;
    defaultX: (defaultX: number) => IPartNameBuilder;
    relativeY: (relativeY: number) => IPartNameBuilder;
    defaultY: (defaultY: number) => IPartNameBuilder;
    relativeX: (relativeX: number) => IPartNameBuilder;
    fontFamily: (fontFamily: string) => IPartNameBuilder;
    fontWeight: (fontWeight: NormalBold) => IPartNameBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPartNameBuilder;
    fontSize: (fontSize: string) => IPartNameBuilder;
    color: (color: string) => IPartNameBuilder;
    printObject: (printObject: boolean) => IPartNameBuilder;
    justify: (justify: LeftCenterRight) => IPartNameBuilder;
}
export declare function patchPartName(base: PartName, builder: (build: IPartNameBuilder) => IPartNameBuilder): IAny[];
export declare function buildPartName(builder: (build: IPartNameBuilder) => IPartNameBuilder): PartName;
export interface IPartAbbreviationBuilder {
    build?: () => PartAbbreviation;
    patch: () => IAny[];
    abbreviation: (abbreviation: string) => IPartAbbreviationBuilder;
    defaultX: (defaultX: number) => IPartAbbreviationBuilder;
    relativeY: (relativeY: number) => IPartAbbreviationBuilder;
    defaultY: (defaultY: number) => IPartAbbreviationBuilder;
    relativeX: (relativeX: number) => IPartAbbreviationBuilder;
    fontFamily: (fontFamily: string) => IPartAbbreviationBuilder;
    fontWeight: (fontWeight: NormalBold) => IPartAbbreviationBuilder;
    fontStyle: (fontStyle: NormalItalic) => IPartAbbreviationBuilder;
    fontSize: (fontSize: string) => IPartAbbreviationBuilder;
    color: (color: string) => IPartAbbreviationBuilder;
    printObject: (printObject: boolean) => IPartAbbreviationBuilder;
    justify: (justify: LeftCenterRight) => IPartAbbreviationBuilder;
}
export declare function patchPartAbbreviation(base: PartAbbreviation, builder: (build: IPartAbbreviationBuilder) => IPartAbbreviationBuilder): IAny[];
export declare function buildPartAbbreviation(builder: (build: IPartAbbreviationBuilder) => IPartAbbreviationBuilder): PartAbbreviation;
export interface IPartGroupBuilder {
    build?: () => PartGroup;
    patch: () => IAny[];
    groupNameDisplay: (build: GroupNameDisplay | ((builder: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder)) => IPartGroupBuilder;
    groupSymbol: (build: GroupSymbol | ((builder: IGroupSymbolBuilder) => IGroupSymbolBuilder)) => IPartGroupBuilder;
    groupName: (build: GroupName | ((builder: IGroupNameBuilder) => IGroupNameBuilder)) => IPartGroupBuilder;
    groupAbbreviationDisplay: (build: GroupAbbreviationDisplay | ((builder: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder)) => IPartGroupBuilder;
    groupBarline: (build: GroupBarline | ((builder: IGroupBarlineBuilder) => IGroupBarlineBuilder)) => IPartGroupBuilder;
    number: (number: number) => IPartGroupBuilder;
    groupAbbreviation: (build: GroupAbbreviation | ((builder: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder)) => IPartGroupBuilder;
    type: (type: StartStop) => IPartGroupBuilder;
    groupTime: (build: GroupTime | ((builder: IGroupTimeBuilder) => IGroupTimeBuilder)) => IPartGroupBuilder;
    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IPartGroupBuilder;
    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IPartGroupBuilder;
}
export declare function patchPartGroup(base: PartGroup, builder: (build: IPartGroupBuilder) => IPartGroupBuilder): IAny[];
export declare function buildPartGroup(builder: (build: IPartGroupBuilder) => IPartGroupBuilder): PartGroup;
export interface IGroupNameBuilder {
    build?: () => GroupName;
    patch: () => IAny[];
    name: (name: string) => IGroupNameBuilder;
    defaultX: (defaultX: number) => IGroupNameBuilder;
    relativeY: (relativeY: number) => IGroupNameBuilder;
    defaultY: (defaultY: number) => IGroupNameBuilder;
    relativeX: (relativeX: number) => IGroupNameBuilder;
    fontFamily: (fontFamily: string) => IGroupNameBuilder;
    fontWeight: (fontWeight: NormalBold) => IGroupNameBuilder;
    fontStyle: (fontStyle: NormalItalic) => IGroupNameBuilder;
    fontSize: (fontSize: string) => IGroupNameBuilder;
    color: (color: string) => IGroupNameBuilder;
    justify: (justify: LeftCenterRight) => IGroupNameBuilder;
}
export declare function patchGroupName(base: GroupName, builder: (build: IGroupNameBuilder) => IGroupNameBuilder): IAny[];
export declare function buildGroupName(builder: (build: IGroupNameBuilder) => IGroupNameBuilder): GroupName;
export interface IGroupNameDisplayBuilder {
    build?: () => GroupNameDisplay;
    patch: () => IAny[];
    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IGroupNameDisplayBuilder;
    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IGroupNameDisplayBuilder;
    name: (name: TextSegment[]) => IGroupNameDisplayBuilder;
    printObject: (printObject: boolean) => IGroupNameDisplayBuilder;
}
export declare function patchGroupNameDisplay(base: GroupNameDisplay, builder: (build: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder): IAny[];
export declare function buildGroupNameDisplay(builder: (build: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder): GroupNameDisplay;
export interface IGroupAbbreviationBuilder {
    build?: () => GroupAbbreviation;
    patch: () => IAny[];
    text: (text: string) => IGroupAbbreviationBuilder;
    defaultX: (defaultX: number) => IGroupAbbreviationBuilder;
    relativeY: (relativeY: number) => IGroupAbbreviationBuilder;
    defaultY: (defaultY: number) => IGroupAbbreviationBuilder;
    relativeX: (relativeX: number) => IGroupAbbreviationBuilder;
    fontFamily: (fontFamily: string) => IGroupAbbreviationBuilder;
    fontWeight: (fontWeight: NormalBold) => IGroupAbbreviationBuilder;
    fontStyle: (fontStyle: NormalItalic) => IGroupAbbreviationBuilder;
    fontSize: (fontSize: string) => IGroupAbbreviationBuilder;
    color: (color: string) => IGroupAbbreviationBuilder;
    justify: (justify: LeftCenterRight) => IGroupAbbreviationBuilder;
}
export declare function patchGroupAbbreviation(base: GroupAbbreviation, builder: (build: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder): IAny[];
export declare function buildGroupAbbreviation(builder: (build: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder): GroupAbbreviation;
export interface IGroupAbbreviationDisplayBuilder {
    build?: () => GroupAbbreviationDisplay;
    patch: () => IAny[];
    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IGroupAbbreviationDisplayBuilder;
    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IGroupAbbreviationDisplayBuilder;
    name: (name: TextSegment[]) => IGroupAbbreviationDisplayBuilder;
    printObject: (printObject: boolean) => IGroupAbbreviationDisplayBuilder;
}
export declare function patchGroupAbbreviationDisplay(base: GroupAbbreviationDisplay, builder: (build: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder): IAny[];
export declare function buildGroupAbbreviationDisplay(builder: (build: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder): GroupAbbreviationDisplay;
export interface IGroupSymbolBuilder {
    build?: () => GroupSymbol;
    patch: () => IAny[];
    data: (data: PartSymbolType) => IGroupSymbolBuilder;
    defaultX: (defaultX: number) => IGroupSymbolBuilder;
    relativeY: (relativeY: number) => IGroupSymbolBuilder;
    defaultY: (defaultY: number) => IGroupSymbolBuilder;
    relativeX: (relativeX: number) => IGroupSymbolBuilder;
    color: (color: string) => IGroupSymbolBuilder;
}
export declare function patchGroupSymbol(base: GroupSymbol, builder: (build: IGroupSymbolBuilder) => IGroupSymbolBuilder): IAny[];
export declare function buildGroupSymbol(builder: (build: IGroupSymbolBuilder) => IGroupSymbolBuilder): GroupSymbol;
export interface IGroupBarlineBuilder {
    build?: () => GroupBarline;
    patch: () => IAny[];
    data: (data: string) => IGroupBarlineBuilder;
    color: (color: string) => IGroupBarlineBuilder;
}
export declare function patchGroupBarline(base: GroupBarline, builder: (build: IGroupBarlineBuilder) => IGroupBarlineBuilder): IAny[];
export declare function buildGroupBarline(builder: (build: IGroupBarlineBuilder) => IGroupBarlineBuilder): GroupBarline;
export interface IGroupTimeBuilder {
    build?: () => GroupTime;
    patch: () => IAny[];
}
export declare function patchGroupTime(base: GroupTime, builder: (build: IGroupTimeBuilder) => IGroupTimeBuilder): IAny[];
export declare function buildGroupTime(builder: (build: IGroupTimeBuilder) => IGroupTimeBuilder): GroupTime;
export interface IScoreInstrumentBuilder {
    build?: () => ScoreInstrument;
    patch: () => IAny[];
    instrumentName: (instrumentName: string) => IScoreInstrumentBuilder;
    instrumentSound: (instrumentSound: string) => IScoreInstrumentBuilder;
    ensemble: (ensemble: string) => IScoreInstrumentBuilder;
    virtualInstrument: (build: VirtualInstrument | ((builder: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder)) => IScoreInstrumentBuilder;
    instrumentAbbreviation: (instrumentAbbreviation: string) => IScoreInstrumentBuilder;
    solo: (build: Solo | ((builder: ISoloBuilder) => ISoloBuilder)) => IScoreInstrumentBuilder;
    id: (id: string) => IScoreInstrumentBuilder;
}
export declare function patchScoreInstrument(base: ScoreInstrument, builder: (build: IScoreInstrumentBuilder) => IScoreInstrumentBuilder): IAny[];
export declare function buildScoreInstrument(builder: (build: IScoreInstrumentBuilder) => IScoreInstrumentBuilder): ScoreInstrument;
export interface ISoloBuilder {
    build?: () => Solo;
    patch: () => IAny[];
}
export declare function patchSolo(base: Solo, builder: (build: ISoloBuilder) => ISoloBuilder): IAny[];
export declare function buildSolo(builder: (build: ISoloBuilder) => ISoloBuilder): Solo;
export interface IVirtualInstrumentBuilder {
    build?: () => VirtualInstrument;
    patch: () => IAny[];
    virtualLibrary: (virtualLibrary: string) => IVirtualInstrumentBuilder;
    virtualName: (virtualName: string) => IVirtualInstrumentBuilder;
}
export declare function patchVirtualInstrument(base: VirtualInstrument, builder: (build: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder): IAny[];
export declare function buildVirtualInstrument(builder: (build: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder): VirtualInstrument;
export interface IScoreHeaderBuilder {
    build?: () => ScoreHeader;
    patch: () => IAny[];
    movementTitle: (movementTitle: string) => IScoreHeaderBuilder;
    identification: (build: Identification | ((builder: IIdentificationBuilder) => IIdentificationBuilder)) => IScoreHeaderBuilder;
    defaults: (build: Defaults | ((builder: IDefaultsBuilder) => IDefaultsBuilder)) => IScoreHeaderBuilder;
    work: (build: Work | ((builder: IWorkBuilder) => IWorkBuilder)) => IScoreHeaderBuilder;
    creditsAt: (idx: number, build: Credit | ((builder: ICreditBuilder) => ICreditBuilder)) => IScoreHeaderBuilder;
    creditsSplice: (start: number, deleteCount: number, ...items: Credit[]) => IScoreHeaderBuilder;
    credits: (credits: Credit[]) => IScoreHeaderBuilder;
    partList: (partList: PartList) => IScoreHeaderBuilder;
    movementNumber: (movementNumber: string) => IScoreHeaderBuilder;
}
export declare function patchScoreHeader(base: ScoreHeader, builder: (build: IScoreHeaderBuilder) => IScoreHeaderBuilder): IAny[];
export declare function buildScoreHeader(builder: (build: IScoreHeaderBuilder) => IScoreHeaderBuilder): ScoreHeader;
export interface IScoreTimewiseBuilder {
    build?: () => ScoreTimewise;
    patch: () => IAny[];
    measuresAt: (idx: number, build: Measure | ((builder: IMeasureBuilder) => IMeasureBuilder)) => IScoreTimewiseBuilder;
    measuresSplice: (start: number, deleteCount: number, ...items: Measure[]) => IScoreTimewiseBuilder;
    measures: (measures: Measure[]) => IScoreTimewiseBuilder;
    version: (version: string) => IScoreTimewiseBuilder;
    movementTitle: (movementTitle: string) => IScoreTimewiseBuilder;
    identification: (build: Identification | ((builder: IIdentificationBuilder) => IIdentificationBuilder)) => IScoreTimewiseBuilder;
    defaults: (build: Defaults | ((builder: IDefaultsBuilder) => IDefaultsBuilder)) => IScoreTimewiseBuilder;
    work: (build: Work | ((builder: IWorkBuilder) => IWorkBuilder)) => IScoreTimewiseBuilder;
    creditsAt: (idx: number, build: Credit | ((builder: ICreditBuilder) => ICreditBuilder)) => IScoreTimewiseBuilder;
    creditsSplice: (start: number, deleteCount: number, ...items: Credit[]) => IScoreTimewiseBuilder;
    credits: (credits: Credit[]) => IScoreTimewiseBuilder;
    partList: (partList: PartList) => IScoreTimewiseBuilder;
    movementNumber: (movementNumber: string) => IScoreTimewiseBuilder;
}
export declare function patchScoreTimewise(base: ScoreTimewise, builder: (build: IScoreTimewiseBuilder) => IScoreTimewiseBuilder): IAny[];
export declare function buildScoreTimewise(builder: (build: IScoreTimewiseBuilder) => IScoreTimewiseBuilder): ScoreTimewise;
export interface IMeasureBuilder {
    build?: () => Measure;
    patch: () => IAny[];
    number: (number: string) => IMeasureBuilder;
    implicit: (implicit: boolean) => IMeasureBuilder;
    width: (width: number) => IMeasureBuilder;
    set: (key: string, val: boolean[]) => IMeasureBuilder;
    nonControlling: (nonControlling: boolean) => IMeasureBuilder;
}
export declare function patchMeasure(base: Measure, builder: (build: IMeasureBuilder) => IMeasureBuilder): IAny[];
export declare function buildMeasure(builder: (build: IMeasureBuilder) => IMeasureBuilder): Measure;
