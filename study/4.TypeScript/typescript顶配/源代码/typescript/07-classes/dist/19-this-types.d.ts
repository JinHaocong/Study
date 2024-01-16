declare class Box19 {
    content: string;
    set(value: string): this;
}
declare class ClearableBox extends Box19 {
    clear(): void;
}
declare const a19: ClearableBox;
declare const b19: ClearableBox;
declare class Box191 {
    content: string;
    sameAs(other: Box191): boolean;
    sameAs2(other: this): boolean;
}
declare class DerivedBox extends Box191 {
    otherContent: string;
}
declare const base: Box191;
declare const derived: DerivedBox;
