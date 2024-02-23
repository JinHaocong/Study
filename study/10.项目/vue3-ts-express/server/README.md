# 项目搭建

## 项目初始化

```powershell
yarn init -y
```

## 安装依赖

```powershell
yarn add nodemon eslint morgan @types/node --dev
```

```
yarn add express cors body-parser
```

## 创建入口文件app.js

```ts
// 导入express框架
const express = require('express');

// 导入cors 解决跨域
const cors = require('cors');

// 导入表单中间件
const bodyParser = require('body-parser');

// 导入日志中间件
const logger = require('morgan')

// 访问不同的 .env 文件
const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({ path: isDev ? './.env.development' : './.env.production' });

// 创建express实例
const app = express()

// 解决跨域
app.use(cors())

// 日志
app.use(logger('dev'))

// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或者字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req: { body: any }, res: {
  setHeader: (arg0: string, arg1: string) => void
  write: (arg0: string) => void
  end: (arg0: string) => void
}) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

// 监听端口
app.listen(process.env.PORT, () => {
  console.log(
    chalk.hex('#8e44ad').bold(`
   ____    ___    _   _    ____    ____    ___    _   _    ____ 
  / ___|  / _ \\  | \\ | |  / ___|  / ___|  / _ \\  | \\ | |  / ___|
 | |     | | | | |  \\| | | |  _  | |     | | | | |  \\| | | |  _ 
 | |___  | |_| | | |\\  | | |_| | | |___  | |_| | | |\\  | | |_| |
  \\____|  \\___/  |_| \\_|  \\____|  \\____|  \\___/  |_| \\_|  \\____|
                                                                
`),
  );
  console.log(chalk.bold.green(`项目启动成功: ${process.env.URL}:${process.env.PORT}`));
});


```

## 配置启动项

```json
  "scripts": {
"dev": "SET NODE_ENV=development&& nodemon app.js --mode development"
},
```

## 配置编码规范

### 配置eslint

运行

```powershell
npm init @eslint/config
```

```powershell
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · yarn
```

.eslintrc.js

```ts
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'consistent-return': 0,
    'no-console': 0,
  },
};

```

## Mysql配置

创建数据库并安装mysql2

```powershell
 yarn add mysql2
```

db/index.js

```ts
const chalk = require('chalk');
// 导入数据库
const mysql = require('mysql2/promise');
// 导入配置
const config = require('../config/db.config');

// 创建连接池
const db = mysql.createPool(config);

// 打印连接池创建成功信息
console.log(chalk.bgGreen.black('MySQL连接池创建成功'));

// 进行简单的查询测试
async function testConnection() {
  try {
    const connection = await db.getConnection();
    const isDev = process.env.NODE_ENV === 'development';
    // 执行查询语句获取数据库名称
    const [rows] = await connection.execute('SELECT DATABASE() AS dbName');

    // 提取数据库名称
    const { dbName } = rows[0];

    console.log(
      chalk.rgb(123, 45, 67)
        .bold(
          `连接${isDev
            ? chalk.blue.bold('开发环境')
            : chalk.blue.bold('生产环境')}数据库成功：${chalk.hex('#DEADED').underline(dbName)}`,
        ),
    );
    // 释放连接，将连接归还给连接池
    connection.release();
  } catch (error) {
    console.error(chalk.bgRed.black.bold('连接到MySQL数据库时发生错误:'), error);
  }
}

// 调用测试连接的函数
testConnection();

module.exports = db;

```

# 登录/注册功能实现

安装中间件

- joi 对输入数据进行限制
- brcyptjs 密码加密
- jsonwebtoken 生产token
- express-jwt 解析token

安装中间件

```powershell
yarn add bcryptjs jsonwebtoken express-jwt
```

## 全局响应中间件

middlewares/requestMiddleware.js

