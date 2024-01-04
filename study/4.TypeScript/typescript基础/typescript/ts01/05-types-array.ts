{
    // 数组

    /*
        数组类型的声明：
        类型[]
        Array<类型>
     */

    //  一般数组都是存相同类型的值
    let a: string[]; // a 是一个数组，并且数组里面存的都是字符串
    a = ['1', '2'];
    console.log(a, 'a')

    // 表示数值类型的数组
    let b: number[];
    b = [1, 2, 3];
    console.log(b, 'b')

    // 数值类型的数组
    let c: Array<number>;
    c = [1, 2];
    console.log(c, 'c')

    // 字符串类型数组
    let h: Array<string>
    h = ['1', '2']
    console.log(h, 'h')

    /*
        元组，固定长度的数组，效率比较高
        语法：
        [类型，类型，...]
     */
    let d: [string, number];// 长度为2 第一个是字符串 第二个是数字
    d = ['1', 1];
    console.log(d, 'd')
    // d = [1,1];
    // d = ['1', 2, 3]

    //枚举 enum
    let e: { name: string, gender: string };
    e = {
        name: '毛毛',
        gender: '男' // 像这种属性的值都在一定范围内变化的，可以使用枚举
    };
    console.log(e.gender === '男', 'enum');
    // 枚举的使用
    let i: { name: string, gender: 0 | 1 };
    i = {name: '毛毛', gender: 1};// 1 表示男 0 表示女
    console.log(i.gender === 1, '0,1');

    // 枚举的定义
    enum Gender {
        Male, Female
    }

    console.log(Gender, 'gender')

    // 使用枚举类
    let f: { name: string, gender: Gender, otherGender: Gender };
    f = {name: '毛毛', gender: Gender.Male, otherGender: Gender.Female};// 0 表示男 1 表示女
    console.log(f.gender === Gender.Male, '枚举');

    // 两个类型可以使用 | 来连接  也可以使用 & 来连接（& 表示同时满足）
    let g: { name: string } & { age: number };// 表示g需要同时满足两个对象
    g = {name: '哈哈', age: 22};
    console.log(g, 'g')

    // 类型的别名
    let k: 1 | 2 | 3 | 4 | 5;
    k = 1
    console.log(k, 'k')

    type asa = 1 | 2 | 3 | 4 | 5;
    let l: asa;
    l = 5
    console.log(l, 'l')

    type myType = string | number;// 给string起一个别名，那么string和myType现在就等价了
    let s: myType;
    s = '111';
    console.log(s, 's')
    s = 555
    console.log(s, 's1')


    let z: number[]; // 数组z，元素都是数字
    z = [5]
    // z.push("1");
    z.push(1);
    console.log(z, 'z')

    let x: Array<string[]>;// 数组x，元素为字符串数组
    x = [['2']]
    x.push(['1']);
    console.log(x, 'x')

    // 元组 tuple 元组就是固定长度的数组
    let kq: [number, string];
    kq = [1, 'aaa'];
    console.log(kq, 'kq')

    let kl: [number] = [1];
    kl.push(3);
    kl.push(1);
    kl.push(1);
    console.log(kl)
}
