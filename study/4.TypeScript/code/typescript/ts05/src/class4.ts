// super关键字
class Obj {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log("哈哈哈")
    }
}

class Stu extends Obj {
    age: number;

    constructor(name: string, age: number) {
        // 调用父类的构造方法
        super(name);
        this.age = age;
    }

    sayHello() {
        // super 表示直接父类，在类的方法中
        super.sayHello();
    }
}