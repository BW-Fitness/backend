const bcrypt = require('bcrypt');
const Users = require('../users/users-model');
const buildToken = require('./utils/buildToken');
const ROUNDS = process.env.ROUNDS || 8;

const authController = {
  async register(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, parseInt(ROUNDS))
      const { username, user_id } = await Users.addUser(req.body);
      res.json({ username, user_id })
    } catch {
      next({
        status: 500,
        source: 'Error registering the user',
        message: 'I screwed this up.'
      })
    }
  },

  async login(req, res, next) {
    const verifiedPassword = await bcrypt.compare(req.body.password, req.user.password);
    const token = buildToken(req.user);
    if (verifiedPassword) {
      res.status(200).json({ 
        message: `Hello ${req.user.username}`,
        user: req.user,
        token
      })
    } else {
      next({
        status: 401,
        source: 'Oops',
        message: 'Password sucks'
      })
    }
  },

  async notFound(req, res, next) {
    next({ 
      status: 404, 
      message: '???' 
    })
  }
};

module.exports = authController;