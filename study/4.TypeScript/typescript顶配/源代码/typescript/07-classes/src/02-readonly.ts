// sign readonly

class Greeter {
    readonly name: string = 'world'

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName
        }
    }

    err() {
        // error Cannot assign to name because it is a read-only property.
        // this.name = 'not ok'
    }
}

const g = new Greeter('hello')

// error Cannot assign to name because it is a read-only property.
// g.name = 'a'
console.log(g.name)
