"use strict";
// sign 函数类型表达式
function greeter(fn) {
    fn('Hello, World');
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
