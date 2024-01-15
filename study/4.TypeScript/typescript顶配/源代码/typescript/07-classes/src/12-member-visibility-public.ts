// sign 成员可见性 public 默认为 public

class Greeter12 {
    public greet() {
        console.log('hi!')
    }

    sayHello() {
        this.greet()
    }
}


// sign
class Hello extends Greeter12 {
    constructor() {
        super()
        this.greet()
    }
}

const g12 = new Hello()
g12.greet()
g12.sayHello()
