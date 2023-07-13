const { blogPool } = require('../config/mysql')

// 封装查询方法
function executeQuery (sql, params = []) {
    return new Promise((resolve, reject) => {
        blogPool.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    executeQuery
}