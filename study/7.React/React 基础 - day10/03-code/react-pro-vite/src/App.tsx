import {forwardRef, useImperativeHandle, useRef} from "react"

interface Props {

}

export interface IRef {
    focusHandler: () => void;
    fuck: string;
}

const Son = forwardRef<IRef, Props>((_, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const focusHandler = () => {
        inputRef.current?.focus()
    }

    // 把聚焦方法暴露出去
    useImperativeHandle(ref, () => {

        return {
            // 暴露的方法
            focusHandler,
            fuck: 'jhc'
        }
    }, [])

    return <input type="text" ref={inputRef}/>
})


// 父组件
function App() {
    const sonRef = useRef<IRef>(null)
    const focus = () => {
        if (!sonRef.current) return
        console.log(sonRef, 'sonRef')
        sonRef.current.focusHandler()
        console.log(sonRef.current.fuck)
    }
    return (
        <>
            <Son ref={sonRef}/>
            <button onClick={focus}>focus</button>
        </>
    )
}

export default App
