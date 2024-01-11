"use strict";
// sign 元组只读属性
function doSomething(pair) {
    // error  Cannot assign to 0 because it is a read-only property.
    // pair[0] = 100
}
let point = [3, 4];
function distanceFromOrigin([x, y]) {
    return Math.sqrt(x ** 2 + y ** 2);
}
// error Argument of type readonly [3, 4] is not assignable to parameter of type [number, number]
// error The type readonly [3, 4] is readonly and cannot be assigned to the mutable type [number, number]
// distanceFromOrigin(point)
function distanceFromOrigin1([x, y]) {
    return Math.sqrt(x ** 2 + y ** 2);
}
distanceFromOrigin1(point);
