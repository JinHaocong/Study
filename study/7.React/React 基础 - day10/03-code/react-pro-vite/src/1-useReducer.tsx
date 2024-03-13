// useReducer

import {Reducer, useReducer} from "react"

interface State {
    count: number
}

interface Action {
    type: 'INC' | 'DEC' | 'SET'
    payload?: number
}


// 1. 定义reducer函数 根据不同的action 返回不同的状态

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'INC':
            return {count: state.count + 1}
        case 'DEC':
            return {count: state.count - 1}
        case 'SET':
            return {count: action.payload as number}
        default:
            return state
    }
}

// 2. 组件中调用useReducer(reducer, 0) => [state, dispatch]

// 3. 调用dispatch({type:'INC'}) => 通知reducer产生一个新的状态 使用这个新状态更新UI


function App() {
    const initialState = {
        count: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div className="App">
            this is app
            <button onClick={() => dispatch({type: 'DEC'})}>-</button>
            {state.count}
            <button onClick={() => dispatch({type: 'INC'})}>+</button>
            <button onClick={() => dispatch({type: 'SET', payload: 100})}>update</button>
        </div>
    )
}

export default App
