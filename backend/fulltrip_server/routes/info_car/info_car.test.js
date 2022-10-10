
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/info_car", () => {
    it('verify response', async () => {
        const response = await request
            .post('/api/info_car')
            .set('Content-Type',  'application/json')
            .send({
                id:1
            })
            expect(response.status).toEqual(200)  
    }) 

});
