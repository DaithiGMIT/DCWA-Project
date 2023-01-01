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
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//Function to update employee details
//Recieves the employee details from the selected row and displays it to the page
var editEmployee = function (eid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            //takes eid from col and searches the mySQL for the rest of the details
            sql: 'select * from employee where eid=?',
            values: [eid]
        }

        mysqlPool.query(mySqlQuery)
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//Takes new employee details and updates the data in mySQL then redirects back to the employee page
var editEmployeeDB = function (eid, ename, role, salary) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            //Updates the mysql with the new data entered
            sql: 'update employee set ename = ?, role = ?, salary = ? where eid = ?',
            values: [ename, role, salary, eid]
        }

        mysqlPool.query(mySqlQuery)
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//Function to check all existing EIDS in the db to see if there is a match for the given eid
var checkEID = function (eid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from employee where eid like ?',
            values: [eid]
        }
        mysqlPool.query(mySqlQuery)
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//Function to query all data from the dept table
var getDepartments = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM dept')
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//Function to remove the department from the mySQL DB
var deleteDepartment = function (did) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            //Uses department id from the row to specify the department to be deleted
            sql: 'delete from dept where did = ?',
            values: [did]
        }

        mysqlPool.query(mySqlQuery)
            .then((data) => { resolve(data) }).catch((error) => { reject(error) })
    })
}

//export functions for use outside this page
module.exports = { getEmployees, editEmployee, editEmployeeDB, checkEID, getDepartments, deleteDepartment }

