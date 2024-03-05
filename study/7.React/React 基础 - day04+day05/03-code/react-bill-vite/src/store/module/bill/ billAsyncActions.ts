import {AppDispatch} from '@/store';
import {setBillList, addBill} from './billSlice';
import axios from 'axios';
import {BillItem} from "@/store/interface";

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
            const res = await axios.post('http://localhost:8888/ka', data);
            dispatch(addBill(res.data));
        } catch (error) {
            console.error('Error adding bill:', error);
        }
    }
}

