declare class Base09 {
    greet(): void;
}
declare class Derived09 extends Base09 {
    greet(name?: string): void;
}
declare const d09: Derived09;
declare const b09: Base09;
