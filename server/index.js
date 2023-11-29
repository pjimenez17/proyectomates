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

//The function goes
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