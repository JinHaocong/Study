// 继承


// 定义一个dog类
// class Dog {
//     name: string;
//     age: number;
//
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
//
//     sayHello() {
//         console.log("汪汪汪！")
//     }
// }
// 定义一个猫类
// class Cat{
//     name: string;
//     age: number;
//
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
//
//     sayHello() {
//         console.log("喵喵喵！")
//     }
// }

// 定一个动物类
class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log("动物叫！")
    }
}

// 定义dog类继承animal
class Dog extends Animal {
    /*
    * 此时，animal被称为父类，dog被称为子类
    * 使用继承后，子类将会用于父类所有的方法和属性（方法和属性都是静态和实例属性）,方法和属性不能是私有的
    * 子类是可以添加父类没有的方法和属性
    * */

    // 方法重写
    sayHello() {
        console.log("汪汪汪！");
    }
}

// 定义cat继承animal
class Cat extends Animal {

    sayHello() {
        console.log('喵喵喵！')
    }
}


const dog = new Dog('旺财', 22);
console.log(dog);
dog.sayHello();

const cat = new Cat('咪咪', 11);
console.log(cat);
cat.sayHello()

// 多态
let animal = new Dog('小狗狗', 22);
console.log('--------------------');
console.log(animal);
animal.sayHello()