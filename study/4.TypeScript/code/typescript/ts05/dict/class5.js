"use strict";
// 抽象类
// 不允许抽象类直接创建对象
class A {
    constructor(name) {
        this.name = name;
    }
}
// new A('');
class B extends A {
    sayHello() {
    }
}
