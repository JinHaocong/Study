# 项目描述

是一个spa在线电商系统

包括 首页，搜索列表，商品详情，购物车，订单，支付，登录模块

使用vue全家桶

# 能学到什么

- 熟悉了一个项目开发的大致流程‘
- 前后端分离式开发

# 难点，问题

## 导航守卫

全局路由守卫；

判断是否有token；无token情况下为游客登陆，不能进入支付相关，我的订单，交易相关的页面。有token说明已经登陆，就不能再次进入登录页面，并且要判断store中是否有用户信息，因为这个用户信息是用来记录订单以及购物车的，如果没有的话需要再次向store中派发action发送请求获取用户信息，此处进行一个try catch 因为不能确定token是否已经过期，如果catch到err的情况下说明token过期了，需要先清除本地的token在跳到登陆页面，

路由独享守卫；

交易页面必须是从购物车跳转到的

支付页面必须是从交易页面跳转到的

```js
 //路由都享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面必须是从购物车来 起其他路径必须停留在当前
            if (from.path == '/shopcar') {
                next()
            } else {
                next(false)
            }
        }
```

全局路由守卫；

```js
router.beforeEach(async (to, from, next) => {
    // next()
    //netx('/shopcar') 放行到指定路由
    //next(false) 终端当前的导航，如果浏览器的URL改变了，那么URL地址会重置到 from‘路由对应的地址
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        //用户已经登陆 禁止再次跳到登陆界面
        if (to.path == '/login') {
            next(false)
        } else {
            //这里是除了登录界面的所有界面
            if (name) {
                //有用户信息 放行 
                next()
            } else {
                //没有用户信息 要派发action 让仓库进行存储
                try {
                    //没有用户信息,派发action让仓库存储信息  等待异步完成 放行
                    await store.dispatch('userLoginInfo')
                    next()
                } catch (error) {
                    //token过期 获取不到用户信息  先清除本地token 
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
            next()
        }
    } else {
        //未登录 ；不能去交易相关的，不能去支付相关的 pay paysuccess
        if (to.path == '/trade' || to.path.includes('/pay') || to.path.includes('/center')) {
            //把未登录的时候想去而没有去成的信息存储在路由中
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})
```

问题；

## 重写vuerouter原型链下的push 和 replace方法

使用编程式导航时，当我们多次点击跳转时，会抛出NavigationDuplication错误

这种异常对程序的运行没有任何的影响
为什么会出现这种现象?
是因为vue-router最新版本3.5.2,引入了promise,当传递参数多次且重复,会抛出异常,因此出现该现象
第一种解决方法: 是给push函数,传入相应的成功与失败的回调(治标不治本)
第二种解决方法: 重写VueRouter原型链上的push和replace方法

所以要 重写push replace

this.$router是 VueRouter的实例，本身上没有push,replace方法，push,replace方法是在VueRouter的原型对象上的

**不能是用箭头函数 箭头函数没有隐式绑定this**

```js
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
//重写push replace 注意重写的函数不能用箭头函数 箭头函数没有this
//第一个参数location 告诉原来的push方法往哪里调,以及传参
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
    	//直接调用的话 指向是window 所以要用call或apply改变this的指向			//当前this指向VueRouter的实例
        //call 和 apply 够可以调用函数一次,都可以改变this指向
        //不同 call传参要用逗号隔开 apply传参要传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//同理 replace重写
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
```

## 难点二；search框的节流

防抖；设置在n秒后执行函数，如果在n秒内重新触发，则重新计时

节流；间隔n秒触发一次

节流

```js
function throttle(fn,delay){
    var timmer = null
    return function(){
        if(!timmer){
           timmer = setTimeout(()=>{
                fn.call(this)
                timmer = null
            },delay)
        }
    }
}


let myBox = document.getElementById('box')
myBox.onclick = throttle(()=>{
    console.log(111)
},1000)
```

防抖

```js
function debounce(fn,delay){
let timmer
return function(){
    clearTimeout(timmer)
    timmer = setTimeout(()=>{
        fn.call(this)
    },delay)
}
}


let myBox = document.getElementById('box')
myBox.onclick = debounce(()=>{
    console.log(11)
},1000)
```

问题2；

## 在mounted或updated中new swiper会多次创建实例的问题

如何解决，要在dom渲染完成，轮播图片异步获取完成之后再进行创建轮播实例

采用watch监听和this.$nextTick解决

```js
watch: {
    //监听bannerList数据的变化 [] => [*,*,*,*]
    bannerList: {
        //watch鉴定的 对象固定写法
      handler() {
        //在 newsiwper之前 页面的解构必须要有 注意异步问题
        //通过watch监听数据的变化，
        //当前函数执行只能保证bannerList有数据，但是dom不一定渲染完

        //当执行这个回到的时候数据已经渲染到dom上
        this.$nextTick(() => {
          new Swiper(".jhc", {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
        });
      },
    },
  },
```

this.$nextTick是指 下一次DOM更新，循环结束延迟回调，相当settimeout的效果，可以获取到最新的DOM

难点2；

## 组件的通信

1. props；用于父子组件通信，
2. 自定义事件 $on,$emit 可以实现子给父通信
3. $bus 全局事件总线 全能
4. 插槽 slot
5. vuex

## 放大镜效果的实现

采用mousemove事件，默认传递当前触发鼠标的一些位置信息，evt

:hover来控制绿幕部分显示与否

# 封装的组件

分页器；

需要知道的参数；当前页，每页多少条，一共多少条，连续的页码数 5，7

根据一共多少条和每页多少条可以算出一共多少页， Math.ceil向上取整

难点在于连续页码为5的话就要从第五页开始显示省略号

```js
<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startAndEndNumber.start > 1"
      @click="$emit('getPage', 1)"
      :class="{ atcive: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEndNumber.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in currentPages"
      :key="index"
      @click="$emit('getPage', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEndNumber.end < totalPage - 1">···</button>
    <button
      v-if="startAndEndNumber.end < totalPage"
      @click="$emit('getPage', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ this.total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "CommonPagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算出总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    //计算出连续页码的起始数字和结束数字
    startAndEndNumber() {
      //解构出所有属性
      const { continues, pageNo, totalPage } = this;
      //定义变量来接收起始和结束页码
      let start = 0;
      let end = 0;
      //连续的页数 continues为5  所以至少要有五页
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象 totalPage 大于五
        //注意 如果当前为第一页 要展示1，2，3，4，5  当前为第二页  也展示1，2，3，4，5
        start = pageNo - (continues - 1) / 2;
        end = pageNo + (continues - 1) / 2;
        if (start < 1) {
          start = 1;
          end = continues;
        }

        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },

    currentPages() {
      let pages = [];
      for (
        var i = this.startAndEndNumber.start;
        i <= this.startAndEndNumber.end;
        i++
      ) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>
```

轮播组件；

头部组件和底部组件；底部组件的显示与否我才用的是路由传参，再路由配置里面添加meta属性来进行显示与隐藏的控制

# 优化点

组件库按需引入

图片懒加载，使用的 vue-lazyload，原理就是图片先全部用默认图片代替，当出现到可视区域是在更换src地址，减少了首次进入页面加载压力

精灵图；减少了请求的次数

路由懒加载；即跳到该路由时在进行组件加载