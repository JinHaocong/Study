// 属性的封装
/**
 * @class User
 * @classdesc 封装属性
 * @param {string} name 用户名
 * @param {number} age 年龄
 */
class User {
    public gender: string

    // 属性都改为私有的，外界无法直接访问
    /**
     * @constructor
     * @param {string} name 用户名
     * @param {number} age 年龄
     * @param {gender} gender 性别
     */
    constructor(name: string, age: number, gender: string) {
        this._name = name;
        this._age = age;
        this.gender = gender;
    }

    private _name: string;

    /*
        * 属性应该是不能让外界随意修改，那样数据不安全
        * 在属性前加上属性修饰符，不让用户修改属性
        * private 私有属性 有该属性修饰符，只能在当前类的内部才能进行修改
        * public 属性可以在任意地方访问，修改
        * 可以在类中添加方法可以被外部访问 get方法获取，set 方法设置
    */

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _age: number;

    get age(): number {
        return this._age;
    }

    /**
     * Sets the age of the user.
     * @param {number} value The new age of the user.
     * @throws {Error} If the age is less than or equal to zero.
     */
    set age(value: number) {
        if (value > 0) {
            this._age = value;
        } else {
            throw new Error('Age cannot be less than or equal to zero');
        }
    }
}

const user = new User('aa', 11, '男');
console.log(user, 'user1');
user.name = '1';
console.log(user, 'user2')
user.age = 1;
console.log(user, 'user3')

// 抛出错误
try {
    user.age = -69
} catch (err) {
    console.log(err);
}

// 可以直接将属性的声明放到构造函数中，但是需要加上权限修饰符
/**
 * @class D
 * @classdesc A class with a private constructor
 * @param {string} name The name of the object
 */
class D {

    /**
     * Creates a new instance of D
     * @param {string} name The name of the object
     * @param {age} age The age of the object
     * @param {sex} sex The sex of the object
     */
    constructor(public name: string, public age: number, protected sex: string) {
        console.log(this, 'this')
    }
}

/**
 * @class E
 * @classdesc A class with a private constructor
 * @param {string} name The name of the object
 */
class E {
    /**
     * Creates a new instance of E
     * @param {string} name The name of the object
     */
    constructor(private name: string) {
        console.log(this.name)
    }
}

class H extends D {
    test() {
        // 不可访问
        // console.log(this.name)

        // protected 在类中可以访问 外面不可访问
        console.log(this.sex)
    }
}

const fff = new H('jhc', 23, '男')
fff.test()

console.log(new D('1', 2, '男'));
console.log(new E('222'))
