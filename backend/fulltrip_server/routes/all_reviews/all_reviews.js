const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
	app.get('/api/all_reviews',upload.any(), async function(req,res){
		const conn = await mysql.createConnection(app.config.db.credentials)
        //const {user_id} = req.body
		//const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `
                SELECT 
                    R.review_id,
                    R.description,
                    R.type_service_id,
                    (SELECT name_type FROM type_service TS WHERE TS.type_service_id = R.type_service_id) AS name_type,
                    user_id
                FROM review R;
        
			`

            conn.query(sql, function (err, result, fields) {
                if (err) {
                    conn.end()
                    return res.status(500).json({ code: err.code, message: err.sqlMessage })
                }
                if (result.length === 0) {
                    conn.end()
                    return res.status(404).json({ response_text: "something went wrong" })
                }
                conn.end()
                arrTmp = []
                Object.keys(result).forEach(function (key) {
                    var row = result[key]
                    arrTmp.push({
                        review_id: row.review_id,
                        description: row.description,
                        type_service_id: row.type_service_id,
                        type_service : row.name_type,
                        user_id: row.user_id
                    })
                });
                res.status(200).json({ reviews: arrTmp })
            });
        });
	})
}
