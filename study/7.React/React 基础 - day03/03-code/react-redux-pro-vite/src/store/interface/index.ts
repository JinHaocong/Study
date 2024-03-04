export interface ChannelListItem {
    id: string
    name: string
}

export interface ChannelState {
    channelList: ChannelListItem[]
}

export interface CounterState {
    count: number
}
