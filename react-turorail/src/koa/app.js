// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa=require('koa');
//const fn_router = require('koa-router');
// const router = fn_router();
const bodyParser=require('koa-bodyparser');
const router=require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app=new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get('/hello/:name',async(ctx, next) => {
    var name=ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
})
/*router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});*/
app.use(router.routes());
app.use(async (ctx,next)=>{
    if(ctx.request.path==='/test'){
        ctx.response.body='test page';
    }else{
        await next();
    }
})
app.use(async (ctx,next)=>{
    if(ctx.request.path==='/error'){
        ctx.response.body='error page';
    }else{
        await next();
    }
})
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

/*
app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});
app.use(async (ctx,next)=>{
    const start=new Date().getTime();
    await next();// 调用下一个middleware
    const ms=new Date().getTime()-start;
    console.log(`Time: ${ms}ms`); // 打印耗费时间
})
app.use(async (ctx,next)=>{
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
})
app.use(async (ctx,next)=>{
    if(await checkUserPermission(ctx)){
        await next();
    }else{
        ctx.response.status=403;
    }
})*/
