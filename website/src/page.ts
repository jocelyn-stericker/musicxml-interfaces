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

import Header       = require("./header");
import Spec         = require("./spec");
import Playground   = require("./playground");

import Bootstrap    = require("react-bootstrap");
import React        = require("react");
import TypedReact   = require("typed-react");
import _            = require("lodash");
import assert       = require("assert");

class Page extends TypedReact.Component<Header.IProps, IState> {
    render(): any {
        return <!div className="main">
            <!Header.Component key="header" selectedKey={this.state.pageKey} onSelect={this.handlePageSelect}/>
            <!div className="pageContent" id="home">

                <!h3>MusicXML Interfaces is a parser and type definition set for{" "}
                    <!a href="http://musicxml.com">MusicXML</a>.</h3>
                MusicXML Interfaces currently targets TypeScript, JavaScript, and the
                D Programming Language. It is currently in alpha, so not all of
                MusicXML is typed yet, and there are many known bugs.<!br /><!br />

                <!Playground.Component />

                <!br /> <!hr id="start"/>
                <!h1>Getting Started</h1>

                <!h3>Requirements</h3>
                The TypeScript/JavaScript version requires <!a href="http://nodejs.org/">Node.js</a>.
                A Common JS bundler (e.g., <!a href="http://browserify.org/">browserify</a>, webpack)
                is required for use on the web. A DOM shim is needed for backend use. Internet Explorer
                8 and earlier are not supported.
                <!br/><!br/>
                The D version requires <!a href="http://code.dlang.org/download">dub</a>.
                <!br />

                <!h3>License</h3>
                MusicXML Interfaces is licensed under the GNU Affero General Public License v3.
                Applications, including web applications and ASPs, that incorporate or extend MusicXML Interfaces
                must be licensed under a compatible license.
                MusicXML itself also has a <!a href="http://www.musicxml.com/dtds/license.html">license</a>.

                <!h3>Installation</h3>
                To use this package, add the following to your <!b>package.json</b> or <!b>dub.json</b> for
                JS/TS and D respectively.
                <!pre>
                    {JSON.stringify({
                        dependencies: {
                            "musicxml-interfaces": "0.0.3-alpha1"
                        }
                    }, null, 2)}
                </pre><!br />
                For TypeScript and JavaScript, you must then run "npm install".

                <!h3>TypeScript Usage</h3>
                To get a Timewise score,
                <!pre>
                    {"import MusicXML = require(\"musicxml-interfaces\");\n"}
                    {"/// <reference path=\"path/to/node_modules/musicxml-interfaces/typescript/release/musicXML_DOM.d.ts\"/>\n\n"} 
                    {"var score = MusicXML.parseXML(str);\n"}
                </pre>
                The Score corresponds to the "ScoreTimewise" described below.

                <!h3>JavaScript Usage</h3>
                Pretty much the same as above.
                <!pre>
                    {"var MusicXML = require(\"musicxml-interfaces\");\n"}
                    {"var score = MusicXML.parseXML(str);\n"}
                </pre>
                The Score corresponds to the "ScoreTimewise" described below.<!br /><!br />
                MusicXML Interfaces makes use of TypeScript-style enums.
                <!pre>
                    {"MusicXML.AboveBelow[1] === \"Above\";\n"}
                    {"MusicXML.AboveBelow[\"Above\"] === 1;\n"}
                </pre>

                <!h3>D Usage</h3>
                To get a Timewise score,
                <!pre>
                    {"import musicxml.score : Score;\n"}
                    {"Score score = xmlString;\n"}
                </pre>
                The Score corresponds to the "ScoreTimewise" described below.
                You can manipulate it directly, or turn it into JSON via:
                <!pre>
                    {"string jsonStr = score.toJsonString;"}
                </pre>

                <!br /> <!br /> <!hr id="spec" />
                <!h1>Specification</h1>
                <!Spec.Component />

                <!br /> <!br /> <!hr id="contribute" />
                <!h1>Coming soon...</h1>
                This will be the base for Satie, an open source MusicXML renderer for the web.

                <!br /><!br />
            </div>

            <!div style={{height: 80}} />
            <!div style={{width: "100%", textAlign: "center", position: "absolute", button: 0}}>
                {"\u00a9"} <!a href="https://nettek.ca"> Josh Netterfield </a> 2015.
                Some rights reserved.<!br />

                Contribute on <!a href="https://github.com/ripieno/ripieno-musicxml"> Github</a>.
                <!div style={{height: 10}} />
            </div>
        </div>;
    }

    getInitialState(): IState {
        return {
            pageKey: "playground"
        };
    }

    handlePageSelect(key: string) {
        this.setState({
            pageKey: key
        });
    }
}

interface IState {
    pageKey?: string;
}

module Page {
    export var Component = TypedReact.createClass(Page);
    export interface IProps {
    }
}

export = Page;
