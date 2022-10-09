const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.post('/api/add_flight_reservation',upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {return_date = '', observation = '', flight_id, user_id} = req.body
        
        
        if (flight_id === undefined || user_id === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }

        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            const sql = `
            call reservationFlight('${return_date}', '${observation}', ${flight_id}, ${user_id});
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    return res.status(500).json({response_text:"err created flight reservation"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"Reservation Created"})
                }
            });
        });
    });
}