import React, {createContext, FC, ReactNode, useContext, useState} from 'react';

// 定义上下文值的类型
interface MyContextType {
    globalState: string;
    setGlobalState: React.Dispatch<React.SetStateAction<string>>;
}

interface ParentComponent {
    children: ReactNode
}

// 创建上下文对象并指定默认值
const MyContext = createContext<MyContextType | undefined>(undefined);

// 父组件，提供全局状态
const ParentComponent: FC<ParentComponent> = ({children}) => {
    const [globalState, setGlobalState] = useState<string>('Initial Value');

    return (
        <MyContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </MyContext.Provider>
    );
};

// 子组件，使用全局状态
const ChildComponent: FC = () => {
    // 使用useContext获取上下文值
    const {globalState, setGlobalState} = useContext(MyContext)!; // 需要使用感叹号表示我们确定上下文值不为undefined

    const handleClick = () => {
        setGlobalState('New Value');
    };

    return (
        <div>
            <p>Global State: {globalState}</p>
            <button onClick={handleClick}>Update Global State</button>
        </div>
    );
};

// 在父组件中使用子组件
const App: React.FC = () => {
    return (
        <ParentComponent>
            <ChildComponent/>
        </ParentComponent>
    );
};


export default App;
