"use strict";
// 泛型
// function fn(a:any):any{
//
// }
// 在定义函数，或者类等的时候，如果遇到类型不明确的情况，
// 我们不建议使用any，建议使用泛型来定义不确定的类型
// <T>  定义了一个T泛型
function fn(a) {
    return a;
}
// 调用具有泛型的函数，方式一：用到了ts的类型自动推断
const f = fn(12);
// 方式二 直接指定我们需要使用什么类型
const b = fn(10);
function fnn(a, b) {
    return a;
}
const aa = fnn(10, '11');
// 泛型T需要是实现接口S的子类
function f1() {
}
