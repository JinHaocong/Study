"use strict";
// sign 泛型函数 限制条件
// 用接口也可以
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
const longerArray = longest([1, 2], [2, 3, 4]);
console.log(longerArray);
const longerString = longest('haoCong', 'Jin');
console.log(longerString);
const test = longest({ length: 10, }, { length: 50 });
console.log(test);
// 报错 Argument of type number is not assignable to parameter of type hasLength 数字没有length属性
// const notOk = longest(10, 100)
