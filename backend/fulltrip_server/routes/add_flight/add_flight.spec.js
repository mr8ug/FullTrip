
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("GET /api/add_flight", () => {
    it('Verify add flight', async () => {
        const response = await request
            .post('/api/add_flight')
            .set('Content-Type',  'application/json')
            .send({
                flight_date: "2022-10-30",
                destination_country:"test",
                destination_city:"test",
                origin_country:"test",
                origin_city:"test",
                price:500.00,
                user_id: 277,
                departure_time:"07:15",
                number_seat:85
            })
            expect(response.status).toEqual(201)  
    }) 

    it('Verify failure to add flight', async () => {
        const response = await request
            .post('/api/add_flight')
            .set('Content-Type',  'application/json')
            .send({
                flight_date: "2022-10-30",
                destination_country:"test",
                destination_city:"test",
                origin_country:"test",
                origin_city:"test",
                price:500.00,
                departure_time:"07:15",
                number_seat:85
            })
            expect(response.status).toEqual(406)  
    }) 

});
