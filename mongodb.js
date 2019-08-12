//CRUD

const mongodb = require("mongodb")

const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017"
const datbaseName = "task-management"

mongodb.connect(connectionURL,{useNewUrlParser: true}, (error, client)=>{

    if(error){
        return console.log("Unable to connect to database");
    }

    const db = client.db(datbaseName);
    console.log("Connected to db")
    
})