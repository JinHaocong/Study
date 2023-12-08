# 2022-9-2

## MVC

M；model

V；view

C；controller

React并不是一个完整的MVC，最多算是MVC中的V层(view)

## React特性

1. 声明式设计 
2. 高效
3. 灵活
4. JSX 
5. 组件
6. 单向响应的数据流

## 脚手架creat-react-app

创建react项目

## 编写第一个react应用程序

删除src下所有的文件

创建一个index.js(必须是index.js)

```js
import React from 'react'
import ReactDOM from 'react'
ReactDOM.render(<div><b><i>111111</i></b></div>, document.getElementById('root'))
```

JSX == js+xml

## JSX语法

JSX将HTML语法直接插入到JavaScript中，再通过翻译器转换到纯JavaScript后由浏览器执行。

通过Babel编译

```js
ReactDOM.render(React.createElement('div', {
    id: 'aaa',
    className: 'bbb'
}, '111111'), document.getElementById('root'))
```

所谓的JSX就是JavaScript对象，所以使用react和JSX的时候一定要经过的编译过程；

JSX-使用react构造组件，Babel进行编译 => JavaScript对象 => React.DOM.render() =>DOM元素 => 插入页面

## 组件的创建 类组件Class

组件化特点；

- 易复用
- 页面结构清晰

ES6创建一个类(类名一定要大写)

extends继承

```js
class Test {
    constructor() {
        this.a = 1
    }

    testa() {
        console.log('testa');
    }

}

class ChildTest extends Test {
    testb() {
        console.log('testb');
    }
}



var obj = new ChildTest()
obj.testa()
console.log(obj.a);
```

**创建一个类组件的过程**

在组件js中

```js
import React from react
class App extends React.Comnponent {
    render(){
        return <div>hello react component<div/>
    }
}
    
export default App
```

在index文件中

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './01-base/01-Class组件'

ReactDOM.render(<App></App>, document.getElementById('root'))

```

# 2022-9-3

## 组件的创建-函数组件

无状态组件

```js
function App() {
    return (
        <div>
            hello world
        </div>
    )
}

export default App
```

## 组件的创建-嵌套

```js
import React, { Component } from 'react'

class Child extends Component {
    render() {
        return <div>Child</div>
    }
}

class Navbar extends Component {
    render() {
        return <div>Navbar
            <Child></Child>
        </div>
    }
}

class Swiper extends Component {
    render() {
        return <div>Swiper</div>
    }
}

class Tabbar extends Component {
    render() {
        return <div>Tabbar</div>
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Swiper></Swiper>
                <Tabbar></Tabbar>
            </div>
        )
    }
}
```

## 组件的样式

react推荐我们使用行内样式，因为每一个组件就是一个独立的整体

注意

class ==> className 

for ==> htmlFor

```js
import React, { Component } from 'react'
import './css/01-index.css'

export default class App extends Component {
    render() {
        const myname = 'jhc'
        const obj = {
            background: 'yellow',
            color: 'red',
            fontSize: '30px'
        }
        return (
            <div>
                {10 + 20}
                {myname}
                {10 > 20 ? 'aaa' : 'bbb'}
                <div style={obj}>111111111111111</div>
                <div className='active'>123123123</div>
                <label htmlFor='username'>
                    yonhhumiong
                </label>
                <input type='text' id='username'></input>
            </div >
        )
    }
}

```

## 事件处理 this

**事件绑定1**

```js
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                <input type='text'></input>
                <button onClick={() => {
                    console.log('click')
                }}>add1</button>

                {/* this.handleClick 加上小括号会自动执行 */}
                <button onClick={this.handleClick2}>add2</button>
                <button onClick={this.handleClick3}>add3</button>
                <button onClick={() => {
                    this.handleClick4()
                }}>add4</button>
            </div >
        )
    }

    handleClick2() {
        console.log('click2');
    }

    handleClick3 = () => {
        console.log('click3');
    }

    handleClick4 = () => {
        console.log('click4');
    }
}
```

**事件绑定2**

关于this的问题

```js
import React, { Component } from 'react'

export default class App extends Component {
    a = 100
    render() {
        return (
            <div>
                <input type='text'></input>
                <button onClick={() => {
                    console.log('click', this.a)
                }}>add1</button>

                {/* this.handleClick 加上小括号会自动执行 */}
                <button onClick={this.handleClick2.bind(this)}>add2</button>
                <button onClick={this.handleClick3}>add3</button>
                <button onClick={() => {
                    this.handleClick4()
                }}>add4</button>
            </div >
        )
    }

    handleClick2() {
        console.log('click2', this.a);
    }

    handleClick3 = () => {
        console.log('click3', this.a);
    }

    handleClick4() {
        console.log('click4', this.a);
    }
}
```

**事件绑定面试题**

react事件绑定和原生DOM事件绑定有什么区别？

react并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式，绑定在root上

支持evt.target

```js
import React, { Component } from 'react'

export default class App extends Component {
    a = 100
    render() {
        return (
            <div>
                <input type='text'></input>
                <button onClick={() => {
                    console.log('click', this.a)
                }}>add1</button>

                {/* this.handleClick 加上小括号会自动执行 */}
                <button onClick={this.handleClick2.bind(this)}>add2</button>
                <button onClick={this.handleClick3}>add3</button>
                <button onClick={() => {
                    this.handleClick4()
                }}>add4-推荐这种写法</button>
            </div >
        )
    }

    handleClick2() {
        console.log('click2', this.a);
    }

    handleClick3 = (evt) => {
        console.log('click3', this.a, evt.target);
    }

    handleClick4() {
        console.log('click4', this.a);
    }
}
```

## Ref的应用

```js
import React, { Component } from 'react'

export default class App extends Component {
    a = 100
    myref = React.createRef()
    render() {
        return (
            <div>
                <input type='text' ref={this.myref}></input>
                <button onClick={() => {
                    this.handleClick4()
                }}>add4-推荐这种写法</button>
            </div >
        )
    }

    handleClick4() {
        console.log('click4', this.myref.current.value);
    }
}
```

## 状态

状态就是组件描述某种显示情况的数据，由组件自己设置和更改，目的是为了在不同状态下使组件的显示不同

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        text: '收藏',
        show: true
    }
    render() {
        // var text = '收藏'
        return (
            <div>
                <h1>欢迎来到react开发</h1>
                <button onClick={() => {
                    this.setState({
                        show: !this.state.show
                    })
                }}>{this.state.show ? '收藏' : '取消收藏'}</button>
            </div >
        )
    }
}
```

第二种写法

```js
import React, { Component } from 'react'

export default class App extends Component {
    // state = {
    //     text: '收藏',
    //     show: true
    // }
    constructor() {
        super()//继承
        this.state = {
            show: true,
            name: true
        }
    }
    render() {
        // var text = '收藏'
        return (
            <div>
                <h1>欢迎来到react开发</h1>
                <button onClick={() => {
                    this.setState({
                        show: !this.state.show,
                        name: !this.state.name
                    })
                }}>{this.state.show ? '收藏' : '取消收藏'}----{this.state.name ? 'jhc' : 'xiaoming'}</button>
            </div >
        )
    }
}
```

## 列表的渲染

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        list: ['111', '222', '333', '444']
    }
    render() {
        var newlist = this.state.list.map(item => <li key={item}>{item}</li>)
        return (
            <div>
                <ul>
                    {newlist}
                </ul>
            </div>
        )
    }
}
```

## key值解析

diff算法的一种有优化策略，对比时精准的找到要操作的节点。

理想情况，key为id

不涉及列表的删除，增加，重排，设置成index也是可以的

## 案例-todolist

```js
import React, { Component } from 'react'

export default class App extends Component {
    a = 100
    myref = React.createRef()

    state = {
        list: [
            {
                id: 1,
                text: 'aaa'
            },
            {
                id: 2,
                text: 'bbb'
            },
            {
                id: 3,
                text: 'ccc'
            },
            {
                id: 4,
                text: 'ddd'
            }
        ]
    }

    render() {
        var mylist = this.state.list.map((item, index) => <li key={item.id}>{item.text}<button onClick={() => this.handleDelete(index)}>del</button></li>)
        return (
            <div>
                <input type='text' ref={this.myref}></input>
                <button onClick={() => {
                    this.handleAdd()
                }}>add</button>
                <ul>
                    {mylist}
                </ul>
            </div >
        )
    }

    handleAdd = () => {
        //不要直接修改状态，可能会造成不可预期的问题
        // this.state.list.push(this.myref.current.value)
        let newlist = [...this.state.list]
        newlist.push({
            id: parseInt((Math.random() * 100000000)),
            text: this.myref.current.value
        })
        this.setState({
            list: newlist
        })
        //清空输入框
        this.myref.current.value = ''
    }

    handleDelete = (index) => {
        let newlist = Object.assign([], this.state.list)
        newlist.splice(index, 1)
        this.setState({
            list: newlist
        })
    }
}
```

## 条件渲染

```js
import React, { Component } from 'react'
import './css/01-index.css'

export default class App extends Component {
    a = 100
    myref = React.createRef()
    state = {
        list: [
            {
                id: 1,
                text: 'aaa'
            },
            {
                id: 2,
                text: 'bbb'
            },
            {
                id: 3,
                text: 'ccc'
            },
            {
                id: 4,
                text: 'ddd'
            }
        ]
    }

    render() {
        var mylist = this.state.list.map((item, index) => <li key={item.id}>{item.text}<button onClick={() => this.handleDelete(index)}>del</button></li>)
        return (
            <div>
                <input type='text' ref={this.myref}></input>
                <button onClick={() => {
                    this.handleAdd()
                }}>add</button>
                <ul>
                    {mylist}
                </ul>
                {/* {this.state.list.length === 0 ? <div>暂无待办事项</div> : null} */}
                {/* {this.state.list.length === 0 && <div>暂无待办事项</div>} */}
                <div className={this.state.list.length ? 'hidden' : ''}>暂无待办事项</div>
            </div >
        )
    }

    handleAdd = () => {
        //不要直接修改状态，可能会造成不可预期的问题
        // this.state.list.push(this.myref.current.value)
        let newlist = [...this.state.list]
        newlist.push({
            id: parseInt((Math.random() * 100000000)),
            text: this.myref.current.value
        })
        this.setState({
            list: newlist
        })
        //清空输入框
        this.myref.current.value = ''
    }

    handleDelete = (index) => {
        let newlist = Object.assign([], this.state.list)
        newlist.splice(index, 1)
        this.setState({
            list: newlist
        })
        // console.log(newlist.length);
    }
}
```

## dangerouslySetInnerHTML

富文本解析器，可以将HTML片段解析

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        myHtml: `<b>dangerouslySetInnerHTML</b>`
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={
                {
                    __html: this.state.myHtml
                }
            }>
            </div>
        )
    }
}
```

## 案例 选项卡

```js
import React, { Component } from 'react'
import './css/02-index.css'
import Film from './12-childrens/Film.js'
import Center from './12-childrens/Center.js'
import Cinema from './12-childrens/Cinema.js'
export default class App extends Component {
    state = {
        list: [
            {
                id: 1,
                text: '电影'
            },
            {
                id: 2,
                text: '影院'
            },
            {
                id: 3,
                text: '我的'
            }
        ],
        currentIndex: 0
    }
    render() {
        return (
            <div>
                {/* {
                    this.state.currentIndex === 0 && <Film></Film>
                }
                {
                    this.state.currentIndex === 1 && <Cinema></Cinema>
                }
                {
                    this.state.currentIndex === 2 && <Center></Center>
                } */}
                {
                    this.which()
                }
                <ul>
                    {
                        this.state.list.map((item, index) =>
                            <li key={item.id} className={this.state.currentIndex === index ? "active" : ''} onClick={() => {
                                this.handleChange(index)
                            }}>
                                {item.text}
                            </li>)
                    }
                </ul>
            </div >
        )
    }
    handleChange = (index) => {
        this.setState({
            currentIndex: index
        })
    }
    which() {
        switch (this.state.currentIndex) {
            case 0:
                return <Film></Film>
            case 1:
                return <Cinema></Cinema>
            case 2:
                return <Center></Center>

            default:
                return <Film></Film>
        }
    }
}
```

