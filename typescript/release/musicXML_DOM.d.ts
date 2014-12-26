/// <reference path="typings/node/node.d.ts" />
export interface AccOrText {
    acc?: AccidentalText;
    text?: DisplayText;
}
export interface TextArray extends Array<AccOrText> {
}
export interface EncodingDate extends CalendarDate {
}
export declare function parseXML(musicxmlBuffer: string): ScoreTimewise;
export declare function getString(ch: Node, required: boolean): string;
export declare function getNumber(ch: Node, required: boolean): number;
export declare function xmlToTextArray(node: Node): TextArray;
export declare function toCamelCase(input: string): string;
export declare function xmlToEncodingDate(node: Node): CalendarDate;
export declare function xmlToMeasure(node: Node): Measure;
export declare function xmlToYesNo(p: Node, required?: boolean): boolean;
export declare function xmlToNoteheadText(p: Node): NoteheadText;
export declare function xmlToPartNameDisplay(p: Node): PartNameDisplay;
export declare function xmlToPartAbbreviationDisplay(p: Node): PartAbbreviationDisplay;
export interface Mode extends String {
}
export declare function xmlToMode(node: Node): Mode;
export interface OtherAppearance extends String {
}
export declare function xmlToOtherAppearance(node: Node): OtherAppearance;
export interface TuningStep extends String {
}
export declare function xmlToTuningStep(node: Node): TuningStep;
export interface OtherDynamics extends String {
}
export declare function xmlToOtherDynamics(node: Node): OtherDynamics;
export interface Voice extends String {
}
export declare function xmlToVoice(node: Node): Voice;
export interface NormalType extends String {
}
export declare function xmlToNormalType(node: Node): NormalType;
export interface Software extends String {
}
export declare function xmlToSoftware(node: Node): Software;
export interface EncodingDescription extends String {
}
export declare function xmlToEncodingDescription(node: Node): EncodingDescription;
export interface KeyStep extends String {
}
export declare function xmlToKeyStep(node: Node): KeyStep;
export interface KeyAlter extends String {
}
export declare function xmlToKeyAlter(node: Node): KeyAlter;
export interface KeyAccidental extends String {
}
export declare function xmlToKeyAccidental(node: Node): KeyAccidental;
export interface Beats extends String {
}
export declare function xmlToBeats(node: Node): Beats;
export interface BeatType extends String {
}
export declare function xmlToBeatType(node: Node): BeatType;
export interface TimeRelation extends String {
}
export declare function xmlToTimeRelation(node: Node): TimeRelation;
export interface SenzaMisura extends String {
}
export declare function xmlToSenzaMisura(node: Node): SenzaMisura;
export interface Instruments extends String {
}
export declare function xmlToInstruments(node: Node): Instruments;
export interface Sign extends String {
}
export declare function xmlToSign(node: Node): Sign;
export interface ClefOctaveChange extends String {
}
export declare function xmlToClefOctaveChange(node: Node): ClefOctaveChange;
export interface StaffType extends String {
}
export declare function xmlToStaffType(node: Node): StaffType;
export interface Capo extends String {
}
export declare function xmlToCapo(node: Node): Capo;
export interface Diatonic extends String {
}
export declare function xmlToDiatonic(node: Node): Diatonic;
export interface Chromatic extends String {
}
export declare function xmlToChromatic(node: Node): Chromatic;
export interface OctaveChange extends String {
}
export declare function xmlToOctaveChange(node: Node): OctaveChange;
export interface SlashType extends String {
}
export declare function xmlToSlashType(node: Node): SlashType;
export interface DisplayStep extends String {
}
export declare function xmlToDisplayStep(node: Node): DisplayStep;
export interface DisplayOctave extends String {
}
export declare function xmlToDisplayOctave(node: Node): DisplayOctave;
export interface BendAlter extends String {
}
export declare function xmlToBendAlter(node: Node): BendAlter;
export interface HoleType extends String {
}
export declare function xmlToHoleType(node: Node): HoleType;
export interface HoleShape extends String {
}
export declare function xmlToHoleShape(node: Node): HoleShape;
export interface ArrowDirection extends String {
}
export declare function xmlToArrowDirection(node: Node): ArrowDirection;
export interface ArrowStyle extends String {
}
export declare function xmlToArrowStyle(node: Node): ArrowStyle;
export interface CircularArrow extends String {
}
export declare function xmlToCircularArrow(node: Node): CircularArrow;
export interface BeatUnit extends String {
}
export declare function xmlToBeatUnit(node: Node): BeatUnit;
export interface MetronomeRelation extends String {
}
export declare function xmlToMetronomeRelation(node: Node): MetronomeRelation;
export interface MetronomeType extends String {
}
export declare function xmlToMetronomeType(node: Node): MetronomeType;
export interface PedalStep extends String {
}
export declare function xmlToPedalStep(node: Node): PedalStep;
export interface PedalAlter extends String {
}
export declare function xmlToPedalAlter(node: Node): PedalAlter;
export interface AccordionMiddle extends String {
}
export declare function xmlToAccordionMiddle(node: Node): AccordionMiddle;
export interface Glass extends String {
}
export declare function xmlToGlass(node: Node): Glass;
export interface Metal extends String {
}
export declare function xmlToMetal(node: Node): Metal;
export interface Wood extends String {
}
export declare function xmlToWood(node: Node): Wood;
export interface Pitched extends String {
}
export declare function xmlToPitched(node: Node): Pitched;
export interface Membrane extends String {
}
export declare function xmlToMembrane(node: Node): Membrane;
export interface Effect extends String {
}
export declare function xmlToEffect(node: Node): Effect;
export interface StickType extends String {
}
export declare function xmlToStickType(node: Node): StickType;
export interface StickMaterial extends String {
}
export declare function xmlToStickMaterial(node: Node): StickMaterial;
export interface StickLocation extends String {
}
export declare function xmlToStickLocation(node: Node): StickLocation;
export interface OtherPercussion extends String {
}
export declare function xmlToOtherPercussion(node: Node): OtherPercussion;
export interface FrameStrings extends String {
}
export declare function xmlToFrameStrings(node: Node): FrameStrings;
export interface FrameFrets extends String {
}
export declare function xmlToFrameFrets(node: Node): FrameFrets;
export interface WorkNumber extends String {
}
export declare function xmlToWorkNumber(node: Node): WorkNumber;
export interface WorkTitle extends String {
}
export declare function xmlToWorkTitle(node: Node): WorkTitle;
export interface MovementNumber extends String {
}
export declare function xmlToMovementNumber(node: Node): MovementNumber;
export interface MovementTitle extends String {
}
export declare function xmlToMovementTitle(node: Node): MovementTitle;
export interface CreditType extends String {
}
export declare function xmlToCreditType(node: Node): CreditType;
export interface Group extends String {
}
export declare function xmlToGroup(node: Node): Group;
export interface InstrumentName extends String {
}
export declare function xmlToInstrumentName(node: Node): InstrumentName;
export interface InstrumentAbbreviation extends String {
}
export declare function xmlToInstrumentAbbreviation(node: Node): InstrumentAbbreviation;
export interface InstrumentSound extends String {
}
export declare function xmlToInstrumentSound(node: Node): InstrumentSound;
export interface Ensemble extends String {
}
export declare function xmlToEnsemble(node: Node): Ensemble;
export interface VirtualLibrary extends String {
}
export declare function xmlToVirtualLibrary(node: Node): VirtualLibrary;
export interface VirtualName extends String {
}
export declare function xmlToVirtualName(node: Node): VirtualName;
export interface CalendarDate {
    month: number;
    day: number;
    year: number;
}
export interface CalendarDateComplete {
    month: number;
    day: number;
    year: number;
}
export interface Tenths extends String {
}
export declare function xmlToTenths(node: Node): Tenths;
export interface LayoutTenths extends String {
}
export declare function xmlToLayoutTenths(node: Node): LayoutTenths;
export declare enum StartStop {
    Start = 0,
    Stop = 1,
}
export declare function getStartStop(node: Node, fallbackVal?: StartStop): StartStop;
export declare enum StartStopContinue {
    Start = 0,
    Stop = 1,
    Continue = 2,
}
export declare function getStartStopContinue(node: Node, fallbackVal?: StartStopContinue): StartStopContinue;
export declare enum StartStopSingle {
    Single = 3,
    Start = 0,
    Stop = 1,
}
export declare function getStartStopSingle(node: Node, fallbackVal?: StartStopSingle): StartStopSingle;
export interface YesNoNumber {
    yesNo: boolean;
    isYesNo: boolean;
    num: number;
}
export interface YesNoNumberComplete {
    yesNo: boolean;
    isYesNo: boolean;
    num: number;
}
export declare enum SymbolSize {
    Unspecified = 0,
    Full = 1,
    Cue = 2,
    Large = 3,
}
export declare function getSymbolSize(node: Node, fallbackVal?: SymbolSize): SymbolSize;
export declare enum AboveBelow {
    Above = 1,
    Below = 2,
    Unspecified = 0,
}
export declare function getAboveBelow(node: Node, fallbackVal?: AboveBelow): AboveBelow;
export declare enum OverUnder {
    Over = 1,
    Under = 2,
    Unspecified = 0,
}
export declare function getOverUnder(node: Node, fallbackVal?: OverUnder): OverUnder;
export declare enum UpDown {
    Down = 1,
    Up = 0,
}
export declare function getUpDown(node: Node, fallbackVal?: UpDown): UpDown;
export declare enum TopBottom {
    Top = 0,
    Bottom = 1,
}
export declare function getTopBottom(node: Node, fallbackVal?: TopBottom): TopBottom;
export declare enum LeftRight {
    Right = 1,
    Left = 0,
}
export declare function getLeftRight(node: Node, fallbackVal?: LeftRight): LeftRight;
export declare function verifyNumberOfLines(m: number): void;
export declare function xmlToNumberOfLines(node: Node): number;
export declare function verifyRotation(m: number): void;
export declare function xmlToRotation(node: Node): number;
export declare enum EnclosureShape {
    Circle = 3,
    Bracket = 4,
    Triangle = 5,
    Diamond = 6,
    None = 7,
    Square = 1,
    Oval = 2,
    Rectangle = 0,
}
export declare function getEnclosureShape(node: Node, fallbackVal?: EnclosureShape): EnclosureShape;
export declare enum NormalItalic {
    Italic = 1,
    Normal = 0,
}
export declare function getNormalItalic(node: Node, fallbackVal?: NormalItalic): NormalItalic;
export declare enum NormalBold {
    Bold = 2,
    Normal = 0,
}
export declare function getNormalBold(node: Node, fallbackVal?: NormalBold): NormalBold;
export declare function verifyNumberLevel(m: number): void;
export declare function xmlToNumberLevel(node: Node): number;
export declare function verifyBeamLevel(m: number): void;
export declare function xmlToBeamLevel(node: Node): number;
export interface Position {
    defaultX?: number;
    relativeY?: number;
    defaultY?: number;
    relativeX?: number;
}
export interface PositionComplete {
    defaultX: number;
    relativeY: number;
    defaultY: number;
    relativeX: number;
}
export declare function xmlToPosition(node: Node): Position;
export interface Placement {
    placement?: AboveBelow;
}
export interface PlacementComplete {
    placement: AboveBelow;
}
export declare function xmlToPlacement(node: Node): Placement;
export interface Orientation {
    orientation?: OverUnder;
}
export interface OrientationComplete {
    orientation: OverUnder;
}
export declare function xmlToOrientation(node: Node): Orientation;
export interface DirectiveEntity {
    directiveEntity?: boolean;
}
export interface DirectiveEntityComplete {
    directiveEntity: boolean;
}
export declare function xmlToDirectiveEntity(node: Node): DirectiveEntity;
export interface Bezier {
    bezierX2?: number;
    bezierOffset?: number;
    bezierOffset2?: number;
    bezierX?: number;
    bezierY?: number;
    bezierY2?: number;
}
export interface BezierComplete {
    bezierX2: number;
    bezierOffset: number;
    bezierOffset2: number;
    bezierX: number;
    bezierY: number;
    bezierY2: number;
}
export declare function xmlToBezier(node: Node): Bezier;
export interface Font {
    fontFamily?: string;
    fontWeight?: NormalBold;
    fontStyle?: NormalItalic;
    fontSize?: string;
}
export interface FontComplete {
    fontFamily: string;
    fontWeight: NormalBold;
    fontStyle: NormalItalic;
    fontSize: string;
}
export declare function xmlToFont(node: Node): Font;
export declare enum LeftCenterRight {
    Right = 1,
    Center = 2,
    Left = 0,
}
export declare function getLeftCenterRight(node: Node, fallbackVal?: LeftCenterRight): LeftCenterRight;
export declare enum TopMiddleBottomBaseline {
    Top = 0,
    Middle = 1,
    Baseline = 3,
    Bottom = 2,
}
export declare function getTopMiddleBottomBaseline(node: Node, fallbackVal?: TopMiddleBottomBaseline): TopMiddleBottomBaseline;
export declare enum DirectionMode {
    Lro = 2,
    Rlo = 3,
    Ltr = 0,
    Rtl = 1,
}
export declare function getDirectionMode(node: Node, fallbackVal?: DirectionMode): DirectionMode;
export declare enum StraightCurved {
    Curved = 1,
    Straight = 0,
}
export declare function getStraightCurved(node: Node, fallbackVal?: StraightCurved): StraightCurved;
export declare enum SolidDashedDottedWavy {
    Dashed = 1,
    Wavy = 3,
    Dotted = 2,
    Solid = 0,
}
export declare function getSolidDashedDottedWavy(node: Node, fallbackVal?: SolidDashedDottedWavy): SolidDashedDottedWavy;
export declare enum NormalAngledSquare {
    Angled = 1,
    Square = 2,
    Normal = 0,
}
export declare function getNormalAngledSquare(node: Node, fallbackVal?: NormalAngledSquare): NormalAngledSquare;
export declare enum UprightInverted {
    Upright = 0,
    Inverted = 1,
}
export declare function getUprightInverted(node: Node, fallbackVal?: UprightInverted): UprightInverted;
export declare enum UpperMainBelow {
    Main = 1,
    Below = 2,
    Upper = 0,
}
export declare function getUpperMainBelow(node: Node, fallbackVal?: UpperMainBelow): UpperMainBelow;
export declare enum WholeHalfUnison {
    Unison = 2,
    Whole = 0,
    Half = 1,
}
export declare function getWholeHalfUnison(node: Node, fallbackVal?: WholeHalfUnison): WholeHalfUnison;
export declare enum WholeHalfNone {
    None = 3,
    Whole = 0,
    Half = 1,
}
export declare function getWholeHalfNone(node: Node, fallbackVal?: WholeHalfNone): WholeHalfNone;
export interface Color {
    color?: string;
}
export interface ColorComplete {
    color: string;
}
export declare function xmlToColor(node: Node): Color;
export interface TextDecoration {
    underline?: number;
    overline?: number;
    lineThrough?: number;
}
export interface TextDecorationComplete {
    underline: number;
    overline: number;
    lineThrough: number;
}
export declare function xmlToTextDecoration(node: Node): TextDecoration;
export interface Justify {
    justify?: LeftCenterRight;
}
export interface JustifyComplete {
    justify: LeftCenterRight;
}
export declare function xmlToJustify(node: Node): Justify;
export interface Halign {
    halign?: LeftCenterRight;
}
export interface HalignComplete {
    halign: LeftCenterRight;
}
export declare function xmlToHalign(node: Node): Halign;
export interface Valign {
    valign?: TopMiddleBottomBaseline;
}
export interface ValignComplete {
    valign: TopMiddleBottomBaseline;
}
export declare function xmlToValign(node: Node): Valign;
export interface ValignImage {
    valignImage?: TopMiddleBottomBaseline;
}
export interface ValignImageComplete {
    valignImage: TopMiddleBottomBaseline;
}
export declare function xmlToValignImage(node: Node): ValignImage;
export interface LetterSpacing {
    letterSpacing?: string;
}
export interface LetterSpacingComplete {
    letterSpacing: string;
}
export declare function xmlToLetterSpacing(node: Node): LetterSpacing;
export interface LineHeight {
    lineHeight?: string;
}
export interface LineHeightComplete {
    lineHeight: string;
}
export declare function xmlToLineHeight(node: Node): LineHeight;
export interface TextDirection {
    dir?: DirectionMode;
}
export interface TextDirectionComplete {
    dir: DirectionMode;
}
export declare function xmlToTextDirection(node: Node): TextDirection;
export interface TextRotation {
    rotation?: number;
}
export interface TextRotationComplete {
    rotation: number;
}
export declare function xmlToTextRotation(node: Node): TextRotation;
export interface Enclosure {
    enclosure?: EnclosureShape;
}
export interface EnclosureComplete {
    enclosure: EnclosureShape;
}
export declare function xmlToEnclosure(node: Node): Enclosure;
export interface PrintStyle extends Position, Font, Color {
}
export interface PrintStyleComplete extends PositionComplete, FontComplete, ColorComplete {
}
export declare function xmlToPrintStyle(node: Node): PrintStyle;
export interface PrintStyleAlign extends PrintStyle, Halign, Valign {
}
export interface PrintStyleAlignComplete extends PrintStyleComplete, HalignComplete, ValignComplete {
}
export declare function xmlToPrintStyleAlign(node: Node): PrintStyleAlign;
export interface LineShape {
    lineShape?: StraightCurved;
}
export interface LineShapeComplete {
    lineShape: StraightCurved;
}
export declare function xmlToLineShape(node: Node): LineShape;
export interface LineType {
    lineType?: SolidDashedDottedWavy;
}
export interface LineTypeComplete {
    lineType: SolidDashedDottedWavy;
}
export interface DashedFormatting {
    dashLength?: number;
    spaceLength?: number;
}
export interface DashedFormattingComplete {
    dashLength: number;
    spaceLength: number;
}
export declare function xmlToDashedFormatting(node: Node): DashedFormatting;
export interface PrintObject {
    printObject?: boolean;
}
export interface PrintObjectComplete {
    printObject: boolean;
}
export declare function xmlToPrintObject(node: Node): PrintObject;
export interface PrintSpacing {
    printSpacing?: boolean;
}
export interface PrintSpacingComplete {
    printSpacing: boolean;
}
export declare function xmlToPrintSpacing(node: Node): PrintSpacing;
export interface Printout extends PrintObject, PrintSpacing {
    printDot?: boolean;
    printLyric?: boolean;
}
export interface PrintoutComplete extends PrintObjectComplete, PrintSpacingComplete {
    printDot: boolean;
    printLyric: boolean;
}
export interface TextFormatting extends Justify, PrintStyleAlign, TextDecoration, TextRotation, LetterSpacing, LineHeight, TextDirection, Enclosure {
}
export interface TextFormattingComplete extends JustifyComplete, PrintStyleAlignComplete, TextDecorationComplete, TextRotationComplete, LetterSpacingComplete, LineHeightComplete, TextDirectionComplete, EnclosureComplete {
}
export declare function xmlToTextFormatting(node: Node): TextFormatting;
export interface LevelDisplay {
    bracket?: boolean;
    size?: SymbolSize;
    parentheses?: boolean;
}
export interface LevelDisplayComplete {
    bracket: boolean;
    size: SymbolSize;
    parentheses: boolean;
}
export declare function xmlToLevelDisplay(node: Node): LevelDisplay;
export interface TrillSound {
    startNote?: UpperMainBelow;
    accelerate?: boolean;
    beats?: number;
    lastBeat?: number;
    trillStep?: WholeHalfUnison;
    twoNoteTurn?: WholeHalfNone;
    secondBeat?: number;
}
export interface TrillSoundComplete {
    startNote: UpperMainBelow;
    accelerate: boolean;
    beats: number;
    lastBeat: number;
    trillStep: WholeHalfUnison;
    twoNoteTurn: WholeHalfNone;
    secondBeat: number;
}
export declare function xmlToTrillSound(node: Node): TrillSound;
export interface BendSound {
    accelerate?: boolean;
    beats?: number;
    lastBeat?: number;
    secondBeat?: number;
}
export interface BendSoundComplete {
    accelerate: boolean;
    beats: number;
    lastBeat: number;
    secondBeat: number;
}
export declare function xmlToBendSound(node: Node): BendSound;
export interface TimeOnly {
    timeOnly: string;
}
export interface TimeOnlyComplete {
    timeOnly: string;
}
export declare function xmlToTimeOnly(node: Node): TimeOnly;
export interface DocumentAttributes {
    version_: string;
}
export interface DocumentAttributesComplete {
    version_: string;
}
export declare function xmlToDocumentAttributes(node: Node): DocumentAttributes;
export interface Editorial {
    footnote?: Footnote;
    level?: Level;
}
export interface EditorialComplete {
    footnote: Footnote;
    level: Level;
}
export declare function xmlToEditorial(node: Node): Editorial;
export interface EditorialVoice {
    voice?: string;
    footnote?: Footnote;
    level?: Level;
}
export interface EditorialVoiceComplete {
    voice: string;
    footnote: Footnote;
    level: Level;
}
export declare function xmlToEditorialVoice(node: Node): EditorialVoice;
export interface Footnote extends TextFormatting {
    text: string;
}
export interface FootnoteComplete extends TextFormattingComplete {
    text: string;
}
export declare function xmlToFootnote(node: Node): Footnote;
export interface Level extends LevelDisplay {
    text: string;
    reference?: boolean;
}
export interface LevelComplete extends LevelDisplayComplete {
    text: string;
    reference: boolean;
}
export declare function xmlToLevel(node: Node): Level;
export interface Fermata extends PrintStyle {
    shape: NormalAngledSquare;
    type?: UprightInverted;
}
export interface FermataComplete extends PrintStyleComplete {
    shape: NormalAngledSquare;
    type: UprightInverted;
}
export declare function xmlToFermata(node: Node): Fermata;
export interface WavyLine extends Position, Placement, Color, TrillSound {
    number_?: number;
    type: StartStopContinue;
}
export interface WavyLineComplete extends PositionComplete, PlacementComplete, ColorComplete, TrillSoundComplete {
    number_: number;
    type: StartStopContinue;
}
export declare function xmlToWavyLine(node: Node): WavyLine;
export interface Staff {
    idx: number;
}
export interface StaffComplete {
    idx: number;
}
export declare function xmlToStaff(node: Node): Staff;
export interface Segno extends PrintStyleAlign {
}
export interface SegnoComplete extends PrintStyleAlignComplete {
}
export declare function xmlToSegno(node: Node): Segno;
export interface Coda extends PrintStyleAlign {
}
export interface CodaComplete extends PrintStyleAlignComplete {
}
export declare function xmlToCoda(node: Node): Coda;
export interface ActualNotes {
    count: number;
}
export interface ActualNotesComplete {
    count: number;
}
export declare function xmlToActualNotes(node: Node): ActualNotes;
export interface NormalNotes {
    count: number;
}
export interface NormalNotesComplete {
    count: number;
}
export declare function xmlToNormalNotes(node: Node): NormalNotes;
export interface NormalDot {
}
export interface NormalDotComplete {
}
export declare function xmlToNormalDot(node: Node): NormalDot;
export interface Dynamics extends PrintStyleAlign, Placement, TextDecoration, Enclosure {
    fp: boolean;
    pp: boolean;
    ppp: boolean;
    fff: boolean;
    sf: boolean;
    rf: boolean;
    mp: boolean;
    sfpp: boolean;
    f: boolean;
    ffffff: boolean;
    sfz: boolean;
    ff: boolean;
    pppppp: boolean;
    rfz: boolean;
    otherDynamics?: string;
    fz: boolean;
    ppppp: boolean;
    mf: boolean;
    pppp: boolean;
    fffff: boolean;
    sffz: boolean;
    sfp: boolean;
    p: boolean;
    ffff: boolean;
}
export interface DynamicsComplete extends PrintStyleAlignComplete, PlacementComplete, TextDecorationComplete, EnclosureComplete {
    fp: boolean;
    pp: boolean;
    ppp: boolean;
    fff: boolean;
    sf: boolean;
    rf: boolean;
    mp: boolean;
    sfpp: boolean;
    f: boolean;
    ffffff: boolean;
    sfz: boolean;
    ff: boolean;
    pppppp: boolean;
    rfz: boolean;
    otherDynamics: string;
    fz: boolean;
    ppppp: boolean;
    mf: boolean;
    pppp: boolean;
    fffff: boolean;
    sffz: boolean;
    sfp: boolean;
    p: boolean;
    ffff: boolean;
}
export declare function xmlToDynamics(node: Node): Dynamics;
export interface Fingering extends PrintStyle, Placement {
    substitution?: boolean;
    finger: number;
    alternate?: boolean;
}
export interface FingeringComplete extends PrintStyleComplete, PlacementComplete {
    substitution: boolean;
    finger: number;
    alternate: boolean;
}
export declare function xmlToFingering(node: Node): Fingering;
export interface Fret extends Font, Color {
    fret: number;
}
export interface FretComplete extends FontComplete, ColorComplete {
    fret: number;
}
export declare function xmlToFret(node: Node): Fret;
export interface String extends PrintStyle, Placement {
    stringNum: number;
}
export interface StringComplete extends PrintStyleComplete, PlacementComplete {
    stringNum: number;
}
export declare function xmlToString(node: Node): String;
export interface TuningAlter {
    step: string;
}
export interface TuningAlterComplete {
    step: string;
}
export declare function xmlToTuningAlter(node: Node): TuningAlter;
export interface TuningOctave {
    step: string;
}
export interface TuningOctaveComplete {
    step: string;
}
export declare function xmlToTuningOctave(node: Node): TuningOctave;
export interface DisplayText extends TextFormatting {
    text: string;
}
export interface DisplayTextComplete extends TextFormattingComplete {
    text: string;
}
export declare function xmlToDisplayText(node: Node): DisplayText;
export interface AccidentalText extends TextFormatting {
    text: string;
}
export interface AccidentalTextComplete extends TextFormattingComplete {
    text: string;
}
export declare function xmlToAccidentalText(node: Node): AccidentalText;
export interface PartNameDisplay extends PrintObject {
    name: TextArray;
}
export interface PartNameDisplayComplete extends PrintObjectComplete {
    name: TextArray;
}
export interface PartAbbreviationDisplay extends PrintObject {
    name: TextArray;
}
export interface PartAbbreviationDisplayComplete extends PrintObjectComplete {
    name: TextArray;
}
export interface MidiDevice {
    port?: number;
    deviceName: string;
    id?: number;
}
export interface MidiDeviceComplete {
    port: number;
    deviceName: string;
    id: number;
}
export declare function xmlToMidiDevice(node: Node): MidiDevice;
export declare function verifyMidiChannel(m: number): void;
export declare function xmlToMidiChannel(node: Node): number;
export declare function verifyMidiBank(m: number): void;
export declare function xmlToMidiBank(node: Node): number;
export declare function verifyMidiProgram(m: number): void;
export declare function xmlToMidiProgram(node: Node): number;
export declare function verifyMidiUnpitched(m: number): void;
export declare function xmlToMidiUnpitched(node: Node): number;
export declare function verifyVolume(m: number): void;
export declare function xmlToVolume(node: Node): number;
export declare function verifyPan(m: number): void;
export declare function xmlToPan(node: Node): number;
export declare function verifyElevation(m: number): void;
export declare function xmlToElevation(node: Node): number;
export interface MidiInstrument {
    midiUnpitched?: number;
    volume?: number;
    pan?: number;
    elevation?: number;
    midiBank?: number;
    midiProgram?: number;
    id: string;
    midiChannel?: number;
    midiName?: string;
}
export interface MidiInstrumentComplete {
    midiUnpitched: number;
    volume: number;
    pan: number;
    elevation: number;
    midiBank: number;
    midiProgram: number;
    id: string;
    midiChannel: number;
    midiName: string;
}
export declare function xmlToMidiInstrument(node: Node): MidiInstrument;
export interface Play {
    ipa?: string;
    mute?: string;
    otherPlay?: string;
    semiPitched?: string;
}
export interface PlayComplete {
    ipa: string;
    mute: string;
    otherPlay: string;
    semiPitched: string;
}
export declare function xmlToPlay(node: Node): Play;
export interface Millimeters extends String {
}
export declare function xmlToMillimeters(node: Node): Millimeters;
export interface Scaling {
    tenths?: number;
    millimeters?: number;
}
export interface ScalingComplete {
    tenths: number;
    millimeters: number;
}
export declare function xmlToScaling(node: Node): Scaling;
export interface LeftMargin extends String {
}
export declare function xmlToLeftMargin(node: Node): LeftMargin;
export interface RightMargin extends String {
}
export declare function xmlToRightMargin(node: Node): RightMargin;
export interface TopMargin extends String {
}
export declare function xmlToTopMargin(node: Node): TopMargin;
export interface BottomMargin extends String {
}
export declare function xmlToBottomMargin(node: Node): BottomMargin;
export interface PageHeight extends String {
}
export declare function xmlToPageHeight(node: Node): PageHeight;
export interface PageWidth extends String {
}
export declare function xmlToPageWidth(node: Node): PageWidth;
export declare enum OddEvenBoth {
    Both = 2,
    Even = 1,
    Odd = 0,
}
export declare function getOddEvenBoth(node: Node, fallbackVal?: OddEvenBoth): OddEvenBoth;
export interface PageMargins {
    topMargin: number;
    leftMargin: number;
    bottomMargin: number;
    type?: OddEvenBoth;
    rightMargin: number;
}
export interface PageMarginsComplete {
    topMargin: number;
    leftMargin: number;
    bottomMargin: number;
    type: OddEvenBoth;
    rightMargin: number;
}
export declare function xmlToPageMargins(node: Node): PageMargins;
export interface PageLayout {
    pageHeight?: number;
    pageWidth?: number;
    pageMargins?: PageMargins[];
}
export interface PageLayoutComplete {
    pageHeight: number;
    pageWidth: number;
    pageMargins: PageMargins[];
}
export declare function xmlToPageLayout(node: Node): PageLayout;
export interface SystemDistance extends String {
}
export declare function xmlToSystemDistance(node: Node): SystemDistance;
export interface TopSystemDistance extends String {
}
export declare function xmlToTopSystemDistance(node: Node): TopSystemDistance;
export interface SystemLayout {
    systemDividers?: SystemDividers;
    systemMargins?: SystemMargins;
    systemDistance?: number;
    topSystemDistance?: number;
}
export interface SystemLayoutComplete {
    systemDividers: SystemDividers;
    systemMargins: SystemMargins;
    systemDistance: number;
    topSystemDistance: number;
}
export declare function xmlToSystemLayout(node: Node): SystemLayout;
export interface SystemMargins {
    leftMargin: number;
    rightMargin: number;
}
export interface SystemMarginsComplete {
    leftMargin: number;
    rightMargin: number;
}
export declare function xmlToSystemMargins(node: Node): SystemMargins;
export interface SystemDividers {
    rightDivider: RightDivider;
    leftDivider: LeftDivider;
}
export interface SystemDividersComplete {
    rightDivider: RightDivider;
    leftDivider: LeftDivider;
}
export declare function xmlToSystemDividers(node: Node): SystemDividers;
export interface LeftDivider extends PrintObject, PrintStyleAlign {
}
export interface LeftDividerComplete extends PrintObjectComplete, PrintStyleAlignComplete {
}
export declare function xmlToLeftDivider(node: Node): LeftDivider;
export interface RightDivider extends PrintObject, PrintStyleAlign {
}
export interface RightDividerComplete extends PrintObjectComplete, PrintStyleAlignComplete {
}
export declare function xmlToRightDivider(node: Node): RightDivider;
export interface StaffDistance extends String {
}
export declare function xmlToStaffDistance(node: Node): StaffDistance;
export interface StaffLayout {
    staffDistance?: number;
    num: number;
}
export interface StaffLayoutComplete {
    staffDistance: number;
    num: number;
}
export declare function xmlToStaffLayout(node: Node): StaffLayout;
export interface MeasureDistance extends String {
}
export declare function xmlToMeasureDistance(node: Node): MeasureDistance;
export interface MeasureLayout {
    measureDistance?: number;
}
export interface MeasureLayoutComplete {
    measureDistance: number;
}
export declare function xmlToMeasureLayout(node: Node): MeasureLayout;
export interface LineWidth {
    tenths: number;
    type: string;
}
export interface LineWidthComplete {
    tenths: number;
    type: string;
}
export declare function xmlToLineWidth(node: Node): LineWidth;
export declare enum CueGraceLarge {
    Grace = 1,
    Cue = 0,
    Large = 2,
}
export declare function getCueGraceLarge(node: Node, fallbackVal?: CueGraceLarge): CueGraceLarge;
export interface NoteSize {
    size: number;
    type: CueGraceLarge;
}
export interface NoteSizeComplete {
    size: number;
    type: CueGraceLarge;
}
export declare function xmlToNoteSize(node: Node): NoteSize;
export interface Distance {
    tenths: number;
    type: string;
}
export interface DistanceComplete {
    tenths: number;
    type: string;
}
export declare function xmlToDistance(node: Node): Distance;
export interface Appearance {
    lineWidths?: {
        [x: string]: LineWidth;
    };
    distances?: {
        [x: string]: Distance;
    };
    otherAppearances?: string[];
    noteSizes?: {
        [x: string]: NoteSize;
    };
}
export interface AppearanceComplete {
    lineWidths: {
        [x: string]: LineWidth;
    };
    distances: {
        [x: string]: Distance;
    };
    otherAppearances: string[];
    noteSizes: {
        [x: string]: NoteSize;
    };
}
export declare function xmlToAppearance(node: Node): Appearance;
export interface Creator {
    creator: string;
    type: string;
}
export interface CreatorComplete {
    creator: string;
    type: string;
}
export declare function xmlToCreator(node: Node): Creator;
export interface Rights {
    type: string;
    rights: string;
}
export interface RightsComplete {
    type: string;
    rights: string;
}
export declare function xmlToRights(node: Node): Rights;
export interface Encoder {
    encoder: string;
    type: string;
}
export interface EncoderComplete {
    encoder: string;
    type: string;
}
export declare function xmlToEncoder(node: Node): Encoder;
export interface Source {
    source: string;
}
export interface SourceComplete {
    source: string;
}
export declare function xmlToSource(node: Node): Source;
export interface Relation {
    type: string;
    data: string;
}
export interface RelationComplete {
    type: string;
    data: string;
}
export declare function xmlToRelation(node: Node): Relation;
export interface MiscellaneousField {
    data: string;
    name: string;
}
export interface MiscellaneousFieldComplete {
    data: string;
    name: string;
}
export declare function xmlToMiscellaneousField(node: Node): MiscellaneousField;
export interface Miscellaneous {
    miscellaneousFields?: MiscellaneousField[];
}
export interface MiscellaneousComplete {
    miscellaneousFields: MiscellaneousField[];
}
export declare function xmlToMiscellaneous(node: Node): Miscellaneous;
export interface Identification {
    miscellaneous: Miscellaneous;
    creators?: Creator[];
    relations?: Relation[];
    rights?: Rights[];
    encoding: Encoding;
    source: Source;
}
export interface IdentificationComplete {
    miscellaneous: Miscellaneous;
    creators: Creator[];
    relations: Relation[];
    rights: Rights[];
    encoding: Encoding;
    source: Source;
}
export declare function xmlToIdentification(node: Node): Identification;
export interface Supports {
    element: string;
    attribute?: string;
    value: string;
    type: string;
}
export interface SupportsComplete {
    element: string;
    attribute: string;
    value: string;
    type: string;
}
export declare function xmlToSupports(node: Node): Supports;
export interface Encoding {
    encodingDescriptions?: string[];
    encodingDate?: EncodingDate;
    supports?: {
        [x: string]: Supports;
    };
    encoders?: Encoder[];
    softwares?: string[];
}
export interface EncodingComplete {
    encodingDescriptions: string[];
    encodingDate: EncodingDate;
    supports: {
        [x: string]: Supports;
    };
    encoders: Encoder[];
    softwares: string[];
}
export declare function xmlToEncoding(node: Node): Encoding;
export declare enum SeparatorType {
    None = 0,
    Horizontal = 1,
    Diagonal = 2,
    Vertical = 3,
    Adjacent = 4,
}
export declare function getSeparatorType(node: Node, fallbackVal?: SeparatorType): SeparatorType;
export interface TimeSeparator {
    separator?: SeparatorType;
}
export interface TimeSeparatorComplete {
    separator: SeparatorType;
}
export declare function xmlToTimeSeparator(node: Node): TimeSeparator;
export declare enum TimeSymbolType {
    DottedNote = 4,
    Cut = 1,
    SingleNumber = 2,
    Note = 3,
    Common = 0,
    Normal = 5,
}
export declare function getTimeSymbolType(node: Node, fallbackVal?: TimeSymbolType): TimeSymbolType;
export interface TimeSymbol {
    symbol?: TimeSymbolType;
}
export interface TimeSymbolComplete {
    symbol: TimeSymbolType;
}
export declare function xmlToTimeSymbol(node: Node): TimeSymbol;
export declare enum CancelLocation {
    Right = 1,
    BeforeBarline = 2,
    Left = 0,
}
export declare function getCancelLocation(node: Node, fallbackVal?: CancelLocation): CancelLocation;
export interface Cancel {
    fifths: number;
    location?: CancelLocation;
}
export interface CancelComplete {
    fifths: number;
    location: CancelLocation;
}
export declare function xmlToCancel(node: Node): Cancel;
export interface Fifths extends String {
}
export declare function xmlToFifths(node: Node): Fifths;
export interface KeyOctave {
    octave: number;
    number_: number;
    cancel?: boolean;
}
export interface KeyOctaveComplete {
    octave: number;
    number_: number;
    cancel: boolean;
}
export declare function xmlToKeyOctave(node: Node): KeyOctave;
export interface Divisions extends String {
}
export declare function xmlToDivisions(node: Node): Divisions;
export interface Key extends PrintStyle, PrintObject {
    cancel?: Cancel;
    keySteps: string[];
    keyOctaves?: KeyOctave[];
    number_?: number;
    fifths: number;
    keyAlters: string[];
    keyAccidentals: string[];
    mode?: string;
}
export interface KeyComplete extends PrintStyleComplete, PrintObjectComplete {
    cancel: Cancel;
    keySteps: string[];
    keyOctaves: KeyOctave[];
    number_: number;
    fifths: number;
    keyAlters: string[];
    keyAccidentals: string[];
    mode: string;
}
export declare function xmlToKey(node: Node): Key;
export interface Time extends TimeSymbol, TimeSeparator, PrintStyleAlign, PrintObject {
    interchangeables?: Interchangeable[];
    beats: number[];
    beatTypes: number[];
    senzaMisura: boolean;
}
export interface TimeComplete extends TimeSymbolComplete, TimeSeparatorComplete, PrintStyleAlignComplete, PrintObjectComplete {
    interchangeables: Interchangeable[];
    beats: number[];
    beatTypes: number[];
    senzaMisura: boolean;
}
export declare function xmlToTime(node: Node): Time;
export interface Interchangeable extends TimeSymbol, TimeSeparator {
    beats: number[];
    beatTypes: number[];
    timeRelation?: string;
}
export interface InterchangeableComplete extends TimeSymbolComplete, TimeSeparatorComplete {
    beats: number[];
    beatTypes: number[];
    timeRelation: string;
}
export declare function xmlToInterchangeable(node: Node): Interchangeable;
export interface Staves extends String {
}
export declare function xmlToStaves(node: Node): Staves;
export declare enum PartSymbolType {
    None = 0,
    Line = 2,
    Bracket = 3,
    Square = 4,
    Brace = 1,
}
export declare function getPartSymbolType(node: Node, fallbackVal?: PartSymbolType): PartSymbolType;
export interface PartSymbol extends Position, Color {
    topStaff?: number;
    type: PartSymbolType;
    bottomStaff?: number;
}
export interface PartSymbolComplete extends PositionComplete, ColorComplete {
    topStaff: number;
    type: PartSymbolType;
    bottomStaff: number;
}
export declare function xmlToPartSymbol(node: Node): PartSymbol;
export interface Line extends String {
}
export declare function xmlToLine(node: Node): Line;
export interface Clef extends PrintStyle, PrintObject {
    clefOctaveChange: string;
    sign: string;
    number_?: number;
    size?: SymbolSize;
    line: number;
    afterBarline?: boolean;
    additional?: boolean;
}
export interface ClefComplete extends PrintStyleComplete, PrintObjectComplete {
    clefOctaveChange: string;
    sign: string;
    number_: number;
    size: SymbolSize;
    line: number;
    afterBarline: boolean;
    additional: boolean;
}
export declare function xmlToClef(node: Node): Clef;
export interface StaffLines extends String {
}
export declare function xmlToStaffLines(node: Node): StaffLines;
export interface StaffTuning {
    tuningAlter?: TuningAlter;
    line: string;
    tuningStep: string;
    tuningOctave: TuningOctave;
}
export interface StaffTuningComplete {
    tuningAlter: TuningAlter;
    line: string;
    tuningStep: string;
    tuningOctave: TuningOctave;
}
export declare function xmlToStaffTuning(node: Node): StaffTuning;
export interface StaffSize extends String {
}
export declare function xmlToStaffSize(node: Node): StaffSize;
export declare enum ShowFretsType {
    Letters = 1,
    Numbers = 0,
}
export declare function getShowFretsType(node: Node, fallbackVal?: ShowFretsType): ShowFretsType;
export interface StaffDetails extends PrintObject, PrintSpacing {
    staffLines?: number;
    staffTunings?: StaffTuning[];
    staffSize?: number;
    capo?: string;
    number_?: number;
    showFets?: ShowFretsType;
    staffType?: string;
}
export interface StaffDetailsComplete extends PrintObjectComplete, PrintSpacingComplete {
    staffLines: number;
    staffTunings: StaffTuning[];
    staffSize: number;
    capo: string;
    number_: number;
    showFets: ShowFretsType;
    staffType: string;
}
export declare function xmlToStaffDetails(node: Node): StaffDetails;
export interface Double {
}
export interface DoubleComplete {
}
export declare function xmlToDouble(node: Node): Double;
export interface Transpose {
    number_?: number;
    diatonic?: string;
    octaveChange?: string;
    double_?: Double;
    chromatic: string;
}
export interface TransposeComplete {
    number_: number;
    diatonic: string;
    octaveChange: string;
    double_: Double;
    chromatic: string;
}
export declare function xmlToTranspose(node: Node): Transpose;
export interface Directive extends PrintStyle {
    data: string;
}
export interface DirectiveComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToDirective(node: Node): Directive;
export interface SlashDot {
}
export interface SlashDotComplete {
}
export declare function xmlToSlashDot(node: Node): SlashDot;
export interface MultipleRest {
    multipleRest?: boolean;
    data: string;
}
export interface MultipleRestComplete {
    multipleRest: boolean;
    data: string;
}
export declare function xmlToMultipleRest(node: Node): MultipleRest;
export interface MeasureRepeat {
    slashed?: number;
    data?: string;
    type: StartStop;
}
export interface MeasureRepeatComplete {
    slashed: number;
    data: string;
    type: StartStop;
}
export declare function xmlToMeasureRepeat(node: Node): MeasureRepeat;
export interface BeatRepeat {
    slashType?: string;
    useDots?: boolean;
    slashDots?: SlashDot[];
    slases?: number;
    type: StartStop;
}
export interface BeatRepeatComplete {
    slashType: string;
    useDots: boolean;
    slashDots: SlashDot[];
    slases: number;
    type: StartStop;
}
export declare function xmlToBeatRepeat(node: Node): BeatRepeat;
export interface Slash {
    slashType?: string;
    useDots?: boolean;
    useStems?: boolean;
    slashDots?: SlashDot[];
    type: StartStop;
}
export interface SlashComplete {
    slashType: string;
    useDots: boolean;
    useStems: boolean;
    slashDots: SlashDot[];
    type: StartStop;
}
export declare function xmlToSlash(node: Node): Slash;
export interface MeasureStyle extends Font, Color {
    measureRepeat?: MeasureRepeat;
    beatRepeat?: BeatRepeat;
    multipleRest?: MultipleRest;
    slash?: Slash;
    number_?: number;
}
export interface MeasureStyleComplete extends FontComplete, ColorComplete {
    measureRepeat: MeasureRepeat;
    beatRepeat: BeatRepeat;
    multipleRest: MultipleRest;
    slash: Slash;
    number_: number;
}
export declare function xmlToMeasureStyle(node: Node): MeasureStyle;
export interface Attributes extends Editorial {
    divisions?: number;
    partSymbol?: PartSymbol;
    clef?: Clef;
    measureStyle?: MeasureStyle;
    time?: Time;
    staffDetails?: StaffDetails;
    transpose?: Transpose;
    staves?: number;
    instruments?: string;
    keySignature?: Key;
    directive?: Directive;
}
export interface AttributesComplete extends EditorialComplete {
    divisions: number;
    partSymbol: PartSymbol;
    clef: Clef;
    measureStyle: MeasureStyle;
    time: Time;
    staffDetails: StaffDetails;
    transpose: Transpose;
    staves: number;
    instruments: string;
    keySignature: Key;
    directive: Directive;
}
export declare function xmlToAttributes(node: Node): Attributes;
export interface Cue {
}
export interface CueComplete {
}
export declare function xmlToCue(node: Node): Cue;
export interface Grace {
    makeTime?: string;
    stealTimePrevious?: string;
    slash?: boolean;
    stealTimeFollowing?: string;
}
export interface GraceComplete {
    makeTime: string;
    stealTimePrevious: string;
    slash: boolean;
    stealTimeFollowing: string;
}
export declare function xmlToGrace(node: Node): Grace;
export interface Chord {
}
export interface ChordComplete {
}
export declare function xmlToChord(node: Node): Chord;
export interface Unpitched {
    displayStep?: string;
    displayOctave?: string;
}
export interface UnpitchedComplete {
    displayStep: string;
    displayOctave: string;
}
export declare function xmlToUnpitched(node: Node): Unpitched;
export interface Alter extends String {
}
export declare function xmlToAlter(node: Node): Alter;
export interface Octave extends String {
}
export declare function xmlToOctave(node: Node): Octave;
export interface Pitch {
    alter?: number;
    step?: string;
    octave: number;
}
export interface PitchComplete {
    alter: number;
    step: string;
    octave: number;
}
export declare function xmlToPitch(node: Node): Pitch;
export interface FullNote {
    unpitched?: Unpitched;
    chord?: Chord;
    pitch?: Pitch;
    rest?: Rest;
}
export interface FullNoteComplete {
    unpitched: Unpitched;
    chord: Chord;
    pitch: Pitch;
    rest: Rest;
}
export declare function xmlToFullNote(node: Node): FullNote;
export interface Rest {
    measure?: boolean;
    displayStep?: string;
    displayOctave?: string;
}
export interface RestComplete {
    measure: boolean;
    displayStep: string;
    displayOctave: string;
}
export declare function xmlToRest(node: Node): Rest;
export interface Duration extends String {
}
export declare function xmlToDuration(node: Node): Duration;
export interface Tie extends TimeOnly {
    type?: StartStop;
}
export interface TieComplete extends TimeOnlyComplete {
    type: StartStop;
}
export declare function xmlToTie(node: Node): Tie;
export interface Instrument {
    id: string;
}
export interface InstrumentComplete {
    id: string;
}
export declare function xmlToInstrument(node: Node): Instrument;
export interface Note extends EditorialVoice, PrintStyle, Printout, TimeOnly, FullNote {
    noteheadText?: NoteheadText;
    timeModification?: TimeModification;
    accidental?: Accidental;
    instrument?: Instrument;
    attack?: number;
    endDynamics?: number;
    lyrics?: Lyric[];
    dots?: Dot[];
    notations?: Notations[];
    stem?: Stem;
    noteType?: Type;
    pizzicato: boolean;
    cue?: Cue;
    duration?: number;
    ties?: Tie[];
    dynamics?: number;
    play?: Play;
    staff?: Staff;
    grace?: Grace;
    notehead?: Notehead;
    release?: number;
    beams?: Beam[];
}
export interface NoteComplete extends EditorialVoiceComplete, PrintStyleComplete, PrintoutComplete, TimeOnlyComplete, FullNoteComplete {
    noteheadText: NoteheadText;
    timeModification: TimeModification;
    accidental: Accidental;
    instrument: Instrument;
    attack: number;
    endDynamics: number;
    lyrics: Lyric[];
    dots: Dot[];
    notations: Notations[];
    stem: Stem;
    noteType: Type;
    pizzicato: boolean;
    cue: Cue;
    duration: number;
    ties: Tie[];
    dynamics: number;
    play: Play;
    staff: Staff;
    grace: Grace;
    notehead: Notehead;
    release: number;
    beams: Beam[];
}
export declare function xmlToNote(node: Node): Note;
export declare enum Count {
    Quarter = 4,
    Breve = 9990,
    Long = 9991,
    _1024th = 1024,
    _32nd = 32,
    _16th = 16,
    Eighth = 8,
    Maxima = 9992,
    _512th = 512,
    _64th = 64,
    _256th = 256,
    _128th = 128,
    Half = 2,
    Whole = 1,
}
export declare function getCount(node: Node, fallbackVal?: Count): Count;
export interface Type {
    duration: Count;
    size?: SymbolSize;
}
export interface TypeComplete {
    duration: Count;
    size: SymbolSize;
}
export declare function xmlToType(node: Node): Type;
export interface Dot extends PrintStyle, Placement {
}
export interface DotComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToDot(node: Node): Dot;
export declare enum MxmlAccidental {
    NaturalFlat = 7,
    SharpUp = 13,
    ThreeQuartersFlat = 10,
    ThreeQuartersSharp = 11,
    QuarterFlat = 8,
    Flat = 2,
    TripleSharp = 18,
    Flat1 = 27,
    Flat2 = 28,
    Flat3 = 29,
    Flat4 = 291,
    TripleFlat = 19,
    Flat5 = 30,
    Sharp = 0,
    QuarterSharp = 9,
    SlashFlat = 21,
    FlatDown = 16,
    NaturalDown = 14,
    SlashQuarterSharp = 19,
    SharpSharp = 4,
    Sharp1 = 23,
    FlatUp = 17,
    Sharp2 = 24,
    Sharp3 = 25,
    DoubleSharp = 3,
    Sharp4 = 251,
    Sharp5 = 26,
    Sori = 31,
    DoubleSlashFlat = 22,
    SharpDown = 12,
    Koron = 32,
    NaturalUp = 15,
    SlashSharp = 20,
    NaturalSharp = 6,
    FlatFlat = 5,
    Natural = 1,
    DoubleFlat = 33,
}
export declare function getMxmlAccidental(node: Node, fallbackVal?: MxmlAccidental): MxmlAccidental;
export interface Accidental extends LevelDisplay, PrintStyle {
    cautionary?: boolean;
    accidental: MxmlAccidental;
    editorial?: boolean;
}
export interface AccidentalComplete extends LevelDisplayComplete, PrintStyleComplete {
    cautionary: boolean;
    accidental: MxmlAccidental;
    editorial: boolean;
}
export declare function xmlToAccidental(node: Node): Accidental;
export interface TimeModification {
    actualNotes: ActualNotes;
    normalType?: string;
    normalNotes: NormalNotes;
    normalDots?: NormalDot[];
}
export interface TimeModificationComplete {
    actualNotes: ActualNotes;
    normalType: string;
    normalNotes: NormalNotes;
    normalDots: NormalDot[];
}
export declare function xmlToTimeModification(node: Node): TimeModification;
export declare enum StemType {
    None = 2,
    Double = 3,
    Down = 0,
    Up = 1,
}
export declare function getStemType(node: Node, fallbackVal?: StemType): StemType;
export interface Stem extends Position, Color {
    type: StemType;
}
export interface StemComplete extends PositionComplete, ColorComplete {
    type: StemType;
}
export declare function xmlToStem(node: Node): Stem;
export declare enum NoteheadType {
    InvertedTriangle = 7,
    CircleDot = 14,
    ArrowUp = 9,
    Do = 18,
    Mi = 20,
    Cross = 4,
    Slash = 0,
    Fa = 21,
    Triangle = 1,
    FaUp = 22,
    So = 23,
    LeftTriangle = 15,
    BackSlashed = 11,
    None = 17,
    La = 24,
    Slashed = 10,
    Normal = 12,
    Cluster = 13,
    Ti = 25,
    Re = 19,
    Nrectangle = 16,
    Square = 3,
    ArrowDown = 8,
    X = 5,
    Diamond = 2,
    CircleX = 6,
}
export declare function getNoteheadType(node: Node, fallbackVal?: NoteheadType): NoteheadType;
export interface Notehead extends Font, Color {
    type: NoteheadType;
    filled?: boolean;
    parentheses?: boolean;
}
export interface NoteheadComplete extends FontComplete, ColorComplete {
    type: NoteheadType;
    filled: boolean;
    parentheses: boolean;
}
export declare function xmlToNotehead(node: Node): Notehead;
export interface NoteheadText {
    text: TextArray;
}
export interface NoteheadTextComplete {
    text: TextArray;
}
export declare enum BeamType {
    BackwardHook = 4,
    Begin = 0,
    ForwardHook = 3,
    Continue = 1,
    End = 2,
}
export declare function getBeamType(node: Node, fallbackVal?: BeamType): BeamType;
export declare enum AccelRitNone {
    Accel = 0,
    None = 2,
    Rit = 1,
}
export declare function getAccelRitNone(node: Node, fallbackVal?: AccelRitNone): AccelRitNone;
export interface Beam {
    repeater?: boolean;
    number_: number;
    type: BeamType;
    fan?: AccelRitNone;
}
export interface BeamComplete {
    repeater: boolean;
    number_: number;
    type: BeamType;
    fan: AccelRitNone;
}
export declare function xmlToBeam(node: Node): Beam;
export interface Notations extends Editorial, PrintObject {
    slurs?: Slur[];
    articulations?: Articulations[];
    slides?: Slide[];
    technicals?: Technical[];
    tieds?: Tied[];
    tuplets?: Tuplet[];
    glissandos?: Glissando[];
    dynamics?: Dynamics[];
    fermatas?: Fermata[];
    accidentalMarks?: AccidentalMark[];
    ornaments?: Ornaments[];
    arpeggiates?: Arpeggiate[];
    nonArpeggiates?: NonArpeggiate[];
    otherNotations?: OtherNotation[];
}
export interface NotationsComplete extends EditorialComplete, PrintObjectComplete {
    slurs: Slur[];
    articulations: Articulations[];
    slides: Slide[];
    technicals: Technical[];
    tieds: Tied[];
    tuplets: Tuplet[];
    glissandos: Glissando[];
    dynamics: Dynamics[];
    fermatas: Fermata[];
    accidentalMarks: AccidentalMark[];
    ornaments: Ornaments[];
    arpeggiates: Arpeggiate[];
    nonArpeggiates: NonArpeggiate[];
    otherNotations: OtherNotation[];
}
export declare function xmlToNotations(node: Node): Notations;
export interface Tied extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
    number_?: number;
    type: StartStopContinue;
}
export interface TiedComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, PlacementComplete, OrientationComplete, BezierComplete, ColorComplete {
    number_: number;
    type: StartStopContinue;
}
export declare function xmlToTied(node: Node): Tied;
export interface Slur extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
    number_?: number;
    type: StartStopContinue;
}
export interface SlurComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, PlacementComplete, OrientationComplete, BezierComplete, ColorComplete {
    number_: number;
    type: StartStopContinue;
}
export declare function xmlToSlur(node: Node): Slur;
export declare enum ActualBothNone {
    None = 2,
    Both = 1,
    Actual = 0,
}
export declare function getActualBothNone(node: Node, fallbackVal?: ActualBothNone): ActualBothNone;
export interface Tuplet extends LineShape, Position, Placement {
    bracket?: boolean;
    number_: number;
    showNumber?: ActualBothNone;
    tupletNormal?: TupletNormal;
    type: StartStop;
    showType?: ActualBothNone;
    tupletActual?: TupletActual;
}
export interface TupletComplete extends LineShapeComplete, PositionComplete, PlacementComplete {
    bracket: boolean;
    number_: number;
    showNumber: ActualBothNone;
    tupletNormal: TupletNormal;
    type: StartStop;
    showType: ActualBothNone;
    tupletActual: TupletActual;
}
export declare function xmlToTuplet(node: Node): Tuplet;
export interface TupletActual {
    tupletNumber?: TupletNumber;
    tupletDots?: TupletDot[];
    tupletType?: TupletType;
}
export interface TupletActualComplete {
    tupletNumber: TupletNumber;
    tupletDots: TupletDot[];
    tupletType: TupletType;
}
export declare function xmlToTupletActual(node: Node): TupletActual;
export interface TupletNormal {
    tupletNumber?: TupletNumber;
    tupletDots?: TupletDot[];
    tupletType?: TupletType;
}
export interface TupletNormalComplete {
    tupletNumber: TupletNumber;
    tupletDots: TupletDot[];
    tupletType: TupletType;
}
export declare function xmlToTupletNormal(node: Node): TupletNormal;
export interface TupletNumber extends Font, Color {
    text: string;
}
export interface TupletNumberComplete extends FontComplete, ColorComplete {
    text: string;
}
export declare function xmlToTupletNumber(node: Node): TupletNumber;
export interface TupletType extends Font, Color {
    text: string;
}
export interface TupletTypeComplete extends FontComplete, ColorComplete {
    text: string;
}
export declare function xmlToTupletType(node: Node): TupletType;
export interface TupletDot extends Font, Color {
}
export interface TupletDotComplete extends FontComplete, ColorComplete {
}
export declare function xmlToTupletDot(node: Node): TupletDot;
export interface Glissando extends LineType, DashedFormatting, PrintStyle {
    text?: string;
    type: StartStop;
    normal?: number;
}
export interface GlissandoComplete extends LineTypeComplete, DashedFormattingComplete, PrintStyleComplete {
    text: string;
    type: StartStop;
    normal: number;
}
export declare function xmlToGlissando(node: Node): Glissando;
export interface Slide extends LineType, DashedFormatting, PrintStyle, BendSound {
    text?: string;
    type: StartStop;
    normal?: number;
}
export interface SlideComplete extends LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, BendSoundComplete {
    text: string;
    type: StartStop;
    normal: number;
}
export declare function xmlToSlide(node: Node): Slide;
export interface OtherNotation extends PrintObject, PrintStyle, Placement {
    type: StartStopSingle;
    data?: string;
}
export interface OtherNotationComplete extends PrintObjectComplete, PrintStyleComplete, PlacementComplete {
    type: StartStopSingle;
    data: string;
}
export declare function xmlToOtherNotation(node: Node): OtherNotation;
export interface OtherDirection extends PrintObject, PrintStyleAlign {
    data: string;
}
export interface OtherDirectionComplete extends PrintObjectComplete, PrintStyleAlignComplete {
    data: string;
}
export declare function xmlToOtherDirection(node: Node): OtherDirection;
export interface Ornaments extends PrintStyle, Placement, TrillSound {
    delayedInvertedTurn?: DelayedInvertedTurn;
    shake?: Shake;
    turn?: Turn;
    invertedTurn?: InvertedTurn;
    otherOrnament?: OtherOrnament;
    delayedTurn?: DelayedTurn;
    verticalTurn?: VerticalTurn;
    wavyLine?: WavyLine;
    tremolo?: Tremolo;
    accidentalMarks?: AccidentalMark[];
    trillMark?: TrillMark;
    mordent?: Mordent;
    invertedMordent?: InvertedMordent;
    schleifer?: Schleifer;
}
export interface OrnamentsComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    delayedInvertedTurn: DelayedInvertedTurn;
    shake: Shake;
    turn: Turn;
    invertedTurn: InvertedTurn;
    otherOrnament: OtherOrnament;
    delayedTurn: DelayedTurn;
    verticalTurn: VerticalTurn;
    wavyLine: WavyLine;
    tremolo: Tremolo;
    accidentalMarks: AccidentalMark[];
    trillMark: TrillMark;
    mordent: Mordent;
    invertedMordent: InvertedMordent;
    schleifer: Schleifer;
}
export declare function xmlToOrnaments(node: Node): Ornaments;
export interface TrillMark extends PrintStyle, Placement, TrillSound {
}
export interface TrillMarkComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
}
export declare function xmlToTrillMark(node: Node): TrillMark;
export interface Turn extends PrintStyle, Placement, TrillSound {
    slash?: boolean;
}
export interface TurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    slash: boolean;
}
export declare function xmlToTurn(node: Node): Turn;
export interface DelayedTurn extends PrintStyle, Placement, TrillSound {
    slash?: boolean;
}
export interface DelayedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    slash: boolean;
}
export declare function xmlToDelayedTurn(node: Node): DelayedTurn;
export interface InvertedTurn extends PrintStyle, Placement, TrillSound {
    slash?: boolean;
}
export interface InvertedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    slash: boolean;
}
export declare function xmlToInvertedTurn(node: Node): InvertedTurn;
export interface DelayedInvertedTurn extends PrintStyle, Placement, TrillSound {
    slash?: boolean;
}
export interface DelayedInvertedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    slash: boolean;
}
export declare function xmlToDelayedInvertedTurn(node: Node): DelayedInvertedTurn;
export interface VerticalTurn extends PrintStyle, Placement, TrillSound {
}
export interface VerticalTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
}
export declare function xmlToVerticalTurn(node: Node): VerticalTurn;
export interface Shake extends PrintStyle, Placement, TrillSound {
}
export interface ShakeComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
}
export declare function xmlToShake(node: Node): Shake;
export interface Mordent extends PrintStyle, Placement, TrillSound {
    long_?: boolean;
    approach?: AboveBelow;
    departure?: AboveBelow;
}
export interface MordentComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    long_: boolean;
    approach: AboveBelow;
    departure: AboveBelow;
}
export declare function xmlToMordent(node: Node): Mordent;
export interface InvertedMordent extends PrintStyle, Placement, TrillSound {
    long_?: boolean;
    approach?: AboveBelow;
    departure?: AboveBelow;
}
export interface InvertedMordentComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    long_: boolean;
    approach: AboveBelow;
    departure: AboveBelow;
}
export declare function xmlToInvertedMordent(node: Node): InvertedMordent;
export interface Schleifer extends PrintStyle, Placement {
}
export interface SchleiferComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToSchleifer(node: Node): Schleifer;
export interface Tremolo extends PrintStyle, Placement {
    data?: string;
    type: StartStopSingle;
}
export interface TremoloComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
    type: StartStopSingle;
}
export declare function xmlToTremolo(node: Node): Tremolo;
export interface OtherOrnament extends PrintStyle, Placement {
    type: StartStopSingle;
    data?: string;
}
export interface OtherOrnamentComplete extends PrintStyleComplete, PlacementComplete {
    type: StartStopSingle;
    data: string;
}
export declare function xmlToOtherOrnament(node: Node): OtherOrnament;
export interface AccidentalMark extends PrintStyle, Placement {
    mark: string;
}
export interface AccidentalMarkComplete extends PrintStyleComplete, PlacementComplete {
    mark: string;
}
export declare function xmlToAccidentalMark(node: Node): AccidentalMark;
export interface Technical {
    tripleTongue?: TripleTongue;
    toe?: Toe;
    hole?: Hole;
    hammerOn?: HammerOn;
    upBow?: UpBow;
    downBow?: DownBow;
    fret?: Fret;
    tap?: Tap;
    pullOff?: PullOff;
    handbell?: Handbell;
    bend?: Bend;
    thumbPosition?: ThumbPosition;
    stopped?: Stopped;
    pluck?: Pluck;
    doubleTongue?: DoubleTongue;
    string_?: String;
    openString?: OpenString;
    fingernails?: Fingernails;
    arrow?: Arrow;
    harmonic?: Harmonic;
    heel?: Heel;
    otherTechnical?: OtherTechnical;
    snapPizzicato?: SnapPizzicato;
    fingering?: Fingering;
}
export interface TechnicalComplete {
    tripleTongue: TripleTongue;
    toe: Toe;
    hole: Hole;
    hammerOn: HammerOn;
    upBow: UpBow;
    downBow: DownBow;
    fret: Fret;
    tap: Tap;
    pullOff: PullOff;
    handbell: Handbell;
    bend: Bend;
    thumbPosition: ThumbPosition;
    stopped: Stopped;
    pluck: Pluck;
    doubleTongue: DoubleTongue;
    string_: String;
    openString: OpenString;
    fingernails: Fingernails;
    arrow: Arrow;
    harmonic: Harmonic;
    heel: Heel;
    otherTechnical: OtherTechnical;
    snapPizzicato: SnapPizzicato;
    fingering: Fingering;
}
export declare function xmlToTechnical(node: Node): Technical;
export interface UpBow extends PrintStyle, Placement {
}
export interface UpBowComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToUpBow(node: Node): UpBow;
export interface DownBow extends PrintStyle, Placement {
}
export interface DownBowComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToDownBow(node: Node): DownBow;
export interface Harmonic extends PrintObject, PrintStyle, Placement {
    artificial: boolean;
    touchingPitch: boolean;
    soundingPitch: boolean;
    natural: boolean;
    basePitch: boolean;
}
export interface HarmonicComplete extends PrintObjectComplete, PrintStyleComplete, PlacementComplete {
    artificial: boolean;
    touchingPitch: boolean;
    soundingPitch: boolean;
    natural: boolean;
    basePitch: boolean;
}
export declare function xmlToHarmonic(node: Node): Harmonic;
export interface OpenString extends PrintStyle, Placement {
}
export interface OpenStringComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToOpenString(node: Node): OpenString;
export interface ThumbPosition extends PrintStyle, Placement {
}
export interface ThumbPositionComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToThumbPosition(node: Node): ThumbPosition;
export interface Pluck extends PrintStyle, Placement {
    data: string;
}
export interface PluckComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToPluck(node: Node): Pluck;
export interface DoubleTongue extends PrintStyle, Placement {
}
export interface DoubleTongueComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToDoubleTongue(node: Node): DoubleTongue;
export interface TripleTongue extends PrintStyle, Placement {
}
export interface TripleTongueComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToTripleTongue(node: Node): TripleTongue;
export interface Stopped extends PrintStyle, Placement {
}
export interface StoppedComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToStopped(node: Node): Stopped;
export interface SnapPizzicato extends PrintStyle, Placement {
}
export interface SnapPizzicatoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToSnapPizzicato(node: Node): SnapPizzicato;
export interface HammerOn extends PrintStyle, Placement {
    number_?: number;
    type: StartStop;
    data?: string;
}
export interface HammerOnComplete extends PrintStyleComplete, PlacementComplete {
    number_: number;
    type: StartStop;
    data: string;
}
export declare function xmlToHammerOn(node: Node): HammerOn;
export interface PullOff extends PrintStyle, Placement {
    number_?: number;
    type: StartStop;
    data?: string;
}
export interface PullOffComplete extends PrintStyleComplete, PlacementComplete {
    number_: number;
    type: StartStop;
    data: string;
}
export declare function xmlToPullOff(node: Node): PullOff;
export interface Bend extends PrintStyle, BendSound {
    bendAlter: string;
    withBar?: WithBar;
    preBend: boolean;
    release: boolean;
}
export interface BendComplete extends PrintStyleComplete, BendSoundComplete {
    bendAlter: string;
    withBar: WithBar;
    preBend: boolean;
    release: boolean;
}
export declare function xmlToBend(node: Node): Bend;
export interface WithBar extends PrintStyle, Placement {
    data: string;
}
export interface WithBarComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToWithBar(node: Node): WithBar;
export interface Tap extends PrintStyle, Placement {
    data: string;
}
export interface TapComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToTap(node: Node): Tap;
export interface Heel extends PrintStyle, Placement {
    substitution?: boolean;
}
export interface HeelComplete extends PrintStyleComplete, PlacementComplete {
    substitution: boolean;
}
export declare function xmlToHeel(node: Node): Heel;
export interface Toe extends PrintStyle, Placement {
    substitution?: boolean;
}
export interface ToeComplete extends PrintStyleComplete, PlacementComplete {
    substitution: boolean;
}
export declare function xmlToToe(node: Node): Toe;
export interface Fingernails extends PrintStyle, Placement {
}
export interface FingernailsComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToFingernails(node: Node): Fingernails;
export interface Hole extends PrintStyle, Placement {
    holeClosed: HoleClosed;
    holeShape: string;
    holeType?: string;
}
export interface HoleComplete extends PrintStyleComplete, PlacementComplete {
    holeClosed: HoleClosed;
    holeShape: string;
    holeType: string;
}
export declare function xmlToHole(node: Node): Hole;
export declare enum HoleLocation {
    Right = 0,
    Top = 3,
    Bottom = 1,
    Left = 2,
}
export declare function getHoleLocation(node: Node, fallbackVal?: HoleLocation): HoleLocation;
export declare enum HoleClosedType {
    No = 1,
    Yes = 0,
    Half = 2,
}
export declare function getHoleClosedType(node: Node, fallbackVal?: HoleClosedType): HoleClosedType;
export interface HoleClosed {
    location?: HoleLocation;
    data: HoleClosedType;
}
export interface HoleClosedComplete {
    location: HoleLocation;
    data: HoleClosedType;
}
export declare function xmlToHoleClosed(node: Node): HoleClosed;
export interface Arrow extends PrintStyle, Placement {
    arrowStyle?: string;
    arrowDirection?: string;
    circularArrow?: string;
}
export interface ArrowComplete extends PrintStyleComplete, PlacementComplete {
    arrowStyle: string;
    arrowDirection: string;
    circularArrow: string;
}
export declare function xmlToArrow(node: Node): Arrow;
export interface Handbell extends PrintStyle, Placement {
    data: string;
}
export interface HandbellComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToHandbell(node: Node): Handbell;
export interface OtherTechnical extends PrintStyle, Placement {
    data: string;
}
export interface OtherTechnicalComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToOtherTechnical(node: Node): OtherTechnical;
export interface Articulations {
    accent?: Accent;
    doit?: Doit;
    breathMark?: BreathMark;
    otherArticulations?: OtherArticulation[];
    detachedLegato?: DetachedLegato;
    staccatissimo?: Staccatissimo;
    plop?: Plop;
    unstress?: Unstress;
    strongAccent?: StrongAccent;
    staccato?: Staccato;
    spiccato?: Spiccato;
    scoop?: Scoop;
    falloff?: Falloff;
    caesura?: Caesura;
    stress?: Stress;
    tenuto?: Tenuto;
}
export interface ArticulationsComplete {
    accent: Accent;
    doit: Doit;
    breathMark: BreathMark;
    otherArticulations: OtherArticulation[];
    detachedLegato: DetachedLegato;
    staccatissimo: Staccatissimo;
    plop: Plop;
    unstress: Unstress;
    strongAccent: StrongAccent;
    staccato: Staccato;
    spiccato: Spiccato;
    scoop: Scoop;
    falloff: Falloff;
    caesura: Caesura;
    stress: Stress;
    tenuto: Tenuto;
}
export declare function xmlToArticulations(node: Node): Articulations;
export interface Accent extends PrintStyle, Placement {
}
export interface AccentComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToAccent(node: Node): Accent;
export interface StrongAccent extends PrintStyle, Placement {
    type?: UpDown;
}
export interface StrongAccentComplete extends PrintStyleComplete, PlacementComplete {
    type: UpDown;
}
export declare function xmlToStrongAccent(node: Node): StrongAccent;
export interface Staccato extends PrintStyle, Placement {
}
export interface StaccatoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToStaccato(node: Node): Staccato;
export interface Tenuto extends PrintStyle, Placement {
}
export interface TenutoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToTenuto(node: Node): Tenuto;
export interface DetachedLegato extends PrintStyle, Placement {
}
export interface DetachedLegatoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToDetachedLegato(node: Node): DetachedLegato;
export interface Staccatissimo extends PrintStyle, Placement {
}
export interface StaccatissimoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToStaccatissimo(node: Node): Staccatissimo;
export interface Spiccato extends PrintStyle, Placement {
}
export interface SpiccatoComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToSpiccato(node: Node): Spiccato;
export interface Scoop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
}
export interface ScoopComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
}
export declare function xmlToScoop(node: Node): Scoop;
export interface Plop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
}
export interface PlopComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
}
export declare function xmlToPlop(node: Node): Plop;
export interface Doit extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
}
export interface DoitComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
}
export declare function xmlToDoit(node: Node): Doit;
export interface Falloff extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
}
export interface FalloffComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
}
export declare function xmlToFalloff(node: Node): Falloff;
export declare enum BreathMarkType {
    Empty = 2,
    Comma = 0,
    Tick = 1,
}
export declare function getBreathMarkType(node: Node, fallbackVal?: BreathMarkType): BreathMarkType;
export interface BreathMark extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
    type: BreathMarkType;
}
export interface BreathMarkComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
    type: BreathMarkType;
}
export declare function xmlToBreathMark(node: Node): BreathMark;
export interface Caesura extends PrintStyle, Placement {
}
export interface CaesuraComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToCaesura(node: Node): Caesura;
export interface Stress extends PrintStyle, Placement {
}
export interface StressComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToStress(node: Node): Stress;
export interface Unstress extends PrintStyle, Placement {
}
export interface UnstressComplete extends PrintStyleComplete, PlacementComplete {
}
export declare function xmlToUnstress(node: Node): Unstress;
export interface OtherArticulation extends PrintStyle, Placement {
    data: string;
}
export interface OtherArticulationComplete extends PrintStyleComplete, PlacementComplete {
    data: string;
}
export declare function xmlToOtherArticulation(node: Node): OtherArticulation;
export interface Arpeggiate extends Position, Placement, Color {
    number_?: number;
    direction?: UpDown;
}
export interface ArpeggiateComplete extends PositionComplete, PlacementComplete, ColorComplete {
    number_: number;
    direction: UpDown;
}
export declare function xmlToArpeggiate(node: Node): Arpeggiate;
export interface NonArpeggiate extends Position, Placement, Color {
    number_?: number;
    type: TopBottom;
}
export interface NonArpeggiateComplete extends PositionComplete, PlacementComplete, ColorComplete {
    number_: number;
    type: TopBottom;
}
export declare function xmlToNonArpeggiate(node: Node): NonArpeggiate;
export interface Lyric extends Justify, Position, Placement, Color, PrintObject, Editorial {
    extend?: Extend;
    endLine: boolean;
    syllabics?: Syllabic[];
    texts?: Text[];
    laughing: boolean;
    humming: boolean;
    number_?: number;
    endParagraph: boolean;
    elisions?: Elision[];
    name?: string;
}
export interface LyricComplete extends JustifyComplete, PositionComplete, PlacementComplete, ColorComplete, PrintObjectComplete, EditorialComplete {
    extend: Extend;
    endLine: boolean;
    syllabics: Syllabic[];
    texts: Text[];
    laughing: boolean;
    humming: boolean;
    number_: number;
    endParagraph: boolean;
    elisions: Elision[];
    name: string;
}
export declare function xmlToLyric(node: Node): Lyric;
export interface Text extends Font, Color, TextDecoration, TextRotation, LetterSpacing, TextDirection {
    data: string;
}
export interface TextComplete extends FontComplete, ColorComplete, TextDecorationComplete, TextRotationComplete, LetterSpacingComplete, TextDirectionComplete {
    data: string;
}
export declare function xmlToText(node: Node): Text;
export interface Syllabic extends Font, Color {
    data: string;
}
export interface SyllabicComplete extends FontComplete, ColorComplete {
    data: string;
}
export declare function xmlToSyllabic(node: Node): Syllabic;
export interface Elision extends Font, Color {
    data: string;
}
export interface ElisionComplete extends FontComplete, ColorComplete {
    data: string;
}
export declare function xmlToElision(node: Node): Elision;
export interface Extend extends PrintStyle {
    type?: StartStopContinue;
}
export interface ExtendComplete extends PrintStyleComplete {
    type: StartStopContinue;
}
export declare function xmlToExtend(node: Node): Extend;
export interface FiguredBass extends Editorial, PrintStyle, Printout {
    figures: Figure[];
    duration?: number;
    parentheses?: boolean;
}
export interface FiguredBassComplete extends EditorialComplete, PrintStyleComplete, PrintoutComplete {
    figures: Figure[];
    duration: number;
    parentheses: boolean;
}
export declare function xmlToFiguredBass(node: Node): FiguredBass;
export interface Figure extends PrintStyle {
    prefix?: Prefix;
    figureNumber?: FigureNumber;
    extend?: Extend;
    suffix?: Suffix;
}
export interface FigureComplete extends PrintStyleComplete {
    prefix: Prefix;
    figureNumber: FigureNumber;
    extend: Extend;
    suffix: Suffix;
}
export declare function xmlToFigure(node: Node): Figure;
export interface Prefix extends PrintStyle {
    data: string;
}
export interface PrefixComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToPrefix(node: Node): Prefix;
export interface FigureNumber extends PrintStyle {
    data: string;
}
export interface FigureNumberComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToFigureNumber(node: Node): FigureNumber;
export interface Suffix extends PrintStyle {
    data: string;
}
export interface SuffixComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToSuffix(node: Node): Suffix;
export interface Backup extends Editorial {
    duration: number;
}
export interface BackupComplete extends EditorialComplete {
    duration: number;
}
export declare function xmlToBackup(node: Node): Backup;
export interface Forward extends EditorialVoice {
    duration: number;
    staff?: Staff;
}
export interface ForwardComplete extends EditorialVoiceComplete {
    duration: number;
    staff: Staff;
}
export declare function xmlToForward(node: Node): Forward;
export declare enum BarlineLocation {
    Right = 1,
    Middle = 2,
    Left = 0,
}
export declare function getBarlineLocation(node: Node, fallbackVal?: BarlineLocation): BarlineLocation;
export interface Barline extends Editorial {
    segno?: Segno;
    coda?: Coda;
    location?: BarlineLocation;
    codaAttrib: string;
    wavyLine?: WavyLine;
    fermatas?: Fermata[];
    segnoAttrib: string;
    divisions: string;
    barStyle?: BarStyle;
    ending?: Ending;
    repeat?: Repeat;
}
export interface BarlineComplete extends EditorialComplete {
    segno: Segno;
    coda: Coda;
    location: BarlineLocation;
    codaAttrib: string;
    wavyLine: WavyLine;
    fermatas: Fermata[];
    segnoAttrib: string;
    divisions: string;
    barStyle: BarStyle;
    ending: Ending;
    repeat: Repeat;
}
export declare function xmlToBarline(node: Node): Barline;
export declare enum BarStyleType {
    Regular = 0,
    LightHeavy = 5,
    HeavyLight = 6,
    Short = 9,
    None = 10,
    Dashed = 2,
    HeavyHeavy = 7,
    Tick = 8,
    Dotted = 1,
    Heavy = 3,
    LightLight = 4,
}
export declare function getBarStyleType(node: Node, fallbackVal?: BarStyleType): BarStyleType;
export interface BarStyle extends Color {
    data: BarStyleType;
}
export interface BarStyleComplete extends ColorComplete {
    data: BarStyleType;
}
export declare function xmlToBarStyle(node: Node): BarStyle;
export declare enum StartStopDiscontinue {
    Discontinue = 2,
    Start = 0,
    Stop = 1,
}
export declare function getStartStopDiscontinue(node: Node, fallbackVal?: StartStopDiscontinue): StartStopDiscontinue;
export interface Ending extends PrintObject, PrintStyle {
    endLength: number;
    textX: number;
    number_: number;
    textY: number;
    type: StartStopDiscontinue;
    ending?: string;
}
export interface EndingComplete extends PrintObjectComplete, PrintStyleComplete {
    endLength: number;
    textX: number;
    number_: number;
    textY: number;
    type: StartStopDiscontinue;
    ending: string;
}
export declare function xmlToEnding(node: Node): Ending;
export declare enum WingedType {
    None = 0,
    Curved = 2,
    DoubleCurved = 4,
    Straight = 1,
    DoubleStraight = 3,
}
export declare function getWingedType(node: Node, fallbackVal?: WingedType): WingedType;
export declare enum DirectionTypeBg {
    Forward = 1,
    Backward = 0,
}
export declare function getDirectionTypeBg(node: Node, fallbackVal?: DirectionTypeBg): DirectionTypeBg;
export interface Repeat {
    times: string;
    winged: WingedType;
    direction: DirectionTypeBg;
}
export interface RepeatComplete {
    times: string;
    winged: WingedType;
    direction: DirectionTypeBg;
}
export declare function xmlToRepeat(node: Node): Repeat;
export declare enum TipDirection {
    Right = 3,
    Northwest = 4,
    Southwest = 7,
    Down = 1,
    Northeast = 5,
    Southeast = 6,
    Up = 0,
    Left = 2,
}
export declare function getTipDirection(node: Node, fallbackVal?: TipDirection): TipDirection;
export interface Direction extends EditorialVoice, Placement, Directive {
    directionTypes: DirectionType[];
    staff?: Staff;
    offset?: Offset;
    sound?: Sound;
}
export interface DirectionComplete extends EditorialVoiceComplete, PlacementComplete, DirectiveComplete {
    directionTypes: DirectionType[];
    staff: Staff;
    offset: Offset;
    sound: Sound;
}
export declare function xmlToDirection(node: Node): Direction;
export interface DirectionType {
    percussions: Percussion[];
    rehearsals: Rehearsal[];
    pedal: Pedal;
    principalVoice: PrincipalVoice;
    accordionRegistration: AccordionRegistration;
    eyeglasses: Eyeglasses;
    image: Image;
    harpPedals: HarpPedals;
    metronome: Metronome;
    otherDirection: OtherDirection;
    segnos: Segno[];
    scordatura: Scordatura;
    stringMute: StringMute;
    wedge?: Wedge;
    dashes?: Dashes;
    damp: Damp;
    bracket: Bracket;
    dynamics?: Dynamics;
    octaveShift: OctaveShift;
    words: Words[];
    dampAll: DampAll;
    codas: Coda[];
}
export interface DirectionTypeComplete {
    percussions: Percussion[];
    rehearsals: Rehearsal[];
    pedal: Pedal;
    principalVoice: PrincipalVoice;
    accordionRegistration: AccordionRegistration;
    eyeglasses: Eyeglasses;
    image: Image;
    harpPedals: HarpPedals;
    metronome: Metronome;
    otherDirection: OtherDirection;
    segnos: Segno[];
    scordatura: Scordatura;
    stringMute: StringMute;
    wedge: Wedge;
    dashes: Dashes;
    damp: Damp;
    bracket: Bracket;
    dynamics: Dynamics;
    octaveShift: OctaveShift;
    words: Words[];
    dampAll: DampAll;
    codas: Coda[];
}
export declare function xmlToDirectionType(node: Node): DirectionType;
export interface Rehearsal extends TextFormatting {
    data: string;
}
export interface RehearsalComplete extends TextFormattingComplete {
    data: string;
}
export declare function xmlToRehearsal(node: Node): Rehearsal;
export interface Words extends TextFormatting {
    data: string;
}
export interface WordsComplete extends TextFormattingComplete {
    data: string;
}
export declare function xmlToWords(node: Node): Words;
export declare enum WedgeType {
    Diminuendo = 1,
    Crescendo = 0,
    Stop = 2,
    Continue = 3,
}
export declare function getWedgeType(node: Node, fallbackVal?: WedgeType): WedgeType;
export interface Wedge extends LineType, DashedFormatting, Position, Color {
    number_: number;
    neinte: boolean;
    type: WedgeType;
    spread: number;
}
export interface WedgeComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, ColorComplete {
    number_: number;
    neinte: boolean;
    type: WedgeType;
    spread: number;
}
export declare function xmlToWedge(node: Node): Wedge;
export interface Dashes extends DashedFormatting, Position, Color {
    number_: number;
    type: StartStopContinue;
}
export interface DashesComplete extends DashedFormattingComplete, PositionComplete, ColorComplete {
    number_: number;
    type: StartStopContinue;
}
export declare function xmlToDashes(node: Node): Dashes;
export declare enum LineEndType {
    None = 4,
    Both = 2,
    Arrow = 3,
    Down = 1,
    Up = 0,
}
export declare function getLineEndType(node: Node, fallbackVal?: LineEndType): LineEndType;
export interface Bracket extends LineType, DashedFormatting, Position, Color {
    endLength: number;
    number_: number;
    type: StartStopContinue;
    lineEnd: LineEndType;
}
export interface BracketComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, ColorComplete {
    endLength: number;
    number_: number;
    type: StartStopContinue;
    lineEnd: LineEndType;
}
export declare function xmlToBracket(node: Node): Bracket;
export declare enum PedalType {
    Change = 3,
    Start = 0,
    Stop = 1,
    Continue = 2,
}
export declare function getPedalType(node: Node, fallbackVal?: PedalType): PedalType;
export interface Pedal extends PrintStyleAlign {
    line: boolean;
    sign: boolean;
    type: PedalType;
}
export interface PedalComplete extends PrintStyleAlignComplete {
    line: boolean;
    sign: boolean;
    type: PedalType;
}
export declare function xmlToPedal(node: Node): Pedal;
export interface Metronome extends PrintStyleAlign, Justify {
    metronomeNotes: MetronomeNote[];
    perMinute: PerMinute;
    parentheses: boolean;
    beatUnit: string;
    beatUnitDots: BeatUnitDot[];
    metronomeRelation: string;
}
export interface MetronomeComplete extends PrintStyleAlignComplete, JustifyComplete {
    metronomeNotes: MetronomeNote[];
    perMinute: PerMinute;
    parentheses: boolean;
    beatUnit: string;
    beatUnitDots: BeatUnitDot[];
    metronomeRelation: string;
}
export declare function xmlToMetronome(node: Node): Metronome;
export interface BeatUnitDot {
}
export interface BeatUnitDotComplete {
}
export declare function xmlToBeatUnitDot(node: Node): BeatUnitDot;
export interface PerMinute extends Font {
    data: string;
}
export interface PerMinuteComplete extends FontComplete {
    data: string;
}
export declare function xmlToPerMinute(node: Node): PerMinute;
export interface MetronomeNote {
    metronomeDots: MetronomeDot[];
    metronomeBeams: MetronomeBeam[];
    metronomeType: string;
    metronomeTuplet: MetronomeTuplet;
}
export interface MetronomeNoteComplete {
    metronomeDots: MetronomeDot[];
    metronomeBeams: MetronomeBeam[];
    metronomeType: string;
    metronomeTuplet: MetronomeTuplet;
}
export declare function xmlToMetronomeNote(node: Node): MetronomeNote;
export interface MetronomeDot {
}
export interface MetronomeDotComplete {
}
export declare function xmlToMetronomeDot(node: Node): MetronomeDot;
export interface MetronomeBeam {
    number_: number;
    data: string;
}
export interface MetronomeBeamComplete {
    number_: number;
    data: string;
}
export declare function xmlToMetronomeBeam(node: Node): MetronomeBeam;
export interface MetronomeTuplet {
    actualNotes: ActualNotes;
    bracket: boolean;
    showNumber: ActualBothNone;
    normalType: string;
    type: StartStop;
    normalNotes: NormalNotes;
    normalDots: NormalDot[];
}
export interface MetronomeTupletComplete {
    actualNotes: ActualNotes;
    bracket: boolean;
    showNumber: ActualBothNone;
    normalType: string;
    type: StartStop;
    normalNotes: NormalNotes;
    normalDots: NormalDot[];
}
export declare function xmlToMetronomeTuplet(node: Node): MetronomeTuplet;
export declare enum OctaveShiftType {
    Down = 2,
    Stop = 3,
    Up = 1,
    Continue = 4,
}
export declare function getOctaveShiftType(node: Node, fallbackVal?: OctaveShiftType): OctaveShiftType;
export interface OctaveShift extends DashedFormatting, PrintStyle {
    number_: number;
    size: number;
    type: OctaveShiftType;
}
export interface OctaveShiftComplete extends DashedFormattingComplete, PrintStyleComplete {
    number_: number;
    size: number;
    type: OctaveShiftType;
}
export declare function xmlToOctaveShift(node: Node): OctaveShift;
export interface HarpPedals extends PrintStyleAlign {
    pedalTunings: PedalTuning[];
}
export interface HarpPedalsComplete extends PrintStyleAlignComplete {
    pedalTunings: PedalTuning[];
}
export declare function xmlToHarpPedals(node: Node): HarpPedals;
export interface PedalTuning {
    pedalStep: string;
    pedalAlter: string;
}
export interface PedalTuningComplete {
    pedalStep: string;
    pedalAlter: string;
}
export declare function xmlToPedalTuning(node: Node): PedalTuning;
export interface Damp extends PrintStyleAlign {
}
export interface DampComplete extends PrintStyleAlignComplete {
}
export declare function xmlToDamp(node: Node): Damp;
export interface DampAll extends PrintStyleAlign {
}
export interface DampAllComplete extends PrintStyleAlignComplete {
}
export declare function xmlToDampAll(node: Node): DampAll;
export interface Eyeglasses extends PrintStyleAlign {
}
export interface EyeglassesComplete extends PrintStyleAlignComplete {
}
export declare function xmlToEyeglasses(node: Node): Eyeglasses;
export interface StringMute extends PrintStyleAlign {
    type: string;
}
export interface StringMuteComplete extends PrintStyleAlignComplete {
    type: string;
}
export declare function xmlToStringMute(node: Node): StringMute;
export interface Scordatura {
    accords: Accord[];
}
export interface ScordaturaComplete {
    accords: Accord[];
}
export declare function xmlToScordatura(node: Node): Scordatura;
export interface Accord {
    tuningAlter: TuningAlter;
    string_: string;
    tuningStep: string;
    tuningOctave: TuningOctave;
}
export interface AccordComplete {
    tuningAlter: TuningAlter;
    string_: string;
    tuningStep: string;
    tuningOctave: TuningOctave;
}
export declare function xmlToAccord(node: Node): Accord;
export interface Image extends Position, Halign, ValignImage {
    type: string;
    source: string;
}
export interface ImageComplete extends PositionComplete, HalignComplete, ValignImageComplete {
    type: string;
    source: string;
}
export declare function xmlToImage(node: Node): Image;
export declare enum VoiceSymbol {
    None = 4,
    Hauptstimme = 1,
    Nebenstimme = 2,
    Plain = 3,
}
export declare function getVoiceSymbol(node: Node, fallbackVal?: VoiceSymbol): VoiceSymbol;
export interface PrincipalVoice extends PrintStyleAlign {
    symbol: VoiceSymbol;
    data?: string;
    type: StartStop;
}
export interface PrincipalVoiceComplete extends PrintStyleAlignComplete {
    symbol: VoiceSymbol;
    data: string;
    type: StartStop;
}
export declare function xmlToPrincipalVoice(node: Node): PrincipalVoice;
export interface AccordionRegistration extends PrintStyleAlign {
    accordionMiddle: string;
    accordionHigh: boolean;
    accordionLow: boolean;
}
export interface AccordionRegistrationComplete extends PrintStyleAlignComplete {
    accordionMiddle: string;
    accordionHigh: boolean;
    accordionLow: boolean;
}
export declare function xmlToAccordionRegistration(node: Node): AccordionRegistration;
export interface Percussion extends PrintStyleAlign, Enclosure {
    stickLocation: string;
    otherPercussion: string;
    wood: string;
    effect: string;
    glass: string;
    timpani: Timpani;
    stick: Stick;
    metal: string;
    pitched: string;
    membrane: string;
    beater: Beater;
}
export interface PercussionComplete extends PrintStyleAlignComplete, EnclosureComplete {
    stickLocation: string;
    otherPercussion: string;
    wood: string;
    effect: string;
    glass: string;
    timpani: Timpani;
    stick: Stick;
    metal: string;
    pitched: string;
    membrane: string;
    beater: Beater;
}
export declare function xmlToPercussion(node: Node): Percussion;
export interface Timpani {
}
export interface TimpaniComplete {
}
export declare function xmlToTimpani(node: Node): Timpani;
export interface Beater {
    data: string;
    tip: TipDirection;
}
export interface BeaterComplete {
    data: string;
    tip: TipDirection;
}
export declare function xmlToBeater(node: Node): Beater;
export interface Stick {
    stickMaterial: string;
    stickType: string;
    tip: TipDirection;
}
export interface StickComplete {
    stickMaterial: string;
    stickType: string;
    tip: TipDirection;
}
export declare function xmlToStick(node: Node): Stick;
export interface Offset {
    data: string;
    sound: boolean;
}
export interface OffsetComplete {
    data: string;
    sound: boolean;
}
export declare function xmlToOffset(node: Node): Offset;
export interface HarmonyChord {
    root: Root;
    function_: Function;
    kind: Kind;
    degree: Degree;
    inversion: Inversion;
    bass: Bass;
}
export interface HarmonyChordComplete {
    root: Root;
    function_: Function;
    kind: Kind;
    degree: Degree;
    inversion: Inversion;
    bass: Bass;
}
export declare function xmlToHarmonyChord(node: Node): HarmonyChord;
export declare enum ExplicitImpliedAlternate {
    Explicit = 1,
    Implied = 2,
    Alternate = 3,
}
export declare function getExplicitImpliedAlternate(node: Node, fallbackVal?: ExplicitImpliedAlternate): ExplicitImpliedAlternate;
export interface Harmony extends HarmonyChord, Editorial, PrintObject, PrintStyle, Placement {
    frame: Frame;
    printFrame: boolean;
    staff: Staff;
    harmonyType: ExplicitImpliedAlternate;
    offset: Offset;
}
export interface HarmonyComplete extends HarmonyChordComplete, EditorialComplete, PrintObjectComplete, PrintStyleComplete, PlacementComplete {
    frame: Frame;
    printFrame: boolean;
    staff: Staff;
    harmonyType: ExplicitImpliedAlternate;
    offset: Offset;
}
export declare function xmlToHarmony(node: Node): Harmony;
export interface Root {
    rootStep: RootStep;
    rootAlter: RootAlter;
}
export interface RootComplete {
    rootStep: RootStep;
    rootAlter: RootAlter;
}
export declare function xmlToRoot(node: Node): Root;
export interface RootStep extends PrintStyle {
    text: string;
    data: string;
}
export interface RootStepComplete extends PrintStyleComplete {
    text: string;
    data: string;
}
export declare function xmlToRootStep(node: Node): RootStep;
export interface RootAlter extends PrintObject, PrintStyle {
    location: LeftRight;
    data: string;
}
export interface RootAlterComplete extends PrintObjectComplete, PrintStyleComplete {
    location: LeftRight;
    data: string;
}
export declare function xmlToRootAlter(node: Node): RootAlter;
export interface Function extends PrintStyle {
    data: string;
}
export interface FunctionComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToFunction(node: Node): Function;
export interface Kind extends PrintStyle, Halign, Valign {
    parenthesesDegrees: boolean;
    useSymbols: boolean;
    text: string;
    data: string;
    stackDegrees: boolean;
    bracketDegrees: boolean;
}
export interface KindComplete extends PrintStyleComplete, HalignComplete, ValignComplete {
    parenthesesDegrees: boolean;
    useSymbols: boolean;
    text: string;
    data: string;
    stackDegrees: boolean;
    bracketDegrees: boolean;
}
export declare function xmlToKind(node: Node): Kind;
export interface Inversion extends PrintStyle {
    data: string;
}
export interface InversionComplete extends PrintStyleComplete {
    data: string;
}
export declare function xmlToInversion(node: Node): Inversion;
export interface Bass {
    bassStep: BassStep;
    bassAlter: BassAlter;
}
export interface BassComplete {
    bassStep: BassStep;
    bassAlter: BassAlter;
}
export declare function xmlToBass(node: Node): Bass;
export interface BassStep extends PrintStyle {
    text: string;
    data: string;
}
export interface BassStepComplete extends PrintStyleComplete {
    text: string;
    data: string;
}
export declare function xmlToBassStep(node: Node): BassStep;
export interface BassAlter extends PrintObject, PrintStyle {
    location: LeftRight;
    data: string;
}
export interface BassAlterComplete extends PrintObjectComplete, PrintStyleComplete {
    location: LeftRight;
    data: string;
}
export declare function xmlToBassAlter(node: Node): BassAlter;
export interface Degree extends PrintObject {
    degreeAlter: DegreeAlter;
    degreeValue: DegreeValue;
    degreeType: DegreeType;
}
export interface DegreeComplete extends PrintObjectComplete {
    degreeAlter: DegreeAlter;
    degreeValue: DegreeValue;
    degreeType: DegreeType;
}
export declare function xmlToDegree(node: Node): Degree;
export declare enum ChordType {
    Augmented = 3,
    Diminished = 4,
    Major = 1,
    Minor = 2,
    HalfDiminished = 5,
}
export declare function getChordType(node: Node, fallbackVal?: ChordType): ChordType;
export interface DegreeValue extends PrintStyle {
    symbol: ChordType;
    text: string;
    data: string;
}
export interface DegreeValueComplete extends PrintStyleComplete {
    symbol: ChordType;
    text: string;
    data: string;
}
export declare function xmlToDegreeValue(node: Node): DegreeValue;
export interface DegreeAlter extends PrintStyle {
    plusMinus: boolean;
    data: string;
}
export interface DegreeAlterComplete extends PrintStyleComplete {
    plusMinus: boolean;
    data: string;
}
export declare function xmlToDegreeAlter(node: Node): DegreeAlter;
export interface DegreeType extends PrintStyle {
    text: string;
    data: string;
}
export interface DegreeTypeComplete extends PrintStyleComplete {
    text: string;
    data: string;
}
export declare function xmlToDegreeType(node: Node): DegreeType;
export interface Frame extends Position, Color, Halign, ValignImage {
    frameStrings: string;
    frameNotes: FrameNote[];
    unplayed: string;
    frameFrets: string;
    firstFret: FirstFret;
    width: number;
    height: number;
}
export interface FrameComplete extends PositionComplete, ColorComplete, HalignComplete, ValignImageComplete {
    frameStrings: string;
    frameNotes: FrameNote[];
    unplayed: string;
    frameFrets: string;
    firstFret: FirstFret;
    width: number;
    height: number;
}
export declare function xmlToFrame(node: Node): Frame;
export interface FirstFret {
    text: string;
    location: LeftRight;
    data: string;
}
export interface FirstFretComplete {
    text: string;
    location: LeftRight;
    data: string;
}
export declare function xmlToFirstFret(node: Node): FirstFret;
export interface FrameNote {
    barre: Barre;
    string_: String;
    fingering: Fingering;
    fret: Fret;
}
export interface FrameNoteComplete {
    barre: Barre;
    string_: String;
    fingering: Fingering;
    fret: Fret;
}
export declare function xmlToFrameNote(node: Node): FrameNote;
export interface Barre extends Color {
    type: StartStop;
}
export interface BarreComplete extends ColorComplete {
    type: StartStop;
}
export declare function xmlToBarre(node: Node): Barre;
export interface Grouping {
    features: Feature[];
    number_: number;
    groupingType: StartStopSingle;
    memberOf: string;
}
export interface GroupingComplete {
    features: Feature[];
    number_: number;
    groupingType: StartStopSingle;
    memberOf: string;
}
export declare function xmlToGrouping(node: Node): Grouping;
export interface Feature {
    data: string;
    type: string;
}
export interface FeatureComplete {
    data: string;
    type: string;
}
export declare function xmlToFeature(node: Node): Feature;
export interface Print {
    measureNumbering: MeasureNumbering;
    partNameDisplay: PartNameDisplay;
    newSystem: boolean;
    newPage: boolean;
    blankPage: string;
    measureLayout: MeasureLayout;
    partAbbreviationDisplay: PartAbbreviationDisplay;
    pageLayout: PageLayout;
    systemLayout: SystemLayout;
    staffSpacing: number;
    staffLayouts: StaffLayout[];
    pageNumber: string;
}
export interface PrintComplete {
    measureNumbering: MeasureNumbering;
    partNameDisplay: PartNameDisplay;
    newSystem: boolean;
    newPage: boolean;
    blankPage: string;
    measureLayout: MeasureLayout;
    partAbbreviationDisplay: PartAbbreviationDisplay;
    pageLayout: PageLayout;
    systemLayout: SystemLayout;
    staffSpacing: number;
    staffLayouts: StaffLayout[];
    pageNumber: string;
}
export declare function xmlToPrint(node: Node): Print;
export interface MeasureNumbering extends PrintStyleAlign {
    data: string;
}
export interface MeasureNumberingComplete extends PrintStyleAlignComplete {
    data: string;
}
export declare function xmlToMeasureNumbering(node: Node): MeasureNumbering;
export interface Sound extends TimeOnly {
    softPedal: boolean;
    midiInstrument: MidiInstrument;
    pan: string;
    tocoda: string;
    decapo: boolean;
    divisions: string;
    pizzicato: boolean;
    coda: string;
    segno: string;
    elevation: string;
    fine: string;
    damperPedal: boolean;
    dynamics: string;
    plays: Play[];
    offset: Offset;
    sostenutoPedal: boolean;
    dalsegno: string;
    midiDevice: MidiDevice;
    tempo: string;
    forwardRepeat: boolean;
}
export interface SoundComplete extends TimeOnlyComplete {
    softPedal: boolean;
    midiInstrument: MidiInstrument;
    pan: string;
    tocoda: string;
    decapo: boolean;
    divisions: string;
    pizzicato: boolean;
    coda: string;
    segno: string;
    elevation: string;
    fine: string;
    damperPedal: boolean;
    dynamics: string;
    plays: Play[];
    offset: Offset;
    sostenutoPedal: boolean;
    dalsegno: string;
    midiDevice: MidiDevice;
    tempo: string;
    forwardRepeat: boolean;
}
export declare function xmlToSound(node: Node): Sound;
export interface Work {
    workNumber: string;
    workTitle: string;
    opus: Opus;
}
export interface WorkComplete {
    workNumber: string;
    workTitle: string;
    opus: Opus;
}
export declare function xmlToWork(node: Node): Work;
export interface Opus {
}
export interface OpusComplete {
}
export declare function xmlToOpus(node: Node): Opus;
export interface Defaults {
    wordFont: WordFont;
    lyricLanguages: LyricLanguage[];
    lyricFonts: LyricFont[];
    pageLayout: PageLayout;
    systemLayout: SystemLayout;
    appearance: Appearance;
    scaling: Scaling;
    staffLayouts: StaffLayout[];
    musicFont: MusicFont;
}
export interface DefaultsComplete {
    wordFont: WordFont;
    lyricLanguages: LyricLanguage[];
    lyricFonts: LyricFont[];
    pageLayout: PageLayout;
    systemLayout: SystemLayout;
    appearance: Appearance;
    scaling: Scaling;
    staffLayouts: StaffLayout[];
    musicFont: MusicFont;
}
export declare function xmlToDefaults(node: Node): Defaults;
export interface MusicFont extends Font {
}
export interface MusicFontComplete extends FontComplete {
}
export declare function xmlToMusicFont(node: Node): MusicFont;
export interface WordFont extends Font {
}
export interface WordFontComplete extends FontComplete {
}
export declare function xmlToWordFont(node: Node): WordFont;
export interface LyricFont extends Font {
    number_: number;
    name: string;
}
export interface LyricFontComplete extends FontComplete {
    number_: number;
    name: string;
}
export declare function xmlToLyricFont(node: Node): LyricFont;
export interface LyricLanguage {
    number_: number;
    name: string;
}
export interface LyricLanguageComplete {
    number_: number;
    name: string;
}
export declare function xmlToLyricLanguage(node: Node): LyricLanguage;
export interface Credit {
    creditTypes: string[];
    creditWords: CreditWords[];
    creditImage: CreditImage;
    page: number;
}
export interface CreditComplete {
    creditTypes: string[];
    creditWords: CreditWords[];
    creditImage: CreditImage;
    page: number;
}
export declare function xmlToCredit(node: Node): Credit;
export interface CreditWords extends TextFormatting {
    words: string;
}
export interface CreditWordsComplete extends TextFormattingComplete {
    words: string;
}
export declare function xmlToCreditWords(node: Node): CreditWords;
export interface CreditImage extends Position, Halign, ValignImage {
    type: string;
    source: string;
}
export interface CreditImageComplete extends PositionComplete, HalignComplete, ValignImageComplete {
    type: string;
    source: string;
}
export declare function xmlToCreditImage(node: Node): CreditImage;
export interface PartList {
    scoreParts: ScorePart[];
    partGroups: PartGroup[];
}
export interface PartListComplete {
    scoreParts: ScorePart[];
    partGroups: PartGroup[];
}
export declare function xmlToPartList(node: Node): PartList;
export interface ScorePart {
    identification: Identification;
    partNameDisplay: PartNameDisplay;
    scoreInstruments: ScoreInstrument[];
    midiDevices: MidiDevice[];
    partName: PartName;
    partAbbreviationDisplay: PartAbbreviationDisplay;
    partAbbreviation: PartAbbreviation;
    groups: string[];
    midiInstruments: MidiInstrument[];
    id: string;
}
export interface ScorePartComplete {
    identification: Identification;
    partNameDisplay: PartNameDisplay;
    scoreInstruments: ScoreInstrument[];
    midiDevices: MidiDevice[];
    partName: PartName;
    partAbbreviationDisplay: PartAbbreviationDisplay;
    partAbbreviation: PartAbbreviation;
    groups: string[];
    midiInstruments: MidiInstrument[];
    id: string;
}
export declare function xmlToScorePart(node: Node): ScorePart;
export interface PartName extends PrintStyle, PrintObject, Justify {
    partName: string;
}
export interface PartNameComplete extends PrintStyleComplete, PrintObjectComplete, JustifyComplete {
    partName: string;
}
export declare function xmlToPartName(node: Node): PartName;
export interface PartAbbreviation extends PrintStyle, PrintObject, Justify {
    abbreviation: string;
}
export interface PartAbbreviationComplete extends PrintStyleComplete, PrintObjectComplete, JustifyComplete {
    abbreviation: string;
}
export declare function xmlToPartAbbreviation(node: Node): PartAbbreviation;
export interface PartGroup extends Editorial {
    groupNameDisplay: GroupNameDisplay;
    groupSymbol: GroupSymbol;
    groupName: GroupName;
    groupAbbreviationDisplay: GroupAbbreviationDisplay;
    groupBarline: GroupBarline;
    number_: number;
    groupAbbreviation: GroupAbbreviation;
    type: StartStop;
    groupTime: GroupTime;
}
export interface PartGroupComplete extends EditorialComplete {
    groupNameDisplay: GroupNameDisplay;
    groupSymbol: GroupSymbol;
    groupName: GroupName;
    groupAbbreviationDisplay: GroupAbbreviationDisplay;
    groupBarline: GroupBarline;
    number_: number;
    groupAbbreviation: GroupAbbreviation;
    type: StartStop;
    groupTime: GroupTime;
}
export declare function xmlToPartGroup(node: Node): PartGroup;
export interface GroupName extends PrintStyle, Justify {
    name: string;
}
export interface GroupNameComplete extends PrintStyleComplete, JustifyComplete {
    name: string;
}
export declare function xmlToGroupName(node: Node): GroupName;
export interface GroupNameDisplay extends PrintObject {
    displayTexts: DisplayText[];
    accidentalTexts: AccidentalText[];
}
export interface GroupNameDisplayComplete extends PrintObjectComplete {
    displayTexts: DisplayText[];
    accidentalTexts: AccidentalText[];
}
export declare function xmlToGroupNameDisplay(node: Node): GroupNameDisplay;
export interface GroupAbbreviation extends PrintStyle, Justify {
    text: string;
}
export interface GroupAbbreviationComplete extends PrintStyleComplete, JustifyComplete {
    text: string;
}
export declare function xmlToGroupAbbreviation(node: Node): GroupAbbreviation;
export interface GroupAbbreviationDisplay extends PrintObject {
    displayTexts: DisplayText[];
    accidentalTexts: AccidentalText[];
}
export interface GroupAbbreviationDisplayComplete extends PrintObjectComplete {
    displayTexts: DisplayText[];
    accidentalTexts: AccidentalText[];
}
export declare function xmlToGroupAbbreviationDisplay(node: Node): GroupAbbreviationDisplay;
export interface GroupSymbol extends Position, Color {
    data: PartSymbolType;
}
export interface GroupSymbolComplete extends PositionComplete, ColorComplete {
    data: PartSymbolType;
}
export declare function xmlToGroupSymbol(node: Node): GroupSymbol;
export interface GroupBarline extends Color {
    data: string;
}
export interface GroupBarlineComplete extends ColorComplete {
    data: string;
}
export declare function xmlToGroupBarline(node: Node): GroupBarline;
export interface GroupTime {
}
export interface GroupTimeComplete {
}
export declare function xmlToGroupTime(node: Node): GroupTime;
export interface ScoreInstrument {
    instrumentName: string;
    instrumentSound: string;
    ensemble: string;
    virtualInstrument: VirtualInstrument;
    instrumentAbbreviation: string;
    solo: Solo;
    id: string;
}
export interface ScoreInstrumentComplete {
    instrumentName: string;
    instrumentSound: string;
    ensemble: string;
    virtualInstrument: VirtualInstrument;
    instrumentAbbreviation: string;
    solo: Solo;
    id: string;
}
export declare function xmlToScoreInstrument(node: Node): ScoreInstrument;
export interface Solo {
}
export interface SoloComplete {
}
export declare function xmlToSolo(node: Node): Solo;
export interface VirtualInstrument {
    virtualLibrary: string;
    virtualName: string;
}
export interface VirtualInstrumentComplete {
    virtualLibrary: string;
    virtualName: string;
}
export declare function xmlToVirtualInstrument(node: Node): VirtualInstrument;
export interface ScoreHeader {
    movementTitle: string;
    identification: Identification;
    defaults: Defaults;
    work: Work;
    credits: Credit[];
    partList: PartList;
    movementNumber: string;
}
export interface ScoreHeaderComplete {
    movementTitle: string;
    identification: Identification;
    defaults: Defaults;
    work: Work;
    credits: Credit[];
    partList: PartList;
    movementNumber: string;
}
export declare function xmlToScoreHeader(node: Node): ScoreHeader;
export interface ScoreTimewise extends DocumentAttributes, ScoreHeader {
    measures: Measure[];
}
export interface ScoreTimewiseComplete extends DocumentAttributesComplete, ScoreHeaderComplete {
    measures: Measure[];
}
export declare function xmlToScoreTimewise(node: Node): ScoreTimewise;
export interface Part {
}
export interface PartComplete {
}
export declare function xmlToPart(node: Node): any[];
export interface Measure {
    number_: string;
    implicit: boolean;
    width: number;
    parts: {
        [x: string]: any[];
    };
    nonControlling: boolean;
}
export interface MeasureComplete {
    number_: string;
    implicit: boolean;
    width: number;
    parts: {
        [x: string]: any[];
    };
    nonControlling: boolean;
}
