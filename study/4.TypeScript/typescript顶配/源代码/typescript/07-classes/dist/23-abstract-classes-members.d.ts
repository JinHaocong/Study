declare abstract class Base23 {
    abstract getName(): string;
    printName(): void;
}
declare class Derived23 extends Base23 {
    getName(): string;
}
declare const b23: Derived23;
declare function greet(ctor: new () => Base23): void;
