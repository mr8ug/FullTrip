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

var app = require('./server')

var server = app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
});



