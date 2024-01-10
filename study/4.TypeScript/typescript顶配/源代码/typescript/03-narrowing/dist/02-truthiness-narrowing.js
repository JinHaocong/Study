"use strict";
// 真值检查 真值缩小
function printAll1(str) {
    if (str) {
        if (typeof str === 'object') {
            for (const s of str) {
                console.log(s);
            }
        }
        else {
            console.log(str);
        }
    }
}
printAll1('jhc');
printAll1(['j', 'h', 'c']);
function multiplyAll(values, factor) {
    if (!values) {
        return values;
    }
    else {
        return values.map((x) => {
            return x * factor;
        });
    }
}
console.log(multiplyAll(undefined, 2));
console.log(multiplyAll([2, 1, 3], 2));