# 2022-9-4

## 数据请求

```js
import React, { Component } from 'react'
import axios from 'axios'

export default class Cinema extends Component {
    constructor() {
        super()
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => console.log(res.data.data)).catch(err => console.log(err))

    }
    render() {
        return (
            <div></div>
        )
    }
}
```

## 模糊查询

```js
import React, { Component } from 'react'
import axios from 'axios'

export default class Cinema extends Component {
    constructor() {
        super()
        this.state = {
            cinemaList: [],
            oldList: []
        }
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => this.setState({
            cinemaList: res.data.data.cinemas,
            oldList: res.data.data.cinemas,
        })).catch(err => console.log(err))

    }
    render() {
        return (
            <div>
                <input onInput={this.handelInput}></input>
                {
                    this.state.cinemaList.map(item =>
                        <dl
                            key={item.cinemaId}>
                            <dt>{item.name}</dt>
                            <dd>{item.address}</dd>
                        </dl>
                    )
                }
            </div>
        )
    }
    handelInput = (evt) => {
        var newcinemaList = this.state.oldList.filter(item => item.name.toUpperCase().includes(evt.target.value.toUpperCase()) || item.address.toUpperCase().includes(evt.target.value.toUpperCase()))
        console.log(newcinemaList);
        this.setState({
            cinemaList: newcinemaList
        })
    }
}
```

## setState同步异步

setState属于异步更新状态，异步更新真实DOM

是为了性能考虑，合并处理

- setState处于异步状态中，是同步更新状态的，同步更新DOM
- setState处于同步状态中，是异步更新状态的，异步更新DOM

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 1
    }
    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.handelAdd}>add</button>
                <button onClick={this.handelAdd2}>add2</button>
            </div>
        )
    }
    handelAdd = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count);
        })
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count);
        })
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count);
        })
    }
    handelAdd2 = () => {
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            })
            this.setState({
                count: this.state.count + 1
            })
            this.setState({
                count: this.state.count + 1
            })
        }, 0)
    }
}
```

setState接受第二个参数，为一个回调函数，状态和DOM更新完后触发

## betterScroll 注意new的时间

```js
this.setState({
            list: list
        }, () => {
            new BetterScroll('.wrapper')
        })
```

也可以用定时器  react18中无效

```js
        setTimeout(() => {
            this.setState({
                list: list
            })
            new BetterScroll('.wrapper')
        })
```

## 属性

状态只能自己使用，外部无法改变

父组件传属性给子组件

父组件

```js
import React, { Component } from 'react'
import Navbar from './16-childrens/Navbar'

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>首页</h2>
                    <Navbar title='首页' leftshow={false}></Navbar>
                </div>
                <div>
                    <h2>列表</h2>
                    <Navbar title='列表' leftshow={true}></Navbar>
                </div>
                <div>
                    <h2>购物车</h2>
                    <Navbar title='购物车' leftshow={true}></Navbar>
                </div>
            </div>
        )
    }
}
```

子组件

```js
import React, { Component } from 'react'

export default class Navbar extends Component {
    state = {
        //状态只能自己用的，外部无法改变
    }

    //属性是父组件传来的，this.props
    render() {
        let { title, leftshow } = this.props
        return (
            <div>
                {leftshow ? <button>返回</button> : null}
                {title}
                <button>home</button>
            </div>
        )
    }
}

```

## 属性验证

react自带验证类型组件

```js
import jhcPropTypes from 'prop-types'
```

验证

```js
import React, { Component } from 'react'
import jhcPropTypes from 'prop-types'

export default class Navbar extends Component {
    state = {
        //状态只能自己用的，外部无法改变
    }

    //属性是父组件传来的，this.props
    render() {
        let { title, leftshow } = this.props
        return (
            <div>
                {leftshow ? <button>返回</button> : null}
                {title}
                <button>home</button>
            </div>
        )
    }
}

//类属性 验证
Navbar.propTypes = {
    title: jhcPropTypes.string,
    leftshow: jhcPropTypes.bool
}
```

第二种写法

```js
import React, { Component } from 'react'
import jhcPropTypes from 'prop-types'

export default class Navbar extends Component {
    state = {
        //状态只能自己用的，外部无法改变
    }

    //类属性 验证
    static propTypes = {
        title: jhcPropTypes.string,
        leftshow: jhcPropTypes.bool
    }

    //属性是父组件传来的，this.props
    render() {
        let { title, leftshow } = this.props
        return (
            <div>
                {leftshow ? <button>返回</button> : null}
                {title}
                <button>home</button>
            </div>
        )
    }
}




//ES7写法
class Test {
    a = 1//对象属性
    static a = 100 //类属性
}
var obj = new Test()
console.log(Test.a, obj.a);
```

## 默认属性

```js
import React, { Component } from 'react'
import jhcPropTypes from 'prop-types'

export default class Navbar extends Component {
    state = {
        //状态只能自己用的，外部无法改变
    }

    //类属性 验证
    static propTypes = {
        title: jhcPropTypes.string,
        leftshow: jhcPropTypes.bool
    }

    static defaultProps = {
        leftshow: true
    }

    //属性是父组件传来的，this.props
    render() {
        let { title, leftshow } = this.props
        return (
            <div>
                {leftshow ? <button>返回</button> : null}
                {title}
                <button>home</button>
            </div>
        )
    }
}
```

## 属性注意

简写

```js
import React, { Component } from 'react'
import Navbar from './16-childrens/Navbar'

export default class App extends Component {
    render() {
        //上面父组件传来
        var obj = {
            title: '测试',
            leftshow: false
        }
        return (
            <div>
                <div>
                    <h2>首页</h2>
                    <Navbar title='首页' leftshow={false}></Navbar>
                </div>
                <div>
                    <h2>列表</h2>
                    <Navbar title='列表' ></Navbar>
                </div>
                <div>
                    <h2>购物车</h2>
                    <Navbar title='购物车' ></Navbar>
                </div>
				
				//简写
                <Navbar title={obj.title} leftshow={obj.leftshow}></Navbar>
                <Navbar {...obj}></Navbar>
            </div >
        )
    }
}
```

函数式组件接受属性

```js
import React from 'react'

export default function Sidebar(props) {
    let { background, position } = props
    var obj1 = {
        left: 0
    }
    var obj2 = {
        right: 0
    }
    var obj = {
        background: background,
        width: '200px',
        position: 'fixed',
    }

    var styleobj = position === 'left' ? { ...obj, ...obj1 } : { ...obj, ...obj2 }
    return (
        <div style={styleobj}>
            <ul>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
            </ul>
        </div >
    )
}


// Sidebar.defaultProps
// Sidebar.propTypes
```

## 状态VS属性

相同点；都是纯js对象，都会触发render更新。

不同点；

- 属性能从父组件获取，状态不能
- 属性可以由父组件修改，状态不能；属性不能在子组件中修改，属性在子组件中是只读的
- 属性和状态设置默认值的方式不同
- 属性不能在组件内部修改，状态要在组件内内部修改
- 属性能设置子组件初始值，状态不可以
- 属性可以修改子组件的值，状态不可以

## 表单的受控与非受控

受控

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        username: 'jhc'
    }
    render() {
        return (
            <div>
                <h1>登录</h1>
                <input type='text' value={this.state.username} onChange={(evt) => {
                    this.setState({
                        username: evt.target.value
                    })
                }}></input>
                <button onClick={() => {
                    console.log(this.state.username);
                }}>登录</button>
                <button onClick={() => {
                    this.setState({
                        username: ''
                    })
                }}>重置</button>
            </div>
        )
    }
}
```

非受控

```js
import React, { Component } from 'react'

export default class App extends Component {
    myusername = React.createRef()
    render() {
        return (
            <div>
                <h1>登录</h1>
                <input type='text' ref={this.myusername} defaultValue='jhc'></input>
                <button onClick={() => {
                    console.log(this.myusername.current.value);
                }}>登录</button>
                <button onClick={() => {
                    this.myusername.current.value = ''
                }}>重置</button>
            </div>
        )
    }
}
```

## 案例 受控影院查询

```js
import React, { Component } from 'react'
import axios from 'axios'

export default class Cinema extends Component {
    constructor() {
        super()
        this.state = {
            cinemaList: [],
            mytext: ''
            // oldList: []
        }
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(
            res => {
                this.setState({
                    cinemaList: res.data.data.cinemas,
                    // oldList: res.data.data.cinemas,
                })
            }
        ).catch(err => console.log(err))

    }
    render() {
        return (
            <div>
                <input value={this.state.mytext} onChange={(evt) => {
                    this.setState({
                        mytext: evt.target.value
                    })
                }}></input>
                {
                    this.getCinemaList().map(item =>
                        <dl
                            key={item.cinemaId}>
                            <dt>{item.name}</dt>
                            <dd>{item.address}</dd>
                        </dl>
                    )
                }
            </div>
        )
    }
    getCinemaList() {
        return this.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.state.mytext.toUpperCase()) || item.address.toUpperCase().includes(this.state.mytext.toUpperCase()))
    }
}
```

## 案例受控 todolist

```js
import React, { Component } from 'react'
import './css/01-index.css'

export default class App extends Component {
    a = 100
    state = {
        list: [
            {
                id: 1,
                text: 'aaa',
                isChecked: false
            },
            {
                id: 2,
                text: 'bbb',
                isChecked: false
            },
            {
                id: 3,
                text: 'ccc',
                isChecked: true
            },
            {
                id: 4,
                text: 'ddd',
                isChecked: false
            }
        ],
        text: '',
    }

    render() {
        var mylist = this.state.list.map((item, index) =>
            <li key={item.id}>
                <input type='checkbox' checked={item.isChecked} onChange={() => this.handleCheck(index)}></input>
                <span dangerouslySetInnerHTML={
                    { __html: item.text }
                } style={{ textDecoration: item.isChecked ? 'line-through' : '' }}></span>
                <button>Finished</button>
                <button onClick={() => this.handleDelete(index)}>del</button>
            </li >)
        return (
            <div>
                <input type='text' value={this.state.text} onChange={(evt) => {
                    this.setState({
                        text: evt.target.value
                    })
                }}></input>
                <button onClick={() => {
                    this.handleAdd()
                }}>add</button>
                <ul>
                    {mylist}
                </ul>
                {/* {this.state.list.length === 0 ? <div>暂无待办事项</div> : null} */}
                {/* {this.state.list.length === 0 && <div>暂无待办事项</div>} */}
                <div className={this.state.list.length ? 'hidden' : ''}>暂无待办事项</div>
            </div >
        )
    }

    handleAdd = () => {
        let newlist = [...this.state.list]
        newlist.push({
            id: parseInt((Math.random() * 100000000)),
            text: this.state.text
        })
        this.setState({
            list: newlist,
            text: '',
            isChecked: false
        })
    }

    handleDelete = (index) => {
        let newlist = Object.assign([], this.state.list)
        newlist.splice(index, 1)
        this.setState({
            list: newlist
        })
    }

    handleCheck = (index) => {
        let newlist = [...this.state.list]
        newlist[index].isChecked = !newlist[index].isChecked
        this.setState({
            list: newlist
        })
    }
}
```

## 父子通信

通过父传一个函数属性，在函数中进行一些操作，然后再子中调用这个函数，来达到子通知父修改父的状态的效果

父传子；props

子传父；回调函数

```js
import React, { Component } from 'react'


class Navbar extends Component {
    render() {
        return (
            <div style={{ background: 'skyblue' }}>
                <button onClick={() => {
                    this.props.isShow()
                }}>click</button>
                <span>navbar</span>
            </div>
        )
    }
}

class Sidebar extends Component {
    render() {
        return (
            <div style={{ background: 'purple', width: '200px' }}>
                <ul>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                    <li>111211</li>
                </ul>
            </div>
        )
    }
}

export default class App extends Component {
    state = {
        isShow: true
    }
    render() {
        return (
            <div>
                <Navbar isShow={() => {
                    this.setState({
                        isShow: !this.state.isShow
                    })
                }}></Navbar>
                {this.state.isShow && <Sidebar></Sidebar>}
            </div>
        )
    }
}
```

