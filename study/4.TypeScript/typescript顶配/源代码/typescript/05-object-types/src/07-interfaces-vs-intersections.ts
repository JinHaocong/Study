// sign 处理冲突

interface Sister1 {
    name: string
}

interface Sister1 {
    age: number
}

const sister1: Sister1 = {
    name: 'sisterAn',
    age: 20
}

type Sister2 = {
    name: string
}

// error Duplicate identifier Sister2
// type Sister2 = {}
