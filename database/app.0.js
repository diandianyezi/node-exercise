const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('数据库连接成功'))
.catch(error => console.log(error, '数据库连接失败'))


const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

// 方式一：向集合中插入数据
// const course = new Course({
//   name: 'Nodejs Course',
//   author: '讲师',
//   isPublished: false
// });

// // 将数据保存到数据库中
// course.save();

// 向集合中插入数据的方式二
// Course.create({
//   name: 'test',
//   author: 'zt',
//   isPublished: false
// }).then(doc => console.log(doc))
// .catch(err => console.log(err))

// 查询集合中的所有文档
// find返回的都是一个数组
Course.find().then(result =>console.info(result)); 
Course.find({
  _id: '65d89f1e38a94f4880f05231'
}).then(result =>console.info(result)); 

// findOne方法返回一条数据
Course.findOne().then(result =>console.info(result)); 
Course.findOne({
  author: '讲师'
}).then(result =>console.info(result)); 

// 匹配大于 小于
User.find({
  age: { $gt: 20, $lt: 50 }
}).then(res => console.info(res));

// 匹配包含
User.find({
  hobbies: {$in: ['敲代码']}
}).then(res => console.info(res))