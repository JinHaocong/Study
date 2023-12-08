# 2022-9-1

## 说一说你对vue的理解

vue是一个创建单应用的web应用框架。

**核心特性**

**MVVM数据驱动**

- Model；模型层，负责处理业务逻辑以及和服务端进行交互
- View；视图层，负责将数据模型转换成UI展示出来，可以简单地理解为HTML页面
- ViewModel；视图模型层，用来连接Model和View，是Model和View的通信桥梁

**组件化**

- 降低耦合度
- 调试方便
- 提高可维护性
- 复用简单

**指令系统**

- v-if
- v-for
- v-show
- v-bind  (:)
- v-on (@)
- v-model

## 说说你对SPA单页面的理解，优缺点是什么？

**SPA即单页面应用**

优点

- 具有桌面应用的**即时性**，网站的可移植性和可访问性
- 用户体验好，内容改变不需要重新加载整个页面
- 良好的前后端分离，分工更明确

缺点

- 不利于搜索引擎的抓取
- 首次渲染速度相对较慢

## v-show和v-if有什么区别？使用场景是什么？

**共同点**

都能控制元素在页面中是否显示

**区别**

- 控制手段
  - v-show是通过给元素添加 display:none,DOM依旧存在
  - v-if的显示还是隐藏是通过DOM是否创建来控制的
- 编译过程
  - v-show不会触发组件的生命周期
  - v-if会触发组件的所有生命周期
- 性能消耗
  - v-show性能消耗更低
  - v-if有着更高的消耗

**使用场景**

- v-show 频繁切换
- v-if 切换频率较低

## 说一说Vue的生命周期

| beforeCreate  | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| ------------- | :----------------------------------------------------------- |
| created       | 组件初始化完毕，各种数据可以使用，常用于异步数据获取         |
| beforeMount   | 未执行渲染、更新，dom未创建                                  |
| mounted       | 初始化结束，dom已创建，可用于获取访问数据和dom元素           |
| beforeUpdate  | 更新前，可用于获取更新前各种状态                             |
| updated       | 更新后，所有状态已是最新                                     |
| beforeDestroy | 销毁前，可用于一些定时器或订阅的取消                         |
| destroyed     | 组件已销毁，作用同上                                         |

**数据请求在created和mounted的区别**

created是在组件实例一旦创建完成的时候调用，这时候DOM并未生成；

mounted是在页面DOM节点渲染完成后就立即执行，

触发时机上create要比mounted早；

**相同点；**都能拿到组件实例的属性和方法。

放在mounted中的话可能导致页面闪动(因为此时的DOM已经生成)

如果数据请求需要对页面改动，最好放在created中。

## vue中v-if和v-for**的优先级是什么**，为什么不建议同时使用？

v-for优先级比v-if高

所以使用的话，每次v-for都会执行v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候。

## 如何解决SPA首屏加载慢的问题？

**加载慢的原因**

- 网络延迟
- 资源文件体积过大
- 请求重复发送
- 加载脚本时渲染内容堵塞

**解决方案**

- 减小入口文件体积
- 静态资源本地缓存
- UI框架按需加载；element-ui
- 组件重复打包
- 图片资源压缩
- SSR服务端渲染

## 如何解决给对象动态添加新属性页面不刷新的问题？

`Vue2` 不允许在已经创建的实例上动态添加新的响应式属性

解决方案；

- Vue.set()
- Object.assign()
- $forceUpdated()

## Vue中组件和插件有什么区别

主要区别；

- 编写形式
- 注册形式
- 使用场景

#### 编写插件

`vue`插件的实现应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

#### 组件注册

`vue`组件注册主要分为全局注册与局部注册

全局注册通过`Vue.component`方法，第一个参数为组件的名称，第二个参数为传入的配置项

```js
Vue.component('my-component-name', { /* ... */ })
```

1

局部注册只需在用到的地方通过`components`属性注册一个组件

