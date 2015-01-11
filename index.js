// Selects the correct backend (DOM or dlang)
var isNode = typeof window === "undefined" || typeof process !== "undefined" && !process.browser;
if (isNode) {
    var implicit = "./node/build/Release/mxmltojson";
    module.exports = require(implicit);
} else {
    module.exports = require("./typescript/dist/musicXML_DOM.js");
}
