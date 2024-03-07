import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {useCallback} from "react";
import {setUserToken} from "@/store/module/user/userSlice.ts";

const useToken = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)

    const setToken = useCallback((token: string) => {
        dispatch(setUserToken(token))
    }, [dispatch])

    const clearToken = useCallback(() => {
        setToken('')
    }, [setToken])

    return {
        token,
        setToken,
        clearToken
    }
}

export default useToken
