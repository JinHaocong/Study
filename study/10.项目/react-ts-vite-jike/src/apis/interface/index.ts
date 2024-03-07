export interface Login {
    mobile: string;
    code: string;
}

export interface LoginResponse {
    refresh_token: string;
    token: string;
}
