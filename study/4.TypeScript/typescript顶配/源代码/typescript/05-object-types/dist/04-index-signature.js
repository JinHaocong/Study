"use strict";
// sign 索引签名
const myArray = ['a', 'b'];
const secondItem = myArray[0];
let testString = {
    x: 100,
    y: 200,
    // error Type string is not assignable to type number
    // aaa: 'aaa'
};
let notOkay = {
    x: 100,
    length: 100,
    name: 'jhc'
};
let myArray2 = ['a', 'b'];
// error index signature in type ReadonlyStringArray only permits reading.
// myArray2[0] = 'felix'
