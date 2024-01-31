import instance from '@/http/index'
import { post } from '@/api/index'

interface Login {
  account: string
  password: string
}

interface LoginResponse {
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

// 注册
export const register = (data: Login) => {
  return post<LoginResponse>('/api/register', data)
}

// 登录
export const login = (data: Login) => {
  return post<LoginResponse>('/api/login', data)
}

export const returnMenuList = (id: number) => {
  return instance({
    url: '/api/returnMenuList',
    method: 'POST',
    data: {
      id
    }
  })
}

// 忘记密码验证
export const verify = (data: any) => {
  const { account, email } = data
  return instance({
    url: '/user/verifyAccountAndEmail',
    method: 'POST',
    data: {
      account,
      email
    }
  })
}

// 密码重置
export const reset = (id: number, newPassword: string) => {
  return instance({
    url: '/user/changePasswordInLogin',
    method: 'POST',
    data: {
      id,
      newPassword
    }
  })
}
