var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')

describe("POST /api/add_car", () => {
    it('verify add car failure', async () => {
        const response = await request
            .post('/api/add_car')
            .set('Content-Type',  'application/json')
            .field('brand','test')
            .field('line','test')
            .field('model','0000')
            .field('placa','test')
            .field('price','555.55')
            .field('user_id','35')
            .attach('avatar', path.resolve(process.cwd() + '/img_prueba.jpg'))
            //expect(response.body.message).toEqual('hoa');
            expect(response.status).toEqual(500)  
    }) 
    it('verify add car', async () => {
        const response = await request
            .post('/api/add_car')
            .set('Content-Type',  'application/json')
            .field('brand','test')
            .field('line','test')
            .field('model','0000')
            .field('placa','test')
            .field('price','555.55')
            .field('user_id','279')
            .attach('avatar', path.resolve(process.cwd() + '/img_prueba.jpg'))
            //expect(response.body.message).toEqual('hoa');
            expect(response.status).toEqual(201)  
    })
});


describe("GET /api/all_rooms", () => {
    it('verify exist rooms by hotel', async () => {
        const response = await request
            .get('/api/all_rooms')
            .set('Content-Type',  'application/json')
            .send({
                //email:process.env.TEST_EMAIL,
                //password:process.env.TEST_PASSWORD
            })
            expect(response.status).toEqual(200)  
    }) 
});




