import count from "./js/count";
import sum from "./js/sum";
import {mul} from "./js/math";

// 想要webpack打包资源，必须引入该资源
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";

const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);

console.log(mul(3, 2))

// 判断是否支持HMR功能
if (module.hot) {
    module.hot.accept("./js/count.js", function (count) {
        const result1 = count(2, 1);
        console.log(result1);
    });

    module.hot.accept("./js/sum.js", function (sum) {
        const result2 = sum(1, 2, 3, 4);
        console.log(result2);
    });
}
