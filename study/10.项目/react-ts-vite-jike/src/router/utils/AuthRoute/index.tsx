import {Navigate} from "react-router-dom";
import React from "react";
import {getToken} from "@/util";

const AuthRoute = (Comp: React.ReactNode): React.ReactNode => {
    const token = getToken()
    console.log(token, 'token')
    if (token) {
        return Comp
    } else {
        return <Navigate to="/login" replace/>
    }
}

export default AuthRoute
