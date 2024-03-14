import {StoreApi} from "zustand";
import {CounterState} from "./interface";

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

export default createCounterStore
