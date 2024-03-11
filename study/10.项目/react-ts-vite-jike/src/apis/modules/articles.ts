import {get, post} from "@/apis";
import {GetChannels, Publish} from "@/apis/interface";


export const getChannels = () => {
    return get<GetChannels>('/channels')
}

export const publish = (data: Publish) => {
    return post<GetChannels>('/mp/articles?draft=false', data)
}
