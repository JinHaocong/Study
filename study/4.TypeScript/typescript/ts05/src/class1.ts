// 定义一个类
// 对象中主要包含两个部分： 属性和方法
class Person {
    // 直接定义的属性是实例属性，需要通过new对象去访问，静态属性是通过类名进行访问的
    // 定义实例属性
    name: string = '毛';
    // 如果在属性前面加上了readOnly ，这个属性就不能修改了,表示只读属性
    readonly age: number = 22;
    // 定义类属性，也叫静态属性
    static gender: string = '男';
    // 静态只读属性
    static readonly niceName = '毛毛';

    // 定义实例方法
    sayHello(){
        console.log("哈哈哈你好！");
    }
    // 定义类方法
    static eat(){
        console.log("吃饭！！！！！")
    }

}

const person = new Person()
console.log(person)
// person.age = 22;
// console.log(person)
console.log(Person.gender)
// 普通静态属性是可以修改的
// Person.gender = '2';
// console.log(Person.gender)

// 只读的静态属性也不能修改了
// Person.niceName = ''

person.sayHello()
Person.eat()
