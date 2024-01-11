// sign 函数类型表达式

type GreetFunction = (a: string) => void

function greeter(fn: GreetFunction) {
    fn('Hello, World')
}

function printToConsole(s: string) {
    console.log(s)
}

greeter(printToConsole)
