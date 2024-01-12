// sign 映射类型

type Person141 = {
    name: string;
    age: number;
    address: string;
};

// 映射类型，将每个属性变为可选
// Initial type:
// {name?: string, age?: number, address?: string}
type PartialPerson = {
    [Key in keyof Person141]?: Person141[Key];
};

// 使用 PartialPerson
const partialPerson: PartialPerson = {name: 'John'};
