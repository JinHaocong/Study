import {configureStore} from '@reduxjs/toolkit'
import billSlice from '@/store/module/bill/billSlice'

const store = configureStore({
    reducer: {
        bill: billSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
