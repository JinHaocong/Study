import {useCallback, useState} from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export const useDate = (format: string) => {
    const [date, setDate] = useState(new Date());
    const [visible, setVisible] = useState(false);

    const onShowDate = useCallback(() => setVisible(true), []);
    const onHideDate = useCallback(() => setVisible(false), []);
    const onDateChange = useCallback((val: Date) => setDate(val), []);

    return {
        dayjsDate: dayjs(date),
        selectedDate: dayjs(date).format(format),
        visible,
        onShowDate,
        onHideDate,
        onDateChange,
    };
};
