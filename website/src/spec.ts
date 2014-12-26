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

import Bootstrap    = require("react-bootstrap");
import React        = require("react");
import TypedReact   = require("typed-react");
import _            = require("lodash");
import assert       = require("assert");

import ajax         = require("./ajax");

var saveEverything: () => void;

class MultilineInfoBlob extends TypedReact.Component<{spec: any; prop: string; placeholder?: string}, MultilineInfoBlob.IState> {
    render(): any {
        if (!this.state.editMode) {
            return <!div ref="ro">
                {(this.props.spec[this.props.prop] || this.props.placeholder || "")
                    .replace(" ", "\u00a0")
                    .split("\n")
                    .map((a: any, i: string) => <!div key={i}>{a}<!br /></div>)}
                <!a style={{color: "#ddd"}} href="javascript:void(0)" onClick={this.handleEditClicked}>edit</a>
                <!a style={{color: "#ddd"}} href="javascript:void(0)" onClick={this.handleEditJSONClicked}>(json)</a>
            </div>;
        } else if (this.state.editMode === "comment") {
            return <!div>
                <!textarea style={{width: "100%", height: this.state.height}} value={this.props.spec[this.props.prop]} onChange={this.handleChange}/>
                <!a href="javascript:void(0)" onClick={this.save}>save</a>
            </div>
        } else if (this.state.editMode === "json") {
            return <!div>
                <!textarea style={{width: "100%", height: this.state.height}} value={this.state.jsonStr} onChange={this.handleChange}/>
                <!a href="javascript:void(0)" onClick={this.save}>save</a>
            </div>
        }
    }
    getInitialState(): MultilineInfoBlob.IState {
        return {
            editing: null
        };
    }
    handleEditClicked() {
        this.setState({
            height: this.refs["ro"].getDOMNode().clientHeight - 30,
            editMode: "comment"
        });
    }
    handleEditJSONClicked() {
        this.setState({
            height: this.refs["ro"].getDOMNode().clientHeight - 30,
            editMode: "json",
            jsonStr: JSON.stringify(this.props.spec, null, 2),
        });
    }
    handleChange(e: any) {
        var str = e.currentTarget.value; 
        if (this.state.editMode === "json") {
            this.setState({
                jsonStr: str
            });
        } else {
            this.props.spec[this.props.prop] = str;
            this.forceUpdate();
        }
    }
    save() {
        if (this.state.editMode === "json") {
            _.extend(this.props.spec, JSON.parse(this.state.jsonStr));
        }
        this.setState({editMode: null});
        saveEverything();
    }
}

module MultilineInfoBlob {
    export var Component = TypedReact.createClass(MultilineInfoBlob);
    export interface IState {
        editMode?: string;
        height?: number;
        jsonStr?: string;
    }
}

function deblob(str: string) {
    "use strict";
    str = str.slice(1, str.length - 1);
    return str;
}

class InterfaceBlob extends TypedReact.Component<{ifce: any; typesByName: any}, {activePropKey?: string}> {
    render(): any {
        var typesByName = this.props.typesByName;
        return <!div>
            {_.map(this.props.ifce.interface, (v: any, k: string) => <!Bootstrap.Accordion key={k} activeKey={this.state.activePropKey} onSelect={this.handlePropSelect}>
                {k === "_extends" ?
                    v.map((a: string, i: string) => <!Bootstrap.Panel key={i} eventKey={a} bsStyle="primary"
                                header={<!span><!i className="fa-plus-square-o fa" /> Extends {a}</span>}>
                            <!div>
                                <!MultilineInfoBlob.Component spec={typesByName[a]} prop="//" placeholder="NO DOCUMENTATION\n\n" />
                            </div>
                            {this.state.activePropKey === a && <!Blob.Component typesByName={typesByName} ifce={typesByName[a]} />}
                        </Bootstrap.Panel>) :
                    <!Bootstrap.Panel eventKey={k} bsStyle={k.indexOf("<") === 0 ? "success" : "danger"}
                            header={<!span><!i className="fa-plus-square-o fa" />{"\u00a0"}{!isNaN(v.idx) ? "Property " + v.idx + ". " : ""}
                                {k + " "}
                                <!i style={{float: "right"}} className={v.array ? "fa-list-ol fa" : (v.required ? "fa-check-square-o fa" : "fa-square-o fa")} />
                                {v.type && <!Bootstrap.Label bsStyle="danger" style={{float: "right"}}>{v.type}</Bootstrap.Label>}
                                {v === "__flag__" && <!Bootstrap.Label bsStyle="success" style={{float: "right"}}>Flag</Bootstrap.Label>}
                                {v.child && <!Bootstrap.Label bsStyle="warning" style={{float: "right"}}>CDATA</Bootstrap.Label>}
                                {v.std === undefined ? "" : " = " + v.std}</span>}>
                            {k.indexOf("<") !== 0 && <!MultilineInfoBlob.Component spec={v} prop="//" placeholder="NO DOCUMENTATION\n\n" />}
                            {k.indexOf("<") === 0 && v !== "__flag__" && !v.type && <!MultilineInfoBlob.Component spec={typesByName[deblob(k)]} prop="//" placeholder="NO DOCUMENTATION\n\n" />}
                            {this.state.activePropKey === k && k.indexOf("<") === 0 && v !== "__flag__" && !v.type && <!Blob.Component ifce={typesByName[deblob(k)]} typesByName={typesByName} />}
                            {this.state.activePropKey === k && k.indexOf("<") !== 0 && v !== "__flag__" && v.type !== "string" && typesByName[v.type] && <!Blob.Component ifce={typesByName[v.type]} typesByName={typesByName} />}
                    </Bootstrap.Panel>
                    }
            </Bootstrap.Accordion>)}
        </div>;
    }

