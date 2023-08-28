const { executeQuerySky } = require('./index.js')

function getAllDiary (params = []) {
  let sql = 'select * from diary'
  return executeQuerySky(sql)
}