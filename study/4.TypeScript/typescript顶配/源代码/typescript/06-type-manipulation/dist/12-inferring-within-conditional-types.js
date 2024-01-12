"use strict";
// sign 在条件类型中进行推理
let num = 100;
let str = '';
let books = [true, false];
let nev = 'error';
function stringOrNum(x) {
    return Math.random() > 0.5 ? 'hello' : 23;
}
