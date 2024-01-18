import {defineConfig, loadEnv} from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";


// configs: [{},{}]
function mergeConfigs(...configs) {
    return configs.reduce((merged, current) => {
        Object.keys(current).forEach(key => {
            if (Array.isArray(current[key]) && merged[key]) {
                // Handle merging arrays, specifically 'plugins'
                if (key === 'plugins') {
                    mergePlugins(merged[key], current[key]);
                } else {
                    merged[key] = [...merged[key], ...current[key]];
                }
            } else if (typeof current[key] === 'object' && merged[key]) {
                // Recursively merge nested objects
                merged[key] = mergeConfigs(merged[key], current[key]);
            } else {
                // Handle non-array and non-object properties
                merged[key] = current[key];
            }
        });
        return merged;
    }, {});
}

function mergePlugins(existingPlugins, currentPlugins) {
    currentPlugins.forEach((currentPlugin, index) => {
        const existingIndex = existingPlugins.findIndex(existingPlugin => existingPlugin.name === currentPlugin.name);

        if (existingIndex !== -1) {
            // 用当前插件替换现有插件
            existingPlugins[existingIndex] = currentPlugin;
        } else {
            // 如果未找到，则添加新插件
            existingPlugins.push(currentPlugin);
        }
    });
}


// 策略模式
const envResolver = {
    "serve": () => {
        console.log('生产环境');
        return mergeConfigs(viteBaseConfig, viteDevConfig);
    },
    "build": () => {
        console.log('开发环境');
        return mergeConfigs(viteBaseConfig, viteProdConfig);
    },
};


// command : "build" | "serve"
// mode 即为 yarn dev --mode development （development可以修改成别的）
export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
    // mode 当前env文件所在目录 env的文件名（.env为默认可以不传）
    loadEnv(mode, process.cwd(), "")

    return envResolver[command]()
    // if (command === 'build') {
    //     // 代表生产环境的配置
    // } else {
    //     // 代表开发环境的配置
    // }
})
