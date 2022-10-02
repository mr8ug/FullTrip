var app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

it('gets the test endpoint', async done => {
    const response = await request.post('/api/userExist')
  
    expect(response.status).toBe(200)
    done()
})