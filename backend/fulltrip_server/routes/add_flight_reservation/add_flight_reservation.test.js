
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/add_flight_reservation", () => {
    it('verify buy ticket flight', async () => {
        const response = await request
            .post('/api/add_flight_reservation')
            .set('Content-Type',  'application/json')
            .send({
                return_date:"2022-11-10",
                flight_id:18,
                user_id:288
            })
            expect(response.status).toEqual(201)  
    }) 
    it('verify buy failure ticket flight', async () => {
        const response = await request
            .post('/api/add_flight_reservation')
            .set('Content-Type',  'application/json')
            .send({
                return_date:"2022-11-10",
                flight_id:3,
                user_id:20
            })
            expect(response.status).toEqual(500)  
    }) 
});
