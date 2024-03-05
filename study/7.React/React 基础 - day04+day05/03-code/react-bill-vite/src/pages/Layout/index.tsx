import {Outlet} from "react-router-dom";
import {Button} from "antd-mobile";
import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {getBillList} from "@/store/module/bill/ billAsyncActions.ts";

const Layout = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch]);

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
