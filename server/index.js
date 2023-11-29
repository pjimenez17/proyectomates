const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const {
    checkIfUserExists,
    selectUsers,
    insertUser,
    getIdUser,
    updateUser,
    getUserById,
    deleteUser
  } = require("./db");
const bodyParser = require('body-parser');

const app = express();
const port = 3777;
app.use(cors());

app.use(bodyParser.json());
app.use(session({
    secret: "miSecreto",
    resave: false,
    saveUninitialized: true,
})
);

const url = "mongodb+srv://a22jhepincre:6tDomkVOunkWy4ZR@a22jhepincre.dsvvls4.mongodb.net/"
const client = new MongoClient(url);

const dbName = "MultiplicaT";

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.post('/authorizationLogin', async(req, res) => {
    const user = req.body;
    if (await checkIfUserExists(user.mail, user.password)) {
        req.session.loogedIn = true;
        req.session.userId = await getIdUser(user.mail, user.password);
        const id = await getIdUser(user.mail, user.password);
        console.log(id);
        const infoUser = await getUserById(id[0].user_id);
        res.send({ authorization: true, name: infoUser.name })
    }else{
        res.send({ authorization: false })
    }
});

// ---Questions into MongoDb---

// We get the questions
app.get('/getQuestions', async (req, res) => {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName)
        // Reference the "questions" collection in the specified database
        const questionsCollection = db.collection('Questions');
        // Fetch all documents in the "questions" collection
        const result = await questionsCollection.find({}).toArray();
        res.status(200).json({ questions: result });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Error fetching questions' });
    }
});


// Here add a questions in function the subject
// First add a subjects for after add a question
app.post('/addSubject', async (req, res) => {
    const subject = req.body.subject;
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName)
        // Reference the "subjects" collection in the specified database
        const subjectsCollection = db.collection('Subjects');
        // Insert a single document
        const result = await subjectsCollection.insertOne({ nombre: subject });
        res.status(200).json({ result: result.insertedCount > 0 });
    } catch (error) {
        console.error('Error inserting subject:', error);
        res.status(500).json({ error: 'Error inserting subject' });
    }
    /* If we wanna do test in thunderClient:
    {
    "subject": "Programación"
    } */
});

// Here add a questions in function the subject
app.post('/addQuestion', async (req, res) => {
    const subjectId = req.body.subjectId;
    const question = req.body.question;
    const correctAnswer = req.body.correctAnswer;
    const options = req.body.options;
    const difficulty = req.body.difficulty;
    const points = req.body.points;
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName)
        // Reference the "questions" collection in the specified database
        const questionsCollection = db.collection('Questions');
        // Insert a single document
        const result = await questionsCollection.insertOne({
            tema_id: ObjectId(subjectId),
            enunciado: question,
            respuesta_correcta: correctAnswer,
            opciones: options,
            dificultad: difficulty,
            puntuacion: points
        });
        res.status(200).json({ result: result.insertedCount > 0 });
    } catch (error) {
        console.error('Error inserting question:', error);
        res.status(500).json({ error: 'Error inserting question' });
    }
    /* If we wanna do test in thunderClient:
    {
    "subjectId": "6057b735733b8a141457b87d"(ejemplo),
    "question": "¿Cuál es la estructura básica de un programa en JavaScript?",
    "correctAnswer": "function main() { // código aquí }",
    "options": [
        "class main { // código aquí }",
        "function main() { // código aquí }",
        "if(typeof main === 'function') { main(); }"
    ],
    "difficulty": "easy",
    "points": 10
    }*/
});

//The function goes
app.get('/users', (req,res)=>{
    selectUsers()
    .then(data =>{
        res.send(data);
    });
});

//The function goes
app.post('/Insertuser', async(req,res) =>{
    const user = req.body;
    await insertUser(user.name, user.mail, user.password, user.role, user.points);
    res.send({response: "User inserted correctly"})
});

//The function goes
app.post('/userUpdate', async (req,res)=>{
    const user = req.body;
    await updateUser(user.user_id,user.name,user.mail,user.password,user.role)
    .then(data =>{
        res.send(data);
    });
});

//The function goes
app.delete('/deleteUser',async (req,res)=>{
    const user = req.body;
    const result = await deleteUser(user.user_id);
    if(result){
        res.send({message: "Successfully deleted user"})
    }else{
        res.send({message: "User not found or could not be deleted"});
    }
});

