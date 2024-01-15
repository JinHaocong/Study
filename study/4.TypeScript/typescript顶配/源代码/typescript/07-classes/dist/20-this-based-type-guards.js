"use strict";
// sign 基于类型守卫的this
class FileSystemObject {
    constructor(path, networked) {
        this.path = path;
        this.networked = networked;
    }
    isFile() {
        return this instanceof FileRep;
    }
    isDirectory() {
        return this instanceof Directory;
    }
    isNetworked() {
        return this.networked;
    }
}
class FileRep extends FileSystemObject {
    constructor(path, content) {
        super(path, false);
        this.content = content;
    }
}
class Directory extends FileSystemObject {
    constructor() {
        super('', false);
        this.children = [];
    }
}
const fso = new FileRep('./', 'jhc');
if (fso.isFile()) {
    // const fso: FileRep
    console.log(fso.content, 'content');
}
else if (fso.isDirectory()) {
    // const fso: Directory
    console.log(fso.children, 'children');
}
else if (fso.isNetworked()) {
    // const fso: Networked & FileSystemObject
    console.log(fso.host, 'host');
}
// sign
class Box {
    // this 的类型 缩小为 { value: T }
    hasValue() {
        return this.value !== undefined;
    }
}
const box = new Box();
box.value = 'hello';
if (box.hasValue()) {
    console.log(box.value);
}
