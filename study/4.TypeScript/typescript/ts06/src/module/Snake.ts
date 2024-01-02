/**
 * @Description: TODO
 * @author 毛毛
 * @date 2021-07-10 18:08
 */
export default class Snake {
  // 获取蛇元素的头部
  head: HTMLElement;
  // 获取蛇的容器
  private _element: HTMLElement;
  get element(): HTMLElement {
    return this._element;
  }

  set element(value: HTMLElement) {
    this._element = value;
  }

// 蛇的身体
  bodies: HTMLCollection; // html元素的集合类型，当我们往蛇身体里面添加新元素后，也会自动获取新的元素

  constructor() {
    this._element = document.querySelector('#snake')!;
    this.head = document.querySelector('#snake>div')!;
    this.bodies = this._element.getElementsByTagName('div');
  }

  // 获取蛇的坐标（蛇头坐标） X轴
  get X() {
    return this.head.offsetLeft;
  }

  // 设置蛇的坐标（蛇头坐标） X轴
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    // 判断是否撞墙
    if (value < 0 || value > 290) {
      // 撞墙了，则蛇死了
      throw new Error('蛇撞墙了！')
    }

    // 修改X时，是修改水平坐标，蛇向左移动时 不能向右掉头（只有一节头的时候可以）
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('水平掉头了')
      // 发生掉头，蛇继续反方向移动
      if (value > this.X) {
        // 如果新值大于旧值，这说明蛇在右走，应该向左走的
        value = this.X - 10;
      } else {
        // 应该向右走
        value = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px';

    // 检查是否撞到自己
    this.checkHeadBody()
  }

  // 获取蛇的坐标（蛇头坐标） Y轴
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇的坐标（蛇头坐标） Y轴
  set Y(value: number) {
    // 新值和旧值一样，不需要修改
    if (this.Y === value) return;
    if (value < 0 || value > 290) {
      // 撞墙了，则蛇死了
      throw new Error('蛇撞墙了！')
    }

    // 修改Y时，是修改垂直坐标，蛇向上移动时 不能向下掉头（只有一节头的时候可以）
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log('水平掉头了')
      // 发生掉头，蛇继续反方向移动
      if (value > this.Y) {
        // 如果新值大于旧值，这说明蛇在下走，应该向上走的
        value = this.Y - 10;
      } else {
        // 应该向下走
        value = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody()
    this.head.style.top = value + 'px';

    // 检查是否撞到自己
    this.checkHeadBody()
  }

  // 蛇吃到食物增加身体的长度（增加一个div）
  addBody() {
    // 在当前元素结束标签的前面添加一个html代码（也就是div）
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }

  // 蛇身体移动的方法
  moveBody() {
    /**
     * 将后边的身体设置为前边的身体
     *  第四节   == 第三节
     *  第三节   == 第二节
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 将值给当前身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检查是否相撞
  checkHeadBody(){
    // 检查所有的身体，检查是否和蛇头的坐标发生相撞
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        // 蛇头撞到了身体
        throw new Error('撞到了身体！')
      }
    }
  }
}