"use strict";
// sign 泛型函数 类型推断
function firstElement3(arr) {
    return 100;
}
firstElement3(['a', 'b', 'c']);
// 泛型函数
function firstElement4(arr) {
    console.log(arr[0]);
    return arr[0];
}
firstElement4(['a', 'b', 'c']);
// firstElement4<string>(['a', 'b', 'c'])
firstElement4([1, 2, 3]);
// firstElement4<number>([1, 2, 3])
firstElement4([]);
// firstElement4<undefined>([])
function map(arr, func) {
    return arr.map(func);
}
const parsed = map(['1', '2', '3'], (n) => Number(n));
console.log(parsed);
