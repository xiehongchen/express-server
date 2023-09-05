const { executeQuerySky } = require('./index.js')

function getTodoList (params) {
    const sql = 'select * from todos where is_finish = ?'
    return executeQuerySky(sql, params)
}

module.exports = {
    getTodoList,
}