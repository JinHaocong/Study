import {useState} from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday)

export const useDate = (format: string) => {
    const [date, setDate] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const dayjsDate = dayjs(date)
    const selectedDate = dayjsDate.format(format)

    const onShowDate = () => setVisible(true)
    const onHideDate = () => setVisible(false)
    const onDateChange = (val: Date) => setDate(val)

    return {
        dayjsDate,
        selectedDate,
        visible,
        onShowDate,
        onHideDate,
        onDateChange,
    }
}
