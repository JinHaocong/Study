// sign 继承内置类型 'Array' 'Error' 'Map'

class MsgError11 extends Error {
    constructor(m: string) {
        super(m)

        // 明确的设置原型
        Object.setPrototypeOf(this, MsgError11.prototype)
    }

    sayHello() {
        return 'Hello ' + this.message
    }
}

const msgError11 = new MsgError11('hello')
console.log(msgError11.sayHello())
// error MsgError11: hello
// console.log(msgError11)


// sign
class MsgError extends Error {
    constructor(m: string) {
        super(m)

        // 明确的设置原型
        Object.setPrototypeOf(this, MsgError.prototype)
    }

    sayHello() {
        return 'hello ' + this.message
    }
}

const msgError = new MsgError('hello')

// 恒为true 'instanceof' 检查冗余: 'msgError' 具有类型 'MsgError' 或 'MsgError' 的继承者
console.log(msgError instanceof MsgError)