## 受控与非受控

子组件尽量写成无状态，所有的状态由父组件通过属性传过去，这样就能控制子组件的行为。

函数式写法

```js
import React from 'react'

export default function Tabbar(props) {
    return (
        <div>
            <ul>
                {
                    props.list.map((item, index) =>
                        <li key={item.id} className={props.currentIndex === index ? "active" : ''} onClick={() => {
                            props.change(index)
                        }}>
                            {item.text}
                        </li>)
                }
            </ul>
        </div>
    )
}
```

## 父子通信 表单域组件

父组件中

```js
import React, { Component } from 'react'
import Field from './04-childrens/Field'

export default class App extends Component {
    state = {
        username: 'jhc',
        password: '8888888'
    }
    render() {
        return (
            <div>
                <h1>登陆页面</h1>
                <Field label='用户名' type="text" onChange={(value) => {
                    this.setState({
                        username: value
                    })
                }} value={this.state.username}></Field>
                <Field label='密码' type="password" onChange={(value) => {
                    this.setState({
                        password: value
                    })
                }} value={this.state.password}></Field>
                <button onClick={() => {
                    console.log(this.state.username, this.state.password);
                }}>登录</button>
                <button onClick={() => {
                    this.setState({
                        username: '',
                        password: ''
                    })
                }}>取消</button>
            </div>
        )
    }
}
```

子组件中

```js
import React, { Component } from 'react'

export default class Filed extends Component {
    render() {
        return (
            <div style={{ background: 'skyblue' }}>
                <label>{this.props.label}</label>
                <input type={this.props.type} onChange={(evt) => { this.props.onChange(evt.target.value) }} value={this.props.value}></input>
            </div >
        )
    }
}
```

## ref 表单域组件

父组件

```js
import React, { Component } from 'react'
import Field from './05-childrens/Field'

export default class App extends Component {
    username = React.createRef()
    password = React.createRef()
    render() {
        return (
            <div>
                <h1>登陆页面</h1>
                <Field label='用户名' type="text" ref={this.username}></Field>
                <Field label='密码' type="password" ref={this.password}></Field>
                <button onClick={() => {
                    console.log(this.username.current.state.value, this.password.current.state.value);
                }}>登录</button>
                <button onClick={() => {
                    this.username.current.clear()
                    this.password.current.clear()
                }}>取消</button>
            </div>
        )
    }
}
```

子组件

```js
import React, { Component } from 'react'

export default class Filed extends Component {
    state = {
        value: ''
    }
    clear() {
        this.setState({
            value: ''
        })
    }
    render() {
        return (
            <div style={{ background: 'skyblue' }}>
                <label>{this.props.label}</label>
                <input type={this.props.type} onChange={(evt) => {
                    this.setState({
                        value: evt.target.value
                    })
                }} value={this.state.value}></input>
            </div >
        )
    }
}
```

# 2022-9-5

## 非父子通信，状态提升

非父子通信；状态提升，提升到最近的一个父组件(共用)(中间人模式)

同一父的兄的组件，通过父组件间接通信。

## 非父子通信，发布订阅模式

```js
var bus = {
    list: [],
    //订阅
    subscribe(callback) {
        this.list.push(callback)
    },

    //发布
    publish(data) {
        //遍历list，执行回调函数
        this.list.forEach(callback => callback && callback(data))
    }
}

//订阅者
bus.subscribe((data) => { console.log('1111', data); })
bus.subscribe((data) => { console.log('2222', data); })

//发布者
bus.publish('55555')
```

## 非父子通信，context状态树

生产者消费者

```js
import React, { Component } from 'react'
import axios from 'axios'
import './css/06-index.css'

//创建context对象
const GlobalContext = React.createContext()

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            filmlist: [],
            detail: ''
        }
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=1721144',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': "mall.film-ticket.film.list"
            }
        }).then(res => {
            this.setState({
                filmlist: res.data.data.films
            })
        })
    }
    render() {
        return (
            <GlobalContext.Provider value={{
                detail: this.state.detail,
                changedetail: (detail) => {
                    this.setState({
                        detail: detail
                    })
                }
            }}>
                <div>
                    {
                        this.state.filmlist.map(item =>
                            <FilmItem key={item.filmId} {...item} ></FilmItem>
                        )

                    }
                    <FilmDetail></FilmDetail>
                </div>
            </GlobalContext.Provider>
        )
    }
}


class FilmDetail extends Component {
    constructor() {
        super()
        this.state = {
            detail: ''
        }
    }
    render() {
        return (
            <GlobalContext.Consumer>
                {
                    (value) => {
                        return (
                            <div className='filmDetail'>
                                {
                                    value.detail
                                }
                            </div>
                        )
                    }
                }
            </GlobalContext.Consumer>
        )
    }
}

class FilmItem extends Component {
    render() {
        const { name, poster, grade, synopsis } = this.props
        return (
            <GlobalContext.Consumer>
                {
                    (value) => {
                        return (
                            <div className='filmItem' onClick={() => {
                                value.changedetail(synopsis)

                            }}>
                                <img src={poster} alt=''></img>
                                <h4>{name}</h4>
                                <div>观众评分；{grade || '暂无'}</div>
                            </div>
                        )
                    }
                }
            </GlobalContext.Consumer>
        )
    }
}
```

//创建context对象
const GlobalContext = React.createContext()

## React 插槽

- 为了复用
- 一定程度减少了父子通信

```js
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                <Child>
                    <div>111</div>
                    <div>222</div>
                    <div>333</div>
                </Child>
            </div>
        )
    }
}


class Child extends Component {
    render() {
        return (
            <div>Child
                {/* 插槽 */}
                {this.props.children[0]}
                {this.props.children[2]}
                {this.props.children[1]}
            </div>
        )
    }
}
```

## 生命周期

- 初始化
- 运行中
- 销毁

## 生命周期-初始化

- componentWillMount：render之前最后一次修改状态的机会，初始化数据
- render；只能访问this.props和this.sate，不允许修改状态和DOM输出
- componentDidMount；成功render并渲染完成真实DOM之后触发，可以修改DOM
  - 数据请求axios
  - 订阅
  - setTimeout
  - 基于创建完的DOM的进行 如 betterScroll Swiper等

## 初始化注意

componentWillMount => UNSAFE_componentWillMount

## 初始化案例

BetterScroll 注意new的时间

## 生命周期-运行中阶段1

- UNSAFE_componentWillUpdate更新前执行 获取不到更新后的DOM
- componentDidUpdate更新后执行 可以获取到最新的DOM
  - 缺点；每次更新都会执行，会执行多次 new 多次
  - 两个参数 *prevProps*, *prevState* 老的属性

```js
    componentDidUpdate(prevProps, prevState) {
        console.log('did', document.querySelector('#myname').innerHTML);
        //更新后获取DOM
        if (prevState.filmlist.length === 0) {
            new BScroll('#wrapper')
            console.log('new scroll');
        }
    }
```

## 生命周期-运行中阶段2

- shouldComponentUpdate 应该更新吗 返回一个Boolean 
  - 用来控制是否需要更新，提升性能

## 运行中2案例

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        list: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
        current: 0
    }
    render() {
        return (
            <div>
                <input type="number" onChange={(evt) => {
                    this.setState({
                        current: evt.target.value * 1
                    })
                }} defaultValue={this.state.current}></input>
                <div style={{ overflow: 'hidden' }}>
                    {
                        this.state.list.map(
                            (item, index) => <Box key={item} current={this.state.current} index={index}></Box>
                        )
                    }
                </div>
            </div >
        )
    }
}

class Box extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.current === this.props.index || nextProps.current === nextProps.index) {
            return true
        } else {
            return false
        }
    }
    render() {
        console.log('render');
        return (
            <div style={{ width: '100px', height: '100px', border: '1px solid gray', textAlign: 'center', lineHeight: '100px', margin: '10px', float: 'left', background: this.props.current === this.props.index ? 'skyblue' : '' }}>Box</div>
        )
    }
}

```

## 生命周期-运行中阶段3

UNSAFE_componentWillReceiveProps 在父组件的状态更新时触发，即使没传属性给子

他的意义在于可以最先获得父传来的属性

也可以把属性转换成子组件自己的状态

## 运行中3案例

```js
import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
    state = {
        type: 1
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={() => {
                        this.setState({
                            type: 1
                        })
                    }}>正在热映</li>
                    <li onClick={() => {
                        this.setState({
                            type: 2
                        })
                    }}>即将上映</li>
                </ul>
                <Filmlist type={this.state.type}></Filmlist>
            </div>
        )
    }
}

class Filmlist extends Component {
    state = {
        filmlist: []
    }
    //初始化生命周期 只执行一次
    componentDidMount() {
        if (this.props.type === 1) {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2881469',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                this.setState({
                    filmlist: res.data.data.films
                })
            })
        } else {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=9256815',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                this.setState({
                    filmlist: res.data.data.films
                })
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type === 1) {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2881469',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                this.setState({
                    filmlist: res.data.data.films
                })
            })
        } else {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=9256815',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                this.setState({
                    filmlist: res.data.data.films
                })
            })
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.filmlist.map(item =>
                            <li key={item.filmId}>{item.name}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
```

## 生命周期-销毁

componentWillUnmount组件被销毁时触发

多用于清空一些事件监听

```js
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isCreated: true
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        isCreated: !this.state.isCreated
                    })
                }}>haha</button>
                {this.state.isCreated ? <Child></Child> : null}
            </div>
        )
    }
}

class Child extends Component {
    componentDidMount() {
        window.onresize = () => {
            console.log('resize');
        }

        this.timer = setInterval(() => {
            console.log('111');
        }, 1000)
    }
    componentWillUnmount() {
        console.log('unmount');
        window.onresize = null
        clearInterval(this.timer)
    }
    render() {
        return (
            <div>Child</div>
        )
    }
}
```

## 生命周期

1. 初始化阶段
   - componentWillMount 挂载前 只触发一次
   - render 渲染
   - componentDidMount 挂载完成
2. 运行中阶段
   - componentWillReceiveProps 父组件状态改变触发
   - shouldComponentUpdate 是否要进行更新
   - componentWillUpdate 更新前
   - render 进行渲染
   - componentDidUpdate 更新完成
3. 销毁阶段
   - componentWillUnmount 销毁前操作

## 新生命周期-getDerivedStateFromProps

可以代替componentWillMount ，componentWillReceiveProps 

每次初始化，更新都会执行

注意 没有this

## 新生命周期-getSnapshotBeforeUpdate

可以代替componentWillUpdate 

比render晚

要结合componentDidUpdate一起使用

## 案例

```js
import React, { Component } from 'react'
import './css/22-index.css'

