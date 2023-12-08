# 2022-8-30

## js数据类型，区别

基本数据类型；

Number，String，Boolean，null，undefined，symbol，bigint

引用数据类型；

object，function

object；普通对象，数组对象，正则对象，日期对象，math数学函数对象

储存方式；

基本数据类型存储在栈中简单数据段中，占据空间小，属于频繁被使用的数据。

引用数据类型存储在堆内存当中，占据空间大，引用数据类型再栈中存了指针，指针指向堆中实体的起始地址。当解析器寻找引用值时，会检索其再栈中的地址，取得地址后再堆中堆中获得实体。

区别；

1. 堆比栈空间大且运行速度更快
2. 堆内存是无序储存，可以根据引用直接获取
3. 基本数据类型比较稳定，相比占据空间更小
4. 引用数据类型的大小是动态的。

## constructor的理解

当然任意一个函数用于创建一类对象时，他就被称作为构造函数，或构造器。	

在一个构造方法中可以使用`super`关键字来调用一个父类的构造方法。

constructor就是一个用于保存自己构造函数引用的属性。

可以通过.constructor拿到创建该实例对象的构造函数。

**为什么说函数即对象**？

- 一个函数的构造函数是Function
- Function的构造函数也是Function
- Object的构造函数还是Function

所以；在js中，函数就是Function的实例对象，也就是所说的函数即对象。

prototype对象用于存放某同一类型实例的共享属性和方法，实质上是为了内存着想。

默认constructor实际上是被当做共享属性放在它们的原型对象中。

## map和forEach

都是用于遍历循环数组。

forEach多用于修改原始数组

map()会返回一个处理后的新数组，forEach()返回undefined

## for of可以遍历哪些对象

只能遍历可迭代的对象。

是ES6新增的一个遍历方法，但只限于迭代器，普通对象用for of 会报错

可迭代的对象 Arry Map Set String arguments等

## 作用域

作用域是一个独立的地盘，让变量不会外泄，暴露出去。也就是说作用域最大的用处是用来隔离变量，不同作用于下的同变量名不会有冲突。

JavaScript 的作用域分以下三种：

- 全局作用域：脚本模式运行所有代码的默认作用域
- 模块作用域：模块模式中运行代码的作用域
- 函数作用域：由[函数](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)创建的作用域

## arguments

在js中，调用有参数的函数时，当往这个调用的有参函数传参时，js会把所有的参数集中到一个叫arguments的对象里面，他是一个类数组数据。伪数组

## 数组去重

- 利用ES6 Set()

  记得使用Array.from()重新转换成数组
- for嵌套for，最后splice

  ```js
  const arr = [1,2,1,2,3,4,4,9,7,6,7,4,1,3,5,8,6,4,10]
  for(let i=0;i<arr.length;i++){
      for(var j=i+1;j<arr.length;j++){
          if(arr[i] === arr[j]){
              arr.splice(j,1)
              j--
          }
      }
  }
  console.log(arr)
  ```
- indexOf === - 1 新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则 push 进数组。
- sort()排序 比对相邻元素
- 利用对象的key不相同的原理
- includes
- filter
- 利用Map数据结构去重，Map 中不会出现相同的 key 值
- reduce+includes

## promise和async await 的区别

Promise是应用层的解决方案，

async await是语言层的解决方案

Promise是异步编程的一种解决方案，简单地说Promise好比容器，里面存放着一些异步事件的结果，而这些结果一旦生成是无法改变的。

async await也是异步编程的一种解决方案，是基于Promise的

## 实现异步的方法

回调函数，事件监听，发布订阅，Promise，generator，async await

## Promise介绍

Promise是异步编程的一种解决方案，从语法上来讲Promise是一个对象，他可以获取异步操作的信息。

Promise对象可以将异步操作以同步的流程表达出来。

## 数组的常用方法有哪些！18种

操作方法(增删改查)10，排序方法2，转换方法1，迭代方法5

- push() 添加元素到数组末尾

```js
let colors = []; // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count) // 2
```

- unshift() 添加元素到数组开头

```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2
```

- splice() 增，删，改

```js
增
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 0, "yellow", "orange")
console.log(colors) // red,yellow,orange,green,blue
console.log(removed) // []
删
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
改
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
console.log(colors); // red,red,purple,blue
console.log(removed); // green，只有一个元素的数组
```

- concat() 数组的拼接

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

- pop() 删除数组的最后一项

```js
let colors = ["red", "green"]
let item = colors.pop(); // 取得最后一项
console.log(item) // green
console.log(colors.length) // 1
```

- shift() 删除数组第一项

```js
let colors = ["red", "green"]
let item = colors.shift(); // 取得第一项
console.log(item) // red
console.log(colors.length) // 1
```

- slice() 截取，不会影响原数组，包前不包后

