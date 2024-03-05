import {useLottie} from "lottie-react";
import {CSSProperties, FC} from "react";

interface Props {
    animation: unknown
    initStyle?: CSSProperties
    loop?: boolean
    autoplay?: boolean
    rendererType?: 'svg' | 'canvas' | 'html'
}


const Lottie: FC<Props> = ({animation, initStyle, loop = true, autoplay = true, rendererType = 'svg'}) => {
    const defaultOptions = {
        loop: loop,
        autoplay: autoplay,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const style = {
        height: '100px',
        width: '100px',
        ...initStyle,
    }

    const {View: lottie} = useLottie<typeof rendererType>(defaultOptions, style);

    return (
        <>
            {lottie}
        </>
    )
}

export default Lottie
