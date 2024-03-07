// 统一中转导出
import instance from './request.ts'
import {
    getItem,
    getItems,
    getSessionItem,
    getSessionItems,
    setItem,
    setItems,
    setSessionItem,
    setSessionItems
} from './storage.ts'

export {
    instance,
    setItem,
    setItems,
    getItem,
    getItems,
    setSessionItem,
    setSessionItems,
    getSessionItem,
    getSessionItems
}
