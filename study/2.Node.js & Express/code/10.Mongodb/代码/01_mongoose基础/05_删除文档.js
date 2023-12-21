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
    const BookModel = mongoose.model('novel', BookSchema);

    // 删除一条记录
    const deleteOneResult = await BookModel.deleteOne({ name: '西游记' });
    console.log('删除一条记录:', deleteOneResult);

    // 批量删除
    const deleteManyResult = await BookModel.deleteMany({ is_hot: false });
    console.log('批量删除记录:', deleteManyResult);
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
