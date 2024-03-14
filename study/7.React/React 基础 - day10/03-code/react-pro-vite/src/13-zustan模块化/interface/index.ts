export interface ChannelItem {
    id: string
    name: string
}

export interface Res {
    data: {
        channels?: ChannelItem[],
    } | null
    message: string
}

export interface CounterState {
    count: number;
    inc: () => void
}

export interface ChannelState {
    channelList: ChannelItem[]
    fetchGetList: () => Promise<Res>
}
