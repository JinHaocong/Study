import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUserInfo, setUserToken} from "@/store/module/user/userSlice.ts";
import {LoginForm} from "@/store/interface";
import {getProfile, login} from "@/apis/modules/user.ts";


export const loginThunk = createAsyncThunk('user/login',
    async (loginForm: Required<LoginForm>, {dispatch}) => {
        const res = await login(loginForm)
        dispatch(setUserToken(res.data.token))
        return
    }
)

export const userInfoThunk = createAsyncThunk('user/userInfo',
    async (_, {dispatch}) => {
        const res = await getProfile()
        dispatch(setUserInfo(res.data))
        return
    }
)
