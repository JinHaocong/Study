import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {getChannels} from "@/apis/modules/articles.ts";
import {Channel} from "@/apis/interface";

const useChannels = (): [Channel[], Dispatch<SetStateAction<Channel[]>>] => {
    const [channels, setChannels] = useState<Channel[]>([])
    const apiChannels = useCallback(async () => {
        try {
            const {data: {channels}} = await getChannels()
            setChannels(channels)
        } catch (e) {
            console.log(e, 'apiChannels')
        }
    }, [])

    useEffect(() => {
        apiChannels()
    }, [apiChannels])

    return [
        channels,
        setChannels
    ]
}

export default useChannels
