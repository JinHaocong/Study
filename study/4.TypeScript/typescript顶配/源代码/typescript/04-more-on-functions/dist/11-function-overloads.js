"use strict";
// sign 函数重载
// 函数主体 实现签名 实现函数必须跟重载签名的参数保持一致
function makeDate(mOrTimestamp, d, y) {
    if (d && y) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
console.log(d1, 'd1');
const d2 = makeDate(5, 6, 7);
console.log(d2, 'd2');
// 报错 No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
// const d3 = makeDate(5, 9)
