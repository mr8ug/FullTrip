const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
	app.post('/api/user_rooms',upload.any(), async function(req,res){
		const conn = await mysql.createConnection(app.config.db.credentials)
        const {user_id} = req.body
		const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }
			
			/*SELECT `availability`.`availability_id`,
                `availability`.`start_date`,
                `availability`.`ending_date`,
                `availability`.`room_id`
            FROM `fulltrip_db`.`availability`;

            SELECT `room`.`room_id`,
                `room`.`room_name`,
                `room`.`amount_people`,
                `room`.`price`,
                `room`.`img`,
                `room`.`hotel_id`
            FROM `fulltrip_db`.`room`;

            SELECT `hotel`.`hotel_id`,
                `hotel`.`hotel_name`,
                `hotel`.`country`,
                `hotel`.`city`,
                `hotel`.`user_id`
            FROM `fulltrip_db`.`hotel`;*/



            const sql = `
				SELECT 
                    R.room_id AS id_room,
                    R.room_name AS room_name,
                    H.hotel_id AS hotel_id,
                    H.hotel_name AS hotel_name,
                    R.amount_people AS amount_people,
                    R.price AS price,
                    H.country AS country,
                    H.city AS city,
                    A.start_date AS start_date,
                    A.ending_date AS ending_date,
                    R.img
				FROM 
					hotel H
					INNER JOIN room R ON R.hotel_id = H.hotel_id
					INNER JOIN availability A on A.room_id = R.room_id
				WHERE
					H.user_id = ${user_id};	
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
						id_room: row.id_room,
                        room_name: row.room_name,
                        hotel_id: row.hotel_id,
                        hotel_name: row.hotel_name,
                        amount_people: row.amount_people,
                        price: row.price,
                        country: row.country,
                        city: row.city,
                        start_date: row.start_date,
                        ending_date: row.ending_date,
                        img: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img,
                    })
                });
                res.status(200).json({ rooms: arrTmp })
            });
        });
	})
}
