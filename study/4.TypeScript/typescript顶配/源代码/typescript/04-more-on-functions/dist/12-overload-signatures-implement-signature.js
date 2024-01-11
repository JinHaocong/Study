"use strict";
// sign 重载签名与实现签名
function fnn1() {
}
fnn1('hello');
function fnn2(x) {
}
// error 报错  This overload signature is not compatible with its implementation signature.
// function fnn2(x: boolean) {
//
// }
fnn2('hello');
// error 报错 This overload signature is not compatible with its implementation signature.
// function fnn3(x: string | boolean): string {
//     return 'hello'
// }
function fnn3(x) {
    return 'hello';
}
fnn3(true);
fnn3('jhc');
