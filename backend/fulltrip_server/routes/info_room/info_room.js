const mysql = require('mysql')
var multer = require('multer')
const { APIGateway } = require('aws-sdk')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {
    app.post('/api/info_room', upload.any(), async function (req, res) {
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        const { id } = req.body

        await conn.connect(function (err) {
            if (err) {
                conn.end();
                return res.status(500).json({ response_text: "Err of connect" })
            }

            const sql = `select r.room_id, r.room_name, r.amount_people, r.price, r.img, h.hotel_id, h.hotel_name, h.country, h.city, h.user_id, DATE_FORMAT(a.start_date, "%Y-%m-%d") as start_date, DATE_FORMAT(a.ending_date,"%Y-%m-%d") as ending_date, u.email
            from room as r, hotel as h, user as u, availability as a
            where r.room_id = ${id} and h.hotel_id = r.hotel_id and h.user_id = u.user_id and a.room_id = r.room_id`

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
                        room: {
                            room_id: row.room_id,
                            room_name: row.room_name,
                            amount_people: row.amount_people,
                            price: row.price,
                            hotel_id: row.hotel_id,
                            hotel_name: row.hotel_name,
                            country: row.country,
                            city: row.city,
                            user_id: row.user_id,
                            email: row.email,
                            img: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img,
                            start_date: row.start_date,
                            ending_date: row.ending_date,

                        }


                    });
                });
            });

        });
    });
}