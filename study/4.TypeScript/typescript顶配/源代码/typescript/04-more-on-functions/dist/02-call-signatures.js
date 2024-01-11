"use strict";
// sign 调用签名
function doSomething1(fn) {
    console.log(fn.description + ' returned ' + fn(6));
}
function fn1(n) {
    console.log(n);
    return true;
}
fn1.description = 'hello';
doSomething1(fn1);
