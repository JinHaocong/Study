import {useMemo} from 'react';
import {BillItem} from "@/store/interface";

// 支出 / 收入 / 结余
const useDayResult = (billList: BillItem[]) => {
    return useMemo(() => {
        const pay = billList.filter((item) => item.type === 'pay').reduce((a, c) => a + c.money, 0);
        const income = billList.filter((item) => item.type === 'income').reduce((a, c) => a + c.money, 0);
        return {
            pay,
            income,
            total: pay + income,
        };
    }, [billList]);
};

export default useDayResult;
