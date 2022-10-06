const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.get('/api/all_rooms', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        await conn.connect(function (err) {
            if (err) {
                conn.end()
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `select r.room_id, r.room_name, r.amount_people, r.price, h.hotel_id, h.hotel_name, h.country, 
            h.city, a.start_date, a.ending_date, r.img
            from room as r, hotel as h, availability as a
            where r.hotel_id = h.hotel_id and r.room_id = a.room_id`

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


                        room_id: row.room_id,
                        room_name: row.room_name,
                        amount_people: row.amount_people,
                        price: row.price,
                        hotel_id: row.hotel_id,
                        hotel_name: row.hotel_name,
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
    });

}
    

