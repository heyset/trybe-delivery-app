const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

describe('POST /user', () => {
  beforeEach(() => {
    resetDb();
  });

  const url = '/user';

  const userWithInvalidEmail = {
    name: 'Jest McTest User',
    email: 'invalid@email',
    password: '123456',
  };

  const userWithInvalidPassword = {
    name: 'Jest McTest User',
    email: 'valid@email.com',
    password: '12345',
  };

  const userWithInvalidName = {
    name: 'Jest',
    email: 'valid@email.com',
    password: '123456',
  };

  const validUser = {
    name: 'Jest McTest User',
    email: 'valid@email.com',
    password: '123456',
  };

  const existingUser = {
    name: 'Delivery App Admin hehehe',
    email: 'adm@deliveryapp.com',
    password: '123456',
  };

  describe('returns a validation error with invalid', () => {
    it('name', () => request(server)
      .post(url)
      .send(userWithInvalidName)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid name');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('email', () => request(server)
      .post(url)
      .send(userWithInvalidEmail)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid email');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
    
    it('password', () => request(server)
      .post(url)
      .send(userWithInvalidPassword)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid password');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
  });

  it('returns an error when the user email is already registered', () => request(server)
    .post(url)
    .send(existingUser)
    .expect(409)
    .then((response) => {
      expect(response.body.error.message).toBe('User already registered');
      expect(response.body.error.code).toBe('CONFLICT_ERROR');
    }));

  it('returns a token when the user is registered successfully', async () => {
    await request(server)
      .post(url)
      .send(validUser)
      .expect(201)
      .then((response) => {
        expect(response.body.token).toBeDefined();
      }
    );
  });
});
