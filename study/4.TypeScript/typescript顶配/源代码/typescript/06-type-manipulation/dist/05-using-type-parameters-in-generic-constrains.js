"use strict";
// sign 在泛型约束中使用类型参数
// Key 是一个泛型参数，使用 keyof Type 约束，表示只能是 Type 类型的键。
function getProperty(obj, key) {
    console.log(obj[key]);
    return obj[key];
}
let x = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
getProperty(x, 'a');
// error Argument of type "m" is not assignable to parameter of type "a" | "b" | "c" | "d"
// getProperty(x, 'm')