```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors)   // red,green,blue,yellow,purple
concole.log(colors2); // green,blue,yellow,purple
concole.log(colors3); // green,blue,yellow
```

- indexOf() 查找元素的索引，没有返回-1

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4) // 3
```

- includes() 查找是否存在，存在true，不存在false

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.includes(4) // true
```

- find() 返回第一个匹配的元素

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
people.find((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}
```

- reverse() 倒序

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```

- sort()   接收一个比较函数，排序规则。

```js
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
let values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```

- join() 字符串分割 以传入的字符串来分割数组

```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```

- some() 基于给定的规则进行遍历数组，只要有一个满足规则，就返回true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult) // true
```

- every() 基于给定的规则进行遍历数组 ，只有全部满足规则时，才返回true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false
```

- forEach() 遍历数组每一项 ，然后执行相应的操作，没有返回值。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```

- filter() 过滤 将源素组符合条件的元素过滤出来，生成一个新数组

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```

- map() 映射 按照给定的结构，计算方式，将原数组的元素返回一个新数组。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```

## 字符串常用方法有哪些! 16种

操作方法12，转换方法1，模板匹配方法3

- concat() 拼接

```js
let stringValue = "hello ";
let result = stringValue.concat("world");
console.log(result); // "hello world"
console.log(stringValue); // "hello"
```

- slice() 截取
- substr() 截取
- substring() 截取

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"
console.log(stringValue.substring(3)); // "lo world"
console.log(stringValue.substr(3)); // "lo world"
console.log(stringValue.slice(3, 7)); // "lo w"
console.log(stringValue.substring(3,7)); // "lo w"
console.log(stringValue.substr(3, 7)); // "lo worl"
```

- trim(),trimLeft(),trimRight() 去除空格

```js
let stringValue = " hello world ";
let trimmedStringValue = stringValue.trim();
console.log(stringValue); // " hello world "
console.log(trimmedStringValue); // "hello world"
```

- repeat() 复制

```js
let stringValue = "na ";
let copyResult = stringValue.repeat(2) // na na 
```

- padStart(),padEnd() 如果小于指定长度，进行填充

```js
let stringValue = "foo";
console.log(stringValue.padStart(6)); // " foo"
console.log(stringValue.padStart(9, ".")); // "......foo"
```

- toLowerCase(),toUpperCase() 大小写转换

```js
let stringValue = "hello world";
console.log(stringValue.toUpperCase()); // "HELLO WORLD"
console.log(stringValue.toLowerCase()); // "hello world"
```

- chatAt() 返回指定位置的字符

```js
let message = "abcde";
console.log(message.charAt(2)); // "c"
```

