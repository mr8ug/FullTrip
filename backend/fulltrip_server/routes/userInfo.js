

const service = require('../services/userInfo.service');

module.exports = (express, app) =>{
    app.post("/api/userExist", async function (req, res, next){
        try {
            
            res.json( await service.userExist(req.body.user,req.query.page));
        } catch (err) {
            console.error(`Error while getting user `, err.message);
            next(err);
        };
    });

    app.post("/api/userType", async function (req, res, next){
        try {
            res.json( await service.userType(req.body.user,req.query.page));
        } catch (err) {
            console.error(`Error while getting user `, err.message);
            next(err);
        };
    });
}