export default class App extends Component {
    myref = React.createRef()
    state = {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    getSnapshotBeforeUpdate() {
        //获取新增操作前的高度
        return this.myref.current.scrollHeight
    }
    componentDidUpdate(prevProps, prevState, value) {
        this.myref.current.scrollTop += this.myref.current.scrollHeight - value
    }
    render() {
        return (
            <div>
                <h1>邮箱</h1>
                <button onClick={() => {
                    this.setState({
                        list: [...[11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], ...this.state.list]
                    })
                }}>add</button>
                <div style={{ height: '200px', overflow: 'auto' }} ref={this.myref}>
                    <ul>
                        {
                            this.state.list.map(item => <li key={item} style={{ height: '100px', background: 'skyblue' }}>{item}</li>)
                        }
                    </ul>
                </div>
            </div >
        )
    }
}

```

## React性能优化

- shouldComponentUpdate，手动
- PureComponent，自动
  - 他会比较新旧state，props，无变化就不会执行render
  - 如果state或props一直在变，shouldComponentUpdate并不会比较快，因为对比新旧state，props，也需要花费时间

## 轮播组件案例1

异步中要注意new的时间

```js
import React, { Component } from 'react'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default class App extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: ['111', '222', '333', '444']
            }, () => {
                new Swiper('.swiper', {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    loop: true,
                })
            })

        }, 1000)
    }
    // componentDidUpdate(prevProps, prevState) {
    //     new Swiper('.swiper', {
    //         pagination: {
    //             el: '.swiper-pagination',
    //         },
    //         loop: true,
    //     })
    // }
    render() {
        return (
            <div>
                <div className="swiper" style={{ height: '200px', background: 'skyblue' }}>
                    <div className="swiper-wrapper">
                        {
                            this.state.list.map(item => <div className="swiper-slide" key={item}>{item}</div>)
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
```

## 轮播组件2 封装

## hooks-useState

使用hooks理由

1. 高阶组件为了复用，导致代码层级复杂
2. 生命周期的复杂
3. 携程function组件，无状态组件，因为需要状态，又改成类组件，成本高

```js
import React, { useState } from 'react'

export default function App() {
    const [name, setName] = useState('jhc')
    const [age, setAge] = useState('20')
    return (
        <div>
            <button onClick={() => {
                setName('xiaoming')
                setAge('88')
            }}>onClick</button>
            {name}-{age}
        </div>
    )
}
```

## 函数式组件 todolist

```js
import React, { useState } from 'react'

export default function App() {
    const [text, setText] = useState('')
    const [list, setList] = useState(['aa', 'bb', 'cc'])

    const handleChange = (evt) => {
        setText(evt.target.value)
    }

    const hadleAdd = () => {
        if (text === '') {
            return
        }
        setList([...list, text])
        setText('')
    }
    const handleDelete = (index) => {
        var oldList = [...list]
        oldList.splice(index, 1)
        setList(oldList)
    }

    return (
        <div>
            <input onChange={
                handleChange
            } value={text}></input>
            <button onClick={hadleAdd}>add</button>
            <ul>
                {
                    list.map((item, index) => <li key={parseInt(Math.random() * 10000)}>
                        {item}
                        <button onClick={() => {
                            handleDelete(index)
                        }}>del</button>
                    </li>)
                }
            </ul>
            {list.length === 0 ? <div>暂无待办事项</div> : null}
        </div>
    )
}
```

## hooks-useEffect1(副作用函数)

useEffect在页面渲染完之后调用

函数式组件不存在生命周期

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=3911924',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025","bc":"110100"}',
                'X-Host': ' mall.film-ticket.film.list'
            }
        }).then(res => {
            setList(res.data.data.films)
        })
    }, [list.length])

    return (
        <div>
            <ul>
                {
                    list.map(item => <li key={item.filmId}>{item.name}</li>)
                }
            </ul>
        </div>
    )
}
```

## hooks-useEffect2

```js
    useEffect(() => {
        setName(name.substring(0, 1).toUpperCase() + name.substring(1))
    }, [name])
```

useEffect的第二个参数是一个数组；依赖，当依赖更新时，useEffect就会执行

## useEffect案例

```js
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
    const [type, setType] = useState(1)
    return (
        <div>
            <ul>
                <li onClick={() => {
                    setType(1)
                }}>正在热映</li>
                <li onClick={() => {
                    setType(2)
                }}>即将上映</li>
            </ul>
            <Filmlist type={type}></Filmlist>
        </div>
    )
}


function Filmlist(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        if (props.type === 1) {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2881469',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                setList(res.data.data.films)
            })
        } else {
            axios({
                method: 'get',
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=9256815',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then((res) => {
                setList(res.data.data.films)
            })
        }
    }, [props.type])

    return (
        <div>
            <ul>
                {
                    list.map(item =>
                        <li key={item.filmId}>{item.name}</li>
                    )
                }
            </ul>
        </div>
    )
}
```

# 2022-9-6

## useEffect3

```js
function Child() {
    useEffect(() => {
        window.onresize = () => {
            console.log('resize');
        }

        const timer = setInterval(() => {
            console.log('111');
        }, 1000)

        return () => {
            window.onresize = null
            clearTimeout(timer)
        }
    }, [])
    return (
        <div>Child</div>
    )
}
```

内部返回的函数时在组件销毁后执行，利用的是闭包

且useEffet可以用多次

## useEffect和useLayoutEffect的区别

他们调用的时机不一样

useLayoutEffect和原来的componentDidMount和componentDidUpdate一致，在完成DOM更新后马上同步调用的代码，会阻塞页面渲染。在这其中可以进行一些DOM操作，因为还未渲染，不会页面抖动，减少了重排，回流。

useEffect时整个页面渲染完之后才会调用的，不会阻塞页面渲染

## useCallback记忆函数

```js
    const handleChange = useCallback(
        (evt) => {
            setText(evt.target.value)
        },
        [],
    )


    const hadleAdd = useCallback(
        () => {
            if (text === '') {
                return
            }
            setList([...list, text])
            setText('')
        },
        [text, list],
    )
```

可以优化性能，根据依赖值是否变化来是否调用

防止因为组件重新渲染导致方法非重新创建，只有相关的依赖发生改变了，才会重新创建一次

## useMemo记忆组件

useCallback不会执行第一个参数函数，而是将它返回给你，而useMemo会执行第一个函数并将函数执行结果返回给你

```js
    const handleDelete = useMemo(
        () => (index) => {
            var oldList = [...list]
            oldList.splice(index, 1)
            setList(oldList)
        },
        [list],
    )
```

相当于vue中的计算属性

```js
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'




export default function Cinema() {
    const [mytext, setMytext] = useState('')
    const [cinemaList, setCinemaList] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(
            res => {
                setCinemaList(res.data.data.cinemas)
            }
        ).catch(err => console.log(err))
    }, [])

    const getCinemaList = useMemo(() =>
        cinemaList.filter(item => item.name.toUpperCase().includes(mytext.toUpperCase()) || item.address.toUpperCase().includes(mytext.toUpperCase())), [cinemaList, mytext])

    return (
        <div>
            <input value={mytext} onChange={(evt) => {
                setMytext(evt.target.value)
            }}></input>
            {
                getCinemaList.map(item =>
                    <dl
                        key={item.cinemaId}>
                        <dt>{item.name}</dt>
                        <dd>{item.address}</dd>
                    </dl>
                )
            }
        </div>
    )
}
```

## hooks-useRef

ref也可以用来保存变量，闭包原理

```js
import React, { useState, useRef } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    var mycount = useRef(0)
    return (
        <div>
            <button onClick={() => {
                setCount(count + 1)
                mycount.current++
            }}>+1</button>
            {count}-{mycount.current}
        </div>
    )
}
```

## hooks-useContext

减少组件层级，取代之前消费者复杂的写法

```js
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './css/12-index.css'

//创建context对象
const GlobalContext = React.createContext()


export default function App() {
    const [filmlist, setFilmlist] = useState([])
    const [detail, setDetail] = useState('')
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=1721144',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': "mall.film-ticket.film.list"
            }
        }).then(res => {
            setFilmlist(res.data.data.films)
        })
    }, [filmlist])

    return (
        <GlobalContext.Provider value={{
            detail: detail,
            changedetail: (detail) => {
                setDetail(detail)
            }
        }}>
            <div>
                {
                    filmlist.map(item =>
                        <FilmItem key={item.filmId} {...item} ></FilmItem>
                    )

                }
                <FilmDetail></FilmDetail>
            </div>
        </GlobalContext.Provider>
    )
}

function FilmDetail() {
    const value = useContext(GlobalContext)
    return (
        <div className='filmDetail'>
            {
                value.detail
            }
        </div>
    )
}

function FilmItem(props) {
    const { name, poster, grade, synopsis } = props
    const value = useContext(GlobalContext)
    return (

        <div className='filmItem' onClick={() => {
            value.changedetail(synopsis)

        }}>
            <img src={poster} alt=''></img>
            <h4>{name}</h4>
            <div>观众评分；{grade || '暂无'}</div>
        </div>

    )
}
```

## hooks-useReducer

一般结合React.createContext()，useContext()，使用

实现跨级通信

```js
import React, { useReducer, useContext } from 'react'

const GlobalContext = React.createContext()

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <GlobalContext.Provider value={
            { state, dispatch }
        }>
            <div>
                <Child1></Child1>
                <Child2></Child2>
                <Child3></Child3>
            </div>
        </GlobalContext.Provider>
    )
}

function Child1() {
    const { dispatch } = useContext(GlobalContext)
    return (
        <div>
            <button onClick={() => {
                dispatch({
                    type: 'a',
                    value: '5555'
                })
            }}>改变a</button>
            <button onClick={() => {
                dispatch({
                    type: 'b',
                    value: '4444'
                })
            }}>改变b</button>
        </div>
    )
}

function Child2() {
    const { state } = useContext(GlobalContext)
    return (
        <div>Childa-{state.a}</div>
    )
}

function Child3() {
    const { state } = useContext(GlobalContext)
    return (
        <div>Childb-{state.b}</div>
    )
}

//外部状态管理
const initialState = {
    a: '1111',
    b: '2222'
}

const reducer = (preState, action) => {
    let newState = { ...preState }
    switch (action.type) {
        case 'a':
            newState.a = action.value
            return newState
        case 'b':
            newState.b = action.value
            return newState
        default:
            return preState
    }
}
```

注意；不支持异步

## 自定义hooks

必须要以use开头

将js逻辑抽出来当都封装成一个函数，函数式编程思想

```js
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

function useCinemaList() {
    const [cinemaList, setCinemaList] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(
            res => {
                setCinemaList(res.data.data.cinemas)
            }
        ).catch(err => console.log(err))
    }, [])

    return {
        cinemaList
    }
}

function useFilter(cinemaList, mytext) {
    const getCinemaList = useMemo(() =>
        cinemaList.filter(item => item.name.toUpperCase().includes(mytext.toUpperCase()) || item.address.toUpperCase().includes(mytext.toUpperCase())), [cinemaList, mytext])

    return {
        getCinemaList
    }
}

export default function Cinema() {
    const [mytext, setMytext] = useState('')

    const { cinemaList } = useCinemaList()

    const { getCinemaList } = useFilter(cinemaList, mytext)

    return (
        <div>
            <input value={mytext} onChange={(evt) => {
                setMytext(evt.target.value)
            }}></input>
            {
                getCinemaList.map(item =>
                    <dl
                        key={item.cinemaId}>
                        <dt>{item.name}</dt>
                        <dd>{item.address}</dd>
                    </dl>
                )
            }
        </div>
    )
}
```

## 路由的引入

路由的安装

npm install react-router-dom

## 一级路由与多级路由

```js
import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Films from '../view/Films'
import Cinemas from '../view/Cinemas'
import Mine from '../view/Mine'

export default class MyRouter extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Route path='/films' component={Films}></Route>
                    <Route path='/cinemas' component={Cinemas}></Route>
                    <Route path='/mine' component={Mine}></Route>
                </HashRouter>
            </div>
        )
    }
}
```

## 路由重定向

```js
export default class MyRouter extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path='/films' component={Films}></Route>
                        <Route path='/cinemas' component={Cinemas}></Route>
                        <Route path='/mine' component={Mine}></Route>

                        {/* 模糊匹配 */}
                        {/* <Redirect from='/' to='/films'></Redirect> */}

                        {/* 精确匹配 */}
                        <Redirect from='/' to='/flims' exact></Redirect>

                        <Route component={NotFound}></Route>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

```

## 嵌套路由

要在进行嵌套的路由里面写

## 声明式导航和编程式导航

声明式导航

<NavLink to='/films' activeClassName='jhc'>电影</NavLink>

原理 window.onhashchange

```js
export default class Tabbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to='/films' activeClassName='jhc'>电影</NavLink>
                    </li>
                    <li>
                        <NavLink to='/cinemas' activeClassName='jhc'>影院</NavLink>
                    </li>
                    <li>
                        <NavLink to='/mine' activeClassName='jhc'>我的</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
```

编程式导航

原理

```js
    const handleChangePage = (id) => {
        window.location.href = `#/detail${id}`
    }
```

实质上是Router的子组件

```js
   import { useHistory } from 'react-router-dom'

	const history = useHistory()

    const handleChangePage = (id) => {
        // window.location.href = `#/detail${id}`
        // props.history.push(`/detail/${id}`)
        history.push(`/detail/${id}`)
    }
```

useHistory是路由封装好的 等价于 props.history.push

## 动态路由

```js
                        <Route path='/detail/:id' component={Detail}></Route>
```

```js
import React from 'react'

export default function Detail(props) {
    console.log(props.match.params.id);
    return (
        <div>Detail</div>
    )
}
```

方法一 动态路由传参 (params传参)，加到路径中的

```js
history.push(`/detail/${id}`)



路由中
<Route path='/detail/:id' component={Detail}></Route>
```

方法二 query传参

```js
        //query 传参
        history.push({
            pathname: '/detail',
            query: {
                id
            }
        })
```

方法三 state传参

```js
        //state 传参
        history.push({
            pathname: '/detail',
            state: {
                id
            }
        })
```

注意方法二，方法三跳转后重新刷新会报错，所以要使用第一种方案

三个方法传的参数都可以在子中通过prop拿到

## 路由拦截

```js
<Route path='/mine' render={() => {
         return isAuth() ? <Mine></Mine> : <Redirect to='/login' ></Redirect>
                        }}></Route>
```

通过 render进行判断 拦截

## 路由模式

HashRouter带#

BrowserRouter不带

注意BrowserRouter需要和后端配合，后端无对应路径处理会404

## withRouter

在组件没有父 来传props，为了防止props.history.push路由跳转宝undefined错误，使用withRouter(子组件)

高阶组件

## 反向代理

src/setupProxy.js

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://i.maoyan.com',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api': ''
            // }
        })
    );
};
```

修改后一定要记得保存

## CSSModule

防止css样式冲突

## Flux和Redux介绍

Flux是一种软件架构思想，专门解决软件结构问题，根MVC是一类的

单向数据流

1. 用户访问页面，
2. View发出用户的Action
3. Dispatcher收到Action，要求Store进行相应的更新
4. Store更新之后，发出change事件
5. View收到change事件后，更新页面

Redux是纯js实现的，应用状态管理，用一个单独的常量状态树来保存状态

就是相当于在组建外部创建一个‘全局’状态树，以达到共享状态的目的

## Redux工作流

- 我们自己创建的 react 组件，它的状态不再保存在自己组件内，而是交给 `store` 进行统一管理。
- 当我们想要修改 `store` 中某个状态时，就需要通过 `action` 进行告知， `action` 像一个**仓库管理的手册**，根据某个 `action` 就可以做到什么样的数据修改。
- 我们触发了 `action` 描述的内容时，就会通知 `store` 发生相应的变化，但是 `store` 只是一个**仓库**，不能自己改变，所以需要**其他人**帮助，这时 `reducer` 就出现了。
- `reducer` 是一个纯函数，就像一个**机器人**，它没有思想，你给它相同的 `action` 它始终都会对 `store` 做出相同的改变。
- 于是我们触发的 `action` 会让 `reducer` 做出对应的动作，最终让 `store` 发生相应的变化， `store` 发生变化最后就会触发我们组建的渲染动作。

## Redux实战

在detail组件中，一进来就发布

```js
    useEffect(() => {
        //store.dispatch 发出更改通知
        store.dispatch({
            type: 'HIDETABBAR'
        })
        return () => {
            store.dispatch({
                type: 'SHOWTABBAR'
            })
        }
    }, [])
```

然后store接受并让reducer执行

```js
import { configureStore } from '@reduxjs/toolkit'

const reducer = (preState = { show: true }, action) => {
    let newState = { ...preState }
    switch (action.type) {
        case 'HIDETABBAR':
            newState.show = false
            return newState
        case 'SHOWTABBAR':
            newState.show = true
            return newState
        default:
            return preState
    }
}

const store = configureStore({ reducer: reducer })

export default store
```

通知App.js订阅者，进行相应操作，将最新状态存到自己的状态中

```js
    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                isShow: store.getState().show
            })
        })
    }
```

## Redux原理

```js
const reducer = (preState = { show: true }, action) => {
    let newState = { ...preState }
    switch (action.type) {
        case 'HIDETABBAR':
            newState.show = false
            return newState
        case 'SHOWTABBAR':
            newState.show = true
            return newState
        default:
            return preState
    }
}

function configureStore1(reducer) {
    var list = []
    var state = reducer(undefined, {})//初始值
    function subscribe(callback) {
        list.push(callback)
    }
    function dispatch(action) {
        state = reducer(state, action)
        for (var i in list) {
            list[i] && list[i]()
        }
    }
    function getState() {
        return state
    }
    return {
        subscribe,
        dispatch,
        getState
    }
}
```

# 2022-9-7

## Redux reducer合并

redux使用三大原则

- state以单一对象储存在store中
- state只读
- 使用纯函数 reducer执行state更新

纯函数：

1. 对外界没有副作用
2. 同样的输入得到同样的输出

```js
var obj ={
    myname:'jhc'
}
function test(obj){
    var newobj = {...obj}
    newobj.myname = 'xiaoming'
    returm newobj 
}

test(obj)
```

redux将state存到内存中，刷新页面就会消失，不持久

reducer拆分合并；

旧

```js
 const reducer = combineReducers({
     TabbarReducer,
    CityReducer
})
```

新的

```js
const store = configureStore({
    reducer: {
        TabbarReducer,
        CityReducer
    }
})
```

dispatch之后所有的reducer和订阅者都会执行一边，找到匹配的。

## Redux中间件 redux-thunk

用来处理异步请求

默认情况下action只允许返回一个对象

加了中间件之后会判断

```js
function getCinemaListAction() {
    return (dispatch) => {
        axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => {
            dispatch({
                type: 'CHANGECINEMALIST',
                cinemaList: res.data.data.cinemas
            })
        })
    }

}
```

销毁组件时取消订阅

```js
    useEffect(() => {
        if (store.getState().CinemaListReducer.cinemaList.length === 0) {
            //发起取数据的请求
            store.dispatch(getCinemaListAction())
        } else {
            //缓存
        }

        var unsubscribe = store.subscribe(() => {
            setCinemaList(store.getState().CinemaListReducer.cinemaList)
        })
        return () => {
            //取消订阅
            unsubscribe()
        }
    }, [])
```



## Redux中间件 redux-promise

4年没维护了 狗都不用 还不好用

```js
function getCinemaListAction() {
    return axios({
        method: 'get',
        url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
        headers: {
            "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
            'X-Host': 'mall.film-ticket.cinema.list'
        }
    }).then(res => {
        return ({
            type: 'CHANGECINEMALIST',
            cinemaList: res.data.data.cinemas
        })
    })

}
```

## redux-react引入

connect函数 高阶组件

跨级通信

先给根组件套上Provider 并将仓库store作为属性传入

```js
import { Provider } from 'react-redux'



root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
)
```

在子组件中以connect形式导出 传两个参数，第一个返回属性的回调函数，第二个是dispatch的对象集合

```js
const mapStateToProps = (state) => {
    return {
        cinemaList: state.CinemaListReducer.cinemaList,
        cityName: state.CityReducer.cityName
    }
}

const mapDsipatchToProps = {
    getCinemaListAction
}

export default connect(mapStateToProps, mapDsipatchToProps)(Cinemas)
```

这样，组件就可以通过props获取这些属性和方法

## react-redux原理

connect是一种高阶组件(HOC)

Provider组件，可以让容器组件拿到state，使用了context

- 代码复用
- 增删改props
- 渲染劫持

手写connect

```js
import React from 'react'

function NotFound(props) {
    console.log(props);
    return (
        <div>NotFound</div>
    )
}

function jhcconnect(cb, obj) {
    var value = cb()
    return (MyComponent) => {
        //返回函数式组件
        return (props) => {
            return <div style={{ color: 'red' }}>
                <MyComponent {...props} {...value} {...obj}></MyComponent>
            </div>
        }
    }
}

const mapStateToProps = () => {
    return {
        a: 1,
        b: 2
    }
}

const mapFuncToProps = {
    aa() {

    },
    bb() {

    }
}


export default jhcconnect(mapStateToProps, mapFuncToProps)(NotFound)
```

原理就是闭包，函数柯里化，高阶函数

## redux持久化

redux-persist

```js
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import TabbarReducer from './reducers/TabbarReducer'
import CityReducer from './reducers/CityReducer'
import CinemaListReducer from './reducers/CinemaListReducer'
import reduxTrunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'city',
    storage,
    //白名单
    whitelist: ['CityReducer']
}


const reducer = combineReducers({
    TabbarReducer,
    CityReducer,
    CinemaListReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: [reduxTrunk, reduxPromise]
})

let persistor = persistStore(store)

export { store, persistor }

```

## antd组件库

## immutable-引入

每次修改一个immutable对象都会创建一个新的不可变的对象，在新对象上操作数据不会影响原对象的数据，深拷贝

浅拷贝

```js
var obj = {
    name: 'jhc'
}

var obj2 = obj
obj2.name = 'xiaoming'
console.log(obj, obj2);
```

immutable 是一个用来深拷贝的库

## immutable-基础

```js
var obj = {
    name: 'jhc',
    age: 100
}

var oldImmuObj = Map(obj)
console.log(oldImmuObj);

var newImmuObj = oldImmuObj.set('name', 'xiaoming')
console.log(newImmuObj);

//get 获取
console.log(oldImmuObj.get('name'), newImmuObj.get('name'))

//转换成普通对象
console.log(oldImmuObj.toJS(), newImmuObj.toJS());

export default class App extends Component {

    state = {
        info: Map({
            name: 'jhc',
            age: 21
        })
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        info: this.state.info.set('name', 'xiaoming').set('age', 18)
                    })
                }}>change</button>
                App---{this.state.info.get('name')}---{this.state.info.get('age')}
            </div>
        )
    }
}
```

immutable可以用来性能优化，来判断是否要更新子组件

```js
import React, { Component } from 'react'
import { Map } from 'immutable'

export default class App extends Component {
    state = {
        info: Map({
            name: 'jhc',
            select: 'aa',
            filter: Map({
                text: '',
                up: true,
                down: false
            })
        })
    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        info: this.state.info.set('name', 'xiaoming').set('select', 'bb')
                    })
                }}>change</button>
                {this.state.info.get('name')}
                <Child filter={this.state.info.get('filter')}></Child>
            </div>
        )
    }
}

class Child extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.filter === nextProps.filter) {
            return false
        } else {
            return true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('更新');
    }
    render() {
        return (
            <div>Child</div>
        )
    }
}
```

对数组的深复制

```js
import React, { Component } from 'react'
import { List } from 'immutable'

var arr = List([1, 2, 3, 4])

var arr2 = arr.push(6)

var arr3 = arr2.concat([8, 9, 0])

console.log(arr, arr2);//不会影响老的对象结构，方法重名而已
console.log(arr.toJS(), arr2.toJS());
console.log(arr3.toJS());

export default class App extends Component {

    state = {
        list: List(['aaa', 'bbb', 'ccc', 'ddd'])
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map(item => <li key={item}>
                            {item}
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}
```

# 2022-9-8

## immutable进阶

fromJS，setIn，updateIn

```js
import React, { Component } from 'react'
import { fromJS } from 'immutable'

export default class App extends Component {
    state = {
        info: fromJS({
            name: 'jhc',
            location: {
                province: 'jiangxi',
                city: 'nanchang'
            },
            favor: ['111', '222', '333', '444']
        })
    }
    componentDidMount() {
        // console.log(this.state.info);
    }

    render() {
        return (
            <div>
                <h1>个人信息修改</h1>
                <button onClick={() => {
                    this.setState({
                        info: this.state.info.setIn(['name'], 'xiaoming').setIn(['location', 'city'], 'hilongj')
                    })
                }}>change</button>
                <div>
                    {this.state.info.get('name')}
                </div>
                <div>
                    {this.state.info.get('location').get('province')}
                    <br></br>
                    {this.state.info.get('location').get('city')}
                    <br></br>
                    {this.state.info.get('favor').map((item, index) =>
                        <li key={item}>{item}
                            <button onClick={() => {
                                this.setState({
                                    info: this.state.info.updateIn(['favor'], (list) => list.splice(index, 1))
                                })
                            }}>del</button>
                        </li>)}
                </div>
            </div >
        )
    }
}
```

## immutable-redux

结合redux一起使用。

```js
import { fromJS } from "immutable"
const CityReducer = (preState = {
    cityName: '北京'
}, action) => {
    let newState = fromJS(preState)
    switch (action.type) {
        case 'CHANGECITY':
            return newState.set('cityName', action.city).toJS()
        default:
            return preState
    }
}

export default CityReducer
```

## Mobx使用

- 是一个功能强大，上手非常容易地状态管理工具
- 利用getter和setter来收集组件的数据依赖关系
- 背后的哲学很简单，任何源自应用状态的东西都应该被自动获得，精确更新
- 类似Vue

和redux区别

- 更偏向面向对象编程
- 可以直接更改数据
- 并非单一store，可以存在多个
- 使用的是可观察对象

优点

- 学习成本小
- 面向对象编程，对TS友好

缺点

- 过于自由
- 相关中间件很少，逻辑业务整合是问题

## Mobx-observable-autorun

```js
npm install mobx@5
```

```js
import React, { Component } from 'react'
import { observable, autorun } from 'mobx'

//对于普通类型数据的监听 box
var ObservableNumber = observable.box(10)
var ObservableName = observable.box('jhc')

autorun(() => {
    console.log(ObservableNumber.get());
})

autorun(() => {
    console.log(ObservableName.get());
})

//第一次执行一次，之后每次改变都会执行
/* ----------------------------------------------------------------------------- */
//观察复杂类型 对象，数组
//对象
// var myobj = observable.map({
//     name: 'jhc111',
//     age: 21
// })

// autorun(() => {
//     console.log(myobj.get('name'));
// })

//对象 不加Map  直接用
var myobj = observable({
    name: 'jhc111',
    age: 21
})

autorun(() => {
    console.log(myobj.name);
})


setTimeout(() => {
    ObservableNumber.set(20)
}, 1000);

setTimeout(() => {
    ObservableName.set('xiaoming')
}, 2000);

setTimeout(() => {
    myobj.name = 'caonimama'
}, 3000);




export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
```

observable；仓库中的状态设置为可观察对象

autorun；当observable观察的对象发生改变时，对应的autorun就会执行

## Mobx-action

使用严格模式；不允许在action外部进行直接改，约束一些

```js
import { action, configure, observable } from 'mobx'


configure({
    enforceActions: 'always'
})

const store = observable({
    isTabbarShow: true,
    cityName: '北京',
    list: [],
    changeShow() {
        this.isTabbarShow = true
    },
    changeHide() {
        this.isTabbarShow = false
    }
}, {
    //标记两个 方法，专门进行修改,集中管理
    changeHide: action,
    changeShow: action
})


export default store
```

面向对象写法ES7

```js
import { action, observable } from "mobx";

configure({
    enforceActions: 'always'
})

class Store {
    @observable isTabbarShow = true
    @observable list = []
    @observable cityName = '北京'

    @action changeShow() {
        this.isTabbarShow = true
    }

    @action changeHide() {
        this.isTabbarShow = false
    }
}

const store = new Store()

export default store
```

## create-react-app 支持decorators

```shell
yarn add @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

**创建 .babelrc**

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}
```

**创建config-overrides.js**

```javascript
const path = require('path')
const { override, addDecoratorsLegacy } = require('customize-cra')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
    config.resolve.alias['@'] = resolve('src')
    if (env === 'production') {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }

    return config
};


module.exports = override(addDecoratorsLegacy(), customize())
```

**安装依赖**

```
yarn add customize-cra react-app-rewired
```

**修改package.json**

```
...
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
...
```

## Mobx-runAction

用于异步中更改数据

```js
import { action, configure, observable, runInAction } from 'mobx'
import axios from 'axios'

configure({
    enforceActions: 'always'
})

const store = observable({
    isTabbarShow: true,
    cityName: '北京',
    list: [],
    changeShow() {
        this.isTabbarShow = true
    },
    changeHide() {
        this.isTabbarShow = false
    },
    async getList() {
        var list = await axios({
            method: 'get',
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=9253477',
            headers: {
                "X-Client-Info": '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16622140491559798977921025" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => {
            return res.data.data.cinemas
        })
        runInAction(() => {
            this.list = list
        })
    }
}, {
    //标记两个 方法，专门进行修改,集中管理
    changeHide: action,
    changeShow: action,
})


export default store
```

## Mobx-react

自动监听 ---高阶组件

跟当初的react-redux一样

## TS项目创建

typescript的定位是类静态语言，在写代码阶段就能检查错误，而非运行阶段

create-react-app name --template typescript

## TS基础语法

必须要有导出

基本数据类型

```js
var myname: string = "jhc";
var myage: number = 21;
var myshow: boolean = true;

myname.substring(0);

myage.toFixed();

myshow = false;

var my: string | number = "jhc";

var myany: any = 99;
```

数组

```js
var list: string[] = ["1", "2", "3", "4", "lll"];

for (var i in list) {
  list[i].substring(0, 1);
}

var list2: number[] = [1, 2, 3];

list2.push(5);

var list3: (string | number)[] = [1, 2, "11", "22"];

var mylist: Array<string> = ["22", "33"];

var mylist2: Array<string | number> = [1, 2, "1", "2"];
```

对象

```js
interface IObj {
  name: string;
  age: number;
  //可选属性
  location?: string;
  [propName: string]: any;
}
var obj1: IObj = {
  name: "jhc",
  age: 100,
  a: "aaa",
  b: "sdad",
};

console.log(obj1.name);
```

## TS基础语法2

函数

```js
function text1(a: string, b: number, c?: boolean): string {
  console.log(b + a.substring(0, 1) + c);
  return "aaa";
}

text1("ss", 2);

var myname: string = text1("sss", 9, true);

console.log(myname);

interface IFunc {
  (a: string, b: string, c?: number): string;
}

var myfunc: IFunc = function text2(a: string, b: string, c?: number) {
  return a + b;
};
myfunc("ss", "cc", 5);

interface Iobj {
  name: string;
  age: number;
  getname: (name: string) => string;
}

var obj: Iobj = {
  name: "jhccc",
  age: 555,
  getname: (a: string) => {
    return "sss";
  },
};
console.log(obj);

obj.getname('aa')

export default text1;


```

## TS基础语法3

类

修饰符 private 私有属性，只能在当前类里面访问，子类也访问不到

修饰符 public 公有属性，在哪都能访问到

修饰符 protected 保密属性，当前类及其子类可以访问到

```js
class Bus {
  public name: string = "jhccc";
  private _list: any = [111];

  protected age: number = 100;
  subscribe(cb: any) {
    console.log(this._list);

    this._list.push(cb);
  }

  dispatch() {
    this._list.forEach((cb: any) => {
      cb && cb();
    });
  }
}

var obj = new Bus();
obj.subscribe(() => {});

console.log(obj);

class Child extends Bus {
  aaa() {
    console.log(this.name);
    console.log(this.age);
  }
}

var obj2 = new Child();

obj2.aaa();
console.log(obj2);

export default Bus;
```

类+接口的约束

```js
interface Ifunc {
  getname: () => string;
}

class A implements Ifunc {
  a1() {}

  a2() {}

  getname() {
    return "AAA";
  }
}

class B implements Ifunc {
  b1() {}

  b2() {}

  getname() {
    return "BBB";
  }
}

function init(obj: Ifunc) {
  obj.getname();
}

var objA = new A();
var objB = new B();

init(objA);
init(objB);

export { A, B };
```

## 类组件

通过泛型<属性约定，状态约定>对组件的属性和状态进行约定

类型断言 as

```js
import React, { Component } from 'react'
interface Istate {
    name: string
    age:number
}

//     泛型                         <约定属性，约定状态>
export default class App extends Component<any,Istate> {

    state = {
        name: 'xiaoming',
        age:5
    }
  render() {
    return (
        <div>
            {this.state.name.substring(0,1).toUpperCase()+this.state.name.substring(1)}

            <button onClick={() => {
                this.setState({
                    name:'jhc'
                })
            }}>onClick</button>
      </div>
    )
  }
}
```

约定props

```js
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        App
        <Child name="aaa"></Child>
      </div>
    );
  }
}

interface Iprops {
  name: string;
}

class Child extends Component<Iprops, any> {
  render(): React.ReactNode {
    return <div>Child---{this.props.name}</div>;
  }
}

```

## 函数组件

state约束

```js
import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState<string>("jhc");
  return (
    <div>
      App-{name.substring(0, 1).toUpperCase() + name.substring(1)}
      <button
        onClick={() => {
          setName("xiaoming");
        }}
      >
        click
      </button>
    </div>
  );
}
```

props约束 有两种写法

```js
import React from "react";

export default function App() {
  return (
    <div>
      App
      <Child name="aaa"></Child>
      <Child2 location="nanchang"></Child2>
    </div>
  );
}

interface Iprops {
  name: string;
}

interface Iprops2 {
  location: string;
}

function Child(props: Iprops) {
  return <div>{props.name}</div>;
}

const Child2: React.FC<Iprops2> = (props) => {
  return <div>{props.location}</div>;
};
```

## TS路由

一级路由组件

```js
import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Cinema from "../Views/Cinema";
import Detail from "../Views/Detail";
import Film from "../Views/Film";
import Mine from "../Views/Mine";

export default class IndexRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/mine" component={Mine}></Route>
            <Route path="/cinema" component={Cinema}></Route>
            <Route path="/film" component={Film}></Route>
            <Route path="/detail/:id" component={Detail}></Route>

            <Redirect from="/" to="/film"></Redirect>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
```

嵌套路由

```js
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Commingsoon from "./Films/Commingsoon";
import Nowplaying from "./Films/Nowplaying";

export default class Film extends Component {
  render() {
    return (
      <div>
        Film
        <Switch>
          <Route path="/film/nowplaying" component={Nowplaying}></Route>
          <Route path="/film/commingsoon" component={Commingsoon}></Route>

          <Redirect from="/film" to="/film/nowplaying"></Redirect>
        </Switch>
      </div>
    );
  }
}
```

路由跳转传参，注意要进行用 RouteComponentProps 对props约束

```js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

interface Iitem {
  filmId: number;
  name: string;
}

export default function Nowplaying(props: RouteComponentProps) {
  const [filmList, setFilmList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5969340",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      setFilmList(res.data.data.films);
    });
  }, []);

  return (
    <div>
      Nowplaying
      <ul>
        {filmList.map((item: Iitem) => (
          <li
            key={item.filmId}
            onClick={() => {
              props.history.push(`/detail/${item.filmId}`);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

接收参数 同样也要限制，并且可以自定义接口限制

```js
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Iid {
  id: string;
}

export default class Detail extends Component<RouteComponentProps<Iid>> {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }
  render() {
    return <div>Detail</div>;
  }
}
```

## TS-Redux

和之前一样

store.dispatch派发 store.subscribe订阅

## TS组件库

无区别

## stylde-commponents

他是通过JavaScript改变CSS编写方式的解决方案之一，从根本上解决常规CSS编写的一些弊端

通过JavaScript为CSS赋能，我们能达到常规CSS所不好处理的逻辑复杂，函数方法，复用，避免干扰，

样式书写直接依附在JSX上面，HTML,CSS,JS 三者再次内聚 all in js的思想

可以实现属性透传

```js
import React, { Component } from "react";
import styled from "styled-components";

export default class App extends Component {
  render() {
    const StyleInput = styled.input`
      outline: none;
      border-radius: 10px;
      bor-bottom: 1px solid red;
    `;

    const StyledDiv = styled.div`
      background: ${(props) => props.bg || "yellow"};
      width: 100px;
      height: 100px;
    `;
    return (
      <div>
        App
        <StyleInput type="password" placeholder="透传问题"></StyleInput>
        <StyledDiv bg="blue"></StyledDiv>
      </div>
    );
  }
}
```

样式化组件

```js
import React, { Component } from "react";
import styled from "styled-components";

export default class App extends Component {
  render() {
    const StyledChild = styled(Child)`
      background: yellow;
    `;
    return (
      <div>
        App
        <StyledChild></StyledChild>
      </div>
    );
  }
}

class Child extends Component {
  render() {
    return <div className={this.props.className}>Child</div>;
  }
}
```

## 样式拓展

继承

```js
import React, { Component } from "react";
import styled from "styled-components";

export default class App extends Component {
  render() {
    const StyledButton = styled.button`
      width: 100px;
      height: 100px;
      background: skyblue;
    `;
    //继承
    const StyledButton2 = styled(StyledButton)`
      background: red;
    `;
    return (
      <div>
        App
        <StyledButton></StyledButton>
        <StyledButton2></StyledButton2>
      </div>
    );
  }
}

```

动画

```js
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export default class App extends Component {
  render() {
    const myanimation = keyframes`
        from{
            transform:rotate(0deg)
        }
        to{
            transform:rotate(360deg)
        }
        `;

    const StyledDiv = styled.div`
      width: 100px;
      height: 100px;
      background: yellow;
      animation: ${myanimation} 1s infinite;
    `;
    return (
      <div>
        <StyledDiv></StyledDiv>
      </div>
    );
  }
}
```

## 单元测试 react-test-renderer

```js
import ShallowRender from "react-test-renderer/shallow";

import App from "../App";
describe("react-test-render", function () {
  it("app 的名字是todo", function () {
    const render = new ShallowRender();
    render.render(<App></App>);
    expect(render.getRenderOutput().props.children[0].type).toBe("h1");
    expect(render.getRenderOutput().props.children[0].props.children).toBe("todo");
  });
});

```

## 单元测试-test-utils

```js
import ShallowRender from "react-test-renderer/shallow";
import App from "../App";
import ReactTestUtil from "react-dom/test-utils";

describe("react-test-render", function () {
  it("app 的名字是todo", function () {
    const render = new ShallowRender();
    render.render(<App></App>);
    expect(render.getRenderOutput().props.children[0].type).toBe("h1");
    expect(render.getRenderOutput().props.children[0].props.children).toBe(
      "todo"
    );
  });

  it("删除功能", function () {
    const view = ReactTestUtil.renderIntoDocument(<App></App>);

    let utils = ReactTestUtil.scryRenderedDOMComponentsWithTag(view, "li");
    let deletebutton = utils[0].querySelector("button");
    ReactTestUtil.Simulate.click(deletebutton);
    let listLength = ReactTestUtil.scryRenderedDOMComponentsWithTag(
      view,
      "li"
    ).length;
    expect(utils.length - 1).toBe(listLength);
  });

  it("添加功能", function () {
    const view = ReactTestUtil.renderIntoDocument(<App></App>);
    let utils = ReactTestUtil.scryRenderedDOMComponentsWithTag(view, "li");
    ReactTestUtil.scryRenderedDOMComponentsWithTag(view, "input").value =
      "jhcaaaaaa";

    ReactTestUtil.Simulate.click(
      ReactTestUtil.findRenderedDOMComponentWithClass(view, "add")
    );
    const length = ReactTestUtil.scryRenderedDOMComponentsWithTag(
      view,
      "li"
    ).length;
    console.log(
      utils.length,
      length,
      ReactTestUtil.scryRenderedDOMComponentsWithClass(view, "add")
    );
  });
});
```

## 单元测试-test-enzyme

# 2022-9-9

## redux-saga

在saga中，全局监听器和接收器使用Generator函数和saga自身的一些辅助函数实现对整个流程的管控

生成器函数 generator，就像是构造机，里面有多种状态，yield暂停

注意加*号

```js
function* test() {
  console.log(111);
  var input1 = yield "111-输出";
  console.log(input1);
  console.log(2222);
  var input2 = yield "222-输出";
  console.log(input2);
  yield "222-输出";
  console.log(3333);
  var input3 = yield "333-输出";
  console.log(input3);
  yield "333-输出";
}
var jhc = test();

console.log(jhc.next("aaa"));
console.log(jhc.next("bbb"));
console.log(jhc.next("ccc"));
console.log(jhc.next("ddd"));
```

```js
function* test1() {
  setTimeout(() => {
    console.log("第一个");
    res.next();
  }, 1000);
  yield;
  setTimeout(() => {
    console.log("第二个");
    res.next();
  }, 1000);
  yield;
  setTimeout(() => {
    console.log("第三个");
    res.next();
  }, 1000);
  yield;
}

var res = test1();

res.next();
```

手动执行函数

```js
function getData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data1");
    }, 1000);
  });
}
function getData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data2");
    }, 1000);
  });
}
function getData3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data3");
    }, 1000);
  });
}

