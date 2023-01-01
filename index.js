//Index file for the app

//IMPORTS
const express = require('express')
const ejs = require('ejs')
const mysqlDB = require('./mysqlDB')
const mongoDB = require('./mongoDB')
var bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

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

//EDIT EMPLOYEE PAGE AT localhost:portNum/employees/edit/:eid
app.get('/employees/edit/:eid', (req, res) => {
    //Recieves the employee details from the selected row and displays it to the page
    mysqlDB.editEmployee(req.params.eid)
        .then((result) => {
            res.render('editEmployees', { editEmployee: result })
        })
        .catch((error) => {
            console.log(error)
        })
})

//Takes new employee details and updates the data in mySQL then redirects back to the employee page
app.post('/employees/edit/:eid', (req, res) => {
    mysqlDB.editEmployeeDB(req.body.eid, req.body.ename, req.body.role, req.body.salary)
        .then((result) => {
            res.redirect("/employees")
        })
        .catch((error) => {
            console.log(error)
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
    mongoDB.getEmployeesMongoDB()
        .then((data) => {
            res.render('employeesMongo', { employees: data })
        })
        .catch(() => {
            res.send('error')
        })
})



//Have the 'node index.js' command listen from the terminal
app.listen(portNum, () => {
    console.log("Server is active on localport:" + portNum)
})


