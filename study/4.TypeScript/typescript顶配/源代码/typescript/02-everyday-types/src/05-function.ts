function greet(name: string): void {
    console.log("Hello, " + name.toUpperCase() + '!!')
}

greet('jhc')
// 报错
// greet(555)

//
function getFavoriteNumber(val: number): number {
    return val
}

console.log(getFavoriteNumber(555))

// 匿名函数   函数上下文类型
const names: Array<string> = ['小千', '小锋', '小猿']
names.forEach(function (s: string): void {
    console.log(s.toUpperCase())
})
names.forEach((s) => {
    console.log(s.toUpperCase())
})
