var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getHome')
/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    await db.getAllArticles().then(results => {
      res.send(results)
    })
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;
