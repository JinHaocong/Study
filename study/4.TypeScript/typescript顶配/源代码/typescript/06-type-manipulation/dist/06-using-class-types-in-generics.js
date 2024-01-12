"use strict";
// sign 在泛型中使用类类型
function create(c, name) {
    return new c(name);
}
class Test {
    constructor(name) {
        this.name = name;
    }
}
console.log(create(Test, 'jhc'));
//
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nameTag = 'Jhc';
    }
}
class Animal062 {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee062 extends Animal062 {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper();
    }
}
class Lion062 extends Animal062 {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
const aaa = createInstance(Lion062);
console.log(aaa, 'aaa');
const bbb = createInstance(Bee062);
console.log(bbb, 'bbb');
// error Argument of type typeof BeeKeeper is not assignable to parameter of type new () => Animal
// error Property numLegs is missing in type BeeKeeper but required in type Animal
// createInstance(BeeKeeper)
// 这样就不报错
class BeeKeeper062 {
    constructor() {
        this.hasMask = true;
        this.numLegs = new Animal062().numLegs;
    }
}
const ccc = createInstance(BeeKeeper062);
console.log(ccc, 'ccc');
