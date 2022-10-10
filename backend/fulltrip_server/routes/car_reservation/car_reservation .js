const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
	app.post('/api/car_reservation',upload.any(), async function(req,res){
		const conn = await mysql.createConnection(app.config.db.credentials)
        const {user_id} = req.body
		const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }
			
			const sql = `
				SELECT 
					CR.car_reservation_id,
					DATE_FORMAT(CR.date_reservation, '%Y-%m-%d') AS date_reservation,
					DATE_FORMAT(CR.start_date, '%Y-%m-%d') AS start_date,
					DATE_FORMAT(CR.end_date, '%Y-%m-%d') AS end_date,
					CR.observation,
					CR.car_id AS id_car,
					CAR.brand,
					CAR.model,
					CAR.price,
					CAR.placa,
					CAR.img,
					CAR.line,
					CRENT.car_rental_id,
					CRENT.car_rental_name,
					CRENT.country,
					CRENT.city,
					CRENT.user_id
				FROM 
					car_reservation CR
					INNER JOIN car CAR ON CAR.car_id = CR.car_id
					INNER JOIN car_rental CRENT on CRENT.car_rental_id = CAR.car_rental_id
				WHERE
					CR.user_id = ${user_id};	
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
						id_car: row.id_car,
						line: row.line,
						model: row.model,
						brand: row.brand,
						price: row.price,
						country: row.country,
						city: row.city,
					  	car_rental: row.car_rental_name,
						car_rental_id: row.car_rental_id,
						img: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img,
						date_reservation: row.date_reservation,
						start_date: row.start_date,
						end_date: row.end_date,
						observation: row.observation
                    })
                });
                res.status(200).json({ cars: arrTmp })
            });
        });
	})
}
