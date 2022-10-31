
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
               email:"test_3dc54551-8466-4e77-a26c-afa4635e935c@gmail.com",
               password:"1234"
            })
            expect(response.status).toEqual(200)  
    }) 

    it('verify keys json response', async () => {
        const response = await request
            .post('/api/login')
            .set('Content-Type',  'application/json')
            .send({
                email:"test_3dc54551-8466-4e77-a26c-afa4635e935c@gmail.com",
                password:"1234"
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

    it('verify login incorrect response', async () => {
        const response = await request
            .post('/api/login')
            .set('Content-Type',  'application/json')
            .send({
               email:process.env.TEST_EMAIL,
               password:"123456"
            })
            expect(response.status).toEqual(404)  
    }) 

});
