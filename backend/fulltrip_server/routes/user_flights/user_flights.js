const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.post('/api/user_flights', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        const {user_id} = req.body
        if (user_id === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `
            SELECT FL.flight_id id_flight,
                AR.airline_id,
                AR.airline_name,
                FL.price,
                FL.flight_date,
                FL.flight_destination,
                FL.origin_flight flight_origin,
                FL.departure_time,
                FL.number_seat,
                FL.available_seat
            FROM airline AR
            INNER JOIN flight FL ON FL.airline_id = AR.airline_id
            WHERE AR.user_id = ${user_id};
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
                        id_flight: row.id_flight,
                        airline_id: row.airline_id,
                        airline_name: row.airline_name,
                        price: row.price,
                        flight_date: row.flight_date,
                        flight_destination: row.flight_destination,
                        flight_origin: row.flight_origin,
                        departure_time: row.departure_time,
                        number_seat: row.number_seat,
                        available_seat: row.available_seat
                    })
                });
                res.status(200).json({ flights: arrTmp })
            });
        });
    });

}
    

