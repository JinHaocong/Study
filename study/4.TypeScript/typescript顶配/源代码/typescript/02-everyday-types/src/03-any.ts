let obj: any = {
    x: 0
}


// 报错
// obj.foo()

// 运行报错
// obj()

obj.bar = 100
obj = 'hello'
const n: number = obj

// hello string
console.log(n, typeof obj)
