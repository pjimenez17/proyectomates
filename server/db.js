var mysql = require('mysql2');
const fs = require('fs');
const { rejects } = require('assert');
const date = new Date();

module.exports = {
    checkIfUserExists,
    selectUsers,
    insertUser,
    getIdUser,
    updateUser,
    getUserById,
    deleteUser,
    getUserByMailALL,
    insertGame,
    selectLastGame,
    getGameData,
    findIdByPasswordGame,
    changeStateGame,
    selectUsersInGameByGameid
};


var dbConfig = {
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

function selectUsers() {
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
    });
}

function selectUsersByPoints() {

}

function insertUser(name, mail, password, role, points) {
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

function getUserById(user_id) {
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

function getUserByIdAll(user_id) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT * FROM users WHERE user_id=${user_id};`
        con.query(sql, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

function getUserByMailALL(mail) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT user_id, name, mail, role, points, profile_pic, game_id FROM users WHERE mail='" + mail + "';";
        con.query(sql, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

function findIdByPasswordGame(password){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT game_id FROM Game WHERE game_password=" + password + ";";
        con.query(sql, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

function updateUser(user_id, name, mail, role, game_id, points, profile_pic) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "UPDATE users SET name='" + name + "', mail='" + mail + "', role='" + role + "', game_id= " + game_id + ", points=" + points + ", profile_pic='" + profile_pic + "' WHERE user_id=" + user_id + ";";
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                const select = getUserByIdAll(user_id)
                resolve(select);
            }
        });
        disconnectDB(con);
    });
}

function selectLastGame() {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT * FROM Game ORDER BY game_id DESC LIMIT 1;"
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

function deleteUser(user_id) {
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

function checkIfUserExists(mail, password) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT * FROM users WHERE mail='" + mail + "' and password='" + password + "';";

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

function getIdUser(mail, password) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT user_id FROM users WHERE mail='" + mail + "' and password='" + password + "';";

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

function insertGame(required_points, max_players) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "INSERT INTO Game (required_points, max_players, game_password) VALUES (" + required_points + ", " + max_players + ", FLOOR(RAND() * 900000) + 100000)";
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

function getGameData(game_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT * FROM Game WHERE game_id = "+ game_id+";";
        con.query(sql, function (err, result){
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

function changeStateGame(status, game_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "UPDATE Game SET status='"+status+"' WHERE game_id= "+game_id+";";
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

function selectUsersInGameByGameid(game_id){
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT mail, name, points FROM users WHERE game_id = "+ game_id+";";
        con.query(sql, function (err, result){
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}