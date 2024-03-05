// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/', (req, res) => {
  // send()
  // send方法内部会检测响应内容的类型
  // send方法会自动设置http状态码
  // send 方法会帮我们自动设置响应的内容类型及编码
  res.send('Hello Express');
});

app.listen(3000);
console.log('网站服务器启动成功');
