import {Link} from 'react-router-dom'
import {
    Breadcrumb,
    Button,
    Card,
    DatePicker,
    Form,
    Popconfirm,
    Radio,
    Select,
    Space,
    Table,
    TableProps,
    Tag
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import useChannels from "@/hooks/useChannels.ts";
import {useCallback, useEffect, useState} from "react";
import {deleteArticles, getArticles} from "@/apis/modules/articles.ts";
import {Article, ArticlesParams} from "@/apis/interface";
import Lottie from "@/components/Lottie";
import animation from "@/json/loading1.json";
import './index.scss'
import useMessage from "@/hooks/useMessage.tsx";


const {Option} = Select
const {RangePicker} = DatePicker

interface ArticleState {
    list: Article[],
    count: number
}

const Article = () => {
    const [channels] = useChannels()
    const [searchLoading, setSearchLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const {showError, showSuccess, contextHolder} = useMessage();
    const [article, setArticleList] = useState<ArticleState>({
        list: [],
        count: 0
    })
    const [params, setParams] = useState<ArticlesParams>({
        page: 1,
        per_page: 4,
        begin_pubdate: null,
        end_pubdate: null,
        status: null,
        channel_id: null
    })
    const statusMap = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }

    const apiArticles = useCallback(async () => {
        try {
            setSearchLoading(true)
            setTableLoading(true)
            const res = await getArticles(params)
            const {results, total_count} = res.data
            setArticleList({list: results, count: total_count})
        } catch (e) {
            console.log(e)
        } finally {
            setSearchLoading(false)
            setTableLoading(false)
        }
    }, [params])

    const onFinish = (formValue: any) => {
        const {channel_id, date, status} = formValue
        const reqData = {
            status,
            channel_id,
            begin_pubdate: date ? date[0].format('YYYY-MM-DD') : '',
            end_pubdate: date ? date[1].format('YYYY-MM-DD') : '',
        }

        setParams({
            ...reqData,
            page: 1,
            per_page: 4
        })
    }

    const pageChange = (page: number) => {
        // 拿到当前页参数 修改params 引起接口更新
        setParams({
            ...params,
            page
        })
    }

    const delArticle = async (data: Article) => {
        try {
            await deleteArticles(data.id)
            showSuccess('删除成功')
            await apiArticles()
        } catch (e: any) {
            e.message && showError(e.message)
            console.dir(e, 'formConfirm')
        }

    }

    useEffect(() => {
        apiArticles()
    }, [apiArticles])

    // 准备列数据
    const columns: TableProps<Article>['columns'] = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (status: 1 | 2) => statusMap[status]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => delArticle(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    return (
        <div style={{height: '100%'}}>
            {contextHolder}
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20, height: '30%'}}
            >
                <Form onFinish={onFinish} initialValues={{status: ''}}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            allowClear
                            placeholder="请选择文章频道"
                            style={{width: 120}}
                        >
                            {channels.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker allowClear format='YYYY-MM-DD' locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={searchLoading} type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {

                <Card style={{height: "calc(70% - 20px)"}} title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
                    {
                        tableLoading ?
                            <div className='lazy-load-container'>
                                <Lottie animation={animation}/>
                            </div> :
                            <Table pagination={{
                                current: params.page,
                                pageSize: params.per_page,
                                onChange: pageChange,
                                total: article.count
                            }} rowKey="id" columns={columns} dataSource={article.list}/>
                    }
                </Card>
            }
        </div>
    )
}

export default Article
