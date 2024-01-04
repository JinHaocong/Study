/**
 * 定义食物类Food
 * @class Food
 */
class Food {
    /**
     * 定义一个属性表示食物所对应的元素
     * @private
     * @type {HTMLElement}
     */
    private element: HTMLElement;

    /**
     * 创建一个新的食物实例
     *
     * 获取页面中的food元素并将其赋值给element
     *
     * 末尾加上叹号，表示id为food的元素必定存在（非空）
     */
    constructor() {
        this.element = document.getElementById('food')!;
    }

    /**
     * 定义一个获取食物X轴坐标的方法
     * @returns {number} 食物的X坐标
     */
    get X(): number {
        return this.element.offsetLeft;
    }

    /**
     * 定义一个获取食物Y轴坐标的方法
     * @returns {number} 食物的Y坐标
     */
    get Y(): number {
        return this.element.offsetTop;
    }

    /**
     * 修改食物的位置
     *
     * 生成一个随机的位置
     *
     * 食物的位置最小是0 最大是290
     *
     * 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整10
     */
    change(): void {
        let top, left;
        do {
            top = Math.round(Math.random() * 29) * 10;
            left = Math.round(Math.random() * 29) * 10;
        } while (this.checkOverlap(top, left));

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

    /**
     * 检查食物位置是否与蛇身体重叠
     * @param {number} top - 食物的top坐标
     * @param {number} left - 食物的left坐标
     * @returns {boolean} - 是否与蛇身体重叠
     */
    checkOverlap(top: number, left: number): boolean {
        // 获取蛇的所有身体部分
        const snakeBodies = document.querySelectorAll('.snake > div');

        // 检查食物位置是否与蛇的任一身体部分重叠
        for (let i = 0; i < snakeBodies.length; i++) {
            const body = snakeBodies[i] as HTMLElement;
            if (top === body.offsetTop && left === body.offsetLeft) {
                return true; // 重叠返回true
            }
        }

        return false; // 不重叠返回false
    }
}

// 测试代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

export default Food;
