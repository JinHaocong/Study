// zustand
import {useCallback, useEffect} from 'react'
import {create} from 'zustand'
import {ChannelState, CounterState} from "./13-zustan模块化/interface";
import createCounterStore from "./13-zustan模块化/CounterStore.ts";
import createChannelStore from "./13-zustan模块化/ChannelStore.ts";


// store
// counterStore
// channelStore
// index.js


const useStore = create<CounterState & ChannelState>((set) => {
    return {
        ...createCounterStore(set),
        ...createChannelStore(set)
    }
})


function App() {
    // 2. 组件使用
    const {count, inc, fetchGetList, channelList} = useStore()

    const api = useCallback(async () => {
        const res = await fetchGetList()
        console.log(res)
    }, [fetchGetList])

    useEffect(() => {
        api()
    }, [api])
    return (
        <>
            <button onClick={inc}>{count}</button>
            <ul>
                {
                    channelList.map(item => <li key={item.id}>{item.name}</li>)
                }
            </ul>
        </>
    )
}

export default App
