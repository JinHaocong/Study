"use strict";
// sign 索引签名
class MyClass {
    constructor(key, value) {
        this.x = '大帅哥';
        this[key] = value;
    }
    check(s) {
        return this[s];
    }
}
const test06 = new MyClass('name', 'jhc');
console.log(test06);
console.log(test06.check('name'));
