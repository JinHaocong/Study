function sum(a: number, b: number) {
    return a + b;
}

console.log(sum(1, 2));
alert("1")


// 导入模块，需要在webpack里面进行配置，webpack默认情况下不知道ts可以作为模块导入
import {name} from "./m";

console.log(name)

const obj = {
    name: '毛',
    age: 20,
    gender: ''
}
obj.gender = '男'
console.log(obj)

console.log(Promise);
