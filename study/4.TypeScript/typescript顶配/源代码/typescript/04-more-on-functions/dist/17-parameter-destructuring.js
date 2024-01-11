"use strict";
// sign 参数解构
function sum({ a, b, c }) {
    console.log(a + b + c);
}
sum({
    a: 10,
    b: 3,
    c: 9
});
