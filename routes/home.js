var express = require('express');
var router = express.Router();
const db = require('../sqlHandle/getHome')

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

module.exports = router;