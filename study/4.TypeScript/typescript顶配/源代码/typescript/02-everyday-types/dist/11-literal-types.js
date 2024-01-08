"use strict";
let testString = 'Hello World';
testString = '千锋大前端';
const constantString = 'Hello World';
console.log(constantString);
// 报错 Cannot assign to constantString because it is a constant.
// constantString = ''
let x1 = 'hello';
// 报错 Type "world" is not assignable to type "hello"
// x1 = 'world'
function printText(s, alignment) {
    console.log(s, alignment);
}
printText('hello', 'left');
// 报错  Argument of type "center2" is not assignable to parameter of type "left" | "right" | "center"
// printText('world', 'center2')
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
console.log(compare('5', '6'));
function configure(x) {
}
configure({
    width: 100
});
configure('auto');
// 报错 Argument of type "automatic" is not assignable to parameter of type Options | "auto"
// configure('automatic')
let b1 = true;
let b2 = false;
console.log(b1, b2);
const obj1 = {
    count: 0
};
obj1.count = 1;
console.log(obj1);
function handleRequest(url, method) {
    console.log(url, method);
}
// 表示“我打算 req.method 始终拥有文字类型 "GET" ”，从而防止之后可能分配 "GUESS" 给该字段。
const req = {
    url: 'https://example.com',
    method: 'GET',
};
handleRequest(req.url, req.method);
// 以使用 as const 将整个对象转换为类型文字：
// 使用 as const后，req1中的url和method属性会被视为不可变的字面量类型，而不是普通的字符串类型。
const req1 = {
    url: 'https://example.com',
    method: 'GET'
};
handleRequest(req1.url, req1.method);
