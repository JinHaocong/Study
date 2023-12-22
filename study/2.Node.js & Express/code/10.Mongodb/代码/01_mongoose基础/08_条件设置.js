const mongoose = require('mongoose');

const username = 'admin';
const password = '123456';
const dbUrl = '127.0.0.1:27017';
const dbName = 'bookSystem';
// 设置 strictQuery 为 true
mongoose.set('strictQuery', true);

// 连接 MongoDB 服务
mongoose.connect(`mongodb://${username}:${password}@${dbUrl}/${dbName}`);

// 连接成功的回调
mongoose.connection.once('open', async () => {
  try {
    // 创建文档的结构对象
    const BookSchema = new mongoose.Schema({
      name: String,
      author: String,
      price: Number,
      is_hot: Boolean,
    });

    // 创建模型对象
    const BookModel = mongoose.model('novels', BookSchema); // 使用 "novels" 作为集合名称

    // 查询价格小于 20 的图书
    const booksBelow20 = await BookModel.find({ price: { $lt: 20 } });
    console.log('价格小于 20 的图书:', booksBelow20);

    // 查询作者是曹雪芹或者余华的书
    const booksByAuthors = await BookModel.find({
      $or: [{ author: '曹雪芹' }, { author: '余华' }],
    });
    console.log('曹雪芹或者余华的书:', booksByAuthors);

    // 查询价格大于 30 且小于 70 的图书
    const booksBetween30And70 = await BookModel.find({
      price: { $gt: 30, $lt: 70 },
    });
    console.log('价格大于 30 且小于 70 的图书:', booksBetween30And70);

    // 使用正则表达式搜索书籍名称中带有 `三` 的图书
    const booksWithCharacterSan = await BookModel.find({ name: /三/ });
    console.log('名称中带有 `三` 的图书:', booksWithCharacterSan);

    // 或者使用 new RegExp
    const booksWithCharacterSanRegExp = await BookModel.find({
      name: new RegExp('三'),
    });
    console.log(
      '名称中带有 `三` 的图书 (使用 new RegExp):',
      booksWithCharacterSanRegExp
    );
  } catch (error) {
    console.error('查询失败:', error);
  } finally {
    // 关闭数据库连接 (项目运行过程中, 不会添加该代码)
    await mongoose.disconnect();
    console.log('关闭成功');
  }
});

// 连接错误的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
});

// 连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭...');
});
