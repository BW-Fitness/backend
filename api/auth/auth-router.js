const { validateBody, checkUsernameExists } = require('./auth-middleware');
const authController = require('./authController');
const router = require('express').Router();

router.post(
  '/register', 
  validateBody, 
  checkUsernameExists, 
  authController.register
);

router.post(
  '/login', 
  validateBody, 
  checkUsernameExists, 
  authController.login
);

router.use(
  '*', 
  authController.notFound
);

module.exports = router;