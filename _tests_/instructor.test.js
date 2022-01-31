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

////            TODOS ::                ////
// -authenticated instructor can CREATE a class, returns proper response from the db
// -authenticated instructor can UPDATE a class, returns updated response from the db
// -authenticated instructor can DELETE a class, expects that deleted class get to be null
// -authenticated instructor can create a 'punch pass' for each type of class they offer, returns proper response from the db