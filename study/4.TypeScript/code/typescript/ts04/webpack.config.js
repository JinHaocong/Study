// webpack的配置
const path = require('path');

// 引入webpack的html插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 配置clean 插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// 导出配置，webpack中的配置都写在这里面
module.exports = {
    // 指定入口文件
    entry: path.join(__dirname, 'src/index.ts'),
    // 指定打包文件所在的目录
    output: {
        // 打包后文件所在的目录
        path: path.join(__dirname, 'dist'),
        // 打包后文件的名字
        filename: 'bundle.js',
        // 配置打包时候的环境
        environment: {
            // 告诉webpack，不使用箭头函数
            arrowFunction: false
        }
    },
    // 开发模式
    // mode: 'development',
    // 生产模式，会进行压缩
    mode: 'production',
    // 指定webpack打包时需要使用到的模块
    module: {
        // 指定加载规则（loader）
        rules: [
            // test 规则生效的文件
            // use 使用什么加载器处理符合要求的文件，多个加载器使用数组，从后往前使用加载器进行加载
            // exclude 排除的文件或者文件夹等
            // 配置 babel的加载器 ，先用ts的加载器把ts转换为js，然后把新的js转换为老版本的js，所以ts加载器在后面
            {
                test: /\.ts$/,
                use: [
                    {
                        // 配置babel，
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 目标，生成的js要运行在哪个浏览器上，兼容哪个版本
                                        targets: {
                                            "chrome": "55",
                                            "ie": "11"
                                        },
                                        // 下面两个配置是很重要的，比如我们使用了promise，但是在ie中很明显是没有这个新特性的，也不支持的
                                        // 那么如果下面的配置没有进行配置，babel是不会帮我们进行转换为ie能识别的代码的
                                        // 当我们配置了以后，babel就会把自己实现的promise引入到生成的文件中，就可以使用promise了
                                        // 指定用哪个版本的core-js，是我们安装的第三方模块
                                        "corejs": "3",
                                        // 使用 corejs的方式 usage 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },

    // 配置webpack的插件
    plugins: [
        // 这个插件每次都会清空生成的文件，所以必须放在最上方，每次旧文件删除，然后新文件在产生
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            //title: '自定义title',
            // 模板，以哪个html页面作为生成后的网页模板
            template: './public/index.html'
        })
    ],
    // 配置模块，用来配置引用模块，那些文件可以作为模块被其他文件引入
    resolve: {
        // extensions 文件拓展名
        extensions: ['.ts', '.js']
    }

}
