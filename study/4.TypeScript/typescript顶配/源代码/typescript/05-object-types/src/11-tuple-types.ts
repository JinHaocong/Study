// sign 元组类型

function doSomething11(pair: [string, number]) {
    const a = pair[0]
    const b = pair[1]

    // error Tuple type [string, number] of length 2 has no element at index 2
    // const c = pair[2]
}

// error Argument of type [string, number, boolean] is not assignable to parameter of type [string, number]
// error Source has 3 element(s) but target allows only 2
// doSomething11(['hello', 42, true])


function doSomething22(stringHash: [string, number]) {
    const [inputString, hash] = stringHash
}


type Either2dOr3d = [number, number, number?]

function setCoordinate(data: Either2dOr3d) {
    const [x, y, z] = data
    console.log(data.length)
}

setCoordinate([3, 4])
setCoordinate([3, 4, 5])
// error Type string is not assignable to type number
// setCoordinate([3, 4, 'hello'])


type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]

function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args
    console.log(name)
    console.log(version)
    console.log(input)
}

readButtonInput('hello', 10.5, true, false, false)
