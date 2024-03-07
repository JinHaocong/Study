import {get, post} from '@/apis'
import {Login, LoginResponse, ProfileResponse} from "@/apis/interface";

export const login = (data: Login) => {
    return post<LoginResponse>('/authorizations', data)
}

export const getProfile = () => {
    return get<ProfileResponse>('/user/profile')
}
