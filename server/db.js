var mysql = require('mysql2');
const fs = require('fs');
const date = new Date();

module.exports = {
    checkIfUserExists,
    selectUsers,
    insertUser,
    getIdUser,
    updateUser,
    getUserById,
    deleteUser
  };


var dbConfig ={
    host: "dam.inspedralbes.cat",
    user: "a22pabjimpri_usuario",
    password: "Dam2023+++",
    database: "a22pabjimpri_multiplicat"
};

function conectDB() {
    let con = mysql.createConnection(dbConfig)
    con.connect(function (err) {
        if (err) {
            console.log("No conexio");
        } else {
            console.log("Conectado");
        }
    })
    return con
}

function disconnectDB(con) {
    con.end(function (err) {
        if (err) {
            return console.log("error: " + err.message);
        }
    })
}

function selectUsers(){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT * FROM users;`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
        disconnectDB(con);
    })
}

function insertUser(name, mail, password, role, points){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "INSERT INTO users  (name, mail, password, role, points)VALUES ('" + name + "', '" + mail + "', '" + password + "', '" + role + "', " + points + ");";
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

function getUserById(user_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT name FROM users WHERE user_id=${user_id};`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
        disconnectDB(con);
    })
}

function updateUser(user_id, name, mail, password, role){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "UPDATE users SET name='"+ name +"', mail='" + mail + "', password='" + password + "', role='" + role + "' WHERE user_id="+user_id+";";
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

function deleteUser(user_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "DELETE FROM users WHERE user_id=" + user_id;

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

function checkIfUserExists(mail, password){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT * FROM users WHERE mail='${mail}' and password='${password}';`;

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

function getIdUser(mail, password){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT user_id FROM users WHERE mail=${mail} and password=${password};`;

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