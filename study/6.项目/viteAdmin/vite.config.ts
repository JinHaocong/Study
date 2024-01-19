import {defineConfig} from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression';

import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        viteSvgIcons({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
        viteCompression({
            // 体积大于threshold则进行压缩，单位为b
            threshold: 10240,
            // 压缩后删除源文件
            deleteOriginFile: true
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        },
    },
    define: {
        __VUE_I18N_LEGACY_API__: false,
        __VUE_I18N_FULL_INSTALL__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
    },
    // base: "/",
    // 控制台打印
    // logLevel: "silent",
    build: {
        brotliSize: false,
        chunkSizeWarningLimit: 1024,
        // rollupOptions: {
        //   external: ["src/*"],
        // },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    try {
                        if (id.includes("node_modules")) {
                            let name = id.split("node_modules/")[1].split("/");
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
        hmr: {
            overlay: false,
        },
        // host: "localhost",
        port: 3001,
        // 是否自动在浏览器打开
        open: false,
        // 是否开启 https
        https: false,
        proxy: {
            //   '/api': {
            // target: 'https://blog.csdn.net/weixin_45292658',
            // changeOrigin: true,
            // rewrite: path => path.replace(/^\/api/, '')
            //   }
        },
    },
});
