// nodejs核心模块，直接使用
const os = require("os");
const path = require("path"); // nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


// cpu核数
const threads = os.cpus().length;

// 用来获取处理样式的loader
function getStyleLoader(pre) {
    return [
        MiniCssExtractPlugin.loader, // 提取css成单独文件
        "css-loader", // 将css资源编译成commonjs的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre,
        // pre可能为undefined 所以需要过滤
    ].filter(Boolean);
}

module.exports = {
    // 入口
    entry: "./src/main.js", // 相对路径
    // 输出
    output: {
        // 所有文件的输出路径
        // __dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"), // 绝对路径
        // 入口文件打包输出文件名
        filename: "static/js/main.js",
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [
                    {
                        test: /\.css$/, // 只检测.css文件
                        use: getStyleLoader(), // 执行顺序：从右到左（从下到上）
                    },
                    {
                        test: /\.less$/,
                        // loader: 'xxx', // 只能使用1个loader
                        use: getStyleLoader("less-loader"),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader("sass-loader"),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader("stylus-loader"),
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                // 小于10kb的图片转base64
                                // 优点：减少请求数量  缺点：体积会更大
                                maxSize: 10 * 1024, // 10kb
                            },
                        },
                        generator: {
                            // 输出图片名称
                            // [hash:10] hash值取前10位
                            filename: "static/images/[hash:10][ext][query]",
                        },
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,
                        type: "asset/resource",
                        generator: {
                            // 输出名称
                            filename: "static/media/[hash:10][ext][query]",
                        },
                    },
                    {
                        test: /\.js$/,
                        // include exclude 二选一
                        // include:path.resolve(__dirname, "src"),
                        exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false, // 缓存文件不要压缩
                                },
                            }
                        ]
                    },
                ],
            },
        ],
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads, // 开启多进程和进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件特点：1. 结构和原来一致 2. 自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
        // // css压缩
        // new CssMinimizerPlugin(),
        // // 开启多进程
        // new TerserPlugin({
        //     parallel: threads
        // })
    ],
    // 优化
    optimization: {
        // 压缩的操作
        // css压缩
        minimize: true,
        // js压缩
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads // 开启多进程
            })
        ],
    },
    // 模式
    mode: "production",
    // 启用源映射
    devtool: "source-map",
};
