import {Button, DatePicker, Input, NavBar, Toast} from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import {billListData} from '@/contants'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {addBillListAsync} from "@/store/module/bill/ billAsyncActions.ts";
import {useDate} from "@/hooks/useDate.ts";

const New = () => {
    const {selectedDate, visible, onShowDate, onHideDate, onDateChange} = useDate('YYYY-MM-DD');
    const navigate = useNavigate()
    const [billType, setBillType] = useState('pay')
    const [money, setMoney] = useState(0)
    const [useFor, setUseFor] = useState('')

    useEffect(() => {
        setUseFor(billListData[billType][0].list[0].type)
    }, [billType]);

    const dispatch = useAppDispatch()
    const moneyChange = (value: string) => {
        setMoney(Number(value))
    }
    const saveBill = async () => {
        try {
            const data = {
                type: billType,
                money: billType === 'pay' ? -money : +money,
                date: selectedDate,
                useFor: useFor
            }
            Toast.show({
                icon: 'loading',
            })
            await dispatch(addBillListAsync(data))
        } catch (e) {
            Toast.show({
                icon: 'error',
                content: '保存失败',
            })
        } finally {
            Toast.show({
                icon: 'success',
                content: '保存成功',
            })
        }

    }

    const dateConfirm = (date: Date) => {
        onDateChange(date)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames({selected: billType === 'pay'})}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames({selected: billType === 'income'})}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div onClick={() => onShowDate()} className="date">
                            <Icon type="calendar" className="icon"/>
                            <span className="text">{selectedDate}</span>
                            {/*时间选择器*/}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={visible}
                                onConfirm={dateConfirm}
                                onClose={() => onHideDate()}
                                onCancel={() => onHideDate()}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                value={String(money)}
                                onChange={moneyChange}
                                className="input"
                                placeholder="0.00"
                                type="number"
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames('item', {active: useFor === item.type})}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button onClick={saveBill} className="btn save">
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New
