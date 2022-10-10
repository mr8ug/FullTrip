var app = require('../server')



const supertest = require('supertest')
const request = supertest(app)
const path = require('path')

/*it('gets the test endpoint', async done => {
    //const response = await request.post('/test')
    
    //expect(response.status)
    expect(1).toBe(1)
    
    done()
})*/

/*it('gets the test endpoint', async () => {
    const response = await request
        .post('/api/add_car')
        .set('Content-Type',  'application/json')
        .send({
            brand:"Nissan",
            line:"Sentra",
            model:"2022",
            placa:"P00547",
            price:"555.55",
            user_id:"12"
        })
  
    expect(response.status).toBe(406)
    //expect(response.body.response_text).toBe('Is not present value')
  })*/


describe("GET /api/all_rooms", () => {
    it('verify exist rooms by user valid', async () => {
        const response = await request
            .get('/api/all_rooms')
            .set('Content-Type',  'application/json')
            .send({
               email:"josejfss98@gmail.com",
               password:"1234"
            })
            //expect(response.body.response_text).toEqual('Err of connect')
            expect(response.status).toEqual(200)  
    }) 
});




