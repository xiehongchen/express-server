var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getHome')
const fs = require('fs')

router.get('/tags', async function (req, res, next) {
  try {
    await db.getAllTags().then(results => {
      res.send(results)
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.get('/classify', async function (req, res, next) {
  try {
    await db.getAllClassify().then(results => {
      res.send(results)
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.get('/blogs', async function (req, res, next) {
  try {
    await db.getAllBlogs().then(results => {
      res.send(results)
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/markdown', async function (req, res, next) {
  const filePath = './uploads/markdown/file.md'
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('服务器内部错误')
    }
    res.send(data)
  })
})

module.exports = router;