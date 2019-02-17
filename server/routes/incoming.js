const express = require('express');
const router = express.Router();
const connection = require('./connect')  

//设置请求头解决跨域 
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
  })
  

  module.exports = router;