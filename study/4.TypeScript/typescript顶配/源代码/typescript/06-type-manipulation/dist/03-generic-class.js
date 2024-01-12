"use strict";
// sign 泛型类
class GenericNumber {
    constructor(value, fn) {
        this.zeroValue = value;
        this.add = fn;
    }
}
let myGeneric031 = new GenericNumber(5, (x, y) => x + y);
myGeneric031.zeroValue = 0;
myGeneric031.add = function (x, y) {
    return x + y;
};
let myGeneric032 = new GenericNumber('jhc', (x, y) => x + y);
myGeneric032.zeroValue = '';
myGeneric032.add = function (x, y) {
    return x + y;
};
