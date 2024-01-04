"use strict";
// 抽象类
// 不允许抽象类直接创建对象
// 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例
/**
 * 抽象类A
 * @class A
 * @abstract
 */
class A {
    constructor(name) {
        this.name = name;
    }
}
// new A('');
/**
 * @class B
 * @classdesc A child class of A
 * @extends A
 */
class B extends A {
    /**
     * @function B#sayHello
     * @description This method will print the name of the instance of B
     */
    sayHello() {
        return this.name + 'BBB';
    }
}
class F extends A {
    sayHello() {
        return this.name + 'CCC';
    }
}
const bb = new B('jhc');
console.log(bb.sayHello());
const ff = new F('jhc 嘻嘻嘻');
console.log(ff.sayHello());
