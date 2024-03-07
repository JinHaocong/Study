import {lazy} from "react";
import LazyLoad from "./utils/LazyLoad";

const Layout = LazyLoad(lazy(() => import("@/pages/Layout/index.tsx")));
const Login = LazyLoad(lazy(() => import("@/pages/Login/index.tsx")))

export {
    Layout,
    Login
}
