// zustand
import {useCallback, useEffect} from 'react'
import {create, StoreApi} from 'zustand'

const URL = 'http://geek.itheima.net/v1_0/channels'

// store
// counterStore
// channelStore
// index.js

interface ChannelItem {
    id: string
    name: string
}

interface Res {
    data: {
        channels?: ChannelItem[],
    } | null
    message: string
}

interface CounterState {
    count: number;
    inc: () => void
}

interface ChannelState {
    channelList: ChannelItem[]
    fetchGetList: () => Promise<Res>
}

// 1. 拆分子模块 再组合起来

const createCounterStore = (set: StoreApi<CounterState>['setState']) => {
    return {
        // 状态数据
        count: 0,
        // 修改状态数据的方法
        inc: () => {
            set((state) => ({count: state.count + 1}))
        },
    }
}

const createChannelStore = (set: StoreApi<ChannelState>['setState']) => {
    return {
        channelList: [],
        fetchGetList: async () => {
            try {
                const res = await fetch(URL)
                const jsonRes: Res = await res.json()
                set({
                    channelList: jsonRes.data?.channels
                })
                return Promise.resolve(jsonRes)
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
}

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
