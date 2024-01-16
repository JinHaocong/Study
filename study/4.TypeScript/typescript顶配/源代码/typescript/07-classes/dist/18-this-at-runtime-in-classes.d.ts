declare class MyClass18 {
    name: string;
    getName(this: MyClass18): string;
    getName2(): string;
    getName3: () => string;
}
declare const c18: MyClass18;
declare const obj: {
    name: string;
    getName: (this: MyClass18) => string;
    getName2: () => string;
    getName3: () => string;
};
declare const g18: (this: MyClass18) => string;
