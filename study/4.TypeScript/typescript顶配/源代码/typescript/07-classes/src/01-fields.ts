// sign 类成员-类属性

class Point {
    x
    y

    constructor() {
        this.x = 0
        this.y = 0
    }
}

const pt = new Point()
pt.x = 1
pt.y = 1

console.log(pt.x)
console.log(pt.y)

class OkGreeter {
    name!: string
}

const og = new OkGreeter()
// undefined
console.log(og.name)
