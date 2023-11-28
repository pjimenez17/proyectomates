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

// async function getLastId() {
//     try {
//         await client.connect();
//         const db = client.db(dbName);

//         // Ordenar por fecha de inserción descendente y limitar a 1 documento
//         const ultimoUsuario = await db.collection('Users').find().sort({ _id: -1 }).limit(1).toArray();

//         if (ultimoUsuario.length > 0) {
//             return ultimoUsuario[0]._id.toString();
//         } else {
//             return null;
//         }
//     } finally {
//         await client.close();
//     }
// }


// app.post('/addUser', async (req, res) => {
//     const user = req.body;
//     try {
//         // Connect to the Atlas cluster
//         await client.connect();
//         const db = client.db(dbName);

//         // Reference the "people" collection in the specified database
//         const col = db.collection("Users");

//         // Create a new document                                                                                                                                           
//         let personDocument = {
//             "name": user.name,
//             "mail": user.mail,
//             "password": user.password,
//             "role": user.role
//         }



//         // Insert the document into the specified collection        
//         const p = await col.insertOne(personDocument);
//         const idInsertada = "p.insertedId";
//         // Find and return the document
//         const usuarios = await db.collection('Users').find().toArray();


//         res.status(201).json({ id: idInsertada, mensaje: 'User added succesfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error adding user.');
//     } finally {
//         await client.close();
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         await client.connect();
//         const db = client.db(dbName);

//         const usuarioId = req.params.id;

//         const resultado = await db.collection('Users').deleteOne({ _id: new ObjectId(usuarioId) });

//         if (resultado.deletedCount === 1) {
//             res.send('User deleted succesfully.');
//         } else {
//             res.status(404).send('Usuario no encontrado');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al eliminar usuario');
//     } finally {
//         await client.close();
//     }
// });

// app.put('/usuarios/:id', async (req, res) => {
//     try {
//       await client.connect();
//       const db = client.db(dbName);

//       const usuarioId = req.params.id;

//       const filtro = { _id: new ObjectId(usuarioId) };
//       const actualizaciones = {
//         $set: {
//           nombre: req.body.nombre,
//           correo: req.body.correo,
//           contrasena: req.body.contrasena,
//           rol: req.body.rol,
//         },
//       };

//       const resultado = await db.collection('Users').updateOne(filtro, actualizaciones);

//       if (resultado.modifiedCount === 1) {
//         res.send('Usuario actualizado correctamente');
//       } else {
//         res.status(404).send('Usuario no encontrado');
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error al actualizar usuario');
//     } finally {
//       await client.close();
//     }
//   });

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