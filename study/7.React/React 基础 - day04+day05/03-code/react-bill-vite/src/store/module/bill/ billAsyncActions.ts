import {AppDispatch} from '@/store';
import {addBill, setBillList} from './billSlice';
import axios from 'axios';
import {BillItem} from "@/store/interface";
import {Toast} from "antd-mobile";
import {createAsyncThunk} from "@reduxjs/toolkit";

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

export const getBillListAsync = createAsyncThunk(
    'bill/getBillList',
    async (_, {dispatch}) => {
        try {
            const res = await axios.get('http://localhost:8888/ka');
            dispatch(setBillList(res.data));
            return;
        } catch (error) {
            // 处理错误
            console.error('Error getting billList:', error);
            throw error;
        }
    }
)

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

// 创建异步 thunk
export const addBillListAsync = createAsyncThunk(
    'bill/addBillList',
    async (data: BillItem, {dispatch}) => {
        try {
            // 发送请求
            const res = await axios.post('http://localhost:8888/ka', data);
            // 返回数据
            dispatch(addBill(res.data));
            return;
        } catch (error) {
            // 处理错误
            console.error('Error adding bill:', error);
            throw error;
        }
    }
);

