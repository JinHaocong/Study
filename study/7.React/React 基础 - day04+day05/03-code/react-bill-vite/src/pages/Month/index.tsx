import {DatePicker, NavBar} from 'antd-mobile'
import './index.scss'
import {useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs"
import {useAppSelector} from "@/hooks/storeHooks.ts";
import _ from 'lodash'
import {BillItem} from "@/store/interface";
import DayBill from "@/pages/Month/components/DayBill";
import {useYearResult} from "@/hooks/useBillResult.ts";

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(() => {
        return dayjs().format('YYYY-MM')
    })
    const [currentMonthList, setMonthList] = useState<BillItem[]>([])
    const billList = useAppSelector(state => state.bill.billList)

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    const dayGroup = useMemo(() => {
        return _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
    }, [currentMonthList])


    // 时间选择框确实事件 useCallback 防止冲渲染时更新引用
    const dateConfirm = useCallback((date: Date) => {
        const formattedDate = dayjs(date).format('YYYY-MM')
        setDateVisible(false)
        setCurrentMonth(formattedDate)
        setMonthList(monthGroup[formattedDate] || [])
    }, [setDateVisible, setCurrentMonth, setMonthList, monthGroup]);

    // 计算统计
    const yearResult = useYearResult(currentMonthList)

    // 首次加载
    useEffect(() => {
        dateConfirm(new Date())
    }, [dateConfirm, monthGroup])

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentMonth}月账单
            </span>
                        <span className={classNames('arrow', {expand: dateVisible})}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{yearResult.pay.toFixed(2) || '无'}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.income.toFixed(2) || '无'}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.total.toFixed(2) || '无'}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onConfirm={dateConfirm}
                        onClose={() => setDateVisible(false)}
                        onCancel={() => setDateVisible(false)}
                    />
                </div>
                {/*单日列表统计*/}
                {
                    Object.keys(dayGroup).map(key => {
                        return (
                            <DayBill key={key} date={key} billList={dayGroup[key]}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Month
