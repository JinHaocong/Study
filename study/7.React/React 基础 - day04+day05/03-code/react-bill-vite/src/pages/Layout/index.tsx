import {TabBar} from "antd-mobile"
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import './index.scss'
import {AddCircleOutline, BillOutline, CalculatorOutline} from 'antd-mobile-icons'
import {useBillList} from "@/hooks/useBillList.ts";

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
    const navigate = useNavigate()
    const location = useLocation()
    useBillList()
    
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
                <TabBar activeKey={location.pathname} onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout
