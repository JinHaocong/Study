// 构造方法

class Student {
    // 实例属性
    name: string;
    age: number;

    // 构造函数，会在对象创建的时候调用，也就是new的时候
    constructor(name: string, age: number) {
        // 在实例方法中，this 表示当前的实例
        // 在构造函数中，当前new的对象就是这个this指向的对象
        this.name = name;
        this.age = age;
    }

    show() {
        // 那个实例调用这个方法，这个this就执行那个对象实例
        console.log(this.name + '-------' + this.age)
    }

}

const p1 = new Student('毛', 22);
const p2 = new Student('毛俊', 12);
console.log(p1);
console.log(p2);
p1.show()