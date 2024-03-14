import {StoreApi} from "zustand";
import {ChannelState, Res} from "./interface";

const URL = 'http://geek.itheima.net/v1_0/channels'

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

export default createChannelStore
