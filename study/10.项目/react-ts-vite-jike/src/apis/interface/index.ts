export interface Login {
    mobile: string;
    code: string;
}

export interface LoginResponse {
    refresh_token: string;
    token: string;
}

export interface ProfileResponse {
    birthday: string
    gender: number
    id: string
    mobile: string
    name: string
    photo: string
}

export interface GetChannels {
    channels: Channel[]
}

export interface Channel {
    id: number
    name: string
}

export interface Publish {
    channel_id: string
    content: string
    title: string
    cover: Cover
}

export interface Cover {
    type: number
    images: string[]
}

export interface GetArticles {
    page: number
    per_page: number
    results: Article[]
    total_count: number
}

export interface Article {
    comment_count: number
    cover: Cover
    id: string
    like_count: number
    pubdate: string
    read_count: number
    status: number
    title: string
}

export interface ArticlesParams {
    page: number,
    per_page: number,
    begin_pubdate: null | string,
    end_pubdate: null | string,
    status: null | number,
    channel_id: null | string
}
