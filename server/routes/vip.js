var express = require('express');
var router = express.Router();
var connection = require('./connect');

//设置请求头解决跨域
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
//添加会员  路由
router.post('/vipadd',(req,res)=>{
    let { username,vipnumber,phonenumber,integral,userGrade,discount } = req.body;
    //构造sql
    let sqlStr = `insert into vip(username,vipnumber,phonenumber,integral,userGrade,discount) 
    values('${username}','${vipnumber}','${phonenumber}','${integral}','${userGrade}','${discount}')`;
    //执行sql
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       if (data.affectedRows > 0){
           res.send({"err_code":0,reason:"增加成功"});
       }else{
           res.send({"err_code":1,reason:"增加失败"})
       }
    });
});

//会员列表  路由
// router.get('/viplist',(req,res) => {
// //     //构造sql
// //     let sqlStr = `select * from vip order by id desc`;
// //     //执行sql
// //     connection.query(sqlStr,(err,data)=>{
// //        if (err) throw err;
// //        res.send(data)
// //     });
// // });

//分页会员列表  路由
router.get('/vipByPage',(req,res)=>{
    let { currentPage,pageSize } = req.query;
    currentPage = currentPage ? currentPage : 1;
    pageSize = pageSize ? pageSize : 3;
    //构造sql
    let sqlStr = `select * from vip order by id desc`;
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       let total = data.length;
        //跳过多少条
        let n = (currentPage - 1) * pageSize;
        sqlStr += ` limit ${n},${pageSize}`;
        connection.query(sqlStr,(err,data)=>{
           if (err) throw err;
           res.send({total,data});
        });
    });
});

//删除会员 路由
router.get('/vipdelete',(req,res)=>{
    //接收前端发送的数据
    let id = req.query.id;
    //构造sql
    let sqlStr = `delete from vip where id=${id}`;
    console.log(sqlStr);
    //执行sql
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       if (data.affectedRows > 0){
           res.send({"err_code":0,"reason":"删除成功"})
       }  else {
           res.send({"err_code":1,"reason":"删除失败"})
       }
    });
});

//修改会员 路由  数据回填
router.get('/backfill',(req,res)=>{
   let id = req.query.id;
   //构造sql
    let sqlStr = `select * from vip where id=${id}`;
    //执行sql
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       res.send(data)
    });
});

//修改会员  保存新数据 路由
router.post('/savevipedit',(req,res)=>{
    let {username,vipnumber,phonenumber,integral,userGrade,discount,editId} = req.body;
    //构造sql
    let sqlStr = `update vip set username='${username}',vipnumber='${vipnumber}',phonenumber='${phonenumber}',
                    integral='${integral}',userGrade='${userGrade}',discount='${discount}' where id=${editId};`;
    //执行sql
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       console.log(data.affectedRows);
       if (data.affectedRows > 0){
           res.send({"err_code":0,"reason":"修改成功"});
       } else {
           res.send({"err_code":1,"reason":"修改失败"});
       }
    });
});

//批量删除 路由
router.get('/batchdelete',(req,res)=> {
    let { id } = req.query;
    //构造sql
    let sqlStr = `delete from vip where id in (${id})`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows > 0){
            res.send({"err_code":0,"reason":"删除成功"});
        } else {
            res.send({"err_code":1,"reason":"删除失败"});
        }
    });
});


module.exports = router;