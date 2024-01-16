declare class Greeter13 {
    greet(): void;
    protected getName(): string;
}
declare class SpecialGreeter extends Greeter13 {
    howdy(): void;
}
declare const g13: SpecialGreeter;
declare class Base13 {
    protected m: number;
}
declare class Derived13 extends Base13 {
    m: number;
}
declare const d13: Derived13;
