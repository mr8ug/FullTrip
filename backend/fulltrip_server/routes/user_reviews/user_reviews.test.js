
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/user_reviews", () => {
    it('verify all see, reviews by user valid', async () => {
        const response = await request
            .post('/api/user_reviews')
            .set('Content-Type',  'application/json')
            .send({
                user_id:34
            })
            expect(response.status).toEqual(200)  
    }) 
});
