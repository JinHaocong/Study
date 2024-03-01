// 封装自定义Hook

// 问题: 布尔切换的逻辑 当前组件耦合在一起的 不方便复用

// 解决思路: 自定义hook

import {useEffect, useState} from "react"

type UseState = [boolean, () => void]
// interface UseState {
//     0: boolean;
//     1: () => void;
// }


const useToggle = (): UseState => {
    // 可复用的逻辑代码
    const [value, setValue] = useState(true)

    const toggle = () => setValue(!value)

    // 哪些状态和回调函数需要在其他组件中使用 return
    return [
        value,
        toggle
    ]

}

// 封装自定义hook通用思路

// 1. 声明一个以use打头的函数
// 2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
// 3. 把组件中用到的状态或者回调return出去（以对象或者数组）
// 4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用


// 自定义Hook，用于获取窗口的宽度和高度
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // 监听窗口变化
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // 添加事件监听器
        window.addEventListener('resize', handleResize);

        // 在组件卸载时清除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 传递一个空数组表示仅在组件挂载和卸载时执行

    // 返回窗口尺寸
    return windowDimensions;
}


function App() {
    const {width, height} = useWindowDimensions();
    const [value, toggle] = useToggle()
    const [value1, toggle1] = useToggle()
    return (
        <div>
            Window Width: {width}, Window Height: {height}
            {value && <div>this is div</div>}
            {value1 && <div>this is div1</div>}
            <button onClick={toggle}>toggle</button>
            <button onClick={toggle1}>toggle1</button>
        </div>
    )
}

export default App
