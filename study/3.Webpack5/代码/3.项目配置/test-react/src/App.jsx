import React, {lazy, Suspense} from "react";
import {Link, Route, Routes} from 'react-router-dom';
import {Button, ConfigProvider, Space} from "antd";
// import Home from './pages/Home'
// import About from './pages/About'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: 'about' */ "./pages/About"));

function App() {
    return (
        <div>
            <h1> App </h1>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        colorPrimary: '#7e59ec',
                        borderRadius: 2,

                        // 派生变量，影响范围小
                        colorBgContainer: '#56daf8',
                    },
                }}
            >
                <Space>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                </Space>
            </ConfigProvider>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>

            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </Suspense>

        </div>
    )
}

export default App
