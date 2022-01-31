/* eslint-disable */
const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');
const Class = require('../api/classes-model'); //CHECK THAT THESE PATHS WORK !!!
// const bcrypt = require('bcryptjs');
// const jwtDecode = require('jwt-decode');

const created = {
    date: 'date',
    time: 'time',
    duration: 'duration',
    type: 'type',
    intensity: 'intensity',
    location: 'location',
    punchPass: 'punchpass'
}

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

 describe('instructors',()=>{
    let classes;
    beforeEach(async () => {
        classes = await Class.getAll();
    });

     it('can CREATE a class, returns that class from the db', async () => {
        const res = await request(server).post('/api/classes').send(created);
        expect(res.body).toMatchObject(created);
     });

     it('can UPDATE a class, returns that class from the db')
 });

////            TODOS ::                ////
// -authenticated instructor can CREATE a class, returns proper response from the db X
// -authenticated instructor can UPDATE a class, returns updated response from the db
// -authenticated instructor can DELETE a class, expects that deleted class get to be null
//////////////////////////////////                  expect getAll length to be (-1)
// -authenticated instructor can create a 'punch pass' for each type of class they offer, returns proper response from the db