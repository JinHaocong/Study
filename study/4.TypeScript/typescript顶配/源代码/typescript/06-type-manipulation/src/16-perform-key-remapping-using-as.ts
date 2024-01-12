// sign 通过 as 做 key 重映射

// 在 TypeScript 中，映射类型的键必须是字符串，数字，或符号中的一种。
type OriginalType = {
    prop1: boolean;
    prop2: string;
    prop3: number,
    prop4: string[]
};

type NewKeyType = 'newProp1' | 'newProp2';
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
type ModifiedType = MappedTypeWithNewProperties<OriginalType>;

const aaa1: ModifiedType = {
    newProp1: true,
    newProp2: 1
}

const aaa2: ModifiedType = {
    newProp1: 'true',
    newProp2: false
}

const aaa3: ModifiedType = {
    newProp1: false,
    newProp2: ['1', '2', '3', '4']
}

// sign
type MappedTypeWithNewProperties2<Type> = {
    [Properties in keyof Type as NewKeyType2]: Type[Properties]
}
type NewKeyType2 = 5 | 6 | 'test' | 'fuck' | 'jhc'
type ModifiedType2 = MappedTypeWithNewProperties2<OriginalType>;

const aaa4: ModifiedType2 = {
    test: true,
    fuck: 1,
    jhc: 'jhc',
    5: ['1', '2', '3', '4'],
    6: 'test'
}


// sign 使用模板字面类型
// 生成了一组以 get 开头并使用驼峰命名的方法名。${Capitalize<string & Property>} 的部分用于确保属性名的首字母大写。
// string & Property 确保将 Property 视为字符串类型。
// Capitalize 是 TypeScript 中的一个工具类型，用于将字符串的第一个字符转换为大写。
// Property in keyof Type  =  'name' | 'age' | 'location'
// keyof 返回的是联合类型 而不是字符串类型
// string & 将 Property in keyof Type 视作字符串类型
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () =>
        Type[Property]
};

interface Person161 {
    name: string;
    age: number;
    location: string;
}

/*
type LazyPerson = {
getName: () => string;
getAge: () => number;
getLocation: () => string;
}
*/
type LazyPerson = Getters<Person161>;


// sign  通过条件类型产生 never 滤掉的键。
// 删除 "kind"属性
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

/*
type KindLessCircle = {
radius: number;
}
*/
interface Circle {
    kind: "circle";
    radius: number;
}

type KindLessCircle = RemoveKindField<Circle>;


// sign 可以映射任意的联合体，不仅仅是 string | number | symbol 的联合体，还有任何类型的联合体。
interface Kind {
    kind: string
}

type EventConfig<Events extends Kind> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
/*
type Config = {
square: (event: SquareEvent) => void;
circle: (event: CircleEvent) => void;
}
*/
type Config = EventConfig<SquareEvent | CircleEvent>
