var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bootstrap = require("react-bootstrap");
var React = require("react");
var TypedReact = require("typed-react");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        _super.apply(this, arguments);
    }
    Header.prototype.render = function () {
        var brand = React.createElement("span", { style: { fontFamily: "Alegreya SC", fontSize: "14px", fontWeight: 900 } }, 
            "MusicXML Interfaces");
        return React.createElement(Bootstrap.Navbar, { componentClass: "header", brand: brand, toggleNavKey: 0, role: "banner", staticTop: true }, React.createElement(Bootstrap.Nav, { className: "partialnav", role: "nav", style: { fontFamily: "Alegreya SC, Alegreya" }, eventKey: 0 }, React.createElement(Bootstrap.NavItem, { href: "#home", active: true }, 
                    "Home"
                ), React.createElement(Bootstrap.NavItem, { href: "#start" }, 
                    "Getting Started"
                ), React.createElement(Bootstrap.NavItem, { href: "#spec" }, 
                    "Specification"
                )), React.createElement("ul", { className: "ripieno-backlink navbar-right", role: "button", style: { fontFamily: "Alegreya SC, Alegreya", marginTop: 15.5, float: "left" }, eventKey: 1 }, React.createElement("a", { href: "https://ripieno.io" }, 
                    "A Ripieno.io Project"
                )));
    };
    return Header;
})(TypedReact.Component);
var Header;
(function (Header) {
    Header.Component = TypedReact.createClass(Header);
})(Header || (Header = {}));
module.exports = Header;
