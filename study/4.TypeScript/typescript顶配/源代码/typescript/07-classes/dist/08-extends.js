"use strict";
// sign 继承 extends
class Animal {
    move() {
        console.log('Moving along!');
    }
}
class Dog extends Animal {
    woof(times) {
        for (let i = 0; i < times; i++) {
            console.log('woof!');
        }
    }
}
const d = new Dog();
d.move();
d.woof(1);
