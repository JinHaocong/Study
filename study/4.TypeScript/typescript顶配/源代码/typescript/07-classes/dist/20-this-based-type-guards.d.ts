declare class FileSystemObject {
    path: string;
    private networked;
    constructor(path: string, networked: boolean);
    isFile(): this is FileRep;
    isDirectory(): this is Directory;
    isNetworked(): this is Networked & this;
}
declare class FileRep extends FileSystemObject {
    content: string;
    constructor(path: string, content: string);
}
declare class Directory extends FileSystemObject {
    children: FileSystemObject[];
    constructor();
}
interface Networked {
    host: string;
}
declare const fso: FileSystemObject;
declare class Box<T> {
    value?: T;
    hasValue(): this is {
        value: T;
    };
}
declare const box: Box<unknown>;
