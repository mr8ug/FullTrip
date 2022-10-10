
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/car_reservation", () => {
    it('verify response', async () => {
        const response = await request
            .post('/api/car_reservation')
            .set('Content-Type',  'application/json')
            .send({
                user_id:34
            })
            expect(response.status).toEqual(200)  
    }) 

});
