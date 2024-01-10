"use strict";
// 控制流分析
function example() {
    let x;
    // let x: boolean
    x = Math.random() < 0.5;
    console.log(x);
    if (Math.random() < 0.5) {
        // x: string
        x = 'hello';
        console.log(x);
    }
    else {
        // x: number
        x = 100;
        console.log(x);
    }
    // string | number
    return x;
}
let x = example();
console.log(x);
x = 'hello';
console.log(x);
x = 100;
// 报错 Type boolean is not assignable to type string | number
// x = true
