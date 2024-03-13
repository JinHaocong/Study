import {forwardRef, useImperativeHandle, useRef} from "react"

interface Props {
    name: string
}

export interface IRef {
    focusHandler: () => void;
    name: string;
}

const Son = forwardRef<IRef, Props>(({name}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const focusHandler = () => {
        inputRef.current?.focus()
    }

    // 把聚焦方法暴露出去
    useImperativeHandle(ref, () => {

        return {
            // 暴露的方法
            focusHandler,
            name
        }
    }, [name])

    return <input type="text" ref={inputRef}/>
})


// 父组件
function App() {
    const sonRef = useRef<IRef>(null)
    const focus = () => {
        if (!sonRef.current) return
        console.log(sonRef, 'sonRef')
        sonRef.current.focusHandler()
        console.log(sonRef.current.name)
    }
    return (
        <>
            <Son name={'jhc'} ref={sonRef}/>
            <button onClick={focus}>focus</button>
        </>
    )
}

export default App
