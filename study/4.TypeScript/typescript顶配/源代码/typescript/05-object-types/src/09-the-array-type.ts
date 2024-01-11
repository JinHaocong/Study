// sign 泛型


function doSomething(value: Array<string>) {
    // ...
}

let myArray1: string[] = ['hello', 'world']

doSomething(myArray1)
doSomething(['hello', 'world'])


interface Array2<Type> {
    length: number,

    pop(): Type | undefined

    push(...item: Type[]): number
}
