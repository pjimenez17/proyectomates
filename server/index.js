const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3777;

const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const {
    checkIfUserExists,
    selectUsers,
    insertUser,
    getIdUser,
    updateUser,
    getUserById,
    deleteUser,
    getUserByMailALL,
    insertGame,
    selectLastGame
  } = require("./db");




app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
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
    console.log(user);
    if (await checkIfUserExists(user.mail, user.password)) {
        req.session.loogedIn = true;
        req.session.userId = await getIdUser(user.mail, user.password);
        const id = await getIdUser(user.mail, user.password);
        console.log(id);
        const infoUser = await getUserById(id[0].user_id);
        console.log(infoUser);
        res.send({ authorization: true, name: infoUser[0].name })
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

//Requests
app.post('/getuserbymail', (req,res)=>{
    const user = req.body;
    console.log("GETUSERBYMAIL::");
    console.log(user);
    getUserByMailALL(user.mail)
    .then((data)=>{
        res.send(data)
    });
});

app.post("/insertGame", async(req, res) =>{
    const game = req.body;
    const result = await insertGame(game.required_points, game.max_players);
    const gameCreated = await selectLastGame();
    res.send(gameCreated[0].game_id);
});

//http://localhost:3777/@body(json)/21416542(exemple)
app.post('/changeGameId/:id', (req,body) =>{
    const game_id = req.params.id;
    
    updateUser(user_id, name, mail, password, role, game_id, points, profile_pic)
    .then(data =>{
        res.send(data);
    });
})


// ---------------------------------------------- SOCKET ---------------------------------------------- //
io.on('connection', async(socket) =>{

    socket.on('getUsers', async()=>{
        var users = await selectUsers();
        io.emit('users', users);
    });

    socket.on('disconnect', () => {

    });
});