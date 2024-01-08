// // 你好，世界
// console.log('Hello World')

function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date}.`)
}

greet('小锋', new Date())

let msg = 'hello there!'
msg = 'hello world'
console.log(msg, 'msg')
// msg = 100  报错


// "strict":"strictNullChecks" 下不报错
// let surname: string = undefined
// let age: number = null
//
// console.log(surname, age)
