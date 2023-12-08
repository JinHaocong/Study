2022-9-11

## 模块介绍

模块 首页，用户管理，权限管理，新闻管理，审核管理，发布管理

## 项目创建与配置

css样式采用模块化导出

## sass引入，与反向代理的配置

引入中间件

```js
npm install http-proxy-middleware
```

/src/setUpProxy.js

注意包的引入形式，只能这么引入

```js
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://i.maoyan.com",
      changeOrigin: true,
      // pathRewrite: {
      //     '^/api': ''
      // }
    })
  );
};
```

## 路由架构

主路由组件

```js
export default function Myrouter() {
  const routes = useRoutes([
    {
      path: "/login",
      element: Lazyload("login/Login"),
    },
    {
      path: "/",
      element: <Hastoken>{Lazyload("sendbox/NewsSendBox")}</Hastoken>,
    },
    {
      path: "/notfound",
      element: Lazyload("404/NotFound"),
    },
    {
      path: "*",
      element: <Redirect to="/notfound"></Redirect>,
    },
  ]);
  return routes;
}
```

路由懒加载组件

```js
export default function Lazyload(path) {
  const Lazycomponent = React.lazy(() => import(`../views/${path}`));
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Lazycomponent></Lazycomponent>
    </React.Suspense>
  );
}
```

重定向组件

```js
export default function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  });

  return null;
}
```

路由拦截组件

```js
export default function Hastoken(props) {
  const token = localStorage.getItem("token");
  return token ? (
    <div>{props.children} </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
```

## 搭建路由

```js
export default function Myrouter() {
  const routes = useRoutes([
    {
      path: "/login",
      element: Lazyload("login/Login"),
    },
    {
      path: "/",
      element: <Hastoken>{Lazyload("sendbox/NewsSendBox")}</Hastoken>,
      children: [
        {
          path: "/",
          element: <Redirect to="/home"></Redirect>,
        },
        {
          path: "/home",
          element: Lazyload("sendbox/home/Home"),
        },
        {
          path: "/user-manage/list",
          element: Lazyload("sendbox/user-manage/UserList"),
        },
        {
          path: "/right-manage/role/list",
          element: Lazyload("sendbox/right-manage/RoleList"),
        },
        {
          path: "/right-manage/right/list",
          element: Lazyload("sendbox/right-manage/RightList"),
        },
      ],
    },
    {
      path: "/notfound",
      element: Lazyload("404/NotFound"),
    },
    {
      path: "*",
      element: <Redirect to="/notfound"></Redirect>,
    },
  ]);
  return routes;
}
```

## Antd引入

## Tpoheader组件

## Sidemenu组件

## JsonServer

```js
json-server --watch db.json --port 8000
```

可以增删改查的

put修改，post增加，get查，delete删除

```js
GET` `POST` `PUT` `PATCH` `DELETE` `OPTIONS` 都支持
```

也可以进行多表联查

_embed 关联

## Sidemenu动态渲染

动态删除问题,注意索引值在每次删除后要减一

```js
  //过滤函数
  const filterMenuList = (menuList) => {
    //删除rightId属性
    for (var index = 0; index < menuList.length; index++) {
      if (menuList[index].children.length !== 0) {
        for (var childrenIndex in menuList[index].children) {
          delete menuList[index].children[childrenIndex].rightId;
        }
      }
      if (menuList[index].pagepermisson !== 1) {
        menuList.splice(index, 1);
        index--;
      }

      if (menuList[index].children.length === 0) {
        delete menuList[index].children;
      }

      if (menuList[index].children) {
        for (
          var childrenIndex2 = 0;
          childrenIndex2 < menuList[index].children.length;
          childrenIndex2++
        ) {
          if (menuList[index].children[childrenIndex2].pagepermisson !== 1) {
            menuList[index].children.splice(childrenIndex2, 1);
            childrenIndex2--;
          }
        }
      }
    }
    setMenuListMine(menuList);
  };
```

获取当前url

```js
const location = useLocation();
```

## 权限列表

## 角色列表

## Outlet通信问题

```js
export default function NewsSendBox() {
  const ChidlRef = useRef(null);
  const [fucGet, setFucGet] = useState({
    getData: () => {
      ChidlRef.current.getMenuList();
    },
  });

  return (
    <div className="box">
      <Layout>
        <Sidemenu ref={ChidlRef}></Sidemenu>
        <Layout className="site-layout">
          <Topheader></Topheader>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              position: "relative",
              overflow: "auto",
            }}
          >
            <Outlet context={[fucGet, setFucGet]}></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
```

## 父组件调用子组件方法 Ref

父组件中

```js
export default function NewsSendBox() {
  useEffect(() => {}, []);

  const ChidlRef = useRef(null);
  const [fucGet, setFucGet] = useState({
    getData: () => {
      ChidlRef.current.getMenuList();
    },
  });

  return (
        <Sidemenu ref={ChidlRef}></Sidemenu>
  );
}
```

由于是Hook 子组件中需将方法暴露出去

```js
  useImperativeHandle(ref, () => ({
    getMenuList,
  }));
```

并使用forwardRef导出

```js
export default forwardRef(Sidemenu);
```

## useEffect依赖为函数问题

如果useEffect中调用了一个函数，一定要注意这个函数定义的顺序，要在useEffect的前面

并且useEffect的依赖值为这个函数

但是汇报个错误，在每次渲染的时候这个函数都被渲染，造成了死循环

所以要用一个useCallback将这个函数也记忆下来，只有当useCallback的依赖发生改变时，才更新这个函数

```js
  const getMenuList = useCallback(() => {
	//函数内的操作
      
      
      
    });
  }, []);
  useEffect(() => {
    getMenuList();
  }, [getMenuList]);
```

## 用户列表

功能；

- 添加用户
- 更改用户状态
- 删除用户
- 编辑用户

forwardRef透传ref

父组件通过useRef创建ref并绑定到子组件上

父组件可以通过这个ref获取到子组件中的信息

子组件导出时套上forwardRef

子组件也能通过ref获取到父组件传过来的

## 登陆界面

token 权限鉴定

## 兄弟组件之间方法调用

- 子组件1调用父组件的方法a，通过props将方法a传给子组件1即可
- 父组件中的方法a再调用子组件2中的方法b，创建一个ref给子组件2绑定，同时在子组件2中使用useImperativeHandle将方法b暴露出去
- 这样就形成了链，子组件一通过props调用父中的方法a，方法a再通过ref.current调用子组件二中的方法b

## 路由权限

## 新闻业务

## 富文本编辑器

子给父传递数据，用回调函数

## 撰写新闻-提交

## 草稿箱-预览

## 提交审核

## 审核管理

## 新闻分类

## 自定义hooks

注意，自定义hooks要以use开头的

## 状态管理redux

## 创建store

将根组件用<Provider store={store}></Provider>包裹，并将仓库提给所有的子组件

```js
import { BrowserRouter } from "react-router-dom";
import Myrouter from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Myrouter></Myrouter>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

将要订阅的组件用connect高阶函数处理后导出

第一个参数是将仓库中的状态映射到自己的props，要是函数返回值的形式

第二个参数是将仓库中的dispatch映射到自己的props中

```js
const mapStateToProps = (state) => {
  return {
    isCollapsed: state.SidemenuReducer.isCollapased,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Topheader);
```

## redux持久化存储

Redux Persist缓存在localstorage中

## 首页数据展示

