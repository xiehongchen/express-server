var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/test')
/* GET home page. */
router.get('/', async function (req, res, next) {
  const data = {
    blogPool: [],
    skyPool: []
  }
  try {
    await db.getAllUsers().then(results => {
      console.log(results)
      res.send(results)
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;
