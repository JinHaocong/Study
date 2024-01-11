// sign 调用签名

type DescribableFunction = {
    description: string
    (someArg: number): boolean
}

function doSomething1(fn: DescribableFunction) {
    console.log(fn.description + ' returned ' + fn(6))
}

function fn1(n: number) {
    console.log(n)
    return true
}

fn1.description = 'hello'


doSomething1(fn1)
