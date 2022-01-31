/* eslint-disable */
const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');
// const bcrypt = require('bcryptjs');
// const jwtDecode = require('jwt-decode');



beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});



afterAll(async () => {
  await db.destroy();
});

const mockedGet = () => {
    return db('classes');
 }

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
    });
    });

    //TODOS ::
//     -authenticated client can SEARCHFOR classes by date 
// -authenticated client can SEARCHFOR classes by time
// -authenticated client can SEARCHFOR classes by duration
// -authenticated client can SEARCHFOR classes by type
// -authenticated client can SEARCHFOR classes by intensity
// -authenticated client can SEARCHFOR classes by location

// -authenticated client can reserve a spot in a class with available open seats, returns expected class size (-1)
// -authenticated client can cancel a reservation, returns expected class size (+1)