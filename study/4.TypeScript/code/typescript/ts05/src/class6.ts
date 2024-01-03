// 描述一个对象的类型
type myType = {
    name: string;
    age: number;
    [elseName: string]: any
}
let o1: myType;
o1 = {name: 'jhc', age: 11};
o1.gender = '男'
console.log(o1, 'o1')


// 接口，用来定义一个类结构，用来定义一个类中应该包含哪些方法和属性
// 接口也可以当做类型声明去使用的。但是类型声明type只能用一次，也就是不能重名，接口跨域多次重复定义
interface myInterface {
    // 表示定义一个类的结构（对象的结构），必须有两个属性，name和age
    name: string;
    age: number;
}

interface myInterface {
    gender: string;

    [elseName: string]: any

    // 不能重复定义同一个属性
    // age:string;
}

const obj: myInterface = {name: "嘻嘻嘻", age: 23, gender: 'female', sex: '男'};
console.log(obj, 'obj')

/*
    * 接口在定义类的时候可以限制类结构
    * 接口中的属性都是不能有实际的值
    * 接口值定义对象的结构，不考虑实际值
    * 接口中的方法都是抽象方法
*/
interface myInter {
    name: string;

    say(): void;
}

// 定义类实现接口，需要满足接口中的要求
/**
 * A class that implements the myInter interface.
 * @implements {myInter}
 */
class C implements myInter {
    /**
     * The name property of the class.
     * @type {string}
     */
    name: string;

    /**
     * The age property of the class.
     * @type {number}
     */
    age: number;

    /**
     * Creates an instance of the C class.
     * @param {string} name The name of the instance.
     * @param {number} age The age of the instance.
     */
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    /**
     * An abstract method that must be implemented by subclasses.
     */
    say(): void {
        console.log(this, 'this')
    }
}


const cc = new C('jhc', 23);
cc.say()
