// 父传子
// 1. 父组件传递数据  子组件标签身上绑定属性
// 2. 子组件接收数据  props的参数

// 子组件 Son
import React from "react";

interface SonProps {
    name: string;
    age: number;
    isTrue: boolean;
    list: string[];
    obj: { name: string };
    cb: () => void;
    child: React.ReactNode;
}

function Son(props: SonProps) {
    // props：对象里面包含了父组件传递过来的所有的数据
    // { name:'父组件中的数据'}
    console.dir(props)
    return <div>this is son, {props.name}, jsx: {props.child}</div>
}


function App() {
    const name = 'this is App name'
    return (
        <div>
            <Son
                name={name}
                age={18}
                isTrue={false}
                list={['vue', 'react']}
                obj={{name: 'jack'}}
                cb={() => console.log(123)}
                child={<span>this is span</span>}
            />
        </div>
    )
}

export default App
