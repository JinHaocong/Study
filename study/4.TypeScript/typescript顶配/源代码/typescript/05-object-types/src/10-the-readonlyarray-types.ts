function doStuff1(values: ReadonlyArray<string>) {
    const copy = values.slice()
    console.log(values[0])

    // values.push('hello')
}

// error  ReadonlyArray only refers to a type, but is being used as a value here
// new ReadonlyArray('red', 'green', 'blue')

const roArray: ReadonlyArray<string> = ['red', 'green', 'blue']


function doStuff2(values: readonly string[]) {
    const copy = values.slice()
    console.log(values[0])

    // error Property push does not exist on type readonly string[]
    // values.push('hello')
}


let x111: readonly string[] = []
let y222: string[] = []

// error 'y222' 可能不应分配给 'x111'
// x111 = y222

// error The type readonly string[] is readonly and cannot be assigned to the mutable type string[]
// y222 = x111
