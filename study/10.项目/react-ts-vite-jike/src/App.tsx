import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ConfigProvider} from "antd";

function App() {


    return (
        <>
            <ConfigProvider theme={{
                token: {
                    // Seed Token，影响范围大
                    colorPrimary: '#69AE78FF',
                    borderRadius: 4,

                    // 派生变量，影响范围小
                    colorBgContainer: '#f6ffed',
                },
            }}>
                <RouterProvider router={router}></RouterProvider>
            </ConfigProvider>
        </>
    )
}

export default App
