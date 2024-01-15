"use strict";
// sign 静态成员
class MyClass15 {
    static printX() {
        console.log(this.x);
    }
}
MyClass15.x = 0;
// error Property x is private and only accessible within class MyClass15
// console.log(MyClass15.x)
MyClass15.printX();
class Base15 {
    static getGreeting() {
        return 'hello world';
    }
}
class Derived15 extends Base15 {
    constructor() {
        super(...arguments);
        // 非静态属性要通过new一个实例才能访问
        this.myGreeting = Base15.getGreeting();
    }
}
// error  Property myGreeting does not exist on type typeof Derived15
// console.log(Derived15.myGreeting)
const derived15 = new Derived15();
console.log(derived15.myGreeting);
// sign
class S15 {
}
// name 为特殊名称
console.log(S15.name, 'name');
// sign ts中是没有静态类的
class MyStaticClass {
    static doSomething() {
    }
}
function doSomething() {
}
const MyHelperObject = {
    doSomething() {
    }
};
