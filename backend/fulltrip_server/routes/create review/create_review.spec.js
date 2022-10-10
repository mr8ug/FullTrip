
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/create_review", () => {
    it('verify Alquiler de habitaciones', async () => {
        const response = await request
            .post('/api/create_review')
            .set('Content-Type',  'application/json')
            .send({
                user_id:34,
                type_service_id:1,
                description:"test"
            })
            expect(response.status).toEqual(201)  
    }) 

    it('verify Alquiler de vehiculos', async () => {
        const response = await request
            .post('/api/create_review')
            .set('Content-Type',  'application/json')
            .send({
                user_id:34,
                type_service_id:2,
                description:"test"
            })
            expect(response.status).toEqual(201)  
    }) 

    it('verify Venta de boletos aeros', async () => {
        const response = await request
            .post('/api/create_review')
            .set('Content-Type',  'application/json')
            .send({
                user_id:34,
                type_service_id:3,
                description:"test"
            })
            expect(response.status).toEqual(201)  
    }) 

});
