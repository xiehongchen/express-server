var express = require('express');
var router = express.Router();
const {blogPool} = require('../config/mysql')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/login', function (req, res, next) {
  const { username, password } = req.query
  console.log(req.query)
  console.log(username, password)
  const sql = 'SELECT * FROM user WHERE name = ? AND password = ?'
  blogPool.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        const token = jwt.sign({ id: result[0].id }, 'sdudy', {
          expiresIn: 60 * 60 * 24 * 7
        })
        res.send({
          code: 0,
          msg: '登录成功',
          token
        })
      } else {
        res.send({
          code: 1,
          msg: '用户名或密码错误'
        })
      }
    }
  })
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body
  const select_sql = 'SELECT * FROM user WHERE name = ?'
  blogPool.query(select_sql, [username], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      if (result.length > 0) {
        res.send({
          code: 1,
          msg: '用户名已存在'
        })
      } else {
        const sql = 'INSERT INTO user (name, password) VALUES (?, ?)'
        blogPool.query(sql, [username, password], (err, result) => {
          if (err) {
            console.log(err)
          } else {
            res.send({
              code: 0,
              msg: '注册成功'
            })
          }
        })
      }
    }
  })
});

router.get('/userInfo', function (req, res, next) {
  res.send('userInfo');
});

router.get('/logOff', function (req, res, next) {
  res.send('logOff');
});
module.exports = router;
