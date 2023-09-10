var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getTask')

router.post('/list', async function (req, res, next) {
  const {status} = req.body
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
  const { event, expectTtime } = req.body
  const expect_time = new Date(expectTtime)
  console.log('expect_time', expect_time)
  try {
    await db.addTask([event, new Date(), expect_time]).then(results => {
      console.log(results)
      res.send({
        answer: true,
      })
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})

router.post('/finish', async function (req, res, next) {
  const { id } = req.body
  console.log('id', id)
  try {
    await db.finishTask([new Date(), id]).then(results => {
      console.log(results)
      if (results.affectedRows > 0) {
        res.send({
          answer: true,
        })
      } else {
        res.send({
          answer: false
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})

router.post('/delete', async function (req, res, next) {
  const { id } = req.body
  console.log('id', id)
  try {
    await db.deleteTask([new Date(), id]).then(results => {
      console.log(results)
      if (results.affectedRows > 0) {
        res.send({
          answer: true,
        })
      } else {
        res.send({
          answer: false
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})

router.post('/delay', async function (req, res, next) {
  const { id, delayTime } = req.body
  const delay_time = new Date(delayTime)
  console.log('id', id)
  try {
    await db.delayTask([delay_time, id]).then(results => {
      console.log(results)
      if (results.affectedRows > 0) {
        res.send({
          answer: true,
        })
      } else {
        res.send({
          answer: false
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})

module.exports = router;