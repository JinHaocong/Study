# ES6新特性

## let，const关键字

let关键字用来声明变量，使用 let声明的变量有几个特点：

1. 不允许重复声明
2. 块儿级作用域
3. 不存在变量提升（不能在未定义之前使用）
4. 不影响作用域链

const 关键字用来声明常量， const声明有以下特点：

1. 声明必须赋初始值
2. 标识符一般为大写
3. 不允许重复声明
4. 值不允许修改
5. 块儿级作用域

## 变量的解构赋值

```js
//1. 数组的结构
const Hua = ['小花','刘花','赵花','宋花'];
let [xiao, liu, zhao, song] = Hua;
// 结构赋值完，可以直接使用
console.log(xiao);
console.log(liu);
console.log(zhao);
console.log(song);

//2. 对象的解构
const zhao = {
    name: '赵本山',
    age: '不详',
    xiaopin: function(){
        console.log("我可以演小品");
    }
};

let {name, age, xiaopin} = zhao;
console.log(name);
console.log(age);
console.log(xiaopin);
xiaopin();

let {xiaopin} = zhao;
xiaopin();

```

## 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识 ，特点：

1. 字符串中可以出现换行符
2. 可以使用 ${xxx} 形式输出变量

```js
// 定义字符串 
let str = `<ul>
			<li>沈腾</li> 
			<li>玛丽</li> 
			<li>魏翔</li> 
			<li>艾伦</li> 
		</ul>`;

// 变量拼接 
let star = '王宁'; 
let result = `${star}在前几年离开了开心麻花`;

```

## 简化对象写法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

key，value相同可以省略key

```js
let name = 'scorpios'; 
let slogon = '永远追求行业更高标准'; 
let improve = function () { 
    console.log('可以提高你的技能'); 
} 

//属性和方法简写 
let scorpios = { 
    name, 
    slogon, 
    improve, 
    change() { 
        console.log('可以改变你') 
    } 
};

```

## 箭头函数

ES6 允许使用 「 箭头 」（=>）定义函数 。箭头函数的写法，也就两种，省略小括号，省略大括号。

```js
// 1. 通用写法 
let fn = (arg1, arg2, arg3) => { 
    return arg1 + arg2 + arg3; 
}

```

箭头函数的注意点：

1. 如果形参只有一个，则小括号可以省略（省略小括号）
2. 函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的执行结果（省略大括号）
3. 箭头函数 this指向声明时所在作用域下 this 的值
4. 箭头函数不能作为构造函数实例化
5. 不能使用 arguments

```js
// 2. 省略小括号的情况
let fn2 = num => { 
    return num * 10; 
}; 

// 3. 省略花括号的情况，函数的返回值为该条语句的执行结果
let fn3 = score => score * 20; 

//4. this指向声明时所在作用域中 this 的值
let fn4 = () => { 
    console.log(this); 
}

let school = { 
    name: 'scorpios', 
    getName(){ 
        let fn5 = () => { 
            console.log(this); 
        } 
        fn5(); 
    } 
};

```

## rest参数

ES6引入 rest参数，args是个数组，用于获取函数的实参，用来代替 arguments

```js
// 作用与 arguments 类似 
function add(...args){ 
    console.log(args); 
} 
add(1,2,3,4,5); 

// rest 参数必须是最后一个形参
function minus(a,b,...args){ 
    console.log(a,b,args); 
} 
minus(100,1,2,3,4,5,19);

```

## 扩展运算符 ...

就是将数组转变为字符串。又称展开操作符，可以将可迭代的（Iterable）对象展开。

```js
// 展开数组 
let tfboys = ['德玛西亚之力','德玛西亚之翼','德玛西亚皇子']; 
function fn(){ 
    console.log(arguments); 
} 
fn(...tfboys) 

// 展开对象 
let skillOne = { q: '致命打击', }; 
let skillTwo = { w: '勇气' }; 
let skillThree = { e: '审判' }; 
let skillFour = { r: '德玛西亚正义' }; 
let gailun = {
    ...skillOne, 
    ...skillTwo,
    ...skillThree,
    ...skillFour
};

```

Spread操作符可以展开Iterable的对象，所以除数组外， Set Map Generator等也可以使用。

```js
var map=new Map();
map.set("x",1);
map.set("y",2);
var arr=[...map];    // [["x",1],["y",2]]
 
var set = new Set();
set.add(1);
set.add(2);
set.add(1);
set.add(3);
var arr = [...set];  //[1, 2, 3]
 
function *myGen() {
  yield "hello";
  yield "world";
}
var arr = [...myGen()]; //["hello", "world"]

```

