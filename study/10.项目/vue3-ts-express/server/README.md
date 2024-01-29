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
yarn add bcryptjs jsonwebtoken
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
const db = require('../db/index');

exports.register = async (req, res) => {
  const { account, password } = req.body;
  // step 1: 判断前端传过来的数据是否为空
  if (!account || !password) {
    return res.send({
      status: 1,
      message: '账号或者密码不能为空',
    });
  }

  // step 2: 判断前端传过来账号有没有已经存在在数据表中
  try {
    const querySQL = 'select * from users where account = ?';
    const [queryData] = await db.query(querySQL, password);
    if (queryData.length) {
      return res.send({
        status: 1,
        message: '账号已存在',
      });
    }

    // step 3: 对密码进行加密 需要使用加密中间件 bcrypt.js
    // bcrypt.hashSyncd第一个参数是传入的密码，第二个参数是加密后的长度
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // step 4: 把账号跟密码插入到users表里面
    const insertSQL = 'insert into users set ?';
    const info = {
      account,
      password: encryptedPassword,
      // 身份
      identity: '用户',
      // 创建时间
      create_time: new Date(),
      // 初始未冻结状态为0
      status: 0,
    };
    const [insertData] = await db.query(insertSQL, info);
    console.log(insertData.affectedRows);
    if (insertData.affectedRows !== 1) {
      return res.send({
        status: 1,
        message: '注册账号失败',
      });
    }
    res.send({
      status: 0,
      message: '注册账号成功',
    });
  } catch (e) {
    console.log(e, '注册账号失败');
    return res.send({
      status: 1,
      message: '注册账号失败',
    });
  }
};

exports.login = (req, res) => {
  res.send('登录');
};

```

app.ts中引入

```ts
const loginRouter = require('./router/login');

// 路由模块
app.use('/api', loginRouter)
```

