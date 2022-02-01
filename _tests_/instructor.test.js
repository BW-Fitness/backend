/* eslint-disable */
const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db');
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

const updater = {
  date: 'updated',
  time: 'time',
    duration: 'duration',
    type: 'type',
    intensity: 'intensity',
    location: 'location',

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
        const res = await request(server).post('/api/classes').send(created); //this is assuming that the post endpoint is properly configured, of course...
        expect(res.body).toMatchObject(created);
     });

     it('can UPDATE a class, returns that class from the db', async () => { 
       //first, get a class by id from the db
       const classold = await Class.getById(1);
       //then, do post to classes/:id
       const res = await request(server).post('/api/classes/:id').send(updater);
       //then, get that same class by id and check if updated with new values.
       const updated = await request(server).get('/api/classes/:id').send(classold);
       expect(updated).toMatchObject(updater); //now we pray I have this in the right order ! :-) 
     })

     it('can DELETE a class, and returns the new length of the db', async () => {
       //similar logic as above, get a class by the id
       //then do a DELETE request, passing in the id
       //then expect the class by id to return undefined
       const classdel = await Class.getById(1);
       const res = await request(server).delete('/api/classes/:id').send(1); //send the id of the class to be deleted!
       expect(classdel).toBeFalsy(); //assuming undefined is a 'false' value !
     })
 });

////            TODOS ::                ////
           
// -authenticated instructor can create a 'punch pass' for each type of class they offer, returns proper response from the db -- TO DO still !