"use strict";
// sign 类表达式 不需要名字
const someClass = class {
    constructor(value) {
        this.content = value;
    }
};
const m = new someClass('hello');
console.log(m.content);
