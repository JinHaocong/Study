// sign protected 只对他们声明的类或子类可见

class Greeter13 {
    public greet() {
        console.log(this.getName())
    }

    protected getName() {
        return 'hello'
    }
}

class SpecialGreeter extends Greeter13 {
    public howdy() {
        console.log(this.getName())
    }
}

const g13 = new SpecialGreeter()
g13.greet()
g13.howdy()

// error Property getName is protected and only accessible within class Greeter13 and its subclasses.
// g13.getName()


// sign 派生类可以手动暴露基类受保护的成员
class Base13 {
    protected m = 10
}

class Derived13 extends Base13 {
    public m = 15
}

const d13 = new Derived13()
console.log(d13.m)
