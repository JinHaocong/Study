"use strict";
// sign 回调中的可选参数
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
        callback(arr[i]);
    }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 3, 4], (a, i) => console.log(a, i));
myForEach(['1', '3', '4', 5], (a, i) => console.log(a, i));
myForEach([1, 2, 3], (a, i) => {
    console.log(i === null || i === void 0 ? void 0 : i.toFixed());
});
