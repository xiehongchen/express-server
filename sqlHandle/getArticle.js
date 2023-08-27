const { executeQuerySky } = require('./index.js')

function getAllArticle (params = []) {
  let sql = 'select * from article'
  if (params.length > 0) {
    sql += ' limit ? offset ?'
    return executeQuerySky(sql, params)
  } else {
    return executeQuerySky(sql)
  }
}

function addArticle (params = []) {
  const sql = 'insert into article (title, author, createTime, introduction, website, status, note, source) values(?,?,?,?,?,?,?,?)'
  return executeQuerySky(sql, params)
}

function isHasArticle (params = []) {
  const sql = 'select * from article where website = ?'
  return executeQuerySky(sql, params)
}

function editArticle (params = []) {
  let sql = 'update article set introduction = ?, note = ?'
  console.log('adasda', params)
  if (params[1]) {
    sql += ', status = 2 '
  } else {
    sql += ', status = 1 '
  }
  sql += 'where website = ?'
  return executeQuerySky(sql, params)
}

function deleteArticle (params = []) {
  const sql = 'delete from article where website = ?'
  return executeQuerySky(sql, params)
}

function selectArticle(params = []) {
  let sql = `select * from article where title like '%${params[0]}%'`
  if (params.length > 1) {
    sql += ' limit ? offset ?'
    return executeQuerySky(sql, params.slice(1, params.length + 1))
  }
  return executeQuerySky(sql)
}

module.exports = {
  getAllArticle,
  addArticle,
  isHasArticle,
  editArticle,
  deleteArticle,
  selectArticle
}