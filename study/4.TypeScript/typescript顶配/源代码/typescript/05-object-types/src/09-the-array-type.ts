// sign 泛型


function doSomething1234(value: Array<string>) {
    // ...
}

let myArray1: string[] = ['hello', 'world']

doSomething1234(myArray1)
doSomething1234(['hello', 'world'])


interface Array2<Type> {
    length: number,

    pop(): Type | undefined

    push(...item: Type[]): number
}