```js
const requestMiddleware = (req, res, next) => {
  // status=0为成功,=1为失败,默认设为1,方便处理失败的情况
  res.error = (msg, err = null, status = 1, success = false) => {
    res.send({
      success,
      status,
      message: msg,
      error: err,
    });
  };

  res.success = (msg, data = [], status = 0, success = true) => {
    res.send({
      success,
      status,
      message: msg,
      data,
    });
  };

  res.token = (msg, tokenStr, data = [], status = 0, success = true) => {
    res.send({
      success,
      status,
      message: msg,
      data,
      token: `Bearer ${tokenStr}`,
    });
  };

  next();
};

module.exports = requestMiddleware;

```

router/login/js

```ts
const express = require('express');

const router = express.Router();

const loginHandler = require('../handler/login');

// 注册
router.post('/register', loginHandler.register);
// 登录
router.post('/login', loginHandler.login);

module.exports = router;

```

handler/login/js

```ts
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/index');
const jwtConfig = require('../jwt_config/index');

exports.register = async (req, res) => {
  try {
    // step 1：检查账号或密码是否为空
    const { account, password } = req.body;
    if (!account || !password) return res.error('账号或者密码不能为空');

    // step 2：检查账号是否已经存在
    const querySQL = 'SELECT * FROM users WHERE account = ?';
    const [queryData] = await db.query(querySQL, account) || [];

    if (queryData.length) return res.error('账号已存在');

    // step 3：加密密码
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // step 4：将账号和加密后的密码插入到users表中
    const insertSQL = 'INSERT INTO users SET ?';
    const userInfo = {
      account,
      password: encryptedPassword,
      identity: '用户',
      create_time: new Date(),
      status: 0,
    };

    const [insertData] = await db.query(insertSQL, userInfo);

    // 确保之影响一行数据
    if (insertData.affectedRows !== 1) return res.error('注册账号失败');

    res.success('注册账号成功');
  } catch (e) {
    res.error('注册账号失败', e);
  }
};

exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;

    // step 1：查看数据表中有没有前端传过来的账号
    const querySQL = 'select * from users where account = ?';
    const [queryData] = await db.query(querySQL, account) || [];
    if (!queryData.length) return res.error('登录失败：用户不存在');

    // step 2：对前端传过来的密码进行解密
    const compareResult = bcrypt.compareSync(password, queryData[0].password);
    if (!compareResult) return res.error('登录失败：密码错误');

    // step 3：对账号是否冻结做判定
    if (queryData[0].status === '1') return res.error('登录失败：账号被冻结');

    // step 4：生成返回给前端的token 剔除加密后的密码,头像,创建时间,更新时间
    const user = {
      ...queryData[0],
      password: '',
      imageUrl: '',
      create_time: '',
      update_time: '',
    };
    // 设置token的有效时长 有效期为7个小时
    const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, {
      expiresIn: '7h',
    });
    res.token('登录成功', tokenStr, queryData[0]);
  } catch (e) {
    return res.error('登录失败', e);
  }
};

```

app.ts中引入

```ts
const loginRouter = require('./router/login');

// 路由模块
app.use('/api', loginRouter)
```

## joi检验中间件

middlewares/handleJoiValidationError.js

```js
const Joi = require('joi');

const handleJoiValidationError = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.error(err.message);
  next(err);
};

module.exports = handleJoiValidationError;

```

app.js引入中间件(**注意要放到路由中间件的后面**)

```js
const handleJoiValidationError = require('./middlewares/handleJoiValidationError');

// joi校验中间件 注意要放到路由中间件的后面
app.use(handleJoiValidationError);
```

配置规则并采用中文显示

```powershell
 yarn add joi-messages-zh_cn
```

joi/login.js 配置登录注册规则

```js
const cnMessages = require('joi-messages-zh_cn');

const Joi = require('joi');

const zhCnFile = cnMessages['zh-cn'];

// string值只能为字符串
// alphanum值为a-z A-Z 0-9
// min是最小长度 max是最大长度
// required是必填项
// pattern是正则 .pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)

// 账号的验证
const account = Joi.string().alphanum().min(5).max(12)
  .required()
  .messages({ ...zhCnFile });
// 密码的验证
const password = Joi.string().min(6).max(12)
  .required()
  .messages({ ...zhCnFile });

exports.loginLimit = {
  // 表示对req.body里面的数据进行验证
  body: {
    account,
    password,
  },
};

```

