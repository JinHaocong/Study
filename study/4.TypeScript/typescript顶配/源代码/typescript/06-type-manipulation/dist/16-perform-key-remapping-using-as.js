"use strict";
// sign 通过 as 做 key 重映射
const aaa1 = {
    newProp1: true,
    newProp2: 1
};
const aaa2 = {
    newProp1: 'true',
    newProp2: false
};
const aaa3 = {
    newProp1: false,
    newProp2: ['1', '2', '3', '4']
};
const aaa4 = {
    test: true,
    fuck: 1,
    jhc: 'jhc',
    5: ['1', '2', '3', '4'],
    6: 'test'
};
