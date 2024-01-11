// sign 泛型函数 使用受限值

interface hasLength1 {
    length: number;
}

function minimumLength<T extends hasLength1>(data: T, minimum: number): T {
    if (data.length >= minimum) {
        return data
    } else {
        // 报错 返回值必须是 泛型 T 类型
        // return {length: minimum}

        // 这相当于告诉 TypeScript，“我知道这里的类型可能会有一些不确定性，但是我确定它是符合 T 的”。
        return [minimum] as unknown as T
    }
}

const arr = minimumLength([1, 2, 3], 6)
console.log(arr)

// 报错
console.log(arr.slice(0))
