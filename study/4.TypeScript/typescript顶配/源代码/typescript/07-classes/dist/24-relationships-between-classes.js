"use strict";
// sign 类之间的关系
class Point1 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class Point2 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const p241 = new Point2();
const p242 = new Point2();
// sign
class Person {
    constructor() {
        this.name = '';
        this.age = 100;
    }
}
class Employee {
    constructor() {
        this.name = 'jhc';
        this.age = 23;
        this.salary = 10;
    }
}
const p243 = new Employee();
// error Property salary is missing in type Person but required in type Employee
// const p244: Employee = new Person()
// sign 子类和子类关系
class Empty {
}
function fn(x) {
}
fn(window);
fn({});
fn(fn);
fn(100);
fn('jhc');
