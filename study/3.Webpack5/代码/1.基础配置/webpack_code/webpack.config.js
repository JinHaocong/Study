// Node.js的核心模块，专门用来处理文件路径
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 入口
    // 相对路径和绝对路径都行
    entry: "./src/main.js",
    // 输出
    output: {
        // path: 文件输出目录，必须是绝对路径
        // path.resolve()方法返回一个绝对路径
        // __dirname 当前文件的文件夹绝对路径
        path: path.resolve(__dirname, "dist"),
        // filename: 输出文件名 入口文件打包输出文件名
        filename: "static/js/main.js",
        clean: true, // 自动将上次打包目录资源清空
    },
    // 加载器
    module: {
        rules: [
            {
                // 用来匹配 .css 结尾的文件  use可以使用多个loader loader: 只能使用一个
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左(从下至上)
                use: [
                    "style-loader", // 将js中的css创建成style标签添加到html文件中生效
                    "css-loader", // 将css资源编译成common js的模块到js中
                ],
            },
            {
                // 处理less
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
            },
            {
                // 处理sacc scss
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                // 处理style
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ],
            },
            {
                // 处理图片
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    // 数据Url条件
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                    }
                },
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/imgs/[hash:8][ext][query]",
                },
            },
            {
                // 处理字体 以及其他资源音频视频
                test: /\.(ttf|woff2?|map4|map3|avi)$/,
                type: "asset/resource", // 原封不动输出 不转成Base64格式
                generator: {
                    filename: "static/media/[hash:8][ext][query]",
                },
            },
            {
                // babel
                test: /\.js$/,
                // include exclude 二选一
                // include:path.resolve(__dirname, "src"),
                exclude: /node_modules/, // 排除node_modules代码不编译
                loader: "babel-loader",
                options: {
                    cacheDirectory: true, // 开启babel编译缓存
                    cacheCompression: false, // 缓存文件不要压缩
                },
                // 写在这里也可以
                // options: {
                //     presets: ["@babel/preset-env"],
                // }
            },
        ],
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
    // 开发服务器 不会输出资源 在内存中编译打包
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },
    // 模式
    mode: "development",  // 开发模式
}