## jwt中间件

middlewares/tokenAuthentication.js

```js
const { expressjwt: jwt } = require('express-jwt');
const jwtConfig = require('../jwt_config');

function tokenAuthentication(req, res, next) {
  jwt({
    secret: jwtConfig.jwtSecretKey,
    algorithms: ['HS256'],
  }).unless({
    path: [
      /^\/api\//,
      /\/verifyAccountAndEmail/,
      /\/changePasswordInLogin/,
    ],
  })(req, res, (err) => {
    if (err) {
      // 抛出错误给全局错误信息处理
      return res.error('身份未验证', err, 401);
    }
    next();
  });
}

module.exports = tokenAuthentication;

```

app.js

```js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const handleJoiValidationError = require('./middlewares/handleJoiValidationError');
const requestMiddleware = require('./middlewares/requestMiddleware');
const loginRouter = require('./router/login');
const userRouter = require('./router/userinfo');
const tokenAuthentication = require('./middlewares/tokenAuthentication');

// 访问不同的 .env 文件
const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({ path: isDev ? './.env.development' : './.env.production' });

// 创建express实例
const app = express();

// 解决跨域
app.use(cors());

// 日志
app.use(logger('dev'));

// 全局请求处理中间件
app.use(requestMiddleware);

// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或者字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 路由模块
app.use('/api', loginRouter);
app.use('/user', userRouter);

// joi校验中间件 注意要放到路由中间件的后面
app.use(handleJoiValidationError);

// 监听端口
app.listen(process.env.PORT, () => {
  console.log(
    chalk.hex('#8e44ad').bold(`
   ____    ___    _   _    ____    ____    ___    _   _    ____ 
  / ___|  / _ \\  | \\ | |  / ___|  / ___|  / _ \\  | \\ | |  / ___|
 | |     | | | | |  \\| | | |  _  | |     | | | | |  \\| | | |  _ 
 | |___  | |_| | | |\\  | | |_| | | |___  | |_| | | |\\  | | |_| |
  \\____|  \\___/  |_| \\_|  \\____|  \\____|  \\___/  |_| \\_|  \\____|
                                                                
`),
  );
  console.log(chalk.bold.green(`项目启动成功: ${process.env.URL}:${process.env.PORT}`));
});

```

**注意** jwt不能在app.use('/user', userRouter);路由挂在前使用，这样会导致404

也不能再挂在后使用，会导致路由处理函数比jwt中间件先执行

应该在路由挂载之后，路由中间件之前使用，

router/userinfo.js

```js
const tokenAuthentication = require('../middlewares/tokenAuthentication');

// 验证账号与邮箱 verifyAccountAndEmail
router.post('/verifyAccountAndEmail', tokenAuthentication, userinfoHandler.verifyAccountAndEmail);
```

# 重置密码功能实现

## 添加接口路由

router/userinfo.js

```js
// 验证账号与邮箱 verifyAccountAndEmail
router.post('/verifyAccountAndEmail', tokenAuthentication, userinfoHandler.verifyAccountAndEmail);
// 登录页面修改密码 changePasswordInLogin
router.post('/changePasswordInLogin', tokenAuthentication, expressJoi(forgetPasswordLimit), userinfoHandler.changePasswordInLogin);
```

## 添加handler

handler/userinfo.js

```js
// 验证账户和与邮箱是否一致 email account
exports.verifyAccountAndEmail = async (req, res) => {
  try {
    const { account, email } = req.body;
    const verifySQL = 'select * from users where account = ?';
    const [queryData] = await db.query(verifySQL, account) || [];
    if (!queryData.length) return res.error('账号不存在');
    if (email === queryData[0].email) return res.success('身份验证成功', { id: queryData[0].id });
    return res.error('邮箱不一致');
  } catch (e) {
    res.error('查询失败', e);
  }
};

// 登录页面修改密码 参数 newPassword id
exports.changePasswordInLogin = async (req, res) => {
  try {
    const user = req.body;
    user.newPassword = bcrypt.hashSync(user.newPassword, 10);
    const updateSQL = 'update users set password = ? where id = ?';
    const [queryData] = await db.query(updateSQL, [user.newPassword, user.id]) || [];
    return res.success('修改成功', queryData);
  } catch (e) {
    res.error('修改失败', e);
  }
};
```

