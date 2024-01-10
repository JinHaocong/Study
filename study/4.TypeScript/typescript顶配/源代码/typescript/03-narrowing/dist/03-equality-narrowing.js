"use strict";
// 等值缩小
function example1(x, y) {
    if (x === y) {
        // 此条件 x y 必然都是string
        console.log(x.toUpperCase(), y.toLowerCase());
    }
    else {
        console.log(x);
        console.log(y);
    }
}
example1('jhc', 'jhc');
example1('jhc', true);
example1(1, false);
function printAll2(str) {
    if (str !== null) {
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
printAll2(null);
printAll2('jhc');
printAll2(['j', 'h', 'c']);
function multiplyValue(container, factor) {
    if (container.value != null) {
        container.value *= factor;
        console.log(container.value);
    }
}
multiplyValue({ value: 5 }, 6);
multiplyValue({ value: undefined }, 6);
multiplyValue({ value: null }, 6);
// multiplyValue({value: '5'}, 6)
