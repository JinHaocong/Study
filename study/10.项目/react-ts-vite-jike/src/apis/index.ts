import {instance} from '@/util/index.ts'

export interface ApiResult<T> {
    status: number
    success: boolean
    message: string
    data: T
    error?: Error
    token?: string
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await instance.get<ApiResult<T>>(url, {params})
    return response.data
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await instance.post<ApiResult<T>>(url, data)
    return response.data
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await instance.put<ApiResult<T>>(url, data)
    return response.data
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await instance.delete<ApiResult<T>>(url, {params})
    return response.data
}
