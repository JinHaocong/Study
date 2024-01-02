// 属性的封装
class User {
    // 属性都改为私有的，外界无法直接访问
    /*
    *
    * 属性应该是不能让外界随意修改，那样数据不安全
    * 在属性前加上属性修饰符，不让用户修改属性
    * private 私有属性 有该属性修饰符，只能在类的内部才能进行修改
    * 可以在类中添加方法可以被外部访问 get方法获取，set 方法设置
    * */
    private _name: string;
    private _age: number;


    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value > 0) {
            this._age = value;
        } else {
            throw new Error('年龄不能小于0')
        }
    }
}

const user = new User('aa', 11);
// user.name = '1';
console.log(user.name)
console.log(user)
user.age = 1;

// 可以直接将属性的声明放到构造函数中，但是需要加上权限修饰符
class D {
    // 其实就是语法糖的写法
    constructor(public name: string, public age: number) {
        // this.name = name; // 已经不需要写了
    }
}

class E {
    constructor(private name: string) {
    }
}

console.log(new D('1', 2));
console.log(new E('222'))
