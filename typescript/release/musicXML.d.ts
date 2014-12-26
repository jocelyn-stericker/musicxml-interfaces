declare module "musicxml-interfaces" {
    export interface AccOrText {
        acc?: AccidentalText;
        text?: DisplayText;
    }
    export interface TextArray extends Array<AccOrText> {
    }
    export interface EncodingDate extends CalendarDate {
    }
    export interface Mode extends String {
    }
    export interface OtherAppearance extends String {
    }
    export interface TuningStep extends String {
    }
    export interface OtherDynamics extends String {
    }
    export interface Voice extends String {
    }
    export interface NormalType extends String {
    }
    export interface Software extends String {
    }
    export interface EncodingDescription extends String {
    }
    export interface KeyStep extends String {
    }
    export interface KeyAlter extends String {
    }
    export interface KeyAccidental extends String {
    }
    export interface Beats extends String {
    }
    export interface BeatType extends String {
    }
    export interface TimeRelation extends String {
    }
    export interface SenzaMisura extends String {
    }
    export interface Instruments extends String {
    }
    export interface Sign extends String {
    }
    export interface ClefOctaveChange extends String {
    }
    export interface StaffType extends String {
    }
    export interface Capo extends String {
    }
    export interface Diatonic extends String {
    }
    export interface Chromatic extends String {
    }
    export interface OctaveChange extends String {
    }
    export interface SlashType extends String {
    }
    export interface DisplayStep extends String {
    }
    export interface DisplayOctave extends String {
    }
    export interface BendAlter extends String {
    }
    export interface HoleType extends String {
    }
    export interface HoleShape extends String {
    }
    export interface ArrowDirection extends String {
    }
    export interface ArrowStyle extends String {
    }
    export interface CircularArrow extends String {
    }
    export interface BeatUnit extends String {
    }
    export interface MetronomeRelation extends String {
    }
    export interface MetronomeType extends String {
    }
    export interface PedalStep extends String {
    }
    export interface PedalAlter extends String {
    }
    export interface AccordionMiddle extends String {
    }
    export interface Glass extends String {
    }
    export interface Metal extends String {
    }
    export interface Wood extends String {
    }
    export interface Pitched extends String {
    }
    export interface Membrane extends String {
    }
    export interface Effect extends String {
    }
    export interface StickType extends String {
    }
    export interface StickMaterial extends String {
    }
    export interface StickLocation extends String {
    }
    export interface OtherPercussion extends String {
    }
    export interface FrameStrings extends String {
    }
    export interface FrameFrets extends String {
    }
    export interface WorkNumber extends String {
    }
    export interface WorkTitle extends String {
    }
    export interface MovementNumber extends String {
    }
    export interface MovementTitle extends String {
    }
    export interface CreditType extends String {
    }
    export interface Group extends String {
    }
    export interface InstrumentName extends String {
    }
    export interface InstrumentAbbreviation extends String {
    }
    export interface InstrumentSound extends String {
    }
    export interface Ensemble extends String {
    }
    export interface VirtualLibrary extends String {
    }
    export interface VirtualName extends String {
    }
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
    export interface LayoutTenths extends String {
    }
    export enum StartStop {
        Start = 0,
        Stop = 1,
    }
    export enum StartStopContinue {
        Start = 0,
        Stop = 1,
        Continue = 2,
    }
    export enum StartStopSingle {
        Single = 3,
        Start = 0,
        Stop = 1,
    }
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
    export enum SymbolSize {
        Unspecified = 0,
        Full = 1,
        Cue = 2,
        Large = 3,
    }
    export enum AboveBelow {
        Above = 1,
        Below = 2,
        Unspecified = 0,
    }
    export enum OverUnder {
        Over = 1,
        Under = 2,
        Unspecified = 0,
    }
    export enum UpDown {
        Down = 1,
        Up = 0,
    }
    export enum TopBottom {
        Top = 0,
        Bottom = 1,
    }
    export enum LeftRight {
        Right = 1,
        Left = 0,
    }
    export function verifyNumberOfLines(m: number): void;
    export function verifyRotation(m: number): void;
    export enum EnclosureShape {
        Circle = 3,
        Bracket = 4,
        Triangle = 5,
        Diamond = 6,
        None = 7,
        Square = 1,
        Oval = 2,
        Rectangle = 0,
    }
    export enum NormalItalic {
        Italic = 1,
        Normal = 0,
    }
    export enum NormalBold {
        Bold = 2,
        Normal = 0,
    }
    export function verifyNumberLevel(m: number): void;
    export function verifyBeamLevel(m: number): void;
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
    export interface Placement {
        placement?: AboveBelow;
    }
    export interface PlacementComplete {
        placement: AboveBelow;
    }
    export interface Orientation {
        orientation?: OverUnder;
    }
    export interface OrientationComplete {
        orientation: OverUnder;
    }
    export interface DirectiveEntity {
        directiveEntity?: boolean;
    }
    export interface DirectiveEntityComplete {
        directiveEntity: boolean;
    }
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
    export enum LeftCenterRight {
        Right = 1,
        Center = 2,
        Left = 0,
    }
    export enum TopMiddleBottomBaseline {
        Top = 0,
        Middle = 1,
        Baseline = 3,
        Bottom = 2,
    }
    export enum DirectionMode {
        Lro = 2,
        Rlo = 3,
        Ltr = 0,
        Rtl = 1,
    }
    export enum StraightCurved {
        Curved = 1,
        Straight = 0,
    }
    export enum SolidDashedDottedWavy {
        Dashed = 1,
        Wavy = 3,
        Dotted = 2,
        Solid = 0,
    }
    export enum NormalAngledSquare {
        Angled = 1,
        Square = 2,
        Normal = 0,
    }
    export enum UprightInverted {
        Upright = 0,
        Inverted = 1,
    }
    export enum UpperMainBelow {
        Main = 1,
        Below = 2,
        Upper = 0,
    }
    export enum WholeHalfUnison {
        Unison = 2,
        Whole = 0,
        Half = 1,
    }
    export enum WholeHalfNone {
        None = 3,
        Whole = 0,
        Half = 1,
    }
    export interface Color {
        color?: string;
    }
    export interface ColorComplete {
        color: string;
    }
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
    export interface Justify {
        justify?: LeftCenterRight;
    }
    export interface JustifyComplete {
        justify: LeftCenterRight;
    }
    export interface Halign {
        halign?: LeftCenterRight;
    }
    export interface HalignComplete {
        halign: LeftCenterRight;
    }
    export interface Valign {
        valign?: TopMiddleBottomBaseline;
    }
    export interface ValignComplete {
        valign: TopMiddleBottomBaseline;
    }
    export interface ValignImage {
        valignImage?: TopMiddleBottomBaseline;
    }
    export interface ValignImageComplete {
        valignImage: TopMiddleBottomBaseline;
    }
    export interface LetterSpacing {
        letterSpacing?: string;
    }
    export interface LetterSpacingComplete {
        letterSpacing: string;
    }
    export interface LineHeight {
        lineHeight?: string;
    }
    export interface LineHeightComplete {
        lineHeight: string;
    }
    export interface TextDirection {
        dir?: DirectionMode;
    }
    export interface TextDirectionComplete {
        dir: DirectionMode;
    }
    export interface TextRotation {
        rotation?: number;
    }
    export interface TextRotationComplete {
        rotation: number;
    }
    export interface Enclosure {
        enclosure?: EnclosureShape;
    }
    export interface EnclosureComplete {
        enclosure: EnclosureShape;
    }
    export interface PrintStyle extends Position, Font, Color {
    }
    export interface PrintStyleComplete extends PositionComplete, FontComplete, ColorComplete {
    }
    export interface PrintStyleAlign extends PrintStyle, Halign, Valign {
    }
    export interface PrintStyleAlignComplete extends PrintStyleComplete, HalignComplete, ValignComplete {
    }
    export interface LineShape {
        lineShape?: StraightCurved;
    }
    export interface LineShapeComplete {
        lineShape: StraightCurved;
    }
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
    export interface PrintObject {
        printObject?: boolean;
    }
    export interface PrintObjectComplete {
        printObject: boolean;
    }
    export interface PrintSpacing {
        printSpacing?: boolean;
    }
    export interface PrintSpacingComplete {
        printSpacing: boolean;
    }
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
    export interface TimeOnly {
        timeOnly: string;
    }
    export interface TimeOnlyComplete {
        timeOnly: string;
    }
    export interface DocumentAttributes {
        version_: string;
    }
    export interface DocumentAttributesComplete {
        version_: string;
    }
    export interface Editorial {
        footnote?: Footnote;
        level?: Level;
    }
    export interface EditorialComplete {
        footnote: Footnote;
        level: Level;
    }
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
    export interface Footnote extends TextFormatting {
        text: string;
    }
    export interface FootnoteComplete extends TextFormattingComplete {
        text: string;
    }
    export interface Level extends LevelDisplay {
        text: string;
        reference?: boolean;
    }
    export interface LevelComplete extends LevelDisplayComplete {
        text: string;
        reference: boolean;
    }
    export interface Fermata extends PrintStyle {
        shape: NormalAngledSquare;
        type?: UprightInverted;
    }
    export interface FermataComplete extends PrintStyleComplete {
        shape: NormalAngledSquare;
        type: UprightInverted;
    }
    export interface WavyLine extends Position, Placement, Color, TrillSound {
        number_?: number;
        type: StartStopContinue;
    }
    export interface WavyLineComplete extends PositionComplete, PlacementComplete, ColorComplete, TrillSoundComplete {
        number_: number;
        type: StartStopContinue;
    }
    export interface Staff {
        idx: number;
    }
    export interface StaffComplete {
        idx: number;
    }
    export interface Segno extends PrintStyleAlign {
    }
    export interface SegnoComplete extends PrintStyleAlignComplete {
    }
    export interface Coda extends PrintStyleAlign {
    }
    export interface CodaComplete extends PrintStyleAlignComplete {
    }
    export interface ActualNotes {
        count: number;
    }
    export interface ActualNotesComplete {
        count: number;
    }
    export interface NormalNotes {
        count: number;
    }
    export interface NormalNotesComplete {
        count: number;
    }
    export interface NormalDot {
    }
    export interface NormalDotComplete {
    }
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
    export interface Fret extends Font, Color {
        fret: number;
    }
    export interface FretComplete extends FontComplete, ColorComplete {
        fret: number;
    }
    export interface String extends PrintStyle, Placement {
        stringNum: number;
    }
    export interface StringComplete extends PrintStyleComplete, PlacementComplete {
        stringNum: number;
    }
    export interface TuningAlter {
        step: string;
    }
    export interface TuningAlterComplete {
        step: string;
    }
    export interface TuningOctave {
        step: string;
    }
    export interface TuningOctaveComplete {
        step: string;
    }
    export interface DisplayText extends TextFormatting {
        text: string;
    }
    export interface DisplayTextComplete extends TextFormattingComplete {
        text: string;
    }
    export interface AccidentalText extends TextFormatting {
        text: string;
    }
    export interface AccidentalTextComplete extends TextFormattingComplete {
        text: string;
    }
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
    export function verifyMidiChannel(m: number): void;
    export function verifyMidiBank(m: number): void;
    export function verifyMidiProgram(m: number): void;
    export function verifyMidiUnpitched(m: number): void;
    export function verifyVolume(m: number): void;
    export function verifyPan(m: number): void;
    export function verifyElevation(m: number): void;
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
    export interface Millimeters extends String {
    }
    export interface Scaling {
        tenths?: number;
        millimeters?: number;
    }
    export interface ScalingComplete {
        tenths: number;
        millimeters: number;
    }
    export interface LeftMargin extends String {
    }
    export interface RightMargin extends String {
    }
    export interface TopMargin extends String {
    }
    export interface BottomMargin extends String {
    }
    export interface PageHeight extends String {
    }
    export interface PageWidth extends String {
    }
    export enum OddEvenBoth {
        Both = 2,
        Even = 1,
        Odd = 0,
    }
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
    export interface SystemDistance extends String {
    }
    export interface TopSystemDistance extends String {
    }
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
    export interface SystemMargins {
        leftMargin: number;
        rightMargin: number;
    }
    export interface SystemMarginsComplete {
        leftMargin: number;
        rightMargin: number;
    }
    export interface SystemDividers {
        rightDivider: RightDivider;
        leftDivider: LeftDivider;
    }
    export interface SystemDividersComplete {
        rightDivider: RightDivider;
        leftDivider: LeftDivider;
    }
    export interface LeftDivider extends PrintObject, PrintStyleAlign {
    }
    export interface LeftDividerComplete extends PrintObjectComplete, PrintStyleAlignComplete {
    }
    export interface RightDivider extends PrintObject, PrintStyleAlign {
    }
    export interface RightDividerComplete extends PrintObjectComplete, PrintStyleAlignComplete {
    }
    export interface StaffDistance extends String {
    }
    export interface StaffLayout {
        staffDistance?: number;
        num: number;
    }
    export interface StaffLayoutComplete {
        staffDistance: number;
        num: number;
    }
    export interface MeasureDistance extends String {
    }
    export interface MeasureLayout {
        measureDistance?: number;
    }
    export interface MeasureLayoutComplete {
        measureDistance: number;
    }
    export interface LineWidth {
        tenths: number;
        type: string;
    }
    export interface LineWidthComplete {
        tenths: number;
        type: string;
    }
    export enum CueGraceLarge {
        Grace = 1,
        Cue = 0,
        Large = 2,
    }
    export interface NoteSize {
        size: number;
        type: CueGraceLarge;
    }
    export interface NoteSizeComplete {
        size: number;
        type: CueGraceLarge;
    }
    export interface Distance {
        tenths: number;
        type: string;
    }
    export interface DistanceComplete {
        tenths: number;
        type: string;
    }
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
    export interface Creator {
        creator: string;
        type: string;
    }
    export interface CreatorComplete {
        creator: string;
        type: string;
    }
    export interface Rights {
        type: string;
        rights: string;
    }
    export interface RightsComplete {
        type: string;
        rights: string;
    }
    export interface Encoder {
        encoder: string;
        type: string;
    }
    export interface EncoderComplete {
        encoder: string;
        type: string;
    }
    export interface Source {
        source: string;
    }
    export interface SourceComplete {
        source: string;
    }
    export interface Relation {
        type: string;
        data: string;
    }
    export interface RelationComplete {
        type: string;
        data: string;
    }
    export interface MiscellaneousField {
        data: string;
        name: string;
    }
    export interface MiscellaneousFieldComplete {
        data: string;
        name: string;
    }
    export interface Miscellaneous {
        miscellaneousFields?: MiscellaneousField[];
    }
    export interface MiscellaneousComplete {
        miscellaneousFields: MiscellaneousField[];
    }
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
    export enum SeparatorType {
        None = 0,
        Horizontal = 1,
        Diagonal = 2,
        Vertical = 3,
        Adjacent = 4,
    }
    export interface TimeSeparator {
        separator?: SeparatorType;
    }
    export interface TimeSeparatorComplete {
        separator: SeparatorType;
    }
    export enum TimeSymbolType {
        DottedNote = 4,
        Cut = 1,
        SingleNumber = 2,
        Note = 3,
        Common = 0,
        Normal = 5,
    }
    export interface TimeSymbol {
        symbol?: TimeSymbolType;
    }
    export interface TimeSymbolComplete {
        symbol: TimeSymbolType;
    }
    export enum CancelLocation {
        Right = 1,
        BeforeBarline = 2,
        Left = 0,
    }
    export interface Cancel {
        fifths: number;
        location?: CancelLocation;
    }
    export interface CancelComplete {
        fifths: number;
        location: CancelLocation;
    }
    export interface Fifths extends String {
    }
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
    export interface Divisions extends String {
    }
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
    export interface Staves extends String {
    }
    export enum PartSymbolType {
        None = 0,
        Line = 2,
        Bracket = 3,
        Square = 4,
        Brace = 1,
    }
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
    export interface Line extends String {
    }
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
    export interface StaffLines extends String {
    }
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
    export interface StaffSize extends String {
    }
    export enum ShowFretsType {
        Letters = 1,
        Numbers = 0,
    }
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
    export interface Double {
    }
    export interface DoubleComplete {
    }
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
    export interface Directive extends PrintStyle {
        data: string;
    }
    export interface DirectiveComplete extends PrintStyleComplete {
        data: string;
    }
    export interface SlashDot {
    }
    export interface SlashDotComplete {
    }
    export interface MultipleRest {
        multipleRest?: boolean;
        data: string;
    }
    export interface MultipleRestComplete {
        multipleRest: boolean;
        data: string;
    }
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
    export interface Cue {
    }
    export interface CueComplete {
    }
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
    export interface Chord {
    }
    export interface ChordComplete {
    }
    export interface Unpitched {
        displayStep?: string;
        displayOctave?: string;
    }
    export interface UnpitchedComplete {
        displayStep: string;
        displayOctave: string;
    }
    export interface Alter extends String {
    }
    export interface Octave extends String {
    }
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
    export interface Duration extends String {
    }
    export interface Tie extends TimeOnly {
        type?: StartStop;
    }
    export interface TieComplete extends TimeOnlyComplete {
        type: StartStop;
    }
    export interface Instrument {
        id: string;
    }
    export interface InstrumentComplete {
        id: string;
    }
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
    export enum Count {
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
    export interface Type {
        duration: Count;
        size?: SymbolSize;
    }
    export interface TypeComplete {
        duration: Count;
        size: SymbolSize;
    }
    export interface Dot extends PrintStyle, Placement {
    }
    export interface DotComplete extends PrintStyleComplete, PlacementComplete {
    }
    export enum MxmlAccidental {
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
    export enum StemType {
        None = 2,
        Double = 3,
        Down = 0,
        Up = 1,
    }
    export interface Stem extends Position, Color {
        type: StemType;
    }
    export interface StemComplete extends PositionComplete, ColorComplete {
        type: StemType;
    }
    export enum NoteheadType {
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
    export interface NoteheadText {
        text: TextArray;
    }
    export interface NoteheadTextComplete {
        text: TextArray;
    }
    export enum BeamType {
        BackwardHook = 4,
        Begin = 0,
        ForwardHook = 3,
        Continue = 1,
        End = 2,
    }
    export enum AccelRitNone {
        Accel = 0,
        None = 2,
        Rit = 1,
    }
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
    export interface Tied extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
        number_?: number;
        type: StartStopContinue;
    }
    export interface TiedComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, PlacementComplete, OrientationComplete, BezierComplete, ColorComplete {
        number_: number;
        type: StartStopContinue;
    }
    export interface Slur extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
        number_?: number;
        type: StartStopContinue;
    }
    export interface SlurComplete extends LineTypeComplete, DashedFormattingComplete, PositionComplete, PlacementComplete, OrientationComplete, BezierComplete, ColorComplete {
        number_: number;
        type: StartStopContinue;
    }
    export enum ActualBothNone {
        None = 2,
        Both = 1,
        Actual = 0,
    }
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
    export interface TupletNumber extends Font, Color {
        text: string;
    }
    export interface TupletNumberComplete extends FontComplete, ColorComplete {
        text: string;
    }
    export interface TupletType extends Font, Color {
        text: string;
    }
    export interface TupletTypeComplete extends FontComplete, ColorComplete {
        text: string;
    }
    export interface TupletDot extends Font, Color {
    }
    export interface TupletDotComplete extends FontComplete, ColorComplete {
    }
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
    export interface OtherNotation extends PrintObject, PrintStyle, Placement {
        type: StartStopSingle;
        data?: string;
    }
    export interface OtherNotationComplete extends PrintObjectComplete, PrintStyleComplete, PlacementComplete {
        type: StartStopSingle;
        data: string;
    }
    export interface OtherDirection extends PrintObject, PrintStyleAlign {
        data: string;
    }
    export interface OtherDirectionComplete extends PrintObjectComplete, PrintStyleAlignComplete {
        data: string;
    }
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
    export interface TrillMark extends PrintStyle, Placement, TrillSound {
    }
    export interface TrillMarkComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    }
    export interface Turn extends PrintStyle, Placement, TrillSound {
        slash?: boolean;
    }
    export interface TurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
        slash: boolean;
    }
    export interface DelayedTurn extends PrintStyle, Placement, TrillSound {
        slash?: boolean;
    }
    export interface DelayedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
        slash: boolean;
    }
    export interface InvertedTurn extends PrintStyle, Placement, TrillSound {
        slash?: boolean;
    }
    export interface InvertedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
        slash: boolean;
    }
    export interface DelayedInvertedTurn extends PrintStyle, Placement, TrillSound {
        slash?: boolean;
    }
    export interface DelayedInvertedTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
        slash: boolean;
    }
    export interface VerticalTurn extends PrintStyle, Placement, TrillSound {
    }
    export interface VerticalTurnComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    }
    export interface Shake extends PrintStyle, Placement, TrillSound {
    }
    export interface ShakeComplete extends PrintStyleComplete, PlacementComplete, TrillSoundComplete {
    }
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
    export interface Schleifer extends PrintStyle, Placement {
    }
    export interface SchleiferComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Tremolo extends PrintStyle, Placement {
        data?: string;
        type: StartStopSingle;
    }
    export interface TremoloComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
        type: StartStopSingle;
    }
    export interface OtherOrnament extends PrintStyle, Placement {
        type: StartStopSingle;
        data?: string;
    }
    export interface OtherOrnamentComplete extends PrintStyleComplete, PlacementComplete {
        type: StartStopSingle;
        data: string;
    }
    export interface AccidentalMark extends PrintStyle, Placement {
        mark: string;
    }
    export interface AccidentalMarkComplete extends PrintStyleComplete, PlacementComplete {
        mark: string;
    }
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
    export interface UpBow extends PrintStyle, Placement {
    }
    export interface UpBowComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface DownBow extends PrintStyle, Placement {
    }
    export interface DownBowComplete extends PrintStyleComplete, PlacementComplete {
    }
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
    export interface OpenString extends PrintStyle, Placement {
    }
    export interface OpenStringComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface ThumbPosition extends PrintStyle, Placement {
    }
    export interface ThumbPositionComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Pluck extends PrintStyle, Placement {
        data: string;
    }
    export interface PluckComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
    export interface DoubleTongue extends PrintStyle, Placement {
    }
    export interface DoubleTongueComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface TripleTongue extends PrintStyle, Placement {
    }
    export interface TripleTongueComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Stopped extends PrintStyle, Placement {
    }
    export interface StoppedComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface SnapPizzicato extends PrintStyle, Placement {
    }
    export interface SnapPizzicatoComplete extends PrintStyleComplete, PlacementComplete {
    }
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
    export interface WithBar extends PrintStyle, Placement {
        data: string;
    }
    export interface WithBarComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
    export interface Tap extends PrintStyle, Placement {
        data: string;
    }
    export interface TapComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
    export interface Heel extends PrintStyle, Placement {
        substitution?: boolean;
    }
    export interface HeelComplete extends PrintStyleComplete, PlacementComplete {
        substitution: boolean;
    }
    export interface Toe extends PrintStyle, Placement {
        substitution?: boolean;
    }
    export interface ToeComplete extends PrintStyleComplete, PlacementComplete {
        substitution: boolean;
    }
    export interface Fingernails extends PrintStyle, Placement {
    }
    export interface FingernailsComplete extends PrintStyleComplete, PlacementComplete {
    }
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
    export enum HoleLocation {
        Right = 0,
        Top = 3,
        Bottom = 1,
        Left = 2,
    }
    export enum HoleClosedType {
        No = 1,
        Yes = 0,
        Half = 2,
    }
    export interface HoleClosed {
        location?: HoleLocation;
        data: HoleClosedType;
    }
    export interface HoleClosedComplete {
        location: HoleLocation;
        data: HoleClosedType;
    }
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
    export interface Handbell extends PrintStyle, Placement {
        data: string;
    }
    export interface HandbellComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
    export interface OtherTechnical extends PrintStyle, Placement {
        data: string;
    }
    export interface OtherTechnicalComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
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
    export interface Accent extends PrintStyle, Placement {
    }
    export interface AccentComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface StrongAccent extends PrintStyle, Placement {
        type?: UpDown;
    }
    export interface StrongAccentComplete extends PrintStyleComplete, PlacementComplete {
        type: UpDown;
    }
    export interface Staccato extends PrintStyle, Placement {
    }
    export interface StaccatoComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Tenuto extends PrintStyle, Placement {
    }
    export interface TenutoComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface DetachedLegato extends PrintStyle, Placement {
    }
    export interface DetachedLegatoComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Staccatissimo extends PrintStyle, Placement {
    }
    export interface StaccatissimoComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Spiccato extends PrintStyle, Placement {
    }
    export interface SpiccatoComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Scoop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
    }
    export interface ScoopComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
    }
    export interface Plop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
    }
    export interface PlopComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
    }
    export interface Doit extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
    }
    export interface DoitComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
    }
    export interface Falloff extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
    }
    export interface FalloffComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
    }
    export enum BreathMarkType {
        Empty = 2,
        Comma = 0,
        Tick = 1,
    }
    export interface BreathMark extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
        type: BreathMarkType;
    }
    export interface BreathMarkComplete extends LineShapeComplete, LineTypeComplete, DashedFormattingComplete, PrintStyleComplete, PlacementComplete {
        type: BreathMarkType;
    }
    export interface Caesura extends PrintStyle, Placement {
    }
    export interface CaesuraComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Stress extends PrintStyle, Placement {
    }
    export interface StressComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface Unstress extends PrintStyle, Placement {
    }
    export interface UnstressComplete extends PrintStyleComplete, PlacementComplete {
    }
    export interface OtherArticulation extends PrintStyle, Placement {
        data: string;
    }
    export interface OtherArticulationComplete extends PrintStyleComplete, PlacementComplete {
        data: string;
    }
    export interface Arpeggiate extends Position, Placement, Color {
        number_?: number;
        direction?: UpDown;
    }
    export interface ArpeggiateComplete extends PositionComplete, PlacementComplete, ColorComplete {
        number_: number;
        direction: UpDown;
    }
    export interface NonArpeggiate extends Position, Placement, Color {
        number_?: number;
        type: TopBottom;
    }
    export interface NonArpeggiateComplete extends PositionComplete, PlacementComplete, ColorComplete {
        number_: number;
        type: TopBottom;
    }
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
    export interface Text extends Font, Color, TextDecoration, TextRotation, LetterSpacing, TextDirection {
        data: string;
    }
    export interface TextComplete extends FontComplete, ColorComplete, TextDecorationComplete, TextRotationComplete, LetterSpacingComplete, TextDirectionComplete {
        data: string;
    }
    export interface Syllabic extends Font, Color {
        data: string;
    }
    export interface SyllabicComplete extends FontComplete, ColorComplete {
        data: string;
    }
    export interface Elision extends Font, Color {
        data: string;
    }
    export interface ElisionComplete extends FontComplete, ColorComplete {
        data: string;
    }
    export interface Extend extends PrintStyle {
        type?: StartStopContinue;
    }
    export interface ExtendComplete extends PrintStyleComplete {
        type: StartStopContinue;
    }
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
    export interface Prefix extends PrintStyle {
        data: string;
    }
    export interface PrefixComplete extends PrintStyleComplete {
        data: string;
    }
    export interface FigureNumber extends PrintStyle {
        data: string;
    }
    export interface FigureNumberComplete extends PrintStyleComplete {
        data: string;
    }
    export interface Suffix extends PrintStyle {
        data: string;
    }
    export interface SuffixComplete extends PrintStyleComplete {
        data: string;
    }
    export interface Backup extends Editorial {
        duration: number;
    }
    export interface BackupComplete extends EditorialComplete {
        duration: number;
    }
    export interface Forward extends EditorialVoice {
        duration: number;
        staff?: Staff;
    }
    export interface ForwardComplete extends EditorialVoiceComplete {
        duration: number;
        staff: Staff;
    }
    export enum BarlineLocation {
        Right = 1,
        Middle = 2,
        Left = 0,
    }
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
    export enum BarStyleType {
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
    export interface BarStyle extends Color {
        data: BarStyleType;
    }
    export interface BarStyleComplete extends ColorComplete {
        data: BarStyleType;
    }
    export enum StartStopDiscontinue {
        Discontinue = 2,
        Start = 0,
        Stop = 1,
    }
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
    export enum WingedType {
        None = 0,
        Curved = 2,
        DoubleCurved = 4,
        Straight = 1,
        DoubleStraight = 3,
    }
    export enum DirectionTypeBg {
        Forward = 1,
        Backward = 0,
    }
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
    export enum TipDirection {
        Right = 3,
        Northwest = 4,
        Southwest = 7,
        Down = 1,
        Northeast = 5,
        Southeast = 6,
        Up = 0,
        Left = 2,
    }
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
    export interface Rehearsal extends TextFormatting {
        data: string;
    }
    export interface RehearsalComplete extends TextFormattingComplete {
        data: string;
    }
    export interface Words extends TextFormatting {
        data: string;
    }
    export interface WordsComplete extends TextFormattingComplete {
        data: string;
    }
    export enum WedgeType {
        Diminuendo = 1,
        Crescendo = 0,
        Stop = 2,
        Continue = 3,
    }
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
    export interface Dashes extends DashedFormatting, Position, Color {
        number_: number;
        type: StartStopContinue;
    }
    export interface DashesComplete extends DashedFormattingComplete, PositionComplete, ColorComplete {
        number_: number;
        type: StartStopContinue;
    }
    export enum LineEndType {
        None = 4,
        Both = 2,
        Arrow = 3,
        Down = 1,
        Up = 0,
    }
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
    export enum PedalType {
        Change = 3,
        Start = 0,
        Stop = 1,
        Continue = 2,
    }
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
    export interface BeatUnitDot {
    }
    export interface BeatUnitDotComplete {
    }
    export interface PerMinute extends Font {
        data: string;
    }
    export interface PerMinuteComplete extends FontComplete {
        data: string;
    }
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
    export interface MetronomeDot {
    }
    export interface MetronomeDotComplete {
    }
    export interface MetronomeBeam {
        number_: number;
        data: string;
    }
    export interface MetronomeBeamComplete {
        number_: number;
        data: string;
    }
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
    export enum OctaveShiftType {
        Down = 2,
        Stop = 3,
        Up = 1,
        Continue = 4,
    }
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
    export interface HarpPedals extends PrintStyleAlign {
        pedalTunings: PedalTuning[];
    }
    export interface HarpPedalsComplete extends PrintStyleAlignComplete {
        pedalTunings: PedalTuning[];
    }
    export interface PedalTuning {
        pedalStep: string;
        pedalAlter: string;
    }
    export interface PedalTuningComplete {
        pedalStep: string;
        pedalAlter: string;
    }
    export interface Damp extends PrintStyleAlign {
    }
    export interface DampComplete extends PrintStyleAlignComplete {
    }
    export interface DampAll extends PrintStyleAlign {
    }
    export interface DampAllComplete extends PrintStyleAlignComplete {
    }
    export interface Eyeglasses extends PrintStyleAlign {
    }
    export interface EyeglassesComplete extends PrintStyleAlignComplete {
    }
    export interface StringMute extends PrintStyleAlign {
        type: string;
    }
    export interface StringMuteComplete extends PrintStyleAlignComplete {
        type: string;
    }
    export interface Scordatura {
        accords: Accord[];
    }
    export interface ScordaturaComplete {
        accords: Accord[];
    }
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
    export interface Image extends Position, Halign, ValignImage {
        type: string;
        source: string;
    }
    export interface ImageComplete extends PositionComplete, HalignComplete, ValignImageComplete {
        type: string;
        source: string;
    }
    export enum VoiceSymbol {
        None = 4,
        Hauptstimme = 1,
        Nebenstimme = 2,
        Plain = 3,
    }
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
    export interface Timpani {
    }
    export interface TimpaniComplete {
    }
    export interface Beater {
        data: string;
        tip: TipDirection;
    }
    export interface BeaterComplete {
        data: string;
        tip: TipDirection;
    }
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
    export interface Offset {
        data: string;
        sound: boolean;
    }
    export interface OffsetComplete {
        data: string;
        sound: boolean;
    }
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
    export enum ExplicitImpliedAlternate {
        Explicit = 1,
        Implied = 2,
        Alternate = 3,
    }
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
    export interface Root {
        rootStep: RootStep;
        rootAlter: RootAlter;
    }
    export interface RootComplete {
        rootStep: RootStep;
        rootAlter: RootAlter;
    }
    export interface RootStep extends PrintStyle {
        text: string;
        data: string;
    }
    export interface RootStepComplete extends PrintStyleComplete {
        text: string;
        data: string;
    }
    export interface RootAlter extends PrintObject, PrintStyle {
        location: LeftRight;
        data: string;
    }
    export interface RootAlterComplete extends PrintObjectComplete, PrintStyleComplete {
        location: LeftRight;
        data: string;
    }
    export interface Function extends PrintStyle {
        data: string;
    }
    export interface FunctionComplete extends PrintStyleComplete {
        data: string;
    }
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
    export interface Inversion extends PrintStyle {
        data: string;
    }
    export interface InversionComplete extends PrintStyleComplete {
        data: string;
    }
    export interface Bass {
        bassStep: BassStep;
        bassAlter: BassAlter;
    }
    export interface BassComplete {
        bassStep: BassStep;
        bassAlter: BassAlter;
    }
    export interface BassStep extends PrintStyle {
        text: string;
        data: string;
    }
    export interface BassStepComplete extends PrintStyleComplete {
        text: string;
        data: string;
    }
    export interface BassAlter extends PrintObject, PrintStyle {
        location: LeftRight;
        data: string;
    }
    export interface BassAlterComplete extends PrintObjectComplete, PrintStyleComplete {
        location: LeftRight;
        data: string;
    }
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
    export enum ChordType {
        Augmented = 3,
        Diminished = 4,
        Major = 1,
        Minor = 2,
        HalfDiminished = 5,
    }
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
    export interface DegreeAlter extends PrintStyle {
        plusMinus: boolean;
        data: string;
    }
    export interface DegreeAlterComplete extends PrintStyleComplete {
        plusMinus: boolean;
        data: string;
    }
    export interface DegreeType extends PrintStyle {
        text: string;
        data: string;
    }
    export interface DegreeTypeComplete extends PrintStyleComplete {
        text: string;
        data: string;
    }
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
    export interface Barre extends Color {
        type: StartStop;
    }
    export interface BarreComplete extends ColorComplete {
        type: StartStop;
    }
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
    export interface Feature {
        data: string;
        type: string;
    }
    export interface FeatureComplete {
        data: string;
        type: string;
    }
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
    export interface MeasureNumbering extends PrintStyleAlign {
        data: string;
    }
    export interface MeasureNumberingComplete extends PrintStyleAlignComplete {
        data: string;
    }
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
    export interface Opus {
    }
    export interface OpusComplete {
    }
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
    export interface MusicFont extends Font {
    }
    export interface MusicFontComplete extends FontComplete {
    }
    export interface WordFont extends Font {
    }
    export interface WordFontComplete extends FontComplete {
    }
    export interface LyricFont extends Font {
        number_: number;
        name: string;
    }
    export interface LyricFontComplete extends FontComplete {
        number_: number;
        name: string;
    }
    export interface LyricLanguage {
        number_: number;
        name: string;
    }
    export interface LyricLanguageComplete {
        number_: number;
        name: string;
    }
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
    export interface CreditWords extends TextFormatting {
        words: string;
    }
    export interface CreditWordsComplete extends TextFormattingComplete {
        words: string;
    }
    export interface CreditImage extends Position, Halign, ValignImage {
        type: string;
        source: string;
    }
    export interface CreditImageComplete extends PositionComplete, HalignComplete, ValignImageComplete {
        type: string;
        source: string;
    }
    export interface PartList {
        scoreParts: ScorePart[];
        partGroups: PartGroup[];
    }
    export interface PartListComplete {
        scoreParts: ScorePart[];
        partGroups: PartGroup[];
    }
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
    export interface PartName extends PrintStyle, PrintObject, Justify {
        partName: string;
    }
    export interface PartNameComplete extends PrintStyleComplete, PrintObjectComplete, JustifyComplete {
        partName: string;
    }
    export interface PartAbbreviation extends PrintStyle, PrintObject, Justify {
        abbreviation: string;
    }
    export interface PartAbbreviationComplete extends PrintStyleComplete, PrintObjectComplete, JustifyComplete {
        abbreviation: string;
    }
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
    export interface GroupName extends PrintStyle, Justify {
        name: string;
    }
    export interface GroupNameComplete extends PrintStyleComplete, JustifyComplete {
        name: string;
    }
    export interface GroupNameDisplay extends PrintObject {
        displayTexts: DisplayText[];
        accidentalTexts: AccidentalText[];
    }
    export interface GroupNameDisplayComplete extends PrintObjectComplete {
        displayTexts: DisplayText[];
        accidentalTexts: AccidentalText[];
    }
    export interface GroupAbbreviation extends PrintStyle, Justify {
        text: string;
    }
    export interface GroupAbbreviationComplete extends PrintStyleComplete, JustifyComplete {
        text: string;
    }
    export interface GroupAbbreviationDisplay extends PrintObject {
        displayTexts: DisplayText[];
        accidentalTexts: AccidentalText[];
    }
    export interface GroupAbbreviationDisplayComplete extends PrintObjectComplete {
        displayTexts: DisplayText[];
        accidentalTexts: AccidentalText[];
    }
    export interface GroupSymbol extends Position, Color {
        data: PartSymbolType;
    }
    export interface GroupSymbolComplete extends PositionComplete, ColorComplete {
        data: PartSymbolType;
    }
    export interface GroupBarline extends Color {
        data: string;
    }
    export interface GroupBarlineComplete extends ColorComplete {
        data: string;
    }
    export interface GroupTime {
    }
    export interface GroupTimeComplete {
    }
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
    export interface Solo {
    }
    export interface SoloComplete {
    }
    export interface VirtualInstrument {
        virtualLibrary: string;
        virtualName: string;
    }
    export interface VirtualInstrumentComplete {
        virtualLibrary: string;
        virtualName: string;
    }
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
    export interface ScoreTimewise extends DocumentAttributes, ScoreHeader {
        measures: Measure[];
    }
    export interface ScoreTimewiseComplete extends DocumentAttributesComplete, ScoreHeaderComplete {
        measures: Measure[];
    }
    export interface Part {
    }
    export interface PartComplete {
    }
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
}