# 上传头像功能实现

## 安装multer中间件

```powershell
yarn add multer
```

## 添加文件上传multer中间件

uploadFileMiddleware.js

```js
const multer = require('multer');
const iconv = require('iconv-lite');

const storage = multer.diskStorage({
  // 文件储存路径
  destination(req, file, cb) {
    cb(null, 'public/upload');
  },
  // 名称替换
  filename(req, file, cb) {
    const newNameBuffer = Buffer.from(file.originalname, 'binary');
    const newName = iconv.decode(newNameBuffer, 'utf8');
    cb(null, newName);
  },
});

const uploadFileMiddleware = multer({ storage });

module.exports = uploadFileMiddleware;
```

## express添加静态资源托管

app.js

```js
// 静态资源托管
app.use(express.static('./public'));
```

## 添加接口路由

router/userinfo.js

```js
// 文件上传中间件
const upload = require('../middlewares/uploadFileMiddleware');
// 上传头像
router.post('/uploadAvatar', tokenAuthentication, upload.single('avatar'), userinfoHandler.uploadAvatar);
```

## 安装iconv-lite 解决中文乱码

```js
yarn
add
iconv - lite
```

## 添加路由处理函数

添加环境变量

.env.development

```
# 上传图片baseUrl
IMAGE_BASE_URL = 'http://127.0.0.1:3007/upload/'
```

handler/userinfo.js

```js
// 上传头像
exports.uploadAvatar = async (req, res) => {
  try {
    // step 1：生成唯一标识
    const onlyId = crypto.randomUUID();
    // step 2：插入数据库
    const insertSql = 'insert into image set ?';
    const avatarInfo = {
      image_url: process.env.IMAGE_BASE_URL + req.file.filename,
      onlyId,
    };

    const [insertData] = await db.query(insertSql, avatarInfo);
    if (insertData.affectedRows !== 1) return res.error('上传失败');
    res.success('上传成功', avatarInfo);
  } catch (e) {
    res.error('上传失败', e);
  }
};
```

# 将上传头像的onlyId绑定到账号

## 创建路由

router/userinfo.js

```js
// 绑定账号
router.post('/bindAccount', tokenAuthentication, userinfoHandler.bindAccount);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 将上传头像的onlyId绑定到账号
exports.bindAccount = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { account, onlyId, url } = req.body;

    // step 1：开启事务
    await connection.beginTransaction();

    // step 2：更新image表
    const updateSql1 = 'update image set account = ? where onlyId = ?';
    const updateImagePromise = db.query(updateSql1, [account, onlyId]);

    // step 3：更新user表
    const updateSql2 = 'update users set image_url = ? where account = ?';
    const updateUserPromise = db.query(updateSql2, [url, account]);

    // Use Promise.all to wait for both updates to complete
    const [queryData1, queryData2] = await Promise.all([updateImagePromise, updateUserPromise]);

    // Check if both updates were successful
    if (queryData1[0].affectedRows !== 1 || queryData2[0].affectedRows !== 1) {
      await connection.rollback();
      return res.error('头像更换失败');
    }

    // step 4：提交事务
    await connection.commit();

    res.success('头像更换成功');
  } catch (e) {
    await connection.rollback();
    res.error('上传头像失败', e);
  } finally {
    // step 5：释放连接，将连接归还给连接池
    connection.release();
  }
};
```

# 根据id获取用户信息

## 创建路由

router/userinfo.js

```js
// 获取用户信息
router.post('/getUserInfo', tokenAuthentication, userinfoHandler.getUserInfo);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 获取用户信息 接收参数 id
exports.getUserInfo = async (req, res) => {
  try {
    const selectSql = 'select * from users where id = ?';
    const [queryData] = await db.query(selectSql, req.body.id) || [];
    res.success('查询成功', queryData[0]);
  } catch (e) {
    req.error('获取用户信息失败', e);
  }
};
```

