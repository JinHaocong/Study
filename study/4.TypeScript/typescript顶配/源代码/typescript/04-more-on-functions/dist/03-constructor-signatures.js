"use strict";
// sign 构造签名
class Ctor {
    constructor(s) {
        this.s = s;
    }
}
function fn4(ctor) {
    return new ctor('hello');
}
const f = fn4(Ctor);
console.log(f.s);
function fn2(dateType) {
    let d = new dateType('2021-12-20');
    let n = dateType(100);
    console.log(d, n);
}
