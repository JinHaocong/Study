"use strict";
// sign 泛型函数 编写优秀通用函数的准则
// 1，可能的情况下，使用类型参数本身，而不是对其进行约束
// 2，总是尽可能少的使用类型参数
// 3，如果一个类型参数只能出现在一个地方，请重新考虑你是否真的需要她
// 类型参数下推  可能的情况下，使用类型参数本身，而不是对其进行约束
// firstElement1 要比 firstElement2 好
function firstElement1(arr) {
    return arr[0];
}
const a = firstElement1([1, 2, 3]);
console.log(a, 'a');
function firstElement2(arr) {
    return arr[0];
}
const b = firstElement2([1, 2, 3]);
console.log(b, 'b');
function filter1(arr, func) {
    return arr.filter(func);
}
console.log(filter1(['1', '2', null], (arg) => Boolean(arg)));
function filter2(arr, func) {
    return arr.filter(func);
}
console.log(filter2(['1', '2', null, undefined, false], (arg) => Boolean(arg)));
// greet2 比 greet 好
function greet(s) {
    console.log('Hello, ' + s);
}
greet('World');
function greet2(s) {
    console.log('Hello, ' + s);
}
greet2('World2');
