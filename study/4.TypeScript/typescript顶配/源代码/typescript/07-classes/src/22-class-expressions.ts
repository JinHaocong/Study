// sign 类表达式 不需要名字


const someClass = class<Type> {
    content: Type

    constructor(value: Type) {
        this.content = value
    }
}

const m = new someClass('hello')
console.log(m.content)
