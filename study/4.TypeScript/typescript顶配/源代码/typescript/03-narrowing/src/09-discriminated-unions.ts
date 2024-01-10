// 联合类型

interface Shape2 {
    kind: 'circle' | 'square'
    radius?: number
    sideLength?: number
}

interface Circle {
    kind: 'circle'
    radius: number
}

interface Square {
    kind: 'square'
    sideLength: number
}

type Shape3 = Circle | Square

// Shape2 换成 Shape3  让 radius  sideLength 变成必填

function handleShape(shape: Shape2) {
    if (shape.kind === 'square') {
        console.log(shape.kind)
    }
}

function getArea1(shape: Shape3) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2
    }
}

function getArea2(shape: Shape3) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2

        case 'square':
            return shape.sideLength ** 2
    }
}
