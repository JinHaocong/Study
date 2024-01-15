// sign 参数属性


class Params {
    constructor(public readonly x: number, protected y: number, private z: number) {
        this.x = x
    }
}

const p21 = new Params(100, 300, 400)
console.log(p.x)
p.x = 200
console.log(p.x)

// error  Property y is protected and only accessible within class Params and its subclasses.
// p21.y

// error Property z is private and only accessible within class Params
// p21.z
