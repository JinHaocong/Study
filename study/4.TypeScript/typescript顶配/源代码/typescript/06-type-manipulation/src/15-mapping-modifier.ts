// sign 映射修改器

// 在映射过程中，有两个额外的修饰符可以应用： readonly 和 ? ，它们分别影响可变性和可选性。
// 你可以通过用 - 或 + 作为前缀来删除或添加这些修饰语。如果你不加前缀，那么就假定是 + 。

// sign 从一个类型的属性中删除 "readonly"属性
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
    readonly id: string;
    readonly name: string;
};
/*
type UnlockedAccount = {
id: string;
name: string;
}
*/
type UnlockedAccount = CreateMutable<LockedAccount>;


// sign 从一个类型的属性中删除 "可选" 属性
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};
/*
type User = {
id: string;
name: string;
age: number;
}
*/
type User = Concrete<MaybeUser>;

interface Person151 {
    name: string;
    age: number;
}


// sign 从一个类型的属性中添加 "readonly" 属性
// {readonly name: string, readonly age: number}
type RequiredPerson = {
    +readonly [K in keyof Person]: Person151[K];
};


// sign 从一个类型的属性中添加 "可选" 属性
// {name?: string, age?: number}
type NotRequiredPerson = {
    [K in keyof Person] +?: Person151[K];
};
