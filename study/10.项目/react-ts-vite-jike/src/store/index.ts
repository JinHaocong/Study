import {configureStore} from '@reduxjs/toolkit'
import userSlice from "@/store/module/user/userSlice.ts";

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
