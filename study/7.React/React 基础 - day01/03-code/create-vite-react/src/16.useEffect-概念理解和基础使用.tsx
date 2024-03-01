import {useEffect, useState} from "react"

const URL = 'http://geek.itheima.net/v1_0/channels'

interface Item {
    id: string
    name: string
}

function App() {
    // 创建一个状态数据
    const [list, setList] = useState<Item[]>([])
    const getList = async () => {
        const res = await fetch(URL)
        const jsonRes = await res.json()
        console.log(jsonRes)
        setList(jsonRes.data.channels)
    }
    useEffect(() => {
        getList()
    }, [])
    return (
        <div>
            this is app
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default App
