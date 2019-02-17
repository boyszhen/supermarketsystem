const express = require('express');
const router = express.Router();
const connection = require('./connect') 

/* GET users listing. */
//设置请求头解决跨域 
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next();
})
//添加账号路由
router.post('/accountadd', (req, res) => {
  let { user, pass, group } = req.body
  //把数据存入数据库
  //构造添加账号的sql语句
  const sqlStr = `insert into account(username,password,usergroup) values('${user}', '${pass}', '${group}')`;
  console.log(sqlStr)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "插入数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "插入数据失败" });
    }
  })
})  
//显示账号列表路由
router.get('/accountlist', (req, res) => {
  // 查询所有账号数据(按照时间排序)
  // 构造查询所有用户数据的sql语句
  const sqlStr = 'select * from account order by ctime desc';
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 把查询到的数据响应给前端
    res.send(data);
  })
})
//删除账号路由
router.get('/accountdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造sql语句
  let sqlStr = ` delete from account where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "删除数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "删除数据失败" });
    }
  })
})
//修改账号路由
router.get('/accountedit', (req, res) => {
  // 接收id 
  let { id } = req.query;
  // 构造sql
  const sqlStr = `select * from account where id = ${id}`;
  // 执行sql 
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 把查询的数据返回给前端
    res.send(data);
  })
})
//保存修改的路由
router.post('/saveeditaccount', (req, res) => {
  //接收后端传来的新数据和原来的id 
  let { username, usergroup, editId } = req.body;
  console.log(username,usergroup,editId)
  //构造sqlyuju
  const sqlStr = `update account set username='${username}', usergroup='${usergroup}' where id=${editId}`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "修改数据数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "修改数据失败" });
    }
  })
})
//批量删除路由
router.get('/batchdelete',(req,res)=>{
  //接收前端传入的id
  let { selectId } = req.query
  //构造sql语句
  let sqlStr = `delete from account where id in (${selectId})`
  connection.query(sqlStr,(err,data)=>{
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "修改数据数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "修改数据失败" });
    }
  })
})
//按分页显示数据
router.get('/accountlistbypage',(req,res)=>{
   // 接收前端参数
   let {pageSize, currentPage} = req.query;
   // 默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = `select *from account order by ctime desc`;
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err 
    //计算数据总条数
    let total =data.length;
    //分页条件 跳过几条
    let n = (currentPage - 1)*pageSize
    //拼接sql语句
    sqlStr+= ` limit ${n},${pageSize}`;
    console.log(sqlStr)
    connection.query(sqlStr,(err,data)=>{
      if(err) throw err
      //把数据返回给前端  数据总条数total  对应页码数据data
      res.send({
        total,
        data
      })
    })
  })
})
module.exports = router; 
