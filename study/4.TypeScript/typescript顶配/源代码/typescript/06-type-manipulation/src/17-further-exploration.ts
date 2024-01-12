// sign 进一步探索

//
interface HasPii {
    pii: true
}


// Type[Property] 是  HasPii 的子类型，Type[Property]继承自HasPii
type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends HasPii ? true : false;
};
type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
};

/*
type ObjectsNeedingGDPRDeletion = {
id: false;
name: false;
}
*/
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>

const test171: ObjectsNeedingGDPRDeletion = {
    id: false,
    name: true,
}
