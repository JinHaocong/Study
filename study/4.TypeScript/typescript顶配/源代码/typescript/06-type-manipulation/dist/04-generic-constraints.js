"use strict";
// sign 泛型约束
function loggingIdentity04(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity04(['hello', 'world']);
// error Argument of type number is not assignable to parameter of type HasLength
// loggingIdentity04(111)
