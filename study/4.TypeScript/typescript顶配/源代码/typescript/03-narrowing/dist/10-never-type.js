"use strict";
function getArea(shape) {
    // never表示不存在的状态
    let _exhaustiveCheck;
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        // 穷尽性检查
        default:
        // 报错 因为任意类型不能分配给never
        // _exhaustiveCheck = shape
        // return _exhaustiveCheck
    }
}
getArea({
    kind: 'circle',
    radius: 5
});
getArea({
    kind: 'circle',
    radius: 5
});
