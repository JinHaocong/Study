// 1. 通过子传父 A -> App
// 2. 通过父传子 App -> B

import {useState} from "react"

interface AProps {
    onGetAName: (name: string) => void
}

interface BProps {
    name: string
}


function A(props: AProps) {
    const {onGetAName} = props
    // Son组件中的数据
    const name = 'this is A name'
    return (
        <div>
            this is A component,
            <button onClick={() => onGetAName(name)}>send</button>
        </div>
    )
}

function B(props: BProps) {
    const {name} = props
    return (
        <div>
            this is B component,
            {name}
        </div>
    )
}

function App() {
    const [name, setName] = useState('')
    const getAName = (name: string) => {
        console.log(name)
        setName(name)
    }
    return (
        <div>
            this is App
            <A onGetAName={getAName}/>
            <B name={name}/>
        </div>
    )
}

export default App
