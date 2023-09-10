const { executeQuerySky } = require('./index.js')

function getTaskList (params) {
    const sql = 'select * from taskList where status in (?)'
    return executeQuerySky(sql, params)
}

function addTask (params) {
    const sql = 'insert into taskList (event,create_time, expect_time, status) values(?, ?, ?, 0)'
    return executeQuerySky(sql, params)
}

function finishTask (params) {
    const sql = 'update taskList set finish_time = ?, status = 1 where id in (?)'
    return executeQuerySky(sql, params)
}

function deleteTask (params) {
    const sql = 'update taskList set cancel_time = ?, status = 4 where id in (?)'
    return executeQuerySky(sql, params)
}

function delayTask (params) {
    const sql = 'update taskList set delay_time = ?, status = 3 where id in (?)'
    return executeQuerySky(sql, params)
}


module.exports = {
    getTaskList,
    addTask,
    finishTask,
    deleteTask,
    delayTask
}