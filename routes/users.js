var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logIn', function(req, res, next) {
  res.send('login');
});

router.get('/userInfo', function(req, res, next) {
  res.send('userInfo');
});

router.get('/logOff', function(req, res, next) {
  res.send('logOff');
});
module.exports = router;
