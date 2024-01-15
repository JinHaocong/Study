// sign 类方法

class Point04 {
    x: number = 10
    y: number = 10

    scale(n: number): void {
        this.x *= n
        this.y *= n
    }
}

const p04 = new Point04()
p04.scale(10)
console.log(p04.x)
console.log(p04.y)


// sign
let x: number = 0

class C {
    x: string = 'hello'

    m() {
        // 为上面的x
        x = 100
    }
}