# 修改姓名实现

## 创建路由

router/userinfo.js

```js
// 修改姓名 changeName
router.post('/changeName', tokenAuthentication, expressJoi(nameLimit), userinfoHandler.changeName);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 修改姓名 接收参数 id name
exports.changeName = async (req, res) => {
  try {
    const { name, id } = req.body;
    const updateSql = 'update users set name = ? where id = ?';
    const [queryData] = await db.query(updateSql, [name, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e);
  }
};
```

# 修改性别实现

## 创建路由

router/userinfo.js

```js
// 修改性别
router.post('/changeSex', tokenAuthentication, userinfoHandler.changeSex);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 修改性别 接收参数 id sex
exports.changeSex = async (req, res) => {
  try {
    const { sex, id } = req.body;
    const updateSql = 'update users set sex = ? where id = ?';
    const [queryData] = await db.query(updateSql, [sex, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e);
  }
};
```

# 修改邮箱实现

## 创建路由

router/userinfo.js

```js
// 修改邮箱
router.post('/changeEmail', tokenAuthentication, expressJoi(emailLimit), userinfoHandler.changeEmail);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 修改邮箱 接收参数 id email
exports.changeEmail = async (req, res) => {
  try {
    const { email, id } = req.body;
    const updateSql = 'update users set email = ? where id = ?';
    const [queryData] = await db.query(updateSql, [email, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e);
  }
};
```

# 增加更新时间中间件

middlewares/updateTimeMiddleware.js

```js
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

```

## 在路由中使用

**注意：记得在updateTimeMiddleware前一个中间件函数中添加next**

router/userinfo.js

```js
// 修改姓名 changeName
router.post('/changeName', tokenAuthentication, expressJoi(nameLimit), userinfoHandler.changeName, updateTimeMiddleware);
// 修改性别
router.post('/changeSex', tokenAuthentication, userinfoHandler.changeSex, updateTimeMiddleware);
// 修改邮箱
router.post('/changeEmail', tokenAuthentication, expressJoi(emailLimit), userinfoHandler.changeEmail, updateTimeMiddleware);
```

# 修改密码实现

## 添加环境变量HASH_SALT

.dev.development

```
# hashSalt
HASH_SALT='10'
```

## 创建路由

router/userinfo.js

```js
// 修改用户密码 changePassword
router.post('/changePassword', tokenAuthentication, expressJoi(passwordLimit), userinfoHandler.changePassword, updateTimeMiddleware);
```

## 创建路由处理函数

handler/userinfo.js

```js
// 修改用户密码 先输入旧密码 oldPassword 新密码 newPassword id
exports.changePassword = async (req, res, next) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    // step 1: 验证原密码是否正确
    const selectSql = 'select password from users where id = ?';
    const [selectData] = await db.query(selectSql, id);
    const compareResult = bcrypt.compareSync(oldPassword, selectData[0].password);
    if (!compareResult) return res.error('原密码错误');

    // step 2：修改密码
    const updateSql = 'update users set password = ? where id = ?';
    const hashPassword = bcrypt.hashSync(newPassword, Number(process.env.HASH_SALT));
    const [queryData] = await db.query(updateSql, [hashPassword, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');

    res.success('操作成功');
    next();
  } catch (e) {
    console.log(e);
    res.error('修改失败', e);
  }
};
```

# 轮播图功能实现

## 上传轮播图

### 创建路由

server/router/setting.js

```js
// 上传轮播图
router.post('/uploadSwiper', tokenAuthentication, upload.any(), setHandler.uploadSwiper);
```

### 创建路由函数

server/handler/setting.js

```js
// 上传轮播图 需要两个参数  set_value set_name
exports.uploadSwiper = async (req, res) => {
  try {
    const { fieldname, filename } = req.files[0];
    const updateSql = 'update setting set set_value = ? where set_name = ?';
    const value = process.env.IMAGE_BASE_URL + filename;
    const [updateData] = await db.query(updateSql, [value, fieldname]);
    if (updateData.affectedRows !== 1) return res.error('上传轮播图失败');
    res.success('上传成功', { fieldname, url: process.env.IMAGE_BASE_URL + filename });
  } catch (e) {
    res.error('上传失败', e.toString());
  }
};
```

