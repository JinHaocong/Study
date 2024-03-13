# useState

`useState` 是 React 中的一个 Hook，它用于在函数组件中添加状态。在 React 中，函数组件之前是无状态的，也就是说它们不能维护任何随时间变化的数据。而通过使用 `useState`，你可以在函数组件中引入状态，使组件能够响应用户的交互和其他事件。

使用方式如下：

```tsx
import React, { useState } from 'react';

// 使用 TypeScript 定义组件的 props
interface ExampleComponentProps {
  initialCount: number;
}

// 使用 React.FC 来定义函数组件，并传入泛型参数定义 props
const ExampleComponent: React.FC<ExampleComponentProps> = ({ initialCount }) => {
  // 使用 useState 定义状态变量 count，类型为 number
  const [count, setCount] = useState<number>(initialCount);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* 点击按钮时调用 setCount 更新 count 的值 */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default ExampleComponent;
```

在上面的例子中，`useState` 接受一个初始值作为参数，并返回一个数组。数组的第一个元素是当前状态的值（这里是 `count`），第二个元素是用于更新状态的函数（这里是 `setCount`）。当按钮被点击时，`setCount` 函数被调用，从而更新 `count` 的值，并重新渲染组件。

通过使用 `useState`，你可以在函数组件中保留和更新状态，实现动态的 UI 表现。

# useRef

`useRef` 是 React 中的一个 Hook，用于创建一个可变的对象，其 `current` 属性被初始化为传入的参数。`useRef` 返回的对象在组件的整个生命周期中保持不变，但可以通过修改 `current` 属性来存储和访问任何可变的值。

主要用途包括：

1. **访问 DOM 元素：** 通过将 `useRef` 赋值给组件的 `ref` 属性，可以轻松地访问和操作 DOM 元素。这是一种绕过 React 的虚拟 DOM 直接操作底层 DOM 的方式。

   ```tsx
   import React, { useRef, useEffect } from 'react';
   
   const MyComponent: React.FC = () => {
     const myInputRef = useRef<HTMLInputElement>(null);
   
     useEffect(() => {
       // 在组件挂载后，focus 输入框
       if (myInputRef.current) {
         myInputRef.current.focus();
       }
     }, []);
   
     return <input ref={myInputRef} />;
   };
   ```

2. **保留变量引用：** 在组件重新渲染时，`useRef` 返回的对象保持不变，这意味着可以在多次渲染之间共享同一引用，而不会导致重新创建。

   ```tsx
   import React, { useRef } from 'react';
   
   const MyComponent: React.FC = () => {
     const countRef = useRef(0);
   
     // 在组件每次重新渲染时增加计数
     countRef.current += 1;
   
     return <p>Render count: {countRef.current}</p>;
   };
   ```

总的来说，`useRef` 提供了一种在函数组件中存储和访问持久化数据的方式，而不需要触发组件的重新渲染。

# useMemo

`useMemo` 是 React 中的一个 Hook，用于对计算昂贵的值进行缓存，以避免在每次渲染时重新计算。它的主要目的是优化性能，特别是在处理大型数据集或执行复杂的计算时。

`useMemo` 接受两个参数：一个是计算函数，另一个是依赖数组。它返回计算函数的结果，并将该结果缓存起来。只有当依赖数组中的值发生变化时，`useMemo` 才会重新计算。

下面是一个简单的例子，演示了使用 `useMemo` 来计算并缓存斐波那契数列：

```tsx
import React, { useMemo, useState } from 'react';

const FibonacciCalculator: React.FC = () => {
  const [number, setNumber] = useState(1);

  // 使用 useMemo 缓存计算结果
  const fibonacciResult = useMemo(() => {
    const calculateFibonacci = (n: number): number => {
      if (n <= 1) {
        return n;
      }
      return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
    };

    return calculateFibonacci(number);
  }, [number]); // 依赖数组包含 number，只有 number 发生变化时才重新计算

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10))}
      />
      <p>Fibonacci of {number} is {fibonacciResult}</p>
    </div>
  );
};
```

在这个例子中，斐波那契数列的计算是一个昂贵的操作。通过使用 `useMemo`，我们确保只有 `number` 改变时才会重新计算斐波那契数列的值，从而避免不必要的计算。这对于优化性能和提高应用的响应速度特别有用。

# useCallback与React.memo

`useCallback` 和 `React.memo` 是一对常常一同使用的 React 优化工具，特别是在处理性能敏感的应用场景时。

1. **`useCallback`：** 主要用于缓存回调函数，以避免在每次组件渲染时重新创建回调函数。通过在 `useCallback` 中指定依赖数组，你可以确保相同的函数引用在依赖不变的情况下不会被重新创建。这对于避免不必要的子组件渲染以及提高性能非常有用。

   ```tsx
   const memoizedCallback = useCallback(
     () => {
       // callback logic
     },
     [dependencies]
   );
   ```

