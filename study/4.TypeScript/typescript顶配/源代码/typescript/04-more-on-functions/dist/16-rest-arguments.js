"use strict";
// sign 函数的参数展开运算符
// sign 形参展开
function multiply(a, ...m) {
    return m.map(x => a * x);
}
console.log(multiply(2, 2, 5, 4, 6));
// sign 实参展开
const arr111 = [1, 2, 3];
const arr222 = [4, 5, 6];
arr111.push(...arr222);
console.log(arr111);
// Math.atan2(y, x) 返回的是 arctan(y/x) 的值
const args1 = [8, 5];
// error A spread argument must either have a tuple type or be passed to a rest parameter.
// Math.atan2 接受两个独立的参数，而 args1 被推断成是一个数值数组，元素数量是不固定的，不一定就是两个，所以会报错
// const angle1 = Math.atan2(...args1)
// as const 语法，将数组 args 的类型标记为一个只读（readonly）元组类型。这意味着该数组的元素将被视为常量，不可更改。
// 由于 args 现在被视为只读元组，TypeScript 知道它的长度是固定的，因此它可以正确地将元组的元素解构为两个独立的参数。
const args = [8, 5];
const angle = Math.atan2(...args);
console.log(angle, 'angle');
