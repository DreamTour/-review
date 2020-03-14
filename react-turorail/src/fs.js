'use strict'
var fs = require('fs');
/*fs.readFile('./App.css',function (err,date) {
    if(err){
        console.log('err'+"打开文件夹错误");
        return;
    }
    console.log(date.toString());
})
fs.writeFileSync('./test.js','he');
fs.readFile('./test.js','utf8',function (err,data) {
    if(err) throw err;
    console.log(data);
})
fs.readFile('./Toggle.js','utf8',function (err,data) {
    if(err) throw err;
    fs.writeFileSync('./test.js',data)
})
fs.writeFile('./test.js','he'+'\n',{flag:'a'},function (err,data) {
    if(err){
        console.log("写入错误");
        return;
    }
    console.log("aaa");
    fs.readFile('./test.js','utf8',function(err,data){
        console.log(data.toString());
    })
    console.log("b");
})
fs.mkdirSync('aa');
fs.mkdir('bb',function(){
    fs.readFile('./Toggle.js',function(err,data){
        if(err) throw err;
        var arr=data;
        fs.writeFile('./bb/ddd.txt',arr,function(err,data){
            if(err){
                console.log("写入错误");
                return;
            }

        })
    })
})
fs.unlink('./bb/ddd.txt',function () {
    fs.rmdir('bb',function () {

    })
})
fs.rmdirSync('bb');
fs.stat('./test.js',function (err,stat) {
    if(err){
        console.log(err);
    }else{
        // 是否是文件:
        console.log('isFile:'+stat.isFile());
        // 是否是目录:
        console.log('isDirectory',stat.isDirectory())
        if(stat.isFile()){
            // 文件大小:
            console.log('size:'+stat.size);
            // 创建时间, Date对象:
            console.log('birth time:'+stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time:'+stat.mtime);
        }
    }
})
let stat=fs.statSync('./test.js');
// 打开一个流:
var rs=fs.createReadStream('./test.js','utf-8')
rs.on('data',function (chunk) {
    console.log('DATA:')
    console.log(chunk);
})
rs.on('end',function () {
    console.log('END');
})
rs.on('error',function (err) {
    console.log('ERROR: ' + err);
})
var ws1=fs.createWriteStream('./test.js','utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();
var ws2=fs.createWriteStream('./test.js','utf-8');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
var rs=fs.createReadStream('Toggle.js');
var ws=fs.createWriteStream('test.js');
rs.pipe(ws);
// 导入http模块:
var http=require('http');
var server=http.createServer(function (request,response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method+':'+request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200,{'Content-Type':'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>')
})
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
var url=require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
var path=require('path');
// 解析当前目录:
var workDir=path.resolve('.');
var filePath=path.join(workDir,'pub','index.html');
console.log(filePath)
var fs=require('fs');
var url=require('url');
var path=require('path');
var http=require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root=path.resolve(process.argv[2]||'.');
console.log(process.argv[2]);
console.log('Static root dir: ' + root);
// 创建服务器:
var server =http.createServer(function (request,response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname=url.parse(request.url).pathname;
    console.log('pathname-->',pathname);
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath=path.join(root,pathname);
    // 获取文件状态:
    fs.stat(filepath,function (err,stats) {
        if(!err&&stats.isFile()){
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        }else{
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    })
})
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
const crypto=require('crypto');
const hash=crypto.createHash('md5');
// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex'));
const hmac=crypto.createHmac('sha256','secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex'));
const crypto=require('crypto');
function aesEncrypt(data,key){
    const cipher=crypto.createCipher('aes192',key);
    var crypted=cipher.update(data,'utf8','hex');
    crypted+=cipher.final('hex');
    return crypted;
}
function aesDecrypt(encrypted,key){
    const decipher=crypto.createDecipher('aes192',key);
    var decrypted=decipher.update(encrypted,'hex','utf8');
    decrypted+=decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted=aesEncrypt(data,key);
var decrypted =aesDecrypt(encrypted,key);
console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
const crypto=require('crypto');
// xiaoming's keys:
var ming=crypto.createDiffieHellman(512);
var ming_keys=ming.generateKeys();

var prime=ming.getPrime();
var generator =ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong=crypto.createDiffieHellman(prime,generator);
var hong_keys=hong.generateKeys();

// exchange and generate secret:
var ming_secret =ming.computeSecret(hong_keys);
var hong_secret =hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));
const fs=require('fs'),
    crypto=require('crypto');
function loadKey(file) {
    return fs.readFileSync(file,'utf8');
}
let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

let enc_by_prv =crypto.privateEncrypt(prvKey,Buffer.from(message,'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));

let dec_by_pub =crypto.privateDecrypt(pubKey,enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));

let enc_by_pub =crypto.publicEncrypt(prvKey,enc_by_pub);
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

let dec_by_prv =crypto.publicDecrypt(prvKey,enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));

var koa=require('koa');
var app=koa();
app.use('./test',function *(){
    yield doReadFile1();
    var data=yield doReadFile2();
    this.body=data;
});
app.listen(3000);*/
app.use(async (ctx,next)=>{
    await next();
    var data=await doReadFile();
    ctx.response.type='text/plain';
    ctx.response.body=data;
})