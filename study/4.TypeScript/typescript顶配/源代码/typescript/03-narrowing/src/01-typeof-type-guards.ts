function printAll(str: string | string[] | null) {
    // 类型缩小了
    if (typeof str === 'object' && str !== null) {
        for (const s of str) {
            console.log(s)
        }
    } else {
        console.log(str)
    }
}

printAll('a')
printAll(['1', '2', '3', '4', '5'])


function padLeft(padding: number | string, input: string) {
    // 类型缩小了
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}

console.log(padLeft(5, 'jhc'))
console.log(padLeft('xxx', 'jhc'))
