"use strict";
// sign 类继承-implements
class Sonar {
    constructor() {
        this.name = 'jhc';
    }
    ping() {
        console.log('Ping!');
    }
}
const sonar = new Sonar();
console.log(sonar);
class Ball {
    constructor() {
        this.name = 'jhc';
    }
    ping() {
    }
    pong() {
    }
}
const ball = new Sonar();
console.log(ball);
class C07 {
}
class NameChecker {
    check(s) {
        return s.toLowerCase() === 'ok';
    }
}
const check = new NameChecker();
console.log(check.check('Ok'));
class C072 {
    constructor() {
        this.x = 0;
        // y = 1
    }
}
const c07 = new C072();
console.log(c07.x);
// error Property y does not exist on type C072
// console.log(c07.y)
