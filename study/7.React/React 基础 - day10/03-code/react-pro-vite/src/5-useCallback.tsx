// useCallback

import {FC, memo, useCallback, useState} from "react"

interface Props {
    onChange: (val: string) => void
}

const Input: FC<Props> = memo(({onChange}) => {
    console.log('子组件渲染了')
    return <input type="text" onChange={(e) => onChange(e.target.value)}/>
})

const Input2: FC<Props> = memo(({onChange}) => {
    console.log('子组件2渲染了')
    return <input type="text" onChange={(e) => onChange(e.target.value)}/>
})

function App() {
    // 传给子组件的函数
    const changeHandler = useCallback((value: string) => console.log(value), [])
    const changeHandler2 = (value: string) => console.log(value)


    // 触发父组件重新渲染的函数
    const [count, setCount] = useState(0)
    return (
        <div className="App">
            {/* 把函数作为prop传给子组件 */}
            <Input onChange={changeHandler}/>
            <Input2 onChange={changeHandler2}/>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}

export default App
