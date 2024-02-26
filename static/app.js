const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const app = http.createServer();

app.on('request', (req, res) => {
  let pathname = url.parse(req.url).pathname;
  pathname = pathname === '/' ? 'default.html' : pathname;

  let realPath = path.join(__dirname, 'public' + pathname);
  let type = mime.getType(realPath);

  // 读取文件
  fs.readFile(realPath, (error, result) => {
    if(error != null) {
      res.end('文件读取失败');
      return;
    }
    res.writeHead(200, {
      'content-type':  type      
    }) 

    res.end(result);
  })
})

app.listen(3000);
console.log('服务器启动成功');