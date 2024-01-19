import {defineConfig} from "vite";
import {viteMockServe} from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    build: {
        // 是否压缩
        minify: true,
        rollupOptions: {
            output: {
                // 分包 两种写法都行
                // manualChunks: (id) => {
                //     if (id.includes('node_modules')) {
                //         return 'vendor';
                //     }
                // },

                // 分包写法2
                manualChunks: {
                    lodash: ['lodash']
                }
            }
        }
    },
    envPrefix: 'JHC-PROD', // 配置环境变量前缀
    plugins: [
        viteCompression({
            // 体积大于threshold则进行压缩，单位为b  10kb
            threshold: 10240,
            // 压缩后删除源文件
            // deleteOriginFile: true
        }),
    ]
})
