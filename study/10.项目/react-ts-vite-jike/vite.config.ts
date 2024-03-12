import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCompression({
            // 压缩后删除源文件
            deleteOriginFile: true
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
