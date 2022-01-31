const classesController = require('./classes-controller');
const { validateId, validateBody } = require('./classes-middleware');
const { only, restricted } = require('../auth/auth-middleware');
const router = require('express').Router();

router.get(
  '/', 
  classesController.getAllClasses
);

router.get(
  '/:id', 
  validateId, 
  classesController.getClassById
);

router.post(
  '/', 
  validateBody, 
  restricted, 
  only('instructor'), 
  classesController.createClass
);

router.put(
  '/:id', 
  validateId, 
  validateBody, 
  restricted, 
  only('instructor'), 
  classesController.updateClass
);

router.delete(
  '/:id', 
  validateId, 
  restricted, 
  only('instructor'), 
  classesController.deleteClass
);

router.use(
  '*', 
  classesController.notFound
);

module.exports = router;