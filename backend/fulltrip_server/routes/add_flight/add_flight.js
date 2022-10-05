const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.post('/api/add_flight',upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {flight_date, destination_country, destination_city, origin_country, origin_city, price, user_id} = req.body
        
        
        if (flight_date === undefined || destination_country === undefined || destination_city === undefined || origin_country === undefined || origin_city === undefined || price === undefined || user_id === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }

        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            const sql = `
            call addFlight('${flight_date}', '${destination_country} - ${destination_city}', '${origin_country} - ${origin_city}', ${price}, ${user_id});
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    return res.status(500).json({response_text:"err created flight"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"Flight Created"})
                }
            });
        });
    });
}