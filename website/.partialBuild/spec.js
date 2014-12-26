var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bootstrap = require("react-bootstrap");
var React = require("react");
var TypedReact = require("typed-react");
var _ = require("lodash");
var ajax = require("./ajax");
var saveEverything;
var MultilineInfoBlob = (function (_super) {
    __extends(MultilineInfoBlob, _super);
    function MultilineInfoBlob() {
        _super.apply(this, arguments);
    }
    MultilineInfoBlob.prototype.render = function () {
        if (!this.state.editMode) {
            return React.createElement("div", { ref: "ro" }, (this.props.spec[this.props.prop] || this.props.placeholder || "").replace(" ", "\u00a0").split("\n").map(function (a, i) { return React.createElement("div", { key: i }, a, React.createElement("br", null)); }), React.createElement("a", { style: { color: "#ddd" }, href: "javascript:void(0)", onClick: this.handleEditClicked }, "edit"), React.createElement("a", { style: { color: "#ddd" }, href: "javascript:void(0)", onClick: this.handleEditJSONClicked }, "(json)"));
        }
        else if (this.state.editMode === "comment") {
            return React.createElement("div", null, React.createElement("textarea", { style: { width: "100%", height: this.state.height }, value: this.props.spec[this.props.prop], onChange: this.handleChange }), React.createElement("a", { href: "javascript:void(0)", onClick: this.save }, "save"));
        }
        else if (this.state.editMode === "json") {
            return React.createElement("div", null, React.createElement("textarea", { style: { width: "100%", height: this.state.height }, value: this.state.jsonStr, onChange: this.handleChange }), React.createElement("a", { href: "javascript:void(0)", onClick: this.save }, "save"));
        }
    };
    MultilineInfoBlob.prototype.getInitialState = function () {
        return {
            editing: null
        };
    };
    MultilineInfoBlob.prototype.handleEditClicked = function () {
        this.setState({
            height: this.refs["ro"].getDOMNode().clientHeight - 30,
            editMode: "comment"
        });
    };
    MultilineInfoBlob.prototype.handleEditJSONClicked = function () {
        this.setState({
            height: this.refs["ro"].getDOMNode().clientHeight - 30,
            editMode: "json",
            jsonStr: JSON.stringify(this.props.spec, null, 2),
        });
    };
    MultilineInfoBlob.prototype.handleChange = function (e) {
        var str = e.currentTarget.value;
        if (this.state.editMode === "json") {
            this.setState({
                jsonStr: str
            });
        }
        else {
            this.props.spec[this.props.prop] = str;
            this.forceUpdate();
        }
    };
    MultilineInfoBlob.prototype.save = function () {
        if (this.state.editMode === "json") {
            _.extend(this.props.spec, JSON.parse(this.state.jsonStr));
        }
        this.setState({ editMode: null });
        saveEverything();
    };
    return MultilineInfoBlob;
})(TypedReact.Component);
var MultilineInfoBlob;
(function (MultilineInfoBlob) {
    MultilineInfoBlob.Component = TypedReact.createClass(MultilineInfoBlob);
})(MultilineInfoBlob || (MultilineInfoBlob = {}));
function deblob(str) {
    "use strict";
    str = str.slice(1, str.length - 1);
    return str;
}
var InterfaceBlob = (function (_super) {
    __extends(InterfaceBlob, _super);
    function InterfaceBlob() {
        _super.apply(this, arguments);
    }
    InterfaceBlob.prototype.render = function () {
        var _this = this;
        var typesByName = this.props.typesByName;
        return React.createElement("div", null, _.map(this.props.ifce.interface, function (v, k) { return React.createElement(Bootstrap.Accordion, { key: k, activeKey: _this.state.activePropKey, onSelect: _this.handlePropSelect }, k === "_extends" ? v.map(function (a, i) { return React.createElement(Bootstrap.Panel, { key: i, eventKey: a, bsStyle: "primary", header: React.createElement("span", null, React.createElement("i", { className: "fa-plus-square-o fa" }), " Extends ", a) }, React.createElement("div", null, React.createElement(MultilineInfoBlob.Component, { spec: typesByName[a], prop: "//", placeholder: "NO DOCUMENTATION\n\n" })), _this.state.activePropKey === a && React.createElement(Blob.Component, { typesByName: typesByName, ifce: typesByName[a] })); }) : React.createElement(Bootstrap.Panel, { eventKey: k, bsStyle: k.indexOf("<") === 0 ? "success" : "danger", header: React.createElement("span", null, React.createElement("i", { className: "fa-plus-square-o fa" }), "\u00a0", !isNaN(v.idx) ? "Property " + v.idx + ". " : "", k + " ", React.createElement("i", { style: { float: "right" }, className: v.array ? "fa-list-ol fa" : (v.required ? "fa-check-square-o fa" : "fa-square-o fa") }), v.type && React.createElement(Bootstrap.Label, { bsStyle: "danger", style: { float: "right" } }, v.type), v === "__flag__" && React.createElement(Bootstrap.Label, { bsStyle: "success", style: { float: "right" } }, "Flag"), v.child && React.createElement(Bootstrap.Label, { bsStyle: "warning", style: { float: "right" } }, "CDATA"), v.std === undefined ? "" : " = " + v.std) }, k.indexOf("<") !== 0 && React.createElement(MultilineInfoBlob.Component, { spec: v, prop: "//", placeholder: "NO DOCUMENTATION\n\n" }), k.indexOf("<") === 0 && v !== "__flag__" && !v.type && React.createElement(MultilineInfoBlob.Component, { spec: typesByName[deblob(k)], prop: "//", placeholder: "NO DOCUMENTATION\n\n" }), _this.state.activePropKey === k && k.indexOf("<") === 0 && v !== "__flag__" && !v.type && React.createElement(Blob.Component, { ifce: typesByName[deblob(k)], typesByName: typesByName }), _this.state.activePropKey === k && k.indexOf("<") !== 0 && v !== "__flag__" && v.type !== "string" && typesByName[v.type] && React.createElement(Blob.Component, { ifce: typesByName[v.type], typesByName: typesByName }))); }));
    };
    InterfaceBlob.prototype.handlePropSelect = function (key) {
        this.setState({
            activePropKey: key
        });
    };
    InterfaceBlob.prototype.getInitialState = function () {
        return {
            activePropKey: ""
        };
    };
    return InterfaceBlob;
})(TypedReact.Component);
var InterfaceBlob;
(function (InterfaceBlob) {
    "use strict";
    InterfaceBlob.Component = TypedReact.createClass(InterfaceBlob);
})(InterfaceBlob || (InterfaceBlob = {}));
var Blob = (function (_super) {
    __extends(Blob, _super);
    function Blob() {
        _super.apply(this, arguments);
    }
    Blob.prototype.render = function () {
        var s = this.props.ifce;
        var typesByName = this.props.typesByName;
        return React.createElement("span", null, s.interface && typeof s.interface === "string" && React.createElement(Bootstrap.Label, { bsStyle: "danger" }, "Is a ", s.interface, "."), s.interface && s.interface instanceof Object && React.createElement(InterfaceBlob.Component, { ifce: s, typesByName: typesByName }), s.enum && _.map(s.enum, function (v, k) { return React.createElement("div", { key: k }, React.createElement(Bootstrap.Label, { bsStyle: "success" }, k, " = ", v), React.createElement("br", null), React.createElement("br", null)); }), s.range && React.createElement("div", null, React.createElement(Bootstrap.Label, { bsStyle: "success" }, "Range ∈ [", s.range.fromIncl, ", ", s.range.toIncl, "]"), React.createElement("br", null)));
    };
    return Blob;
})(TypedReact.Component);
var Blob;
(function (Blob) {
    "use strict";
    Blob.Component = TypedReact.createClass(Blob);
})(Blob || (Blob = {}));
function toCamelCase(input) {
    "use strict";
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
function getHeader(s) {
    "use strict";
    var title;
    var jsName;
    if (s.element) {
        jsName = toCamelCase(s.element);
        jsName = jsName[0].toUpperCase() + jsName.slice(1);
        title = "<" + s.element + ">";
    }
    else {
        title = "{" + s.entity + "}";
        jsName = toCamelCase(s.entity);
    }
    var fr = { float: "right" };
    var labels;
    if (s["enum"]) {
        labels = React.createElement(Bootstrap.Label, { style: fr, bsStyle: "danger" }, "Enum");
    }
    else if (s.interface) {
        labels = React.createElement(Bootstrap.Label, { style: fr, bsStyle: "primary" }, "Interface");
    }
    else if (s.range) {
        labels = React.createElement(Bootstrap.Label, { style: fr, bsStyle: "success" }, "Range");
    }
    else if (s.manualType) {
        labels = React.createElement(Bootstrap.Label, { style: fr, bsStyle: "warning" }, "Manual Type");
    }
    else {
        labels = React.createElement(Bootstrap.Label, { style: fr, bsStyle: "warning" }, "Unknown");
    }
    return React.createElement("h3", null, title, React.createElement("small", { style: { fontSize: 14 } }, " = " + jsName), labels);
    return React.createElement("span", null, "Unknown");
}
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        _super.apply(this, arguments);
    }
    Spec.prototype.render = function () {
        if (!this.state.spec) {
            return React.createElement("div", { className: "pageContent" }, 
                "Loading..."
            );
        }
        var spec = this.state.spec;
        var typesByName = _.indexBy(spec.types, function (a) { return a.entity || a.element; });
        var s = typesByName["score-timewise"];
        return React.createElement("div", { className: "minipad" }, 
            "This section is an easy-to-navigate reference for MusicXML. It's mostly the" + ' ' +
            "same as ", React.createElement("a", { href: "http://www.musicxml.com/for-developers/" }, "the official reference"), " but" + ' ' +
            "contains some additional comments, links to relevant tests, some default values as" + ' ' +
            "used by MusicXML Interfaces, and (most importantly) contains everything on a single page." + ' ' +
            "In addition, comments about attributes have been moved from their parent elements to" + ' ' +
            "the attributes themselves.", React.createElement("br", null), React.createElement("br", null), React.createElement("span", { style: { fontFamily: "Alegreya SC, Alegreya", fontWeight: 900 } }, "Basic knowledge of MusicXML is assumed. "), 
            "This document describes timewise MusicXML." + ' ' +
            "If you aren't sure what that means, or need a general overview of MusicXML, take a look" + ' ' +
            "at the fantastic ", React.createElement("a", { href: "http://www.musicxml.com/tutorial/" }, "official MusicXML tutorial"), "."
            , React.createElement("br", null), React.createElement("br", null), React.createElement(Bootstrap.Panel, { key: "score-timewise", eventKey: "score-timewise", header: getHeader(s) }, React.createElement(MultilineInfoBlob.Component, { spec: s, prop: "//", placeholder: "NO DOCUMENTATION\n\n" }), React.createElement(Blob.Component, { ifce: s, typesByName: typesByName })));
    };
    Spec.prototype.componentDidMount = function () {
        var _this = this;
        ajax.getJSON("/spec", function (response, request) {
            _this.setState({
                spec: response
            });
        });
        saveEverything = function () {
            console.log(_this.state.spec);
            ajax.postJSON("/spec", _this.state.spec, function (response, request) {
                console.log("OK");
            });
        };
    };
    Spec.prototype.getInitialState = function () {
        return {};
    };
    return Spec;
})(TypedReact.Component);
var Spec;
(function (Spec) {
    Spec.Component = TypedReact.createClass(Spec);
})(Spec || (Spec = {}));
module.exports = Spec;
