import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Radio,
    RadioChangeEvent,
    Select,
    Space,
    Upload,
    UploadFile,
    UploadProps
} from 'antd'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor, Events} from 'tinymce';
import {EventHandler} from "@tinymce/tinymce-react/lib/es2015/main/ts/Events";
import {Channel, type Publish} from "@/apis/interface";
import {getArticlesById, getChannels, publish, updateArticle} from "@/apis/modules/articles.ts";
import animation from "@/json/loading1.json";
import Lottie from "@/components/Lottie";
import useMessage from "@/hooks/useMessage.tsx";
import {useForm} from "antd/es/form/Form";
import {PlusOutlined} from '@ant-design/icons'

const {Option} = Select

type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

const Publish: FC = () => {
    const [form] = useForm()
    const editorRef = useRef<TinyMCEEditor>();
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const {showError, showSuccess, contextHolder} = useMessage();
    const [imageList, setImageList] = useState<UploadFile[]>([])
    const [imageType, setImageType] = useState(1)
    const cacheImageList = useRef<UploadFile[]>([])
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id') || ''


    const onUploadChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'error') showError(info.file.response.message)
        setImageList(info.fileList)
        cacheImageList.current = info.fileList
        form.validateFields(['cover'])
    }

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
        if (!isPNG) showError(`${file.name} 不是png或jpeg格式的文件`)
        return isPNG || Upload.LIST_IGNORE;
    }

    const onInit: EEventHandler<'init'> = (_, editor) => {
        editorRef.current = editor
    }

    const onTypeChange = (e: RadioChangeEvent) => {

        const type = e.target.value
        setImageType(type)
        if (type === 1) {
            // 单图，截取第一张展示
            const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
            setImageList(imgList)
        } else if (type === 3) {
            // 三图，取所有图片展示
            setImageList(cacheImageList.current)
        }
    }

    const formatUrl = (list: UploadFile[]) => {
        return list.map(item => {
            if (item.response) {
                return item.response.data.url
            } else {
                return item.url
            }
        })
    }

    const formConfirm = async (formValue: Publish) => {
        try {
            const {channel_id, title} = formValue
            const params = {
                channel_id,
                content: editorRef?.current?.getContent() || '',
                title,
                cover: {
                    type: imageType,
                    images: formatUrl(imageList)
                }
            }
            setConfirmLoading(true)
            articleId ? await updateArticle(params, articleId) : await publish(params)
            showSuccess(`${articleId ? '编辑' : '发布'}文章成功`)
            form.resetFields()
            setImageList([])
        } catch (e: any) {
            e.message && showError(e.message)
            console.dir(e, 'formConfirm')
        } finally {
            setConfirmLoading(false)
        }
    }

    const apiChannels = useCallback(async () => {
        const {data: {channels}} = await getChannels()
        setChannels(channels)
    }, [])

    const getArticle = useCallback(async () => {
        const res = await getArticlesById(articleId)
        const {cover, ...formValue} = res.data
        form.setFieldsValue({...formValue, type: cover.type})
        setImageType(cover.type)
        setImageList(cover.images.map((url, index) => ({url, name: formValue.title + index, uid: articleId + index})))
    }, [articleId, form])


    const init = useCallback(async () => {
        try {
            setLoading(true)
            await apiChannels()
            if (articleId) await getArticle()
        } catch (e) {
            console.log(e, 'e')
        } finally {
            setLoading(false)
        }
    }, [apiChannels, articleId, getArticle])

    useEffect(() => {
        init()
    }, [init])


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
                                {title: `${articleId ? '编辑文章' : '发布文章'}`},
                            ]}
                            />
                        }
                    >
                        <Form
                            form={form}
                            onFinish={formConfirm}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            initialValues={{type: imageType}}
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
                            <Form.Item<Partial<Publish>> name="cover" label="封面" rules={[
                                {
                                    validator: async () => {
                                        if (imageType !== imageList.length) return Promise.reject(new Error('请上传图片'));
                                        if (imageList.find(item => item.status === 'error')) return Promise.reject(new Error('图片不符合要求'));
                                    }
                                }
                            ]}>
                                <div>
                                    <Form.Item name="type">
                                        <Radio.Group onChange={onTypeChange}>
                                            <Radio value={0}>无图</Radio>
                                            <Radio value={1}>单图</Radio>
                                            <Radio value={3}>三图</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    {imageType > 0 &&
                                        <Upload
                                            fileList={imageList}
                                            beforeUpload={beforeUpload}
                                            name="image"
                                            listType="picture-card"
                                            showUploadList
                                            action={'http://geek.itheima.net/v1_0/upload'}
                                            onChange={onUploadChange}
                                            maxCount={imageType}
                                            multiple={imageType > 1}
                                        >
                                            <div style={{marginTop: 8}}>
                                                <PlusOutlined/>
                                            </div>
                                        </Upload>}
                                </div>
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
