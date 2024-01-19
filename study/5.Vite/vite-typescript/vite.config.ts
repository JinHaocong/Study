import {defineConfig} from "vite";
import checker from 'vite-plugin-checker'
import path from 'path'

// { command, mode, isSsrBuild, isPreview }
export default defineConfig(() => {
    return {
        build: {
            // 是否压缩
            minify: false,
            rollupOptions: {
                // 不单独打包lodash
                // external: ['lodash'],
                input: {
                    main: path.resolve(__dirname, './index.html'),
                    product: path.resolve(__dirname, './src/product.html')
                },
                output: {
                    // 分包 两种写法都行
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

                    // 分包写法2
                    // manualChunks: {
                    //     lodash: ['lodash']
                    // }
                }
            },
        },
        plugins: [checker({
            typescript: true
        })]
    }
})

