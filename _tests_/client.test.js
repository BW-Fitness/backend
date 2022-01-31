/* eslint-disable */
const request = require('supertest');
const server = require('../api/server');
//const db = require('../data/dbConfig');
// const bcrypt = require('bcryptjs');
// const jwtDecode = require('jwt-decode');

const mockedGet = () => {
   return db('classes');
}

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// beforeEach(async () => {
//   await db.seed.run();
// });

// afterAll(async () => {
//   await db.destroy();
// });

describe('client',()=>{
    it('can log in successfully, generating proper response from the database', async () => {
        const res = await request(server).post('/api/auth/login').send({ username: 'client', password: '1234' })
        expect(res.body.message).toMatch(/welcome, client/i);
      }, 750);
    
    it('can generate correct error message on failed login', async () => {
        const res = await request(server).post('/api/auth/login').send({username: 'mama mia', password: 'xxxyyyzzz'});
    expect(res.body.message).toMatch('invalid credentials');
    });

    it('can GET classes which have the expected values in response body!', async () => {
        const res = await request(server).get('/api/classes');
        expect(res.body).toMatch({mockedGet}); //will have to see if this actually works
    })
    });