"use strict";
// 属性的封装
class User {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value > 0) {
            this._age = value;
        }
        else {
            throw new Error('年龄不能小于0');
        }
    }
}
const user = new User('aa', 11);
// user.name = '1';
console.log(user.name);
console.log(user);
user.age = 1;
// 可以直接将属性的声明放到构造函数中，但是需要加上权限修饰符
class D {
    // 其实就是语法糖的写法
    constructor(name, age) {
        this.name = name;
        this.age = age;
        // this.name = name; // 已经不需要写了
    }
}
class E {
    constructor(name) {
        this.name = name;
    }
}
console.log(new D('1', 2));
console.log(new E('222'));
