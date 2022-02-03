const { restricted } = require('../auth/auth-middleware');
const Users = require('./users-model');
const router = require('express').Router();

router.get('/', restricted ,async (req, res, next) => {
  const user_id = req.decoded.subject
    try {
      res.json(await Users.getUserClasses(user_id))
    } catch (err) {
      next({
        status: 400,
        source: 'error while fetching users classes',
        message: 'No classes!'
      })
    } 
})

router.post('/', restricted, async (req, res, next) => {
  const user_id = req.decoded.subject
    try {
      res.json(await Users.registerUserInClass(user_id, {class_id: req.body.class_id}))
    } catch (err) {
      next({
        status: 400,
        source: 'Error with registering for the class',
        message: 'Something went wrong with registering'
      })
    }
})

router.put('/:id', restricted, async (req, res, next) => {
  const user_id = req.decoded.subject
    try {
      res.json(await Users
        .updateUsersClass(
          user_id, 
          req.params.id, 
          { class_id: req.body.class_id }
        )
      )
    } catch (err) {
      next(err)
      next({
        status: 400,
        source: 'Error with rescheduling for the class',
        message: 'Trouble rescheduling class'
      })
    }
})

router.delete('/', restricted, async (req, res, next) => {
  const user_id = req.decoded.subject
  try {
    res.json(await Users.removeUserFromClass(user_id, {class_id: req.body.class_id}))
  } catch (err) {
    next({
      status: 400,
      source: 'Error when deleting a class',
      message: 'Could not delete the user from class'
    })
  }
})

module.exports = router