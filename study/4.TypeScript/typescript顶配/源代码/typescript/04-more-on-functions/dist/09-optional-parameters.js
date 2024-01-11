"use strict";
// sign 可选参数
function fnn(n = 100) {
    console.log(n.toFixed());
    console.log(n.toFixed(3));
}
fnn(123.45);
fnn();
function fTest(n) {
    // ? 为可选链操作符,它表示如果 n 不为 null 或 undefined，则调用 toFixed 方法。
    // ? 如果 n 为 null 或 undefined，则整个表达式的结果为 undefined，并且不会引发错误
    console.log(n === null || n === void 0 ? void 0 : n.toFixed());
    // ! 为非控断言 表示 n必定存在  实际上可能不存在 会报错
    console.log(n.toFixed());
}
fTest(123.45);
fTest();
