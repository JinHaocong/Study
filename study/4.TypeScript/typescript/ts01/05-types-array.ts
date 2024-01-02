// 数组

/*
数组类型的声明：
    类型[]
    Array<类型>
 */

//  一般数组都是存相同类型的值
let a: string[]; // a 是一个数组，并且数组里面存的都是字符串
a = ['1', '2'];

// 表示数值类型的数组
let b: number[];
b = [1, 2, 3];
// 数值类型的数组
let c: Array<number>;
c = [1, 2];

/*
元组，固定长度的数组，效率比较高
    语法：
    [类型，类型，...]
 */
let d: [string, number];// 长度为2 第一个是字符串 第二个是数字
d = ['1', 1];
// d = [1,1];

//枚举 enum
let e: { name: string, gender: string };
e = {
    name: '毛毛',
    gender: '男' // 像这种属性的值都在一定范围内变化的，可以使用枚举
};
console.log(e.gender === '男');
// 枚举的使用
/*let f: { name: string, gender: 0 | 1 };
f = {name: '毛毛', gender: 1};// 1 表示男 0 表示女
console.log(f.gender === 1);*/

// 枚举的定义
enum Gender {
    Male, Female
}

// 使用枚举类
let f: { name: string, gender: Gender };
f = {name: '毛毛', gender: Gender.Male};// 0 表示男 1 表示女
console.log(f.gender === Gender.Male);

// 两个类型可以使用 | 来连接  也可以使用 & 来连接（& 表示同时满足）
let g: { name: string } & { age: number };// 表示g需要同时满足两个对象
g = {name: '哈哈', age: 22};

// 类型的别名
let k: 1 | 2 | 3 | 4 | 5;
type asa = 1 | 2 | 3 | 4 | 5;
let l: asa;
type myType = string;// 给string起一个别名，那么string和myType现在就等价了
let s: myType;
s = '111';


let z: number[]; // 数组z，元素都是数字
// z.push("1");
// z.push(1);
let x: Array<string[]>;// 数组x，元素为字符串数组
// x.push(['1']);

// 元组 tuple 元组就是固定长度的数组
let kq:[number,string];
kq = [1,'aaa'];
let kl:[number] = [1];
kl.push(3);
kl.push(1);
kl.push(1);
console.log(kl)





