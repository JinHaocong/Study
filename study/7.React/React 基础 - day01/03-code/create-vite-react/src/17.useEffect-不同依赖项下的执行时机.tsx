import {useEffect, useState} from "react"

function App() {
    // 1. 没有依赖项  初始 + 组件更新 都会执行
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log('副作用函数执行了1')
    })

    // 2. 传入空数组依赖  只会在初始执行一次
    useEffect(() => {
        console.log('副作用函数执行了2')
    }, [])

    // 3. 传入特定依赖项  初始 + 依赖项变化时执行
    useEffect(() => {
        console.log('副作用函数执行了3')
    }, [count])

    return (
        <div>
            this is app
            <button onClick={() => setCount(count + 1)}>+{count}</button>
        </div>
    )
}

export default App
