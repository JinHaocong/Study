"use strict";
// sign 索引访问类型
let age091 = 90;
const i11 = 100;
const i12 = '';
const I091 = '';
const I092 = 100;
const I093 = true;
const I31 = true;
const I32 = 'hello';
// error Type 100 is not assignable to type I3
// const I33: I3 = 100
// error Property alve does not exist on type { name: string; age: number; }
// type I4 = Person['alve']
// sign
const MyArray = [
    { name: 'Alice', age: 15 },
    { name: 'Bob', age: 23 },
    { name: 'Eve', age: 38 }
];
const p = {
    name: 'jhc',
    age: 11,
    // error Object literal may only specify known properties, and alive does not exist in type { name: string; age: number; }
    // alive: true
};
const age = 11;
const age2 = 300;
const key2 = 'age';
// error Type key2 cannot be used as an index type.
// error key2 refers to a value, but is being used as a type here. Did you mean typeof key2?
// type Age4 = Person[key2]
