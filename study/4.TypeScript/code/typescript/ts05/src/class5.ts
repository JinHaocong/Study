// 抽象类
// 不允许抽象类直接创建对象
abstract class A {
    name: string;
    constructor(name:string) {
        this.name = name;
    }
    // 抽象类可以有抽象方法
    abstract sayHello():void; // 抽象方法的定义只能在抽象类和接口中
}
// new A('');

class B extends A{
    sayHello(): void {
    }
}