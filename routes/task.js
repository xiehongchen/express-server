var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getTask')

router.get('/list', async function (req, res, next) {
  const {status} = req.query
  console.log('status', status)
  try {
    await db.getTaskList([status]).then(results => {
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

router.post('/add', async function (req, res, next) {
  const { event } = req.body
  try {
    await db.addTask([event, new Date()]).then(results => {
      console.log(results)
      res.send({
        answer: true,
      })
    })
  } catch (err) {
    res.send({
      answer: false
    })
  }
})

module.exports = router;