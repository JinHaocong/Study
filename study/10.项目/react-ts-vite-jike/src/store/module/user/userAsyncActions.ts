import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUserInfo} from "@/store/module/user/userSlice.ts";
import {User} from "@/store/interface";
import {login} from "@/apis/modules/login.ts";


export const loginThunk = createAsyncThunk('user/login',
    async (loginForm: Required<User.LoginForm>, {dispatch}) => {
        try {
            const res = await login(loginForm)
            console.log(res.data);
            dispatch(setUserInfo(loginForm))
        } catch (err) {
            console.log('apiLogin:', err)
            throw err
        }

    }
)
