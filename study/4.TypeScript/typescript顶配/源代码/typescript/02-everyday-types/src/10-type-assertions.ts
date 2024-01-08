const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement
console.log(myCanvas)

const myCanvas2 = <HTMLCanvasElement>document.getElementById('main_canvas')
console.log(myCanvas2)

const x = ('hello' as unknown) as number
console.log(x)

