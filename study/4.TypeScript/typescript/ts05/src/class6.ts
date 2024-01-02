// 描述一个对象的类型
type myType = {
    name: string;
    age: number;
}
let o1: myType;
o1 = {name: '', age: 11};
// o1.gender = ''
// 接口，用来定义一个类结构，用来定义一个类中应该包含哪些方法和属性
// 接口也可以当做类型声明去使用的。但是类型声明type只能用一次，也就是不能重名，接口跨域多次重复定义
interface myInterface {
    // 表示定义一个类的结构（对象的结构），必须有两个属性，name和age
    name: string;
    age: number;
}

interface myInterface {
    // 表示定义一个类的结构（对象的结构），必须有两个属性，name和age
    gender: string;
    // 不能重复定义同一个属性
    // age:string;
}

/*
*
* 注意：接口中的属性都是不能有实际的值，接口中的方法都是抽象方法
* 接口值定义对象的结构，不考虑实际值
* */
interface myInter{
    name:string;
    say():void;
}
// 定义类实现接口，需要满足接口中的要求
class C implements myInter{
    name: string;
    age:number;
    constructor(name: string,age:number) {
        this.name = name;
        this.age = age;
    }

    say() {
    }

}

let o2: myInterface = {name: '', age: 11, gender: ''};