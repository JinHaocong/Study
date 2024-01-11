"use strict";
// sign 泛型对象类型
let box = {
    contents: 'hello'
};
let x = {
    contents: 'hello world'
};
// error  x.contents is of type unknown
// console.log(x.contents.toLowerCase())
if (typeof x.contents === 'string') {
    console.log(x.contents.toLowerCase());
}
console.log(x.contents.toLowerCase());
function setContents(box, newContents) {
    box.contents = newContents;
}
function setContents2(box, newContents) {
    box.contents = newContents;
}
let boxA = {
    contents: 100
};
setContents2(boxA, 50);
let boxB = {
    contents: '100',
    // error Type number is not assignable to type string
    // contents: 100,
};
// step 创建 Apple 类型的对象 a：
let a = {
    test: 'jhc'
};
// step 创建 AppleBox 类型的对象 ab：
let ab = {
    contents: a,
};
