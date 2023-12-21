const express = require('express');
const { singers } = require('./singers.json');

const app = express();

// 路由处理函数
const getSingerById = (req, res, next) => {
  const { id } = req.params;
  const result = singers.find((item) => item.id === Number(id));

  if (!result) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
    return;
  }

  res.locals.singer = result;
  next();
};

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.end(`<h1>${err.message}</h1>`);
};

// 路由
app.get('/singer/:id.html', getSingerById, (req, res) => {
  const { singer } = res.locals;

  res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${singer.singer_name}</title>
      </head>
      <body>
        <h2>${singer.singer_name}</h2>
        <img src='${singer.singer_pic}' />
      </body>
    </html>
  `);
});

// 注册错误处理中间件
app.use(errorHandler);

// 启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务已经启动，端口 ${PORT} 正在监听中....`, 'http://localhost:3000');
});
