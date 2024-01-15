"use strict";
// sign static区块
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Foo_count;
class Foo {
    get count() {
        return __classPrivateFieldGet(_a, _a, "f", _Foo_count);
    }
}
_a = Foo;
// # 定义的成了一个私有的属性 专用标识符
_Foo_count = { value: 0 };
// 表示 可以在区块内部访问 私有静态属性count
// 这是一个静态初始化块，用于在类初始化时执行一些操作。
(() => {
    var _b;
    try {
        const lastInstance = {
            length: 100
        };
        __classPrivateFieldSet(_b = _a, _a, __classPrivateFieldGet(_b, _a, "f", _Foo_count) + lastInstance.length, "f", _Foo_count);
    }
    catch (e) {
        console.log(e);
    }
})();
// error Property #count is not accessible outside class Foo because it has a private identifier.
// Foo.#count
const foo16 = new Foo();
console.log(foo16.count);
