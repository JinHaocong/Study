// sign 泛型函数 指定类型参数

function combine<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.concat(arr2)
}

const arr1 = combine<string | number>(["string"], [1, 2, 3])
console.log(arr1)

const arr2 = combine<string | object>(["string"], [{a: 1}, {b: 2}])
console.log(arr2)
