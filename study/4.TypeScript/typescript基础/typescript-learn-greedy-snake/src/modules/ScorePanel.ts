/**
 * 定义表示记分牌的类
 * @class ScorePanel
 */
class ScorePanel {
    /**
     * 分数和等级所在的元素
     * @type {HTMLElement}
     */
    scoreEle: HTMLElement;
    /**
     * 分数和等级所在的元素
     * @type {HTMLElement}
     */
    levelEle: HTMLElement;

    /**
     * @param {number} [maxLevel=10] 限制等级
     * @param {number} [upScore=10] 多少分时升级
     */
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this._maxLevel = maxLevel;
        this._upScore = upScore;
    }

    /**
     * 分数
     * @type {number}
     */
    private _score: number = 0;

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    /**
     * 等级
     * @type {number}
     */
    private _level: number = 1;

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    /**
     * 设置一个变量限制等级
     * @type {number}
     */
    private _maxLevel: number;

    get maxLevel(): number {
        return this._maxLevel;
    }

    set maxLevel(value: number) {
        this._maxLevel = value;
    }

    /**
     * 设置一个变量表示多少分时升级
     * @type {number}
     */
    private _upScore: number;

    get upScore(): number {
        return this._upScore;
    }

    set upScore(value: number) {
        this._upScore = value;
    }

    /**
     * 加分
     *
     * 使分数自增
     *
     * 判断分数是多少
     */
    addScore() {
        this.scoreEle.innerHTML = ++this._score + '';
        if (this._score % this._upScore === 0) {
            this.levelUp();
        }
    }

    /**
     * 提升等级
     */
    levelUp() {
        if (this._level < this._maxLevel) {
            this.levelEle.innerHTML = ++this._level + '';
        }
    }

    /**
     * 重置记分牌的状态
     */
    reset() {
        // 将分数和等级重置为初始状态
        this._score = 0;
        this._level = 1;

        // 更新对应的页面元素
        this.scoreEle.innerHTML = this._score.toString();
        this.levelEle.innerHTML = this._level.toString();
    }
}

// 测试代码
// const scorePanel = new ScorePanel(100, 2);
// for(let i=0; i<200; i++){
//     scorePanel.addScore();
// }

export default ScorePanel;
