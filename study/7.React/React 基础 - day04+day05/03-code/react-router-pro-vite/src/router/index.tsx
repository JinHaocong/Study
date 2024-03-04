import {createBrowserRouter} from "react-router-dom";
import Login from "../page/login";
import Article from "../page/Article";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/article',
        element: <Article/>
    },
    {
        path: '/article/:id/:name',
        element: <Article/>
    }
])

export default router
