const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.post('/type_service',upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        //const {email,password} = req.body
        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            const sql = `select type_service_id, name_type type_service from type_service`
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                 
                conn.end()
               arrTmp = []
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    arrTmp.push({
                        type_service_id:row.type_service_id,
                        type_service: row.type_service
                    })
                    // res.status(200).json({ 
                    //     userid: row.user_id,
                    //     fullname: row.full_name,
                    //     username: row.username,
                    //     email: row.email,
                    //     type_user: row.type_userd
                    // });
                });
                res.status(200).json({type_services: arrTmp})
            });
        });
    });
}