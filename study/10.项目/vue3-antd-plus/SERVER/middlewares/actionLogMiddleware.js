const chalk = require('chalk');
const UAParser = require("ua-parser-js");
const {UsersOptLogModel} = require('@models/v1');
const isDev = process.env.NODE_ENV === 'development';
const axios = require('axios');
const os = require('os');

function getLocalIPv4Address() {
    const networkInterfaces = os.networkInterfaces();
    let ipv4Address = '127.0.0.1';

    Object.keys(networkInterfaces).some((interfaceName) => {
        const interfaceInfo = networkInterfaces[interfaceName];
        const info = interfaceInfo.find((info) => info.family === 'IPv4' && !info.internal);

        if (info) {
            ipv4Address = info.address;
            return true; // break the loop
        }

        return false;
    });

    return ipv4Address;
}

async function parseIP(clientIp) {
    try {
        const response = await axios.get(`https://restapi.amap.com/v3/ip?ip=[${clientIp}]&output=json&key=${process.env.API_MAP_KEY}`);
        const {status, province, city} = response.data;

        if (status === '1') {
            const resolvedProvince = province.length ? province : '';
            const resolvedCity = city.length ? city : '';
            return resolvedProvince + resolvedCity;
        } else {
            return 'API:地址获取失败';
        }
    } catch (err) {
        return 'API:地址获取失败';
    }
}

function getPublicIP(req) {
    const headers = req.headers;

    if (headers['x-real-ip']) {
        return headers['x-real-ip'];
    } else if (headers['x-forwarded-for']) {
        const ipList = headers['x-forwarded-for'].split(',');
        return ipList[0];
    }

    return '0.0.0.0';
}

const actionRecords = ({module, content}) => async (req, res, next) => {
    try {
        const clientIP = isDev ? getLocalIPv4Address() : getPublicIP(req);
        const u = new UAParser(req.headers['user-agent']);
        const address = await parseIP(clientIP);

        const newUsersOptLog = {
            operatorId: req.userId || '未知',
            operator: req.user?.nickname || req.body.username || '未知',
            module,
            platform: u.getBrowser().name ? `${u.getBrowser().name}.v${u.getBrowser().major}` : '未知',
            operatorIP: clientIP,
            address: address || '未知',
            content: content || req.originalUrl
        };

        await UsersOptLogModel.create(newUsersOptLog);
        next();
    } catch (err) {
        console.error(chalk.red('操作日志记录失败'), err);
        next(err);
    }
};

module.exports = {actionRecords};