2. **`React.memo`：** 用于封装函数组件，以便在组件的 `props` 没有变化时防止不必要的重新渲染。它接收一个组件作为参数，并返回一个新的组件，该新组件仅在 `props` 发生变化时重新渲染。

   ```tsx
   const MemoizedComponent = React.memo(MyComponent);
   ```

在实际应用中，通常结合使用 `useCallback` 和 `React.memo`，特别是在父组件中使用 `useCallback` 缓存回调函数，然后将其传递给子组件，并使用 `React.memo` 包裹子组件以防止不必要的重新渲染。

```tsx
const ParentComponent: React.FC = () => {
  const handleClick = useCallback(() => {
    // handle click logic
  }, []);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

const ChildComponent: React.FC<{ onClick: () => void }> = React.memo(({ onClick }) => {
  console.log('ChildComponent rendering');
  return <button onClick={onClick}>Click me</button>;
});
```

这样可以确保在父组件重新渲染时，由于使用了 `useCallback`，传递给 `ChildComponent` 的 `onClick` 属性引用保持不变，同时由于使用了 `React.memo`，`ChildComponent` 只在 `props` 发生变化时才会重新渲染。这有助于提高整体应用的性能。

`useCallback` 是 React 中的一个 Hook，它用于缓存回调函数，以避免在每次渲染时创建新的回调函数。主要目的是优化性能，特别是在将回调函数传递给子组件时，避免触发不必要的重新渲染。

当父组件重新渲染时，其子组件可能会因为接收到新的回调函数而重新渲染，即使这个新函数的逻辑与之前的函数相同。通过使用 `useCallback`，你可以确保相同的回调函数实例在多次渲染之间保持不变。

**下面是一个简单的例子**，演示了使用`useCallback` 和 `React.memo` 的情况：

```tsx
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

```

在这个例子中，`handleClick` 是一个处理点击事件的回调函数。通过使用`useCallback` 和 `React.memo` ，我们确保在 `ParentComponent` 重新渲染时，`handleClick` 的引用保持不变，从而避免了不必要的 `ChildComponent` 重新渲染。

注意：只有当你发现通过创建新的回调函数引起了性能问题时，才需要使用 `useCallback` 进行优化。在大多数情况下，React 的性能优化机制可以很好地处理这种情况，而不需要手动缓存回调函数。

# useEffect

`useEffect` 是 React 中的一个 Hook，用于处理副作用操作。在 React 组件中，副作用指的是那些不直接与渲染 UI 相关的操作，例如数据获取、订阅或手动操作 DOM。

`useEffect` 的主要用途是在函数组件中执行一些副作用操作，并且可以在组件的生命周期中指定何时进行这些操作。它接受两个参数：第一个是包含副作用代码的函数，第二个是一个依赖数组，用于指定何时触发副作用操作。

基本语法如下：

```tsx
useEffect(() => {
  // 副作用操作
  return () => {
    // 清理操作（可选）
  };
}, [dependencies]);
```

- 第一个参数是一个函数，包含需要执行的副作用代码。
- 第二个参数是一个依赖数组，包含影响副作用执行的变量。如果省略，副作用会在每次组件渲染时都执行；如果传递一个空数组 `[]`，副作用只会在组件挂载和卸载时执行；如果依赖数组包含变量，副作用将在这些变量发生变化时执行。

以下是 `useEffect` 的一些常见用途：

1. **数据获取和订阅：** 使用 `useEffect` 来获取数据、订阅外部事件或执行其他异步操作。

   ```tsx
   useEffect(() => {
     // 数据获取或订阅逻辑
     fetchData();
     
     return () => {
       // 在组件卸载时进行清理
       unsubscribe();
     };
   }, [dependencies]);
   ```

2. **手动操作 DOM：** 使用 `useEffect` 在组件挂载后或更新后执行手动操作 DOM 的代码。

   ```tsx
   useEffect(() => {
     // 手动操作 DOM 的逻辑
     const element = document.getElementById('myElement');
     element?.classList.add('highlighted');
   
     return () => {
       // 在组件卸载或更新前进行清理
       element?.classList.remove('highlighted');
     };
   }, [dependencies]);
   ```

3. **定时器和计时器：** 使用 `useEffect` 来设置和清理定时器或计时器。

   ```tsx
   useEffect(() => {
     // 设置定时器
     const timerId = setInterval(() => {
       // 定时器逻辑
     }, 1000);
   
     return () => {
       // 在组件卸载或更新前清理定时器
       clearInterval(timerId);
     };
   }, [dependencies]);
   ```

总之，`useEffect` 提供了一种在函数组件中处理副作用的机制，有助于确保这些副作用不会影响到 React 的渲染流程，并且可以在合适的时机执行和清理。

# createContext和useContext

`createContext` 和 `useContext` 是 React 中用于处理全局状态（或者说在组件树中跨多个组件传递数据）的 API。它们通常结合使用，但有不同的作用。

