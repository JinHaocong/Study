import {createBrowserRouter} from "react-router-dom";


import {lazy} from "react";
import lazyLoad from "./utils/lazyLoad/lazyLoad.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: lazyLoad(lazy(() => import("@/pages/Layout/index.tsx")))
    },
    {
        path: '/login',
        element: lazyLoad(lazy(() => import("@/pages/Login/index.tsx")))
    }
])

export default router
