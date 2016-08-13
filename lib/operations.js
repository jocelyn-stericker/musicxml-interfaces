/**
 * This file has specs for the operations defined in the JSON0 OT Type spec.
 * https://github.com/ottypes/json0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following condition:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
"use strict";
var subtypes = [];
function invertComponent(cm) {
    var c = cm;
    var c_ = { p: c.p };
    // handle subtype ops
    if (c.t && subtypes[c.t]) {
        c_.t = c.t;
        c_.o = subtypes[c.t].invert(c.o);
    }
    if (c.si !== void 0) {
        c_.sd = c.si;
    }
    if (c.sd !== void 0) {
        c_.si = c.sd;
    }
    if (c.oi !== void 0) {
        c_.od = c.oi;
    }
    if (c.od !== void 0) {
        c_.oi = c.od;
    }
    if (c.li !== void 0) {
        c_.ld = c.li;
    }
    if (c.ld !== void 0) {
        c_.li = c.ld;
    }
    if (c.na !== void 0) {
        c_.na = -c.na;
    }
    if (c.lm !== void 0) {
        c_.lm = c.p[c.p.length - 1];
        c_.p = c.p.slice(0, c.p.length - 1).concat([c.lm]);
    }
    return c_;
}
function invert(ops) {
    return ops.slice().reverse().map(function (c) { return invertComponent(c); });
}
exports.invert = invert;
