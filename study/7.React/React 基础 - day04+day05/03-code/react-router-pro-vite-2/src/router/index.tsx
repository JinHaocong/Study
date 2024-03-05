import Layout from "../pages/Layout";
import Board from "../pages/Board";
import About from "../pages/About";
import Login from "../pages/login";
import Article from "../pages/Article";
import NotFound from "../pages/NotFound";
import {useRoutes} from "react-router-dom";
import {Expenses} from "../pages/Expenses";
import {Invoices} from "../pages/Invoices";

const rootRouter = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                // 设置为默认二级路由 一级路由访问的时候，它也能得到渲染
                index: true,
                element: <Board/>
            },
            {
                path: 'about',
                element: <About/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/expenses',
        element: <Expenses/>
    },
    {
        path: '/invoices',
        element: <Invoices/>
    },
    {
        path: '/article',
        element: <Article/>
    },
    {
        path: '/article/:id/:name',
        element: <Article/>
    },
    {
        // 404
        path: '*',
        element: <NotFound/>
    }
]

const Router = () => {
    return useRoutes(rootRouter);
};

export default Router
