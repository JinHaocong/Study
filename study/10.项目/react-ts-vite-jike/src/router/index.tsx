import {createBrowserRouter} from "react-router-dom";
import AuthRoute from "@/router/utils/AuthRoute";
import {Layout, Login} from "@/router/LazyLoadWrapper.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute>{Layout}</AuthRoute>
    },
    {
        path: '/login',
        element: Login
    }
])

export default router
