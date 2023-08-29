const { executeQuerySky } = require('./index.js')

function getAllDiary (params = []) {
  let sql = 'select * from diary where DATE(time) between ? and ?'
  // let sql = 'delete from diary'
  // let sql = 'SHOW COLUMNS FROM diary'
  return executeQuerySky(sql, params)
}

function selectDiary (params = []) {
  let sql = 'select * from diary where DATE(time) = ?'
  return executeQuerySky(sql, params)
}

function AddDiary (params = []) {
  let sql = 'insert into diary (isWork,isExercise,isLearn,isPlay,energy,mood,summarize, time) values(?)'
  return executeQuerySky(sql, params)
}

function updateDiary (params = []) {
  let sql = 'update diary set isWork = ?,isExercise = ?,isLearn=?,isPlay=?,energy=?,mood=?,summarize=?, time = ? where DATE(time) = ?'
  return executeQuerySky(sql, params)
}

module.exports = {
  getAllDiary,
  AddDiary,
  selectDiary,
  updateDiary
}