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

    // 更新文档 - 更新一条
    const updateOneResult = await BookModel.updateOne({ name: '红楼梦' }, { price: 9.9 });
    console.log('更新一条记录:', updateOneResult);

    // 批量更新文档
    const updateManyResult = await BookModel.updateMany({ author: '余华' }, { is_hot: true });
    console.log('批量更新记录:', updateManyResult);
  } catch (error) {
    console.error('操作失败:', error);
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
