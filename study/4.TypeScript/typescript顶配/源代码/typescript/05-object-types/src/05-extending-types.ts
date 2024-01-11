// sign 扩展类型

interface BasicAddress {
    name?: string
    street: string
    city: string
    country: string
    postalCode: string
}

// sign 方法一 再定义一个接口
interface AddressWithUnit {
    name?: string
    street: string
    city: string
    country: string
    postalCode: string
    unit: string
}


// sign 方法二 extends 扩展接口
interface AddressWithUnit extends BasicAddress {
    unit: string
}

let testAddress: AddressWithUnit = {
    unit: '3单元',
    street: '清河街道',
    city: '北京',
    postalCode: '100000',
    country: '中国',
    name: '',
}

// sign extends 拓展多个接口
interface Colorful {
    color: string
}

interface Circle {
    radius: number
}

interface ColorCircle extends Colorful, Circle {

}

const cc: ColorCircle = {
    color: 'red',
    radius: 100
}
