declare class Animal {
    move(): void;
}
declare class Dog extends Animal {
    woof(times: number): void;
}
declare const d: Dog;
