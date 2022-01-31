const Classes = require('./classes-model');

const classesController = {
  async getAllClasses(req, res) {
    res.json(await Classes.getClasses())
  },
  async getClassById(req, res) {
    res.json(req.eClass)
  },
  async createClass(req, res, next) {
    try {
      res.json(await Classes.addClass(req.body))
    } catch (err) {
      next({
        status: 400,
        source: 'Error while adding the class',
        message: 'Something went wrong'
      })
    }
  },
  async updateClass(req, res, next) {
    try {
      res.json(await Classes.updateClass(req.body, req.params.id))
    } catch (err) {
      next({
        status: 400,
        source: 'Error while updating the class',
        message: 'Something went wrong while updating'
      })
    }
  },
  async deleteClass(req, res, next) {
    try {
      res.json(await Classes.deleteClass(req.eClass.class_id))
    } catch (err) {
      next({
        status: 400,
        source: 'Error while deleting the class',
        message: 'Something went wrong'
      })
    }
  },
  notFound(req, res, next) {
    next({
      status: 404, 
      message: 'not found' 
    })
  }
};

module.exports = classesController;