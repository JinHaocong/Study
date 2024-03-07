export interface LoginForm {
    mobile?: string;
    code?: string;
}

export interface LoginInfo {
    token: string;
    userInfo: UserInfo
}

export interface UserInfo {
    birthday: string
    gender: number
    id: string
    mobile: string
    name: string
    photo: string
}
