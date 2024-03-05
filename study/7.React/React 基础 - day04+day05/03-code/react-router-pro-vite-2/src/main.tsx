import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Expenses} from "./pages/Expenses";
import {Invoices} from "./pages/Invoices";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            {/*sign 下面方法二选一*/}

            {/*方法一*/}
            <App></App>
            <hr/>

            {/*方法二*/}
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="expenses" element={<Expenses/>}/>
                    <Route path="invoices" element={<Invoices/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
