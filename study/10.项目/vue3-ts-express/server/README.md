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

app.use(function (req: { body: any }, res: {
  setHeader: (arg0: string, arg1: string) => void
  write: (arg0: string) => void
  end: (arg0: string) => void
}) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

// 监听端口
app.listen(3070, () => {
  console.log('app is listening')
})

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
// 导入数据库
const mysql = require('mysql2/promise');

// 创建连接池
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vue3_ts_express',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

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

全局响应中间件

```js
const requestMiddleware = (req, res, next) => {
  // status=0为成功,=1为失败,默认设为1,方便处理失败的情况
  res.error = (msg, err = null, status = 1) => {
    res.send({
      status,
      message: msg,
      error: err,
    });
  };

  res.success = (msg, data = [], status = 0) => {
    res.send({
      status,
      message: msg,
      data,
    });
  };

  res.token = (msg, tokenStr, data = [], status = 0) => {
    res.send({
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

