import classNames from 'classnames'
import {changeActiveIndex} from '../../store/modules/takeaway'
import './index.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks.ts";

const Menu = () => {
    const {foodsList, activeIndex} = useAppSelector(state => state.foods)
    const dispatch = useAppDispatch()
    const menus = foodsList.map(item => ({tag: item.tag, name: item.name}))
    return (
        <nav className="list-menu">
            {/* 添加active类名会变成激活状态 */}
            {menus.map((item, index) => {
                return (
                    <div
                        // 提交action切换激活index
                        onClick={() => dispatch(changeActiveIndex(index))}
                        key={item.tag}
                        className={classNames('list-menu-item', {active: activeIndex === index})}
                    >
                        {item.name}
                    </div>
                )
            })}
        </nav>
    )
}

export default Menu
