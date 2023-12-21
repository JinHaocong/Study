const mongoose = require('mongoose');

const username = 'admin';
const password = '123456';
const dbUrl = '127.0.0.1:27017';
const dbName = 'bookSystem';
// 设置 strictQuery 为 true
mongoose.set('strictQuery', true);

// 连接 MongoDB 服务
mongoose.connect(`mongodb://${username}:${password}@${dbUrl}/${dbName}`);

// 创建文档的结构对象
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    default: '匿名',
  },
  style: {
    type: String,
    enum: ['言情', '城市', '志怪', '恐怖'],
  },
  price: Number,
});

// 创建模型对象
const BookModel = mongoose.model('books', BookSchema);

// 连接成功的回调
mongoose.connection.once('open', async () => {
  try {
    // 新增文档
    const newBook = await BookModel.create({
      name: '红楼梦',
      // author: '吴承恩',
      price: 19.9,
      style: '言情',
    });

    console.log('插入成功:', newBook);
  } catch (error) {
    console.error('插入失败:', error);
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
  console.log('连接关闭');
});
