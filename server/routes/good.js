// var express = require('express');
// var router = express.Router();
// var connection = require('./connect');

// //设置请求头解决跨域
// router.all('*', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// //添加商品路由
// router.post('/goodsadd',(req,res)=>{
//     //接收数据
//     let { goodbarcode,goodname,goodclass,saleprice,marketprice,instock,stockprice,ispromotion } = req.body;
//     //构造sql
//     const sqlStr = `insert into goods(goodbarcode,goodname,goodclass,saleprice,marketprice,instock,stockprice,ispromotion,saletotalprice) 
//                         values('${goodbarcode}','${goodname}','${goodclass}','${saleprice}','${marketprice}','${instock}','${stockprice}',
//                         '${ispromotion}','0')`;

<<<<<<< HEAD
//     connection.query(sqlStr,(err,data)=>{
//        if (err) throw err;
//        if (data.affectedRows>0){
//            res.send({"err_code":0,"reason":"添加成功"});
//        } else{
//            res.send({"err_code":1,"reason":"添加失败"});
//        }
//     });
// });
=======
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows>0){
            res.send({"err_code":0,"reason":"添加成功"});
        } else{
            res.send({"err_code":1,"reason":"添加失败"});
        }
    });
});
>>>>>>> ee33e7454faef02ec20d2a5bfc924cc701d6d918

// //商品列表路由
// router.get('/goodslist',(req,res)=>{
//     //构造sql
//     let sqlStr = "select * from goods";
//     //执行sql
//     connection.query(sqlStr,(err,data)=>{
//         if (err) throw err;
//         res.send(data);
//     });
// });

<<<<<<< HEAD
// module.exports = router;
=======
//删除商品路由
router.get('/goodsdelete',(req,res)=> {
    let id = req.query.id;
    //构造sql
    let sqlStr = `delete from goods where id = ${id}`;
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       if (data.affectedRows > 0){
           res.send({"err_code" : 0,"reason" : "删除成功"});
       } else{
           res.send({"err_code" : 1,"reason" : "删除失败"});
       }
    });
});

//修改商品信息  数据回填路由
router.get('/goodsedit',(req,res)=>{
    let { id } = req.query;
    let sqlStr = `select * from goods where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       res.send(data);
    });
});

//保存修改数据
router.post('/savagoodsedit',(req,res)=>{
    //接收数据
    let { goodbarcode,goodname,goodclass,saleprice,marketprice,instock,stockprice,ispromotion,id } = req.body;
    //构造sql
    const sqlStr = `update goods set goodbarcode='${goodbarcode}',goodname='${goodname}',goodclass='${goodclass}',saleprice='${saleprice}',marketprice='${marketprice}',instock='${instock}',stockprice='${stockprice}',ispromotion='${ispromotion}',saletotalprice='0' where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows>0){
            res.send({"err_code":0,"reason":"修改成功"});
        } else{
            res.send({"err_code":1,"reason":"修改失败"});
        }
    });
});

//批量删除 路由
router.get('/batchDelete',(req,res)=>{
    let {id} = req.query;
    let sqlStr = `delete from goods where id in (${id})`;
    connection.query(sqlStr,(err,data)=>{
       if (err) throw err;
       if (data.affectedRows > 0){
           res.send({"err_code" : 0,"reason":"删除成功"});
       } else {
           res.send({"err_code" : 1,"reason":"删除失败"});
       }
    });
});

//分页
router.get('/goodsByPage',(req,res)=>{
    let { currentPage,pageSize,classify,keyword } = req.query;
    currentPage = currentPage ? currentPage : 1;
    pageSize = pageSize ? pageSize : 3;
    let total = "";
    //构造sql
    let sqlStr = `select * from goods`;
    if (classify !== "" && classify !== "全部"){
        sqlStr += ` where goodclass = "${classify}"`
    }
    if (keyword && classify){
        sqlStr += ` and (goodbarcode like "%${keyword}%" or goodname like "%${keyword}%")`
    }else if (keyword){
        sqlStr += ` where 1 = 1 and (goodbarcode like "%${keyword}%" or goodname like "%${keyword}%")`
    }
    sqlStr += ` order by id desc`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        total = data.length;
        //跳过多少条
        let n = (currentPage - 1) * pageSize;
        sqlStr += ` limit ${n},${pageSize}`;
        connection.query(sqlStr,(err,data)=>{
            if (err) throw err;
            res.send({total,data});
        });
    });
});

module.exports = router;
>>>>>>> ee33e7454faef02ec20d2a5bfc924cc701d6d918
