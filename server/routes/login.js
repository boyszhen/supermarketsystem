var express = require('express');
var router = express.Router();
//连接数据库模块
const connection = require("./connect");
//引入jwt
const jwt = require("jsonwebtoken");
//定义密码
const secretKey = "pwdkey";
/* GET users listing. */
//设置请求头解决跨域 
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录路由 
router.post('/checklogin',(req,res)=>{ 
  //接收前端传来的数据
  let { username,password } = req.body;
  //构造sql语句从数据库查找当前登录账号和密码是否存在
  let sqlStr = `select * from account where username='${username}' and password='${password}'`;
  // console.log(sqlStr)
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断 如果不存在
    if(!data.length){
      res.send({'error_code':1,'reason':'请检查用户名和密码'});
    }else{
      //处理当前数据对象
      const obj = data[0];
      const objStr = JSON.stringify(obj);
      const accountInfo = JSON.parse(objStr);
      
      //生成token
      const token = jwt.sign(accountInfo,secretKey,{expiresIn:60 * 60 });
      res.send({'error_code':0,'reason':'登录成功！',token,username});
    }
  

  })
}) 
module.exports = router;
