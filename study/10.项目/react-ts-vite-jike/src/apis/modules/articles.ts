import {del, get, post, put} from "@/apis";
import {Article, ArticlesParams, GetArticles, GetChannels, Publish} from "@/apis/interface";


export const getChannels = () => {
    return get<GetChannels>('/channels')
}

export const publish = (data: Publish) => {
    return post<null>('/mp/articles?draft=false', data)
}

export const getArticles = (params: ArticlesParams) => {
    return get<GetArticles>('/mp/articles', params)
}

export const deleteArticles = (id: string) => {
    return del<null>(`/mp/articles/${id}`)
}

export const getArticlesById = (id: string) => {
    return get<Article>(`/mp/articles/${id}`)
}

export const updateArticle = (data: Publish, articleId: string) => {
    return put<GetChannels>(`/mp/articles/${articleId}?draft=false`, data)
}
