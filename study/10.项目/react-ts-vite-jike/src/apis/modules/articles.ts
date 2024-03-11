import {get} from "@/apis";
import {GetChannels} from "@/apis/interface";


export const getChannels = () => {
    return get<GetChannels>('/channels')
}
