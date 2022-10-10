
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("GET /api/all_cars", () => {
    it('verify response', async () => {
        const response = await request
            .get('/api/all_cars')
            .set('Content-Type',  'application/json')
            .send({
            })
            expect(response.status).toEqual(200)  
    }) 

});
