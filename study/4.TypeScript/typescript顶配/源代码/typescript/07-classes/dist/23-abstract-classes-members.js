"use strict";
// sign 抽象类和成员
//抽象类
class Base23 {
    // 具体方法
    printName() {
        console.log(this.getName());
    }
}
class Derived23 extends Base23 {
    getName() {
        return 'world';
    }
}
const b23 = new Derived23();
console.log(b23.getName(), 'getName');
b23.printName();
// sign 抽象构造签名
// new () => Base23 这是一个构造函数签名的类型定义。
// 它表示接受零个参数的构造函数，并且返回一个类型为 Base23 的实例。这样的构造函数可以创建 Base23 类或其子类的实例。
function greet(ctor) {
    const instance = new ctor();
    instance.printName();
}
greet(Derived23);
