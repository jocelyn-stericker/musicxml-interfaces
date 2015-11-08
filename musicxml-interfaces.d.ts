declare module 'musicxml-interfaces/musicxml-interfaces' {
	/**
	 * Converts a MusicXML document into a MusicXML parttime-inspired JSON object.
	 * See ScoreTimewise for full return type specification.
	 *
	 * This function will accept timepart MusicXML files, but will still return a
	 * structure similar to parttime.
	 */
	export function parse(score: string): ScoreTimewise;
	export module parse {
	    /**
	     * Reads a document, and returns header information.
	     *
	     * ScoreHeader is a subset of ScoreTimewise, so you can always just call MusicXML.parse.score.
	     * This function is a bit faster though, if you only care about metadata.
	     */
	    function scoreHeader(score: string): ScoreHeader;
	    /**
	     * Converts a MusicXML <measure /> from a **parttime** document into JSON.
	     */
	    function measure(str: string): Measure;
	    /**
	     * Converts a MusicXML <note /> into JSON.
	     */
	    function note(str: string): Note;
	    /**
	     * Converts a MusicXML <clef /> into JSON.
	     */
	    function clef(str: string): Clef;
	    /**
	     * Converts a MusicXML <time /> into JSON.
	     */
	    function time(str: string): Time;
	    /**
	     * Converts a MusicXML <key /> into JSON.
	     */
	    function key(str: string): Key;
	    /**
	     * Converts a MusicXML <part-symbol /> into JSON.
	     */
	    function partSymbol(str: string): PartSymbol;
	    /**
	     * Converts a MusicXML <backup /> into JSON.
	     */
	    function backup(str: string): Backup;
	    /**
	     * Converts a MusicXML <harmony /> into JSON.
	     */
	    function harmony(str: string): Harmony;
	    /**
	     * Converts a MusicXML <forward /> into JSON.
	     */
	    function forward(str: string): Forward;
	    /**
	     * Converts a MusicXML <print /> into JSON.
	     */
	    function print(str: string): Print;
	    /**
	     * Converts a MusicXML <figured-bass /> into JSON.
	     */
	    function figuredBass(str: string): FiguredBass;
	    /**
	     * Converts a MusicXML <direction /> into JSON.
	     */
	    function direction(str: string): Direction;
	    /**
	     * Converts a MusicXML <attributes /> object into JSON.
	     */
	    function attributes(str: string): Attributes;
	    /**
	     * Converts a MusicXML <sound /> into JSON.
	     */
	    function sound(str: string): Sound;
	    /**
	     * Converts a MusicXML <barline /> into JSON.
	     */
	    function barline(str: string): Barline;
	    /**
	     * Converts a MusicXML <grouping /> into JSON.
	     */
	    function grouping(str: string): Grouping;
	}
	export function serialize(score: ScoreTimewise): string;
	export module serialize {
	    function scoreHeader(scoreHeader: ScoreHeader): string;
	    let measure: (measure: Measure) => string;
	    let note: (note: Note) => string;
	    let clef: (clef: Clef) => string;
	    let time: (time: Time) => string;
	    let key: (key: Key) => string;
	    let partSymbol: (partSymbol: PartSymbol) => string;
	    let backup: (backup: Backup) => string;
	    let harmony: (harmony: Harmony) => string;
	    let forward: (forward: Forward) => string;
	    let print: (print: Print) => string;
	    let figuredBass: (figuredBass: FiguredBass) => string;
	    let direction: (direction: Direction) => string;
	    let attributes: (attributes: Attributes) => string;
	    let sound: (sound: Sound) => string;
	    let barline: (barline: Barline) => string;
	    let grouping: (grouping: Grouping) => string;
	}
	export interface TextArray extends Array<TextArray> {
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
	    name: TextArray;
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
	    name: TextArray;
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
	    miscellaneous: Miscellaneous;
	    creators?: Creator[];
	    relations?: Relation[];
	    rights?: Rights[];
	    encoding: Encoding;
	    source: string;
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
	    value: string;
	    type: string;
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
	    keySteps: string[];
	    keyOctaves?: KeyOctave[];
	    number?: number;
	    fifths: number;
	    keyAlters: string[];
	    keyAccidentals: string[];
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
	    clefOctaveChange: string;
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
	    divisions: number;
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
	    displayOctave?: string;
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
	    displayOctave?: string;
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
	    codaAttrib: string;
	    wavyLine?: WavyLine;
	    fermatas?: Fermata[];
	    segnoAttrib: string;
	    divisions: number;
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
	    number: number;
	    niente: boolean;
	    type: WedgeType;
	    spread: number;
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
	    /** Equals "ScorePart" */
	    _class: string;
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
	    _class: string;
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
	    name: TextArray;
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
	    name: TextArray;
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
	    instrumentSound: string;
	    ensemble: string;
	    virtualInstrument: VirtualInstrument;
	    instrumentAbbreviation: string;
	    solo: Solo;
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
	    implicit: boolean;
	    width: number;
	    parts: {
	        [key: string]: any[];
	    };
	    nonControlling: boolean;
	}

}
declare module 'musicxml-interfaces/builders' {
	import { StartStop, StartStopContinue, StartStopSingle, SymbolSize, AboveBelow, OverUnder, UpDown, TopBottom, LeftRight, EnclosureShape, NormalItalic, NormalBold, LeftCenterRight, TopMiddleBottomBaseline, DirectionMode, StraightCurved, SolidDashedDottedWavy, NormalAngledSquare, UprightInverted, UpperMainBelow, WholeHalfUnison, WholeHalfNone, OddEvenBoth, CueGraceLarge, SeparatorType, TimeSymbolType, CancelLocation, PartSymbolType, ShowFretsType, Count, MxmlAccidental, StemType, NoteheadType, BeamType, AccelRitNone, ActualBothNone, HoleLocation, HoleClosedType, BreathMarkType, SyllabicType, BarlineLocation, BarStyleType, StartStopDiscontinue, WingedType, DirectionTypeBg, TipDirection, WedgeType, LineEndType, PedalType, OctaveShiftType, VoiceSymbol, ExplicitImpliedAlternate, ChordType, TextArray, EncodingDate, CalendarDate, Position, Placement, Orientation, DirectiveEntity, Bezier, Font, Color, TextDecoration, Justify, Halign, Valign, ValignImage, LetterSpacing, LineHeight, TextDirection, TextRotation, Enclosure, PrintStyle, PrintStyleAlign, LineShape, LineType, DashedFormatting, PrintObject, PrintSpacing, Printout, TextFormatting, LevelDisplay, TrillSound, BendSound, TimeOnly, DocumentAttributes, Editorial, EditorialVoice, Footnote, Level, Fermata, WavyLine, Segno, Coda, NormalDot, Dynamics, Fingering, Fret, String, DisplayText, AccidentalText, PartNameDisplay, PartAbbreviationDisplay, MidiDevice, MidiInstrument, Play, OtherPlay, Scaling, PageMargins, PageLayout, SystemLayout, SystemMargins, SystemDividers, LeftDivider, RightDivider, StaffLayout, MeasureLayout, LineWidth, NoteSize, Distance, Appearance, Creator, Rights, Encoder, Relation, MiscellaneousField, Miscellaneous, Identification, Supports, Encoding, TimeSeparator, TimeSymbol, Cancel, KeyOctave, Key, Time, Interchangeable, PartSymbol, Clef, StaffTuning, StaffDetails, Double, Transpose, Directive, SlashDot, MultipleRest, MeasureRepeat, BeatRepeat, Slash, MeasureStyle, Attributes, Cue, Grace, Chord, Unpitched, Pitch, FullNote, Rest, Tie, Instrument, Note, Type, Dot, Accidental, TimeModification, Stem, Notehead, NoteheadText, Beam, Notations, Tied, Slur, Tuplet, TupletActual, TupletNormal, TupletNumber, TupletType, TupletDot, Glissando, Slide, OtherNotation, OtherDirection, Ornaments, TrillMark, Turn, DelayedTurn, InvertedTurn, DelayedInvertedTurn, VerticalTurn, Shake, Mordent, InvertedMordent, Schleifer, Tremolo, OtherOrnament, AccidentalMark, Technical, UpBow, DownBow, Harmonic, OpenString, ThumbPosition, Pluck, DoubleTongue, TripleTongue, Stopped, SnapPizzicato, HammerOn, PullOff, Bend, WithBar, Tap, Heel, Toe, Fingernails, Hole, HoleClosed, Arrow, Handbell, OtherTechnical, Articulations, Accent, StrongAccent, Staccato, Tenuto, DetachedLegato, Staccatissimo, Spiccato, Scoop, Plop, Doit, Falloff, BreathMark, Caesura, Stress, Unstress, OtherArticulation, Arpeggiate, NonArpeggiate, Laughing, Humming, EndLine, EndParagraph, LyricParts, Lyric, Text, Syllabic, Elision, Extend, FiguredBass, Figure, Prefix, FigureNumber, Suffix, Backup, Forward, Barline, BarStyle, Ending, Repeat, Direction, DirectionType, Rehearsal, Words, Wedge, Dashes, Bracket, Pedal, Metronome, BeatUnitDot, PerMinute, MetronomeNote, MetronomeDot, MetronomeBeam, MetronomeTuplet, OctaveShift, HarpPedals, PedalTuning, Damp, DampAll, Eyeglasses, StringMute, Scordatura, Accord, Image, PrincipalVoice, AccordionRegistration, Percussion, Timpani, Beater, Stick, Offset, HarmonyChord, Harmony, Root, RootStep, RootAlter, Function, Kind, Inversion, Bass, BassStep, BassAlter, Degree, DegreeValue, DegreeAlter, DegreeType, Frame, FirstFret, FrameNote, Barre, Grouping, Feature, Print, MeasureNumbering, Sound, Work, Opus, Defaults, MusicFont, WordFont, LyricFont, LyricLanguage, Credit, CreditWords, CreditImage, ScorePart, PartName, PartAbbreviation, PartGroup, GroupName, GroupNameDisplay, GroupAbbreviation, GroupAbbreviationDisplay, GroupSymbol, GroupBarline, GroupTime, ScoreInstrument, Solo, VirtualInstrument, ScoreHeader, ScoreTimewise, Measure, PartList } from 'musicxml-interfaces/musicxml-interfaces';
	export interface ITextArrayBuilder {
	    build: () => TextArray;
	    patch: () => any[];
	    acc: (build: (builder: IAccidentalTextBuilder) => IAccidentalTextBuilder) => ITextArrayBuilder;
	    text: (build: (builder: IDisplayTextBuilder) => IDisplayTextBuilder) => ITextArrayBuilder;
	}
	export function patchTextArray(base: TextArray): ITextArrayBuilder;
	export function buildTextArray(): ITextArrayBuilder;
	export interface IEncodingDateBuilder {
	    build: () => EncodingDate;
	    patch: () => any[];
	    month: (month: number) => IEncodingDateBuilder;
	    day: (day: number) => IEncodingDateBuilder;
	    year: (year: number) => IEncodingDateBuilder;
	}
	export function patchEncodingDate(base: EncodingDate): IEncodingDateBuilder;
	export function buildEncodingDate(): IEncodingDateBuilder;
	export interface ICalendarDateBuilder {
	    build: () => CalendarDate;
	    patch: () => any[];
	    month: (month: number) => ICalendarDateBuilder;
	    day: (day: number) => ICalendarDateBuilder;
	    year: (year: number) => ICalendarDateBuilder;
	}
	export function patchCalendarDate(base: CalendarDate): ICalendarDateBuilder;
	export function buildCalendarDate(): ICalendarDateBuilder;
	export interface IPositionBuilder {
	    build: () => Position;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IPositionBuilder;
	    relativeY: (relativeY: number) => IPositionBuilder;
	    defaultY: (defaultY: number) => IPositionBuilder;
	    relativeX: (relativeX: number) => IPositionBuilder;
	}
	export function patchPosition(base: Position): IPositionBuilder;
	export function buildPosition(): IPositionBuilder;
	export interface IPlacementBuilder {
	    build: () => Placement;
	    patch: () => any[];
	    placement: (placement: AboveBelow) => IPlacementBuilder;
	}
	export function patchPlacement(base: Placement): IPlacementBuilder;
	export function buildPlacement(): IPlacementBuilder;
	export interface IOrientationBuilder {
	    build: () => Orientation;
	    patch: () => any[];
	    orientation: (orientation: OverUnder) => IOrientationBuilder;
	}
	export function patchOrientation(base: Orientation): IOrientationBuilder;
	export function buildOrientation(): IOrientationBuilder;
	export interface IDirectiveEntityBuilder {
	    build: () => DirectiveEntity;
	    patch: () => any[];
	    directive: (directive: boolean) => IDirectiveEntityBuilder;
	}
	export function patchDirectiveEntity(base: DirectiveEntity): IDirectiveEntityBuilder;
	export function buildDirectiveEntity(): IDirectiveEntityBuilder;
	export interface IBezierBuilder {
	    build: () => Bezier;
	    patch: () => any[];
	    bezierX2: (bezierX2: number) => IBezierBuilder;
	    bezierOffset: (bezierOffset: number) => IBezierBuilder;
	    bezierOffset2: (bezierOffset2: number) => IBezierBuilder;
	    bezierX: (bezierX: number) => IBezierBuilder;
	    bezierY: (bezierY: number) => IBezierBuilder;
	    bezierY2: (bezierY2: number) => IBezierBuilder;
	}
	export function patchBezier(base: Bezier): IBezierBuilder;
	export function buildBezier(): IBezierBuilder;
	export interface IFontBuilder {
	    build: () => Font;
	    patch: () => any[];
	    fontFamily: (fontFamily: string) => IFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IFontBuilder;
	    fontSize: (fontSize: string) => IFontBuilder;
	}
	export function patchFont(base: Font): IFontBuilder;
	export function buildFont(): IFontBuilder;
	export interface IColorBuilder {
	    build: () => Color;
	    patch: () => any[];
	    color: (color: string) => IColorBuilder;
	}
	export function patchColor(base: Color): IColorBuilder;
	export function buildColor(): IColorBuilder;
	export interface ITextDecorationBuilder {
	    build: () => TextDecoration;
	    patch: () => any[];
	    underline: (underline: number) => ITextDecorationBuilder;
	    overline: (overline: number) => ITextDecorationBuilder;
	    lineThrough: (lineThrough: number) => ITextDecorationBuilder;
	}
	export function patchTextDecoration(base: TextDecoration): ITextDecorationBuilder;
	export function buildTextDecoration(): ITextDecorationBuilder;
	export interface IJustifyBuilder {
	    build: () => Justify;
	    patch: () => any[];
	    justify: (justify: LeftCenterRight) => IJustifyBuilder;
	}
	export function patchJustify(base: Justify): IJustifyBuilder;
	export function buildJustify(): IJustifyBuilder;
	export interface IHalignBuilder {
	    build: () => Halign;
	    patch: () => any[];
	    halign: (halign: LeftCenterRight) => IHalignBuilder;
	}
	export function patchHalign(base: Halign): IHalignBuilder;
	export function buildHalign(): IHalignBuilder;
	export interface IValignBuilder {
	    build: () => Valign;
	    patch: () => any[];
	    valign: (valign: TopMiddleBottomBaseline) => IValignBuilder;
	}
	export function patchValign(base: Valign): IValignBuilder;
	export function buildValign(): IValignBuilder;
	export interface IValignImageBuilder {
	    build: () => ValignImage;
	    patch: () => any[];
	    valignImage: (valignImage: TopMiddleBottomBaseline) => IValignImageBuilder;
	}
	export function patchValignImage(base: ValignImage): IValignImageBuilder;
	export function buildValignImage(): IValignImageBuilder;
	export interface ILetterSpacingBuilder {
	    build: () => LetterSpacing;
	    patch: () => any[];
	    letterSpacing: (letterSpacing: string) => ILetterSpacingBuilder;
	}
	export function patchLetterSpacing(base: LetterSpacing): ILetterSpacingBuilder;
	export function buildLetterSpacing(): ILetterSpacingBuilder;
	export interface ILineHeightBuilder {
	    build: () => LineHeight;
	    patch: () => any[];
	    lineHeight: (lineHeight: string) => ILineHeightBuilder;
	}
	export function patchLineHeight(base: LineHeight): ILineHeightBuilder;
	export function buildLineHeight(): ILineHeightBuilder;
	export interface ITextDirectionBuilder {
	    build: () => TextDirection;
	    patch: () => any[];
	    dir: (dir: DirectionMode) => ITextDirectionBuilder;
	}
	export function patchTextDirection(base: TextDirection): ITextDirectionBuilder;
	export function buildTextDirection(): ITextDirectionBuilder;
	export interface ITextRotationBuilder {
	    build: () => TextRotation;
	    patch: () => any[];
	    rotation: (rotation: number) => ITextRotationBuilder;
	}
	export function patchTextRotation(base: TextRotation): ITextRotationBuilder;
	export function buildTextRotation(): ITextRotationBuilder;
	export interface IEnclosureBuilder {
	    build: () => Enclosure;
	    patch: () => any[];
	    enclosure: (enclosure: EnclosureShape) => IEnclosureBuilder;
	}
	export function patchEnclosure(base: Enclosure): IEnclosureBuilder;
	export function buildEnclosure(): IEnclosureBuilder;
	export interface IPrintStyleBuilder {
	    build: () => PrintStyle;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IPrintStyleBuilder;
	    relativeY: (relativeY: number) => IPrintStyleBuilder;
	    defaultY: (defaultY: number) => IPrintStyleBuilder;
	    relativeX: (relativeX: number) => IPrintStyleBuilder;
	}
	export function patchPrintStyle(base: PrintStyle): IPrintStyleBuilder;
	export function buildPrintStyle(): IPrintStyleBuilder;
	export interface IPrintStyleAlignBuilder {
	    build: () => PrintStyleAlign;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IPrintStyleAlignBuilder;
	    relativeY: (relativeY: number) => IPrintStyleAlignBuilder;
	    defaultY: (defaultY: number) => IPrintStyleAlignBuilder;
	    relativeX: (relativeX: number) => IPrintStyleAlignBuilder;
	}
	export function patchPrintStyleAlign(base: PrintStyleAlign): IPrintStyleAlignBuilder;
	export function buildPrintStyleAlign(): IPrintStyleAlignBuilder;
	export interface ILineShapeBuilder {
	    build: () => LineShape;
	    patch: () => any[];
	    lineShape: (lineShape: StraightCurved) => ILineShapeBuilder;
	}
	export function patchLineShape(base: LineShape): ILineShapeBuilder;
	export function buildLineShape(): ILineShapeBuilder;
	export interface ILineTypeBuilder {
	    build: () => LineType;
	    patch: () => any[];
	    lineType: (lineType: SolidDashedDottedWavy) => ILineTypeBuilder;
	}
	export function patchLineType(base: LineType): ILineTypeBuilder;
	export function buildLineType(): ILineTypeBuilder;
	export interface IDashedFormattingBuilder {
	    build: () => DashedFormatting;
	    patch: () => any[];
	    dashLength: (dashLength: number) => IDashedFormattingBuilder;
	    spaceLength: (spaceLength: number) => IDashedFormattingBuilder;
	}
	export function patchDashedFormatting(base: DashedFormatting): IDashedFormattingBuilder;
	export function buildDashedFormatting(): IDashedFormattingBuilder;
	export interface IPrintObjectBuilder {
	    build: () => PrintObject;
	    patch: () => any[];
	    printObject: (printObject: boolean) => IPrintObjectBuilder;
	}
	export function patchPrintObject(base: PrintObject): IPrintObjectBuilder;
	export function buildPrintObject(): IPrintObjectBuilder;
	export interface IPrintSpacingBuilder {
	    build: () => PrintSpacing;
	    patch: () => any[];
	    printSpacing: (printSpacing: boolean) => IPrintSpacingBuilder;
	}
	export function patchPrintSpacing(base: PrintSpacing): IPrintSpacingBuilder;
	export function buildPrintSpacing(): IPrintSpacingBuilder;
	export interface IPrintoutBuilder {
	    build: () => Printout;
	    patch: () => any[];
	    printDot: (printDot: boolean) => IPrintoutBuilder;
	    printLyric: (printLyric: boolean) => IPrintoutBuilder;
	    printObject: (printObject: boolean) => IPrintoutBuilder;
	}
	export function patchPrintout(base: Printout): IPrintoutBuilder;
	export function buildPrintout(): IPrintoutBuilder;
	export interface ITextFormattingBuilder {
	    build: () => TextFormatting;
	    patch: () => any[];
	    justify: (justify: LeftCenterRight) => ITextFormattingBuilder;
	}
	export function patchTextFormatting(base: TextFormatting): ITextFormattingBuilder;
	export function buildTextFormatting(): ITextFormattingBuilder;
	export interface ILevelDisplayBuilder {
	    build: () => LevelDisplay;
	    patch: () => any[];
	    bracket: (bracket: boolean) => ILevelDisplayBuilder;
	    size: (size: SymbolSize) => ILevelDisplayBuilder;
	    parentheses: (parentheses: boolean) => ILevelDisplayBuilder;
	}
	export function patchLevelDisplay(base: LevelDisplay): ILevelDisplayBuilder;
	export function buildLevelDisplay(): ILevelDisplayBuilder;
	export interface ITrillSoundBuilder {
	    build: () => TrillSound;
	    patch: () => any[];
	    startNote: (startNote: UpperMainBelow) => ITrillSoundBuilder;
	    accelerate: (accelerate: boolean) => ITrillSoundBuilder;
	    beats: (beats: number) => ITrillSoundBuilder;
	    lastBeat: (lastBeat: number) => ITrillSoundBuilder;
	    trillStep: (trillStep: WholeHalfUnison) => ITrillSoundBuilder;
	    twoNoteTurn: (twoNoteTurn: WholeHalfNone) => ITrillSoundBuilder;
	    secondBeat: (secondBeat: number) => ITrillSoundBuilder;
	}
	export function patchTrillSound(base: TrillSound): ITrillSoundBuilder;
	export function buildTrillSound(): ITrillSoundBuilder;
	export interface IBendSoundBuilder {
	    build: () => BendSound;
	    patch: () => any[];
	    accelerate: (accelerate: boolean) => IBendSoundBuilder;
	    beats: (beats: number) => IBendSoundBuilder;
	    firstBeat: (firstBeat: number) => IBendSoundBuilder;
	    lastBeat: (lastBeat: number) => IBendSoundBuilder;
	}
	export function patchBendSound(base: BendSound): IBendSoundBuilder;
	export function buildBendSound(): IBendSoundBuilder;
	export interface ITimeOnlyBuilder {
	    build: () => TimeOnly;
	    patch: () => any[];
	    timeOnly: (timeOnly: string) => ITimeOnlyBuilder;
	}
	export function patchTimeOnly(base: TimeOnly): ITimeOnlyBuilder;
	export function buildTimeOnly(): ITimeOnlyBuilder;
	export interface IDocumentAttributesBuilder {
	    build: () => DocumentAttributes;
	    patch: () => any[];
	    version: (version: string) => IDocumentAttributesBuilder;
	}
	export function patchDocumentAttributes(base: DocumentAttributes): IDocumentAttributesBuilder;
	export function buildDocumentAttributes(): IDocumentAttributesBuilder;
	export interface IEditorialBuilder {
	    build: () => Editorial;
	    patch: () => any[];
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IEditorialBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IEditorialBuilder;
	    _class: (_class: string) => IEditorialBuilder;
	}
	export function patchEditorial(base: Editorial): IEditorialBuilder;
	export function buildEditorial(): IEditorialBuilder;
	export interface IEditorialVoiceBuilder {
	    build: () => EditorialVoice;
	    patch: () => any[];
	    voice: (voice: number) => IEditorialVoiceBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IEditorialVoiceBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IEditorialVoiceBuilder;
	    _class: (_class: string) => IEditorialVoiceBuilder;
	}
	export function patchEditorialVoice(base: EditorialVoice): IEditorialVoiceBuilder;
	export function buildEditorialVoice(): IEditorialVoiceBuilder;
	export interface IFootnoteBuilder {
	    build: () => Footnote;
	    patch: () => any[];
	    text: (text: string) => IFootnoteBuilder;
	    justify: (justify: LeftCenterRight) => IFootnoteBuilder;
	}
	export function patchFootnote(base: Footnote): IFootnoteBuilder;
	export function buildFootnote(): IFootnoteBuilder;
	export interface ILevelBuilder {
	    build: () => Level;
	    patch: () => any[];
	    text: (text: string) => ILevelBuilder;
	    reference: (reference: boolean) => ILevelBuilder;
	    bracket: (bracket: boolean) => ILevelBuilder;
	    size: (size: SymbolSize) => ILevelBuilder;
	    parentheses: (parentheses: boolean) => ILevelBuilder;
	}
	export function patchLevel(base: Level): ILevelBuilder;
	export function buildLevel(): ILevelBuilder;
	export interface IFermataBuilder {
	    build: () => Fermata;
	    patch: () => any[];
	    shape: (shape: NormalAngledSquare) => IFermataBuilder;
	    type: (type: UprightInverted) => IFermataBuilder;
	    defaultX: (defaultX: number) => IFermataBuilder;
	    relativeY: (relativeY: number) => IFermataBuilder;
	    defaultY: (defaultY: number) => IFermataBuilder;
	    relativeX: (relativeX: number) => IFermataBuilder;
	}
	export function patchFermata(base: Fermata): IFermataBuilder;
	export function buildFermata(): IFermataBuilder;
	export interface IWavyLineBuilder {
	    build: () => WavyLine;
	    patch: () => any[];
	    number: (number: number) => IWavyLineBuilder;
	    type: (type: StartStopContinue) => IWavyLineBuilder;
	    defaultX: (defaultX: number) => IWavyLineBuilder;
	    relativeY: (relativeY: number) => IWavyLineBuilder;
	    defaultY: (defaultY: number) => IWavyLineBuilder;
	    relativeX: (relativeX: number) => IWavyLineBuilder;
	}
	export function patchWavyLine(base: WavyLine): IWavyLineBuilder;
	export function buildWavyLine(): IWavyLineBuilder;
	export interface ISegnoBuilder {
	    build: () => Segno;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ISegnoBuilder;
	    relativeY: (relativeY: number) => ISegnoBuilder;
	    defaultY: (defaultY: number) => ISegnoBuilder;
	    relativeX: (relativeX: number) => ISegnoBuilder;
	}
	export function patchSegno(base: Segno): ISegnoBuilder;
	export function buildSegno(): ISegnoBuilder;
	export interface ICodaBuilder {
	    build: () => Coda;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ICodaBuilder;
	    relativeY: (relativeY: number) => ICodaBuilder;
	    defaultY: (defaultY: number) => ICodaBuilder;
	    relativeX: (relativeX: number) => ICodaBuilder;
	}
	export function patchCoda(base: Coda): ICodaBuilder;
	export function buildCoda(): ICodaBuilder;
	export interface INormalDotBuilder {
	    build: () => NormalDot;
	    patch: () => any[];
	}
	export function patchNormalDot(base: NormalDot): INormalDotBuilder;
	export function buildNormalDot(): INormalDotBuilder;
	export interface IDynamicsBuilder {
	    build: () => Dynamics;
	    patch: () => any[];
	    fp: (fp: boolean) => IDynamicsBuilder;
	    pp: (pp: boolean) => IDynamicsBuilder;
	    ppp: (ppp: boolean) => IDynamicsBuilder;
	    fff: (fff: boolean) => IDynamicsBuilder;
	    sf: (sf: boolean) => IDynamicsBuilder;
	    rf: (rf: boolean) => IDynamicsBuilder;
	    mp: (mp: boolean) => IDynamicsBuilder;
	    sfpp: (sfpp: boolean) => IDynamicsBuilder;
	    f: (f: boolean) => IDynamicsBuilder;
	    ffffff: (ffffff: boolean) => IDynamicsBuilder;
	    sfz: (sfz: boolean) => IDynamicsBuilder;
	    ff: (ff: boolean) => IDynamicsBuilder;
	    pppppp: (pppppp: boolean) => IDynamicsBuilder;
	    rfz: (rfz: boolean) => IDynamicsBuilder;
	    otherDynamics: (otherDynamics: string) => IDynamicsBuilder;
	    fz: (fz: boolean) => IDynamicsBuilder;
	    ppppp: (ppppp: boolean) => IDynamicsBuilder;
	    mf: (mf: boolean) => IDynamicsBuilder;
	    pppp: (pppp: boolean) => IDynamicsBuilder;
	    fffff: (fffff: boolean) => IDynamicsBuilder;
	    sffz: (sffz: boolean) => IDynamicsBuilder;
	    sfp: (sfp: boolean) => IDynamicsBuilder;
	    p: (p: boolean) => IDynamicsBuilder;
	    ffff: (ffff: boolean) => IDynamicsBuilder;
	    defaultX: (defaultX: number) => IDynamicsBuilder;
	    relativeY: (relativeY: number) => IDynamicsBuilder;
	    defaultY: (defaultY: number) => IDynamicsBuilder;
	    relativeX: (relativeX: number) => IDynamicsBuilder;
	}
	export function patchDynamics(base: Dynamics): IDynamicsBuilder;
	export function buildDynamics(): IDynamicsBuilder;
	export interface IFingeringBuilder {
	    build: () => Fingering;
	    patch: () => any[];
	    substitution: (substitution: boolean) => IFingeringBuilder;
	    finger: (finger: number) => IFingeringBuilder;
	    alternate: (alternate: boolean) => IFingeringBuilder;
	    defaultX: (defaultX: number) => IFingeringBuilder;
	    relativeY: (relativeY: number) => IFingeringBuilder;
	    defaultY: (defaultY: number) => IFingeringBuilder;
	    relativeX: (relativeX: number) => IFingeringBuilder;
	}
	export function patchFingering(base: Fingering): IFingeringBuilder;
	export function buildFingering(): IFingeringBuilder;
	export interface IFretBuilder {
	    build: () => Fret;
	    patch: () => any[];
	    fret: (fret: number) => IFretBuilder;
	    fontFamily: (fontFamily: string) => IFretBuilder;
	    fontWeight: (fontWeight: NormalBold) => IFretBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IFretBuilder;
	    fontSize: (fontSize: string) => IFretBuilder;
	}
	export function patchFret(base: Fret): IFretBuilder;
	export function buildFret(): IFretBuilder;
	export interface IStringBuilder {
	    build: () => String;
	    patch: () => any[];
	    stringNum: (stringNum: number) => IStringBuilder;
	    defaultX: (defaultX: number) => IStringBuilder;
	    relativeY: (relativeY: number) => IStringBuilder;
	    defaultY: (defaultY: number) => IStringBuilder;
	    relativeX: (relativeX: number) => IStringBuilder;
	}
	export function patchString(base: String): IStringBuilder;
	export function buildString(): IStringBuilder;
	export interface IDisplayTextBuilder {
	    build: () => DisplayText;
	    patch: () => any[];
	    text: (text: string) => IDisplayTextBuilder;
	    justify: (justify: LeftCenterRight) => IDisplayTextBuilder;
	}
	export function patchDisplayText(base: DisplayText): IDisplayTextBuilder;
	export function buildDisplayText(): IDisplayTextBuilder;
	export interface IAccidentalTextBuilder {
	    build: () => AccidentalText;
	    patch: () => any[];
	    text: (text: string) => IAccidentalTextBuilder;
	    justify: (justify: LeftCenterRight) => IAccidentalTextBuilder;
	}
	export function patchAccidentalText(base: AccidentalText): IAccidentalTextBuilder;
	export function buildAccidentalText(): IAccidentalTextBuilder;
	export interface IPartNameDisplayBuilder {
	    build: () => PartNameDisplay;
	    patch: () => any[];
	    name: (build: (builder: ITextArrayBuilder) => ITextArrayBuilder) => IPartNameDisplayBuilder;
	    printObject: (printObject: boolean) => IPartNameDisplayBuilder;
	}
	export function patchPartNameDisplay(base: PartNameDisplay): IPartNameDisplayBuilder;
	export function buildPartNameDisplay(): IPartNameDisplayBuilder;
	export interface IPartAbbreviationDisplayBuilder {
	    build: () => PartAbbreviationDisplay;
	    patch: () => any[];
	    name: (build: (builder: ITextArrayBuilder) => ITextArrayBuilder) => IPartAbbreviationDisplayBuilder;
	    printObject: (printObject: boolean) => IPartAbbreviationDisplayBuilder;
	}
	export function patchPartAbbreviationDisplay(base: PartAbbreviationDisplay): IPartAbbreviationDisplayBuilder;
	export function buildPartAbbreviationDisplay(): IPartAbbreviationDisplayBuilder;
	export interface IMidiDeviceBuilder {
	    build: () => MidiDevice;
	    patch: () => any[];
	    port: (port: number) => IMidiDeviceBuilder;
	    deviceName: (deviceName: string) => IMidiDeviceBuilder;
	    id: (id: number) => IMidiDeviceBuilder;
	}
	export function patchMidiDevice(base: MidiDevice): IMidiDeviceBuilder;
	export function buildMidiDevice(): IMidiDeviceBuilder;
	export interface IMidiInstrumentBuilder {
	    build: () => MidiInstrument;
	    patch: () => any[];
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
	export function patchMidiInstrument(base: MidiInstrument): IMidiInstrumentBuilder;
	export function buildMidiInstrument(): IMidiInstrumentBuilder;
	export interface IPlayBuilder {
	    build: () => Play;
	    patch: () => any[];
	    ipa: (ipa: string) => IPlayBuilder;
	    mute: (mute: string) => IPlayBuilder;
	    otherPlay: (build: (builder: IOtherPlayBuilder) => IOtherPlayBuilder) => IPlayBuilder;
	    semiPitched: (semiPitched: string) => IPlayBuilder;
	    id: (id: string) => IPlayBuilder;
	}
	export function patchPlay(base: Play): IPlayBuilder;
	export function buildPlay(): IPlayBuilder;
	export interface IOtherPlayBuilder {
	    build: () => OtherPlay;
	    patch: () => any[];
	    data: (data: string) => IOtherPlayBuilder;
	    type: (type: string) => IOtherPlayBuilder;
	}
	export function patchOtherPlay(base: OtherPlay): IOtherPlayBuilder;
	export function buildOtherPlay(): IOtherPlayBuilder;
	export interface IScalingBuilder {
	    build: () => Scaling;
	    patch: () => any[];
	    tenths: (tenths: number) => IScalingBuilder;
	    millimeters: (millimeters: number) => IScalingBuilder;
	}
	export function patchScaling(base: Scaling): IScalingBuilder;
	export function buildScaling(): IScalingBuilder;
	export interface IPageMarginsBuilder {
	    build: () => PageMargins;
	    patch: () => any[];
	    topMargin: (topMargin: number) => IPageMarginsBuilder;
	    leftMargin: (leftMargin: number) => IPageMarginsBuilder;
	    bottomMargin: (bottomMargin: number) => IPageMarginsBuilder;
	    type: (type: OddEvenBoth) => IPageMarginsBuilder;
	    rightMargin: (rightMargin: number) => IPageMarginsBuilder;
	}
	export function patchPageMargins(base: PageMargins): IPageMarginsBuilder;
	export function buildPageMargins(): IPageMarginsBuilder;
	export interface IPageLayoutBuilder {
	    build: () => PageLayout;
	    patch: () => any[];
	    pageHeight: (pageHeight: number) => IPageLayoutBuilder;
	    pageWidth: (pageWidth: number) => IPageLayoutBuilder;
	    pageMargins: (pageMargins: PageMargins[]) => IPageLayoutBuilder;
	}
	export function patchPageLayout(base: PageLayout): IPageLayoutBuilder;
	export function buildPageLayout(): IPageLayoutBuilder;
	export interface ISystemLayoutBuilder {
	    build: () => SystemLayout;
	    patch: () => any[];
	    systemDividers: (build: (builder: ISystemDividersBuilder) => ISystemDividersBuilder) => ISystemLayoutBuilder;
	    systemMargins: (build: (builder: ISystemMarginsBuilder) => ISystemMarginsBuilder) => ISystemLayoutBuilder;
	    systemDistance: (systemDistance: number) => ISystemLayoutBuilder;
	    topSystemDistance: (topSystemDistance: number) => ISystemLayoutBuilder;
	}
	export function patchSystemLayout(base: SystemLayout): ISystemLayoutBuilder;
	export function buildSystemLayout(): ISystemLayoutBuilder;
	export interface ISystemMarginsBuilder {
	    build: () => SystemMargins;
	    patch: () => any[];
	    leftMargin: (leftMargin: number) => ISystemMarginsBuilder;
	    rightMargin: (rightMargin: number) => ISystemMarginsBuilder;
	}
	export function patchSystemMargins(base: SystemMargins): ISystemMarginsBuilder;
	export function buildSystemMargins(): ISystemMarginsBuilder;
	export interface ISystemDividersBuilder {
	    build: () => SystemDividers;
	    patch: () => any[];
	    rightDivider: (build: (builder: IRightDividerBuilder) => IRightDividerBuilder) => ISystemDividersBuilder;
	    leftDivider: (build: (builder: ILeftDividerBuilder) => ILeftDividerBuilder) => ISystemDividersBuilder;
	}
	export function patchSystemDividers(base: SystemDividers): ISystemDividersBuilder;
	export function buildSystemDividers(): ISystemDividersBuilder;
	export interface ILeftDividerBuilder {
	    build: () => LeftDivider;
	    patch: () => any[];
	    printObject: (printObject: boolean) => ILeftDividerBuilder;
	}
	export function patchLeftDivider(base: LeftDivider): ILeftDividerBuilder;
	export function buildLeftDivider(): ILeftDividerBuilder;
	export interface IRightDividerBuilder {
	    build: () => RightDivider;
	    patch: () => any[];
	    printObject: (printObject: boolean) => IRightDividerBuilder;
	}
	export function patchRightDivider(base: RightDivider): IRightDividerBuilder;
	export function buildRightDivider(): IRightDividerBuilder;
	export interface IStaffLayoutBuilder {
	    build: () => StaffLayout;
	    patch: () => any[];
	    staffDistance: (staffDistance: number) => IStaffLayoutBuilder;
	    num: (num: number) => IStaffLayoutBuilder;
	}
	export function patchStaffLayout(base: StaffLayout): IStaffLayoutBuilder;
	export function buildStaffLayout(): IStaffLayoutBuilder;
	export interface IMeasureLayoutBuilder {
	    build: () => MeasureLayout;
	    patch: () => any[];
	    measureDistance: (measureDistance: number) => IMeasureLayoutBuilder;
	}
	export function patchMeasureLayout(base: MeasureLayout): IMeasureLayoutBuilder;
	export function buildMeasureLayout(): IMeasureLayoutBuilder;
	export interface ILineWidthBuilder {
	    build: () => LineWidth;
	    patch: () => any[];
	    tenths: (tenths: number) => ILineWidthBuilder;
	    type: (type: string) => ILineWidthBuilder;
	}
	export function patchLineWidth(base: LineWidth): ILineWidthBuilder;
	export function buildLineWidth(): ILineWidthBuilder;
	export interface INoteSizeBuilder {
	    build: () => NoteSize;
	    patch: () => any[];
	    size: (size: number) => INoteSizeBuilder;
	    type: (type: CueGraceLarge) => INoteSizeBuilder;
	}
	export function patchNoteSize(base: NoteSize): INoteSizeBuilder;
	export function buildNoteSize(): INoteSizeBuilder;
	export interface IDistanceBuilder {
	    build: () => Distance;
	    patch: () => any[];
	    tenths: (tenths: number) => IDistanceBuilder;
	    type: (type: string) => IDistanceBuilder;
	}
	export function patchDistance(base: Distance): IDistanceBuilder;
	export function buildDistance(): IDistanceBuilder;
	export interface IAppearanceBuilder {
	    build: () => Appearance;
	    patch: () => any[];
	    set: (key: string, val: NoteSize) => IAppearanceBuilder;
	    otherAppearances: (otherAppearances: string[]) => IAppearanceBuilder;
	}
	export function patchAppearance(base: Appearance): IAppearanceBuilder;
	export function buildAppearance(): IAppearanceBuilder;
	export interface ICreatorBuilder {
	    build: () => Creator;
	    patch: () => any[];
	    creator: (creator: string) => ICreatorBuilder;
	    type: (type: string) => ICreatorBuilder;
	}
	export function patchCreator(base: Creator): ICreatorBuilder;
	export function buildCreator(): ICreatorBuilder;
	export interface IRightsBuilder {
	    build: () => Rights;
	    patch: () => any[];
	    type: (type: string) => IRightsBuilder;
	    rights: (rights: string) => IRightsBuilder;
	}
	export function patchRights(base: Rights): IRightsBuilder;
	export function buildRights(): IRightsBuilder;
	export interface IEncoderBuilder {
	    build: () => Encoder;
	    patch: () => any[];
	    encoder: (encoder: string) => IEncoderBuilder;
	    type: (type: string) => IEncoderBuilder;
	}
	export function patchEncoder(base: Encoder): IEncoderBuilder;
	export function buildEncoder(): IEncoderBuilder;
	export interface IRelationBuilder {
	    build: () => Relation;
	    patch: () => any[];
	    type: (type: string) => IRelationBuilder;
	    data: (data: string) => IRelationBuilder;
	}
	export function patchRelation(base: Relation): IRelationBuilder;
	export function buildRelation(): IRelationBuilder;
	export interface IMiscellaneousFieldBuilder {
	    build: () => MiscellaneousField;
	    patch: () => any[];
	    data: (data: string) => IMiscellaneousFieldBuilder;
	    name: (name: string) => IMiscellaneousFieldBuilder;
	}
	export function patchMiscellaneousField(base: MiscellaneousField): IMiscellaneousFieldBuilder;
	export function buildMiscellaneousField(): IMiscellaneousFieldBuilder;
	export interface IMiscellaneousBuilder {
	    build: () => Miscellaneous;
	    patch: () => any[];
	    miscellaneousFields: (miscellaneousFields: MiscellaneousField[]) => IMiscellaneousBuilder;
	}
	export function patchMiscellaneous(base: Miscellaneous): IMiscellaneousBuilder;
	export function buildMiscellaneous(): IMiscellaneousBuilder;
	export interface IIdentificationBuilder {
	    build: () => Identification;
	    patch: () => any[];
	    miscellaneous: (build: (builder: IMiscellaneousBuilder) => IMiscellaneousBuilder) => IIdentificationBuilder;
	    creators: (creators: Creator[]) => IIdentificationBuilder;
	    relations: (relations: Relation[]) => IIdentificationBuilder;
	    rights: (rights: Rights[]) => IIdentificationBuilder;
	    encoding: (build: (builder: IEncodingBuilder) => IEncodingBuilder) => IIdentificationBuilder;
	    source: (source: string) => IIdentificationBuilder;
	}
	export function patchIdentification(base: Identification): IIdentificationBuilder;
	export function buildIdentification(): IIdentificationBuilder;
	export interface ISupportsBuilder {
	    build: () => Supports;
	    patch: () => any[];
	    element: (element: string) => ISupportsBuilder;
	    attribute: (attribute: string) => ISupportsBuilder;
	    value: (value: string) => ISupportsBuilder;
	    type: (type: string) => ISupportsBuilder;
	}
	export function patchSupports(base: Supports): ISupportsBuilder;
	export function buildSupports(): ISupportsBuilder;
	export interface IEncodingBuilder {
	    build: () => Encoding;
	    patch: () => any[];
	    encodingDescriptions: (encodingDescriptions: string[]) => IEncodingBuilder;
	    encodingDate: (build: (builder: IEncodingDateBuilder) => IEncodingDateBuilder) => IEncodingBuilder;
	    set: (key: string, val: Supports) => IEncodingBuilder;
	    encoders: (encoders: Encoder[]) => IEncodingBuilder;
	    softwares: (softwares: string[]) => IEncodingBuilder;
	}
	export function patchEncoding(base: Encoding): IEncodingBuilder;
	export function buildEncoding(): IEncodingBuilder;
	export interface ITimeSeparatorBuilder {
	    build: () => TimeSeparator;
	    patch: () => any[];
	    separator: (separator: SeparatorType) => ITimeSeparatorBuilder;
	}
	export function patchTimeSeparator(base: TimeSeparator): ITimeSeparatorBuilder;
	export function buildTimeSeparator(): ITimeSeparatorBuilder;
	export interface ITimeSymbolBuilder {
	    build: () => TimeSymbol;
	    patch: () => any[];
	    symbol: (symbol: TimeSymbolType) => ITimeSymbolBuilder;
	}
	export function patchTimeSymbol(base: TimeSymbol): ITimeSymbolBuilder;
	export function buildTimeSymbol(): ITimeSymbolBuilder;
	export interface ICancelBuilder {
	    build: () => Cancel;
	    patch: () => any[];
	    fifths: (fifths: number) => ICancelBuilder;
	    location: (location: CancelLocation) => ICancelBuilder;
	}
	export function patchCancel(base: Cancel): ICancelBuilder;
	export function buildCancel(): ICancelBuilder;
	export interface IKeyOctaveBuilder {
	    build: () => KeyOctave;
	    patch: () => any[];
	    octave: (octave: number) => IKeyOctaveBuilder;
	    number: (number: number) => IKeyOctaveBuilder;
	    cancel: (cancel: boolean) => IKeyOctaveBuilder;
	}
	export function patchKeyOctave(base: KeyOctave): IKeyOctaveBuilder;
	export function buildKeyOctave(): IKeyOctaveBuilder;
	export interface IKeyBuilder {
	    build: () => Key;
	    patch: () => any[];
	    cancel: (build: (builder: ICancelBuilder) => ICancelBuilder) => IKeyBuilder;
	    keySteps: (keySteps: string[]) => IKeyBuilder;
	    keyOctaves: (keyOctaves: KeyOctave[]) => IKeyBuilder;
	    number: (number: number) => IKeyBuilder;
	    fifths: (fifths: number) => IKeyBuilder;
	    keyAlters: (keyAlters: string[]) => IKeyBuilder;
	    keyAccidentals: (keyAccidentals: string[]) => IKeyBuilder;
	    mode: (mode: string) => IKeyBuilder;
	    _class: (_class: string) => IKeyBuilder;
	    defaultX: (defaultX: number) => IKeyBuilder;
	    relativeY: (relativeY: number) => IKeyBuilder;
	    defaultY: (defaultY: number) => IKeyBuilder;
	    relativeX: (relativeX: number) => IKeyBuilder;
	}
	export function patchKey(base: Key): IKeyBuilder;
	export function buildKey(): IKeyBuilder;
	export interface ITimeBuilder {
	    build: () => Time;
	    patch: () => any[];
	    interchangeable: (build: (builder: IInterchangeableBuilder) => IInterchangeableBuilder) => ITimeBuilder;
	    beats: (beats: string[]) => ITimeBuilder;
	    beatTypes: (beatTypes: number[]) => ITimeBuilder;
	    senzaMisura: (senzaMisura: string) => ITimeBuilder;
	    _class: (_class: string) => ITimeBuilder;
	    symbol: (symbol: TimeSymbolType) => ITimeBuilder;
	}
	export function patchTime(base: Time): ITimeBuilder;
	export function buildTime(): ITimeBuilder;
	export interface IInterchangeableBuilder {
	    build: () => Interchangeable;
	    patch: () => any[];
	    beats: (beats: string[]) => IInterchangeableBuilder;
	    beatTypes: (beatTypes: number[]) => IInterchangeableBuilder;
	    timeRelation: (timeRelation: string) => IInterchangeableBuilder;
	    symbol: (symbol: TimeSymbolType) => IInterchangeableBuilder;
	}
	export function patchInterchangeable(base: Interchangeable): IInterchangeableBuilder;
	export function buildInterchangeable(): IInterchangeableBuilder;
	export interface IPartSymbolBuilder {
	    build: () => PartSymbol;
	    patch: () => any[];
	    topStaff: (topStaff: number) => IPartSymbolBuilder;
	    type: (type: PartSymbolType) => IPartSymbolBuilder;
	    bottomStaff: (bottomStaff: number) => IPartSymbolBuilder;
	    _class: (_class: string) => IPartSymbolBuilder;
	    defaultX: (defaultX: number) => IPartSymbolBuilder;
	    relativeY: (relativeY: number) => IPartSymbolBuilder;
	    defaultY: (defaultY: number) => IPartSymbolBuilder;
	    relativeX: (relativeX: number) => IPartSymbolBuilder;
	}
	export function patchPartSymbol(base: PartSymbol): IPartSymbolBuilder;
	export function buildPartSymbol(): IPartSymbolBuilder;
	export interface IClefBuilder {
	    build: () => Clef;
	    patch: () => any[];
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
	}
	export function patchClef(base: Clef): IClefBuilder;
	export function buildClef(): IClefBuilder;
	export interface IStaffTuningBuilder {
	    build: () => StaffTuning;
	    patch: () => any[];
	    tuningAlter: (tuningAlter: string) => IStaffTuningBuilder;
	    line: (line: string) => IStaffTuningBuilder;
	    tuningStep: (tuningStep: string) => IStaffTuningBuilder;
	    tuningOctave: (tuningOctave: string) => IStaffTuningBuilder;
	}
	export function patchStaffTuning(base: StaffTuning): IStaffTuningBuilder;
	export function buildStaffTuning(): IStaffTuningBuilder;
	export interface IStaffDetailsBuilder {
	    build: () => StaffDetails;
	    patch: () => any[];
	    staffLines: (staffLines: number) => IStaffDetailsBuilder;
	    staffTunings: (staffTunings: StaffTuning[]) => IStaffDetailsBuilder;
	    staffSize: (staffSize: number) => IStaffDetailsBuilder;
	    showFrets: (showFrets: ShowFretsType) => IStaffDetailsBuilder;
	    capo: (capo: string) => IStaffDetailsBuilder;
	    number: (number: number) => IStaffDetailsBuilder;
	    staffType: (staffType: string) => IStaffDetailsBuilder;
	    printObject: (printObject: boolean) => IStaffDetailsBuilder;
	}
	export function patchStaffDetails(base: StaffDetails): IStaffDetailsBuilder;
	export function buildStaffDetails(): IStaffDetailsBuilder;
	export interface IDoubleBuilder {
	    build: () => Double;
	    patch: () => any[];
	}
	export function patchDouble(base: Double): IDoubleBuilder;
	export function buildDouble(): IDoubleBuilder;
	export interface ITransposeBuilder {
	    build: () => Transpose;
	    patch: () => any[];
	    number: (number: number) => ITransposeBuilder;
	    diatonic: (diatonic: string) => ITransposeBuilder;
	    octaveChange: (octaveChange: string) => ITransposeBuilder;
	    double: (build: (builder: IDoubleBuilder) => IDoubleBuilder) => ITransposeBuilder;
	    chromatic: (chromatic: string) => ITransposeBuilder;
	}
	export function patchTranspose(base: Transpose): ITransposeBuilder;
	export function buildTranspose(): ITransposeBuilder;
	export interface IDirectiveBuilder {
	    build: () => Directive;
	    patch: () => any[];
	    data: (data: string) => IDirectiveBuilder;
	    defaultX: (defaultX: number) => IDirectiveBuilder;
	    relativeY: (relativeY: number) => IDirectiveBuilder;
	    defaultY: (defaultY: number) => IDirectiveBuilder;
	    relativeX: (relativeX: number) => IDirectiveBuilder;
	}
	export function patchDirective(base: Directive): IDirectiveBuilder;
	export function buildDirective(): IDirectiveBuilder;
	export interface ISlashDotBuilder {
	    build: () => SlashDot;
	    patch: () => any[];
	}
	export function patchSlashDot(base: SlashDot): ISlashDotBuilder;
	export function buildSlashDot(): ISlashDotBuilder;
	export interface IMultipleRestBuilder {
	    build: () => MultipleRest;
	    patch: () => any[];
	    useSymbols: (useSymbols: boolean) => IMultipleRestBuilder;
	    count: (count: number) => IMultipleRestBuilder;
	}
	export function patchMultipleRest(base: MultipleRest): IMultipleRestBuilder;
	export function buildMultipleRest(): IMultipleRestBuilder;
	export interface IMeasureRepeatBuilder {
	    build: () => MeasureRepeat;
	    patch: () => any[];
	    data: (data: string) => IMeasureRepeatBuilder;
	    type: (type: StartStop) => IMeasureRepeatBuilder;
	    slashes: (slashes: number) => IMeasureRepeatBuilder;
	}
	export function patchMeasureRepeat(base: MeasureRepeat): IMeasureRepeatBuilder;
	export function buildMeasureRepeat(): IMeasureRepeatBuilder;
	export interface IBeatRepeatBuilder {
	    build: () => BeatRepeat;
	    patch: () => any[];
	    slashType: (slashType: string) => IBeatRepeatBuilder;
	    useDots: (useDots: boolean) => IBeatRepeatBuilder;
	    slashDots: (slashDots: SlashDot[]) => IBeatRepeatBuilder;
	    slases: (slases: number) => IBeatRepeatBuilder;
	    type: (type: StartStop) => IBeatRepeatBuilder;
	}
	export function patchBeatRepeat(base: BeatRepeat): IBeatRepeatBuilder;
	export function buildBeatRepeat(): IBeatRepeatBuilder;
	export interface ISlashBuilder {
	    build: () => Slash;
	    patch: () => any[];
	    slashType: (slashType: string) => ISlashBuilder;
	    useDots: (useDots: boolean) => ISlashBuilder;
	    useStems: (useStems: boolean) => ISlashBuilder;
	    slashDots: (slashDots: SlashDot[]) => ISlashBuilder;
	    type: (type: StartStop) => ISlashBuilder;
	}
	export function patchSlash(base: Slash): ISlashBuilder;
	export function buildSlash(): ISlashBuilder;
	export interface IMeasureStyleBuilder {
	    build: () => MeasureStyle;
	    patch: () => any[];
	    measureRepeat: (build: (builder: IMeasureRepeatBuilder) => IMeasureRepeatBuilder) => IMeasureStyleBuilder;
	    beatRepeat: (build: (builder: IBeatRepeatBuilder) => IBeatRepeatBuilder) => IMeasureStyleBuilder;
	    multipleRest: (build: (builder: IMultipleRestBuilder) => IMultipleRestBuilder) => IMeasureStyleBuilder;
	    slash: (build: (builder: ISlashBuilder) => ISlashBuilder) => IMeasureStyleBuilder;
	    number: (number: number) => IMeasureStyleBuilder;
	    fontFamily: (fontFamily: string) => IMeasureStyleBuilder;
	    fontWeight: (fontWeight: NormalBold) => IMeasureStyleBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IMeasureStyleBuilder;
	    fontSize: (fontSize: string) => IMeasureStyleBuilder;
	}
	export function patchMeasureStyle(base: MeasureStyle): IMeasureStyleBuilder;
	export function buildMeasureStyle(): IMeasureStyleBuilder;
	export interface IAttributesBuilder {
	    build: () => Attributes;
	    patch: () => any[];
	    divisions: (divisions: number) => IAttributesBuilder;
	    partSymbol: (build: (builder: IPartSymbolBuilder) => IPartSymbolBuilder) => IAttributesBuilder;
	    clefs: (clefs: Clef[]) => IAttributesBuilder;
	    measureStyles: (measureStyles: MeasureStyle[]) => IAttributesBuilder;
	    times: (times: Time[]) => IAttributesBuilder;
	    staffDetails: (staffDetails: StaffDetails[]) => IAttributesBuilder;
	    transposes: (transposes: Transpose[]) => IAttributesBuilder;
	    staves: (staves: number) => IAttributesBuilder;
	    instruments: (instruments: string) => IAttributesBuilder;
	    keySignatures: (keySignatures: Key[]) => IAttributesBuilder;
	    directives: (directives: Directive[]) => IAttributesBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IAttributesBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IAttributesBuilder;
	    _class: (_class: string) => IAttributesBuilder;
	}
	export function patchAttributes(base: Attributes): IAttributesBuilder;
	export function buildAttributes(): IAttributesBuilder;
	export interface ICueBuilder {
	    build: () => Cue;
	    patch: () => any[];
	}
	export function patchCue(base: Cue): ICueBuilder;
	export function buildCue(): ICueBuilder;
	export interface IGraceBuilder {
	    build: () => Grace;
	    patch: () => any[];
	    makeTime: (makeTime: string) => IGraceBuilder;
	    stealTimePrevious: (stealTimePrevious: string) => IGraceBuilder;
	    slash: (slash: boolean) => IGraceBuilder;
	    stealTimeFollowing: (stealTimeFollowing: string) => IGraceBuilder;
	}
	export function patchGrace(base: Grace): IGraceBuilder;
	export function buildGrace(): IGraceBuilder;
	export interface IChordBuilder {
	    build: () => Chord;
	    patch: () => any[];
	}
	export function patchChord(base: Chord): IChordBuilder;
	export function buildChord(): IChordBuilder;
	export interface IUnpitchedBuilder {
	    build: () => Unpitched;
	    patch: () => any[];
	    displayStep: (displayStep: string) => IUnpitchedBuilder;
	    displayOctave: (displayOctave: string) => IUnpitchedBuilder;
	}
	export function patchUnpitched(base: Unpitched): IUnpitchedBuilder;
	export function buildUnpitched(): IUnpitchedBuilder;
	export interface IPitchBuilder {
	    build: () => Pitch;
	    patch: () => any[];
	    alter: (alter: number) => IPitchBuilder;
	    step: (step: string) => IPitchBuilder;
	    octave: (octave: number) => IPitchBuilder;
	}
	export function patchPitch(base: Pitch): IPitchBuilder;
	export function buildPitch(): IPitchBuilder;
	export interface IFullNoteBuilder {
	    build: () => FullNote;
	    patch: () => any[];
	    unpitched: (build: (builder: IUnpitchedBuilder) => IUnpitchedBuilder) => IFullNoteBuilder;
	    chord: (build: (builder: IChordBuilder) => IChordBuilder) => IFullNoteBuilder;
	    pitch: (build: (builder: IPitchBuilder) => IPitchBuilder) => IFullNoteBuilder;
	    rest: (build: (builder: IRestBuilder) => IRestBuilder) => IFullNoteBuilder;
	}
	export function patchFullNote(base: FullNote): IFullNoteBuilder;
	export function buildFullNote(): IFullNoteBuilder;
	export interface IRestBuilder {
	    build: () => Rest;
	    patch: () => any[];
	    measure: (measure: boolean) => IRestBuilder;
	    displayStep: (displayStep: string) => IRestBuilder;
	    displayOctave: (displayOctave: string) => IRestBuilder;
	}
	export function patchRest(base: Rest): IRestBuilder;
	export function buildRest(): IRestBuilder;
	export interface ITieBuilder {
	    build: () => Tie;
	    patch: () => any[];
	    type: (type: StartStop) => ITieBuilder;
	    timeOnly: (timeOnly: string) => ITieBuilder;
	}
	export function patchTie(base: Tie): ITieBuilder;
	export function buildTie(): ITieBuilder;
	export interface IInstrumentBuilder {
	    build: () => Instrument;
	    patch: () => any[];
	    id: (id: string) => IInstrumentBuilder;
	}
	export function patchInstrument(base: Instrument): IInstrumentBuilder;
	export function buildInstrument(): IInstrumentBuilder;
	export interface INoteBuilder {
	    build: () => Note;
	    patch: () => any[];
	    noteheadText: (build: (builder: INoteheadTextBuilder) => INoteheadTextBuilder) => INoteBuilder;
	    timeModification: (build: (builder: ITimeModificationBuilder) => ITimeModificationBuilder) => INoteBuilder;
	    accidental: (build: (builder: IAccidentalBuilder) => IAccidentalBuilder) => INoteBuilder;
	    instrument: (build: (builder: IInstrumentBuilder) => IInstrumentBuilder) => INoteBuilder;
	    attack: (attack: number) => INoteBuilder;
	    endDynamics: (endDynamics: number) => INoteBuilder;
	    lyrics: (lyrics: Lyric[]) => INoteBuilder;
	    dots: (dots: Dot[]) => INoteBuilder;
	    notations: (notations: Notations[]) => INoteBuilder;
	    stem: (build: (builder: IStemBuilder) => IStemBuilder) => INoteBuilder;
	    noteType: (build: (builder: ITypeBuilder) => ITypeBuilder) => INoteBuilder;
	    pizzicato: (pizzicato: boolean) => INoteBuilder;
	    cue: (build: (builder: ICueBuilder) => ICueBuilder) => INoteBuilder;
	    duration: (duration: number) => INoteBuilder;
	    ties: (ties: Tie[]) => INoteBuilder;
	    dynamics: (dynamics: number) => INoteBuilder;
	    play: (build: (builder: IPlayBuilder) => IPlayBuilder) => INoteBuilder;
	    staff: (staff: number) => INoteBuilder;
	    grace: (build: (builder: IGraceBuilder) => IGraceBuilder) => INoteBuilder;
	    notehead: (build: (builder: INoteheadBuilder) => INoteheadBuilder) => INoteBuilder;
	    release: (release: number) => INoteBuilder;
	    beams: (beams: Beam[]) => INoteBuilder;
	    voice: (voice: number) => INoteBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => INoteBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => INoteBuilder;
	    _class: (_class: string) => INoteBuilder;
	}
	export function patchNote(base: Note): INoteBuilder;
	export function buildNote(): INoteBuilder;
	export interface ITypeBuilder {
	    build: () => Type;
	    patch: () => any[];
	    duration: (duration: Count) => ITypeBuilder;
	    size: (size: SymbolSize) => ITypeBuilder;
	}
	export function patchType(base: Type): ITypeBuilder;
	export function buildType(): ITypeBuilder;
	export interface IDotBuilder {
	    build: () => Dot;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDotBuilder;
	    relativeY: (relativeY: number) => IDotBuilder;
	    defaultY: (defaultY: number) => IDotBuilder;
	    relativeX: (relativeX: number) => IDotBuilder;
	}
	export function patchDot(base: Dot): IDotBuilder;
	export function buildDot(): IDotBuilder;
	export interface IAccidentalBuilder {
	    build: () => Accidental;
	    patch: () => any[];
	    cautionary: (cautionary: boolean) => IAccidentalBuilder;
	    accidental: (accidental: MxmlAccidental) => IAccidentalBuilder;
	    editorial: (editorial: boolean) => IAccidentalBuilder;
	    bracket: (bracket: boolean) => IAccidentalBuilder;
	    size: (size: SymbolSize) => IAccidentalBuilder;
	    parentheses: (parentheses: boolean) => IAccidentalBuilder;
	}
	export function patchAccidental(base: Accidental): IAccidentalBuilder;
	export function buildAccidental(): IAccidentalBuilder;
	export interface ITimeModificationBuilder {
	    build: () => TimeModification;
	    patch: () => any[];
	    actualNotes: (actualNotes: number) => ITimeModificationBuilder;
	    normalType: (normalType: string) => ITimeModificationBuilder;
	    normalNotes: (normalNotes: number) => ITimeModificationBuilder;
	    normalDots: (normalDots: NormalDot[]) => ITimeModificationBuilder;
	}
	export function patchTimeModification(base: TimeModification): ITimeModificationBuilder;
	export function buildTimeModification(): ITimeModificationBuilder;
	export interface IStemBuilder {
	    build: () => Stem;
	    patch: () => any[];
	    type: (type: StemType) => IStemBuilder;
	    defaultX: (defaultX: number) => IStemBuilder;
	    relativeY: (relativeY: number) => IStemBuilder;
	    defaultY: (defaultY: number) => IStemBuilder;
	    relativeX: (relativeX: number) => IStemBuilder;
	}
	export function patchStem(base: Stem): IStemBuilder;
	export function buildStem(): IStemBuilder;
	export interface INoteheadBuilder {
	    build: () => Notehead;
	    patch: () => any[];
	    type: (type: NoteheadType) => INoteheadBuilder;
	    filled: (filled: boolean) => INoteheadBuilder;
	    parentheses: (parentheses: boolean) => INoteheadBuilder;
	    fontFamily: (fontFamily: string) => INoteheadBuilder;
	    fontWeight: (fontWeight: NormalBold) => INoteheadBuilder;
	    fontStyle: (fontStyle: NormalItalic) => INoteheadBuilder;
	    fontSize: (fontSize: string) => INoteheadBuilder;
	}
	export function patchNotehead(base: Notehead): INoteheadBuilder;
	export function buildNotehead(): INoteheadBuilder;
	export interface INoteheadTextBuilder {
	    build: () => NoteheadText;
	    patch: () => any[];
	    text: (build: (builder: ITextArrayBuilder) => ITextArrayBuilder) => INoteheadTextBuilder;
	}
	export function patchNoteheadText(base: NoteheadText): INoteheadTextBuilder;
	export function buildNoteheadText(): INoteheadTextBuilder;
	export interface IBeamBuilder {
	    build: () => Beam;
	    patch: () => any[];
	    repeater: (repeater: boolean) => IBeamBuilder;
	    number: (number: number) => IBeamBuilder;
	    type: (type: BeamType) => IBeamBuilder;
	    fan: (fan: AccelRitNone) => IBeamBuilder;
	}
	export function patchBeam(base: Beam): IBeamBuilder;
	export function buildBeam(): IBeamBuilder;
	export interface INotationsBuilder {
	    build: () => Notations;
	    patch: () => any[];
	    slurs: (slurs: Slur[]) => INotationsBuilder;
	    articulations: (articulations: Articulations[]) => INotationsBuilder;
	    slides: (slides: Slide[]) => INotationsBuilder;
	    technicals: (technicals: Technical[]) => INotationsBuilder;
	    tieds: (tieds: Tied[]) => INotationsBuilder;
	    tuplets: (tuplets: Tuplet[]) => INotationsBuilder;
	    glissandos: (glissandos: Glissando[]) => INotationsBuilder;
	    dynamics: (dynamics: Dynamics[]) => INotationsBuilder;
	    fermatas: (fermatas: Fermata[]) => INotationsBuilder;
	    accidentalMarks: (accidentalMarks: AccidentalMark[]) => INotationsBuilder;
	    ornaments: (ornaments: Ornaments[]) => INotationsBuilder;
	    arpeggiates: (arpeggiates: Arpeggiate[]) => INotationsBuilder;
	    nonArpeggiates: (nonArpeggiates: NonArpeggiate[]) => INotationsBuilder;
	    otherNotations: (otherNotations: OtherNotation[]) => INotationsBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => INotationsBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => INotationsBuilder;
	    _class: (_class: string) => INotationsBuilder;
	}
	export function patchNotations(base: Notations): INotationsBuilder;
	export function buildNotations(): INotationsBuilder;
	export interface ITiedBuilder {
	    build: () => Tied;
	    patch: () => any[];
	    number: (number: number) => ITiedBuilder;
	    type: (type: StartStopContinue) => ITiedBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => ITiedBuilder;
	}
	export function patchTied(base: Tied): ITiedBuilder;
	export function buildTied(): ITiedBuilder;
	export interface ISlurBuilder {
	    build: () => Slur;
	    patch: () => any[];
	    number: (number: number) => ISlurBuilder;
	    type: (type: StartStopContinue) => ISlurBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => ISlurBuilder;
	}
	export function patchSlur(base: Slur): ISlurBuilder;
	export function buildSlur(): ISlurBuilder;
	export interface ITupletBuilder {
	    build: () => Tuplet;
	    patch: () => any[];
	    bracket: (bracket: boolean) => ITupletBuilder;
	    number: (number: number) => ITupletBuilder;
	    showNumber: (showNumber: ActualBothNone) => ITupletBuilder;
	    tupletNormal: (build: (builder: ITupletNormalBuilder) => ITupletNormalBuilder) => ITupletBuilder;
	    type: (type: StartStop) => ITupletBuilder;
	    showType: (showType: ActualBothNone) => ITupletBuilder;
	    tupletActual: (build: (builder: ITupletActualBuilder) => ITupletActualBuilder) => ITupletBuilder;
	    lineShape: (lineShape: StraightCurved) => ITupletBuilder;
	}
	export function patchTuplet(base: Tuplet): ITupletBuilder;
	export function buildTuplet(): ITupletBuilder;
	export interface ITupletActualBuilder {
	    build: () => TupletActual;
	    patch: () => any[];
	    tupletNumber: (build: (builder: ITupletNumberBuilder) => ITupletNumberBuilder) => ITupletActualBuilder;
	    tupletDots: (tupletDots: TupletDot[]) => ITupletActualBuilder;
	    tupletType: (build: (builder: ITupletTypeBuilder) => ITupletTypeBuilder) => ITupletActualBuilder;
	}
	export function patchTupletActual(base: TupletActual): ITupletActualBuilder;
	export function buildTupletActual(): ITupletActualBuilder;
	export interface ITupletNormalBuilder {
	    build: () => TupletNormal;
	    patch: () => any[];
	    tupletNumber: (build: (builder: ITupletNumberBuilder) => ITupletNumberBuilder) => ITupletNormalBuilder;
	    tupletDots: (tupletDots: TupletDot[]) => ITupletNormalBuilder;
	    tupletType: (build: (builder: ITupletTypeBuilder) => ITupletTypeBuilder) => ITupletNormalBuilder;
	}
	export function patchTupletNormal(base: TupletNormal): ITupletNormalBuilder;
	export function buildTupletNormal(): ITupletNormalBuilder;
	export interface ITupletNumberBuilder {
	    build: () => TupletNumber;
	    patch: () => any[];
	    text: (text: string) => ITupletNumberBuilder;
	    fontFamily: (fontFamily: string) => ITupletNumberBuilder;
	    fontWeight: (fontWeight: NormalBold) => ITupletNumberBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ITupletNumberBuilder;
	    fontSize: (fontSize: string) => ITupletNumberBuilder;
	}
	export function patchTupletNumber(base: TupletNumber): ITupletNumberBuilder;
	export function buildTupletNumber(): ITupletNumberBuilder;
	export interface ITupletTypeBuilder {
	    build: () => TupletType;
	    patch: () => any[];
	    text: (text: string) => ITupletTypeBuilder;
	    fontFamily: (fontFamily: string) => ITupletTypeBuilder;
	    fontWeight: (fontWeight: NormalBold) => ITupletTypeBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ITupletTypeBuilder;
	    fontSize: (fontSize: string) => ITupletTypeBuilder;
	}
	export function patchTupletType(base: TupletType): ITupletTypeBuilder;
	export function buildTupletType(): ITupletTypeBuilder;
	export interface ITupletDotBuilder {
	    build: () => TupletDot;
	    patch: () => any[];
	    fontFamily: (fontFamily: string) => ITupletDotBuilder;
	    fontWeight: (fontWeight: NormalBold) => ITupletDotBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ITupletDotBuilder;
	    fontSize: (fontSize: string) => ITupletDotBuilder;
	}
	export function patchTupletDot(base: TupletDot): ITupletDotBuilder;
	export function buildTupletDot(): ITupletDotBuilder;
	export interface IGlissandoBuilder {
	    build: () => Glissando;
	    patch: () => any[];
	    text: (text: string) => IGlissandoBuilder;
	    type: (type: StartStop) => IGlissandoBuilder;
	    normal: (normal: number) => IGlissandoBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => IGlissandoBuilder;
	}
	export function patchGlissando(base: Glissando): IGlissandoBuilder;
	export function buildGlissando(): IGlissandoBuilder;
	export interface ISlideBuilder {
	    build: () => Slide;
	    patch: () => any[];
	    text: (text: string) => ISlideBuilder;
	    type: (type: StartStop) => ISlideBuilder;
	    normal: (normal: number) => ISlideBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => ISlideBuilder;
	}
	export function patchSlide(base: Slide): ISlideBuilder;
	export function buildSlide(): ISlideBuilder;
	export interface IOtherNotationBuilder {
	    build: () => OtherNotation;
	    patch: () => any[];
	    type: (type: StartStopSingle) => IOtherNotationBuilder;
	    data: (data: string) => IOtherNotationBuilder;
	    printObject: (printObject: boolean) => IOtherNotationBuilder;
	}
	export function patchOtherNotation(base: OtherNotation): IOtherNotationBuilder;
	export function buildOtherNotation(): IOtherNotationBuilder;
	export interface IOtherDirectionBuilder {
	    build: () => OtherDirection;
	    patch: () => any[];
	    data: (data: string) => IOtherDirectionBuilder;
	    printObject: (printObject: boolean) => IOtherDirectionBuilder;
	}
	export function patchOtherDirection(base: OtherDirection): IOtherDirectionBuilder;
	export function buildOtherDirection(): IOtherDirectionBuilder;
	export interface IOrnamentsBuilder {
	    build: () => Ornaments;
	    patch: () => any[];
	    delayedInvertedTurn: (build: (builder: IDelayedInvertedTurnBuilder) => IDelayedInvertedTurnBuilder) => IOrnamentsBuilder;
	    shake: (build: (builder: IShakeBuilder) => IShakeBuilder) => IOrnamentsBuilder;
	    turn: (build: (builder: ITurnBuilder) => ITurnBuilder) => IOrnamentsBuilder;
	    invertedTurn: (build: (builder: IInvertedTurnBuilder) => IInvertedTurnBuilder) => IOrnamentsBuilder;
	    otherOrnament: (build: (builder: IOtherOrnamentBuilder) => IOtherOrnamentBuilder) => IOrnamentsBuilder;
	    delayedTurn: (build: (builder: IDelayedTurnBuilder) => IDelayedTurnBuilder) => IOrnamentsBuilder;
	    verticalTurn: (build: (builder: IVerticalTurnBuilder) => IVerticalTurnBuilder) => IOrnamentsBuilder;
	    wavyLine: (build: (builder: IWavyLineBuilder) => IWavyLineBuilder) => IOrnamentsBuilder;
	    tremolo: (build: (builder: ITremoloBuilder) => ITremoloBuilder) => IOrnamentsBuilder;
	    accidentalMarks: (accidentalMarks: AccidentalMark[]) => IOrnamentsBuilder;
	    trillMark: (build: (builder: ITrillMarkBuilder) => ITrillMarkBuilder) => IOrnamentsBuilder;
	    mordent: (build: (builder: IMordentBuilder) => IMordentBuilder) => IOrnamentsBuilder;
	    invertedMordent: (build: (builder: IInvertedMordentBuilder) => IInvertedMordentBuilder) => IOrnamentsBuilder;
	    schleifer: (build: (builder: ISchleiferBuilder) => ISchleiferBuilder) => IOrnamentsBuilder;
	    defaultX: (defaultX: number) => IOrnamentsBuilder;
	    relativeY: (relativeY: number) => IOrnamentsBuilder;
	    defaultY: (defaultY: number) => IOrnamentsBuilder;
	    relativeX: (relativeX: number) => IOrnamentsBuilder;
	}
	export function patchOrnaments(base: Ornaments): IOrnamentsBuilder;
	export function buildOrnaments(): IOrnamentsBuilder;
	export interface ITrillMarkBuilder {
	    build: () => TrillMark;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ITrillMarkBuilder;
	    relativeY: (relativeY: number) => ITrillMarkBuilder;
	    defaultY: (defaultY: number) => ITrillMarkBuilder;
	    relativeX: (relativeX: number) => ITrillMarkBuilder;
	}
	export function patchTrillMark(base: TrillMark): ITrillMarkBuilder;
	export function buildTrillMark(): ITrillMarkBuilder;
	export interface ITurnBuilder {
	    build: () => Turn;
	    patch: () => any[];
	    slash: (slash: boolean) => ITurnBuilder;
	    defaultX: (defaultX: number) => ITurnBuilder;
	    relativeY: (relativeY: number) => ITurnBuilder;
	    defaultY: (defaultY: number) => ITurnBuilder;
	    relativeX: (relativeX: number) => ITurnBuilder;
	}
	export function patchTurn(base: Turn): ITurnBuilder;
	export function buildTurn(): ITurnBuilder;
	export interface IDelayedTurnBuilder {
	    build: () => DelayedTurn;
	    patch: () => any[];
	    slash: (slash: boolean) => IDelayedTurnBuilder;
	    defaultX: (defaultX: number) => IDelayedTurnBuilder;
	    relativeY: (relativeY: number) => IDelayedTurnBuilder;
	    defaultY: (defaultY: number) => IDelayedTurnBuilder;
	    relativeX: (relativeX: number) => IDelayedTurnBuilder;
	}
	export function patchDelayedTurn(base: DelayedTurn): IDelayedTurnBuilder;
	export function buildDelayedTurn(): IDelayedTurnBuilder;
	export interface IInvertedTurnBuilder {
	    build: () => InvertedTurn;
	    patch: () => any[];
	    slash: (slash: boolean) => IInvertedTurnBuilder;
	    defaultX: (defaultX: number) => IInvertedTurnBuilder;
	    relativeY: (relativeY: number) => IInvertedTurnBuilder;
	    defaultY: (defaultY: number) => IInvertedTurnBuilder;
	    relativeX: (relativeX: number) => IInvertedTurnBuilder;
	}
	export function patchInvertedTurn(base: InvertedTurn): IInvertedTurnBuilder;
	export function buildInvertedTurn(): IInvertedTurnBuilder;
	export interface IDelayedInvertedTurnBuilder {
	    build: () => DelayedInvertedTurn;
	    patch: () => any[];
	    slash: (slash: boolean) => IDelayedInvertedTurnBuilder;
	    defaultX: (defaultX: number) => IDelayedInvertedTurnBuilder;
	    relativeY: (relativeY: number) => IDelayedInvertedTurnBuilder;
	    defaultY: (defaultY: number) => IDelayedInvertedTurnBuilder;
	    relativeX: (relativeX: number) => IDelayedInvertedTurnBuilder;
	}
	export function patchDelayedInvertedTurn(base: DelayedInvertedTurn): IDelayedInvertedTurnBuilder;
	export function buildDelayedInvertedTurn(): IDelayedInvertedTurnBuilder;
	export interface IVerticalTurnBuilder {
	    build: () => VerticalTurn;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IVerticalTurnBuilder;
	    relativeY: (relativeY: number) => IVerticalTurnBuilder;
	    defaultY: (defaultY: number) => IVerticalTurnBuilder;
	    relativeX: (relativeX: number) => IVerticalTurnBuilder;
	}
	export function patchVerticalTurn(base: VerticalTurn): IVerticalTurnBuilder;
	export function buildVerticalTurn(): IVerticalTurnBuilder;
	export interface IShakeBuilder {
	    build: () => Shake;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IShakeBuilder;
	    relativeY: (relativeY: number) => IShakeBuilder;
	    defaultY: (defaultY: number) => IShakeBuilder;
	    relativeX: (relativeX: number) => IShakeBuilder;
	}
	export function patchShake(base: Shake): IShakeBuilder;
	export function buildShake(): IShakeBuilder;
	export interface IMordentBuilder {
	    build: () => Mordent;
	    patch: () => any[];
	    long: (long: boolean) => IMordentBuilder;
	    approach: (approach: AboveBelow) => IMordentBuilder;
	    departure: (departure: AboveBelow) => IMordentBuilder;
	    defaultX: (defaultX: number) => IMordentBuilder;
	    relativeY: (relativeY: number) => IMordentBuilder;
	    defaultY: (defaultY: number) => IMordentBuilder;
	    relativeX: (relativeX: number) => IMordentBuilder;
	}
	export function patchMordent(base: Mordent): IMordentBuilder;
	export function buildMordent(): IMordentBuilder;
	export interface IInvertedMordentBuilder {
	    build: () => InvertedMordent;
	    patch: () => any[];
	    long: (long: boolean) => IInvertedMordentBuilder;
	    approach: (approach: AboveBelow) => IInvertedMordentBuilder;
	    departure: (departure: AboveBelow) => IInvertedMordentBuilder;
	    defaultX: (defaultX: number) => IInvertedMordentBuilder;
	    relativeY: (relativeY: number) => IInvertedMordentBuilder;
	    defaultY: (defaultY: number) => IInvertedMordentBuilder;
	    relativeX: (relativeX: number) => IInvertedMordentBuilder;
	}
	export function patchInvertedMordent(base: InvertedMordent): IInvertedMordentBuilder;
	export function buildInvertedMordent(): IInvertedMordentBuilder;
	export interface ISchleiferBuilder {
	    build: () => Schleifer;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ISchleiferBuilder;
	    relativeY: (relativeY: number) => ISchleiferBuilder;
	    defaultY: (defaultY: number) => ISchleiferBuilder;
	    relativeX: (relativeX: number) => ISchleiferBuilder;
	}
	export function patchSchleifer(base: Schleifer): ISchleiferBuilder;
	export function buildSchleifer(): ISchleiferBuilder;
	export interface ITremoloBuilder {
	    build: () => Tremolo;
	    patch: () => any[];
	    data: (data: string) => ITremoloBuilder;
	    type: (type: StartStopSingle) => ITremoloBuilder;
	    defaultX: (defaultX: number) => ITremoloBuilder;
	    relativeY: (relativeY: number) => ITremoloBuilder;
	    defaultY: (defaultY: number) => ITremoloBuilder;
	    relativeX: (relativeX: number) => ITremoloBuilder;
	}
	export function patchTremolo(base: Tremolo): ITremoloBuilder;
	export function buildTremolo(): ITremoloBuilder;
	export interface IOtherOrnamentBuilder {
	    build: () => OtherOrnament;
	    patch: () => any[];
	    type: (type: StartStopSingle) => IOtherOrnamentBuilder;
	    data: (data: string) => IOtherOrnamentBuilder;
	    defaultX: (defaultX: number) => IOtherOrnamentBuilder;
	    relativeY: (relativeY: number) => IOtherOrnamentBuilder;
	    defaultY: (defaultY: number) => IOtherOrnamentBuilder;
	    relativeX: (relativeX: number) => IOtherOrnamentBuilder;
	}
	export function patchOtherOrnament(base: OtherOrnament): IOtherOrnamentBuilder;
	export function buildOtherOrnament(): IOtherOrnamentBuilder;
	export interface IAccidentalMarkBuilder {
	    build: () => AccidentalMark;
	    patch: () => any[];
	    mark: (mark: string) => IAccidentalMarkBuilder;
	    defaultX: (defaultX: number) => IAccidentalMarkBuilder;
	    relativeY: (relativeY: number) => IAccidentalMarkBuilder;
	    defaultY: (defaultY: number) => IAccidentalMarkBuilder;
	    relativeX: (relativeX: number) => IAccidentalMarkBuilder;
	}
	export function patchAccidentalMark(base: AccidentalMark): IAccidentalMarkBuilder;
	export function buildAccidentalMark(): IAccidentalMarkBuilder;
	export interface ITechnicalBuilder {
	    build: () => Technical;
	    patch: () => any[];
	    tripleTongue: (build: (builder: ITripleTongueBuilder) => ITripleTongueBuilder) => ITechnicalBuilder;
	    toe: (build: (builder: IToeBuilder) => IToeBuilder) => ITechnicalBuilder;
	    hole: (build: (builder: IHoleBuilder) => IHoleBuilder) => ITechnicalBuilder;
	    hammerOn: (build: (builder: IHammerOnBuilder) => IHammerOnBuilder) => ITechnicalBuilder;
	    upBow: (build: (builder: IUpBowBuilder) => IUpBowBuilder) => ITechnicalBuilder;
	    downBow: (build: (builder: IDownBowBuilder) => IDownBowBuilder) => ITechnicalBuilder;
	    fret: (build: (builder: IFretBuilder) => IFretBuilder) => ITechnicalBuilder;
	    tap: (build: (builder: ITapBuilder) => ITapBuilder) => ITechnicalBuilder;
	    pullOff: (build: (builder: IPullOffBuilder) => IPullOffBuilder) => ITechnicalBuilder;
	    handbell: (build: (builder: IHandbellBuilder) => IHandbellBuilder) => ITechnicalBuilder;
	    bend: (build: (builder: IBendBuilder) => IBendBuilder) => ITechnicalBuilder;
	    thumbPosition: (build: (builder: IThumbPositionBuilder) => IThumbPositionBuilder) => ITechnicalBuilder;
	    stopped: (build: (builder: IStoppedBuilder) => IStoppedBuilder) => ITechnicalBuilder;
	    pluck: (build: (builder: IPluckBuilder) => IPluckBuilder) => ITechnicalBuilder;
	    doubleTongue: (build: (builder: IDoubleTongueBuilder) => IDoubleTongueBuilder) => ITechnicalBuilder;
	    string: (build: (builder: IStringBuilder) => IStringBuilder) => ITechnicalBuilder;
	    openString: (build: (builder: IOpenStringBuilder) => IOpenStringBuilder) => ITechnicalBuilder;
	    fingernails: (build: (builder: IFingernailsBuilder) => IFingernailsBuilder) => ITechnicalBuilder;
	    arrow: (build: (builder: IArrowBuilder) => IArrowBuilder) => ITechnicalBuilder;
	    harmonic: (build: (builder: IHarmonicBuilder) => IHarmonicBuilder) => ITechnicalBuilder;
	    heel: (build: (builder: IHeelBuilder) => IHeelBuilder) => ITechnicalBuilder;
	    otherTechnical: (build: (builder: IOtherTechnicalBuilder) => IOtherTechnicalBuilder) => ITechnicalBuilder;
	    snapPizzicato: (build: (builder: ISnapPizzicatoBuilder) => ISnapPizzicatoBuilder) => ITechnicalBuilder;
	    fingering: (build: (builder: IFingeringBuilder) => IFingeringBuilder) => ITechnicalBuilder;
	}
	export function patchTechnical(base: Technical): ITechnicalBuilder;
	export function buildTechnical(): ITechnicalBuilder;
	export interface IUpBowBuilder {
	    build: () => UpBow;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IUpBowBuilder;
	    relativeY: (relativeY: number) => IUpBowBuilder;
	    defaultY: (defaultY: number) => IUpBowBuilder;
	    relativeX: (relativeX: number) => IUpBowBuilder;
	}
	export function patchUpBow(base: UpBow): IUpBowBuilder;
	export function buildUpBow(): IUpBowBuilder;
	export interface IDownBowBuilder {
	    build: () => DownBow;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDownBowBuilder;
	    relativeY: (relativeY: number) => IDownBowBuilder;
	    defaultY: (defaultY: number) => IDownBowBuilder;
	    relativeX: (relativeX: number) => IDownBowBuilder;
	}
	export function patchDownBow(base: DownBow): IDownBowBuilder;
	export function buildDownBow(): IDownBowBuilder;
	export interface IHarmonicBuilder {
	    build: () => Harmonic;
	    patch: () => any[];
	    artificial: (artificial: boolean) => IHarmonicBuilder;
	    touchingPitch: (touchingPitch: boolean) => IHarmonicBuilder;
	    soundingPitch: (soundingPitch: boolean) => IHarmonicBuilder;
	    natural: (natural: boolean) => IHarmonicBuilder;
	    basePitch: (basePitch: boolean) => IHarmonicBuilder;
	    printObject: (printObject: boolean) => IHarmonicBuilder;
	}
	export function patchHarmonic(base: Harmonic): IHarmonicBuilder;
	export function buildHarmonic(): IHarmonicBuilder;
	export interface IOpenStringBuilder {
	    build: () => OpenString;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IOpenStringBuilder;
	    relativeY: (relativeY: number) => IOpenStringBuilder;
	    defaultY: (defaultY: number) => IOpenStringBuilder;
	    relativeX: (relativeX: number) => IOpenStringBuilder;
	}
	export function patchOpenString(base: OpenString): IOpenStringBuilder;
	export function buildOpenString(): IOpenStringBuilder;
	export interface IThumbPositionBuilder {
	    build: () => ThumbPosition;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IThumbPositionBuilder;
	    relativeY: (relativeY: number) => IThumbPositionBuilder;
	    defaultY: (defaultY: number) => IThumbPositionBuilder;
	    relativeX: (relativeX: number) => IThumbPositionBuilder;
	}
	export function patchThumbPosition(base: ThumbPosition): IThumbPositionBuilder;
	export function buildThumbPosition(): IThumbPositionBuilder;
	export interface IPluckBuilder {
	    build: () => Pluck;
	    patch: () => any[];
	    data: (data: string) => IPluckBuilder;
	    defaultX: (defaultX: number) => IPluckBuilder;
	    relativeY: (relativeY: number) => IPluckBuilder;
	    defaultY: (defaultY: number) => IPluckBuilder;
	    relativeX: (relativeX: number) => IPluckBuilder;
	}
	export function patchPluck(base: Pluck): IPluckBuilder;
	export function buildPluck(): IPluckBuilder;
	export interface IDoubleTongueBuilder {
	    build: () => DoubleTongue;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDoubleTongueBuilder;
	    relativeY: (relativeY: number) => IDoubleTongueBuilder;
	    defaultY: (defaultY: number) => IDoubleTongueBuilder;
	    relativeX: (relativeX: number) => IDoubleTongueBuilder;
	}
	export function patchDoubleTongue(base: DoubleTongue): IDoubleTongueBuilder;
	export function buildDoubleTongue(): IDoubleTongueBuilder;
	export interface ITripleTongueBuilder {
	    build: () => TripleTongue;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ITripleTongueBuilder;
	    relativeY: (relativeY: number) => ITripleTongueBuilder;
	    defaultY: (defaultY: number) => ITripleTongueBuilder;
	    relativeX: (relativeX: number) => ITripleTongueBuilder;
	}
	export function patchTripleTongue(base: TripleTongue): ITripleTongueBuilder;
	export function buildTripleTongue(): ITripleTongueBuilder;
	export interface IStoppedBuilder {
	    build: () => Stopped;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IStoppedBuilder;
	    relativeY: (relativeY: number) => IStoppedBuilder;
	    defaultY: (defaultY: number) => IStoppedBuilder;
	    relativeX: (relativeX: number) => IStoppedBuilder;
	}
	export function patchStopped(base: Stopped): IStoppedBuilder;
	export function buildStopped(): IStoppedBuilder;
	export interface ISnapPizzicatoBuilder {
	    build: () => SnapPizzicato;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ISnapPizzicatoBuilder;
	    relativeY: (relativeY: number) => ISnapPizzicatoBuilder;
	    defaultY: (defaultY: number) => ISnapPizzicatoBuilder;
	    relativeX: (relativeX: number) => ISnapPizzicatoBuilder;
	}
	export function patchSnapPizzicato(base: SnapPizzicato): ISnapPizzicatoBuilder;
	export function buildSnapPizzicato(): ISnapPizzicatoBuilder;
	export interface IHammerOnBuilder {
	    build: () => HammerOn;
	    patch: () => any[];
	    number: (number: number) => IHammerOnBuilder;
	    type: (type: StartStop) => IHammerOnBuilder;
	    data: (data: string) => IHammerOnBuilder;
	    defaultX: (defaultX: number) => IHammerOnBuilder;
	    relativeY: (relativeY: number) => IHammerOnBuilder;
	    defaultY: (defaultY: number) => IHammerOnBuilder;
	    relativeX: (relativeX: number) => IHammerOnBuilder;
	}
	export function patchHammerOn(base: HammerOn): IHammerOnBuilder;
	export function buildHammerOn(): IHammerOnBuilder;
	export interface IPullOffBuilder {
	    build: () => PullOff;
	    patch: () => any[];
	    number: (number: number) => IPullOffBuilder;
	    type: (type: StartStop) => IPullOffBuilder;
	    data: (data: string) => IPullOffBuilder;
	    defaultX: (defaultX: number) => IPullOffBuilder;
	    relativeY: (relativeY: number) => IPullOffBuilder;
	    defaultY: (defaultY: number) => IPullOffBuilder;
	    relativeX: (relativeX: number) => IPullOffBuilder;
	}
	export function patchPullOff(base: PullOff): IPullOffBuilder;
	export function buildPullOff(): IPullOffBuilder;
	export interface IBendBuilder {
	    build: () => Bend;
	    patch: () => any[];
	    bendAlter: (bendAlter: string) => IBendBuilder;
	    withBar: (build: (builder: IWithBarBuilder) => IWithBarBuilder) => IBendBuilder;
	    preBend: (preBend: boolean) => IBendBuilder;
	    release: (release: boolean) => IBendBuilder;
	    defaultX: (defaultX: number) => IBendBuilder;
	    relativeY: (relativeY: number) => IBendBuilder;
	    defaultY: (defaultY: number) => IBendBuilder;
	    relativeX: (relativeX: number) => IBendBuilder;
	}
	export function patchBend(base: Bend): IBendBuilder;
	export function buildBend(): IBendBuilder;
	export interface IWithBarBuilder {
	    build: () => WithBar;
	    patch: () => any[];
	    data: (data: string) => IWithBarBuilder;
	    defaultX: (defaultX: number) => IWithBarBuilder;
	    relativeY: (relativeY: number) => IWithBarBuilder;
	    defaultY: (defaultY: number) => IWithBarBuilder;
	    relativeX: (relativeX: number) => IWithBarBuilder;
	}
	export function patchWithBar(base: WithBar): IWithBarBuilder;
	export function buildWithBar(): IWithBarBuilder;
	export interface ITapBuilder {
	    build: () => Tap;
	    patch: () => any[];
	    data: (data: string) => ITapBuilder;
	    defaultX: (defaultX: number) => ITapBuilder;
	    relativeY: (relativeY: number) => ITapBuilder;
	    defaultY: (defaultY: number) => ITapBuilder;
	    relativeX: (relativeX: number) => ITapBuilder;
	}
	export function patchTap(base: Tap): ITapBuilder;
	export function buildTap(): ITapBuilder;
	export interface IHeelBuilder {
	    build: () => Heel;
	    patch: () => any[];
	    substitution: (substitution: boolean) => IHeelBuilder;
	    defaultX: (defaultX: number) => IHeelBuilder;
	    relativeY: (relativeY: number) => IHeelBuilder;
	    defaultY: (defaultY: number) => IHeelBuilder;
	    relativeX: (relativeX: number) => IHeelBuilder;
	}
	export function patchHeel(base: Heel): IHeelBuilder;
	export function buildHeel(): IHeelBuilder;
	export interface IToeBuilder {
	    build: () => Toe;
	    patch: () => any[];
	    substitution: (substitution: boolean) => IToeBuilder;
	    defaultX: (defaultX: number) => IToeBuilder;
	    relativeY: (relativeY: number) => IToeBuilder;
	    defaultY: (defaultY: number) => IToeBuilder;
	    relativeX: (relativeX: number) => IToeBuilder;
	}
	export function patchToe(base: Toe): IToeBuilder;
	export function buildToe(): IToeBuilder;
	export interface IFingernailsBuilder {
	    build: () => Fingernails;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IFingernailsBuilder;
	    relativeY: (relativeY: number) => IFingernailsBuilder;
	    defaultY: (defaultY: number) => IFingernailsBuilder;
	    relativeX: (relativeX: number) => IFingernailsBuilder;
	}
	export function patchFingernails(base: Fingernails): IFingernailsBuilder;
	export function buildFingernails(): IFingernailsBuilder;
	export interface IHoleBuilder {
	    build: () => Hole;
	    patch: () => any[];
	    holeClosed: (build: (builder: IHoleClosedBuilder) => IHoleClosedBuilder) => IHoleBuilder;
	    holeShape: (holeShape: string) => IHoleBuilder;
	    holeType: (holeType: string) => IHoleBuilder;
	    defaultX: (defaultX: number) => IHoleBuilder;
	    relativeY: (relativeY: number) => IHoleBuilder;
	    defaultY: (defaultY: number) => IHoleBuilder;
	    relativeX: (relativeX: number) => IHoleBuilder;
	}
	export function patchHole(base: Hole): IHoleBuilder;
	export function buildHole(): IHoleBuilder;
	export interface IHoleClosedBuilder {
	    build: () => HoleClosed;
	    patch: () => any[];
	    location: (location: HoleLocation) => IHoleClosedBuilder;
	    data: (data: HoleClosedType) => IHoleClosedBuilder;
	}
	export function patchHoleClosed(base: HoleClosed): IHoleClosedBuilder;
	export function buildHoleClosed(): IHoleClosedBuilder;
	export interface IArrowBuilder {
	    build: () => Arrow;
	    patch: () => any[];
	    arrowStyle: (arrowStyle: string) => IArrowBuilder;
	    arrowDirection: (arrowDirection: string) => IArrowBuilder;
	    circularArrow: (circularArrow: string) => IArrowBuilder;
	    defaultX: (defaultX: number) => IArrowBuilder;
	    relativeY: (relativeY: number) => IArrowBuilder;
	    defaultY: (defaultY: number) => IArrowBuilder;
	    relativeX: (relativeX: number) => IArrowBuilder;
	}
	export function patchArrow(base: Arrow): IArrowBuilder;
	export function buildArrow(): IArrowBuilder;
	export interface IHandbellBuilder {
	    build: () => Handbell;
	    patch: () => any[];
	    data: (data: string) => IHandbellBuilder;
	    defaultX: (defaultX: number) => IHandbellBuilder;
	    relativeY: (relativeY: number) => IHandbellBuilder;
	    defaultY: (defaultY: number) => IHandbellBuilder;
	    relativeX: (relativeX: number) => IHandbellBuilder;
	}
	export function patchHandbell(base: Handbell): IHandbellBuilder;
	export function buildHandbell(): IHandbellBuilder;
	export interface IOtherTechnicalBuilder {
	    build: () => OtherTechnical;
	    patch: () => any[];
	    data: (data: string) => IOtherTechnicalBuilder;
	    defaultX: (defaultX: number) => IOtherTechnicalBuilder;
	    relativeY: (relativeY: number) => IOtherTechnicalBuilder;
	    defaultY: (defaultY: number) => IOtherTechnicalBuilder;
	    relativeX: (relativeX: number) => IOtherTechnicalBuilder;
	}
	export function patchOtherTechnical(base: OtherTechnical): IOtherTechnicalBuilder;
	export function buildOtherTechnical(): IOtherTechnicalBuilder;
	export interface IArticulationsBuilder {
	    build: () => Articulations;
	    patch: () => any[];
	    accent: (build: (builder: IAccentBuilder) => IAccentBuilder) => IArticulationsBuilder;
	    doit: (build: (builder: IDoitBuilder) => IDoitBuilder) => IArticulationsBuilder;
	    breathMark: (build: (builder: IBreathMarkBuilder) => IBreathMarkBuilder) => IArticulationsBuilder;
	    otherArticulations: (otherArticulations: OtherArticulation[]) => IArticulationsBuilder;
	    detachedLegato: (build: (builder: IDetachedLegatoBuilder) => IDetachedLegatoBuilder) => IArticulationsBuilder;
	    staccatissimo: (build: (builder: IStaccatissimoBuilder) => IStaccatissimoBuilder) => IArticulationsBuilder;
	    plop: (build: (builder: IPlopBuilder) => IPlopBuilder) => IArticulationsBuilder;
	    unstress: (build: (builder: IUnstressBuilder) => IUnstressBuilder) => IArticulationsBuilder;
	    strongAccent: (build: (builder: IStrongAccentBuilder) => IStrongAccentBuilder) => IArticulationsBuilder;
	    staccato: (build: (builder: IStaccatoBuilder) => IStaccatoBuilder) => IArticulationsBuilder;
	    spiccato: (build: (builder: ISpiccatoBuilder) => ISpiccatoBuilder) => IArticulationsBuilder;
	    scoop: (build: (builder: IScoopBuilder) => IScoopBuilder) => IArticulationsBuilder;
	    falloff: (build: (builder: IFalloffBuilder) => IFalloffBuilder) => IArticulationsBuilder;
	    caesura: (build: (builder: ICaesuraBuilder) => ICaesuraBuilder) => IArticulationsBuilder;
	    stress: (build: (builder: IStressBuilder) => IStressBuilder) => IArticulationsBuilder;
	    tenuto: (build: (builder: ITenutoBuilder) => ITenutoBuilder) => IArticulationsBuilder;
	}
	export function patchArticulations(base: Articulations): IArticulationsBuilder;
	export function buildArticulations(): IArticulationsBuilder;
	export interface IAccentBuilder {
	    build: () => Accent;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IAccentBuilder;
	    relativeY: (relativeY: number) => IAccentBuilder;
	    defaultY: (defaultY: number) => IAccentBuilder;
	    relativeX: (relativeX: number) => IAccentBuilder;
	}
	export function patchAccent(base: Accent): IAccentBuilder;
	export function buildAccent(): IAccentBuilder;
	export interface IStrongAccentBuilder {
	    build: () => StrongAccent;
	    patch: () => any[];
	    type: (type: UpDown) => IStrongAccentBuilder;
	    defaultX: (defaultX: number) => IStrongAccentBuilder;
	    relativeY: (relativeY: number) => IStrongAccentBuilder;
	    defaultY: (defaultY: number) => IStrongAccentBuilder;
	    relativeX: (relativeX: number) => IStrongAccentBuilder;
	}
	export function patchStrongAccent(base: StrongAccent): IStrongAccentBuilder;
	export function buildStrongAccent(): IStrongAccentBuilder;
	export interface IStaccatoBuilder {
	    build: () => Staccato;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IStaccatoBuilder;
	    relativeY: (relativeY: number) => IStaccatoBuilder;
	    defaultY: (defaultY: number) => IStaccatoBuilder;
	    relativeX: (relativeX: number) => IStaccatoBuilder;
	}
	export function patchStaccato(base: Staccato): IStaccatoBuilder;
	export function buildStaccato(): IStaccatoBuilder;
	export interface ITenutoBuilder {
	    build: () => Tenuto;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ITenutoBuilder;
	    relativeY: (relativeY: number) => ITenutoBuilder;
	    defaultY: (defaultY: number) => ITenutoBuilder;
	    relativeX: (relativeX: number) => ITenutoBuilder;
	}
	export function patchTenuto(base: Tenuto): ITenutoBuilder;
	export function buildTenuto(): ITenutoBuilder;
	export interface IDetachedLegatoBuilder {
	    build: () => DetachedLegato;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDetachedLegatoBuilder;
	    relativeY: (relativeY: number) => IDetachedLegatoBuilder;
	    defaultY: (defaultY: number) => IDetachedLegatoBuilder;
	    relativeX: (relativeX: number) => IDetachedLegatoBuilder;
	}
	export function patchDetachedLegato(base: DetachedLegato): IDetachedLegatoBuilder;
	export function buildDetachedLegato(): IDetachedLegatoBuilder;
	export interface IStaccatissimoBuilder {
	    build: () => Staccatissimo;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IStaccatissimoBuilder;
	    relativeY: (relativeY: number) => IStaccatissimoBuilder;
	    defaultY: (defaultY: number) => IStaccatissimoBuilder;
	    relativeX: (relativeX: number) => IStaccatissimoBuilder;
	}
	export function patchStaccatissimo(base: Staccatissimo): IStaccatissimoBuilder;
	export function buildStaccatissimo(): IStaccatissimoBuilder;
	export interface ISpiccatoBuilder {
	    build: () => Spiccato;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ISpiccatoBuilder;
	    relativeY: (relativeY: number) => ISpiccatoBuilder;
	    defaultY: (defaultY: number) => ISpiccatoBuilder;
	    relativeX: (relativeX: number) => ISpiccatoBuilder;
	}
	export function patchSpiccato(base: Spiccato): ISpiccatoBuilder;
	export function buildSpiccato(): ISpiccatoBuilder;
	export interface IScoopBuilder {
	    build: () => Scoop;
	    patch: () => any[];
	    lineShape: (lineShape: StraightCurved) => IScoopBuilder;
	}
	export function patchScoop(base: Scoop): IScoopBuilder;
	export function buildScoop(): IScoopBuilder;
	export interface IPlopBuilder {
	    build: () => Plop;
	    patch: () => any[];
	    lineShape: (lineShape: StraightCurved) => IPlopBuilder;
	}
	export function patchPlop(base: Plop): IPlopBuilder;
	export function buildPlop(): IPlopBuilder;
	export interface IDoitBuilder {
	    build: () => Doit;
	    patch: () => any[];
	    lineShape: (lineShape: StraightCurved) => IDoitBuilder;
	}
	export function patchDoit(base: Doit): IDoitBuilder;
	export function buildDoit(): IDoitBuilder;
	export interface IFalloffBuilder {
	    build: () => Falloff;
	    patch: () => any[];
	    lineShape: (lineShape: StraightCurved) => IFalloffBuilder;
	}
	export function patchFalloff(base: Falloff): IFalloffBuilder;
	export function buildFalloff(): IFalloffBuilder;
	export interface IBreathMarkBuilder {
	    build: () => BreathMark;
	    patch: () => any[];
	    type: (type: BreathMarkType) => IBreathMarkBuilder;
	    lineShape: (lineShape: StraightCurved) => IBreathMarkBuilder;
	}
	export function patchBreathMark(base: BreathMark): IBreathMarkBuilder;
	export function buildBreathMark(): IBreathMarkBuilder;
	export interface ICaesuraBuilder {
	    build: () => Caesura;
	    patch: () => any[];
	    defaultX: (defaultX: number) => ICaesuraBuilder;
	    relativeY: (relativeY: number) => ICaesuraBuilder;
	    defaultY: (defaultY: number) => ICaesuraBuilder;
	    relativeX: (relativeX: number) => ICaesuraBuilder;
	}
	export function patchCaesura(base: Caesura): ICaesuraBuilder;
	export function buildCaesura(): ICaesuraBuilder;
	export interface IStressBuilder {
	    build: () => Stress;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IStressBuilder;
	    relativeY: (relativeY: number) => IStressBuilder;
	    defaultY: (defaultY: number) => IStressBuilder;
	    relativeX: (relativeX: number) => IStressBuilder;
	}
	export function patchStress(base: Stress): IStressBuilder;
	export function buildStress(): IStressBuilder;
	export interface IUnstressBuilder {
	    build: () => Unstress;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IUnstressBuilder;
	    relativeY: (relativeY: number) => IUnstressBuilder;
	    defaultY: (defaultY: number) => IUnstressBuilder;
	    relativeX: (relativeX: number) => IUnstressBuilder;
	}
	export function patchUnstress(base: Unstress): IUnstressBuilder;
	export function buildUnstress(): IUnstressBuilder;
	export interface IOtherArticulationBuilder {
	    build: () => OtherArticulation;
	    patch: () => any[];
	    data: (data: string) => IOtherArticulationBuilder;
	    defaultX: (defaultX: number) => IOtherArticulationBuilder;
	    relativeY: (relativeY: number) => IOtherArticulationBuilder;
	    defaultY: (defaultY: number) => IOtherArticulationBuilder;
	    relativeX: (relativeX: number) => IOtherArticulationBuilder;
	}
	export function patchOtherArticulation(base: OtherArticulation): IOtherArticulationBuilder;
	export function buildOtherArticulation(): IOtherArticulationBuilder;
	export interface IArpeggiateBuilder {
	    build: () => Arpeggiate;
	    patch: () => any[];
	    number: (number: number) => IArpeggiateBuilder;
	    direction: (direction: UpDown) => IArpeggiateBuilder;
	    defaultX: (defaultX: number) => IArpeggiateBuilder;
	    relativeY: (relativeY: number) => IArpeggiateBuilder;
	    defaultY: (defaultY: number) => IArpeggiateBuilder;
	    relativeX: (relativeX: number) => IArpeggiateBuilder;
	}
	export function patchArpeggiate(base: Arpeggiate): IArpeggiateBuilder;
	export function buildArpeggiate(): IArpeggiateBuilder;
	export interface INonArpeggiateBuilder {
	    build: () => NonArpeggiate;
	    patch: () => any[];
	    number: (number: number) => INonArpeggiateBuilder;
	    type: (type: TopBottom) => INonArpeggiateBuilder;
	    defaultX: (defaultX: number) => INonArpeggiateBuilder;
	    relativeY: (relativeY: number) => INonArpeggiateBuilder;
	    defaultY: (defaultY: number) => INonArpeggiateBuilder;
	    relativeX: (relativeX: number) => INonArpeggiateBuilder;
	}
	export function patchNonArpeggiate(base: NonArpeggiate): INonArpeggiateBuilder;
	export function buildNonArpeggiate(): INonArpeggiateBuilder;
	export interface ILaughingBuilder {
	    build: () => Laughing;
	    patch: () => any[];
	    _class: (_class: string) => ILaughingBuilder;
	}
	export function patchLaughing(base: Laughing): ILaughingBuilder;
	export function buildLaughing(): ILaughingBuilder;
	export interface IHummingBuilder {
	    build: () => Humming;
	    patch: () => any[];
	    _class: (_class: string) => IHummingBuilder;
	}
	export function patchHumming(base: Humming): IHummingBuilder;
	export function buildHumming(): IHummingBuilder;
	export interface IEndLineBuilder {
	    build: () => EndLine;
	    patch: () => any[];
	    _class: (_class: string) => IEndLineBuilder;
	}
	export function patchEndLine(base: EndLine): IEndLineBuilder;
	export function buildEndLine(): IEndLineBuilder;
	export interface IEndParagraphBuilder {
	    build: () => EndParagraph;
	    patch: () => any[];
	    _class: (_class: string) => IEndParagraphBuilder;
	}
	export function patchEndParagraph(base: EndParagraph): IEndParagraphBuilder;
	export function buildEndParagraph(): IEndParagraphBuilder;
	export interface ILyricPartsBuilder {
	    build: () => LyricParts;
	    patch: () => any[];
	}
	export function patchLyricParts(base: LyricParts): ILyricPartsBuilder;
	export function buildLyricParts(): ILyricPartsBuilder;
	export interface ILyricBuilder {
	    build: () => Lyric;
	    patch: () => any[];
	    lyricParts: (lyricParts: boolean[]) => ILyricBuilder;
	    number: (number: number) => ILyricBuilder;
	    name: (name: string) => ILyricBuilder;
	    justify: (justify: LeftCenterRight) => ILyricBuilder;
	}
	export function patchLyric(base: Lyric): ILyricBuilder;
	export function buildLyric(): ILyricBuilder;
	export interface ITextBuilder {
	    build: () => Text;
	    patch: () => any[];
	    data: (data: string) => ITextBuilder;
	    _class: (_class: string) => ITextBuilder;
	    fontFamily: (fontFamily: string) => ITextBuilder;
	    fontWeight: (fontWeight: NormalBold) => ITextBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ITextBuilder;
	    fontSize: (fontSize: string) => ITextBuilder;
	}
	export function patchText(base: Text): ITextBuilder;
	export function buildText(): ITextBuilder;
	export interface ISyllabicBuilder {
	    build: () => Syllabic;
	    patch: () => any[];
	    data: (data: SyllabicType) => ISyllabicBuilder;
	    _class: (_class: string) => ISyllabicBuilder;
	    fontFamily: (fontFamily: string) => ISyllabicBuilder;
	    fontWeight: (fontWeight: NormalBold) => ISyllabicBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ISyllabicBuilder;
	    fontSize: (fontSize: string) => ISyllabicBuilder;
	}
	export function patchSyllabic(base: Syllabic): ISyllabicBuilder;
	export function buildSyllabic(): ISyllabicBuilder;
	export interface IElisionBuilder {
	    build: () => Elision;
	    patch: () => any[];
	    data: (data: string) => IElisionBuilder;
	    _class: (_class: string) => IElisionBuilder;
	    fontFamily: (fontFamily: string) => IElisionBuilder;
	    fontWeight: (fontWeight: NormalBold) => IElisionBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IElisionBuilder;
	    fontSize: (fontSize: string) => IElisionBuilder;
	}
	export function patchElision(base: Elision): IElisionBuilder;
	export function buildElision(): IElisionBuilder;
	export interface IExtendBuilder {
	    build: () => Extend;
	    patch: () => any[];
	    type: (type: StartStopContinue) => IExtendBuilder;
	    _class: (_class: string) => IExtendBuilder;
	    defaultX: (defaultX: number) => IExtendBuilder;
	    relativeY: (relativeY: number) => IExtendBuilder;
	    defaultY: (defaultY: number) => IExtendBuilder;
	    relativeX: (relativeX: number) => IExtendBuilder;
	}
	export function patchExtend(base: Extend): IExtendBuilder;
	export function buildExtend(): IExtendBuilder;
	export interface IFiguredBassBuilder {
	    build: () => FiguredBass;
	    patch: () => any[];
	    figures: (figures: Figure[]) => IFiguredBassBuilder;
	    duration: (duration: number) => IFiguredBassBuilder;
	    parentheses: (parentheses: boolean) => IFiguredBassBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IFiguredBassBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IFiguredBassBuilder;
	    _class: (_class: string) => IFiguredBassBuilder;
	}
	export function patchFiguredBass(base: FiguredBass): IFiguredBassBuilder;
	export function buildFiguredBass(): IFiguredBassBuilder;
	export interface IFigureBuilder {
	    build: () => Figure;
	    patch: () => any[];
	    prefix: (build: (builder: IPrefixBuilder) => IPrefixBuilder) => IFigureBuilder;
	    figureNumber: (build: (builder: IFigureNumberBuilder) => IFigureNumberBuilder) => IFigureBuilder;
	    extend: (build: (builder: IExtendBuilder) => IExtendBuilder) => IFigureBuilder;
	    suffix: (build: (builder: ISuffixBuilder) => ISuffixBuilder) => IFigureBuilder;
	    defaultX: (defaultX: number) => IFigureBuilder;
	    relativeY: (relativeY: number) => IFigureBuilder;
	    defaultY: (defaultY: number) => IFigureBuilder;
	    relativeX: (relativeX: number) => IFigureBuilder;
	}
	export function patchFigure(base: Figure): IFigureBuilder;
	export function buildFigure(): IFigureBuilder;
	export interface IPrefixBuilder {
	    build: () => Prefix;
	    patch: () => any[];
	    data: (data: string) => IPrefixBuilder;
	    defaultX: (defaultX: number) => IPrefixBuilder;
	    relativeY: (relativeY: number) => IPrefixBuilder;
	    defaultY: (defaultY: number) => IPrefixBuilder;
	    relativeX: (relativeX: number) => IPrefixBuilder;
	}
	export function patchPrefix(base: Prefix): IPrefixBuilder;
	export function buildPrefix(): IPrefixBuilder;
	export interface IFigureNumberBuilder {
	    build: () => FigureNumber;
	    patch: () => any[];
	    data: (data: string) => IFigureNumberBuilder;
	    defaultX: (defaultX: number) => IFigureNumberBuilder;
	    relativeY: (relativeY: number) => IFigureNumberBuilder;
	    defaultY: (defaultY: number) => IFigureNumberBuilder;
	    relativeX: (relativeX: number) => IFigureNumberBuilder;
	}
	export function patchFigureNumber(base: FigureNumber): IFigureNumberBuilder;
	export function buildFigureNumber(): IFigureNumberBuilder;
	export interface ISuffixBuilder {
	    build: () => Suffix;
	    patch: () => any[];
	    data: (data: string) => ISuffixBuilder;
	    defaultX: (defaultX: number) => ISuffixBuilder;
	    relativeY: (relativeY: number) => ISuffixBuilder;
	    defaultY: (defaultY: number) => ISuffixBuilder;
	    relativeX: (relativeX: number) => ISuffixBuilder;
	}
	export function patchSuffix(base: Suffix): ISuffixBuilder;
	export function buildSuffix(): ISuffixBuilder;
	export interface IBackupBuilder {
	    build: () => Backup;
	    patch: () => any[];
	    duration: (duration: number) => IBackupBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IBackupBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IBackupBuilder;
	    _class: (_class: string) => IBackupBuilder;
	}
	export function patchBackup(base: Backup): IBackupBuilder;
	export function buildBackup(): IBackupBuilder;
	export interface IForwardBuilder {
	    build: () => Forward;
	    patch: () => any[];
	    duration: (duration: number) => IForwardBuilder;
	    staff: (staff: number) => IForwardBuilder;
	    voice: (voice: number) => IForwardBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IForwardBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IForwardBuilder;
	    _class: (_class: string) => IForwardBuilder;
	}
	export function patchForward(base: Forward): IForwardBuilder;
	export function buildForward(): IForwardBuilder;
	export interface IBarlineBuilder {
	    build: () => Barline;
	    patch: () => any[];
	    segno: (build: (builder: ISegnoBuilder) => ISegnoBuilder) => IBarlineBuilder;
	    coda: (build: (builder: ICodaBuilder) => ICodaBuilder) => IBarlineBuilder;
	    location: (location: BarlineLocation) => IBarlineBuilder;
	    codaAttrib: (codaAttrib: string) => IBarlineBuilder;
	    wavyLine: (build: (builder: IWavyLineBuilder) => IWavyLineBuilder) => IBarlineBuilder;
	    fermatas: (fermatas: Fermata[]) => IBarlineBuilder;
	    segnoAttrib: (segnoAttrib: string) => IBarlineBuilder;
	    divisions: (divisions: number) => IBarlineBuilder;
	    barStyle: (build: (builder: IBarStyleBuilder) => IBarStyleBuilder) => IBarlineBuilder;
	    ending: (build: (builder: IEndingBuilder) => IEndingBuilder) => IBarlineBuilder;
	    repeat: (build: (builder: IRepeatBuilder) => IRepeatBuilder) => IBarlineBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IBarlineBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IBarlineBuilder;
	    _class: (_class: string) => IBarlineBuilder;
	}
	export function patchBarline(base: Barline): IBarlineBuilder;
	export function buildBarline(): IBarlineBuilder;
	export interface IBarStyleBuilder {
	    build: () => BarStyle;
	    patch: () => any[];
	    data: (data: BarStyleType) => IBarStyleBuilder;
	    color: (color: string) => IBarStyleBuilder;
	}
	export function patchBarStyle(base: BarStyle): IBarStyleBuilder;
	export function buildBarStyle(): IBarStyleBuilder;
	export interface IEndingBuilder {
	    build: () => Ending;
	    patch: () => any[];
	    endLength: (endLength: number) => IEndingBuilder;
	    textX: (textX: number) => IEndingBuilder;
	    number: (number: number) => IEndingBuilder;
	    textY: (textY: number) => IEndingBuilder;
	    type: (type: StartStopDiscontinue) => IEndingBuilder;
	    ending: (ending: string) => IEndingBuilder;
	    printObject: (printObject: boolean) => IEndingBuilder;
	}
	export function patchEnding(base: Ending): IEndingBuilder;
	export function buildEnding(): IEndingBuilder;
	export interface IRepeatBuilder {
	    build: () => Repeat;
	    patch: () => any[];
	    times: (times: string) => IRepeatBuilder;
	    winged: (winged: WingedType) => IRepeatBuilder;
	    direction: (direction: DirectionTypeBg) => IRepeatBuilder;
	}
	export function patchRepeat(base: Repeat): IRepeatBuilder;
	export function buildRepeat(): IRepeatBuilder;
	export interface IDirectionBuilder {
	    build: () => Direction;
	    patch: () => any[];
	    directionTypes: (directionTypes: DirectionType[]) => IDirectionBuilder;
	    staff: (staff: number) => IDirectionBuilder;
	    offset: (build: (builder: IOffsetBuilder) => IOffsetBuilder) => IDirectionBuilder;
	    sound: (build: (builder: ISoundBuilder) => ISoundBuilder) => IDirectionBuilder;
	    voice: (voice: number) => IDirectionBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IDirectionBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IDirectionBuilder;
	    _class: (_class: string) => IDirectionBuilder;
	}
	export function patchDirection(base: Direction): IDirectionBuilder;
	export function buildDirection(): IDirectionBuilder;
	export interface IDirectionTypeBuilder {
	    build: () => DirectionType;
	    patch: () => any[];
	    percussions: (percussions: Percussion[]) => IDirectionTypeBuilder;
	    rehearsals: (rehearsals: Rehearsal[]) => IDirectionTypeBuilder;
	    pedal: (build: (builder: IPedalBuilder) => IPedalBuilder) => IDirectionTypeBuilder;
	    principalVoice: (build: (builder: IPrincipalVoiceBuilder) => IPrincipalVoiceBuilder) => IDirectionTypeBuilder;
	    accordionRegistration: (build: (builder: IAccordionRegistrationBuilder) => IAccordionRegistrationBuilder) => IDirectionTypeBuilder;
	    eyeglasses: (build: (builder: IEyeglassesBuilder) => IEyeglassesBuilder) => IDirectionTypeBuilder;
	    image: (build: (builder: IImageBuilder) => IImageBuilder) => IDirectionTypeBuilder;
	    harpPedals: (build: (builder: IHarpPedalsBuilder) => IHarpPedalsBuilder) => IDirectionTypeBuilder;
	    metronome: (build: (builder: IMetronomeBuilder) => IMetronomeBuilder) => IDirectionTypeBuilder;
	    otherDirection: (build: (builder: IOtherDirectionBuilder) => IOtherDirectionBuilder) => IDirectionTypeBuilder;
	    segnos: (segnos: Segno[]) => IDirectionTypeBuilder;
	    scordatura: (build: (builder: IScordaturaBuilder) => IScordaturaBuilder) => IDirectionTypeBuilder;
	    stringMute: (build: (builder: IStringMuteBuilder) => IStringMuteBuilder) => IDirectionTypeBuilder;
	    wedge: (build: (builder: IWedgeBuilder) => IWedgeBuilder) => IDirectionTypeBuilder;
	    dashes: (build: (builder: IDashesBuilder) => IDashesBuilder) => IDirectionTypeBuilder;
	    damp: (build: (builder: IDampBuilder) => IDampBuilder) => IDirectionTypeBuilder;
	    bracket: (build: (builder: IBracketBuilder) => IBracketBuilder) => IDirectionTypeBuilder;
	    dynamics: (build: (builder: IDynamicsBuilder) => IDynamicsBuilder) => IDirectionTypeBuilder;
	    octaveShift: (build: (builder: IOctaveShiftBuilder) => IOctaveShiftBuilder) => IDirectionTypeBuilder;
	    words: (words: Words[]) => IDirectionTypeBuilder;
	    dampAll: (build: (builder: IDampAllBuilder) => IDampAllBuilder) => IDirectionTypeBuilder;
	    codas: (codas: Coda[]) => IDirectionTypeBuilder;
	}
	export function patchDirectionType(base: DirectionType): IDirectionTypeBuilder;
	export function buildDirectionType(): IDirectionTypeBuilder;
	export interface IRehearsalBuilder {
	    build: () => Rehearsal;
	    patch: () => any[];
	    data: (data: string) => IRehearsalBuilder;
	    justify: (justify: LeftCenterRight) => IRehearsalBuilder;
	}
	export function patchRehearsal(base: Rehearsal): IRehearsalBuilder;
	export function buildRehearsal(): IRehearsalBuilder;
	export interface IWordsBuilder {
	    build: () => Words;
	    patch: () => any[];
	    data: (data: string) => IWordsBuilder;
	    justify: (justify: LeftCenterRight) => IWordsBuilder;
	}
	export function patchWords(base: Words): IWordsBuilder;
	export function buildWords(): IWordsBuilder;
	export interface IWedgeBuilder {
	    build: () => Wedge;
	    patch: () => any[];
	    number: (number: number) => IWedgeBuilder;
	    niente: (niente: boolean) => IWedgeBuilder;
	    type: (type: WedgeType) => IWedgeBuilder;
	    spread: (spread: number) => IWedgeBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => IWedgeBuilder;
	}
	export function patchWedge(base: Wedge): IWedgeBuilder;
	export function buildWedge(): IWedgeBuilder;
	export interface IDashesBuilder {
	    build: () => Dashes;
	    patch: () => any[];
	    number: (number: number) => IDashesBuilder;
	    type: (type: StartStopContinue) => IDashesBuilder;
	    dashLength: (dashLength: number) => IDashesBuilder;
	    spaceLength: (spaceLength: number) => IDashesBuilder;
	}
	export function patchDashes(base: Dashes): IDashesBuilder;
	export function buildDashes(): IDashesBuilder;
	export interface IBracketBuilder {
	    build: () => Bracket;
	    patch: () => any[];
	    endLength: (endLength: number) => IBracketBuilder;
	    number: (number: number) => IBracketBuilder;
	    type: (type: StartStopContinue) => IBracketBuilder;
	    lineEnd: (lineEnd: LineEndType) => IBracketBuilder;
	    lineType: (lineType: SolidDashedDottedWavy) => IBracketBuilder;
	}
	export function patchBracket(base: Bracket): IBracketBuilder;
	export function buildBracket(): IBracketBuilder;
	export interface IPedalBuilder {
	    build: () => Pedal;
	    patch: () => any[];
	    line: (line: boolean) => IPedalBuilder;
	    sign: (sign: boolean) => IPedalBuilder;
	    type: (type: PedalType) => IPedalBuilder;
	    defaultX: (defaultX: number) => IPedalBuilder;
	    relativeY: (relativeY: number) => IPedalBuilder;
	    defaultY: (defaultY: number) => IPedalBuilder;
	    relativeX: (relativeX: number) => IPedalBuilder;
	}
	export function patchPedal(base: Pedal): IPedalBuilder;
	export function buildPedal(): IPedalBuilder;
	export interface IMetronomeBuilder {
	    build: () => Metronome;
	    patch: () => any[];
	    metronomeNotes: (metronomeNotes: MetronomeNote[]) => IMetronomeBuilder;
	    perMinute: (build: (builder: IPerMinuteBuilder) => IPerMinuteBuilder) => IMetronomeBuilder;
	    parentheses: (parentheses: boolean) => IMetronomeBuilder;
	    beatUnit: (beatUnit: string) => IMetronomeBuilder;
	    beatUnitDots: (beatUnitDots: BeatUnitDot[]) => IMetronomeBuilder;
	    beatUnitChange: (beatUnitChange: string) => IMetronomeBuilder;
	    beatUnitDotsChange: (beatUnitDotsChange: BeatUnitDot[]) => IMetronomeBuilder;
	    metronomeRelation: (metronomeRelation: string) => IMetronomeBuilder;
	    defaultX: (defaultX: number) => IMetronomeBuilder;
	    relativeY: (relativeY: number) => IMetronomeBuilder;
	    defaultY: (defaultY: number) => IMetronomeBuilder;
	    relativeX: (relativeX: number) => IMetronomeBuilder;
	}
	export function patchMetronome(base: Metronome): IMetronomeBuilder;
	export function buildMetronome(): IMetronomeBuilder;
	export interface IBeatUnitDotBuilder {
	    build: () => BeatUnitDot;
	    patch: () => any[];
	}
	export function patchBeatUnitDot(base: BeatUnitDot): IBeatUnitDotBuilder;
	export function buildBeatUnitDot(): IBeatUnitDotBuilder;
	export interface IPerMinuteBuilder {
	    build: () => PerMinute;
	    patch: () => any[];
	    data: (data: string) => IPerMinuteBuilder;
	    fontFamily: (fontFamily: string) => IPerMinuteBuilder;
	    fontWeight: (fontWeight: NormalBold) => IPerMinuteBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IPerMinuteBuilder;
	    fontSize: (fontSize: string) => IPerMinuteBuilder;
	}
	export function patchPerMinute(base: PerMinute): IPerMinuteBuilder;
	export function buildPerMinute(): IPerMinuteBuilder;
	export interface IMetronomeNoteBuilder {
	    build: () => MetronomeNote;
	    patch: () => any[];
	    metronomeDots: (metronomeDots: MetronomeDot[]) => IMetronomeNoteBuilder;
	    metronomeBeams: (metronomeBeams: MetronomeBeam[]) => IMetronomeNoteBuilder;
	    metronomeType: (metronomeType: string) => IMetronomeNoteBuilder;
	    metronomeTuplet: (build: (builder: IMetronomeTupletBuilder) => IMetronomeTupletBuilder) => IMetronomeNoteBuilder;
	}
	export function patchMetronomeNote(base: MetronomeNote): IMetronomeNoteBuilder;
	export function buildMetronomeNote(): IMetronomeNoteBuilder;
	export interface IMetronomeDotBuilder {
	    build: () => MetronomeDot;
	    patch: () => any[];
	}
	export function patchMetronomeDot(base: MetronomeDot): IMetronomeDotBuilder;
	export function buildMetronomeDot(): IMetronomeDotBuilder;
	export interface IMetronomeBeamBuilder {
	    build: () => MetronomeBeam;
	    patch: () => any[];
	    number: (number: number) => IMetronomeBeamBuilder;
	    data: (data: string) => IMetronomeBeamBuilder;
	}
	export function patchMetronomeBeam(base: MetronomeBeam): IMetronomeBeamBuilder;
	export function buildMetronomeBeam(): IMetronomeBeamBuilder;
	export interface IMetronomeTupletBuilder {
	    build: () => MetronomeTuplet;
	    patch: () => any[];
	    actualNotes: (actualNotes: number) => IMetronomeTupletBuilder;
	    bracket: (bracket: boolean) => IMetronomeTupletBuilder;
	    showNumber: (showNumber: ActualBothNone) => IMetronomeTupletBuilder;
	    normalType: (normalType: string) => IMetronomeTupletBuilder;
	    type: (type: StartStop) => IMetronomeTupletBuilder;
	    normalNotes: (normalNotes: number) => IMetronomeTupletBuilder;
	    normalDots: (normalDots: NormalDot[]) => IMetronomeTupletBuilder;
	}
	export function patchMetronomeTuplet(base: MetronomeTuplet): IMetronomeTupletBuilder;
	export function buildMetronomeTuplet(): IMetronomeTupletBuilder;
	export interface IOctaveShiftBuilder {
	    build: () => OctaveShift;
	    patch: () => any[];
	    number: (number: number) => IOctaveShiftBuilder;
	    size: (size: number) => IOctaveShiftBuilder;
	    type: (type: OctaveShiftType) => IOctaveShiftBuilder;
	    dashLength: (dashLength: number) => IOctaveShiftBuilder;
	    spaceLength: (spaceLength: number) => IOctaveShiftBuilder;
	}
	export function patchOctaveShift(base: OctaveShift): IOctaveShiftBuilder;
	export function buildOctaveShift(): IOctaveShiftBuilder;
	export interface IHarpPedalsBuilder {
	    build: () => HarpPedals;
	    patch: () => any[];
	    pedalTunings: (pedalTunings: PedalTuning[]) => IHarpPedalsBuilder;
	    defaultX: (defaultX: number) => IHarpPedalsBuilder;
	    relativeY: (relativeY: number) => IHarpPedalsBuilder;
	    defaultY: (defaultY: number) => IHarpPedalsBuilder;
	    relativeX: (relativeX: number) => IHarpPedalsBuilder;
	}
	export function patchHarpPedals(base: HarpPedals): IHarpPedalsBuilder;
	export function buildHarpPedals(): IHarpPedalsBuilder;
	export interface IPedalTuningBuilder {
	    build: () => PedalTuning;
	    patch: () => any[];
	    pedalStep: (pedalStep: string) => IPedalTuningBuilder;
	    pedalAlter: (pedalAlter: string) => IPedalTuningBuilder;
	}
	export function patchPedalTuning(base: PedalTuning): IPedalTuningBuilder;
	export function buildPedalTuning(): IPedalTuningBuilder;
	export interface IDampBuilder {
	    build: () => Damp;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDampBuilder;
	    relativeY: (relativeY: number) => IDampBuilder;
	    defaultY: (defaultY: number) => IDampBuilder;
	    relativeX: (relativeX: number) => IDampBuilder;
	}
	export function patchDamp(base: Damp): IDampBuilder;
	export function buildDamp(): IDampBuilder;
	export interface IDampAllBuilder {
	    build: () => DampAll;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IDampAllBuilder;
	    relativeY: (relativeY: number) => IDampAllBuilder;
	    defaultY: (defaultY: number) => IDampAllBuilder;
	    relativeX: (relativeX: number) => IDampAllBuilder;
	}
	export function patchDampAll(base: DampAll): IDampAllBuilder;
	export function buildDampAll(): IDampAllBuilder;
	export interface IEyeglassesBuilder {
	    build: () => Eyeglasses;
	    patch: () => any[];
	    defaultX: (defaultX: number) => IEyeglassesBuilder;
	    relativeY: (relativeY: number) => IEyeglassesBuilder;
	    defaultY: (defaultY: number) => IEyeglassesBuilder;
	    relativeX: (relativeX: number) => IEyeglassesBuilder;
	}
	export function patchEyeglasses(base: Eyeglasses): IEyeglassesBuilder;
	export function buildEyeglasses(): IEyeglassesBuilder;
	export interface IStringMuteBuilder {
	    build: () => StringMute;
	    patch: () => any[];
	    type: (type: string) => IStringMuteBuilder;
	    defaultX: (defaultX: number) => IStringMuteBuilder;
	    relativeY: (relativeY: number) => IStringMuteBuilder;
	    defaultY: (defaultY: number) => IStringMuteBuilder;
	    relativeX: (relativeX: number) => IStringMuteBuilder;
	}
	export function patchStringMute(base: StringMute): IStringMuteBuilder;
	export function buildStringMute(): IStringMuteBuilder;
	export interface IScordaturaBuilder {
	    build: () => Scordatura;
	    patch: () => any[];
	    accords: (accords: Accord[]) => IScordaturaBuilder;
	}
	export function patchScordatura(base: Scordatura): IScordaturaBuilder;
	export function buildScordatura(): IScordaturaBuilder;
	export interface IAccordBuilder {
	    build: () => Accord;
	    patch: () => any[];
	    tuningAlter: (tuningAlter: string) => IAccordBuilder;
	    string: (string: string) => IAccordBuilder;
	    tuningStep: (tuningStep: string) => IAccordBuilder;
	    tuningOctave: (tuningOctave: string) => IAccordBuilder;
	}
	export function patchAccord(base: Accord): IAccordBuilder;
	export function buildAccord(): IAccordBuilder;
	export interface IImageBuilder {
	    build: () => Image;
	    patch: () => any[];
	    type: (type: string) => IImageBuilder;
	    source: (source: string) => IImageBuilder;
	    defaultX: (defaultX: number) => IImageBuilder;
	    relativeY: (relativeY: number) => IImageBuilder;
	    defaultY: (defaultY: number) => IImageBuilder;
	    relativeX: (relativeX: number) => IImageBuilder;
	}
	export function patchImage(base: Image): IImageBuilder;
	export function buildImage(): IImageBuilder;
	export interface IPrincipalVoiceBuilder {
	    build: () => PrincipalVoice;
	    patch: () => any[];
	    symbol: (symbol: VoiceSymbol) => IPrincipalVoiceBuilder;
	    data: (data: string) => IPrincipalVoiceBuilder;
	    type: (type: StartStop) => IPrincipalVoiceBuilder;
	    defaultX: (defaultX: number) => IPrincipalVoiceBuilder;
	    relativeY: (relativeY: number) => IPrincipalVoiceBuilder;
	    defaultY: (defaultY: number) => IPrincipalVoiceBuilder;
	    relativeX: (relativeX: number) => IPrincipalVoiceBuilder;
	}
	export function patchPrincipalVoice(base: PrincipalVoice): IPrincipalVoiceBuilder;
	export function buildPrincipalVoice(): IPrincipalVoiceBuilder;
	export interface IAccordionRegistrationBuilder {
	    build: () => AccordionRegistration;
	    patch: () => any[];
	    accordionMiddle: (accordionMiddle: string) => IAccordionRegistrationBuilder;
	    accordionHigh: (accordionHigh: boolean) => IAccordionRegistrationBuilder;
	    accordionLow: (accordionLow: boolean) => IAccordionRegistrationBuilder;
	    defaultX: (defaultX: number) => IAccordionRegistrationBuilder;
	    relativeY: (relativeY: number) => IAccordionRegistrationBuilder;
	    defaultY: (defaultY: number) => IAccordionRegistrationBuilder;
	    relativeX: (relativeX: number) => IAccordionRegistrationBuilder;
	}
	export function patchAccordionRegistration(base: AccordionRegistration): IAccordionRegistrationBuilder;
	export function buildAccordionRegistration(): IAccordionRegistrationBuilder;
	export interface IPercussionBuilder {
	    build: () => Percussion;
	    patch: () => any[];
	    stickLocation: (stickLocation: string) => IPercussionBuilder;
	    otherPercussion: (otherPercussion: string) => IPercussionBuilder;
	    wood: (wood: string) => IPercussionBuilder;
	    effect: (effect: string) => IPercussionBuilder;
	    glass: (glass: string) => IPercussionBuilder;
	    timpani: (build: (builder: ITimpaniBuilder) => ITimpaniBuilder) => IPercussionBuilder;
	    stick: (build: (builder: IStickBuilder) => IStickBuilder) => IPercussionBuilder;
	    metal: (metal: string) => IPercussionBuilder;
	    pitched: (pitched: string) => IPercussionBuilder;
	    membrane: (membrane: string) => IPercussionBuilder;
	    beater: (build: (builder: IBeaterBuilder) => IBeaterBuilder) => IPercussionBuilder;
	    defaultX: (defaultX: number) => IPercussionBuilder;
	    relativeY: (relativeY: number) => IPercussionBuilder;
	    defaultY: (defaultY: number) => IPercussionBuilder;
	    relativeX: (relativeX: number) => IPercussionBuilder;
	}
	export function patchPercussion(base: Percussion): IPercussionBuilder;
	export function buildPercussion(): IPercussionBuilder;
	export interface ITimpaniBuilder {
	    build: () => Timpani;
	    patch: () => any[];
	}
	export function patchTimpani(base: Timpani): ITimpaniBuilder;
	export function buildTimpani(): ITimpaniBuilder;
	export interface IBeaterBuilder {
	    build: () => Beater;
	    patch: () => any[];
	    data: (data: string) => IBeaterBuilder;
	    tip: (tip: TipDirection) => IBeaterBuilder;
	}
	export function patchBeater(base: Beater): IBeaterBuilder;
	export function buildBeater(): IBeaterBuilder;
	export interface IStickBuilder {
	    build: () => Stick;
	    patch: () => any[];
	    stickMaterial: (stickMaterial: string) => IStickBuilder;
	    stickType: (stickType: string) => IStickBuilder;
	    tip: (tip: TipDirection) => IStickBuilder;
	}
	export function patchStick(base: Stick): IStickBuilder;
	export function buildStick(): IStickBuilder;
	export interface IOffsetBuilder {
	    build: () => Offset;
	    patch: () => any[];
	    data: (data: string) => IOffsetBuilder;
	    sound: (sound: boolean) => IOffsetBuilder;
	}
	export function patchOffset(base: Offset): IOffsetBuilder;
	export function buildOffset(): IOffsetBuilder;
	export interface IHarmonyChordBuilder {
	    build: () => HarmonyChord;
	    patch: () => any[];
	    root: (build: (builder: IRootBuilder) => IRootBuilder) => IHarmonyChordBuilder;
	    function: (build: (builder: IFunctionBuilder) => IFunctionBuilder) => IHarmonyChordBuilder;
	    kind: (build: (builder: IKindBuilder) => IKindBuilder) => IHarmonyChordBuilder;
	    degrees: (degrees: Degree[]) => IHarmonyChordBuilder;
	    inversion: (build: (builder: IInversionBuilder) => IInversionBuilder) => IHarmonyChordBuilder;
	    bass: (build: (builder: IBassBuilder) => IBassBuilder) => IHarmonyChordBuilder;
	}
	export function patchHarmonyChord(base: HarmonyChord): IHarmonyChordBuilder;
	export function buildHarmonyChord(): IHarmonyChordBuilder;
	export interface IHarmonyBuilder {
	    build: () => Harmony;
	    patch: () => any[];
	    frame: (build: (builder: IFrameBuilder) => IFrameBuilder) => IHarmonyBuilder;
	    printFrame: (printFrame: boolean) => IHarmonyBuilder;
	    staff: (staff: number) => IHarmonyBuilder;
	    type: (type: ExplicitImpliedAlternate) => IHarmonyBuilder;
	    offset: (build: (builder: IOffsetBuilder) => IOffsetBuilder) => IHarmonyBuilder;
	    root: (build: (builder: IRootBuilder) => IRootBuilder) => IHarmonyBuilder;
	    function: (build: (builder: IFunctionBuilder) => IFunctionBuilder) => IHarmonyBuilder;
	    kind: (build: (builder: IKindBuilder) => IKindBuilder) => IHarmonyBuilder;
	    degrees: (degrees: Degree[]) => IHarmonyBuilder;
	    inversion: (build: (builder: IInversionBuilder) => IInversionBuilder) => IHarmonyBuilder;
	    bass: (build: (builder: IBassBuilder) => IBassBuilder) => IHarmonyBuilder;
	}
	export function patchHarmony(base: Harmony): IHarmonyBuilder;
	export function buildHarmony(): IHarmonyBuilder;
	export interface IRootBuilder {
	    build: () => Root;
	    patch: () => any[];
	    rootStep: (build: (builder: IRootStepBuilder) => IRootStepBuilder) => IRootBuilder;
	    rootAlter: (build: (builder: IRootAlterBuilder) => IRootAlterBuilder) => IRootBuilder;
	}
	export function patchRoot(base: Root): IRootBuilder;
	export function buildRoot(): IRootBuilder;
	export interface IRootStepBuilder {
	    build: () => RootStep;
	    patch: () => any[];
	    text: (text: string) => IRootStepBuilder;
	    data: (data: string) => IRootStepBuilder;
	    defaultX: (defaultX: number) => IRootStepBuilder;
	    relativeY: (relativeY: number) => IRootStepBuilder;
	    defaultY: (defaultY: number) => IRootStepBuilder;
	    relativeX: (relativeX: number) => IRootStepBuilder;
	}
	export function patchRootStep(base: RootStep): IRootStepBuilder;
	export function buildRootStep(): IRootStepBuilder;
	export interface IRootAlterBuilder {
	    build: () => RootAlter;
	    patch: () => any[];
	    location: (location: LeftRight) => IRootAlterBuilder;
	    data: (data: string) => IRootAlterBuilder;
	    printObject: (printObject: boolean) => IRootAlterBuilder;
	}
	export function patchRootAlter(base: RootAlter): IRootAlterBuilder;
	export function buildRootAlter(): IRootAlterBuilder;
	export interface IFunctionBuilder {
	    build: () => Function;
	    patch: () => any[];
	    data: (data: string) => IFunctionBuilder;
	    defaultX: (defaultX: number) => IFunctionBuilder;
	    relativeY: (relativeY: number) => IFunctionBuilder;
	    defaultY: (defaultY: number) => IFunctionBuilder;
	    relativeX: (relativeX: number) => IFunctionBuilder;
	}
	export function patchFunction(base: Function): IFunctionBuilder;
	export function buildFunction(): IFunctionBuilder;
	export interface IKindBuilder {
	    build: () => Kind;
	    patch: () => any[];
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
	}
	export function patchKind(base: Kind): IKindBuilder;
	export function buildKind(): IKindBuilder;
	export interface IInversionBuilder {
	    build: () => Inversion;
	    patch: () => any[];
	    data: (data: string) => IInversionBuilder;
	    defaultX: (defaultX: number) => IInversionBuilder;
	    relativeY: (relativeY: number) => IInversionBuilder;
	    defaultY: (defaultY: number) => IInversionBuilder;
	    relativeX: (relativeX: number) => IInversionBuilder;
	}
	export function patchInversion(base: Inversion): IInversionBuilder;
	export function buildInversion(): IInversionBuilder;
	export interface IBassBuilder {
	    build: () => Bass;
	    patch: () => any[];
	    bassStep: (build: (builder: IBassStepBuilder) => IBassStepBuilder) => IBassBuilder;
	    bassAlter: (build: (builder: IBassAlterBuilder) => IBassAlterBuilder) => IBassBuilder;
	}
	export function patchBass(base: Bass): IBassBuilder;
	export function buildBass(): IBassBuilder;
	export interface IBassStepBuilder {
	    build: () => BassStep;
	    patch: () => any[];
	    text: (text: string) => IBassStepBuilder;
	    data: (data: string) => IBassStepBuilder;
	    defaultX: (defaultX: number) => IBassStepBuilder;
	    relativeY: (relativeY: number) => IBassStepBuilder;
	    defaultY: (defaultY: number) => IBassStepBuilder;
	    relativeX: (relativeX: number) => IBassStepBuilder;
	}
	export function patchBassStep(base: BassStep): IBassStepBuilder;
	export function buildBassStep(): IBassStepBuilder;
	export interface IBassAlterBuilder {
	    build: () => BassAlter;
	    patch: () => any[];
	    location: (location: LeftRight) => IBassAlterBuilder;
	    data: (data: string) => IBassAlterBuilder;
	    printObject: (printObject: boolean) => IBassAlterBuilder;
	}
	export function patchBassAlter(base: BassAlter): IBassAlterBuilder;
	export function buildBassAlter(): IBassAlterBuilder;
	export interface IDegreeBuilder {
	    build: () => Degree;
	    patch: () => any[];
	    degreeAlter: (build: (builder: IDegreeAlterBuilder) => IDegreeAlterBuilder) => IDegreeBuilder;
	    degreeValue: (build: (builder: IDegreeValueBuilder) => IDegreeValueBuilder) => IDegreeBuilder;
	    degreeType: (build: (builder: IDegreeTypeBuilder) => IDegreeTypeBuilder) => IDegreeBuilder;
	    printObject: (printObject: boolean) => IDegreeBuilder;
	}
	export function patchDegree(base: Degree): IDegreeBuilder;
	export function buildDegree(): IDegreeBuilder;
	export interface IDegreeValueBuilder {
	    build: () => DegreeValue;
	    patch: () => any[];
	    symbol: (symbol: ChordType) => IDegreeValueBuilder;
	    text: (text: string) => IDegreeValueBuilder;
	    data: (data: string) => IDegreeValueBuilder;
	    defaultX: (defaultX: number) => IDegreeValueBuilder;
	    relativeY: (relativeY: number) => IDegreeValueBuilder;
	    defaultY: (defaultY: number) => IDegreeValueBuilder;
	    relativeX: (relativeX: number) => IDegreeValueBuilder;
	}
	export function patchDegreeValue(base: DegreeValue): IDegreeValueBuilder;
	export function buildDegreeValue(): IDegreeValueBuilder;
	export interface IDegreeAlterBuilder {
	    build: () => DegreeAlter;
	    patch: () => any[];
	    plusMinus: (plusMinus: boolean) => IDegreeAlterBuilder;
	    data: (data: string) => IDegreeAlterBuilder;
	    defaultX: (defaultX: number) => IDegreeAlterBuilder;
	    relativeY: (relativeY: number) => IDegreeAlterBuilder;
	    defaultY: (defaultY: number) => IDegreeAlterBuilder;
	    relativeX: (relativeX: number) => IDegreeAlterBuilder;
	}
	export function patchDegreeAlter(base: DegreeAlter): IDegreeAlterBuilder;
	export function buildDegreeAlter(): IDegreeAlterBuilder;
	export interface IDegreeTypeBuilder {
	    build: () => DegreeType;
	    patch: () => any[];
	    text: (text: string) => IDegreeTypeBuilder;
	    data: (data: string) => IDegreeTypeBuilder;
	    defaultX: (defaultX: number) => IDegreeTypeBuilder;
	    relativeY: (relativeY: number) => IDegreeTypeBuilder;
	    defaultY: (defaultY: number) => IDegreeTypeBuilder;
	    relativeX: (relativeX: number) => IDegreeTypeBuilder;
	}
	export function patchDegreeType(base: DegreeType): IDegreeTypeBuilder;
	export function buildDegreeType(): IDegreeTypeBuilder;
	export interface IFrameBuilder {
	    build: () => Frame;
	    patch: () => any[];
	    frameStrings: (frameStrings: string) => IFrameBuilder;
	    frameNotes: (frameNotes: FrameNote[]) => IFrameBuilder;
	    unplayed: (unplayed: string) => IFrameBuilder;
	    frameFrets: (frameFrets: string) => IFrameBuilder;
	    firstFret: (build: (builder: IFirstFretBuilder) => IFirstFretBuilder) => IFrameBuilder;
	    width: (width: number) => IFrameBuilder;
	    height: (height: number) => IFrameBuilder;
	    defaultX: (defaultX: number) => IFrameBuilder;
	    relativeY: (relativeY: number) => IFrameBuilder;
	    defaultY: (defaultY: number) => IFrameBuilder;
	    relativeX: (relativeX: number) => IFrameBuilder;
	}
	export function patchFrame(base: Frame): IFrameBuilder;
	export function buildFrame(): IFrameBuilder;
	export interface IFirstFretBuilder {
	    build: () => FirstFret;
	    patch: () => any[];
	    text: (text: string) => IFirstFretBuilder;
	    location: (location: LeftRight) => IFirstFretBuilder;
	    data: (data: string) => IFirstFretBuilder;
	}
	export function patchFirstFret(base: FirstFret): IFirstFretBuilder;
	export function buildFirstFret(): IFirstFretBuilder;
	export interface IFrameNoteBuilder {
	    build: () => FrameNote;
	    patch: () => any[];
	    barre: (build: (builder: IBarreBuilder) => IBarreBuilder) => IFrameNoteBuilder;
	    string: (build: (builder: IStringBuilder) => IStringBuilder) => IFrameNoteBuilder;
	    fingering: (build: (builder: IFingeringBuilder) => IFingeringBuilder) => IFrameNoteBuilder;
	    fret: (build: (builder: IFretBuilder) => IFretBuilder) => IFrameNoteBuilder;
	}
	export function patchFrameNote(base: FrameNote): IFrameNoteBuilder;
	export function buildFrameNote(): IFrameNoteBuilder;
	export interface IBarreBuilder {
	    build: () => Barre;
	    patch: () => any[];
	    type: (type: StartStop) => IBarreBuilder;
	    color: (color: string) => IBarreBuilder;
	}
	export function patchBarre(base: Barre): IBarreBuilder;
	export function buildBarre(): IBarreBuilder;
	export interface IGroupingBuilder {
	    build: () => Grouping;
	    patch: () => any[];
	    features: (features: Feature[]) => IGroupingBuilder;
	    number: (number: number) => IGroupingBuilder;
	    type: (type: StartStopSingle) => IGroupingBuilder;
	    memberOf: (memberOf: string) => IGroupingBuilder;
	    _class: (_class: string) => IGroupingBuilder;
	}
	export function patchGrouping(base: Grouping): IGroupingBuilder;
	export function buildGrouping(): IGroupingBuilder;
	export interface IFeatureBuilder {
	    build: () => Feature;
	    patch: () => any[];
	    data: (data: string) => IFeatureBuilder;
	    type: (type: string) => IFeatureBuilder;
	}
	export function patchFeature(base: Feature): IFeatureBuilder;
	export function buildFeature(): IFeatureBuilder;
	export interface IPrintBuilder {
	    build: () => Print;
	    patch: () => any[];
	    measureNumbering: (build: (builder: IMeasureNumberingBuilder) => IMeasureNumberingBuilder) => IPrintBuilder;
	    partNameDisplay: (build: (builder: IPartNameDisplayBuilder) => IPartNameDisplayBuilder) => IPrintBuilder;
	    newSystem: (newSystem: boolean) => IPrintBuilder;
	    newPage: (newPage: boolean) => IPrintBuilder;
	    blankPage: (blankPage: string) => IPrintBuilder;
	    measureLayout: (build: (builder: IMeasureLayoutBuilder) => IMeasureLayoutBuilder) => IPrintBuilder;
	    partAbbreviationDisplay: (build: (builder: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder) => IPrintBuilder;
	    pageLayout: (build: (builder: IPageLayoutBuilder) => IPageLayoutBuilder) => IPrintBuilder;
	    systemLayout: (build: (builder: ISystemLayoutBuilder) => ISystemLayoutBuilder) => IPrintBuilder;
	    staffSpacing: (staffSpacing: number) => IPrintBuilder;
	    staffLayouts: (staffLayouts: StaffLayout[]) => IPrintBuilder;
	    pageNumber: (pageNumber: string) => IPrintBuilder;
	    _class: (_class: string) => IPrintBuilder;
	}
	export function patchPrint(base: Print): IPrintBuilder;
	export function buildPrint(): IPrintBuilder;
	export interface IMeasureNumberingBuilder {
	    build: () => MeasureNumbering;
	    patch: () => any[];
	    data: (data: string) => IMeasureNumberingBuilder;
	    defaultX: (defaultX: number) => IMeasureNumberingBuilder;
	    relativeY: (relativeY: number) => IMeasureNumberingBuilder;
	    defaultY: (defaultY: number) => IMeasureNumberingBuilder;
	    relativeX: (relativeX: number) => IMeasureNumberingBuilder;
	}
	export function patchMeasureNumbering(base: MeasureNumbering): IMeasureNumberingBuilder;
	export function buildMeasureNumbering(): IMeasureNumberingBuilder;
	export interface ISoundBuilder {
	    build: () => Sound;
	    patch: () => any[];
	    softPedal: (softPedal: string) => ISoundBuilder;
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
	    plays: (plays: Play[]) => ISoundBuilder;
	    offset: (build: (builder: IOffsetBuilder) => IOffsetBuilder) => ISoundBuilder;
	    sostenutoPedal: (sostenutoPedal: string) => ISoundBuilder;
	    dalsegno: (dalsegno: string) => ISoundBuilder;
	    midiDevices: (midiDevices: MidiDevice[]) => ISoundBuilder;
	    tempo: (tempo: string) => ISoundBuilder;
	    forwardRepeat: (forwardRepeat: boolean) => ISoundBuilder;
	    _class: (_class: string) => ISoundBuilder;
	    timeOnly: (timeOnly: string) => ISoundBuilder;
	}
	export function patchSound(base: Sound): ISoundBuilder;
	export function buildSound(): ISoundBuilder;
	export interface IWorkBuilder {
	    build: () => Work;
	    patch: () => any[];
	    workNumber: (workNumber: string) => IWorkBuilder;
	    workTitle: (workTitle: string) => IWorkBuilder;
	    opus: (build: (builder: IOpusBuilder) => IOpusBuilder) => IWorkBuilder;
	}
	export function patchWork(base: Work): IWorkBuilder;
	export function buildWork(): IWorkBuilder;
	export interface IOpusBuilder {
	    build: () => Opus;
	    patch: () => any[];
	}
	export function patchOpus(base: Opus): IOpusBuilder;
	export function buildOpus(): IOpusBuilder;
	export interface IDefaultsBuilder {
	    build: () => Defaults;
	    patch: () => any[];
	    wordFont: (build: (builder: IWordFontBuilder) => IWordFontBuilder) => IDefaultsBuilder;
	    lyricLanguages: (lyricLanguages: LyricLanguage[]) => IDefaultsBuilder;
	    lyricFonts: (lyricFonts: LyricFont[]) => IDefaultsBuilder;
	    pageLayout: (build: (builder: IPageLayoutBuilder) => IPageLayoutBuilder) => IDefaultsBuilder;
	    systemLayout: (build: (builder: ISystemLayoutBuilder) => ISystemLayoutBuilder) => IDefaultsBuilder;
	    appearance: (build: (builder: IAppearanceBuilder) => IAppearanceBuilder) => IDefaultsBuilder;
	    scaling: (build: (builder: IScalingBuilder) => IScalingBuilder) => IDefaultsBuilder;
	    staffLayouts: (staffLayouts: StaffLayout[]) => IDefaultsBuilder;
	    musicFont: (build: (builder: IMusicFontBuilder) => IMusicFontBuilder) => IDefaultsBuilder;
	}
	export function patchDefaults(base: Defaults): IDefaultsBuilder;
	export function buildDefaults(): IDefaultsBuilder;
	export interface IMusicFontBuilder {
	    build: () => MusicFont;
	    patch: () => any[];
	    fontFamily: (fontFamily: string) => IMusicFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IMusicFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IMusicFontBuilder;
	    fontSize: (fontSize: string) => IMusicFontBuilder;
	}
	export function patchMusicFont(base: MusicFont): IMusicFontBuilder;
	export function buildMusicFont(): IMusicFontBuilder;
	export interface IWordFontBuilder {
	    build: () => WordFont;
	    patch: () => any[];
	    fontFamily: (fontFamily: string) => IWordFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => IWordFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => IWordFontBuilder;
	    fontSize: (fontSize: string) => IWordFontBuilder;
	}
	export function patchWordFont(base: WordFont): IWordFontBuilder;
	export function buildWordFont(): IWordFontBuilder;
	export interface ILyricFontBuilder {
	    build: () => LyricFont;
	    patch: () => any[];
	    number: (number: number) => ILyricFontBuilder;
	    name: (name: string) => ILyricFontBuilder;
	    fontFamily: (fontFamily: string) => ILyricFontBuilder;
	    fontWeight: (fontWeight: NormalBold) => ILyricFontBuilder;
	    fontStyle: (fontStyle: NormalItalic) => ILyricFontBuilder;
	    fontSize: (fontSize: string) => ILyricFontBuilder;
	}
	export function patchLyricFont(base: LyricFont): ILyricFontBuilder;
	export function buildLyricFont(): ILyricFontBuilder;
	export interface ILyricLanguageBuilder {
	    build: () => LyricLanguage;
	    patch: () => any[];
	    number: (number: number) => ILyricLanguageBuilder;
	    name: (name: string) => ILyricLanguageBuilder;
	}
	export function patchLyricLanguage(base: LyricLanguage): ILyricLanguageBuilder;
	export function buildLyricLanguage(): ILyricLanguageBuilder;
	export interface ICreditBuilder {
	    build: () => Credit;
	    patch: () => any[];
	    creditTypes: (creditTypes: string[]) => ICreditBuilder;
	    creditWords: (creditWords: CreditWords[]) => ICreditBuilder;
	    creditImage: (build: (builder: ICreditImageBuilder) => ICreditImageBuilder) => ICreditBuilder;
	    page: (page: number) => ICreditBuilder;
	}
	export function patchCredit(base: Credit): ICreditBuilder;
	export function buildCredit(): ICreditBuilder;
	export interface ICreditWordsBuilder {
	    build: () => CreditWords;
	    patch: () => any[];
	    words: (words: string) => ICreditWordsBuilder;
	    justify: (justify: LeftCenterRight) => ICreditWordsBuilder;
	}
	export function patchCreditWords(base: CreditWords): ICreditWordsBuilder;
	export function buildCreditWords(): ICreditWordsBuilder;
	export interface ICreditImageBuilder {
	    build: () => CreditImage;
	    patch: () => any[];
	    type: (type: string) => ICreditImageBuilder;
	    source: (source: string) => ICreditImageBuilder;
	    defaultX: (defaultX: number) => ICreditImageBuilder;
	    relativeY: (relativeY: number) => ICreditImageBuilder;
	    defaultY: (defaultY: number) => ICreditImageBuilder;
	    relativeX: (relativeX: number) => ICreditImageBuilder;
	}
	export function patchCreditImage(base: CreditImage): ICreditImageBuilder;
	export function buildCreditImage(): ICreditImageBuilder;
	export interface IScorePartBuilder {
	    build: () => ScorePart;
	    patch: () => any[];
	    identification: (build: (builder: IIdentificationBuilder) => IIdentificationBuilder) => IScorePartBuilder;
	    partNameDisplay: (build: (builder: IPartNameDisplayBuilder) => IPartNameDisplayBuilder) => IScorePartBuilder;
	    scoreInstruments: (scoreInstruments: ScoreInstrument[]) => IScorePartBuilder;
	    midiDevices: (midiDevices: MidiDevice[]) => IScorePartBuilder;
	    partName: (build: (builder: IPartNameBuilder) => IPartNameBuilder) => IScorePartBuilder;
	    partAbbreviationDisplay: (build: (builder: IPartAbbreviationDisplayBuilder) => IPartAbbreviationDisplayBuilder) => IScorePartBuilder;
	    partAbbreviation: (build: (builder: IPartAbbreviationBuilder) => IPartAbbreviationBuilder) => IScorePartBuilder;
	    groups: (groups: string[]) => IScorePartBuilder;
	    midiInstruments: (midiInstruments: MidiInstrument[]) => IScorePartBuilder;
	    id: (id: string) => IScorePartBuilder;
	    _class: (_class: string) => IScorePartBuilder;
	}
	export function patchScorePart(base: ScorePart): IScorePartBuilder;
	export function buildScorePart(): IScorePartBuilder;
	export interface IPartNameBuilder {
	    build: () => PartName;
	    patch: () => any[];
	    partName: (partName: string) => IPartNameBuilder;
	    defaultX: (defaultX: number) => IPartNameBuilder;
	    relativeY: (relativeY: number) => IPartNameBuilder;
	    defaultY: (defaultY: number) => IPartNameBuilder;
	    relativeX: (relativeX: number) => IPartNameBuilder;
	}
	export function patchPartName(base: PartName): IPartNameBuilder;
	export function buildPartName(): IPartNameBuilder;
	export interface IPartAbbreviationBuilder {
	    build: () => PartAbbreviation;
	    patch: () => any[];
	    abbreviation: (abbreviation: string) => IPartAbbreviationBuilder;
	    defaultX: (defaultX: number) => IPartAbbreviationBuilder;
	    relativeY: (relativeY: number) => IPartAbbreviationBuilder;
	    defaultY: (defaultY: number) => IPartAbbreviationBuilder;
	    relativeX: (relativeX: number) => IPartAbbreviationBuilder;
	}
	export function patchPartAbbreviation(base: PartAbbreviation): IPartAbbreviationBuilder;
	export function buildPartAbbreviation(): IPartAbbreviationBuilder;
	export interface IPartGroupBuilder {
	    build: () => PartGroup;
	    patch: () => any[];
	    groupNameDisplay: (build: (builder: IGroupNameDisplayBuilder) => IGroupNameDisplayBuilder) => IPartGroupBuilder;
	    groupSymbol: (build: (builder: IGroupSymbolBuilder) => IGroupSymbolBuilder) => IPartGroupBuilder;
	    groupName: (build: (builder: IGroupNameBuilder) => IGroupNameBuilder) => IPartGroupBuilder;
	    groupAbbreviationDisplay: (build: (builder: IGroupAbbreviationDisplayBuilder) => IGroupAbbreviationDisplayBuilder) => IPartGroupBuilder;
	    groupBarline: (build: (builder: IGroupBarlineBuilder) => IGroupBarlineBuilder) => IPartGroupBuilder;
	    number: (number: number) => IPartGroupBuilder;
	    groupAbbreviation: (build: (builder: IGroupAbbreviationBuilder) => IGroupAbbreviationBuilder) => IPartGroupBuilder;
	    type: (type: StartStop) => IPartGroupBuilder;
	    groupTime: (build: (builder: IGroupTimeBuilder) => IGroupTimeBuilder) => IPartGroupBuilder;
	    _class: (_class: string) => IPartGroupBuilder;
	    footnote: (build: (builder: IFootnoteBuilder) => IFootnoteBuilder) => IPartGroupBuilder;
	    level: (build: (builder: ILevelBuilder) => ILevelBuilder) => IPartGroupBuilder;
	}
	export function patchPartGroup(base: PartGroup): IPartGroupBuilder;
	export function buildPartGroup(): IPartGroupBuilder;
	export interface IGroupNameBuilder {
	    build: () => GroupName;
	    patch: () => any[];
	    name: (name: string) => IGroupNameBuilder;
	    defaultX: (defaultX: number) => IGroupNameBuilder;
	    relativeY: (relativeY: number) => IGroupNameBuilder;
	    defaultY: (defaultY: number) => IGroupNameBuilder;
	    relativeX: (relativeX: number) => IGroupNameBuilder;
	}
	export function patchGroupName(base: GroupName): IGroupNameBuilder;
	export function buildGroupName(): IGroupNameBuilder;
	export interface IGroupNameDisplayBuilder {
	    build: () => GroupNameDisplay;
	    patch: () => any[];
	    name: (build: (builder: ITextArrayBuilder) => ITextArrayBuilder) => IGroupNameDisplayBuilder;
	    printObject: (printObject: boolean) => IGroupNameDisplayBuilder;
	}
	export function patchGroupNameDisplay(base: GroupNameDisplay): IGroupNameDisplayBuilder;
	export function buildGroupNameDisplay(): IGroupNameDisplayBuilder;
	export interface IGroupAbbreviationBuilder {
	    build: () => GroupAbbreviation;
	    patch: () => any[];
	    text: (text: string) => IGroupAbbreviationBuilder;
	    defaultX: (defaultX: number) => IGroupAbbreviationBuilder;
	    relativeY: (relativeY: number) => IGroupAbbreviationBuilder;
	    defaultY: (defaultY: number) => IGroupAbbreviationBuilder;
	    relativeX: (relativeX: number) => IGroupAbbreviationBuilder;
	}
	export function patchGroupAbbreviation(base: GroupAbbreviation): IGroupAbbreviationBuilder;
	export function buildGroupAbbreviation(): IGroupAbbreviationBuilder;
	export interface IGroupAbbreviationDisplayBuilder {
	    build: () => GroupAbbreviationDisplay;
	    patch: () => any[];
	    name: (build: (builder: ITextArrayBuilder) => ITextArrayBuilder) => IGroupAbbreviationDisplayBuilder;
	    printObject: (printObject: boolean) => IGroupAbbreviationDisplayBuilder;
	}
	export function patchGroupAbbreviationDisplay(base: GroupAbbreviationDisplay): IGroupAbbreviationDisplayBuilder;
	export function buildGroupAbbreviationDisplay(): IGroupAbbreviationDisplayBuilder;
	export interface IGroupSymbolBuilder {
	    build: () => GroupSymbol;
	    patch: () => any[];
	    data: (data: PartSymbolType) => IGroupSymbolBuilder;
	    defaultX: (defaultX: number) => IGroupSymbolBuilder;
	    relativeY: (relativeY: number) => IGroupSymbolBuilder;
	    defaultY: (defaultY: number) => IGroupSymbolBuilder;
	    relativeX: (relativeX: number) => IGroupSymbolBuilder;
	}
	export function patchGroupSymbol(base: GroupSymbol): IGroupSymbolBuilder;
	export function buildGroupSymbol(): IGroupSymbolBuilder;
	export interface IGroupBarlineBuilder {
	    build: () => GroupBarline;
	    patch: () => any[];
	    data: (data: string) => IGroupBarlineBuilder;
	    color: (color: string) => IGroupBarlineBuilder;
	}
	export function patchGroupBarline(base: GroupBarline): IGroupBarlineBuilder;
	export function buildGroupBarline(): IGroupBarlineBuilder;
	export interface IGroupTimeBuilder {
	    build: () => GroupTime;
	    patch: () => any[];
	}
	export function patchGroupTime(base: GroupTime): IGroupTimeBuilder;
	export function buildGroupTime(): IGroupTimeBuilder;
	export interface IScoreInstrumentBuilder {
	    build: () => ScoreInstrument;
	    patch: () => any[];
	    instrumentName: (instrumentName: string) => IScoreInstrumentBuilder;
	    instrumentSound: (instrumentSound: string) => IScoreInstrumentBuilder;
	    ensemble: (ensemble: string) => IScoreInstrumentBuilder;
	    virtualInstrument: (build: (builder: IVirtualInstrumentBuilder) => IVirtualInstrumentBuilder) => IScoreInstrumentBuilder;
	    instrumentAbbreviation: (instrumentAbbreviation: string) => IScoreInstrumentBuilder;
	    solo: (build: (builder: ISoloBuilder) => ISoloBuilder) => IScoreInstrumentBuilder;
	    id: (id: string) => IScoreInstrumentBuilder;
	}
	export function patchScoreInstrument(base: ScoreInstrument): IScoreInstrumentBuilder;
	export function buildScoreInstrument(): IScoreInstrumentBuilder;
	export interface ISoloBuilder {
	    build: () => Solo;
	    patch: () => any[];
	}
	export function patchSolo(base: Solo): ISoloBuilder;
	export function buildSolo(): ISoloBuilder;
	export interface IVirtualInstrumentBuilder {
	    build: () => VirtualInstrument;
	    patch: () => any[];
	    virtualLibrary: (virtualLibrary: string) => IVirtualInstrumentBuilder;
	    virtualName: (virtualName: string) => IVirtualInstrumentBuilder;
	}
	export function patchVirtualInstrument(base: VirtualInstrument): IVirtualInstrumentBuilder;
	export function buildVirtualInstrument(): IVirtualInstrumentBuilder;
	export interface IScoreHeaderBuilder {
	    build: () => ScoreHeader;
	    patch: () => any[];
	    movementTitle: (movementTitle: string) => IScoreHeaderBuilder;
	    identification: (build: (builder: IIdentificationBuilder) => IIdentificationBuilder) => IScoreHeaderBuilder;
	    defaults: (build: (builder: IDefaultsBuilder) => IDefaultsBuilder) => IScoreHeaderBuilder;
	    work: (build: (builder: IWorkBuilder) => IWorkBuilder) => IScoreHeaderBuilder;
	    credits: (credits: Credit[]) => IScoreHeaderBuilder;
	    partList: (partList: PartList) => IScoreHeaderBuilder;
	    movementNumber: (movementNumber: string) => IScoreHeaderBuilder;
	}
	export function patchScoreHeader(base: ScoreHeader): IScoreHeaderBuilder;
	export function buildScoreHeader(): IScoreHeaderBuilder;
	export interface IScoreTimewiseBuilder {
	    build: () => ScoreTimewise;
	    patch: () => any[];
	    measures: (measures: Measure[]) => IScoreTimewiseBuilder;
	    version: (version: string) => IScoreTimewiseBuilder;
	}
	export function patchScoreTimewise(base: ScoreTimewise): IScoreTimewiseBuilder;
	export function buildScoreTimewise(): IScoreTimewiseBuilder;
	export interface IMeasureBuilder {
	    build: () => Measure;
	    patch: () => any[];
	    number: (number: string) => IMeasureBuilder;
	    implicit: (implicit: boolean) => IMeasureBuilder;
	    width: (width: number) => IMeasureBuilder;
	    set: (key: string, val: boolean[]) => IMeasureBuilder;
	    nonControlling: (nonControlling: boolean) => IMeasureBuilder;
	}
	export function patchMeasure(base: Measure): IMeasureBuilder;
	export function buildMeasure(): IMeasureBuilder;

}
declare module 'musicxml-interfaces' {
	import main = require('musicxml-interfaces/musicxml-interfaces');
	export = main;
}
