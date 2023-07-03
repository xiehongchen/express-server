var express = require('express');
var router = express.Router();
const db = require('../config/mysql')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a index');
  const sql = 'SELECT * FROM user'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
});

module.exports = router;