function* get() {
  var fuc1 = yield getData1();
  console.log(fuc1);
  var fuc2 = yield getData2(fuc1);
  console.log(fuc2);
  var fuc3 = yield getData3(fuc2);
  console.log(fuc3);
}

function run(fn) {
  var g = fn();

  function next(data) {
    var result = g.next(data);
    if (result.done) {
      return result.value;
    }

    result.value.then((res) => {
      next(res);
    });
  }

  //第一次
  next();
}

run(get);
```

## redux-saga基础1

dispatch发出异步action后 被saga拦截到，并处理异步，将异步结果作为参数派发新的action，到自己的reducer，然后进行处理。

流程

现在store中引入saga并配置

run执行saga

```js
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import createSagaMiddleWare from "redux-saga";
import watchSaga from "./saga";

const SagaMiddleWare = createSagaMiddleWare();

const store = configureStore({
  reducer: reducer,
  middleware: [SagaMiddleWare],
});

SagaMiddleWare.run(watchSaga); //sagar任务

export default store;
```

在子组件dispatch出异步action，到reducer中发现没有对应的ytpe，到saga中发现有对应的

saga.js中进行监听action 用take

处理异步用fork，参数为一个函数

在异步处理generator函数中，call调用异步请求函数，阻塞

put是在请求结果回来之后发出的同步action，这个action会走到reducer中

```js
import { take, fork, call, put } from "redux-saga/effects";
import { changeListAction } from "./action";
function* watchSaga() {
  while (true) {
    //take 只要有人发action就能监听到
    yield take("GETLIST");
    // fork 同步执行异步处理函数 非阻塞立即调用
    yield fork(getList);
  }
}

