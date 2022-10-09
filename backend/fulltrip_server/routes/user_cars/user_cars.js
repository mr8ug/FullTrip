const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.post('/api/user_cars', upload.any(), async function (req, res) {
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
            select c.car_id id_car, c.line, c.model, c.brand, c.price,
                cr.country, cr.city, cr.car_rental_name car_rental, cr.car_rental_id, c.img
            from user u, car_rental cr, car c
            where u.user_id = ${user_id}
                and u.user_id = cr.user_id
                and cr.car_rental_id = c.car_rental_id;
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
                        car_rental: row.car_rental,
                        car_rental_id: row.car_rental_id,
                        img:  `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img,
                    })
                });
                res.status(200).json({ cars: arrTmp })
            });
        });
    });

}
    

