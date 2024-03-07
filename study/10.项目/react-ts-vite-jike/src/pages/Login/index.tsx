import './index.scss'
import {Button, Card, Form, Input} from 'antd'
import logo from '@/assets/logo.png'
import {FC, useState} from "react";
import {loginThunk} from "@/store/module/user/userAsyncActions.ts";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {User} from "@/store/interface";


const Login: FC = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const formConfirm = async (formData: Required<User.LoginForm>) => {
        try {
            setLoading(true)
            await dispatch(loginThunk(formData))
        } catch (e) {
            console.log(e, 'formConfirm')
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt=""/>
                {/* 登录表单 */}
                <Form onFinish={formConfirm}>
                    <Form.Item<Partial<User.LoginForm>> name='mobile' validateTrigger="onBlur"
                                                        rules={[
                                                            {required: true, message: '请输入手机号'},
                                                            {
                                                                pattern: /^1[3-9]\d{9}$/,
                                                                message: '请输入正确的手机号'
                                                            }
                                                        ]}>
                        <Input size="large" placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item<Partial<User.LoginForm>> name='code' validateTrigger="onBlur"
                                                        rules={[{required: true, message: '请输入验证码'}]}>
                        <Input size="large" placeholder="请输入验证码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
