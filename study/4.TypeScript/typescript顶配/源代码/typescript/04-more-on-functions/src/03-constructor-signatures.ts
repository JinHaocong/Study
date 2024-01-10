// 构造签名

class Ctor {
    s: string

    constructor(s: string) {
        this.s = s
    }
}

interface SomeConstructor {
    new(s: string): Ctor
}

function fn(ctor: SomeConstructor) {
    return new ctor('hello')
}

const f = fn(Ctor)
console.log(f.s)

interface CallOrConstructor {
    // 构造签名
    new(s: string): Date

    // 调用签名
    (n?: number): number
}

function fn2(dateType: CallOrConstructor) {
    let d = new dateType('2021-12-20')
    let n = dateType(100)
    console.log(d, n)
}







