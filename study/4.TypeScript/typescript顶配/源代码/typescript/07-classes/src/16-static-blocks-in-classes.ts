// sign static区块


class Foo {
    // # 定义的成了一个私有的属性 专用标识符
    static #count = 0

    get count() {
        return Foo.#count
    }

    // 表示 可以在区块内部访问 私有静态属性count
    // 这是一个静态初始化块，用于在类初始化时执行一些操作。
    static {
        try {
            const lastInstance = {
                length: 100
            }
            Foo.#count += lastInstance.length
        } catch (e) {
            console.log(e)
        }
    }
}


// error Property #count is not accessible outside class Foo because it has a private identifier.
// Foo.#count

const foo16 = new Foo()

console.log(foo16.count)
