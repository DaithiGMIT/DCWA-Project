//Main code for accessing the mysql database

//IMPORTS
const mysql = require('promise-mysql')

//Declare a var to store the created pool
var mysqlPool;

//Create Pool
//PASSWORD MAY NEED TO BE CHANGED DEPENDING ON YOUR LOCAL MYSQL SETTINGS
mysql.createPool({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'proj2022'
}).then(data => { mysqlPool = data }).catch((error) => { console.log(error) })

//Function to query all data from the employee table
var getEmployees = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM employee')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
//Function to query all data from the dept table
var getDepartments = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM dept')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//export functions for use outside this page
module.exports = {getEmployees, getDepartments}

