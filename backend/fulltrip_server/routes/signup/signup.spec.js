var app = require(process.cwd() + '/server')
const supertest = require('supertest')
const request = supertest(app)
const path = require('path')
const uuid = require('uuid')


describe("POST /api/signup", () => {
    it('verify is active endpoint', async () => {
        const response = await request
            .post('/api/signup')
            .set('Content-Type',  'application/json')
            .send({
               test:"true",
            })
            expect(response.body.response_text).toEqual("active endpoint")
            expect(response.status).toEqual(200)  
    })

    it('verify signup turista', async () => {
        const response = await request
            .post('/api/signup')
            .set('Content-Type',  'application/json')
            .send({
                email:"test_" + uuid.v4() + "@gmail.com",
                password:"1234",
                full_name:"Turista test",
                type_user:"4",
                country:"Guatemala",
                city:"Peten"
            })

            expect(response.status).toEqual(201);
    })

    it('verify signup servicios tercerizados', async () => {
        const response = await request
            .post('/api/signup')
            .set('Content-Type',  'application/json')
            .send({
                email:"test_" + uuid.v4() + "@gmail.com",
                password:"1234",
                full_name:"Arrendador test",
                type_user:"6",
                country:"Guatemala",
                city:"Peten"
            })

            expect(response.status).toEqual(201);
    })

    it('verify signup hotel', async () => {
        const response = await request
            .post('/api/signup')
            .set('Content-Type',  'application/json')
            .send({
                email:"test_" + uuid.v4() + "@gmail.com",
                password:"1234",
                full_name:"Hotel test",
                type_user:"5",
                country:"Guatemala",
                city:"Peten"
            })

            expect(response.status).toEqual(201);
    })

    it('verify signup aerolinea', async () => {
        const response = await request
            .post('/api/signup')
            .set('Content-Type',  'application/json')
            .send({
                email:"test_" + uuid.v4() + "@gmail.com",
                password:"1234",
                full_name:"Aerolinea test",
                type_user:"7",
                country:"Guatemala",
                city:"Peten"
            })

            expect(response.status).toEqual(201);
    })
    
    


})