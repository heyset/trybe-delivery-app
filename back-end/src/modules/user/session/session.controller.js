const Model = require('../user.model');

const { sign } = require('../../token');
const { compare } = require('../../hashing');
const { validate } = require('../../validation');
const { AuthenticationError, NotFoundError } = require('../../errors');

const create = async (userData) => {
  await validate({ schema: 'user_session_login', data: userData });
  const user = await Model.findOne({ email: userData.email });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  try {
    compare({ value: userData.password, hash: user.password });
  } catch (error) {
    throw new AuthenticationError('Invalid credentials');
  }

  const token = sign({ id: user.id, role: user.role });

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id,
    token,
  };
};

module.exports = {
  create,
};
