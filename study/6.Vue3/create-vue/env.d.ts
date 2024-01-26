/// <reference types="vite/client" />
declare module 'vue' {
  interface ComponentCustomProperties {
    x: number
  }
}

// 为了让 TypeScript 正确解析，有时需要加上一个导出（即使是空的）。
export default {}