```js
const component1 = {...} // 定义一个组件

export default {
	components:{
		component1   // 局部注册
	}
}
```

#### 插件注册

插件的注册通过`Vue.use()`的方式进行注册（安装），第一个参数为插件的名字，第二个参数是可选择的配置项

```js
Vue.use(插件名字,{ /* ... */} )
```

1

注意的是：

注册插件的时候，需要在调用 `new Vue()` 启动应用之前完成

`Vue.use`会自动阻止多次注册相同插件，只会注册一次

## Vue组件之间的通信方式有哪些？

组件间通信的分类可以分成以下

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信![img](https://static.vue-js.com/85b92400-3aca-11eb-ab90-d9ae814b240d.png)

常规的组件通信方案；

- 通过props传递 父给子
- 通过$emit触发自定义事件 子给父
- ref 子给父 $refs获取
- 全局事件总线EventBus 兄弟
- $parent $child
- $attrs $listeners
- Vuex
- Provide Inject

## 说一说对双向绑定的理解

我们都知道 `Vue` 是数据双向绑定的框架，双向绑定由三个重要部分构成

- Model；数据层
- View；视图层
- ViewModel；业务逻辑层，负责将数据和视图关联起来

**理解ViewModel**

主要职责

- 数据变化后更改视图
- 视图变化后更改数据

由两个主要部分组成

- 监听器(Observe)；对数据的属性进行监听
- 解析器(Compiler)；对每个元素节点的指令进行扫描解析，根据指令模板替换数据，

## 说一说你对nextTick的理解

官方定义；在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即调用，获取更新后的DOM。

我们可以理解成，`Vue` 在更新 `DOM` 时是异步执行的。当数据发生变化，`Vue`将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新

为什么要有nextTick

```js
{{num}}
for(let i=0; i<100000; i++){
    num = i
}
```

如果没有 `nextTick` 更新机制，那么 `num` 每次更新值都会触发视图更新(上面这段代码也就是会更新10万次视图)，有了`nextTick`机制，只需要更新一次，所以`nextTick`本质是一种**优化策略**

## 说说你对vue中的mixin的理解

官方定义；mixin(混入)，提供了一种灵活的方式，来分发组件中可复用的功能。

本质其实就是一个js对象，它可以包含我们组件中任意功能选项，如data，components，methods，created等等

我们只要将共用的功能以**对象**的方式传入 `mixins`选项中，当组件使用 `mixins`对象时，所有`mixins`对象的选项都将被混入该组件本身的选项中来

## 说一说你对slot的理解

Slot插槽，可以理解为slot在组件模板中站好了位置，当使用该组件标签时，组件标签的内容就会自动填充到slot中。

**使用场景**

通过插槽可以让用户拓展组件，更好的复用组件并对其做定制化处理。

**分类**

- 默认插槽
- 具名插槽
- 作用于插槽

## Vue常用的修饰符有哪些？

vue中修饰符分为五种

- 表单修饰符
  - number 自动将用户的输入值转为数值类型，但如果这个值无法被`parseFloat`解析，则会返回原来的值
  - trim 自动过滤用户输入的首空格字符，而中间的空格不会过滤
  - lazy 在我们填完信息，光标离开标签的时候，才会将值赋予给`value`，也就是在`change`事件之后再进行信息同步
- 事件修饰符
  - stop 阻止了事件冒泡，相当于调用了`event.stopPropagation`方法
  - prevent 阻止了事件的默认行为，相当于调用了`event.preventDefault`方法
  - selt 只当在 `event.target` 是当前元素自身时触发处理函数
  - once 绑定了事件以后只能触发一次，第二次就不会触发
  - capture 使事件触发从包含这个元素的顶层开始往下触发
  - passive
  - native 让组件变成像`html`内置标签那样监听根元素的原生事件
- 鼠标按键修饰符
  - left 左键点击
  - right 右键点击
  - middle 中键点击
- 键盘修饰符
  - onkeyup
  - onkeydown
  - keyCode
- v-bind修饰符
  - async 能对`props`进行一个双向绑定
  - prop 设置自定义标签属性，避免暴露数据，防止污染HTML结构
  - acmel 将命名变为驼峰命名法，如将`view-Box`属性名转换为 `viewBox`

```js
//父组件
<comp :myMessage.sync="bar"></comp> 
//子组件
this.$emit('update:myMessage',params);
```

以上这种方法相当于以下的简写

```js
//父亲组件
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
 this.bar = e;
}
//子组件js
func2(){
  this.$emit('update:myMessage',params);
}
```

- 使用`sync`的时候，子组件传递的事件名格式必须为`update:value`，其中`value`必须与子组件中`props`中声明的名称完全一致
- 注意带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用
- 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的

```js
<div @click.capture="shout(1)">
    obj1
<div @click.capture="shout(2)">
    obj2
<div @click="shout(3)">
    obj3
<div @click="shout(4)">
    obj4
</div>
</div>
</div>
</div>
// 输出结构: 1 2 4 3 
```

## 你有写过自定义指令吗？应用场景有哪些？

如何实现

注册一个自定义指令有全局注册与局部注册

全局注册主要是通过`Vue.directive`方法进行注册

`Vue.directive`第一个参数是指令的名字（不需要写上`v-`前缀），第二个参数可以是对象数据，也可以是一个指令函数

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()  // 页面加载完成之后自动让输入框获取到焦点的小功能
  }
})
```

局部注册通过在组件`options`选项中设置`directive`属性

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
    }
  }
}
```

