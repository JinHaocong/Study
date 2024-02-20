// 导入数据库
const db = require('../db/index');

const updateTimeMiddleware = async (req) => {
  try {
    const { id } = req.body;
    const updateSql = 'update users set update_time = ? where id = ?';
    await db.query(updateSql, [new Date(), id]);
  } catch (e) {
    console.log(e, 'updateTimeMiddleware');
  }
};

module.exports = updateTimeMiddleware;