1. **`createContext`：** 该函数用于创建一个全局的上下文对象。这个上下文对象包含两个组件：`Provider` 和 `Consumer`。

   ```tsx
   const MyContext = React.createContext();
   ```

   `MyContext` 包含两个属性：`Provider` 和 `Consumer`。`Provider` 用于在组件树中的某个地方提供共享的数据，而 `Consumer` 用于在组件树中的其他地方访问这个数据。通常，`Provider` 会在父组件中使用，而 `Consumer` 会在子孙组件中使用。

2. **`useContext`：** 该 Hook 用于在函数组件中访问上下文对象的值。它接收一个上下文对象（通过 `createContext` 创建的）作为参数，并返回当前上下文的值。

   ```tsx
   const myContextValue = useContext(MyContext);
   ```

   `useContext` 会在组件渲染时读取 `MyContext` 的当前值，而这个值是由最近的 `MyContext.Provider` 提供的。如果没有匹配的 `Provider`，`useContext` 将使用 `MyContext` 的默认值。

下面是一个简单的例子，演示如何使用 `createContext` 和 `useContext` 传递和获取全局状态：

```tsx
import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from 'react';

// 定义上下文值的类型
interface MyContextType {
    globalState: string;
    setGlobalState: Dispatch<SetStateAction<string>>;
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
const App: FC = () => {
    return (
        <ParentComponent>
            <ChildComponent/>
        </ParentComponent>
    );
};


export default App;

```

在这个例子中，`ParentComponent` 通过 `MyContext.Provider` 提供了一个包含 `globalState` 和 `setGlobalState` 的值对象。然后，`ChildComponent` 使用 `useContext(MyContext)` 来获取这些值，并能够更新全局状态。

# useReducer

在 React 中，`useReducer` 是一个 Hook，它提供了一种替代 `useState` 的方式来管理组件的状态。`useReducer` 的主要作用是将状态和状态更新逻辑分离，使得状态管理更加清晰和可维护，特别是当状态逻辑较复杂时。

`useReducer` 接受两个参数：

1. 第一个参数是一个 reducer 函数，它接收当前状态和要执行的操作（action），然后返回一个新的状态。reducer 函数通常是一个纯函数，它不会直接修改状态，而是根据当前状态和操作返回一个新的状态。
2. 第二个参数是状态的初始值。

`useReducer` 返回一个包含当前状态和 dispatch 函数的数组。dispatch 函数用于触发对状态的更新，它接受一个 action 对象作为参数，然后调用 reducer 函数来计算新的状态。

与 `useState` 相比，`useReducer` 更适用于以下情况：

- 状态逻辑较为复杂，包含多个相关操作。
- 下一个状态依赖于前一个状态以及要执行的操作。
- 需要在组件树中传递状态和操作，以便子组件可以访问和更新状态。

总之，`useReducer` 提供了一种更加灵活和可扩展的方式来管理组件的状态，尤其适用于管理较为复杂的状态逻辑。

```tsx
// useReducer

import {Reducer, useReducer} from "react"

interface State {
    count: number
}

interface Action {
    type: 'INC' | 'DEC' | 'SET'
    payload?: number
}


// 1. 定义reducer函数 根据不同的action 返回不同的状态

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'INC':
            return {count: state.count + 1}
        case 'DEC':
            return {count: state.count - 1}
        case 'SET':
            return {count: action.payload as number}
        default:
            return state
    }
}

// 2. 组件中调用useReducer(reducer, 0) => [state, dispatch]

// 3. 调用dispatch({type:'INC'}) => 通知reducer产生一个新的状态 使用这个新状态更新UI


function App() {
    const initialState = {
        count: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div className="App">
            this is app
            <button onClick={() => dispatch({type: 'DEC'})}>-</button>
            {state.count}
            <button onClick={() => dispatch({type: 'INC'})}>+</button>
            <button onClick={() => dispatch({type: 'SET', payload: 100})}>update</button>
        </div>
    )
}

export default App

```

# 自定义hooks


在React中，自定义Hook是一种用于封装可复用逻辑的机制。它允许你将组件之间共享的状态逻辑提取到可重用的函数中，从而使代码更易于维护和组织。

自定义Hook的命名一般以"use"开头，以表明它是一个Hook。自定义Hook可以使用React的基本Hooks（如useState、useEffect等）以及其他自定义Hook，以创建具有复杂逻辑的组件。

以下是一个简单的例子，演示了一个自定义Hook的使用：

```tsx
import { useState, useEffect } from 'react';

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

// 使用自定义Hook的组件
function MyComponent() {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      Window Width: {width}, Window Height: {height}
    </div>
  );
}
```

在这个例子中，`useWindowDimensions` 是一个自定义Hook，它封装了获取窗口宽度和高度的逻辑。`MyComponent` 组件使用这个Hook来获取窗口尺寸并显示在页面上。这样，窗口尺寸的逻辑被抽象到一个独立的函数中，可以在任何需要获取窗口尺寸的组件中重复使用。

# 