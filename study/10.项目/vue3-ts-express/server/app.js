const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');

// 访问不同的 .env 文件
const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({ path: isDev ? './.env.development' : './.env.production' });

const {
  expressjwt: jwt,
} = require('express-jwt');
const requestMiddleware = require('./middlewares/requestMiddleware');

const loginRouter = require('./router/login');

// 创建express实例
const app = express();

// 解决跨域
app.use(cors());

// 日志
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或者字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }));

// jwt
const jwtConfig = require('./jwt_config/index');

// 全局请求处理中间件
app.use(requestMiddleware);

app.use(jwt({
  secret: jwtConfig.jwtSecretKey, algorithms: ['HS256'],
}).unless({
  path: [/^\/api\//],
}));

// parse application/json
app.use(bodyParser.json());

// 路由模块
app.use('/api', loginRouter);

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
