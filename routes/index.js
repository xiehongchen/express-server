var express = require('express');
var router = express.Router();
const { blogPool, skyPlool } = require('../config/mysql')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a index');
  const sql = 'SELECT * FROM user'
  blogPool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('blogPool', result)
    }
  })
  skyPlool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('skyPlool', result)
    }
  })
});

module.exports = router;
