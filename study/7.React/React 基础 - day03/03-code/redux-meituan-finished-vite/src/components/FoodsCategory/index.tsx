import {FoodItemType} from "../../store/interface"
import FoodItem from "./FoodItem";
import './index.scss'
import {FC} from "react";


const FoodsCategory: FC<FoodItemType> = ({name, foods}) => {
    return (
        <div className="category">
            <dl className="cate-list">
                <dt className="cate-title">{name}</dt>

                {foods.map(item => {
                    return <FoodItem key={item.id} {...item} />
                })}
            </dl>
        </div>
    )
}

export default FoodsCategory
