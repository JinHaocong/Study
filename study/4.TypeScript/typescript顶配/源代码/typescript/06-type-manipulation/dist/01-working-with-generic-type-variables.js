"use strict";
// sign 泛型-使用通用类型变量
// 身份函数 输入什么返回什么
function loggingIdentity(arg) {
    console.log(arg);
    return arg;
}
loggingIdentity([100, 200]);
loggingIdentity([100, 200]);
loggingIdentity(['100', '200']);
function loggingIdentity1(arg) {
    // error Property length does not exist on type Type
    // console.log(arg.length)
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity2('aaa');
