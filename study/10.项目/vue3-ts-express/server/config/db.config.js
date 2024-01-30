module.exports = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vue3_ts_express',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // 最大空闲连接数
  idleTimeout: 60000, // 空闲连接超时时间，单位：毫秒
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,

};
