interface Point1 {
    x: number
    y: number
}

function printXY(pt: Point1) {

}

printXY({x: 100, y: 200})

// 接口扩展
interface Animal {
    name: string
}

interface Bear extends Animal {
    honey: boolean
}

const bear: Bear = {
    name: 'jhc',
    honey: true
}

console.log(bear.name)
console.log(bear.honey)

// 类型别名扩展
type Animal1 = {
    name: string
}
type Bear1 = Animal1 & {
    honey: boolean
}
const bear1: Bear1 = {
    name: 'winnie',
    honey: true
}

console.log(bear1)

// 向现有的类型添加字段
interface MyWindow {
    count: number
}

interface MyWindow {
    title: string
}


const w: MyWindow = {
    title: 'hello ts',
    count: 100
}

// 类型别名创建后是不能更改
type MyWindow1 = {
    title: string
}

// 报错Duplicate identifier MyWindow1
// type MyWindow1 = {
//     count: number
// }
