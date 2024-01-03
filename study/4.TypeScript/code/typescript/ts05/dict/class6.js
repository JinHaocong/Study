"use strict";
let o1;
o1 = { name: 'jhc', age: 11 };
o1.gender = '男';
console.log(o1, 'o1');
const obj = { name: "嘻嘻嘻", age: 23, gender: 'female', sex: '男' };
console.log(obj, 'obj');
// 定义类实现接口，需要满足接口中的要求
/**
 * A class that implements the myInter interface.
 * @implements {myInter}
 */
class C {
    /**
     * Creates an instance of the C class.
     * @param {string} name The name of the instance.
     * @param {number} age The age of the instance.
     */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    /**
     * An abstract method that must be implemented by subclasses.
     */
    say() {
        console.log(this, 'this');
    }
}
const cc = new C('jhc', 23);
cc.say();
