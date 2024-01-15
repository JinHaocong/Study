// sign  private 与 protected 一样 但是不可以在子类中访问成员 允许跨实例的私有访问

class Base14 {
    private x = 0

    printX() {
        console.log(this.x)
    }
}

class Derived14 extends Base14 {
    showX() {
        // error Property x is private and only accessible within class Base14
        // console.log(this.x)
    }
}

const d14 = new Derived14()

const base14 = new Base14()

// error Property x is private and only accessible within class Base14
// console.log(base14.x)

// error Property x is private and only accessible within class Base14
// console.log(d14.x)


// sign
class A14 {
    private x = 10

    public sameAs(other: A14) {
        return other.x === this.x
    }
}
