// sign 属性修改器


// sign 只读属性
interface SomeType {
    readonly prop: string
}

function doSomething123(obj: SomeType) {
    console.log(obj.prop)
    // error Cannot assign to prop because it is a read-only property.
    // obj.prop = 'hello'
}


interface Home {
    readonly resident: {
        name: string
        age: number
    }
}

function visitForBirthday(home: Home) {
    console.log(home.resident.name)
    home.resident.age++
}

function evict(home: Home) {

    // error Cannot assign to resident because it is a read-only property.
    // home.resident = {
    //   name: 'Felix',
    //   age: 18
    // }
}


interface Person {
    name: string
    age: number
}

interface ReadonlyPerson {
    readonly name: string
    readonly age: number
}

let writablePerson: Person = {
    name: 'Felix',
    age: 18
}

let readonlyPerson: ReadonlyPerson = writablePerson

console.log(readonlyPerson.age)
writablePerson.age++
console.log(readonlyPerson.age)

// error Cannot assign to age because it is a read-only property.
// readonlyPerson.age ++
