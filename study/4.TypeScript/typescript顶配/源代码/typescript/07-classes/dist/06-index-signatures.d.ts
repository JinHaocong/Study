declare class MyClass {
    [s: string]: string | ((s: string) => string);
    x: string;
    constructor(key: string, value: string);
    check(s: string): string;
}
declare const test06: MyClass;
