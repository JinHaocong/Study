// sign 类之间的关系


class Point1 {
    x = 0
    y = 0
}

class Point2 {
    x = 0
    y = 0
}

const p241: Point1 = new Point2()
const p242: Point2 = new Point2()


// sign
class Person {
    name: string = ''
    age: number = 100
}

class Employee {
    name: string = 'jhc'
    age: number = 23
    salary: number = 10
}

const p243: Person = new Employee()

// error Property salary is missing in type Person but required in type Employee
// const p244: Employee = new Person()


// sign 子类和子类关系
class Empty {

}

function fn(x: Empty) {

}

fn(window)
fn({})
fn(fn)
fn(100)
fn('jhc')
