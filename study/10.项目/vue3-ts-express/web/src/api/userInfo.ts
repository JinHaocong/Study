import instance from '@/http/index'
import { post } from '@/api/index'

export interface UserInfo {
  name: null | string
  account: string
  sex: null | string
  identity: string
  department: null | string
  email: null | string
  image_url: string
}

export interface imageInfo {
  image_url: string
  onlyId: string
}

// 获取用户信息
export const getUserInfo = (id: number) => {
  return post<UserInfo>('/user/getUserInfo', { id })
}

// 修改姓名
export const changeName = (name: string | null, id: number) => {
  return post<[]>('/user/changeName', { name, id })
}

// 修改性别
export const changeSex = (sex: string | null, id: number) => {
  return post<[]>('/user/changeSex', { sex, id })
}

// 修改密码
export const changePassword = (id: number, oldPassword: string, newPassword: string) => {
  return post<[]>('/user/changePassword', { id, oldPassword, newPassword })
}

// 修改邮箱
export const changeEmail = (email: string | null, id: number) => {
  return post<[]>('/user/changeEmail', { email, id })
}

// 绑定图片地址跟账号
export const bind = (account: number, imageInfo: imageInfo) => {
  return post<[]>('/user/bindAccount', {
    account,
    onlyId: imageInfo.onlyId,
    url: imageInfo.image_url
  })
}

// todo

// ----------------------------------------用户管理
// 添加管理员
export const createAdmin = (data: any) => {
  const { account, ...identity } = data
  return instance({
    url: '/user/createAdmin',
    method: 'POST',
    data: {
      account,
      ...identity
    }
  })
}

// 获取管理员列表
export const getAdminList = (identity: string) => {
  return instance({
    url: '/user/getAdminList',
    method: 'POST',
    data: {
      identity
    }
  })
}

// 编辑管理员账号信息
export const editAdmin = (data: any) => {
  const { id, ...department } = data
  return instance({
    url: '/user/editAdmin',
    method: 'POST',
    data: {
      id,
      ...department
    }
  })
}

// 对管理员取消赋权
export const changeIdentityToUser = (id: number) => {
  return instance({
    url: '/user/changeIdentityToUser',
    method: 'POST',
    data: {
      id
    }
  })
}

// 对用户进行赋权
export const changeIdentityToAdmin = (id: number, identity: string) => {
  return instance({
    url: '/user/changeIdentityToAdmin',
    method: 'POST',
    data: {
      id,
      identity
    }
  })
}

// 通过账号对用户搜索
export const searchUser = (account: number, identity: string) => {
  return instance({
    url: '/user/searchUser',
    method: 'POST',
    data: {
      account,
      identity
    }
  })
}

// 通过部门对用户搜索
export const searchDepartment = (department: string) => {
  return instance({
    url: '/user/searchUserByDepartment',
    method: 'POST',
    data: {
      department
    }
  })
}

// 冻结用户
export const banUser = (id: number) => {
  return instance({
    url: '/user/banUser',
    method: 'POST',
    data: {
      id
    }
  })
}

// 解冻用户
export const hotUser = (id: number) => {
  return instance({
    url: '/user/hotUser',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取冻结用户列表
export const getBanList = () => {
  return instance({
    url: '/user/getBanList',
    method: 'POST'
  })
}

// 删除用户  deleteUser
export const deleteUser = (id: number, account: number) => {
  return instance({
    url: '/user/deleteUser',
    method: 'POST',
    data: {
      id,
      account
    }
  })
}

// 获取对应身份的一个总人数
export const getAdminListLength = (identity: string) => {
  return instance({
    url: '/user/getAdminListLength',
    method: 'POST',
    data: {
      identity
    }
  })
}

// 监听换页返回数据
export const returnListData = (pager: number, identity: string) => {
  return instance({
    url: '/user/returnListData',
    method: 'POST',
    data: {
      pager,
      identity
    }
  })
}
