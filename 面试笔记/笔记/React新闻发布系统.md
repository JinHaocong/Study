# 项目介绍

json-server --watch db.json --port 8000

采用react18 react-router-dom6 以及react-redux

# 封装组件

路由拦截组件

路由懒加载组件

使用的时React.lazy，实质上是组件懒加载，

```js
import React from "react";
import Loading from "./Loading";

export default function Lazyload(path, props) {
  const Lazycomponent = React.lazy(() => import(`../views/${path}`));
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Lazycomponent getData={props}></Lazycomponent>
    </React.Suspense>
  );
}

```

路由重定向组件

因为react-router-dom6 重定向时使用的Navigate，自定义Redirect组件实质上是使用

useNavigate这个hooks

# 难点

权限组件切换权限状态时需要通知侧边栏组件重新获取数据，也就是说兄弟组件之间触发方法。就是先进性子传父，父在调用另一个子组件中的方法

父先将回调函数通过props将回调函数传给子组件，子组件触发回调函数时，父组件在调用另一个子组件的方法，

另一个子组件需要使用forwardRef，useImperativeHandle将方法暴露出去

在父组件中通过useRef获取到方法

这样就可以实现

# 用到的hooks

- useState 状态管理
- useEffect 生命周期管理
- useContext 共享状态数据
- useMemo 缓存值
- useRef 获取Dom 操作
- useCallback 缓存函数
- useReducer redux 相似
- useImperativeHandle 子组件暴露值/方法