"use strict";
function printId1(id) {
    console.log('Your ID is: ' + id);
    // 报错 Property toUpperCase does not exist on type string | number
    // Property toUpperCase does not exist on type number
    // console.log(id.toUpperCase())
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id);
    }
}
printId1(101);
printId1('202');
// 报错Argument of type { MyId: number; } is not assignable to parameter of type string | number
// printId({MyId: 123456})
function welcomePeople(x) {
    if (Array.isArray(x)) {
        console.log('Hello, ' + x.join(' and '));
    }
    else {
        console.log('Welcome lone traveler' + x);
    }
}
welcomePeople('A');
welcomePeople(['a', 'b']);
function getFirstThree(x) {
    return x.slice(0, 3);
}
console.log(getFirstThree('bcdedit'));
console.log(getFirstThree([2, 3, 4, 5, 6]));
