export interface LoginForm {
    mobile?: string;
    code?: string;
}

export interface LoginInfo {
    token: string;
    userInfo: UserInfo
}

export interface UserInfo {
    // id: string
}
