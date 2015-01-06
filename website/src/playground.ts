/** 
 * Copyright (C) 2015 Josh Netterfield
 * Part of the ripieno-musicxml project, a MusicXML to SVG converter.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* tslint:disable */

/// <reference path="../../typescript/dist/musicxml-interfaces.d.ts"/>

import ajax         = require("./ajax");

import Bootstrap    = require("react-bootstrap");
import MusicXML     = require("musicxml-interfaces");
import React        = require("react");
import TypedReact   = require("typed-react");

global.MusicXML = MusicXML; // Debugging.

class Playground extends TypedReact.Component<Playground.IProps, IState> {
    render(): any {
        return <!div className="pageContent">
            <!Bootstrap.Panel header={this.renderHeader()}>
                {this.state.error}
                {this.renderEditor()}
            </Bootstrap.Panel>
        </div>;
    }

    getInitialState(): IState {
        return {
            test: "01a"
        };
    }

    handleSelectChanged() {
        this.setState({
            test: (<any>this.refs["select"].getDOMNode()).value
        });
    }

    componentDidMount() {
        this.fetchSong();
    }

    componentDidUpdate(prevProps: Playground.IProps, prevState: IState) {
        if (this.state.test !== prevState.test) {
            this.fetchSong();
        }
    }

    fetchSong() {
        this.setState({testSRC: "Loading..."});
        ajax.getText("tests/" + this.state.test + ".xml", (str: string) => {
            this.syncJSON(str);
        });
    }

