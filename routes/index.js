var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var db = require('../db/index')
/* GET home page. */
router.get('/', function (req, res, next) {
  let conn = mysql.createConnection(db);
  console.log(conn)
  conn.query('select * from people', function (err, results, fields) {
    if (err) {
      console.log(err)
    }
    console.log(results)//输出查询结果
    res.send(results)
  })
  //3、关闭数据库的连接
  conn.end((err) => {
    if (err) {
      console.log(err)
      return
    }
  })
});

module.exports = router;
