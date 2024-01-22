import {defineConfig} from "vite";
import path from "path";
import postcssPresetEnv from 'postcss-preset-env'
import {ViteAliases} from 'vite-aliases'
import {createHtmlPlugin} from 'vite-plugin-html'
import {viteMockServe} from 'vite-plugin-mock'

import MockPlugin from "./plugins/MockPlugin.js";
import HtmlPlugin from "./plugins/HtmlPlugin.js";
import AliasPlugin from "./plugins/AliasesPlugin.js";

export default defineConfig(
    {
        base: './',
        optimizeDeps: {
            exclude: [],  // exclude:["lodash-es"] lodash-es不进行预构建
        },
        envPrefix: 'JHC', // 配置环境变量前缀
        css: {
            // 对 css 的行为进行配置
            // 最终会丢给postcss-modules
            modules: {// 是对 css 模块化的默认行为进行覆盖
                localsConvention: "camelCase", // 修改生成对象key的展示形式（驼峰还是中划线）
                scopeBehaviour: "local", // 配置当前的模块化行为是模块化还是全局化
                generateScopedName: "[name]_[local]_[hash:6]", // 模块化生成的类名的规则 也可配置成函数
                // generateScopedName:(name,filename,css) => {
                //     // name => css 文件中的类名
                //     // filename => css 文件的绝对路径
                //     // css => css 文件中的样式
                //     // 返回值就是最终显示类名
                //     return `${name}`
                // },
                hashPrefix: "jhc", // 生成 hash 的时候会根据类名生成，如果想要生成的 hash 更加复杂唯一，可以配置这个选项，会参与最终的 hash 生成
                // globalModulePaths:["./A.module.css"], // 代表不想参与css模块化的路径
            },
            preprocessorOptions: {
                // key + config key代表预处理器的名称
                less: {
                    math: "always",
                    // 全局变量
                    globalVars: {
                        mainColor: "red"
                    }
                },
                // sass:{
                //
                // }
            },
            // Sourcemap 代表文件之间的索引，为了展示正确的错误位置，源代码映射
            devSourcemap: true, // 开启 css 的 Sourcemap
            // 也可以在postcss.config.js中配置
            postcss: {
                plugins: [
                    postcssPresetEnv({
                        // 让postcss知道有一些全局变量他需要记下来 最新版已启用该字段
                        importFrom: path.resolve(__dirname, './variable.css')
                    }),
                ]
            }
        },
        resolve: {
            // 别名
            // alias: {
            //     "@": path.resolve(__dirname, './src'),
            //     "@assets": path.resolve(__dirname, './src/assets'),
            //     "@components": path.resolve(__dirname, './src/components')
            // }
        },
        build: {
            // 配置 rollup 的构建策略
            rollupOptions: {
                // 控制输出
                output: {
                    // 默认值 "assets/[name]-[hash][extname]"
                    assetFileNames: "assets/[hash:10].[name][extname]",
                }
            },
            // 低于 4kb b的会被打包成base64
            assetsInlineLimit: 4096,
            // 输出目录
            outDir: "dist",
            // 输出静态资源目录
            assetsDir: "assets",
            // 启用 CSS 代码拆分
            cssCodeSplit: true
        },
        plugins: [
            ViteAliases({
                prefix: '@'
            }),
            // AliasPlugin({
            //     prefix: '@'
            // }),
            createHtmlPlugin({
                // 压缩html
                minify: true,
                /**
                 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
                 * @default src/main.ts
                 */
                entry: 'main.js',
                /**
                 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
                 * @default index.html
                 */
                template: 'index.html',

                /**
                 * 需要注入 index.html ejs 模版的数据
                 */
                inject: {
                    data: {
                        title: '首页',   // 出现在模版中的 <%- title %>
                        // injectScript: `<script src="./inject.js"></script>`, // 出现在模版中的<%- injectScript %>
                    },
                },
            }),
            // HtmlPlugin({
            //     inject: {
            //         data: {
            //             title: '首页',   // 出现在模版中的 <%- title %>
            //             // injectScript: `<script src="./inject.js"></script>`, // 出现在模版中的<%- injectScript %>
            //         },
            //     },
            // }),
            viteMockServe({
                mockPath: 'mock',
            }),
            // MockPlugin({
            //     enabled: true,
            // })
        ],
        server: {
            host: '0.0.0.0'
        }
    }
)
