// sign 泛型类

class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T

    constructor(value: T, fn: (x: T, y: T) => T) {
        this.zeroValue = value
        this.add = fn
    }
}

let myGeneric031 = new GenericNumber<number>(5, (x, y) => x + y)
myGeneric031.zeroValue = 0
myGeneric031.add = function (x, y) {
    return x + y
}

let myGeneric032 = new GenericNumber<string>('jhc', (x, y) => x + y)
myGeneric032.zeroValue = ''
myGeneric032.add = function (x, y) {
    return x + y
}
