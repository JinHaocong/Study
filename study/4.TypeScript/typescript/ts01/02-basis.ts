{
    // 声明一个变量a，类型为number
    let a: number;

    // a 的类型设置为number，在以后的过程中a的值只能为数字
    a = 100;
    // a = 'a';

    let b: string;
    b = 'aaa';

    // 声明完直接赋值
    const c: boolean = true;

    // 不声明类型会默认为第一次赋值的变量的类型为自己的类型
    const d = '111';
    // d = 222;

    // 返回值类型也是必须为number
    /**
     * This function adds two numbers and returns their sum.
     * @param {number} x - the first number
     * @param {number} y - the second number
     * @returns {number} the sum of x and y
     */
    function sum(x: number, y: number): number {
        console.log(x + y);
        return x + y;
    }

    sum(1, 2);
    // sum(1,'2');

}
