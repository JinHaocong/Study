const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//  引入 express-session  connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {
  dbHost,
  dbPort,
  dbName,
  userName,
  password,
} = require('./config/config');

const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');
// 导入account
const accountRouter = require('./routes/api/account');

const app = express();

app.use(
  session({
    name: 'sid', // 设置cookie的name，默认值是：connect.sid
    secret: 'jhc', // 参与加密的字符串（又称签名）  加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否在每次请求时重新保存session  20 分钟    4:00  4:20
    store: MongoStore.create({
      mongoUrl: `mongodb://${userName}:${password}@${dbHost}:${dbPort}/${dbName}`, // 数据库的连接配置
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作
      maxAge: 1000 * 60 * 60 * 24 * 7, // 这一条 是控制 sessionID 的过期时间的！！！
    },
  })
);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/api', accountRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('404');
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// db
const db = require('./db/db');

const successFun = () => {
  console.log('数据库连接成功!');
};

const errorFun = (err) => {
  console.log('连接失败!', err);
};

(async () => {
  await db(successFun, errorFun);
})();

module.exports = app;
