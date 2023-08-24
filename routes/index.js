var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {
  res.send('首页')
});

module.exports = router;
