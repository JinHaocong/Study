# 2022-9-10

## React Router 6 补充

### 简介

- react-router；核心模块，包含react路由大部分核心功能
- react-router-dom；包含react-touter所有功能，并添加了一些特定的DOM的PI
- react-router-native；用于开发react native应用，包括react-router的所有内容，并添加一些特定于ract native的API，开发手机应用

### 特性变更

- path element
- routes代替switch
- useNavigate代替useHistory
- outlet 路由容器 让路由嵌套更简单
- 移除了 navlink的activeclassname和activestyle
- 钩子useRoutes代替react-router-config

route要包在rotes里面

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Cinema from "../views/Cinema";
import Film from "../views/Film";
import Mine from "../views/Mine";

export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/film" element={<Film></Film>}></Route>
        <Route path="/cinema" element={<Cinema></Cinema>}></Route>
        <Route path="/mine" element={<Mine></Mine>}></Route>
      </Routes>
    </div>
  );
}
```

index用于嵌套路由，仅匹配父路径时，设置渲染的组件，就是指定一个默认显示的子路由，路由地址是现实的父的地址

```js
<Route element={<Film></Film>} index></Route>
```

### 重定向

方案一；使用Navigate组件

原理就是当上面的路由都没有匹配的，就重定向到navigate中包裹的路径

```js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cinema from "../views/Cinema";
import Film from "../views/Film";
import Mine from "../views/Mine";

export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/film" element={<Film></Film>}></Route>
        {/* <Route element={<Film></Film>} index></Route> */}
        <Route path="/cinema" element={<Cinema></Cinema>}></Route>
        <Route path="/mine" element={<Mine></Mine>}></Route>

        <Route path="*" element={<Navigate to="/film"></Navigate>}></Route>
      </Routes>
    </div>
  );
}
```

方案二；自定义Redirect组件

redirect组件中

```js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
      //导航到指定位置
    navigate(to, { replace: true });
  });

  return null;
}
```

路由index中

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Cinema from "../views/Cinema";
import Film from "../views/Film";
import Mine from "../views/Mine";
import Redirect from "../components/Redirect";

export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/film" element={<Film></Film>}></Route>
        {/* <Route element={<Film></Film>} index></Route> */}
        <Route path="/cinema" element={<Cinema></Cinema>}></Route>
        <Route path="/mine" element={<Mine></Mine>}></Route>

        {/* <Route path="*" element={<Navigate to="/film"></Navigate>}></Route> */}
        <Route path="*" element={<Redirect to="/film"></Redirect>}></Route>
      </Routes>
    </div>
  );
}
```

### 嵌套路由

路由容器<Outlet></Outlet>

```js
export default function Film(props) {
  return (
    <div>
      <div style={{ height: "300px", width: "100%", background: "skyblue" }}>
        轮播区域
      </div>
      <div>
        <ul>
          <li>正在热映</li>
          <li>即将上映 </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
```

嵌套路由直接写成嵌套关系即可，并在子路由中留好路由容器，支持相对路径

```js
export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/film" element={<Film></Film>}>
          <Route
            path="nowplaying"
            element={<Nowplaying></Nowplaying>}
          ></Route>
          <Route
            path="commingsoon"
            element={<Commingsoon></Commingsoon>}
          ></Route>
        </Route>
        {/* <Route element={<Film></Film>} index></Route> */}
        <Route path="/cinema" element={<Cinema></Cinema>}></Route>
        <Route path="/mine" element={<Mine></Mine>}></Route>
        <Route path="/notfound" element={<NotFound></NotFound>}></Route>
        <Route path="/cinema/search" element={<Search></Search>}></Route>

        {/* <Route path="*" element={<Navigate to="/film"></Navigate>}></Route> */}
        <Route path="/" element={<Redirect to="/film"></Redirect>}></Route>
        <Route path="*" element={<Redirect to="/notfound"></Redirect>}></Route>
      </Routes>
    </div>
```

二级路由重定向 一进入/film 就跳转到/film/nowplaying

```js
 		<Route path="/film" element={<Film></Film>}>
          {/* <Route index element={<Nowplaying></Nowplaying>}></Route> */}
          <Route
            path=""
            element={<Redirect to="/film/nowplaying"></Redirect>}
          ></Route>
          <Route path="nowplaying" element={<Nowplaying></Nowplaying>}></Route>
          <Route
            path="commingsoon"
            element={<Commingsoon></Commingsoon>}
          ></Route>
        </Route>
```

### 路由导航

声明式导航<NavLink></NavLink>

```js
        <ul>
          <li>
            <NavLink to="/film/nowplaying">正在热映</NavLink>
          </li>
          <li>
            <NavLink to="/film/commingsoon">即将上映</NavLink>
          </li>
        </ul>
```

自定义active时的className

```js
          <NavLink
            to="/film"
            className={({ isActive }) => {
              return isActive ? "tabbaractive" : "";
            }}
          >
            电影
          </NavLink>
```

编程式导航 使用hooks  useNavigate

```js
const navigate = useNavigate();
navigate(`/detail/${item.filmId}`)
```

传参方式

```js
//路由传参
navigate(`/detail/${item.filmId}`)
//query传参
navigate(`/detail?${item.filmId}`)
```

获取路由参数

方式一 useSearchParams

