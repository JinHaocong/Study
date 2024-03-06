import {AppDispatch} from '@/store';
import {addBill, setBillList} from './billSlice';
import axios from 'axios';
import {BillItem} from "@/store/interface";
import {Toast} from "antd-mobile";

export const getBillList = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get('http://localhost:8888/ka');
            dispatch(setBillList(res.data));
        } catch (error) {
            console.error('Error fetching bill list:', error);
        }
    }
}

export const addBillList = (data: BillItem) => {
    return async (dispatch: AppDispatch) => {
        try {
            Toast.show({
                icon: 'loading',
            })
            const res = await axios.post('http://localhost:8888/ka', data);
            dispatch(addBill(res.data));
            Toast.show({
                icon: 'success',
                content: '保存成功',
            })
        } catch (error) {
            console.error('Error adding bill:', error);
        }
    }
}