function* getList() {
  //异步处理
  //call函数发起异步请求  阻塞调用requestList
  let res = yield call(requestList);
  //put函数发出新的action 非阻塞
  yield put(changeListAction(res));
}

function requestList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([111, 222, 333, 444]);
    });
  });
}

export default watchSaga;
```

## redux-saga-基础2

多个saga进行合并

可以将多个saga进行模块化，

最后在一个saga中进行合并导出，用的是redux-saga的all

```js
import { all } from "redux-saga/effects";
import watchSaga1 from "./saga/saga1";
import watchSaga2 from "./saga/saga2";

function* watchSaga() {
  yield all([watchSaga1(), watchSaga2()]);
}

export default watchSaga;
```

## redux-saga-基础3

异步请求可以链式执行

需求；将请求1的结果作为参数发送请求2，再将请求2的结果dispatch出去

```js
import { take, fork, call, put } from "redux-saga/effects";
import { changeListAction2 } from "../action";
function* watchSaga2() {
  //take拦截
  yield take("GETLIST2");
  //fork处理异步
  yield fork(getList2);
}

function* getList2() {
  //发异步请求
  const res1 = yield call(requestList2_1);
  const res2 = yield call(requestList2_2, res1);

  yield put(changeListAction2(res2));
}

function requestList2_1() {
  return new Promise((resolve, reject) => {
    resolve(["aaa", "bbb", "ccc", "ddd"]);
  });
}
function requestList2_2(data) {
  return new Promise((resolve, reject) => {
    resolve([...data, 11, 22, 33, 44]);
  });
}

