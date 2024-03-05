import {Outlet} from "react-router-dom";
import {Button} from "antd-mobile";

const Layout = () => {
    return (
        <div style={{height: '100%', width: '100%'}}>
            Layout
            {/*全局样式测试*/}
            <Button color={"primary"}>测试</Button>

            {/*局部样式测试*/}
            <div className={'purple'}>
                <Button color={"primary"}>测试</Button>
            </div>
            <Outlet/>
        </div>
    );
};

export default Layout
