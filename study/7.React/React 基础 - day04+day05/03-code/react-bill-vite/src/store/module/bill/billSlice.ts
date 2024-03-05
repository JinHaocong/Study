import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BillItem, BillState} from '@/store/interface';

const initialState: BillState = {
    billList: []
}


const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        addBill(state, action: PayloadAction<BillItem>) {
            state.billList.push(action.payload)
        }
    }
});

export const {setBillList, addBill} = billSlice.actions;
export default billSlice.reducer;
