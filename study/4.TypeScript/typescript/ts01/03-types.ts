let a: number;

// 可以直接使用字面量进行类型声明 比如 1 '11' 'aa'
let b: "aa"; // 也就是说值只能为aa了 类似于常量
b = 'aa'; // 很少使用
// b = '111';

let c: 'male' | 'female'; // | 表示或的意思 可以在这几个值之间取一个值
// 也可以是用来连接几个不同类型
c = 'male';
c = 'female';

let d: string | number | object; // 连接多个类型 也就是叫做 联合类型
d = {};
d = 1;
d = '11';

// any类型   表示任意类型 可以通过编译阶段
// 一个变量的类型为any 相当于对该变量关闭了ts的类型检测
let e: any; // 使用阶段不建议使用any类型  不声明类型，默认就是any 例如 let e;
e = 1;
e = '22';
e = false;
e = {};
//声明变量如果不指定类型，则ts解析器会自动判断变量的类型为any
let f;  // 类型为any（隐式any）
let ff = 1; // 类型为number 声明的时候不指定类型但是赋值了，自动变成该赋值的类型

// unknown 未知类型
let g: unknown; // 效果和any类型看起来一样
g = 1;
g = '11';
// g = {};
// 这里声明一个变量 gg 字符串类型
let gg: string;
// 将f变量赋值给 变量 gg
f = 1;
gg = f;// 不会报错，any类型可以赋值给任意类型的变量  把gg的类型检测也关了
// gg = 1; // 这里会报错 可能是这个被修复了

// 将g 赋值给变量gg
// gg = g; //报错了 赋值的时候看类型了，这个会检测 g的类型为unknown gg的类型为string
//将未知的类型往已知的类型赋值会发生错误

// unknown 实际上就是一个类型安全的any
// unknown类型的变量不能直接赋值给其他变量
// 解决方式 1：
if (typeof g === 'string') {
    gg = g;   //  可以理解为欺骗编辑器
}
// 方式二 类型断言
// 可以用来告诉解析器变量的实际类型 编译器不知道什么类型，但是我们知道，可以手动让编译器知道
/*
语法 ：
    1. 变量 as 类型;
    2. <类型> 变量;
 */
gg = g as string;
// 类型断言也可以这样写 在变量前面加上 <类型>变量;
gg = <string>g;

function fn(): boolean {
    return false; // 类型为boolean
}

function fnn() {
    return true; // 类型也是boolean
}

function aaa() {
    // 类型为void
}

function assa(nums: number) { // 类型为 number(11) | string('哈哈')
    if (nums > 10) {
        return 11;
    } else {
        return '哈哈';
    }
}

// 没有返回值的函数，使用void
function aasa(): void {
    // 类型为void
    // return 1; // 有返回值报错
    return;// return 或者 return null 都是表示空 不会报错
}

// never 表示永远不会返回结果
// void是没有返回值的意思，但是可以这么认为，没有返回值也是一种返回值
// 一般这种方法可以用来抛出异常
function fn2(): never {
    //
    throw new Error();
}



