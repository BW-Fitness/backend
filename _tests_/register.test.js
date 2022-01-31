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

describe('registry',()=>{

    it('can register a client (POST to /api/auth/register)', async () => {
      await request(server).post('/api/auth/register').send({ username: 'client', password: '1234' });
      const client = await db('clients').where('username', 'client').first();
      expect(client).toMatchObject({username: 'client'});
    }); 

    it('can register an instructor and return proper token', async () => {
        await request(server).post('/api/auth/register').send({username: 'instructor',password:'1234',token:'ins token'});
        const instructor = await db('instructors').where('username','instructor').first();
        expect(instructor).toMatchObject({username: 'instructor', password: '1234', token: 'ins token'})
    });

    it('can generate proper error message on null username', async () => {
        await request(server).post('/api/auth/register').send({username: '', password: '1234'});
        const nullname = await db('clients').where('username','').first();
        expect(nullname).toMatchObject({message: 'must provide username'}); //this SHOULD work this way ! 
    });

    it('can generate proper error message on null password', async () => {
        await request(server).post('/api/auth/register').send({username: 'nullpass', password: ''});
        const nullpass = await db('clients').where('username','nullpass').first();
        expect(nullpass).toMatchObject({message: 'must provide password'}); //this SHOULD work this way ! 
    });

    it('can generate proper error message on too short of password', async () => {
        await request(server).post('/api/auth/register').send({username: 'tooshort', password: '123'});
        const tooshort = await db('clients').where('username','tooshort').first();
        expect(tooshort).toMatchObject({message: 'password must be more than 3 characters'});
    });

    it('can generate proper error message on too short of name', async () => {
        await request(server).post('/api/auth/register').send({username: 'to', password: '1234'});
        const tooshort = await db('clients').where('username','to').first();
        expect(tooshort).toMatchObject({message: 'username must be more than 3 characters'});
    });

 }); //end describe