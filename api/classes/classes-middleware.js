const Classes = require('./classes-model');
const classesSchema = require('./validation');

async function validateId(req, res, next) {
  const class_id = parseInt(req.params.id)
  if (isNaN(class_id)) 
    return next({
      status: 400,
      source: 'Error while getting the class',
      message: 'invalid class id provided'
    });
  const [eClass] = await Classes.getClassById({ class_id });
  if (!eClass) 
    return next({
      status: 401,
      source: 'error while getting the class',
      message: 'That class does not exist',
    })
    req.eClass = eClass;
      next()
};

async function validateBody(req, res, next) {
  let source;
  if (req.method === 'POST') source = 'Error while creating a new  class.'
    else if (req.method === 'PUT') source = 'Error while updating a class' 
  try {
    req.body = await classesSchema.validateAsync(req.body, { stripUnknown: true })
    next()
  } catch (err) {
    next({
      status: 400,
      source,
      message: err.details[0].message
    })
  }
};

module.exports = {
  validateId,
  validateBody
};
