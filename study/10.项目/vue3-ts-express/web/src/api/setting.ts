import { post } from '@/api/index'
import instance from '@/http'

export interface Setting {
  id: number
  set_name: string
  set_text: string | null
  set_value: string | null
}

export interface CompanyInfo {
  companyIntroduction: string | null
  companyStructure: string | null
  companyStrategy: string | null
  companyLeader: string | null
}

// 获取所有轮播图
export const getAllSwiper = () => {
  return post<Setting[]>('/set/getAllSwiper')
}

// 获取公司名称
export const getCompanyName = () => {
  return post<Setting>('/set/getCompanyName')
}

// 修改公司名称
export const changeCompanyName = (companyName: string | null) => {
  return post<[]>('/set/changeCompanyName', { companyName })
}

// 编辑公司介绍的接口
export const changeCompanyIntroduce = (companyInfo: Partial<CompanyInfo>) => {
  return post<Setting[]>('/set/changeCompanyIntroduce', companyInfo)
}

// 获取公司介绍
export const getCompanyIntroduce = (setName?: string) => {
  return post<Setting[]>('/set/getCompanyIntroduce', { setName })
}

// todo
// 部门设置
export const setDepartment = (data: any) => {
  return instance({
    url: '/set/setDepartment',
    method: 'POST',
    data: {
      set_value: data
    }
  })
}

// 获取部门
export const getDepartment = () => {
  return instance({
    url: '/set/getDepartment',
    method: 'POST'
  })
}

// 产品设置
export const setProduct = (data: any) => {
  return instance({
    url: '/set/setProduct',
    method: 'POST',
    data: {
      set_value: data
    }
  })
}

// 获取产品
export const getProduct = () => {
  return instance({
    url: '/set/getProduct',
    method: 'POST'
  })
}
