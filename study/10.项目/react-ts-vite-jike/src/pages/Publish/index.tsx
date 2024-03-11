import {Breadcrumb, Button, Card, Form, Input, Select, Space} from 'antd'
import {Link} from 'react-router-dom'
import './index.scss'
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor, Events} from 'tinymce';
import {EventHandler} from "@tinymce/tinymce-react/lib/es2015/main/ts/Events";
import {Channel} from "@/apis/interface";
import {getChannels} from "@/apis/modules/articles.ts";
import animation from "@/json/loading1.json";
import Lottie from "@/components/Lottie";

const {Option} = Select

type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

const Publish: FC = () => {
    const editorRef = useRef<TinyMCEEditor>();
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

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

    useEffect(() => {
        apiChannels()
    }, [apiChannels])


    return (
        <div className="publish">
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
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            initialValues={{type: 1}}
                        >
                            <Form.Item
                                label="标题"
                                name="title"
                                rules={[{required: true, message: '请输入文章标题'}]}
                            >
                                <Input placeholder="请输入文章标题" style={{width: 400}}/>
                            </Form.Item>
                            <Form.Item
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
                            <Form.Item
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
                                    <Button onClick={log} size="large" type="primary" htmlType="submit">
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
