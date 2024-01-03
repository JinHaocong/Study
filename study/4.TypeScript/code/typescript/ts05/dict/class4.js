"use strict";
// super关键字
/**
 * Obj类
 * @class Obj
 * @property {string} name
 * @constructor
 */
class Obj {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * sayHello
     * @function sayHello
     */
    sayHello() {
        console.log("哈哈哈");
    }
}
/**
 * Stu类
 * @class Stu
 * @property {number} age
 * @extends Obj
 * @constructor
 * @param {string} name
 * @param {number} age
 */
class Stu extends Obj {
    /**
     * Creates an instance of Stu.
     * @param {string} name
     * @param {number} age
     */
    constructor(name, age) {
        // 调用父类的构造方法
        super(name);
        this.age = age;
    }
    /**
     * 调用父类的 sayHello
     * @function sayHello
     */
    sayHello() {
        // super 表示直接父类，在类的方法中
        super.sayHello();
    }
}
const stu = new Stu('jhc', 23);
console.log(stu, 'stu');
stu.sayHello();
