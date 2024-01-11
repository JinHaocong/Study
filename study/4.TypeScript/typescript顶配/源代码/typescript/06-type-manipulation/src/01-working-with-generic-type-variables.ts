// sign 泛型-使用通用类型变量

// 身份函数 输入什么返回什么
function loggingIdentity<Type>(arg: Array<Type>): Type[] {
    console.log(arg.length)
    return arg
}

loggingIdentity([100, 200])
loggingIdentity<number>([100, 200])
loggingIdentity<string>(['100', '200'])
