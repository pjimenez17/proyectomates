const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');
const session = require('express-session');
//import { conectarBD, cerrarConexion, checkIfUserExists } from "./db";
const bodyParser = require('body-parser');

const app = express();
const port = 3777;

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

app.post('/authorizationLogin', async (req, res) => {
    const user = req.body;
    if (await checkIfUserExists(user.mail, user.password)) {
        req.session.loogedIn = true;
        req.session.userId = await getIdUser(user.mail, user.password);
        res.send({ authorization: true })
    } else {
        res.send({ authorization: false })
    }
});

// ---Questions from MongoDb---

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
app.post('/addQuestion', async (req, res) => {
    const subject = req.body.nombre;
    const question = []
    req.body.preguntes.forEach(element => {
        question.push(element)
    });

    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName)
        // Reference the "questions" collection in the specified database
        const questionsCollection = db.collection('Questions');
        // Insert a single document
        const result = await questionsCollection.insertOne({
            nombre: subject,
            preguntes: question 
        });
        res.status(200).json({ message: 'Successfully' });
    } catch (error) {
        console.error('Error inserting question:', error);
        res.status(500).json({ error: 'Error inserting question' });
    }
});

app.delete('/deleQuestion/:id', async (req, res) => {
    const id = req.params.id; 

    try {
        await client.connect();
        const db = client.db(dbName);
        // Validate the input for creating a new ObjectId
        const objectId = new ObjectId(id);

        const result = await db.collection("Questions").deleteOne({ _id: objectId });
        res.status(200).json({ message: `Successfully deleted the question with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the question' });
    } finally {
        await client.close();
    }
});

app.put('/updateQuestion/:id', async (req,res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        await client.connect();
        const db = client.db(dbName);
        // Validate the input for creating a new ObjectId
        const objectId = new ObjectId(id);

        const result = await db.collection("Questions").updateOne({ _id: objectId }, { $set: newData });
        res.status(200).json({ message: 'Succesfully update' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the question' });
    } finally {
        await client.close();
    }
    
})