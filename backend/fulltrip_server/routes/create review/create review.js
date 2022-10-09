const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs')
const uuid = require('uuid');

module.exports = (express,app) => {
    
	app.post('/api/create_review',upload.any(), async function(req,res){
        
        const {user_id, type_service_id, description} = req.body
        if (user_id === undefined || type_service_id === undefined || description === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }
        
        const conn = await mysql.createConnection(app.config.db.credentials);
        
        await conn.connect(function(err) {
            if (err){
                conn.end()
                drop_bucket(key)
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            //call addRoom('Presidencial 4', 5, 2500.65, 10, 'Habitacion.jpg', '2022-10-15', '2022-10-30');
            const sql = `
                insert into review (user_id, type_service_id, description) values (${user_id}, ${type_service_id}, '${description}');
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    return res.status(500).json({response_text:"err created review"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"Review Created"})
                }
            });
        });
    });
}