    handlePropSelect(key: string) {
        this.setState({
            activePropKey: key
        });
    }
    getInitialState() {
        return {
            activePropKey: ""
        }
    }
}

module InterfaceBlob {
    "use strict";
    export var Component = TypedReact.createClass(InterfaceBlob);
}

class Blob extends TypedReact.Component<{ifce: any; typesByName: any}, {}> {
    render(): any {
        var s = this.props.ifce;
        var typesByName = this.props.typesByName;
        return <!span>
            {s.interface && typeof s.interface === "string" && 
                <!Bootstrap.Label bsStyle="danger">Is a {s.interface}.</Bootstrap.Label>}
            {s.interface && s.interface instanceof Object && <!InterfaceBlob.Component ifce={s} typesByName={typesByName} />}
            {s.enum && _.map(s.enum, (v: any, k: string) => <!div key={k}>
                <!Bootstrap.Label bsStyle="success">{k} = {v}</Bootstrap.Label><!br /><!br />
            </div>)}
            {s.range && <!div>
                <!Bootstrap.Label bsStyle="success">Range ∈ [{s.range.fromIncl}, {s.range.toIncl}]</Bootstrap.Label><!br />
            </div>}
        </span>;
    }
}

module Blob {
    "use strict";
    export var Component = TypedReact.createClass(Blob);
}

function toCamelCase(input: string) { 
    "use strict";
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}


function getHeader(s: any) {
    "use strict";
    var title: string;
    var jsName: string;
    if (s.element) {
        jsName = toCamelCase(s.element);
        jsName = jsName[0].toUpperCase() + jsName.slice(1);
        title = "<" + s.element + ">";
    } else {
        title = "{" + s.entity + "}"
        jsName = toCamelCase(s.entity);
    }

    var fr = {float: "right"};
    var labels: any;
    if (s["enum"]) {
        labels = <!Bootstrap.Label style={fr} bsStyle="danger">Enum</Bootstrap.Label>;
    } else if (s.interface) {
        labels = <!Bootstrap.Label style={fr} bsStyle="primary">Interface</Bootstrap.Label>;
    } else if (s.range) {
        labels = <!Bootstrap.Label style={fr} bsStyle="success">Range</Bootstrap.Label>;
    } else if (s.manualType) {
        labels = <!Bootstrap.Label style={fr} bsStyle="warning">Manual Type</Bootstrap.Label>;
    } else {
        labels = <!Bootstrap.Label style={fr} bsStyle="warning">Unknown</Bootstrap.Label>;
    }
    return <!h3>{title}<!small style={{fontSize: 14}}>{" = " + jsName}</small>{labels}</h3>
    return <!span>Unknown</span>;
}

class Spec extends TypedReact.Component<Spec.IProps, IState> {
    render(): any {
        if (!this.state.spec) {
            return <!div className="pageContent">
                Loading...
            </div>
        }

        var spec = this.state.spec;
        var typesByName: any = _.indexBy(spec.types, (a: any) => a.entity || a.element);
        var s = typesByName["score-timewise"];
     
        return <!div className="minipad">
            This section is an easy-to-navigate reference for MusicXML. It's mostly the
            same as <!a href="http://www.musicxml.com/for-developers/">the official reference</a> but
            contains some additional comments, links to relevant tests, some default values as
            used by MusicXML Interfaces, and (most importantly) contains everything on a single page.
            In addition, comments about attributes have been moved from their parent elements to
            the attributes themselves.<!br /><!br />
            <!span style={{fontFamily: "Alegreya SC, Alegreya", fontWeight: 900}}>Basic knowledge of MusicXML is assumed. </span>
            This document describes timewise MusicXML.
            If you aren't sure what that means, or need a general overview of MusicXML, take a look
            at the fantastic <!a href="http://www.musicxml.com/tutorial/">official MusicXML tutorial</a>.
            <!br /><!br />

            <!Bootstrap.Panel key="score-timewise" eventKey="score-timewise" header={getHeader(s)}>
                <!MultilineInfoBlob.Component spec={s} prop="//" placeholder="NO DOCUMENTATION\n\n" />
                <!Blob.Component ifce={s} typesByName={typesByName} />
            </Bootstrap.Panel>
        </div>
    }
    componentDidMount() {
        ajax.getJSON("spec", (response: any, request: XMLHttpRequest) => {
            this.setState({
                spec: response
            });
        });
        saveEverything = () => {
            console.log(this.state.spec);
            ajax.postJSON("/spec", this.state.spec, (response: any, request: XMLHttpRequest) => {
                console.log("OK");
            });
        }
    }
    getInitialState() {
        return {};
    }
}

interface IState {
    spec?: any;
}

module Spec {
    export var Component = TypedReact.createClass(Spec);
    export interface IProps {
    }
}

export = Spec;
