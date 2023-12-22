const mongoose = require('mongoose');

const username = 'admin';
const password = '123456';
const dbUrl = '127.0.0.1:27017';
const dbName = 'bookSystem';

// 设置 strictQuery 为 true
mongoose.set('strictQuery', true);

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb://${username}:${password}@${dbUrl}/${dbName}`
    );
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

// 定义 Book Schema
const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  is_hot: Boolean,
  tags: [String],
  pub_time: Date,
  test: mongoose.Schema.Types.Mixed, // 任意类型
});

// 创建 Book Model
const BookModel = mongoose.model('books', bookSchema);

// 添加书籍到数据库
async function addBook() {
  try {
    const newBook = await BookModel.create({
      name: '西游记',
      author: '吴承恩',
      price: 19.9,
      is_hot: true,
      tags: ['鬼怪', '励志', '社会'],
      pub_time: new Date(),
      test: new Date(),
    });

    console.log('Book created successfully:', newBook);
  } catch (error) {
    console.error('Error creating book:', error);
  }
}

// 关闭数据库连接
async function closeConnection() {
  try {
    await mongoose.disconnect();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error closing connection:', error);
  }
}

// 连接数据库并执行操作
(async () => {
  await connectToDatabase();
  await addBook();
  await closeConnection();
})();
