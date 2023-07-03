var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var db = require('../db/index')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a index');
});

module.exports = router;
