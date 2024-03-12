// 统一中转导出
import instance from './request.ts'
import {
    clearLocal,
    clearSession,
    getItem,
    getItems,
    getSessionItem,
    getSessionItems,
    getToken,
    removeItem,
    removeItems,
    removeSessionItem,
    removeSessionItems,
    setItem,
    setItems,
    setSessionItem,
    setSessionItems
} from './storage.ts'

// import echarts from './echarts'

export {
    instance,
    setItem,
    setItems,
    getItem,
    getItems,
    removeItem,
    removeItems,
    setSessionItem,
    setSessionItems,
    getSessionItem,
    getSessionItems,
    removeSessionItem,
    removeSessionItems,
    clearLocal,
    clearSession,
    getToken,
    // echarts
}
