import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import viteCompression from 'vite-plugin-compression';
import {visualizer} from 'rollup-plugin-visualizer'
import {autoComplete, Plugin as importToCDN} from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCompression({
            // 压缩后删除源文件
            deleteOriginFile: true
        }),
        visualizer({open: true}),
        importToCDN({
            modules: [
                autoComplete('axios'),
                {
                    name: 'echarts',
                    var: 'echarts',
                    path: 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js'
                }
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        minify: true,
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
                manualChunks: (id) => {
                    try {
                        if (id.includes("node_modules")) {
                            const name = id.split("node_modules/")[1].split("/");
                            if (name[0] == ".pnpm") {
                                return name[1];
                            } else {
                                return name[0]
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                },
            }
        }
    },
    server: {
        open: true,
        host: '0.0.0.0'
    }
})
