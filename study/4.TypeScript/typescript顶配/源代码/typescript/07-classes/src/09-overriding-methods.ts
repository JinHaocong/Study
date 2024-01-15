// sign 重写方法

class Base09 {
    greet() {
        console.log('Hello World')
    }
}

class Derived09 extends Base09 {
    greet(name?: string) {
        if (name === undefined) {
            super.greet()
        } else {
            console.log(name.toUpperCase())
        }
    }
}


//  sign 派生类要与基类兼容
// error Type (name: string) => void is not assignable to type () => void
// class Derived091 extends Base09 {
//     greet(name: string) {
//         console.log(name.toUpperCase())
//     }
// }

const d09 = new Derived09()
d09.greet()
d09.greet('reader')

const b09: Base09 = d09
b09.greet()
