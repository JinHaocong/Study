// sign 索引访问类型

type Person091 = {
    age: number,
    name: string,
    alive: boolean
}

type Age091 = Person091['age']
let age091: Age091 = 90

// error  Type string is not assignable to type number
// let age: Age091 = '90'


// sign
interface Person092 {
    name: string
    age: number
    alive: boolean
}

// type I1 = string | number
type I1 = Person092['age' | 'name']
const i11: I1 = 100
const i12: I1 = ''

// error Type boolean is not assignable to type I1
// const i13: I1 = true

// type I2 = string | number | boolean
type I2 = Person092[keyof Person092]
const I091: I2 = ''
const I092: I2 = 100
const I093: I2 = true

// error Type {} is not assignable to type I2
// const I24: I2 = {}

type AliveOrName = 'alive' | 'name'
type I3 = Person092[AliveOrName]
const I31: I3 = true
const I32: I3 = 'hello'

// error Type 100 is not assignable to type I3
// const I33: I3 = 100


// error Property alve does not exist on type { name: string; age: number; }
// type I4 = Person['alve']


// sign
const MyArray = [
    {name: 'Alice', age: 15},
    {name: 'Bob', age: 23},
    {name: 'Eve', age: 38}
]

// type Person = { name: string, age: number }
type Person = typeof MyArray[number]
const p: Person = {
    name: 'jhc',
    age: 11,

    // error Object literal may only specify known properties, and alive does not exist in type { name: string; age: number; }
    // alive: true
}

type Age = typeof MyArray[number]['age']
const age: Age = 11

type Age2 = Person['age']
const age2: Age2 = 300


type key = 'age'
type Age3 = Person[key]


const key2 = 'age'
// error Type key2 cannot be used as an index type.
// error key2 refers to a value, but is being used as a type here. Did you mean typeof key2?
// type Age4 = Person[key2]
