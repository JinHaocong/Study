import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit'
import userSlice from "@/store/module/user/userSlice.ts";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const rootReducer = combineReducers({
    user: userSlice
})

// 持久化配置
const persistConfig = {
    key: "root",
    storage,
    // 白名单
    whitelist: ['user']
};

const middlewares: Middleware[] = []
if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // 关闭序列化检查
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }).concat(middlewares)
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
