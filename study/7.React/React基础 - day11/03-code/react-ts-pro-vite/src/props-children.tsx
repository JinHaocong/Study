// props + ts


import {ReactNode} from "react";

type Props = {
    className: string
    children: ReactNode
}

function Button(props: Props) {
    const {className, children} = props
    return <button className={className}>{children} </button>
}

function App() {
    return (
        <>
            <Button className="test">click me!</Button>
            <Button className="test">
                <span>this is span</span>
            </Button>
        </>
    )
}

export default App
