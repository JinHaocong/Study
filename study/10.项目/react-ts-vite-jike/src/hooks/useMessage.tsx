import {message} from 'antd';
import {ReactNode, useCallback} from 'react';

import {CloseOutlined} from '@ant-design/icons'

const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = useCallback(
        (type: 'success' | 'error' | 'info' | 'warning' | 'loading', content: ReactNode, duration: number = 3, onClose?: () => void) => {
            messageApi[type]({
                content: <span>
                    <span style={{marginRight: '10px'}}>{content}</span>
                    <CloseOutlined className={'CloseOutlined'} style={{cursor: "pointer"}}
                                   onClick={() => messageApi.destroy()}/>
                </span>,
                duration,
                onClose,
            });
        },
        [messageApi]
    );

    return {
        messageApi,
        contextHolder,
        showSuccess: useCallback((content: ReactNode, duration?: number, onClose?: () => void) => showMessage('success', content, duration, onClose), [
            showMessage,
        ]),
        showError: useCallback((content: ReactNode, duration?: number, onClose?: () => void) => showMessage('error', content, duration, onClose), [
            showMessage,
        ]),
        showInfo: useCallback((content: ReactNode, duration?: number, onClose?: () => void) => showMessage('info', content, duration, onClose), [showMessage]),
        showWarning: useCallback((content: ReactNode, duration?: number, onClose?: () => void) => showMessage('warning', content, duration, onClose), [
            showMessage,
        ]),
        showLoading: useCallback((content: ReactNode, duration?: number, onClose?: () => void) => showMessage('loading', content, duration, onClose), [showMessage])
    };
};

export default useMessage;
