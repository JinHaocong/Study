// sign keyof类型操作符

type Point = {
    x: number,
    y: number
}

type P = keyof Point

const p1: P = 'x'
const p2: P = 'y'

// error Type "z" is not assignable to type keyof Point
// const p3: P = 'z'

// sign 索引
type ArrayIsh = {
    [n: number]: unknown
}
type A = keyof ArrayIsh
const a: A = 0


// sign key
type MapIsh = {
    [k: string]: boolean
}

type M = keyof MapIsh

const m1: M = 's'
const m2: M = 100

// error Type boolean is not assignable to type string | number
// const m3: M = true
