//Index file for the app

//IMPORTS
const express = require('express')
const ejs = require('ejs')
const mysqlDB = require('./mysqlDB')
var bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs');

//Declare Port Number
const portNum = 4001

//HOME PAGE ran at localhost:portNum/
app.get('/', (req, res) => {
    res.send(
        `
        <h2>Home</h2>
        <h3><a href="http://localhost:${portNum}/employees">Employees</a></h3>
        <h3><a href="http://localhost:${portNum}/depts">Departments</a></h3>
        <h3><a href="http://localhost:${portNum}/employeesMongoDB">Employees(MongoDB)</a></h3>
        `
    )
})

//EMPLOYEES PAGE ran at localhost:portNum/employees
app.get('/employees', (req, res) => {
    mysqlDB.getEmployees()
        .then((result) => {
            res.render('employees', { employees: result})
        })
        .catch((error) => {
            res.send(error)
        })
})

//DEPARTMENTS PAGE ran at localhost:portNum/depts
app.get('/depts', (req, res) => {
    mysqlDB.getDepartments()
        .then((result) => {
            res.render('departments', { departments: result})
        })
        .catch((error) => {
            res.send(error)
        })
})

//EMPLOYEES(MONGODB) PAGE ran at localhost:portNum/employeesMongoDB
app.get('/employeesMongoDB', (req, res) => {
    res.send(
        `
        <h2>Employees(MongoDB)</h2>
        <h3><a href="http://localhost:${portNum}/">Home</a></h3>
        `
    )
})



//Have the 'node index.js' command listen from the terminal
app.listen(portNum, () => {
    console.log("Server is active on localport:" + portNum)
})


