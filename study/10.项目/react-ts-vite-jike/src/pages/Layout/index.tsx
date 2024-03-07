import {Layout, Menu, MenuProps, Popconfirm} from 'antd'
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined,} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {userInfoThunk} from "@/store/module/user/userAsyncActions.ts";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const userInfo = useAppSelector(state => state.user.userInfo)
    const dispatch = useAppDispatch()
    const menuClick: MenuProps['onClick'] = (route) => {
        navigate(route.key)
    }

    const getUserInfo = useCallback(async () => {
        try {
            await dispatch(userInfoThunk())
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo]);


    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{userInfo.name}</span>
                    <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[location.pathname]}
                        items={items}
                        style={{height: '100%', borderRight: 0}}
                        onClick={menuClick}
                    ></Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout
