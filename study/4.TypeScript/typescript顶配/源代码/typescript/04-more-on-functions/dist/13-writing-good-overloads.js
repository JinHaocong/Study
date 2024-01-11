"use strict";
// sign 编写好的重载函数
// sign 在可能的情况下，总是倾向于使用联合类型的参数而不是重载参数
function len1(x) {
    return x.length;
}
len1('hello');
len1([1, 2, 3]);
// error 报错 len1(Math.random() > 0.5 ? 'hello' : [4, 5, 6])
// len1(Math.random() > 0.5 ? 'hello' : [4, 5, 6])
// sign 好的
function len2(x) {
    return x.length;
}
len2('hello');
len2([1, 2, 3]);
len2(Math.random() > 0.5 ? 'hello' : [4, 5, 6]);
