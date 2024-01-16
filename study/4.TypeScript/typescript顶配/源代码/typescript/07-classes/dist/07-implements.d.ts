interface Pingable {
    name: string;
    ping(): void;
}
declare class Sonar implements Pingable {
    name: string;
    ping(): void;
}
declare const sonar: Sonar;
declare class Ball implements Pingable {
    name: string;
    ping(): void;
    pong(): void;
}
declare const ball: Sonar;
interface A07 {
}
interface B07 {
}
declare class C07 implements A07, B07 {
}
interface Check {
    check(name: string): boolean;
}
declare class NameChecker implements Check {
    check(s: string): boolean;
}
declare const check: NameChecker;
interface A {
    x: number;
    y?: number;
}
declare class C072 implements A {
    x: number;
}
declare const c07: C072;
