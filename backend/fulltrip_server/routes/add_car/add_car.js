const mysql = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs')
const uuid = require('uuid');

module.exports = (express,app) => {
    
	app.post('/api/add_car',upload.any(), async function(req,res){
        
        if(req.files.length == 0){
            return res.status(406).json({response_text:"is not present value"})
        }

        
        const {brand, line, model, placa, price, user_id} = req.body
        if (brand === undefined || line === undefined || model === undefined || placa === undefined || price === undefined || user_id === undefined) {
            return res.status(406).json({response_text:"Is not present value"})
        }
        

        const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

        const file_path = process.cwd() + '/' + req.files[0].destination + '/' + req.files[0].filename
        
            const binario = await new Buffer.from( 
                fs.readFileSync(
                    file_path
                    ,'base64'
                )
                ,'base64'
            )
            fs.unlink(file_path, (err => {
                if (err) res.status(500).json({response_text:"err drop file temp"})
            }));

        const str = req.files[0].originalname
        const file_ext = str.substr(str.length - 3);
        let key = uuid.v1() + "." + file_ext; 
        if(process.env.NODE_TEST == 'true'){
            key = 'test_' + uuid.v1() + "." + file_ext; 
        }
        
            await s3
                .putObject({
                    Body: binario,
                    Bucket: AWS_S3_BUCKET_NAME, 
                    Key: key,
                    ContentType: req.files[0].mimetype
                })
            .promise();

        const conn = await mysql.createConnection(app.config.db.credentials);
        
        
        

        await conn.connect(function(err) {
            if (err){
                conn.end()
                drop_bucket(key)
                return res.status(500).json({response_text:"Err of connect"})
            }
            
            //call addCar('Nissan', 2023, 750.00, 'P0564JSA', 'NP300', 12, 'ddc32583-44dd-11ed-a0c9-ec2e9875430c.jpg');
            const sql = `
            call addCar('${brand}', ${model}, ${price}, '${placa}', '${line}', ${user_id}, '${key}');
            `
            conn.query(sql, function (err, result, fields) {
                if (err){
                    conn.end()
                    drop_bucket(key)
                    return res.status(500).json({code:err.code,message:err.sqlMessage})
                }
                conn.end()
                if (result.affectedRows === 0){
                    drop_bucket(key)
                    return res.status(500).json({response_text:"err created car"})
                }
                if(result.affectedRows >= 1){
                    res.status(201).json({status:'ok',response_text:"Car Created"})
                }
            });
        });
    });
}


var drop_bucket = async (key) =>{
    const {AWS_S3_BUCKET_NAME} = process.env
    await s3
    .deleteObject({
        Bucket: AWS_S3_BUCKET_NAME, 
        Key: key,
    })
    .promise();
}