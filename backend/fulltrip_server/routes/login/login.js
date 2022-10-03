const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.get('/login',upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {email,password} = req.body
        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            const sql = `SELECT user_id, full_name ,email,nickname as username,  tu.type_user
                    FROM user U, type_user tu
                    WHERE U.email = '${email}' AND U.password = MD5('${password}')
                    AND tu.type_user_id = U.type_user_id`
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                if (result.length === 0){
                    conn.end()
                    return res.status(404).json({response_text:"password, email or nickname it's not right"})
                } 
                conn.end()
               
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    
                    res.status(200).json({ 
                        userid: row.user_id,
                        fullname: row.full_name,
                        username: row.username,
                        email: row.email,
                        type_user: row.type_user
                    });
                });
            });
        });
    });
}