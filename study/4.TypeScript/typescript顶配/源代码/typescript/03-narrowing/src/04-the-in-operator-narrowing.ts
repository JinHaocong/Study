// in 缩小

type Fish = { swim: () => void }
type Bird = { fly: () => void }
type Human = { swim?: () => void; fly?: () => void }

function move(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
        // animal: Fish | Human
        return (animal as Fish).swim()
    }

    // animal: Bird | Human
    return (animal as Bird).fly()
}


const fish: Fish = {swim: () => console.log("Fish is swimming")};
move(fish);

const bird: Bird = {fly: () => console.log("Bird is flying")};
move(bird);

const human: Human = {swim: () => console.log("Human is swimming"), fly: () => console.log("Human is flying")};
move(human);
