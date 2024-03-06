import classNames from 'classnames'
import './index.scss'
import {FC, useState} from "react";
import {BillItem} from "@/store/interface";
import useDayResult from "@/hooks/useDayResult.ts";
import {billTypeToName} from "@/contants";
import Icon from "@/components/Icon";

interface Props {
    date: string
    billList: BillItem[]
}

const DailyBill: FC<Props> = ({date, billList}) => {

    const dayResult = useDayResult(billList)
    const [visible, setVisible] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', {expand: visible})}
                          onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2) || '无'}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2) || '无'}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2) || '无'}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{display: !visible ? 'none' : undefined}}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <Icon type={item.useFor}/>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill
