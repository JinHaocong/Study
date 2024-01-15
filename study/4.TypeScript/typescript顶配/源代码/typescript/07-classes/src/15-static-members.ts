// sign 静态成员

class MyClass15 {
    private static x = 0

    static printX() {
        console.log(this.x)
    }
}

// error Property x is private and only accessible within class MyClass15
// console.log(MyClass15.x)
MyClass15.printX()

class Base15 {
    static getGreeting() {
        return 'hello world'
    }
}

class Derived15 extends Base15 {
    // 非静态属性要通过new一个实例才能访问
    myGreeting = Base15.getGreeting()
}

// error  Property myGreeting does not exist on type typeof Derived15
// console.log(Derived15.myGreeting)
const derived15 = new Derived15()
console.log(derived15.myGreeting)


// sign
class S15 {
    // error 一些专有名字不要使用
    // error Static property name conflicts with built-in property 'Function.name' of constructor function S15
    // static name = "s"
}

// name 为特殊名称
console.log(S15.name, 'name')


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
}
