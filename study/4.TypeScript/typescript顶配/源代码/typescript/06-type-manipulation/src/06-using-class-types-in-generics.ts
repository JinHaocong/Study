// sign 在泛型中使用类类型


// 工厂函数
interface Factory<T> {
    new(name: string): T
}

function create<Type>(c: Factory<Type>, name: string): Type {
    return new c(name)
}

class Test {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

console.log(create(Test, 'jhc'))

//
class BeeKeeper {
    hasMask: boolean = true
}


class ZooKeeper {
    nameTag: string = 'Jhc'

}

class Animal062 {
    numLegs: number = 4
}

class Bee062 extends Animal062 {
    keeper: BeeKeeper = new BeeKeeper()
}

class Lion062 extends Animal062 {
    keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal062>(c: new () => A): A {
    return new c()
}

const aaa = createInstance(Lion062)
console.log(aaa, 'aaa')

const bbb = createInstance(Bee062)
console.log(bbb, 'bbb')

// error Argument of type typeof BeeKeeper is not assignable to parameter of type new () => Animal
// error Property numLegs is missing in type BeeKeeper but required in type Animal
// createInstance(BeeKeeper)


// 这样就不报错
class BeeKeeper062 {
    hasMask: boolean = true
    numLegs = new Animal062().numLegs
}

const ccc = createInstance(BeeKeeper062)
console.log(ccc, 'ccc')

