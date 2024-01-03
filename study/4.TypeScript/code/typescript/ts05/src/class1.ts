// 定义一个类
// 对象中主要包含两个部分： 属性和方法
class Person {
    // 直接定义的属性是实例属性，需要通过new对象去访问，静态属性是通过类名进行访问的

    // 定义类属性，也叫静态属性 可以直接通过类名访问无需创建实例
    static gender: string = '男';

    // 静态只读属性
    static readonly niceName = '毛毛';

    // 定义实例属性 需要new实例来访问
    name: string = '毛';
    sex: number = 1

    // 如果在属性前面加上了readOnly ，这个属性就不能修改了,表示只读属性
    readonly age: number = 22;

    // 定义类方法
    static eat() {
        console.log("吃饭！！！！！")
    }

    // 定义实例方法
    sayHello() {
        console.log("哈哈哈你好！");
    }

    sum(a: number, b: number): number {
        return a + b;
    }

}

// 创建实例
const person = new Person()

// 通过实例访问实例属性
console.log(person.name, person.sex, 'name sex')

// 通过类直接访问静态属性（类属性）
console.log(Person.gender, 'gender')

// 普通静态属性是可以修改的
Person.gender = '2';
console.log(Person.gender, 'gender')
console.log(Person.niceName, 'niceName')

// 实例属性也是可以修改的
person.name = '金昊聪'
console.log(person.name, 'name')

// 只读的静态属性也不能修改了
// Person.niceName = ''
// person.age = 22;

console.log(Person, 'Person')
console.log(person, 'person')

// 实例方法
person.sayHello()
console.log(person.sum(6, 99))

// 类方法
Person.eat()
