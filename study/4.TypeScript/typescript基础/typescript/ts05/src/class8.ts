// 泛型
// function fn(a:any):any{
//
// }

// 在定义函数，或者类等的时候，如果遇到类型不明确的情况，
// 我们不建议使用any，建议使用泛型来定义不确定的类型
// <T>  定义了一个T泛型
function fn<T>(a: T): T {
    return a;
}

// 方式一：直接调用具有泛型的函数，用到了ts的类型自动推断
const f = fn(12);
console.log(f, 'f')
const fuck = fn('fuck111')
console.log(fuck, 'fuck')

// 方式二 直接指定我们需要使用什么类型
const b = fn<number>(10);
console.log(b, 'b')
const c = fn<string>('jhc')
console.log(c, 'c')

function fnn<K, V>(a: K, b: V) {
    return `${a},${b}`;
}

const aa = fnn<number, string>(10, '11');
console.log(aa, 'aa')

interface S {
    length: number
}

function fn3<T extends S>(a: T): number {
    return a.length
}

fn3({length: 55})
fn3('444')

interface SS {
    name: string
}

interface SSS extends S, SS {
    age: number
}

console.log()

// 泛型T需要是实现接口S的子类
function f1<T extends SSS>(data: T): string {
    return `${data.name}--${data.age}--${data.length}`
}

const test = f1({name: 'jhc', age: 23, length: 18})

console.log(test)


class MyClass<T> {
    name: T;

    constructor(name: T) {
        this.name = name
    }

}

const mc = new MyClass('孙悟空')
const mc2 = new MyClass<number>(888)

console.log(mc)
console.log(mc2)
