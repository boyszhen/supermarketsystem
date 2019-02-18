const express = require('express'); 
const router = express.Router();
const connection = require('./connect')

//设置请求头解决跨域 
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next();
})
//添加库存
router.post('/incomingadd', (req, res) => {
  let { producbarcode, goodname, purchaseprice, storabge, instock, sold } = req.body
  //把数据存入数据库
  //构造添加账号的sql语句
  const sqlStr = `insert into incoming(producbarcode,goodname,purchaseprice,storabge,instock,sold) values('${producbarcode}', '${goodname}', '${purchaseprice}', '${storabge}', '${instock}', '${sold}')`;
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
//显示库存
router.get('/accountinstocklist', (req, res) => {
  // 查询所有账号数据(按照时间排序)
  // 构造查询所有用户数据的sql语句
  const sqlStr = 'select * from incoming order by ctime desc';
  // 执行sql语句
  console.log(sqlStr)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 把查询到的数据响应给前端
    res.send(data);
    console.log(data)
  })
})
//删除
router.get('/accountinstockdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造sql语句
  let sqlStr = ` delete from incoming where id = ${id}`;
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
//修改库存路由
router.get('/accountinstockedit', (req, res) => {
  // 接收id 
  let { id } = req.query;
  // 构造sql
  const sqlStr = `select * from incoming where id = ${id}`;
  // 执行sql 
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 把查询的数据返回给前端
    res.send(data);
  })
})
//保存修改
router.post('/saveeditaccountinstock', (req, res) => {
  //接收后端传来的新数据和原来的id
  let { producbarcode, goodname, purchaseprice, storabge, instock, sold, editId } = req.body;

  //构造sqlyuju
  const sqlStr = `update incoming set producbarcode="${producbarcode}",goodname="${goodname}",purchaseprice="${purchaseprice}",storabge="${storabge}",instock="${instock}",sold="${sold}" where id = ${editId};`;
  console.log(sqlStr)
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
//批量删除
router.get('/batchdelete', (req, res) => {
  //接收前端传入的id
  let { selectId } = req.query
  //构造sql语句
  let sqlStr = `delete from incoming where id in (${selectId})`
  connection.query(sqlStr, (err, data) => {
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "修改数据数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "修改数据失败" });
    }
  })
})
//分页
//按分页显示数据
router.get('/accountlistbypage', (req, res) => {
  //接收前端参数
  let { pageSize, currentPage } = req.query;
  // 默认值
  //当页面没有时
  pageSize = pageSize ? pageSize : 3;
  //当前页面
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = `select *from incoming order by ctime desc`;
  // console.log(sqlStr)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err
    //计算数据总条数
    let total = data.length;
    //分页条件 跳过几条
    let n = (currentPage - 1) * pageSize
    //拼接sql语句
    sqlStr += ` limit ${n},${pageSize}`;
    // console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
      if (err) throw err
      //把数据返回给前端  数据总条数total  对应页码数据data
      res.send({
        total:total,
        data:data
      })
    })
  })
})
module.exports = router;