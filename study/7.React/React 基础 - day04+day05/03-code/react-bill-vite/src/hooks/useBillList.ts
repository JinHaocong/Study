import {useCallback, useEffect, useMemo} from 'react'
import dayjs from 'dayjs'

import {getBillListAsync} from '@/store/module/bill/ billAsyncActions.ts'
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";

const useBillList = () => {
    const dispatch = useAppDispatch();
    const billList = useAppSelector(state => state.bill.billList);

    const apiGetBillList = useCallback(async () => {
        await dispatch(getBillListAsync());
    }, [dispatch]);

    useEffect(() => {
        apiGetBillList();
    }, [apiGetBillList]);


    return billList;
};

export const useYearBillList = (selectedYear: string) => {
    const billList = useBillList();

    return useMemo(() => {
        return billList.filter(item => selectedYear === dayjs(item.date).get('year').toString())
    }, [billList, selectedYear]);
}
