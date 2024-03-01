import avatar from './images/bozai.png'
import './App.scss'
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import _ from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

interface User {
    uid: string
    avatar: string
    uname: string
}

interface Item {
    id: string
    user: User
    content: string
    ctime: string
    like: number
}

type UseGetList = [Item[], Dispatch<SetStateAction<Item[]>>]

// 封装请求数据的Hook
const useGetList = (): UseGetList => {
    // 获取接口数据渲染
    const [commentList, setCommentList] = useState<Item[]>([])

    // 请求数据
    const getList = async () => {
        // axios请求数据
        const res = await axios.get(' http://localhost:3004/list')
        setCommentList(res.data)
    }

    useEffect(() => {
        getList()
    }, []);

    return [
        commentList,
        setCommentList
    ]
}

// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}

// 导航 Tab 数组
const tabs = [
    {type: 'hot', text: '最热'},
    {type: 'time', text: '最新'},
]

const App = () => {
    // 数据渲染
    // const [commentList, setCommentList] = useState(_.orderBy(list, 'like', 'desc'))

    // 获取接口数据渲染
    const [commentList, setCommentList] = useGetList()

    // tab切换功能
    // 1. 点击谁就把谁的type记录下来
    // 2. 通过记录的type和每一项遍历时的type做匹配 控制激活类名的显示
    const [type, setType] = useState('hot')
    const handleTabChange = (type: string) => {
        setType(type)
        // 基于列表的排序
        if (type === 'hot') {
            // 根据点赞数量排序
            // lodash
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        } else {
            // 根据创建时间排序
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }

    // 删除功能
    const handleDel = (id: string) => {
        // 对commentList做过滤处理
        setCommentList(commentList.filter(item => item.id !== id))
    }

    // 发布评论功能
    const [content, setContent] = useState('')
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handlePublish = () => {
        setCommentList([
            ...commentList,
            {
                id: uuidV4(),
                user,
                content,
                ctime: dayjs(new Date()).format('MM-DD hh:mm'),
                like: Math.floor(Math.random() * 101),
            },
        ])
        setContent('')
        inputRef.current?.focus()

    }


    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{10}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map(item =>
                            <span
                                key={item.type}
                                onClick={() => handleTabChange(item.type)}
                                className={classNames('nav-item', {active: type === item.type})}>
                {item.text}
              </span>)}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            ref={inputRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                        />
                        {/* 发布按钮 */}
                        <div onClick={() => handlePublish()} className="reply-box-send">
                            <div className="send-text">发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => (
                        <div key={item.id} className="reply-item">
                            {/* 头像 */}
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        alt=''
                                        src={item.user.avatar}
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">
                                {/* 用户名 */}
                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>
                                {/* 评论内容 */}
                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">
                                        {/* 评论时间 */}
                                        <span className="reply-time">{item.ctime}</span>
                                        {/* 评论数量 */}
                                        <span className="reply-time">点赞数:{item.like}</span>
                                        {user.uid === item.user.uid && <span onClick={() => handleDel(item.id)}
                                                                             className="delete-btn">删除</span>}


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default App
