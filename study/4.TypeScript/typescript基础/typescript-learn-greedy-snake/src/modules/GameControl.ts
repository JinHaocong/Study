// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

/**
 * GameControl 类
 *
 * 控制其他类
 * @class GameControl
 */
class GameControl {
    /**
     * 蛇对象
     *
     * @type {Snake}
     */
    snake: Snake;

    /**
     * 食物对象
     *
     * @type {Food}
     */
    food: Food;

    /**
     * 计分面板对象
     *
     * @type {ScorePanel}
     */
    scorePanel: ScorePanel;

    /**
     * 蛇移动方向
     *
     * @type {string}
     */
    direction: string = '';

    /**
     * 游戏是否存活
     *
     * @type {boolean}
     */
    isLive: boolean = true;
    private gameInterval: NodeJS.Timeout | undefined

    /**
     * GameControl 类的实例构造函数
     *
     * 创建蛇，食物，计分板实例
     *
     * 初始化
     * @constructor
     */
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 1);
        this.init();
    }

    /**
     * 初始化游戏
     *
     * 更新食物位置
     *
     * 绑定键盘按键事件
     *
     * 启动游戏
     */
    init() {
        this.food.change();
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
        if (this.isLive) {
            this.gameInterval = setInterval(() => {
                this.run();
                this.updateGameSpeed(); // 在每次循环中更新速度
            }, 300);
        }
    }

    /**
     * 更新游戏速度
     */
    updateGameSpeed() {
        const baseSpeed = 300; // 初始速度
        const speed = baseSpeed - (this.scorePanel.level - 1) * 30;

        // 清除现有的定时器，以防止重叠调用
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        // 设置新的定时器
        this.gameInterval = setInterval(() => {
            this.run();
            this.updateGameSpeed(); // 在每次循环中更新速度
        }, speed);

        // 注意: 这里使用了箭头函数，确保在回调中的 this 指向正确
    }

    /**
     * 键盘按键事件处理函数
     *
     * 检查按下的按键是否有效
     *
     * 更新方向属性
     *
     * @param {KeyboardEvent} event
     */
    keydownHandler(event: { key: string; }) {
        this.direction = event.key;
    }

    /**
     * 重置游戏状态，开始新游戏
     */
    resetGame() {
        // 清除现有的定时器，以防止重叠调用
        if (this.gameInterval) {
            clearInterval(this.gameInterval)
        }

        // 清除事件监听
        document.removeEventListener('keydown', this.keydownHandler.bind(this))

        // 重置蛇、食物和计分板
        this.snake.reset();
        this.scorePanel.reset()
        this.direction = ''

        // 将 isLive 设置为 true，确保游戏处于活动状态
        this.isLive = true;

        this.init()
    }


    /**
     * 运行游戏
     */
    run() {
        /*
            *   根据方向移动蛇
            *       上: top 减小
            *       下: top 增大
            *       左: left 减小
            *       右: left 增大
        */
        // 获取当前蛇的位置
        let {X, Y} = this.snake

        // 根据方向计算新的 X 和 Y 坐标
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);

        // 更新蛇的位置
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            // 进入 catch 块如果发生错误
            // 游戏结束，显示警告
            alert(e.message + ' 游戏结束！')
            // 将 isLive 设置为 false
            this.isLive = false;
            // 游戏结束后，调用 resetGame 开始新游戏
            this.resetGame();
        }
    }

    /**
     * 检查蛇是否吃到了食物
     *
     * @param {number} X
     * @param {number} Y
     */
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 重置食物位置
            this.food.change();
            // 增加分数
            this.scorePanel.addScore();
            // 给蛇添加一个新的身体部分
            this.snake.addBody();
        }
    }
}

export default GameControl;
