const mysql = require('mysql')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {
    app.post('/api/info_car', upload.any(), async function(req, res){
        const conn = await mysql.createConnection(app.config.db.credentials)
        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
        const {id} = req.body

        await conn.connect(function(err){
            if(err){
                conn.end();
                return res.status(500).json({response_text:"Err of connect"})
            }

            const sql=`
            select c.car_id, c.brand, c.model, c.price, c.placa, c.img, c.line, cr.car_rental_id, cr.car_rental_name, cr.country, cr.city, u.email
            from car as c, car_rental as cr, user as u
            where c.car_rental_id = cr.car_rental_id and u.user_id = cr.user_id and car_id = ${id}
            `

            conn.query(sql, function(err, result, fields){
                if(err){
                    conn.end();
                    return res.status(500).json({code: err.code, message: err.sqlMessage})
                }

                if(result.length === 0){
                    conn.end();
                    return res.status(404).json({response_text:"something went wrong"})
                }

                conn.end();
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    res.status(200).json({
                        car:{
                            car_id: row.car_id,
                            brand: row.brand,
                            model: row.model,
                            price: row.price,
                            placa: row.placa,
                            line: row.line,
                            car_rental_id: row.car_rental_id,
                            car_rental_name: row.car_rental_name,
                            country: row.country,
                            city: row.city,
                            email: row.email,
                            img: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/` + row.img
                        }
                    });
                });
            })
        })
    })
}