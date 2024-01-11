"use strict";
// sign 属性修改器
function doSomething123(obj) {
    console.log(obj.prop);
    // error Cannot assign to prop because it is a read-only property.
    // obj.prop = 'hello'
}
function visitForBirthday(home) {
    console.log(home.resident.name);
    home.resident.age++;
}
function evict(home) {
    // error Cannot assign to resident because it is a read-only property.
    // home.resident = {
    //   name: 'Felix',
    //   age: 18
    // }
}
let writablePerson = {
    name: 'Felix',
    age: 18
};
let readonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
// error Cannot assign to age because it is a read-only property.
// readonlyPerson.age ++
