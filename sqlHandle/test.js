const { executeQuery } = require('./index.js')

function getAllUsers() {
    const sql = 'select * from user'
    return executeQuery(sql)
}

module.exports = {
    getAllUsers
}