自定义指令也像组件那样存在钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
- `update`：所在组件的 `VNode` 更新时调用，但是可能发生在其子 `VNode` 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
- `componentUpdated`：指令所在组件的 `VNode` 及其子 `VNode` 全部更新后调用
- `unbind`：只调用一次，指令与元素解绑时调用

**应用场景**

- 表单防止重复提交

  - ```js
    // 1.设置v-throttle自定义指令
    Vue.directive('throttle', {
      bind: (el, binding) => {
        let throttleTime = binding.value; // 节流时间
        if (!throttleTime) { // 用户若不设置节流时间，则默认2s
          throttleTime = 2000;
        }
        let cbFun;
        el.addEventListener('click', event => {
          if (!cbFun) { // 第一次执行
            cbFun = setTimeout(() => {
              cbFun = null;
            }, throttleTime);
          } else {
            event && event.stopImmediatePropagation();
          }
        }, true);
      },
    });
    // 2.为button标签设置v-throttle自定义指令
    <button @click="sayHello" v-throttle>提交</button>
    ```

- 图片懒加载

  - ```js
    <template>
    <img src="../static/images/default.jpg" :data-src="imgUrl" class="imgLazyLoad" v-lazyload>
    <template>
    <script>
    
    let imgList = []
    let delay
    let time = 250
    let offset = 0
    
    // 节流函数，防止短时间多次触发_loadImg
    function _delay () {
      clearTimeout(delay)
      delay = setTimeout(() => {
        _loadImg()
      }, time)
    }
    
    function _loadImg () {
      for (let i = 0, len = imgList.length; i < len; i++) {
        if (_isShow(imgList[i])) {
          imgList[i].src = imgList[i].getAttribute('data-src');
          imgList.splice(i, 0)
        }
      }
    }
    
    function _isShow (el) {
      // getBoundingClientRect获取图片相对视口的位置
      let coords = el.getBoundingClientRect()
      // 判断图片出否出现在可视区
      return coords.top <= document.documentElement.clientHeight + parseInt(offset)
    }
    export default {
      directives: {
        lazyload: {
          bind (el, binding) {
            imgList.push(el)
            // 初始化，第一次进入页面时应该显示的图片
            _delay()
            window.addEventListener('scroll', _delay, false)
          }
        }
      }
    }
    </script>
    ```

- 一键Copy

