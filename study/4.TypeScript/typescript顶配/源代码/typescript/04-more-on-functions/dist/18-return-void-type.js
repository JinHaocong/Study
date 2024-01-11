"use strict";
// sign 函数void返回类型
const f1 = () => {
    return true;
};
const f2 = () => true;
const f3 = function () {
    return true;
};
const c1 = () => {
    return true;
};
const c2 = () => true;
const c3 = function () {
    return true;
};
const v1 = f1();
console.log(v1);
const v2 = f2();
console.log(v2);
const v3 = f3();
console.log(v3);
console.log('--------------------------------------------');
const g1 = c1();
console.log(g1);
const g2 = c2();
console.log(g2);
const g3 = c3();
console.log(g3);
// sign 当一个字面定义的函数定义有一个void返回类型时，该函数必须不返回任何东西
// 使用函数声明定义
// error Type boolean is not assignable to type void
// function f4(): void {
//     return true
// }
// error  Type boolean is not assignable to type void
// const f5 = function (): void {
//     return true
// }
