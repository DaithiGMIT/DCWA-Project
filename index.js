//Index file for the app

//IMPORTS
const express = require('express')
const ejs = require('ejs')

const app = express()
//Declare Port Number
const portNum = 4001

//HOME PAGE ran at localhost:portNum/
app.get('/', (req,res) => {
    res.send(
        `
        <h2>Home</h2>
        <h3><a href="http://localhost:${portNum}/employees">Employees</a></h3>
        <h3><a href="http://localhost:${portNum}/departments">Departments</a></h3>
        <h3><a href="http://localhost:${portNum}/employeesMongo">Employees(MongoDB)</a></h3>
        `
    )
})

//EMPLOYEES PAGE ran at localhost:portNum/employees
app.get('/employees', (req,res) => {
    res.send(
        `
        <h2>Employees</h2>
        <h1><a href="http://localhost:${portNum}/">Home</a></h1>
        `
    )
})

//DEPARTMENTS PAGE ran at localhost:portNum/departments
app.get('/departments', (req,res) => {
    res.send(
        `
        <h2>Departments</h2>
        <h1><a href="http://localhost:${portNum}/">Home</a></h1>
        `
    )
})

//EMPLOYEES(MONGODB) PAGE ran at localhost:portNum/employeesMongo
app.get('/employeesMongo', (req,res) => {
    res.send(
        `
        <h2>Employees(MongoDB)</h2>
        <h1><a href="http://localhost:${portNum}/">Home</a></h1>
        `
    )
})



//Have the 'node index.js' command listen from the terminal
app.listen(portNum, () => {
    console.log("Server is active on localport:" + portNum)
})


