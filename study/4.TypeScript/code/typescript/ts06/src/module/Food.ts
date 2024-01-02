// 食物类
export default class Food {
  // 食物的属性
  // 定义一个属性表示食物所对应的元素（div）
  element: HTMLElement;

  constructor() {
    // 获取页面的food元素，并赋给element
    // 在后面加一个 ! 表示这个不会为null
    this.element = document.querySelector('#food')!;
  }

  // 获取食物X轴坐标的方法
  get X(): number {
    return this.element.offsetLeft;
  }

  // 获取Y轴坐标的方法
  get Y(): number {
    return this.element.offsetTop;
  }

  // 食物的位置随机生成的方法
  change(): void {
    // 食物的位置，最小是0，最大是宽度或者高度减去盒子的宽度和高度
    // 最大的left 300 - 10  最大的高度 300 - 10
    // 食物的坐标必须是可以整除10的
    // 蛇移动一次就是一格，一格就是10
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}
