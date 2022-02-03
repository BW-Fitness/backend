const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .message('Username must be at least 3 characters long.')
    .required()
    .messages({
      'any.required': 'Username is required.',
      'string.base': 'Username must be a string',
      'string.empty': 'You must enter a username'
    }),
  password: Joi.string()
    .trim()
    .min(5)
    .required()            
    .messages({
      'any.required': 'Password is required.',
      'string.base': 'Password must be a string',
      'string.empty': 'You must enter a password'
    }),
  role: Joi.string().default('client')
});

module.exports = userSchema;
