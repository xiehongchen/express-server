const { executeQuery, executeQuerySky } = require('./index.js')

function getAllTags () {
    const sql = 'select * from tags'
    return executeQuery(sql)
}

function getAllClassify () {
    const sql = 'select * from classList'
    return executeQuery(sql)
}

function getAllBlogs () {
    const sql = 'select * from blogList'
    return executeQuery(sql)
}


module.exports = {
    getAllTags,
    getAllClassify,
    getAllBlogs,
}