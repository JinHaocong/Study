import {DatePicker, NavBar} from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import {useDate} from '@/hooks/useDate.ts'
import {useYearBillList} from '@/hooks/useBillList'
import TwoLineOverview from '@/components/TwoLineOverview'
import {useMonthResult, useYearResult} from "@/hooks/useBillResult.ts";
import OneLineOverview from "@/components/OneLineOverview";

const Year = () => {

    const {date, visible, onDateChange, onShowDate, onHideDate} = useDate()

    const selectedYear = date.get('year')
    const selectedYearBills = useYearBillList(selectedYear)


    const overview = useYearResult(selectedYearBills)
    const thisYear = dayjs().get('year')
    const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12

    const monthBillList = useMonthResult(selectedYearBills, maxMonth)


    return (
        <div className="billDetail">
            <NavBar className="nav" backArrow={false}>
                <div className="nav-title" onClick={onShowDate}>
                    {selectedYear}年
                    <span className={classNames('arrow', visible && 'expand')}></span>
                </div>
            </NavBar>
            <DatePicker
                className="kaDate"
                title="记账日期"
                precision="year"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
            />

            <div className="content">
                <div className='overview'>
                    <TwoLineOverview
                        pay={overview.pay}
                        income={overview.income}
                        className="overview"
                    />
                </div>
                {monthBillList.map((item, index) => {
                    return (
                        <div
                            className="monthBill"
                            key={index}
                        >
                            <div className="date">{maxMonth - index}月</div>
                            <OneLineOverview pay={item.pay} income={item.income}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Year
