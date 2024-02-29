import React from "react";

function App() {
    // 基础绑定
    const handleClick1 = () => {
        console.log('button1被点击了')
    }

    // 事件参数e
    const handleClick2 = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('button2被点击了', e)
    }

    // 传递自定义参数
    const handleClick3 = (name: string) => {
        console.log('button3被点击了', name)
    }

    // 既要传递自定义参数 而且还要事件对象e
    const handleClick4 = (name: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('button4被点击了', name, e)
    }
    return (
        <div className="App">
            <button onClick={handleClick1}>click1 me</button>
            <button onClick={(e) => handleClick2(e)}>click2 me</button>
            <button onClick={() => handleClick3('jack')}>click3 me</button>
            <button onClick={(e) => handleClick4('jack', e)}>click4 me</button>
        </div>
    )
}

export default App
