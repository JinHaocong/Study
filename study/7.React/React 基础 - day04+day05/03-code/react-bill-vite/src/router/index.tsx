import {createBrowserRouter} from "react-router-dom";

import lazyLoad from "@/router/utils/lazyLoad/lazyLoad.tsx";
import React from "react";


const router = createBrowserRouter([
    {
        path: '/',
        element: lazyLoad(React.lazy(() => import("@/pages/Layout"))),
        children: [
            {
                index: true,
                element: lazyLoad(React.lazy(() => import("@/pages/Month"))),
            },
            {
                path: 'year',
                element: lazyLoad(React.lazy(() => import("@/pages/Year"))),
            }
        ]
    },
    {
        path: '/new',
        element: lazyLoad(React.lazy(() => import("@/pages/New")))
    }
])

export default router
