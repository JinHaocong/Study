"use strict";
let x2 = undefined;
let y = null;
console.log(x2, y);
// 报错 Type undefined is not assignable to type string
// let z: string = undefined
function doSomething(x) {
    if (x === null) {
        // 做一些事情
    }
    else {
        console.log('Hello, ' + x.toUpperCase());
    }
}
doSomething('aaa');
doSomething(null);
// 非空断言运算符（ ! 后缀）  。 ! 在任何表达式之后写入实际上是一种类型断言，即该值不是 null or undefined ：
// ！就是你确定了这个值肯定不是 null or undefined
function liveDangerously1(x) {
    console.log(x.toFixed(), '111');
}
// 什么也不传运行时还是会报错
// liveDangerously1()
// liveDangerously1(null)
liveDangerously1(555);
function liveDangerously(x) {
    console.log(x?.toFixed(), '111');
}
liveDangerously();
liveDangerously(555);
liveDangerously(null);
