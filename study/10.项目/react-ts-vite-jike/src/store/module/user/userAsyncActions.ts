import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUserToken} from "@/store/module/user/userSlice.ts";
import {LoginForm} from "@/store/interface";
import {login} from "@/apis/modules/login.ts";


export const loginThunk = createAsyncThunk('user/login',
    async (loginForm: Required<LoginForm>, {dispatch}) => {
        const res = await login(loginForm)
        dispatch(setUserToken(res.data.token))
        return
    }
)
