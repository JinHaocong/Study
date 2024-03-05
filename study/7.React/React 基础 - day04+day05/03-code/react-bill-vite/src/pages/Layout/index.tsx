import {TabBar} from "antd-mobile"
import {useEffect} from "react"
import {Outlet, useNavigate} from "react-router-dom"
import './index.scss'
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import {getBillList} from "@/store/module/bill/ billAsyncActions.ts";
import {useAppDispatch} from "@/hooks/storeHooks.ts";

const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline/>,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline/>,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline/>,
    },
]

const Layout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    // tabBar 路由跳转
    const switchRoute = (path: string) => {
        navigate(path)
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet/>
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout
