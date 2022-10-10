const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


module.exports = (express,app) => {
    
	app.post('/api/signup',upload.any(), async function(req,res){
        if(req.body.test == "true"){
            return res.status(200).json({response_text:"active endpoint"})
        }
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {full_name, date_birth = '', email, nickname = '', password, type_user, country = '', city = ''} = req.body
        
        if (full_name == undefined || email == undefined || password == undefined || type_user == undefined){
            return res.status(406).json({response_text:"Is not present value"})
        }

        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            const sql = `
                CALL crearUsuario('${full_name}', '${date_birth}', '${email}', '${nickname}', '${password}', ${type_user}, '${country}', '${city}')
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    return res.status(500).json({response_text:"err created user"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"User Created"})
                }
            });
        });
    });
}