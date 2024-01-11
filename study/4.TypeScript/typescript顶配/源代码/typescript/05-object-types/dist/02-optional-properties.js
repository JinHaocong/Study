"use strict";
// sign 属性修改器
function paintShape1(opts) {
    let xPos = opts.xPos;
    let yPos = opts.yPos;
    console.log(xPos, yPos, 'paintShape1');
}
const shape = {};
paintShape1({ shape });
paintShape1({ shape, xPos: 100 });
paintShape1({ shape, yPos: 100 });
paintShape1({ shape, xPos: 100, yPos: 100 });
// sign 过滤undefined
function paintShape2(opts) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
    console.log(xPos, yPos, 'paintShape2');
}
paintShape2({ shape });
paintShape2({ shape, xPos: 100 });
paintShape2({ shape, yPos: 100 });
paintShape2({ shape, xPos: 100, yPos: 100 });
// sign 默认值传递
// 注意 shape: Shape, xPos: number = 0 :后面代表类型别名而不是类型
function paintShape3({ shape: Shape, xPos: number = 0, yPos = 0 }) {
    // let xPos = opts.xPos === undefined ? 0 : opts.xPos
    // let yPos = opts.yPos === undefined ? 0 : opts.yPos
    console.log(Shape, 'Shape');
    console.log(number, 'number');
}
paintShape3({ shape });
paintShape3({ shape, xPos: 100 });
paintShape3({ shape, yPos: 100 });
paintShape3({ shape, xPos: 100, yPos: 100 });
