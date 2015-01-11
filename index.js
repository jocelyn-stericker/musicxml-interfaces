// Selects the correct backend (DOM or dlang)
var isNode = typeof window === "undefined" || typeof process !== "undefined" && !process.browser;
if (isNode) {
    var implicit = "./node/build/Release/mxmltojson";
    try {
        module.exports = require(implicit);
    } catch(err) {
        console.log();
        console.log("=========== FAILED TO LOAD MUSICXML-INTERFACES NODE ADDON ===========");
        console.log("To run musicxml-interfaces in node, you must install the node addon:");
        console.log();
        console.log("   cd ./node_modules/musicxml-interfaces");
        console.log("   make node");
        console.log();
        console.log("=====================================================================");
        console.log();
        throw err;
    }
} else {
    module.exports = require("./typescript/dist/musicXML_DOM.js");
}
