// 1. 通过子传父 A -> App
// 2. 通过父传子 App -> B

import {createContext, useContext} from "react"

const MsgContext = createContext('')

const A = () => {
    return (
        <div>
            this is A component
            <B/>
        </div>
    )
}


const B = () => {
    const msg = useContext(MsgContext)
    return (
        <div>
            this is B component,{msg}
        </div>
    )
}

const App = () => {
    const msg = 'this is App component'
    return (
        <>
            <MsgContext.Provider value={msg}>
                this is App
                <A/>
            </MsgContext.Provider>
        </>
    )
}

export default App

