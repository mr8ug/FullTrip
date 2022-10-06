const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.get('/api/all_flights', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `select f.flight_id id_flight, a.airline_id, a.airline_name, f.price, f.flight_date, 
                        f.flight_destination, f.origin_flight flight_origin, f.departure_time, f.available_seat
                        from flight f, airline a
                        where a.airline_id = f.airline_id
                            and f.flight_date >= CURDATE();`

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
                        available_seat: row.available_seat
                    })
                });
                res.status(200).json({ flights: arrTmp })
            });
        });
    });

}
    

