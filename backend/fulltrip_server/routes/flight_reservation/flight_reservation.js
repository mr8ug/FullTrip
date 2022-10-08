const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.post('/api/flight_reservation', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        
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
            select f.flight_id id_flight, a.airline_id, rf.date_reservation, rf.return_date, a.airline_name,
            f.price, f.flight_date, f. flight_destination, f.origin_flight flight_origin, f.departure_time
            from airline a, flight f, reservation_flight rf
            where rf.user_id = ${user_id}
                and rf.flight_id = f.flight_id
                and f.airline_id = a.airline_id
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
                        available_seat: row.available_seat
                    })
                });
                res.status(200).json({ flights: arrTmp })
            });
        });
    });

}
    

