// 类型谓词

type Fish1 = {
    name: string
    swim: () => void
}

type Bird1 = {
    name: string
    fly: () => void
}


// 类型谓词  必须有布尔类型返回值
function isFish(pet: Fish1 | Bird1): pet is Fish1 {

    // 返回值是true fet 就是 Fish1类型 否则是 Bird1类型
    return (pet as Fish1).swim !== undefined

}


function getSmallPet(type: boolean): Fish1 | Bird1 {
    let fish: Fish1 = {
        name: 'sharKey',
        swim: () => {
            console.log('swim')
        }
    }

    let bird: Bird1 = {
        name: 'sparrow',
        fly: () => {
            console.log('fly')
        }
    }

    return type ? fish : bird
}

let pet = getSmallPet(true)
let pet2 = getSmallPet(false)

if (isFish(pet)) {
    pet.swim()
} else {
    pet.fly()
}

if (isFish(pet2)) {
    pet2.swim()
} else {
    pet2.fly()
}

const zoo: (Fish1 | Bird1)[] = [getSmallPet(true), getSmallPet(false), getSmallPet(true)]
const zoo2: Array<Fish1 | Bird1> = [getSmallPet(false), getSmallPet(true), getSmallPet(false)]
const underWater1: Fish1[] = zoo.filter(isFish)
const underWater2: Fish1[] = zoo.filter(isFish) as Fish1[]

const underWater3: Fish1[] = zoo.filter((pet): pet is Fish1 => {
    if (pet.name === 'frog') {
        return false
    }
    return isFish(pet)
})

console.log(underWater1, '111')
console.log(underWater2, '222')
console.log(underWater3, '333')

console.log(zoo, 'zoo')
console.log(zoo2, 'zoo2')
