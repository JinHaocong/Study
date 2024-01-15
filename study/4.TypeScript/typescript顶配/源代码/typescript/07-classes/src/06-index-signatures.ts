// sign 索引签名

class MyClass {
    // 约束类中的属性 或函数
    [s: string]: string | ((s: string) => string)

    x = '大帅哥'


    constructor(key: string, value: string) {
        this[key] = value
    }

    check(s: string) {
        return this[s] as string
    }
}

const test06 = new MyClass('name', 'jhc')

console.log(test06)
console.log(test06.check('name'))
