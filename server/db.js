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
            escribirLog("No conexio");
        } else {
            console.log("Conectado");
            escribirLog("Conectado\n" + queryDate);
        }
    })
}

export function cerrarConexion() {
    con.end(function (err) {
        if (err) {
            return console.log("error: " + err.message);
        }
        console.log("Se cierra la coneccion.");
        escribirLog("Se cierra la coneccion.\n" + queryDate);
    })
}