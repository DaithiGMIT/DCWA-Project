//Main code for accessing the mongoDB database

//IMPORTS
var MongoClient = require('mongodb').MongoClient;

//Declare Variable
var database;
var collection;

//Connect to mongo and recieve the db and collection
MongoClient.connect('mongodb://localhost:27017')//27017 is my MongosLocal Address may have to be chsnged on your machine
    .then((client) => {
        database = client.db('employeesDB')
        collection = database.collection('employees')
    })
    .catch((error) => {
        console.log(error.message)
    })

//Getting all employee data from the collection and storing as an array before sending in function
function getEmployeesMongoDB() {
    return new Promise((resolve, reject) => {
        c = collection.find()
        c.toArray()
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Export Funtctions to be used elsewhere
module.exports = {getEmployeesMongoDB}