var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getTodo')

router.get('/list', async function (req, res, next) {
  const { status } = req.body
  try {
    await db.getTodoList(['1']).then(results => {
      // console.log(results)
      res.send({
        answer: true,
        data: results
      })
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})

module.exports = router;