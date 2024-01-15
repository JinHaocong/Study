"use strict";
// sign this类型
class Box19 {
    constructor() {
        this.content = '';
    }
    set(value) {
        this.content = value;
        return this;
    }
}
class ClearableBox extends Box19 {
    clear() {
        this.content = '';
    }
}
const a19 = new ClearableBox();
const b19 = a19.set('hello');
console.log(b19, 'b19');
// sign
class Box191 {
    constructor() {
        this.content = '';
    }
    sameAs(other) {
        console.log(this, 'this');
        return other.content === this.content;
    }
    sameAs2(other) {
        console.log(this, 'this');
        return other.content === this.content;
    }
}
class DerivedBox extends Box191 {
    constructor() {
        super(...arguments);
        this.otherContent = '?';
    }
}
const base = new Box191();
const derived = new DerivedBox();
// true
console.log(derived.sameAs(base));
// error
// console.log(derived.sameAs2(base))
