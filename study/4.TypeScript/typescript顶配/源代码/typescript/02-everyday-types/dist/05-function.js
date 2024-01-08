"use strict";
function greet(name) {
    console.log("Hello, " + name.toUpperCase() + '!!');
}
greet('jhc');
// 报错
// greet(555)
//
function getFavoriteNumber(val) {
    return val;
}
console.log(getFavoriteNumber(555));
// 匿名函数   函数上下文类型
const names = ['小千', '小锋', '小猿'];
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
names.forEach((s) => {
    console.log(s.toUpperCase());
});
