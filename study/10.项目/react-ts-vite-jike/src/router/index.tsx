import {createBrowserRouter} from "react-router-dom";
import AuthRoute from "@/router/utils/AuthRoute";
import {Article, Home, Layout, Login, Publish} from "@/router/LazyLoadWrapper.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute>{Layout}</AuthRoute>,
        children: [
            {
                index: true,
                element: Home,
            },
            {
                path: 'article',
                element: Article,
            },
            {
                path: 'publish',
                element: Publish,
            },
        ]
    },
    {
        path: '/login',
        element: Login
    }
])

export default router
