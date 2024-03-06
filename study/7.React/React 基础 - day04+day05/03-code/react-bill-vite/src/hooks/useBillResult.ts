import dayjs from 'dayjs';
import {BillItem} from "@/store/interface";
import {useMemo} from "react";


const getDatResult = (billList: BillItem[]) => {
    const pay = billList.filter((item) => item.type === 'pay').reduce((a, c) => a + c.money, 0);
    const income = billList.filter((item) => item.type === 'income').reduce((a, c) => a + c.money, 0);
    return {
        pay,
        income,
        total: pay + income,
    };
};

export const useYearResult = (billList: BillItem[]) => {
    return useMemo(() => {
        return getDatResult(billList)
    }, [billList]);
};

export const useMonthResult = (data: BillItem[], maxMonth: number) => {
    return useMemo(() => {
        return Array.from({length: maxMonth}, (_, monthIndex) => {
            const monthData = data.filter(item => monthIndex === dayjs(item.date).get('month'));
            return getDatResult(monthData);
        });
    }, [data, maxMonth])
};


