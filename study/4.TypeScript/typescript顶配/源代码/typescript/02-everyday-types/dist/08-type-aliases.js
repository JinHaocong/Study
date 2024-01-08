"use strict";
function printXY1(pt) {
    console.log(pt);
}
printXY1({
    x: 100,
    y: 200
});
function printId(id) {
    console.log(id);
}
printId(100);
printId('hello');
function sanitizedInput(str) {
    return str.slice(0, 2);
}
sanitizedInput('HELLO');
let userInput;
userInput = 'new Input';
