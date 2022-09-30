

const service = require('../services/getUsers.service');

module.exports = (express, app) =>{
    app.get("/api/getUsers", async function (req, res, next){
        try {
            res.json( await service.getUsers(req.query.page));
        } catch (err) {
            console.error(`Error while getting users `, err.message);
            next(err);
        };
    });
}