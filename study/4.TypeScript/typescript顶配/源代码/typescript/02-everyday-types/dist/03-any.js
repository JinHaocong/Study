"use strict";
let obj = {
    x: 0
};
// 报错
// obj.foo()
// 运行报错
// obj()
obj.bar = 100;
obj = 'hello';
const n = obj;
// hello string
console.log(n, typeof obj);
