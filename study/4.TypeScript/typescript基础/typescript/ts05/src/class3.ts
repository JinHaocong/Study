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
/**
 * @class Animal
 * @param {string} name - The name of the animal.
 * @param {number} age - The age of the animal.
 */
class Animal {

    name: string
    age: number;

    // 私有属性在子类中无法直接访问
    private test: string = '123123'

    /**
     * Creates a new Animal instance.
     * @param {string} name - The name of the animal.
     * @param {number} age - The age of the animal.
     */
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    /**
     * Prints "Animal says hello" to the console.
     */
    sayHello() {
        console.log("Animal says hello");
    }

    run() {
        console.log(this.name + '在跑~~~~~')
    }

    logTest(): void {
        console.log(this.test);
    }
}

/**
 * @class Dog
 * @extends Animal
 */
class Dog extends Animal {
    /*
        * 此时，animal被称为父类，dog被称为子类
        * 使用继承后，子类将会用于父类所有的方法和属性（方法和属性都是静态和实例属性）,方法和属性不能是私有的
        * 子类是可以添加父类没有的方法和属性
        * 如果子类添加了和父类同名的方法，就会覆盖掉父类的方法，叫做方法的重写
    */

    // 方法重写
    sayHello() {
        console.log("汪汪汪！");
    }
}

/**
 * @class Cat
 * @extends Animal
 */
class Cat extends Animal {

    sayHello() {
        console.log('喵喵喵！')
    }

    logThis(): void {
        console.log(this, 'Cat this')
    }
}


const dog = new Dog('旺财', 22);
console.log(dog, 'dog');
dog.sayHello();
dog.run()

const cat = new Cat('咪咪', 11);
console.log(cat, 'cat');
cat.sayHello()
cat.logThis()
cat.run()

// 多态
let animal = new Dog('小狗狗', 22);
console.log('--------------------');
console.log(animal);
animal.sayHello()
animal.run()
