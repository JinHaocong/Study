// 导入 mongoose
const mongoose = require('mongoose');
// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 创建模型对象  对文档操作的封装对象
const UserModel = mongoose.model('users', UserSchema);

// 暴露模型对象
module.exports = UserModel;
