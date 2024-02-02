import instance from '@/http/index'
import { post } from '@/api/index'

export interface LoginRegister {
  account: string
  password: string
  nextPassword?: string
}

export interface LoginResponse {
  id: number
  name: null | string
  account: string
  create_time: string
  department: null | string
  email: null
  identity: string
  image_url: null | string
  password: string
  read_list: null | string
  read_status: number
  sex: null | string
  status: string
  update_time: null | string
}

export interface VerifyData {
  account: number | null
  email: string
  password: string
  nextPassword: string
}

// 注册
export const register = (data: LoginRegister) => {
  return post<LoginResponse>('/api/register', data)
}

// 登录
export const login = (data: LoginRegister) => {
  return post<LoginResponse>('/api/login', data)
}

// 忘记密码验证
export const verify = (data: VerifyData) => {
  return post<LoginResponse>('/user/verifyAccountAndEmail', data)
}

// 密码重置
export const reset = (id: number, newPassword: string) => {
  return post<LoginResponse>('/user/changePasswordInLogin', {
    id,
    newPassword
  })
}

// todo
export const returnMenuList = (id: number) => {
  return instance({
    url: '/api/returnMenuList',
    method: 'POST',
    data: {
      id
    }
  })
}
