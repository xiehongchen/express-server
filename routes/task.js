var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getTask')

// 获取全部待事件列表
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
// 增加待办事件
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
// 待办事件完成
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
// 删除待办事件
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
// 延期待办事件
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
// 每日任务列表
router.post('/everyDayTask', async function (req, res, next) {
  try {
    await db.getEveryTask().then(results => {
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
// 增加每日任务
router.post('/addEveryDayTask', async function (req, res, next) {
  const { event, date } = req.body
  try {
    if (date) {
      await db.addEveryDayTask2([event, date]).then(results => {
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
    } else {
      await db.addEveryDayTask([event]).then(results => {
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
    }
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})
// 删除每日任务
router.post('/deleteEveryDayTask', async function (req, res, next) {
  const { id } = req.body
  try {
    await db.deleteEveryDayTask([id]).then(results => {
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
// 完成每日任务
router.post('/finishTask', async function (req, res, next) {
  const { id } = req.body
  console.log('id', id)
  try {
    await db.getEveryTaskById([id]).then(res1 => {
      const list = res1.map(item => {
        delete item.id
        item.time = new Date()
        return item
      })
      db.finishEveryDayTask([...list]).then(results => {
        console.log('res', res)
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
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
})
module.exports = router;