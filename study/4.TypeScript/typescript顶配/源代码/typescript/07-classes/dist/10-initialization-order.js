"use strict";
// sign 初始化顺序
class Base10 {
    constructor() {
        this.name = 'base';
        console.log('My name is ' + this.name);
    }
}
class Derived10 extends Base10 {
    constructor() {
        super();
        this.name = 'derived';
        console.log(this.name);
    }
}
const d10 = new Derived10();
// sign 基类的字段被初始化
// sign 基类的构造函数运行
// sign 派生类的字段初始化
// sign 子类的构造函数运行