## vue的过滤器了解吗？应用场景有哪些？

过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数

- 部过滤器优先于全局过滤器被调用
- 一个表达式可以使用多个过滤器。过滤器之间需要用管道符“|”隔开。其执行顺序从左往右

**使用**

```js
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

过滤器可以串联：

```js
{{ message | filterA | filterB }}
```

例

```html
<div id="app">
    <p>{{ msg | msgFormat('疯狂','--')}}</p>
</div>

<script>
    // 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
    Vue.filter('msgFormat', function(msg, arg, arg2) {
        // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
        return msg.replace(/单纯/g, arg+arg2)
    })
</script>
```

**应用场景**

单位转换，数字打点，文本格式化等

## 什么是虚拟DOM？

虚拟DOM是用来展示真实DOM的一个对象

你用传统的原生`api`或`jQuery`去操作`DOM`时，浏览器会从构建`DOM`树开始从头到尾执行一遍流程

当你在一次操作时，需要更新10个`DOM`节点，浏览器没这么智能，收到第一个更新`DOM`请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程

而通过`VNode`，同样更新10个`DOM`节点，虚拟`DOM`不会立即操作`DOM`，而是将这10次更新的`diff`内容保存到本地的一个`js`对象中，最终将这个`js`对象一次性`attach`到`DOM`树上，避免大量的无谓计算

## 说一说vue的diff算法

diff算法是一种对比算法，对比新旧虚拟DOM，对比出那个节点更改了，然后精准的更新真实DOM。

同层比较，深度优先

- 比较只会在同层级进行，不会跨层级比较。
- 比较过程中循环从两边向中间收拢

当数据发生改变时，会触发setter，并且会调用`Dep.notify`通知所有订阅者`Watcher`，订阅者就会调用`patch`给真实的`DOM`打补丁，更新相应的视图

`patch`函数前两个参数位为`oldVnode` 和 `Vnode` ，分别代表新的节点和之前的旧节点，主要做了四个判断：

- 新的虚拟DOM中没有而旧的虚拟DOM中有，直接删除
- 新的虚拟DOM中有而旧的虚拟DOM没有，新建
- 旧节点和新节点自身一样，通过 `sameVnode` 判断节点是否一样，一样时，直接调用 `patchVnode`去处理这两个节点
- 旧节点和新节点自身不一样，当两个节点不一样的时候，直接创建新节点，删除旧节点

## 有封装过axios吗？主要是哪方面的？

`axios` 是一个轻量的 `HTTP`客户端

基于 `XMLHttpRequest` 服务来执行 `HTTP` 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 `Node.js` 端。自`Vue`2.0起，尤大宣布取消对 `vue-resource` 的官方推荐，转而推荐 `axios`。现在 `axios` 已经成为大部分 `Vue` 开发者的首选

封装请求拦截器和响应拦截器，在请求拦截器里进行进度条开始，响应拦截器进度条结束

在请求拦截器中统一携带token

在响应拦截器里统一处理响应失败的操作

## SSR解决了什么问题？

SSR即为服务端渲染

解决了

- seo 搜索引擎优化 搜索引擎优先爬取页面`HTML`结构，使用`ssr`时，服务端已经生成了和业务想关联的`HTML`，有利于`seo`
- 首屏呈现渲染：用户无需等待页面所有`js`加载完成就可以看到页面视图（压力来到了服务器，所以需要权衡哪些用服务端渲染，哪些交给客户端）

## vue要做权限管理如何做？

权限控制可以分为四个方面；

- 接口权限
- 按钮权限
- 菜单权限
- 路由权限

接口权限一般采用JWT的形式来验证，没有的话一般返回401，然后跳转到登陆页面进行登录，登陆后获取到token并将它存储到本地，在每次发起请求的时候通过请求拦截器将token带到请求头中

路由权限可以在路由上标记响应的权限信息，利用路由守卫在每次路由前进行判断校验

这种方式存在以下四种缺点：

- 加载所有的路由，如果路由很多，而用户并不是所有的路由都有权限访问，对性能会有影响。
- 全局路由守卫里，每次路由跳转都要做权限判断。
- 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
- 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识

还可以通过在初始化的时候先挂载常量路由，登陆后根据服务器返回的权限信息，利用addRoutes进行动态添加路由

菜单权限可以结合路由权限一起实现

## Vue项目中如何解决跨域

在vue中主要针对cors和proxy展开。

cors即跨域资源共享，只需后端增加一些HTTP头即可实现。

Proxy代理，将请求发送到代理服务器上，代理服务器在将请求转发到目标服务器上。

## vue项目部署到服务器后报错404是什么原因呢？

**当路由为history的时候会有这种问题**

`Vue`是属于单页应用（single-page application）

而`SPA`是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个`index.html`

```js
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
  }
}
```

可以根据 `nginx` 配置得出，当我们在地址栏输入 `www.xxx.com` 时，这时会打开我们 `dist` 目录下的 `index.html` 文件，然后我们在跳转路由进入到 `www.xxx.com/login`

关键在这里，当我们在 `website.com/login` 页执行刷新操作，`nginx location` 是没有相关配置的，所以就会出现 404 的情况

**为什么hash模式下没有问题**

hash路由 如 `website.com/#/login`, `hash` 的值为 `#/login` 

