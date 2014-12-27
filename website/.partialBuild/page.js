var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Header = require("./header");
var Spec = require("./spec");
var Playground = require("./playground");
var React = require("react");
var TypedReact = require("typed-react");
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
    }
    Page.prototype.render = function () {
        return React.createElement("div", { className: "main" }, React.createElement(Header.Component, { key: "header", selectedKey: this.state.pageKey, onSelect: this.handlePageSelect }), React.createElement("div", { className: "pageContent", id: "home" }, React.createElement("h3", null, "MusicXML Interfaces is a parser and type definition set for", " ", React.createElement("a", { href: "http://musicxml.com" }, "MusicXML"), "."), 
                "MusicXML Interfaces currently targets TypeScript, JavaScript, and the" + ' ' +
                "D Programming Language. It is currently in alpha, so not all of" + ' ' +
                "MusicXML is typed yet, and there are many known bugs.", React.createElement("br", null), React.createElement("br", null), React.createElement(Playground.Component, null), React.createElement("br", null), React.createElement("hr", { id: "start" }), React.createElement("h1", null, "Getting Started"), React.createElement("h3", null, "Requirements"), 
                "The TypeScript/JavaScript version requires ", React.createElement("a", { href: "http://nodejs.org/" }, "Node.js"), "." + ' ' +
                "A Common JS bundler (e.g., ", React.createElement("a", { href: "http://browserify.org/" }, "browserify"), ", webpack)" + ' ' +
                "is required for use on the web. A DOM shim is needed for backend use. Internet Explorer" + ' ' +
                "8 and earlier are not supported."
                , React.createElement("br", null), React.createElement("br", null), 
                "The D version requires ", React.createElement("a", { href: "http://code.dlang.org/download" }, "dub"), "."
                , React.createElement("br", null), React.createElement("h3", null, "License"), 
                "MusicXML Interfaces is licensed under the GNU Affero General Public License v3." + ' ' +
                "Applications, including web applications and ASPs, that incorporate or extend MusicXML Interfaces" + ' ' +
                "must be licensed under a compatible license." + ' ' +
                "MusicXML itself also has a ", React.createElement("a", { href: "http://www.musicxml.com/dtds/license.html" }, "license"), "."

                , React.createElement("h3", null, "Installation"), 
                "To use this package, add the following to your ", React.createElement("b", null, "package.json"), " or ", React.createElement("b", null, "dub.json"), " for" + ' ' +
                "JS/TS and D respectively."
                , React.createElement("pre", null, JSON.stringify({
            dependencies: {
                "musicxml-interfaces": "0.0.3-alpha1"
            }
        }, null, 2)), React.createElement("br", null), 
                "For TypeScript and JavaScript, you must then run \"npm install\"."

                , React.createElement("h3", null, "TypeScript Usage"), 
                "To get a Timewise score,"
                , React.createElement("pre", null, "import MusicXML = require(\"musicxml-interfaces\");\n", "/// <reference path=\"path/to/node_modules/musicxml-interfaces/typescript/dist/musicXML_DOM.d.ts\"/> // Or, even better, use \"tsd link\" in tsd 0.0.6.\n\n", "var score = MusicXML.parseXML(str);\n"), 
                "The Score corresponds to the \"ScoreTimewise\" described below."

                , React.createElement("h3", null, "JavaScript Usage"), 
                "Pretty much the same as above."
                , React.createElement("pre", null, "var MusicXML = require(\"musicxml-interfaces\");\n", "var score = MusicXML.parseXML(str);\n"), 
                "The Score corresponds to the \"ScoreTimewise\" described below.", React.createElement("br", null), React.createElement("br", null), 
                "MusicXML Interfaces makes use of TypeScript-style enums."
                , React.createElement("pre", null, "MusicXML.AboveBelow[1] === \"Above\";\n", "MusicXML.AboveBelow[\"Above\"] === 1;\n"), React.createElement("h3", null, "D Usage"), 
                "To get a Timewise score,"
                , React.createElement("pre", null, "import musicxml.score : Score;\n", "Score score = xmlString;\n"), 
                "The Score corresponds to the \"ScoreTimewise\" described below." + ' ' +
                "You can manipulate it directly, or turn it into JSON via:"
                , React.createElement("pre", null, "string jsonStr = score.toJsonString;"), React.createElement("br", null), React.createElement("br", null), React.createElement("hr", { id: "spec" }), React.createElement("h1", null, "Specification"), React.createElement(Spec.Component, null), React.createElement("br", null), React.createElement("br", null), React.createElement("hr", { id: "contribute" }), React.createElement("h1", null, "Coming soon..."), 
                "This will be the base for Satie, an open source MusicXML renderer for the web."

                , React.createElement("br", null), React.createElement("br", null)), React.createElement("div", { style: { height: 80 } }), React.createElement("div", { style: { width: "100%", textAlign: "center", position: "absolute", button: 0 } }, "\u00a9", React.createElement("a", { href: "https://nettek.ca" }, " Josh Netterfield "), " 2015." + ' ' +
                "Some rights reserved.", React.createElement("br", null), 

                "Contribute on ", React.createElement("a", { href: "https://github.com/ripieno/ripieno-musicxml" }, " Github"), "."
                , React.createElement("div", { style: { height: 10 } })));
    };
    Page.prototype.getInitialState = function () {
        return {
            pageKey: "playground"
        };
    };
    Page.prototype.handlePageSelect = function (key) {
        this.setState({
            pageKey: key
        });
    };
    return Page;
})(TypedReact.Component);
var Page;
(function (Page) {
    Page.Component = TypedReact.createClass(Page);
})(Page || (Page = {}));
module.exports = Page;
