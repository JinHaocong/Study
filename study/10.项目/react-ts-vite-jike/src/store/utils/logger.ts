import {createLogger, LoggerPredicate} from 'redux-logger';


// 日志配置对象
interface LoggerConfig {
    predicate: LoggerPredicate;
    collapsed: boolean;
    duration: boolean;
    timestamp: boolean;
    level: 'log' | 'warn' | 'error' | 'info';
}

// 排除不记录的
const shouldExcludeAction = (actionType: string): boolean => {
    const excludedKeywords = ['persist'];
    return !excludedKeywords.some(keyword => actionType.includes(keyword));
};


// 日志配置对象
const loggerConfig: LoggerConfig = {
    // 记录除特定类型的操作之外的所有内容
    predicate: (_, action) => shouldExcludeAction(action.type),
    // 折叠日志
    collapsed: true,
    // 打印每个动作的持续时间
    duration: true,
    // 打印每个操作的时间戳
    timestamp: true,
    // 日志级别 'log' | 'warn' | 'error' | 'info',
    level: 'info',
};

const logger = createLogger(loggerConfig);

export default logger;