## 获取所有轮播图

### 创建路由

server/router/setting.js

```js
// 获取所有轮播图
router.post('/getAllSwiper', tokenAuthentication, setHandler.getAllSwiper);
```

### 创建路由函数

server/handler/setting.js

```js
// 获取所有轮播图
exports.getAllSwiper = async (req, res) => {
  try {
    const selectSql = 'select * from setting where set_name like \'swiper%\' ';
    const [queryData] = await db.query(selectSql) || [];
    res.success('查询成功', queryData);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};
```

# 公司功能实现

## 修改公司名称

### 创建路由

server/router/setting.js

```js
// 修改公司名称
router.post('/changeCompanyName', tokenAuthentication, setHandler.changeCompanyName);
```

### 创建路由函数

server/handler/setting.js

```js
// 修改公司名称 参数 set_value
exports.changeCompanyName = async (req, res) => {
  try {
    const { companyName } = req.body;
    const updateSql = 'update setting set set_value = ? where set_name = "companyName"';
    const [updateData] = await db.query(updateSql, companyName);
    if (updateData.affectedRows !== 1) return res.error('修改公司名称失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e.toString());
  }
};
```

## 获取公司名称

### 创建路由

server/router/setting.js

```js
// 获取公司名称
router.post('/getCompanyName', tokenAuthentication, setHandler.getCompanyName);
```

### 创建路由函数

server/handler/setting.js

```js
// 获取公司名称
exports.getCompanyName = async (req, res) => {
  try {
    const selectSql = 'select * from setting where set_name = "companyName"';
    const [queryData] = await db.query(selectSql) || [];
    res.success('查询成功', queryData[0]);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};
```

## 修改公司介绍

### 创建路由

server/router/setting.js

```js
// 修改公司介绍
router.post('/changeCompanyIntroduce', tokenAuthentication, setHandler.changeCompanyIntroduce);
```

### 创建路由函数

server/handler/setting.js

```js
// 编辑公司介绍的接口 参数 set_text set_name
exports.changeCompanyIntroduce = async (req, res) => {
  try {
    const bodyKeys = Object.keys(req.body);

    // 检查是否有必要的字段
    if (bodyKeys.length === 0) return res.error('缺少必要的字段');
    const updateSql = 'update setting set set_text = ? where set_name = ?';
    const selectSql = 'SELECT * FROM setting WHERE set_name = ?';

    const updatePromises = bodyKeys.map(async (key) => {
      const setText = req.body[key];
      const setName = key;

      const [updateData] = await db.query(updateSql, [setText, setName]);

      if (updateData.affectedRows !== 1) return Promise.reject(new Error(`修改 ${setName} 失败，字段不存在`));
      const [selectedData] = await db.query(selectSql, setName);

      return Promise.resolve(selectedData[0]);
    });

    // 执行所有更新操作
    const data = await Promise.all(updatePromises);

    res.success('修改成功', data);
  } catch (e) {
    res.error('修改失败', e.toString());
  }
};
```

## 获取公司信息

### 创建路由

server/router/setting.js

```js
// 获取公司信息
router.post('/getCompanyIntroduce', tokenAuthentication, setHandler.getCompanyIntroduce);
```

### 创建路由函数

server/handler/setting.js

```js
// 获取公司介绍 参数 set_name
exports.getCompanyIntroduce = async (req, res) => {
  try {
    const { setName } = req.body;
    let selectSql = 'SELECT * FROM setting';

    if (setName) {
      selectSql += ' WHERE set_name = ?';
    } else {
      selectSql += ' WHERE set_name LIKE ?';
    }

    const searchParam = setName ? [setName] : ['%company%'];
    const [queryData] = await db.query(selectSql, searchParam) || [];
    res.success('查询成功', queryData);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};
```
