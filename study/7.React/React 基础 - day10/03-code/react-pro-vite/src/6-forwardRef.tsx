import {forwardRef, useRef} from "react"


const Son = forwardRef<HTMLInputElement>((_, ref) => {
    return <input type="text" ref={ref}/>
})


// 父组件
function App() {
    const sonRef = useRef<HTMLInputElement>(null)
    const focus = () => {
        console.log(sonRef, 'sonRef')
        sonRef.current?.focus()
    }
    return (
        <>
            <Son ref={sonRef}/>
            <button onClick={focus}>focus</button>
        </>
    )
}

export default App
