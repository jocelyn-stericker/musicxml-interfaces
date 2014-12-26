var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react");
var TypedReact = require("typed-react");
var About = (function (_super) {
    __extends(About, _super);
    function About() {
        _super.apply(this, arguments);
    }
    About.prototype.render = function () {
        return React.createElement("div", { className: "pageContent" });
    };
    return About;
})(TypedReact.Component);
var About;
(function (About) {
    About.Component = TypedReact.createClass(About);
})(About || (About = {}));
module.exports = About;
