// react + ts

// 根据初始值自动推断
// 场景：明确的初始值

import {useState} from 'react'

function App() {
    const [value, toggle] = useState(false)
    console.log(value)

    const [list, setList] = useState([1, 2, 3])

    const changeValue = () => {
        toggle(true)
    }
    console.log(changeValue)

    const changeList = () => {
        setList([4])
    }
    console.log(changeList)

    return <>this is app {list}</>
}

export default App
