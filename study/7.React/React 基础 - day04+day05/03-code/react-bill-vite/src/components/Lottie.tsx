import {useLottie} from "lottie-react";
import animation from '@/json/loading1.json'


const Lottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const style = {
        height: '100px',
        width: '100px',
    }

    const {View: lottie} = useLottie(defaultOptions, style);

    return (
        <>
            {lottie}
        </>
    )
}

export default Lottie
