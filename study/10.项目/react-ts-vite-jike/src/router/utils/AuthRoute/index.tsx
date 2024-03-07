import {Navigate} from "react-router-dom";
import React from "react";
import useToken from "@/hooks/useToken.ts";

const AuthRoute = (props: { children: React.ReactNode }): React.ReactNode => {
    const {token} = useToken()
    if (token) {
        return props.children
    } else {
        return <Navigate to="/login" replace/>
    }
}

export default AuthRoute
