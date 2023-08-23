const { blogPool, skyPlool } = require('../config/mysql')

// 封装方法
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

function executeQuerySky (sql, params = []) {
    return new Promise((resolve, reject) => {
        skyPlool.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    executeQuery,
    executeQuerySky
}