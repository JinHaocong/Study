import _ from "lodash";
import './product'

let str: string = 'jhc'
console.log(str)

// str = 555


interface PersonField {
    name: string;
    age: number
}

const demo = (params: PersonField) => {
    console.log(params.name + params.age)
}


demo({name: 'John', age: 18})

console.log(import.meta.env.VITE_NAME)


const mainArr = [1, 2, 3, 4]

_.forEach(mainArr, (item) => {
    console.log(item)
})
