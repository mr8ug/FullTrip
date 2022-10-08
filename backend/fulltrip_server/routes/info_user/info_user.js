const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app)=>{
    app.post('/api/user_info', upload.any(), async function(req, res){
        const conn = await mysql.createConnection(app.config.db.credentials)
        const {id} = req.body
        
        await conn.connect(function(err){
            if(err){
                conn.end();
                return res.status(500).json({response_text: "Err of connect"})
            }

            const sql = `Select u.full_name, u.date_birth, u.email, u.nickname, u.password, u.country, u.city
            from user as u
            where u.user_id = ${id}`
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
                        userid: row.user_id,
                        date_birth: row.date_birth,
                        fullname: row.full_name,
                        username: row.nickname,
                        password: row.password,
                        email: row.email,
                        country: row.country,
                        city: row.city
                    });
                });
            });
        });

    })
}