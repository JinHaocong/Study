import {createBrowserRouter} from "react-router-dom";


import {lazy} from "react";
import LazyLoad from "./utils/LazyLoad";
import AuthRoute from "@/router/utils/AuthRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: AuthRoute(LazyLoad(lazy(() => import("@/pages/Layout/index.tsx"))))
    },
    {
        path: '/login',
        element: LazyLoad(lazy(() => import("@/pages/Login/index.tsx")))
    }
])

export default router
