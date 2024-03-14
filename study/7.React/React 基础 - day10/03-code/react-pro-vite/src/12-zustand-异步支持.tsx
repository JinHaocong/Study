// zustand
import {useCallback, useEffect} from 'react'
import {create} from 'zustand'

const URL = 'http://geek.itheima.net/v1_0/channels'

// 1. 创建store
// 语法容易出错
// 1. 函数参数必须返回一个对象 对象内部编写状态数据和方法
// 2. set是用来修改数据的专门方法必须调用它来修改数据
// 语法1：参数是函数 需要用到老数据的场景
// 语法2：参数直接是一个对象  set({ count: 100 })

interface ChannelItem {
    id: string
    name: string
}

interface BearState {
    count: number
    inc: () => void
    channelList: ChannelItem[]
    fetchGetList: () => Promise<Res>
}

interface Res {
    data: {
        channels?: ChannelItem[],
    } | null
    message: string
}

const useStore = create<BearState>((set) => {
    return {
        // 状态数据
        count: 0,
        // 修改状态数据的方法
        inc: () => {
            set((state) => ({count: state.count + 1}))
        },
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
})

// 2. 绑定store到组件
// useStore => { count, inc }

function App() {
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
