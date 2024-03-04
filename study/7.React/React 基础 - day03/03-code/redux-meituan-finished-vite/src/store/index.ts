import foodsReducer from './modules/takeaway'
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        foods: foodsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
