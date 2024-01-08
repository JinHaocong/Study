"use strict";
function printCoordinate(pt) {
    console.log('坐标的x值为：' + pt.x);
    console.log('坐标的y值为：' + pt.y);
}
printCoordinate({
    x: 3,
    y: 7,
    // 报错 Object literal may only specify known properties, and z does not exist in type { x: number; y: number; }
    // z:5
});
/**
 *
 * @param obj
 * @param obj.first
 * @param obj.last
 */
function printName(obj) {
    // 报错 obj.last is possibly undefined
    // console.log(obj.last.toUpperCase());
    obj.last && console.log(obj.last.toLowerCase());
    // 或者这么写
    console.log(obj.last?.toUpperCase());
}
// 两种传递参数都可以
printName({ first: 'haoCong' });
printName({ first: 'haoCong', last: 'jhc' });
// 报错
// printName({last: 'jhc'})
// 额外值 报错 Object literal may only specify known properties, and test does not exist in type
// printName({first: 'Felix', last: 'Lu':test:'111'})
