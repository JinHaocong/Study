/**
 * 定义蛇类
 * @class Snake
 */
class Snake {
    /**
     * 表示蛇头的元素
     * @type {HTMLElement}
     */
    head: HTMLElement;
    /**
     * 蛇的身体（包括蛇头）
     * @type {HTMLElement}
     */
    bodies: HTMLCollection;
    /**
     * 获取蛇的容器
     * @type {HTMLElement}
     */
    element: HTMLElement;

    /**
     * @construct
     * 初始化蛇
     */
    constructor() {
        this.element = document.querySelector('#snake') as HTMLElement;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    /**
     * 获取蛇的坐标（蛇头坐标）
     */
    get X() {
        return this.head.offsetLeft;
    }

    /**
     * 设置蛇头的水平位置。
     * @param {number} value - 蛇头的新水平位置。
     */
    set X(value: number) {
        this.setCoordinate('left', value, '水平');

        this.head.style.left = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }

    /**
     * 获取蛇的Y轴坐标
     */
    get Y() {
        return this.head.offsetTop;
    }

    /**
     * 设置蛇头的垂直位置。
     * @param {number} value - 蛇头的新垂直位置。
     */
    set Y(value: number) {
        this.setCoordinate('top', value, '垂直');
    }

    /**
     * 重置蛇的状态
     */
    reset() {
        // 反向遍历并移除所有的身体元素
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.element.removeChild(this.bodies[i]);
        }

        // 将蛇头和身体的位置重置为初始状态
        this.head.style.left = '0px';
        this.head.style.top = '0px';
    }

    // 蛇增加身体的方法
    /**
     * 在蛇的末端添加一个新的身体。
     */
    addBody() {
        // 向element中添加一个div
        // beforeend：结束标签之前的位置
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    /**
     * 添加一个蛇身体移动的方法
     *
     * 将后边的身体设置为前边身体的位置
     */
    moveBody() {
        /*
            *   将后边的身体设置为前边身体的位置
            *       举例子：
            *           第4节 = 第3节的位置
            *           第3节 = 第2节的位置
            *           第2节 = 蛇头的位置
        */
        // 遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    /**
     * 检查蛇头是否撞到身体的方法
     */
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了！');
            }
        }
    }

    /**
     * 设置蛇头的坐标。
     * @param {string} property - 属性，可以是 'left' 或 'top'。
     * @param {number} value - 新的坐标值。
     * @param {string} direction - 移动的方向，可以是 '水平' 或 '垂直'。
     */
    private setCoordinate(property: 'left' | 'top', value: number, direction: '水平' | '垂直') {
        // 如果新值和旧值相同，则直接返回不再修改
        if (this.head.style[property] === value + 'px') {
            return;
        }

        // 修改坐标时的掉头逻辑
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).style[property] === value + 'px') {
            if (value > parseInt(this.head.style[property])) {
                value = parseInt(this.head.style[property]) - 10;
            } else {
                value = parseInt(this.head.style[property]) + 10;
            }
        }

        // 坐标的合法范围0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error(`蛇撞${direction}墙了！`);
        }

        // 移动身体
        this.moveBody();
        this.head.style[property] = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
}

export default Snake;
