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
            },
            {
                path: 'month',
                element: lazyLoad(React.lazy(() => import("@/pages/Month"))),
            }
        ]
    },
    {
        path: '/new',
        element: lazyLoad(React.lazy(() => import("@/pages/New")))
    },
    {
        path: '/test',
        element: lazyLoad(React.lazy(() => import("@/pages/Test")))
    }
])

export default router
