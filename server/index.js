const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = 3777;

app.use(bodyParser.json());


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://a22jhepincre:6tDomkVOunkWy4ZR@a22jhepincre.dsvvls4.mongodb.net/"
const client = new MongoClient(url);

// Reference the database to use
const dbName = "MultiplicaT";


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.post('/authorizationLogin', (req, res) =>{
    
});

