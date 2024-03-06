import {TabBar} from "antd-mobile"
import {useCallback, useEffect} from "react"
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import './index.scss'
import {AddCircleOutline, BillOutline, CalculatorOutline} from 'antd-mobile-icons'
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {getBillListAsync} from "@/store/module/bill/ billAsyncActions.ts";

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
    const location = useLocation()


    const apiBillList = useCallback(async () => {
        try {
            await dispatch(getBillListAsync());
            // 这里可以添加获取数据成功后的其他逻辑
        } catch (error) {
            // 处理错误，比如显示错误提示
            console.error('Fetching bill list failed:', error);
        }
    }, [dispatch])


    useEffect(() => {
        apiBillList()
    }, [apiBillList])

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
