// instanceof操作符缩小

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString())
    } else {
        console.log(x.toUpperCase())
    }
}

console.log(new Date())
logValue(new Date())
logValue('hello ts')
