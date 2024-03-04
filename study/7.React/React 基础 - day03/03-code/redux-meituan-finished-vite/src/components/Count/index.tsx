import './index.scss'
import {FC} from "react";

interface CountProps {
    onPlus: () => void;
    onMinus: () => void;
    count: number;
}

const Count: FC<CountProps> = ({onPlus, onMinus, count}) => {
    return (
        <div className="goods-count">
            <span className="minus" onClick={onMinus}></span>
            <span className="count">{count}</span>
            <span className="plus" onClick={onPlus}></span>
        </div>
    )
}

export default Count
