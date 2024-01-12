// sign 泛型约束

interface HasLength {
    length: number
}

function loggingIdentity04<T extends HasLength>(arg: T): T {
    console.log(arg.length)
    return arg
}

loggingIdentity04(['hello', 'world'])

// error Argument of type number is not assignable to parameter of type HasLength
// loggingIdentity04(111)
