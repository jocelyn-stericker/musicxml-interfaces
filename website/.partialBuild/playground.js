var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./ajax");
var Bootstrap = require("react-bootstrap");
var MusicXML = require("musicxml-interfaces");
var React = require("react");
var TypedReact = require("typed-react");
global.MusicXML = MusicXML;
var Playground = (function (_super) {
    __extends(Playground, _super);
    function Playground() {
        _super.apply(this, arguments);
    }
    Playground.prototype.render = function () {
        return React.createElement("div", { className: "pageContent" }, React.createElement(Bootstrap.Panel, { header: this.renderHeader() }, this.state.error, this.renderEditor()));
    };
    Playground.prototype.getInitialState = function () {
        return {
            test: "01a"
        };
    };
    Playground.prototype.handleSelectChanged = function () {
        this.setState({
            test: this.refs["select"].getDOMNode().value
        });
    };
    Playground.prototype.componentDidMount = function () {
        this.fetchSong();
    };
    Playground.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.test !== prevState.test) {
            this.fetchSong();
        }
    };
    Playground.prototype.fetchSong = function () {
        var _this = this;
        this.setState({ testSRC: "Loading..." });
        ajax.getText("tests/" + this.state.test + ".xml", function (str) {
            _this.syncJSON(str);
        });
    };
    Playground.prototype.renderHeader = function () {
        return React.createElement("div", null, React.createElement("span", { style: { fontFamily: "Alegreya" } }, 
            "Modify the code and see changes in realtime."
            ), React.createElement("select", { ref: "select", value: this.state.test, style: { float: "right" }, onChange: this.handleSelectChanged }, React.createElement("option", { value: "01a" }, "Lily 01a: Pitches/Pitches"), React.createElement("option", { value: "01b" }, "Lily 01b: Pitches/Intervals"), React.createElement("option", { value: "01c" }, "Lily 01c: Pitches/NoVoice"), React.createElement("option", { value: "01d" }, "Lily 01d: Pitches/Microtones"), React.createElement("option", { value: "01e" }, "Lily 01e: Pitches/ParenAcc"), React.createElement("option", { value: "01f" }, "Lily 01f: Pitches/ParenMicroAcc"), React.createElement("option", { value: "02a" }, "Lily 02a: Rests/Durations"), React.createElement("option", { value: "02b" }, "Lily 02b: Rests/PitchedRests"), React.createElement("option", { value: "02c" }, "Lily 02c: Rests/MultiMeasure"), React.createElement("option", { value: "02d" }, "Lily 02d: Rests/MultiMeasureTS"), React.createElement("option", { value: "02e" }, "Lily 02e: Rests/NoType"), React.createElement("option", { value: "03a" }, "Lily 03a: Rhythm/Durations"), React.createElement("option", { value: "03b" }, "Lily 03b: Rhythm/Backup"), React.createElement("option", { value: "03c" }, "Lily 03c: Rhythm/DivisionChange"), React.createElement("option", { value: "03d" }, "Lily 03d: Rhythm/Factors"), React.createElement("option", { value: "11a" }, "Lily 11a: TimeSignatures"), React.createElement("option", { value: "11b" }, "Lily 11b: TS/NoTime"), React.createElement("option", { value: "11c" }, "Lily 11c: TS/CompoundTime"), React.createElement("option", { value: "11d" }, "Lily 11d: TS/CompoundMulti"), React.createElement("option", { value: "11e" }, "Lily 11e: TS/CompoundMixed"), React.createElement("option", { value: "11f" }, "Lily 11f: TS/SymbolMeaning"), React.createElement("option", { value: "11g" }, "Lily 11g: TS/SenzaMisura"), React.createElement("option", { value: "12a" }, "Lily 12a: Clefs"), React.createElement("option", { value: "12b" }, "Lily 12b: Clefs/NoKeyOrClef"), React.createElement("option", { value: "13a" }, "Lily 13a: KeySignatures"), React.createElement("option", { value: "13b" }, "Lily 13b: KS/ChurchModes"), React.createElement("option", { value: "13c" }, "Lily 13c: KS/NonTraditional"), React.createElement("option", { value: "13d" }, "Lily 13d: KS/Microtones"), React.createElement("option", { value: "14a" }, "Lily 14a: StaffDetails/LineChanges"), React.createElement("option", { value: "21a" }, "Lily 21a: Chords/Basic"), React.createElement("option", { value: "21b" }, "Lily 21b: Chords/TwoNotes"), React.createElement("option", { value: "21b" }, "Lily 21c: Chords/ThreeNotesDuration"), React.createElement("option", { value: "21d" }, "Lily 21d: Chords/Schubert"), React.createElement("option", { value: "21e" }, "Lily 21e: Chords/PickupMeasures"), React.createElement("option", { value: "21f" }, "Lily 21f: Chords/ElementInBetween"), React.createElement("option", { value: "22a" }, "Lily 22a: Noteheads"), React.createElement("option", { value: "22b" }, "Lily 22b: Staff/Notestyles"), React.createElement("option", { value: "22c" }, "Lily 22c: Noteheads/Chords"), React.createElement("option", { value: "22d" }, "Lily 22d: Noteheads/Parenthesized"), React.createElement("option", { value: "23a" }, "Lily 23a: Tuplets"), React.createElement("option", { value: "23b" }, "Lily 23b: Tuplets/Styles"), React.createElement("option", { value: "23c" }, "Lily 23c: Tuplets/NonStandard"), React.createElement("option", { value: "23d" }, "Lily 23d: Tuplets/Nested"), React.createElement("option", { value: "23e" }, "Lily 23e: Tuplets/Tremelo"), React.createElement("option", { value: "23f" }, "Lily 23f: Tuplets/DurationNoBracket"), React.createElement("option", { value: "24a" }, "Lily 24a: GraceNotes"), React.createElement("option", { value: "24b" }, "Lily 24b: ChordAsGraceNote"), React.createElement("option", { value: "24c" }, "Lily 24c: GraceNote/MeasureEnd"), React.createElement("option", { value: "24d" }, "Lily 24d: AfterGrace"), React.createElement("option", { value: "24e" }, "Lily 24e: GraceNote/StaffChange"), React.createElement("option", { value: "24f" }, "Lily 24f: GraceNote/Slur"), React.createElement("option", { value: "31a" }, "Lily 31a: Directions"), React.createElement("option", { value: "31c" }, "Lily 31c: MetronomeMarks"), React.createElement("option", { value: "32a" }, "Lily 32a: Notations"), React.createElement("option", { value: "32b" }, "Lily 32b: Articulations/Texts"), React.createElement("option", { value: "32c" }, "Lily 32c: MultipleNotationChildren"), React.createElement("option", { value: "32d" }, "Lily 32d: Arpeggio"), React.createElement("option", { value: "33a" }, "Lily 33a: Spanners"), React.createElement("option", { value: "33b" }, "Lily 33b: Spanners/Tie"), React.createElement("option", { value: "33c" }, "Lily 33c: Spanners/Slurs"), React.createElement("option", { value: "33d" }, "Lily 33d: Spanners/OctaveShifts"), React.createElement("option", { value: "33e" }, "Lily 33e: Spanners/OS/InvalidSize"), React.createElement("option", { value: "33f" }, "Lily 33f: Trill/EndingOnGraceNote"), React.createElement("option", { value: "33g" }, "Lily 33g: Slur/ChordedNotes"), React.createElement("option", { value: "33h" }, "Lily 33h: Spanners/Glissando"), React.createElement("option", { value: "33i" }, "Lily 33i: Ties/NotEnded"), React.createElement("option", { value: "4ia" }, "Lily 41a: MultiParts/PartOrder"), React.createElement("option", { value: "41b" }, "Lily 41b: MultiParts/MoreThan10"), React.createElement("option", { value: "41c" }, "Lily 41c: StaffGroups"), React.createElement("option", { value: "41d" }, "Lily 41d: StaffGroups/Nested"), React.createElement("option", { value: "41e" }, "Lily 41e: StaffGroups/NamesNewline"), React.createElement("option", { value: "41f" }, "Lily 41f: StaffGroups/Overlapping"), React.createElement("option", { value: "41g" }, "Lily 41g: StaffGroups/PartNoId"), React.createElement("option", { value: "41h" }, "Lily 41h: StaffGroups/TooManyParts"), React.createElement("option", { value: "41i" }, "Lily 41i: StaffGroups/Override"), React.createElement("option", { value: "42a" }, "Lily 42a: MultiVoice/2Voices/Lyrics"), React.createElement("option", { value: "42b" }, "Lily 42b: MultiVoice/MidMesaureClef"), React.createElement("option", { value: "43a" }, "Lily 43a: PianoStaff"), React.createElement("option", { value: "43b" }, "Lily 43b: MultiStaff/DifferentKeys"), React.createElement("option", { value: "43c" }, "Lily 43c: MultiStaff/KeysAfterBackup"), React.createElement("option", { value: "43d" }, "Lily 43d: MultiStaff/StaffChange"), React.createElement("option", { value: "43e" }, "Lily 43e: MultiStaff/ClefDynamics"), React.createElement("option", { value: "45a" }, "Lily 45a: SimpleRepeat"), React.createElement("option", { value: "45b" }, "Lily 45b: Repeats/WithAlternatives"), React.createElement("option", { value: "45c" }, "Lily 45c: Repeats/MultipleTimes"), React.createElement("option", { value: "45d" }, "Lily 45d: Repeats/NestedAlts"), React.createElement("option", { value: "45e" }, "Lily 45e: Repeats/NestedAlts2"), React.createElement("option", { value: "45f" }, "Lily 45f: Repeats/InvalidEndings"), React.createElement("option", { value: "45g" }, "Lily 45g: Repeats/NotEnded"), React.createElement("option", { value: "46a" }, "Lily 46a: Barlines"), React.createElement("option", { value: "46b" }, "Lily 46b: MidmeasureBarlines"), React.createElement("option", { value: "46c" }, "Lily 46b: MidmeasureClef"), React.createElement("option", { value: "46d" }, "Lily 46d: Pickup/ImplicitMeasures"), React.createElement("option", { value: "46e" }, "Lily 46e: Pickup/LateSecondVoice"), React.createElement("option", { value: "46f" }, "Lily 46f: IncompleteMeasures"), React.createElement("option", { value: "46a" }, "Lily 46g: Chordnames/FiguredBass"), React.createElement("option", { value: "51b" }, "Lily 51b: Header/Quotes"), React.createElement("option", { value: "51c" }, "Lily 51c: MultipleRights"), React.createElement("option", { value: "51d" }, "Lily 51d: EmptyTitle"), React.createElement("option", { value: "52a" }, "Lily 52a: PageLayout"), React.createElement("option", { value: "52b" }, "Lily 52b: Breaks"), React.createElement("option", { value: "61a" }, "Lily 61a: Lyrics"), React.createElement("option", { value: "61b" }, "Lily 61b: MultipleLyrics"), React.createElement("option", { value: "61c" }, "Lily 61c: Lyrics/Pianostaff"), React.createElement("option", { value: "61d" }, "Lily 61d: Lyrics/Melisma"), React.createElement("option", { value: "61e" }, "Lily 61e: Lyrics/Chord"), React.createElement("option", { value: "61f" }, "Lily 61f: Lyrics/GraceNotes"), React.createElement("option", { value: "61g" }, "Lily 61g: Lyrics/NameNumber"), React.createElement("option", { value: "61h" }, "Lily 61h: Lyrics/BeamsMelismata"), React.createElement("option", { value: "61i" }, "Lily 61i: Lyrics/Chords"), React.createElement("option", { value: "61j" }, "Lily 61j: Lyrics/Elisions"), React.createElement("option", { value: "61k" }, "Lily 61k: Lyrics/SpannersExtenders"), React.createElement("option", { value: "71a" }, "Lily 71a: Chordnames"), React.createElement("option", { value: "71c" }, "Lily 71c: ChordFrets"), React.createElement("option", { value: "71d" }, "Lily 71d: ChordFrets/Multistaff"), React.createElement("option", { value: "71e" }, "Lily 71e: TabStaves"), React.createElement("option", { value: "71f" }, "Lily 71f: AllChordTypes"), React.createElement("option", { value: "71g" }, "Lily 71g: MultipleChordNames"), React.createElement("option", { value: "72a" }, "Lily 72a: TransposingInst"), React.createElement("option", { value: "72b" }, "Lily 72b: TransposingInst/Full"), React.createElement("option", { value: "72c" }, "Lily 72c: TransposingInst/Change"), React.createElement("option", { value: "73a" }, "Lily 73a: Percussion"), React.createElement("option", { value: "74a" }, "Lily 74a: FiguredBass"), React.createElement("option", { value: "75a" }, "Lily 75a: AccordionRegistrations"), React.createElement("option", { value: "90a" }, "Lily 90a: CompressedMusicXML"), React.createElement("option", { value: "99a" }, "Lily 99a: Sibelius5/IgnoreBeaming"), React.createElement("option", { value: "99b" }, "Lily 99b: Sibelius5/BeamsMelismata")));
    };
    Playground.prototype.renderEditor = function () {
        return React.createElement("div", null, React.createElement("textarea", { style: { width: "49%", height: 400 }, value: this.state.testSRC, onChange: this.handleChange }), React.createElement("textarea", { style: { width: "49%", height: 400, background: "#f5f5f5" }, readOnly: true, value: JSON.stringify(this.state.score, null, 2) }));
    };
    Playground.prototype.handleChange = function (ev) {
        var str = ev.currentTarget.value;
        this.syncJSON(str);
    };
    Playground.prototype.syncJSON = function (str) {
        var error;
        var score;
        try {
            score = MusicXML.parseXML(str);
            global.score = score;
        }
        catch (err) {
            error = err.toString;
        }
        this.setState({
            testSRC: str,
            error: error,
            score: score
        });
    };
    return Playground;
})(TypedReact.Component);
var Playground;
(function (Playground) {
    Playground.Component = TypedReact.createClass(Playground);
})(Playground || (Playground = {}));
module.exports = Playground;
