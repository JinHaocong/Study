import {useState} from 'react'

function App() {
    const [count, setCount] = useState(0)
    let [count1] = useState(0)

    const handleClick1 = () => {
        // 直接修改 无法引发视图更新
        count1++
        console.log(count1)
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    // 修改对象状态
    const [form, setForm] = useState({name: 'jack', age: 22})

    const changeName = () => {
        // 错误写法：直接修改
        // form.name = 'john'
        // 正确写法：setFrom 传入一个全新的对象
        setForm({
            ...form,
            name: 'john'
        })
    }

    const changeAge = () => {
        setForm({
            ...form,
            age: 100
        })
    }

    return (
        <div>
            <button onClick={handleClick}>{count}</button>
            <button onClick={handleClick1}>{count1}</button>
            <button onClick={changeName}>修改form{form.name}</button>
            <button onClick={changeAge}>修改form{form.age}</button>
        </div>
    )
}

export default App
