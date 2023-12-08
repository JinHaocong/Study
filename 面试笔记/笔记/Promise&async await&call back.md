### 一、callback，Promise，async&await三者的区别?

1.callback 经过深层次的嵌套，会产生回调地狱，需手动检查err参数。
2.promise 通过链式调用，直接在 then 中返回一个 promise 来进行成功之后的回调函数，用 catch 来做错误处理。
3.async/await 则直接将其变成了同步的写法，既可以用.catch又可以用try-catch捕捉，简洁，可读性强，写法更加优雅 。

```js
//try...catch
const fn = () => {
    return new Promise((resolve, reject) => {
        reject('你错啦~~')
    })
}
const asyncFn = async () => {
    try {
        let result1 = await fn()
    } catch (error) {
        console.log('try...catch:' + error)
    }
}
asyncFn()   //try...catch:你错啦~~
//catch
const asyncFn1 = async () => {
    const res = await fn().catch(err => console.log('catch:' + err))
}
asyncFn1()   //catch:你错啦~~

```

注意: try…catch可以捕获promise异常吗?
不能，try…catch 主要用于捕获异常，这里的异常，是指同步函数的异常。

### 二、Promise

1.Promise的特点
1.无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3.当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

2.Promise的用法
1.Promise的三种状态
pending: 进行中
fulfilled: 成功
rejected: 失败
Promise 构造函数有两个参数 resolve和 reject，分别对应成功和失败后的回调函数

2.Promise原型上的方法
then: 成功时的回调
catch: 失败时的回调
finally: 执行完毕后无论其结果怎样都做一些处理

3.Promise的静态方法
Promise.all() 有一个Promise对象失败则全部失败，输出第一个失败的原因
Promise.allSettled() 不关心Promise对象的成功或者失败，只关心结果
Promise.any() 返回第一个成功的Promise对象
Promise.race() 返回执行最快的那个Promise对象，无论它是成功还是失败
Promise.resolve() 返回一个状态为成功的Promise对象
Promise.reject() 返回一个状态为失败的Promise对象
注意：千万不要写成这样，看似没啥问题，这样写就是没理解当setTimeout函数里有参数时的用法

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(resolve('one'), 400);
});

```

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 400, 'one');
});
let p2 = Promise.reject("two");
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'three');
});
let p4 = Promise.resolve("four");
let p5 = new Promise((resolve, reject) => {
  // reject('reject');
  setTimeout(resolve, 500, 'five');
})
let arr = [p1, p2, p3, p4, p5]
Promise.all(arr).then(values => {
  console.log(values, "all");
}).catch((err) => {
  console.log(err, "allBad");
})

Promise.allSettled(arr).then(values => {
  console.log(values, "allSettled");
}).catch((err) => {
  console.log(err, "allSettledBad");
})

Promise.any(arr).then(values => {
  console.log(values, "any");
}).catch((err) => {
  console.log(err, "anyBad");
})

Promise.race(arr).then(values => {
  console.log(values, "race");
}).catch((err) => {
  console.log(err, "raceBad");
})

```

Promise的运用

1.红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？

```js
function mylight(value,time){
    return new Promise((resolve,reject) => {
        setTimeout((params) => {
            console.log(value);
            resolve()
        },time)
    })
}

let step =()=>{
    Promise.resolve()
    .then(() => {
    //此处的return返回了新的promise,然后执行后面的.then
        return mylight('red',3000)
    })
    .then((res) => {
        return mylight('green',1000)
    })
    .then((res) => {
        return mylight('yellow',2000)
    })
    .then(res=>{
      // 递归执行
       step()
    })
}
step()

```

**扩展:使用reduce实现以上代码?**[reduce用法](https://blog.csdn.net/m0_48076809/article/details/110734075)

```js
// 用reduce相当于往后面叠加.then,跟上面的重复亮灯代码一样
const arr = [
    {
        color:"red",
        time:3000,
    },
    {
        color:'green',
        time:1000,
    },
    {
        color:'yellow',
        time:2000
    }
]
function fn(arr) {
    arr.reduce((pre, cur,index) => {
        return pre.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(console.log(cur.color))
                }, cur.time)
            })
        })
    }, Promise.resolve()).then((params) => fn(arr))
    // 以上代码简写为:
    // arr.reduce((pre, cur) => pre.then(() => new Promise(r => setTimeout(() => r(console.log(cur.color)), cur.time))), Promise.resolve()).then((params) => fn(arr))
}
fn(arr)

```

**2.值穿透**
一开始值为基本类型，不停.then后里面的值一直传递下去，只有把then里的值return出去，才能暴露到下一次的.then中

```js
Promise.resolve(10)
  .then(Promise.resolve(3))
  .then(console.log)    //10

```

### 三、async与await

**1.async与await介绍**
async await 需成对出现，async await原理是生成器，
async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，参照 Generator 封装的一套异步处理方案，可以理解为 Generator 的语法糖，
而 Generator 又依赖于迭代器Iterator，
而 Iterator 的思想又来源于单向链表。

async和await的用法
**1.async和await把异步改为同步，得到最新的state的值**
使用Promise来封装setState(异步编程)

```js
changeCount = (state)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          this.setState(state)
        //resolve包裹成功时的结果
          resolve(this.state.count)
     },100)
   })
 },
pushRouter = async() => {
  //  await this.setState({
  //     count:this.state.count+1
  //   })
   const result = await this.changeCount({
   		count:this.state.count + 1
   })
}

```

**2.async，await结合try，catch使用捕获异常**

```js
async componentDidMount() {
   const { dispatch } = this.props
   try {
         const response = await dispatch({
              type: "netValueQuery/queryListData",
              payload: {}
         })
         if (response.httpStatus !== 200) {
             throw new Error(response.msg);
         }
         const json = await response.json();
         this.setState({ data: json });
       } catch (error) {
         console.log(error);
   }
}

```

**3.多个请求，后面的请求里需使用前面请求里返回的值**

```js
getSign(result){
    return this.$post(`/share/saveRecord`)
},
getTask() {
    const actid = this.$route.query.id;
    return this.$get(`/lottery/powerTask/${actid}`);
},
async getReady(){
    const task = await this.getTask()
    this.result = task.data.find(item => item.name.includes("分享"))
    const str = await this.getSign(this.result)
},

```

