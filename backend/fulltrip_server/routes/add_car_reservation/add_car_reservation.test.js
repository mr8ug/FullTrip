
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/add_car_reservation", () => {
    it('verify create reservation by user turista', async () => {
        const response = await request
            .post('/api/add_car_reservation')
            .set('Content-Type',  'application/json')
            .send({
                start_date:"2022-10-10",
                end_date:"2022-10-15",
                observation:"test",
                car_id:11,
                user_id:288
            })
            expect(response.status).toEqual(201)  
    }) 
    it('verify create reservation failure by user turista', async () => {
        const response = await request
            .post('/api/add_car_reservation')
            .set('Content-Type',  'application/json')
            .send({
                start_date:"2022-10-10",
                end_date:"2022-10-15",
                observation:"test",
                car_id:5,
                user_id:34
            })
            expect(response.status).toEqual(500)  
    }) 
});
