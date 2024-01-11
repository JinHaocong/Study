// sign 索引签名

interface StringArray {
    [index: number]: string
}

const myArray: StringArray = ['a', 'b']
const secondItem = myArray[0]


interface TestString {
    [props: string]: number
}

let testString: TestString = {
    x: 100,
    y: 200,
    // error Type string is not assignable to type number
    // aaa: 'aaa'
}


interface Animal {
    name: string
}

interface Dog extends Animal {
    breed: string
}

interface NotOkay {
    length: number
    name: string

    [index: string]: number | string
}

let notOkay: NotOkay = {
    x: 100,
    length: 100,
    name: 'jhc'
}


interface ReadonlyStringArray {
    readonly [index: number]: string
}

let myArray2: ReadonlyStringArray = ['a', 'b']

// error index signature in type ReadonlyStringArray only permits reading.
// myArray2[0] = 'felix'