```js
 const [searchParams, setSearchParams] = useSearchParams();

//对应路由传参 方式 navigate(`/detail?id=${item.filmId}`, item.filmId);

//获取参数
searchParams.get("id")
```

方式二useParams()

```js
const params = useParams();
params.filmId
```

### 路由拦截

在路由跳转之前先进性判断，由于router6 时element渲染组件，必须将拦截封装成一个组件进行判断

```js
<Route path="/mine" element={<Hastoken><Mine></Mine></Hastoken>}></Route>
```

拦截组件中，判断是否吗，满足条件，满足则渲染相应组件，不满足则从重定向

```js
export default function Hastoken(props) {
  const token = localStorage.getItem("token");
  return token ? (
    <div>{props.children}</div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
```

登录和退出登录是进行跳转 navigate

登录

```js
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div>
        用户名：
        <input
          type="text"
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        ></input>
      </div>
      <div>
        密码：
        <input
          type="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        ></input>
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem("token", `${username}/${password}`);
            navigate("/mine");
          }}
        >
          登录
        </button>
      </div>
    </div>
  );
}
```

退出登录

注意；因为当前页面就是mine 再跳到mine不会刷新

也可以用*window.location.reload();*

```js
export default function Mine() {
  const navigate = useNavigate();
  return (
    <div>
      Mine
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        退出登录
      </button>
    </div>
  );
}
```

### 路由模式

BrowserRouter

HashRouter

```js
import "./App.css";
import { BrowserRouter，HashRouter } from "react-router-dom";
import MyRouter from "./router";
import Tabbar from "./components/Tabbar";

function App() {
  return (
    <BrowserRouter>
      <MyRouter></MyRouter>
      <Tabbar></Tabbar>
    </BrowserRouter>
  );
}
```

### withRouter /类组件跳转方法

react-router 6 中没有withRouter

正常情况下 函数组件是不需要withRouter的，useNavigate即可实现跳转

```js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Filmitem(item) {
  const navigate = useNavigate();
  return (
    <div>
      <li
        onClick={() => {
          navigate(`/detail/${item.filmId}`, item.filmId);
          // navigate(`/detail?id=${item.filmId}`, item.filmId);
        }}
      >
        {item.name}
      </li>
    </div>
  );
}
```

但是在类组件中useNavigate不能使用，所以要自己封装一个withRouter组件

以往普通组件是直接返回要渲染的内容，

而高阶组件就是返回一个函数，在这个函数里面对包裹的组件进行强化处理添加属性方法，再返回处理后的组件

由于hooks使用规则，hooks只能在函数组件的顶层调用它们。

封装如下

```js
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Withrouter(Component) {
  function Withnavigate(props) {
    const push = useNavigate();
    const match = useParams();
    const location = useLocation();
    return (
      <Component history={{ push, match, location }} {...props}></Component>
    );
  }
  return Withnavigate;
```

使用

```js
import React, { Component } from "react";
import Withrouter from "../../components/Withrouter";

class Filmitem extends Component {
  render() {
    return (
      <div>
        <li
          onClick={() => {
            this.props.history.push(`/detail/${this.props.filmId}`);
          }}
        >
          {this.props.name}
        </li>
      </div>
    );
  }
}

export default Withrouter(Filmitem);
```

### 路由懒加载

实际上是懒加载组件，当用到时再加载

react提供了 React.lazy  React.Suspense

React.lazy 用来懒加载组件

```js
const Lazycomponent = React.lazy(() => import(`../views/${path}`))
```

React.Suspense 用来展示加载时的动画效果 fallback属性

```js
import React from "react";

export default function Lazyload(path) {
  const Lazycomponent = React.lazy(() => import(`../views/${path}`));
  return (
    <React.Suspense
      fallback={<div style={{ textAlign: "center" }}>加载中......</div>}
    >
      <Lazycomponent></Lazycomponent>
    </React.Suspense>
  );
}
```

### useRoutes钩子配置路由

根vue配置很像，非常好用

```js
import React from "react";
import { useRoutes } from "react-router-dom";

import Redirect from "../components/Redirect";
import Hastoken from "../components/Hastoken";
import Lazyload from "../components/Lazyload";

export default function MyRouter() {
  const element = useRoutes([
    {
      path: "/film",
      element: Lazyload("Film"),
      children: [
        {
          path: "",
          element: <Redirect to="/film/nowplaying"></Redirect>,
        },
        {
          path: "/film/nowplaying",
          element: Lazyload("Film/Nowplaying"),
        },
        {
          path: "/film/commingsoon",
          element: Lazyload("Film/Commingsoon"),
        },
      ],
    },
    {
      path: "/cinema",
      element: Lazyload("Cinema"),
    },
    {
      path: "/mine",
      element: <Hastoken>{Lazyload("Mine")}</Hastoken>,
    },
    {
      path: "/detail/:id",
      element: Lazyload("Detail"),
    },
    {
      path: "/login",
      element: Lazyload("Login"),
    },
    {
      path: "/cinema/search",
      element: Lazyload("Search"),
    },
    {
      path: "/notfound",
      element: Lazyload("NotFound"),
    },
    {
      path: "/",
      element: <Redirect to="/film"></Redirect>,
    },
    {
      path: "*",
      element: <Redirect to="/notfound"></Redirect>,
    },
  ]);
  return element;
}

```

