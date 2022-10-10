var app = require(process.cwd() + '/server')
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


describe("POST /api/add_car", () => {
    it('verify add car', async () => {
        const response = await request
            .post('/api/add_car')
            .set('Content-Type',  'application/json')
            .field('brand','test')
            .field('line','test')
            .field('model','0000')
            .field('placa','test')
            .field('price','555.55')
            .field('user_id','35')
            .attach('avatar', path.resolve(process.cwd() + '/img_prueba.jpg'))
            //expect(response.body.message).toEqual('hoa');
            expect(response.status).toEqual(201)  
    }) 
});


describe("GET /api/all_rooms", () => {
    it('verify exist rooms by hotel', async () => {
        const response = await request
            .get('/api/all_rooms')
            .set('Content-Type',  'application/json')
            .send({
                //email:process.env.TEST_EMAIL,
                //password:process.env.TEST_PASSWORD
            })
            expect(response.status).toEqual(200)  
    }) 
});




