import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {ChannelState} from "../interface";
import {AppDispatch} from "../index.ts";

const initialState: ChannelState = {
    channelList: []
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload
        }
    }
})


// 以按需导出的方式导出actionCreator
export const {setChannels} = channelSlice.actions


// 导出异步请求方法
export const fetchChannelList = () => {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannels(res.data.data.channels))
    }
}


export default channelSlice.reducer
