{
    // object 表示一个对象
    let a: object; // 开发时用的少
    a = {}
    console.log(a, 'a1')
    a = function () {
    }; // 函数也是一个对象
    console.log(a, 'a2')

    let b: { name: string }; // 变量b 存储的也是一个对象
    // {属性名:属性类型。。。。} 指定对象类型，一般是同时指定对象包含哪些属性
    b = {name: '毛毛'};  // 结构必须一样
    console.log(b, 'b')
    let aw: { name: string, sex: '男' | '女' }
    // aw = {name:'',sex:''}
    aw = {name: '', sex: '女'}
    console.log(aw, 'aw')

    // 在属性名后加上一个 ?  表示这个属性是可选的
    let bb: { name: string, age?: number };
    bb = {name: '澳毛', age: 11}; // 属性名称必须和定义的一样
    console.log(bb, 'bb')
    bb = {name: '澳毛'};

    // 任意属性 [属性名:属性名的类型]:属性值类型（any表示任意了） elseName 可以写成任意   555 相当于 '555'
    let bbb: { name: string, [elseName: string]: any };
    bbb = {name: "毛毛", age: 22, gender: '男', 555: 'yest'};
    console.log(bbb, 'bbb')

    // 限制函数类型 设置函数结构的类型声明：
    let d: (a: number, b: number) => number; // 参数a b 都要是数字，返回值必须是数字

    d = function (a, b) {

        return a + b;
    }

    console.log(d(5, 6))
    console.log(d, 'd1')
}