它的特点在于；hash虽然出现在url中，但不会被包括在HTTP请求中，对服务端完全没有影响，

`hash` 模式下，仅 `hash` 符号之前的内容会被包含在请求中，如 `website.com/#/login` 只有 `website.com` 会被包含在请求中 ，因此对于服务端来说，即使没有配置`location`，也不会返回404错误

**解决方案**

当我们进入到子路由时刷新页面，`web`容器没有相对应的页面此时会出现404

所以我们只需要配置将任意页面都重定向到 `index.html`，把路由交由前端处理

对`nginx`配置文件`.conf`修改，添加`try_files $uri $uri/ /index.html;`

## Vue3有了解过吗？根vue2有什么区别

`Vue3`的新特性，如下：

- 速度更快
- 体积减少
- 更易维护
- 更接近原生
- 更易使用

## 说一说路由守卫？

### 导航守卫  路由守卫

用户已经登录 用户不应该还能回到login页面

导航 表示路由正在发生变化 进行路由的跳转

**有三种**

1. 全局守卫 ；整个项目中 只要发生路由的变化就会监听到

   1. 全局前置守卫； `router.beforeEach` 

      **`to`**: 即将要进入的目标 

      **`from`**: 当前导航正要离开的路由

      `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。

   ```js
   const router = new VueRouter({...})
   router.beforeEach((to,from,next)=>{
       // next()
       //netx('/shopcar') 放行到指定路由
       //next(false) 中断当前的导航；如果浏览器的URL改变了，那么URL地址会重置到 from‘路由对应的地址
   }) 
   
   ```

   1. 全局解析守卫； `router.beforeResolve` 

   这和 `router.beforeEach` 类似，因为它在 **每次导航**时都会触发，但是确保在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**。

   1. 全局后置守卫；router.afterEach

2. 路由独享守卫； `beforeEnter` 

   1. `beforeEnter` 

      ```js
      const routes = [
        {
          path: '/users/:id',
          component: UserDetails,
          beforeEnter: (to, from) => {
            // reject the navigation
            return false
          },
        },
      ]
      ```

      

3. 组件内守卫； 相当于路由的生命周期

   1. `beforeRouteEnter`

   2. `beforeRouteUpdate`

   3. `beforeRouteLeave`

      例

      ```js
      export default {
        //路由的生命周期
        /*  beforeRouteEnter(to, from, next) {
          if (localStorage.getItem("token")) {
            next();
          } else {
            next({
              path: "/login",
              query: { wanted: to.fullPath },
            });
          }
        }, */
      };
      ```

      

