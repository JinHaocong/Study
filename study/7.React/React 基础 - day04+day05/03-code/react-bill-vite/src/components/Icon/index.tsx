import {CSSProperties, FC} from "react";

interface Props {
    type: string
    initStyle?: CSSProperties
    className?: string
}

const Icon: FC<Props> = ({type, initStyle, className}) => {
    const style = {
        height: '20px',
        width: '20px',
        ...initStyle,
    }
    return (
        <img
            src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`}
            alt="icon"
            style={style}
            className={className}
        />
    )
}

export default Icon
