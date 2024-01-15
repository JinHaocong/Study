// sign 泛型类


class Box17<T> {
    contents: T

    constructor(contents: T) {
        this.contents = contents
    }

    // error Static members cannot reference class type parameters.
    // static defaultValue:T
}

const box17: Box17<string> = new Box17('jhc')

console.log(box17.contents)
