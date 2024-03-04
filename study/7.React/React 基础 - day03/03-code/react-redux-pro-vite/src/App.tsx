import {useEffect} from 'react'
// 导入actionCreator
import {inscrement, decrement, addToNum} from './store/modules/counterStore'
import {fetchChannelList} from './store/modules/channelStore'
import {useAppDispatch, useAppSelector} from "./hooks/storeHooks.ts";

function App() {
    const {count} = useAppSelector(state => state.counter)
    const {channelList} = useAppSelector(state => state.channel)
    const dispatch = useAppDispatch()
    // 使用useEffect触发异步请求执行
    useEffect(() => {
        dispatch(fetchChannelList())
    }, [dispatch])
    return (
        <div className="App">
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(inscrement())}>+</button>
            <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
            <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default App
