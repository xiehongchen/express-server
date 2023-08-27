var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getArticle')
const { crawlAndParseArticle } = require('../utils/scheduledTasks/craw')

router.post('/add', async function (req, res, next) {
  const { title, introduction, author, website, note, source } = req.body
  const status = note ? 2 : 1
  const currentTime = new Date();
  const params = [
    title,
    author,
    currentTime,
    introduction,
    website,
    status,
    note,
    source,
  ]
  try {
    await db.isHasArticle([website]).then(results => {
      // console.log(results)
      if (results.length > 0) {
        res.send({
          answer: false,
          message: '文章已存在'
        })
      } else {
        db.addArticle(params).then(results => {
          // console.log(results)
          res.send({
            answer: true
          })
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

router.post('/addByUrl', async function (req, res, next) {
  const { website, tab } = req.body
  // console.log(website)
  // 获取当前时间
  const currentTime = new Date();
  let title = ''
  let author = ''
  if (!website.includes('juejin') && !website.includes('cnblogs')) {
    res.send({
      answer: false,
      message: '目前仅支持掘金文章、博客园'
    })
    return
  }
  await crawlAndParseArticle(website).then(data => {
    title = data.title
    author = data.author
  })

  // 将当前时间增加8个小时
  // currentTime.setHours(currentTime.getHours() + 8);
  const params = [
    title,
    author,
    currentTime,
    '',
    website,
    1,
    '',
    tab
  ]
  try {
    await db.isHasArticle([website]).then(results => {
      // console.log(results)
      if (results.length > 0) {
        res.send({
          answer: false,
          message: '文章已存在'
        })
      } else {
        db.addArticle(params).then(results => {
          // console.log(results)
          res.send({
            answer: true
          })
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
});

router.post('/list', async function (req, res, next) {
  const { tab, page, size } = req.body
  // console.log(page, size)
  try {
    let total
    await db.getAllArticle().then(results => {
      total = results.length
    })
    await db.getAllArticle([size , (page - 1) * size]).then(results => {
      // console.log(results)
      res.send({
        total: total,
        data: results
      })
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});
router.post('/edit', async function (req, res, next) {
  const { introduction, note, website } = req.body
  // console.log(introduction)
  try {
    await db.editArticle([introduction, note, website]).then(results => {
      // console.log(results)
      res.send({
        answer: true
      })
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
});

router.post('/delete', async function (req, res, next) {
  const { website } = req.body
  try {
    await db.deleteArticle([website]).then(results => {
      // console.log(results)
      res.send({
        answer: true
      })
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
});

router.post('/select', async function (req, res, next) {
  const { title, page, size } = req.body
  // console.log(title)
  try {
    let total
    await db.selectArticle([title]).then(results => {
      total = results.length
    })
    await db.selectArticle([title, size , (page - 1) * size]).then(results => {
      res.send({
        total: total,
        data: results
      })
    })
  } catch (err) {
    console.log(err)
    res.send({
      answer: false
    })
  }
});

module.exports = router;