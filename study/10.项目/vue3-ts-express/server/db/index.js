// 导入数据库
const mysql = require('mysql2/promise');

// 创建连接池
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vue3_ts_express',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = db;
