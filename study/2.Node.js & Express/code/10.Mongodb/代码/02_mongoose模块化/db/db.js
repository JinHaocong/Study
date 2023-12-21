// 导入 配置文件
const mongoose = require('mongoose');
const {
  dbHost, dbPort, dbName, userName, password,
} = require('../config/config');

/**
 * 连接数据库
 * @param {Function} success 数据库连接成功的回调
 * @param {Function} error 数据库连接失败的回调
 */
module.exports = async (success, error) => {
  try {
    mongoose.set('strictQuery', true);

    // 1. 连接 MongoDB 服务
    await mongoose.connect(`mongodb://${userName}:${password}@${dbHost}:${dbPort}/${dbName}`);
    success();

    // 2. 设置连接关闭的回调
    mongoose.connection.on('close', () => {
      console.log('连接关闭中...');
    });
  } catch (err) {
    // 连接失败时调用错误回调
    error(err);
  }
};
