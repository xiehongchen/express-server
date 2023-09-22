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

function getEveryTask (params) {
    const sql = 'select * from every_task'
    return executeQuerySky(sql, params)
}
function getEveryTaskById (params) {
    const sql = 'select * from every_task where id in (?)'
    return executeQuerySky(sql, params)
}

function addEveryDayTask (params) {
    const sql = 'insert into every_task (event) values(?)'
    return executeQuerySky(sql, params)
}
function addEveryDayTask2 (params) {
    const sql = 'insert into every_task (event, time) values(?, ?)'
    return executeQuerySky(sql, params)
}

function finishEveryDayTask(params) {
    // 构建参数化插入查询
    const placeholders = params.map(() => '(?, ?)').join(', ');
    const values = params.flatMap(item => [item.event, item.time]);
    const sql = `INSERT INTO finish_task (event, time) VALUES ${placeholders}`;
    return executeQuerySky(sql, values);
}
  

function deleteEveryDayTask (params) {
    const sql = 'DELETE FROM every_task WHERE id in (?)'
    return executeQuerySky(sql, params)
}

module.exports = {
    getTaskList,
    addTask,
    finishTask,
    deleteTask,
    delayTask,
    getEveryTask,
    getEveryTaskById,
    addEveryDayTask,
    addEveryDayTask2,
    finishEveryDayTask,
    deleteEveryDayTask
}