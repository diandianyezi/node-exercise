const http = require('http');
const mongoose = require('mongoose');
const url = require('url');
const querystring = require('querystring');

// 数据库连接
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('数据库连接成功'))
.catch(err => console.log('数据库连接失败'))

// 创建用户集合
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  age: {
    type: Number,
    max: 18,
    max: 80
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  hobbies: [ String ]
})

// 创建集合
const User = mongoose.model('User', UserSchema);



// 创建服务器
const app = http.createServer();

// 添加事件
app.on('request', async (req, res) => {
  // 请求方式
  const method = req.method;
  
  let { pathname } = url.parse(req.url);
  // pathname = pathname === '/' ? 'default.html' : pathname;
  console.info(pathname, method)
  if(method === 'GET') {
    // 呈现用户列表页面
    if(pathname === '/list') {
      let users = await User.find();
      let list = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>用户列表</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h6>
            <a href="add.html" class="btn btn-primary">添加用户</a>
          </h6>
          <table class="table table-striped table-bordered">
            <tr>
              <td>用户名</td>
              <td>年龄</td>
              <td>爱好</td>
              <td>邮箱</td>
              <td>操作</td>
            </tr>
      `
      users.forEach(item => {
        let hobbySpan = ``
        item.hobbies.forEach(hobby => {
          hobbySpan += `<span>${hobby}</span>`
        })
        list += `
          <tr>
              <td>${item.name}</td>
              <td>${item.age}</td>
              <td>${hobbySpan}</td>
              <td>${item.email}</td>
              <td>
                <a href="" class="btn btn-danger">删除</a>
                <a href="" class="btn btn-success">修改</a>
              </td>
            </tr>
          `
      })
      list += `
          </table>
        </div>
      </body>
      </html>
      `;
      res.end(list);
    } else if(pathname === '/add') {

    }
  } else if(method == 'POST') {
    if(pathname === '/add') {
      let formData = ''
      res.on('data', (param) => {
        formData += param
      })

      res.on('end', async () => {
        console.log(querystring.parse(formData))
        // 将用户提交的信息添加到数据库中
        await User.create(user);
        res.writeHead(301, {
          Location: '/list'
        });
        res.end();
      })
    }
  }
})

app.listen(3000, () => console.log('启动成功'));
