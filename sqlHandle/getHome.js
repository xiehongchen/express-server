const { executeQuery } = require('./index.js')

function getAllTags () {
    const sql = 'select * from tags'
    return executeQuery(sql)
}

module.exports = {
    getAllTags
}