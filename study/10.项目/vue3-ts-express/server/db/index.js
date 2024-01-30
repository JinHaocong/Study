const chalk = require('chalk');
// 导入数据库
const mysql = require('mysql2/promise');
// 导入配置
const config = require('../config/db.config');

// 创建连接池
const db = mysql.createPool(config);

// 打印连接池创建成功信息
console.log(chalk.bgGreen.black('MySQL连接池创建成功'));

// 进行简单的查询测试
async function testConnection() {
  try {
    const connection = await db.getConnection();
    const isDev = process.env.NODE_ENV === 'development';
    // 执行查询语句获取数据库名称
    const [rows] = await connection.execute('SELECT DATABASE() AS dbName');

    // 提取数据库名称
    const { dbName } = rows[0];

    console.log(chalk.rgb(123, 45, 67).bold(`连接${isDev ? chalk.blue.bold('开发环境') : chalk.blue.bold('生产环境')}数据库成功：${chalk.hex('#DEADED').underline(dbName)}`));
    // 释放连接，将连接归还给连接池
    connection.release();
  } catch (error) {
    console.error('连接到MySQL数据库时发生错误:', error);
  }
}

// 调用测试连接的函数
testConnection();

module.exports = db;
