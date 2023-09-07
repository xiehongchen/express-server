const { executeQuerySky } = require('./index.js')

function getTaskList (params) {
    const sql = 'select * from taskList where status= ?'
    return executeQuerySky(sql, params)
}

function addTask (params) {
    const sql = 'insert into taskList (event,create_time, finish_time, status) values(?, ?, ?, 0)'
    return executeQuerySky(sql, params)
}

module.exports = {
    getTaskList,
    addTask
}