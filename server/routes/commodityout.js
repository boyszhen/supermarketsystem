const express = require('express'); 
const router = express.Router();
const connection = require('./connect');

//设置请求头解决跨域 
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
router.post('/goodsadd',(req,res)=>{
  let {ordernum,goodname,number,actualprice,offer,refund} = req.body;
   //把数据存入数据库
  //构造添加账号的sql语句
  const sqlStr = `insert into commodityout(ordernum,goodname,number,actualprice,offer,refund) values('${ordernum}', '${goodname}', '${number}', '${actualprice}', '${offer}', '${refund}')`;
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
// //显示库存
// router.get('/accountinstocklist', (req, res) => {
//   // 查询所有账号数据(按照时间排序)
//   // 构造查询所有用户数据的sql语句
//   const sqlStr = 'select * from commodityout order by ctime desc';
//   // 执行sql语句
//   console.log(sqlStr)
//   connection.query(sqlStr, (err, data) => {
//     if (err) throw err;
//     // 把查询到的数据响应给前端
//     res.send(data);
//     console.log(data)
//   })
// })
//按分页显示数据
router.get('/accountlistbypage', (req, res) => {
  //接收前端参数
  let { pageSize, currentPage,serch } = req.query;
  // 默认值
  //当页面没有时
  pageSize = pageSize ? pageSize : 3;
  //当前页面
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = `select * from commodityout where 1 = 1`;
  // console.log(sqlStr)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err
    //计算数据总条数
    let total = data.length;
    // 分类名不为空 且 全部 那么 就拼接分类条件
   
    // 如果关键字不为空 就要拼接关键字查询条件
    if (serch !== "") {
      sqlStr += ` and (goodname like "%${serch}%" or ordernum like "%${serch}%")`
    }
    // 再次按照 查询的条件查询数据 重新计算数据的总条数
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      total = data.length;
    })
     // 拼接排序
     sqlStr += ` order by ctime desc`;
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
      console.log("2",total,"1",data)
    })
  })
})
//删除
router.get('/accountinstockdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造sql语句
  let sqlStr = ` delete from commodityout where id = ${id}`;
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
  const sqlStr = `select * from commodityout where id = ${id}`;
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
  let { ordernum, goodname, number, actualprice, offer, refund, editId } = req.body;

  //构造sqlyuju
  const sqlStr = `update commodityout set ordernum="${ordernum}",goodname="${goodname}",number="${number}",actualprice="${actualprice}",offer="${offer}",refund="${refund}" where id = ${editId};`;
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
  let sqlStr = `delete from commodityout where id in (${selectId})`
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
//退货
router.get('/goodreturn',(req,res)=>{
  let {serch}=req.query
  let sqlStr = `select *from commodityout where refund = '${serch}'`
  console.log(sqlStr)
   connection.query(sqlStr,(err,data)=>{
  
      res.send(data)
      
    
  })
})
//baobiao
router.get('/baotable',(req,res)=>{
  let sqlStr = 'selct * from commodityout'
  connection.query(sqlStr,(err,data)=>{
    res.send(data)
  })
})
module.exports = router;
