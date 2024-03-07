import {createSlice} from '@reduxjs/toolkit';
import {User} from "@/store/interface";

const initialState: User.LoginInfo = {
    token: '',
    userInfo: {}
}


const userSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        setUserToken(state, action) {
            state.token = action.payload
        }
    }
});

export const {setUserInfo, setUserToken} = userSlice.actions;
export default userSlice.reducer;
