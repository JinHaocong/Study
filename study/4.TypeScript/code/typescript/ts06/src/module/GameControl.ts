/**
 * @FileName: GameControl.ts
 * @Description: 游戏控制类，控制其他所有的类
 * @author 毛毛
 * @date 2021-07-10 20:34
 */

// 导入食物类
import Food from './Food'
// 导入 记分牌类
import ScopePanel from './ScopePanel'
// 导入蛇类
import Snake from './Snake'

class GameControl {
  // 定义三个属性
  // 蛇
  private snack: Snake;
  // 食物
  private food: Food;
  // 记分牌
  private scorePanel: ScopePanel;
  // 创建存储蛇移动方向（也就是按键的方向的属性）
  private direction: string = 'Right';
  // 记录游戏是否结束的属性(默认情况下表示活着，游戏未结束)
  private isLive: boolean = true;

  constructor() {
    this.snack = new Snake();
    this.food = new Food();
    this.scorePanel = new ScopePanel();
    // 开始游戏
    this.init()
  }

  // 游戏初始化方法，调用该方法，表示游戏开始
  init() {
    // 绑定键盘按下事件
    // 改变this的指向可以使用bind或者箭头函数
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 调用run方法，蛇进行移动，方法需要持续调用
    // 在run方法里的最后用了一个setTimeOut函数来调用自己（run方法），所以这个方法会一直自动执行
    this.run();
  }

  // 键盘按下的响应函数
  private keydownHandler(event: KeyboardEvent) {
    // 获取用户按下的按键，返回值是字符串，比如按下k字母，返回值就是k，
    // 按下上下左右四个箭头方向的按键，在chrome中：返回值：
    // 返回值是 ArrowUp 上 ArrowDown 下 ArrowLeft 左 ArrowRight 右
    // 在IE中，  Up         Down           Left        Right
    // console.log(event.key);

    // 检查按键值是否合法，只有按下方向键才能移动
    // 修改direction属性，也就是按下上下左右键的时候进行修改蛇的移动方向
    this.direction = event.key;
  }

  // 控制蛇移动的方法
  run() {
    // 根据方向direction，蛇进行相应的位置改变
    /**
     * 向上： top减少
     * 向下： top增加
     * 向左： left减少
     * 向右： left增加
     */
        // 获取蛇的当前坐标
    let X = this.snack.X;
    let Y = this.snack.Y;
    // 修改 X Y
    switch (this.direction) {
      case 'ArrowUp':
        // 向上移动 top减少
        Y -= this.scorePanel.upScore;
        break;
      case 'Up':
        // 向上移动 top减少
        Y -= this.scorePanel.upScore;
        break;
      case 'ArrowDown':
        // 向下移动 top增加
        Y += this.scorePanel.upScore;
        break;
      case 'Down':
        // 向下移动 top增加
        Y += this.scorePanel.upScore;
        break;
      case 'ArrowLeft':
        // 向左移动 left减少
        X -= this.scorePanel.upScore;
        break;
      case 'Left':
        // 向左移动 left减少
        X -= this.scorePanel.upScore;
        break;
      case 'ArrowRight':
        // 向右移动 left增加
        X += this.scorePanel.upScore;
        break;
      case 'Right':
        // 向右移动 left增加
        X += this.scorePanel.upScore;
        break;
      default:
        break;
    }
    // 判断蛇是否吃到了食物
    this.checkEat(X, Y);


    // 修改蛇的坐标
    try {
      this.snack.X = X;
      this.snack.Y = Y;
    } catch (error) {
      // 出现异常 游戏结束
      alert(error.message + 'GAME OVER!')
      this.isLive = false
    }


    // 开启定时调用，每隔300ms调用一次run方法
    // 等级越高，执行速度越快，蛇的运行速度越快
    // 游戏未结束才会执行蛇的移动
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 是否吃到食物的方法
  checkEat(X: number, Y: number): void {
    // 吃到食物了
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore()
      // 蛇身体增加
      this.snack.addBody()
    }
  }

}

export default GameControl;