import {count} from "./counter";
import getUserPosition from "./request";
import './variable.css'
import "./index.css"
import "./index.less"
import "./A.js"
import "./B.js"
import './src/imageLoader'
import '@components/baseComponent/Button/index.js'

import jsonFile from './src/assets/json/test.json'

import('@/imageLoader.js').then((data) => {
    console.log(data, 'jpgData')
})


console.log(count)
getUserPosition()


// tree shaking 摇树优化：打包工具会自动移除掉没有用到的变量或方法
console.log(jsonFile)


fetch('/api/users', {
    method: 'post'
}).then((res) => {
    // Check if the response status is OK (200-299)
    if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    // Extract JSON data
    return res.json();
}).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e);
});
