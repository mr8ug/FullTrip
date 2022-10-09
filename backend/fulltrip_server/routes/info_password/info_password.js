const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app)=>{
    
    app.post('/api/info_password', upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {id, password} = req.body

        await conn.connect(function (err){
            if(err){
                conn.end();
                return res.status(500).json({response_text: "Err of connect"})
            }

            const sql = `Select exists(Select user_id from user
                where user_id = ${id} and password = MD5('${password}') ) as password_state`

            conn.query(sql, function(err, result, fields){
                if(err){
                    conn.end();
                    return res.status(500).json({code: err.code, message: err.sqlMessage})
                }

                if(result.length === 0){
                    conn.end();
                    return res.status(404).json({response_text: "something went wrong"})
                }

                conn.end();

                Object.keys(result).forEach(function(key){
                    var row = result[key];
                    res.status(200).json({
                        password_state: row.password_state
                    });
                });
                
            });
        })
    })

}