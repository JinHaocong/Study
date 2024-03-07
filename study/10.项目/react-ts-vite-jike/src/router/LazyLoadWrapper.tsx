import {lazy} from "react";
import LazyLoad from "./utils/LazyLoad";

const Layout = LazyLoad(lazy(() => import("@/pages/Layout/index.tsx")));
const Login = LazyLoad(lazy(() => import("@/pages/Login/index.tsx")))
const Home = LazyLoad(lazy(() => import("@/pages/Home/index.tsx")))
const Article = LazyLoad(lazy(() => import("@/pages/Article/index.tsx")))
const Publish = LazyLoad(lazy(() => import("@/pages/Publish/index.tsx")))

export {
    Layout,
    Login,
    Home,
    Article,
    Publish
}
