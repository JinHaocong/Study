"use strict";
// sign 类方法
class Point04 {
    constructor() {
        this.x = 10;
        this.y = 10;
    }
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
}
const p04 = new Point04();
p04.scale(10);
console.log(p04.x);
console.log(p04.y);
// sign
let x = 0;
class C {
    constructor() {
        this.x = 'hello';
    }
    m() {
        // 为上面的x
        x = 100;
    }
}
