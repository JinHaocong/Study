// vite的插件必须返回给vite一个配置对象

import path from "path";
import fs from "fs";


// 过滤掉文件 只保留目录
// 过滤掉文件，只保留目录
function filterDirectories(files, basePath) {
    return files.filter((fileName) => {
        // fs.statSync 方法用于获取文件的状态信息，包括文件类型、大小、创建时间等。
        const fileStat = fs.statSync(path.join(basePath, fileName));
        // 只返回目录
        return fileStat.isDirectory();
    });
}


// 获取别名配置对象
function getAliasOptions(prefix, basePath) {
    const result = filterDirectories(fs.readdirSync(basePath), basePath);

    const aliasObj = {
        [prefix]: basePath,
    };

    result.forEach((dir) => {
        aliasObj[`${prefix}${dir}`] = path.join(basePath, dir);
    });

    return aliasObj;
}


// 解构赋值 如果没有传入{} 对象参数的话则用空对象
export default ({prefix = '@'} = {}) => {
    return {
        name: 'vite-aliases',
        // config 返回的配置对象会覆盖掉原有的配置
        config(config, env) {
            // config: UserConfig
            // env: { mode: string, command: string })
            // mode: development production
            // command: build dev
            const srcPath = path.join(__dirname, '../src');
            const aliasOptions = getAliasOptions(prefix, srcPath);

            return {
                resolve: {
                    alias: aliasOptions,
                },
            }
        }
    }
}
