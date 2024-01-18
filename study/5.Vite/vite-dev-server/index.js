const Koa = require('koa'); // 不能用esmodule

const app = new Koa();
const fs = require('fs');
const path = require('path');



app.use(async (ctx) => {
    console.log(ctx.request.url);
    if (ctx.request.url === '/index') {
        ctx.response.body = await fs.promises.readFile(path.resolve(__dirname, './index.html'))
        ctx.response.set('Content-Type', 'text/html');
    }

    if (ctx.request.url === '/main.js') {
        ctx.response.body = await fs.promises.readFile(path.resolve(__dirname, './main.js'))
        ctx.response.set('Content-Type', 'text/javascript');
    }

    // 如果是vue文件 会字符串替换 vueContent.toString().find("<template>")
    if (ctx.request.url === '/App.vue') {
        ctx.response.body = await fs.promises.readFile(path.resolve(__dirname, './App.vue'))
        ctx.response.set('Content-Type', 'text/javascript');
    }
})

app.listen(8080,() => {
    console.log('vite dev server listening on 8080')
})
