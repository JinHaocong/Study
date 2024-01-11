// sign 重载签名与实现签名


// sign 参数不正确
function fnn1(x: string): void
function fnn1() {

}

fnn1('hello')
// error 报错 Expected 1 arguments, but got 0
// fnn1()


// sign 参数类型不正确
function fnn2(x: boolean): void
function fnn2(x: string): void

function fnn2(x: boolean | string): void {

}

// error 报错  This overload signature is not compatible with its implementation signature.
// function fnn2(x: boolean) {
//
// }

fnn2('hello')


// sign 返回类型不正确
function fnn3(x: string): string
function fnn3(x: boolean): boolean

// error 报错 This overload signature is not compatible with its implementation signature.
// function fnn3(x: string | boolean): string {
//     return 'hello'
// }

function fnn3(x: string | boolean): string | boolean {
    return 'hello'
}

fnn3(true)
fnn3('jhc')

