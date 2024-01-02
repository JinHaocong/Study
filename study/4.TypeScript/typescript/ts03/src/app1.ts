// 开启即时编译模式，跟踪当前文件的变化，文件变化自动重新编译生成js文件
// 指令: tsc xxx.ts -w

let a = 10;
// a ='';
console.log(a);
a = 20;

// 导入a.ts文件导出的变量
// import {x} from './a'

// console.log(x)
