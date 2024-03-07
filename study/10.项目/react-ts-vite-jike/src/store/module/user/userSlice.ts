import {createSlice} from '@reduxjs/toolkit';
import {LoginInfo} from "@/store/interface";
import {loginThunk, userInfoThunk} from "@/store/module/user/userAsyncActions.ts";

const initialState: LoginInfo = {
    token: '',
    userInfo: {
        birthday: '',
        gender: 1,
        id: '',
        mobile: '',
        name: '',
        photo: ''
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        setUserToken(state, action) {
            state.token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.rejected, (_, action) => {
                throw new Error(action.error.message)
            })
            .addCase(userInfoThunk.rejected, (_, action) => {
                throw new Error(action.error.message)
            })
    }
});

export const {setUserInfo, setUserToken} = userSlice.actions;
export default userSlice.reducer;
