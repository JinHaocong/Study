// export const x = 100;

let x1 = 1000;
console.log(x1)

// any 类型的变量或者说函数会关闭ts的语法检查
function fn(a: number, b: number): number {
    return a + b;
}

//
// function f(a,b) {
//     return a+b;
// }

function dd(a: any, b: any) {
    return a + b;
}

function ff() {
    // 直接使用this，我们是不明确的，
    // console.log(this)
}

function fm(this: Window) {
    console.log(this)
}

let ss = document.querySelector('box');
// ss可能是空值，开启严格检查空值的话，这里会爆错
// ss.addEventListener('click',function (){
//     console.log(1)
// })
// 所以可以这样使用
if (ss !== null) {
    ss.addEventListener('click', function () {
        console.log(1)
    })
}
// 也可以这样使用，判断是否为null
// ss不为null则绑定事件
ss?.addEventListener('click', function () {
    alert(111)
})
