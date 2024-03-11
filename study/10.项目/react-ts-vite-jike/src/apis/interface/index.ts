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
