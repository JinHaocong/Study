import {Breadcrumb, Button, Card, Form, Input, Select, Space} from 'antd'
import {Link} from 'react-router-dom'
import './index.scss'
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor, Events} from 'tinymce';
import {EventHandler} from "@tinymce/tinymce-react/lib/es2015/main/ts/Events";
import {Channel, Publish} from "@/apis/interface";
import {getChannels, publish} from "@/apis/modules/articles.ts";
import animation from "@/json/loading1.json";
import Lottie from "@/components/Lottie";
import useMessage from "@/hooks/useMessage.tsx";

const {Option} = Select

type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

const Publish: FC = () => {
    const editorRef = useRef<TinyMCEEditor>();
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const {showError, showSuccess, contextHolder} = useMessage();

    const onInit: EEventHandler<'init'> = (_, editor) => {
        editorRef.current = editor
    }

    const apiChannels = useCallback(async () => {
        try {
            setLoading(true)
            const {data: {channels}} = await getChannels()
            setChannels(channels)
        } catch (e) {
            console.log(e, 'apiChannels')
        } finally {
            setLoading(false)
        }
    }, [])

    // 发布文章
    const formConfirm = async (formValue: Publish) => {
        try {
            const {channel_id, title} = formValue
            const params = {
                channel_id,
                content: editorRef?.current?.getContent() || '',
                title,
                type: 1,
                cover: {
                    type: 1,
                    images: []
                }
            }
            setConfirmLoading(true)
            await publish(params)
            showSuccess('发布成功')
        } catch (e: any) {
            e.message && showError(e.message)
            console.dir(e, 'formConfirm')
        } finally {
            setConfirmLoading(false)
        }
    }

    useEffect(() => {
        apiChannels()
    }, [apiChannels])


    return (
        <div className="publish">
            {contextHolder}
            {
                (loading) ?
                    <div className='lazy-load-container'>
                        <Lottie animation={animation}/>
                    </div> :
                    <Card
                        title={
                            <Breadcrumb items={[
                                {title: <Link to={'/'}>首页</Link>},
                                {title: '发布文章'},
                            ]}
                            />
                        }
                    >
                        <Form
                            onFinish={formConfirm}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            initialValues={{type: 1}}
                        >
                            <Form.Item<Partial<Publish>>
                                label="标题"
                                name="title"
                                rules={[{required: true, message: '请输入文章标题'}]}
                            >
                                <Input placeholder="请输入文章标题" style={{width: 400}}/>
                            </Form.Item>
                            <Form.Item<Partial<Publish>>
                                label="频道"
                                name="channel_id"
                                rules={[{required: true, message: '请选择文章频道'}]}
                            >
                                <Select placeholder="请选择文章频道" style={{width: 400}}>
                                    {channels.map(item => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item<Partial<Publish>>
                                label="内容"
                                name="content"
                                rules={[{required: true, message: '请输入文章内容'}]}
                            >
                                <Editor
                                    onInit={onInit}
                                    scriptLoading={{async: true}}
                                    apiKey='1nrkfrqvghmtvxgwld1a6kmjaym696j13ysvba9tkn9btcv9'
                                    initialValue="Welcome to TinyMCE!"
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 4}}>
                                <Space>
                                    <Button loading={confirmLoading} size="large" type="primary" htmlType="submit">
                                        发布文章
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
            }
        </div>
    )
}

export default Publish
