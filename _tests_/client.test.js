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

    it('can SEARCHFOR classes by DATE', async () => {
        const res = await request(server).get('/api/classes/:query').send({date: '12/31/1969'});
        expect(res.body.message).toMatch('Classes on 12/31/1969:');
    });

    it('can SEARCHFOR classes by TIME', async () => {
        const res = await request(server).get('/api/classes/:query').send({time: '4:20'});
        expect(res.body.message).toMatch('Classes at 4:20:');
    });

    it('can SEARCHFOR classes by DURATION', async () => {
        const res = await request(server).get('/api/classes/:query').send({duration: '4:20'});
        expect(res.body.message).toMatch('Classes lasting 4:20:');
    });

    it('can SEARCHFOR classes by TYPE', async () => {
        const res = await request(server).get('/api/classes/:query').send({type: 'calisthenics'});
        expect(res.body.message).toMatch('calisthenics classes:');
    });

    it('can SEARCHFOR classes by INTENSITY', async () => {
        const res = await request(server).get('/api/classes/:query').send({intensity: 'beginner'});
        expect(res.body.message).toMatch('beginner classes:');
    });

    it('can SEARCHFOR classes by LOCATION', async () => {
        const res = await request(server).get('/api/classes/:query').send({location: 'local'});
        expect(res.body.message).toMatch('classes near local:');
    });

    it('can RESERVE a spot in a class, returns new class size attribute', async () => {

    });

    it('can CANCEL a reservation, returns new class size attribute', async () => {

    });
});

    //TODOS ::
//     -authenticated client can SEARCHFOR classes by date  X
// -authenticated client can SEARCHFOR classes by time X
// -authenticated client can SEARCHFOR classes by duration X
// -authenticated client can SEARCHFOR classes by type X
// -authenticated client can SEARCHFOR classes by intensity X
// -authenticated client can SEARCHFOR classes by location X

// -authenticated client can reserve a spot in a class with available open seats, returns expected class size (-1)
// -authenticated client can cancel a reservation, returns expected class size (+1)