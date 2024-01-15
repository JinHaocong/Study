"use strict";
// sign 构造器
class Point03 {
    // 不能有返回类型注释
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
const p = new Point03();
console.log(p.x);
console.log(p.y);
class Base {
    constructor() {
        this.k = 4;
    }
}
class Derived extends Base {
    constructor() {
        // 派生的构造函数必须包含super
        super();
        console.log(this.k);
    }
}
const b03 = new Derived();
