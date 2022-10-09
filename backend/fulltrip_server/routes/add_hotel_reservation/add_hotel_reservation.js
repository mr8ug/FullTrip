const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.post('/api/add_hotel_reservation',upload.any(), async function(req,res){
        const conn = await mysql.createConnection(app.config.db.credentials);
        const {start_date, end_date, reservation_description = '', room_id, user_id} = req.body
        
        
        if (start_date === undefined || end_date === undefined || room_id === undefined || user_id === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }

        await conn.connect(function(err) {
            if (err){
                conn.end()
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            const sql = `
            INSERT INTO hotel_reservation (start_date, end_date, reservation_description, room_id, user_id) VALUES ('${start_date}', '${end_date}', '${reservation_description}', ${room_id}, ${user_id});
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    return res.status(500).json({response_text:"err created hotel reservation"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"Reservation Created"})
                }
            });
        });
    });
}