展开运算符的应用

```js
//1. 数组的合并
const kuaizi = ['王太利','肖央'];
const fenghuang = ['曾毅','玲花'];
const zuixuanxiaopingguo = kuaizi.concat(fenghuang);// 数组方式
const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
console.log(zuixuanxiaopingguo);

//2. 数组的克隆
const sanzhihua = ['E','G','M'];
const sanyecao = [...sanzhihua];//  ['E','G','M']
console.log(sanyecao);

//3. 将伪数组转为真正的数组
const divs = document.querySelectorAll('div');
const divArr = [...divs];
console.log(divArr);// arguments  

```

## Symbol数据类型

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

Symbol使用场景： 给对象添加属性和方法

Symbol特点：

Symbol的值是唯一的，用来解决命名冲突的问题
Symbol值不能与其他数据进行运算
Symbol定义的对象属性不能使用 for…in循环遍历，但是可以使用**Reflect.ownKeys**来获取对象的所有键名

```js
//创建 Symbol 
let s1 = Symbol(); 
console.log(s1, typeof s1); 

//添加标识的 Symbol 
let s2 = Symbol('scorpios'); 
let s2_2 = Symbol('scorpios'); 
console.log(s2 === s2_2); // false

//使用 Symbol for 定义 
let s3 = Symbol.for('scorpios');
let s3_2 = Symbol.for('scorpios'); 
console.log(s3 === s3_2); // true

```

## 迭代器

遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作 。

ES6创造了一种新的遍历命令 for…of循环， Iterator接口主要供 for…of消费

原生具备 iterator接口的数据 (可用 for of遍历 )

```js
a) Array
b) Arguments
c) Set
d) Map
e) String
f) TypedArray
g) NodeList

```

工作原理

a). 创建一个指针对象，指向当前数据结构的起始位置
b). 第一次调用对象的 next方法，指针自动指向数据结构的第一个成员
c). 接下来不断调用 next方法，指针一直往后移动，直到指向最后一个成员
d). 每调用 next方法返回一个包含 value和 done属性的对象

```js
//声明一个数组
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];

//使用 for...of 遍历数组
for(let v of xiyou){
   console.log(v);
}

```

## 生成器

生成器其实就是一个特殊的函数。生成器函数是 ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。

```js
function * gen(){ 
    yield '一只没有耳朵'; 
    yield '一只没有尾巴'; 
    return '真奇怪'; 
} 

let iterator = gen(); 
console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next());

```

代码说明：

1. *的位置没有限制
2. 生成器函数返回的结果是迭代器对象，调用迭代器对象的 next方法可以得到yield语句后的值
3. yield相当于函数的暂停标记，也可以认为是函数的分隔符，每调用一次 next方法，执行一段代码
4. next方法可以传递实参，作为 yield语句的返回值

## Promise

Promise是 ES6引入的异步编程的新解决方案 。语法上 Promise是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。

Promise构造函数 : Promise (excutor) {}
Promise.prototype.then方法
Promise.prototype.catch独享守卫:

```js
 //实例化 Promise 对象，成功是resolve，失败是reject
const p = new Promise(function(resolve, reject){
    setTimeout(function(){
        // let data = '数据库中的用户数据';
        // resolve(data);

        let err = '数据读取失败';
        reject(err);
    }, 1000);
});

//调用 promise 对象的 then 方法
p.then(function(value){
    console.log(value);
}, function(reason){
    console.error(reason);
})

// 发送ajax请求，接口地址: https://api.apiopen.top/getJoke
const p = new Promise((resolve, reject) => {
    //1. 创建对象
    const xhr = new XMLHttpRequest();
    //2. 初始化
    xhr.open("GET", "https://api.apiopen.top/getJ");
    //3. 发送
    xhr.send();
    //4. 绑定事件, 处理响应结果
    xhr.onreadystatechange = function () {
        //判断
        if (xhr.readyState === 4) {
            //判断响应状态码 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
                //表示成功
                resolve(xhr.response);
            } else {
                //如果失败
                reject(xhr.status);
            }
        }
    }
})

//指定回调
p.then(function(value){
    console.log(value);
}, function(reason){
    console.error(reason);
});

```

Promise的then方法：

调用 then 方法，then方法的返回结果是 Promise 对象，对象状态由回调函数的执行结果决定

如果回调函数中返回的结果是 非 promise 类型的属性，状态为成功， 返回值为对象的成功的值
Promise的catch方法：指定失败的回调

## Set

ES6 提供了新的数据结构 Set（集合 ）。它类似于数组，但成员的值都是唯一的 ，集合实现了 iterator接口，所以可以使用『扩展运算符』和『 for…of…』进行遍历，集合的属性和方法：