export default watchSaga2;
```

## redux-saga-基础4

watchSaga监听函数另外一种写法

使用takeEvery写法，高阶函数

```js
import { call, put, takeEvery } from "redux-saga/effects";
import { changeListAction1 } from "../action";
function* watchSaga1() {
  // while (true) {
  //   //take 只要有人发action就能监听到
  //   yield take("GETLIST1");
  //   // fork 同步执行异步处理函数 非阻塞立即调用
  //   yield fork(getList1);
  // }

  yield takeEvery("GETLIST1", getList1);
}

function* getList1() {
  //异步处理
  //call函数发起异步请求  阻塞调用requestList
  let res = yield call(requestList1);
  //put函数发出新的action 非阻塞
  yield put(changeListAction1(res));
}

function requestList1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([111, 222, 333, 444]);
    });
  });
}

export default watchSaga1;
```

## redux-saga-实践

没啥可说的还是那个流程

## react补充-portal

Protals提供了一个最好的再父组件包含的DOM结构层级外的DOM节点渲染组件的方法

```js
ReactDOM.createPortal(child,container)
```

第一个参数child是可渲染的react子项，比如元素，字符串或者片段，第二个参数container是一个DOM元素

存在事件冒泡

用法

```js
import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class PortalDialog extends Component {
  render() {
    return createPortal(
      <div
        style={{
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          backgroundColor: "rgba(0,0,0,0.6  )",
          position: "fixed",
          color: "white",
        }}
      >
        {this.props.children}
        <button
          onClick={() => {
            this.props.close();
          }}
        >
          close
        </button>
      </div>,
      document.body
    );
  }
}
```

## react-补充-懒加载

路由懒加载，react-loadable

要实现懒加载，要把组件放在不同的文件

首屏加载更快

lazy和supense；原理 webpack代码分割

```js
import React, { Component, Suspense } from "react";
// import Commingsoon from "./view/Comminesoon";
// import Nowplaying from "./view/Nowplaying";

//懒加载
const Nowplaying = React.lazy(() => import("./view/Nowplaying"));
const Commingsoon = React.lazy(() => import("./view/Comminesoon"));

export default class App extends Component {
  state = {
    type: 1,
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              type: 1,
            });
          }}
        >
          正在热映
        </button>
        <button
          onClick={() => {
            this.setState({
              type: 2,
            });
          }}
        >
          即将上映
        </button>
        <Suspense fallback={<div>正在加载......</div>}>
          {this.state.type === 1 ? (
            <Nowplaying></Nowplaying>
          ) : (
            <Commingsoon></Commingsoon>
          )}
        </Suspense>
      </div>
    );
  }
}
```

## react-补充-forwardRef

引用传递，是一种通过组件自动向子组件传递引用ref的技术

要写函数式组件

可以将父的ref传给子并接收

```js
import React, { Component, forwardRef } from "react";

export default class App extends Component {
  text = React.createRef();
  render() {
    return (
      <div>
        <button
          onClick={() => {
            console.log(this.text);
            this.text.current.focus();
            this.text.current.value = "";
          }}
        >
          获取焦点
        </button>
        <Child ref={this.text}></Child>
      </div>
    );
  }
}

const Child = forwardRef((props, ref) => {
  return (
    <div style={{ background: "skyblue" }}>
      <input ref={ref} defaultValue="222"></input>
    </div>
  );
});
```

## react-补充-memo

作用；组件仅在他自己的props发生改变时才重新渲染，而通常情况下，只要父组件更新，子组件就会更新，但是React.memo(),可以只让某些组件渲染

类似于

- shouldComponentUpdate，手动
- PureComponent，自动

区别是上面两个只能用于类组件，而React.memo()用于函数式组件

就是只有跟自己有关的props改变才会重新渲染，提高性能

```js
import React, { Component, memo } from "react";

