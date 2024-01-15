// sign getters / setters

class C05 {
    _length = 0

    get length() {
        return this._length
    }

    set length(value) {
        this._length = value
    }
}

let c: C05 = new C05()
console.log(c.length, 'c.length2')
c.length = 100

// error ype string is not assignable to type number
// c.length = 'hello'
console.log(c.length, 'c.length1')


// sign
class Thing {
    _size = 0

    // get 返回的类型必须是set返回类型的子类型
    get size(): number {
        return this._size
    }

    set size(value: string | number | boolean) {
        let num = Number(value)


        // isFinite 可数的
        if (!Number.isFinite(num)) {
            this._size = 0
            return
        }

        this._size = num
    }
}

let t: Thing = new Thing()
console.log(t.size, '1')
t.size = 900
console.log(t.size, '2')
t.size = 'hello'
console.log(t.size, '3')
