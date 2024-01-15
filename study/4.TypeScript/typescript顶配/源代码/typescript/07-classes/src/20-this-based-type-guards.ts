// sign 基于类型守卫的this


class FileSystemObject {
    constructor(public path: string, private networked: boolean) {
    }

    isFile(): this is FileRep {
        return this instanceof FileRep
    }

    isDirectory(): this is Directory {
        return this instanceof Directory
    }

    isNetworked(): this is Networked & this {
        return this.networked
    }
}

class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false)
    }
}

class Directory extends FileSystemObject {
    children: FileSystemObject[]

    constructor() {
        super('', false)
        this.children = []
    }
}

interface Networked {
    host: string
}

const fso: FileSystemObject = new FileRep('./', 'jhc')
if (fso.isFile()) {
    // const fso: FileRep
    console.log(fso.content, 'content')
} else if (fso.isDirectory()) {
    // const fso: Directory
    console.log(fso.children, 'children')
} else if (fso.isNetworked()) {
    // const fso: Networked & FileSystemObject
    console.log(fso.host, 'host')
}


// sign
class Box<T> {
    value?: T


    // this 的类型 缩小为 { value: T }
    hasValue(): this is { value: T } {
        return this.value !== undefined
    }
}

const box = new Box()
box.value = 'hello'

if (box.hasValue()) {
    console.log(box.value)
}
