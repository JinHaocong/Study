import {get, post} from "@/apis";
import {ArticlesParams, GetArticles, GetChannels, Publish} from "@/apis/interface";


export const getChannels = () => {
    return get<GetChannels>('/channels')
}

export const publish = (data: Publish) => {
    return post<GetChannels>('/mp/articles?draft=false', data)
}

export const getArticles = (params: ArticlesParams) => {
    return get<GetArticles>('/mp/articles', params)
}
