const Users = require('../users/users-model');
const userSchema = require('./validation');
const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return 
    next({ 
      status: 401, 
      message: 'Is that really you?' 
    })
  jwt.verify(
    token, 
    process.env.SECRET, 
    (err, decoded) => {
       if (err) return 
      next({ 
        status: 401, 
        message: "This token's fake news!" 
      })
      req.decoded = decoded;
      next();
    });
};

function only(userRole) {
  return function instructor(req, res, next){
    if (userRole === req.decoded.role)
      return next()
      next({ 
        status: 403, 
        source: 'Erroneous access role',  
        message: 'Know your role.' 
      });
    };
};

async function checkUsernameExists(req, res, next) {
  try {
    const user = await Users.findUser({ 
      username: req.body.username 
    });
    if (user && req.path === '/register') 
      return next({
        status: 400,
        source: 'Something happened while registering',
        message: 'Who ARE you?'
      })
    if (req.path === '/login') {
      if (user) {
        req.user = user
        return next()
      } else {
        return next({
          status: 400,
          source: 'Something happened while logging you in',
          message: "Never heard of 'em."
        });
      }
    }
    next()

  } catch {
    next({
      status: 400,
      source: 'What is this username you speak of?',
      message: "Can't find that username."
    })
  };
};

async function validateBody(req, res, next) {
  try {
    req.body = await userSchema.validateAsync(req.body, { stripUnknown: true })
    next()
  } catch (err) {
    next({
      status: 400,
      source: 'Username or password went left',
      message: err.details[0].message
    });
  };
};

module.exports = {
  restricted,
  only,
  checkUsernameExists,
  validateBody
};
