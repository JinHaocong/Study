/**
 * @Description: 记分牌
 * @author 毛毛
 * @date 2021-07-10 17:48
 */
export default class ScopePanel {

  // 得分
  private _score: number = 0;
  // 等级
  private _level: number = 1;
  // scoreEle 得分元素
  scoreEle: HTMLElement;
  // 等级元素
  levelEle: HTMLElement;
  // 设置一个变量限制等级
  private _maxLevel: number;
  // 满足什么条件进行升级
  private _upScore: number;

  // 默认值是10
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.querySelector('#score')!;
    this.levelEle = document.querySelector('#level')!;
    this._maxLevel = maxLevel;
    this._upScore = upScore;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get maxLevel(): number {
    return this._maxLevel;
  }

  set maxLevel(value: number) {
    this._maxLevel = value;
  }

  get upScore(): number {
    return this._upScore;
  }

  set upScore(value: number) {
    this._upScore = value;
  }

  // 设置一个加分的方法
  addScore() {
    this._score++;
    this.scoreEle.innerHTML = this._score + '';
    // 判断当前分数
    if (this._score % this._upScore === 0) {
      // 升级
      this.levelUp()
    }
  }

  // 提升等级的方法
  private levelUp() {
    // 等级设置上限
    if (this._level < this._maxLevel) {
      this.levelEle.innerHTML = ++this._level + '';
    }
  }
}