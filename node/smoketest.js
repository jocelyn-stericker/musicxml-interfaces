var mxmltojson = require("./build/Release/mxmltojson")
var fs = require('fs');

fs.readFile( __dirname + '/../tests/01a.xml', function (err, data) {
    if (err) {
        throw err; 
    }
    var score = JSON.parse(mxmltojson.parseXML(data.toString()));
    if (score && score.error) {
        throw score.error;
    } else if (score && score.movementTitle === "Pitches and accidentals") {
        console.log("YAY! Looks like everything built correctly.");
    } else {
        throw "Could not extract title, but no error was reported.";
    }
});

