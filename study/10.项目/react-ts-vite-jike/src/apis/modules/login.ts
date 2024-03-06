import {post} from '@/apis'
import {User} from "@/apis/interface";

export const login = (data: User.Login) => {
    return post<User.LoginResponse>('/authorizations', data)
}
