/* tslint:disable */
/// <reference path="./typings/node/node.d.ts" />
import assert = require("assert");

function popFront(t: string) {
    t.slice(1);
    return t;
}

export interface AccOrText {
    acc?: AccidentalText;
    text?: DisplayText;
}

export interface TextArray extends Array<AccOrText> {}

export interface EncodingDate extends CalendarDate {}
