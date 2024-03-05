import React, {memo, useCallback, useState} from 'react';

const ChildComponent: React.FC<{ onClick: () => void }> = memo(({onClick}) => {
    console.log('ChildComponent rendering');
    return <button onClick={onClick}>Click me</button>;
});

const ChildComponent2: React.FC<{ onClick: () => void }> = ({onClick}) => {
    console.log('ChildComponent2 rendering');
    return <button onClick={onClick}>Click me2</button>;
};

const ChildComponent3: React.FC<{ onClick: () => void }> = ({onClick}) => {
    console.log('ChildComponent3 rendering');
    return <button onClick={onClick}>Click me3</button>;
};

const ParentComponent: React.FC = () => {
    const [count, setCount] = useState(0);

    // 使用 useCallback 缓存回调函数
    const handleClick = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []); // 空的依赖数组表示这个回调函数没有依赖，不会因为任何变量的变化而重新创建

    const handleClick2 = () => {
        setCount((prevCount) => prevCount + 1);
    }
    return (
        <div>
            <p>Clicked {count} times</p>
            {/* 将缓存的回调函数传递给子组件 */}
            <ChildComponent onClick={handleClick}/>
            <ChildComponent2 onClick={handleClick}/>
            <ChildComponent3 onClick={handleClick2}/>
        </div>
    );
};


export default ParentComponent