- size 返回集合的元素个数
- add 增加一个新元素，返回当前集合
- delete 删除元素，返回 boolean 值
- has 检测集合中是否包含某个元素，返回 boolean值
- clear 清空集合，返回 undefined

```js
//创建一个空集合 
let s = new Set();

//创建一个非空集合，自动去重
let s1 = new Set([1,2,3,1,2,3]); 

//集合属性与方法 
console.log(s1.size); //返回集合的元素个数
console.log(s1.add(4)); //添加新元素 
console.log(s1.delete(1)); //删除元素 
console.log(s1.has(2)); //检测是否存在某个值 
console.log(s1.clear());//清空集合 

let arr = [1,2,3,4,5,4,3,2,1];
//1. 数组去重
let result = [...new Set(arr)];
console.log(result);

//2. 交集
let arr2 = [4,5,6,5,6];
let result = [...new Set(arr)].filter(item => {
    let s2 = new Set(arr2);// 4 5 6
    if(s2.has(item)){
        return true;
    }else{
        return false;
    }
});
let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));
console.log(result);

//3. 并集
let union = [...new Set([...arr, ...arr2])];
console.log(union);

//4. 差集
let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
console.log(diff);

```

## Map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。 Map也实现了iterator接口，所以可以使用『扩展运算符』和『 for…of…』进行遍历。 Map的属性和方法：

1. size 返回 Map的元素个数
2. set 增加一个新元素，返回当前 Map
3. get 返回键名对象的键值
4. has 检测 Map中是否包含某个元素，返回 boolean值
5. clear 清空集合，返回 undefined

```js
//创建一个空 map 
let m = new Map(); 

//创建一个非空 map 
let m2 = new Map([ 
    ['name','scorpios'], 
    ['slogon','向天再借300年'] 
]);

//属性和方法 
console.log(m2.size); //获取映射元素的个数 
console.log(m2.set('age', 6)); //添加映射值 
console.log(m2.get('age')); //获取映射值 
console.log(m2.has('age')); //检测是否有该映射 
console.log(m2.clear());//清除 

```

## class 类

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class关键字，可以定义类。基本上， ES6 的 class可以看作只是一个语法糖，它的绝大部分功能， ES5 都可以做到，新的 class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

1. class声明类
2. constructor定义构造函数初始化
3. extends继承父类
4. super调用父级构造方法
5. static定义静态方法和属性
6. 父类方法可以重写

```js
//父类 
class Phone { 
    //构造方法 
    constructor(brand, color, price) {
        this.brand = brand; 
        this.color = color; 
        this.price = price; 
    } 
    //对象方法 
    call() {
        console.log('我可以打电话!!!') 
    } 
} 

//子类 
class SmartPhone extends Phone { 
    constructor(brand, color, price, screen, pixel) { 
        super(brand, color, price); 
        this.screen = screen; 
        this.pixel = pixel;
    } 
    //子类方法 
    photo(){ 
        console.log('我可以拍照!!'); 
    } 
    playGame(){ 
        console.log('我可以玩游戏!!'); 
    } 
    //方法重写 
    call(){ 
        console.log('我可以进行视频通话!!'); 
    } 
    //静态方法 
    static run(){ 
        console.log('我可以运行程序') 
    } 
    static connect(){ 
        console.log('我可以建立连接') 
    } 
}

//实例化对象 
const Nokia = new Phone('诺基亚', '灰色', 230); 
const iPhone6s = new SmartPhone('苹果', '白色', 6088, '4.7inch','500w'); 

//调用子类方法 
iPhone6s.playGame(); 

//调用重写方法 
iPhone6s.call(); 
//调用静态方法 
SmartPhone.run();

```

**get和set方法：**

当对某个属性进行获取时，调用get方法；当对某个属性进行修改时，调用set方法。

```js
// get 和 set  
class Phone{
    get price(){
        console.log("价格属性被读取了");
        return 'iloveyou';
    }

    set price(newVal){
        console.log('价格属性被修改了');
    }
}

//实例化对象
let s = new Phone();

// console.log(s.price);
s.price = 'free';

```

## Object.assign 

```js
//2. Object.assign 对象的合并
const config1 = {
    host: 'localhost',
    port: 3306,
    name: 'root',
    pass: 'root',
    test: 'test'
};
const config2 = {
    host: 'http://scorpios.com',
    port: 33060,
    name: 'scorpios.com',
    pass: 'iloveyou',
    test2: 'test2'
}
console.log(Object.assign(config1, config2));
```

