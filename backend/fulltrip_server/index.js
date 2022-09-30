// const express = require("express");
// const app = express();
const port = 4000;
// const getUsers = require("./routes/getUsers.js");
// app.use(express.json());
// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );
// app.get("/", (req, res) => {
//     res.json({ message: "ok" });
// });
// app.use("/getUsers", getUsers);
// /* Error handler middleware */
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });
//     return;
// });
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

if (process.platform == 'linux') {
    "use strict";
}


var express = require('express');

const bodyParser = require('body-parser');



var app = express();

app.use(express.urlencoded({ extended: true }))
//app.use(express.urlencoded({ extended: false }))
//app.use(express.json())
//app.use(bodyParser.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    req.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

require('./require_glob')(express, app);

var server = app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
});

