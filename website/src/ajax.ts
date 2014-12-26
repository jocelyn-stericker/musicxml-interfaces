import _ = require("lodash");

var postJSON = function (verb: string, url: string, json: any,
        onload: (response: any, request: XMLHttpRequest) => void) {
    if (typeof XMLHttpRequest === "undefined") {
        return;
    }
    var request = new XMLHttpRequest();
    request.open(verb, url);
    if (json) {
        request.setRequestHeader("Content-Type", "application/json");
    }
    request.onload = function () {
        onload(JSON.parse(request.responseText), request);
    };
    request.onerror = function () {
        onload(null, <any>{ status: <any> undefined });
    };
    request.send(JSON.stringify(json));
};

var getJSON = function (url: string, onload: (response: any, request: XMLHttpRequest) => void) {
    if (typeof XMLHttpRequest === "undefined") {
        return;
    }
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () { onload(JSON.parse(request.responseText), request); };
    request.send();
};

var getText = function (url: string, onload: (response: any, request: XMLHttpRequest) => void) {
    if (typeof XMLHttpRequest === "undefined") {
        return;
    }
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () { onload(request.responseText, request); };
    request.send();
};

var methods = {
    postJSON: _.partial(postJSON, "POST"),
    putJSON: _.partial(postJSON, "PUT"),
    deleteJSON: _.partial(postJSON, "PUT"),
    getJSON: getJSON,
    getText: getText
};

export = methods;
