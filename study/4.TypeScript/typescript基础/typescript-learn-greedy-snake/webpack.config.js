// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 提取css为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 进度条
const WebpackBar = require('webpackbar')

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: "bundle.js",

        // 告诉webpack不使用箭头
        environment: {
            arrowFunction: false,
            // 不使用const,此时兼容IE 10
            const: false
        }
    },

    // 指定webpack打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            },

            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",

                    // 引入postcss
                    // 类似于babel，把css语法转换兼容旧版浏览器的语法
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        // 浏览器兼容插件
                                        "postcss-preset-env",
                                        {
                                            // 每个浏览器最新两个版本
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置Webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/public/index.html"
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "main.css",
        }),
        // css压缩
        new CssMinimizerPlugin(),
        //进度条
        new WebpackBar()
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },

    devServer: {
        host: "localhost", // 启动服务器域名
        port: "8080", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    },


};
