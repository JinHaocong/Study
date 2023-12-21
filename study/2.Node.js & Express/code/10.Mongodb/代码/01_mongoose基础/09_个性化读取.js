// 1. 安装 mongoose
// 2. 导入 mongoose
const mongoose = require('mongoose');

const username = 'admin';
const password = '123456';
const dbUrl = '127.0.0.1:27017';
const dbName = 'bookSystem';

// 设置 strictQuery 为 true
mongoose.set('strictQuery', true);

// 3. 连接 mongodb 服务                        数据库的名称
mongoose.connect(`mongodb://${username}:${password}@${dbUrl}/${dbName}`);

// 4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', async () => {
  try {
    // 5. 创建文档的结构对象
    // 设置集合中文档的属性以及属性值的类型
    const BookSchema = new mongoose.Schema({
      name: String,
      author: String,
      price: Number,
      is_hot: Boolean,
    });

    // 6. 创建模型对象  对文档操作的封装对象    mongoose 会使用集合名称的复数, 创建集合
    const BookModel = mongoose.model('novels', BookSchema);

    // exec表示执行查询
    // 7. 设置字段
    const data1 = await BookModel.find({})
      .select({ name: 1, author: 1, _id: 0 })
      .exec();
    console.log('data1', data1);

    // 数据排序 1升序 -1倒序
    const data2 = await BookModel.find({})
      .select({ name: 1, price: 1, _id: 0 })
      .sort({ price: -1 })
      .exec();
    console.log('data2', data2);

    // 数据的截取 skip跳过 limit限定
    const data3 = await BookModel.find({})
      .select({ name: 1, price: 1, _id: 0 })
      .sort({ price: -1 })
      .skip(3)
      .limit(3)
      .exec();
    console.log('data3', data3);
  } catch (e) {
    console.log(e, '操作失败');
  } finally {
    await mongoose.disconnect();
    console.log('关闭成功');
  }
});

// 设置连接错误的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
});

// 设置连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭...');
});
