"use strict";
// sign 条件类型
const exp1 = 555;
const exp2 = '555';
function createLabel101(nameOrId) {
    throw '';
}
function createLabel(idOrName) {
    throw '';
}
// type a101 = NameLabel
let a101 = createLabel('typescript');
// type b101 = IdLabel
let b101 = createLabel(2.8);
// type c101 = NameLabel | IdLabel
let c101 = createLabel(Math.random() > 0.5 ? 'hello' : 42);
