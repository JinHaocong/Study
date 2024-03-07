import {post} from '@/apis'
import {Login, LoginResponse} from "@/apis/interface";

export const login = (data: Login) => {
    return post<LoginResponse>('/authorizations', data)
}
