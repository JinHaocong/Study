import {createBrowserRouter} from "react-router-dom";


import {lazy} from "react";
import lazyLoad from "./utils/lazyLoad/lazyLoad.tsx";
import AuthRoute from "@/router/utils/AuthRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: AuthRoute(lazyLoad(lazy(() => import("@/pages/Layout/index.tsx"))))
    },
    {
        path: '/login',
        element: lazyLoad(lazy(() => import("@/pages/Login/index.tsx")))
    }
])

export default router
