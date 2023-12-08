# 2022-9-2

## 说说你对盒子模型的理解

一个盒子有四部分组成；margin，border，padding，content

margin；外边距

border；边框

padding；内边距

content；实际内容

盒模型分为两类；

- 标准盒模型；给他设置宽高，设置的是内容的宽高
- IE盒模型；给他设置宽高，设置的是padding+border+content的

通过box-sizing；border-box设置为IE盒模型

## css选择器有哪些？优先级？

**常用的有**

- id 选择器(#box)
- 类选择器(.box)
- 标签选择器(div)
- 后代选择器(#box div)
- 子选择器
- 相邻选择器
- 群组选择器
- 伪类选择器
- 伪元素
- 属性

**优先级**

内联 > ID选择器 > 类选择器 > 标签选择器

## 说说px，em，rem，vh，vw的区别

都是css的长度单位

**px**

像素单位，移动端设备的像素，绝对长度单位

**em**

相对长度单位，相对于父元素中字体大小，1em=font-size

如果没设置默认为16px

**rem**

相对长度单位，相对于HTML根元素font-size的值，移动端多采用rem布局

```js
 <script>
      //fontsize 计算  375是设计稿的
      document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 375) * 16 + "px";
    </script>
```

**vh，vw**

视宽，视高，将可视区域分为100份，100vw就是满宽。

**总结**

px；绝对单位，页面按精确像素展示

em；相对单位，相对于父节点的字体大小，如果自身定义了font-size就按自身来算。

rem；相对单位，相对于根节点HTML的字体大小

vh，vw；用于页面视口大小布局。

## 说说设备像素，css像素，设备独立像素，dpr，ppi之间的区别？

css像素；px

设备像素；pt

DPR=设备像素/设备独立像素

**总结**

无缩放情况下，1个css像素等于1个设备独立像素

设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位，会发生改变

PX端中，一个设备独立像素 = 1个设备像素(为缩放情况下)

移动端中，标准屏幕下一个设备独立像素 = 一个设备像素

设备像素比(dpr) = 设备像素/设备独立像素

每英寸像素(ppi) = 值越大，图像越清晰

## css中，有哪些方式可以隐藏页面元素？

- display：none  DOM不存在
- visibility：hidden DOM存在
- opacity：0
- 设置宽高属性为0
- 通过定位 position：absolute 将元素移动到屏幕外
- clip-path 剪裁

常用的还是display和visibility

| display: none          | visibility: hidden | opacity: 0 |        |
| :--------------------- | :----------------- | ---------- | ------ |
| 页面中                 | 不存在             | 存在       | 存在   |
| 重排                   | 会                 | 不会       | 不会   |
| 重绘                   | 会                 | 会         | 不一定 |
| 自身绑定事件           | 不触发             | 不触发     | 可触发 |
| transition             | 不支持             | 支持       | 支持   |
| 子元素可复原           | 不能               | 能         | 不能   |
| 被遮挡的元素可触发事件 | 能                 | 能         | 不能   |

## 说一说你对BFC的理解

BFC即块级格式化上下文

渲染规则；

- 内部盒子会在垂直方向一个接一个的放置
- 对于同一个BFC的两个相邻的盒子的margin会发生重叠，与方向无关
- BFC区域不会和float区域的元素重叠
- 计算BFC高度时，浮动元素也要参与计算
- BFC就是页面上的一个相对独立的容器，容器内部元素不会影响容器外部，反之同理

触发条件；

- 浮动 float：left/right
- overflow值除了visible即可
- display inline-block，table，flex，grid
- position absolute或fixed

应用场景；

**防止margin重叠(高度塌陷)；**

```html
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p >
    <p>Hehe</p >
</body>
```

页面显示如下：

![img](https://static.vue-js.com/d0ce3650-9511-11eb-85f6-6fac77c0c9b3.png)

两个`p`元素之间的距离为`100px`，发生了`margin`重叠（塌陷），以最大的为准，如果第一个P的`margin`为80的话，两个P之间的距离还是100，以最大的为准。

前面讲到，同一个`BFC`的俩个相邻的盒子的`margin`会发生重叠

可以在`p`外面包裹一层容器，并触发这个容器生成一个`BFC`，那么两个`p`就不属于同一个`BFC`，则不会出现`margin`重叠

```html
<style>
    .wrap {
        overflow: hidden;// 新的BFC
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p >
    <div class="wrap">
        <p>Hehe</p >
    </div>
</body>
```



这时候，边距则不会重叠：

![img](https://static.vue-js.com/dec44740-9511-11eb-85f6-6fac77c0c9b3.png)

**清除内部浮动；**

```html
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

页面显示如下：

![img](https://static.vue-js.com/ec5d4410-9511-11eb-85f6-6fac77c0c9b3.png)

而`BFC`在计算高度时，浮动元素也会参与，所以我们可以触发`.par`元素生成`BFC`，则内部浮动元素计算高度时候也会计算

```css
.par {
    overflow: hidden;
}
```

实现效果如下：

![img](https://static.vue-js.com/f6487b20-9511-11eb-ab90-d9ae814b240d.png)

**自适应多栏布局；**

这里举个两栏的布局

```html
<style>
    body {
        width: 300px;
        position: relative;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

效果图如下：

![img](https://static.vue-js.com/ffb95210-9511-11eb-ab90-d9ae814b240d.png)

前面讲到，每个元素的左外边距与包含块的左边界相接触

因此，虽然`.aslide`为浮动元素，但是`main`的左边依然会与包含块的左边相接触

而`BFC`的区域不会与浮动盒子重叠

所以我们可以通过触发`main`生成`BFC`，以此适应两栏布局

```css
.main {
    overflow: hidden;
}
```

这时候，新的`BFC`不会与浮动的`.aside`元素重叠。因此会根据包含块的宽度，和`.aside`的宽度，自动变窄

效果如下：

![img](https://static.vue-js.com/0a5f2690-9512-11eb-ab90-d9ae814b240d.png)

## 元素垂直水平居中的方法有哪些？如果元素不定宽高呢？

**实现方式**

- 定位 +margin:auto
- 定位 +margin:负值
- 定位 +transform:translate
- table布局
- flex布局
- grid布局

**利用定位 +margin:auto**

```html
<style>
    .father{
        width:500px;
        height:300px;
        border:1px solid #0a3b98;
        position: relative;
    }
    .son{
        width:100px;
        height:40px;
        background: #f0a238;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

父级设置为相对定位，子级绝对定位 ，并且四个定位属性的值都设置了0，那么这时候如果子级没有设置宽高，则会被拉开到和父级一样宽高

这里子元素设置了宽高，所以宽高会按照我们的设置来显示，但是实际上子级的虚拟占位已经撑满了整个父级，这时候再给它一个`margin：auto`它就可以上下左右都居中了

**利用定位 +margin:负值**

绝大多数情况下，设置父元素为相对定位， 子元素移动自身50%实现水平垂直居中

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

- 初始位置为方块1的位置
- 当设置left、top为50%的时候，内部子元素为方块2的位置
- 设置margin为负数时，使内部子元素到方块3的位置，即中间位置

这种方案不要求父元素的高度，也就是即使父元素的高度变化了，仍然可以保持在父元素的垂直居中位置，水平方向上是一样的操作

但是该方案需要知道子元素自身的宽高，但是我们可以通过下面`transform`属性进行移动

**利用定位 +transform:translate**

```css
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`translate(-50%, -50%)`将会将元素位移自己宽度和高度的-50%

这种方法其实和最上面被否定掉的margin负值用法一样，可以说是`margin`负值的替代方案，并不需要知道自身元素的宽高

**table布局**

设置父元素为`display:table-cell`，子元素设置 `display: inline-block`。利用`vertical`和`text-align`可以让所有的行内块级元素水平垂直居中

```html
<style>
    .father {
        display: table-cell;
        width: 200px;
        height: 200px;
        background: skyblue;
        vertical-align: middle;
        text-align: center;
    }
    .son {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

**flex弹性盒布局**

```html
<style>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`css3`中了`flex`布局，可以非常简单实现垂直水平居中

这里可以简单看看`flex`布局的关键属性作用：

- display: flex时，表示该容器内部的元素将按照flex进行布局
- align-items: center表示这些元素将相对于本容器水平居中
- justify-content: center也是同样的道理垂直居中

**grid网格布局**

```html
<style>
    .father {
            display: grid;
            align-items:center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background: skyblue;

        }
        .son {
            width: 10px;
            height: 10px;
            border: 1px solid red
        }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

**总结**

根据标签的性质可分为

- 内联元素居中布局
- 块级元素居中布局

**内联元素居中布局**

水平居中

- 行内元素可设置：text-align: center
- flex布局设置父元素：display: flex; justify-content: center

垂直居中

- 单行文本父元素确认高度：height === line-height
- 多行文本父元素确认高度：display: table-cell; vertical-align: middle

**块级样式剧中布局**

水平居中

- 定宽: margin: 0 auto
- 绝对定位+left:50%+margin:负自身一半

垂直居中

- position: absolute设置left、top、margin-left、margin-top(定高)
- display: table-cell
- transform: translate(x, y)
- flex(不定高，不定宽)
- grid(不定高，不定宽)，兼容性相对比较差

## 如何实现两栏布局，右侧自适应？三栏布局中间自适应？

实现两栏布局；

浮动布局；

- 使用float 左浮动左栏
- 右边使用margin-left 撑出内容
- 给父级元素添加BFC，防止下方元素飞到上方内容

flex弹性盒布局；

```html
<style>
    .box{
        display: flex;
    }
    .left {
        width: 100px;
    }
    .right {
        flex: 1;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

定位布局+margin；

```css
  .box {
      position: relative;
    }
    .left {
      position: absolute;
      height: 100px;
      width: 100px;
      background-color: skyblue;
    }
    .right {
      margin-left: 100px;
      height: 100px;
      background-color: rosybrown;
    }
```

**三栏布局**

- 两边使用float，中间使用margin
- 两边使用absolute，中间使用margin
- 两边使用float和负margin
- display:table
- display:flex
- display:grid

## 说说弹性盒布局，以及使用场景

弹性盒的属性有；

- flex-direction；决定主轴方向
  - row默认值 水平
  - column；垂直方向
- flex-wrap；是否换行
  - nowrap；不换行
  - wrap；换行
- flex-flow；是flex-direction和flex-wrap的简写
  -  默认为 row nowrap
- justify-content；主轴上的对齐方式
  - flex-start；左对齐
  - flex-end；右对齐
  - center；居中
  - space-between；两端对齐，元素之间间隔相等
  - space-around；两个元素间间隔相等
- align-items；副轴上的对齐方式
  - flex-start；起点对齐
  - flex-end；终点对齐
  - center；居中
- align-content；定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
  - flex-start：与交叉轴的起点对齐
  - flex-end：与交叉轴的终点对齐
  - center：与交叉轴的中点对齐
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
  - stretch（默认值）：轴线占满整个交叉轴

## 介绍一下grid网格布局

grid即网格布局，是一个二维布局的方式。![img](https://static.vue-js.com/59680a40-9a94-11eb-85f6-6fac77c0c9b3.png)

设置display:grid即可

## css3新增了哪些新特性？

- 选择器
  - :nth-child()
- 新样式
  - 边框
    - boeder-radius；圆角边框
    - box-shadow；阴影
    - border-image；使用图片来绘制边框
  - 背景
    - background-clip: border-box; 背景从border开始显示
    - background-clip: padding-box; 背景从padding开始显示
    - background-clip: content-box; 背景显content区域开始显示
    - background-clip: no-clip; 默认属性，等同于border-box
  - 文字
    - word-wrap；换行
    - text-shadow；文本阴影
    - text-decoration；文字渲染
  - 颜色
    - rgba；rgb为颜色值，a为透明度
    - hala；h为色相，s为饱和度，l为亮度，a为透明度
- transition过渡动画
- transform转换
- animation动画
- 渐变
  - linear-gradient：线性渐变
  - radial-gradient：径向渐变

以及还有flex布局，grid布局，媒体查询，多列布局等

## css动画有哪些？

实现动画的方式有三种

- transition 渐变动画
- transform 转变动画 一般配合transition过度使用
  - translate 平移
  - scale 缩放
  - rotate 旋转
  - skew 倾斜
- animation 自定义动画 通过 `@keyframes` 来定义关键帧

## 什么是响应式原理?

即网站的布局会根据视口来调整模块的大小和位置

**实现方式**

- 媒体查询
- 百分比
- vw/vh
- rem

响应式设计的基本原理是通**过媒体查询**检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有`meta`声明`viewport`

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```

## CSS提高性能的方法有哪些？

实现方式有很多种，主要有如下：

- 内联首屏关键CSS
- 异步加载CSS
- 资源压缩
- 合理使用选择器
- 减少使用昂贵的属性
- 不要使用@import引入

## 如何实现文本溢出省略样式？

- overflow:hidden 溢出隐藏
- white-space:nowrap  不换行
- text-overflow:ellipsis 省略号

## css如何画一个三角形？

内容宽高为0，对不想显示的隐藏。

```css
 			 width:0px;  
             height:0px;  
             border: 40px solid;  
             border-color: transparent transparent red transparent; 
```

![img](https://upload-images.jianshu.io/upload_images/6238168-e270e4d37c79e4a7.png?imageMogr2/auto-orient/strip|imageView2/2/w/93/format/webp)

```js
/*记忆口诀：盒子宽高均为零，三面边框皆透明。 */
div:after{
    position: absolute;
    width: 0px;
    height: 0px;
    content: " ";
    border-right: 100px solid transparent;
    border-top: 100px solid #ff0;
    border-left: 100px solid transparent;
    border-bottom: 100px solid transparent;
}
```

