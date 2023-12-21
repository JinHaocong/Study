const mongoose = require('mongoose');
const db = require('./db/db');
const BookModel = require('./models/BookModel');
const MovieModel = require('./models/MovieModel');

const successFun = () => {
  console.log('连接成功!');
};

const errorFun = (err) => {
  console.log('连接失败!', err);
};

// 异步函数用于连接数据库和进行新增操作
const insertBook = async () => {
  try {
    // 连接数据库
    await db(successFun, errorFun);

    // 新增文档
    const [newBook, newMovie] = await Promise.all([BookModel.create({
      name: '西游记',
      author: '吴承恩',
      price: 19.9,
    }), MovieModel.create({ title: '让子弹飞', director: '姜文' })]);
    console.log(newBook);
    console.log(newMovie);
  } catch (error) {
    // 处理错误
    console.error('操作失败:', error);
  } finally {
    // 关闭数据库连接 (项目运行过程中, 不会添加该代码)
    await mongoose.disconnect();
    console.log('关闭成功!');
  }
};

// 调用异步函数
(async () => {
  await insertBook();
})();
