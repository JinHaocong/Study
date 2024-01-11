"use strict";
// sign 泛型函数 指定类型参数
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
const arr1 = combine(["string"], [1, 2, 3]);
console.log(arr1);
const arr2 = combine(["string"], [{ a: 1 }, { b: 2 }]);
console.log(arr2);
