var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getDiary')

router.post('/list', async function (req, res, next) {
  const { startTime, endTime } = req.body
  try {
    await db.getAllDiary([startTime, endTime]).then(results => {
      res.send({
        data: results
      })
    })
  } catch (err) {
    res.send(err)
  }
});
router.post('/add', async function (req, res, next) {
  const { isWork,isExercise,isPlay,isLearn,energy,mood,summarize } = req.body
  // console.log(req.body)
  const today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  // console.log(today)
  const time = new Date()
  console.log(time)
  const params = [
    isWork ? 1: 0,
    isExercise ? 1: 0,
    isPlay ? 1: 0,
    isLearn ? 1: 0,
    energy,
    mood,
    summarize,
    time,
    today
  ]
  console.log(params)
  try {
    await db.selectDiary([today]).then(results => {
      console.log(results)
      if (results.length === 1) {
        db.updateDiary([...params]).then(results1 => {
          console.log(results1)
          if(results1.affectedRows === 1) {
            res.send({
              message: '更新成功'
            })
          }
        })
      } else {
        db.AddDiary([...params]).then(results1 => {
          console.log(results1)
          if(results1.affectedRows === 1) {
            res.send({
              message: '增加成功'
            })
          }
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;