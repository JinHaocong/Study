"use strict";
// sign 运行时中的this
class MyClass18 {
    constructor() {
        this.name = 'MyClass';
        this.getName3 = () => {
            return this.name;
        };
    }
    getName() {
        return this.name;
    }
    getName2() {
        return this.name;
    }
}
const c18 = new MyClass18();
const obj = {
    name: 'obj',
    getName: c18.getName,
    getName2: c18.getName2,
    getName3: c18.getName3
};
// obj
console.log(obj.getName(), 'getName');
//obj
console.log(obj.getName2(), 'getName2');
//MyClass
console.log(obj.getName3(), 'getName3');
const g18 = c18.getName;
// error The this context of type void is not assignable to method's this of type MyClass18
// console.log(g18(), 'getName')