- indexOf() 返回指定字符的位置

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o")); // 4
```

- startWith() 是否是以给定的参数开始，返回布尔值

```js
let message = "foobarbaz";
console.log(message.startsWith("foo")); // true
console.log(message.startsWith("bar")); // false
```

- includes() 是否包含 返回布尔值

```js
let message = "foobarbaz";
console.log(message.includes("bar")); // true
console.log(message.includes("qux")); // false
```

- split() 将字符串按照指定字符分割，返回一个数组

```js
let str = "12+23+34"
let arr = str.split("+") // [12,23,34]
```

- match() 返回满足正则的，是个数组。

```js
let text = "cat, bat, sat, fat";
let pattern = /.at/;
let matches = text.match(pattern);
console.log(matches[0]); // "cat"
```

- search() 返回满足正则的字符串索引，没有的话返回-1

```js
let text = "cat, bat, sat, fat";
let pos = text.search(/at/);
console.log(pos); // 1
```

- replace() 替换 用第二个参数替换第一个。

```js
let text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
console.log(result); // "cond, bat, sat, fat"
```

## JavaScript类型转换机制

- 强制转换(显式转换)

  - Number() 只要有转换不了的 就会返回NaN

    - undefined => NaN

    - Null => 0

    - true => 1

    - false => 0

    - ```js
      Number(324) // 324
      
      // 字符串：如果可以被解析为数值，则转换为相应的数值
      Number('324') // 324
      
      // 字符串：如果不可以被解析为数值，返回 NaN
      Number('324abc') // NaN
      
      // 空字符串转为0
      Number('') // 0
      
      // 布尔值：true 转成 1，false 转成 0
      Number(true) // 1
      Number(false) // 0
      
      // undefined：转成 NaN
      Number(undefined) // NaN
      
      // null：转成0
      Number(null) // 0
      
      // 对象：通常转换成NaN(除了只包含单个数值的数组)
      Number({a: 1}) // NaN
      Number([1, 2, 3]) // NaN
      Number([5]) // 5
      ```

  - String() 转字符串 toString()

    - ```js
      // 数值：转为相应的字符串
      String(1) // "1"
      
      //字符串：转换后还是原来的值
      String("a") // "a"
      
      //布尔值：true转为字符串"true"，false转为字符串"false"
      String(true) // "true"
      
      //undefined：转为字符串"undefined"
      String(undefined) // "undefined"
      
      //null：转为字符串"null"
      String(null) // "null"
      
      //对象
      String({a: 1}) // "[object Object]"
      String([1, 2, 3]) // "1,2,3"
      ```

  - parseInt() 遇到转换不了的就停止 parseFloat()

    - ```js
      parseInt('32a3') //32
      ```

  - Boolean()

    - 非空字符串，非零数值，任意对象，都转换为 true

    - 空字符串，0，NaN，null，undefined都转换为 false

    - ```js
      Boolean(undefined) // false
      Boolean(null) // false
      Boolean(0) // false
      Boolean(NaN) // false
      Boolean('') // false
      Boolean({}) // true
      Boolean([]) // true
      Boolean(new Boolean(false)) // true
      ```

- 自动转换(隐式转换)

  - 在需要布尔值的地方，就会将非布尔值自动转换成布尔值

  - 自动转换成字符串，常发生在`+`运算中，一旦存在字符串，则会进行字符串拼接操作

    - ```js
      '5' + 1 // '51'
      '5' + true // "5true"
      '5' + false // "5false"
      '5' + {} // "5[object Object]"
      '5' + [] // "5"
      '5' + function (){} // "5function (){}"
      '5' + undefined // "5undefined"
      '5' + null // "5null"
      ```

  - 自动转换成数值 除了+，其他的运算符都会把运算的结果自动转换为为数值

    - ```js
      '5' - '2' // 3
      '5' * '2' // 10
      true - 1  // 0
      false - 1 // -1
      '1' - 1   // 0
      '5' * []    // 0
      false / '5' // 0
      'abc' - 1   // NaN
      null + 1 // 1
      undefined + 1 // NaN
      ```

## == 和 === 区别是什么。

都是用来作比较的运算符

相比等于运算符== 全等运算符 === 在做比较的时候也会比较数据类型。如果数值相同但类型不同，返回false

```js
sult1 = ("55" === 55); // false，不相等，因为数据类型不同
let result2 = (55 === 55); // true，相等，因为数据类型相同值也相同
```

## 深拷贝浅拷贝的区别？如何实现一个深拷贝？

浅拷贝，如果是基本数据类型，拷贝的是它的值，如果是引用数据类型，拷贝的是内存地址。即拷贝一层，深层次的则共享内存地址

可以使用**Object.assign，slice()，concat()，展开运算符...，实现浅拷贝**

深拷贝，是指开辟一个新的栈，两个对象属性完全相同，但对应的地址是不同的。修改不会相互影响。

可以使用lodash库中的 _.cloneDeep()，也可以先转换成JSON字符串，再转解析

```js
const obj2=JSON.parse(JSON.stringify(obj1));
```

但是这种方法会忽略undefined symbol 函数

循环递归

**区别；浅拷贝和深拷贝都创建出一个新的对象，但是在复制属性的时候，行为就不一样。**

**浅拷贝只复制某个对象的指针，而不是复制对象本身，新旧对象还是共享同一块内存，修改新对象属性会影响原对象。**

**深拷贝会在内存中再创建一个一摸一样的对象，修改新对象不会影响原对象**

## 说一说对闭包的理解，使用场景

一个函数和他的词法环境捆绑在一起，这样的组合就叫做闭包。

闭包的作用就是可以让你在一个内层函数访问到外层函数的作用域。

使用场景；柯里化函数，防抖，节流，模仿块级作用域，

形成原理；当前作用域可以访问到上级作用域。

## 说说你对作用域链的理解

作用域，即变量和函数生效的区域或集合。

作用域决定了代码块中变量和其他资源的可见性。

作用于有三种

- 全局作用域；任何不在函数中声明或是大括号中声明的变量。可以在任意位置进行访问

- 函数作用域；在一个函数内部声明的变量，只能在函数的内部访问

- 块级作用域；在大括号中使用let和const声明的变量是处于块级作用域中，在大括号外不能访问这些变量

  - ```js
    {
      // 块级作用域中的变量
      let greeting = 'Hello World!';
      var lang = 'English';
      console.log(greeting); // Prints 'Hello World!'
    }
    // 变量 'English'
    console.log(lang);
    // 报错：Uncaught ReferenceError: greeting is not defined
    console.log(greeting);
    ```

当在`Javascript`中使用一个变量的时候，首先`Javascript`引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域。

## JavaScript的原型，原型链是什么？有什么特点

JavaScript常被描述为一种基于原型的语言，每个对象都拥有一个原型对象。

当试图访问一个对象的属性时，不仅仅会在该对象身上寻找，还会寻找到该对象的原型，以及对象原型的原型，依次向上搜索，直到找到匹配的属性或者到达原型链的末尾。

原型对象也有原型，并从中继承方法和属性，一层一层，这种关系常被称为原型链，原型链解释了为何一个对象会拥有定义在其它啊对象中的属性和方法。

每个实例对象的 —proto— 都是指向他构造函数的原型对象prototype的

## 说说JavaScript中的事件模型

事件与事件流；

事件可以理解就是在HTML文档或者浏览器中发生的一种交互操作，使得网页具备互动性，常见的的有加载事件，鼠标事件自定义事件等。

事件流都会经历的三个阶段；

- 事件捕获阶段
- 事件处理阶段
- 事件冒泡阶段

事件冒泡是一种从下往上的传播方式，子传父。

事件模型；

- 原始事件模型
- 标准事件模型
- IE事件模型(基本不用)

## 解释下什么是事件代理/事件委托

通俗的来讲，就是把一个元素响应事件(click,keydown)，的函数委托到另一个元素身上。

事件委托就是在事件流的冒泡阶段完成，会把一个元素的事件委托到他的父级元素，或者更外层元素上，然后在外层元素执行函数操作。

应用场景；

当一个ul下有很多li的时候，如果在去一一的绑定事件，这时的内存消耗是非常大的，这时候就可以通过事件委托，把事件绑定在父元素ul身上，在执行事件是去匹配目标元素，event.target。

优点；

- 减少内存消耗，提升性能。
- 动态绑定，减少重复工作。

## 说说new操作符具体干了什么

1. 创建一个新对象
2. 将对象和构造函数通过原型链的方式连接起来
3. 将构造函数的this绑定在对象身上
4. 根据构造函数返回值判断，如果是引用类型，就返回这个引用类型的对象，如果是值类型，返回 obj 。构造函数如果返回值为一个对象，那么这个返回值会被正常使用。

```js
function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}
```

## vue的data为什么是函数，而不是对象

一个vue组件就是一个vue实例

一，实例和组件定义data的区别

vue实例的时候定义data属性既可以是一个对象，也可以是函数

```js
const app = new Vue({
    el:"#app",
    // 对象格式
    data:{
        foo:"foo"
    },
    // 函数格式
    data(){
        return {
             foo:"foo"
        }
    }
})
```

在组件中定义data属性只能是一个函数，如果用对象的话，会报警告。

总结

- 根实例对象data可以是对象也可以是函数，不会产生数据污染的情况
- 组件实例data必须为函数，为了防止多个实例共用一个data，产生数据污染。当我们将组件中的data写成一个函数，数据以**函数返回值**形式定义，这样每复用一次组件，就会返回一份新的data，拥有自己的作用域，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。

# 2022-8-30

## ajax原理是什么

AJAX全称(Async Javascript and XML)

是一种创建交互书网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务端交换数据，并且更新部分网页。

原理简单的来说就是通过XMLHttpRequest对象来向服务端发送异步请求，从服务器获得数据，然后用JS来操作DOM来更新页面。

实现步骤；

- 创建Ajax核心对象，XMLHttpRequest对象

```js
const xhr = new XMLHttpRequest();
```

- request.open()与服务端建立了链接

```js
xhr.open(method, url, [async][, user][, password])
```

- request.send()发送请求

```js
xhr.send([body])
```

- 监听发送成功后的状态变化，根据不同的状态码进行相应的操作，request.onreadystatechange  .readyState有五种状态
  - 0 未打开 open()方法还未调用
  - 1 未发送 send()未调用
  - 2 已获取响应头 send()调用结束
  - 3 正在下载响应体 
  - 4 请求完成 

```js
const request = new XMLHttpRequest()
request.onreadystatechange = function(e){
    if(request.readyState === 4){ // 整个请求过程完毕
        if(request.status >= 200 && request.status <= 300){
            console.log(request.responseText) // 服务端返回的结果
        }else if(request.status >=400){
            console.log("错误信息：" + request.status)
        }
    }
}
request.open('POST','http://xxxx')
request.send()
```

- 接收数据并渲染到页面中

封装；

```js
//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}
```

使用；

```js
ajax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){////请求失败后的回调函数
        console.log(status)
    }
})
```

## bind，call，apply区别及使用

他们的作用都是改变函数执行上下文的，简而言之就是改变this指向的

- apply
  - 接受两个参数，第一个为要改变得this指向，第二个是函数接受的参数，以数组的形式传入
  - 改变this指向后原函数会立即执行。
- call
  - 接受两个参数，第一个是要改变的this指向，第二个是接受的参数，用逗号隔开
  - 改变this指向后立即执行
- bind
  - 改变this后不会立即执行，返回一个改变this的函数，在需要的时候调用即可

## 说一说对事件循环理解

JavaScript是一门单线程语言，意味着同一时间内只能做一件事，但并不意味之单线程就是阻塞，实现单线程的非阻塞方法就是事件循环

在JavaScript中，所有的任务都可以分为同步任务和异步任务

- 同步任务，立即执行的任务，一般会直接进入主线程直接执行
- 异步任务，异步执行的任务，比如ajax请求，定时器等

**同步任务进入主线程，异步任务进入任务队列，主线程执行完毕之后为空，回去任务队列读取对应的任务，推入到主线程，这个过程的不断重复就是事件循环**

异步任务还可以分为宏任务与微任务，微任务的执行优先级要比宏任务高一些

常见微任务；

- Promise.then
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）
- process.nextTick（Node.js）

常见宏任务；

- 定时器

例；

```js
console.log(1)

