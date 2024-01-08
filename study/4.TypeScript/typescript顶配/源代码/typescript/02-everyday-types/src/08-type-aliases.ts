type Point = {
    x: number
    y: number
}

function printXY1(pt: Point) {
    console.log(pt)

}

printXY1({
    x: 100,
    y: 200
})

type ID = number | string

function printId(id: ID) {
    console.log(id)
}

printId(100)
printId('hello')

type UserInputSanitizedString = string

function sanitizedInput(str: string): UserInputSanitizedString {
    return str.slice(0, 2)
}

sanitizedInput('HELLO')
let userInput: UserInputSanitizedString
userInput = 'new Input'
