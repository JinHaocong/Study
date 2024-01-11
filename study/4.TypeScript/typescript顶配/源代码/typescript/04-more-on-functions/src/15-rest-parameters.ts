// sign 需要了解的其他类型

// sign void
// 表示没有任何返回语句 或返回语句中没有明确的返回值
function returnVoid() {
    return
}

returnVoid()

// sign object
// 基元类型包括 string number boolean null undefined bigint symbol
// object 是指任何不是基元类型的值  不同于 { } 和 Object


// sign unknown
//  代表任何类型值 与any类似，但是比安全，因为对unknown值做任何事情都会报错，不合法的
function test1(a: any) {
    a.b()
}


function test2(a: unknown) {
    // error  a is of type unknown
    // a.b()
}

// sign never
// 表示永远不会被观察到的值 抛出异常 终止运行 死循环 类型缩小
function fail(msg: string): never {
    throw new Error(msg)
}

// sign Function
// 例如 bind call apply 即 Function 类型值总是可以被调用，返回类型为any
// es会报错  不要使用' Function '作为类型。' Function '类型接受任何类函数值。它在调用函数时不提供类型安全，这可能是bug的常见来源
function doSomething(f: Function) {
    return f(1, 2, 3)
}
