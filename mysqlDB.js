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

//Function to update employee details
//Chooses employee to populate form to edit details
var editEmployee = function (eid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from employee where eid=?',
            values: [eid]
        }

        mysqlPool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//updates employee data which user has entered
var editEmployeeDB = function (eid, ename, role, salary) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'update employee set ename = ?, role = ?, salary = ? where eid = ?',
            values: [ename, role, salary, eid]
        }

        mysqlPool.query(mySqlQuery)
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
module.exports = { getEmployees, editEmployee, editEmployeeDB, getDepartments}

