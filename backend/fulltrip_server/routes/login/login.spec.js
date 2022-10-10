
var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')


describe("POST /api/login", () => {
    it('verify login response', async () => {
        const response = await request
            .post('/api/login')
            .set('Content-Type',  'application/json')
            .send({
               email:process.env.TEST_EMAIL,
               password:process.env.TEST_PASSWORD
            })
            expect(response.status).toEqual(200)  
    }) 

    it('verify keys json response', async () => {
        const response = await request
            .post('/api/login')
            .set('Content-Type',  'application/json')
            .send({
               email:process.env.TEST_EMAIL,
               password:process.env.TEST_PASSWORD
            })
            var res = {
                userid: 1,
                fullname: "",
                username: null,
                email: "",
                type_user: ""
            };
            //expect(response.headers["Content-Type"]).toMatch('application/json');
            expect(Object.keys(response.body)).toMatchObject(Object.keys(res))
    }) 

});
