"use strict";
// 联合类型
// Shape2 换成 Shape3  让 radius  sideLength 变成必填
function handleShape(shape) {
    if (shape.kind === 'square') {
        console.log(shape.kind);
    }
}
function getArea1(shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
}
function getArea2(shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
    }
}
