const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.post('/api/room_reservation', upload.any(), async function (req, res) {
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
            select hr.reservation_date, hr.start_date start_date_r, hr.end_date end_date_r, 
                hr.reservation_description, r.room_id id_room, r.room_name, h.hotel_id, 
                h.hotel_name, r.amount_people, r.price, h.country, h.city, a.start_date start_date_d,
                a.ending_date ending_date_d, r.img
            from hotel_reservation hr, hotel h, room r, availability a
            where hr.user_id = ${user_id}
                and hr.room_id = r.room_id 
                and r.room_id = a.room_id
                and r.hotel_id = h.hotel_id;
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
                        reservation_date: row.reservation_date,
                        start_date_r: row.start_date_r,
                        end_date_r: row.end_date_r,
                        reservation_description: row.reservation_description,
                        id_room: row.id_room,
                        room_name: row.room_name,
                        hotel_id: row.hotel_id,
                        hotel_name: row.hotel_name,
                        amount_people: row.amount_people,
                        price: row.price,
                        country: row.country,
                        city: row.city,
                        start_date_d: row.start_date_d,
                        ending_date_d: row.ending_date_d,
                        img:  `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img,
                    })
                });
                res.status(200).json({ rooms: arrTmp })
            });
        });
    });

}
    

