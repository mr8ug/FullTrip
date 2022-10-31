
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/add_hotel_reservation", () => {
    it('verify create reservation by user turista', async () => {
        const response = await request
            .post('/api/add_hotel_reservation')
            .set('Content-Type',  'application/json')
            .send({
                start_date:"2022-10-10",
                end_date:"2022-10-15",
                reservation_description:"test",
                room_id:29,
                user_id:287
            })
            expect(response.status).toEqual(201)  
    }) 
    it('verify create reservation failure by user turista', async () => {
        const response = await request
            .post('/api/add_hotel_reservation')
            .set('Content-Type',  'application/json')
            .send({
                start_date:"2022-10-10",
                end_date:"2022-10-15",
                reservation_description:"test",
                room_id:6,
                user_id:34
            })
            expect(response.status).toEqual(500)  
    }) 
});
