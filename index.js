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
            res.render('employees', { employees: result })
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
            res.render('departments', { departments: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Recieves the department id and tries to delete, if not successful diplays a message on the page saying so, if successful then returns to the depts page
app.get("/depts/delete/:did", (req, res) => {
    mysqlDB.deleteDepartment(req.params.did)
        .then((data) => {
            res.redirect("/depts")
        })
        .catch((error) => {
            console.log(error)
            res.send(`
            <h1>Error Message</h1>
            <h2>${req.params.did} has employees and cannot be deleted</h2>
            <h3><a href="http://localhost:${portNum}/">Home</a></h3>
        `)
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

//ADD EMPLOYEE(MONGODB) Page ran at localhost:portNum/addEmployeeMongo
app.get('/employeesMongoDB/add', (req, res) => {
    res.render("addEmployeeMongo")
})

//POST METHOD to check eid against mongo and sql databases
app.post('/employeesMongoDB/add', (req, res) => {
    //Calls the function to see iuf there is a match in the sql db if the results are not null then there is a match
    mysqlDB.checkEID(req.body._id).then((result) => {
        if (result[0] != null) {
            //If matched in the sql database then attempt to add to mongo database
            mongoDB.addEmployeeMongo(req.body._id, req.body.phone, req.body.email)
                .then((result) => {
                    //If successful then redirect to the employees mongo page
                    res.redirect("/employeesMongoDB")
                })
                .catch((error) => {
                    //If the adding fails then there must be a matching eid allready in the mongo db
                    res.send(`
                <h1>Error Message</h1>
                <h2>Error: EID ${req.body._id} already exist in MongoDB</h2>
                <h3><a href="http://localhost:${portNum}/">Home</a></h3>
            `)
                })
        }

        else {
            res.send(`
                <h1>Error Message</h1>
                <h2>Employee ${req.body._id} doesn't exist in MYSQL DB</h2>
                <h3><a href="http://localhost:${portNum}/">Home</a></h3>
            `)
        }
    })
        .catch((error) => {
            console.log(error)
        })
})


//Have the 'node index.js' command listen from the terminal
app.listen(portNum, () => {
    console.log("Server is active on localport:" + portNum)
})


