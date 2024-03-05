import Router from "./router";
import {Link, Outlet} from "react-router-dom";

function App() {


    return (
        <>
            我是App
            {/*方法一情况下App需要引入通过useRoutes创建的路由*/}
            <Router></Router>

            <h1>Bookkeeper</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                {/*路由跳转*/}
                <Link to="/expenses">Invoices</Link> |{" "}
                <Link to="/invoices">Expenses</Link>
            </nav>

            {/*路由出口*/}
            <Outlet></Outlet>
        </>
    )
}

export default App
