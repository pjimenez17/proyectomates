var mysql = require('mysql2');
const fs = require('fs');
const date = new Date();

var con = mysql.createConnection({
    host: "dam.inspedralbes.cat",
    user: "a22pabjimpri_usuario",
    password: "Dam2023+++",
    database: "a22jhepincre_preguntas"
})

export function conectarBD() {
    con.connect(function (err) {
        if (err) {
            console.log("No conexio");
        } else {
            console.log("Conectado");
        }
    })
}

export function cerrarConexion() {
    con.end(function (err) {
        if (err) {
            return console.log("error: " + err.message);
        }
        console.log("Se cierra la coneccion.");
    })
}

export function insertUser(name, mail, password, role, points){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "INSERT INTO Users  (name, mail, password, role, points)VALUES ('" + name + "', '" + mail + "', '" + password + "', '" + role + "', " + points + ");";
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}

export function updateUser(user_id, name, mail, password, role){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "UPDATE Users SET name='"+ name +"', mail='" + mail + "', password='" + password + "', role='" + role + "' WHERE user_id="+user_id+";";
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}

export function deleteUser(user_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "DELETE FROM Users WHERE user_id=" + user_id;

        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
        disconnectDB(con);
    });
}

export function checkIfUserExists(mail, password){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT * FROM Users WHERE mail=${mail} and password=${password};`;

        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}

export function getIdUser(mail, password){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT user_id FROM Users WHERE mail=${mail} and password=${password};`;

        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}