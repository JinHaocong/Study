"use strict";
// 类型谓词
// 类型谓词  必须有布尔类型返回值
function isFish(pet) {
    // 返回值是true fet 就是 Fish1类型 否则是 Bird1类型
    return pet.swim !== undefined;
}
function getSmallPet(type) {
    let fish = {
        name: 'sharKey',
        swim: () => {
            console.log('swim');
        }
    };
    let bird = {
        name: 'sparrow',
        fly: () => {
            console.log('fly');
        }
    };
    return type ? fish : bird;
}
let pet = getSmallPet(true);
let pet2 = getSmallPet(false);
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
if (isFish(pet2)) {
    pet2.swim();
}
else {
    pet2.fly();
}
const zoo = [getSmallPet(true), getSmallPet(false), getSmallPet(true)];
const zoo2 = [getSmallPet(false), getSmallPet(true), getSmallPet(false)];
const underWater1 = zoo.filter(isFish);
const underWater2 = zoo.filter(isFish);
const underWater3 = zoo.filter((pet) => {
    if (pet.name === 'frog') {
        return false;
    }
    return isFish(pet);
});
console.log(underWater1, '111');
console.log(underWater2, '222');
console.log(underWater3, '333');
console.log(zoo, 'zoo');
console.log(zoo2, 'zoo2');
