"use strict";
// sign 元组类型
function doSomething11(pair) {
    const a = pair[0];
    const b = pair[1];
    // error Tuple type [string, number] of length 2 has no element at index 2
    // const c = pair[2]
}
// error Argument of type [string, number, boolean] is not assignable to parameter of type [string, number]
// error Source has 3 element(s) but target allows only 2
// doSomething11(['hello', 42, true])
function doSomething22(stringHash) {
    const [inputString, hash] = stringHash;
}
function setCoordinate(data) {
    const [x, y, z] = data;
    console.log(data.length);
}
setCoordinate([3, 4]);
setCoordinate([3, 4, 5]);
function readButtonInput(...args) {
    const [name, version, ...input] = args;
    console.log(name);
    console.log(version);
    console.log(input);
}
readButtonInput('hello', 10.5, true, false, false);
