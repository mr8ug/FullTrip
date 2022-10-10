const mysql = require('mysql')
var multer = require('multer')
const { APIGateway } = require('aws-sdk')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {
    app.post('/api/info_flight', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        const { id } = req.body

        await conn.connect(function (err) {
            if (err) {
                conn.end();
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `select a.airline_id, a.airline_name, a.user_id, f.flight_id, DATE_FORMAT(f.flight_date, "%Y-%m-%d") flight_date, f.flight_destination, f.origin_flight, f.number_seat, f.price, f.departure_time, f.available_seat, u.email
            from airline as a, flight as f, user as u
            where a.airline_id = f.airline_id and a.user_id = u.user_id and f.flight_id = ${id}`

            conn.query(sql, function (err, result, fields) {
                if (err) {
                    conn.end();
                    return res.status(500).json({ code: err.code, message: err.sqlMessage })
                }
                if (result.length === 0) {
                    conn.end();
                    return res.status(404).json({ response_text: "something went wrong" })
                }
                conn.end();
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.status(200).json({
                        flight: {
                            airline_id: row.airline_id,
                            airline_name: row.airline_name,
                            user_id: row.user_id,
                            flight_id: row.flight_id,
                            flight_date: row.flight_date,
                            flight_destination: row.flight_destination,
                            origin_flight: row.origin_flight,
                            number_seat: row.number_seat,
                            price: row.price,
                            departure_time: row.departure_time,
                            available_seat: row.available_seat,
                            email: row.email,

                        }


                    });
                });
            });

        });
    });
}