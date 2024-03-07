import {createSlice} from '@reduxjs/toolkit';
import {LoginInfo} from "@/store/interface";
import {loginThunk} from "@/store/module/user/userAsyncActions.ts";

const initialState: LoginInfo = {
    token: '',
    userInfo: {}
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
        builder.addCase(loginThunk.rejected, (_, action) => {
            throw new Error(action.error.message)
        })
    }
});

export const {setUserInfo, setUserToken} = userSlice.actions;
export default userSlice.reducer;