export default class App extends Component {
  state = {
    name: "jhc",
    title: "aaas",
  };
  render() {
    return (
      <div>
        {this.state.name}
        <button
          onClick={() => {
            this.setState({
              name: "xiaoming",
            });
          }}
        >
          click
        </button>
        <button
          onClick={() => {
            this.setState({
              title: "bbb",
            });
          }}
        >
          change child
        </button>
        <Child title={this.state.title}></Child>
      </div>
    );
  }
}

const Child = memo((props) => {
  console.log("52525");
  return <div>Child--{props.title}</div>;
});
```



## DvaJS

一个小的聚合框架，是一种轻量级框架

```js
$ npm install dva-cli -g
```

```js
$ dva -v
```

```js
$ dva new myapp
```

## DvaJs-路由

```js
import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";

import App from "./App";
import Film from "./Film";
import Cinema from "./Cinema";
import Mine from "./Mine";
import Detail from "./Detail";
import Login from "./Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/"
          render={() => (
            <App>
              <Switch>
                <Route path="/film" component={Film}></Route>
                <Route path="/cinema" component={Cinema}></Route>
                <Route
                  path="/mine"
                  render={() =>
                    localStorage.getItem("token") ? (
                      <Mine></Mine>
                    ) : (
                      <Redirect to="/login"></Redirect>
                    )
                  }
                ></Route>
                <Route path="/detail/:id" component={Detail}></Route>

                <Redirect from="/" to="/film"></Redirect>
              </Switch>
            </App>
          )}
        ></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
```

配置路由模式

```js
import dva from "dva";
import "./index.css";

// 1. Initialize
const app = dva({
  history: require("history").createBrowserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require("../src/routes/router").default);

// 5. Start
app.start("#root");
```

## DvaJS-models-1

同样可以用高阶函数connect包裹

```js
import { connect } from "dva";
import React, { Component } from "react";
import Tabbar from "../components/Tabbar";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        {this.props.isShow && <Tabbar></Tabbar>}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    a: 111,
    isShow: state.store.isShow,
  };
};

export default connect(mapstateToProps)(App);
```

把state，reducer，action集成在一起，类似于vuex

```js
export default {
  namespace: "store",

  state: {
    isShow: true,
  },

  reducers: {
    HIDE(preState, action) {
      console.log(action);
      return { ...preState, isShow: false };
    },
    SHOW(preState, action) {
      console.log(action);
      return { ...preState, isShow: true };
    },
  },
};
```

## DvaJS-model-2

处理异步

先把mode放出来

```js
import dva from "dva";
import "./index.css";

// 1. Initialize
const app = dva({
  history: require("history").createBrowserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/store").default);

// 4. Router
app.router(require("../src/routes/router").default);

// 5. Start
app.start("#root");

```

派发异步action到store中的effect

```js
export default {
  namespace: "store",

  state: {
    isShow: true,
    cinemaList: [],
  },

  reducers: {
    HIDE(preState, action) {
      console.log(action);
      return { ...preState, isShow: false };
    },
    SHOW(preState, action) {
      console.log(action);
      return { ...preState, isShow: true };
    },
    CHANGE(preState, action) {
      return {...preState,cinemaList:action.value}
    }
  },

  //处理异步 redux-saga
  effects: {
    *GETCINEMALIST(action, { call, put }) {
      console.log(111);
      const res = yield call(getCinemaList);
      console.log(res);
      yield put({
        type: "CHANGE",
        value: res.data.data.cinemas,
      });
    },
  },

  //订阅，初始化
  subscriptions: {
    setup({ dispatch, history }) {
      console.log("初始化");
      // eslint-disable-line
    },
  },
};

```

利用的是redux-saga原理

在获取到异步结果后派发同步action到store的reducer中

用call调用异步请求，put派发同步action

**跨域问题**

反向代理解决跨域

再webpackrc中

```js
{
  "proxy": {
    "/api": {
      "target": "https://i.maoyan.com",
      "changeOrigin": true
    }
  }
}

```

**mock假数据**

```js
export default {
  "GET /users": { name: "jhc", age: "100", location: "dalian" },

  "POST /users/login": (req, res) => {
    if (req.body.username === "jhc" && req.body.password === "123123") {
      res.send({
        ok: 1,
      });
    } else {
      res.send({
        ok: 0,
      });
    }
  },
};
```

## 	Umijs-介绍与安装

可插拔的企业级框架，umi是以路由为基础的，开箱即用，节省时间

```js
npx @umijs/cerate-umi-app
```

# 2022-9-10

## UmiJS-路由

约定式路由

直接再pages下面创建，会自动生成路由

重定向

入口会自动进入index.tsx 所以在index引入重定向组件

```js
import React from 'react';
import { Redirect } from 'umi';

export default function index() {
  return (
    <div>
      <Redirect to="/film"></Redirect>
    </div>
  );
}

```

如果需要嵌套，创建一个文件夹，创建_layout.tsx为主组件并留出插槽，在该文件夹中创建创建子路由组件即可



![image-20220910133718735](C:\Users\jinha\AppData\Roaming\Typora\typora-user-images\image-20220910133718735.png)

此时film是一级路由，commingsoon，nowplaying是嵌套路由

嵌套路由中的重定向

```js
import React from 'react';
import { Redirect, useLocation } from 'umi';

export default function Film(props: any) {
  const location = useLocation();
  if (location.pathname === '/film'||location.pathname === '/film/') {
    return <Redirect to="/film/nowplaying"></Redirect>;
  }
  return (
    <div>
      <div>轮播</div>
      {props.children}
    </div>
  );
}
```

layouts文件夹，放的是根组件

![image-20220910152003702](C:\Users\jinha\AppData\Roaming\Typora\typora-user-images\image-20220910152003702.png)

编程式导航并传参

```js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';

export default function Nowplaying() {
  const [list, setList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetch(
      'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=8328240',
      {
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
          'X-Host': 'mall.film-ticket.film.list',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.films);
      });
  }, []);

  return (
    <div>
      {list.map((item: any) => (
        <li
          key={item.filmId}
          onClick={() => {
            history.push(`/detail/${item.filmId}`)
          }}
        >
          {item.name}
        </li>
      ))}
    </div>
  );
}
```

动态路由

![image-20220910140838569](C:\Users\jinha\AppData\Roaming\Typora\typora-user-images\image-20220910140838569.png)

创建一个动态路由的文件夹，文件夹里面创建动态路由组件，命名为[要传来传的参式名称]

在组件内部可以通过props获取到

```js
import React from 'react';
import { useParams } from 'umi';

interface Iparams {
  id: string;
}
export default function Detail(props: any) {
  const params = useParams<Iparams>();
  console.log(props.match.params.id);
  console.log(params.id);

  return <div>Detail</div>;
}
```

路由拦截

先创建一个问价夹，命名固定wrappers，里面创建拦截组件，判断条件并拦截

```js
	import React from 'react';
import { Redirect } from 'umi';

export default function Auth(props: any) {
  if (localStorage.getItem('token')) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

```

在要使用拦截的组件中

```js
import React from 'react';

function Mine(props:any) {
  return <div>Mine
    <button onClick={() => {
      localStorage.removeItem('token')
      props.history.push('/film')
    }}>Logout</button>
  </div>;
}

Mine.wrappers = ['@/wrappers/Auth'];
  
export default Mine;
```

配置hash路由，默认为history模式

在.umirc.ts中配置

```js
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  history: { type: 'hash' },
});

```

## UmiJS-mock-反向代理

mock 直接在mock文件夹中写号对应的接口即可，无需其他配置

```js
export default {
  'GET /users': { name: 'jhc', age: 21 },

  'POST /users/login': (req: any, res: any) => {
    if (req.body.username === 'jhc' && req.body.password === '123123') {
      res.send({
        ok: 1,
      });
    } else {
      res.send({
        ok: 0,
      });
    }
  },
};
```

反向代理

```js
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // history: { type: 'hash' },

  //反向代理
  proxy: {
    '/api': {
      target: 'https://i.maoyan.com',
      changeOrigin: true,
    },
  },
});
```

在.umirc.tsx中配置

## UmiJS组件库

正常用，记得版本问题

二维数组处理

```js
  const filterCity = (cities: any) => {
    const letterArr: string[] = [];
    const newList = [];
    for (var i = 65; i < 91; i++) {
      letterArr.push(String.fromCharCode(i));
    }

    for (var m in letterArr) {
      var cityItems = cities.filter(
        (item: any) =>
          item.pinyin.substring(0, 1).toUpperCase() === letterArr[m],
      );
      cityItems.length &&
        newList.push({
          type: letterArr[m],
          items: cities.filter(
            (item: any) =>
              item.pinyin.substring(0, 1).toUpperCase() === letterArr[m],
          ),
        });
    }
    console.log(newList);

    return newList;
  };
```

## UmiJS-dav集成同步

- **按目录约定注册 model**，无需手动 `app.model`
- **文件名即 namespace**，可以省去 model 导出的 `namespace` key
- **无需手写 router.js**，交给 umi 处理，支持 model 和 component 的按需加载
- **内置 query-string 处理**，无需再手动解码和编码
- **内置 dva-loading 和 dva-immer**，其中 dva-immer 需通过配置开启
- **开箱即用**，无需安装额外依赖，比如 dva、dva-loading、dva-immer、path-to-regexp、object-assign、react、react-dom 等

数据流 **同步**

src下创建models文件夹里面放置用来管理公共撞他的saga

先派发action到reducer然后修改公共状态，要用到状态的组件可以通过connect包裹后接收

## UmiJS-dav集成异步

第一次进入，发请求获取数据，更改到公共状态中

第二次进入，用缓存

先派发异步dispatch到model中的effect

在effect中saga，call调用发请求函数，要传参的话用逗号隔开

在获取到异步的结果后put普通action到reducer中，更高state中的数据

```js
export default {
  namespace: 'cinema',
  state: {
    cinemaList: [],
  },

  reducers: {
    CHANGECINEMALIST(preState: any, actions: any) {
      const newState = {
        cinemaList: actions.value,
      };
      return {
        ...preState,
        ...newState,
      };
    },
    CLEARLIST(preState: any, actions: any) {
      return {
        ...preState,
        cinemaList: [],
      };
    },
  },

  //处理异步
  effects: {
    *GETCINEMALIST(actions: any, obj: any): any {
      const { call, put } = obj;

      const cinemas = yield call(requestCinemaList, actions.value);

      yield put({
        type: 'CHANGECINEMALIST',
        value: cinemas,
      });
    },
  },
};

async function requestCinemaList(cityId: any) {
  console.log(cityId);

  var res = await fetch(
    `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=796462`,
    {
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16622140491559798977921025"}',
        'X-Host': 'mall.film-ticket.cinema.list',
      },
    },
  ).then((res) => res.json());

  return res.data.cinemas;
}
```

自带全局loading属性，可以用来控制加载框显示与否

## reacthooks 有哪些

- useState 状态管理
- useEffect 生命周期管理 
  - componentDidMount生命周期、
  - componentDidUpdate生命周期
  - componentWillUnmount生命周期
- useContext 共享状态数据
- useMemo 缓存值
- useRef 获取Dom 操作
- useCallback 缓存函数
- useReducer redux 相似
- useImperativeHandle 子组件暴露值/方法

## react的生命周期

**旧；**

挂载

- constructor
- componentWillMount
- render
- componentDidMount

更新

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

卸载

- componentWillUnmount

**新；**

挂载

- constructor
- getDerivedStateFromProps
- render
- componentDidMount

更新

- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

卸载

- componentWillUnmount

## hooks租价的优缺点

Hook的优点：

1.让函数组件拥有自己的状态和生命周期。

2.使用函数组件加Hooks代码更加简洁。

3.不需要老是去纠结this指向的问题。

4.通过自定义hooks实现逻辑复用。

缺点:class组件的三个生命周期函数合并在一个生命周期函数内。
