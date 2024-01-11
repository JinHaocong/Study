// sign 对象类型 object

// sign 匿名对象
function greet1(person: { name: string, age: number }) {
    return 'Hello ' + person.name
}

// sign 接口命名
interface Person1 {
    name: string
    age: number
}


function greet2(person: Person1) {
    return 'Hello ' + person.name
}


// sign 类型别名
type Person2 = {
    name: string
    age: number
}

function greet3(person: Person2) {
    return 'Hello ' + person.name
}
