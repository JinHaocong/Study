import {Link} from 'react-router-dom'
import {Breadcrumb, Button, Card, DatePicker, Form, Radio, Select, Space, Table, TableProps, Tag} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import useChannels from "@/hooks/useChannels.ts";
import {useCallback, useEffect, useState} from "react";
import {getArticles} from "@/apis/modules/articles.ts";
import {Article, ArticlesParams} from "@/apis/interface";


const {Option} = Select
const {RangePicker} = DatePicker

interface ArticleState {
    list: Article[],
    count: number
}

const Article = () => {
    const [channels] = useChannels()
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
            const res = await getArticles(params)
            const {results, total_count} = res.data
            setArticleList({list: results, count: total_count})
        } catch (e) {
            console.log(e)
        }
    }, [params])

    useEffect(() => {
        apiArticles()
    }, [apiArticles, params])

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
            render: () => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Space>
                )
            }
        }
    ]
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20}}
            >
                <Form initialValues={{status: '', channel_id: '推荐'}}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
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
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={article.list}/>
            </Card>
        </div>
    )
}

export default Article
