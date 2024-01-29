const mysql = require('mysql');

// 创建与数据库的连接
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'vue3_ts_express',
});
db.connect((err, connection) => {
	if (err) {
		throw new Error
	} else {
		console.log('数据库连接成功')
	}
});


// 对外暴露数据库连接池
module.exports = db;
