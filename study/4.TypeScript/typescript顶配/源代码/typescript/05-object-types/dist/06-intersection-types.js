"use strict";
// sign 交叉类型
const ccc = {
    color: 'red',
    radius: 100
};
function draw(circle) {
    console.log(circle.color);
    console.log(circle.radius);
}
draw({
    color: 'red',
    radius: 100
});
draw({
    color: 'green',
    radius: 100
});
