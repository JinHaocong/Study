// 抽象类

// 不允许抽象类直接创建对象

// 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例


/**
 * 抽象类A
 * @class A
 * @abstract
 */
abstract class A {
    name: string;

    constructor(name: string) {
        this.name = name;
    }


    // 定义抽象方法
    // 抽象方法使用 abstract 开头，没有函数体
    // 抽象方法在继承子类中必须重写
    abstract sayHello(): string;
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
    sayHello(): string {
        return this.name + 'BBB'
    }
}


class F extends A {
    sayHello(): string {
        return this.name + 'CCC';
    }
}


const bb = new B('jhc');
console.log(bb.sayHello())

const ff = new F('jhc 嘻嘻嘻')
console.log(ff.sayHello())