setTimeout(()=>{
    console.log(2)
}, 0)

new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})

console.log(3)
```

打印顺序为；1 => 'new Promise' => 3 => 'then' => 2

## async await

async 是异步的意思，所以可以理解为 async声明一个异步方法，await等待异步方法执行。

async 函数返回一个Promise对象，所以下面两种方法是等效的

```js
function f(){
return Promise.resolve('TEST')
}

async function asyncF(){
return 'TEST'
}
```

不管await后面是什么，都会阻塞代码。

```js
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)
```

输出顺序为；1 => fn2 => 3 => 2

上面的例子中，`await` 会阻塞下面的代码（即加入微任务队列），先执行 `async`外面的同步代码，同步代码执行完，再回到 `async` 函数中，再执行之前阻塞的代码。\

例；

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

script start => async1 start => async2 => promise1 => script end => 'async1 end => promise2 => settimeout

## DOM的常见操作有哪些

DOM；文档对象模型，是HTML和XML文档的编程接口

- 创建节点

  - createElement 创建元素

    - ```js
      const divEl = document.createElement("div");
      ```

  - createTextNode 创建文本节点

    - ```js
      const textEl = document.createTextNode("content");
      ```

  - createAttribute 创建属性节点

    - ```
      const dataAttribute = document.createAttribute('custom');
      consle.log(dataAttribute);
      ```

- 获取节点

  - 每个`DOM`元素还有`parentNode`、`childNodes`、`firstChild`、`lastChild`、`nextSibling`、`previousSibling`属性

  - ```
    document.getElementById('id属性值');返回拥有指定id的对象的引用
    document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
    document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
    document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
    document/element.querySelector('CSS选择器');  仅返回第一个匹配的元素
    document/element.querySelectorAll('CSS选择器');   返回所有匹配的元素
    document.documentElement;  获取页面中的HTML标签
    document.body; 获取页面中的BODY标签
    document.all[''];  获取页面中的所有元素节点的对象集合型
    ```

  - querySelector 获取单个

    - ```
      document.querySelector('.element')
      document.querySelector('#element')
      document.querySelector('div')
      document.querySelector('[name="username"]')
      document.querySelector('div + p > span')
      ```

  - querySelectorAll 一次性获取多个

    - ```
      const notLive = document.querySelectorAll("p");
      ```

- 更新节点

  - innerHTML
  - innetText 
  - style

- 添加节点

  - innerHTML
  - appendChild 添加为父节点的最后一个子节点
  - insertBefore 在。。。。。前面插入
  - setAttribute 

  ```js
  const div = document.getElementById('id')
  div.setAttribute('class', 'white');//第一个参数属性名，第二个参数属性值。
  ```

- 删除节点

  - remove() 删除自身
  - removeChild() 删除子节点

## 说说你对BOM的理解

BOM；浏览器对象模型

BOM的核心对象伪Window

关于窗口控制如下；

- moveBy(x,y)
- moveTo(x,y) 移动到相对于左上角
- resizeBy(w,h) 
- resizeTo(w,h)
- scrollTo(x,y) 
- scrollBy(x,y)
- window.open() 导航带一个特定的url，
- window.close() 只用于关闭window.open()打开的窗口
- location.reload() 刷新当前页面
- history主要用于操作浏览器URL的历史记录，
  - history.go()
  - history.forward() 向前
  - history.back() 向后
  - history.length()  获取历史记录

## 说一说对尾递归的理解，有哪些应用场景

如果在一个函数内部调用本身，这个函数就叫做递归函数。

尾递归；是指在函数尾部调用前身。可通过优化，使得计算仅占用常量栈空间

常用场景；

数组求和；

```js
function sumArray(arr, total) {
    if(arr.length === 1) {
        return total
    }
    return sumArray(arr, total + arr.pop())
}
```

## 说说JavaScript中内存泄露的几种情况

内存泄漏，是指未能释放不再使用的内存。

JavaScript具有自动垃圾回收机制，会定期找出不用的变量然后释放内存。

两种实现方式；

- 标记清楚
- 引用计数

常见内存泄漏的情况；

- 意外的全局变量
- 定时器
- 闭包
- 没有清理对`DOM`元素的引用

```js
const refA = document.getElementById('refA');
document.body.removeChild(refA); // dom删除了
console.log(refA, 'refA'); // 但是还存在引用能console出整个div 没有被回收
refA = null;
console.log(refA, 'refA'); // 解除引用
```

## JavaScript本地存储方式有哪些？区别及应用场景

四种

- cookie
- sessionStorage
- localStorage

**cookie**

cookie伪小型文本文件，储存空间一般不超过4KB，通常存储一些用于辨别用户身份的信息。cookie在每次请求都会被发送，所以要进行加密，来保证信息的安全性

**localStorage**

HTML5新特性

生命周期长，除非主动删除，非则永远不会过期	

储存信息在同一域中是共享的

大小一般为5M

通常保存一些不经常变动的数据，减轻服务器的压力

只能存字符串

**sessionStorage**

会话存储，一旦页面关闭数据就会清除。

**区别**；

- 存储大小：`cookie`数据大小不能超过`4k`，`sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大
- 有效时间：`localStorage`存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； `sessionStorage`数据在当前浏览器窗口关闭后自动删除；`cookie`设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭
- 数据与服务器之间的交互方式，`cookie`的数据会自动的传递到服务器，服务器端也可以写`cookie`到客户端； `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存

**应用场景**；

- 存储用户身份信息，推荐使用`cookie`
- 适合长期保存在本地的数据（令牌）token，推荐使用`localStorage`
- 敏感账号一次性登录，推荐使用`sessionStorage`

## 说一说你对函数式编程的理解？优缺点

主要的编程范式一共有三种；命令式编程，声明式编程，函数式编程

相比命令式编程，函数式编程更注重结果而非过程，利用若干简单的执行单元让计算结果不断渐进。简单的来说就是把过程逻辑写成函数，只关心结果。

**一些概念**

纯函数；对于给定的输入返回固定形式的输出的函数。无状态，数据不可变，

高阶函数；以函数作为输入或输出的函数。

柯里化；柯里化是把一个多参数函数转化成一个嵌套一元函数的过程

**优点**

- 可以更好地管理状态
- 更简单的复用
- 更优雅的组合
- 减少代码量

**缺点**

- 性能开销大
- 资源占用多，垃圾回收器压力大
- 递归陷阱

## JavaScript中如何实现函数缓存，有哪些应用场景

**是什么**

函数缓存，就是将函数的运算过程进行缓存。

**如何实现**

闭包，柯里化，高阶函数

**应用场景**

- 对于昂贵的函数调用，执行复杂计算的函数
- 对于具有有限且高度重复输入范围的函数
- 对于具有重复输入值的递归函数
- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数

## 什么是防抖和节流？有什么区别？如何实现？

本是上是用来优化高频执行代码的一种手段

**定义**

- 节流；在n秒内只执行一次。在n秒内重复触发，只有一次生效
- 防抖；在n秒后执行，若在n秒内重复触发，则重新计时。

**代码实现**

节流；

```js
function throttled2(fn, delay = 500) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}
```

防抖；

```js
function debounce(fn, wait = 1000) {
    let timeout;

    return function () {
        let context = this; // 保存this指向
        let args = arguments; // 拿到event对象

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

应用场景；

防抖

- 搜索框
- input框的检测
- 窗口大小的变化回调

节流

- 滚动加载
- 付款时需要持续发送请求的地方

## 如何判断一个元素是否在可视区域中

作用；

- 图片的懒加载
- 列表的无限滚动
- 计算曝光情况
- 连接预加载

offesetWidth，offsetHeight；元素的宽高 border+padding+content包含滚动条

clientWidth，clientHeight；padding+content 不包含滚动条，边框

offsetLeft，offsetTop；相对于父元素左上角的距离

clientLeft，clientTop；元素左边框上边框的宽度

scrollLeft，scrollTop；滚动的距离

scrollWidth，scrollHeight；在没有滚动条的情况下，元素的总宽高。![Size Cheatsheet](https://shubo.io/static/89a5cfb0e676baf28dafc3ae9f339355/f058b/size-cheatsheet.png)

content可见的条件是：

1. content.offsetTop + content.offsetHeight > scrollTop

2. 用getBoundingClientRect，返回

   height: 元素高度
   width: 元素宽度

   left: 元素左上角点距离可视区域左侧宽度。
   right: 元素右上角点距离可视区域右侧宽度。

   top: 元素上边距离可视区域高度。
   bottom: 元素底边距离可视区域高度。

## 如何实现上滑加载，下拉刷新？

**上滑本质是页面快触底的时候。**

![img](https://static.vue-js.com/df498a00-8ae3-11eb-ab90-d9ae814b240d.png)

即 scrollTop+clientHeight  >= scrollHeight

**下拉刷新即本身至于页面顶部，用户下拉时出发的动作**

三步；touchstart,touchmove,touchend

- `touchstart (en-US)` - 当触摸点放置在触摸面上时触发。
- `touchmove (en-US)` - 当触摸点沿触摸表面移动时触发。
- `touchend (en-US)` - 当触摸点从触摸表面移除时触发。

1. 监听原生`touchstart`事件，记录其初始位置的值e.touches[0].pageY
2. 监听原生`touchmove`事件，记录并计算当前滑动的位置值与初始位置值的差值，大于`0`表示向下拉动，并借助CSS3的`translateY`属性使元素跟随手势向下滑动对应的差值，同时也应设置一个允许滑动的最大值
3. 监听原生`touchend`事件，若此时元素滑动达到最大值，则触发`callback`，同时将`translateY`重设为`0`，元素回到初始位置

## 什么是单点登录？

单点登录就是用户只需登陆一次，就可以访问所有相互信任的应用系统。简称SSO

## web常见的攻击方式有哪些？如何防御？

**XSS跨站脚本攻击**

储存型；

1. 攻击者将恶意代码提交到目标网站的数据库中
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

反射性；

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

DOM型；

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

**预防**

XSS 的本质是：恶意代码`未经过滤`，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本`被执行`。

严格规定编码格式进行对输入的过滤

转转义输出

防止的方式有:

- 过滤恶意的输入
- 转义输出
  - 纯前端渲染
  - 服务端渲染(模板渲染)
- 通过浏览器的限制

**CSRF跨站请求伪造**

- 受害者登录a.com，并保留了登录凭证（Cookie）
- 攻击者引诱受害者访问了b.com
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
- a.com以受害者的名义执行了act=xx
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作

**预防**

- samesize cookie的一个属性，不允许其他网站访问本网站的cookie(同源检测)
- 进行token验证
- 双重cookie验证
- 同源检测

**SQL注入**
SQL注入攻击，是将恶意的sql语句插入到输入的参数中，在后台sql服务器进行解析时攻击。

## let const var

**区别围绕六点展开**

- 变量提升；
  - var存在变量提升，即在声明前可以调用值为undefined；
  - let和const不存在声明提升，声明前调用会报错
- 暂时性死区；
  - var不存在暂时性死区
  - let和const存在暂时性死区，只有等到声明之后才能获取和使用
- 块级作用域 { }
  - var不存在块级作用域
  - let和const存在块级作用域
- 重复声明
  - var可以重复声明
  - let和const在同一作用域不可以重复声明
- 修改声明的变量
  - var和let可以修改
  - const不可修改，一旦声明，常量的值就不能再改变
- 使用
  - 能使用const就是用const
  - 据大多数使用let
  - 避免使用var

## ES6中数组增加了哪些拓展

**展开运算符...** 6种应用

- 在函数调用时，可以将数组变为参数序列

  - ```js
    function push(array, ...items) {
      array.push(...items);
    }
    
    function add(x, y) {
      return x + y;
    }
    
    const numbers = [4, 38];
    add(...numbers) // 42
    ```

- 可以将某些数据结构转换成数组(伪数组转换成数组)

  - ```js
    [...document.querySelectorAll('div')]
    ```

- 数组的合并

  - ```js
    const arr1 = ['a', 'b'];
    const arr2 = ['c'];
    const arr3 = ['d', 'e'];
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]
    ```

- 数组的复制(浅拷贝)

  - ```js
          const arr1 = ["a", "b", [1, 2]];
          const arr2 = ["c"];
          const arr3 = [...arr1, ...arr2];
          const arr = [...arr3]
          arr[2][1] = 9999
          console.log(arr3);//影响到arr3,['a','b',[9999,2],'c']
          console.log(arr1); //影响到arr1,['a','b',[9999,2]]
    ```

- 结合解构赋值使用，只能放在最后一位否则会报错

  - ```js
    const [first, ...rest] = [1, 2, 3, 4, 5];
    first // 1
    rest  // [2, 3, 4, 5]
    
    const [first, ...rest] = [];
    first // undefined
    rest  // []
    
    const [first, ...rest] = ["foo"];
    first  // "foo"
    rest   // []
    
    
    const [...butLast, last] = [1, 2, 3, 4, 5];
    // 报错
    
    const [first, ...middle, last] = [1, 2, 3, 4, 5];
    // 报错
    ```

- 将字符串转换成数组

  - ```js
    [...'hello']
    // [ "h", "e", "l", "l", "o" ]
    ```

**构造函数新增的方法**

- Array.from()

  - 将伪数组和可遍历的对象转换成数组

  - 可以接收第二个参数，用来对元素处理

  - ```js
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    
    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]
    ```

- Array.of()

  - 用于将一组值转换成数组

  - 没有参数的时候返回空数组

  - 一个参数的时候相当于定义了数组的长度

  - 只有两个或以上的参数是才返回新数组

  - ```js
    Array() // []
    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]
    ```

**关于数组实例对象新增的方法有如下：**

- copyWithin()
- find()、findIndex()
- fill()
- entries()，keys()，values()
- includes()
- flat()，flatMap()

## ES6中对象新增了哪些扩展？

**一，属性的简写****

当对象的key和value相等的时候，可以进行简写

```js
const baz = {foo:foo}

// 等同于
const baz = {foo}
```

方法简写

```js
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
}
```

**二，属性名表达式**

ES6 允许字面量定义对象时，将表达式放在括号内

```js
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

表达式还可以用于定义方法名

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

**三，super关键字**

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象

**四，展开运算符的应用**

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

**五，属性的的遍历**

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

**六，对象新增的方法**

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

## 怎么理解ES6中的 Set 和 Map 数据结构

**Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构**

-  集合

集合，是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

-  字典

字典（dictionary）是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

`Set`是`es6`新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

`Set`本身是一个构造函数，用来生成 Set 数据结构

```js
const s = new Set();
```

**增删改查**

- add()
- delete()
- has()返回布尔值
- clear()不加参数清空全部

**遍历**

`Set`实例遍历的方法有如下：

关于遍历的方法，有如下：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

**Map**

`Map`类型是键值对的有序列表，而键和值都可以是任意类型

`Map`本身是一个构造函数，用来生成 `Map` 数据结构

```js
const m = new Map()
```

**增删改查**

`Map` 结构的实例针对增删改查有以下属性和操作方法：

- size 属性
- set()
- get()
- has()
- delete()
- clear()

**遍历**

`Map`结构原生提供三个遍历器生成函数和一个遍历方法：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回所有成员的遍历器
- forEach()：遍历 Map 的所有成员

## 你是如何理解Generator的？使用场景？

Generator函数是ES6提供的一种异步编程解决方案。

实行Generator函数会返回一个遍历器对象，可以依次遍历Generator函数内部的每一个状态，相当于一个状态机

形式上，Generator是一个普通函数但是他有两个特征

- function关键字与函数名之间有一个星号
- 函数内部使用yield表达式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```

**使用**

通过`yield`关键字可以暂停`generator`函数返回的遍历器对象的状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
```

上述存在三个状态：`hello`、`world`、`return`

通过`next`方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
- 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式
- 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
- 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

`done`用来判断是否存在下个状态，`value`对应状态值

`yield`表达式本身没有返回值，或者说总是返回`undefined`

通过调用`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

正因为`Generator`函数返回`Iterator`对象，因此我们还可以通过`for...of`进行遍历

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

**异步解决的方案**

- 回调函数
- promise
- generator
- async await

**区别**

- promise和async是专门用来处理异步操作的
- Generator不是专门为异步而设置出来的，还有其他的功能
- promise相对比较复杂
- async实质是generator语法糖，相当于自动执行的generator函数
- async使用上更为简洁，将异步代码以同步的方式进行编写，是处理异步的最终方案。

## 你是怎么理解ES6中的module的？

module即模块化

**为什么需要模块化**

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

CommonJs

```js
// a.js
module.exports={ foo , bar}

// b.js
const { foo,bar } = require('./a.js')
```

**ES6**

**export**

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

或 
// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

输出函数或类

```js
export function multiply(x, y) {
  return x * y;
};
```

通过`as`可以进行输出变量的重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
}
```

**import**

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块

```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

同样如果想要输入变量起别名，通过`as`关键字

```js
import { lastName as surname } from './profile.js';
```

当加载整个模块的时候，需要用到星号`*`

```js
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js
import * as circle from './circle';
console.log(circle)   // {area:area,circumference:circumference}
```

输入的变量都是只读的，不允许修改，但是如果是对象，允许修改属性

```js
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
a = {}; // Syntax Error : 'a' is read-only;
```

## JavaScript对象转数组

1. Array.from() ,多用于数组的浅拷贝，就是将一个类数组对象或可遍历对象转换成一个真正的数组，要转换的对象必须要有length值，
2. Object.value(),这种转换方法不需要length属性，返回对象的所有可枚举属性
3. Object.key()
4. Object.entries() 返回键值对数组

## 深拷贝

```js
      function deepCopy(newObj, oldObj) {
        for (var i in oldObj) {
          //判断是不是对象
          if (Object.prototype.toString.call(oldObj[i]) === "[object Object]") {
            newObj[i] = {};
            deepCopy(newObj[i], oldObj[i]);
          } else if (
            //判断是不是数组
            Object.prototype.toString.call(oldObj[i]) === "[object Array]"
          ) {
            o2[i] = [];
            deepCopy(newObj[i], oldObj[i]);
          } else {
            newObj[i] = oldObj[i];
          }
        }
      }
```

