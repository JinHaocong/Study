import {useCallback, useEffect} from "react";
import {getProfile} from "@/apis/modules/user.ts";

const Layout = () => {
    const getInfo = useCallback(async () => {
        const res = await getProfile()
        console.log(res)
    }, [])

    useEffect(() => {
        getInfo()
    }, [getInfo]);

    return (
        <div>
            Layout
        </div>
    );
};

export default Layout
