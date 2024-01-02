"use strict";
// super关键字
class Obj {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log("哈哈哈");
    }
}
class Stu extends Obj {
    constructor(name, age) {
        // 调用父类的构造方法
        super(name);
        this.age = age;
    }
    sayHello() {
        // super 表示直接父类，在类的方法中
        super.sayHello();
    }
}
