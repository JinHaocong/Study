// sign 类继承-implements


// sign 在类中 实现接口
interface Pingable {
    name: string;

    ping(): void
}

class Sonar implements Pingable {
    name: string = 'jhc'

    ping() {
        console.log('Ping!')
    }
}

const sonar = new Sonar()
console.log(sonar)

class Ball implements Pingable {
    name: string = 'jhc'

    ping() {

    }

    pong() {

    }
}

const ball = new Sonar()
console.log(ball)

// sign
interface A07 {
}

interface B07 {
}

class C07 implements A07, B07 {

}


// sign
interface Check {
    check(name: string): boolean
}

class NameChecker implements Check {
    check(s: string) {
        return s.toLowerCase() === 'ok'
    }
}

const check = new NameChecker()
console.log(check.check('Ok'))


// sign
interface A {
    x: number
    y?: number
}

class C072 implements A {
    x = 0
    // y = 1
}

const c07 = new C072()
console.log(c07.x)

// error Property y does not exist on type C072
// console.log(c07.y)
