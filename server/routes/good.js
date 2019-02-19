var express = require('express');
var router = express.Router();
var connection = require('./connect');

//设置请求头解决跨域
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//添加商品路由
router.post('/goodsadd',(req,res)=>{
    //接收数据
    let { goodbarcode,goodname,goodclass,saleprice,marketprice,instock,stockprice,ispromotion } = req.body;
    //构造sql
    const sqlStr = `insert into goods(goodbarcode,goodname,goodclass,saleprice,marketprice,instock,stockprice,ispromotion,saletotalprice) 
                        values('${goodbarcode}','${goodname}','${goodclass}','${saleprice}','${marketprice}','${instock}','${stockprice}',
                        '${ispromotion}','0')`;

    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       if (data.affectedRows>0){
           res.send({"err_code":0,"reason":"添加成功"});
       } else{
           res.send({"err_code":1,"reason":"添加失败"});
       }
    });
});

//商品列表路由
router.get('/goodslist',(req,res)=>{
    //构造sql
    let sqlStr = "select * from goods";
    //执行sql
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;