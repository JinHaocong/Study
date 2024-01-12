// sign 泛型-使用通用类型变量

// 身份函数 输入什么返回什么
function loggingIdentity<Type>(arg: Array<Type>): Type[] {
    console.log(arg)
    return arg
}

loggingIdentity([100, 200])
loggingIdentity<number>([100, 200])
loggingIdentity<string>(['100', '200'])


function loggingIdentity1<Type>(arg: Type): Type {
    // error Property length does not exist on type Type
    // console.log(arg.length)
    return arg
}

interface Lengthwise {
    length: number;
}

function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length);
    return arg;
}

loggingIdentity2('aaa')