    renderHeader() {
        return <!div >
            <!span style={{fontFamily: "Alegreya"}}>
            Modify the code and see changes in realtime.
            </span>
            <!select ref="select" value={this.state.test} style={{float: "right"}} onChange={this.handleSelectChanged}>
                <!option value="01a">Lily 01a: Pitches/Pitches</option>
                <!option value="01b">Lily 01b: Pitches/Intervals</option>
                <!option value="01c">Lily 01c: Pitches/NoVoice</option>
                <!option value="01d">Lily 01d: Pitches/Microtones</option>
                <!option value="01e">Lily 01e: Pitches/ParenAcc</option>
                <!option value="01f">Lily 01f: Pitches/ParenMicroAcc</option>
                <!option value="02a">Lily 02a: Rests/Durations</option>
                <!option value="02b">Lily 02b: Rests/PitchedRests</option>
                <!option value="02c">Lily 02c: Rests/MultiMeasure</option>
                <!option value="02d">Lily 02d: Rests/MultiMeasureTS</option>
                <!option value="02e">Lily 02e: Rests/NoType</option>
                <!option value="03a">Lily 03a: Rhythm/Durations</option>
                <!option value="03b">Lily 03b: Rhythm/Backup</option>
                <!option value="03c">Lily 03c: Rhythm/DivisionChange</option>
                <!option value="03d">Lily 03d: Rhythm/Factors</option>
                <!option value="11a">Lily 11a: TimeSignatures</option>
                <!option value="11b">Lily 11b: TS/NoTime</option>
                <!option value="11c">Lily 11c: TS/CompoundTime</option>
                <!option value="11d">Lily 11d: TS/CompoundMulti</option>
                <!option value="11e">Lily 11e: TS/CompoundMixed</option>
                <!option value="11f">Lily 11f: TS/SymbolMeaning</option>
                <!option value="11g">Lily 11g: TS/SenzaMisura</option>
                <!option value="12a">Lily 12a: Clefs</option>
                <!option value="12b">Lily 12b: Clefs/NoKeyOrClef</option>
                <!option value="13a">Lily 13a: KeySignatures</option>
                <!option value="13b">Lily 13b: KS/ChurchModes</option>
                <!option value="13c">Lily 13c: KS/NonTraditional</option>
                <!option value="13d">Lily 13d: KS/Microtones</option>
                <!option value="14a">Lily 14a: StaffDetails/LineChanges</option>
                <!option value="21a">Lily 21a: Chords/Basic</option>
                <!option value="21b">Lily 21b: Chords/TwoNotes</option>
                <!option value="21c">Lily 21c: Chords/ThreeNotesDuration</option>
                <!option value="21d">Lily 21d: Chords/Schubert</option>
                <!option value="21e">Lily 21e: Chords/PickupMeasures</option>
                <!option value="21f">Lily 21f: Chords/ElementInBetween</option>
                <!option value="22a">Lily 22a: Noteheads</option>
                <!option value="22b">Lily 22b: Staff/Notestyles</option>
                <!option value="22c">Lily 22c: Noteheads/Chords</option>
                <!option value="22d">Lily 22d: Noteheads/Parenthesized</option>
                <!option value="23a">Lily 23a: Tuplets</option>
                <!option value="23b">Lily 23b: Tuplets/Styles</option>
                <!option value="23c">Lily 23c: Tuplets/NonStandard</option>
                <!option value="23d">Lily 23d: Tuplets/Nested</option>
                <!option value="23e">Lily 23e: Tuplets/Tremelo</option>
                <!option value="23f">Lily 23f: Tuplets/DurationNoBracket</option>
                <!option value="24a">Lily 24a: GraceNotes</option>
                <!option value="24b">Lily 24b: ChordAsGraceNote</option>
                <!option value="24c">Lily 24c: GraceNote/MeasureEnd</option>
                <!option value="24d">Lily 24d: AfterGrace</option>
                <!option value="24e">Lily 24e: GraceNote/StaffChange</option>
                <!option value="24f">Lily 24f: GraceNote/Slur</option>
                <!option value="31a">Lily 31a: Directions</option>
                <!option value="31c">Lily 31c: MetronomeMarks</option>
                <!option value="32a">Lily 32a: Notations</option>
                <!option value="32b">Lily 32b: Articulations/Texts</option>
                <!option value="32c">Lily 32c: MultipleNotationChildren</option>
                <!option value="32d">Lily 32d: Arpeggio</option>
                <!option value="33a">Lily 33a: Spanners</option>
                <!option value="33b">Lily 33b: Spanners/Tie</option>
                <!option value="33c">Lily 33c: Spanners/Slurs</option>
                <!option value="33d">Lily 33d: Spanners/OctaveShifts</option>
                <!option value="33e">Lily 33e: Spanners/OS/InvalidSize</option>
                <!option value="33f">Lily 33f: Trill/EndingOnGraceNote</option>
                <!option value="33g">Lily 33g: Slur/ChordedNotes</option>
                <!option value="33h">Lily 33h: Spanners/Glissando</option>
                <!option value="33i">Lily 33i: Ties/NotEnded</option>
                <!option value="4ia">Lily 41a: MultiParts/PartOrder</option>
                <!option value="41b">Lily 41b: MultiParts/MoreThan10</option>
                <!option value="41c">Lily 41c: StaffGroups</option>
                <!option value="41d">Lily 41d: StaffGroups/Nested</option>
                <!option value="41e">Lily 41e: StaffGroups/NamesNewline</option>
                <!option value="41f">Lily 41f: StaffGroups/Overlapping</option>
                <!option value="41g">Lily 41g: StaffGroups/PartNoId</option>
                <!option value="41h">Lily 41h: StaffGroups/TooManyParts</option>
                <!option value="41i">Lily 41i: StaffGroups/Override</option>
                <!option value="42a">Lily 42a: MultiVoice/2Voices/Lyrics</option>
                <!option value="42b">Lily 42b: MultiVoice/MidMesaureClef</option>
                <!option value="43a">Lily 43a: PianoStaff</option>
                <!option value="43b">Lily 43b: MultiStaff/DifferentKeys</option>
                <!option value="43c">Lily 43c: MultiStaff/KeysAfterBackup</option>
                <!option value="43d">Lily 43d: MultiStaff/StaffChange</option>
                <!option value="43e">Lily 43e: MultiStaff/ClefDynamics</option>
                <!option value="45a">Lily 45a: SimpleRepeat</option>
                <!option value="45b">Lily 45b: Repeats/WithAlternatives</option>
                <!option value="45c">Lily 45c: Repeats/MultipleTimes</option>
                <!option value="45d">Lily 45d: Repeats/NestedAlts</option>
                <!option value="45e">Lily 45e: Repeats/NestedAlts2</option>
                <!option value="45f">Lily 45f: Repeats/InvalidEndings</option>
                <!option value="45g">Lily 45g: Repeats/NotEnded</option>
                <!option value="46a">Lily 46a: Barlines</option>
                <!option value="46b">Lily 46b: MidmeasureBarlines</option>
                <!option value="46c">Lily 46b: MidmeasureClef</option>
                <!option value="46d">Lily 46d: Pickup/ImplicitMeasures</option>
                <!option value="46e">Lily 46e: Pickup/LateSecondVoice</option>
                <!option value="46f">Lily 46f: IncompleteMeasures</option>
                <!option value="46a">Lily 46g: Chordnames/FiguredBass</option>
                <!option value="51b">Lily 51b: Header/Quotes</option>
                <!option value="51c">Lily 51c: MultipleRights</option>
                <!option value="51d">Lily 51d: EmptyTitle</option>
                <!option value="52a">Lily 52a: PageLayout</option>
                <!option value="52b">Lily 52b: Breaks</option>
                <!option value="61a">Lily 61a: Lyrics</option>
                <!option value="61b">Lily 61b: MultipleLyrics</option>
                <!option value="61c">Lily 61c: Lyrics/Pianostaff</option>
                <!option value="61d">Lily 61d: Lyrics/Melisma</option>
                <!option value="61e">Lily 61e: Lyrics/Chord</option>
                <!option value="61f">Lily 61f: Lyrics/GraceNotes</option>
                <!option value="61g">Lily 61g: Lyrics/NameNumber</option>
                <!option value="61h">Lily 61h: Lyrics/BeamsMelismata</option>
                <!option value="61i">Lily 61i: Lyrics/Chords</option>
                <!option value="61j">Lily 61j: Lyrics/Elisions</option>
                <!option value="61k">Lily 61k: Lyrics/SpannersExtenders</option>
                <!option value="71a">Lily 71a: Chordnames</option>
                <!option value="71c">Lily 71c: ChordFrets</option>
                <!option value="71d">Lily 71d: ChordFrets/Multistaff</option>
                <!option value="71e">Lily 71e: TabStaves</option>
                <!option value="71f">Lily 71f: AllChordTypes</option>
                <!option value="71g">Lily 71g: MultipleChordNames</option>
                <!option value="72a">Lily 72a: TransposingInst</option>
                <!option value="72b">Lily 72b: TransposingInst/Full</option>
                <!option value="72c">Lily 72c: TransposingInst/Change</option>
                <!option value="73a">Lily 73a: Percussion</option>
                <!option value="74a">Lily 74a: FiguredBass</option>
                <!option value="75a">Lily 75a: AccordionRegistrations</option>
                <!option value="90a">Lily 90a: CompressedMusicXML</option>
                <!option value="99a">Lily 99a: Sibelius5/IgnoreBeaming</option>
                <!option value="99b">Lily 99b: Sibelius5/BeamsMelismata</option>
            </select>
        </div>
    }

    renderEditor() {
        return <!div>
            <!textarea style={{width: "49%", height: 400}} value={this.state.testSRC} onChange={this.handleChange}/>
            <!textarea style={{width: "49%", height: 400, background: "#f5f5f5"}} readOnly={true} value={JSON.stringify(this.state.score, null, 2)} />
        </div>
    }

    handleChange(ev: React.SyntheticEvent) {
        var str = (<any>ev.currentTarget).value; 
        this.syncJSON(str);
    }

    syncJSON(str: string) {
        var error: string;
        var score: MusicXML.ScoreTimewise;

        try {
            score = MusicXML.parseXML(str);
            global.score = score;
        } catch(err) {
            error = err.toString;
        }

        this.setState({
            testSRC: str,
            error: error,
            score: score
        });
    }
}

interface IState {
    test?: string;
    testSRC?: string;
    error?: string
    score?: MusicXML.ScoreTimewise;
}

module Playground {
    export var Component = TypedReact.createClass(Playground);
    export interface IProps {
    }
}

export = Playground;
