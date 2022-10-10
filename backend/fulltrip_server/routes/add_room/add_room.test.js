
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')




describe("POST /api/add_room", () => {
    it('verify add car', async () => {
        const response = await request
            .post('/api/add_room')
            .set('Content-Type',  'application/json')
            .field('room_name','test')
            .field('amount_people','4')
            .field('price','2578.75')
            .field('start_date','2022-10-10')
            .field('ending_date','2022-10-15')
            .field('user_id','44')
            .attach('avatar', path.resolve(process.cwd() + '/img_prueba.jpg'))
            //expect(response.body.message).toEqual('hoa');
            expect(response.status).toEqual(201)  
    }) 
});