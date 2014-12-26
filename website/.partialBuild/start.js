var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bootstrap = require("react-bootstrap");
var React = require("react");
var TypedReact = require("typed-react");
var About = (function (_super) {
    __extends(About, _super);
    function About() {
        _super.apply(this, arguments);
    }
    About.prototype.render = function () {
        return React.createElement("div", { className: "pageContent" }, 
            "There are two ways to use Satie."
            , React.createElement("h3", null, "Easy option: iframe API"), 
            "You can use Ripieno's embed service to easily share your MusicXML songs. Just set the desired" + ' ' +
            "parameters, and copy-paste the resulting HTML to your webpage. By using this service, you give" + ' ' +
            "Ripieno the right to host and modify the song. If you can't do that, see the React Component option." + ' ' +
            "You should use this option if you need fallbacks for older browsers (see \"About\").", React.createElement("br", null), React.createElement("br", null), React.createElement("div", { style: { padding: 20, backgroundColor: "#eef", borderBottom: "1px solid black" } }, React.createElement("form", { className: "form-horizontal" }, React.createElement(Bootstrap.Input, { type: "text", label: "URL of song", labelClassName: "col-xs-2", wrapperClassName: "col-xs-10", value: this.state.uri, onChange: this.handleURIChange }), React.createElement(Bootstrap.Input, { type: "checkbox", label: "Indexable", wrapperClassName: "col-xs-offset-2 col-xs-10", help: "If this is set, the song will be added to Ripieno's search and directory. Set this to help people find your sheet music.", checked: this.state.indexable, onChange: this.handleIndexableCheck }), React.createElement(Bootstrap.Input, { type: "checkbox", label: "Downloadable, Printable, and Copyable", wrapperClassName: "col-xs-offset-2 col-xs-10", help: "If this set, people will be able to download, print, and create copies of this song.", checked: this.state.copyable, onChange: this.handleCopyCheck }))), React.createElement("div", { style: { padding: 20, backgroundColor: "#eee" } }, React.createElement("div", { style: { textAlign: "center", width: "100%" } }, 
                    "Change the above values to see a preview here."
                ), React.createElement("br", null), React.createElement("br", null), 
                "Copy and paste this code:"
            , React.createElement(Bootstrap.Well, { style: { fontFamily: "monospace" } }, "<iframe", React.createElement("br", null), "\u00a0\u00a0\u00a0\u00a0width=\"600\"", React.createElement("br", null), "\u00a0\u00a0\u00a0\u00a0height=\"1280\"", React.createElement("br", null), "\u00a0\u00a0\u00a0\u00a0src=\"https://ripieno.io/api/v0/musicXML/embed?src=" + encodeURIComponent(this.state.uri) + "&indexable=" + (this.state.indexable ? "true" : "false") + "&copyable=" + (this.state.copyable ? "true" : "false") + "\"", React.createElement("br", null), "\u00a0\u00a0\u00a0\u00a0frameborder=\"0\">", React.createElement("br", null), "</iframe>")), React.createElement("h3", null, "Harder option: React Component"), React.createElement("div", { style: { padding: 20, fontFamily: "monospace", backgroundColor: "#eee" } }, 
            "npm install -g satie"
            ), React.createElement("h3", null, React.createElement("a", { href: "javascript:void(0)" }, "Continue »")), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null));
    };
    About.prototype.handleURIChange = function (ev) {
        this.setState({
            uri: ev.currentTarget.value
        });
    };
    About.prototype.handleIndexableCheck = function () {
        this.setState({
            indexable: !this.state.indexable
        });
    };
    About.prototype.handleCopyCheck = function () {
        this.setState({
            copyable: !this.state.copyable
        });
    };
    About.prototype.getInitialState = function () {
        return {
            uri: "http://url.to/music.xml",
            indexable: true,
            copyable: true
        };
    };
    return About;
})(TypedReact.Component);
var About;
(function (About) {
    About.Component = TypedReact.createClass(About);
})(About || (About = {}));
module.exports = About;
