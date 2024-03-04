import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CounterState} from "../interface";

const initialState: CounterState = {
    count: 0
}

const counterSlice = createSlice({
    name: 'counter',
    // 初始化state
    initialState,
    // 修改状态的方法 同步方法 支持直接修改
    reducers: {
        inscrement(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
        addToNum(state, action: PayloadAction<number>) {
            state.count = action.payload
        }
    }
})

// 以按需导出的方式导出actionCreator
export const {inscrement, decrement, addToNum} = counterSlice.actions


// 以默认导出的方式导出reducer
export default counterSlice.reducer
