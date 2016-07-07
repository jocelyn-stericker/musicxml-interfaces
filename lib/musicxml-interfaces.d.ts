declare module 'musicxml-interfaces/index' {
	/**
	 * Converts a MusicXML document into a MusicXML parttime-inspired JSON object.
	 * See ScoreTimewise for full return type specification.
	 *
	 * This function will accept timepart MusicXML files, but will still return a
	 * structure similar to parttime.
	 */
	export function parseScore(score: string): ScoreTimewise;
	/**
	 * Reads a document, and returns header information.
	 *
	 * ScoreHeader is a subset of ScoreTimewise, so you can always just call MusicXML.parse.score.
	 * This function is a bit faster though, if you only care about metadata.
	 */
	export function paseScoreHeader(score: string): ScoreHeader;
	/**
	 * Converts a MusicXML <measure /> from a **parttime** document into JSON.
	 */
	export function parseMeasure(str: string): Measure;
	/**
	 * Converts a MusicXML <note /> into JSON.
	 */
	export function parseNote(str: string): Note;
	/**
	 * Converts a MusicXML <clef /> into JSON.
	 */
	export function parseClef(str: string): Clef;
	/**
	 * Converts a MusicXML <time /> into JSON.
	 */
	export function parseTime(str: string): Time;
	/**
	 * Converts a MusicXML <key /> into JSON.
	 */
	export function parseKey(str: string): Key;
	/**
	 * Converts a MusicXML <part-symbol /> into JSON.
	 */
	export function parsePartSymbol(str: string): PartSymbol;
	/**
	 * Converts a MusicXML <backup /> into JSON.
	 */
	export function parseBackup(str: string): Backup;
	/**
	 * Converts a MusicXML <harmony /> into JSON.
	 */
	export function parseHarmony(str: string): Harmony;
	/**
	 * Converts a MusicXML <forward /> into JSON.
	 */
	export function parseForward(str: string): Forward;
	/**
	 * Converts a MusicXML <print /> into JSON.
	 */
	export function parsePrint(str: string): Print;
	/**
	 * Converts a MusicXML <figured-bass /> into JSON.
	 */
	export function parseFiguredBass(str: string): FiguredBass;
	/**
	 * Converts a MusicXML <direction /> into JSON.
	 */
	export function parseDirection(str: string): Direction;
	/**
	 * Converts a MusicXML <attributes /> object into JSON.
	 */
	export function parseAttributes(str: string): Attributes;
	/**
	 * Converts a MusicXML <sound /> into JSON.
	 */
	export function parseSound(str: string): Sound;
	/**
	 * Converts a MusicXML <barline /> into JSON.
	 */
	export function parseBarline(str: string): Barline;
	/**
	 * Converts a MusicXML <grouping /> into JSON.
	 */
	export function parseGrouping(str: string): Grouping;
	export function serializeScore(score: ScoreTimewise): string;
	export function serializeScoreHeader(scoreHeader: ScoreHeader): string;
	export let serializeMeasure: (measure: Measure) => string;
	export let serializeNote: (note: Note) => string;
	export let serializeClef: (clef: Clef) => string;
	export let serializeTime: (time: Time) => string;
	export let serializeKey: (key: Key) => string;
	export let serializePartSymbol: (partSymbol: PartSymbol) => string;
	export let serializeBackup: (backup: Backup) => string;
	export let serializeHarmony: (harmony: Harmony) => string;
	export let serializeForward: (forward: Forward) => string;
	export let serializePrint: (print: Print) => string;
	export let serializeFiguredBass: (figuredBass: FiguredBass) => string;
	export let serializeDirection: (direction: Direction) => string;
	export let serializeAttributes: (attributes: Attributes) => string;
	export let serializeSound: (sound: Sound) => string;
	export let serializeBarline: (barline: Barline) => string;
	export let serializeGrouping: (grouping: Grouping) => string;
	export interface TextSegment {
	    acc?: AccidentalText;
	    text?: DisplayText;
	}
	export interface EncodingDate extends CalendarDate {
	}
	/**
	 * Calendar dates are represented yyyy-mm-dd format, following
	 * ISO 8601.
	 */
	export interface CalendarDate {
	    /**
	     * The 1-indexed month number
	     */
	    month: number;
	    /**
	     * The day of the month
	     */
	    day: number;
	    /**
	     * The year number (e.g., 2015)
	     */
	    year: number;
	}
	/**
	 * The start-stop entity is used for musical elements that
	 * can either start or stop, such as slurs, tuplets, and
	 * wedges.
	 *
	 * See also start-stop-continue and start-stop-single.
	 *
	 * The values of start and stop refer to how an
	 * element appears in musical score order, not in MusicXML
	 * document order. An element with a stop attribute may
	 * precede the corresponding element with a start attribute
	 * within a MusicXML document. This is particularly common
	 * in multi-staff music. For example, the stopping point for
	 * a slur may appear in staff 1 before the starting point for
	 * the slur appears in staff 2 later in the document.
	 */
	export enum StartStop {
	    Start = 0,
	    Stop = 1,
	}
	/**
	 * The start-stop-continue (as opposed to the start-stop entity)
	 * entity is used when there is a need to refer to an
	 * intermediate point in the symbol, as for complex slurs
	 * or for specifying formatting of symbols across system
	 * breaks.
	 *
	 * The values of start, stop, and continue refer to how an
	 * element appears in musical score order, not in MusicXML
	 * document order. An element with a stop attribute may
	 * precede the corresponding element with a start attribute
	 * within a MusicXML document. This is particularly common
	 * in multi-staff music. For example, the stopping point for
	 * a slur may appear in staff 1 before the starting point for
	 * the slur appears in staff 2 later in the document.
	 */
	export enum StartStopContinue {
	    Start = 0,
	    Stop = 1,
	    Continue = 2,
	}
	/**
	 * The start-stop-single entity (as opposed to start-stop
	 * and start-stop-continue) is used when the same
	 * element is used for multi-note and single-note notations,
	 * as for tremolos.
	 *
	 * The values of start and stop refer to how an
	 * element appears in musical score order, not in MusicXML
	 * document order. An element with a stop attribute may
	 * precede the corresponding element with a start attribute
	 * within a MusicXML document. This is particularly common
	 * in multi-staff music. For example, the stopping point for
	 * a slur may appear in staff 1 before the starting point for
	 * the slur appears in staff 2 later in the document.
	 */
	export enum StartStopSingle {
	    Single = 3,
	    Start = 0,
	    Stop = 1,
	}
	/**
	 * The symbol-size entity is used to indicate full vs.
	 * cue-sized vs. oversized symbols. The large value
	 * for oversized symbols was added in version 1.1.
	 */
	export enum SymbolSize {
	    /**
	     * Context-dependant.
	     */
	    Unspecified = 0,
	    Full = 1,
	    Cue = 2,
	    /**
	     * Oversized.
	     */
	    Large = 3,
	}
	/**
	 * The above-below type is used to indicate whether one
	 * element appears above or below another element.
	 */
	export enum AboveBelow {
	    Above = 1,
	    Below = 2,
	    Unspecified = 0,
	}
	/**
	 * Specifies orientation.
	 */
	export enum OverUnder {
	    Over = 1,
	    Under = 2,
	    Unspecified = 0,
	}
	/**
	 * The up-down entity is used for arrow direction,
	 * indicating which way the tip is pointing.
	 */
	export enum UpDown {
	    Down = 1,
	    Up = 0,
	}
	/**
	 * The top-bottom entity is used to indicate the top or
	 * bottom part of a vertical shape like non-arpeggiate.
	 */
	export enum TopBottom {
	    Top = 0,
	    Bottom = 1,
	}
	/**
	 * The left-right entity is used to indicate whether one
	 * element appears to the left or the right of another
	 * element.
	 */
	export enum LeftRight {
	    Right = 1,
	    Left = 0,
	}
	/**
	 * The enclosure-shape entity describes the shape and
	 * presence / absence of an enclosure around text. A bracket
	 * enclosure is similar to a rectangle with the bottom line
	 * missing, as is common in jazz notation.
	 */
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
	/**
	 * The position attributes are based on MuseData print
	 * suggestions. For most elements, any program will compute
	 * a default x and y position. The position attributes let
	 * the computation of the default position be changed or an
	 * offset added.
	 *
	 * Positive x is right, negative x is left; positive y is up,
	 * negative y is down. All units are in tenths of interline
	 * space. For stems, positive relative-y lengthens a stem
	 * while negative relative-y shortens it.
	 *
	 * As elsewhere in the MusicXML format, tenths are the global
	 * tenths defined by the scaling element, not the local tenths
	 * of a staff resized by the staff-size element.
	 */
	export interface Position {
	    /**
	     * The default-x attribute changes the
	     * computation of the default position. For most elements,
	     * the origin is changed relative to the left-hand side of
	     * the note or the musical position within the bar (x).
	     *
	     * For the following elements, the default-x value changes
	     * the origin relative to the start of the current measure:
	     *
	     *     - note
	     *     - figured-bass
	     *     - harmony
	     *     - link
	     *     - directive
	     *     - measure-numbering
	     *     - all descendants of the part-list element
	     *     - all children of the direction-type element
	     *
	     * This origin is from the start of the entire measure,
	     * at either the left barline or the start of the system.
	     *
	     * When the default-x attribute is used within a child element
	     * of the part-name-display, part-abbreviation-display,
	     * group-name-display, or group-abbreviation-display elements,
	     * it changes the origin relative to the start of the first
	     * measure on the system. These values are used when the current
	     * measure or a succeeding measure starts a new system. The same
	     * change of origin is used for the group-symbol element.
	     *
	     * For the note, figured-bass, and harmony elements, the
	     * default-x value is considered to have adjusted the musical
	     * position within the bar for its descendant elements.
	     *
	     * Since the credit-words and credit-image elements are not
	     * related to a measure, in these cases the default-x and
	     * default-y attributes adjust the origin relative to the
	     * bottom left-hand corner of the specified page.
	     *
	     * The default-x and default-y position attributes provide
	     * higher-resolution positioning data than related features
	     * such as the placement attribute and the offset element.
	     * Applications reading a MusicXML file that can understand
	     * both features should generally rely on the default-x and
	     * default-y attributes for their greater accuracy. For the
	     * relative-x and relative-y attributes, the offset element,
	     * placement attribute, and directive attribute provide
	     * context for the relative position information, so the two
	     * features should be interpreted together.
	     */
	    defaultX?: number;
	    /**
	     * The relative-y attribute changes the vertical position
	     * relative to the default position, either as computed by the
	     * individual program, or as overridden by the default-y attribute.
	     */
	    relativeY?: number;
	    /**
	     * The default-y attribute changes the
	     * computation of the default position. For most elements,
	     * the origin is changed relative to the top line of the staff (y).
	     *
	     * Since the credit-words and credit-image elements are not
	     * related to a measure, in these cases the default-x and
	     * default-y attributes adjust the origin relative to the
	     * bottom left-hand corner of the specified page.
	     *
	     * The default-x and default-y position attributes provide
	     * higher-resolution positioning data than related features
	     * such as the placement attribute and the offset element.
	     * Applications reading a MusicXML file that can understand
	     * both features should generally rely on the default-x and
	     * default-y attributes for their greater accuracy. For the
	     * relative-x and relative-y attributes, the offset element,
	     * placement attribute, and directive attribute provide
	     * context for the relative position information, so the two
	     * features should be interpreted together.
	     */
	    defaultY?: number;
	    /**
	     * The relative-x attribute changes the horizontal position
	     * relative to the default position, either as computed by the
	     * individual program, or as overridden by the default-x attribute.
	     */
	    relativeX?: number;
	}
	/**
	 * The placement attribute indicates whether something is
	 * above or below another element, such as a note or a
	 * notation.
	 */
	export interface Placement {
	    placement?: AboveBelow;
	}
	/**
	 * The orientation attribute indicates whether slurs and
	 * ties are overhand (tips down) or underhand (tips up).
	 * This is distinct from the placement entity used by any
	 * notation type.
	 */
	export interface Orientation {
	    orientation?: OverUnder;
	}
	/**
	 * The directive entity changes the default-x position
	 * of a direction. It indicates that the left-hand side of the
	 * direction is aligned with the left-hand side of the time
	 * signature. If no time signature is present, it is aligned
	 * with the left-hand side of the first music notational
	 * element in the measure. If a default-x, justify, or halign
	 * attribute is present, it overrides the directive entity.
	 */
	export interface DirectiveEntity {
	    directive?: boolean;
	}
	/**
	 * The bezier entity is used to indicate the curvature of
	 * slurs and ties, representing the control points for a
	 * cubic bezier curve. For ties, the bezier entity is
	 * used with the tied element.
	 * Normal slurs, S-shaped slurs, and ties need only two
	 * bezier points: one associated with the start of the slur
	 * or tie, the other with the stop. Complex slurs and slurs
	 * divided over system breaks can specify additional
	 * bezier data at slur elements with a continue type.
	 *
	 * The bezier-offset, bezier-x, and bezier-y attributes
	 * describe the outgoing bezier point for slurs and ties
	 * with a start type, and the incoming bezier point for
	 * slurs and ties with types of stop or continue. The
	 * attributes bezier-offset2, bezier-x2, and bezier-y2
	 * are only valid with slurs of type continue, and
	 * describe the outgoing bezier point.
	 *
	 * The bezier-offset and bezier-offset2 attributes are
	 * measured in terms of musical divisions, like the offset
	 * element. These are the recommended attributes for
	 * specifying horizontal position. The other attributes
	 * are specified in tenths, relative to any position
	 * settings associated with the slur or tied element.
	 */
	export interface Bezier {
	    bezierX2?: number;
	    bezierOffset?: number;
	    bezierOffset2?: number;
	    bezierX?: number;
	    bezierY?: number;
	    bezierY2?: number;
	}
	/**
	 * The font entity gathers together attributes for
	 * determining the font within a directive or direction.
	 * They are based on the text styles for Cascading
	 * Style Sheets. The font-family is a comma-separated list
	 * of font names. These can be specific font styles such
	 * as Maestro or Opus, or one of several generic font styles:
	 * music, engraved, handwritten, text, serif, sans-serif,
	 * handwritten, cursive, fantasy, and monospace. The music,
	 * engraved, and handwritten values refer to music fonts;
	 * the rest refer to text fonts. The fantasy style refers to
	 * decorative text such as found in older German-style
	 * printing. The font-style can be normal or italic. The
	 * font-size can be one of the CSS sizes (xx-small, x-small,
	 * small, medium, large, x-large, xx-large) or a numeric
	 * point size. The font-weight can be normal or bold. The
	 * default is application-dependent, but is a text font vs.
	 * a music font.
	 */
	export interface Font {
	    fontFamily?: string;
	    fontWeight?: NormalBold;
	    fontStyle?: NormalItalic;
	    fontSize?: string;
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
	/**
	 * The color entity indicates the color of an element.
	 * Color may be represented as hexadecimal RGB triples,
	 * as in HTML, or as hexadecimal ARGB tuples, with the
	 * A indicating alpha of transparency. An alpha value
	 * of 00 is totally transparent; FF is totally opaque.
	 * If RGB is used, the A value is assumed to be FF.
	 * For instance, the RGB value "#800080" represents
	 * purple. An ARGB value of "#40800080" would be a
	 * transparent purple.
	 *
	 *
	 * As in SVG 1.1, colors are defined in terms of the
	 * sRGB color space (IEC 61966).
	 */
	export interface Color {
	    color?: string;
	}
	/**
	 * The text-decoration entity is based on the similar
	 * feature in XHTML and CSS. It allows for text to
	 * be underlined, overlined, or struck-through. It
	 * extends the CSS version by allow double or
	 * triple lines instead of just being on or off.
	 */
	export interface TextDecoration {
	    underline?: number;
	    overline?: number;
	    lineThrough?: number;
	}
	/**
	 * The justify entity is used to indicate left, center, or
	 * right justification. The default value leties for different
	 * elements. For elements where the justify attribute is present
	 * but the halign attribute is not, the justify attribute
	 * indicates horizontal alignment as well as justification.
	 */
	export interface Justify {
	    justify?: LeftCenterRight;
	}
	/**
	 * In cases where text extends over more than one line,
	 * horizontal alignment and justify values can be different.
	 * The most typical case is for credits, such as:
	 * Words and music by
	 *   Pat Songwriter
	 *
	 *
	 * Typically this type of credit is aligned to the right,
	 * so that the position information refers to the right-
	 * most part of the text. But in this example, the text
	 * is center-justified, not right-justified.
	 *
	 * The halign attribute is used in these situations. If it
	 * is not present, its value is the same as for the justify
	 * attribute.
	 */
	export interface Halign {
	    halign?: LeftCenterRight;
	}
	/**
	 * The valign entity is used to indicate vertical
	 * alignment to the top, middle, bottom, or baseline
	 * of the text. Defaults are implementation-dependent.
	 */
	export interface Valign {
	    valign?: TopMiddleBottomBaseline;
	}
	/**
	 * The valign-image entity is used to indicate vertical
	 * alignment for images and graphics, so it removes the
	 * baseline value. Defaults are implementation-dependent.
	 */
	export interface ValignImage {
	    valignImage?: TopMiddleBottomBaseline;
	}
	/**
	 * The letter-spacing entity specifies text tracking.
	 * Values are either "normal" or a number representing
	 * the number of ems to add between each letter. The
	 * number may be negative in order to subtract space.
	 * The default is normal, which allows flexibility of
	 * letter-spacing for purposes of text justification.
	 */
	export interface LetterSpacing {
	    letterSpacing?: string;
	}
	/**
	 * The line-height entity specified text leading. Values
	 * are either "normal" or a number representing the
	 * percentage of the current font height  to use for
	 * leading. The default is "normal". The exact normal
	 * value is implementation-dependent, but values
	 * between 100 and 120 are recommended.
	 */
	export interface LineHeight {
	    lineHeight?: string;
	}
	/**
	 * The text-direction entity is used to adjust and override
	 * the Unicode bidirectional text algorithm, similar to the
	 * W3C Internationalization Tag Set recommendation. Values
	 * are ltr (left-to-right embed), rtl (right-to-left embed),
	 * lro (left-to-right bidi-override), and rlo (right-to-left
	 * bidi-override). The default value is ltr. This entity
	 * is typically used by applications that store text in
	 * left-to-right visual order rather than logical order.
	 * Such applications can use the lro value to better
	 * communicate with other applications that more fully
	 * support bidirectional text.
	 */
	export interface TextDirection {
	    dir?: DirectionMode;
	}
	/**
	 * The text-rotation entity is used to rotate text
	 * around the alignment point specified by the
	 * halign and valign entities. The value is a number
	 * ranging from -180 to 180. Positive values are
	 * clockwise rotations, while negative values are
	 * counter-clockwise rotations.
	 */
	export interface TextRotation {
	    rotation?: number;
	}
	/**
	 * The enclosure entity is used to specify the
	 * formatting of an enclosure around text or symbols.
	 */
	export interface Enclosure {
	    enclosure?: EnclosureShape;
	}
	/**
	 * The print-style entity groups together the most popular
	 * combination of printing attributes: position, font, and
	 * color.
	 */
	export interface PrintStyle extends Position, Font, Color {
	}
	/**
	 * The print-style-align entity adds the halign and valign
	 * attributes to the position, font, and color attributes.
	 */
	export interface PrintStyleAlign extends PrintStyle, Halign, Valign {
	}
	/**
	 * The line-shape entity is used to distinguish between
	 * straight and curved lines. The line-type entity
	 * distinguishes between solid, dashed, dotted, and
	 * wavy lines.
	 */
	export interface LineShape {
	    lineShape?: StraightCurved;
	}
	/**
	 * The line-shape entity is used to distinguish between
	 * straight and curved lines. The line-type entity
	 * distinguishes between solid, dashed, dotted, and
	 * wavy lines.
	 */
	export interface LineType {
	    lineType?: SolidDashedDottedWavy;
	}
	/**
	 * The dashed-formatting entity represents the length of
	 * dashes and spaces in a dashed line. Both the dash-length
	 * and space-length attributes are represented in tenths.
	 * These attributes are ignored if the corresponding
	 * line-type attribute is not dashed.
	 */
	export interface DashedFormatting {
	    dashLength?: number;
	    spaceLength?: number;
	}
	/**
	 * The printout entity is based on MuseData print
	 * suggestions. They allow a way to specify not to print
	 * print an object (e.g. note or rest), its augmentation
	 * dots, or its lyrics. This is especially useful for notes
	 * that overlap in different voices, or for chord sheets
	 * that contain lyrics and chords but no melody. For wholly
	 * invisible notes, such as those providing sound-only data,
	 * the attribute for print-spacing may be set to no so that
	 * no space is left for this note. The print-spacing value
	 * is only used if no note, dot, or lyric is being printed.
	 * By default, all these attributes are set to yes. If
	 * print-object is set to no, print-dot and print-lyric are
	 * interpreted to also be set to no if they are not present.
	 */
	export interface PrintObject {
	    printObject?: boolean;
	}
	/**
	 * The printout entity is based on MuseData print
	 * suggestions. They allow a way to specify not to print
	 * print an object (e.g. note or rest), its augmentation
	 * dots, or its lyrics. This is especially useful for notes
	 * that overlap in different voices, or for chord sheets
	 * that contain lyrics and chords but no melody. For wholly
	 * invisible notes, such as those providing sound-only data,
	 * the attribute for print-spacing may be set to no so that
	 * no space is left for this note. The print-spacing value
	 * is only used if no note, dot, or lyric is being printed.
	 * By default, all these attributes are set to yes. If
	 * print-object is set to no, print-dot and print-lyric are
	 * interpreted to also be set to no if they are not present.
	 */
	export interface PrintSpacing {
	    printSpacing?: boolean;
	}
	/**
	 * The printout entity is based on MuseData print
	 * suggestions. They allow a way to specify not to print
	 * print an object (e.g. note or rest), its augmentation
	 * dots, or its lyrics. This is especially useful for notes
	 * that overlap in different voices, or for chord sheets
	 * that contain lyrics and chords but no melody. For wholly
	 * invisible notes, such as those providing sound-only data,
	 * the attribute for print-spacing may be set to no so that
	 * no space is left for this note. The print-spacing value
	 * is only used if no note, dot, or lyric is being printed.
	 * By default, all these attributes are set to yes. If
	 * print-object is set to no, print-dot and print-lyric are
	 * interpreted to also be set to no if they are not present.
	 */
	export interface Printout extends PrintObject, PrintSpacing {
	    printDot?: boolean;
	    printLyric?: boolean;
	}
	/**
	 * The text-formatting entity contains the common formatting
	 * attributes for text elements. Default values may differ
	 * across the elements that use this entity.
	 */
	export interface TextFormatting extends Justify, PrintStyleAlign, TextDecoration, TextRotation, LetterSpacing, LineHeight, TextDirection, Enclosure {
	}
	/**
	 * The level-display entity allows specification of three
	 * common ways to indicate editorial indications: putting
	 * parentheses or square brackets around a symbol, or making
	 * the symbol a different size. If not specified, they are
	 * left to application defaults. It is used by the level and
	 * accidental elements.
	 */
	export interface LevelDisplay {
	    bracket?: boolean;
	    size?: SymbolSize;
	    parentheses?: boolean;
	}
	/**
	 * The trill-sound entity includes attributes used to guide
	 * the sound of trills, mordents, turns, shakes, and wavy
	 * lines, based on MuseData sound suggestions. The default
	 * choices are:
	 *
	 * start-note = "upper"
	 *
	 * trill-step = "whole"        two-note-turn = "none"
	 *
	 * accelerate = "no"        beats = "4" (minimum of "2").
	 *
	 * Second-beat and last-beat are percentages for landing on
	 * the indicated beat, with defaults of 25 and 75 respectively.
	 *
	 * For mordent and inverted-mordent elements, the defaults
	 * are different:
	 *
	 * The default start-note is "main", not "upper".
	 * The default for beats is "3", not "4".
	 * The default for second-beat is "12", not "25".
	 * The default for last-beat is "24", not "75".
	 */
	export interface TrillSound {
	    startNote?: UpperMainBelow;
	    accelerate?: boolean;
	    beats?: number;
	    lastBeat?: number;
	    trillStep?: WholeHalfUnison;
	    twoNoteTurn?: WholeHalfNone;
	    secondBeat?: number;
	}
	/**
	 * The bend-sound entity is used for bend and slide elements,
	 * and is similar to the trill-sound. Here the beats element
	 * refers to the number of discrete elements (like MIDI pitch
	 * bends) used to represent a continuous bend or slide. The
	 * first-beat indicates the percentage of the direction for
	 * starting a bend; the last-beat the percentage for ending it.
	 * The default choices are:
	 *
	 * accelerate = "no"
	 *
	 * beats = "4" (minimum of "2")
	 * first-beat = "25"
	 *
	 * last-beat = "75"
	 */
	export interface BendSound {
	    accelerate?: boolean;
	    beats?: number;
	    firstBeat?: number;
	    lastBeat?: number;
	}
	/**
	 * The time-only entity is used to indicate that a particular
	 * playback-related element only applies particular times through
	 * a repeated section.
	 */
	export interface TimeOnly {
	    timeOnly?: string;
	}
	/**
	 * The document-attributes entity is used to specify the
	 * attributes for an entire MusicXML document. Currently
	 * this is used for the version attribute.
	 */
	export interface DocumentAttributes {
	    version: string;
	}
	/**
	 * Two entities for editorial information in notes. These
	 * entities, and their elements defined below, are used
	 * across all the different component DTD modules.
	 */
	export interface Editorial {
	    footnote?: Footnote;
	    level?: Level;
	    _class?: string;
	}
	/**
	 * Two entities for editorial information in notes. These
	 * entities, and their elements defined below, are used
	 * across all the different component DTD modules.
	 */
	export interface EditorialVoice {
	    voice?: number;
	    footnote?: Footnote;
	    level?: Level;
	    _class?: string;
	}
	/**
	 * Footnote and level are used to specify editorial
	 * information, while voice is used to distinguish between
	 * multiple voices (what MuseData calls tracks) in individual
	 * parts. These elements are used throughout the different
	 * MusicXML DTD modules. If the reference attribute for the
	 * level element is yes, this indicates editorial information
	 * that is for display only and should not affect playback.
	 * For instance, a modern edition of older music may set
	 * reference="yes" on the attributes containing the music's
	 * original clef, key, and time signature. It is no by default.
	 */
	export interface Footnote extends TextFormatting {
	    text: string;
	}
	/**
	 * Footnote and level are used to specify editorial
	 * information, while voice is used to distinguish between
	 * multiple voices (what MuseData calls tracks) in individual
	 * parts. These elements are used throughout the different
	 * MusicXML DTD modules. If the reference attribute for the
	 * level element is yes, this indicates editorial information
	 * that is for display only and should not affect playback.
	 * For instance, a modern edition of older music may set
	 * reference="yes" on the attributes containing the music's
	 * original clef, key, and time signature. It is no by default.
	 */
	export interface Level extends LevelDisplay {
	    text: string;
	    reference?: boolean;
	}
	/**
	 * Fermata and wavy-line elements can be applied both to
	 * notes and to measures, so they are defined here. Wavy
	 * lines are one way to indicate trills; when used with a
	 * measure element, they should always have type="continue"
	 *
	 * set. The fermata text content represents the shape of the
	 * fermata sign and may be normal, angled, or square.
	 * An empty fermata element represents a normal fermata.
	 * The fermata type is upright if not specified.
	 */
	export interface Fermata extends PrintStyle {
	    shape: NormalAngledSquare;
	    type?: UprightInverted;
	}
	/**
	 * Fermata and wavy-line elements can be applied both to
	 * notes and to measures, so they are defined here. Wavy
	 * lines are one way to indicate trills; when used with a
	 * measure element, they should always have type="continue"
	 *
	 * set. The fermata text content represents the shape of the
	 * fermata sign and may be normal, angled, or square.
	 * An empty fermata element represents a normal fermata.
	 * The fermata type is upright if not specified.
	 */
	export interface WavyLine extends Position, Placement, Color, TrillSound {
	    number?: number;
	    type: StartStopContinue;
	}
	/**
	 * Segno and coda signs can be associated with a measure
	 * or a general musical direction. These are visual
	 * indicators only; a sound element is needed to guide
	 * playback applications reliably.
	 */
	export interface Segno extends PrintStyleAlign {
	}
	/**
	 * Segno and coda signs can be associated with a measure
	 * or a general musical direction. These are visual
	 * indicators only; a sound element is needed to guide
	 * playback applications reliably.
	 */
	export interface Coda extends PrintStyleAlign {
	}
	/**
	 * These elements are used both in the time-modification and
	 * metronome-tuplet elements. The actual-notes element
	 * describes how many notes are played in the time usually
	 * occupied by the number of normal-notes. If the normal-notes
	 * type is different than the current note type (e.g., a
	 * quarter note within an eighth note triplet), then the
	 * normal-notes type (e.g. eighth) is specified in the
	 * normal-type and normal-dot elements. The content of the
	 * actual-notes and normal-notes elements ia a non-negative
	 * integer.
	 */
	export interface NormalDot {
	}
	/**
	 * Dynamics can be associated either with a note or a general
	 * musical direction. To avoid inconsistencies between and
	 * amongst the letter abbreviations for dynamics (what is sf
	 * vs. sfz, standing alone or with a trailing dynamic that is
	 * not always piano), we use the actual letters as the names
	 * of these dynamic elements. The other-dynamics element
	 * allows other dynamic marks that are not covered here, but
	 * many of those should perhaps be included in a more general
	 * musical direction element. Dynamics may also be combined as
	 * in <sf/><mp/>.
	 *
	 * These letter dynamic symbols are separated from crescendo,
	 * decrescendo, and wedge indications. Dynamic representation
	 * is inconsistent in scores. Many things are assumed by the
	 * composer and left out, such as returns to original dynamics.
	 * Systematic representations are quite complex: for example,
	 * Humdrum has at least 3 representation formats related to
	 * dynamics. The MusicXML format captures what is in the score,
	 * but does not try to be optimal for analysis or synthesis of
	 * dynamics.
	 */
	export interface Dynamics extends PrintStyleAlign, Placement, TextDecoration, Enclosure {
	    f?: boolean;
	    ff?: boolean;
	    fff?: boolean;
	    ffff?: boolean;
	    fffff?: boolean;
	    ffffff?: boolean;
	    fp?: boolean;
	    fz?: boolean;
	    mf?: boolean;
	    mp?: boolean;
	    otherDynamics?: string;
	    p?: boolean;
	    pp?: boolean;
	    ppp?: boolean;
	    pppp?: boolean;
	    ppppp?: boolean;
	    pppppp?: boolean;
	    rf?: boolean;
	    rfz?: boolean;
	    sf?: boolean;
	    sffz?: boolean;
	    sfp?: boolean;
	    sfpp?: boolean;
	    sfz?: boolean;
	}
	/**
	 * Fingering is typically indicated 1,2,3,4,5. Multiple
	 * fingerings may be given, typically to substitute
	 * fingerings in the middle of a note. The substitution
	 * and alternate values are "no" if the attribute is
	 * not present. For guitar and other fretted instruments,
	 * the fingering element represents the fretting finger;
	 * the pluck element represents the plucking finger.
	 */
	export interface Fingering extends PrintStyle, Placement {
	    substitution?: boolean;
	    finger?: number;
	    alternate?: boolean;
	}
	/**
	 * Fret and string are used with tablature notation and chord
	 * symbols. Fret numbers start with 0 for an open string and
	 * 1 for the first fret. String numbers start with 1 for the
	 * highest string. The string element can also be used in
	 * regular notation.
	 */
	export interface Fret extends Font, Color {
	    fret: number;
	}
	/**
	 * Fret and string are used with tablature notation and chord
	 * symbols. Fret numbers start with 0 for an open string and
	 * 1 for the first fret. String numbers start with 1 for the
	 * highest string. The string element can also be used in
	 * regular notation.
	 */
	export interface String extends PrintStyle, Placement {
	    stringNum: number;
	}
	/**
	 * The display-text element is used for exact formatting of
	 * multi-font text in element in display elements such as
	 * part-name-display. Language is Italian ("it") by default.
	 * Enclosure is none by default.
	 */
	export interface DisplayText extends TextFormatting {
	    text: string;
	}
	/**
	 * The accidental-text element is used for exact formatting of
	 * accidentals in display elements such as part-name-display.
	 * Values are the same as for the accidental element.
	 * Enclosure is none by default.
	 */
	export interface AccidentalText extends TextFormatting {
	    text: string;
	}
	/**
	 * The part-name-display and part-abbreviation-display
	 * elements are used in both the score.mod and direction.mod
	 * files. They allow more precise control of how part names
	 * and abbreviations appear throughout a score. The
	 * print-object attributes can be used to determine what,
	 * if anything, is printed at the start of each system.
	 * Formatting specified in the part-name-display and
	 * part-abbreviation-display elements override the formatting
	 * specified in the part-name and part-abbreviation elements,
	 * respectively.
	 */
	export interface PartNameDisplay extends PrintObject {
	    name: TextSegment[];
	}
	/**
	 * The part-name-display and part-abbreviation-display
	 * elements are used in both the score.mod and direction.mod
	 * files. They allow more precise control of how part names
	 * and abbreviations appear throughout a score. The
	 * print-object attributes can be used to determine what,
	 * if anything, is printed at the start of each system.
	 * Formatting specified in the part-name-display and
	 * part-abbreviation-display elements override the formatting
	 * specified in the part-name and part-abbreviation elements,
	 * respectively.
	 */
	export interface PartAbbreviationDisplay extends PrintObject {
	    name: TextSegment[];
	}
	/**
	 * The midi-device content corresponds to the DeviceName
	 * meta event in Standard MIDI Files. The optional port
	 * attribute is a number from 1 to 16 that can be used
	 * with the unofficial MIDI port (or cable) meta event.
	 * Unlike the DeviceName meta event, there can be
	 * multiple midi-device elements per MusicXML part
	 * starting in MusicXML 3.0. The optional id attribute
	 * refers to the score-instrument assigned to this
	 * device. If missing, the device assignment affects
	 * all score-instrument elements in the score-part.
	 */
	export interface MidiDevice {
	    port?: number;
	    deviceName: string;
	    id?: number;
	}
	/**
	 * The midi-instrument element can be a part of either
	 * the score-instrument element at the start of a part,
	 * or the sound element within a part. The id attribute
	 * refers to the score-instrument affected by the change.
	 */
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
	/**
	 * The play element, new in Version 3.0, specifies playback
	 * techniques to be used in conjunction with the instrument-sound
	 * element. When used as part of a sound element, it applies to
	 * all notes going forward in score order. In multi-instrument
	 * parts, the affected instrument should be specified using the
	 * id attribute. When used as part of a note element, it applies
	 * to the current note only.
	 */
	export interface Play {
	    ipa?: string;
	    mute?: string;
	    otherPlay?: OtherPlay;
	    semiPitched?: string;
	    id: string;
	}
	export interface OtherPlay {
	    data: string;
	    type: string;
	}
	/**
	 * Margins, page sizes, and distances are all measured in
	 * tenths to keep MusicXML data in a consistent coordinate
	 * system as much as possible. The translation to absolute
	 * units is done in the scaling element, which specifies
	 * how many millimeters are equal to how many tenths. For
	 * a staff height of 7 mm, millimeters would be set to 7
	 * while tenths is set to 40. The ability to set a formula
	 * rather than a single scaling factor helps avoid roundoff
	 * errors.
	 */
	export interface Scaling {
	    tenths?: number;
	    millimeters?: number;
	}
	export enum OddEvenBoth {
	    Both = 2,
	    Even = 1,
	    Odd = 0,
	}
	/**
	 * Page layout can be defined both in score-wide defaults
	 * and in the print element. Page margins are specified either
	 * for both even and odd pages, or via separate odd and even
	 * page number values.
	 */
	export interface PageMargins {
	    topMargin: number;
	    leftMargin: number;
	    bottomMargin: number;
	    type?: OddEvenBoth;
	    rightMargin: number;
	}
	/**
	 * Page layout can be defined both in score-wide defaults
	 * and in the print element. Page margins are specified either
	 * for both even and odd pages, or via separate odd and even
	 * page number values. The type is not needed when used as
	 * part of a print element. If omitted when used in the
	 * defaults element, "both" is the default.
	 */
	export interface PageLayout {
	    pageHeight?: number;
	    pageWidth?: number;
	    pageMargins?: PageMargins[];
	}
	/**
	 * A system is a group of staves that are read and played
	 * simultaneously. System layout includes left and right
	 * margins, the vertical distance from the previous system,
	 * and the presence or absence of system dividers.
	 *
	 * Margins are relative to the page margins. Positive values
	 * indent and negative values reduce the margin size. The
	 * system distance is measured from the bottom line of the
	 * previous system to the top line of the current system.
	 * It is ignored for the first system on a page. The top
	 * system distance is measured from the page's top margin to
	 * the top line of the first system. It is ignored for all
	 * but the first system on a page.
	 *
	 * Sometimes the sum of measure widths in a system may not
	 * equal the system width specified by the layout elements due
	 * to roundoff or other errors. The behavior when reading
	 * MusicXML files in these cases is application-dependent.
	 * For instance, applications may find that the system layout
	 * data is more reliable than the sum of the measure widths,
	 * and adjust the measure widths accordingly.
	 *
	 * When used in the layout element, the system-layout element
	 * defines a default appearance for all systems in the score.
	 * When used in the print element, the system layout element
	 * affects the appearance of the current system only. All
	 * other systems use the default values provided in the
	 * defaults element. If any child elements are missing from
	 * the system-layout element in a print element, the values
	 * from the defaults element are used there as well.
	 */
	export interface SystemLayout {
	    systemDividers?: SystemDividers;
	    systemMargins?: SystemMargins;
	    systemDistance?: number;
	    topSystemDistance?: number;
	}
	/**
	 * A system is a group of staves that are read and played
	 * simultaneously. System layout includes left and right
	 * margins, the vertical distance from the previous system,
	 * and the presence or absence of system dividers.
	 *
	 * Margins are relative to the page margins. Positive values
	 * indent and negative values reduce the margin size. The
	 * system distance is measured from the bottom line of the
	 * previous system to the top line of the current system.
	 * It is ignored for the first system on a page. The top
	 * system distance is measured from the page's top margin to
	 * the top line of the first system. It is ignored for all
	 * but the first system on a page.
	 *
	 * Sometimes the sum of measure widths in a system may not
	 * equal the system width specified by the layout elements due
	 * to roundoff or other errors. The behavior when reading
	 * MusicXML files in these cases is application-dependent.
	 * For instance, applications may find that the system layout
	 * data is more reliable than the sum of the measure widths,
	 * and adjust the measure widths accordingly.
	 *
	 * When used in the layout element, the system-layout element
	 * defines a default appearance for all systems in the score.
	 * When used in the print element, the system layout element
	 * affects the appearance of the current system only. All
	 * other systems use the default values provided in the
	 * defaults element. If any child elements are missing from
	 * the system-layout element in a print element, the values
	 * from the defaults element are used there as well.
	 */
	export interface SystemMargins {
	    leftMargin: number;
	    rightMargin: number;
	}
	/**
	 * The system-dividers element indicates the presence or
	 * absence of system dividers (also known as system separation
	 * marks) between systems displayed on the same page. Dividers
	 * on the left and right side of the page are controlled by
	 * the left-divider and right-divider elements respectively.
	 * The default vertical position is half the system-distance
	 * value from the top of the system that is below the divider.
	 * The default horizontal position is the left and right
	 * system margin, respectively.
	 *
	 * When used in the print element, the system-dividers element
	 * affects the dividers that would appear between the current
	 * system and the previous system.
	 */
	export interface SystemDividers {
	    rightDivider: RightDivider;
	    leftDivider: LeftDivider;
	}
	/**
	 * The system-dividers element indicates the presence or
	 * absence of system dividers (also known as system separation
	 * marks) between systems displayed on the same page. Dividers
	 * on the left and right side of the page are controlled by
	 * the left-divider and right-divider elements respectively.
	 * The default vertical position is half the system-distance
	 * value from the top of the system that is below the divider.
	 * The default horizontal position is the left and right
	 * system margin, respectively.
	 *
	 * When used in the print element, the system-dividers element
	 * affects the dividers that would appear between the current
	 * system and the previous system.
	 */
	export interface LeftDivider extends PrintObject, PrintStyleAlign {
	}
	/**
	 * The system-dividers element indicates the presence or
	 * absence of system dividers (also known as system separation
	 * marks) between systems displayed on the same page. Dividers
	 * on the left and right side of the page are controlled by
	 * the left-divider and right-divider elements respectively.
	 * The default vertical position is half the system-distance
	 * value from the top of the system that is below the divider.
	 * The default horizontal position is the left and right
	 * system margin, respectively.
	 *
	 * When used in the print element, the system-dividers element
	 * affects the dividers that would appear between the current
	 * system and the previous system.
	 */
	export interface RightDivider extends PrintObject, PrintStyleAlign {
	}
	/**
	 * Staff layout includes the vertical distance from the bottom
	 * line of the previous staff in this system to the top line
	 * of the staff specified by the number attribute. The
	 * optional number attribute refers to staff numbers within
	 * the part, from top to bottom on the system. A value of 1
	 * is assumed if not present. When used in the defaults
	 * element, the values apply to all parts. This value is
	 * ignored for the first staff in a system.
	 */
	export interface StaffLayout {
	    staffDistance?: number;
	    num: number;
	}
	/**
	 * Measure layout includes the horizontal distance from the
	 * previous measure. This value is only used for systems
	 * where there is horizontal whitespace in the middle of a
	 * system, as in systems with codas. To specify the measure
	 * width, use the width attribute of the measure element.
	 */
	export interface MeasureLayout {
	    measureDistance?: number;
	}
	/**
	 * The appearance element controls general graphical
	 * settings for the music's final form appearance on a
	 * printed page of display. This includes support
	 * for line widths, definitions for note sizes, and standard
	 * distances between notation elements, plus an extension
	 * element for other aspects of appearance.
	 *
	 * The line-width element indicates the width of a line type
	 * in tenths. The type attribute defines what type of line is
	 * being defined. Values include beam, bracket, dashes,
	 * enclosure, ending, extend, heavy barline, leger,
	 * light barline, octave shift, pedal, slur middle, slur tip,
	 * staff, stem, tie middle, tie tip, tuplet bracket, and
	 * wedge. The text content is expressed in tenths.
	 *
	 * The note-size element indicates the percentage of the
	 * regular note size to use for notes with a cue and large
	 * size as defined in the type element. The grace type is
	 * used for notes of cue size that that include a grace
	 * element. The cue type is used for all other notes with
	 * cue size, whether defined explicitly or implicitly via a
	 * cue element. The large type is used for notes of large
	 * size. The text content represent the numeric percentage.
	 * A value of 100 would be identical to the size of a regular
	 * note as defined by the music font.
	 *
	 * The distance element represents standard distances between
	 * notation elements in tenths. The type attribute defines what
	 * type of distance is being defined. Values include hyphen
	 * (for hyphens in lyrics) and beam.
	 *
	 * The other-appearance element is used to define any
	 * graphical settings not yet in the current version of the
	 * MusicXML format. This allows extended representation,
	 * though without application interoperability.
	 */
	export interface LineWidth {
	    tenths: number;
	    type: string;
	}
	export enum CueGraceLarge {
	    Grace = 1,
	    Cue = 0,
	    Large = 2,
	}
	/**
	 * The appearance element controls general graphical
	 * settings for the music's final form appearance on a
	 * printed page of display. This includes support
	 * for line widths, definitions for note sizes, and standard
	 * distances between notation elements, plus an extension
	 * element for other aspects of appearance.
	 *
	 * The line-width element indicates the width of a line type
	 * in tenths. The type attribute defines what type of line is
	 * being defined. Values include beam, bracket, dashes,
	 * enclosure, ending, extend, heavy barline, leger,
	 * light barline, octave shift, pedal, slur middle, slur tip,
	 * staff, stem, tie middle, tie tip, tuplet bracket, and
	 * wedge. The text content is expressed in tenths.
	 *
	 * The note-size element indicates the percentage of the
	 * regular note size to use for notes with a cue and large
	 * size as defined in the type element. The grace type is
	 * used for notes of cue size that that include a grace
	 * element. The cue type is used for all other notes with
	 * cue size, whether defined explicitly or implicitly via a
	 * cue element. The large type is used for notes of large
	 * size. The text content represent the numeric percentage.
	 * A value of 100 would be identical to the size of a regular
	 * note as defined by the music font.
	 *
	 * The distance element represents standard distances between
	 * notation elements in tenths. The type attribute defines what
	 * type of distance is being defined. Values include hyphen
	 * (for hyphens in lyrics) and beam.
	 *
	 * The other-appearance element is used to define any
	 * graphical settings not yet in the current version of the
	 * MusicXML format. This allows extended representation,
	 * though without application interoperability.
	 */
	export interface NoteSize {
	    size: number;
	    type: CueGraceLarge;
	}
	/**
	 * The appearance element controls general graphical
	 * settings for the music's final form appearance on a
	 * printed page of display. This includes support
	 * for line widths, definitions for note sizes, and standard
	 * distances between notation elements, plus an extension
	 * element for other aspects of appearance.
	 *
	 * The line-width element indicates the width of a line type
	 * in tenths. The type attribute defines what type of line is
	 * being defined. Values include beam, bracket, dashes,
	 * enclosure, ending, extend, heavy barline, leger,
	 * light barline, octave shift, pedal, slur middle, slur tip,
	 * staff, stem, tie middle, tie tip, tuplet bracket, and
	 * wedge. The text content is expressed in tenths.
	 *
	 * The note-size element indicates the percentage of the
	 * regular note size to use for notes with a cue and large
	 * size as defined in the type element. The grace type is
	 * used for notes of cue size that that include a grace
	 * element. The cue type is used for all other notes with
	 * cue size, whether defined explicitly or implicitly via a
	 * cue element. The large type is used for notes of large
	 * size. The text content represent the numeric percentage.
	 * A value of 100 would be identical to the size of a regular
	 * note as defined by the music font.
	 *
	 * The distance element represents standard distances between
	 * notation elements in tenths. The type attribute defines what
	 * type of distance is being defined. Values include hyphen
	 * (for hyphens in lyrics) and beam.
	 *
	 * The other-appearance element is used to define any
	 * graphical settings not yet in the current version of the
	 * MusicXML format. This allows extended representation,
	 * though without application interoperability.
	 */
	export interface Distance {
	    tenths: number;
	    type: string;
	}
	/**
	 * The appearance element controls general graphical
	 * settings for the music's final form appearance on a
	 * printed page of display. This includes support
	 * for line widths, definitions for note sizes, and standard
	 * distances between notation elements, plus an extension
	 * element for other aspects of appearance.
	 *
	 * The line-width element indicates the width of a line type
	 * in tenths. The type attribute defines what type of line is
	 * being defined. Values include beam, bracket, dashes,
	 * enclosure, ending, extend, heavy barline, leger,
	 * light barline, octave shift, pedal, slur middle, slur tip,
	 * staff, stem, tie middle, tie tip, tuplet bracket, and
	 * wedge. The text content is expressed in tenths.
	 *
	 * The note-size element indicates the percentage of the
	 * regular note size to use for notes with a cue and large
	 * size as defined in the type element. The grace type is
	 * used for notes of cue size that that include a grace
	 * element. The cue type is used for all other notes with
	 * cue size, whether defined explicitly or implicitly via a
	 * cue element. The large type is used for notes of large
	 * size. The text content represent the numeric percentage.
	 * A value of 100 would be identical to the size of a regular
	 * note as defined by the music font.
	 *
	 * The distance element represents standard distances between
	 * notation elements in tenths. The type attribute defines what
	 * type of distance is being defined. Values include hyphen
	 * (for hyphens in lyrics) and beam.
	 *
	 * The other-appearance element is used to define any
	 * graphical settings not yet in the current version of the
	 * MusicXML format. This allows extended representation,
	 * though without application interoperability.
	 */
	export interface Appearance {
	    lineWidths?: {
	        [key: string]: LineWidth;
	    };
	    distances?: {
	        [key: string]: Distance;
	    };
	    otherAppearances?: string[];
	    noteSizes?: {
	        [key: string]: NoteSize;
	    };
	}
	/**
	 * The creator element is borrowed from Dublin Core. It is
	 * used for the creators of the score. The type attribute is
	 * used to distinguish different creative contributions. Thus,
	 * there can be multiple creators within an identification.
	 */
	export interface Creator {
	    creator: string;
	    type: string;
	}
	/**
	 * Rights is borrowed from Dublin Core. It contains
	 * copyright and other intellectual property notices.
	 * Words, music, and derivatives can have different types,
	 * so multiple rights tags with different type attributes
	 * are supported.
	 */
	export interface Rights {
	    type: string;
	    rights: string;
	}
	/**
	 * The software used to encode the music.
	 */
	export interface Encoder {
	    encoder: string;
	    type: string;
	}
	/**
	 * A related resource for the music that is encoded. This is
	 * similar to the Dublin Core relation element.
	 */
	export interface Relation {
	    type: string;
	    data: string;
	}
	/**
	 * If a program has other metadata not yet supported in the
	 * MusicXML format, it can go in the miscellaneous area.
	 */
	export interface MiscellaneousField {
	    data: string;
	    name: string;
	}
	/**
	 *
	 * If a program has other metadata not yet supported in the
	 * MusicXML format, it can go in the miscellaneous area.
	 */
	export interface Miscellaneous {
	    miscellaneousFields?: MiscellaneousField[];
	}
	/**
	 *
	 * Identification contains basic metadata about the score.
	 * It includes the information in MuseData headers that
	 * may apply at a score-wide, movement-wide, or part-wide
	 * level. The creator, rights, source, and relation elements
	 * are based on Dublin Core.
	 */
	export interface Identification {
	    miscellaneous?: Miscellaneous;
	    creators?: Creator[];
	    relations?: Relation[];
	    rights?: Rights[];
	    encoding?: Encoding;
	    source?: string;
	}
	/**
	 * The supports element indicates if the encoding supports
	 * a particular MusicXML element. This is recommended for
	 * elements like beam, stem, and accidental, where the
	 * absence of an element is ambiguous if you do not know
	 * if the encoding supports that element. For Version 2.0,
	 * the supports element is expanded to allow programs to
	 * indicate support for particular attributes or particular
	 * values. This lets applications communicate, for example,
	 * that all system and/or page breaks are contained in the
	 * MusicXML file.
	 */
	export interface Supports {
	    element: string;
	    attribute?: string;
	    value?: string;
	    type: boolean;
	}
	/**
	 * Encoding contains information about who did the digital
	 * encoding, when, with what software, and in what aspects.
	 */
	export interface Encoding {
	    encodingDescriptions?: string[];
	    encodingDate?: EncodingDate;
	    supports?: {
	        [key: string]: Supports;
	    };
	    encoders?: Encoder[];
	    softwares?: string[];
	}
	export enum SeparatorType {
	    None = 0,
	    Horizontal = 1,
	    Diagonal = 2,
	    Vertical = 3,
	    Adjacent = 4,
	}
	/**
	 * The time-separator entity indicates how to display the
	 * arrangement between the beats and beat-type values in a
	 * time signature. The default value is none. The horizontal,
	 * diagonal, and vertical values represent horizontal, diagonal
	 * lower-left to upper-right, and vertical lines respectively.
	 * For these values, the beats and beat-type values are arranged
	 * on either side of the separator line. The none value represents
	 * no separator with the beats and beat-type arranged vertically.
	 * The adjacent value represents no separator with the beats and
	 * beat-type arranged horizontally.
	 */
	export interface TimeSeparator {
	    separator?: SeparatorType;
	}
	export enum TimeSymbolType {
	    DottedNote = 4,
	    Cut = 1,
	    SingleNumber = 2,
	    Note = 3,
	    Common = 0,
	    Normal = 5,
	}
	/**
	 * The time-symbol entity indicates how to display a time
	 * signature. The normal value is the usual fractional display,
	 * and is the implied symbol type if none is specified. Other
	 * options are the common and cut time symbols, as well as a
	 * single number with an implied denominator. The note symbol
	 * indicates that the beat-type should be represented with
	 * the corresponding downstem note rather than a number. The
	 * dotted-note symbol indicates that the beat-type should be
	 * represented with a dotted downstem note that corresponds to
	 * three times the beat-type value, and a numerator that is
	 * one third the beats value.
	 */
	export interface TimeSymbol {
	    symbol?: TimeSymbolType;
	}
	export enum CancelLocation {
	    Right = 1,
	    BeforeBarline = 2,
	    Left = 0,
	}
	/**
	 * Traditional key signatures are represented by the number
	 * of flats and sharps, plus an optional mode for major/
	 * minor/mode distinctions. Negative numbers are used for
	 * flats and positive numbers for sharps, reflecting the
	 * key's placement within the circle of fifths (hence the
	 * element name). A cancel element indicates that the old
	 * key signature should be cancelled before the new one
	 * appears. This will always happen when changing to C major
	 * or A minor and need not be specified then. The cancel
	 * value matches the fifths value of the cancelled key
	 * signature (e.g., a cancel of -2 will provide an explicit
	 * cancellation for changing from B flat major to F major).
	 * The optional location attribute indicates where a key
	 * signature cancellation appears relative to a new key
	 * signature: to the left, to the right, or before the barline
	 * and to the left. It is left by default. For mid-measure key
	 * elements, a cancel location of before-barline should be
	 * treated like a cancel location of left.
	 *
	 * Non-traditional key signatures can be represented using
	 * the Humdrum/Scot concept of a list of altered tones.
	 * The key-step and key-alter elements are represented the
	 * same way as the step and alter elements are in the pitch
	 * element in the note.mod file. The optional key-accidental
	 * element is represented the same way as the accidental
	 * element in the note.mod file. It is used for disambiguating
	 * microtonal accidentals. The different element names
	 * indicate the different meaning of altering notes in a scale
	 * versus altering a sounding pitch.
	 *
	 * Valid mode values include major, minor, dorian, phrygian,
	 * lydian, mixolydian, aeolian, ionian, locrian, and none.
	 *
	 * The optional number attribute refers to staff numbers,
	 * from top to bottom on the system. If absent, the key
	 * signature applies to all staves in the part.
	 * The optional list of key-octave elements is used to specify
	 * in which octave each element of the key signature appears.
	 * The content specifies the octave value using the same
	 * values as the display-octave element. The number attribute
	 * is a positive integer that refers to the key signature
	 * element in left-to-right order. If the cancel attribute is
	 * set to yes, then this number refers to an element specified
	 * by the cancel element. It is no by default.
	 *
	 * Key signatures appear at the start of each system unless
	 * the print-object attribute has been set to "no".
	 */
	export interface Cancel {
	    fifths: number;
	    location?: CancelLocation;
	}
	/**
	 * Traditional key signatures are represented by the number
	 * of flats and sharps, plus an optional mode for major/
	 * minor/mode distinctions. Negative numbers are used for
	 * flats and positive numbers for sharps, reflecting the
	 * key's placement within the circle of fifths (hence the
	 * element name). A cancel element indicates that the old
	 * key signature should be cancelled before the new one
	 * appears. This will always happen when changing to C major
	 * or A minor and need not be specified then. The cancel
	 * value matches the fifths value of the cancelled key
	 * signature (e.g., a cancel of -2 will provide an explicit
	 * cancellation for changing from B flat major to F major).
	 * The optional location attribute indicates where a key
	 * signature cancellation appears relative to a new key
	 * signature: to the left, to the right, or before the barline
	 * and to the left. It is left by default. For mid-measure key
	 * elements, a cancel location of before-barline should be
	 * treated like a cancel location of left.
	 *
	 * Non-traditional key signatures can be represented using
	 * the Humdrum/Scot concept of a list of altered tones.
	 * The key-step and key-alter elements are represented the
	 * same way as the step and alter elements are in the pitch
	 * element in the note.mod file. The optional key-accidental
	 * element is represented the same way as the accidental
	 * element in the note.mod file. It is used for disambiguating
	 * microtonal accidentals. The different element names
	 * indicate the different meaning of altering notes in a scale
	 * versus altering a sounding pitch.
	 *
	 * Valid mode values include major, minor, dorian, phrygian,
	 * lydian, mixolydian, aeolian, ionian, locrian, and none.
	 *
	 * The optional number attribute refers to staff numbers,
	 * from top to bottom on the system. If absent, the key
	 * signature applies to all staves in the part.
	 * The optional list of key-octave elements is used to specify
	 * in which octave each element of the key signature appears.
	 * The content specifies the octave value using the same
	 * values as the display-octave element. The number attribute
	 * is a positive integer that refers to the key signature
	 * element in left-to-right order. If the cancel attribute is
	 * set to yes, then this number refers to an element specified
	 * by the cancel element. It is no by default.
	 *
	 * Key signatures appear at the start of each system unless
	 * the print-object attribute has been set to "no".
	 */
	export interface KeyOctave {
	    octave: number;
	    number: number;
	    cancel?: boolean;
	}
	/**
	 * Traditional key signatures are represented by the number
	 * of flats and sharps, plus an optional mode for major/
	 * minor/mode distinctions. Negative numbers are used for
	 * flats and positive numbers for sharps, reflecting the
	 * key's placement within the circle of fifths (hence the
	 * element name). A cancel element indicates that the old
	 * key signature should be cancelled before the new one
	 * appears. This will always happen when changing to C major
	 * or A minor and need not be specified then. The cancel
	 * value matches the fifths value of the cancelled key
	 * signature (e.g., a cancel of -2 will provide an explicit
	 * cancellation for changing from B flat major to F major).
	 * The optional location attribute indicates where a key
	 * signature cancellation appears relative to a new key
	 * signature: to the left, to the right, or before the barline
	 * and to the left. It is left by default. For mid-measure key
	 * elements, a cancel location of before-barline should be
	 * treated like a cancel location of left.
	 *
	 * Non-traditional key signatures can be represented using
	 * the Humdrum/Scot concept of a list of altered tones.
	 * The key-step and key-alter elements are represented the
	 * same way as the step and alter elements are in the pitch
	 * element in the note.mod file. The optional key-accidental
	 * element is represented the same way as the accidental
	 * element in the note.mod file. It is used for disambiguating
	 * microtonal accidentals. The different element names
	 * indicate the different meaning of altering notes in a scale
	 * versus altering a sounding pitch.
	 *
	 * Valid mode values include major, minor, dorian, phrygian,
	 * lydian, mixolydian, aeolian, ionian, locrian, and none.
	 *
	 * The optional number attribute refers to staff numbers,
	 * from top to bottom on the system. If absent, the key
	 * signature applies to all staves in the part.
	 * The optional list of key-octave elements is used to specify
	 * in which octave each element of the key signature appears.
	 * The content specifies the octave value using the same
	 * values as the display-octave element. The number attribute
	 * is a positive integer that refers to the key signature
	 * element in left-to-right order. If the cancel attribute is
	 * set to yes, then this number refers to an element specified
	 * by the cancel element. It is no by default.
	 *
	 * Key signatures appear at the start of each system unless
	 * the print-object attribute has been set to "no".
	 */
	export interface Key extends PrintStyle, PrintObject {
	    cancel?: Cancel;
	    keySteps?: string[];
	    keyOctaves?: KeyOctave[];
	    number?: number;
	    fifths?: number;
	    keyAlters?: string[];
	    keyAccidentals?: string[];
	    mode?: string;
	    _class?: string;
	}
	/**
	 * Time signatures are represented by two elements. The
	 * beats element indicates the number of beats, as found in
	 * the numerator of a time signature. The beat-type element
	 * indicates the beat unit, as found in the denominator of
	 * a time signature.
	 *
	 * Multiple pairs of beats and beat-type elements are used for
	 * composite time signatures with multiple denominators, such
	 * as 2/4 + 3/8. A composite such as 3+2/8 requires only one
	 * beats/beat-type pair.
	 *
	 * The interchangeable element is used to represent the second
	 * in a pair of interchangeable dual time signatures, such as
	 * the 6/8 in 3/4 (6/8). A separate symbol attribute value is
	 * available compared to the time element's symbol attribute,
	 * which applies to the first of the dual time signatures.
	 * The time-relation element indicates the symbol used to
	 * represent the interchangeable aspect of the time signature.
	 * Valid values are parentheses, bracket, equals, slash, space,
	 * and hyphen.
	 *
	 * A senza-misura element explicitly indicates that no time
	 * signature is present. The optional element content
	 * indicates the symbol to be used, if any, such as an X.
	 * The time element's symbol attribute is not used when a
	 * senza-misura element is present.
	 *
	 * The print-object attribute allows a time signature to be
	 * specified but not printed, as is the case for excerpts
	 * from the middle of a score. The value is "yes" if
	 * not present. The optional number attribute refers to staff
	 * numbers within the part, from top to bottom on the system.
	 * If absent, the time signature applies to all staves in the
	 * part.
	 */
	export interface Time extends TimeSymbol, TimeSeparator, PrintStyleAlign, PrintObject {
	    interchangeable?: Interchangeable;
	    beats: string[];
	    beatTypes: number[];
	    senzaMisura?: string;
	    _class?: string;
	}
	/**
	 * Time signatures are represented by two elements. The
	 * beats element indicates the number of beats, as found in
	 * the numerator of a time signature. The beat-type element
	 * indicates the beat unit, as found in the denominator of
	 * a time signature.
	 *
	 * Multiple pairs of beats and beat-type elements are used for
	 * composite time signatures with multiple denominators, such
	 * as 2/4 + 3/8. A composite such as 3+2/8 requires only one
	 * beats/beat-type pair.
	 *
	 * The interchangeable element is used to represent the second
	 * in a pair of interchangeable dual time signatures, such as
	 * the 6/8 in 3/4 (6/8). A separate symbol attribute value is
	 * available compared to the time element's symbol attribute,
	 * which applies to the first of the dual time signatures.
	 * The time-relation element indicates the symbol used to
	 * represent the interchangeable aspect of the time signature.
	 * Valid values are parentheses, bracket, equals, slash, space,
	 * and hyphen.
	 *
	 * A senza-misura element explicitly indicates that no time
	 * signature is present. The optional element content
	 * indicates the symbol to be used, if any, such as an X.
	 * The time element's symbol attribute is not used when a
	 * senza-misura element is present.
	 *
	 * The print-object attribute allows a time signature to be
	 * specified but not printed, as is the case for excerpts
	 * from the middle of a score. The value is "yes" if
	 * not present. The optional number attribute refers to staff
	 * numbers within the part, from top to bottom on the system.
	 * If absent, the time signature applies to all staves in the
	 * part.
	 */
	export interface Interchangeable extends TimeSymbol, TimeSeparator {
	    beats: string[];
	    beatTypes: number[];
	    timeRelation?: string;
	}
	export enum PartSymbolType {
	    None = 0,
	    Line = 2,
	    Bracket = 3,
	    Square = 4,
	    Brace = 1,
	}
	/**
	 * The part-symbol element indicates how a symbol for a
	 * multi-staff part is indicated in the score. Values include
	 * none, brace, line, bracket, and square; brace is the default.
	 * The top-staff and bottom-staff elements are used when the
	 * brace does not extend across the entire part. For example, in
	 * a 3-staff organ part, the top-staff will typically be 1 for
	 * the right hand, while the bottom-staff will typically be 2
	 * for the left hand. Staff 3 for the pedals is usually outside
	 * the brace. By default, the presence of a part-symbol element
	 * that does not extend across the entire part also indicates a
	 * corresponding change in the common barlines within a part.
	 */
	export interface PartSymbol extends Position, Color {
	    topStaff?: number;
	    type: PartSymbolType;
	    bottomStaff?: number;
	    _class?: string;
	}
	/**
	 * Clefs are represented by the sign, line, and
	 * clef-octave-change elements. Sign values include G, F, C,
	 * percussion, TAB, jianpu, and none. Line numbers are
	 * counted from the bottom of the staff. Standard values are
	 * 2 for the G sign (treble clef), 4 for the F sign (bass clef),
	 * 3 for the C sign (alto clef) and 5 for TAB (on a 6-line
	 * staff). The clef-octave-change element is used for
	 * transposing clefs (e.g., a treble clef for tenors would
	 * have a clef-octave-change value of -1). The optional
	 * number attribute refers to staff numbers within the part,
	 * from top to bottom on the system. A value of 1 is
	 * assumed if not present.
	 *
	 * The jianpu sign indicates that the music that follows
	 * should be in jianpu numbered notation, just as the TAB
	 * sign indicates that the music that follows should be in
	 * tablature notation. Unlike TAB, a jianpu sign does not
	 * correspond to a visual clef notation.
	 *
	 * Sometimes clefs are added to the staff in non-standard
	 * line positions, either to indicate cue passages, or when
	 * there are multiple clefs present simultaneously on one
	 * staff. In this situation, the additional attribute is set to
	 * "yes" and the line value is ignored. The size attribute
	 * is used for clefs where the additional attribute is "yes".
	 * It is typically used to indicate cue clefs.
	 *
	 * Sometimes clefs at the start of a measure need to appear
	 * after the barline rather than before, as for cues or for
	 * use after a repeated section. The after-barline attribute
	 * is set to "yes" in this situation. The attribute is ignored
	 * for mid-measure clefs.
	 *
	 * Clefs appear at the start of each system unless the
	 * print-object attribute has been set to "no" or the
	 * additional attribute has been set to "yes".
	 */
	export interface Clef extends PrintStyle, PrintObject {
	    clefOctaveChange?: string;
	    sign: string;
	    number?: number;
	    size?: SymbolSize;
	    line: number;
	    afterBarline?: boolean;
	    additional?: boolean;
	}
	/**
	 * The tuning-step, tuning-alter, and tuning-octave
	 * elements are defined in the common.mod file. Staff
	 * lines are numbered from bottom to top.
	 */
	export interface StaffTuning {
	    tuningAlter?: string;
	    line: string;
	    tuningStep: string;
	    tuningOctave: string;
	}
	export enum ShowFretsType {
	    Letters = 1,
	    Numbers = 0,
	}
	/**
	 * The staff-details element is used to indicate different
	 * types of staves. The staff-type element can be ossia,
	 * cue, editorial, regular, or alternate. An alternate staff
	 * indicates one that shares the same musical data as the
	 * prior staff, but displayed differently (e.g., treble and
	 * bass clef, standard notation and tab). The staff-lines
	 * element specifies the number of lines for a non 5-line
	 * staff. The staff-tuning and capo elements are used to
	 * specify tuning when using tablature notation. The optional
	 * number attribute specifies the staff number from top to
	 * bottom on the system, as with clef. The optional show-frets
	 * attribute indicates whether to show tablature frets as
	 * numbers (0, 1, 2) or letters (a, b, c). The default choice
	 * is numbers. The print-object attribute is used to indicate
	 * when a staff is not printed in a part, usually in large
	 * scores where empty parts are omitted. It is yes by default.
	 * If print-spacing is yes while print-object is no, the score
	 * is printed in cutaway format where vertical space is left
	 * for the empty part.
	 */
	export interface StaffDetails extends PrintObject, PrintSpacing {
	    staffLines?: number;
	    staffTunings?: StaffTuning[];
	    staffSize?: number;
	    showFrets?: ShowFretsType;
	    capo?: string;
	    number?: number;
	    staffType?: string;
	}
	/**
	 * If the part is being encoded for a transposing instrument
	 * in written vs. concert pitch, the transposition must be
	 * encoded in the transpose element. The transpose element
	 * represents what must be added to the written pitch to get
	 * the correct sounding pitch.
	 *
	 * The transposition is represented by chromatic steps
	 * (required) and three optional elements: diatonic pitch
	 * steps, octave changes, and doubling an octave down. The
	 * chromatic and octave-change elements are numeric values
	 * added to the encoded pitch data to create the sounding
	 * pitch. The diatonic element is also numeric and allows
	 * for correct spelling of enharmonic transpositions.
	 *
	 * The optional number attribute refers to staff numbers,
	 * from top to bottom on the system. If absent, the
	 * transposition applies to all staves in the part. Per-staff
	 * transposition is most often used in parts that represent
	 * multiple instruments.
	 */
	export interface Double {
	}
	/**
	 * If the part is being encoded for a transposing instrument
	 * in written vs. concert pitch, the transposition must be
	 * encoded in the transpose element. The transpose element
	 * represents what must be added to the written pitch to get
	 * the correct sounding pitch.
	 *
	 * The transposition is represented by chromatic steps
	 * (required) and three optional elements: diatonic pitch
	 * steps, octave changes, and doubling an octave down. The
	 * chromatic and octave-change elements are numeric values
	 * added to the encoded pitch data to create the sounding
	 * pitch. The diatonic element is also numeric and allows
	 * for correct spelling of enharmonic transpositions.
	 *
	 * The optional number attribute refers to staff numbers,
	 * from top to bottom on the system. If absent, the
	 * transposition applies to all staves in the part. Per-staff
	 * transposition is most often used in parts that represent
	 * multiple instruments.
	 */
	export interface Transpose {
	    number?: number;
	    diatonic?: string;
	    octaveChange?: string;
	    double?: Double;
	    chromatic: string;
	}
	/**
	 * Directives are like directions, but can be grouped together
	 * with attributes for convenience. This is typically used for
	 * tempo markings at the beginning of a piece of music. This
	 * element has been deprecated in Version 2.0 in favor of
	 * the directive attribute for direction elements. Language
	 * names come from ISO 639, with optional country subcodes
	 * from ISO 3166.
	 */
	export interface Directive extends PrintStyle {
	    data: string;
	}
	/**
	 * The slash-type and slash-dot elements are optional children
	 * of the beat-repeat and slash elements. They have the same
	 * values as the type and dot elements, and define what the
	 * beat is for the display of repetition marks. If not present,
	 * the beat is based on the current time signature.
	 */
	export interface SlashDot {
	}
	/**
	 * The text of the multiple-rest element indicates the number
	 * of measures in the multiple rest. Multiple rests may use
	 * the 1-bar / 2-bar / 4-bar rest symbols, or a single shape.
	 * The use-symbols attribute indicates which to use; it is no
	 * if not specified.
	 */
	export interface MultipleRest {
	    useSymbols?: boolean;
	    count: number;
	}
	/**
	 * The measure-repeat and beat-repeat element specify a
	 * notation style for repetitions. The actual music being
	 * repeated needs to be repeated within the MusicXML file.
	 * These elements specify the notation that indicates the
	 * repeat.
	 *
	 * The measure-repeat element is used for both single and
	 * multiple measure repeats. The text of the element indicates
	 * the number of measures to be repeated in a single pattern.
	 * The slashes attribute specifies the number of slashes to
	 * use in the repeat sign. It is 1 if not specified. Both the
	 * start and the stop of the measure-repeat must be specified.
	 */
	export interface MeasureRepeat {
	    data?: string;
	    type: StartStop;
	    slashes?: number;
	}
	/**
	 * The measure-repeat and beat-repeat element specify a
	 * notation style for repetitions. The actual music being
	 * repeated needs to be repeated within the MusicXML file.
	 * These elements specify the notation that indicates the
	 * repeat.
	 *
	 * The beat-repeat element is used to indicate that a single
	 * beat (but possibly many notes) is repeated. Both the start
	 * and stop of the beat being repeated should be specified.
	 * The slashes attribute specifies the number of slashes to
	 * use in the symbol. The use-dots attribute indicates whether
	 * or not to use dots as well (for instance, with mixed rhythm
	 * patterns). By default, the value for slashes is 1 and the
	 * value for use-dots is no.
	 */
	export interface BeatRepeat {
	    slashType?: string;
	    useDots?: boolean;
	    slashDots?: SlashDot[];
	    slases?: number;
	    type: StartStop;
	}
	/**
	 * The slash element is used to indicate that slash notation
	 * is to be used. If the slash is on every beat, use-stems is
	 * no (the default). To indicate rhythms but not pitches,
	 * use-stems is set to yes. The type attribute indicates
	 * whether this is the start or stop of a slash notation
	 * style. The use-dots attribute works as for the beat-repeat
	 * element, and only has effect if use-stems is no.
	 */
	export interface Slash {
	    slashType?: string;
	    useDots?: boolean;
	    useStems?: boolean;
	    slashDots?: SlashDot[];
	    type: StartStop;
	}
	/**
	 * A measure-style indicates a special way to print partial
	 * to multiple measures within a part. This includes multiple
	 * rests over several measures, repeats of beats, single, or
	 * multiple measures, and use of slash notation.
	 *
	 * The multiple-rest and measure-repeat symbols indicate the
	 * number of measures covered in the element content. The
	 * beat-repeat and slash elements can cover partial measures.
	 * All but the multiple-rest element use a type attribute to
	 * indicate starting and stopping the use of the style. The
	 * optional number attribute specifies the staff number from
	 * top to bottom on the system, as with clef.
	 */
	export interface MeasureStyle extends Font, Color {
	    measureRepeat?: MeasureRepeat;
	    beatRepeat?: BeatRepeat;
	    multipleRest?: MultipleRest;
	    slash?: Slash;
	    number?: number;
	}
	/**
	 * The attributes element contains musical information that
	 * typically changes on measure boundaries. This includes
	 * key and time signatures, clefs, transpositions, and staving.
	 * When attributes are changed mid-measure, it affects the
	 * music in score order, not in MusicXML document order.
	 */
	export interface Attributes extends Editorial {
	    divisions?: number;
	    partSymbol?: PartSymbol;
	    clefs?: Clef[];
	    measureStyles?: MeasureStyle[];
	    times?: Time[];
	    staffDetails?: StaffDetails[];
	    transposes?: Transpose[];
	    staves?: number;
	    instruments?: string;
	    keySignatures?: Key[];
	    directives?: Directive[];
	}
	/**
	 * The cue and grace elements indicate the presence of cue and
	 * grace notes. The slash attribute for a grace note is yes for
	 * slashed eighth notes. The other grace note attributes come
	 * from MuseData sound suggestions. The steal-time-previous
	 * attribute indicates the percentage of time to steal from the
	 * previous note for the grace note. The steal-time-following
	 * attribute indicates the percentage of time to steal from the
	 * following note for the grace note, as for appoggiaturas. The
	 * make-time attribute indicates to make time, not steal time;
	 * the units are in real-time divisions for the grace note.
	 */
	export interface Cue {
	}
	/**
	 * The cue and grace elements indicate the presence of cue and
	 * grace notes. The slash attribute for a grace note is yes for
	 * slashed eighth notes. The other grace note attributes come
	 * from MuseData sound suggestions. The steal-time-previous
	 * attribute indicates the percentage of time to steal from the
	 * previous note for the grace note. The steal-time-following
	 * attribute indicates the percentage of time to steal from the
	 * following note for the grace note, as for appoggiaturas. The
	 * make-time attribute indicates to make time, not steal time;
	 * the units are in real-time divisions for the grace note.
	 */
	export interface Grace {
	    makeTime?: string;
	    stealTimePrevious?: string;
	    slash?: boolean;
	    stealTimeFollowing?: string;
	}
	/**
	 * The chord element indicates that this note is an additional
	 * chord tone with the preceding note. The duration of this
	 * note can be no longer than the preceding note. In MuseData,
	 * a missing duration indicates the same length as the previous
	 * note, but the MusicXML format requires a duration for chord
	 * notes too.
	 */
	export interface Chord {
	}
	/**
	 * The unpitched element indicates musical elements that are
	 * notated on the staff but lack definite pitch, such as
	 * unpitched percussion and speaking voice. Like notes, it
	 * uses step and octave elements to indicate placement on the
	 * staff, following the current clef. If percussion clef is
	 * used, the display-step and display-octave elements are
	 * interpreted as if in treble clef, with a G in octave 4 on
	 * line 2. If not present, the note is placed on the middle
	 * line of the staff, generally used for a one-line staff.
	 */
	export interface Unpitched {
	    displayStep?: string;
	    displayOctave?: number;
	}
	/**
	 * Pitch is represented as a combination of the step of the
	 * diatonic scale, the chromatic alteration, and the octave.
	 * The step element uses the English letters A through G.
	 * The alter element represents chromatic alteration in
	 * number of semitones (e.g., -1 for flat, 1 for sharp).
	 * Decimal values like 0.5 (quarter tone sharp) are
	 * used for microtones. The octave element is represented
	 * by the numbers 0 to 9, where 4 indicates the octave
	 * started by middle C.
	 */
	export interface Pitch {
	    alter?: number;
	    step?: string;
	    octave: number;
	}
	/**
	 * The common note elements between cue/grace notes and
	 * regular (full) notes: pitch, chord, and rest information,
	 * but not duration (cue and grace notes do not have
	 * duration encoded here). Unpitched elements are used for
	 * unpitched percussion, speaking voice, and other musical
	 * elements lacking determinate pitch.
	 */
	export interface FullNote {
	    unpitched?: Unpitched;
	    chord?: Chord;
	    pitch?: Pitch;
	    rest?: Rest;
	}
	/**
	 * The rest element indicates notated rests or silences. Rest
	 * elements are usually empty, but placement on the staff can
	 * be specified using display-step and display-octave
	 * elements. If the measure attribute is set to yes, it
	 * indicates this is a complete measure rest.
	 */
	export interface Rest {
	    measure?: boolean;
	    displayStep?: string;
	    displayOctave?: number;
	}
	/**
	 * Duration is a positive number specified in division units.
	 * This is the intended duration vs. notated duration (for
	 * instance, swing eighths vs. even eighths, or differences
	 * in dotted notes in Baroque-era music). Differences in
	 * duration specific to an interpretation or performance
	 * should use the note element's attack and release
	 * attributes.
	 *
	 * The tie element indicates that a tie begins or ends with
	 * this note. If the tie element applies only particular times
	 * through a repeat, the time-only attribute indicates which
	 * times to apply it. The tie element indicates sound; the tied
	 * element indicates notation.
	 */
	export interface Tie extends TimeOnly {
	    type?: StartStop;
	}
	/**
	 * If multiple score-instruments are specified on a
	 * score-part, there should be an instrument element for
	 * each note in the part. The id attribute is an IDREF back
	 * to the score-instrument ID.
	 */
	export interface Instrument {
	    id: string;
	}
	/**
	 * Notes are the most common type of MusicXML data. The
	 * MusicXML format keeps the MuseData distinction between
	 * elements used for sound information and elements used for
	 * notation information (e.g., tie is used for sound, tied for
	 * notation). Thus grace notes do not have a duration element.
	 * Cue notes have a duration element, as do forward elements,
	 * but no tie elements. Having these two types of information
	 * available can make interchange considerably easier, as
	 * some programs handle one type of information much more
	 * readily than the other.
	 */
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
	    pizzicato?: boolean;
	    cue?: Cue;
	    duration?: number;
	    ties?: Tie[];
	    dynamics?: number;
	    play?: Play;
	    staff?: number;
	    grace?: Grace;
	    notehead?: Notehead;
	    release?: number;
	    beams?: Beam[];
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
	/**
	 * Type indicates the graphic note type, Valid values (from
	 * shortest to longest) are 1024th, 512th, 256th, 128th,
	 * 64th, 32nd, 16th, eighth, quarter, half, whole, breve,
	 * long, and maxima. The size attribute indicates full, cue,
	 * or large size, with full the default for regular notes and
	 * cue the default for cue and grace notes.
	 */
	export interface Type {
	    duration: Count;
	    size?: SymbolSize;
	}
	/**
	 * One dot element is used for each dot of prolongation.
	 * The placement element is used to specify whether the
	 * dot should appear above or below the staff line. It is
	 * ignored for notes that appear on a staff space.
	 */
	export interface Dot extends PrintStyle, Placement {
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
	    TripleFlat = 191,
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
	/**
	 * Actual notated accidentals. Valid values include: sharp,
	 * natural, flat, double-sharp, sharp-sharp, flat-flat,
	 * natural-sharp, natural-flat, quarter-flat, quarter-sharp,
	 * three-quarters-flat, three-quarters-sharp, sharp-down,
	 * sharp-up, natural-down, natural-up, flat-down, flat-up,
	 * triple-sharp, triple-flat, slash-quarter-sharp,
	 * slash-sharp, slash-flat, double-slash-flat, sharp-1,
	 * sharp-2, sharp-3, sharp-5, flat-1, flat-2, flat-3,
	 * flat-4, sori, and koron.
	 *
	 * The quarter- and three-quarters- accidentals are
	 * Tartini-style quarter-tone accidentals. The -down and -up
	 * accidentals are quarter-tone accidentals that include
	 * arrows pointing down or up. The slash- accidentals
	 * are used in Turkish classical music. The numbered
	 * sharp and flat accidentals are superscripted versions
	 * of the accidental signs, used in Turkish folk music.
	 * The sori and koron accidentals are microtonal sharp and
	 * flat accidentals used in Iranian and Persian music.
	 *
	 * Editorial and cautionary indications are indicated
	 * by attributes. Values for these attributes are "no" if not
	 * present. Specific graphic display such as parentheses,
	 * brackets, and size are controlled by the level-display
	 * entity defined in the common.mod file.
	 */
	export interface Accidental extends LevelDisplay, PrintStyle {
	    cautionary?: boolean;
	    accidental: MxmlAccidental;
	    editorial?: boolean;
	}
	/**
	 * Time modification indicates tuplets, double-note tremolos,
	 * and other durational changes. A time-modification element
	 * shows how the cumulative, sounding effect of tuplets and
	 * double-note tremolos compare to the written note type
	 * represented by the type and dot elements. The child elements
	 * are defined in the common.mod file. Nested tuplets and other
	 * notations that use more detailed information need both the
	 * time-modification and tuplet elements to be represented
	 * accurately.
	 */
	export interface TimeModification {
	    actualNotes: number;
	    normalType?: string;
	    normalNotes: number;
	    normalDots?: NormalDot[];
	}
	export enum StemType {
	    None = 2,
	    Double = 3,
	    Down = 0,
	    Up = 1,
	}
	/**
	 * Stems can be down, up, none, or double. For down and up
	 * stems, the position attributes can be used to specify
	 * stem length. The relative values specify the end of the
	 * stem relative to the program default. Default values
	 * specify an absolute end stem position. Negative values of
	 * relative-y that would flip a stem instead of shortening
	 * it are ignored. A stem element associated with a rest
	 * refers to a stemlet.
	 */
	export interface Stem extends Position, Color {
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
	    Rectangle = 16,
	    Square = 3,
	    ArrowDown = 8,
	    X = 5,
	    Diamond = 2,
	    CircleX = 6,
	}
	/**
	 * The notehead element indicates shapes other than the open
	 * and closed ovals associated with note durations. The element
	 * value can be slash, triangle, diamond, square, cross, x,
	 * circle-x, inverted triangle, arrow down, arrow up, slashed,
	 * back slashed, normal, cluster, circle dot, left triangle,
	 * rectangle, or none. For shape note music, the element values
	 * do, re, mi, fa, fa up, so, la, and ti are also used,
	 * corresponding to Aikin's 7-shape system. The fa up shape is
	 * typically used with upstems; the fa shape is typically used
	 * with downstems or no stems.
	 *
	 * The arrow shapes differ from triangle and inverted triangle
	 * by being centered on the stem. Slashed and back slashed
	 * notes include both the normal notehead and a slash. The
	 * triangle shape has the tip of the triangle pointing up;
	 * the inverted triangle shape has the tip of the triangle
	 * pointing down. The left triangle shape is a right triangle
	 * with the hypotenuse facing up and to the left.
	 *
	 * For the enclosed shapes, the default is to be hollow for
	 * half notes and longer, and filled otherwise. The filled
	 * attribute can be set to change this if needed.
	 *
	 * If the parentheses attribute is set to yes, the notehead
	 * is parenthesized. It is no by default.
	 *
	 * The notehead-text element indicates text that is displayed
	 * inside a notehead, as is done in some educational music.
	 * It is not needed for the numbers used in tablature or jianpu
	 * notation. The presence of a TAB or jianpu clefs is sufficient
	 * to indicate that numbers are used. The display-text and
	 * accidental-text elements allow display of fully formatted
	 * text and accidentals.
	 */
	export interface Notehead extends Font, Color {
	    type: NoteheadType;
	    filled?: boolean;
	    parentheses?: boolean;
	}
	/**
	 * The notehead element indicates shapes other than the open
	 * and closed ovals associated with note durations. The element
	 * value can be slash, triangle, diamond, square, cross, x,
	 * circle-x, inverted triangle, arrow down, arrow up, slashed,
	 * back slashed, normal, cluster, circle dot, left triangle,
	 * rectangle, or none. For shape note music, the element values
	 * do, re, mi, fa, fa up, so, la, and ti are also used,
	 * corresponding to Aikin's 7-shape system. The fa up shape is
	 * typically used with upstems; the fa shape is typically used
	 * with downstems or no stems.
	 *
	 * The arrow shapes differ from triangle and inverted triangle
	 * by being centered on the stem. Slashed and back slashed
	 * notes include both the normal notehead and a slash. The
	 * triangle shape has the tip of the triangle pointing up;
	 * the inverted triangle shape has the tip of the triangle
	 * pointing down. The left triangle shape is a right triangle
	 * with the hypotenuse facing up and to the left.
	 *
	 * For the enclosed shapes, the default is to be hollow for
	 * half notes and longer, and filled otherwise. The filled
	 * attribute can be set to change this if needed.
	 *
	 * If the parentheses attribute is set to yes, the notehead
	 * is parenthesized. It is no by default.
	 *
	 * The notehead-text element indicates text that is displayed
	 * inside a notehead, as is done in some educational music.
	 * It is not needed for the numbers used in tablature or jianpu
	 * notation. The presence of a TAB or jianpu clefs is sufficient
	 * to indicate that numbers are used. The display-text and
	 * accidental-text elements allow display of fully formatted
	 * text and accidentals.
	 */
	export interface NoteheadText {
	    text: TextSegment[];
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
	/**
	 * Beam types include begin, continue, end, forward hook, and
	 * backward hook. Up to eight concurrent beams are available to
	 * cover up to 1024th notes, using an enumerated type defined
	 * in the common.mod file. Each beam in a note is represented
	 * with a separate beam element, starting with the eighth note
	 * beam using a number attribute of 1.
	 *
	 * Note that the beam number does not distinguish sets of
	 * beams that overlap, as it does for slur and other elements.
	 * Beaming groups are distinguished by being in different
	 * voices and/or the presence or absence of grace and cue
	 * elements.
	 *
	 * Beams that have a begin value can also have a fan attribute to
	 * indicate accelerandos and ritardandos using fanned beams. The
	 * fan attribute may also be used with a continue value if the
	 * fanning direction changes on that note. The value is "none" if not specified.
	 *
	 * The repeater attribute has been deprecated in MusicXML 3.0.
	 * Formerly used for tremolos, it needs to be specified with a
	 * "yes" value for each beam using it.
	 */
	export interface Beam {
	    repeater?: boolean;
	    number: number;
	    type: BeamType;
	    fan?: AccelRitNone;
	}
	/**
	 * Notations are musical notations, not XML notations. Multiple
	 * notations are allowed in order to represent multiple editorial
	 * levels. The print-object attribute, added in Version 3.0,
	 * allows notations to represent details of performance technique,
	 * such as fingerings, without having them appear in the score.
	 */
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
	/**
	 * The tied element represents the notated tie. The tie element
	 * represents the tie sound.
	 *
	 * The number attribute is rarely needed to disambiguate ties,
	 * since note pitches will usually suffice. The attribute is
	 * implied rather than defaulting to 1 as with most elements.
	 * It is available for use in more complex tied notation
	 * situations.
	 */
	export interface Tied extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
	    number?: number;
	    type: StartStopContinue;
	}
	/**
	 * Slur elements are empty. Most slurs are represented with
	 * two elements: one with a start type, and one with a stop
	 * type. Slurs can add more elements using a continue type.
	 * This is typically used to specify the formatting of cross-
	 * system slurs, or to specify the shape of very complex slurs.
	 */
	export interface Slur extends LineType, DashedFormatting, Position, Placement, Orientation, Bezier, Color {
	    number?: number;
	    type: StartStopContinue;
	}
	export enum ActualBothNone {
	    None = 2,
	    Both = 1,
	    Actual = 0,
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface Tuplet extends LineShape, Position, Placement {
	    bracket?: boolean;
	    number: number;
	    showNumber?: ActualBothNone;
	    tupletNormal?: TupletNormal;
	    type: StartStop;
	    showType?: ActualBothNone;
	    tupletActual?: TupletActual;
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface TupletActual {
	    tupletNumber?: TupletNumber;
	    tupletDots?: TupletDot[];
	    tupletType?: TupletType;
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface TupletNormal {
	    tupletNumber?: TupletNumber;
	    tupletDots?: TupletDot[];
	    tupletType?: TupletType;
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface TupletNumber extends Font, Color {
	    text: string;
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface TupletType extends Font, Color {
	    text: string;
	}
	/**
	 * A tuplet element is present when a tuplet is to be displayed
	 * graphically, in addition to the sound data provided by the
	 * time-modification elements. The number attribute is used to
	 * distinguish nested tuplets. The bracket attribute is used
	 * to indicate the presence of a bracket. If unspecified, the
	 * results are implementation-dependent. The line-shape
	 * attribute is used to specify whether the bracket is straight
	 * or in the older curved or slurred style. It is straight by
	 * default.
	 *
	 * Whereas a time-modification element shows how the cumulative,
	 * sounding effect of tuplets and double-note tremolos compare to
	 * the written note type, the tuplet element describes how this
	 * is displayed. The tuplet element also provides more detailed
	 * representation information than the time-modification element,
	 * and is needed to represent nested tuplets and other complex
	 * tuplets accurately. The tuplet-actual and tuplet-normal
	 * elements provide optional full control over tuplet
	 * specifications. Each allows the number and note type
	 * (including dots) describing a single tuplet. If any of
	 * these elements are absent, their values are based on the
	 * time-modification element.
	 *
	 * The show-number attribute is used to display either the
	 * number of actual notes, the number of both actual and
	 * normal notes, or neither. It is actual by default. The
	 * show-type attribute is used to display either the actual
	 * type, both the actual and normal types, or neither. It is
	 * none by default.
	 */
	export interface TupletDot extends Font, Color {
	}
	/**
	 * Glissando and slide elements both indicate rapidly moving
	 * from one pitch to the other so that individual notes are not
	 * discerned. The distinction is similar to that between NIFF's
	 * glissando and portamento elements. A glissando sounds the
	 * half notes in between the slide and defaults to a wavy line.
	 * A slide is continuous between two notes and defaults to a
	 * solid line. The optional text for a glissando or slide is
	 * printed alongside the line.
	 */
	export interface Glissando extends LineType, DashedFormatting, PrintStyle {
	    text?: string;
	    type: StartStop;
	    normal?: number;
	}
	/**
	 * Glissando and slide elements both indicate rapidly moving
	 * from one pitch to the other so that individual notes are not
	 * discerned. The distinction is similar to that between NIFF's
	 * glissando and portamento elements. A glissando sounds the
	 * half notes in between the slide and defaults to a wavy line.
	 * A slide is continuous between two notes and defaults to a
	 * solid line. The optional text for a glissando or slide is
	 * printed alongside the line.
	 */
	export interface Slide extends LineType, DashedFormatting, PrintStyle, BendSound {
	    text?: string;
	    type: StartStop;
	    normal?: number;
	}
	/**
	 * The other-notation element is used to define any notations
	 * not yet in the MusicXML format. This allows extended
	 * representation, though without application interoperability.
	 * It handles notations where more specific extension elements
	 * such as other-dynamics and other-technical are not
	 * appropriate.
	 */
	export interface OtherNotation extends PrintObject, PrintStyle, Placement {
	    type: StartStopSingle;
	    data?: string;
	}
	/**
	 * The other-direction element is used to define any direction
	 * symbols not yet in the current version of the MusicXML
	 * format. This allows extended representation, though without
	 * application interoperability.
	 */
	export interface OtherDirection extends PrintObject, PrintStyleAlign {
	    data: string;
	}
	/**
	 * Ornaments can be any of several types, followed optionally
	 * by accidentals. The accidental-mark element's content is
	 * represented the same as an accidental element, but with a
	 * different name to reflect the different musical meaning.
	 */
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
	export interface TrillMark extends PrintStyle, Placement, TrillSound {
	}
	/**
	 * the turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. the inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. the delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. the vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * if the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface Turn extends PrintStyle, Placement, TrillSound {
	    slash?: boolean;
	}
	/**
	 * The turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. The inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. The delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. The vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * If the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface DelayedTurn extends PrintStyle, Placement, TrillSound {
	    slash?: boolean;
	}
	/**
	 * The turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. The inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. The delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. The vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * If the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface InvertedTurn extends PrintStyle, Placement, TrillSound {
	    slash?: boolean;
	}
	/**
	 * The turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. The inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. The delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. The vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * If the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface DelayedInvertedTurn extends PrintStyle, Placement, TrillSound {
	    slash?: boolean;
	}
	/**
	 * The turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. The inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. The delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. The vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * If the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface VerticalTurn extends PrintStyle, Placement, TrillSound {
	}
	/**
	 * The turn and delayed-turn elements are the normal turn
	 * shape which goes up then down. The inverted-turn and
	 * delayed-inverted-turn elements have the shape which goes
	 * down and then up. The delayed-turn and delayed-inverted-turn
	 * elements indicate turns that are delayed until the end of the
	 * current note. The vertical-turn element has the shape
	 * arranged vertically going from upper left to lower right.
	 * If the slash attribute is yes, then a vertical line is used
	 * to slash the turn; it is no by default.
	 */
	export interface Shake extends PrintStyle, Placement, TrillSound {
	}
	/**
	 * The long attribute for the mordent and inverted-mordent
	 * elements is "no" by default. The mordent element represents
	 * the sign with the vertical line; the inverted-mordent
	 * element represents the sign without the vertical line.
	 * The approach and departure attributes are used for compound
	 * ornaments, indicating how the beginning and ending of the
	 * ornament look relative to the main part of the mordent.
	 */
	export interface Mordent extends PrintStyle, Placement, TrillSound {
	    long?: boolean;
	    approach?: AboveBelow;
	    departure?: AboveBelow;
	}
	/**
	 * The long attribute for the mordent and inverted-mordent
	 * elements is "no" by default. The mordent element represents
	 * the sign with the vertical line; the inverted-mordent
	 * element represents the sign without the vertical line.
	 * The approach and departure attributes are used for compound
	 * ornaments, indicating how the beginning and ending of the
	 * ornament look relative to the main part of the mordent.
	 */
	export interface InvertedMordent extends PrintStyle, Placement, TrillSound {
	    long?: boolean;
	    approach?: AboveBelow;
	    departure?: AboveBelow;
	}
	/**
	 * The name for this ornament is based on the German,
	 * to avoid confusion with the more common slide element
	 * defined earlier.
	 */
	export interface Schleifer extends PrintStyle, Placement {
	}
	/**
	 * The tremolo ornament can be used to indicate either
	 * single-note or double-note tremolos. Single-note tremolos
	 * use the single type, while double-note tremolos use the
	 * start and stop types. The default is "single" for
	 * compatibility with Version 1.1. The text of the element
	 * indicates the number of tremolo marks and is an integer
	 * from 0 to 8. Note that the number of attached beams is
	 * not included in this value, but is represented separately
	 * using the beam element.
	 *
	 * When using double-note tremolos, the duration of each note
	 * in the tremolo should correspond to half of the notated type
	 * value. A time-modification element should also be added with
	 * an actual-notes value of 2 and a normal-notes value of 1. If
	 * used within a tuplet, this 2/1 ratio should be multiplied by
	 * the existing tuplet ratio.
	 *
	 * Using repeater beams for indicating tremolos is deprecated as
	 * of MusicXML 3.0.
	 */
	export interface Tremolo extends PrintStyle, Placement {
	    data?: string;
	    type: StartStopSingle;
	}
	/**
	 * The other-ornament element is used to define any ornaments
	 * not yet in the MusicXML format. This allows extended
	 * representation, though without application interoperability.
	 */
	export interface OtherOrnament extends PrintStyle, Placement {
	    type: StartStopSingle;
	    data?: string;
	}
	/**
	 * An accidental-mark can be used as a separate notation or
	 * as part of an ornament. When used in an ornament, position
	 * and placement are relative to the ornament, not relative to
	 * the note.
	 */
	export interface AccidentalMark extends PrintStyle, Placement {
	    mark: string;
	}
	/**
	 * Technical indications give performance information for
	 * individual instruments.
	 */
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
	    string?: String;
	    openString?: OpenString;
	    fingernails?: Fingernails;
	    arrow?: Arrow;
	    harmonic?: Harmonic;
	    heel?: Heel;
	    otherTechnical?: OtherTechnical;
	    snapPizzicato?: SnapPizzicato;
	    fingering?: Fingering;
	}
	/**
	 * The up-bow element represents the symbol that is used both
	 * for up-bowing on bowed instruments, and up-stroke on plucked
	 * instruments.
	 */
	export interface UpBow extends PrintStyle, Placement {
	}
	/**
	 * The down-bow element represents the symbol that is used both
	 * for down-bowing on bowed instruments, and down-stroke on
	 * plucked instruments.
	 */
	export interface DownBow extends PrintStyle, Placement {
	}
	/**
	 * The harmonic element indicates natural and artificial
	 * harmonics. Natural harmonics usually notate the base
	 * pitch rather than the sounding pitch. Allowing the type
	 * of pitch to be specified, combined with controls for
	 * appearance/playback differences, allows both the notation
	 * and the sound to be represented. Artificial harmonics can
	 * add a notated touching-pitch; the pitch or fret at which
	 * the string is touched lightly to produce the harmonic.
	 * Artificial pinch harmonics will usually not notate a
	 * touching pitch. The attributes for the harmonic element
	 * refer to the use of the circular harmonic symbol, typically
	 * but not always used with natural harmonics.
	 */
	export interface Harmonic extends PrintObject, PrintStyle, Placement {
	    artificial: boolean;
	    touchingPitch: boolean;
	    soundingPitch: boolean;
	    natural: boolean;
	    basePitch: boolean;
	}
	/**
	 * The open-string element represents the zero-shaped
	 * open string symbol.
	 */
	export interface OpenString extends PrintStyle, Placement {
	}
	/**
	 * The thumb-position element represents the thumb position
	 * symbol. This is a circle with a line, where the line does
	 * not come within the circle. It is distinct from the snap
	 * pizzicato symbol, where the line comes inside the circle.
	 */
	export interface ThumbPosition extends PrintStyle, Placement {
	}
	/**
	 * The pluck element is used to specify the plucking fingering
	 * on a fretted instrument, where the fingering element refers
	 * to the fretting fingering. Typical values are p, i, m, a for
	 * pulgar/thumb, indicio/index, medio/middle, and anular/ring
	 * fingers.
	 */
	export interface Pluck extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * The double-tongue element represents the double tongue symbol
	 * (two dots arranged horizontally).
	 */
	export interface DoubleTongue extends PrintStyle, Placement {
	}
	/**
	 * The triple-tongue element represents the triple tongue symbol
	 * (three dots arranged horizontally).
	 */
	export interface TripleTongue extends PrintStyle, Placement {
	}
	/**
	 * The stopped element represents the stopped symbol, which looks
	 * like a plus sign.
	 */
	export interface Stopped extends PrintStyle, Placement {
	}
	/**
	 * The snap-pizzicato element represents the snap pizzicato
	 * symbol. This is a circle with a line, where the line comes
	 * inside the circle. It is distinct from the thumb-position
	 * symbol, where the line does not come inside the circle.
	 */
	export interface SnapPizzicato extends PrintStyle, Placement {
	}
	/**
	 * The hammer-on and pull-off elements are used in guitar
	 * and fretted instrument notation. Since a single slur
	 * can be marked over many notes, the hammer-on and pull-off
	 * elements are separate so the individual pair of notes can
	 * be specified. The element content can be used to specify
	 * how the hammer-on or pull-off should be notated. An empty
	 * element leaves this choice up to the application.
	 */
	export interface HammerOn extends PrintStyle, Placement {
	    number?: number;
	    type: StartStop;
	    data?: string;
	}
	/**
	 * The hammer-on and pull-off elements are used in guitar
	 * and fretted instrument notation. Since a single slur
	 * can be marked over many notes, the hammer-on and pull-off
	 * elements are separate so the individual pair of notes can
	 * be specified. The element content can be used to specify
	 * how the hammer-on or pull-off should be notated. An empty
	 * element leaves this choice up to the application.
	 */
	export interface PullOff extends PrintStyle, Placement {
	    number?: number;
	    type: StartStop;
	    data?: string;
	}
	/**
	 * The bend element is used in guitar and tablature. The
	 * bend-alter element indicates the number of steps in the
	 * bend, similar to the alter element. As with the alter
	 * element, numbers like 0.5 can be used to indicate
	 * microtones. Negative numbers indicate pre-bends or
	 * releases; the pre-bend and release elements are used
	 * to distinguish what is intended. A with-bar element
	 * indicates that the bend is to be done at the bridge
	 * with a whammy or vibrato bar. The content of the
	 * element indicates how this should be notated.
	 */
	export interface Bend extends PrintStyle, BendSound {
	    bendAlter: string;
	    withBar?: WithBar;
	    preBend: boolean;
	    release: boolean;
	}
	/**
	 * The bend element is used in guitar and tablature. The
	 * bend-alter element indicates the number of steps in the
	 * bend, similar to the alter element. As with the alter
	 * element, numbers like 0.5 can be used to indicate
	 * microtones. Negative numbers indicate pre-bends or
	 * releases; the pre-bend and release elements are used
	 * to distinguish what is intended. A with-bar element
	 * indicates that the bend is to be done at the bridge
	 * with a whammy or vibrato bar. The content of the
	 * element indicates how this should be notated.
	 */
	export interface WithBar extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * The tap element indicates a tap on the fretboard. The
	 * element content allows specification of the notation;
	 * + and T are common choices. If empty, the display is
	 * application-specific.
	 */
	export interface Tap extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * The heel and toe element are used with organ pedals. The
	 * substitution value is "no" if the attribute is not present.
	 */
	export interface Heel extends PrintStyle, Placement {
	    substitution?: boolean;
	}
	/**
	 * The heel and toe element are used with organ pedals. The
	 * substitution value is "no" if the attribute is not present.
	 */
	export interface Toe extends PrintStyle, Placement {
	    substitution?: boolean;
	}
	/**
	 * The fingernails element is used in notation for harp and
	 * other plucked string instruments.
	 */
	export interface Fingernails extends PrintStyle, Placement {
	}
	/**
	 * The hole element represents the symbols used for woodwind
	 * and brass fingerings as well as other notations. The content
	 * of the optional hole-type element indicates what the hole
	 * symbol represents in terms of instrument fingering or other
	 * techniques. The hole-closed element represents whether the
	 * hole is closed, open, or half-open. Valid element values are
	 * yes, no, and half. The optional location attribute indicates
	 * which portion of the hole is filled in when the element value
	 * is half. The optional hole-shape element indicates the shape
	 * of the hole symbol; the default is a circle.
	 */
	export interface Hole extends PrintStyle, Placement {
	    holeClosed: HoleClosed;
	    holeShape: string;
	    holeType?: string;
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
	/**
	 * The hole element represents the symbols used for woodwind
	 * and brass fingerings as well as other notations. The content
	 * of the optional hole-type element indicates what the hole
	 * symbol represents in terms of instrument fingering or other
	 * techniques. The hole-closed element represents whether the
	 * hole is closed, open, or half-open. Valid element values are
	 * yes, no, and half. The optional location attribute indicates
	 * which portion of the hole is filled in when the element value
	 * is half. The optional hole-shape element indicates the shape
	 * of the hole symbol; the default is a circle.
	 */
	export interface HoleClosed {
	    location?: HoleLocation;
	    data: HoleClosedType;
	}
	/**
	 * The arrow element represents an arrow used for a musical
	 * technical indication. Straight arrows are represented with
	 * an arrow-direction element and an optional arrow-style
	 * element. Circular arrows are represented with a
	 * circular-arrow element. Descriptive values use Unicode
	 * arrow terminology.
	 *
	 * Values for the arrow-direction element are left, up, right,
	 * down, northwest, northeast, southeast, southwest, left right,
	 * up down, northwest southeast, northeast southwest, and other.
	 *
	 * Values for the arrow-style element are single, double,
	 * filled, hollow, paired, combined, and other. Filled and
	 * hollow arrows indicate polygonal single arrows. Paired
	 * arrows are duplicate single arrows in the same direction.
	 * Combined arrows apply to double direction arrows like
	 * left right, indicating that an arrow in one direction
	 * should be combined with an arrow in the other direction.
	 *
	 * Values for the circular-arrow element are clockwise and
	 * anticlockwise.
	 */
	export interface Arrow extends PrintStyle, Placement {
	    arrowStyle?: string;
	    arrowDirection?: string;
	    circularArrow?: string;
	}
	/**
	 * The handbell element represents notation for letious
	 * techniques used in handbell and handchime music. Valid
	 * values are damp, echo, gyro, hand martellato, mallet lift,
	 * mallet table, martellato, martellato lift,
	 * muted martellato, pluck lift, and swing.
	 */
	export interface Handbell extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * The other-technical element is used to define any technical
	 * indications not yet in the MusicXML format. This allows
	 * extended representation, though without application
	 * interoperability.
	 */
	export interface OtherTechnical extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * Articulations and accents are grouped together here.
	 */
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
	export interface Accent extends PrintStyle, Placement {
	}
	export interface StrongAccent extends PrintStyle, Placement {
	    type?: UpDown;
	}
	/**
	 * The staccato element is used for a dot articulation, as
	 * opposed to a stroke or a wedge.
	 */
	export interface Staccato extends PrintStyle, Placement {
	}
	export interface Tenuto extends PrintStyle, Placement {
	}
	export interface DetachedLegato extends PrintStyle, Placement {
	}
	/**
	 * The staccatissimo element is used for a wedge articulation,
	 * as opposed to a dot or a stroke.
	 */
	export interface Staccatissimo extends PrintStyle, Placement {
	}
	/**
	 * The spiccato element is used for a stroke articulation, as
	 * opposed to a dot or a wedge.
	 */
	export interface Spiccato extends PrintStyle, Placement {
	}
	/**
	 * The scoop, plop, doit, and falloff elements are
	 * indeterminate slides attached to a single note.
	 * Scoops and plops come before the main note, coming
	 * from below and above the pitch, respectively. Doits
	 * and falloffs come after the main note, going above
	 * and below the pitch, respectively.
	 */
	export interface Scoop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
	}
	/**
	 * The scoop, plop, doit, and falloff elements are
	 * indeterminate slides attached to a single note.
	 * Scoops and plops come before the main note, coming
	 * from below and above the pitch, respectively. Doits
	 * and falloffs come after the main note, going above
	 * and below the pitch, respectively.
	 */
	export interface Plop extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
	}
	/**
	 * The scoop, plop, doit, and falloff elements are
	 * indeterminate slides attached to a single note.
	 * Scoops and plops come before the main note, coming
	 * from below and above the pitch, respectively. Doits
	 * and falloffs come after the main note, going above
	 * and below the pitch, respectively.
	 */
	export interface Doit extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
	}
	/**
	 * The scoop, plop, doit, and falloff elements are
	 * indeterminate slides attached to a single note.
	 * Scoops and plops come before the main note, coming
	 * from below and above the pitch, respectively. Doits
	 * and falloffs come after the main note, going above
	 * and below the pitch, respectively.
	 */
	export interface Falloff extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
	}
	export enum BreathMarkType {
	    Empty = 2,
	    Comma = 0,
	    Tick = 1,
	}
	/**
	 * The breath-mark element may have a text value to
	 * indicate the symbol used for the mark. Valid values are
	 * comma, tick, and an empty string.
	 */
	export interface BreathMark extends LineShape, LineType, DashedFormatting, PrintStyle, Placement {
	    type: BreathMarkType;
	}
	export interface Caesura extends PrintStyle, Placement {
	}
	export interface Stress extends PrintStyle, Placement {
	}
	export interface Unstress extends PrintStyle, Placement {
	}
	/**
	 * The other-articulation element is used to define any
	 * articulations not yet in the MusicXML format. This allows
	 * extended representation, though without application
	 * interoperability.
	 */
	export interface OtherArticulation extends PrintStyle, Placement {
	    data: string;
	}
	/**
	 * The arpeggiate element indicates that this note is part of
	 * an arpeggiated chord. The number attribute can be used to
	 * distinguish between two simultaneous chords arpeggiated
	 * separately (different numbers) or together (same number).
	 * The up-down attribute is used if there is an arrow on the
	 * arpeggio sign. By default, arpeggios go from the lowest to
	 * highest note.
	 */
	export interface Arpeggiate extends Position, Placement, Color {
	    number?: number;
	    direction?: UpDown;
	}
	/**
	 * The non-arpeggiate element indicates that this note is at
	 * the top or bottom of a bracket indicating to not arpeggiate
	 * these notes. Since this does not involve playback, it is
	 * only used on the top or bottom notes, not on each note
	 * as for the arpeggiate element.
	 */
	export interface NonArpeggiate extends Position, Placement, Color {
	    number?: number;
	    type: TopBottom;
	}
	/**
	 * Humming and laughing representations are taken from
	 * Humdrum.
	 */
	export interface Laughing {
	    _class?: string;
	}
	/**
	 * Humming and laughing representations are taken from
	 * Humdrum.
	 */
	export interface Humming {
	    _class?: string;
	}
	/**
	 * The end-line and end-paragraph elements come
	 * from RP-017 for Standard MIDI File Lyric meta-events;
	 * they help facilitate lyric display for Karaoke and
	 * similar applications.
	 */
	export interface EndLine {
	    _class?: string;
	}
	/**
	 * The end-line and end-paragraph elements come
	 * from RP-017 for Standard MIDI File Lyric meta-events;
	 * they help facilitate lyric display for Karaoke and
	 * similar applications.
	 */
	export interface EndParagraph {
	    _class?: string;
	}
	/**
	 * Fake element containing ordered content. Children of lyric-parts are actually children of lyric. See lyric.
	 */
	export interface LyricParts {
	}
	/**
	 * Text underlays for lyrics, based on Humdrum with support
	 * for other formats.
	 *
	 * IMPORTANT: <lyric-parts> is fake. All children of lyric-parts
	 * are actually children of lyric. This is a construct invented by
	 * musicxml-interfaces for separating ordered and unordered
	 * content.
	 *
	 * Language names for text elements come from ISO 639,
	 * with optional country subcodes from ISO 3166. muiscxml-interfaces
	 * currently ignores this field.
	 *
	 * Justification is center by default; placement is
	 * below by default. The print-object attribute can override
	 * a note's print-lyric attribute in cases where only some
	 * lyrics on a note are printed, as when lyrics for later verses
	 * are printed in a block of text rather than with each note.
	 *
	 */
	export interface Lyric extends Justify, Position, Placement, Color, PrintObject, Editorial {
	    lyricParts: any[];
	    number?: number;
	    name?: string;
	}
	export interface Text extends Font, Color, TextDecoration, TextRotation, LetterSpacing, TextDirection {
	    data: string;
	    _class?: string;
	}
	export enum SyllabicType {
	    Single = 0,
	    Begin = 1,
	    Middle = 3,
	    End = 2,
	}
	/**
	 * Hyphenation is indicated by the syllabic element, which can be single,
	 * begin, end, or middle. These represent single-syllable
	 * words, word-beginning syllables, word-ending syllables,
	 * and mid-word syllables.
	 */
	export interface Syllabic extends Font, Color {
	    data: SyllabicType;
	    _class?: string;
	}
	/**
	 * Multiple syllables on a single note are separated by elision
	 * elements. A hyphen in the text element should only be used
	 * for an actual hyphenated word. Two text elements that are
	 * not separated by an elision element are part of the same
	 * syllable, but may have different text formatting.
	 *
	 * The elision element text specifies the symbol used to
	 * display the elision. Common values are a no-break space
	 * (Unicode 00A0), an underscore (Unicode 005F), or an undertie
	 * (Unicode 203F).
	 */
	export interface Elision extends Font, Color {
	    data: string;
	    _class?: string;
	}
	/**
	 * Word extensions are represented using the extend element.
	 *
	 * The extend element represents lyric word extension /
	 * melisma lines as well as figured bass extensions. The
	 * optional type and position attributes are added in
	 * Version 3.0 to provide better formatting control.
	 */
	export interface Extend extends PrintStyle {
	    type?: StartStopContinue;
	    _class?: string;
	}
	/**
	 * Figured bass elements take their position from the first
	 * regular note (not a grace note or chord note) that follows
	 * in score order. The optional duration element is used to
	 * indicate changes of figures under a note.
	 *
	 * Figures are ordered from top to bottom. A figure-number is a
	 * number. Values for prefix and suffix include the accidental
	 * values sharp, flat, natural, double-sharp, flat-flat, and
	 * sharp-sharp. Suffixes include both symbols that come after
	 * the figure number and those that overstrike the figure number.
	 * The suffix value slash is used for slashed numbers indicating
	 * chromatic alteration. The orientation and display of the slash
	 * usually depends on the figure number. The prefix and suffix
	 * elements may contain additional values for symbols specific
	 * to particular figured bass styles. The value of parentheses
	 * is "no" if not present.
	 */
	export interface FiguredBass extends Editorial, PrintStyle, Printout {
	    figures: Figure[];
	    duration?: number;
	    parentheses?: boolean;
	}
	export interface Figure extends PrintStyle {
	    prefix?: Prefix;
	    figureNumber?: FigureNumber;
	    extend?: Extend;
	    suffix?: Suffix;
	}
	export interface Prefix extends PrintStyle {
	    data: string;
	}
	export interface FigureNumber extends PrintStyle {
	    data: string;
	}
	export interface Suffix extends PrintStyle {
	    data: string;
	}
	/**
	 * The backup and forward elements are required to coordinate
	 * multiple voices in one part, including music on multiple
	 * staves.
	 *
	 * The backup element is generally used to
	 * move between voices and staves. Thus the backup element
	 * does not include voice or staff elements. Duration values
	 * should always be positive, and should not cross measure
	 * boundaries or mid-measure changes in the divisions value.
	 */
	export interface Backup extends Editorial {
	    duration: number;
	}
	/**
	 * The backup and forward elements are required to coordinate
	 * multiple voices in one part, including music on multiple
	 * staves.
	 *
	 * The forward element is generally used within voices
	 * and staves. Duration values should always be positive, and
	 * should not cross measure boundaries or mid-measure changes
	 * in the divisions value.
	 */
	export interface Forward extends EditorialVoice {
	    duration: number;
	    staff?: number;
	}
	export enum BarlineLocation {
	    Right = 1,
	    Middle = 2,
	    Left = 0,
	}
	/**
	 * If a barline is other than a normal single barline, it
	 * should be represented by a barline element that describes
	 * it. This includes information about repeats and multiple
	 * endings, as well as line style. Barline data is on the same
	 * level as the other musical data in a score - a child of a
	 * measure in a partwise score, or a part in a timewise score.
	 * This allows for barlines within measures, as in dotted
	 * barlines that subdivide measures in complex meters. The two
	 * fermata elements allow for fermatas on both sides of the
	 * barline (the lower one inverted).
	 *
	 * Barlines have a location attribute to make it easier to
	 * process barlines independently of the other musical data
	 * in a score. It is often easier to set up measures
	 * separately from entering notes. The location attribute
	 * must match where the barline element occurs within the
	 * rest of the musical data in the score. If location is left,
	 * it should be the first element in the measure, aside from
	 * the print, bookmark, and link elements. If location is
	 * right, it should be the last element, again with the
	 * possible exception of the print, bookmark, and link
	 * elements. If no location is specified, the right barline
	 * is the default. The segno, coda, and divisions attributes
	 * work the same way as in the sound element defined in the
	 * direction.mod file. They are used for playback when barline
	 * elements contain segno or coda child elements.
	 */
	export interface Barline extends Editorial {
	    segno?: Segno;
	    coda?: Coda;
	    location?: BarlineLocation;
	    codaAttrib?: string;
	    wavyLine?: WavyLine;
	    fermatas?: Fermata[];
	    segnoAttrib?: string;
	    divisions?: number;
	    barStyle?: BarStyle;
	    ending?: Ending;
	    repeat?: Repeat;
	}
	/**
	 * Bar-style contains style information. Choices are
	 * regular, dotted, dashed, heavy, light-light,
	 * light-heavy, heavy-light, heavy-heavy, tick (a
	 * short stroke through the top line), short (a partial
	 * barline between the 2nd and 4th lines), and none.
	 */
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
	/**
	 * Bar-style contains style information. Choices are
	 * regular, dotted, dashed, heavy, light-light,
	 * light-heavy, heavy-light, heavy-heavy, tick (a
	 * short stroke through the top line), short (a partial
	 * barline between the 2nd and 4th lines), and none.
	 */
	export interface BarStyle extends Color {
	    data: BarStyleType;
	}
	export enum StartStopDiscontinue {
	    Discontinue = 2,
	    Start = 0,
	    Stop = 1,
	}
	/**
	 * Endings refers to multiple (e.g. first and second) endings.
	 * Typically, the start type is associated with the left
	 * barline of the first measure in an ending. The stop and
	 * discontinue types are associated with the right barline of
	 * the last measure in an ending. Stop is used when the ending
	 * mark concludes with a downward jog, as is typical for first
	 * endings. Discontinue is used when there is no downward jog,
	 * as is typical for second endings that do not conclude a
	 * piece. The length of the jog can be specified using the
	 * end-length attribute. The text-x and text-y attributes
	 * are offsets that specify where the baseline of the start
	 * of the ending text appears, relative to the start of the
	 * ending line.
	 *
	 * The number attribute reflects the numeric values of what
	 * is under the ending line. Single endings such as "1" or
	 * comma-separated multiple endings such as "1, 2" may be
	 * used. The ending element text is used when the text
	 * displayed in the ending is different than what appears in
	 * the number attribute. The print-object element is used to
	 * indicate when an ending is present but not printed, as is
	 * often the case for many parts in a full score.
	 */
	export interface Ending extends PrintObject, PrintStyle {
	    endLength: number;
	    textX: number;
	    number: number;
	    textY: number;
	    type: StartStopDiscontinue;
	    ending?: string;
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
	/**
	 * Repeat marks. The start of the repeat has a forward direction
	 * while the end of the repeat has a backward direction. Backward
	 * repeats that are not part of an ending can use the times
	 * attribute to indicate the number of times the repeated section
	 * is played. The winged attribute indicates whether the repeat
	 * has winged extensions that appear above and below the barline.
	 * The straight and curved values represent single wings, while
	 * the double-straight and double-curved values represent double
	 * wings. The none value indicates no wings and is the default.
	 */
	export interface Repeat {
	    times: string;
	    winged: WingedType;
	    direction: DirectionTypeBg;
	}
	/**
	 * The tip-direction entity represents the direction in which
	 * the tip of a stick or beater points, using Unicode arrow
	 * terminology.
	 */
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
	/**
	 * A direction is a musical indication that is not attached
	 * to a specific note. Two or more may be combined to
	 * indicate starts and stops of wedges, dashes, etc.
	 *
	 * By default, a series of direction-type elements and a
	 * series of child elements of a direction-type within a
	 * single direction element follow one another in sequence
	 * visually. For a series of direction-type children, non-
	 * positional formatting attributes are carried over from
	 * the previous element by default.
	 */
	export interface Direction extends EditorialVoice, Placement, DirectiveEntity {
	    directionTypes: DirectionType[];
	    staff?: number;
	    offset?: Offset;
	    sound?: Sound;
	}
	/**
	 * Textual direction types may have more than 1 component
	 * due to multiple fonts. The dynamics element may also be
	 * used in the notations element, and is defined in the
	 * common.mod file.
	 */
	export interface DirectionType {
	    percussions?: Percussion[];
	    rehearsals?: Rehearsal[];
	    pedal?: Pedal;
	    principalVoice?: PrincipalVoice;
	    accordionRegistration?: AccordionRegistration;
	    eyeglasses?: Eyeglasses;
	    image?: Image;
	    harpPedals?: HarpPedals;
	    metronome?: Metronome;
	    otherDirection?: OtherDirection;
	    segnos?: Segno[];
	    scordatura?: Scordatura;
	    stringMute?: StringMute;
	    wedge?: Wedge;
	    dashes?: Dashes;
	    damp?: Damp;
	    bracket?: Bracket;
	    dynamics?: Dynamics;
	    octaveShift?: OctaveShift;
	    words?: Words[];
	    dampAll?: DampAll;
	    codas?: Coda[];
	}
	/**
	 * Language is Italian ("it") by default. Enclosure is
	 * square by default. Left justification is assumed if
	 * not specified.
	 */
	export interface Rehearsal extends TextFormatting {
	    data: string;
	}
	/**
	 * Left justification is assumed if not specified.
	 * Language is Italian ("it") by default. Enclosure
	 * is none by default.
	 */
	export interface Words extends TextFormatting {
	    data: string;
	}
	export enum WedgeType {
	    Diminuendo = 1,
	    Crescendo = 0,
	    Stop = 2,
	    Continue = 3,
	}
	/**
	 * Wedge spread is measured in tenths of staff line space.
	 * The type is crescendo for the start of a wedge that is
	 * closed at the left side, and diminuendo for the start
	 * of a wedge that is closed on the right side. Spread
	 * values at the start of a crescendo wedge or end of a
	 * diminuendo wedge are ignored. The niente attribute is yes
	 * if a circle appears at the point of the wedge, indicating
	 * a crescendo from nothing or diminuendo to nothing. It is
	 * no by default, and used only when the type is crescendo,
	 * or the type is stop for a wedge that began with a diminuendo
	 * type. The line-type is solid by default. The continue type
	 * is used for formatting wedges over a system break, or for
	 * other situations where a single wedge is divided into
	 * multiple segments.
	 */
	export interface Wedge extends LineType, DashedFormatting, Position, Color {
	    number?: number;
	    niente?: boolean;
	    type: WedgeType;
	    spread?: number;
	}
	/**
	 * Dashes, used for instance with cresc. and dim. marks.
	 *
	 */
	export interface Dashes extends DashedFormatting, Position, Color {
	    number: number;
	    type: StartStopContinue;
	}
	export enum LineEndType {
	    None = 4,
	    Both = 2,
	    Arrow = 3,
	    Down = 1,
	    Up = 0,
	}
	/**
	 * Brackets are combined with words in a letiety of
	 * modern directions. The line-end attribute specifies
	 * if there is a jog up or down (or both), an arrow,
	 * or nothing at the start or end of the bracket. If
	 * the line-end is up or down, the length of the jog
	 * can be specified using the end-length attribute.
	 * The line-type is solid by default.
	 */
	export interface Bracket extends LineType, DashedFormatting, Position, Color {
	    endLength: number;
	    number: number;
	    type: StartStopContinue;
	    lineEnd: LineEndType;
	}
	export enum PedalType {
	    Change = 3,
	    Start = 0,
	    Stop = 1,
	    Continue = 2,
	}
	/**
	 * Piano pedal marks. The line attribute is yes if pedal
	 * lines are used. The sign attribute is yes if Ped and *
	 * signs are used. For MusicXML 2.0 compatibility, the sign
	 * attribute is yes by default if the line attribute is no,
	 * and is no by default if the line attribute is yes. The
	 * change and continue types are used when the line attribute
	 * is yes. The change type indicates a pedal lift and retake
	 * indicated with an inverted V marking. The continue type
	 * allows more precise formatting across system breaks and for
	 * more complex pedaling lines. The alignment attributes are
	 * ignored if the line attribute is yes.
	 */
	export interface Pedal extends PrintStyleAlign {
	    line: boolean;
	    sign: boolean;
	    type: PedalType;
	}
	/**
	 * Metronome marks and other metric relationships.
	 *
	 * The beat-unit values are the same as for a type element,
	 * and the beat-unit-dot works like the dot element. The
	 * per-minute element can be a number, or a text description
	 * including numbers. The parentheses attribute indicates
	 * whether or not to put the metronome mark in parentheses;
	 * its value is no if not specified. If a font is specified for
	 * the per-minute element, it overrides the font specified for
	 * the overall metronome element. This allows separate
	 * specification of a music font for beat-unit and a text
	 * font for the numeric value in cases where a single
	 * metronome font is not used.
	 *
	 * The metronome-note and metronome-relation elements
	 * allow for the specification of more complicated metric
	 * relationships, such as swing tempo marks where
	 * two eighths are equated to a quarter note / eighth note
	 * triplet. The metronome-type, metronome-beam, and
	 * metronome-dot elements work like the type, beam, and
	 * dot elements. The metronome-tuplet element uses the
	 * same element structure as the time-modification element
	 * along with some attributes from the tuplet element. The
	 * metronome-relation element describes the relationship
	 * symbol that goes between the two sets of metronome-note
	 * elements. The currently allowed value is equals, but this
	 * may expand in future versions. If the element is empty,
	 * the equals value is used. The metronome-relation and
	 * the following set of metronome-note elements are optional
	 * to allow display of an isolated Grundschlagnote.
	 */
	export interface Metronome extends PrintStyleAlign, Justify {
	    metronomeNotes: MetronomeNote[];
	    perMinute: PerMinute;
	    parentheses: boolean;
	    beatUnit: string;
	    beatUnitDots: BeatUnitDot[];
	    beatUnitChange: string;
	    beatUnitDotsChange: BeatUnitDot[];
	    metronomeRelation: string;
	}
	export interface BeatUnitDot {
	}
	export interface PerMinute extends Font {
	    data: string;
	}
	export interface MetronomeNote {
	    metronomeDots: MetronomeDot[];
	    metronomeBeams: MetronomeBeam[];
	    metronomeType: string;
	    metronomeTuplet: MetronomeTuplet;
	}
	export interface MetronomeDot {
	}
	export interface MetronomeBeam {
	    number: number;
	    data: string;
	}
	export interface MetronomeTuplet {
	    actualNotes: number;
	    bracket: boolean;
	    showNumber: ActualBothNone;
	    normalType: string;
	    type: StartStop;
	    normalNotes: number;
	    normalDots: NormalDot[];
	}
	export enum OctaveShiftType {
	    Down = 2,
	    Stop = 3,
	    Up = 1,
	    Continue = 4,
	}
	/**
	 * Octave shifts indicate where notes are shifted up or down
	 * from their true pitched values because of printing
	 * difficulty. Thus a treble clef line noted with 8va will
	 * be indicated with an octave-shift down from the pitch
	 * data indicated in the notes. A size of 8 indicates one
	 * octave; a size of 15 indicates two octaves.
	 */
	export interface OctaveShift extends DashedFormatting, PrintStyle {
	    number: number;
	    size: number;
	    type: OctaveShiftType;
	}
	/**
	 * The harp-pedals element is used to create harp pedal
	 * diagrams. The pedal-step and pedal-alter elements use
	 * the same values as the step and alter elements. For
	 * easiest reading, the pedal-tuning elements should follow
	 * standard harp pedal order, with pedal-step values of
	 * D, C, B, E, F, G, and A.
	 */
	export interface HarpPedals extends PrintStyleAlign {
	    pedalTunings: PedalTuning[];
	}
	export interface PedalTuning {
	    pedalStep: string;
	    pedalAlter: string;
	}
	/**
	 * Harp damping marks
	 */
	export interface Damp extends PrintStyleAlign {
	}
	export interface DampAll extends PrintStyleAlign {
	}
	export interface Eyeglasses extends PrintStyleAlign {
	}
	export interface StringMute extends PrintStyleAlign {
	    type: string;
	}
	/**
	 * Scordatura string tunings are represented by a series
	 * of accord elements. The tuning-step, tuning-alter,
	 * and tuning-octave elements are also used with the
	 * staff-tuning element, and are defined in the common.mod
	 * file. Strings are numbered from high to low.
	 */
	export interface Scordatura {
	    accords: Accord[];
	}
	/**
	 * Scordatura string tunings are represented by a series
	 * of accord elements. The tuning-step, tuning-alter,
	 * and tuning-octave elements are also used with the
	 * staff-tuning element, and are defined in the common.mod
	 * file. Strings are numbered from high to low.
	 */
	export interface Accord {
	    tuningAlter: string;
	    string: string;
	    tuningStep: string;
	    tuningOctave: string;
	}
	/**
	 * The image element is used to include graphical images
	 * in a score. The required source attribute is the URL
	 * for the image file. The required type attribute is the
	 * MIME type for the image file format. Typical choices
	 * include application/postscript, image/gif, image/jpeg,
	 * image/png, and image/tiff.
	 */
	export interface Image extends Position, Halign, ValignImage {
	    type: string;
	    source: string;
	}
	export enum VoiceSymbol {
	    None = 4,
	    Hauptstimme = 1,
	    Nebenstimme = 2,
	    Plain = 3,
	}
	/**
	 * The principal-voice element represents principal and
	 * secondary voices in a score, either for analysis or
	 * for square bracket symbols that appear in a score.
	 * The symbol attribute indicates the type of symbol used at
	 * the start of the principal-voice. Valid values are
	 * Hauptstimme, Nebenstimme, plain (for a plain square
	 * bracket), and none. The content of the principal-voice
	 * element is used for analysis and may be any text value.
	 * When used for analysis separate from any printed score
	 * markings, the symbol attribute should be set to "none".
	 */
	export interface PrincipalVoice extends PrintStyleAlign {
	    symbol: VoiceSymbol;
	    data?: string;
	    type: StartStop;
	}
	/**
	 * The accordion-registration element is use for accordion
	 * registration symbols. These are circular symbols divided
	 * horizontally into high, middle, and low sections that
	 * correspond to 4', 8', and 16' pipes. Each accordion-high,
	 * accordion-middle, and accordion-low element represents
	 * the presence of one or more dots in the registration
	 * diagram. The accordion-middle element may have text
	 * values of 1, 2, or 3, corresponding to have 1 to 3 dots
	 * in the middle section. An accordion-registration element
	 * needs to have at least one of the child elements present.
	 */
	export interface AccordionRegistration extends PrintStyleAlign {
	    accordionMiddle: string;
	    accordionHigh: boolean;
	    accordionLow: boolean;
	}
	/**
	 * The percussion element is used to define percussion
	 * pictogram symbols. Definitions for these symbols can be
	 * found in Kurt Stone's "Music Notation in the Twentieth
	 * Century" on pages 206-212 and 223. Some values are
	 * added to these based on how usage has evolved in
	 * the 30 years since Stone's book was published.
	 */
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
	/**
	 * The timpani element represents the timpani pictogram.
	 *
	 */
	export interface Timpani {
	}
	/**
	 * The beater element represents pictograms for beaters,
	 * mallets, and sticks that do not have different materials
	 * represented in the pictogram. Valid values are bow,
	 * chime hammer, coin, finger, fingernail, fist,
	 * guiro scraper, hammer, hand, jazz stick, knitting needle,
	 * metal hammer, snare stick, spoon mallet, triangle beater,
	 * triangle beater plain, and wire brush. The jazz stick value
	 * refers to Stone's plastic tip snare stick. The triangle
	 * beater plain value refers to the plain line version of the
	 * pictogram. The finger and hammer values are in addition
	 * to Stone's list. The tip attribute represents the direction
	 * in which the tip of a beater points.
	 */
	export interface Beater {
	    data: string;
	    tip: TipDirection;
	}
	/**
	 * The stick element represents pictograms where the material
	 * in the stick, mallet, or beater is included. Valid values
	 * for stick-type are bass drum, double bass drum, timpani,
	 * xylophone, and yarn. Valid values for stick-material are
	 * soft, medium, hard, shaded, and x. The shaded and x values
	 * reflect different uses for brass, wood, and steel core
	 * beaters of different types. The tip attribute represents
	 * the direction in which the tip of a stick points.
	 */
	export interface Stick {
	    stickMaterial: string;
	    stickType: string;
	    tip: TipDirection;
	}
	/**
	 * An offset is represented in terms of divisions, and
	 * indicates where the direction will appear relative to
	 * the current musical location. This affects the visual
	 * appearance of the direction. If the sound attribute is
	 * "yes", then the offset affects playback too. If the sound
	 * attribute is "no", then any sound associated with the
	 * direction takes effect at the current location. The sound
	 * attribute is "no" by default for compatibility with earlier
	 * versions of the MusicXML format. If an element within a
	 * direction includes a default-x attribute, the offset value
	 * will be ignored when determining the appearance of that
	 * element.
	 */
	export interface Offset {
	    data: string;
	    sound: boolean;
	}
	/**
	 * The harmony elements are based on Humdrum's **harm
	 * encoding, extended to support chord symbols in popular
	 * music as well as functional harmony analysis in classical
	 * music.
	 *
	 * If there are alternate harmonies possible, this can be
	 * specified using multiple harmony elements differentiated
	 * by type. Explicit harmonies have all note present in the
	 * music; implied have some notes missing but implied;
	 * alternate represents alternate analyses.
	 *
	 * The harmony object may be used for analysis or for
	 * chord symbols. The print-object attribute controls
	 * whether or not anything is printed due to the harmony
	 * element. The print-frame attribute controls printing
	 * of a frame or fretboard diagram. The print-style entity
	 * sets the default for the harmony, but individual elements
	 * can override this with their own print-style values.
	 *
	 * A harmony element can contain many stacked chords (e.g.
	 * V of II). A sequence of harmony-chord entities is used
	 * for this type of secondary function, where V of II would
	 * be represented by a harmony-chord with a V function
	 * followed by a harmony-chord with a II function.
	 */
	export interface HarmonyChord {
	    root: Root;
	    function: Function;
	    kind: Kind;
	    degrees: Degree[];
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
	    staff: number;
	    type: ExplicitImpliedAlternate;
	    offset: Offset;
	}
	/**
	 * A root is a pitch name like C, D, E, where a function
	 * is an indication like I, II, III. Root is generally
	 * used with pop chord symbols, function with classical
	 * functional harmony. It is an either/or choice to avoid
	 * data inconsistency. Function requires that the key be
	 * specified in the encoding.
	 *
	 * The root element has a root-step and optional root-alter
	 * similar to the step and alter elements in a pitch, but
	 * renamed to distinguish the different musical meanings.
	 * The root-step text element indicates how the root should
	 * appear in a score if not using the element contents.
	 * In some chord styles, this will include the root-alter
	 * information as well. In that case, the print-object
	 * attribute of the root-alter element can be set to no.
	 * The root-alter location attribute indicates whether
	 * the alteration should appear to the left or the right
	 * of the root-step; it is right by default.
	 */
	export interface Root {
	    rootStep: RootStep;
	    rootAlter: RootAlter;
	}
	export interface RootStep extends PrintStyle {
	    text: string;
	    data: string;
	}
	export interface RootAlter extends PrintObject, PrintStyle {
	    location: LeftRight;
	    data: string;
	}
	export interface Function extends PrintStyle {
	    data: string;
	}
	/**
	 * Kind indicates the type of chord. Degree elements
	 * can then add, subtract, or alter from these
	 * starting points. Values include:
	 *
	 * Triads:
	 * major (major third, perfect fifth)
	 * minor (minor third, perfect fifth)
	 * augmented (major third, augmented fifth)
	 * diminished (minor third, diminished fifth)
	 * Sevenths:
	 * dominant (major triad, minor seventh)
	 * major-seventh (major triad, major seventh)
	 * minor-seventh (minor triad, minor seventh)
	 * diminished-seventh
	 *     (diminished triad, diminished seventh)
	 * augmented-seventh
	 *     (augmented triad, minor seventh)
	 * half-diminished
	 *     (diminished triad, minor seventh)
	 * major-minor
	 *     (minor triad, major seventh)
	 * Sixths:
	 * major-sixth (major triad, added sixth)
	 * minor-sixth (minor triad, added sixth)
	 * Ninths:
	 * dominant-ninth (dominant-seventh, major ninth)
	 * major-ninth (major-seventh, major ninth)
	 * minor-ninth (minor-seventh, major ninth)
	 * 11ths (usually as the basis for alteration):
	 * dominant-11th (dominant-ninth, perfect 11th)
	 * major-11th (major-ninth, perfect 11th)
	 * minor-11th (minor-ninth, perfect 11th)
	 * 13ths (usually as the basis for alteration):
	 * dominant-13th (dominant-11th, major 13th)
	 * major-13th (major-11th, major 13th)
	 * minor-13th (minor-11th, major 13th)
	 * Suspended:
	 * suspended-second (major second, perfect fifth)
	 * suspended-fourth (perfect fourth, perfect fifth)
	 * Functional sixths:
	 * Neapolitan
	 * Italian
	 * French
	 * German
	 * Other:
	 * pedal (pedal-point bass)
	 * power (perfect fifth)
	 * Tristan
	 *
	 * The "other" kind is used when the harmony is entirely
	 * composed of add elements. The "none" kind is used to
	 * explicitly encode absence of chords or functional
	 * harmony.
	 *
	 * The attributes are used to indicate the formatting
	 * of the symbol. Since the kind element is the constant
	 * in all the harmony-chord entities that can make up
	 * a polychord, many formatting attributes are here.
	 *
	 * The use-symbols attribute is yes if the kind should be
	 * represented when possible with harmony symbols rather
	 * than letters and numbers. These symbols include:
	 *
	 * major: a triangle, like Unicode 25B3
	 * minor: -, like Unicode 002D
	 * augmented: +, like Unicode 002B
	 * diminished: °, like Unicode 00B0
	 * half-diminished: ø, like Unicode 00F8
	 *
	 * For the major-minor kind, only the minor symbol is used when
	 * use-symbols is yes. The major symbol is set using the symbol
	 * attribute in the degree-value element. The corresponding
	 * degree-alter value will usually be 0 in this case.
	 *
	 * The text attribute describes how the kind should be spelled
	 * in a score. If use-symbols is yes, the value of the text
	 * attribute follows the symbol. The stack-degrees attribute
	 * is yes if the degree elements should be stacked above each
	 * other. The parentheses-degrees attribute is yes if all the
	 * degrees should be in parentheses. The bracket-degrees
	 * attribute is yes if all the degrees should be in a bracket.
	 * If not specified, these values are implementation-specific.
	 * The alignment attributes are for the entire harmony-chord
	 * entity of which this kind element is a part.
	 */
	export interface Kind extends PrintStyle, Halign, Valign {
	    parenthesesDegrees: boolean;
	    useSymbols: boolean;
	    text: string;
	    data: string;
	    stackDegrees: boolean;
	    bracketDegrees: boolean;
	}
	/**
	 * Inversion is a number indicating which inversion is used:
	 * 0 for root position, 1 for first inversion, etc.
	 */
	export interface Inversion extends PrintStyle {
	    data: string;
	}
	/**
	 * Bass is used to indicate a bass note in popular music
	 * chord symbols, e.g. G/C. It is generally not used in
	 * functional harmony, as inversion is generally not used
	 * in pop chord symbols. As with root, it is divided into
	 * step and alter elements, similar to pitches. The attributes
	 * for bass-step and bass-alter work the same way as
	 * the corresponding attributes for root-step and root-alter.
	 */
	export interface Bass {
	    bassStep: BassStep;
	    bassAlter: BassAlter;
	}
	/**
	 * Bass is used to indicate a bass note in popular music
	 * chord symbols, e.g. G/C. It is generally not used in
	 * functional harmony, as inversion is generally not used
	 * in pop chord symbols. As with root, it is divided into
	 * step and alter elements, similar to pitches. The attributes
	 * for bass-step and bass-alter work the same way as
	 * the corresponding attributes for root-step and root-alter.
	 */
	export interface BassStep extends PrintStyle {
	    text: string;
	    data: string;
	}
	export interface BassAlter extends PrintObject, PrintStyle {
	    location: LeftRight;
	    data: string;
	}
	/**
	 * The degree element is used to add, alter, or subtract
	 * individual notes in the chord. The degree-value element
	 * is a number indicating the degree of the chord (1 for
	 * the root, 3 for third, etc). The degree-alter element
	 * is like the alter element in notes: 1 for sharp, -1 for
	 * flat, etc. The degree-type element can be add, alter, or
	 * subtract. If the degree-type is alter or subtract, the
	 * degree-alter is relative to the degree already in the
	 * chord based on its kind element. If the degree-type is
	 * add, the degree-alter is relative to a dominant chord
	 * (major and perfect intervals except for a minor
	 * seventh). The print-object attribute can be used to
	 * keep the degree from printing separately when it has
	 * already taken into account in the text attribute of
	 * the kind element. The plus-minus attribute is used to
	 * indicate if plus and minus symbols should be used
	 * instead of sharp and flat symbols to display the degree
	 * alteration; it is no by default.
	 *
	 * The degree-value and degree-type text attributes specify
	 * how the value and type of the degree should be displayed
	 * in a score. The degree-value symbol attribute indicates
	 * that a symbol should be used in specifying the degree.
	 * If the symbol attribute is present, the value of the text
	 * attribute follows the symbol.
	 *
	 * A harmony of kind "other" can be spelled explicitly by
	 * using a series of degree elements together with a root.
	 */
	export interface Degree extends PrintObject {
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
	export interface DegreeAlter extends PrintStyle {
	    plusMinus: boolean;
	    data: string;
	}
	export interface DegreeType extends PrintStyle {
	    text: string;
	    data: string;
	}
	/**
	 * The frame element represents a frame or fretboard diagram
	 * used together with a chord symbol. The representation is
	 * based on the NIFF guitar grid with additional information.
	 * The frame-strings and frame-frets elements give the
	 * overall size of the frame in vertical lines (strings) and
	 * horizontal spaces (frets).
	 *
	 * The frame element's unplayed attribute indicates what to
	 * display above a string that has no associated frame-note
	 * element. Typical values are x and the empty string. If the
	 * attribute is not present, the display of the unplayed
	 * string is application-defined.
	 */
	export interface Frame extends Position, Color, Halign, ValignImage {
	    frameStrings: string;
	    frameNotes: FrameNote[];
	    unplayed: string;
	    frameFrets: string;
	    firstFret: FirstFret;
	    width: number;
	    height: number;
	}
	/**
	 * The first-fret indicates which fret is shown in the top
	 * space of the frame; it is fret 1 if the element is not
	 * present. The optional text attribute indicates how this
	 * is represented in the fret diagram, while the location
	 * attribute indicates whether the text appears to the left
	 * or right of the frame.
	 */
	export interface FirstFret {
	    text: string;
	    location: LeftRight;
	    data: string;
	}
	/**
	 * The frame-note element represents each note included in
	 * the frame. The definitions for string, fret, and fingering
	 * are found in the common.mod file. An open string will
	 * have a fret value of 0, while a muted string will not be
	 * associated with a frame-note element.
	 */
	export interface FrameNote {
	    barre: Barre;
	    string: String;
	    fingering: Fingering;
	    fret: Fret;
	}
	/**
	 * The barre element indicates placing a finger over
	 * multiple strings on a single fret. The type is "start"
	 * for the lowest pitched string (e.g., the string with
	 * the highest MusicXML number) and is "stop" for the
	 * highest pitched string.
	 */
	export interface Barre extends Color {
	    type: StartStop;
	}
	/**
	 * The grouping element is used for musical analysis. When
	 * the element type is "start" or "single", it usually contains
	 * one or more feature elements. The number attribute is used
	 * for distinguishing between overlapping and hierarchical
	 * groupings. The member-of attribute allows for easy
	 * distinguishing of what grouping elements are in what
	 * hierarchy. Feature elements contained within a "stop"
	 * type of grouping may be ignored.
	 *
	 * This element is flexible to allow for non-standard analyses.
	 * Future versions of the MusicXML format may add elements
	 * that can represent more standardized categories of analysis
	 * data, allowing for easier data sharing.
	 */
	export interface Grouping {
	    features: Feature[];
	    number: number;
	    type: StartStopSingle;
	    memberOf: string;
	    _class?: string;
	}
	export interface Feature {
	    data: string;
	    type: string;
	}
	/**
	 * The print element contains general printing parameters,
	 * including the layout elements defined in the layout.mod
	 * file. The part-name-display and part-abbreviation-display
	 * elements used in the score.mod file may also be used here
	 * to change how a part name or abbreviation is displayed over
	 * the course of a piece. They take effect when the current
	 * measure or a succeeding measure starts a new system.
	 *
	 * The new-system and new-page attributes indicate whether
	 * to force a system or page break, or to force the current
	 * music onto the same system or page as the preceding music.
	 * Normally this is the first music data within a measure.
	 * If used in multi-part music, they should be placed in the
	 * same positions within each part, or the results are
	 * undefined. The page-number attribute sets the number of a
	 * new page; it is ignored if new-page is not "yes". Version
	 * 2.0 adds a blank-page attribute. This is a positive integer
	 * value that specifies the number of blank pages to insert
	 * before the current measure. It is ignored if new-page is
	 * not "yes". These blank pages have no music, but may have
	 * text or images specified by the credit element. This is
	 * used to allow a combination of pages that are all text,
	 * or all text and images, together with pages of music.
	 *
	 * Staff spacing between multiple staves is measured in
	 * tenths of staff lines (e.g. 100 = 10 staff lines). This is
	 * deprecated as of Version 1.1; the staff-layout element
	 * should be used instead. If both are present, the
	 * staff-layout values take priority.
	 *
	 * Layout elements in a print statement only apply to the
	 * current page, system, staff, or measure. Music that
	 * follows continues to take the default values from the
	 * layout included in the defaults element.
	 */
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
	    _class?: string;
	}
	/**
	 * The measure-numbering element describes how measure
	 * numbers are displayed on this part. Values may be none,
	 * measure, or system. The number attribute from the measure
	 * element is used for printing. Measures with an implicit
	 * attribute set to "yes" never display a measure number,
	 * regardless of the measure-numbering setting.
	 */
	export interface MeasureNumbering extends PrintStyleAlign {
	    data: string;
	}
	/**
	 * The sound element contains general playback parameters.
	 * They can stand alone within a part/measure, or be a
	 * component element within a direction.
	 *
	 * Tempo is expressed in quarter notes per minute. If 0,
	 * the sound-generating program should prompt the user at the
	 * time of compiling a sound (MIDI) file.
	 *
	 * Dynamics (or MIDI velocity) are expressed as a percentage
	 * of the default forte value (90 for MIDI 1.0).
	 *
	 * Dacapo indicates to go back to the beginning of the
	 * movement. When used it always has the value "yes".
	 *
	 * Segno and dalsegno are used for backwards jumps to a
	 * segno sign; coda and tocoda are used for forward jumps
	 * to a coda sign. If there are multiple jumps, the value
	 * of these parameters can be used to name and distinguish
	 * them. If segno or coda is used, the divisions attribute
	 * can also be used to indicate the number of divisions
	 * per quarter note. Otherwise sound and MIDI generating
	 * programs may have to recompute this.
	 *
	 * By default, a dalsegno or dacapo attribute indicates that
	 * the jump should occur the first time through, while a
	 * tocoda attribute indicates the jump should occur the second
	 * time through. The time that jumps occur can be changed by
	 * using the time-only attribute.
	 *
	 * Forward-repeat is used when a forward repeat sign is
	 * implied, and usually follows a bar line. When used it
	 * always has the value of "yes".
	 *
	 * The fine attribute follows the final note or rest in a
	 * movement with a da capo or dal segno direction. If numeric,
	 * the value represents the actual duration of the final note or
	 * rest, which can be ambiguous in written notation and
	 * different among parts and voices. The value may also be
	 * "yes" to indicate no change to the final duration.
	 *
	 * If the sound element applies only particular times through a
	 * repeat, the time-only attribute indicates which times to apply
	 * the sound element. The value is a comma-separated list of
	 * positive integers arranged in ascending order, indicating
	 * which times through the repeated section that the element
	 * applies.
	 *
	 * Pizzicato in a sound element effects all following notes.
	 * Yes indicates pizzicato, no indicates arco.
	 *
	 * The pan and elevation attributes are deprecated in
	 * Version 2.0. The pan and elevation elements in
	 * the midi-instrument element should be used instead.
	 * The meaning of the pan and elevation attributes is
	 * the same as for the pan and elevation elements. If
	 * both are present, the mid-instrument elements take
	 * priority.
	 *
	 * The damper-pedal, soft-pedal, and sostenuto-pedal
	 * attributes effect playback of the three common piano
	 * pedals and their MIDI controller equivalents. The yes
	 * value indicates the pedal is depressed; no indicates
	 * the pedal is released. A numeric value from 0 to 100
	 * may also be used for half pedaling. This value is the
	 * percentage that the pedal is depressed. A value of 0 is
	 * equivalent to no, and a value of 100 is equivalent to yes.
	 *
	 * MIDI devices, MIDI instruments, and playback techniques are
	 * changed using the midi-device, midi-instrument, and play
	 * elements defined in the common.mod file. When there are
	 * multiple instances of these elements, they should be grouped
	 * together by instrument using the id attribute values.
	 *
	 * The offset element is used to indicate that the sound takes
	 * place offset from the current score position. If the sound
	 * element is a child of a direction element, the sound offset
	 * element overrides the direction offset element if both
	 * elements are present. Note that the offset reflects the
	 * intended musical position for the change in sound. It
	 * should not be used to compensate for latency issues in
	 * particular hardware configurations.
	 */
	export interface Sound extends TimeOnly {
	    softPedal: string;
	    midiInstruments: MidiInstrument[];
	    pan: string;
	    tocoda: string;
	    decapo: boolean;
	    divisions: number;
	    pizzicato: boolean;
	    coda: string;
	    segno: string;
	    elevation: string;
	    fine: string;
	    damperPedal: string;
	    dynamics: string;
	    plays: Play[];
	    offset: Offset;
	    sostenutoPedal: string;
	    dalsegno: string;
	    midiDevices: MidiDevice[];
	    tempo: string;
	    forwardRepeat: boolean;
	    _class?: string;
	}
	/**
	 * Works and movements are optionally identified by number
	 * and title. The work element also may indicate a link
	 * to the opus document that composes multiple movements
	 * into a collection.
	 */
	export interface Work {
	    workNumber: string;
	    workTitle: string;
	    opus: Opus;
	}
	/**
	 * Ripieno MusicXML does not support this field.
	 */
	export interface Opus {
	}
	/**
	 * Collect score-wide defaults. This includes scaling
	 * and layout, defined in layout.mod, and default values
	 * for the music font, word font, lyric font, and
	 * lyric language. The number and name attributes in
	 * lyric-font and lyric-language elements are typically
	 * used when lyrics are provided in multiple languages.
	 * If the number and name attributes are omitted, the
	 * lyric-font and lyric-language values apply to all
	 * numbers and names.
	 */
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
	export interface MusicFont extends Font {
	}
	export interface WordFont extends Font {
	}
	export interface LyricFont extends Font {
	    number: number;
	    name: string;
	}
	export interface LyricLanguage {
	    number: number;
	    name: string;
	}
	/**
	 * Credit elements refer to the title, composer, arranger,
	 * lyricist, copyright, dedication, and other text that usually
	 * appears on the first page of a score. The credit-words
	 * and credit-image elements are similar to the words and
	 * image elements for directions. However, since the
	 * credit is not part of a measure, the default-x and
	 * default-y attributes adjust the origin relative to the
	 * bottom left-hand corner of the first page. The
	 * enclosure for credit-words is none by default.
	 *
	 * By default, a series of credit-words elements within a
	 * single credit element follow one another in sequence
	 * visually. Non-positional formatting attributes are carried
	 * over from the previous element by default.
	 *
	 * The page attribute for the credit element, new in Version
	 * 2.0, specifies the page number where the credit should
	 * appear. This is an integer value that starts with 1 for the
	 * first page. Its value is 1 by default. Since credits occur
	 * before the music, these page numbers do not refer to the
	 * page numbering specified by the print element's page-number
	 * attribute.
	 */
	export interface Credit {
	    creditTypes: string[];
	    creditWords: CreditWords[];
	    creditImage: CreditImage;
	    page: number;
	}
	export interface CreditWords extends TextFormatting {
	    words: string;
	}
	export interface CreditImage extends Position, Halign, ValignImage {
	    type: string;
	    source: string;
	}
	/**
	 * The part-list identifies the different musical parts in
	 * this movement. Each part has an ID that is used later
	 * within the musical data. Since parts may be encoded
	 * separately and combined later, identification elements
	 * are present at both the score and score-part levels.
	 * There must be at least one score-part, combined as
	 * desired with part-group elements that indicate braces
	 * and brackets. Parts are ordered from top to bottom in
	 * a score based on the order in which they appear in the
	 * part-list.
	 *
	 * Each MusicXML part corresponds to a track in a Standard
	 * MIDI Format 1 file. The score-instrument elements are
	 * used when there are multiple instruments per track.
	 * The midi-device element is used to make a MIDI device
	 * or port assignment for the given track or specific MIDI
	 * instruments. Initial midi-instrument assignments may be
	 * made here as well.
	 */
	export type PartList = Array<ScorePart | PartGroup>;
	export interface ScorePart {
	    identification?: Identification;
	    partNameDisplay?: PartNameDisplay;
	    scoreInstruments?: ScoreInstrument[];
	    midiDevices?: MidiDevice[];
	    partName: PartName;
	    partAbbreviationDisplay?: PartAbbreviationDisplay;
	    partAbbreviation?: PartAbbreviation;
	    groups?: string[];
	    midiInstruments?: MidiInstrument[];
	    id: string;
	    /** Equals "ScorePart" */
	    _class?: string;
	}
	/**
	 * The part-name indicates the full name of the musical part.
	 * The part-abbreviation indicates the abbreviated version of
	 * the name of the musical part. The part-name will often
	 * precede the first system, while the part-abbreviation will
	 * precede the other systems. The formatting attributes for
	 * these elements are deprecated in Version 2.0 in favor of
	 * the new part-name-display and part-abbreviation-display
	 * elements. These are defined in the common.mod file as they
	 * are used in both the part-list and print elements. They
	 * provide more complete formatting control for how part names
	 * and abbreviations appear in a score.
	 */
	export interface PartName extends PrintStyle, PrintObject, Justify {
	    partName: string;
	}
	/**
	 * The part-name indicates the full name of the musical part.
	 * The part-abbreviation indicates the abbreviated version of
	 * the name of the musical part. The part-name will often
	 * precede the first system, while the part-abbreviation will
	 * precede the other systems. The formatting attributes for
	 * these elements are deprecated in Version 2.0 in favor of
	 * the new part-name-display and part-abbreviation-display
	 * elements. These are defined in the common.mod file as they
	 * are used in both the part-list and print elements. They
	 * provide more complete formatting control for how part names
	 * and abbreviations appear in a score.
	 */
	export interface PartAbbreviation extends PrintStyle, PrintObject, Justify {
	    abbreviation: string;
	}
	/**
	 * The part-group element indicates groupings of parts in the
	 * score, usually indicated by braces and brackets. Braces
	 * that are used for multi-staff parts should be defined in
	 * the attributes element for that part.
	 *
	 * A part-group element is not needed for a single multi-staff
	 * part. By default, multi-staff parts include a brace symbol
	 * and (if appropriate given the bar-style) common barlines.
	 * The symbol formatting for a multi-staff part can be more
	 * fully specified using the part-symbol element.
	 */
	export interface PartGroup extends Editorial {
	    groupNameDisplay: GroupNameDisplay;
	    groupSymbol: GroupSymbol;
	    groupName: GroupName;
	    groupAbbreviationDisplay: GroupAbbreviationDisplay;
	    groupBarline: GroupBarline;
	    number: number;
	    groupAbbreviation: GroupAbbreviation;
	    type: StartStop;
	    groupTime: GroupTime;
	    /** Equals "PartGroup" */
	    _class?: string;
	}
	/**
	 * As with parts, groups can have a name and abbreviation.
	 * Formatting attributes for group-name and group-abbreviation
	 * are deprecated in Version 2.0 in favor of the new
	 * group-name-display and group-abbreviation-display elements.
	 */
	export interface GroupName extends PrintStyle, Justify {
	    name: string;
	}
	/**
	 * Formatting specified in the group-name-display and
	 * group-abbreviation-display elements overrides formatting
	 * specified in the group-name and group-abbreviation
	 * elements, respectively.
	 */
	export interface GroupNameDisplay extends PrintObject {
	    name: TextSegment[];
	}
	/**
	 * As with parts, groups can have a name and abbreviation.
	 * Formatting attributes for group-name and group-abbreviation
	 * are deprecated in Version 2.0 in favor of the new
	 * group-name-display and group-abbreviation-display elements.
	 */
	export interface GroupAbbreviation extends PrintStyle, Justify {
	    text: string;
	}
	/**
	 * Formatting specified in the group-name-display and
	 * group-abbreviation-display elements overrides formatting
	 * specified in the group-name and group-abbreviation
	 * elements, respectively.
	 */
	export interface GroupAbbreviationDisplay extends PrintObject {
	    name: TextSegment[];
	}
	/**
	 * The group-symbol element indicates how the symbol for
	 * a group is indicated in the score. Values include none,
	 * brace, line, bracket, and square; the default is none.
	 */
	export interface GroupSymbol extends Position, Color {
	    data: PartSymbolType;
	}
	/**
	 * The group-barline element indicates if the group should
	 * have common barlines. Values can be yes, no, or
	 * Mensurstrich.
	 */
	export interface GroupBarline extends Color {
	    data: string;
	}
	/**
	 * The group-time element indicates that the
	 * displayed time signatures should stretch across all parts
	 * and staves in the group.
	 */
	export interface GroupTime {
	}
	/**
	 * The score-instrument element allows for multiple
	 * instruments per score-part. As with the score-part
	 * element, each score-instrument has a required ID
	 * attribute, a name, and an optional abbreviation. The
	 * instrument-name and instrument-abbreviation are
	 * typically used within a software application, rather
	 * than appearing on the printed page of a score.
	 *
	 * A score-instrument element is also required if the
	 * score specifies MIDI 1.0 channels, banks, or programs.
	 * An initial midi-instrument assignment can also
	 * be made here.
	 *
	 * The instrument-sound and virtual-instrument elements
	 * are new as of Version 3.0. The instrument-sound element
	 * describes the default timbre of the score-instrument. This
	 * description is independent of a particular virtual or
	 * MIDI instrument specification and allows playback to be
	 * shared more easily between applications and libraries.
	 * The virtual-instrument element defines a specific virtual
	 * instrument used for an instrument sound. The
	 * virtual-library element indicates the virtual instrument
	 * library name, and the virtual-name element indicates the
	 * library-specific name for the virtual instrument.
	 *
	 * The solo and ensemble elements are new as of Version
	 * 2.0. The solo element is present if performance is
	 * intended by a solo instrument. The ensemble element
	 * is present if performance is intended by an ensemble
	 * such as an orchestral section. The text of the
	 * ensemble element contains the size of the section,
	 * or is empty if the ensemble size is not specified.
	 *
	 * The midi-instrument element is defined in the common.mod
	 * file, as it can be used within both the score-part and
	 * sound elements.
	 */
	export interface ScoreInstrument {
	    instrumentName: string;
	    instrumentSound?: string;
	    ensemble?: string;
	    virtualInstrument?: VirtualInstrument;
	    instrumentAbbreviation?: string;
	    solo?: Solo;
	    id: string;
	}
	export interface Solo {
	}
	export interface VirtualInstrument {
	    virtualLibrary: string;
	    virtualName: string;
	}
	/**
	 * The score-header entity contains basic score metadata
	 * about the work and movement, score-wide defaults for
	 * layout and fonts, credits that appear on the first page,
	 * and the part list.
	 */
	export interface ScoreHeader {
	    movementTitle: string;
	    identification: Identification;
	    defaults: Defaults;
	    work: Work;
	    credits: Credit[];
	    partList: PartList;
	    movementNumber: string;
	}
	/**
	 * The score is the root element for the DTD. It includes
	 * the score-header entity, followed by a series of
	 * measures with parts inside.
	 *
	 * See also score-partwise.
	 */
	export interface ScoreTimewise extends DocumentAttributes, ScoreHeader {
	    measures: Measure[];
	}
	/**
	 * Represents a measure.
	 */
	export interface Measure {
	    number: string;
	    implicit?: boolean;
	    width?: number;
	    parts: {
	        [key: string]: any[];
	    };
	    nonControlling?: boolean;
	}

}
declare module 'musicxml-interfaces/operations' {
	/**
	 * This file has specs for the operations defined in the JSON0 OT Type spec.
	 * https://github.com/ottypes/json0
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation the
	 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	 * sell copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following condition:
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */
	/**
	 * A path to an element in a JSON document.
	 */
	export type OTPath = (number | string)[];
	/**
	 * Adds x to the number at path
	 */
	export interface INumberAdd {
	    /**
	     * Path to a number.
	     */
	    p: OTPath;
	    /**
	     * The number to add to the number at `p`.
	     */
	    na: number;
	}
	/**
	 * Inserts the object obj before the item at idx in the list at [path].
	 */
	export interface IListInsert<T> {
	    /**
	     * [...path, idx]
	     */
	    p: OTPath;
	    /**
	     * The object to insert before the item at idx `idx`.
	     */
	    li: T;
	}
	/**
	 * Deletes the object obj from the index idx in the list at [path].
	 */
	export interface IListDelete<T> {
	    /**
	     * [...path, idx]
	     */
	    p: OTPath;
	    /**
	     * The object that will be removed at `idx`, for invertibility.
	     */
	    ld: T;
	}
	/**
	 * Replaces the object before at the index idx in the list at [path] with the object after.
	 */
	export interface IListReplace<T> {
	    /**
	     * [...path, idx]
	     */
	    p: OTPath;
	    /**
	     * The object that will be removed at `idx`, for invertibility.
	     */
	    ld: T;
	    /**
	     * The object that will be added to `idx`.
	     */
	    li: T;
	}
	/**
	 * Moves the object at idx1 such that the object will be at index idx2 in the list at [path].
	 */
	export interface IListMove {
	    /**
	     * [...path, idx]
	     */
	    p: OTPath;
	    /**
	     * The index to move the object to ("idx2")
	     */
	    lm: number;
	}
	/**
	 * Inserts the object obj into the object at [path] with key key.
	 */
	export interface IObjectInsert<T> {
	    /**
	     * [...path, key: string]
	     */
	    p: OTPath;
	    /**
	     * The object to insert
	     */
	    oi: T;
	}
	/**
	 * Deletes the object obj with key key from the object at [path].
	 */
	export interface IObjectDelete<T> {
	    /**
	     * [...path, key: string]
	     */
	    p: OTPath;
	    /**
	     * The object to delete, for invertibility
	     */
	    od: T;
	}
	/**
	 * Replaces the object before with the object after at key key in the object at [path].
	 */
	export interface IObjectReplace<T> {
	    /**
	     * [...path, key: string]
	     */
	    p: OTPath;
	    /**
	     * The object to delete, for invertibility.
	     */
	    od: T;
	    /**
	     * The object to insert at key.
	     */
	    oi: T;
	}
	/**
	 * Applies the subtype op o of type t to the object at [path].
	 */
	export interface IObjectApply {
	    /**
	     * [...path, key: string] to subtype
	     */
	    p: OTPath;
	    /**
	     * The subtype
	     */
	    t: any;
	    /**
	     * The operation.
	     */
	    o: any;
	}
	/**
	 * Inserts the string s at offset offset into the string at [path] (uses subtypes internally).
	 */
	export interface IStringInsert {
	    /**
	     * Path to string
	     */
	    p: OTPath;
	    si: string;
	}
	export interface IStringDelete {
	    /**
	     * Path to string
	     */
	    p: OTPath;
	    /**
	     * The string being removed, for length and invertibility
	     */
	    sd: string;
	}
	export type Operation<T> = INumberAdd | IListInsert<T> | IListDelete<T> | IListReplace<T> | IListMove | IObjectInsert<T> | IObjectDelete<T> | IObjectReplace<T> | IObjectApply | IStringInsert | IStringDelete;
	export interface IAny {
	    /**
	     * Path to string
	     */
	    p: OTPath;
	    si?: string;
	    sd?: string;
	    na?: number;
	    li?: any;
	    ld?: any;
	    lm?: string;
	    od?: any;
	    oi?: any;
	    t?: any;
	    o?: any;
	}
	export function invert(ops: IAny[]): IAny[];

}
declare module 'musicxml-interfaces/builders' {
	import { StartStop, StartStopContinue, StartStopSingle, SymbolSize, AboveBelow, OverUnder, UpDown, TopBottom, LeftRight, EnclosureShape, NormalItalic, NormalBold, LeftCenterRight, TopMiddleBottomBaseline, DirectionMode, StraightCurved, SolidDashedDottedWavy, NormalAngledSquare, UprightInverted, UpperMainBelow, WholeHalfUnison, WholeHalfNone, OddEvenBoth, CueGraceLarge, SeparatorType, TimeSymbolType, CancelLocation, PartSymbolType, ShowFretsType, Count, MxmlAccidental, StemType, NoteheadType, BeamType, AccelRitNone, ActualBothNone, HoleLocation, HoleClosedType, BreathMarkType, SyllabicType, BarlineLocation, BarStyleType, StartStopDiscontinue, WingedType, DirectionTypeBg, TipDirection, WedgeType, LineEndType, PedalType, OctaveShiftType, VoiceSymbol, ExplicitImpliedAlternate, ChordType, TextSegment, EncodingDate, CalendarDate, Position, Placement, Orientation, DirectiveEntity, Bezier, Font, Color, TextDecoration, Justify, Halign, Valign, ValignImage, LetterSpacing, LineHeight, TextDirection, TextRotation, Enclosure, PrintStyle, PrintStyleAlign, LineShape, LineType, DashedFormatting, PrintObject, PrintSpacing, Printout, TextFormatting, LevelDisplay, TrillSound, BendSound, TimeOnly, DocumentAttributes, Editorial, EditorialVoice, Footnote, Level, Fermata, WavyLine, Segno, Coda, NormalDot, Dynamics, Fingering, Fret, String, DisplayText, AccidentalText, PartNameDisplay, PartAbbreviationDisplay, MidiDevice, MidiInstrument, Play, OtherPlay, Scaling, PageMargins, PageLayout, SystemLayout, SystemMargins, SystemDividers, LeftDivider, RightDivider, StaffLayout, MeasureLayout, LineWidth, NoteSize, Distance, Appearance, Creator, Rights, Encoder, Relation, MiscellaneousField, Miscellaneous, Identification, Supports, Encoding, TimeSeparator, TimeSymbol, Cancel, KeyOctave, Key, Time, Interchangeable, PartSymbol, Clef, StaffTuning, StaffDetails, Double, Transpose, Directive, SlashDot, MultipleRest, MeasureRepeat, BeatRepeat, Slash, MeasureStyle, Attributes, Cue, Grace, Chord, Unpitched, Pitch, FullNote, Rest, Tie, Instrument, Note, Type, Dot, Accidental, TimeModification, Stem, Notehead, NoteheadText, Beam, Notations, Tied, Slur, Tuplet, TupletActual, TupletNormal, TupletNumber, TupletType, TupletDot, Glissando, Slide, OtherNotation, OtherDirection, Ornaments, TrillMark, Turn, DelayedTurn, InvertedTurn, DelayedInvertedTurn, VerticalTurn, Shake, Mordent, InvertedMordent, Schleifer, Tremolo, OtherOrnament, AccidentalMark, Technical, UpBow, DownBow, Harmonic, OpenString, ThumbPosition, Pluck, DoubleTongue, TripleTongue, Stopped, SnapPizzicato, HammerOn, PullOff, Bend, WithBar, Tap, Heel, Toe, Fingernails, Hole, HoleClosed, Arrow, Handbell, OtherTechnical, Articulations, Accent, StrongAccent, Staccato, Tenuto, DetachedLegato, Staccatissimo, Spiccato, Scoop, Plop, Doit, Falloff, BreathMark, Caesura, Stress, Unstress, OtherArticulation, Arpeggiate, NonArpeggiate, Laughing, Humming, EndLine, EndParagraph, LyricParts, Lyric, Text, Syllabic, Elision, Extend, FiguredBass, Figure, Prefix, FigureNumber, Suffix, Backup, Forward, Barline, BarStyle, Ending, Repeat, Direction, DirectionType, Rehearsal, Words, Wedge, Dashes, Bracket, Pedal, Metronome, BeatUnitDot, PerMinute, MetronomeNote, MetronomeDot, MetronomeBeam, MetronomeTuplet, OctaveShift, HarpPedals, PedalTuning, Damp, DampAll, Eyeglasses, StringMute, Scordatura, Accord, Image, PrincipalVoice, AccordionRegistration, Percussion, Timpani, Beater, Stick, Offset, HarmonyChord, Harmony, Root, RootStep, RootAlter, Function, Kind, Inversion, Bass, BassStep, BassAlter, Degree, DegreeValue, DegreeAlter, DegreeType, Frame, FirstFret, FrameNote, Barre, Grouping, Feature, Print, MeasureNumbering, Sound, Work, Opus, Defaults, MusicFont, WordFont, LyricFont, LyricLanguage, Credit, CreditWords, CreditImage, ScorePart, PartName, PartAbbreviation, PartGroup, GroupName, GroupNameDisplay, GroupAbbreviation, GroupAbbreviationDisplay, GroupSymbol, GroupBarline, GroupTime, ScoreInstrument, Solo, VirtualInstrument, ScoreHeader, ScoreTimewise, Measure, PartList } from 'musicxml-interfaces/index';
	import { IAny } from 'musicxml-interfaces/operations';
	export interface ITextSegmentBuilder {
	    build?: () => TextSegment;
	    patch: () => IAny[];
	    acc: (build: AccidentalText | ((builder: IAccidentalTextBuilder) => IAccidentalTextBuilder)) => ITextSegmentBuilder;
	    text: (build: DisplayText | ((builder: IDisplayTextBuilder) => IDisplayTextBuilder)) => ITextSegmentBuilder;
	}
	export function patchTextSegment(base: TextSegment, builder: (build: ITextSegmentBuilder) => ITextSegmentBuilder): IAny[];
	export function buildTextSegment(builder: (build: ITextSegmentBuilder) => ITextSegmentBuilder): TextSegment;
	export interface IEncodingDateBuilder {
	    build?: () => EncodingDate;
	    patch: () => IAny[];
	    month: (month: number) => IEncodingDateBuilder;
	    day: (day: number) => IEncodingDateBuilder;
	    year: (year: number) => IEncodingDateBuilder;
	}
	export function patchEncodingDate(base: EncodingDate, builder: (build: IEncodingDateBuilder) => IEncodingDateBuilder): IAny[];
	export function buildEncodingDate(builder: (build: IEncodingDateBuilder) => IEncodingDateBuilder): EncodingDate;
	export interface ICalendarDateBuilder {
	    build?: () => CalendarDate;
	    patch: () => IAny[];
	    month: (month: number) => ICalendarDateBuilder;
	    day: (day: number) => ICalendarDateBuilder;
	    year: (year: number) => ICalendarDateBuilder;
	}
	export function patchCalendarDate(base: CalendarDate, builder: (build: ICalendarDateBuilder) => ICalendarDateBuilder): IAny[];
	export function buildCalendarDate(builder: (build: ICalendarDateBuilder) => ICalendarDateBuilder): CalendarDate;
	export interface IPositionBuilder {
	    build?: () => Position;
	    patch: () => IAny[];
	    defaultX: (defaultX: number) => IPositionBuilder;
	    relativeY: (relativeY: number) => IPositionBuilder;
	    defaultY: (defaultY: number) => IPositionBuilder;
	    relativeX: (relativeX: number) => IPositionBuilder;
	}
	export function patchPosition(base: Position, builder: (build: IPositionBuilder) => IPositionBuilder): IAny[];
	export function buildPosition(builder: (build: IPositionBuilder) => IPositionBuilder): Position;
	export interface IPlacementBuilder {
	    build?: () => Placement;
	    patch: () => IAny[];
	    placement: (placement: AboveBelow) => IPlacementBuilder;
	}
	export function patchPlacement(base: Placement, builder: (build: IPlacementBuilder) => IPlacementBuilder): IAny[];
	export function buildPlacement(builder: (build: IPlacementBuilder) => IPlacementBuilder): Placement;
	export interface IOrientationBuilder {
	    build?: () => Orientation;
	    patch: () => IAny[];
	    orientation: (orientation: OverUnder) => IOrientationBuilder;
	}
	export function patchOrientation(base: Orientation, builder: (build: IOrientationBuilder) => IOrientationBuilder): IAny[];
	export function buildOrientation(builder: (build: IOrientationBuilder) => IOrientationBuilder): Orientation;
	export interface IDirectiveEntityBuilder {
	    build?: () => DirectiveEntity;
	    patch: () => IAny[];
	    directive: (directive: boolean) => IDirectiveEntityBuilder;
	}
	export function patchDirectiveEntity(base: DirectiveEntity, builder: (build: IDirectiveEntityBuilder) => IDirectiveEntityBuilder): IAny[];
	export function buildDirectiveEntity(builder: (build: IDirectiveEntityBuilder) => IDirectiveEntityBuilder): DirectiveEntity;
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
	export function patchBezier(base: Bezier, builder: (build: IBezierBuilder) => IBezierBuilder): IAny[];
	export function buildBezier(builder: (build: IBezierBuilder) => IBezierBuilder): Bezier;
	export interface IFontBuilder {
	    build?: () => Font;
	    patch: () => IAny[];
	    fontFamily: (fontFamily: string) => IFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IFontBuilder;
	    fontSize: (fontSize: string) => IFontBuilder;
	}
	export function patchFont(base: Font, builder: (build: IFontBuilder) => IFontBuilder): IAny[];
	export function buildFont(builder: (build: IFontBuilder) => IFontBuilder): Font;
	export interface IColorBuilder {
	    build?: () => Color;
	    patch: () => IAny[];
	    color: (color: string) => IColorBuilder;
	}
	export function patchColor(base: Color, builder: (build: IColorBuilder) => IColorBuilder): IAny[];
	export function buildColor(builder: (build: IColorBuilder) => IColorBuilder): Color;
	export interface ITextDecorationBuilder {
	    build?: () => TextDecoration;
	    patch: () => IAny[];
	    underline: (underline: number) => ITextDecorationBuilder;
	    overline: (overline: number) => ITextDecorationBuilder;
	    lineThrough: (lineThrough: number) => ITextDecorationBuilder;
	}
	export function patchTextDecoration(base: TextDecoration, builder: (build: ITextDecorationBuilder) => ITextDecorationBuilder): IAny[];
	export function buildTextDecoration(builder: (build: ITextDecorationBuilder) => ITextDecorationBuilder): TextDecoration;
	export interface IJustifyBuilder {
	    build?: () => Justify;
	    patch: () => IAny[];
	    justify: (justify: LeftCenterRight) => IJustifyBuilder;
	}
	export function patchJustify(base: Justify, builder: (build: IJustifyBuilder) => IJustifyBuilder): IAny[];
	export function buildJustify(builder: (build: IJustifyBuilder) => IJustifyBuilder): Justify;
	export interface IHalignBuilder {
	    build?: () => Halign;
	    patch: () => IAny[];
	    halign: (halign: LeftCenterRight) => IHalignBuilder;
	}
	export function patchHalign(base: Halign, builder: (build: IHalignBuilder) => IHalignBuilder): IAny[];
	export function buildHalign(builder: (build: IHalignBuilder) => IHalignBuilder): Halign;
	export interface IValignBuilder {
	    build?: () => Valign;
	    patch: () => IAny[];
	    valign: (valign: TopMiddleBottomBaseline) => IValignBuilder;
	}
	export function patchValign(base: Valign, builder: (build: IValignBuilder) => IValignBuilder): IAny[];
	export function buildValign(builder: (build: IValignBuilder) => IValignBuilder): Valign;
	export interface IValignImageBuilder {
	    build?: () => ValignImage;
	    patch: () => IAny[];
	    valignImage: (valignImage: TopMiddleBottomBaseline) => IValignImageBuilder;
	}
	export function patchValignImage(base: ValignImage, builder: (build: IValignImageBuilder) => IValignImageBuilder): IAny[];
	export function buildValignImage(builder: (build: IValignImageBuilder) => IValignImageBuilder): ValignImage;
	export interface ILetterSpacingBuilder {
	    build?: () => LetterSpacing;
	    patch: () => IAny[];
	    letterSpacing: (letterSpacing: string) => ILetterSpacingBuilder;
	}
	export function patchLetterSpacing(base: LetterSpacing, builder: (build: ILetterSpacingBuilder) => ILetterSpacingBuilder): IAny[];
	export function buildLetterSpacing(builder: (build: ILetterSpacingBuilder) => ILetterSpacingBuilder): LetterSpacing;
	export interface ILineHeightBuilder {
	    build?: () => LineHeight;
	    patch: () => IAny[];
	    lineHeight: (lineHeight: string) => ILineHeightBuilder;
	}
	export function patchLineHeight(base: LineHeight, builder: (build: ILineHeightBuilder) => ILineHeightBuilder): IAny[];
	export function buildLineHeight(builder: (build: ILineHeightBuilder) => ILineHeightBuilder): LineHeight;
	export interface ITextDirectionBuilder {
	    build?: () => TextDirection;
	    patch: () => IAny[];
	    dir: (dir: DirectionMode) => ITextDirectionBuilder;
	}
	export function patchTextDirection(base: TextDirection, builder: (build: ITextDirectionBuilder) => ITextDirectionBuilder): IAny[];
	export function buildTextDirection(builder: (build: ITextDirectionBuilder) => ITextDirectionBuilder): TextDirection;
	export interface ITextRotationBuilder {
	    build?: () => TextRotation;
	    patch: () => IAny[];
	    rotation: (rotation: number) => ITextRotationBuilder;
	}
	export function patchTextRotation(base: TextRotation, builder: (build: ITextRotationBuilder) => ITextRotationBuilder): IAny[];
	export function buildTextRotation(builder: (build: ITextRotationBuilder) => ITextRotationBuilder): TextRotation;
	export interface IEnclosureBuilder {
	    build?: () => Enclosure;
	    patch: () => IAny[];
	    enclosure: (enclosure: EnclosureShape) => IEnclosureBuilder;
	}
	export function patchEnclosure(base: Enclosure, builder: (build: IEnclosureBuilder) => IEnclosureBuilder): IAny[];
	export function buildEnclosure(builder: (build: IEnclosureBuilder) => IEnclosureBuilder): Enclosure;
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
	export function patchPrintStyle(base: PrintStyle, builder: (build: IPrintStyleBuilder) => IPrintStyleBuilder): IAny[];
	export function buildPrintStyle(builder: (build: IPrintStyleBuilder) => IPrintStyleBuilder): PrintStyle;
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
	export function patchPrintStyleAlign(base: PrintStyleAlign, builder: (build: IPrintStyleAlignBuilder) => IPrintStyleAlignBuilder): IAny[];
	export function buildPrintStyleAlign(builder: (build: IPrintStyleAlignBuilder) => IPrintStyleAlignBuilder): PrintStyleAlign;
	export interface ILineShapeBuilder {
	    build?: () => LineShape;
	    patch: () => IAny[];
	    lineShape: (lineShape: StraightCurved) => ILineShapeBuilder;
	}
	export function patchLineShape(base: LineShape, builder: (build: ILineShapeBuilder) => ILineShapeBuilder): IAny[];
	export function buildLineShape(builder: (build: ILineShapeBuilder) => ILineShapeBuilder): LineShape;
	export interface ILineTypeBuilder {
	    build?: () => LineType;
	    patch: () => IAny[];
	    lineType: (lineType: SolidDashedDottedWavy) => ILineTypeBuilder;
	}
	export function patchLineType(base: LineType, builder: (build: ILineTypeBuilder) => ILineTypeBuilder): IAny[];
	export function buildLineType(builder: (build: ILineTypeBuilder) => ILineTypeBuilder): LineType;
	export interface IDashedFormattingBuilder {
	    build?: () => DashedFormatting;
	    patch: () => IAny[];
	    dashLength: (dashLength: number) => IDashedFormattingBuilder;
	    spaceLength: (spaceLength: number) => IDashedFormattingBuilder;
	}
	export function patchDashedFormatting(base: DashedFormatting, builder: (build: IDashedFormattingBuilder) => IDashedFormattingBuilder): IAny[];
	export function buildDashedFormatting(builder: (build: IDashedFormattingBuilder) => IDashedFormattingBuilder): DashedFormatting;
	export interface IPrintObjectBuilder {
	    build?: () => PrintObject;
	    patch: () => IAny[];
	    printObject: (printObject: boolean) => IPrintObjectBuilder;
	}
	export function patchPrintObject(base: PrintObject, builder: (build: IPrintObjectBuilder) => IPrintObjectBuilder): IAny[];
	export function buildPrintObject(builder: (build: IPrintObjectBuilder) => IPrintObjectBuilder): PrintObject;
	export interface IPrintSpacingBuilder {
	    build?: () => PrintSpacing;
	    patch: () => IAny[];
	    printSpacing: (printSpacing: boolean) => IPrintSpacingBuilder;
	}
	export function patchPrintSpacing(base: PrintSpacing, builder: (build: IPrintSpacingBuilder) => IPrintSpacingBuilder): IAny[];
	export function buildPrintSpacing(builder: (build: IPrintSpacingBuilder) => IPrintSpacingBuilder): PrintSpacing;
	export interface IPrintoutBuilder {
	    build?: () => Printout;
	    patch: () => IAny[];
	    printDot: (printDot: boolean) => IPrintoutBuilder;
	    printLyric: (printLyric: boolean) => IPrintoutBuilder;
	    printObject: (printObject: boolean) => IPrintoutBuilder;
	    printSpacing: (printSpacing: boolean) => IPrintoutBuilder;
	}
	export function patchPrintout(base: Printout, builder: (build: IPrintoutBuilder) => IPrintoutBuilder): IAny[];
	export function buildPrintout(builder: (build: IPrintoutBuilder) => IPrintoutBuilder): Printout;
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
	export function patchTextFormatting(base: TextFormatting, builder: (build: ITextFormattingBuilder) => ITextFormattingBuilder): IAny[];
	export function buildTextFormatting(builder: (build: ITextFormattingBuilder) => ITextFormattingBuilder): TextFormatting;
	export interface ILevelDisplayBuilder {
	    build?: () => LevelDisplay;
	    patch: () => IAny[];
	    bracket: (bracket: boolean) => ILevelDisplayBuilder;
	    size: (size: SymbolSize) => ILevelDisplayBuilder;
	    parentheses: (parentheses: boolean) => ILevelDisplayBuilder;
	}
	export function patchLevelDisplay(base: LevelDisplay, builder: (build: ILevelDisplayBuilder) => ILevelDisplayBuilder): IAny[];
	export function buildLevelDisplay(builder: (build: ILevelDisplayBuilder) => ILevelDisplayBuilder): LevelDisplay;
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
	export function patchTrillSound(base: TrillSound, builder: (build: ITrillSoundBuilder) => ITrillSoundBuilder): IAny[];
	export function buildTrillSound(builder: (build: ITrillSoundBuilder) => ITrillSoundBuilder): TrillSound;
	export interface IBendSoundBuilder {
	    build?: () => BendSound;
	    patch: () => IAny[];
	    accelerate: (accelerate: boolean) => IBendSoundBuilder;
	    beats: (beats: number) => IBendSoundBuilder;
	    firstBeat: (firstBeat: number) => IBendSoundBuilder;
	    lastBeat: (lastBeat: number) => IBendSoundBuilder;
	}
	export function patchBendSound(base: BendSound, builder: (build: IBendSoundBuilder) => IBendSoundBuilder): IAny[];
	export function buildBendSound(builder: (build: IBendSoundBuilder) => IBendSoundBuilder): BendSound;
	export interface ITimeOnlyBuilder {
	    build?: () => TimeOnly;
	    patch: () => IAny[];
	    timeOnly: (timeOnly: string) => ITimeOnlyBuilder;
	}
	export function patchTimeOnly(base: TimeOnly, builder: (build: ITimeOnlyBuilder) => ITimeOnlyBuilder): IAny[];
	export function buildTimeOnly(builder: (build: ITimeOnlyBuilder) => ITimeOnlyBuilder): TimeOnly;
	export interface IDocumentAttributesBuilder {
	    build?: () => DocumentAttributes;
	    patch: () => IAny[];
	    version: (version: string) => IDocumentAttributesBuilder;
	}
	export function patchDocumentAttributes(base: DocumentAttributes, builder: (build: IDocumentAttributesBuilder) => IDocumentAttributesBuilder): IAny[];
	export function buildDocumentAttributes(builder: (build: IDocumentAttributesBuilder) => IDocumentAttributesBuilder): DocumentAttributes;
	export interface IEditorialBuilder {
	    build?: () => Editorial;
	    patch: () => IAny[];
	    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IEditorialBuilder;
	    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IEditorialBuilder;
	}
	export function patchEditorial(base: Editorial, builder: (build: IEditorialBuilder) => IEditorialBuilder): IAny[];
	export function buildEditorial(builder: (build: IEditorialBuilder) => IEditorialBuilder): Editorial;
	export interface IEditorialVoiceBuilder {
	    build?: () => EditorialVoice;
	    patch: () => IAny[];
	    voice: (voice: number) => IEditorialVoiceBuilder;
	    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IEditorialVoiceBuilder;
	    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IEditorialVoiceBuilder;
	}
	export function patchEditorialVoice(base: EditorialVoice, builder: (build: IEditorialVoiceBuilder) => IEditorialVoiceBuilder): IAny[];
	export function buildEditorialVoice(builder: (build: IEditorialVoiceBuilder) => IEditorialVoiceBuilder): EditorialVoice;
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
	export function patchFootnote(base: Footnote, builder: (build: IFootnoteBuilder) => IFootnoteBuilder): IAny[];
	export function buildFootnote(builder: (build: IFootnoteBuilder) => IFootnoteBuilder): Footnote;
	export interface ILevelBuilder {
	    build?: () => Level;
	    patch: () => IAny[];
	    text: (text: string) => ILevelBuilder;
	    reference: (reference: boolean) => ILevelBuilder;
	    bracket: (bracket: boolean) => ILevelBuilder;
	    size: (size: SymbolSize) => ILevelBuilder;
	    parentheses: (parentheses: boolean) => ILevelBuilder;
	}
	export function patchLevel(base: Level, builder: (build: ILevelBuilder) => ILevelBuilder): IAny[];
	export function buildLevel(builder: (build: ILevelBuilder) => ILevelBuilder): Level;
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
	export function patchFermata(base: Fermata, builder: (build: IFermataBuilder) => IFermataBuilder): IAny[];
	export function buildFermata(builder: (build: IFermataBuilder) => IFermataBuilder): Fermata;
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
	export function patchWavyLine(base: WavyLine, builder: (build: IWavyLineBuilder) => IWavyLineBuilder): IAny[];
	export function buildWavyLine(builder: (build: IWavyLineBuilder) => IWavyLineBuilder): WavyLine;
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
	export function patchSegno(base: Segno, builder: (build: ISegnoBuilder) => ISegnoBuilder): IAny[];
	export function buildSegno(builder: (build: ISegnoBuilder) => ISegnoBuilder): Segno;
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
	export function patchCoda(base: Coda, builder: (build: ICodaBuilder) => ICodaBuilder): IAny[];
	export function buildCoda(builder: (build: ICodaBuilder) => ICodaBuilder): Coda;
	export interface INormalDotBuilder {
	    build?: () => NormalDot;
	    patch: () => IAny[];
	}
	export function patchNormalDot(base: NormalDot, builder: (build: INormalDotBuilder) => INormalDotBuilder): IAny[];
	export function buildNormalDot(builder: (build: INormalDotBuilder) => INormalDotBuilder): NormalDot;
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
	export function patchDynamics(base: Dynamics, builder: (build: IDynamicsBuilder) => IDynamicsBuilder): IAny[];
	export function buildDynamics(builder: (build: IDynamicsBuilder) => IDynamicsBuilder): Dynamics;
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
	export function patchFingering(base: Fingering, builder: (build: IFingeringBuilder) => IFingeringBuilder): IAny[];
	export function buildFingering(builder: (build: IFingeringBuilder) => IFingeringBuilder): Fingering;
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
	export function patchFret(base: Fret, builder: (build: IFretBuilder) => IFretBuilder): IAny[];
	export function buildFret(builder: (build: IFretBuilder) => IFretBuilder): Fret;
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
	export function patchString(base: String, builder: (build: IStringBuilder) => IStringBuilder): IAny[];
	export function buildString(builder: (build: IStringBuilder) => IStringBuilder): String;
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
	export function patchDisplayText(base: DisplayText, builder: (build: IDisplayTextBuilder) => IDisplayTextBuilder): IAny[];
	export function buildDisplayText(builder: (build: IDisplayTextBuilder) => IDisplayTextBuilder): DisplayText;
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
	export function patchAccidentalText(base: AccidentalText, builder: (build: IAccidentalTextBuilder) => IAccidentalTextBuilder): IAny[];
	export function buildAccidentalText(builder: (build: IAccidentalTextBuilder) => IAccidentalTextBuilder): AccidentalText;
	export interface IPartNameDisplayBuilder {
	    build?: () => PartNameDisplay;
	    patch: () => IAny[];
	    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IPartNameDisplayBuilder;
	    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IPartNameDisplayBuilder;
	    name: (name: TextSegment[]) => IPartNameDisplayBuilder;
	    printObject: (printObject: boolean) => IPartNameDisplayBuilder;
	}
	export function patchPartNameDisplay(base: PartNameDisplay, builder: (build: IPartNameDisplayBuilder) => IPartNameDisplayBuilder): IAny[];
	export function buildPartNameDisplay(builder: (build: IPartNameDisplayBuilder) => IPartNameDisplayBuilder): PartNameDisplay;
	export interface IPartAbbreviationDisplayBuilder {
	    build?: () => PartAbbreviationDisplay;
	    patch: () => IAny[];
	    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IPartAbbreviationDisplayBuilder;
	    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IPartAbbreviationDisplayBuilder;
	    name: (name: TextSegment[]) => IPartAbbreviationDisplayBuilder;
	    printObject: (printObject: boolean) => IPartAbbreviationDisplayBuilder;
	}
	export function patchPartAbbreviationDisplay(base: PartAbbreviationDisplay, builder: (build: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder): IAny[];
	export function buildPartAbbreviationDisplay(builder: (build: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder): PartAbbreviationDisplay;
	export interface IMidiDeviceBuilder {
	    build?: () => MidiDevice;
	    patch: () => IAny[];
	    port: (port: number) => IMidiDeviceBuilder;
	    deviceName: (deviceName: string) => IMidiDeviceBuilder;
	    id: (id: number) => IMidiDeviceBuilder;
	}
	export function patchMidiDevice(base: MidiDevice, builder: (build: IMidiDeviceBuilder) => IMidiDeviceBuilder): IAny[];
	export function buildMidiDevice(builder: (build: IMidiDeviceBuilder) => IMidiDeviceBuilder): MidiDevice;
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
	export function patchMidiInstrument(base: MidiInstrument, builder: (build: IMidiInstrumentBuilder) => IMidiInstrumentBuilder): IAny[];
	export function buildMidiInstrument(builder: (build: IMidiInstrumentBuilder) => IMidiInstrumentBuilder): MidiInstrument;
	export interface IPlayBuilder {
	    build?: () => Play;
	    patch: () => IAny[];
	    ipa: (ipa: string) => IPlayBuilder;
	    mute: (mute: string) => IPlayBuilder;
	    otherPlay: (build: OtherPlay | ((builder: IOtherPlayBuilder) => IOtherPlayBuilder)) => IPlayBuilder;
	    semiPitched: (semiPitched: string) => IPlayBuilder;
	    id: (id: string) => IPlayBuilder;
	}
	export function patchPlay(base: Play, builder: (build: IPlayBuilder) => IPlayBuilder): IAny[];
	export function buildPlay(builder: (build: IPlayBuilder) => IPlayBuilder): Play;
	export interface IOtherPlayBuilder {
	    build?: () => OtherPlay;
	    patch: () => IAny[];
	    data: (data: string) => IOtherPlayBuilder;
	    type: (type: string) => IOtherPlayBuilder;
	}
	export function patchOtherPlay(base: OtherPlay, builder: (build: IOtherPlayBuilder) => IOtherPlayBuilder): IAny[];
	export function buildOtherPlay(builder: (build: IOtherPlayBuilder) => IOtherPlayBuilder): OtherPlay;
	export interface IScalingBuilder {
	    build?: () => Scaling;
	    patch: () => IAny[];
	    tenths: (tenths: number) => IScalingBuilder;
	    millimeters: (millimeters: number) => IScalingBuilder;
	}
	export function patchScaling(base: Scaling, builder: (build: IScalingBuilder) => IScalingBuilder): IAny[];
	export function buildScaling(builder: (build: IScalingBuilder) => IScalingBuilder): Scaling;
	export interface IPageMarginsBuilder {
	    build?: () => PageMargins;
	    patch: () => IAny[];
	    topMargin: (topMargin: number) => IPageMarginsBuilder;
	    leftMargin: (leftMargin: number) => IPageMarginsBuilder;
	    bottomMargin: (bottomMargin: number) => IPageMarginsBuilder;
	    type: (type: OddEvenBoth) => IPageMarginsBuilder;
	    rightMargin: (rightMargin: number) => IPageMarginsBuilder;
	}
	export function patchPageMargins(base: PageMargins, builder: (build: IPageMarginsBuilder) => IPageMarginsBuilder): IAny[];
	export function buildPageMargins(builder: (build: IPageMarginsBuilder) => IPageMarginsBuilder): PageMargins;
	export interface IPageLayoutBuilder {
	    build?: () => PageLayout;
	    patch: () => IAny[];
	    pageHeight: (pageHeight: number) => IPageLayoutBuilder;
	    pageWidth: (pageWidth: number) => IPageLayoutBuilder;
	    pageMarginsAt: (idx: number, build: PageMargins | ((builder: IPageMarginsBuilder) => IPageMarginsBuilder)) => IPageLayoutBuilder;
	    pageMarginsSplice: (start: number, deleteCount: number, ...items: PageMargins[]) => IPageLayoutBuilder;
	    pageMargins: (pageMargins: PageMargins[]) => IPageLayoutBuilder;
	}
	export function patchPageLayout(base: PageLayout, builder: (build: IPageLayoutBuilder) => IPageLayoutBuilder): IAny[];
	export function buildPageLayout(builder: (build: IPageLayoutBuilder) => IPageLayoutBuilder): PageLayout;
	export interface ISystemLayoutBuilder {
	    build?: () => SystemLayout;
	    patch: () => IAny[];
	    systemDividers: (build: SystemDividers | ((builder: ISystemDividersBuilder) => ISystemDividersBuilder)) => ISystemLayoutBuilder;
	    systemMargins: (build: SystemMargins | ((builder: ISystemMarginsBuilder) => ISystemMarginsBuilder)) => ISystemLayoutBuilder;
	    systemDistance: (systemDistance: number) => ISystemLayoutBuilder;
	    topSystemDistance: (topSystemDistance: number) => ISystemLayoutBuilder;
	}
	export function patchSystemLayout(base: SystemLayout, builder: (build: ISystemLayoutBuilder) => ISystemLayoutBuilder): IAny[];
	export function buildSystemLayout(builder: (build: ISystemLayoutBuilder) => ISystemLayoutBuilder): SystemLayout;
	export interface ISystemMarginsBuilder {
	    build?: () => SystemMargins;
	    patch: () => IAny[];
	    leftMargin: (leftMargin: number) => ISystemMarginsBuilder;
	    rightMargin: (rightMargin: number) => ISystemMarginsBuilder;
	}
	export function patchSystemMargins(base: SystemMargins, builder: (build: ISystemMarginsBuilder) => ISystemMarginsBuilder): IAny[];
	export function buildSystemMargins(builder: (build: ISystemMarginsBuilder) => ISystemMarginsBuilder): SystemMargins;
	export interface ISystemDividersBuilder {
	    build?: () => SystemDividers;
	    patch: () => IAny[];
	    rightDivider: (build: RightDivider | ((builder: IRightDividerBuilder) => IRightDividerBuilder)) => ISystemDividersBuilder;
	    leftDivider: (build: LeftDivider | ((builder: ILeftDividerBuilder) => ILeftDividerBuilder)) => ISystemDividersBuilder;
	}
	export function patchSystemDividers(base: SystemDividers, builder: (build: ISystemDividersBuilder) => ISystemDividersBuilder): IAny[];
	export function buildSystemDividers(builder: (build: ISystemDividersBuilder) => ISystemDividersBuilder): SystemDividers;
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
	export function patchLeftDivider(base: LeftDivider, builder: (build: ILeftDividerBuilder) => ILeftDividerBuilder): IAny[];
	export function buildLeftDivider(builder: (build: ILeftDividerBuilder) => ILeftDividerBuilder): LeftDivider;
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
	export function patchRightDivider(base: RightDivider, builder: (build: IRightDividerBuilder) => IRightDividerBuilder): IAny[];
	export function buildRightDivider(builder: (build: IRightDividerBuilder) => IRightDividerBuilder): RightDivider;
	export interface IStaffLayoutBuilder {
	    build?: () => StaffLayout;
	    patch: () => IAny[];
	    staffDistance: (staffDistance: number) => IStaffLayoutBuilder;
	    num: (num: number) => IStaffLayoutBuilder;
	}
	export function patchStaffLayout(base: StaffLayout, builder: (build: IStaffLayoutBuilder) => IStaffLayoutBuilder): IAny[];
	export function buildStaffLayout(builder: (build: IStaffLayoutBuilder) => IStaffLayoutBuilder): StaffLayout;
	export interface IMeasureLayoutBuilder {
	    build?: () => MeasureLayout;
	    patch: () => IAny[];
	    measureDistance: (measureDistance: number) => IMeasureLayoutBuilder;
	}
	export function patchMeasureLayout(base: MeasureLayout, builder: (build: IMeasureLayoutBuilder) => IMeasureLayoutBuilder): IAny[];
	export function buildMeasureLayout(builder: (build: IMeasureLayoutBuilder) => IMeasureLayoutBuilder): MeasureLayout;
	export interface ILineWidthBuilder {
	    build?: () => LineWidth;
	    patch: () => IAny[];
	    tenths: (tenths: number) => ILineWidthBuilder;
	    type: (type: string) => ILineWidthBuilder;
	}
	export function patchLineWidth(base: LineWidth, builder: (build: ILineWidthBuilder) => ILineWidthBuilder): IAny[];
	export function buildLineWidth(builder: (build: ILineWidthBuilder) => ILineWidthBuilder): LineWidth;
	export interface INoteSizeBuilder {
	    build?: () => NoteSize;
	    patch: () => IAny[];
	    size: (size: number) => INoteSizeBuilder;
	    type: (type: CueGraceLarge) => INoteSizeBuilder;
	}
	export function patchNoteSize(base: NoteSize, builder: (build: INoteSizeBuilder) => INoteSizeBuilder): IAny[];
	export function buildNoteSize(builder: (build: INoteSizeBuilder) => INoteSizeBuilder): NoteSize;
	export interface IDistanceBuilder {
	    build?: () => Distance;
	    patch: () => IAny[];
	    tenths: (tenths: number) => IDistanceBuilder;
	    type: (type: string) => IDistanceBuilder;
	}
	export function patchDistance(base: Distance, builder: (build: IDistanceBuilder) => IDistanceBuilder): IAny[];
	export function buildDistance(builder: (build: IDistanceBuilder) => IDistanceBuilder): Distance;
	export interface IAppearanceBuilder {
	    build?: () => Appearance;
	    patch: () => IAny[];
	    set: (key: string, val: NoteSize) => IAppearanceBuilder;
	    otherAppearances: (otherAppearances: string[]) => IAppearanceBuilder;
	}
	export function patchAppearance(base: Appearance, builder: (build: IAppearanceBuilder) => IAppearanceBuilder): IAny[];
	export function buildAppearance(builder: (build: IAppearanceBuilder) => IAppearanceBuilder): Appearance;
	export interface ICreatorBuilder {
	    build?: () => Creator;
	    patch: () => IAny[];
	    creator: (creator: string) => ICreatorBuilder;
	    type: (type: string) => ICreatorBuilder;
	}
	export function patchCreator(base: Creator, builder: (build: ICreatorBuilder) => ICreatorBuilder): IAny[];
	export function buildCreator(builder: (build: ICreatorBuilder) => ICreatorBuilder): Creator;
	export interface IRightsBuilder {
	    build?: () => Rights;
	    patch: () => IAny[];
	    type: (type: string) => IRightsBuilder;
	    rights: (rights: string) => IRightsBuilder;
	}
	export function patchRights(base: Rights, builder: (build: IRightsBuilder) => IRightsBuilder): IAny[];
	export function buildRights(builder: (build: IRightsBuilder) => IRightsBuilder): Rights;
	export interface IEncoderBuilder {
	    build?: () => Encoder;
	    patch: () => IAny[];
	    encoder: (encoder: string) => IEncoderBuilder;
	    type: (type: string) => IEncoderBuilder;
	}
	export function patchEncoder(base: Encoder, builder: (build: IEncoderBuilder) => IEncoderBuilder): IAny[];
	export function buildEncoder(builder: (build: IEncoderBuilder) => IEncoderBuilder): Encoder;
	export interface IRelationBuilder {
	    build?: () => Relation;
	    patch: () => IAny[];
	    type: (type: string) => IRelationBuilder;
	    data: (data: string) => IRelationBuilder;
	}
	export function patchRelation(base: Relation, builder: (build: IRelationBuilder) => IRelationBuilder): IAny[];
	export function buildRelation(builder: (build: IRelationBuilder) => IRelationBuilder): Relation;
	export interface IMiscellaneousFieldBuilder {
	    build?: () => MiscellaneousField;
	    patch: () => IAny[];
	    data: (data: string) => IMiscellaneousFieldBuilder;
	    name: (name: string) => IMiscellaneousFieldBuilder;
	}
	export function patchMiscellaneousField(base: MiscellaneousField, builder: (build: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder): IAny[];
	export function buildMiscellaneousField(builder: (build: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder): MiscellaneousField;
	export interface IMiscellaneousBuilder {
	    build?: () => Miscellaneous;
	    patch: () => IAny[];
	    miscellaneousFieldsAt: (idx: number, build: MiscellaneousField | ((builder: IMiscellaneousFieldBuilder) => IMiscellaneousFieldBuilder)) => IMiscellaneousBuilder;
	    miscellaneousFieldsSplice: (start: number, deleteCount: number, ...items: MiscellaneousField[]) => IMiscellaneousBuilder;
	    miscellaneousFields: (miscellaneousFields: MiscellaneousField[]) => IMiscellaneousBuilder;
	}
	export function patchMiscellaneous(base: Miscellaneous, builder: (build: IMiscellaneousBuilder) => IMiscellaneousBuilder): IAny[];
	export function buildMiscellaneous(builder: (build: IMiscellaneousBuilder) => IMiscellaneousBuilder): Miscellaneous;
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
	export function patchIdentification(base: Identification, builder: (build: IIdentificationBuilder) => IIdentificationBuilder): IAny[];
	export function buildIdentification(builder: (build: IIdentificationBuilder) => IIdentificationBuilder): Identification;
	export interface ISupportsBuilder {
	    build?: () => Supports;
	    patch: () => IAny[];
	    element: (element: string) => ISupportsBuilder;
	    attribute: (attribute: string) => ISupportsBuilder;
	    value: (value: string) => ISupportsBuilder;
	    type: (type: boolean) => ISupportsBuilder;
	}
	export function patchSupports(base: Supports, builder: (build: ISupportsBuilder) => ISupportsBuilder): IAny[];
	export function buildSupports(builder: (build: ISupportsBuilder) => ISupportsBuilder): Supports;
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
	export function patchEncoding(base: Encoding, builder: (build: IEncodingBuilder) => IEncodingBuilder): IAny[];
	export function buildEncoding(builder: (build: IEncodingBuilder) => IEncodingBuilder): Encoding;
	export interface ITimeSeparatorBuilder {
	    build?: () => TimeSeparator;
	    patch: () => IAny[];
	    separator: (separator: SeparatorType) => ITimeSeparatorBuilder;
	}
	export function patchTimeSeparator(base: TimeSeparator, builder: (build: ITimeSeparatorBuilder) => ITimeSeparatorBuilder): IAny[];
	export function buildTimeSeparator(builder: (build: ITimeSeparatorBuilder) => ITimeSeparatorBuilder): TimeSeparator;
	export interface ITimeSymbolBuilder {
	    build?: () => TimeSymbol;
	    patch: () => IAny[];
	    symbol: (symbol: TimeSymbolType) => ITimeSymbolBuilder;
	}
	export function patchTimeSymbol(base: TimeSymbol, builder: (build: ITimeSymbolBuilder) => ITimeSymbolBuilder): IAny[];
	export function buildTimeSymbol(builder: (build: ITimeSymbolBuilder) => ITimeSymbolBuilder): TimeSymbol;
	export interface ICancelBuilder {
	    build?: () => Cancel;
	    patch: () => IAny[];
	    fifths: (fifths: number) => ICancelBuilder;
	    location: (location: CancelLocation) => ICancelBuilder;
	}
	export function patchCancel(base: Cancel, builder: (build: ICancelBuilder) => ICancelBuilder): IAny[];
	export function buildCancel(builder: (build: ICancelBuilder) => ICancelBuilder): Cancel;
	export interface IKeyOctaveBuilder {
	    build?: () => KeyOctave;
	    patch: () => IAny[];
	    octave: (octave: number) => IKeyOctaveBuilder;
	    number: (number: number) => IKeyOctaveBuilder;
	    cancel: (cancel: boolean) => IKeyOctaveBuilder;
	}
	export function patchKeyOctave(base: KeyOctave, builder: (build: IKeyOctaveBuilder) => IKeyOctaveBuilder): IAny[];
	export function buildKeyOctave(builder: (build: IKeyOctaveBuilder) => IKeyOctaveBuilder): KeyOctave;
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
	export function patchKey(base: Key, builder: (build: IKeyBuilder) => IKeyBuilder): IAny[];
	export function buildKey(builder: (build: IKeyBuilder) => IKeyBuilder): Key;
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
	export function patchTime(base: Time, builder: (build: ITimeBuilder) => ITimeBuilder): IAny[];
	export function buildTime(builder: (build: ITimeBuilder) => ITimeBuilder): Time;
	export interface IInterchangeableBuilder {
	    build?: () => Interchangeable;
	    patch: () => IAny[];
	    beats: (beats: string[]) => IInterchangeableBuilder;
	    beatTypes: (beatTypes: number[]) => IInterchangeableBuilder;
	    timeRelation: (timeRelation: string) => IInterchangeableBuilder;
	    symbol: (symbol: TimeSymbolType) => IInterchangeableBuilder;
	    separator: (separator: SeparatorType) => IInterchangeableBuilder;
	}
	export function patchInterchangeable(base: Interchangeable, builder: (build: IInterchangeableBuilder) => IInterchangeableBuilder): IAny[];
	export function buildInterchangeable(builder: (build: IInterchangeableBuilder) => IInterchangeableBuilder): Interchangeable;
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
	export function patchPartSymbol(base: PartSymbol, builder: (build: IPartSymbolBuilder) => IPartSymbolBuilder): IAny[];
	export function buildPartSymbol(builder: (build: IPartSymbolBuilder) => IPartSymbolBuilder): PartSymbol;
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
	export function patchClef(base: Clef, builder: (build: IClefBuilder) => IClefBuilder): IAny[];
	export function buildClef(builder: (build: IClefBuilder) => IClefBuilder): Clef;
	export interface IStaffTuningBuilder {
	    build?: () => StaffTuning;
	    patch: () => IAny[];
	    tuningAlter: (tuningAlter: string) => IStaffTuningBuilder;
	    line: (line: string) => IStaffTuningBuilder;
	    tuningStep: (tuningStep: string) => IStaffTuningBuilder;
	    tuningOctave: (tuningOctave: string) => IStaffTuningBuilder;
	}
	export function patchStaffTuning(base: StaffTuning, builder: (build: IStaffTuningBuilder) => IStaffTuningBuilder): IAny[];
	export function buildStaffTuning(builder: (build: IStaffTuningBuilder) => IStaffTuningBuilder): StaffTuning;
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
	export function patchStaffDetails(base: StaffDetails, builder: (build: IStaffDetailsBuilder) => IStaffDetailsBuilder): IAny[];
	export function buildStaffDetails(builder: (build: IStaffDetailsBuilder) => IStaffDetailsBuilder): StaffDetails;
	export interface IDoubleBuilder {
	    build?: () => Double;
	    patch: () => IAny[];
	}
	export function patchDouble(base: Double, builder: (build: IDoubleBuilder) => IDoubleBuilder): IAny[];
	export function buildDouble(builder: (build: IDoubleBuilder) => IDoubleBuilder): Double;
	export interface ITransposeBuilder {
	    build?: () => Transpose;
	    patch: () => IAny[];
	    number: (number: number) => ITransposeBuilder;
	    diatonic: (diatonic: string) => ITransposeBuilder;
	    octaveChange: (octaveChange: string) => ITransposeBuilder;
	    double: (build: Double | ((builder: IDoubleBuilder) => IDoubleBuilder)) => ITransposeBuilder;
	    chromatic: (chromatic: string) => ITransposeBuilder;
	}
	export function patchTranspose(base: Transpose, builder: (build: ITransposeBuilder) => ITransposeBuilder): IAny[];
	export function buildTranspose(builder: (build: ITransposeBuilder) => ITransposeBuilder): Transpose;
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
	export function patchDirective(base: Directive, builder: (build: IDirectiveBuilder) => IDirectiveBuilder): IAny[];
	export function buildDirective(builder: (build: IDirectiveBuilder) => IDirectiveBuilder): Directive;
	export interface ISlashDotBuilder {
	    build?: () => SlashDot;
	    patch: () => IAny[];
	}
	export function patchSlashDot(base: SlashDot, builder: (build: ISlashDotBuilder) => ISlashDotBuilder): IAny[];
	export function buildSlashDot(builder: (build: ISlashDotBuilder) => ISlashDotBuilder): SlashDot;
	export interface IMultipleRestBuilder {
	    build?: () => MultipleRest;
	    patch: () => IAny[];
	    useSymbols: (useSymbols: boolean) => IMultipleRestBuilder;
	    count: (count: number) => IMultipleRestBuilder;
	}
	export function patchMultipleRest(base: MultipleRest, builder: (build: IMultipleRestBuilder) => IMultipleRestBuilder): IAny[];
	export function buildMultipleRest(builder: (build: IMultipleRestBuilder) => IMultipleRestBuilder): MultipleRest;
	export interface IMeasureRepeatBuilder {
	    build?: () => MeasureRepeat;
	    patch: () => IAny[];
	    data: (data: string) => IMeasureRepeatBuilder;
	    type: (type: StartStop) => IMeasureRepeatBuilder;
	    slashes: (slashes: number) => IMeasureRepeatBuilder;
	}
	export function patchMeasureRepeat(base: MeasureRepeat, builder: (build: IMeasureRepeatBuilder) => IMeasureRepeatBuilder): IAny[];
	export function buildMeasureRepeat(builder: (build: IMeasureRepeatBuilder) => IMeasureRepeatBuilder): MeasureRepeat;
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
	export function patchBeatRepeat(base: BeatRepeat, builder: (build: IBeatRepeatBuilder) => IBeatRepeatBuilder): IAny[];
	export function buildBeatRepeat(builder: (build: IBeatRepeatBuilder) => IBeatRepeatBuilder): BeatRepeat;
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
	export function patchSlash(base: Slash, builder: (build: ISlashBuilder) => ISlashBuilder): IAny[];
	export function buildSlash(builder: (build: ISlashBuilder) => ISlashBuilder): Slash;
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
	export function patchMeasureStyle(base: MeasureStyle, builder: (build: IMeasureStyleBuilder) => IMeasureStyleBuilder): IAny[];
	export function buildMeasureStyle(builder: (build: IMeasureStyleBuilder) => IMeasureStyleBuilder): MeasureStyle;
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
	export function patchAttributes(base: Attributes, builder: (build: IAttributesBuilder) => IAttributesBuilder): IAny[];
	export function buildAttributes(builder: (build: IAttributesBuilder) => IAttributesBuilder): Attributes;
	export interface ICueBuilder {
	    build?: () => Cue;
	    patch: () => IAny[];
	}
	export function patchCue(base: Cue, builder: (build: ICueBuilder) => ICueBuilder): IAny[];
	export function buildCue(builder: (build: ICueBuilder) => ICueBuilder): Cue;
	export interface IGraceBuilder {
	    build?: () => Grace;
	    patch: () => IAny[];
	    makeTime: (makeTime: string) => IGraceBuilder;
	    stealTimePrevious: (stealTimePrevious: string) => IGraceBuilder;
	    slash: (slash: boolean) => IGraceBuilder;
	    stealTimeFollowing: (stealTimeFollowing: string) => IGraceBuilder;
	}
	export function patchGrace(base: Grace, builder: (build: IGraceBuilder) => IGraceBuilder): IAny[];
	export function buildGrace(builder: (build: IGraceBuilder) => IGraceBuilder): Grace;
	export interface IChordBuilder {
	    build?: () => Chord;
	    patch: () => IAny[];
	}
	export function patchChord(base: Chord, builder: (build: IChordBuilder) => IChordBuilder): IAny[];
	export function buildChord(builder: (build: IChordBuilder) => IChordBuilder): Chord;
	export interface IUnpitchedBuilder {
	    build?: () => Unpitched;
	    patch: () => IAny[];
	    displayStep: (displayStep: string) => IUnpitchedBuilder;
	    displayOctave: (displayOctave: number) => IUnpitchedBuilder;
	}
	export function patchUnpitched(base: Unpitched, builder: (build: IUnpitchedBuilder) => IUnpitchedBuilder): IAny[];
	export function buildUnpitched(builder: (build: IUnpitchedBuilder) => IUnpitchedBuilder): Unpitched;
	export interface IPitchBuilder {
	    build?: () => Pitch;
	    patch: () => IAny[];
	    alter: (alter: number) => IPitchBuilder;
	    step: (step: string) => IPitchBuilder;
	    octave: (octave: number) => IPitchBuilder;
	}
	export function patchPitch(base: Pitch, builder: (build: IPitchBuilder) => IPitchBuilder): IAny[];
	export function buildPitch(builder: (build: IPitchBuilder) => IPitchBuilder): Pitch;
	export interface IFullNoteBuilder {
	    build?: () => FullNote;
	    patch: () => IAny[];
	    unpitched: (build: Unpitched | ((builder: IUnpitchedBuilder) => IUnpitchedBuilder)) => IFullNoteBuilder;
	    chord: (build: Chord | ((builder: IChordBuilder) => IChordBuilder)) => IFullNoteBuilder;
	    pitch: (build: Pitch | ((builder: IPitchBuilder) => IPitchBuilder)) => IFullNoteBuilder;
	    rest: (build: Rest | ((builder: IRestBuilder) => IRestBuilder)) => IFullNoteBuilder;
	}
	export function patchFullNote(base: FullNote, builder: (build: IFullNoteBuilder) => IFullNoteBuilder): IAny[];
	export function buildFullNote(builder: (build: IFullNoteBuilder) => IFullNoteBuilder): FullNote;
	export interface IRestBuilder {
	    build?: () => Rest;
	    patch: () => IAny[];
	    measure: (measure: boolean) => IRestBuilder;
	    displayStep: (displayStep: string) => IRestBuilder;
	    displayOctave: (displayOctave: number) => IRestBuilder;
	}
	export function patchRest(base: Rest, builder: (build: IRestBuilder) => IRestBuilder): IAny[];
	export function buildRest(builder: (build: IRestBuilder) => IRestBuilder): Rest;
	export interface ITieBuilder {
	    build?: () => Tie;
	    patch: () => IAny[];
	    type: (type: StartStop) => ITieBuilder;
	    timeOnly: (timeOnly: string) => ITieBuilder;
	}
	export function patchTie(base: Tie, builder: (build: ITieBuilder) => ITieBuilder): IAny[];
	export function buildTie(builder: (build: ITieBuilder) => ITieBuilder): Tie;
	export interface IInstrumentBuilder {
	    build?: () => Instrument;
	    patch: () => IAny[];
	    id: (id: string) => IInstrumentBuilder;
	}
	export function patchInstrument(base: Instrument, builder: (build: IInstrumentBuilder) => IInstrumentBuilder): IAny[];
	export function buildInstrument(builder: (build: IInstrumentBuilder) => IInstrumentBuilder): Instrument;
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
	export function patchNote(base: Note, builder: (build: INoteBuilder) => INoteBuilder): IAny[];
	export function buildNote(builder: (build: INoteBuilder) => INoteBuilder): Note;
	export interface ITypeBuilder {
	    build?: () => Type;
	    patch: () => IAny[];
	    duration: (duration: Count) => ITypeBuilder;
	    size: (size: SymbolSize) => ITypeBuilder;
	}
	export function patchType(base: Type, builder: (build: ITypeBuilder) => ITypeBuilder): IAny[];
	export function buildType(builder: (build: ITypeBuilder) => ITypeBuilder): Type;
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
	export function patchDot(base: Dot, builder: (build: IDotBuilder) => IDotBuilder): IAny[];
	export function buildDot(builder: (build: IDotBuilder) => IDotBuilder): Dot;
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
	export function patchAccidental(base: Accidental, builder: (build: IAccidentalBuilder) => IAccidentalBuilder): IAny[];
	export function buildAccidental(builder: (build: IAccidentalBuilder) => IAccidentalBuilder): Accidental;
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
	export function patchTimeModification(base: TimeModification, builder: (build: ITimeModificationBuilder) => ITimeModificationBuilder): IAny[];
	export function buildTimeModification(builder: (build: ITimeModificationBuilder) => ITimeModificationBuilder): TimeModification;
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
	export function patchStem(base: Stem, builder: (build: IStemBuilder) => IStemBuilder): IAny[];
	export function buildStem(builder: (build: IStemBuilder) => IStemBuilder): Stem;
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
	export function patchNotehead(base: Notehead, builder: (build: INoteheadBuilder) => INoteheadBuilder): IAny[];
	export function buildNotehead(builder: (build: INoteheadBuilder) => INoteheadBuilder): Notehead;
	export interface INoteheadTextBuilder {
	    build?: () => NoteheadText;
	    patch: () => IAny[];
	    textAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => INoteheadTextBuilder;
	    textSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => INoteheadTextBuilder;
	    text: (text: TextSegment[]) => INoteheadTextBuilder;
	}
	export function patchNoteheadText(base: NoteheadText, builder: (build: INoteheadTextBuilder) => INoteheadTextBuilder): IAny[];
	export function buildNoteheadText(builder: (build: INoteheadTextBuilder) => INoteheadTextBuilder): NoteheadText;
	export interface IBeamBuilder {
	    build?: () => Beam;
	    patch: () => IAny[];
	    repeater: (repeater: boolean) => IBeamBuilder;
	    number: (number: number) => IBeamBuilder;
	    type: (type: BeamType) => IBeamBuilder;
	    fan: (fan: AccelRitNone) => IBeamBuilder;
	}
	export function patchBeam(base: Beam, builder: (build: IBeamBuilder) => IBeamBuilder): IAny[];
	export function buildBeam(builder: (build: IBeamBuilder) => IBeamBuilder): Beam;
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
	export function patchNotations(base: Notations, builder: (build: INotationsBuilder) => INotationsBuilder): IAny[];
	export function buildNotations(builder: (build: INotationsBuilder) => INotationsBuilder): Notations;
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
	export function patchTied(base: Tied, builder: (build: ITiedBuilder) => ITiedBuilder): IAny[];
	export function buildTied(builder: (build: ITiedBuilder) => ITiedBuilder): Tied;
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
	export function patchSlur(base: Slur, builder: (build: ISlurBuilder) => ISlurBuilder): IAny[];
	export function buildSlur(builder: (build: ISlurBuilder) => ISlurBuilder): Slur;
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
	export function patchTuplet(base: Tuplet, builder: (build: ITupletBuilder) => ITupletBuilder): IAny[];
	export function buildTuplet(builder: (build: ITupletBuilder) => ITupletBuilder): Tuplet;
	export interface ITupletActualBuilder {
	    build?: () => TupletActual;
	    patch: () => IAny[];
	    tupletNumber: (build: TupletNumber | ((builder: ITupletNumberBuilder) => ITupletNumberBuilder)) => ITupletActualBuilder;
	    tupletDotsAt: (idx: number, build: TupletDot | ((builder: ITupletDotBuilder) => ITupletDotBuilder)) => ITupletActualBuilder;
	    tupletDotsSplice: (start: number, deleteCount: number, ...items: TupletDot[]) => ITupletActualBuilder;
	    tupletDots: (tupletDots: TupletDot[]) => ITupletActualBuilder;
	    tupletType: (build: TupletType | ((builder: ITupletTypeBuilder) => ITupletTypeBuilder)) => ITupletActualBuilder;
	}
	export function patchTupletActual(base: TupletActual, builder: (build: ITupletActualBuilder) => ITupletActualBuilder): IAny[];
	export function buildTupletActual(builder: (build: ITupletActualBuilder) => ITupletActualBuilder): TupletActual;
	export interface ITupletNormalBuilder {
	    build?: () => TupletNormal;
	    patch: () => IAny[];
	    tupletNumber: (build: TupletNumber | ((builder: ITupletNumberBuilder) => ITupletNumberBuilder)) => ITupletNormalBuilder;
	    tupletDotsAt: (idx: number, build: TupletDot | ((builder: ITupletDotBuilder) => ITupletDotBuilder)) => ITupletNormalBuilder;
	    tupletDotsSplice: (start: number, deleteCount: number, ...items: TupletDot[]) => ITupletNormalBuilder;
	    tupletDots: (tupletDots: TupletDot[]) => ITupletNormalBuilder;
	    tupletType: (build: TupletType | ((builder: ITupletTypeBuilder) => ITupletTypeBuilder)) => ITupletNormalBuilder;
	}
	export function patchTupletNormal(base: TupletNormal, builder: (build: ITupletNormalBuilder) => ITupletNormalBuilder): IAny[];
	export function buildTupletNormal(builder: (build: ITupletNormalBuilder) => ITupletNormalBuilder): TupletNormal;
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
	export function patchTupletNumber(base: TupletNumber, builder: (build: ITupletNumberBuilder) => ITupletNumberBuilder): IAny[];
	export function buildTupletNumber(builder: (build: ITupletNumberBuilder) => ITupletNumberBuilder): TupletNumber;
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
	export function patchTupletType(base: TupletType, builder: (build: ITupletTypeBuilder) => ITupletTypeBuilder): IAny[];
	export function buildTupletType(builder: (build: ITupletTypeBuilder) => ITupletTypeBuilder): TupletType;
	export interface ITupletDotBuilder {
	    build?: () => TupletDot;
	    patch: () => IAny[];
	    fontFamily: (fontFamily: string) => ITupletDotBuilder;
	    fontWeight: (fontWeight: NormalBold) => ITupletDotBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ITupletDotBuilder;
	    fontSize: (fontSize: string) => ITupletDotBuilder;
	    color: (color: string) => ITupletDotBuilder;
	}
	export function patchTupletDot(base: TupletDot, builder: (build: ITupletDotBuilder) => ITupletDotBuilder): IAny[];
	export function buildTupletDot(builder: (build: ITupletDotBuilder) => ITupletDotBuilder): TupletDot;
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
	export function patchGlissando(base: Glissando, builder: (build: IGlissandoBuilder) => IGlissandoBuilder): IAny[];
	export function buildGlissando(builder: (build: IGlissandoBuilder) => IGlissandoBuilder): Glissando;
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
	export function patchSlide(base: Slide, builder: (build: ISlideBuilder) => ISlideBuilder): IAny[];
	export function buildSlide(builder: (build: ISlideBuilder) => ISlideBuilder): Slide;
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
	export function patchOtherNotation(base: OtherNotation, builder: (build: IOtherNotationBuilder) => IOtherNotationBuilder): IAny[];
	export function buildOtherNotation(builder: (build: IOtherNotationBuilder) => IOtherNotationBuilder): OtherNotation;
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
	export function patchOtherDirection(base: OtherDirection, builder: (build: IOtherDirectionBuilder) => IOtherDirectionBuilder): IAny[];
	export function buildOtherDirection(builder: (build: IOtherDirectionBuilder) => IOtherDirectionBuilder): OtherDirection;
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
	export function patchOrnaments(base: Ornaments, builder: (build: IOrnamentsBuilder) => IOrnamentsBuilder): IAny[];
	export function buildOrnaments(builder: (build: IOrnamentsBuilder) => IOrnamentsBuilder): Ornaments;
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
	export function patchTrillMark(base: TrillMark, builder: (build: ITrillMarkBuilder) => ITrillMarkBuilder): IAny[];
	export function buildTrillMark(builder: (build: ITrillMarkBuilder) => ITrillMarkBuilder): TrillMark;
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
	export function patchTurn(base: Turn, builder: (build: ITurnBuilder) => ITurnBuilder): IAny[];
	export function buildTurn(builder: (build: ITurnBuilder) => ITurnBuilder): Turn;
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
	export function patchDelayedTurn(base: DelayedTurn, builder: (build: IDelayedTurnBuilder) => IDelayedTurnBuilder): IAny[];
	export function buildDelayedTurn(builder: (build: IDelayedTurnBuilder) => IDelayedTurnBuilder): DelayedTurn;
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
	export function patchInvertedTurn(base: InvertedTurn, builder: (build: IInvertedTurnBuilder) => IInvertedTurnBuilder): IAny[];
	export function buildInvertedTurn(builder: (build: IInvertedTurnBuilder) => IInvertedTurnBuilder): InvertedTurn;
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
	export function patchDelayedInvertedTurn(base: DelayedInvertedTurn, builder: (build: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder): IAny[];
	export function buildDelayedInvertedTurn(builder: (build: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder): DelayedInvertedTurn;
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
	export function patchVerticalTurn(base: VerticalTurn, builder: (build: IVerticalTurnBuilder) => IVerticalTurnBuilder): IAny[];
	export function buildVerticalTurn(builder: (build: IVerticalTurnBuilder) => IVerticalTurnBuilder): VerticalTurn;
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
	export function patchShake(base: Shake, builder: (build: IShakeBuilder) => IShakeBuilder): IAny[];
	export function buildShake(builder: (build: IShakeBuilder) => IShakeBuilder): Shake;
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
	export function patchMordent(base: Mordent, builder: (build: IMordentBuilder) => IMordentBuilder): IAny[];
	export function buildMordent(builder: (build: IMordentBuilder) => IMordentBuilder): Mordent;
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
	export function patchInvertedMordent(base: InvertedMordent, builder: (build: IInvertedMordentBuilder) => IInvertedMordentBuilder): IAny[];
	export function buildInvertedMordent(builder: (build: IInvertedMordentBuilder) => IInvertedMordentBuilder): InvertedMordent;
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
	export function patchSchleifer(base: Schleifer, builder: (build: ISchleiferBuilder) => ISchleiferBuilder): IAny[];
	export function buildSchleifer(builder: (build: ISchleiferBuilder) => ISchleiferBuilder): Schleifer;
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
	export function patchTremolo(base: Tremolo, builder: (build: ITremoloBuilder) => ITremoloBuilder): IAny[];
	export function buildTremolo(builder: (build: ITremoloBuilder) => ITremoloBuilder): Tremolo;
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
	export function patchOtherOrnament(base: OtherOrnament, builder: (build: IOtherOrnamentBuilder) => IOtherOrnamentBuilder): IAny[];
	export function buildOtherOrnament(builder: (build: IOtherOrnamentBuilder) => IOtherOrnamentBuilder): OtherOrnament;
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
	export function patchAccidentalMark(base: AccidentalMark, builder: (build: IAccidentalMarkBuilder) => IAccidentalMarkBuilder): IAny[];
	export function buildAccidentalMark(builder: (build: IAccidentalMarkBuilder) => IAccidentalMarkBuilder): AccidentalMark;
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
	export function patchTechnical(base: Technical, builder: (build: ITechnicalBuilder) => ITechnicalBuilder): IAny[];
	export function buildTechnical(builder: (build: ITechnicalBuilder) => ITechnicalBuilder): Technical;
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
	export function patchUpBow(base: UpBow, builder: (build: IUpBowBuilder) => IUpBowBuilder): IAny[];
	export function buildUpBow(builder: (build: IUpBowBuilder) => IUpBowBuilder): UpBow;
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
	export function patchDownBow(base: DownBow, builder: (build: IDownBowBuilder) => IDownBowBuilder): IAny[];
	export function buildDownBow(builder: (build: IDownBowBuilder) => IDownBowBuilder): DownBow;
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
	export function patchHarmonic(base: Harmonic, builder: (build: IHarmonicBuilder) => IHarmonicBuilder): IAny[];
	export function buildHarmonic(builder: (build: IHarmonicBuilder) => IHarmonicBuilder): Harmonic;
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
	export function patchOpenString(base: OpenString, builder: (build: IOpenStringBuilder) => IOpenStringBuilder): IAny[];
	export function buildOpenString(builder: (build: IOpenStringBuilder) => IOpenStringBuilder): OpenString;
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
	export function patchThumbPosition(base: ThumbPosition, builder: (build: IThumbPositionBuilder) => IThumbPositionBuilder): IAny[];
	export function buildThumbPosition(builder: (build: IThumbPositionBuilder) => IThumbPositionBuilder): ThumbPosition;
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
	export function patchPluck(base: Pluck, builder: (build: IPluckBuilder) => IPluckBuilder): IAny[];
	export function buildPluck(builder: (build: IPluckBuilder) => IPluckBuilder): Pluck;
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
	export function patchDoubleTongue(base: DoubleTongue, builder: (build: IDoubleTongueBuilder) => IDoubleTongueBuilder): IAny[];
	export function buildDoubleTongue(builder: (build: IDoubleTongueBuilder) => IDoubleTongueBuilder): DoubleTongue;
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
	export function patchTripleTongue(base: TripleTongue, builder: (build: ITripleTongueBuilder) => ITripleTongueBuilder): IAny[];
	export function buildTripleTongue(builder: (build: ITripleTongueBuilder) => ITripleTongueBuilder): TripleTongue;
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
	export function patchStopped(base: Stopped, builder: (build: IStoppedBuilder) => IStoppedBuilder): IAny[];
	export function buildStopped(builder: (build: IStoppedBuilder) => IStoppedBuilder): Stopped;
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
	export function patchSnapPizzicato(base: SnapPizzicato, builder: (build: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder): IAny[];
	export function buildSnapPizzicato(builder: (build: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder): SnapPizzicato;
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
	export function patchHammerOn(base: HammerOn, builder: (build: IHammerOnBuilder) => IHammerOnBuilder): IAny[];
	export function buildHammerOn(builder: (build: IHammerOnBuilder) => IHammerOnBuilder): HammerOn;
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
	export function patchPullOff(base: PullOff, builder: (build: IPullOffBuilder) => IPullOffBuilder): IAny[];
	export function buildPullOff(builder: (build: IPullOffBuilder) => IPullOffBuilder): PullOff;
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
	export function patchBend(base: Bend, builder: (build: IBendBuilder) => IBendBuilder): IAny[];
	export function buildBend(builder: (build: IBendBuilder) => IBendBuilder): Bend;
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
	export function patchWithBar(base: WithBar, builder: (build: IWithBarBuilder) => IWithBarBuilder): IAny[];
	export function buildWithBar(builder: (build: IWithBarBuilder) => IWithBarBuilder): WithBar;
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
	export function patchTap(base: Tap, builder: (build: ITapBuilder) => ITapBuilder): IAny[];
	export function buildTap(builder: (build: ITapBuilder) => ITapBuilder): Tap;
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
	export function patchHeel(base: Heel, builder: (build: IHeelBuilder) => IHeelBuilder): IAny[];
	export function buildHeel(builder: (build: IHeelBuilder) => IHeelBuilder): Heel;
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
	export function patchToe(base: Toe, builder: (build: IToeBuilder) => IToeBuilder): IAny[];
	export function buildToe(builder: (build: IToeBuilder) => IToeBuilder): Toe;
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
	export function patchFingernails(base: Fingernails, builder: (build: IFingernailsBuilder) => IFingernailsBuilder): IAny[];
	export function buildFingernails(builder: (build: IFingernailsBuilder) => IFingernailsBuilder): Fingernails;
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
	export function patchHole(base: Hole, builder: (build: IHoleBuilder) => IHoleBuilder): IAny[];
	export function buildHole(builder: (build: IHoleBuilder) => IHoleBuilder): Hole;
	export interface IHoleClosedBuilder {
	    build?: () => HoleClosed;
	    patch: () => IAny[];
	    location: (location: HoleLocation) => IHoleClosedBuilder;
	    data: (data: HoleClosedType) => IHoleClosedBuilder;
	}
	export function patchHoleClosed(base: HoleClosed, builder: (build: IHoleClosedBuilder) => IHoleClosedBuilder): IAny[];
	export function buildHoleClosed(builder: (build: IHoleClosedBuilder) => IHoleClosedBuilder): HoleClosed;
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
	export function patchArrow(base: Arrow, builder: (build: IArrowBuilder) => IArrowBuilder): IAny[];
	export function buildArrow(builder: (build: IArrowBuilder) => IArrowBuilder): Arrow;
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
	export function patchHandbell(base: Handbell, builder: (build: IHandbellBuilder) => IHandbellBuilder): IAny[];
	export function buildHandbell(builder: (build: IHandbellBuilder) => IHandbellBuilder): Handbell;
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
	export function patchOtherTechnical(base: OtherTechnical, builder: (build: IOtherTechnicalBuilder) => IOtherTechnicalBuilder): IAny[];
	export function buildOtherTechnical(builder: (build: IOtherTechnicalBuilder) => IOtherTechnicalBuilder): OtherTechnical;
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
	export function patchArticulations(base: Articulations, builder: (build: IArticulationsBuilder) => IArticulationsBuilder): IAny[];
	export function buildArticulations(builder: (build: IArticulationsBuilder) => IArticulationsBuilder): Articulations;
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
	export function patchAccent(base: Accent, builder: (build: IAccentBuilder) => IAccentBuilder): IAny[];
	export function buildAccent(builder: (build: IAccentBuilder) => IAccentBuilder): Accent;
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
	export function patchStrongAccent(base: StrongAccent, builder: (build: IStrongAccentBuilder) => IStrongAccentBuilder): IAny[];
	export function buildStrongAccent(builder: (build: IStrongAccentBuilder) => IStrongAccentBuilder): StrongAccent;
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
	export function patchStaccato(base: Staccato, builder: (build: IStaccatoBuilder) => IStaccatoBuilder): IAny[];
	export function buildStaccato(builder: (build: IStaccatoBuilder) => IStaccatoBuilder): Staccato;
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
	export function patchTenuto(base: Tenuto, builder: (build: ITenutoBuilder) => ITenutoBuilder): IAny[];
	export function buildTenuto(builder: (build: ITenutoBuilder) => ITenutoBuilder): Tenuto;
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
	export function patchDetachedLegato(base: DetachedLegato, builder: (build: IDetachedLegatoBuilder) => IDetachedLegatoBuilder): IAny[];
	export function buildDetachedLegato(builder: (build: IDetachedLegatoBuilder) => IDetachedLegatoBuilder): DetachedLegato;
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
	export function patchStaccatissimo(base: Staccatissimo, builder: (build: IStaccatissimoBuilder) => IStaccatissimoBuilder): IAny[];
	export function buildStaccatissimo(builder: (build: IStaccatissimoBuilder) => IStaccatissimoBuilder): Staccatissimo;
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
	export function patchSpiccato(base: Spiccato, builder: (build: ISpiccatoBuilder) => ISpiccatoBuilder): IAny[];
	export function buildSpiccato(builder: (build: ISpiccatoBuilder) => ISpiccatoBuilder): Spiccato;
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
	export function patchScoop(base: Scoop, builder: (build: IScoopBuilder) => IScoopBuilder): IAny[];
	export function buildScoop(builder: (build: IScoopBuilder) => IScoopBuilder): Scoop;
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
	export function patchPlop(base: Plop, builder: (build: IPlopBuilder) => IPlopBuilder): IAny[];
	export function buildPlop(builder: (build: IPlopBuilder) => IPlopBuilder): Plop;
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
	export function patchDoit(base: Doit, builder: (build: IDoitBuilder) => IDoitBuilder): IAny[];
	export function buildDoit(builder: (build: IDoitBuilder) => IDoitBuilder): Doit;
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
	export function patchFalloff(base: Falloff, builder: (build: IFalloffBuilder) => IFalloffBuilder): IAny[];
	export function buildFalloff(builder: (build: IFalloffBuilder) => IFalloffBuilder): Falloff;
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
	export function patchBreathMark(base: BreathMark, builder: (build: IBreathMarkBuilder) => IBreathMarkBuilder): IAny[];
	export function buildBreathMark(builder: (build: IBreathMarkBuilder) => IBreathMarkBuilder): BreathMark;
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
	export function patchCaesura(base: Caesura, builder: (build: ICaesuraBuilder) => ICaesuraBuilder): IAny[];
	export function buildCaesura(builder: (build: ICaesuraBuilder) => ICaesuraBuilder): Caesura;
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
	export function patchStress(base: Stress, builder: (build: IStressBuilder) => IStressBuilder): IAny[];
	export function buildStress(builder: (build: IStressBuilder) => IStressBuilder): Stress;
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
	export function patchUnstress(base: Unstress, builder: (build: IUnstressBuilder) => IUnstressBuilder): IAny[];
	export function buildUnstress(builder: (build: IUnstressBuilder) => IUnstressBuilder): Unstress;
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
	export function patchOtherArticulation(base: OtherArticulation, builder: (build: IOtherArticulationBuilder) => IOtherArticulationBuilder): IAny[];
	export function buildOtherArticulation(builder: (build: IOtherArticulationBuilder) => IOtherArticulationBuilder): OtherArticulation;
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
	export function patchArpeggiate(base: Arpeggiate, builder: (build: IArpeggiateBuilder) => IArpeggiateBuilder): IAny[];
	export function buildArpeggiate(builder: (build: IArpeggiateBuilder) => IArpeggiateBuilder): Arpeggiate;
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
	export function patchNonArpeggiate(base: NonArpeggiate, builder: (build: INonArpeggiateBuilder) => INonArpeggiateBuilder): IAny[];
	export function buildNonArpeggiate(builder: (build: INonArpeggiateBuilder) => INonArpeggiateBuilder): NonArpeggiate;
	export interface ILaughingBuilder {
	    build?: () => Laughing;
	    patch: () => IAny[];
	}
	export function patchLaughing(base: Laughing, builder: (build: ILaughingBuilder) => ILaughingBuilder): IAny[];
	export function buildLaughing(builder: (build: ILaughingBuilder) => ILaughingBuilder): Laughing;
	export interface IHummingBuilder {
	    build?: () => Humming;
	    patch: () => IAny[];
	}
	export function patchHumming(base: Humming, builder: (build: IHummingBuilder) => IHummingBuilder): IAny[];
	export function buildHumming(builder: (build: IHummingBuilder) => IHummingBuilder): Humming;
	export interface IEndLineBuilder {
	    build?: () => EndLine;
	    patch: () => IAny[];
	}
	export function patchEndLine(base: EndLine, builder: (build: IEndLineBuilder) => IEndLineBuilder): IAny[];
	export function buildEndLine(builder: (build: IEndLineBuilder) => IEndLineBuilder): EndLine;
	export interface IEndParagraphBuilder {
	    build?: () => EndParagraph;
	    patch: () => IAny[];
	}
	export function patchEndParagraph(base: EndParagraph, builder: (build: IEndParagraphBuilder) => IEndParagraphBuilder): IAny[];
	export function buildEndParagraph(builder: (build: IEndParagraphBuilder) => IEndParagraphBuilder): EndParagraph;
	export interface ILyricPartsBuilder {
	    build?: () => LyricParts;
	    patch: () => IAny[];
	}
	export function patchLyricParts(base: LyricParts, builder: (build: ILyricPartsBuilder) => ILyricPartsBuilder): IAny[];
	export function buildLyricParts(builder: (build: ILyricPartsBuilder) => ILyricPartsBuilder): LyricParts;
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
	export function patchLyric(base: Lyric, builder: (build: ILyricBuilder) => ILyricBuilder): IAny[];
	export function buildLyric(builder: (build: ILyricBuilder) => ILyricBuilder): Lyric;
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
	export function patchText(base: Text, builder: (build: ITextBuilder) => ITextBuilder): IAny[];
	export function buildText(builder: (build: ITextBuilder) => ITextBuilder): Text;
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
	export function patchSyllabic(base: Syllabic, builder: (build: ISyllabicBuilder) => ISyllabicBuilder): IAny[];
	export function buildSyllabic(builder: (build: ISyllabicBuilder) => ISyllabicBuilder): Syllabic;
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
	export function patchElision(base: Elision, builder: (build: IElisionBuilder) => IElisionBuilder): IAny[];
	export function buildElision(builder: (build: IElisionBuilder) => IElisionBuilder): Elision;
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
	export function patchExtend(base: Extend, builder: (build: IExtendBuilder) => IExtendBuilder): IAny[];
	export function buildExtend(builder: (build: IExtendBuilder) => IExtendBuilder): Extend;
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
	export function patchFiguredBass(base: FiguredBass, builder: (build: IFiguredBassBuilder) => IFiguredBassBuilder): IAny[];
	export function buildFiguredBass(builder: (build: IFiguredBassBuilder) => IFiguredBassBuilder): FiguredBass;
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
	export function patchFigure(base: Figure, builder: (build: IFigureBuilder) => IFigureBuilder): IAny[];
	export function buildFigure(builder: (build: IFigureBuilder) => IFigureBuilder): Figure;
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
	export function patchPrefix(base: Prefix, builder: (build: IPrefixBuilder) => IPrefixBuilder): IAny[];
	export function buildPrefix(builder: (build: IPrefixBuilder) => IPrefixBuilder): Prefix;
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
	export function patchFigureNumber(base: FigureNumber, builder: (build: IFigureNumberBuilder) => IFigureNumberBuilder): IAny[];
	export function buildFigureNumber(builder: (build: IFigureNumberBuilder) => IFigureNumberBuilder): FigureNumber;
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
	export function patchSuffix(base: Suffix, builder: (build: ISuffixBuilder) => ISuffixBuilder): IAny[];
	export function buildSuffix(builder: (build: ISuffixBuilder) => ISuffixBuilder): Suffix;
	export interface IBackupBuilder {
	    build?: () => Backup;
	    patch: () => IAny[];
	    duration: (duration: number) => IBackupBuilder;
	    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IBackupBuilder;
	    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IBackupBuilder;
	}
	export function patchBackup(base: Backup, builder: (build: IBackupBuilder) => IBackupBuilder): IAny[];
	export function buildBackup(builder: (build: IBackupBuilder) => IBackupBuilder): Backup;
	export interface IForwardBuilder {
	    build?: () => Forward;
	    patch: () => IAny[];
	    duration: (duration: number) => IForwardBuilder;
	    staff: (staff: number) => IForwardBuilder;
	    voice: (voice: number) => IForwardBuilder;
	    footnote: (build: Footnote | ((builder: IFootnoteBuilder) => IFootnoteBuilder)) => IForwardBuilder;
	    level: (build: Level | ((builder: ILevelBuilder) => ILevelBuilder)) => IForwardBuilder;
	}
	export function patchForward(base: Forward, builder: (build: IForwardBuilder) => IForwardBuilder): IAny[];
	export function buildForward(builder: (build: IForwardBuilder) => IForwardBuilder): Forward;
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
	export function patchBarline(base: Barline, builder: (build: IBarlineBuilder) => IBarlineBuilder): IAny[];
	export function buildBarline(builder: (build: IBarlineBuilder) => IBarlineBuilder): Barline;
	export interface IBarStyleBuilder {
	    build?: () => BarStyle;
	    patch: () => IAny[];
	    data: (data: BarStyleType) => IBarStyleBuilder;
	    color: (color: string) => IBarStyleBuilder;
	}
	export function patchBarStyle(base: BarStyle, builder: (build: IBarStyleBuilder) => IBarStyleBuilder): IAny[];
	export function buildBarStyle(builder: (build: IBarStyleBuilder) => IBarStyleBuilder): BarStyle;
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
	export function patchEnding(base: Ending, builder: (build: IEndingBuilder) => IEndingBuilder): IAny[];
	export function buildEnding(builder: (build: IEndingBuilder) => IEndingBuilder): Ending;
	export interface IRepeatBuilder {
	    build?: () => Repeat;
	    patch: () => IAny[];
	    times: (times: string) => IRepeatBuilder;
	    winged: (winged: WingedType) => IRepeatBuilder;
	    direction: (direction: DirectionTypeBg) => IRepeatBuilder;
	}
	export function patchRepeat(base: Repeat, builder: (build: IRepeatBuilder) => IRepeatBuilder): IAny[];
	export function buildRepeat(builder: (build: IRepeatBuilder) => IRepeatBuilder): Repeat;
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
	export function patchDirection(base: Direction, builder: (build: IDirectionBuilder) => IDirectionBuilder): IAny[];
	export function buildDirection(builder: (build: IDirectionBuilder) => IDirectionBuilder): Direction;
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
	export function patchDirectionType(base: DirectionType, builder: (build: IDirectionTypeBuilder) => IDirectionTypeBuilder): IAny[];
	export function buildDirectionType(builder: (build: IDirectionTypeBuilder) => IDirectionTypeBuilder): DirectionType;
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
	export function patchRehearsal(base: Rehearsal, builder: (build: IRehearsalBuilder) => IRehearsalBuilder): IAny[];
	export function buildRehearsal(builder: (build: IRehearsalBuilder) => IRehearsalBuilder): Rehearsal;
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
	export function patchWords(base: Words, builder: (build: IWordsBuilder) => IWordsBuilder): IAny[];
	export function buildWords(builder: (build: IWordsBuilder) => IWordsBuilder): Words;
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
	export function patchWedge(base: Wedge, builder: (build: IWedgeBuilder) => IWedgeBuilder): IAny[];
	export function buildWedge(builder: (build: IWedgeBuilder) => IWedgeBuilder): Wedge;
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
	export function patchDashes(base: Dashes, builder: (build: IDashesBuilder) => IDashesBuilder): IAny[];
	export function buildDashes(builder: (build: IDashesBuilder) => IDashesBuilder): Dashes;
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
	export function patchBracket(base: Bracket, builder: (build: IBracketBuilder) => IBracketBuilder): IAny[];
	export function buildBracket(builder: (build: IBracketBuilder) => IBracketBuilder): Bracket;
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
	export function patchPedal(base: Pedal, builder: (build: IPedalBuilder) => IPedalBuilder): IAny[];
	export function buildPedal(builder: (build: IPedalBuilder) => IPedalBuilder): Pedal;
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
	export function patchMetronome(base: Metronome, builder: (build: IMetronomeBuilder) => IMetronomeBuilder): IAny[];
	export function buildMetronome(builder: (build: IMetronomeBuilder) => IMetronomeBuilder): Metronome;
	export interface IBeatUnitDotBuilder {
	    build?: () => BeatUnitDot;
	    patch: () => IAny[];
	}
	export function patchBeatUnitDot(base: BeatUnitDot, builder: (build: IBeatUnitDotBuilder) => IBeatUnitDotBuilder): IAny[];
	export function buildBeatUnitDot(builder: (build: IBeatUnitDotBuilder) => IBeatUnitDotBuilder): BeatUnitDot;
	export interface IPerMinuteBuilder {
	    build?: () => PerMinute;
	    patch: () => IAny[];
	    data: (data: string) => IPerMinuteBuilder;
	    fontFamily: (fontFamily: string) => IPerMinuteBuilder;
	    fontWeight: (fontWeight: NormalBold) => IPerMinuteBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IPerMinuteBuilder;
	    fontSize: (fontSize: string) => IPerMinuteBuilder;
	}
	export function patchPerMinute(base: PerMinute, builder: (build: IPerMinuteBuilder) => IPerMinuteBuilder): IAny[];
	export function buildPerMinute(builder: (build: IPerMinuteBuilder) => IPerMinuteBuilder): PerMinute;
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
	export function patchMetronomeNote(base: MetronomeNote, builder: (build: IMetronomeNoteBuilder) => IMetronomeNoteBuilder): IAny[];
	export function buildMetronomeNote(builder: (build: IMetronomeNoteBuilder) => IMetronomeNoteBuilder): MetronomeNote;
	export interface IMetronomeDotBuilder {
	    build?: () => MetronomeDot;
	    patch: () => IAny[];
	}
	export function patchMetronomeDot(base: MetronomeDot, builder: (build: IMetronomeDotBuilder) => IMetronomeDotBuilder): IAny[];
	export function buildMetronomeDot(builder: (build: IMetronomeDotBuilder) => IMetronomeDotBuilder): MetronomeDot;
	export interface IMetronomeBeamBuilder {
	    build?: () => MetronomeBeam;
	    patch: () => IAny[];
	    number: (number: number) => IMetronomeBeamBuilder;
	    data: (data: string) => IMetronomeBeamBuilder;
	}
	export function patchMetronomeBeam(base: MetronomeBeam, builder: (build: IMetronomeBeamBuilder) => IMetronomeBeamBuilder): IAny[];
	export function buildMetronomeBeam(builder: (build: IMetronomeBeamBuilder) => IMetronomeBeamBuilder): MetronomeBeam;
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
	export function patchMetronomeTuplet(base: MetronomeTuplet, builder: (build: IMetronomeTupletBuilder) => IMetronomeTupletBuilder): IAny[];
	export function buildMetronomeTuplet(builder: (build: IMetronomeTupletBuilder) => IMetronomeTupletBuilder): MetronomeTuplet;
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
	export function patchOctaveShift(base: OctaveShift, builder: (build: IOctaveShiftBuilder) => IOctaveShiftBuilder): IAny[];
	export function buildOctaveShift(builder: (build: IOctaveShiftBuilder) => IOctaveShiftBuilder): OctaveShift;
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
	export function patchHarpPedals(base: HarpPedals, builder: (build: IHarpPedalsBuilder) => IHarpPedalsBuilder): IAny[];
	export function buildHarpPedals(builder: (build: IHarpPedalsBuilder) => IHarpPedalsBuilder): HarpPedals;
	export interface IPedalTuningBuilder {
	    build?: () => PedalTuning;
	    patch: () => IAny[];
	    pedalStep: (pedalStep: string) => IPedalTuningBuilder;
	    pedalAlter: (pedalAlter: string) => IPedalTuningBuilder;
	}
	export function patchPedalTuning(base: PedalTuning, builder: (build: IPedalTuningBuilder) => IPedalTuningBuilder): IAny[];
	export function buildPedalTuning(builder: (build: IPedalTuningBuilder) => IPedalTuningBuilder): PedalTuning;
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
	export function patchDamp(base: Damp, builder: (build: IDampBuilder) => IDampBuilder): IAny[];
	export function buildDamp(builder: (build: IDampBuilder) => IDampBuilder): Damp;
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
	export function patchDampAll(base: DampAll, builder: (build: IDampAllBuilder) => IDampAllBuilder): IAny[];
	export function buildDampAll(builder: (build: IDampAllBuilder) => IDampAllBuilder): DampAll;
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
	export function patchEyeglasses(base: Eyeglasses, builder: (build: IEyeglassesBuilder) => IEyeglassesBuilder): IAny[];
	export function buildEyeglasses(builder: (build: IEyeglassesBuilder) => IEyeglassesBuilder): Eyeglasses;
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
	export function patchStringMute(base: StringMute, builder: (build: IStringMuteBuilder) => IStringMuteBuilder): IAny[];
	export function buildStringMute(builder: (build: IStringMuteBuilder) => IStringMuteBuilder): StringMute;
	export interface IScordaturaBuilder {
	    build?: () => Scordatura;
	    patch: () => IAny[];
	    accordsAt: (idx: number, build: Accord | ((builder: IAccordBuilder) => IAccordBuilder)) => IScordaturaBuilder;
	    accordsSplice: (start: number, deleteCount: number, ...items: Accord[]) => IScordaturaBuilder;
	    accords: (accords: Accord[]) => IScordaturaBuilder;
	}
	export function patchScordatura(base: Scordatura, builder: (build: IScordaturaBuilder) => IScordaturaBuilder): IAny[];
	export function buildScordatura(builder: (build: IScordaturaBuilder) => IScordaturaBuilder): Scordatura;
	export interface IAccordBuilder {
	    build?: () => Accord;
	    patch: () => IAny[];
	    tuningAlter: (tuningAlter: string) => IAccordBuilder;
	    string: (string: string) => IAccordBuilder;
	    tuningStep: (tuningStep: string) => IAccordBuilder;
	    tuningOctave: (tuningOctave: string) => IAccordBuilder;
	}
	export function patchAccord(base: Accord, builder: (build: IAccordBuilder) => IAccordBuilder): IAny[];
	export function buildAccord(builder: (build: IAccordBuilder) => IAccordBuilder): Accord;
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
	export function patchImage(base: Image, builder: (build: IImageBuilder) => IImageBuilder): IAny[];
	export function buildImage(builder: (build: IImageBuilder) => IImageBuilder): Image;
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
	export function patchPrincipalVoice(base: PrincipalVoice, builder: (build: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder): IAny[];
	export function buildPrincipalVoice(builder: (build: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder): PrincipalVoice;
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
	export function patchAccordionRegistration(base: AccordionRegistration, builder: (build: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder): IAny[];
	export function buildAccordionRegistration(builder: (build: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder): AccordionRegistration;
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
	export function patchPercussion(base: Percussion, builder: (build: IPercussionBuilder) => IPercussionBuilder): IAny[];
	export function buildPercussion(builder: (build: IPercussionBuilder) => IPercussionBuilder): Percussion;
	export interface ITimpaniBuilder {
	    build?: () => Timpani;
	    patch: () => IAny[];
	}
	export function patchTimpani(base: Timpani, builder: (build: ITimpaniBuilder) => ITimpaniBuilder): IAny[];
	export function buildTimpani(builder: (build: ITimpaniBuilder) => ITimpaniBuilder): Timpani;
	export interface IBeaterBuilder {
	    build?: () => Beater;
	    patch: () => IAny[];
	    data: (data: string) => IBeaterBuilder;
	    tip: (tip: TipDirection) => IBeaterBuilder;
	}
	export function patchBeater(base: Beater, builder: (build: IBeaterBuilder) => IBeaterBuilder): IAny[];
	export function buildBeater(builder: (build: IBeaterBuilder) => IBeaterBuilder): Beater;
	export interface IStickBuilder {
	    build?: () => Stick;
	    patch: () => IAny[];
	    stickMaterial: (stickMaterial: string) => IStickBuilder;
	    stickType: (stickType: string) => IStickBuilder;
	    tip: (tip: TipDirection) => IStickBuilder;
	}
	export function patchStick(base: Stick, builder: (build: IStickBuilder) => IStickBuilder): IAny[];
	export function buildStick(builder: (build: IStickBuilder) => IStickBuilder): Stick;
	export interface IOffsetBuilder {
	    build?: () => Offset;
	    patch: () => IAny[];
	    data: (data: string) => IOffsetBuilder;
	    sound: (sound: boolean) => IOffsetBuilder;
	}
	export function patchOffset(base: Offset, builder: (build: IOffsetBuilder) => IOffsetBuilder): IAny[];
	export function buildOffset(builder: (build: IOffsetBuilder) => IOffsetBuilder): Offset;
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
	export function patchHarmonyChord(base: HarmonyChord, builder: (build: IHarmonyChordBuilder) => IHarmonyChordBuilder): IAny[];
	export function buildHarmonyChord(builder: (build: IHarmonyChordBuilder) => IHarmonyChordBuilder): HarmonyChord;
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
	export function patchHarmony(base: Harmony, builder: (build: IHarmonyBuilder) => IHarmonyBuilder): IAny[];
	export function buildHarmony(builder: (build: IHarmonyBuilder) => IHarmonyBuilder): Harmony;
	export interface IRootBuilder {
	    build?: () => Root;
	    patch: () => IAny[];
	    rootStep: (build: RootStep | ((builder: IRootStepBuilder) => IRootStepBuilder)) => IRootBuilder;
	    rootAlter: (build: RootAlter | ((builder: IRootAlterBuilder) => IRootAlterBuilder)) => IRootBuilder;
	}
	export function patchRoot(base: Root, builder: (build: IRootBuilder) => IRootBuilder): IAny[];
	export function buildRoot(builder: (build: IRootBuilder) => IRootBuilder): Root;
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
	export function patchRootStep(base: RootStep, builder: (build: IRootStepBuilder) => IRootStepBuilder): IAny[];
	export function buildRootStep(builder: (build: IRootStepBuilder) => IRootStepBuilder): RootStep;
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
	export function patchRootAlter(base: RootAlter, builder: (build: IRootAlterBuilder) => IRootAlterBuilder): IAny[];
	export function buildRootAlter(builder: (build: IRootAlterBuilder) => IRootAlterBuilder): RootAlter;
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
	export function patchFunction(base: Function, builder: (build: IFunctionBuilder) => IFunctionBuilder): IAny[];
	export function buildFunction(builder: (build: IFunctionBuilder) => IFunctionBuilder): Function;
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
	export function patchKind(base: Kind, builder: (build: IKindBuilder) => IKindBuilder): IAny[];
	export function buildKind(builder: (build: IKindBuilder) => IKindBuilder): Kind;
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
	export function patchInversion(base: Inversion, builder: (build: IInversionBuilder) => IInversionBuilder): IAny[];
	export function buildInversion(builder: (build: IInversionBuilder) => IInversionBuilder): Inversion;
	export interface IBassBuilder {
	    build?: () => Bass;
	    patch: () => IAny[];
	    bassStep: (build: BassStep | ((builder: IBassStepBuilder) => IBassStepBuilder)) => IBassBuilder;
	    bassAlter: (build: BassAlter | ((builder: IBassAlterBuilder) => IBassAlterBuilder)) => IBassBuilder;
	}
	export function patchBass(base: Bass, builder: (build: IBassBuilder) => IBassBuilder): IAny[];
	export function buildBass(builder: (build: IBassBuilder) => IBassBuilder): Bass;
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
	export function patchBassStep(base: BassStep, builder: (build: IBassStepBuilder) => IBassStepBuilder): IAny[];
	export function buildBassStep(builder: (build: IBassStepBuilder) => IBassStepBuilder): BassStep;
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
	export function patchBassAlter(base: BassAlter, builder: (build: IBassAlterBuilder) => IBassAlterBuilder): IAny[];
	export function buildBassAlter(builder: (build: IBassAlterBuilder) => IBassAlterBuilder): BassAlter;
	export interface IDegreeBuilder {
	    build?: () => Degree;
	    patch: () => IAny[];
	    degreeAlter: (build: DegreeAlter | ((builder: IDegreeAlterBuilder) => IDegreeAlterBuilder)) => IDegreeBuilder;
	    degreeValue: (build: DegreeValue | ((builder: IDegreeValueBuilder) => IDegreeValueBuilder)) => IDegreeBuilder;
	    degreeType: (build: DegreeType | ((builder: IDegreeTypeBuilder) => IDegreeTypeBuilder)) => IDegreeBuilder;
	    printObject: (printObject: boolean) => IDegreeBuilder;
	}
	export function patchDegree(base: Degree, builder: (build: IDegreeBuilder) => IDegreeBuilder): IAny[];
	export function buildDegree(builder: (build: IDegreeBuilder) => IDegreeBuilder): Degree;
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
	export function patchDegreeValue(base: DegreeValue, builder: (build: IDegreeValueBuilder) => IDegreeValueBuilder): IAny[];
	export function buildDegreeValue(builder: (build: IDegreeValueBuilder) => IDegreeValueBuilder): DegreeValue;
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
	export function patchDegreeAlter(base: DegreeAlter, builder: (build: IDegreeAlterBuilder) => IDegreeAlterBuilder): IAny[];
	export function buildDegreeAlter(builder: (build: IDegreeAlterBuilder) => IDegreeAlterBuilder): DegreeAlter;
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
	export function patchDegreeType(base: DegreeType, builder: (build: IDegreeTypeBuilder) => IDegreeTypeBuilder): IAny[];
	export function buildDegreeType(builder: (build: IDegreeTypeBuilder) => IDegreeTypeBuilder): DegreeType;
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
	export function patchFrame(base: Frame, builder: (build: IFrameBuilder) => IFrameBuilder): IAny[];
	export function buildFrame(builder: (build: IFrameBuilder) => IFrameBuilder): Frame;
	export interface IFirstFretBuilder {
	    build?: () => FirstFret;
	    patch: () => IAny[];
	    text: (text: string) => IFirstFretBuilder;
	    location: (location: LeftRight) => IFirstFretBuilder;
	    data: (data: string) => IFirstFretBuilder;
	}
	export function patchFirstFret(base: FirstFret, builder: (build: IFirstFretBuilder) => IFirstFretBuilder): IAny[];
	export function buildFirstFret(builder: (build: IFirstFretBuilder) => IFirstFretBuilder): FirstFret;
	export interface IFrameNoteBuilder {
	    build?: () => FrameNote;
	    patch: () => IAny[];
	    barre: (build: Barre | ((builder: IBarreBuilder) => IBarreBuilder)) => IFrameNoteBuilder;
	    string: (build: String | ((builder: IStringBuilder) => IStringBuilder)) => IFrameNoteBuilder;
	    fingering: (build: Fingering | ((builder: IFingeringBuilder) => IFingeringBuilder)) => IFrameNoteBuilder;
	    fret: (build: Fret | ((builder: IFretBuilder) => IFretBuilder)) => IFrameNoteBuilder;
	}
	export function patchFrameNote(base: FrameNote, builder: (build: IFrameNoteBuilder) => IFrameNoteBuilder): IAny[];
	export function buildFrameNote(builder: (build: IFrameNoteBuilder) => IFrameNoteBuilder): FrameNote;
	export interface IBarreBuilder {
	    build?: () => Barre;
	    patch: () => IAny[];
	    type: (type: StartStop) => IBarreBuilder;
	    color: (color: string) => IBarreBuilder;
	}
	export function patchBarre(base: Barre, builder: (build: IBarreBuilder) => IBarreBuilder): IAny[];
	export function buildBarre(builder: (build: IBarreBuilder) => IBarreBuilder): Barre;
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
	export function patchGrouping(base: Grouping, builder: (build: IGroupingBuilder) => IGroupingBuilder): IAny[];
	export function buildGrouping(builder: (build: IGroupingBuilder) => IGroupingBuilder): Grouping;
	export interface IFeatureBuilder {
	    build?: () => Feature;
	    patch: () => IAny[];
	    data: (data: string) => IFeatureBuilder;
	    type: (type: string) => IFeatureBuilder;
	}
	export function patchFeature(base: Feature, builder: (build: IFeatureBuilder) => IFeatureBuilder): IAny[];
	export function buildFeature(builder: (build: IFeatureBuilder) => IFeatureBuilder): Feature;
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
	export function patchPrint(base: Print, builder: (build: IPrintBuilder) => IPrintBuilder): IAny[];
	export function buildPrint(builder: (build: IPrintBuilder) => IPrintBuilder): Print;
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
	export function patchMeasureNumbering(base: MeasureNumbering, builder: (build: IMeasureNumberingBuilder) => IMeasureNumberingBuilder): IAny[];
	export function buildMeasureNumbering(builder: (build: IMeasureNumberingBuilder) => IMeasureNumberingBuilder): MeasureNumbering;
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
	export function patchSound(base: Sound, builder: (build: ISoundBuilder) => ISoundBuilder): IAny[];
	export function buildSound(builder: (build: ISoundBuilder) => ISoundBuilder): Sound;
	export interface IWorkBuilder {
	    build?: () => Work;
	    patch: () => IAny[];
	    workNumber: (workNumber: string) => IWorkBuilder;
	    workTitle: (workTitle: string) => IWorkBuilder;
	    opus: (build: Opus | ((builder: IOpusBuilder) => IOpusBuilder)) => IWorkBuilder;
	}
	export function patchWork(base: Work, builder: (build: IWorkBuilder) => IWorkBuilder): IAny[];
	export function buildWork(builder: (build: IWorkBuilder) => IWorkBuilder): Work;
	export interface IOpusBuilder {
	    build?: () => Opus;
	    patch: () => IAny[];
	}
	export function patchOpus(base: Opus, builder: (build: IOpusBuilder) => IOpusBuilder): IAny[];
	export function buildOpus(builder: (build: IOpusBuilder) => IOpusBuilder): Opus;
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
	export function patchDefaults(base: Defaults, builder: (build: IDefaultsBuilder) => IDefaultsBuilder): IAny[];
	export function buildDefaults(builder: (build: IDefaultsBuilder) => IDefaultsBuilder): Defaults;
	export interface IMusicFontBuilder {
	    build?: () => MusicFont;
	    patch: () => IAny[];
	    fontFamily: (fontFamily: string) => IMusicFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IMusicFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IMusicFontBuilder;
	    fontSize: (fontSize: string) => IMusicFontBuilder;
	}
	export function patchMusicFont(base: MusicFont, builder: (build: IMusicFontBuilder) => IMusicFontBuilder): IAny[];
	export function buildMusicFont(builder: (build: IMusicFontBuilder) => IMusicFontBuilder): MusicFont;
	export interface IWordFontBuilder {
	    build?: () => WordFont;
	    patch: () => IAny[];
	    fontFamily: (fontFamily: string) => IWordFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IWordFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IWordFontBuilder;
	    fontSize: (fontSize: string) => IWordFontBuilder;
	}
	export function patchWordFont(base: WordFont, builder: (build: IWordFontBuilder) => IWordFontBuilder): IAny[];
	export function buildWordFont(builder: (build: IWordFontBuilder) => IWordFontBuilder): WordFont;
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
	export function patchLyricFont(base: LyricFont, builder: (build: ILyricFontBuilder) => ILyricFontBuilder): IAny[];
	export function buildLyricFont(builder: (build: ILyricFontBuilder) => ILyricFontBuilder): LyricFont;
	export interface ILyricLanguageBuilder {
	    build?: () => LyricLanguage;
	    patch: () => IAny[];
	    number: (number: number) => ILyricLanguageBuilder;
	    name: (name: string) => ILyricLanguageBuilder;
	}
	export function patchLyricLanguage(base: LyricLanguage, builder: (build: ILyricLanguageBuilder) => ILyricLanguageBuilder): IAny[];
	export function buildLyricLanguage(builder: (build: ILyricLanguageBuilder) => ILyricLanguageBuilder): LyricLanguage;
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
	export function patchCredit(base: Credit, builder: (build: ICreditBuilder) => ICreditBuilder): IAny[];
	export function buildCredit(builder: (build: ICreditBuilder) => ICreditBuilder): Credit;
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
	export function patchCreditWords(base: CreditWords, builder: (build: ICreditWordsBuilder) => ICreditWordsBuilder): IAny[];
	export function buildCreditWords(builder: (build: ICreditWordsBuilder) => ICreditWordsBuilder): CreditWords;
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
	export function patchCreditImage(base: CreditImage, builder: (build: ICreditImageBuilder) => ICreditImageBuilder): IAny[];
	export function buildCreditImage(builder: (build: ICreditImageBuilder) => ICreditImageBuilder): CreditImage;
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
	export function patchScorePart(base: ScorePart, builder: (build: IScorePartBuilder) => IScorePartBuilder): IAny[];
	export function buildScorePart(builder: (build: IScorePartBuilder) => IScorePartBuilder): ScorePart;
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
	export function patchPartName(base: PartName, builder: (build: IPartNameBuilder) => IPartNameBuilder): IAny[];
	export function buildPartName(builder: (build: IPartNameBuilder) => IPartNameBuilder): PartName;
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
	export function patchPartAbbreviation(base: PartAbbreviation, builder: (build: IPartAbbreviationBuilder) => IPartAbbreviationBuilder): IAny[];
	export function buildPartAbbreviation(builder: (build: IPartAbbreviationBuilder) => IPartAbbreviationBuilder): PartAbbreviation;
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
	export function patchPartGroup(base: PartGroup, builder: (build: IPartGroupBuilder) => IPartGroupBuilder): IAny[];
	export function buildPartGroup(builder: (build: IPartGroupBuilder) => IPartGroupBuilder): PartGroup;
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
	export function patchGroupName(base: GroupName, builder: (build: IGroupNameBuilder) => IGroupNameBuilder): IAny[];
	export function buildGroupName(builder: (build: IGroupNameBuilder) => IGroupNameBuilder): GroupName;
	export interface IGroupNameDisplayBuilder {
	    build?: () => GroupNameDisplay;
	    patch: () => IAny[];
	    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IGroupNameDisplayBuilder;
	    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IGroupNameDisplayBuilder;
	    name: (name: TextSegment[]) => IGroupNameDisplayBuilder;
	    printObject: (printObject: boolean) => IGroupNameDisplayBuilder;
	}
	export function patchGroupNameDisplay(base: GroupNameDisplay, builder: (build: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder): IAny[];
	export function buildGroupNameDisplay(builder: (build: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder): GroupNameDisplay;
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
	export function patchGroupAbbreviation(base: GroupAbbreviation, builder: (build: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder): IAny[];
	export function buildGroupAbbreviation(builder: (build: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder): GroupAbbreviation;
	export interface IGroupAbbreviationDisplayBuilder {
	    build?: () => GroupAbbreviationDisplay;
	    patch: () => IAny[];
	    nameAt: (idx: number, build: TextSegment | ((builder: ITextSegmentBuilder) => ITextSegmentBuilder)) => IGroupAbbreviationDisplayBuilder;
	    nameSplice: (start: number, deleteCount: number, ...items: TextSegment[]) => IGroupAbbreviationDisplayBuilder;
	    name: (name: TextSegment[]) => IGroupAbbreviationDisplayBuilder;
	    printObject: (printObject: boolean) => IGroupAbbreviationDisplayBuilder;
	}
	export function patchGroupAbbreviationDisplay(base: GroupAbbreviationDisplay, builder: (build: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder): IAny[];
	export function buildGroupAbbreviationDisplay(builder: (build: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder): GroupAbbreviationDisplay;
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
	export function patchGroupSymbol(base: GroupSymbol, builder: (build: IGroupSymbolBuilder) => IGroupSymbolBuilder): IAny[];
	export function buildGroupSymbol(builder: (build: IGroupSymbolBuilder) => IGroupSymbolBuilder): GroupSymbol;
	export interface IGroupBarlineBuilder {
	    build?: () => GroupBarline;
	    patch: () => IAny[];
	    data: (data: string) => IGroupBarlineBuilder;
	    color: (color: string) => IGroupBarlineBuilder;
	}
	export function patchGroupBarline(base: GroupBarline, builder: (build: IGroupBarlineBuilder) => IGroupBarlineBuilder): IAny[];
	export function buildGroupBarline(builder: (build: IGroupBarlineBuilder) => IGroupBarlineBuilder): GroupBarline;
	export interface IGroupTimeBuilder {
	    build?: () => GroupTime;
	    patch: () => IAny[];
	}
	export function patchGroupTime(base: GroupTime, builder: (build: IGroupTimeBuilder) => IGroupTimeBuilder): IAny[];
	export function buildGroupTime(builder: (build: IGroupTimeBuilder) => IGroupTimeBuilder): GroupTime;
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
	export function patchScoreInstrument(base: ScoreInstrument, builder: (build: IScoreInstrumentBuilder) => IScoreInstrumentBuilder): IAny[];
	export function buildScoreInstrument(builder: (build: IScoreInstrumentBuilder) => IScoreInstrumentBuilder): ScoreInstrument;
	export interface ISoloBuilder {
	    build?: () => Solo;
	    patch: () => IAny[];
	}
	export function patchSolo(base: Solo, builder: (build: ISoloBuilder) => ISoloBuilder): IAny[];
	export function buildSolo(builder: (build: ISoloBuilder) => ISoloBuilder): Solo;
	export interface IVirtualInstrumentBuilder {
	    build?: () => VirtualInstrument;
	    patch: () => IAny[];
	    virtualLibrary: (virtualLibrary: string) => IVirtualInstrumentBuilder;
	    virtualName: (virtualName: string) => IVirtualInstrumentBuilder;
	}
	export function patchVirtualInstrument(base: VirtualInstrument, builder: (build: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder): IAny[];
	export function buildVirtualInstrument(builder: (build: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder): VirtualInstrument;
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
	export function patchScoreHeader(base: ScoreHeader, builder: (build: IScoreHeaderBuilder) => IScoreHeaderBuilder): IAny[];
	export function buildScoreHeader(builder: (build: IScoreHeaderBuilder) => IScoreHeaderBuilder): ScoreHeader;
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
	export function patchScoreTimewise(base: ScoreTimewise, builder: (build: IScoreTimewiseBuilder) => IScoreTimewiseBuilder): IAny[];
	export function buildScoreTimewise(builder: (build: IScoreTimewiseBuilder) => IScoreTimewiseBuilder): ScoreTimewise;
	export interface IMeasureBuilder {
	    build?: () => Measure;
	    patch: () => IAny[];
	    number: (number: string) => IMeasureBuilder;
	    implicit: (implicit: boolean) => IMeasureBuilder;
	    width: (width: number) => IMeasureBuilder;
	    set: (key: string, val: boolean[]) => IMeasureBuilder;
	    nonControlling: (nonControlling: boolean) => IMeasureBuilder;
	}
	export function patchMeasure(base: Measure, builder: (build: IMeasureBuilder) => IMeasureBuilder): IAny[];
	export function buildMeasure(builder: (build: IMeasureBuilder) => IMeasureBuilder): Measure;

}
declare module 'musicxml-interfaces' {
	import main = require('musicxml-interfaces/index');
	export = main;
}
