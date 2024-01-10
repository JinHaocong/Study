"use strict";
// in 缩小
function move(animal) {
    if ("swim" in animal) {
        // animal: Fish | Human
        return animal.swim();
    }
    // animal: Bird | Human
    return animal.fly();
}
const fish = { swim: () => console.log("Fish is swimming") };
move(fish);
const bird = { fly: () => console.log("Bird is flying") };
move(bird);
const human = { swim: () => console.log("Human is swimming"), fly: () => console.log("Human is flying") };
move(human);
