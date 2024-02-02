import axios from 'axios'
import { type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'

const instance: AxiosInstance = axios.create({
  // 后端url地址
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 6000, // 设置超时
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    if (!response.data.success) {
      return Promise.reject(response.data)
    }
    return response
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export default instance
